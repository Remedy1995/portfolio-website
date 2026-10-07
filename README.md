# Japhet Adjetey portfolio

A Next.js App Router portfolio with TypeScript, locally hosted Manrope, five project case studies, an interactive SchoolPilot gallery, a 30-second Theovision walkthrough, CV download, and a dedicated contact page.

## Development

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
node scripts/verify-export.mjs
```

The site exports to `out/` for static hosting. The current Sites registration is recorded in `.openai/hosting.json`.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes `out/` whenever source is pushed to `main`. It also supports manual runs from GitHub’s Actions tab.

For the existing `Remedy1995/portfolio-website` repository:

1. Push this source to the repository, preserving its existing history.
2. Open **Settings → Pages** and choose **GitHub Actions** as the publishing source.
3. Open **Actions → Deploy portfolio to GitHub Pages** and run the workflow on `main`.
4. Use the deployment URL shown by the successful workflow.

The workflow takes the site’s base path from GitHub Pages automatically. Images, video, fonts, CV downloads, and navigation work under `/portfolio-website/`, or at `/` when Pages is configured with a custom domain. After changing the custom domain in Pages settings, rerun the workflow to rebuild for the new path. Configure custom-domain DNS using the values in GitHub’s Pages settings.

To verify a repository-path build locally:

```sh
NEXT_PUBLIC_BASE_PATH=/portfolio-website npm run build
NEXT_PUBLIC_BASE_PATH=/portfolio-website node scripts/verify-export.mjs
```

Use `npm run build` without that variable for hosting at the domain root. GitHub Pages deployment is independent of the existing Sites deployment.

## Content

See `CONTENT-CHECKLIST.md` for the personal details and project evidence to confirm. Project screenshots and the portrait originate from the owner's existing portfolio repository. Manrope is distributed under the SIL Open Font License, included with the local font.

The contact form prepares an email in the visitor's email application; there is no form backend or message storage. The gallery, screenshot dialogs, and email-copy action work in the static build.

## Design and accessibility

The authoritative portfolio styles are in `app/portfolio.css`. Semantic landmarks, visible focus states, a skip link, keyboard-dismissible dialogs, reduced-motion support, and mobile navigation are included. Raster assets use compressed WebP files with reserved dimensions. No remote font requests, autoplay media, analytics, or animation libraries are required.

The visual direction uses white surfaces, blue-gray framing, and teal accents. The SchoolPilot overview is at `/work/schoolpilot/`. Screenshots and the CV were supplied by the owner; the overview makes no unverified employer, outcome, or testimonial claims.

Theovision is featured on the homepage and at `/work/theovision/`, including a 30-second, silent product walkthrough. The video is a web-optimised H.264 MP4 (approximately 1 MB), with native controls, inline playback, a poster, a text description, and `preload="none"`. Run `node scripts/verify-video.mjs` against the local development server to check playback, seeking, deferred downloading, and responsive layout.

Projects are displayed in a two-column desktop grid (one column on mobile). Parentfully includes confirmed web and mobile feature work and API development at `/work/parentfully/`. Its mobile image is the published `/images/Hero.png` asset from https://parentfullyapp.com/; the page links to the actual website. The e-commerce project is no longer included.
