import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import LoadingSpinner from './components/LoadingSpinner';
import githubService from './services/githubService';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await githubService.searchUsers(query);
      setSearchResults(results.items || []);
      setTotalResults(results.total_count || 0);
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>GitHub User Search</h1>
          <p className="subtitle">Find developers and their public repositories</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isLoading}
          />

          {error && (
            <div className="error-message">
              <p>Error: {error}</p>
              <p>Please check your connection and try again.</p>
            </div>
          )}

          {isLoading && <LoadingSpinner />}

          {!isLoading && searchResults.length > 0 && (
            <div className="search-results">
              <div className="results-header">
                <h2>Search Results</h2>
                <span className="results-count">
                  {totalResults.toLocaleString()} user{totalResults !== 1 ? 's' : ''} found
                </span>
              </div>
              
              <div className="users-grid">
                {searchResults.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>
          )}

          {!isLoading && searchResults.length === 0 && !error && (
            <div className="empty-state">
              <h3>No results yet</h3>
              <p>Enter a GitHub username above to start searching</p>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>
            Built with React & GitHub API • 
            Rate limited to {import.meta.env.VITE_APP_GITHUB_TOKEN ? '5000' : '60'} requests per hour
          </p>
          <p className="footer-links">
            <a 
              href="https://docs.github.com/en/rest" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub API Docs
            </a>
            •
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;