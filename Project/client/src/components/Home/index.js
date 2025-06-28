import React from 'react';
import {
  HomeContainer,
  Container,
  CenteredRow,
  ContentColumn,
  Heading,
  Paragraph,
  PrimaryButton
} from "./styledComponents";
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import About from '../About';
import ContactUs from '../Contact';

const Home = () => {
  return (
    <div>
      <HomeContainer>
        <Container>
          <CenteredRow>
            <ContentColumn>
              <Heading>Fresh Groceries at Your Fingertips</Heading>
              <Paragraph>
                Order farm-fresh produce, pantry staples, and daily needs—all delivered fast and safe.
              </Paragraph>
              <PrimaryButton>
                <Link to='/shopping' style={{ textDecoration: 'none', color: 'white' }}>
                  Shop Now
                </Link>
              </PrimaryButton>
            </ContentColumn>
          </CenteredRow>
        </Container>
      </HomeContainer>

      <About />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
