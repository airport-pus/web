# 산들 랜딩 페이지

첫 화면은 집에서 소파에 앉아 산들 앱을 확인하는 여행자의 3D 장면입니다. 옆에 캐리어가 놓여 있고, 스크롤하면 카메라가 사람과 휴대폰 쪽으로 다가갑니다. 페이지는 브라우저 기본 스크롤을 사용하고, 카메라만 기존 프레임당 7.5% 보간으로 스크롤 위치를 부드럽게 따라갑니다. 모션 감소 설정에서는 현재 진행률에 바로 맞춥니다. 하늘색·흰색·파란색 톤을 유지했습니다. 휴대폰은 뒷면이 보이도록 연출했습니다.

## 사용 기술

- Next.js App Router, React, styled-components 6, JavaScript ES Modules
- Next.js: 서버 렌더링, 로컬 개발 서버 및 프로덕션 빌드
- Three.js: 3D 모델, 조명, 카메라와 애니메이션
- IntersectionObserver, requestAnimationFrame: 화면 진입 감지와 스크롤 연출
- Pretendard: 웹 폰트

## 실행

```sh
npm ci
npm run dev
npm run build
npm run start
```

로컬 주소: http://127.0.0.1:5173/
배포하지 않았습니다.


## 기능 소개 섹션

중앙 제목과 설명 아래에 운항정보·공항 혼잡도·주차 안내 탭과 큰 카드 한 장을 배치합니다. 탭과 좌우 버튼으로 설명·3D·정보 예시를 함께 전환합니다. 탭은 방향키와 Home/End 키를 지원합니다. 모바일에서는 카드 안의 설명과 비주얼을 위아래로 배치합니다. 첫 화면의 소파 장면과 헤더는 유지했습니다. 기능 소개 마크업은 `app/feature-sections.jsx`에서 관리합니다.

3D는 Three.js 실시간 렌더링입니다. 화면 안에 있는 장면만 재생하고, 각 캔버스의 그리기 영역을 제한하여 다른 섹션과 겹치지 않게 했습니다. 모션 감소 설정에서는 정지 장면을 표시합니다. 표시 수치와 항공편은 소개용 고정 데이터이며 실시간 API가 아닙니다.

AI 기능과 앱 다운로드는 출시 준비 안내를 표시합니다. AI 상세 소개는 추후 추가합니다.

## Next.js 구성

`app/page.jsx`는 기존 마크업을 서버에서 렌더링하고, `app/landing-runtime.jsx`는 hydration 후 3D와 스크롤 동작을 초기화합니다. 스타일은 `src/styles/`의 섹션별 styled-components로 관리합니다. 에셋, 3D 모델과 카메라 경로는 유지합니다. 클라이언트 재마운트 시 이벤트·옵저버·애니메이션·WebGL 자원을 해제합니다. 개발 서버와 프로덕션 서버는 동일한 5173 포트를 사용하므로 하나만 실행하세요. Node.js 20.9 이상이 필요합니다.


## 스타일 구성과 동일성 검증

- `src/styles/global.js`: 기본 스타일, 색상 변수, 공통 레이아웃
- `src/styles/header.js`, `hero.js`, `flight.js`, `intro.js`, `features.js`, `footer.js`, `toast.js`: 섹션별 styled 컴포넌트
- `app/styled-components-registry.jsx`: 서버 렌더링 시 스타일 수집 및 삽입
- `next.config.mjs`: styled-components 컴파일러 설정

기존 화면을 유지하는 섹션 스타일은 `:where(&)`로 범위를 제한해 선택자의 우선순위를 유지합니다. 개편한 기능 소개는 별도의 섹션 스타일을 사용합니다.
중복 선언과 미디어 쿼리 순서는 기존 화면을 보존하기 위해 유지했습니다.
원래 CSS 컴파일 결과에 맞춰 헤더 블러는 WebKit 선언을 유지합니다.
Pretendard 외부 폰트와 Three.js에서 사용하는 클래스·ID는 변경하지 않습니다.

