You are a senior frontend architect and designer.

Build the initial scaffold for a Next.js (App Router) personal developer notebook website.

The site is NOT a SaaS or marketing site. It is a public notebook where everything is written and built by one developer, in first person, for personal use first.

GOALS
- Calm, readable, long-living design
- Optimized for daily writing and maintenance
- Developer-focused audience
- Content-first, minimal visual noise

TECH STACK
- Next.js (latest, App Router)
- TypeScript
- Tailwind CSS
- MDX for content
- Framer Motion (only for subtle structural animations)

TYPOGRAPHY
- Primary text font: Inter
- Code font: JetBrains Mono
- No other fonts
- Narrow reading column for text-heavy pages

COLOR SYSTEM
- Light theme:
  - Background: soft off-white (paper-like)
  - Text: near-black (not pure black)
  - Accent: muted indigo/blue for links and highlights
- Dark theme:
  - Very dark gray background (not pure black)
  - Soft off-white text
  - Same accent color
- Avoid high contrast and flashy colors

ANIMATION RULES
- No decorative animations
- Only use motion for:
  - Page transitions
  - Section entry (subtle)
  - Collapsible content
- Animations must be subtle and optional

SITE STRUCTURE (routes)
Create the following routes with placeholder content:

- /
  Homepage acting as an index, not a hero section.
  Shows:
  - "Now" section (current focus)
  - Recent notes/posts
  - A few highlighted projects
  - Quiet mention of Android app (no CTA)

- /notes
  Chronological short-form notes (MDX-ready)

- /blog
  Longer-form writing (MDX-ready)

- /projects
  Narrative project list (not a grid-heavy portfolio)

- /learn
  Structured learning content (web version of personal course notes)

- /apps
  Pages describing Android apps with links (no marketing tone)

- /about
  Honest first-person about page (no résumé layout)

FILE STRUCTURE
- app/
  - (marketing)/
  - (notes)/
  - (blog)/
  - (projects)/
  - (learn)/
  - (apps)/
- components/
  - layout/
  - ui/
  - motion/
- content/
  - notes/
  - blog/
  - learn/
- lib/
  - seo.ts
  - mdx.ts

DESIGN REQUIREMENTS
- Use generous whitespace
- Narrow content width for reading
- Simple top navigation
- Footer with minimal links
- Everything should feel like a notebook, not a product

OUTPUT
- Generate the folder structure
- Base layout (layout.tsx)
- Global styles
- Theme setup (light/dark)
- Sample MDX files
- Placeholder copy written in first person
- Clean, readable components

Do NOT add:
- Marketing slogans
- Testimonials
- Pricing sections
- Newsletter popups
- Analytics
- Over-engineered abstractions

The result should feel calm, personal, and unfinished in a good way.
