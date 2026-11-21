export const features = [
  {
    kind: 'flight',
    slot: 'flights',
    label: '김해공항 출발 항공편 검색 예시',
    title: '내 항공편을 바로 찾아보세요.',
    description: '항공편 번호나 항공사, 도시로 검색하고 출발·도착 시각과 탑승구를 확인하세요.',
  },
  {
    kind: 'crowd',
    slot: 'crowd',
    label: '수속 구간별 혼잡도',
    title: '공항에 가기 전에, 혼잡도부터.',
    description:
      '체크인부터 비행기에 타기까지, 어느 구간이 붐비는지 출발 전에 확인하세요.',
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

// 랜딩에서 구간 선택을 시연하기 위한 상태값이다.
export const gimhaeSegments = [
  { route: '체크인 → 신분확인', level: '원활' },
  { route: '신분확인 → 보안검색', level: '혼잡' },
  { route: '보안검색 → 항공기 탑승', level: '보통' },
] as const;
