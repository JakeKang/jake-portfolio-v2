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
│   └── page.tsx          # 메인 페이지
├── components/
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── about.tsx         # 소개 섹션
│   ├── contact.tsx       # 연락처 섹션
│   ├── experience.tsx    # 경력 섹션
│   ├── faq.tsx           # Q&A 섹션
│   ├── footer.tsx        # 푸터
│   ├── header.tsx        # 헤더/네비게이션
│   ├── hero.tsx          # 히어로 섹션
│   ├── projects.tsx      # 프로젝트 섹션
│   └── skills.tsx        # 기술 스택 섹션
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

- `profile.jpg`: 프로필 사진
- `icon.svg`, `icon-*.png`: 파비콘
- `apple-icon.png`: Apple 터치 아이콘

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

## 배포

Vercel에서 바로 배포할 수 있습니다:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 라이선스

MIT License
