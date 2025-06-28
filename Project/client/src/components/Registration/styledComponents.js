// Registration/styledComponents.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url('/my-bg.jpg'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: relative;
  padding-top: 10vh;
`;



export const RegistrationCard = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  padding: 40px;
  width: 400px;
  z-index: 2;
`;

export const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  color: #2e7d32;
  margin-bottom: 20px;
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #2e7d32;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    background-color: #1b5e20;
  }
`;

export const TextLink = styled.p`
  text-align: center;
  margin-top: 15px;

  a {
    color: #2e7d32;
    text-decoration: none;
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }
`;
