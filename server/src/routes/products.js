const express = require('express');
const router = express.Router();
const models = require('../models/schema');
const verifyAdmin = require('../middleware/verifyAdmin');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await models.Product.find().populate('category', 'category');
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await models.Product.findById(req.params.id).populate('category', 'category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(' Error fetching product:', err);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
});

// CREATE product (admin only)
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const {
      productName,  // must match frontend exactly
      description,
      price,
      image,
      category,
      countInStock,
      rating
    } = req.body;

    if (!productName || !description || !price || !image || !category || !countInStock) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const categoryDoc = await models.Category.findOne({ category });
    if (!categoryDoc) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const newProduct = new models.Product({
      productName,
      description,
      price,
      image,
      countInStock,
      rating: rating || 0,
      category: categoryDoc._id,
    });

    await newProduct.save();
    res.status(201).json({
      message: '✅ Product created successfully',
      product: newProduct
    });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// UPDATE product (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const updateData = req.body;

    // Convert category name to ObjectId if it's a string
    if (updateData.category && typeof updateData.category === 'string') {
      const categoryDoc = await models.Category.findOne({ category: updateData.category });
      if (!categoryDoc) {
        return res.status(404).json({ message: 'Category not found' });
      }
      updateData.category = categoryDoc._id;
    }

    const updated = await models.Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: '✅ Product updated successfully', product: updated });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Server error while updating product' });
  }
});

// DELETE product (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const deleted = await models.Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: '🗑️ Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
});

module.exports = router;
