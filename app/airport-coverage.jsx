import { AirportCoverage } from '../src/styles/airport-coverage';

const airports = [
  ['김해', 'PUS'],
  ['인천', 'ICN'],
  ['김포', 'GMP'],
  ['제주', 'CJU'],
];

export default function AirportCoverageSection() {
  return <AirportCoverage className="section-shell" aria-labelledby="coverage-title">
    <h2 id="coverage-title">출발하는 공항이 달라도, 산들에서.</h2>
    <ul aria-label="산들에서 안내할 공항">
      {airports.map(([name, code]) => <li key={code}><img className="airport-photo" src={`/assets/airports/${code.toLowerCase()}.jpg`} alt={`${name}공항 ${code === 'ICN' ? '교통센터 내부' : code === 'GMP' ? '터미널 내부' : '터미널 외관'}`} width="960" height="720" loading="lazy" /><div className="airport-name"><span>{name}</span><span className="airport-code">{code}</span></div></li>)}
    </ul>
  </AirportCoverage>;
}
