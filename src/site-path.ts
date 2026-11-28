// GitHub Pages의 하위 경로와 로컬 루트 경로를 함께 지원한다.
export function withBasePath(path:string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
}
