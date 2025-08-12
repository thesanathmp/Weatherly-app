// Use relative URLs for Vercel deployment, fallback to localhost for development
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

export const weatherService = {
  // Get weather data for a city
  async getWeatherByCity(city) {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Weather Service Error:', error);
      throw error;
    }
  },

  // Health check
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health Check Error:', error);
      throw error;
    }
  }
};