import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: GITHUB_TOKEN ? {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  } : {
    'Accept': 'application/vnd.github.v3+json'
  }
});

export const getUser = (username) => {
  return api.get(`/users/${username}`);
};

export const getUserRepos = (username) => {
  return api.get(`/users/${username}/repos?per_page=100&sort=stars`);
};

export const getUserStats = async (username) => {
  try {
    const userResponse = await getUser(username);
    const reposResponse = await getUserRepos(username);
    return {
      user: userResponse.data,
      repos: reposResponse.data
    };
  } catch (error) {
    throw error;
  }
};

export default api;
