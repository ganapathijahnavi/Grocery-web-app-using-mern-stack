import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PageWrapper,
  LoginCard,
  Title,
  FormGroup,
  Input,
  SubmitButton,
  TextLink,
} from './styledComponents';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5100/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }

      const data = await response.json();

      if (response.ok && data.token && data.user) {
        const { role, _id, email } = data.user;

        // ✅ Extract name before @ from email
        const emailPrefix = email.split('@')[0];

        // ✅ Store role-specific token
        if (role === 'admin') {
          localStorage.setItem('adminJwtToken', data.token); // used for admin routes
        } else {
          localStorage.setItem('userJwtToken', data.token); // used for user routes
        }

        // ✅ Store common info
        localStorage.setItem('jwtToken', data.token); // general token
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', _id);
        localStorage.setItem('userName', emailPrefix);

        window.dispatchEvent(new Event("login"));

        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (err) {
      alert('Error during login: ' + err.message);
      console.error('Login error:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <PageWrapper>
      <LoginCard>
        <Title>Login to Your Account</Title>
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">Login</SubmitButton>
        </form>
        <TextLink>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </TextLink>
      </LoginCard>
    </PageWrapper>
  );
};

export default Login;
