const mongoose = require('mongoose');
const dotenv = require('dotenv').config(); 

const db = process.env.DATABASE_URL;
console.log('DATABASE_URL:', db); 

const connectDB = async () => {
  if (!db) {
    throw new Error('DATABASE_URL is not defined');
  }

  try {
    const connect = await mongoose.connect(db); 
  } catch (error) {
    throw error;
  }
};

module.exports = connectDB;
