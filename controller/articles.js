const Article = require("../models/articles");
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require("../utils/errors");

const getArticles = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const articles = await Article.find({ userId }).lean();
    res.send(articles);
  } catch (err) {
    next(err);
  }
};

const saveArticle = async (req, res, next) => {
  try {
    const {
      name,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
    } = req.body;
    const owner = req.user._id;
    const article = await Article.create({
      name,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
      owner,
    });
    res.status(201).json(article);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Validation Failed"));
    }
    if (err.code === 11000) {
      return next(new ConflictError("Duplicate article already saved"));
    }
    return next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new BadRequestError("Invalid item ID format"));
    }

    const deletedArticle = await Article.findOneAndDelete({
      _id: id,
      owner: userId,
    }).lean();

    if (!deletedArticle) {
      return next(
        new NotFoundError("Article not found or you do not have permission")
      );
    }
    return res.status(200).json({ message: "Article deleted successfully"});
  } catch (err) {
    return next(err);
  }
};

module.exports = { getArticles, saveArticle, deleteArticle };
