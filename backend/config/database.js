const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const connectDB = async () => {
  try {
    // Verificar que las variables existen
    console.log('Variables:', {
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      db: process.env.MONGO_DB
    });

    const uri = 'mongodb://localhost:27017/muralDigital';
    await mongoose.connect(uri);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;