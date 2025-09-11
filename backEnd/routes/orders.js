const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

// POST /api/orders
router.post('/', async (req, res) => {
  const { items, discountCode } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items array is required and must not be empty.' });
  }

  let total = 0;
  const orderItems = [];

  try {
    for (const item of items) {
      const { productId, qty } = item;

      if (!productId || !qty || qty <= 0) {
        throw new Error('Each item must have a valid productId and qty > 0.');
      }

      const product = await Product.findById(productId);
      if (!product) {
        throw new Error(`Product not found: ${productId}`);
      }

      if (product.stock < qty) {
        throw new Error(`Not enough stock for product: ${product.name}`);
      }

      // Calculate price
      total += product.price * qty;

      // Reduce stock
      product.stock -= qty;
      await product.save();

      orderItems.push({
        product: product._id,
        qty
      });
    }

    // Apply discount
    let discountApplied = false;
    if (discountCode === 'SAVE5') {
      total *= 0.95;
      discountApplied = true;
    }

    // Save order
    const order = new Order({
      items: orderItems,
      totalPrice: parseFloat(total.toFixed(2)),
      discountApplied
    });

    const savedOrder = await order.save();


    res.status(201).json({ message: 'Order placed', order: savedOrder });
  } catch (err) {
    console.error('Order error:', err);
    res.status(400).json({ error: err.message });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  const orderId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ error: 'Invalid order ID format' });
  }

  try {
    const order = await Order.findById(orderId)
      .populate('items.product', 'name category price') // get product details
      .lean(); // return plain JS object

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
