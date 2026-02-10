# 프론트엔드 개발자 포트폴리오

Next.js 16 기반의 현대적인 포트폴리오 웹사이트입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| **Framework** | Next.js 16.0.10 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19.2.0 |
| **Styling** | Tailwind CSS 4.1.9 |
| **Component** | shadcn/ui (Radix UI) |
| **Form** | React Hook Form + Zod |
| **Analytics** | Vercel Analytics |
| **Font** | Pretendard Variable |

## 프로젝트 구조

```
├── app/
│   ├── globals.css       # 전역 스타일
│   ├── layout.tsx        # 루트 레이아웃
│   ├── page.tsx          # 메인 페이지
│   └── robots.ts         # 크롤러 차단 설정
├── components/
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── cards/            # 카드 컴포넌트 모음
│   ├── about.tsx         # 소개 섹션
│   ├── contact.tsx       # 연락처 섹션
│   ├── experience.tsx    # 경력 섹션
│   ├── faq.tsx           # Q&A 섹션
│   ├── footer.tsx        # 푸터
│   ├── header.tsx        # 헤더/네비게이션
│   ├── hero.tsx          # 히어로 섹션
│   ├── projects.tsx      # 프로젝트 섹션
├── hooks/                # 커스텀 훅
├── lib/
│   ├── data.ts           # 포트폴리오 데이터
│   ├── types.ts          # TypeScript 타입 정의
│   └── utils.ts          # 유틸리티 함수
├── public/               # 정적 파일 (이미지, 아이콘)
└── styles/               # 추가 스타일
```

## 시작하기

### 필수 조건

- Node.js 18.17 이상
- pnpm (권장) 또는 npm

### 설치

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 커스터마이징

### 개인 정보 수정

`lib/data.ts` 파일에서 포트폴리오 데이터를 수정할 수 있습니다:

- `personalInfo`: 이름, 직함, 연락처, 소셜 링크
- `projects`: 프로젝트 목록
- `skillCategories`: 기술 스택
- `experiences`: 경력 사항
- `faqs`: 자주 묻는 질문

### 이미지 변경

`public/` 폴더의 이미지를 교체하세요:

- `profile.png`: 프로필 사진
- `icon.svg`: 파비콘

### 스타일 수정

- `app/globals.css`: 전역 CSS 변수 및 스타일
- Tailwind CSS 클래스를 사용하여 컴포넌트 스타일 조정

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 프로덕션 서버 실행 |
| `pnpm lint` | ESLint 실행 |

## 성능/보안/캐싱

### Notion 캐싱
- `/api/notion/projects`: `force-dynamic` + 인메모리 캐시(10분) + `Cache-Control: no-store`
- `/api/notion/projects/[id]`: `revalidate=300` + 인메모리 캐시(5분)

### SEO 차단 (비공개 포트폴리오)
- `app/robots.ts`에서 전체 크롤러 차단
- `app/layout.tsx`의 `metadata.robots`로 noindex/noarchive 설정
- `next.config.mjs`에서 `X-Robots-Tag` 헤더 적용

### 보안 헤더
`next.config.mjs`에 기본 보안 헤더를 추가했습니다:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security` (HTTPS)

### Lighthouse 성능 테스트
```bash
pnpm build
pnpm start -p 3000
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json --only-categories=performance --chrome-flags="--headless"
```

## 이슈 트래킹

### [해결] Notion 커버 이미지 403 에러 (2025-02-10)

**증상**: 페이지 첫 진입 시 프로젝트 카드의 Notion 커버 이미지가 `403 Forbidden` 에러 발생. 프로젝트 모달 내부 이미지는 정상 로드.

**원인**: Notion `file` 타입 커버 이미지는 signed S3 URL(`prod-files-secure.s3.us-west-2.amazonaws.com`)로 약 1시간 후 만료됨. `/api/notion/projects` 라우트가 `force-static`으로 설정되어 빌드 시점의 URL이 고정 → 만료 후 403 발생. 모달은 열릴 때마다 `notion-client`로 fresh 데이터를 요청하므로 정상 동작.

**해결**: `/api/notion/projects/route.ts`를 `force-static` → `force-dynamic`으로 변경하고, 서버 인메모리 캐시(TTL 10분)를 적용하여 매 요청마다 fresh한 signed URL을 반환하도록 수정. 응답 헤더를 `Cache-Control: no-store`로 설정하여 CDN/브라우저가 만료된 URL을 캐싱하지 않도록 함.

**변경 파일**: `app/api/notion/projects/route.ts`

## 배포

Vercel에서 바로 배포할 수 있습니다:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 라이선스

MIT License
