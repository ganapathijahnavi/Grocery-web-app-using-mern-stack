import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  padding: 8vh 2rem 4rem;
  margin-top: 80px; /* adjust to match navbar height if fixed */
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background: #f9f9f9;
  min-height: 100vh;
`;

export const Heading = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 3rem;
  color: #2c3e50;
  text-align: center;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`;

export const StatCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }
`;

export const CardTitle = styled.h4`
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 0.8rem;
`;

export const CardValue = styled.p`
  font-size: 2.2rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 1.2rem;
`;

export const ActionButton = styled(Link)`
  display: inline-block;
  background-color: ${({ type }) => (type === 'add' ? '#28a745' : '#007bff')};
  color: #fff;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: ${({ type }) => (type === 'add' ? '#218838' : '#0056b3')};
  }
`;
