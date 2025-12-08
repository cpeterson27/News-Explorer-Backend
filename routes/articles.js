const articleRoute = require('express').Router();
const auth = require('../middleware/auth');
const { validateArticle } = require("../middleware/validation");
const { getArticles, saveArticle, deleteArticle } = require("../controller/articles");

articleRoute.get('/articles',auth, getArticles);
articleRoute.post('/articles', auth, validateArticle, saveArticle);
articleRoute.delete('/articles/:id', auth, deleteArticle);

module.exports = articleRoute;