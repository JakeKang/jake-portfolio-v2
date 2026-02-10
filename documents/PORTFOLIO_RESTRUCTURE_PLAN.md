# Portfolio Restructure Plan

> Created: 2025-02-05
> Last Updated: 2026-02-10
> Status: **Phase 1-6 Complete, 운영 최적화 반영 진행중**

---

## Overview

포트폴리오 프로젝트 내용 변경 및 개선 계획서

## Recent Maintenance (2026-02-10)

- Notion cover 403 대응: `/api/notion/projects` 캐싱 전략을 `force-dynamic + memory cache`로 전환
- 성능 최적화: subset 폰트 적용, Notion 전용 CSS 모달 지연 로딩, ProjectModal dynamic import
- 파일 정리: 미사용 UI 컴포넌트/훅/스타일 파일 제거
- 품질 검증: lint/test/build 모두 통과

### Notion Source

- **URL**: https://www.notion.so/chavis-k/YongJun-Kang-2f72e95e04e680af84afc882407a5b08
- **Page ID**: `2f72e95e04e680af84afc882407a5b08`

---

## Current Architecture (Updated)

### Data Management

- **Location**: `lib/data.ts` (하드코딩된 데이터)
- **Types**: `lib/types.ts` (TypeScript 인터페이스)

### Section Structure (app/page.tsx) — NEW

```
Header → Hero → About → Projects (Featured/Other) → Experience → Activities → Education → FAQ → Contact → Footer
```

### Component Files (Updated)

| Section    | File                                   | Data Source                   | Status                         |
| ---------- | -------------------------------------- | ----------------------------- | ------------------------------ |
| Hero       | `components/hero.tsx`                  | `personalInfo` + `techBadges` | ✅ Updated                     |
| About      | `components/about.tsx`                 | `personalInfo.bio`            | Unchanged                      |
| Skills     | `components/_backup/skills.backup.tsx` | `skillCategories`             | 🔒 Backed up & Hidden          |
| Projects   | `components/projects.tsx`              | `projects` (featured/other)   | ✅ Updated                     |
| Experience | `components/experience.tsx`            | `experiences`                 | Placeholder                    |
| Activities | `components/activities.tsx`            | `activities`                  | ✅ NEW                         |
| Education  | `components/education.tsx`             | `educations`                  | ✅ NEW                         |
| FAQ        | `components/faq.tsx`                   | `faqs`                        | Placeholder (Notion 연동 예정) |

---

## Completed Changes

### Phase 1: Component Backup ✅

- [x] `components/skills.tsx` → `components/_backup/skills.backup.tsx`
- [x] `components/faq.tsx` → `components/_backup/faq.backup.tsx`

### Phase 2: Hero Section Update ✅

**Added 4 Tech Badges:**

- React, Next.js, TypeScript, JavaScript

**Files Modified:**

- `lib/types.ts` — Added `techBadges?: string[]` to `PersonalInfo`
- `lib/data.ts` — Added `techBadges` array
- `components/hero.tsx` — Added Badge rendering with animation

### Phase 3: Skills Section Hidden ✅

- [x] Skills import commented out in `app/page.tsx`
- [x] "기술" removed from `navItems` in `lib/data.ts`
- [x] Backup preserved at `components/_backup/skills.backup.tsx`

### Phase 4: Projects Section Split ✅

**Structure:**

- 주요 프로젝트 (Featured) — Upper section
- 기타 프로젝트 (Other) — Lower section with separator

**Files Modified:**

- `lib/types.ts` — Added `category: 'featured' | 'other'` to `Project`
- `lib/data.ts` — Added `category` field to all projects
- `components/projects.tsx` — Split rendering by category

### Phase 5: Activities Section ✅ NEW

- [x] `lib/types.ts` — Added `Activity` interface
- [x] `lib/data.ts` — Added `activities` array (placeholder data)
- [x] `components/activities.tsx` — New component created
- [x] `app/page.tsx` — Added Activities import and rendering
- [x] `navItems` — Added "활동" link

### Phase 6: Education Section ✅ NEW

- [x] `lib/types.ts` — Added `Education` interface
- [x] `lib/data.ts` — Added `educations` array (placeholder data)
- [x] `components/education.tsx` — New component created
- [x] `app/page.tsx` — Added Education import and rendering
- [x] `navItems` — Added "학력" link

---

## Pending Changes

### Phase 7: Experience Section Update (Awaiting Notion Data)

- [ ] Update `experiences` in `lib/data.ts` with actual career data
- [ ] Keep current timeline UI structure

### Phase 8: Notion Integration (Future)

**Approach:** `@notionhq/client` + `notion-to-md`

**Required Files:**

- [ ] `lib/notion.ts` — Notion client & data fetchers
- [ ] `components/faq-notion.tsx` — Server Component for Notion FAQ
- [ ] `.env.local` — Notion credentials

**Environment Variables Needed:**

```bash
NOTION_TOKEN=secret_xxx
NOTION_PAGE_ID=2f72e95e04e680af84afc882407a5b08
```

---

## Notion Page Structure (Confirmed)

### Sections in Notion

```
1. Contact (Hero) - 기본 정보
2. 경력 - 회사 경력
3. 프로젝트
   ├── 주요 프로젝트 DB (Featured)
   └── 기타 프로젝트 DB (Other)
4. 대외/개인활동 카드
5. 학력
6. Q&A (토글 블록 형태)
```

### Project Database Properties

| Property   | Type         | Description          |
| ---------- | ------------ | -------------------- |
| 제목       | title        | 프로젝트명           |
| 소속       | text/select  | 회사/조직            |
| 클라이언트 | text         | 고객사               |
| 수행기간   | date         | 전체범위, 시작, 종료 |
| 기술스택   | multi_select | 사용 기술            |
| 메인콘텐츠 | page content | 스크린샷, 상세 내용  |

### Q&A Handling (Toggle Blocks)

- Q&A는 Database가 아닌 **토글 블록** 형태
- Notion API로 page blocks 조회 → toggle 블록 필터링

```typescript
const blocks = await notion.blocks.children.list({ block_id: pageId });
const toggles = blocks.results.filter((b) => b.type === 'toggle');
```

---

## File Changes Summary

### New Files Created

| File                                   | Purpose              |
| -------------------------------------- | -------------------- |
| `components/_backup/skills.backup.tsx` | Skills 컴포넌트 백업 |
| `components/_backup/faq.backup.tsx`    | FAQ 컴포넌트 백업    |
| `components/activities.tsx`            | 대외/개인활동 섹션   |
| `components/education.tsx`             | 학력 섹션            |

### Modified Files

| File                      | Changes                                                             |
| ------------------------- | ------------------------------------------------------------------- |
| `lib/types.ts`            | Added: `techBadges`, `Activity`, `Education`, Project `category`    |
| `lib/data.ts`             | Added: `techBadges`, `activities`, `educations`, project categories |
| `components/hero.tsx`     | Added tech badges with Badge component                              |
| `components/projects.tsx` | Split into featured/other sections                                  |
| `app/page.tsx`            | Hidden Skills, added Activities & Education                         |

---

## Navigation Structure (Updated)

```typescript
export const navItems = [
  { label: '소개', href: '#about' },
  { label: '프로젝트', href: '#projects' },
  { label: '경력', href: '#experience' },
  { label: '활동', href: '#activities' },
  { label: '학력', href: '#education' },
  { label: 'Q&A', href: '#faq' },
  { label: '연락처', href: '#contact' },
];
```

---

## Next Steps

1. **데이터 업데이트**: `lib/data.ts`의 플레이스홀더 데이터를 실제 데이터로 교체
   - `personalInfo` — 실제 정보
   - `projects` — Notion 프로젝트 데이터
   - `experiences` — 실제 경력
   - `activities` — 실제 활동
   - `educations` — 실제 학력

2. **Notion 연동** (선택):
   - Notion Integration 생성
   - API 토큰 발급
   - `lib/notion.ts` 구현
   - ISR 설정

---

## Progress Log

### 2025-02-05

- [x] Initial codebase analysis completed
- [x] Current architecture documented
- [x] Notion CMS integration researched
- [x] Step-by-step plan created
- [x] Notion page structure confirmed
- [x] **Phase 1**: Component backup completed
- [x] **Phase 2**: Hero tech badges added
- [x] **Phase 3**: Skills section hidden
- [x] **Phase 4**: Projects section split (featured/other)
- [x] **Phase 5**: Activities section added
- [x] **Phase 6**: Education section added
- [x] **Phase 7**: Experience update (awaiting data)
- [x] **Phase 8**: Notion integration (future)

---

## References

- Notion API Docs: https://developers.notion.com/
- @notionhq/client: https://github.com/makenotion/notion-sdk-js
- notion-to-md: https://github.com/souvikinator/notion-to-md
