const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server default port
    credentials: true,
  })
);

// Weather API configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "demo_key";
const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// Debug logging
console.log("Environment loaded:");
console.log("- API Key found:", WEATHER_API_KEY !== "demo_key" ? "YES" : "NO");
console.log("- API Key length:", WEATHER_API_KEY ? WEATHER_API_KEY.length : 0);
console.log("- Working directory:", process.cwd());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Weatherly Backend API is running!" });
});

// Get weather by city name
app.get("/api/weather/:city", async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }

    // For demo purposes, return mock data if no API key
    if (WEATHER_API_KEY === "demo_key") {
      const mockData = {
        city: city,
        temperature: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35
        condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][
          Math.floor(Math.random() * 4)
        ],
        humidity: Math.floor(Math.random() * 40) + 40, // Random humidity 40-80%
        windSpeed: Math.floor(Math.random() * 20) + 5, // Random wind 5-25 km/h
        icon: ["☀️", "⛅", "🌧️", "🌤️"][Math.floor(Math.random() * 4)],
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
      windSpeed: Math.round(response.data.wind.speed * 3.6), // Convert m/s to km/h
      icon: getWeatherIcon(response.data.weather[0].main),
    };

    res.json(weatherData);
  } catch (error) {
    console.error("Weather API Error:", error.message);

    if (error.response?.status === 404) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Helper function to get weather icons
function getWeatherIcon(condition) {
  const iconMap = {
    Clear: "☀️",
    Clouds: "⛅",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
  };

  return iconMap[condition] || "🌤️";
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    apiKey: WEATHER_API_KEY !== "demo_key" ? "configured" : "demo_mode",
    apiKeyLength: WEATHER_API_KEY ? WEATHER_API_KEY.length : 0,
    envLoaded: process.env.WEATHER_API_KEY ? "yes" : "no",
  });
});

// Debug endpoint to check environment
app.get("/api/debug", (req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV,
    weatherApiKey: WEATHER_API_KEY
      ? `${WEATHER_API_KEY.substring(0, 8)}...`
      : "not found",
    envKeys: Object.keys(process.env).filter((key) => key.includes("WEATHER")),
    workingDirectory: process.cwd(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `Weather API Mode: ${
      WEATHER_API_KEY === "demo_key" ? "Demo (Mock Data)" : "Live API"
    }`
  );
});
