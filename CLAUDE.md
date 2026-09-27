# CLAUDE.md — Construction Showcase Website

## Purpose
A simple, professional website for a construction/renovation craftsman. Visitors should quickly see
**what he does** (services), **how he works** (photos + short descriptions) and **how to contact him**.
First goal: a clickable demo with placeholders that can be shown to him before real content exists.

## Status
- Phase 1 (scaffold & design) **done** 2026-09-27. Next: Phase 2 — user creates GitHub repo, we push & enable Pages.
- All text and images are placeholders until the owner provides real content.
- Business name, logo, and final service list: **TBD**.

## Tech stack
| Layer    | Choice                                   | Notes |
|----------|------------------------------------------|-------|
| Frontend | React 19 + Vite 8 + TypeScript           | Fast dev server, simple static build |
| Styling  | Tailwind CSS 4 (`@tailwindcss/vite`)     | Design tokens in the `@theme` block of `src/index.css` (no tailwind.config) |
| Routing  | React Router (HashRouter for GitHub Pages) | HashRouter avoids 404s on page refresh on GitHub Pages |
| i18n     | `react-i18next` + `i18next-browser-languagedetector` | Languages: `de` (default), `ro`, `en` |
| Contact form | Web3Forms (free form-to-email service) | Form posts directly from the browser; no server needed |
| Backend  | **None** — static site only              | Decided 2026-09-27: not needed |
| Hosting  | GitHub Pages via GitHub Actions          | |

## Repository layout (planned)
```
SiteWebIon/
├── CLAUDE.md
├── README.md                # how to run + where to change content
├── package.json / vite.config.ts   # `base` set to the repo name for GitHub Pages
├── index.html
├── public/images/            # placeholder photos (later: real ones)
├── src/
│   ├── components/           # Navbar, LanguageSwitcher, Logo, Footer, Gallery (lightbox), ServiceCard,
│   │                         # ContactSection (form), SectionHeading, Icon, ScrollManager
│   ├── hooks/useGoToContact.ts  # scroll to #contact, or go Home and scroll there
│   ├── pages/                # Home, ServicePage (one generic page driven by data), NotFound
│   ├── data/services.ts      # list of services: slug, i18n key, images
│   ├── config.ts             # contact details + Web3Forms access key (placeholders)
│   ├── i18n/
│   │   ├── index.ts
│   │   └── locales/{de,ro,en}.json
│   └── main.tsx / App.tsx
└── .github/workflows/deploy.yml   # build → publish to GitHub Pages
```

## Decisions made (2026-09-27)
- Palette: Modern Industrial · Default language: German · Logo on the left
- One reusable, data-driven service page · Home gets "How I work" + contact sections
- Own standalone git repo, hosted on GitHub Pages
- **No backend.** Contact form uses Web3Forms; plus phone / email / WhatsApp buttons

## Pages & navigation
- **Top bar** (sticky), agreed layout: **logo on the left** (click → Home) · `Home` + one link per service
  in the middle · language switcher (DE | RO | EN) on the right.
  - On mobile: collapses into a hamburger menu.
- **Home** (in order): hero · service cards (+ a dark "Something else in mind?" CTA card filling the grid) ·
  About (portrait + stats) · "How I work" (4 steps) · Recent projects gallery · contact section.
- **Service page** (one reusable template, data-driven): title, description, photo gallery, CTA "Request a quote".
- **Contact section** (on Home, linked from every "Request a quote" button): form with name, email, phone,
  service (dropdown), message → sent via Web3Forms to the owner's email. Client-side validation, success/error
  message, honeypot field against spam. Next to it: click-to-call, email and WhatsApp buttons.
- **Footer**: contact (phone, email, area served), copyright.

Placeholder services (to be confirmed): Wooden floors, Tiles, Wall plastering, Painting, Drywall.
Adding a new service = one entry in `data/services.ts` + text in the 3 locale files. No new components.

## Design direction — chosen: **Modern Industrial**
| Token        | Hex       | Use |
|--------------|-----------|-----|
| `background` | `#F4F4F2` | page background (light gray) |
| `surface`    | `#FFFFFF` | cards, top bar |
| `graphite`   | `#2B2D31` | text, dark sections, footer |
| `muted`      | `#6B6E75` | secondary text |
| `accent`     | `#F2B705` | safety yellow: buttons, active nav link, highlights |
| `accent-dark`| `#C99700` | hover state of accent |

Rules: yellow is an accent only (buttons, underlines, icons) — never body text on light backgrounds
(contrast too low); on yellow buttons use graphite text.

Typography: one clean sans-serif (e.g. *Inter* or *Manrope*) with a bolder display weight for headings.
Style: lots of whitespace, large photos, rounded corners (8–12px), subtle hover effects, no clutter.

## i18n rules
- Never hardcode user-visible text in components — always `t('key')`.
- Every key must exist in `de.json`, `ro.json` and `en.json` (same structure).
- **Default language: German (`de`)**; fallback also `de`. Selected language is remembered in `localStorage`.
- `<html lang>` is updated when the language changes.

## Contact form (no backend)
- Web3Forms: the owner registers his email at web3forms.com → gets a public access key → put it in `src/config.ts`.
  Submissions arrive in his inbox. Free tier is plenty for a small business site.
- Until the real key exists, the form uses a placeholder key and shows a demo success message.
- The access key is public by design (safe to commit).

## Roadmap
1. **Phase 1 – Scaffold & design**: Vite + React + Tailwind + Router + i18n, navbar, home, service template,
   footer, placeholder text/images, palette chosen.
2. **Phase 2 – Publish demo**: own git repo in `SiteWebIon/`, push to GitHub, GitHub Actions → GitHub Pages.
3. **Phase 3 – Real content**: real photos (optimized WebP), texts in 3 languages, logo, SEO meta tags,
   favicon, real Web3Forms key, optional custom domain.

## Conventions
- Components: function components + hooks, PascalCase filenames, small and reusable.
- Images: keep under ~300 KB each, provide `alt` text (translated).
- Responsive first: must look good at 375px width.
- Accessibility: semantic HTML, sufficient contrast, keyboard-navigable menu.
- Commands (once scaffolded, from project root): `npm install`, `npm run dev`, `npm run build`.

## Notes / gotchas
- The user's home folder (`/Users/gabimoldovan`) is itself a git repo linked to an unrelated project.
  This project gets its **own, independent** repo: `git init -b main` inside `SiteWebIon/`, no remote
  until the user creates a new, empty GitHub repo. Never commit to or push the home-folder repo.
- Placeholder photos are generated SVGs in `public/images/` (`<slug>-1..4.svg`, `hero.svg`, `about.svg`).
  Real photos: keep the same names (or update `serviceImages()` in `data/services.ts` if using .webp/.jpg).
- Routing uses HashRouter, so in-page anchors (`href="#services"`) must scroll via JS, not the URL hash.
- Arrays in locale files (`features`, `steps`, `stats`) are read with `t(key, { returnObjects: true })`.
- Vite `base` must match the GitHub repo name (e.g. `/SiteWebIon/`) or assets break on GitHub Pages.
