# EN Translation Glossary

This is the finalized English translation glossary derived from the Korean source.

- Runtime source: `lib/i18n/content.ts` (`en` locale)
- Source reference: `lib/i18n/KO_SOURCE.md`

## UI Labels

- Header: `Open menu`, `Close menu`
- Navigation: `About`, `Projects`, `Experience`, `Activities`, `Education`, `Q&A`, `Contact`
- Hero: `Hello`, `View Projects`
- Section titles: `About`, `Featured Projects`, `Other Projects`, `Experience`, `Activities`, `Education`, `Q&A`, `Contact`
- Buttons/links: `Visit`, `Send Email`, `View Project`

## Accessibility Labels

- Theme: `Switch to light mode`, `Switch to dark mode`
- Locale: `Switch to English`, `Switch to Korean`
- Project card: `view details`
- Project modal: `Project details`, `Loading project details.`, `Close image`

## Content Blocks

- Personal, bio, experience, activities, education, and FAQ were translated into natural professional English.
- Long-form FAQ translation preserves intent and emphasis markers (`**...**`) used by the renderer.

## Notes

- All English strings are centralized in `lib/i18n/content.ts`.
- Components consume this dictionary through `useI18n()`.
