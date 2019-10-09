const dotenv = require('dotenv');
dotenv.config({ path: './src/config/.env' });

module.exports = {
  mongodb_uri: process.env.MONGODB_URI
};
