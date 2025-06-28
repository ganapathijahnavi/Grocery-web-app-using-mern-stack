import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PaymentContainer,
  Heading,
  PaymentInfo,
  Label,
  Value,
  ButtonContainer,
  ConfirmButton,
  CancelButton,
  PaymentSelect
} from './styledComponents';
import axios from 'axios';

const Payments = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [userDetails] = useState({
    firstname: 'Test',
    lastname: 'User',
    phone: '9999999999',
    address: 'India'
  });

  //  Load cart items on mount
  const fetchCart = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const res = await axios.get('http://localhost:5100/my-cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    } catch (err) {
      console.error('Error loading cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  //  Remove individual item
  const handleRemoveItem = async (productId) => {
    const token = localStorage.getItem('jwtToken');
    try {
      await axios.delete(`http://localhost:5100/remove-from-cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(prev => prev.filter(item => item.productId._id !== productId));
    } catch (err) {
      console.error('Error removing item from cart:', err);
      alert('Failed to remove item');
    }
  };

  //  Calculate total amount
  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    return paymentMethod === 'Cash on Delivery' ? subtotal + 50 : subtotal;
  };

  // Confirm and place order
  const handleConfirm = async () => {
    const token = localStorage.getItem('jwtToken');

    if (!cartItems.length) {
      alert("🛒 Cart is empty. Cannot place order.");
      return;
    }

    const items = cartItems.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity
    }));

    try {
      await axios.post(
        'http://localhost:5100/orders/place-order',
        {
          ...userDetails,
          items,
          paymentMethod
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Clear cart after order
      await axios.delete('http://localhost:5100/clear-cart', {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`✅ Order placed with ${paymentMethod}. Total: ₹${calculateTotal()}`);
      navigate('/my-orders');
    } catch (err) {
      console.error('Order failed:', err.response?.data || err.message);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <PaymentContainer>
      <Heading>Confirm Your Payment</Heading>

      {cartItems.map(item => (
        <PaymentInfo key={item._id}>
          <Label>{item.productName} (x{item.quantity}):</Label>
          <Value>₹{item.productId.price * item.quantity}</Value>
          <button onClick={() => handleRemoveItem(item.productId._id)}>Remove</button>
        </PaymentInfo>
      ))}

      <PaymentInfo>
        <Label>Amount:</Label>
        <Value>₹{calculateTotal()}</Value>
      </PaymentInfo>

      <PaymentInfo>
        <Label>Method:</Label>
        <PaymentSelect
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
        >
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Net Banking</option>
        </PaymentSelect>
      </PaymentInfo>

      <PaymentInfo>
        <Label>Delivery:</Label>
        <Value>
          {paymentMethod === 'Cash on Delivery' ? '₹50 (COD Charges)' : 'Free'}
        </Value>
      </PaymentInfo>

      <ButtonContainer>
        <ConfirmButton onClick={handleConfirm}>Proceed to Pay</ConfirmButton>
        <CancelButton onClick={() => navigate('/my-cart')}>Cancel</CancelButton>
      </ButtonContainer>
    </PaymentContainer>
  );
};

export default Payments;
