import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; 
import ProductItem from '../ProductItem';
import axios from 'axios';

const ProductsContainer = styled.div`
  margin-top: 8vh;
  padding: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Heading = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
`;

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding: 0;
`;

const ListItem = styled.li`
  background: #fff;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const api = 'http://localhost:5100/products';

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(api);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("adminJwtToken");
      if (!token) {
        alert("⚠️ No admin token found. Please log in as admin.");
        return;
      }

      await axios.delete(`${api}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("✅ Product deleted successfully");
      getData(); 
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <ProductsContainer>
      <Heading>Manage Products</Heading>
      <StyledList>
        {products.map(product => (
          <ListItem key={product._id}>
            <ProductItem
              id={product._id}
              img={product.image}
              name={product.productName}
              description={product.description}
              price={product.price}
              handleDeleteProduct={handleDeleteProduct}
            />
          </ListItem>
        ))}
      </StyledList>
    </ProductsContainer>
  );
};

export default AdminProducts;
