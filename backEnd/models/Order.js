const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      qty: { type: Number, required: true, min: 1 }
    }
  ],
  totalPrice: { type: Number, required: true },
  discountApplied: { type: Boolean, default: false }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
