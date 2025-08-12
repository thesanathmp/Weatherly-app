export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    apiKey: WEATHER_API_KEY && WEATHER_API_KEY !== 'demo_key' ? 'configured' : 'demo_mode',
    environment: 'vercel'
  });
}