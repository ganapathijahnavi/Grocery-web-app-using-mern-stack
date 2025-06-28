import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PageWrapper,
  CartWrapper,
  CartTitle,
  CartItem,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemQty,
  ItemPrice,
  RemoveButton,
  EmptyCart,
  Divider,
  CartFooter,
  SummaryBox,
  SummaryItem,
  CheckoutButton
} from './styledComponents';
import { useNavigate } from 'react-router-dom';

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const res = await axios.get('http://localhost:5100/my-cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const handleRemove = async (cartItemId) => {
    const token = localStorage.getItem('jwtToken');
    try {
      await axios.delete(`http://localhost:5100/remove-from-cart/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      alert('Error removing item from cart.');
    }
  };

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const payload = cartItems.map(item => ({
      productId: item.productId._id || item.productId,
      quantity: item.quantity
    }));

    localStorage.setItem("checkoutItems", JSON.stringify(payload));
    navigate('/order-details');
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.productId?.price || 0) * item.quantity;
  }, 0);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <PageWrapper>
      <CartWrapper>
        <CartTitle>🛒 Your Shopping Cart</CartTitle>
        {cartItems.length === 0 ? (
          <EmptyCart>Your cart is empty.</EmptyCart>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem key={item._id}>
                <ItemImage src={item.productId?.image} alt={item.productName} />
                <ItemDetails>
                  <ItemName>{item.productName}</ItemName>
                  <ItemQty>Qty: {item.quantity}</ItemQty>
                  <ItemPrice>₹{item.productId?.price}</ItemPrice>
                </ItemDetails>
                <RemoveButton onClick={() => handleRemove(item._id)}>✖</RemoveButton>
              </CartItem>
            ))}
            <Divider />
            <CartFooter>
              <SummaryBox>
                <SummaryItem><strong>Total Items:</strong> {cartItems.length}</SummaryItem>
                <SummaryItem><strong>Total Quantity:</strong> {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</SummaryItem>
                <SummaryItem><strong>Total Price:</strong> ₹{totalAmount.toFixed(2)}</SummaryItem>
              </SummaryBox>
              <CheckoutButton onClick={handleProceedToPayment}>Proceed to Checkout</CheckoutButton>
            </CartFooter>
          </>
        )}
      </CartWrapper>
    </PageWrapper>
  );
};

export default MyCart;
