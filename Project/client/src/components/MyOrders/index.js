import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #f0faff, #ffffff);
  padding: 100px 1rem 2rem; 
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
`;

const Heading = styled.h2`
  font-size: 32px;
  color: #1e1e1e;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OrderItem = styled.li`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const TopSection = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid #eee;
`;

const Info = styled.div`
  flex: 1;
`;

const Field = styled.p`
  margin: 6px 0;
  font-size: 15px;
  color: #333;
  span {
    font-weight: 600;
    color: #000;
  }
`;

const TrackBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#fff' : '#666')};
  background-color: ${({ active }) => (active ? '#28a745' : '#d0d0d0')};
  padding: 6px 10px;
  border-radius: 20px;
  margin: 0 6px;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    height: 3px;
    width: 24px;
    background: ${({ active }) => (active ? '#28a745' : '#ccc')};
    z-index: 1;
  }
`;

const NoOrders = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 3rem;
  color: #888;
`;

const steps = ['Confirmed', 'Shipped', 'Delivered'];

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return;

    axios
      .get('http://localhost:5100/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) =>
        console.error('Error fetching orders:', err.response?.data || err.message)
      );
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  };

  return (
    <PageWrapper>
      <Container>
        <Heading>📦 My Orders</Heading>
        {orders.length === 0 ? (
          <NoOrders>No orders placed yet.</NoOrders>
        ) : (
          <OrderList>
            {orders.map((order) => (
              <OrderItem key={order._id}>
                <TopSection>
                  {order.productId?.image && (
                    <Image src={order.productId.image} alt="Product" />
                  )}
                  <Info>
                    <Field><span>Product:</span> {order.productId?.productName || order.productName}</Field>
                    <Field><span>Order ID:</span> {order._id}</Field>
                    <Field><span>Name:</span> {order.firstname} {order.lastname}</Field>
                    <Field><span>Phone:</span> {order.phone}</Field>
                    <Field><span>Date:</span> {formatDate(order.createdAt)}</Field>
                    <Field><span>Price:</span> ₹{order.price}</Field>
                    <Field><span>Status:</span> {order.status}</Field>
                    <Field><span>Payment:</span> {order.paymentMethod}</Field>
                  </Info>
                </TopSection>

                
                <TrackBar>
                  {steps.map((step, index) => (
                    <Step
                      key={step}
                      active={steps.indexOf(order.status) >= index}
                    >
                      {step}
                    </Step>
                  ))}
                </TrackBar>
              </OrderItem>
            ))}
          </OrderList>
        )}
      </Container>
    </PageWrapper>
  );
};

export default MyOrders;
