# Post AI-Workshop Engagement Survey

## Overview

A 2-3 minute lead qualification survey sent via email after the "genAI: From Helpful Assistant to Agent Builder" 5-hour workshop.

**Primary Goal:** Qualify prospects (budget + immediacy signals)
**Secondary Goal:** Gather adoption intent feedback
**Output:** "Your AI Avatar" - one of 5 playful personas based on responses

## The 5 AI Avatars

Role-based archetypes mapped to genAI usage style + comprehension level:

| Avatar | Profile | Signal |
|--------|---------|--------|
| **The Curious Explorer** | Interested but still learning, asks "what if" questions | Nurture track - invite to community |
| **The Practical Optimizer** | Wants to improve existing workflows, ROI-focused | Warm lead - has use cases, check budget |
| **The Bold Automator** | Ready to eliminate manual work, sees clear targets | Hot lead - immediate use case |
| **The Strategic Visionary** | Thinking org-wide transformation, big picture | Enterprise lead - longer sales cycle |
| **The Agent Architect** | Wants to build, technical depth, hands-on | Technical lead - dev services or partnership |

## Question Flow (5-7 questions)

```
┌─────────────────────────────────────────────────────────────┐
│ Q1: What resonated most from today's workshop?              │
│     □ The AI assistant basics                               │
│     □ Prompt engineering techniques                         │
│     □ The agent-building concepts                           │
│     □ Seeing real business applications                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Q2: How would you describe your AI usage before today?      │
│     □ Haven't really used AI tools                          │
│     □ Occasionally use ChatGPT/Claude for tasks             │
│     □ Regular user, part of my workflow                     │
│     □ Power user, building automations                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Q3: Do you have a specific business case you want to        │
│     explore with AI?                                        │
│     □ Yes, I have something specific in mind                │
│     □ I have some ideas but nothing concrete                │
│     □ Not yet, still exploring possibilities                │
└─────────────────────────────────────────────────────────────┘
                    ↓                          ↓
            [YES branch]                [NO branch]
                    ↓                          ↓
┌───────────────────────────┐    ┌───────────────────────────┐
│ Q4a: What impact would a  │    │ Q4b: Knowing what you     │
│ deep-dive have on your    │    │ know now, would you       │
│ case?                     │    │ recommend this workshop   │
│ □ Game-changing           │    │ to colleagues?            │
│ □ Significant improvement │    │ □ Absolutely              │
│ □ Nice to have            │    │ □ Maybe, depends on role  │
│ □ Not sure yet            │    │ □ Probably not            │
└───────────────────────────┘    └───────────────────────────┘
            ↓                                  ↓
┌───────────────────────────┐    ┌───────────────────────────┐
│ Q5a: Do you have budget   │    │ Q5b: What would be a fair │
│ allocated for AI          │    │ rate for this workshop?   │
│ exploration?              │    │ □ $X for live + custom    │
│ □ Yes, ready to invest    │    │ □ $Y for live attendance  │
│ □ Could make a case       │    │ □ $Z for digital access   │
│ □ Would need approval     │    │ □ Should be free          │
│ □ No budget currently     │    └───────────────────────────┘
└───────────────────────────┘                  ↓
            ↓                          [→ Avatar Result]
    [YES to budget]
            ↓
┌───────────────────────────────────────────────────────────┐
│ Q6: What level of engagement interests you?               │
│ □ 2-hour deep-dive session on my use case                 │
│ □ AI readiness audit of our data systems                  │
│ □ Custom AI enablement strategy                           │
│ □ Full solution development (MVP $10-40k range)           │
└───────────────────────────────────────────────────────────┘
                              ↓
                    [→ Avatar Result + Book Call CTA]
```

## Avatar Assignment Logic

Score based on answers:

