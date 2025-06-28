import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from '../ProductItem';
import axios from 'axios';

// Styled Layout
const PageWrapper = styled.div`
  margin-top: 8vh;
  background: linear-gradient(to bottom right, #f9f9ff, #e3f2fd);
  min-height: 100vh;
`;

const Banner = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  margin: 0 2rem;
`;

const Sidebar = styled.div`
  width: 250px;
  border-right: 1px solid #ddd;
  padding-right: 1rem;
`;

const CategoryTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #007aff;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryCheckbox = styled.label`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #333;
  cursor: pointer;

  input {
    margin-right: 8px;
  }
`;

const Main = styled.div`
  flex: 1;
`;

const SearchBar = styled.input`
  padding: 10px 14px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Heading = styled.h2`
  font-size: 2rem;
  color: #222;
  margin-bottom: 1.5rem;
`;

const ProductGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;
  padding: 0;
`;

const NoProducts = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-top: 2rem;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5100/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5100/category')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const toggleCategory = (categoryName) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.productName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.includes(product.category?.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper>
      <Banner src="https://grocery.opentestdrive.com/media/http-_kartrocket-mtp.s3.amazonaws.com_all-stores_image_grocery_data_banners_grocery.jpg" />

      <ContentWrapper>
        <Sidebar>
          <CategoryTitle>Categories</CategoryTitle>
          <CategoryList>
            {categories.map(cat => (
              <CategoryCheckbox key={cat._id}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => toggleCategory(cat.name)}
                />
                {cat.name}
              </CategoryCheckbox>
            ))}
          </CategoryList>
        </Sidebar>

        <Main>
          <SearchBar
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

          <Heading>Our Products</Heading>
          {filteredProducts.length > 0 ? (
            <ProductGrid>
              {filteredProducts.map(product => (
                <li key={product._id}>
                  <ProductItem
                    id={product._id}
                    img={product.image}
                    name={product.productName}
                    description={product.description}
                    price={product.price}
                  />
                </li>
              ))}
            </ProductGrid>
          ) : (
            <NoProducts>No products found. Try changing filters.</NoProducts>
          )}
        </Main>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Products;
