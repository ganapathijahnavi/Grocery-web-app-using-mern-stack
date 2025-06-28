import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
    rating: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5100/products/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Failed to load product data");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminJwtToken");
      await axios.put(`http://localhost:5100/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('✅ Product updated successfully');
      navigate('/admin/all-products');
    } catch (err) {
      console.error(' Error updating product:', err.response?.data || err.message);
      alert('Failed to update product');
    }
  };

  const renderInput = (label, name, type = "text") => (
    <div style={{ marginBottom: '1rem' }}>
      <label><b>{label}</b></label><br />
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        style={{ width: '100%', padding: '8px' }}
      />
    </div>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {renderInput("Product Name", "productName")}
        {renderInput("Description", "description")}
        {renderInput("Price", "price", "number")}
        {renderInput("Image URL", "image")}
        {renderInput("Category", "category")}
        {renderInput("Count In Stock", "countInStock", "number")}
        {renderInput("Rating", "rating", "number")}
        <button type="submit" style={{ padding: '10px 20px' }}>Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
