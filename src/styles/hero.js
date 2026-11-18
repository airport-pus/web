'use client';

import styled, { css } from 'styled-components';

export const landingTitle = css`
  font-family: Pretendard,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  font-size: 48px;
  font-weight: 600;
  line-height: 70px;
  letter-spacing: -.02em;
  color: #08090b;

  @media (min-width:801px) and (max-width:1400px) { font-size: 44px; }
  @media (min-width:801px) and (max-width:1150px) { font-size: 36px; line-height: 1.55; }
  @media (max-width:800px) { font-size: 32px; line-height: 1.5; }
`;

// :where scopes these existing selectors without increasing their specificity.
// Keep rule order: later declarations and media queries intentionally override earlier ones.
export const HeroIntro = styled.section`
  :where(&).hero-intro {
    text-align: center;
    padding: 70px 24px 48px;
  }
  :where(&) .kicker {
    font-size: 15px;
    color: #3182f6;
    font-weight: 600;
    margin: 0 0 18px;
  }
  :where(&).hero-intro h1 {
    font-size: clamp(44px,4.5vw,68px);
    line-height: 1.22;
    letter-spacing: -.025em;
  }
  :where(&) .hero-desc {
    font-size: 19px;
    line-height: 1.7;
    margin: 23px 0 26px;
    color: #687382;
  }
  :where(&) .download {
    display: inline-flex;
    gap: 24px;
    align-items: center;
    border: 0;
    border-radius: 13px;
    background: #3182f6;
    color: #fff;
    padding: 16px 25px;
    font: 600 16px Pretendard,sans-serif;
    cursor: pointer;
  }
  :where(&) .download:hover {
    background: #206fe0;
  }
  :where(&).hero-intro>small {
    display: block;
    font-size: 12px;
    color: #9098a5;
    margin-top: 12px;
  }
  @media (max-width:800px) {
    :where(&).hero-intro {
      padding: 48px 20px 36px;
    }
    :where(&).hero-intro h1 {
      font-size: 43px;
    }
    :where(&) .hero-desc {
      font-size: 15px;
    }
  }
  :where(&).hero-intro {
    max-width: 1320px;
    margin: 0 auto;
    padding: 80px 0 60px;
    display: grid;
    grid-template-columns: 1.55fr 1fr;
    gap: 48px;
    align-items: start;
    text-align: left;
  }
  :where(&).hero-intro h1 {
    font-size: 52px;
    line-height: 1.35;
    letter-spacing: -.035em;
    color: #08090b;
  }
  :where(&) .hero-desc {
    font-size: 17px;
    line-height: 1.7;
    color: #191f28;
    margin: 0 0 26px;
  }
  :where(&) .hero-action .download {
    background: #242427;
    border-radius: 999px;
    font-size: 16px;
    padding: 13px 23px;
    line-height: 1.5;
  }
  :where(&) .hero-action .download:hover {
    background: #414147;
  }
  @media (max-width:1400px) {
    :where(&).hero-intro {
      margin: 0 40px;
      padding-top: 65px;
      padding-bottom: 48px;
      gap: 35px;
    }
    :where(&).hero-intro h1 {
      font-size: 48px;
    }
    :where(&) .hero-desc {
      font-size: 15px;
    }
  }
  @media (max-width:1000px) and (min-width:801px) {
    :where(&).hero-intro {
      grid-template-columns: 1.2fr 1fr;
      gap: 30px;
    }
    :where(&).hero-intro h1 {
      font-size: 39px;
    }
  }
  @media (max-width:800px) {
    :where(&).hero-intro {
      display: block;
      margin: 0;
      padding: 45px 24px 34px;
    }
    :where(&).hero-intro h1 {
      font-size: 38px;
      line-height: 1.35;
    }
    :where(&) .hero-action {
      margin-top: 24px;
    }
    :where(&) .hero-desc {
      font-size: 14px;
      margin-bottom: 20px;
    }
    :where(&) .hero-action .download {
      font-size: 14px;
      padding: 12px 21px;
    }
  }
  :where(&).hero-intro {
    grid-template-columns: minmax(0,1.55fr) minmax(0,1fr);
    gap: 48px;
  }
  :where(&).hero-intro h1 {
    ${landingTitle}
  }
  @media (min-width:801px) and (max-width:1400px) {
    :where(&).hero-intro {
      grid-template-columns: minmax(0,1.7fr) minmax(0,1fr);
      gap: 32px;
    }
  }
  @media (max-width:800px) {
    :where(&).hero-intro h1 { max-width: 570px; }
  }
`;
