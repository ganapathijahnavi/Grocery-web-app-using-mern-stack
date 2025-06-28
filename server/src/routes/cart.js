const express = require('express');
const router = express.Router();
const models = require('../models/schema');
const jwt = require('jsonwebtoken');

//  Auth Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

// GET /my-cart
router.get('/my-cart', verifyToken, async (req, res) => {
  try {
    const cartItems = await models.AddToCart.find({ userId: req.user.id }).populate('productId');
    res.status(200).json(cartItems);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Failed to load cart' });
  }
});

// POST /add-to-cart
router.post('/add-to-cart', verifyToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await models.Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cartItem = new models.AddToCart({
      userId: req.user.id,
      productId,
      productName: product.productName,
      quantity,
    });

    await cartItem.save();
    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Error adding to cart' });
  }
});


// Change the route path
router.delete('/remove-from-cart/:cartItemId', verifyToken, async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const deleted = await models.AddToCart.deleteOne({
      _id: cartItemId,
      userId: req.user.id,
    });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (err) {
    console.error('Error removing cart item:', err);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
});


module.exports = router;
