const articleRoute = require('express').Router();
const auth = require('../middleware/auth');
const { validateArticle } = require("../middleware/validation");
const { getArticles, saveArticle, deleteArticle } = require("../controller/articles");

articleRoute.get('/',auth, getArticles);
articleRoute.post('/', auth, validateArticle, saveArticle);
articleRoute.delete('/:id', auth, deleteArticle);

module.exports = articleRoute;