import type {
  PersonalInfo,
  Project,
  SkillCategory,
  Experience,
  FAQ,
} from "./types"

// 개인 정보 - 여기서 쉽게 수정 가능
export const personalInfo: PersonalInfo = {
  name: "홍길동",
  title: "프론트엔드 개발자",
  subtitle: "5년차 개발자",
  location: "서울, 대한민국",
  status: "새로운 기회를 찾고 있습니다",
  email: "hello@example.com",
  bio: [
    "프론트엔드 개발에 대한 저의 접근 방식은 단순히 깔끔한 코드를 작성하는 것을 넘어섭니다. 디자이너와 긴밀히 협력하여 픽셀 퍼펙트한 구현을 보장하고, 프로덕트 매니저와 함께 모든 기능의 \"왜\"를 이해하려고 노력합니다.",
    "접근성이 높고 성능이 뛰어난 애플리케이션을 만드는 것에 열정을 가지고 있습니다. 복잡한 데이터 시각화를 최적화하든, 매끄러운 온보딩 플로우를 설계하든, 사용자 경험을 향상시키는 세부 사항에 집중합니다.",
    "코딩을 하지 않을 때는 새로운 디자인 시스템을 탐구하거나, 오픈소스 프로젝트에 기여하거나, 커뮤니티에서 주니어 개발자들을 멘토링하고 있습니다.",
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/username", icon: "github" },
    { label: "Notion", href: "https://notion.so/username", icon: "notion" },
    { label: "Email", href: "mailto:hello@example.com", icon: "email" },
  ],
}

// 프로젝트 데이터 - Notion API나 CMS로 대체 가능
export const projects: Project[] = [
  {
    id: "1",
    title: "이커머스 플랫폼 리디자인",
    description:
      "전자상거래 전면 리디자인의 프론트엔드 개발을 주도하여 더 나은 UX와 성능 최적화를 통해 전환율을 35% 향상시켰습니다.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    link: "/projects/ecommerce-platform",
    github: "https://github.com/username/ecommerce",
  },
  {
    id: "2",
    title: "실시간 협업 도구",
    description:
      "분산 팀을 위한 실시간 편집, 프레젠스 표시, 오프라인 지원이 포함된 Notion 스타일의 협업 워크스페이스를 구축했습니다.",
    techStack: ["React", "WebSockets", "Y.js", "PostgreSQL"],
    link: "/projects/collaboration-tool",
  },
  {
    id: "3",
    title: "헬스케어 대시보드",
    description:
      "의료 전문가가 복잡한 시각화로 환자 데이터를 모니터링할 수 있는 접근성 높은 대시보드를 설계하고 개발했습니다.",
    techStack: ["Next.js", "D3.js", "React Query", "Accessibility"],
    link: "/projects/healthcare-dashboard",
  },
  {
    id: "4",
    title: "디자인 시스템 라이브러리",
    description:
      "5개 제품 팀에서 사용하는 50개 이상의 컴포넌트, 문서화, Figma 통합이 포함된 종합적인 디자인 시스템을 만들었습니다.",
    techStack: ["React", "Storybook", "CSS-in-JS", "Testing Library"],
    link: "/projects/design-system",
  },
]

// 기술 스택 데이터
export const skillCategories: SkillCategory[] = [
  {
    title: "프론트엔드 개발",
    description: "현대적이고 반응형인 인터페이스 구축",
    skills: [
      { name: "React & Next.js", context: "컴포넌트 아키텍처, SSR/SSG, App Router" },
      { name: "TypeScript", context: "타입 안전한 코드, 제네릭, 유틸리티 타입" },
      { name: "Tailwind CSS", context: "빠른 UI 개발, 디자인 시스템" },
      { name: "상태 관리", context: "Redux, Zustand, React Query" },
    ],
  },
  {
    title: "UX & 프로덕트",
    description: "사용자 이해와 요구사항을 기능으로 변환",
    skills: [
      { name: "디자인 시스템", context: "확장 가능한 컴포넌트 라이브러리 구축 및 유지보수" },
      { name: "접근성", context: "WCAG 준수, 스크린 리더 최적화" },
      { name: "사용자 리서치", context: "인터뷰 진행, 피드백 분석" },
      { name: "프로토타이핑", context: "Figma 협업, 인터랙티브 목업" },
    ],
  },
  {
    title: "성능 최적화",
    description: "속도와 우수한 사용자 경험을 위한 최적화",
    skills: [
      { name: "Core Web Vitals", context: "LCP, FID, CLS 최적화 전략" },
      { name: "번들 최적화", context: "코드 스플리팅, 지연 로딩, 트리 쉐이킹" },
      { name: "캐싱 전략", context: "서비스 워커, CDN, 브라우저 캐싱" },
      { name: "모니터링", context: "Lighthouse, Web Vitals 추적, 에러 모니터링" },
    ],
  },
]

