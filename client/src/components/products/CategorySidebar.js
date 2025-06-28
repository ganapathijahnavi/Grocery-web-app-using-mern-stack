import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SidebarContainer = styled.div`
  width: 240px;
  padding: 1rem;
  border-right: 1px solid #ddd;
`;

const SectionTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  margin: 6px 0;
  color: #007185;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CategorySidebar = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5100/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories", err));
  }, []);

  return (
    <SidebarContainer>
      <SectionTitle>Category</SectionTitle>
      <CategoryList>
        {categories.map(cat => (
          <CategoryItem key={cat._id} onClick={() => onSelectCategory(cat.name)}>
            {cat.name}
          </CategoryItem>
        ))}
      </CategoryList>
    </SidebarContainer>
  );
};

export default CategorySidebar;
