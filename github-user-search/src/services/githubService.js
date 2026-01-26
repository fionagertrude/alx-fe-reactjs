import axios from 'axios';

// GitHub API base URL
const BASE_URL = 'https://api.github.com';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  },
});

/**
 * Fetch user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise} - Promise with user data
 */
export const fetchUserData = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    // Re-throw error with more context
    const enhancedError = new Error(
      error.response?.status === 404 
        ? 'User not found'
        : 'Failed to fetch user data'
    );
    enhancedError.originalError = error;
    throw enhancedError;
  }
};

/**
 * Advanced search for GitHub users using GitHub's Search API
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.username - Username to search
 * @param {string} searchParams.location - Location filter
 * @param {number} searchParams.minRepos - Minimum repositories
 * @param {number} searchParams.minFollowers - Minimum followers
 * @param {string} searchParams.language - Programming language
 * @param {number} page - Page number
 * @param {number} perPage - Results per page
 * @returns {Promise} - Promise with search results
 */
export const advancedSearch = async (searchParams, page = 1, perPage = 10) => {
  try {
    // Build query string based on parameters
    let queryParts = [];
    
    if (searchParams.username) {
      queryParts.push(`${searchParams.username} in:login`);
    }
    
    if (searchParams.location) {
      queryParts.push(`location:"${searchParams.location}"`);
    }
    
    if (searchParams.minRepos) {
      queryParts.push(`repos:>=${searchParams.minRepos}`);
    }
    
    if (searchParams.minFollowers) {
      queryParts.push(`followers:>=${searchParams.minFollowers}`);
    }
    
    if (searchParams.language) {
      queryParts.push(`language:${searchParams.language}`);
    }

    // Combine query parts with '+' (GitHub Search API format)
    const query = queryParts.join('+');
    
    if (!query) {
      throw new Error('Please provide at least one search criteria');
    }

    // Construct the API URL exactly as required
    const apiUrl = `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${perPage}`;
    
    // Add sort parameter if specified
    const params = {
      q: query,
      page: page,
      per_page: perPage,
    };
    
    if (searchParams.sortBy && searchParams.sortBy !== 'best-match') {
      params.sort = searchParams.sortBy;
      params.order = 'desc'; // GitHub defaults to desc for most sorts
    }

    console.log('Making API request to:', apiUrl);
    console.log('With params:', params);

    // Make the API request
    const response = await api.get('/search/users', { params });

    // Get total count for pagination
    const totalCount = response.data.total_count;
    
    // Fetch detailed user information for each result
    const usersWithDetails = await Promise.all(
      response.data.items.slice(0, perPage).map(async (user) => {
        try {
          const userDetails = await fetchUserData(user.login);
          return {
            ...user,
            ...userDetails
          };
        } catch (error) {
          console.warn(`Could not fetch details for user ${user.login}:`, error.message);
          // Return basic info if detailed fetch fails
          return {
            ...user,
            name: null,
            bio: null,
            location: null,
            company: null,
            blog: null,
            public_repos: 0,
            followers: 0,
            following: 0,
            created_at: null,
          };
        }
      })
    );

    return {
      items: usersWithDetails,
      total_count: totalCount,
      incomplete_results: response.data.incomplete_results,
      page: page,
      per_page: perPage,
      has_next_page: page * perPage < totalCount,
    };
  } catch (error) {
    console.error('Advanced search error:', error);
    
    // Provide user-friendly error messages based on GitHub API errors
    if (error.response?.status === 403) {
      if (error.response.headers['x-ratelimit-remaining'] === '0') {
        const resetTime = new Date(error.response.headers['x-ratelimit-reset'] * 1000);
        throw new Error(`Rate limit exceeded. Please wait until ${resetTime.toLocaleTimeString()} before searching again.`);
      }
      throw new Error('Rate limit exceeded. Please wait a moment before searching again.');
    } else if (error.response?.status === 422) {
      throw new Error('Invalid search parameters. Please adjust your search criteria.');
    } else if (error.response?.status === 503) {
      throw new Error('GitHub API is temporarily unavailable. Please try again later.');
    } else if (error.message.includes('Network Error')) {
      throw new Error('Network error. Please check your internet connection and try again.');
    } else {
      throw new Error('Search failed. Please try again later.');
    }
  }
};

/**
 * Basic search for GitHub users
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {number} perPage - Results per page
 * @returns {Promise} - Promise with search results
 */
export const searchUsers = async (query, page = 1, perPage = 10) => {
  try {
    const apiUrl = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
    
    console.log('Basic search API URL:', apiUrl);
    
    const response = await api.get('/search/users', {
      params: {
        q: query,
        page: page,
        per_page: perPage,
      }
    });
    
    return {
      ...response.data,
      items: response.data.items || [],
    };
  } catch (error) {
    console.error('Basic search error:', error);
    throw error;
  }
};

/**
 * Build GitHub search URL for debugging purposes
 * @param {Object} searchParams - Search parameters
 * @returns {string} - GitHub search URL
 */
export const buildGitHubSearchUrl = (searchParams) => {
  let queryParts = [];
  
  if (searchParams.username) {
    queryParts.push(`${searchParams.username} in:login`);
  }
  
  if (searchParams.location) {
    queryParts.push(`location:"${searchParams.location}"`);
  }
  
  if (searchParams.minRepos) {
    queryParts.push(`repos:>=${searchParams.minRepos}`);
  }
  
  if (searchParams.minFollowers) {
    queryParts.push(`followers:>=${searchParams.minFollowers}`);
  }
  
  if (searchParams.language) {
    queryParts.push(`language:${searchParams.language}`);
  }
  
  const query = queryParts.join('+');
  return `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;
};

// Export everything
export default {
  fetchUserData,
  advancedSearch,
  searchUsers,
  buildGitHubSearchUrl,
};