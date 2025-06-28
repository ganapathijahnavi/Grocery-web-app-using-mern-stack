import styled from 'styled-components';

export const AboutWrapper = styled.section`
  background: linear-gradient(to bottom right, #e8f5e9, #ffffff);
  padding: 60px 20px;
  display: flex;
  justify-content: center;
`;

export const AboutContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  max-width: 1100px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

export const AboutSection = styled.div`
  flex: 1;
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;



export const FramedImageGrid = styled.div`
  padding: 40px;
  background: #ffffff;
  border: 6px solid #cfd8dc;
  border-radius: 20px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: repeat(2, 180px);
  grid-template-rows: repeat(2, 180px);
  gap: 20px;
  position: relative;

  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 14px;
    overflow: hidden;
  }

  .thumbnail {
    width: 120%;
    height: 100%;
    object-fit: cover;
    border-radius: 14px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }

  .full-preview {
    position: absolute;
    top: -220px; /* adjust as needed */
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: auto;
    display: none;
    z-index: 99;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    border: 4px solid #fff;
  }

  .image-container:hover .full-preview {
    display: block;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 140px);
    grid-template-rows: repeat(2, 140px);
    padding: 20px;
    gap: 12px;
  }
`;


export const Heading = styled.h2`
  font-size: 2.2rem;
  color: #2e7d32;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
`;

export const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 20px;
  font-family: 'Inter', sans-serif;
`;
