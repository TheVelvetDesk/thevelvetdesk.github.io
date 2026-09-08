# The Velvet Desk

The first project in the Flagship Site Builder studio: a motion-led website for an AI consulting, business systems, and digital experience company founded by Ibrahim and Jennifer.

## Experience

- Scroll-controlled cinematic video entrance with reversible playback
- Staged editorial typography, cinematic imagery, and reduced-motion support
- Editorial practice, method, inquiry form, and closing sections
- Dedicated `/products/` directory, linked from the main navigation; each product entry links to its own product page
- The homepage has only a small thumbnail/directory link after the inquiry section, near the bottom. Do not add full product sections to the homepage.
- Entrance video, scrolling behavior, and navigation timing are preserved; no visible skip control added
- Responsive layouts tested at 1440×1000 and 390×844

## Run

From `flagship-site-builder/`:

```bash
npm install
npm run dev:velvet
npm run build
```

## Customize before launch

1. The inquiry form posts to the private Vercel contact endpoint and delivers through Resend to the owner and partner inboxes.
2. Replace any positioning copy that Ibrahim and Jennifer want to narrow by industry or service.
3. Add a managed rate limiter or CAPTCHA before a high-traffic launch; the current endpoint includes origin checks, validation, a honeypot, and a conservative instance-level rate limit.
4. Add analytics, scheduling, and privacy language when the preferred services are chosen.
5. Deploy to the confirmed official domain: `thevelvetdesk.org`.

## Adding products

Add another `article.product-entry` to `products/index.html` with the product name, short description, preview image, and its dedicated URL. Keep pricing, trials, samples, and signup on the individual product page. The homepage directory link stays small and does not grow as products are added. Vite builds both `index.html` and `products/index.html`; GitHub Pages deploys both in the same site artifact.

## Preserved experiments

The earlier ThreeUI cloth adaptation, its attribution notice, and the custom shader experiment remain in `src/` for future flagship concepts. The current entrance uses the optimized all-intra video in `public/media/` so scrolling can seek smoothly in either direction.
