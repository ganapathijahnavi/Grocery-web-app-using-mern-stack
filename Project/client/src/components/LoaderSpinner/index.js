import React from 'react';
import { Oval } from 'react-loader-spinner';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  } 
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const SpinnerWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffffcc;
  animation: ${fadeIn} 0.3s ease-in-out;
  z-index: 1000;
`;

const LoaderSpinner = () => (
  <SpinnerWrapper aria-label="Loading">
    <Oval
      height={80}
      width={80}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#f0f0f0"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </SpinnerWrapper>
);

export default LoaderSpinner;
