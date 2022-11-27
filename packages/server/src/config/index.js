import dotenv from 'dotenv'
import path from 'path'

const root = process.cwd();
dotenv.config({ path: path.join(root, '.env') });

const config = {
  mode: process.env.NODE_ENV,
  port: process.env.PORT || 3333,
  host: process.env.HOST,
  dbUrl: process.env.MONGODB_URL,
  client: process.env.CLIENT_URL,
};

export default config
