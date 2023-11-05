const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = 3001; // You can change this port if needed.
app.use(cors())
dotenv.config();

console.log(process.env.APIKEY, "==>process.env.APIKEY")

// Define a route that proxies the Yelp API request
app.get('/api/yelp', async (req, res) => {
    console.log("api hit hogai")
    try {
        const { location, sort_by, limit } = req.query;
        const apiKey = process.env.APIKEY; // Replace with your Yelp API key.

        const yelpResponse = await axios.get('https://api.yelp.com/v3/businesses/search', {
            params: {
                location,
                sort_by,
                limit,
            },
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        console.log(yelpResponse.data)
        res.json(yelpResponse.data);
    } catch (error) {
        console.log(error.message, "==>error")
        res.status(500).json({ error: 'An error occurred while making the request to Yelp API.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
