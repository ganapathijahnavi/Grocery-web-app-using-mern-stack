const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./src/routes/auth");
const categoryRoutes = require('./src/routes/category');
const productRoutes = require('./src/routes/products');
const cartRoutes = require('./src/routes/cart');
const orderRoutes = require('./src/routes/orders');
const adminRoutes = require('./src/routes/admin');     
const userRoutes = require('./src/routes/users');  
// const paymentsRoutes = require('./src/routes/payments');



// Mount routes
app.use("/", authRoutes);
app.use('/category', categoryRoutes);
app.use('/products', productRoutes);
app.use('/', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/users',userRoutes );

// app.use('/payments', paymentsRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("MongoDB Error:", err));

// Health route
app.get("/", (req, res) => {
  res.send("ShopSmart API is running...");
});

// Start server
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
