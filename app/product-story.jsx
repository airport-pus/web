import TravelShowcase from './travel-showcase';
import { ProductStory } from '../src/styles/product-story';
export default function ProductStorySection() {
 return <ProductStory className="section-shell" id="product-story">
    <div className="coverage-intro"><p>현재 국내 <strong>4개 공항</strong>을 지원합니다</p><div>{[['김해국제공항','PUS'],['인천국제공항','ICN'],['김포국제공항','GMP'],['제주국제공항','CJU']].map(([name,code])=><span key={code}><b>{code}</b>{name}</span>)}</div></div>
    <TravelShowcase />
    <section className="push-summary" id="my-flight" aria-labelledby="ticket-title">
      <div className="ticket-copy">
        <p className="eyebrow">내 항공권</p>
        <h2 id="ticket-title">내 비행기 소식은,<br />알림으로 먼저.</h2>
        <p>이용할 항공편을 내 항공권에 담아두세요.<br />출발 시간이 바뀌면 산들이 알려드려요.</p>
      </div>
      <div className="ticket-stage" role="img" aria-label="잠금 화면에 도착한 산들 알림. 김해에서 제주로 가는 KE1533편 출발 시간이 14시 20분에서 14시 50분으로 변경됐어요.">
        <div className="ticket-device" aria-hidden="true">
          <span className="device-speaker" />
          <time>13:42</time>
        </div>
        <div className="push-message" aria-hidden="true">
          <img src="/brand/app-icon.svg" alt="" width="44" height="44" />
          <div>
            <div className="push-sender"><span>산들</span><small>지금</small></div>
            <strong>출발 시간이 변경됐어요</strong>
            <p>김해 → 제주 · KE1533</p>
            <div className="push-time"><s>14:20</s><span>→</span><b>14:50</b></div>
          </div>
        </div>
      </div>
    </section>
 </ProductStory>;
}
