import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 3rem;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 15px;
  color: #34495e;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: 0.3s;

  &:focus {
    border-color: #22aaff;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;

  &:focus {
    border-color: #22aaff;
    outline: none;
  }
`;

const Button = styled.button`
  grid-column: span 2;
  background-color: #22aaff;
  color: white;
  padding: 16px;
  font-size: 17px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0d91e4;
  }
`;

const ProductSummary = styled.div`
  background-color: #f7fbff;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  border-left: 5px solid #22aaff;
  border-radius: 10px;
`;

const ProductLine = styled.p`
  margin: 6px 0;
  font-size: 16px;
  color: #2c3e50;
`;

const TotalHighlight = styled.div`
  grid-column: span 2;
  background: #e8f6ff;
  border: 1px dashed #22aaff;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  font-size: 18px;
  font-weight: bold;
  color: #1a5276;
`;

// ✅ Component
const Checkout = () => {
  const { id } = useParams(); // product ID if from Buy Now
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');

  const [product, setProduct] = useState(null);         // for Buy Now
  const [cartItems, setCartItems] = useState([]);       // for Cart
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    quantity: 1,
    paymentMethod: 'Cash on Delivery',
  });

  useEffect(() => {
    if (!token) return;

    if (id) {
      // From Buy Now
      axios.get(`http://localhost:5100/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error('Product fetch error:', err));
    } else {
      // From Cart
      axios.get('http://localhost:5100/my-cart', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setCartItems(res.data))
        .catch(err => console.error('Cart fetch error:', err));
    }
  }, [id, token]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!token) return alert('Please log in');

    try {
      const payload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
      };

      if (id) {
        // Buy Now
        payload.productId = product._id;
        payload.quantity = formData.quantity;
      } else {
        // Cart Checkout
        payload.items = cartItems.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity
        }));
      }

      await axios.post('http://localhost:5100/orders/place-order', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('🎉 Order placed successfully!');
      navigate('/my-orders');
    } catch (err) {
      console.error(' Order failed:', err.response?.data || err.message);
      alert(`Failed to place order: ${err.response?.data?.message || 'Server error'}`);
    }
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + item.productId?.price * item.quantity;
    }, 0);
  };

  return (
    <Container>
      <Title>Complete Your Order</Title>

      {id && product ? (
        <ProductSummary>
          <ProductLine><strong>Product:</strong> {product.productName}</ProductLine>
          <ProductLine><strong>Price:</strong> ₹{product.price}</ProductLine>
          <ProductLine><strong>In Stock:</strong> {product.countInStock}</ProductLine>
        </ProductSummary>
      ) : (
        cartItems.length > 0 && (
          <ProductSummary>
            <ProductLine><strong>Items:</strong> {cartItems.length}</ProductLine>
            <ProductLine><strong>Total Price:</strong> ₹{calculateCartTotal()}</ProductLine>
          </ProductSummary>
        )
      )}

      <Form onSubmit={handleOrder}>
        <FormGroup>
          <Label>First Name</Label>
          <Input name="firstname" value={formData.firstname} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Last Name</Label>
          <Input name="lastname" value={formData.lastname} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Phone Number</Label>
          <Input name="phone" value={formData.phone} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Shipping Address</Label>
          <Input name="address" value={formData.address} onChange={handleChange} required />
        </FormGroup>

        {id && (
          <FormGroup>
            <Label>Quantity</Label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              max={product?.countInStock}
              required
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label>Payment Method</Label>
          <Select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
          </Select>
        </FormGroup>

        <TotalHighlight>
          Total: ₹{id && product ? product.price * formData.quantity : calculateCartTotal()}
        </TotalHighlight>

        <Button type="submit">Place Order</Button>
      </Form>
    </Container>
  );
};

export default Checkout;
