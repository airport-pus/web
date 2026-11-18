'use client';
import { useEffect, useRef, useState } from 'react';

const examples = ['김해에서 제주까지 얼마나 걸려?', '김해공항 지금 혼잡해?', '김해공항 주차 자리 있어?'];
const cards = {
  flight: { title: '운항정보 예시', rows: [['항공편', '대한항공 KE1533'], ['구간', '김해 → 제주'], ['출발 / 도착', '14:20 / 15:20'], ['일정상 소요 시간', '1시간'], ['운항 상태', '탑승 중']] },
  crowd: { title: '공항 혼잡도 예시', rows: [['공항', '김해국제공항'], ['혼잡도', '여유'], ['기준', '14:00 · 고정 예시']] },
  parking: { title: '주차 안내 예시', rows: [['주차장', '김해공항 국내선'], ['빈자리', '20대'], ['상태', '주차 가능']] },
};
function answer(question) {
  if (/인천|김포|부산 외|대구|청주|광주|무안|양양|울산|여수|사천|원주|군산|포항|제주공항/.test(question)) return { text: '현재 체험은 김해공항의 고정 예시만 제공해요. 이 질문의 실제 결과는 조회하지 않았어요.', keys: [] };
  const keys = [];
  if (/항공|비행|운항|출발|도착|탑승|편명|KE\d|제주|얼마나 걸|소요/i.test(question)) keys.push('flight');
  if (/혼잡|붐비|붐벼|대기|사람|복잡/.test(question)) keys.push('crowd');
  if (/주차|빈자리|자리|요금/.test(question)) keys.push('parking');
  if (!keys.length) return { text: '이 데모는 항공편·혼잡도·주차 질문의 예시 응답을 보여줘요. 입력한 질문에 대한 실제 AI 응답은 제공하지 않아요.', keys };
  return { text: '산들 MCP를 연결했을 때의 응답 예시예요. 실제 조회 결과가 아닌 고정 데이터입니다.', keys };
}
export default function AIDemo() {
  const [input, setInput] = useState('');
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [used, setUsed] = useState(false);
  const timer = useRef(null);
  const locked = useRef(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  function submit(value) {
    const text = value.trim();
    if (!text || locked.current || used) return;
    locked.current = true; setUsed(true); setQuestion(text); setInput(''); setBusy(true);
    timer.current = setTimeout(() => { setResult(answer(text)); setBusy(false); }, 650);
  }
  return <div className="ai-showcase" id="ai-preview">
    <div className="ai-copy"><p className="eyebrow">직접 한 번 물어보세요</p><h2 id="ai-title">질문 하나로 만나는<br />산들 AI.</h2><p>MCP는 AI와 외부 정보를 연결하는 방식이에요.<br />산들의 공항 정보를 대화로 확인해 보세요.</p>
      <form className="demo-form" onSubmit={event => { event.preventDefault(); submit(input); }}><label className="sr-only" htmlFor="airport-question">공항 정보 질문</label><input id="airport-question" value={input} maxLength={300} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && event.nativeEvent.isComposing) event.preventDefault(); }} placeholder="김해에서 제주까지 얼마나 걸려?" disabled={used} /><button type="submit" aria-label="질문 보내기" disabled={used || !input.trim()}>↑</button></form>
      <div className="demo-examples">{examples.map((text, index) => <button key={text} disabled={used} onClick={() => submit(text)} type="button">{['비행시간', '공항 혼잡도', '주차 안내'][index]}</button>)}</div>
      <p className="demo-disclosure">{used ? '이번 체험을 사용했어요.' : '페이지당 1회 체험.'} 현재는 고정 예시이며, 실제 AI·실시간 데이터에 연결되지 않아요.</p><button className="demo-connect mcp-connect" type="button">MCP 연결 안내 ↗</button>
    </div>
    <div className="ai-preview"><div className="chat-window"><div className="chat-header"><span><img src="/assets/airport-connection.png" alt="" width="20" height="20" />산들 AI</span><span>미리보기</span></div>
      <div className="demo-conversation" aria-live="polite" aria-atomic="true" aria-busy={busy}>
        {!question ? <div className="demo-empty"><span className="empty-spark" aria-hidden="true">✳</span><strong>어떤 정보가 궁금하세요?</strong><p>질문을 보내면 여기에<br />응답 예시가 나타나요.</p></div> : <><div className="chat-question">{question}</div>{busy ? <p className="demo-loading">응답 예시를 준비하고 있어요…</p> : result && <div className="demo-answer"><p>{result.text}</p>{result.keys.map(key => <div className="demo-result" key={key}><strong>{cards[key].title}</strong><dl>{cards[key].rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>)}</div>}</>}
      </div></div></div>
  </div>;
}
