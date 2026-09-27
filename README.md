# Urooj Fatima — AI/ML Portfolio

A production-grade personal portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (scroll reveals, hover/tap interactions)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                  Routes, layout, metadata, sitemap/robots
components/
  sections/           One component per portfolio section (Hero, About, Projects, etc.)
  ui/                  Reusable primitives (Button, Badge, SectionHeading, CircuitField)
  project-card/        ProjectCard + ProjectModal (case-study detail view)
data/                  All real content lives here as typed data — edit these files, not components
lib/                   Shared utilities
public/
  images/profile.jpg   Your headshot
  resume.pdf           Your downloadable CV
```

## Customization Guide

**To update any content** (bio, skills, projects, experience, certifications, links), edit the corresponding file in `data/` — no component code needs to change:
- `data/profile.ts` — name, headline, bio, email, social links, resume path
- `data/education.ts` — degree info, coursework, GPA (set `gpa` to a string to display it)
- `data/skills.ts` — skill categories and soft skills
- `data/projects.ts` — add a new object to the `projects` array; set `featured: true` for a full case-study card, `false` for a brief mention. Case-study fields (`problem`, `solution`, `features`, `challenges`, `lessonsLearned`) are optional but recommended for featured projects.
- `data/experience.ts` — internships, roles, status (`"ongoing"` or `"completed"`)
- `data/certifications.ts` — certificates by category

**To replace your photo:** swap `public/images/profile.jpg` (keep the same filename, or update the path in `components/sections/Hero.tsx`).

**To replace your resume:** swap `public/resume.pdf`.

**To enable the contact form:** create a free form at [formspree.io](https://formspree.io), then replace `FORMSPREE_ENDPOINT` in `components/sections/Contact.tsx` with your form's endpoint URL.

**To add a new section:** create a component in `components/sections/`, add its data file in `data/` if needed, then import and place it in `app/page.tsx` and add a nav link in `components/Nav.tsx`.

## Deployment (Netlify — Free Tier)

1. Push this project to a GitHub repository.
2. In Netlify: **Add new site → Import an existing project** → connect your GitHub repo.
3. Netlify will detect Next.js automatically via `netlify.toml` in this repo (uses `@netlify/plugin-nextjs`). Build command and publish directory are already configured — no changes needed.
4. Click **Deploy**. Your site will be live at a `*.netlify.app` subdomain.
5. (Optional) Add a custom domain later under **Site settings → Domain management**.

No environment variables or paid services are required for the current feature set.

## Troubleshooting

- **Fonts fail to load during build:** Google Fonts requires network access at build time. This works automatically on Netlify's build servers; it will only fail in network-restricted local sandboxes.
- **Contact form doesn't send:** make sure you've replaced `FORMSPREE_ENDPOINT` with your real Formspree form ID.
- **Images not showing:** confirm the file exists in `public/images/` and the path in the component matches exactly (case-sensitive).

## Maintenance Notes

- Sections currently hidden per your confirmed choices: Achievements, Startup Journey, Blog, Testimonials. Add a new file under `data/` and a section component under `components/sections/` whenever you're ready to bring any of these in — the architecture doesn't need to change.
- YouTube section is intentionally omitted from the page for now since no videos are published yet; re-add a `components/sections/YouTube.tsx` once `@techwithuroojofficial` has content.
