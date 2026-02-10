# 포트폴리오 개발 기록

## 개요

이 문서는 포트폴리오 프로젝트의 리팩토링, 성능/보안 개선, SEO 차단, Notion 캐싱 개선 등
주요 변경 사항을 정리한 개발 기록입니다.

## 변경 요약

### 1) 리팩토링 및 코드 분리

- 카드 컴포넌트 분리: `components/cards/*`로 분리하여 재사용성과 유지보수성 개선
- 프로젝트 카드/스켈레톤/활동/경력/학력 카드 각각 독립 컴포넌트화

### 2) 성능 개선 (LCP/FCP 최적화)

- 폰트 로딩 최적화: Pretendard subset WOFF2(`*.subset.woff2`)로 교체
- `app/layout.tsx`에서 `metadataBase` 지정 및 preconnect/dns-prefetch 추가
- Google Analytics 로딩 전략 `afterInteractive` → `lazyOnload` 변경
- Notion 전용 스타일(`react-notion-x`, `prismjs`, `katex`)을 `layout` 전역에서 제거하고 모달 컴포넌트로 이동
- 프로젝트 모달(`ProjectModal`)을 dynamic import + 조건부 렌더링으로 지연 로딩
- 프로젝트 카드 이미지 `sizes`를 실제 그리드 폭 기준으로 보정

### 7) 방문자 측정 (Google Analytics)

- GA4 측정 ID: `G-3GBK56C1XR`
- `app/layout.tsx`에 gtag 스크립트 삽입 (`lazyOnload`)

### 3) Notion 데이터 캐싱

- `/api/notion/projects`: `force-dynamic` + 인메모리 캐시(10분) + `Cache-Control: no-store`
- `/api/notion/projects/[id]`: `revalidate=300` + 인메모리 캐시(5분)

### 4) 보안 강화

- 기본 보안 헤더 적용: `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `HSTS`
- `poweredByHeader` 비활성화

### 5) SEO 크롤러 차단 (비공개 포트폴리오)

- `app/robots.ts`에서 전체 크롤러 차단
- `metadata.robots`로 noindex/nofollow 설정
- `X-Robots-Tag` 헤더 적용

### 6) 파일 정리

- 불필요한 파비콘/플레이스홀더 이미지 제거
- README의 이미지 안내 수정

## 성능 측정 결과 (Lighthouse)

- 이전 기록(개발 서버): Performance 49
- 개선 후(프로덕션 빌드 + `next start`): Performance 76
- FCP: 0.9s
- LCP: 8.1s
- TBT: 60ms
- CLS: 0.001

> 참고: 개인 서버 PM2 배포 환경에서는 앞단(Nginx/Caddy) gzip/brotli 설정 여부에 따라
> `Enable text compression` 점수가 추가로 달라질 수 있습니다.

## 후속 개선 제안

1. PM2 앞단 리버스 프록시에서 gzip/brotli 활성화 (text compression 개선)
2. 사용하지 않는 shadcn/ui 컴포넌트 파일 및 의존성 정리
3. Hero LCP 요소 추가 최적화(배경 효과 단계적 렌더, 필요 시 저사양 모드)
4. Notion 이미지 전용 프록시 엔드포인트(선택) 도입 검토

## 참고 파일

- `next.config.mjs`
- `app/layout.tsx`
- `app/robots.ts`
- `components/cards/*`
- `components/project-modal.tsx`
- `app/api/notion/projects/*`

## 작업 로그 (2026-02-10)

- subset 폰트(`public/fonts/*.subset.woff2`) 적용
- `app/layout.tsx` 리소스 최적화
  - `metadataBase` 지정
  - Notion/GTM 도메인 preconnect 및 dns-prefetch 추가
  - GA 스크립트 `lazyOnload` 전환
- Notion 모달 관련 CSS를 `project-modal.tsx`로 이동해 초기 렌더 블로킹 감소
- `components/projects.tsx`에서 `ProjectModal`을 dynamic import + 조건부 렌더링으로 지연 로딩
- 프로젝트 카드 이미지 `sizes` 최적화
- Lighthouse(프로덕션 실행 기준) 성능 점수: **76**

## 작업 로그 (2026-02-10, 2차)

- 미사용 UI 컴포넌트 및 파일 정리
  - `components/ui/*` 중 앱/스토리북/테스트에서 참조되지 않는 파일 삭제
  - 미사용 훅 파일 정리: `hooks/use-toast.ts`, `components/ui/use-toast.ts`
  - 미사용 스타일 파일 정리: `styles/globals.css`
- Hero LCP 보조 최적화(애니메이션 동작 유지)
  - `components/hero.tsx` 프로필 이미지에 `sizes='160px'` + `unoptimized` 적용
- 재검증
  - `pnpm build` 성공
  - Lighthouse(프로덕션 실행 기준) 성능 점수: **75**
  - FCP 0.9s / LCP 10.2s / TBT 30ms / CLS 0.001

> 참고: 로컬 Lighthouse는 측정 편차가 큽니다. PM2 + reverse-proxy 배포 환경에서
> 3~5회 평균값으로 비교하는 것을 권장합니다.

## 작업 로그 (2026-02-10, 3차)

- 전체 변경 파일 최종 점검(참조 끊김/빌드/테스트) 완료
- 폰트 파일 정리
  - `public/fonts/Pretendard-*.woff2`(full) 제거
  - subset 폰트만 유지
- Storybook 테스트 안정화
  - `.storybook/preview.ts`에 `QueryClientProvider` 전역 데코레이터 추가
  - `stories/sections/projects.stories.tsx` 테스트 실패(`No QueryClient set`) 해결
- 최종 검증
  - `pnpm lint` 성공
  - `pnpm test -- --run` 성공 (9 files, 14 tests pass)
  - `pnpm build` 성공
