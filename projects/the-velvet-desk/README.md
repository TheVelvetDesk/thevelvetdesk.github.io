# The Velvet Desk

The first project in the Flagship Site Builder studio: a motion-led website for an AI consulting, business systems, and digital experience company founded by Ibrahim and Jennifer.

## Experience

- Scroll-controlled cinematic video entrance with reversible playback
- Staged editorial typography, cinematic imagery, and reduced-motion support
- Editorial practice, method, inquiry form, and closing sections
- Dedicated `/products/` directory: Market This Morning first, Ad Creative second. Only the digest links to a separate page for now.
- The homepage has a small two-thumbnail collection link with a one-line description directly before the inquiry section. Both thumbnails lead to `/products/`. Do not add full product sections to the homepage.
- Entrance video, scrolling behavior, and navigation timing are preserved; no visible skip control added
- Explicit 1200×630 social preview uses the cinematic final entrance frame and title lockup
- Responsive layouts tested at 1440×1000 and 390×844
- Keep Flagship digital services in its original form: original copy, gallery image, and caption, without an Ad Creative link.

## Editorial rule

Every word on every public page must justify its existence. Use specific, human copy; cut filler and repetition. The advertising examples are self-initiated concepts, not client commissions. Do not claim affiliation, campaign results, or guaranteed conversions.

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

Add another `article.product-entry` to `products/index.html` with the product name, short description, and preview image. Link to a dedicated page only when approved and ready. Keep pricing, trials, samples, and signup on the individual product page. The homepage directory link stays small. Vite builds only the homepage and products directory; GitHub Pages deploys both in the same site artifact.

## Preserved Ad Creative draft

The previous `ad-creative/` page is preserved as source but excluded from the production build and sitemap. Do not link to it for now. The public presentation is only the Products-page entry, with independent-concept labeling. Seven optimized WebP concepts across five brands and the 28-second Remotion film remain available for future work. The Downloads originals are unchanged. Approved Supergoop examples are the coffee-cup tan lines and transparent-gel 50, not the model-based variants; approved Poppy & Pout examples include the brick and “Just a little. Actually, more.” Remotion source is in `../../tools/ad-creative-film/`, isolated from site dependencies.

## Preserved experiments

The earlier ThreeUI cloth adaptation, its attribution notice, and the custom shader experiment remain in `src/` for future flagship concepts. The current entrance uses the optimized all-intra video in `public/media/` so scrolling can seek smoothly in either direction.
