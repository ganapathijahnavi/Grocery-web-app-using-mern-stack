import styled from 'styled-components';

export const ContactWrapper = styled.section`
  background: linear-gradient(to right, #e0f7fa, #ffffff);
  padding: 60px 20px;
  display: flex;
  justify-content: center;
`;

export const ContactCard = styled.div`
  background-color: #ffffff;
  max-width: 700px;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Heading = styled.h2`
  font-size: 2.2rem;
  color: #00796b;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
`;

export const ContactDetails = styled.div`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.7;
  font-family: 'Inter', sans-serif;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 15px 0;
`;

export const Icon = styled.span`
  color: #00796b;
  font-size: 1.5rem;
`;
