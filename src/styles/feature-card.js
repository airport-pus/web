'use client';
import { css } from 'styled-components';

// The visual language of the "공항 가기 전 집에서도 산들로" cards, shared by every
// card-based section so the lower page reads as the same system as the feature grid.

// Sky-textured visual card (the flight card's background).
export const skyCard = css`
  position: relative; isolation: isolate; overflow: hidden;
  background: #d3e8fa url('/assets/feature-sky.webp') center/cover;
`;

// Same sky for cards wider than the 600px texture: its colors as a gradient plus fine grain,
// so the texture is never upscaled into visible blocks.
export const skyCardWide = css`
  position: relative; isolation: isolate; overflow: hidden;
  background: radial-gradient(ellipse 75% 65% at 50% 50%, #dbedfc, #cbe6fc 65%, #bee1fc);
  &::before {
    content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
    background: url('/assets/surface-grain.svg'); opacity: .16; mix-blend-mode: soft-light;
  }
`;

// Card row: cards sit edge to edge as one strip with 32px outer corners; on phones they stack.
export const cardStripRadius = (visual) => css`
  @media (min-width: 801px) {
    > :first-child ${visual} { border-radius: 32px 0 0 32px; }
    > :last-child ${visual} { border-radius: 0 32px 32px 0; }
  }
`;

// Title, description and chip row under a card.
export const cardTextInset = css`margin-inline: clamp(12px, 1.5vw, 24px);`;
export const cardTitle = css`
  font-size: clamp(19px, 1.65vw, 23px); line-height: 1.4; letter-spacing: -.03em; font-weight: 650;
`;
export const cardText = css`
  max-width: 34em; font-size: 15px; line-height: 1.7; color: #4d5b67; text-wrap: pretty;
`;

// White pill floating on a card (scene readings and card labels).
export const cardPill = css`
  padding: 6px 14px; border-radius: 24px; white-space: nowrap;
  background: #ffffffeb; color: #2d4558; font-size: 14px; font-variant-numeric: tabular-nums;
  box-shadow: 0 2px 10px #1d3a5014;
`;

// White panel resting on a sky card (boarding pass, chat window).
export const cardPanel = css`
  background: white; border-radius: 20px; color: #1e3547;
  box-shadow: 0 1px 2px #1d3a500d, 0 8px 24px #1d3a500f;
`;

// Section side padding and bottom rhythm used by the feature section.
export const sectionFrame = css`
  max-width: 1320px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 60px) clamp(88px, 11vw, 170px);
`;
