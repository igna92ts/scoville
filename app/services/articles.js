const Article = require('../models/article'),
  { databaseError } = require('../errors');

exports.createArticle = payload => {
  const article = new Article(payload);
  return article.save().catch(err => {
    throw databaseError(err);
  });
};

exports.getArticles = () => {
  return Article.find();
};

exports.getArticleById = id => {
  return Article.findById(id);
};

exports.replaceArticle = async (id, payload) => {
  const article = await exports.getArticleById(id);
  return article.set(payload);
};
