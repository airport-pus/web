"use client";
import styled from 'styled-components';
import { landingTitle } from './hero';
export const ProductStory = styled.div`
 color:#191b20;padding-bottom:140px;
  .coverage-intro { text-align:center; padding:0 0 10px; }
  .coverage-intro > p { font-size:25px; color:#1b1b1e; letter-spacing:-.03em; }
  .coverage-intro strong { font-weight:650; }
  .coverage-intro > div { display:grid; grid-template-columns:repeat(4,1fr); gap:30px; max-width:1000px; margin:50px auto 0; }
  .coverage-intro span { font-size:15px; color:#55565c; }
  .coverage-intro b { display:block; font-size:40px; font-weight:600; letter-spacing:.02em; color:#98999d; margin-bottom:10px; }

 .feature-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:48px;margin-top:32px;scroll-margin-top:100px}
 .feature-summary article{border-top:3px solid #e8e9eb;padding-top:20px}
 .feature-summary h3{font-size:22px;font-weight:600;margin:0 0 12px;letter-spacing:-.03em}
 .feature-summary p{font-size:16px;line-height:1.8;color:#62646a;margin:0}
  .push-summary {
    display: grid;
    grid-template-columns: 0.86fr 1.14fr;
    align-items: center;
    gap: clamp(36px, 6vw, 96px);
    margin-top: 130px;
    scroll-margin-top: 100px;
  }
  .ticket-copy .eyebrow { margin: 0 0 20px; font-weight: 600; font-size: 16px; }
  .ticket-copy h2 { ${landingTitle} margin: 0; text-wrap: balance; }
  .ticket-copy > p:last-child { margin: 22px 0 0; font-size: 17px; line-height: 1.7; color: #62646a; }
  .ticket-stage {
    position: relative;
    container-type: inline-size;
    overflow: hidden;
    isolation: isolate;
    aspect-ratio: 1.32;
    border-radius: 32px;
    background: radial-gradient(ellipse at 54% 82%, #e6eaee, transparent 66%), #f7f8fa;
  }
  .ticket-device {
    position: absolute;
    width: 48%; aspect-ratio: .49;
    left: 26%; top: 13%;
    border: max(3px, .65cqw) solid #cdd1d5;
    border-radius: 7cqw;
    background: linear-gradient(155deg, #f1f2f3, #e5e7ea);
    box-shadow: inset 0 0 0 1px #fff, 2px 2px 0 #bec3c8;
  }
  .device-speaker {
    display: block; width: 14%; height: .95cqw;
    margin: 2.1cqw auto; border-radius: 20px; background: #c8ccd0;
  }
  .ticket-device time {
    display: block; margin-top: 3cqw; text-align: center;
    font-size: 8.5cqw; line-height: 1; font-weight: 500;
    letter-spacing: -.05em; color: #b7bcc2;
  }
  .push-message {
    position: absolute; left: 12%; right: 12%; top: 44%;
    display: flex; align-items: flex-start; gap: 2cqw;
    padding: clamp(13px, 3.2cqw, 24px);
    color: #202830; border-radius: clamp(17px, 4cqw, 28px);
    border: 1px solid #ffffffdc;
    background: linear-gradient(115deg, #ffffffd9, #f4faffb8);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    box-shadow: 0 3cqw 6cqw -2cqw #34445747, 0 2px 6px #3444570d;
    line-height: 1.4;
  }
  .push-message img { width: clamp(28px, 7cqw, 46px); height: auto; border-radius: 24%; }
  .push-message > div { flex: 1; }
  .push-sender { display: flex; align-items: center; justify-content: space-between; color: #5e6872; font-size: clamp(11px, 1.9cqw, 14px); }
  .push-sender small { font-size: inherit; }
  .push-message strong { display: block; margin-top: .4cqw; font-size: clamp(14px, 2.8cqw, 21px); font-weight: 600; }
  .push-message p { margin: .55cqw 0 0; font-size: clamp(11px, 2cqw, 15px); color: #54606b; }
  .push-time { display: flex; align-items: baseline; gap: 1.4cqw; margin-top: 1.1cqw; font-variant-numeric: tabular-nums; }
  .push-time s, .push-time span { color: #79838d; font-size: clamp(12px, 2.2cqw, 16px); }
  .push-time b { font-size: clamp(16px, 3.2cqw, 24px); font-weight: 600; color: #235377; }
  @keyframes ticket-notification-arrival {
    from { opacity: 0; transform: perspective(700px) translate3d(0,-10%, -90px); }
    to { opacity: 1; transform: none; }
  }
  @media (prefers-reduced-motion: no-preference) {
    .ticket-stage.is-visible .push-message { animation: ticket-notification-arrival .7s cubic-bezier(.2,.75,.2,1) both; }
  }
 @media(max-width:800px){padding-bottom:90px;
 .coverage-intro>p{font-size:19px}.coverage-intro>div{grid-template-columns:repeat(2,1fr);gap:28px;margin-top:32px}.coverage-intro b{font-size:32px}.coverage-intro span{font-size:12px}
 .feature-summary{grid-template-columns:1fr;gap:24px;margin-top:28px}.feature-summary h3{font-size:20px}.feature-summary p{font-size:14px}.feature-summary article{border-top-width:2px;padding-top:18px}
 .push-summary { grid-template-columns: 1fr; gap: 30px; margin-top: 80px; }
 .ticket-copy > p:last-child { font-size: 15px; margin-top: 14px; }
 .ticket-stage { border-radius: 24px; }
 }
`;
