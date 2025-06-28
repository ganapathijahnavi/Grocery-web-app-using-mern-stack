const express = require("express");
const router = express.Router();
const { Category } = require("../models/schema");

// @route   POST /category
// @desc    Add a new category
// @access  Public (can be secured with admin auth)
router.post("/", async (req, res) => {
  try {
    let { category, description } = req.body;

    if (!category || typeof category !== 'string') {
      return res.status(400).json({ message: "Category name is required and must be a string" });
    }

    category = category.trim();
    description = (description || '').trim();

    // Check for duplicate
    const existing = await Category.findOne({ category: { $regex: `^${category}$`, $options: 'i' } });
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ category, description });
    await newCategory.save();

    res.status(201).json({
      message: "✅ Category added successfully",
      category: newCategory
    });
  } catch (error) {
    console.error("Error adding category:", error.message);
    res.status(500).json({ message: "Server error while adding category" });
  }
});

// @route   GET /category
// @desc    Get all categories (only _id and name returned)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({}, { _id: 1, category: 1 })
      .sort({ createdAt: -1 });

    // Convert to expected format { _id, name }
    const simplified = categories.map(cat => ({
      _id: cat._id,
      name: cat.category,
    }));

    res.status(200).json(simplified);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Server error while fetching categories" });
  }
});

module.exports = router;
