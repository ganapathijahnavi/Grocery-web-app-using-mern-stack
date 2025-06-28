import React from 'react';
import {
  FooterContainer,
  FooterContent,
  FooterText,
  FooterLinks,
  FooterLink
} from './styledComponents';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>© {new Date().getFullYear()} GroceryMart. All rights reserved.</FooterText>
        <FooterLinks>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
