# Weatherly - Vercel Deployment Guide

## Prerequisites
- Vercel account (free at vercel.com)
- OpenWeatherMap API key (free at openweathermap.org/api)

## Deployment Steps

### 1. Prepare Your Repository
Make sure your project structure looks like this:
```
weatherly/
├── api/
│   ├── health.js
│   └── weather/
│       └── [city].js
├── frontend/
│   └── weatherly-app/
├── backend/ (for local development)
├── package.json
├── vercel.json
└── README.md
```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

#### Option B: Deploy via GitHub
1. Push your code to GitHub
2. Go to vercel.com and import your repository
3. Vercel will auto-detect the configuration

### 3. Set Environment Variables
In your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `WEATHER_API_KEY` = your OpenWeatherMap API key

### 4. Custom Domain (Optional)
1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

## Environment Variables Required
- `WEATHER_API_KEY`: Your OpenWeatherMap API key

## Build Configuration
The project uses:
- Frontend: Vite (React) - builds to `frontend/weatherly-app/dist`
- Backend: Vercel Serverless Functions in `/api` folder

## Testing Deployment
After deployment, test these endpoints:
- `https://your-app.vercel.app/` - Frontend
- `https://your-app.vercel.app/api/health` - API health check
- `https://your-app.vercel.app/api/weather/london` - Weather API

## Troubleshooting
- Check Vercel function logs in dashboard
- Ensure environment variables are set
- Verify API key is valid and activated
- Check CORS settings if needed

## Local Development
For local development, continue using:
```bash
# Backend
cd backend && npm run dev

# Frontend  
cd frontend/weatherly-app && npm run dev
```