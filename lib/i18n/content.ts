import type {
  Activity,
  Education,
  Experience,
  FAQ,
  PersonalInfo,
} from '@/lib/types';

export type Locale = 'ko' | 'en';

export const DEFAULT_LOCALE: Locale = 'ko';

export const LOCALES: Locale[] = ['ko', 'en'];

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'ko' || value === 'en';
}

type NavItem = {
  label: string;
  href: string;
};

type HeaderContent = {
  brand: string;
  menuOpenAria: string;
  menuCloseAria: string;
};

type HeroContent = {
  greeting: string;
  introSuffix: string;
  profileAlt: string;
  taglineLine1: string;
  taglineLine2: string;
  viewProjects: string;
  scroll: string;
};

type AboutContent = {
  title: string;
  headline: string;
};

type ProjectsContent = {
  featuredTitle: string;
  featuredSubtitle: string;
  otherTitle: string;
  otherSubtitle: string;
  loading: string;
};

type ExperienceContent = {
  title: string;
  subtitle: string;
};

type ActivitiesContent = {
  title: string;
  subtitle: string;
  visitLink: string;
};

type EducationContent = {
  title: string;
  subtitle: string;
};

type FaqContent = {
  title: string;
  subtitle: string;
};

type ContactContent = {
  title: string;
  subtitle: string;
  sendEmail: string;
  githubAria: string;
  notionAria: string;
  emailAria: string;
};

type ProjectCardContent = {
  detailAriaSuffix: string;
};

type ProjectModalContent = {
  srTitle: string;
  srLoading: string;
  srDescription: string;
  closeImageAria: string;
  viewProject: string;
};

type ThemeToggleContent = {
  toLightAria: string;
  toDarkAria: string;
};

type LocaleToggleContent = {
  toEnglishAria: string;
  toKoreanAria: string;
  shortKo: string;
  shortEn: string;
};

type FooterContent = {
  copyright: string;
};

export type PortfolioContent = {
  header: HeaderContent;
  navItems: NavItem[];
  personalInfo: PersonalInfo;
  hero: HeroContent;
  about: AboutContent;
  projects: ProjectsContent;
  experience: ExperienceContent;
  experiences: Experience[];
  activitiesSection: ActivitiesContent;
  activities: Activity[];
  educationSection: EducationContent;
  educations: Education[];
  faqSection: FaqContent;
  faqs: FAQ[];
  contact: ContactContent;
  projectCard: ProjectCardContent;
  projectModal: ProjectModalContent;
  themeToggle: ThemeToggleContent;
  localeToggle: LocaleToggleContent;
  footer: FooterContent;
};

