const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST /api/products
router.post('/', async (req, res) => {
  const { name, category, price, stock } = req.body;

  // Validation
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and must be a string.' });
  }

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Category is required and must be a string.' });
  }

  if (price === undefined || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Price is required and must be a number greater than 0.' });
  }

  if (stock === undefined || !Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({ error: 'Stock is required and must be a non-negative integer.' });
  }

  try {
    const product = new Product({ name, category, price, stock });
    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product added to DB', product: savedProduct });
  } catch (err) {
    console.error('Error saving product:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products

// this rows for testing in postman
// /api/products?search=phone&category=Electronics
// /api/products?minPrice=100&maxPrice=1400&sortBy=price&order=asc
// http://localhost:3000/api/products?page=1&limit=5

router.get('/', async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortQuery = {};
    sortQuery[sortBy] = sortOrder;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      products
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
