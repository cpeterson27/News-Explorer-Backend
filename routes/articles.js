const articleRoute = require('express').Router();
const auth = require('../middleware/auth');
const { validateArticle } = require("../middleware/validation");
const { getSavedArticles, saveArticle, deleteArticle, getArticle } = require("../controller/articles");

articleRoute.get('/',auth, getSavedArticles);
articleRoute.post('/', auth, validateArticle, saveArticle);
articleRoute.delete('/:id', auth, deleteArticle);

module.exports = articleRoute;