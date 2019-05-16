const articleService = require('../services/articles'),
  { notFound } = require('../errors');

exports.createArticle = async (req, res, next) => {
  try {
    const article = await articleService.createArticle(req.body);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await articleService.getArticles();
    res.send(articles);
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (article) {
      res.send(article);
    } else {
      throw notFound;
    }
  } catch (err) {
    next(err);
  }
};

exports.replaceArticleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const article = await articleService.replaceArticle(id, req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
