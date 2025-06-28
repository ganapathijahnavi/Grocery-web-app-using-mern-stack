import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #e0f7fa, #ffffff);
  display: flex;
  justify-content: center;
  padding: 6vh 1rem;
`;

export const CartWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 18px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
`;

export const CartTitle = styled.h2`
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: 1px solid #eee;
`;

export const ItemImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const ItemDetails = styled.div`
  flex: 1;
`;

export const ItemName = styled.h4`
  font-size: 1.2rem;
  color: #222;
  margin: 0;
`;

export const ItemQty = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 4px 0;
`;

export const ItemPrice = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #27ae60;
`;

export const RemoveButton = styled.button`
  background-color: #ff5252;
  border: none;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const EmptyCart = styled.p`
  font-size: 1.5rem;
  color: #888;
  text-align: center;
  margin-top: 4rem;
`;

export const Divider = styled.hr`
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #ddd;
`;

export const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 2rem;
`;

export const SummaryBox = styled.div`
  flex: 1;
  background: #f5faff;
  padding: 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  color: #444;
  line-height: 1.8;
  min-width: 260px;
`;

export const SummaryItem = styled.p`
  margin: 0.5rem 0;
`;

export const CheckoutButton = styled.button`
  background-color: #00b894;
  color: white;
  padding: 14px 26px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #00897b;
  }
`;