const koContent: PortfolioContent = {
  header: {
    brand: 'Portfolio',
    menuOpenAria: '메뉴 열기',
    menuCloseAria: '메뉴 닫기',
  },
  navItems: [
    { label: '소개', href: '#about' },
    { label: '프로젝트', href: '#projects' },
    { label: '경력', href: '#experience' },
    { label: '활동', href: '#activities' },
    { label: '학력', href: '#education' },
    { label: 'Q&A', href: '#faq' },
    { label: '연락처', href: '#contact' },
  ],
  personalInfo: {
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
        href: 'https://chavis-k.notion.site/',
        icon: 'notion',
      },
      { label: 'Email', href: 'mailto:gksmfcjs91@gmail.com', icon: 'email' },
    ],
    techBadges: ['React', 'Next.js', 'TypeScript', 'JavaScript'],
  },
  hero: {
    greeting: '안녕하세요',
    introSuffix: '입니다',
    profileAlt: '프로필 사진',
    taglineLine1: '기술보다 문제 해결에 몰입합니다.',
    taglineLine2: '복잡한 과정을 단순화하여 제품의 본질적인 편리함을 만듭니다.',
    viewProjects: '프로젝트 보기',
    scroll: 'Scroll',
  },
  about: {
    title: '소개',
    headline:
      '기술과 비즈니스, 사용자 경험 사이의 최적점을 찾아 제품의 실질적인 가치를 완성합니다.',
  },
  projects: {
    featuredTitle: '주요 프로젝트',
    featuredSubtitle: '실제 문제를 해결한 작업물들',
    otherTitle: '기타 프로젝트',
    otherSubtitle: '그 외 진행한 프로젝트들',
    loading: '프로젝트 데이터를 불러오는 중입니다.',
  },
  experience: {
    title: '경력',
    subtitle: '지금까지의 커리어 여정',
  },
  experiences: [
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
  ],
  activitiesSection: {
    title: '대외/개인활동',
    subtitle: '업무 외 다양한 활동들',
    visitLink: '바로가기',
  },
  activities: [
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
  ],
  educationSection: {
    title: '학력',
    subtitle: '교육 배경',
  },
  educations: [
    {
      id: '1',
      school: '경남과학기술대학교',
      degree: '학사',
      field: '컴퓨터공학',
      period: '2014 — 2021',
      description: '졸업',
    },
  ],
  faqSection: {
    title: 'Q&A',
    subtitle: '저의 경험과 생각들을 공유합니다.',
  },
  faqs: [
    {
      question: 'Q1. 기술적 도전과 성장',
      answer: `**생소한 기술을 마주했을 때 빠르게 몰입하고, 그 과정에서 팀과 함께 성장하는 것을 즐깁니다.**

**지능형 경비안전 R&D 프로젝트**에서 처음 접한 **Cesium 기반 3D GIS**를 도입할 때, 5명의 팀을 리딩하며 주 2회 기술 세션을 운영했습니다. 공식 문서를 함께 스터디하고 각자의 PoC 결과를 공유하며 팀 전체가 함께 학습했습니다. 그 결과, 실시간 GPS 추적과 Polyline 렌더링 최적화와 같은 핵심 기능을 단기간에 성공적으로 구현할 수 있었습니다.

**AI기반 얼굴인식 시스템**에서는 1개월 내 의료 심포지엄 시연을 목표로 했습니다. TensorFlow.js를 학습하며, AI 엔지니어와 매일 30분간 정기 미팅을 진행하며 Blazeface, FaceLandmarks, CLIP 모델을 순차적으로 연동하는 파이프라인을 구축했습니다. 초기 인식률이 백분율로 92% 정도 나왔고 환경 변화에 따른 인식 저하 문제가 발생하여 추가적으로 Anti-Spoofing 모델을 연동해 **정확도를 96%까지 향상** 시켰습니다. 이를 통해 해당 시연을 무사히 마칠 수 있었습니다.

**사이버범죄 연관분석 시스템**에서는 기존 Python/Java 기반 레거시 시스템의 검색 성능 문제를 해결해야 했습니다. 백엔드 개발팀과 협업하여 ELK Stack에 대해 조사 및 조언을 구하며 해당 시스템을 도입했습니다. 프론트엔드에서도 단일 필터를 세부 필터로 변경하는 등 UX를 개선하는 노력을 기울였습니다. 이러한 전방위적인 최적화 덕분에 **기존 대비 80% 이상의 성능 향상**을 이끌어내며 시스템 안정성을 확보했습니다.`,
    },
    {
      question: 'Q2. 프로젝트에서 가장 중요하게 생각하는 것',
      answer: `**기술도 물론 중요하지만, 사용자의 문제를 해결하는 것이 우선이라 생각합니다.**

**법인 세무 시스템**을 개발할 때, 세무사들의 실제 업무를 이해하고자 인터뷰를 진행했습니다. 하루 수십~수백 장의 원천징수 영수증 데이터를 수작업으로 입력하는 비효율을 파악하고, PDF 자동 추출과 보고서 자동 생성 기능을 구현했습니다. 실제 업무의 사용자로부터 "7일 걸리던 작업이 2시간 이내로 줄었다"는 피드백을 받아 뿌듯했던 경험이 있습니다.

**3D 가상전시관**을 약 2년간 운영하며 Google Analytics로 사용자 행동 분석을 했었습니다. 그중 모바일 사용자가 30%인 것을 확인하고 해당 데이터를 기반으로 반응형 디자인을 강화했습니다. 조회수가 높은 제품은 배치를 변경하고, 이탈률 높은 페이지는 로딩 속도를 최적화 하기 위해 노력했습니다. 수집 데이터를 시각화한 대시보드를 만들어 고객사 마케팅팀의 업무를 지원했습니다.

**위치기반사업자 백오피스 시스템**에서 Zustand를 선택한 이유는 팀의 절반이 신입분들이었습니다. Redux보다 학습 곡선이 낮다고 판단하여 팀 전체가 빠르게 적응할 수 있겠다고 생각했습니다. Vite 도입으로 개발 서버 기동 시간을 **15초에서 2초**로 단축해 하루 수십 번 빌드하는 개발자들의 생산성을 높였습니다.

데이터 기반 의사결정, 사용자의 실제 문제 해결, 그리고 함께 일하는 팀을 고려한 기술 선택이 좋은 서비스를 만드는 핵심이라고 생각합니다.`,
    },
    {
      question: 'Q3. 앞으로 어떤 개발자로 성장하고 싶은가',
      answer: `**전문성을 바탕으로 시스템 전체를 볼 수 있는, 명확한 근거로 의사결정을 내릴 수 있는 개발자가 되고 싶습니다.**

초기 설계부터 배포까지 주도했던 **3D 가상전시관**은 제 성장의 소중한 밑거름이 되었습니다. 단순히 기능을 구현하는 수준을 넘어, 3D Mesh 최적화와 API 프리로딩으로 **로딩 속도를 52% 개선**하며 사용자 경험을 본질적으로 고민하기 시작했습니다. 이때 쌓은 경험들은 이후 마주한 수많은 난관을 대처할 수 있는 든든한 기반이 되었습니다.

**사이버보안 자동화 포탈** 프로젝트에서는 Java 기반 암호화 로직을 Node 기반으로 마이그레이션 하고, CentOS 7의 인프라 제약을 Docker로 해결하는 등 기술적 문제를 직접 해결했습니다. 레거시 시스템을 현대화하는 과정에서 '어떻게 하면 시스템을 안정적이고 점진적으로 개선할 수 있을까?'에 대해 진지한 고민을 해볼 수 있었습니다.

최근 **지능형 유무인 복합 경비안전 R&D** 프로젝트에서는 5명 규모의 팀을 리딩하며 기술적 공유의 가치를 실천하고 있습니다. 주 2회 기술 세션을 운영하고, **Gitlab MR 기반의 코드 리뷰 문화**를 정착시켰습니다. 팀원들에게 '왜 이 방식이 더 효율적인지' 설명하기 위해 더 많은 문서와 정보를 찾아보며 스스로를 재검증할 수 있었습니다. 이 과정이 결국 저 또한 한 단계 더 깊게 성장하는 동력이 될 수 있음을 체감하고 있습니다.

이러한 경험들을 바탕으로 프론트엔드뿐 아니라 백엔드, 인프라까지 전체 시스템을 이해하고, 명확한 기술적 근거를 제시할 수 있는 개발자, 그리고 개인의 성장을 넘어 **팀 전체의 생산성과 제품의 완성도를 높이는 데 기여하는 개발자**로 성장하고 싶습니다.`,
    },
    {
      question: 'Q4. 요즘 관심을 가지고 있는 것',
      answer: `**AI 도구를 활용한 개발 생산성 향상**
Claude Code 같은 AI 기반 에이전트에 관심이 있습니다. 단순한 코드 생성을 넘어, 프롬프트 엔지니어링을 활용한 보일러플레이트 생성, 리팩토링 제안, 테스트 코드 작성 등 활용방안들을 테스트해 보고 있습니다. AI는 개발자를 대체하는 존재가 아니라, 반복적인 작업을 줄이고 더 중요한 문제에 집중할 수 있게 돕는 강력한 파트너라고 생각합니다.

특히 최근에는 평소 구상해 왔던 **사이드 프로젝트의 기획부터 설계까지 AI 에이전트와 '페어 프로그래밍'**을 하며 빠르게 구체화하면서, 평소 구현하기 까다로웠던 기능들을 빠르게 검증하는 과정에서 큰 재미를 느끼고 있습니다. 관련 자료들을 찾아보면서 이러한 도구를 실무 워크플로우에 어떻게 자연스럽게 녹여낼 수 있을지도 고민하고 있습니다.

**홈서버 운영**
집에 개인 서버를 구축해 간단하게 인프라의 전 과정을 직접 테스트하고 운영해 보고 있습니다. Proxmox 기반의 가상 환경(KVM)을 구성하여 IoT 허브, NAS, 취미로 즐기는 게임 서버를 24시간 운영하고 있습니다. Nginx Proxy Manager로 각 로컬 서버에 도메인을 연결하고, Let’s Encrypt SSL 인증서를 적용하는 등 인프라 쪽도 직접 만져보고 있습니다. 프론트엔드 개발자지만 시스템 전체가 어떻게 유기적으로 맞물려 돌아가는지 경험하는 과정에서 큰 재미와 성취감을 느끼고 있습니다.

**그 외**
최근에는 위스키에도 관심이 생겨서 집에서 가볍게 즐기고 있습니다. 가끔 퇴근 후 여유로운 시간에 하루를 마무리하며, 일상을 정리하고 재충전하는 소중한 시간이 되고 있습니다. ☺️`,
    },
  ],
  contact: {
    title: '연락처',
    subtitle: '새로운 기회에 항상 열려있습니다. 편하게 연락주세요.',
    sendEmail: '이메일 보내기',
    githubAria: 'GitHub 프로필',
    notionAria: 'Notion 페이지',
    emailAria: '이메일',
  },
  projectCard: {
    detailAriaSuffix: '상세 보기',
  },
  projectModal: {
    srTitle: '프로젝트 상세 정보',
    srLoading: '프로젝트 정보를 불러오는 중입니다.',
    srDescription:
      '프로젝트 상세 설명, 사용 기술, 기간, 관련 링크를 확인할 수 있습니다.',
    closeImageAria: '이미지 닫기',
    viewProject: '프로젝트 보기',
  },
  themeToggle: {
    toLightAria: '라이트 모드로 전환',
    toDarkAria: '다크 모드로 전환',
  },
  localeToggle: {
    toEnglishAria: '영어로 전환',
    toKoreanAria: '한국어로 전환',
    shortKo: 'KO',
    shortEn: 'EN',
  },
  footer: {
    copyright: 'Copyright© {year} Jake Kang. All rights reserved.',
  },
};

