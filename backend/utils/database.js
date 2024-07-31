const mongoose = require('mongoose');
const axios = require('axios').default;
const Transaction = require('../models/transaction');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB database connected...');

    await seedDatabase();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await Transaction.deleteMany({});
    console.log('Database cleared...');

    const { data } = await axios.get(
      'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
    );

    await Transaction.insertMany(data);
    console.log('Database seeded...');
  } catch (error) {
    console.log('Error seeding database:', error);
  }
};

module.exports = connectDB;
