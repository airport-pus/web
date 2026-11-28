import { withBasePath } from '../../src/site-path';
import ServiceProofSection from '../ServiceProofSection';

export const metadata = { title: '데이터 안내 · Sandeul' };

export default function DataPage() {
  return (
    <main>
      <div className="section-shell"><a href={withBasePath('/')}>← 산들 홈</a></div>
      <ServiceProofSection />
    </main>
  );
}
