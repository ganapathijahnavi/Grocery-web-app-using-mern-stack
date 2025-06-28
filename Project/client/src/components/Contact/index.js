import React from 'react';
import {
  ContactWrapper,
  ContactCard,
  Heading,
  ContactDetails,
  DetailRow,
  Icon
} from './styledComponents';
import { MdEmail, MdPhone } from 'react-icons/md';

const ContactUs = () => {
  return (
    <ContactWrapper>
      <ContactCard>
        <Heading>Contact Us</Heading>
        <ContactDetails>
          <p>
            Thank you for considering <strong>GroceryMart</strong>! If you have any questions or
            need assistance, feel free to reach out.
          </p>
          <DetailRow>
            <Icon><MdEmail /></Icon>
            <span><strong>Email:</strong> info@grocerymart.com</span>
          </DetailRow>
          <DetailRow>
            <Icon><MdPhone /></Icon>
            <span><strong>Phone:</strong> +1 (123) 456-7890</span>
          </DetailRow>
        </ContactDetails>
      </ContactCard>
    </ContactWrapper>
  );
};

export default ContactUs;
