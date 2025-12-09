const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { q, from, to, sortBy = 'publishedAt' } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('NewsAPI request failed');
    }

    const newsData = await response.json();
    res.json(newsData);
  } catch (error) {
    console.error('News API error:', error);
    res.status(500).json({ message: 'Failed to fetch news data' });
  }
});

module.exports = router;