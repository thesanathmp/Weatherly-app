import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import SearchBar from "./components/ui/SearchBar";
import WeatherCard from "./components/common/WeatherCard";
import Footer from "./components/layout/Footer";
import { weatherService } from "./services/weatherService";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchCity) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherService.getWeatherByCity(searchCity);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="search-section">
          <h1>Weather Forecast</h1>
          <p>Get current weather information for any city</p>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {weatherData && (
          <div className="weather-section">
            <WeatherCard data={weatherData} />
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Getting weather data...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>❌ {error}</p>
            <p>Please try again with a different city name.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
