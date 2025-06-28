import styled from 'styled-components';

export const HomeContainer = styled.section`
  background-image: url('/my-bg.jpg');
  background-size: cover;
  background-position: center;
  height: 90vh;
  margin-top: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
`;


export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const CenteredRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentColumn = styled.div`
  flex: 1;
  text-align: center;
`;

export const Heading = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color:rgb(234, 255, 0); 
  margin-bottom: 15px;
  font-family: 'Poppins', sans-serif;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
`;

export const Paragraph = styled.p`
  font-size: 1.0rem;
  font-weight: 600;
  color:rgb(128, 14, 14);
  background-color:rgb(231, 255, 255); 
  border-left: 6px solid #ffeb3b; 
  border-right: 6px solid #ffeb3b;
  padding: 16px 24px;
  margin: 20px auto;
  width: fit-content;
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  font-family: 'Inter', sans-serif;
`;

export const PrimaryButton = styled.button`
  display: inline-block;
  margin-top: 10px; 
  padding: 16px 36px;
  font-size: 20px;
  border-radius: 50px;
  font-weight: 600;
  background-color: #2e7d32;
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #1b5e20;
  }
`;