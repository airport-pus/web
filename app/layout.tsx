import StyledComponentsRegistry from './StyledComponentsRegistry';
import { GlobalStyles } from '../src/styles/global';

export const metadata = {
 title: 'Sandeul · 공항 가는 길이 가벼워져요',
 description: '산들은 국내 공항의 운항, 혼잡도, 주차 정보를 한곳에서 확인하는 앱입니다.',
 openGraph: {title:'Sandeul · 공항 가는 길이 가벼워져요',description:'국내 공항의 운항, 혼잡도와 주차 정보를 한곳에서 확인하세요.',type:'website'},
 twitter: {card:'summary_large_image'},
 icons: {icon: {url:'/brand/app-icon.svg',type:'image/svg+xml'},apple:'/brand/app-icon.png'},
};

export default function RootLayout({children}: React.PropsWithChildren) {
 return <html lang="ko"><head><link rel="preload" href="/fonts/outfit-500.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" /></head><body><StyledComponentsRegistry><GlobalStyles />{children}</StyledComponentsRegistry></body></html>;
}