// 경력 데이터
export const experiences: Experience[] = [
  {
    company: "테크코프 주식회사",
    role: "프론트엔드 개발자",
    period: "2023 — 현재",
    highlights: [
      "레거시 코드베이스에서 Next.js로의 마이그레이션을 주도하여 로드 시간을 60% 단축",
      "4명의 주니어 개발자를 멘토링하고 코드 리뷰 관행을 확립",
      "3개 제품 라인에서 사용되는 디자인 시스템 아키텍처 설계",
    ],
  },
  {
    company: "스타트업X",
    role: "프론트엔드 개발자",
    period: "2021 — 2023",
    highlights: [
      "월 10만 명 이상의 활성 사용자를 위한 핵심 제품 기능 구축",
      "WebSocket을 활용한 실시간 협업 기능 구현",
      "접근성 이니셔티브를 주도하여 WCAG AA 준수 달성",
    ],
  },
  {
    company: "디지털 에이전시",
    role: "주니어 프론트엔드 개발자",
    period: "2020 — 2021",
    highlights: [
      "React와 Vue.js를 사용하여 15개 이상의 클라이언트 프로젝트 납품",
      "개발 시간을 40% 단축하는 재사용 가능한 컴포넌트 라이브러리 개발",
      "클라이언트와 직접 협업하여 요구사항을 기능으로 변환",
    ],
  },
]

// Q&A 데이터 - 기술적인 질문들
export const faqs: FAQ[] = [
  {
    question: "주로 사용하는 기술 스택은 무엇인가요?",
    answer:
      "React와 Next.js를 메인으로 사용하며, TypeScript로 타입 안전성을 확보합니다. 스타일링은 Tailwind CSS를 선호하고, 상태 관리는 프로젝트 규모에 따라 Zustand나 React Query를 사용합니다. 테스트는 Jest와 React Testing Library로 진행합니다.",
  },
  {
    question: "프론트엔드 성능 최적화는 어떻게 접근하시나요?",
    answer:
      "Core Web Vitals(LCP, FID, CLS)를 기준으로 측정하고 개선합니다. 코드 스플리팅, 이미지 최적화, 지연 로딩을 적용하고, Lighthouse와 Web Vitals 라이브러리로 지속적으로 모니터링합니다. 번들 사이즈 분석도 정기적으로 수행합니다.",
  },
  {
    question: "컴포넌트 설계 철학은 어떻게 되나요?",
    answer:
      "단일 책임 원칙을 따르며, 재사용성과 테스트 용이성을 고려해 설계합니다. Compound Component 패턴과 Headless UI 패턴을 상황에 맞게 활용하고, Props drilling을 피하기 위해 Context나 Composition을 적절히 사용합니다.",
  },
  {
    question: "협업 시 코드 품질은 어떻게 관리하시나요?",
    answer:
      "ESLint와 Prettier로 일관된 코드 스타일을 유지하고, Husky로 pre-commit 훅을 설정합니다. PR 리뷰를 통해 코드 품질을 검증하며, 주요 기능에는 단위 테스트와 통합 테스트를 작성합니다. Storybook으로 컴포넌트 문서화도 병행합니다.",
  },
  {
    question: "새로운 기술을 학습하는 방법은?",
    answer:
      "공식 문서를 먼저 읽고, 작은 사이드 프로젝트로 직접 구현해봅니다. 기술 블로그와 컨퍼런스 영상을 통해 실무 적용 사례를 파악하고, 오픈소스 코드를 분석하여 베스트 프랙티스를 익힙니다.",
  },
]

// 네비게이션 아이템
export const navItems = [
  { label: "소개", href: "#about" },
  { label: "기술", href: "#skills" },
  { label: "프로젝트", href: "#projects" },
  { label: "경력", href: "#experience" },
  { label: "Q&A", href: "#faq" },
  { label: "연락처", href: "#contact" },
]
