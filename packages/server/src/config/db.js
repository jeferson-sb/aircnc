import mongoose from 'mongoose'
import config from './index.js'

async function connectDB() {
  try {
    console.log('conn url', config.dbUrl)
    const connection = await mongoose.connect(`${config.dbUrl}`);

    console.log(
      `Database Connection on ${connection.connection.host} has been established successfully!`
    );
  } catch (error) {
    console.error(error.message);
    throw new Error(error);
  }
}

export default connectDB;
