import type {
  PersonalInfo,
  Project,
  // SkillCategory,
  Experience,
  FAQ,
  Activity,
  Education,
} from './types';

// 개인 정보 - 여기서 쉽게 수정 가능
export const personalInfo: PersonalInfo = {
  name: '강용준',
  title: '프론트엔드 개발자',
  subtitle: '함께 성장하는 동료',
  subtitleRotations: [
    '함께 성장하는 동료',
    '몰입하며 해결하는',
    '유연하게 소통하는',
    '성장하는 개발자',
  ],
  location: '서울 송파구, 대한민국',
  status: '새로운 기회를 찾고 있습니다',
  email: 'gksmfcjs91@gmail.com',
  bio: [
    '· 다양한 B2B·B2G 프로젝트의 설계부터 개발-배포-운영까지 책임져 온 경험이 있습니다.',
    '· 프로젝트 상황에 따라 백엔드와 인프라 영역까지 폭넓게 경험하며 각 역할을 이해하고 원활한 협업 흐름을 만듭니다.',
    '· 팀 전체의 흐름에 맞춰 유연하게 기여하는 데 익숙합니다.',
    '· 최신 AI 개발 도구(Claude Code 등)를 도입하여 코드 퀄리티와 생산성의 균형을 유지하기 위해 노력하고 있습니다.',
    '· 팀과 함께 고민하고 개선하는 과정에서 성장의 즐거움을 느낍니다.',
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/JakeKang', icon: 'github' },
    {
      label: 'Notion',
      href: 'https://chavis-k.notion.site/YongJun-Kang-2f72e95e04e680af84afc882407a5b08?pvs=74',
      icon: 'notion',
    },
    { label: 'Email', href: 'mailto:gksmfcjs91@gmail.com', icon: 'email' },
  ],
  techBadges: ['React', 'Next.js', 'TypeScript', 'JavaScript'],
};

// 프로젝트 데이터 - Notion API나 CMS로 대체 가능
export const projects: Project[] = [];

// 기술 스택 데이터
// export const skillCategories: SkillCategory[] = [
//   {
//     title: '프론트엔드 개발',
//     description: '현대적이고 반응형인 인터페이스 구축',
//     skills: [
//       {
//         name: 'React & Next.js',
//         context: '컴포넌트 아키텍처, SSR/SSG, App Router',
//       },
//       {
//         name: 'TypeScript',
//         context: '타입 안전한 코드, 제네릭, 유틸리티 타입',
//       },
//       { name: 'Tailwind CSS', context: '빠른 UI 개발, 디자인 시스템' },
//       { name: '상태 관리', context: 'Redux, Zustand, React Query' },
//     ],
//   },
//   {
//     title: 'UX & 프로덕트',
//     description: '사용자 이해와 요구사항을 기능으로 변환',
//     skills: [
//       {
//         name: '디자인 시스템',
//         context: '확장 가능한 컴포넌트 라이브러리 구축 및 유지보수',
//       },
//       { name: '접근성', context: 'WCAG 준수, 스크린 리더 최적화' },
//       { name: '사용자 리서치', context: '인터뷰 진행, 피드백 분석' },
//       { name: '프로토타이핑', context: 'Figma 협업, 인터랙티브 목업' },
//     ],
//   },
//   {
//     title: '성능 최적화',
//     description: '속도와 우수한 사용자 경험을 위한 최적화',
//     skills: [
//       { name: 'Core Web Vitals', context: 'LCP, FID, CLS 최적화 전략' },
//       { name: '번들 최적화', context: '코드 스플리팅, 지연 로딩, 트리 쉐이킹' },
//       { name: '캐싱 전략', context: '서비스 워커, CDN, 브라우저 캐싱' },
//       {
//         name: '모니터링',
//         context: 'Lighthouse, Web Vitals 추적, 에러 모니터링',
//       },
//     ],
//   },
// ];

// 경력 데이터
export const experiences: Experience[] = [
  {
    company: '(주)에이치디에스',
    role: '선임 | 기업부설연구소',
    period: '2024.10 — 현재',
    highlights: [
      '프론트엔드 팀 리딩',
      '대규모 R&D 프로젝트의 가시화 시스템 구축 주도',
    ],
  },
  {
    company: '(주)에이펙스 이에스씨',
    role: '선임 | 개발2팀',
    period: '2020.07 — 2024.10',
    highlights: [
      '프로젝트 일정 관리 및 팀원 업무 조율',
      'Next.js/React 기반 B2B·B2G 프로젝트 10+ 개발',
    ],
  },
];

