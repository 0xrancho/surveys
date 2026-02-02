# AI Archetype - UX Refresh Plan

## Brand Identity (Finalized)

- **Name:** AI Archetype
- **Tagline:** Find your signal.
- **Sub-header:** A 3-minute assessment to discover how AI can amplify who you are—and what you should build next.
- **Core Color:** Green (keep)

## Design Inspiration: Firecrawl.dev

Key takeaways:
- **White/light backgrounds** with colored accents (not full gradient bg)
- **Generous whitespace** - content breathes
- **Clear typography hierarchy** - one thing demands attention at a time
- **Interactive demo feel** - intelligent but approachable
- **Trust signals** - logos, social proof, without being salesy
- **Technical credibility** - code snippets, precise language

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

### Color Palette (Green-forward)

```css
:root {
  /* Primary */
  --green-600: #059669;      /* Primary actions */
  --green-500: #10B981;      /* Hover states */
  --green-100: #D1FAE5;      /* Light backgrounds */
  --green-50: #ECFDF5;       /* Subtle tints */

  /* Neutrals */
  --white: #FFFFFF;
  --gray-50: #F9FAFB;        /* Page background */
  --gray-100: #F3F4F6;       /* Card backgrounds */
  --gray-600: #4B5563;       /* Body text */
  --gray-900: #111827;       /* Headings */

  /* Accent */
  --coral-500: #F97316;      /* Secondary accent (optional) */
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
- Smaller, refined "AI Archetype" wordmark (no badge bubble)
- Tagline "Find your signal." as hero text, large
- Sub-header below, muted

#### Intro Form
- White card on light gray background
- Green CTA button
- Remove target icon or replace with subtle archetype symbol
- Trust signal: "Join 500+ leaders who found their signal" (when you have numbers)

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

## Design Mockups Needed

1. **Intro/Landing** - Header + form
2. **Question State** - Single question with options
3. **Results** - Full archetype reveal

## Open Questions

- [ ] Logo/wordmark design for "AI Archetype"?
- [ ] Trust signals - what numbers/logos can we use?
- [ ] Result sharing - wait for dynamic OG cards or do basic first?
- [ ] Mobile-first or desktop-first for redesign?

## References

- Firecrawl.dev (primary inspiration)
- Linear.app (clean SaaS aesthetic)
- Typeform (quiz flow reference)
