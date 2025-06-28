import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 10vh auto;
  padding: 20px;
  text-align: start;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: rgb(62, 62, 62);
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: rgb(98, 90, 252);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: rgb(80, 72, 240);
  }
`;

const InputRowsContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
    rating: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5100/category')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error loading categories:', err.message));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      productName,
      description,
      price,
      image,
      category,
      countInStock,
      rating,
    } = formData;

    if (
      !productName.trim() ||
      !description.trim() ||
      !image.trim() ||
      !category.trim() ||
      price === '' || rating === '' || countInStock === '' ||
      isNaN(price) || isNaN(rating) || isNaN(countInStock)
    ) {
      return alert('⚠️ Please fill all fields with valid values');
    }

    const token = localStorage.getItem('adminJwtToken');
    if (!token) return alert('No admin token found.');

    try {
      await axios.post(
        'http://localhost:5100/products',
        {
          productName: productName.trim(),
          description: description.trim(),
          price: Number(price),
          image: image.trim(),
          category: category.trim(),
          countInStock: Number(countInStock),
          rating: Number(rating),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('✅ Product added successfully!');
      setFormData({
        productName: '',
        description: '',
        price: '',
        image: '',
        category: '',
        countInStock: '',
        rating: '',
      });
    } catch (err) {
      console.error('Add Product Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container>
      <Heading>Add Product</Heading>
      <Form onSubmit={handleSubmit}>
        <InputRowsContainer>
          <FormGroup>
            <Label>Product Name</Label>
            <Input name="productName" value={formData.productName} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Rating</Label>
            <Input name="rating" type="number" value={formData.rating} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Price</Label>
            <Input name="price" type="number" value={formData.price} onChange={handleChange} />
          </FormGroup>
        </InputRowsContainer>

        <InputRowsContainer>
          <FormGroup>
            <Label>Image URL</Label>
            <Input name="image" value={formData.image} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Category</Label>
            <Select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Count in Stock</Label>
            <Input
              name="countInStock"
              type="number"
              value={formData.countInStock}
              onChange={handleChange}
            />
          </FormGroup>
        </InputRowsContainer>

        <FormGroup>
          <Label>Description</Label>
          <Textarea name="description" value={formData.description} onChange={handleChange} />
        </FormGroup>

        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