// Q&A 데이터 - 기술적인 질문들
export const faqs: FAQ[] = [
  {
    question: 'Q1. 기술적 도전과 성장',
    answer: `**생소한 기술을 빠르게 학습하고 팀과 함께 성장하는 것을 강점으로 생각합니다.**
            
 **지능형 경비안전 R&D 프로젝트**에서 Cesium 기반 3D GIS 시스템을 처음 접했습니다. 5명 규모의 팀을 리딩하며 주 2회 기술 세션을 운영하고, 공식 문서 기반 스터디와 각자의 PoC 결과를 공유하는 방식으로 팀 전체가 함께 학습했습니다. 그 결과 GPS 좌표 기반 실시간 추적, Polyline 렌더링 최적화 등 핵심 기능을 주도적으로 빠르게 구현할 수 있었습니다.
            
**AI기반 얼굴인식 시스템**은 1개월 내 의료 심포지엄 시연을 목표로 했습니다. TensorFlow.js를 빠르게 학습하고, AI 엔지니어와 매일 30분 싱크업을 진행하며 Blazeface, FaceLandmarks, CLIP 모델을 순차적으로 연동하는 파이프라인을 구축했습니다. 초기 인식률이 백분율로 92% 정도 나왔고 환경 변화에 따른 인식 저하 문제가 발생하여 추가적으로 Anti-Spoofing 모델을 연동해 96%까지 향상 시켰습니다. 이를 통해 해당 시연은 성공적으로 마무리 되었습니다.
             
**사이버범죄 연관분석 시스템**에서는 기존 Python/Java 기반 레거시 시스템의 검색 성능 문제를 해결해야 했습니다. 백엔드 개발팀과 협업하여 ELK Stack에 대해 조사 및 조언을 구하며 해당 시스템을 도입했습니다. 프론트엔드에서도 단일 필터를 세부 필터로 변경하는 등 UX적으로도 변화를 주었습니다. 그 결과 검색 성능이 80% 이상 개선되었습니다.
      `,
  },
  {
    question: 'Q2. 프로젝트에서 가장 중요하게 생각하는 것',
    answer: `**기술도 물론 중요하지만, 우선적으로 사용자의 문제를 해결하는 것입니다.**
             
**법인 세무 시스템**을 개발할 때, 단순히 “PDF 추출 기능”이 포함된 시스템을 만드는 것이 아닌 세무사들의 실제 업무를 이해하고자 인터뷰를 진행했습니다. 하루 수십~수백 장의 원천징수 영수증을 수작업으로 입력하는 비효율을 파악하고, PDF 자동 추출과 보고서 자동 생성 기능을 구현했습니다. 클라이언트로부터 “7일 걸리던 작업이 2시간 이내로 줄었다”는 피드백을 받았습니다.
             
**리탈코리아 3D 가상전시관**을 약 2년간 운영하며 Google Analytics로 사용자 행동 분석을 진행했습니다. 그중 모바일 사용자가 30%인 것을 확인하고 반응형 디자인을 강화했으며, 조회수 높은 제품은 협의를 통해 배치를 변경하고 이탈률 높은 페이지는 로딩 속도를 최적화 하기 위해 노력했습니다. 데이터를 시각화한 대시보드를 만들어 고객사 마케팅팀의 업무를 지원했습니다.
             
**위치기반사업자 백오피스 시스템**에서 Zustand를 선택한 이유는 팀의 절반이 신입분들이었습니다. ****Redux보다 학습 곡선이 낮아 팀 전체가 빠르게 적응할 수 있었고, Vite 도입으로 개발 서버 기동 시간을 15초에서 2초로 단축해 하루 수십 번 빌드하는 개발자들의 생산성을 높였습니다.

데이터 기반 의사결정, 사용자의 실제 문제 해결, 그리고 함께 일하는 팀을 고려한 기술 선택이 좋은 서비스를 만드는 핵심이라고 생각합니다.
    `,
  },
  {
    question: 'Q3. 앞으로 어떤 개발자로 성장하고 싶은가',
    answer: `**기술적 깊이와 넓이를 모두 갖춘 개발자가 되고 싶습니다.**
            
입사 초기, **리탈코리아 3D 가상전시관**은 제가 처음으로 설계부터 배포까지 전체 과정을 주도적으로 진행한 프로젝트였습니다. 주어진 기능을 구현하는 것을 넘어, 3D 인터랙션을 구현하고, Socket.io로 실시간 세미나 기능을 만들면서 “어떻게 하면 시간내에 완료하고, 사용자 경험을 개선할 수 있을까”를 고민하기 시작했습니다. 3D Mesh 최적화와 API 프리로딩으로 로딩 속도를 52% 개선한 경험과 여러 오류 상황을 대처하는 방법들은 이후 프로젝트들의 중요한 기반이 되었습니다.
            
**사이버보안 자동화 포탈** 프로젝트에서는 Java 기반 암호화 로직을 Node 기반으로 마이그레이션 하고, CentOS 7의 Node 버전 제약을 Docker로 해결하는 등 기술적 문제를 직접 해결했습니다. 레거시 시스템을 현대화하는 과정에서 “어떻게 점진적으로 개선할 수 있을까?”에 대해 진지한 고민을 해볼 수 있었습니다.
           
**지능형 유무인 복합 경비안전 R&D** 프로젝트에서 5명 규모의 팀을 리딩할 수 있는 기회가 생겼습니다. 빠른 적응과 팀워크를 위해 주 2회 기술 세션을 운영하며 Cesium, 물리보안 플랫폼이라는 생소한 기술과 서비스에대해 팀과 함께 학습하고, Gitlab MR 기반 코드 리뷰 문화를 정착시키기 위해 노력하고 있습니다. 주니어 개발자들의 코드를 리뷰하며 겪었던 문제들에 대해서 “왜 이렇게 하면 좋은지” 설명하는 것이 저 자신의 성장에도 도움이 된다는 것을 느끼고 있습니다.
          
이러한 경험들을 바탕으로 앞으로 프론트엔드뿐 아니라 백엔드, 인프라까지 전체 시스템을 이해하고, 기술적 의사결정의 근걸르 명확히 세지할 수 있는 개발자, 그리고 개인의 성장을 넘어 **팀 전체의 생산성과 제품의 완성도를 높이는 데 기여하는 개발자**로 성장하고 싶습니다.
    `,
  },
  {
    question: 'Q4. 요즘 관심을 가지고 있는 것',
    answer: `**AI 도구를 활용한 개발 생산성 향상**       
Claude Code 같은 AI 기반 에이전트에 관심을 가지고 있습니다. 단순히 코드 자동완성을 넘어서, 프롬프트 엔지니어링을 통해 보일러플레이트 생성, 리팩토링 제안, 테스트 코드 작성 등에 활용할 수 있는지 테스트해보고 있습니다. AI가 개발자를 대체하는 것이 아니라, 반복적인 작업을 줄이고 더 중요한 문제에 집중하거나, 평소 실현하기 어려웠던 문제를 빠르게 검증해볼 수 있게 도와주는 도구라고 생각합니다. 관련 자료들을 찾아보면서 어떻게 하면 개발 워크플로우에 자연스럽게 녹여낼 수 있을지 고민하고 있습니다.
            
**홈서버 운영**       
집에 개인 서버를 두고 이것저것 돌려보는 것을 좋아합니다. Proxmox 기반으로 가상 KVM 컨테이너를 구성해서 IoT 허브, NAS, 취미로 즐기는 게임 서버를 24시간 운영하고 있습니다. Nginx Proxy Manager로 각 로컬 서버에 도메인을 연결하고, Let’s Encrypt SSL 인증서를 적용하는 등 인프라 쪽도 직접 만져보고 있습니다. 프론트엔드 개발자지만 시스템 전반에 걸쳐 어떻게 동작하는지 직접 경험해보는 게 생각보다 재미있습니다.
            
**그 외**  
최근에는 위스키에도 관심이 생겨서 집에서 가볍게 즐기고 있습니다. 가끔 퇴근하고 여유로울 때 한 잔 하면서 하루를 정리하는 시간이 생각보다 낭만적입니다. ☺️`,
  },
];

