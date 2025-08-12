const axios = require('axios');

const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Helper function to get weather icons
function getWeatherIcon(condition) {
  const iconMap = {
    'Clear': '☀️',
    'Clouds': '⛅',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️'
  };
  
  return iconMap[condition] || '🌤️';
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { city } = req.query;
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // For demo purposes, return mock data if no API key
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'demo_key') {
      const mockData = {
        city: city,
        temperature: Math.floor(Math.random() * 30) + 5,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        icon: ['☀️', '⛅', '🌧️', '🌤️'][Math.floor(Math.random() * 4)]
      };
      
      return res.json(mockData);
    }

    // Real API call to OpenWeatherMap
    const response = await axios.get(
      `${WEATHER_API_BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      windSpeed: Math.round(response.data.wind.speed * 3.6),
      icon: getWeatherIcon(response.data.weather[0].main)
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'City not found' });
    }
    
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}