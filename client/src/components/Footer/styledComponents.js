import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #2e7d32; /* Soft green to match grocery theme */
  color: #ffffff;
  padding: 30px 0;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 20px;
`;

export const FooterText = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 12px;
`;

export const FooterLinks = styled.div`
  margin-top: 10px;
`;

export const FooterLink = styled.a`
  color: #ffffff;
  margin: 0 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #c8e6c9;
  }
`;
