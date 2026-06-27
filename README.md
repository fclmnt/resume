# Franck Clement | Resume

Source for my personal resume site, published at **[fclmnt.github.io/resume](https://fclmnt.github.io/resume/)**.

Built with [Astro](https://astro.build/). Bilingual (French / English), with a modern web view and a separate ATS-safe print layout that exports to PDF, all generated from a single content source.

## How it works

Content lives in YAML under `_data/{en,fr}/`. It is the **single source of truth**: the web pages and the PDFs are both rendered from it, so they never drift apart.

Each language renders two views:

- **Web** (`/{lang}/`): modern two-column layout with a sidebar (contact, skills, language switch, PDF download) and main content. Dark/light aware, responsive.
- **Print** (`/{lang}/print/`): single-column, black-on-white, selectable text, no icons or highlights, so applicant tracking systems (ATS) parse it cleanly. This is the source for the PDFs.

## Project structure

```
_data/{en,fr}/        Content (header, about, experience, education, projects, more); edit here
src/
  lib/data.ts         Loads the YAML; holds UI strings and the Core Skills list
  lib/markdown.ts     Renders descriptions for web (rich) vs print (ATS-safe)
  components/         WebResume.astro, PrintResume.astro
  layouts/            Web.astro, Print.astro
  pages/              index (redirect), {en,fr}/index, {en,fr}/print
  styles/             global.css (web), print.css (PDF)
public/assets/        Images, video, favicon (served at /resume/assets/...)
scripts/export-pdf.mjs  Renders the print routes to PDF via headless Chromium
```

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/resume/
```

## Build

```bash
npm run build    # static output to ./dist
```

## Generate the PDFs

```bash
npx playwright install chromium   # first time only
npm run build
npm run pdf                       # writes franck_clement_resume_{en,fr}.pdf
```

## Editing content

Edit the YAML in `_data/{en,fr}/`. **Always update both languages**, since the site is maintained in French and English.

- Skills and UI labels: `src/lib/data.ts`
- Project tech tags: the `<mark>…</mark>` keywords at the end of each project description (shown as chips on the web, flattened to plain text in the PDF)

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the Astro site and publishes `./dist` to GitHub Pages. The repo's Pages source is set to **GitHub Actions** (no branch deploy involved).
