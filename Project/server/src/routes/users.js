const express = require('express');
const router = express.Router();
const models = require('../models/schema');
const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/', verifyAdmin, async (req, res) => {
  try {
    const users = await models.Users.find(); 
    console.log("✅ Found users:", users);   
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});


module.exports = router;
