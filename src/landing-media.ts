// 미디어를 연결할 때는 null 대신 type, src, alt와 선택 항목인 poster를 지정한다.
// 세로형 녹화 영상과 스크린샷은 public/assets/app/에 둔다.
// 예: selection: { type: 'video', src: '/assets/app/select-airport.mp4',
//   poster: '/assets/app/select-airport.jpg', alt: '산들 앱에서 공항을 선택하는 과정' }
export const landingMedia = {
  selection: null,
  notifications: null,
  flights: null,
  crowd: null,
  parking: null,
};
