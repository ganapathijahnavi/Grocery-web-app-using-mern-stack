import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 900px;
  margin: 100px auto;
  padding: 2rem;
  background: linear-gradient(to bottom right, #e3f2fd, #f1f8e9);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
`;

const Heading = styled.h2`
  text-align: center;
  color: #2e7d32;
  font-size: 2.2rem;
  margin-bottom: 2rem;
`;

const OrderCard = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #ffffff;
  align-items: flex-start;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
`;

const OrderDetails = styled.div`
  flex: 1;
`;

const Field = styled.p`
  margin: 6px 0;
  font-size: 15px;
  color: #444;

  strong {
    color: #2c3e50;
  }
`;

const NoOrders = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 3rem;
  color: #888;
`;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('⚠️ No user token found');
      return;
    }

    axios.get('http://localhost:5100/orders/my-orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrders(res.data))
    .catch(err =>
      console.error(' Error fetching orders:', err.response?.data || err.message)
    );
  }, []);

  return (
    <Container>
      <Heading>📦 My Order History</Heading>
      {orders.length === 0 ? (
        <NoOrders>No orders yet.</NoOrders>
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id}>
            <ProductImage
              src={order.productId?.image || 'https://via.placeholder.com/120'}
              alt={order.productName}
            />
            <OrderDetails>
              <Field><strong>Product:</strong> {order.productId?.productName || order.productName}</Field>
              <Field><strong>Order ID:</strong> {order._id}</Field>
              <Field><strong>Quantity:</strong> {order.quantity}</Field>
              <Field><strong>Price:</strong> ₹{order.price}</Field>
              <Field><strong>Payment:</strong> {order.paymentMethod}</Field>
              <Field><strong>Status:</strong> {order.status}</Field>
              <Field><strong>Address:</strong> {order.address}</Field>
              <Field><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</Field>
            </OrderDetails>
          </OrderCard>
        ))
      )}
    </Container>
  );
};

export default MyOrders;
