'use client';

import styled from 'styled-components';

// :where로 선택자의 우선순위를 높이지 않고 이 컴포넌트 안에서만 적용한다.
// 뒤쪽 선언과 미디어 쿼리가 앞쪽 스타일을 덮어쓰므로 순서를 유지한다.
export const ServicesIntro = styled.section`
  :where(&).services-intro {
    text-align: center;
    padding: 100px 0 95px;
  }
  :where(&).services-intro h2 {
    font-size: 48px;
    line-height: 1.35;
    font-weight: 600;
    letter-spacing: -.025em;
  }
  :where(&) .service-jumps {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 35px;
  }
  :where(&) .service-jumps a {
    text-decoration: none;
    color: #536174;
    font-size: 14px;
    border: 1px solid #e3e8ef;
    border-radius: 999px;
    padding: 10px 19px;
    transition: background .2s;
  }
  :where(&) .service-jumps a:hover {
    background: #edf5ff;
  }
  :where(&) .service-jumps span {
    margin-left: 18px;
    color: #3182f6;
  }
  @media (max-width:800px) {
    :where(&).services-intro {
      padding: 65px 0 45px;
    }
    :where(&).services-intro h2 {
      font-size: 30px;
    }
    :where(&) .service-jumps {
      gap: 6px;
      margin-top: 24px;
    }
    :where(&) .service-jumps a {
      font-size: 11px;
      padding: 9px 12px;
    }
    :where(&) .service-jumps span {
      margin-left: 5px;
    }
  }
  :where(&).services-intro {
    padding: 100px 0 90px;
    border-top: 1px dashed #e6eaf0;
  }
  :where(&).services-intro .section-eyebrow {
    color: #363c45;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 26px;
  }
  :where(&).services-intro h2 {
    font-size: 40px;
    line-height: 1.4;
    font-weight: 600;
  }
  :where(&) .intro-detail {
    display: inline-block;
    text-decoration: none;
    background: #242427;
    color: white;
    font-size: 15px;
    padding: 12px 23px;
    border-radius: 30px;
    margin-top: 30px;
  }
  :where(&) .intro-detail:hover {
    background: #414147;
  }
  :where(&) .intro-topics {
    display: flex;
    gap: 42px;
    justify-content: center;
    color: #91969e;
    font-size: 18px;
    font-weight: 600;
    margin-top: 35px;
  }
  :where(&).services-intro {
    padding-bottom: 110px;
  }
  :where(&) .intro-topics {
    display: none;
  }
  @media (max-width:800px) {
    :where(&).services-intro {
      padding: 65px 0 50px;
    }
    :where(&).services-intro h2 {
      font-size: 27px;
    }
    :where(&).services-intro .section-eyebrow {
      font-size: 13px;
    }
  }
`;
