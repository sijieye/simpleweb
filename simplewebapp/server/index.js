const express = require('express');
const Redis = require('ioredis');
const axios = require('axios');
const bodyParser = require('body-parser')
const config = require('./config');
const cors = require('cors')

const redis = new Redis();
const app = express();
const port = 3000;
var jsonParser = bodyParser.json()
const apiKey = config.apiKey;

app.use(cors());
// Endpoint to get weather data for a given city for a number of days
app.post('/weather', jsonParser, async (req, res) => {
    const number = req.body["days"];
    console.log(number)

    try {
        // Check weather data in cache
        const cacheKey = `days_${number}`;
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            console.log(`Weather data for London for ${number} days found in cache`);
            const weather = JSON.parse(cachedData);
            return res.json({ info: weather, cache: true });
        }

        // Fetch weather data from API
        const api = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=London&days=${number}&aqi=no&alerts=no`;
        const result = await axios.get(api);
        
        const data = result.data;
        const forcastD = data.forecast.forecastday;

        // Cache weather data for 60 seconds
        await redis.set(cacheKey, JSON.stringify(forcastD), 'EX', 60);

        console.log(`Weather data for London for ${number} days fetched from API`);
        return res.json({info: forcastD, cache: false });
    } catch (err) {
        console.error(`Error fetching weather data: ${err}`);
        return res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});