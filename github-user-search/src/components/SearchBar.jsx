import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, isLoading = false }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GitHub users..."
            className="search-input"
            disabled={isLoading}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-btn"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          className="search-btn"
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Searching...
            </>
          ) : (
            'Search'
          )}
        </button>
      </form>
      <div className="search-hints">
        <p>Try searching for usernames like: "torvalds", "gaearon", "sindresorhus"</p>
      </div>
    </div>
  );
}

export default SearchBar;