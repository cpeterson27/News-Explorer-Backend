const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { q, from, to, sortBy = 'publishedAt' } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('News API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch news data' });
  }
});

module.exports = router;