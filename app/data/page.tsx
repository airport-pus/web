import ServiceProofSection from '../ServiceProofSection';

export const metadata = { title: '데이터 안내 · Sandeul' };

export default function DataPage() {
  return (
    <main>
      <div className="section-shell"><a href="/">← 산들 홈</a></div>
      <ServiceProofSection />
    </main>
  );
}
