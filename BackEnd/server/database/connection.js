const dotenv = require("dotenv").config({ encoding: "latin1", override: true });
const mongoose = require('mongoose');

const databaseUrl = process.env.DATABASE_URL;

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl);
    console.log('Database successfully connected');
  } catch (error) {
    console.error('Error in database connection', error);
    throw error; 
  }
};
