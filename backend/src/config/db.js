const mongoose = require('mongoose');

async function connectDB() {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URL}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(
      `Database Connection on ${connection.connection.host} has been established successfully!`
    );
  } catch (error) {
    console.error(error.message);
    throw new Error(error);
  }
}

module.exports = connectDB;
