const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const models = require('../models/schema');
const verifyAdmin = require('../middleware/verifyAdmin');

//  Middleware to verify USER token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = { _id: decoded.id };
    next();
  });
};

// ADMIN: Get all orders
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const orders = await models.Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to load all orders' });
  }
});

// USER: Get their own orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await models.Order.find({ user: req.user._id })
      .populate('productId', 'productName image price')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to load orders' });
  }
});

// USER: Place order (Buy Now or Cart)
router.post('/place-order', verifyToken, async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phone,
      address,
      items,
      paymentMethod,
      productId,
      quantity
    } = req.body;

    if (!firstname || !lastname || !phone || !address || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    let savedOrders = [];

    // Buy Now Order
    if (productId && quantity) {
      const product = await models.Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const deliveryCharge = paymentMethod === 'Cash on Delivery' ? 50 : 0;
      const totalPrice = product.price * quantity + deliveryCharge;

      const order = new models.Order({
        firstname,
        lastname,
        phone,
        address,
        productId,
        productName: product.productName,
        quantity,
        price: totalPrice,
        paymentMethod,
        user: req.user._id
      });

      const savedOrder = await order.save();
      savedOrders.push(savedOrder);
    }

    // Cart Orders
    if (Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        const { productId, quantity } = item;
        if (!productId || !quantity) continue;

        const product = await models.Product.findById(productId);
        if (!product) continue;

        const deliveryCharge = paymentMethod === 'Cash on Delivery' ? 50 : 0;
        const totalPrice = product.price * quantity + deliveryCharge;

        const order = new models.Order({
          firstname,
          lastname,
          phone,
          address,
          productId,
          productName: product.productName,
          quantity,
          price: totalPrice,
          paymentMethod,
          user: req.user._id
        });

        const savedOrder = await order.save();
        savedOrders.push(savedOrder);
      }
    }

    if (savedOrders.length === 0) {
      return res.status(400).json({ message: 'No valid orders created' });
    }

    res.status(201).json({ message: 'Order(s) placed successfully', orders: savedOrders });
  } catch (err) {
    console.error('Place order error:', err);
    res.status(500).json({ message: 'Order creation failed', error: err.message });
  }
});

// ✅ ADMIN: Update order status
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const updated = await models.Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.error('Update order error:', err);
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
});

module.exports = router;
