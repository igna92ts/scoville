const express = require('express'),
  mongoose = require('mongoose'),
  expressPino = require('express-pino-logger'),
  bodyParser = require('body-parser'),
  logger = require('./app/logger'),
  config = require('./config'),
  routes = require('./app/routes'),
  errors = require('./app/middlewares/errors'),
  DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024 * 10,
  DEFAULT_PARAMETER_LIMIT = 10000;

const bodyParserJsonConfig = () => ({
  parameterLimit: config.common.api.parameterLimit || DEFAULT_PARAMETER_LIMIT,
  limit: config.common.api.bodySizeLimit || DEFAULT_BODY_SIZE_LIMIT
});

const bodyParserUrlencodedConfig = () => ({
  extended: true,
  parameterLimit: config.common.api.parameterLimit || DEFAULT_PARAMETER_LIMIT,
  limit: config.common.api.bodySizeLimit || DEFAULT_BODY_SIZE_LIMIT
});

const app = express();
const port = config.common.api.port || 8080;

app.use(bodyParser.json(bodyParserJsonConfig()));
app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig()));

const { database: dbConfig } = config.common;
mongoose.connect(
  `mongodb://${dbConfig.host}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`,
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', err => logger.error(err));
db.once('open', () => {
  console.log('database connected');
});

app.use(expressPino({ logger }));
routes.init(app);
app.use(errors.handle);
app.listen(port);
logger.info(`Listening on port: ${port}`);

module.exports = app;
