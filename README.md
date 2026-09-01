# Flagship Site Builder

A reusable studio workspace for building high-concept, motion-led websites. Brand-specific code lives in `projects/`; reusable motion utilities, prompts, references, and production notes live in `toolkit/`.

## Projects

- `projects/the-velvet-desk` — the first flagship: an AI consulting, business systems, and digital experience studio.

## Start

```bash
npm install
npm run dev:velvet
```

Production check:

```bash
npm run build
```

## Deploy

GitHub Pages deployment is defined in `.github/workflows/deploy-pages.yml`. Every push to `main` installs dependencies, builds The Velvet Desk, and publishes `projects/the-velvet-desk/dist/`.

In the GitHub repository, choose **Settings → Pages → Source: GitHub Actions**, then set `thevelvetdesk.org` as the custom domain. Configure the domain's apex DNS records to GitHub Pages and enable HTTPS after GitHub finishes issuing the certificate.

## Studio rule

When a new flagship is created, copy the project shell—not the brand. Keep shared motion primitives, accessibility behavior, content schemas, visual prompts, and third-party research in `toolkit/`. Project folders own their colors, copy, imagery, scene code, and deployment configuration.
