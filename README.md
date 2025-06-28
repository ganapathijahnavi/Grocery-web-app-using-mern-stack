# Shopsmart Grocery-web-app-using-mern-stack

**ShopSmart** is a full-featured online grocery shopping web app built using the MERN stack (MongoDB, Express.js, React, Node.js). It enables users to browse and purchase groceries, while giving admins full control over product, order, and user management.

---

## 🎬 Demo

📽 **Watch the Demo:**  
👉 [Click here to view the demo video](https://drive.google.com/file/d/1qYn32LyyFOldHh5VO0O_k39AUDzuvVr2/view)


##  Features

### 👤 User Features
- User registration and secure login (JWT auth)
- Browse products by category
- View product details
- Add to cart, view cart
- Place orders
- Select payment method: Cash on Delivery, UPI, or Net Banking
- View previous orders(History)

### 🔐 Admin Features
- Admin login with protected dashboard
- Add, update, and delete products
- View all users
- View all orders
- Manage all orders and payments

---

## 💻 Tech Stack

- **Frontend:** React, Styled Components, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT, bcryptjs
- **Payment Integration:** Razorpay (for UPI/NetBanking), Cash on Delivery

---

## 📁 Project Structure
    shopsmart/
    ├── client/ # React frontend
    │ ├── public/
    │ └── src/
    │ ├── components/ # User-facing components
    │ ├── admin_components/ # Admin dashboard components
    │ └── App.js
    ├── server/ # Express backend
    │ ├── models/ # Mongoose schemas
    │ ├── routes/ # API endpoints
    │ └── app.js # Main server file
    ├── .gitignore
    ├── README.md


---

## 🧪 Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git

---

## 🔧 Setup Instructions

### 1. **Clone the Repository**
      git clone https://github.com/ganapathijahnavi/Grocery-web-app-using-mern-stack.git
      cd Grocery-web-app-using-mern-stack

### 2. **Install Backend Dependencies**
      cd server
      npm install
      
### 3. **Install Frontend Dependencies**
    cd ../client
    npm install
    
### 4. **Run the App in Development**
    -Start backend 
    cd server
    npm run dev

### 5. **Run the React App **  
    -Start frontend
    cd ../client
    npm start



🙋‍♀️Author--> Jahnavi Durga Ganapathi, Feel free to connect or contribute!


