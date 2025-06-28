const express = require("express");
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5100;
const { MONGO_URI } = require('./db/connect');
const models = require("./models/schema");
const categoryRoutes = require('./routes/category');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/category', categoryRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// JWT Middleware for Admin
const adminAuthenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');
  jwt.verify(token, 'ADMIN_SECRET_TOKEN', (err, user) => {
    if (err) return res.status(403).send('Forbidden');
    if (user.role !== 'admin') return res.status(403).send('Admin access only');
    req.user = user;
    next();
  });
};

// JWT Middleware for User
const userAuthenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).send('Invalid JWT Token');
    const decoded = jwt.verify(token, 'USER_SECRET_TOKEN');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await models.Users.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const secret = user.role === 'admin' ? 'ADMIN_SECRET_TOKEN' : 'USER_SECRET_TOKEN';

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      secret,
      { expiresIn: '1d' }
    );

    res.json({ user, token, role: user.role });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// REGISTER
app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const existing = await models.Users.findOne({ email });
    if (existing) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new models.Users({ firstname, lastname, username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('Successfully Registered');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// GET USERS (admin only)
app.get('/users', adminAuthenticateToken, async (req, res) => {
  try {
    const users = await models.Users.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// GET ALL PRODUCTS (public)
app.get('/products', async (req, res) => {
  try {
    const products = await models.Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET PRODUCT BY ID (public)
app.get('/products/:id', async (req, res) => {
  try {
    const product = await models.Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE PRODUCT (admin only)
app.post('/products', adminAuthenticateToken, async (req, res) => {
  try {
    const { productName, description, price, image, category, countInStock, rating } = req.body;
    if (!productName || !description || !price || !image || !category || !countInStock) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const categoryDoc = await models.Category.findOne({ category });
    if (!categoryDoc) return res.status(404).json({ message: 'Category not found' });

    const newProduct = new models.Product({
      productName,
      description,
      price,
      image,
      category: categoryDoc._id,
      countInStock,
      rating
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE PRODUCT (admin only)
app.put('/products/:id', adminAuthenticateToken, async (req, res) => {
  try {
    const updateData = req.body;
    const updatedProduct = await models.Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
});

// DELETE PRODUCT (admin only)
app.delete('/products/:id', adminAuthenticateToken, async (req, res) => {
  try {
    const deleted = await models.Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("🛒 ShopSmart backend API is running...");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

module.exports = app;
