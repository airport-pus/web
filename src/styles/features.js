'use client';
import styled from 'styled-components';
export const FeatureEditorial = styled.section`
  padding-bottom: 120px; scroll-margin-top: 80px;
  .app-introduction { display: grid; grid-template-columns: 1.2fr 1fr; align-items: center; gap: 80px; margin-bottom: 40px; }
  .app-introduction h2 { font-size: 40px; font-weight: 700; line-height: 1.45; color: #111; letter-spacing: -.035em; }
  .feature-kicker { margin: 0 0 18px; font-size: 16px; color: #333; }
  .app-introduction > p { color: #444; font-size: 18px; line-height: 1.9; margin: 0; }
  .feature-tabs { display: flex; gap: 32px; margin-bottom: 24px; }
  .feature-tabs button { border: 0; border-bottom: 2px solid transparent; background: none; padding: 10px 0; font: inherit; color: #7b8490; cursor: pointer; }
  .feature-tabs button[aria-pressed=true] { color: #123c65; border-color: #123c65; font-weight: 600; }
  .app-stage { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 72px; padding: 56px 80px 36px; background: #edf5ff; border-radius: 28px; scroll-margin-top: 90px; }
  .feature-copy { max-width: 450px; }
  .feature-number { color: #647d97; font-size: 13px; letter-spacing: .08em; }
  .feature-copy h3 { margin-top: 24px; font-size: 36px; line-height: 1.45; font-weight: 650; color: #172b43; }
  .feature-copy > p { font-size: 17px; color: #4c6076; line-height: 1.9; margin: 24px 0; }
  .feature-copy ul { list-style: none; padding: 0; margin: 32px 0; }
  .feature-copy li { display: flex; gap: 12px; margin: 12px 0; color: #294968; font-size: 15px; }
  .feature-copy li::before { content: '✓'; }
  .feature-copy > small { display: block; color: #73869a; font-size: 12px; line-height: 1.7; }
  .phone-area { min-width: 0; }
  .app-phone { width: 346px; max-width: 100%; margin: auto; height: 676px; background: #fff; border: 6px solid #243346; border-radius: 44px; box-shadow: 0 24px 55px #123c6515; overflow: hidden; display: flex; flex-direction: column; }
  .phone-status { display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; padding: 13px 23px 19px; font-size: 11px; font-weight: 600; color: #222; }
  .phone-status i { width: 86px; height: 22px; border-radius: 20px; background: #243346; }
  .app-brand { display: flex; align-items: center; gap: 5px; padding: 0 21px 18px; color: #123c65; font-weight: 650; font-size: 18px; }
  .app-brand > span { margin-left: auto; font-size: 10px; font-weight: 400; color: #7b8795; }
  .app-content { flex: 1; min-height: 0; padding: 0 20px; overflow-y: auto; scrollbar-width: thin; }
  .airport-heading p { margin: 0 0 4px; font-size: 12px; color: #778493; }
  .airport-heading p span { margin-left: 4px; color: #9ca6b1; }
  .airport-heading h4 { margin: 0; color: #202c3c; font-size: 25px; font-weight: 650; }
  .flight-controls { margin-top: 20px; }
  .direction-control { display: flex; gap: 24px; margin-bottom: 14px; }
  .direction-control button { padding: 0 0 7px; border: 0; border-bottom: 2px solid transparent; background: none; font: inherit; font-size: 13px; color: #8792a0; cursor: pointer; }
  .direction-control button[aria-pressed=true] { color: #123c65; border-color: #123c65; font-weight: 600; }
  .flight-controls input { width: 100%; border: 0; border-radius: 9px; background: #f3f6f9; padding: 12px; font: inherit; font-size: 12px; color: #314960; }
  .flight-controls input::placeholder { color: #8b98a6; }
  .flight-list { margin-top: 12px; }
  .flight-card { padding: 17px 0; border-bottom: 1px solid #edf0f4; }
  .flight-card-top { display: flex; justify-content: space-between; gap: 8px; font-size: 11px; color: #6d7b8b; }
  .flight-card-top > span:first-child { color: #123c65; font-weight: 600; }
  .flight-time { display: flex; align-items: center; gap: 10px; margin: 10px 0 6px; }
  .flight-time > strong { font-size: 27px; font-weight: 650; color: #233b54; line-height: 1.4; }
  .flight-time > span { font-size: 10px; color: #7e8b99; }
  .flight-time b { display: block; font-size: 10px; color: #123c65; font-weight: 500; }
  .flight-time .gate { margin-left: auto; color: #5d6f82; font-size: 11px; }
  .flight-card > p { margin: 0; font-size: 11px; color: #748293; }
  .search-empty { font-size: 13px; padding: 30px 0; color: #748293; }
  .screen-meta { display: flex; justify-content: space-between; gap: 8px; margin: 22px 0 18px; font-size: 10px; color: #7a8897; }
  .crowd-row { padding: 12px 0; }
  .crowd-row > div:first-child { display: flex; justify-content: space-between; font-size: 12px; color: #596c7f; }
  .crowd-row strong { font-weight: 500; }
  .crowd-row span { color: #123c65; }
  .crowd-bar { height: 6px; margin-top: 12px; background: #edf3f9; border-radius: 10px; }
  .crowd-bar i { display: block; height: 100%; border-radius: inherit; background: #88afd5; }
  .passengers { margin-top: 22px; padding: 16px; background: #f5f8fc; border-radius: 12px; font-size: 12px; color: #54697f; }
  .passengers > div { display: flex; justify-content: space-around; align-items: end; height: 110px; gap: 12px; }
  .passengers > div > div { flex: 1; text-align: center; }
  .passengers i { display: block; width: 100%; max-width: 24px; margin: auto; background: #abc7e4; border-radius: 4px 4px 0 0; }
  .passengers div span { font-size: 9px; }
  .passengers small { display: block; margin-top: 12px; font-size: 9px; color: #8a98a6; }
  .parking-row { display: flex; align-items: center; gap: 10px; padding: 18px 0; border-bottom: 1px solid #edf0f4; }
  .lot-code { display: grid; place-items: center; width: 32px; height: 32px; background: #edf5ff; border-radius: 8px; color: #123c65; font-size: 12px; }
  .parking-row strong { font-size: 12px; font-weight: 500; color: #51657b; }
  .parking-row b { margin-left: auto; font-size: 24px; font-weight: 600; color: #123c65; }
  .parking-row small { font-size: 10px; margin-left: 3px; font-weight: 400; }
  .parking-estimate { margin-top: 22px; padding: 16px; background: #f5f8fc; border-radius: 12px; }
  .parking-estimate strong { font-size: 13px; color: #354c65; font-weight: 600; }
  .parking-estimate p { font-size: 10px; color: #8290a0; margin: 4px 0 14px; }
  .parking-estimate > div { display: flex; justify-content: space-between; padding: 8px 0; color: #5e7287; font-size: 11px; }
  .app-bottom-nav { display: flex; justify-content: space-around; flex-shrink: 0; border-top: 1px solid #edf0f4; padding: 12px 8px 5px; background: #fff; }
  .app-bottom-nav button { display: flex; flex-direction: column; align-items: center; gap: 5px; border: 0; background: none; font: inherit; font-size: 10px; color: #9aa5b2; cursor: pointer; }
  .app-bottom-nav button[aria-pressed=true] { color: #123c65; }
  .app-bottom-nav svg { width: 20px; height: 20px; }
  .home-indicator { width: 95px; height: 4px; flex-shrink: 0; border-radius: 4px; background: #243346; margin: 9px auto; }
  .app-example-note { margin: 18px 0 0; font-size: 11px; line-height: 1.7; color: #72859a; text-align: center; }
  @media(max-width:1100px) { .app-stage { padding: 40px; gap: 40px; } .app-introduction { gap: 40px; } .app-introduction h2 { font-size: 34px; } .app-introduction > p { font-size: 16px; } .feature-copy h3 { font-size: 30px; } }
  @media(max-width:800px) {
    padding-bottom: 80px;
    .app-introduction { display: block; margin-bottom: 20px; }
    .app-introduction h2 { font-size: 30px; }
    .feature-kicker { font-size: 14px; margin-bottom: 14px; }
    .app-introduction > p { font-size: 15px; margin-top: 20px; }
    .feature-tabs { gap: 24px; margin-bottom: 18px; }
    .feature-tabs button { font-size: 14px; }
    .app-stage { grid-template-columns: 1fr; padding: 30px 18px 24px; border-radius: 20px; gap: 30px; }
    .feature-copy h3 { font-size: 27px; margin-top: 16px; }
    .feature-copy > p { font-size: 15px; margin: 18px 0; }
    .feature-copy ul { margin: 22px 0; }
    .feature-copy li { font-size: 13px; }
    .feature-copy > small { font-size: 11px; }
    .app-phone { height: 660px; border-width: 4px; border-radius: 35px; }
    .app-content { padding: 0 16px; }
    .app-brand { padding-inline: 16px; }
    .flight-time > strong { font-size: 24px; }
    .flight-time { gap: 6px; }
    .flight-card-top { font-size: 10px; }
    .phone-status { padding-inline: 18px; }
    .phone-status i { width: 72px; }
  }
`;
