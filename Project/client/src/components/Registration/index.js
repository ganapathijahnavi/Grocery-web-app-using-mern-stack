import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PageWrapper,
  RegistrationCard,
  Title,
  FormGroup,
  Input,
  SubmitButton,
  TextLink,
} from './styledComponents';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5100/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Save JWT token in localStorage (or cookies if you prefer)
        localStorage.setItem('jwtToken', data.token);
        console.log('Registration & login successful:', data);
        navigate('/shopping'); // Protected route
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error during registration: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <PageWrapper>
      <RegistrationCard>
        <Title>Create Account</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>First Name</label>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Last Name</label>
            <Input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Username</label>
            <Input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">Sign Up</SubmitButton>
        </form>

        <TextLink>
          Already have an account? <Link to="/login">Log In</Link>
        </TextLink>
      </RegistrationCard>
    </PageWrapper>
  );
};

export default Registration;
