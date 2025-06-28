import React from 'react';
import styled from 'styled-components';

const WaveWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  line-height: 0;
`;

const WaveSVG = styled.svg`
  display: block;
  width: 100%;
  height: 80px;
`;

const EdgeWave = ({ flip = false }) => (
  <WaveWrapper style={{ transform: flip ? 'rotate(180deg)' : 'none' }}>
    <WaveSVG viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path
        d="M0,0V46.29c47.4,22.59,98.1,29,147.89,17.26
           C230.17,50.15,284,15,339.05,2.25
           C411.51-13,482.13,13,558.82,35.68
           C634.34,57.89,710,64.51,784.89,52.45
           C865.66,39.25,943.05-2.75,1020,0
           c83.24,3,161.68,47.69,180,66.68V0Z"
        fill="#e8f5e9"
      />
    </WaveSVG>
  </WaveWrapper>
);

export default EdgeWave;