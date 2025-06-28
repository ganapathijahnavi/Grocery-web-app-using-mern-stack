import styled from 'styled-components';

export const PaymentContainer = styled.div`
  max-width: 700px;
  margin: 100px auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
`;

export const Heading = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

export const PaymentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
`;

export const Label = styled.span`
  font-weight: 600;
  color: #34495e;
  width: 50%;
`;

export const Value = styled.span`
  color: #2d3436;
  width: 50%;
  text-align: right;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 15px;
  width: 50%;
  text-align: right;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #2c3e50;

  &:focus {
    outline: none;
    border-color: #22aaff;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  gap: 1rem;
`;

export const ConfirmButton = styled.button`
  padding: 12px 20px;
  background-color: #22aaff;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #0d91e4;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 20px;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;

export const PaymentSelect = styled.select`
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
`;
