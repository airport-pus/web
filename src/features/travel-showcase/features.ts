export const features = [
  {
    kind: 'flight',
    slot: 'flights',
    label: 'KE1533 · 김해 → 제주',
    value: '탑승구 5',
    detail: '제주행 출발 시각 14:20',
    title: '내 항공편을 바로 찾아보세요.',
    description: '항공편 번호나 항공사, 도시로 검색하고 출발·도착 시각과 탑승구를 확인하세요.',
  },
  {
    kind: 'crowd',
    slot: 'crowd',
    label: '보안검색장 혼잡도',
    value: '2구간 혼잡',
    detail: '1구간 여유　·　3구간 보통',
    title: '공항에 가기 전에, 혼잡도부터.',
    description:
      '구간별 혼잡 현황과 시간대별 승객 수를 살펴보세요. 기다릴 시간까지 생각하고 출발할 수 있어요.',
  },
  {
    kind: 'parking',
    slot: 'parking',
    label: '국내선 주차장',
    value: '빈자리에 주차 후 예상 요금 계산',
    detail: '예시 요율로 90분 이용 시 3,000원',
    title: '주차 자리와 예상 요금을 함께.',
    description: '빈자리가 있는 주차장을 찾고, 차를 세워둘 시간과 할인 조건으로 예상 요금을 확인하세요.',
  },
] as const;

export type FeatureKind = (typeof features)[number]['kind'];
