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
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Advanced search for GitHub users
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
    let query = '';
    
    if (searchParams.username) {
      query += `${searchParams.username} in:login `;
    }
    
    if (searchParams.location) {
      query += `location:${searchParams.location} `;
    }
    
    if (searchParams.minRepos) {
      query += `repos:>=${searchParams.minRepos} `;
    }
    
    if (searchParams.minFollowers) {
      query += `followers:>=${searchParams.minFollowers} `;
    }
    
    if (searchParams.language) {
      query += `language:${searchParams.language} `;
    }

    // Trim and encode query
    query = query.trim();
    
    if (!query) {
      throw new Error('Please provide at least one search criteria');
    }

    const response = await api.get('/search/users', {
      params: {
        q: query,
        page: page,
        per_page: perPage,
        sort: searchParams.sortBy || 'best-match',
      }
    });

    // Fetch detailed user information for each result
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userDetails = await fetchUserData(user.login);
          return {
            ...user,
            ...userDetails
          };
        } catch (error) {
          return user; // Return basic info if detailed fetch fails
        }
      })
    );

    return {
      items: usersWithDetails,
      total_count: response.data.total_count,
      incomplete_results: response.data.incomplete_results,
    };
  } catch (error) {
    console.error('Error in advanced search:', error);
    throw error;
  }
};

/**
 * Search for GitHub users (basic search)
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {number} perPage - Results per page
 * @returns {Promise} - Promise with search results
 */
export const searchUsers = async (query, page = 1, perPage = 10) => {
  try {
    const response = await api.get('/search/users', {
      params: {
        q: query,
        page: page,
        per_page: perPage,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export default {
  fetchUserData,
  advancedSearch,
  searchUsers,
};