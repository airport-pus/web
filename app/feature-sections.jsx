import { FeatureEditorial } from '../src/styles/features';

export default function FeatureSections() {
  return <FeatureEditorial className="feature-editorial section-shell" id="feature-story">
    <section className="feature-chapter flight-chapter" id="flight-info" aria-labelledby="flight-title">
      <div className="chapter-copy">
        <p className="chapter-label">운항정보</p>
        <h2 id="flight-title">기다리는 비행기 소식,<br />찾아보는 건 간단하게.</h2>
        <p className="chapter-description">출발과 도착 시간부터 탑승구, 운항 상태까지.<br />내 항공편에 필요한 정보를 한눈에 확인하세요.</p>
        <div className="feature-points"><span>출발·도착 시간</span><span>탑승구</span><span>운항 상태</span></div>
      </div>
      <div className="chapter-visual flight-visual" role="group" aria-label="운항정보 앱 화면 예시">
        <div className="feature-canvas" data-feature-scene="flight" data-editorial="true" aria-hidden="true" />
        <div className="flight-preview">
          <div className="preview-heading"><span className="preview-brand"><img src="/assets/airport-connection.png" alt="" width="22" height="22" />산들</span><span>운항정보</span></div>
          <div className="preview-airport">김해국제공항 <span>PUS</span></div>
          <div className="preview-tabs" aria-hidden="true"><span className="selected">출발</span><span>도착</span></div>
          <div className="flight-summary"><div><span className="small-label">출발 시간</span><strong>14:20</strong></div><div className="flight-destination"><b>제주 <span>CJU</span></b><span>대한항공 · KE1533</span></div><span className="flight-status">탑승 중</span></div>
          <div className="flight-details"><span>탑승구 <b>5</b></span><span>국내선</span></div>
        </div>
        <div className="scene-note">출발부터 도착까지, 필요한 정보만.</div>
      </div>
    </section>

    <div className="feature-pair">
      <section className="feature-chapter compact-chapter" id="airport-info" aria-labelledby="crowd-title">
        <div className="chapter-copy">
          <p className="chapter-label">공항 혼잡도</p>
          <h2 id="crowd-title">공항의 지금을 알면,<br />출발이 한결 여유로워져요.</h2>
          <p className="chapter-description">공항에 도착하기 전, 혼잡도를 먼저 살펴보세요.<br />기다림까지 생각하면 여행의 시작이 편해져요.</p>
        </div>
        <div className="chapter-visual crowd-visual" role="group" aria-label="공항 혼잡도 화면 예시">
          <div className="crowd-readout"><span className="small-label">지금, 공항은</span><strong>여유로워요<span className="calm-dot" /></strong><div className="crowd-scale" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="scale-labels"><span>여유</span><span>혼잡</span></div></div>
          <div className="feature-canvas" data-feature-scene="crowd" data-editorial="true" aria-hidden="true" />
          <div className="scene-note">공항 가기 전에, 먼저 살펴보세요.</div>
        </div>
      </section>

      <section className="feature-chapter compact-chapter" id="parking-info" aria-labelledby="parking-title">
        <div className="chapter-copy">
          <p className="chapter-label">주차 안내</p>
          <h2 id="parking-title">차를 가져가는 날도,<br />빈자리부터 확인하세요.</h2>
          <p className="chapter-description">주차장별 빈자리와 예상 요금을 한곳에서.<br />미리 살펴보고, 공항 가는 길을 가볍게.</p>
        </div>
        <div className="chapter-visual parking-visual" role="group" aria-label="주차 안내 화면 예시">
          <div className="parking-readout"><div><span className="small-label">국내선 주차장</span><strong>20<span>대 주차 가능</span></strong></div><span className="parking-sign" aria-hidden="true">P</span><div className="parking-availability"><i />빈자리가 있어요</div></div>
          <div className="feature-canvas" data-feature-scene="parking" data-editorial="true" aria-hidden="true" />
          <div className="scene-note">주차 현황부터 예상 요금까지.</div>
        </div>
      </section>
    </div>
  </FeatureEditorial>;
}
