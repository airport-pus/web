'use client';

import styled from 'styled-components';

// :where scopes these existing selectors without increasing their specificity.
// Keep rule order: later declarations and media queries intentionally override earlier ones.
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