// 대외/개인활동 데이터
export const activities: Activity[] = [
  {
    id: '1',
    title: '오픈소스 기여',
    organization: 'Shapespark',
    period: '2022',
    description: 'Safari 렌더링 이슈 내용 제보 및 업데이트 반영',
    type: 'personal',
    link: 'https://github.com/shapespark/shapespark-viewer-api/issues/11',
  },
  {
    id: '2',
    title: 'MTA 창업캠프',
    organization: 'Mondragon Team Academy',
    period: '2018',
    description: '지역사회 문제 해결방안을 주제로한 창업캠프',
    type: 'external',
    link: '',
  },
  {
    id: '3',
    title: '제1회 GNTECH 해커톤 대회',
    organization: '경남과학기술대학교',
    period: '2018',
    description: '농업과 4차산업의 융합 주제의 해커톤 은상 입상',
    type: 'external',
  },
];

// 학력 데이터
export const educations: Education[] = [
  {
    id: '1',
    school: '경남과학기술대학교',
    degree: '학사',
    field: '컴퓨터공학',
    period: '2014 — 2021',
    description: '졸업',
  },
];

// 네비게이션 아이템
export const navItems = [
  { label: '소개', href: '#about' },
  { label: '프로젝트', href: '#projects' },
  { label: '경력', href: '#experience' },
  { label: '활동', href: '#activities' },
  { label: '학력', href: '#education' },
  { label: 'Q&A', href: '#faq' },
  { label: '연락처', href: '#contact' },
];
