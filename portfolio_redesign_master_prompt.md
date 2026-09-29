# MASTER DIRECTIVE: COMPLETE PORTFOLIO REDESIGN & LOCAL PLAYWRIGHT AUDIT

## 1. ROLE & MISSION
You are an elite Creative Frontend Architect and Senior UI/UX Engineer. Your task is to autonomously audit, refactor, and completely redesign my existing Next.js single-page portfolio running locally. 
Strip away all generic, bloated "AI-generated" templates and replace them with a sharp, high-performance, dark-mode technical aesthetic using Vengeance UI / modern Shadcn primitives, Framer Motion, GSAP, and subtle 3D effects via React Three Fiber.

---

## 2. SECTIONS TO RE-ARCHITECT (UNIFIED ONE-PAGE FLOW)
My existing portfolio contains the following raw sections:
- Navbar
- Hero
- About
- Skills
- Education
- Job History
- Projects
- Testimonials
- Contact

Do NOT render these as boring, generic vertical blocks. Consolidate and re-architect them into this cohesive single-page flow:

1. **Floating Dock Navbar (`components/navbar.tsx`):**
   - Vengeance UI-style glassmorphism floating dock anchored at top-center.
   - Smooth anchor jumps to `#hero`, `#about`, `#experience`, `#projects`, `#contact`.

2. **Hero Section (`components/hero.tsx`):**
   - Non-blocking, GPU-efficient 3D particle or wireframe background with React Three Fiber (`@react-three/fiber`, `@react-three/drei`).
   - Kinetic typography reveal, active status beacon ("Available for engineering roles"), and direct CTA buttons.

3. **Consolidated Bento Grid Hub (`components/bento-profile.tsx`):**
   - Merge **About**, **Skills**, and **Education** into an asymmetrical, highly responsive Bento Grid:
     - *Card A (Span 2):* Executive summary & engineering philosophy (About).
     - *Card B (Span 1):* Education, degrees & certifications (Education).
     - *Card C (Span 3):* Filtered/categorized interactive skill badges (Frontend, Backend, Architecture, DevOps) with hover micro-interactions (Skills).

4. **Job History & Career Timeline (`components/experience.tsx`):**
   - Interactive vertical timeline powered by Framer Motion or GSAP ScrollTrigger.
   - Focus on company names, roles, duration, and metric-driven achievements rather than walls of text.

5. **Projects Showcase (`components/projects.tsx`):**
   - High-contrast interactive cards for 3–5 top projects.
   - Vengeance UI-style border glows/displacement hovers, tech tags, and quick-action links (GitHub repo & Live Demo).

6. **Testimonials Marquee (`components/testimonials.tsx`):**
   - Low-friction, smooth horizontal infinite marquee (Framer Motion) showcasing recommendations without taking up excessive vertical screen space.

7. **Contact & Kinetic Footer (`components/footer.tsx`):**
   - Clean contact form or quick "Copy Email" interaction.
   - Social links (LinkedIn, GitHub) featuring magnetic hover effects.

---

## 3. EXECUTION PHASES

### PHASE 1: LOCAL ENVIRONMENT & PLAYWRIGHT AUDIT
1. Start the dev server (`npm run dev`) on `http://localhost:3000`.
2. Inspect the current layout and DOM using Playwright:
   - Run a headless test capturing full-page and section screenshots (`audit-results/pre-audit.png`).
   - Read the console logs to detect any hydration errors, broken imports, or missing assets.
3. Extract and preserve all real career details, past projects, job history, and testimonials from the old codebase so zero personal data is lost.

### PHASE 2: DEPENDENCIES & UI PRIMITIVES
1. Verify and install required libraries:
   ```bash
   npm install framer-motion gsap three @react-three/fiber @react-three/drei lucide-react clsx tailwind-merge
   ```
2. Initialize Shadcn / modern component registry if missing:
   ```bash
   npx shadcn@latest init
   ```
3. Purge messy legacy CSS files, resets, and generic styling templates from `globals.css`.

### PHASE 3: COMPONENT CODING & ASSEMBLY
1. Build modular components inside `/components` matching the 7 re-architected sections listed above.
2. Ensure strict performance best practices:
   - Proper dynamic imports (`next/dynamic` with `ssr: false`) for 3D/Three.js components.
   - Correct `"use client"` directives on animated files while keeping the root layout clean.
   - Zero horizontal overflow (`overflow-x-hidden` on main wrapper).

### PHASE 4: FINAL PLAYWRIGHT VERIFICATION & QA
1. Write and run a verification test in Playwright:
   - Test responsive layout on Desktop (1440x900) and Mobile (375x812).
   - Ensure zero console errors or hydration warnings.
   - Verify all navigation links smoothly scroll to their targeted sections.
   - Save final screenshots to `audit-results/post-redesign.png`.
2. Report the refactoring summary and final status.