const enContent: PortfolioContent = {
  header: {
    brand: 'Portfolio',
    menuOpenAria: 'Open menu',
    menuCloseAria: 'Close menu',
  },
  navItems: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Activities', href: '#activities' },
    { label: 'Education', href: '#education' },
    { label: 'Q&A', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  personalInfo: {
    name: 'Yongjun Kang',
    title: 'Frontend Engineer',
    subtitle: 'A teammate who grows with others',
    subtitleRotations: [
      'A teammate who grows with others',
      'Focused on solving real problems',
      'Flexible and clear communicator',
      'An engineer who keeps improving',
    ],
    location: 'Songpa-gu, Seoul, Republic of Korea',
    status: 'Open to new opportunities',
    email: 'gksmfcjs91@gmail.com',
    bio: [
      '· I have led full-cycle delivery across diverse B2B and B2G projects, from architecture to development, deployment, and operations.',
      '· Depending on project needs, I also work across backend and infrastructure, which helps me understand each role and keep collaboration smooth.',
      '· I am comfortable contributing flexibly in line with the overall team workflow.',
      '· I actively use modern AI development tools (such as Claude Code) to balance code quality and productivity.',
      '· I find real joy in growing through collaborative problem solving and continuous improvement with the team.',
    ],
    socialLinks: [
      { label: 'GitHub', href: 'https://github.com/JakeKang', icon: 'github' },
      {
        label: 'Notion',
        href: 'https://chavis-k.notion.site/',
        icon: 'notion',
      },
      { label: 'Email', href: 'mailto:gksmfcjs91@gmail.com', icon: 'email' },
    ],
    techBadges: ['React', 'Next.js', 'TypeScript', 'JavaScript'],
  },
  hero: {
    greeting: 'Hello',
    introSuffix: '',
    profileAlt: 'Profile photo',
    taglineLine1:
      'I focus on solving real problems over chasing technology itself.',
    taglineLine2:
      'I simplify complexity to deliver products that feel truly useful.',
    viewProjects: 'View Projects',
    scroll: 'Scroll',
  },
  about: {
    title: 'About',
    headline:
      'I find the optimal point between technology, business, and user experience to create meaningful product value.',
  },
  projects: {
    featuredTitle: 'Featured Projects',
    featuredSubtitle: 'Work that solved real-world problems',
    otherTitle: 'Other Projects',
    otherSubtitle: 'Additional projects I have worked on',
    loading: 'Loading project data...',
  },
  experience: {
    title: 'Experience',
    subtitle: 'My career journey so far',
  },
  experiences: [
    {
      company: 'HDS Co., Ltd.',
      role: 'Senior Engineer | Corporate R&D Center',
      period: 'Oct 2024 — Present',
      highlights: [
        'Leading the frontend team',
        'Driving the implementation of a visualization platform for large-scale R&D projects',
      ],
    },
    {
      company: 'APEX ESC Co., Ltd.',
      role: 'Senior Engineer | Development Team 2',
      period: 'Jul 2020 — Oct 2024',
      highlights: [
        'Managed project schedules and coordinated team workloads',
        'Built 10+ B2B and B2G projects with Next.js and React',
      ],
    },
  ],
  activitiesSection: {
    title: 'Activities',
    subtitle: 'Professional and personal activities beyond day-to-day work',
    visitLink: 'Visit',
  },
  activities: [
    {
      id: '1',
      title: 'Open Source Contribution',
      organization: 'Shapespark',
      period: '2022',
      description:
        'Reported a Safari rendering issue and contributed to a related update',
      type: 'personal',
      link: 'https://github.com/shapespark/shapespark-viewer-api/issues/11',
    },
    {
      id: '2',
      title: 'MTA Startup Camp',
      organization: 'Mondragon Team Academy',
      period: '2018',
      description:
        'Startup camp focused on solutions for local community challenges',
      type: 'external',
      link: '',
    },
    {
      id: '3',
      title: '1st GNTECH Hackathon',
      organization: 'Gyeongnam National University of Science and Technology',
      period: '2018',
      description:
        'Won Silver Prize in a hackathon on agriculture and Industry 4.0 convergence',
      type: 'external',
    },
  ],
  educationSection: {
    title: 'Education',
    subtitle: 'Academic background',
  },
  educations: [
    {
      id: '1',
      school: 'Gyeongnam National University of Science and Technology',
      degree: 'B.S.',
      field: 'Computer Engineering',
      period: '2014 — 2021',
      description: 'Graduated',
    },
  ],
  faqSection: {
    title: 'Q&A',
    subtitle: 'How I think, work, and grow',
  },
  faqs: [
    {
      question: 'Q1. Technical Challenges and Growth',
      answer: `**I enjoy diving into unfamiliar technologies quickly and growing with the team through that process.**

In an **Intelligent Security R&D project**, I introduced a **Cesium-based 3D GIS** stack that was new to us. While leading a five-member team, I ran technical sessions twice a week. We studied official docs together, shared individual PoC outcomes, and learned as one team. As a result, we implemented core capabilities like real-time GPS tracking and optimized polyline rendering in a short timeline.

For an **AI-based face recognition system**, we had one month to prepare a medical symposium demo. While learning TensorFlow.js, I held daily 30-minute syncs with an AI engineer and built a pipeline that integrated BlazeFace, FaceLandmarks, and CLIP in sequence. Initial recognition was around 92%, but performance dropped in changing environments. After integrating an additional anti-spoofing model, we improved accuracy to **96%** and delivered the demo successfully.

In a **cybercrime correlation analysis system**, we needed to fix search performance issues in a legacy Python/Java stack. I collaborated with the backend team to evaluate and adopt ELK Stack. On the frontend side, I improved UX by turning a single filter into more granular filters. These end-to-end optimizations delivered **over 80% performance improvement** and helped stabilize the system.`,
    },
    {
      question: 'Q2. What Matters Most in Projects',
      answer: `**Technology matters, but solving real user problems comes first.**

While building a **corporate tax system**, I interviewed tax accountants to understand their actual workflow. I found they were manually entering dozens to hundreds of withholding receipt records every day. I implemented automatic PDF extraction and automated report generation to remove that bottleneck. Hearing feedback like "a task that used to take seven days now takes under two hours" was one of my most rewarding moments.

I also operated a **3D virtual exhibition platform** for about two years and analyzed user behavior with Google Analytics. After confirming mobile users accounted for 30%, I strengthened responsive design accordingly. I adjusted layouts for high-view products and optimized loading speed on high-bounce pages. I also built a visualization dashboard from collected data to support the client marketing team.

In a **location-based back-office system**, I chose Zustand because about half of the team were junior developers. Compared to Redux, the learning curve was lower, so the whole team could ramp up faster. By introducing Vite, we reduced dev server startup time from **15 seconds to 2 seconds**, which significantly improved daily developer productivity.`,
    },
    {
      question: 'Q3. What Kind of Engineer I Want to Become',
      answer: `**I aim to become an engineer who sees the whole system and makes decisions based on clear technical rationale.**

The **3D virtual exhibition platform**, which I led from initial design to deployment, became a major foundation for my growth. I moved beyond feature delivery and started focusing on essential user experience, improving loading speed by **52%** through 3D mesh optimization and API preloading. Those lessons became a strong base for handling the many challenges that followed.

In a **cybersecurity automation portal**, I solved technical issues directly by migrating Java-based encryption logic to Node.js and addressing CentOS 7 infrastructure constraints with Docker. While modernizing legacy systems, I had a chance to deeply think about how to improve systems safely and incrementally.

More recently, in an **intelligent integrated security R&D project**, I have been leading a five-member team and practicing active technical knowledge sharing. I run technical sessions twice a week and established a code review culture based on GitLab merge requests. Explaining why certain approaches are more effective pushes me to validate my own thinking through deeper research.

Building on these experiences, I want to grow into an engineer who understands not only frontend but also backend and infrastructure, provides clear technical reasoning, and contributes to both team productivity and product quality at scale.`,
    },
    {
      question: 'Q4. What I Am Interested In These Days',
      answer: `**Improving development productivity with AI tools**
I am highly interested in AI agents such as Claude Code. Beyond simple code generation, I have been testing practical applications like prompt-driven boilerplate generation, refactoring suggestions, and test code creation. I see AI not as a replacement for developers, but as a powerful partner that reduces repetitive work and helps us focus on high-value problems.

Recently, I have especially enjoyed using AI agents for "pair programming" from planning to architecture in side projects I had been considering for a while. It has made it much faster to validate features that were previously difficult to implement. I am also exploring how these tools can fit naturally into real-world engineering workflows.

**Running a home server**
I run a personal home server where I test and operate the full infrastructure lifecycle hands-on. I built a Proxmox-based virtual environment (KVM) and run an IoT hub, NAS, and hobby game servers 24/7. I also manage domain routing for local services with Nginx Proxy Manager and apply Let's Encrypt SSL certificates myself. Even as a frontend engineer, I find great satisfaction in understanding how the whole system works together.

**Beyond work**
Lately I have also become interested in whisky and enjoy it casually at home. Having a glass at the end of the day has become a small but meaningful way to wrap up and recharge.`,
    },
  ],
  contact: {
    title: 'Contact',
    subtitle: 'I am always open to new opportunities. Feel free to reach out.',
    sendEmail: 'Send Email',
    githubAria: 'GitHub profile',
    notionAria: 'Notion page',
    emailAria: 'Email',
  },
  projectCard: {
    detailAriaSuffix: 'view details',
  },
  projectModal: {
    srTitle: 'Project details',
    srLoading: 'Loading project details.',
    srDescription:
      'You can check detailed project descriptions, technology stack, timeline, and related links.',
    closeImageAria: 'Close image',
    viewProject: 'View Project',
  },
  themeToggle: {
    toLightAria: 'Switch to light mode',
    toDarkAria: 'Switch to dark mode',
  },
  localeToggle: {
    toEnglishAria: 'Switch to English',
    toKoreanAria: 'Switch to Korean',
    shortKo: 'KO',
    shortEn: 'EN',
  },
  footer: {
    copyright: 'Copyright© {year} Jake Kang. All rights reserved.',
  },
};

export const portfolioContentByLocale: Record<Locale, PortfolioContent> = {
  ko: koContent,
  en: enContent,
};

export function getPortfolioContent(locale: Locale): PortfolioContent {
  return portfolioContentByLocale[locale];
}
