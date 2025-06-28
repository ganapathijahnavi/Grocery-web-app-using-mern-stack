import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProductCard = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 12px;
`;

const ProductName = styled.h4`
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  height: 40px;
  overflow: hidden;
`;

const Price = styled.p`
  font-weight: bold;
  margin: 8px 0;
`;

const Button = styled.button`
  padding: 8px 12px;
  margin: 4px;
  background-color: ${props => props.delete ? '#d32f2f' : '#1976d2'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ProductItem = ({ id, img, name, description, price, handleDeleteProduct }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      handleDeleteProduct(id);
    }
  };

  return (
    <ProductCard>
      <ProductImage src={img} alt={name} />
      <ProductName>{name}</ProductName>
      <Description>{description}</Description>
      <Price>₹{price}</Price>
      <div>
        <Button onClick={handleEdit}>Edit</Button>
        <Button delete onClick={handleDelete}>Delete</Button>
      </div>
    </ProductCard>
  );
};

export default ProductItem;
