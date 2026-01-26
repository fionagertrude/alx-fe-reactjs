import React, { useState } from 'react';
import { advancedSearch, buildGitHubSearchUrl } from '../services/githubService';
import UserCard from './UserCard';
import LoadingSpinner from './LoadingSpinner';

function Search() {
  // Search form state
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    minFollowers: '',
    language: '',
    sortBy: 'best-match',
  });

  // Search results and UI state
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [apiUrl, setApiUrl] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const hasSearchCriteria = Object.values(searchParams).some(
      value => value && value.toString().trim() !== ''
    );
    
    if (!hasSearchCriteria && !searchParams.username) {
      setError('Please provide at least one search criteria');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResults([]);
    setCurrentPage(1);

    try {
      // Build and display the API URL
      const url = buildGitHubSearchUrl(searchParams);
      setApiUrl(url);
      
      const results = await advancedSearch(searchParams, 1);
      setSearchResults(results.items || []);
      setTotalResults(results.total_count || 0);
      setHasMore(results.has_next_page || false);
      
      // Log for debugging
      console.log('Search results:', results);
      console.log('Total results:', results.total_count);
      console.log('API URL used:', url);
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more results
  const loadMore = async () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const results = await advancedSearch(searchParams, nextPage);
      setSearchResults(prev => [...prev, ...(results.items || [])]);
      setCurrentPage(nextPage);
      setHasMore(results.has_next_page || false);
    } catch (err) {
      setError(err.message || 'Failed to load more results');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchParams({
      username: '',
      location: '',
      minRepos: '',
      minFollowers: '',
      language: '',
      sortBy: 'best-match',
    });
    setSearchResults([]);
    setError(null);
    setTotalResults(0);
    setApiUrl('');
  };

  // Popular programming languages for suggestions
  const popularLanguages = [
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'PHP', 'Ruby',
    'Go', 'Rust', 'Swift', 'Kotlin', 'Dart', 'R', 'Scala', 'Perl'
  ];

  // Example searches
  const exampleSearches = [
    { username: 'torvalds', label: 'Linus Torvalds' },
    { location: 'San Francisco', label: 'SF Developers' },
    { minRepos: 100, label: 'Experienced Developers (100+ repos)' },
    { language: 'JavaScript', minFollowers: 1000, label: 'Top JS Developers' },
  ];

  const handleExampleSearch = (example) => {
    setSearchParams({
      username: example.username || '',
      location: example.location || '',
      minRepos: example.minRepos || '',
      minFollowers: example.minFollowers || '',
      language: example.language || '',
      sortBy: 'best-match',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-github-dark text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              GitHub User Search
            </h1>
            <p className="text-gray-300 text-lg">
              Advanced search for GitHub users using GitHub Search API
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-github p-6 mb-8 border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic Search */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={searchParams.username}
                  onChange={handleInputChange}
                  placeholder="Enter GitHub username (e.g., torvalds)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={isLoading}
                />
              </div>

              {/* Advanced Search Toggle */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <span className="mr-2">{showAdvanced ? '▼' : '▶'}</span>
                Advanced Search Options
              </button>

              {/* Advanced Search Options */}
              {showAdvanced && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={searchParams.location}
                      onChange={handleInputChange}
                      placeholder="City, Country (e.g., San Francisco)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Minimum Repositories */}
                  <div>
                    <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Repositories
                    </label>
                    <input
                      type="number"
                      id="minRepos"
                      name="minRepos"
                      value={searchParams.minRepos}
                      onChange={handleInputChange}
                      placeholder="e.g., 10"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Minimum Followers */}
                  <div>
                    <label htmlFor="minFollowers" className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Followers
                    </label>
                    <input
                      type="number"
                      id="minFollowers"
                      name="minFollowers"
                      value={searchParams.minFollowers}
                      onChange={handleInputChange}
                      placeholder="e.g., 100"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Programming Language */}
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                      Programming Language
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="language"
                        name="language"
                        value={searchParams.language}
                        onChange={handleInputChange}
                        placeholder="e.g., JavaScript"
                        list="languages"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isLoading}
                      />
                      <datalist id="languages">
                        {popularLanguages.map(lang => (
                          <option key={lang} value={lang} />
                        ))}
                      </datalist>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Suggestions: JavaScript, Python, Java, etc.
                    </p>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      id="sortBy"
                      name="sortBy"
                      value={searchParams.sortBy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isLoading}
                    >
                      <option value="best-match">Best Match</option>
                      <option value="followers">Most Followers</option>
                      <option value="repositories">Most Repositories</option>
                      <option value="joined">Recently Joined</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-github-green hover:bg-github-green-hover text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching GitHub...
                    </>
                  ) : (
                    'Search Users'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={clearSearch}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
                  disabled={isLoading}
                >
                  Clear All
                </button>
              </div>
            </div>
          </form>

          {/* API URL Display */}
          {apiUrl && (
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">GitHub API Request:</p>
              <code className="text-xs bg-gray-100 p-2 rounded block overflow-x-auto">
                {decodeURIComponent(apiUrl)}
              </code>
              <p className="text-xs text-gray-500 mt-2">
                Note: This shows the decoded URL for readability. The actual request uses proper URL encoding.
              </p>
            </div>
          )}

          {/* Search Tips */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Search Tips:</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
              <li>Search by username to find specific users</li>
              <li>Filter by location to find developers in your area</li>
              <li>Use minimum repos/followers to find experienced developers</li>
              <li>Filter by language to find experts in specific technologies</li>
              <li>Combine multiple filters for precise results</li>
            </ul>
            <div className="mt-3 text-xs text-blue-600">
              <p className="font-medium">GitHub Search Syntax Examples:</p>
              <code className="block mt-1 bg-blue-100 p-2 rounded">
                username in:login location:&quot;San Francisco&quot; repos:≥100 followers:≥1000 language:JavaScript
              </code>
            </div>
          </div>

          {/* Quick Search Examples */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-3">Quick Examples:</h3>
            <div className="flex flex-wrap gap-2">
              {exampleSearches.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleExampleSearch(example)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition duration-200"
                  disabled={isLoading}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center text-red-800">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Error:</span>
            </div>
            <p className="mt-2 text-red-700">{error}</p>
            <button
              onClick={clearSearch}
              className="mt-3 px-4 py-2 bg-red-100 text-red-700 font-medium rounded hover:bg-red-200 transition duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results Section */}
        {searchResults.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Search Results
                </h2>
                <p className="text-gray-600 mt-1">
                  Found {totalResults.toLocaleString()} user{totalResults !== 1 ? 's' : ''}
                  {searchParams.location && ` in ${searchParams.location}`}
                  {searchParams.language && ` using ${searchParams.language}`}
                </p>
              </div>
              
              {/* Results Stats */}
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  Page {currentPage}
                  {hasMore && ` • ${Math.ceil(totalResults / 10) - currentPage} more pages`}
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading more users...
                    </>
                  ) : (
                    'Load More Users'
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Showing {searchResults.length} of {Math.min(totalResults, 1000)} users
                  {totalResults > 1000 && ' (GitHub API limits to first 1000 results)'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && searchResults.length === 0 && <LoadingSpinner />}

        {/* Empty State */}
        {!isLoading && !error && searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to Search GitHub</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter search criteria above to find GitHub users. Use advanced options for precise filtering.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Search Tips:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Username: "torvalds in:login"</li>
                  <li>• Location: "location:\"San Francisco\""</li>
                  <li>• Repositories: "repos:≥100"</li>
                  <li>• Followers: "followers:≥1000"</li>
                  <li>• Language: "language:JavaScript"</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">API Info:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Endpoint: /search/users</li>
                  <li>• Rate limit: 60 req/hour</li>
                  <li>• Max results: 1000</li>
                  <li>• Sorting: followers, repos, joined</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              GitHub User Search • Using GitHub REST API v3
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm">
              <div className="flex items-center gap-4">
                <a
                  href="https://docs.github.com/en/rest/search#search-users"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  GitHub Search API Docs
                </a>
                <span className="text-gray-400">•</span>
                <a
                  href="https://api.github.com/rate_limit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Rate Limit Status
                </a>
              </div>
              <div className="text-xs text-gray-500">
                Rate limited to 60 requests per hour without token
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Search;