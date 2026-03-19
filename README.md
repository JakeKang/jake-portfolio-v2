# 프론트엔드 개발자 포트폴리오

Next.js 16(App Router) 기반의 개인 포트폴리오 프로젝트입니다.

## 기술 스택

| 분류           | 기술                     |
| -------------- | ------------------------ |
| Framework      | Next.js 16.1.6           |
| Language       | TypeScript 5             |
| UI Library     | React 19.2.0             |
| Styling        | Tailwind CSS 4.1.9       |
| State/Data     | TanStack Query v5        |
| UI Components  | shadcn/ui + Radix UI     |
| Content Source | Notion API               |
| Analytics      | Vercel Analytics         |

## 주요 특징

- 한국어/영어 i18n 지원 (`components/i18n-provider.tsx`, `lib/i18n/content.ts`)
- Notion 기반 프로젝트 목록/상세 조회
- 프로젝트 목록 초기 로딩 안내 UI + 스켈레톤
- Notion API 장애 시 프로젝트 섹션 오류 메시지 노출
- 프로젝트 기간 기준 최신순 정렬

## 프로젝트 구조

```text
├── app/
│   ├── api/notion/projects/route.ts       # 프로젝트 목록 API (동적 + 인메모리 캐시)
│   ├── api/notion/projects/[id]/route.ts  # 프로젝트 상세 API
│   ├── globals.css                         # 전역 스타일
│   ├── layout.tsx                          # 루트 레이아웃
│   ├── page.tsx                            # 메인 페이지
│   └── robots.ts                           # 크롤러 차단 설정
├── components/
│   ├── i18n-provider.tsx                   # 로케일 상태/콘텐츠 제공
│   ├── projects.tsx                        # 프로젝트 섹션 UI
│   ├── project-modal.tsx                   # 프로젝트 상세 모달
│   ├── section-header.tsx                  # 섹션 공통 헤더
│   ├── cards/                              # 카드/스켈레톤 컴포넌트
│   └── ui/                                 # shadcn/ui 컴포넌트
├── hooks/
│   ├── use-notion-projects.ts              # 프로젝트 목록 Query
│   └── use-notion-project-detail.ts        # 프로젝트 상세 Query
├── lib/
│   ├── i18n/content.ts                     # 포트폴리오 텍스트/콘텐츠 원본
│   ├── notion.ts                           # Notion 데이터 매핑/정렬
│   ├── types.ts                            # 타입 정의
│   └── utils.ts                            # 유틸
├── tests/
│   ├── e2e/                                # Playwright E2E
│   └── unit/                               # Vitest 단위 테스트
└── public/
```

## 시작하기

### 필수 조건

- Node.js 18.17+
- pnpm

### 설치/실행

```bash
pnpm install
pnpm dev
```

개발 서버: `http://localhost:3000`

### 빌드/실행

```bash
pnpm build
pnpm start
```

## 환경 변수

Notion 연동을 위해 아래 변수가 필요합니다.

```bash
NOTION_TOKEN=...
NOTION_FEATURED_PROJECTS_DB_ID=...
NOTION_OTHER_PROJECTS_DB_ID=...
```

## 데이터/카피 수정 방법

- 섹션 텍스트(한/영): `lib/i18n/content.ts`
- 프로젝트 Notion 매핑/정렬: `lib/notion.ts`
- 섹션 스타일: 각 `components/*.tsx`, 공통 토큰은 `app/globals.css`

## 스크립트

| 명령어                         | 설명 |
| ------------------------------ | ---- |
| `pnpm dev`                     | 개발 서버 실행 |
| `pnpm build`                   | 프로덕션 빌드 |
| `pnpm start`                   | 프로덕션 서버 실행 |
| `pnpm lint`                    | ESLint 검사 |
| `pnpm test:unit`               | 단위 테스트 |
| `pnpm test:e2e`                | E2E 테스트 |
| `pnpm test:e2e tests/e2e/home.spec.ts` | 홈 E2E 단일 실행 |

## Notion 캐싱/오류 처리

### 프로젝트 목록 API (`/api/notion/projects`)

- `dynamic = "force-dynamic"`
- 성공 응답: 서버 인메모리 캐시 TTL 10분
- 실패 응답: `503` + `{ source: "error", projects: [] }`
- 응답 헤더: `Cache-Control: no-store`

### 프로젝트 상세 API (`/api/notion/projects/[id]`)

- `revalidate=300` + 인메모리 캐시(5분)

## 보안/SEO

- `app/robots.ts`, `metadata.robots`, `X-Robots-Tag` 기반 noindex 설정
- `next.config.mjs` 보안 헤더 적용
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `Strict-Transport-Security`

## 배포

Vercel 또는 개인 서버(PM2) 환경에 배포할 수 있습니다.

## 라이선스

MIT
