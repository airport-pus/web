'use client';

import styled from 'styled-components';

// :where로 선택자의 우선순위를 높이지 않고 이 컴포넌트 안에서만 적용한다.
// 뒤쪽 선언과 미디어 쿼리가 앞쪽 스타일을 덮어쓰므로 순서를 유지한다.
export const Toast = styled.div`
  :where(&)#ai-toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    background: #191f28;
    color: #fff;
    padding: 14px 22px;
    border-radius: 12px;
    font-size: 14px;
    box-shadow: 0 8px 24px #191f2826;
    max-width: calc(100% - 40px);
    width: max-content;
    opacity: 0;
    visibility: hidden;
    transition: opacity .2s;
  }
  :where(&)#ai-toast.show {
    opacity: 1;
    visibility: visible;
  }
`;