```sh
npx playwright install chromium
npm run build
npm test

# 현재 화면의 기준 저장 → 이후 변경과 비교
npm run check:styles -- record /tmp/sandeul-style-baseline http://127.0.0.1:5174
npm run check:styles -- compare /tmp/sandeul-style-baseline http://127.0.0.1:5174
```

비교 스크립트는 같은 브라우저에서 14개 화면 너비와 두 모션 설정의 DOM 구조,
요소 위치·크기, 전체 계산 스타일(가상 요소 포함)을 검사합니다. 390px·1440px에서는
전체 페이지 PNG도 비교합니다. JavaScript를 끈 서버 렌더링 화면을 사용해 움직이는
3D의 프레임 차이를 배제하고, 별도 브라우저 테스트로 hydration·3D·안내 버튼을 검증합니다.
스타일 전환만 완료한 시점에는 원본 CSS와 동일성을 확인했습니다. 이후 기능 소개 디자인을 개편했으므로 원본 기준과 비교하면 해당 섹션의 차이가 발생합니다.
기존 Chromium을 사용해야 한다면 `CHROMIUM_PATH`에 실행 파일 경로를 지정할 수 있습니다.

## 첫 3D 구간의 휠 스크롤

휠 입력을 가로채거나 누적하지 않습니다. 첫 구간의 페이지 이동은 브라우저가 처리하고, 3D 카메라만 원래 CSS 버전의 보간을 사용합니다. 올라갈 때와 내려갈 때 동일한 구간 높이와 진행률 계산을 사용합니다.

### 실제 앱 화면과 영상 교체

`src/landing-media.js`의 `selection`, `flights`, `crowd`, `parking`에 `{ type: "image" | "video", src, alt, poster? }`를 지정하면 해당 소개 화면을 실제 캡처 또는 녹화 영상으로 교체합니다. 파일은 `public/assets/app/`에 넣습니다. 미지정 시 소개용 UI가 표시됩니다. 영상은 사용자 재생 방식이며, 공항 선택 UI 자동 전환은 화면에 보일 때만 실행되고 모션 줄이기 설정에서는 정지합니다.

### 출시 링크와 본문 3D

스토어 출시 후 `src/store-links.js`의 `ios`와 `android`에 공식 설치 URL을 지정합니다. 비어 있으면 다운로드 안내 버튼과 출시 준비 문구가 표시됩니다. 본문 공항/MCP 장면은 `src/product-scenes.js`의 Three.js 장면이며 화면 밖에서는 렌더링을 멈춥니다. `notifications` 미디어 슬롯에는 실제 앱 푸시 캡처를 넣을 수 있습니다. AI 체험은 페이지당 1회 고정 응답이며 새로고침 시 초기화되는 퍼블리싱 데모입니다.

### Landing layout / local previews

Below the original hero and scroll scene, the landing follows a product-led structure: supported airports → app overview → three feature visuals → switchable travel scenarios → ticket push → airport 3D → MCP preview and connection → data/coverage panels → stores.

- `app/travel-showcase.jsx`: selectable airport device preview and travel scenarios (illustrative content, not live flight queries).
- `app/service-proof.jsx`: real supported scope and official source links; no customer-count or testimonial placeholders.
- `src/landing-media.js`: replacement slots for actual app captures/videos; `src/store-links.js`: store destinations when available.
- MCP preview remains one fixed example per page load; it does not send questions to an AI service.
- Styling is scoped with styled-components; the approved first hero/3D is unchanged by this layout revision.

### Simplified landing revision

The supported-airport strip is unchanged. The current page keeps one app preview, three short feature descriptions, a compact push notification, the single-use MCP demo, source links, and the download close. The repeated scenario carousel, three feature illustrations, secondary airport/MCP 3D scenes, metrics, and integration diagram are no longer rendered. The original hero 3D is retained. `public/assets/surface-grain.svg` adds a subtle procedural texture to the pale blue showcase backgrounds.
