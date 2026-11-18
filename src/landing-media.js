// Replace a null value with { type: 'image' | 'video', src, alt, poster? }.
// Store recordings/screenshots in public/assets/app/. Portrait media works best.
// Example: selection: { type: 'video', src: '/assets/app/select-airport.mp4',
//   poster: '/assets/app/select-airport.jpg', alt: '산들 앱에서 공항을 선택하는 과정' }
export const landingMedia = {
  selection: null,
  notifications: null,
  flights: null,
  crowd: null,
  parking: null,
};
