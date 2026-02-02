# Leading with AI - UX Refresh Plan

## Brand Identity (Finalized)

- **Name:** Leading with AI
- **Tagline:** Leading with AI
- **Sub-header:** A 3-minute assessment to discover how AI can amplify your leadership style—and what you should build next.
- **Core Color:** Blue

## Design Inspiration: Firecrawl.dev

Key takeaways:
- **White/light backgrounds** with blue accents (not full gradient bg)
- **Generous whitespace** - content breathes
- **Clear typography hierarchy** - one thing demands attention at a time
- **Clean, minimal** - no trust signals or social proof for now
- **Icons that shine** - let the UI elements and icons carry the visual interest

## Current State Issues

| Element | Issue | Firecrawl Solution |
|---------|-------|-------------------|
| Background | Full dark gradient feels heavy | White bg with green accents |
| Badge | Small, generic, clipart target icon | Refined logo/wordmark |
| Title hierarchy | Title and subtitle compete | Clear size/weight differentiation |
| Form card | Low contrast against gradient | White card on light bg, green CTA |
| Progress indicator | "Question 1 of 8" feels like a chore | Minimal dots or hidden count |
| Results page | Needs polish | Card-based, generous spacing |

## Proposed Visual System

### Color Palette (Blue-forward)

```css
:root {
  /* Primary */
  --blue-600: #2563EB;       /* Primary actions */
  --blue-500: #3B82F6;       /* Hover states */
  --blue-100: #DBEAFE;       /* Light backgrounds */
  --blue-50: #EFF6FF;        /* Subtle tints */

  /* Neutrals */
  --white: #FFFFFF;
  --gray-50: #F9FAFB;        /* Page background */
  --gray-100: #F3F4F6;       /* Card backgrounds */
  --gray-600: #4B5563;       /* Body text */
  --gray-900: #111827;       /* Headings */
}
```

### Typography

```css
/* Headings: Space Grotesk (keep) */
.title-xl { font-size: 3rem; font-weight: 700; }
.title-lg { font-size: 2rem; font-weight: 600; }
.title-md { font-size: 1.5rem; font-weight: 600; }

/* Body: Inter (keep) */
.body-lg { font-size: 1.125rem; line-height: 1.75; }
.body-md { font-size: 1rem; line-height: 1.6; }
.body-sm { font-size: 0.875rem; line-height: 1.5; }
```

### Layout Changes

#### Header
- Smaller, refined "Leading with AI" wordmark (no badge bubble)
- Title "Leading with AI" as hero text, large
- Sub-header below, muted

#### Intro Form
- White card on light gray background
- Blue CTA button
- Remove target icon or replace with subtle leadership/AI mark
- No trust signals for now - keep it clean

#### Questions
- White cards, subtle shadow
- Progress: minimal dot indicators or fraction "3/8"
- Larger touch targets for options
- Micro-animations on selection

#### Results Page
- Hero moment: Archetype title large, centered
- Generated image prominent
- Identity + Strength in clean cards
- AI Unlock in highlighted callout box
- Share buttons refined, not afterthought

## Implementation Phases

### Phase 1: Typography & Spacing (1-2 hours)
- Update CSS variables for new palette
- Increase whitespace throughout
- Refine type hierarchy

### Phase 2: Layout Structure (2-3 hours)
- Light background with card-based layout
- Redesign header/intro section
- Polish form card

### Phase 3: Question Flow (2-3 hours)
- Card-based question layout
- Improved progress indicator
- Selection animations

### Phase 4: Results Page (2-3 hours)
- Hero archetype reveal
- Clean card layout for details
- AI Unlock callout styling
- Refined share section

### Phase 5: Polish (1-2 hours)
- Transitions between states
- Loading state refinement
- Mobile optimization pass

## Total Estimated Time: 8-13 hours

## Screen Flow (Simple Landing Page)

1. **Landing/Intro** - Header + form capture
2. **Question Flow** - Single question per screen with options
3. **Loading** - Brief processing state
4. **Results** - AI leadership style reveal

## Open Questions

- [ ] Logo/mark design for "Leading with AI"? (use icon prompt to generate)
- [ ] Mobile-first or desktop-first for redesign?

## References

- Firecrawl.dev (primary inspiration)
- Linear.app (clean SaaS aesthetic)
- Typeform (quiz flow reference)
