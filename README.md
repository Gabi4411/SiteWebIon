# SiteWebIon

Showcase website for a construction / renovation business. React + Vite + Tailwind, three languages (DE default, RO, EN), hosted on GitHub Pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173/SiteWebIon/
npm run build    # production build into dist/
```

## Where to change things

| What | File |
|------|------|
| Company name, phone, e-mail, WhatsApp, form key | `src/config.ts` |
| Texts (all 3 languages) | `src/i18n/locales/{de,ro,en}.json` |
| List of services | `src/data/services.ts` |
| Photos | `public/images/` (`<service>-1..4`, `hero`, `about`) |
| Colours & font | `src/index.css` (`@theme` block) |

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`). In the GitHub repo: **Settings → Pages → Source: GitHub Actions**.
If the repository is not named `SiteWebIon`, change `base` in `vite.config.ts` to match.
