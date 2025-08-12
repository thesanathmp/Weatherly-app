# Weatherly - Weather App

A modern weather application built with React frontend and Node.js backend.

## Features

- 🌤️ Real-time weather data
- 🔍 Search weather by city name
- 📱 Responsive design
- ⚡ Fast and lightweight
- 🎨 Modern UI with smooth animations

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Get a free API key from [OpenWeatherMap](https://openweathermap.org/api) and update the `.env` file:
   ```
   WEATHER_API_KEY=your_api_key_here
   ```
   
   Note: The app works with demo data if no API key is provided.

4. Start the backend server:
   ```bash
   npm run dev
   ```
   
   The backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/weatherly-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will run on http://localhost:5173

## Usage

1. Make sure both backend and frontend servers are running
2. Open your browser and go to http://localhost:5173
3. Enter a city name in the search bar
4. View the current weather information

## API Endpoints

- `GET /` - Health check
- `GET /api/weather/:city` - Get weather data for a city
- `GET /api/health` - API health status

## Tech Stack

**Frontend:**
- React 18
- Vite
- CSS3 with modern features

**Backend:**
- Node.js
- Express.js
- Axios for API calls
- CORS for cross-origin requests

## Demo Mode

The app includes a demo mode that generates mock weather data when no API key is configured. This allows you to test the application without setting up external API credentials.

## Deployment

### Vercel (Recommended)
This project is optimized for Vercel deployment. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

Quick deploy:
1. Push to GitHub
2. Import to Vercel
3. Add `WEATHER_API_KEY` environment variable
4. Deploy!

### Local Development
For local development:
```bash
# Backend
cd backend && npm run dev

# Frontend (new terminal)
cd frontend/weatherly-app && npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License