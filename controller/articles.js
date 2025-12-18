const mongoose = require('mongoose');
const Article = require('../models/articles');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require('../utils/errors');

const getSavedArticles = async (req, res, next) => {
  try {
    const owner = req.user._id;
    // add orFail later if needed
    const articles = await Article.find({ owner }).lean();
    console.log(articles);
    res.send(articles);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const saveArticle = async (req, res, next) => {
  try {
    const {
      keyword,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
      source,
    } = req.body;
    const owner = req.user._id;
    const article = await Article.create({
      keyword,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
      owner,
      source,
    });
    res.status(201).json(article);
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Validation Failed'));
    }
    if (err.code === 11000) {
      return next(new ConflictError('Duplicate article already saved'));
    }
    return next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError('Invalid item ID format'));
    }

    const deletedArticle = await Article.findOneAndDelete({
      _id: id,
      owner: userId,
    }).lean();

    if (!deletedArticle) {
      return next(
        new NotFoundError('Article not found or you do not have permission'),
      );
    }
    return res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getSavedArticles, saveArticle, deleteArticle };
