const { healthCheck } = require('./controllers/healthCheck'),
  articleController = require('./controllers/articles');

exports.init = app => {
  app.get('/health', [], healthCheck);

  // articles
  app.get('/articles', articleController.getArticles);
  app.get('/articles/:id', articleController.getArticleById);
  app.put('/articles/:id', articleController.replaceArticleById); // because its idempotent
  app.post('/articles', articleController.createArticle);
};
