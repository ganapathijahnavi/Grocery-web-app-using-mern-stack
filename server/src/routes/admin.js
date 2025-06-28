const express = require('express');
const router = express.Router();
const models = require('../models/schema');

router.get('/summary', async (req, res) => {
  try {
    const productCount = await models.Product.countDocuments();
    const userCount = await models.Users.countDocuments(); // count all users
    const orderCount = await models.Order.countDocuments();

    res.json({ productCount, userCount, orderCount });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ message: 'Error fetching summary', error: error.message });
  }
});

module.exports = router;
