const dotenv = require('dotenv');
dotenv.config({ path: './src/config/.env' });
const connectDB = require('./db');

module.exports = {
  mode: process.env.NODE_ENV,
  port: process.env.PORT || 3333,
  dbUrl: process.env.MONGODB_URL,
  connectDB,
};
