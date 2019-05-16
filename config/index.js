const ENVIRONMENT = process.env.NODE_ENV || 'development';

if (ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

const configFile = `./${ENVIRONMENT}`;

const config = {
  common: {
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
      parameterLimit: process.env.API_PARAMETER_LIMIT,
      port: process.env.PORT
    },
    database: {
      name: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    }
  }
};

const customConfig = require(configFile).config;
module.exports = { ...config, ...customConfig };
