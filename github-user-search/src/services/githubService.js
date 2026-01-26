import axios from 'axios';

// Base URL for GitHub API
const GITHUB_API_BASE = 'https://api.github.com';

// Create axios instance with base config
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  }
});

// If you have a GitHub token (optional, increases rate limit)
if (import.meta.env.VITE_APP_GITHUB_TOKEN) {
  githubApi.defaults.headers.common['Authorization'] = `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`;
}

/**
 * Search for GitHub users
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {number} perPage - Results per page
 * @returns {Promise} - Promise with search results
 */
export const searchUsers = async (query, page = 1, perPage = 10) => {
  try {
    const response = await githubApi.get('/search/users', {
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

/**
 * Get detailed information about a specific user
 * @param {string} username - GitHub username
 * @returns {Promise} - Promise with user details
 */
export const getUserDetails = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    throw error;
  }
};

/**
 * Get user's repositories
 * @param {string} username - GitHub username
 * @param {number} page - Page number
 * @param {number} perPage - Results per page
 * @returns {Promise} - Promise with user's repositories
 */
export const getUserRepos = async (username, page = 1, perPage = 10) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos`, {
      params: {
        page: page,
        per_page: perPage,
        sort: 'updated',
        direction: 'desc'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching repos for ${username}:`, error);
    throw error;
  }
};

/**
 * Get user's followers
 * @param {string} username - GitHub username
 * @returns {Promise} - Promise with user's followers
 */
export const getUserFollowers = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}/followers`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching followers for ${username}:`, error);
    throw error;
  }
};

/**
 * Get user's following
 * @param {string} username - GitHub username
 * @returns {Promise} - Promise with users the user is following
 */
export const getUserFollowing = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}/following`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching following for ${username}:`, error);
    throw error;
  }
};

export default {
  searchUsers,
  getUserDetails,
  getUserRepos,
  getUserFollowers,
  getUserFollowing
};