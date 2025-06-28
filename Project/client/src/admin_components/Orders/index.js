import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LoaderSpinner from '../../components/LoaderSpinner';

const Wrapper = styled.div`
  margin-top: 10vh;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #3e3e3e;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Field = styled.p`
  margin: 0.25rem 0;
  color: #444;
  font-size: 15px;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const UpdateButton = styled.button`
  background-color: #625afc;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  width: 150px;
  transition: 0.3s;

  &:hover {
    background-color: #4f48dc;
  }
`;

const DisabledButton = styled.button`
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  color: white;
  background-color: ${props => props.type === 'danger' ? '#e74c3c' : '#2ecc71'};
  cursor: not-allowed;
`;

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [statusForm, setStatusForm] = useState({ status: 'Confirmed' });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const token = localStorage.getItem('adminJwtToken');
    if (!token) return;

    axios.get('http://localhost:5100/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => setData(response.data))
    .catch((error) => console.error('Error fetching orders:', error.response?.data || error.message));
  };

  const onSubmit = (formData) => {
    const token = localStorage.getItem('adminJwtToken');
    axios.put(`http://localhost:5100/orders/${selectedOrderId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setIsUpdate(false);
      getData();
    })
    .catch(console.log);
  };

  const onChangeStatus = (orderId) => {
    setIsUpdate(true);
    setSelectedOrderId(orderId);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <LoaderSpinner />
        </div>
      ) : (
        <div>
          <Title>Orders</Title>

          {data.length === 0 ? (
            <div style={{ textAlign: 'center' }}>
              <img src="https://img.freepik.com/free-vector/black-friday-concept-illustration_114360-3667.jpg" alt="No Orders" style={{ maxWidth: '100%', height: 'auto' }} />
              <h3 style={{ marginTop: '1rem', color: '#3e3e3e' }}>No Orders</h3>
              <p style={{ color: '#787878' }}>No orders in your shop!</p>
            </div>
          ) : (
            <>
              {isUpdate && (
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(statusForm); }} style={{ marginBottom: '2rem' }}>
                  <div className="form-group">
                    <label htmlFor="statusSelect">Select Status</label>
                    <select
                      className="form-control"
                      id="statusSelect"
                      value={statusForm.status}
                      onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">Save Changes</button>
                </form>
              )}

              {!isUpdate && data.map((item) => (
                <Card key={item._id}>
                  <Field><strong>Order ID:</strong> {item._id}</Field>
                  <Field><strong>Fullname:</strong> {item.firstname} {item.lastname}</Field>
                  <Field><strong>Phone:</strong> {item.phone}</Field>
                  <Field><strong>Product ID:</strong> {item.productId}</Field>
                  <Field><strong>Quantity:</strong> {item.quantity}</Field>
                  <Field><strong>Total price:</strong> ₹{item.price}</Field>
                  <Field><strong>Payment Method:</strong> {item.paymentMethod}</Field>
                  <Field><strong>Address:</strong> {item.address}</Field>
                  <Field><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</Field>

                  <StatusRow>
                    <Field><strong>Status:</strong> {item.status}</Field>
                    {item.status === 'Canceled' ? (
                      <DisabledButton type="danger">Customer Canceled</DisabledButton>
                    ) : item.status === 'Delivered' ? (
                      <DisabledButton type="success">Delivered</DisabledButton>
                    ) : (
                      <UpdateButton onClick={() => onChangeStatus(item._id)}>
                        Update status
                      </UpdateButton>
                    )}
                  </StatusRow>
                </Card>
              ))}
            </>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Orders;
