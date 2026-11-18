import StyledComponentsRegistry from './styled-components-registry';
import { GlobalStyles } from '../src/styles/global';

export const metadata = {
 title: '산들 · 공항 가는 길이 가벼워져요',
 description: '산들은 국내 공항의 운항, 혼잡도, 주차 정보를 한곳에서 확인하는 앱입니다.',
 openGraph: {title:'산들 · 공항 가는 길이 가벼워져요',description:'국내 공항의 운항, 혼잡도와 주차 정보를 한곳에서 확인하세요.',type:'website'},
 twitter: {card:'summary_large_image'},
 icons: {icon:'/assets/airport-connection.png',apple:'/assets/airport-connection.png'},
};

export default function RootLayout({children}) {
 return <html lang="ko"><head><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" /></head><body><StyledComponentsRegistry><GlobalStyles />{children}</StyledComponentsRegistry></body></html>;
}
