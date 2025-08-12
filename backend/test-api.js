const axios = require('axios');
require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function testWeatherAPI() {
  try {
    console.log('Testing OpenWeatherMap API...');
    console.log('API Key:', WEATHER_API_KEY ? 'Configured ✓' : 'Missing ✗');
    
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'demo_key') {
      console.log('❌ No valid API key found. Please add your OpenWeatherMap API key to .env file');
      return;
    }

    // Test with a common city
    const testCity = 'London';
    const response = await axios.get(
      `${WEATHER_API_BASE_URL}/weather?q=${testCity}&appid=${WEATHER_API_KEY}&units=metric`
    );

    console.log('✅ API Test Successful!');
    console.log('Test City:', response.data.name);
    console.log('Temperature:', Math.round(response.data.main.temp) + '°C');
    console.log('Condition:', response.data.weather[0].main);
    console.log('Description:', response.data.weather[0].description);
    
  } catch (error) {
    console.log('❌ API Test Failed:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Message:', error.response.data.message);
      
      if (error.response.status === 401) {
        console.log('💡 This usually means your API key is invalid. Please check:');
        console.log('   1. API key is correct in .env file');
        console.log('   2. API key is activated (can take a few hours)');
        console.log('   3. You have an active OpenWeatherMap account');
      }
    } else {
      console.log('Error:', error.message);
    }
  }
}

testWeatherAPI();