| Factor | Explorer | Optimizer | Automator | Visionary | Architect |
|--------|----------|-----------|-----------|-----------|-----------|
| Resonated: basics | +2 | | | | |
| Resonated: prompts | +1 | +2 | | | |
| Resonated: agents | | | +1 | | +2 |
| Resonated: business apps | | +1 | +2 | +2 | |
| Prior usage: none | +2 | | | | |
| Prior usage: occasional | +1 | +1 | | | |
| Prior usage: regular | | +2 | +1 | +1 | |
| Prior usage: power user | | | +1 | | +2 |
| Has business case | | +1 | +2 | +1 | +1 |
| Impact: game-changing | | | +2 | +2 | |
| Impact: significant | | +2 | +1 | | |
| Has budget | | +1 | +2 | +2 | +1 |
| Interest: deep-dive | | +2 | +1 | | |
| Interest: audit | | +1 | | +2 | |
| Interest: strategy | | | | +2 | |
| Interest: dev | | | +1 | | +2 |

Highest score wins. Ties favor more engagement-ready avatar.

## Technical Implementation

### Simplified Stack (Static Survey)

Since this is a **mini static web page** (per requirements), we'll use a simpler stack than the full agentic forms engine:

```
ai-workshop-survey/
├── index.html              # Single-page survey
├── styles.css              # Playful/creative styling
├── survey.js               # Question flow + avatar logic
├── avatars/                # Avatar illustrations
│   ├── explorer.svg
│   ├── optimizer.svg
│   ├── automator.svg
│   ├── visionary.svg
│   └── architect.svg
├── config.json             # Questions, scoring, CTA links
└── README.md               # Deployment instructions
```

### Data Flow

1. User opens survey link (from email)
2. Captures: email, name, session_id from URL params
3. Walks through questions (client-side)
4. Calculates avatar score
5. Shows avatar result + personalized CTA
6. Submits to backend (Airtable or webhook)

### No AI Generation Needed

Unlike the full agentic forms engine, this survey uses:
- **Fixed questions** (no AI-generated questions)
- **Deterministic avatar assignment** (scoring matrix, not AI)
- **Static output** (pre-written avatar descriptions)

This keeps it simple, fast, and hostable as a static site.

## Phases

### Phase 1: Content & Design (4 blocks)
| Block | Description |
|-------|-------------|
| `avatar-definitions` | Write the 5 avatar personas with names, descriptions, illustrations brief |
| `question-content` | Finalize all question text and answer options |
| `scoring-matrix` | Define exact scoring rules for avatar assignment |
| `cta-content` | Write CTAs for each avatar type + calendar link |

### Phase 2: Implementation (4 blocks)
| Block | Description |
|-------|-------------|
| `html-structure` | Build survey HTML with question sections |
| `css-styling` | Playful/creative visual design |
| `js-logic` | Question flow, branching, scoring, avatar reveal |
| `data-submission` | Airtable/webhook integration for responses |

### Phase 3: Assets (2 blocks)
| Block | Description |
|-------|-------------|
| `avatar-illustrations` | Create/source 5 avatar images |
| `animations` | Add reveal animations for avatar result |

### Phase 4: Deploy (2 blocks)
| Block | Description |
|-------|-------------|
| `static-hosting` | Deploy to Vercel/Netlify/GitHub Pages |
| `email-template` | Create email template with survey link |

## Completion Criteria

Survey is complete when:
1. ✅ Opens from email link with params (email, name, session_id)
2. ✅ 5-7 questions with conditional branching
3. ✅ Assigns one of 5 avatars based on responses
4. ✅ Shows playful avatar result with description
5. ✅ Hot leads see service tiers + book call CTA
6. ✅ All responses saved to Airtable
7. ✅ Hosted as static page, shareable URL

## Next Steps

1. **Define the 5 avatars** - Names, personality descriptions, visual brief
2. **Finalize question wording** - Exact copy for each question
3. **Design mockup** - Visual style for the playful/creative feel
4. **Build** - HTML/CSS/JS implementation

---

*Generated from interview session: `.interview-session.json`*
