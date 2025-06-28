import React from 'react';
import {
  AboutWrapper,
  AboutContent,
  AboutSection,
  Heading,
  Paragraph,
  FramedImageGrid
} from './styledComponents';
import EdgeWave from './EdgeWave';

const About = () => {
  return (
    <>
      <EdgeWave />

      <AboutWrapper>
        <AboutContent>
          <FramedImageGrid>
            {['about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg'].map((img, i) => (
                <div className="image-container" key={i}>
                <img src={`/images/${img}`} alt={`Grocery ${i + 1}`} className="thumbnail" />
                <img src={`/images/${img}`} alt={`Full Grocery ${i + 1}`} className="full-preview" />
                </div>
            ))}
          </FramedImageGrid>


          <AboutSection>
            <Heading>About Grocery Mart</Heading>
            <Paragraph>
              Welcome to <strong>GroceryMart</strong> – your one-stop destination for fresh and
              quality groceries. We’re dedicated to making your shopping simple and delightful.
            </Paragraph>
            <Paragraph>
              Since <strong>2005</strong>, we’ve proudly served our customers with top-quality produce,
              pantry essentials, and household needs. Every product reflects our passion for quality
              and customer satisfaction.
            </Paragraph>
            <Paragraph>
              Whether you're planning your daily meals or looking for something special, GroceryMart
              is here to serve – with fast delivery and trusted service.
            </Paragraph>
          </AboutSection>
        </AboutContent>
      </AboutWrapper>

      <EdgeWave flip />
    </>
  );
};

export default About;
