// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const statsRouter = require('./routes/stats');


app.use(cors());
// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/storeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/stats', statsRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
