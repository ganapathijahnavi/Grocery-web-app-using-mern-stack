const mongoose = require('mongoose');

// ✅ User Schema
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

// ✅ Category Schema
const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  description: String
}, { timestamps: true });

// ✅ Product Schema
const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  countInStock: { type: Number, required: true },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

// ✅ Cart Schema
const addToCartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, default: 1, min: 1 }
}, { timestamps: true });

// ✅ Order Schema — with user reference
const orderSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: String,
  address: String,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: String,
  quantity: Number,
  price: Number,
  paymentMethod: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    default: 'Processing'
  }
}, { timestamps: true });

// ✅ Payment Schema
const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  deliveryStatus: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Success', 'Failed'], default: 'Pending' }
}, { timestamps: true });

// ✅ Feedback Schema
const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true }
}, { timestamps: true });

// ✅ Export all models
const models = {
  Users: mongoose.model('User', userSchema),
  Category: mongoose.model('Category', categorySchema),
  Product: mongoose.model('Product', productSchema),
  AddToCart: mongoose.model('AddToCart', addToCartSchema),
  Order: mongoose.model('Order', orderSchema), // ✅ Corrected export here
  Payment: mongoose.model('Payment', paymentSchema),
  Feedback: mongoose.model('Feedback', feedbackSchema)
};

module.exports = models;
