import React, { useState } from 'react';
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
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: rgb(98, 90, 252);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: rgb(80, 72, 240);
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const AddCategory = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { category, description } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      alert('Category name is required');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post('http://localhost:5100/category', {
        category: category.trim(),
        description: description.trim(),
      });

      console.log('✅ Category added:', response.data);
      alert('✅ Category added successfully!');
      setFormData({ category: '', description: '' });
    } catch (error) {
      console.error(' Error adding category:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to add category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Heading>Add Category</Heading>
      <Form onSubmit={handleSubmit} className="shadow p-3">
        <FormGroup>
          <Label htmlFor="category">Category Name</Label>
          <Input
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
            placeholder="e.g., Fruits, Snacks"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Describe the category (optional)"
          />
        </FormGroup>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Category'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddCategory;
