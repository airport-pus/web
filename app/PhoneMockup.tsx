'use client';

import styled from 'styled-components';

const Frame = styled.div`
  position: relative;
  box-sizing: border-box;
  width: min(78vw, 320px);
  aspect-ratio: 600 / 1230;
  margin: 0 auto clamp(56px, 8vw, 112px);
  padding: 3px;
  border-radius: 18% / 8.8%;
  background: linear-gradient(105deg, #aaaeb2, #e8e9ea 18%, #a4a6a8 48%, #d9dbde 82%, #909397);
  box-shadow: 0 4px 32px rgb(44 57 82 / 12%);

  &::before, &::after {
    content: '';
    position: absolute;
    width: 3px;
    border-radius: 2px;
    background: linear-gradient(to right, #93969a, #d9dbde);
  }

  &::before {
    left: -2px;
    top: 24%;
    height: 7%;
    box-shadow: 0 3.5em #b0b3b6;
    font-size: clamp(12px, 3.9vw, 16px);
  }

  &::after {
    right: -2px;
    top: 29%;
    height: 11%;
  }
`;

const Screen = styled.div`
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  border: 8px solid #151516;
  border-radius: inherit;
  background: white;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default function PhoneMockup({ screenSrc, alt = '' }: {screenSrc?: string; alt?: string}) {
  return (
    <Frame aria-hidden={screenSrc ? undefined : true}>
      <Screen>{screenSrc && <img src={screenSrc} alt={alt} loading="lazy" />}</Screen>
    </Frame>
  );
}
