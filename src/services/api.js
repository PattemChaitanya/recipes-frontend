import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const apiService = {
  // Send analytics data
  postAnalytics: async (analyticsData) => {
    try {
      const response = await apiClient.post('/analytics', analyticsData);
      return response.data;
    } catch (error) {
      console.error('Error posting analytics data:', error);
      throw error;
    }
  },
  
  // Example of other API methods that might be needed
  getRecipes: async () => {
    try {
      const response = await apiClient.get('/recipes');
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },
}; 