'use client';

import { useState } from 'react';

const reminders = [
  { minutes: 30, label: '30분' },
  { minutes: 60, label: '1시간' },
  { minutes: 90, label: '1시간 30분' },
];

export default function TicketReminder() {
  const [selected, select] = useState(reminders[2]);
  const delivery = 14 * 60 + 20 - selected.minutes;
  const hour = Math.floor(delivery / 60);
  const minute = String(delivery % 60).padStart(2, '0');
  const clock = String(hour).padStart(2, '0') + ':' + minute;
  const displayTime = (hour < 12 ? '오전 ' : '오후 ') + (hour % 12 || 12) + ':' + minute;

  return (
    <section className="push-summary" id="my-flight" aria-labelledby="ticket-title">
      <div className="ticket-controls"><header className="ticket-copy">
        <p>내 항공권</p><h2 id="ticket-title">내 비행기 출발 전,<br />원하는 시간에 알림을.</h2>
        <p>내 항공권에 담은 비행기의 알림 시간을 골라 보세요.</p>
      </header>
      <div className="reminder-options" role="group" aria-label="출발 전 알림 시간 미리보기">
        {reminders.map(option => (
          <button key={option.minutes} type="button" className="chip" aria-pressed={selected === option}
            onClick={() => select(option)}>{option.label} 전</button>
        ))}
      </div>
      </div>
      <div className="reminder-preview" aria-live="polite" aria-atomic="true">
        <div className="boarding-pass">
          <div className="pass-top"><span>대한항공</span><b>KE1533</b></div>
          <div className="pass-route"><span>PUS<small>김해</small></span><i aria-hidden="true">✈</i><span>CJU<small>제주</small></span></div>
          <div className="pass-bottom"><span>출발 시각</span><b>14:20</b></div>
        </div>
        <div className="push-message" key={selected.minutes}>
          <img src="/brand/app-icon.svg" alt="" width="44" height="44" />
          <div className="notification-body">
            <div className="notification-meta"><span>산들</span><time dateTime={clock} aria-label={displayTime + ' 알림 도착'}>{displayTime}</time></div>
            <strong>출발까지 {selected.label} 남았어요</strong>
            <p>KE1533 · 김해 → 제주 · 14:20 출발</p>
          </div>
        </div>
      </div>
    </section>
  );
}
