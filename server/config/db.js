const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tripwise';
    if (!process.env.MONGO_URI || mongoUri.includes('<db_password>')) {
      process.env.USE_LOCAL_AUTH_STORE = 'true';
      console.warn('MongoDB is not configured. Auth will use server/data/local-users.json for local development.');
      return;
    }

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.env.USE_LOCAL_AUTH_STORE = 'true';
    console.warn('Continuing with local auth storage for this run.');
  }
};

module.exports = connectDB;
