import './WeatherCard.css'

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="city-name">{data.city}</h2>
        <div className="weather-icon">{data.icon}</div>
      </div>
      
      <div className="temperature">
        <span className="temp-value">{data.temperature}</span>
        <span className="temp-unit">°C</span>
      </div>
      
      <div className="weather-condition">{data.condition}</div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <div className="detail-info">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{data.humidity}%</span>
          </div>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <div className="detail-info">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard