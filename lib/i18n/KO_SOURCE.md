# KO Source Glossary

This is the Korean source glossary for the portfolio i18n system.

- Runtime source: `lib/i18n/content.ts` (`ko` locale)
- Purpose: define canonical Korean copy before translation

## UI Labels

- Header: `메뉴 열기`, `메뉴 닫기`
- Navigation: `소개`, `프로젝트`, `경력`, `활동`, `학력`, `Q&A`, `연락처`
- Hero: `안녕하세요`, `프로젝트 보기`
- Section titles: `소개`, `주요 프로젝트`, `기타 프로젝트`, `경력`, `대외/개인활동`, `학력`, `Q&A`, `연락처`
- Buttons/links: `바로가기`, `이메일 보내기`, `프로젝트 보기`

## Accessibility Labels

- Theme: `라이트 모드로 전환`, `다크 모드로 전환`
- Locale: `영어로 전환`, `한국어로 전환`
- Project card: `상세 보기`
- Project modal: `프로젝트 상세 정보`, `프로젝트 정보를 불러오는 중입니다.`, `이미지 닫기`

## Content Blocks

- Personal, bio, experience, activities, education, FAQ: all preserved in Korean under `content.ts`.
- Long-form Korean FAQ text is stored as-is to keep original tone and nuance.

## Notes

- All Korean strings are centralized in `lib/i18n/content.ts`.
- Components consume this dictionary through `useI18n()`.
