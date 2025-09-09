const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  { name: "Cola 330ml", category: "Beverages", price: 120, stock: 40 },
  { name: "Orange Juice 1L", category: "Beverages", price: 420, stock: 25 },
  { name: "Salted Chips", category: "Snacks", price: 90, stock: 100 },
  { name: "Chocolate Bar", category: "Snacks", price: 150, stock: 75 }
];

const MONGO_URI = 'mongodb://localhost:27017/storeDB';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany(); 
    await Product.insertMany(sampleProducts);
    console.log('Products seeded successfully.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
