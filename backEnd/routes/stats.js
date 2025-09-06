const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// GET /api/stats/sales?start=2025-09-01&end=2025-09-06
router.get('/sales', async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: 'Start and end date are required (YYYY-MM-DD).' });
  }

  const startDate = new Date(start);
  const endDate = new Date(end);
  endDate.setDate(endDate.getDate() + 1); // include end date fully

  try {
    // 1. Daily Sales Totals
    const dailySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalSales: { $sum: "$totalPrice" }
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: "$_id",
          totalSales: 1,
          _id: 0
        }
      }
    ]);

    // 2. Top-Selling Category
    const categorySales = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          totalSold: { $sum: "$items.qty" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 },
      {
        $project: {
          category: "$_id",
          totalSold: 1,
          _id: 0
        }
      }
    ]);

    res.json({
      dailySales,
      topCategory: categorySales[0] || null
    });

  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
