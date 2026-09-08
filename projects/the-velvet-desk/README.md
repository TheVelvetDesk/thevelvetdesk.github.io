# The Velvet Desk

The first project in the Flagship Site Builder studio: a motion-led website for an AI consulting, business systems, and digital experience company founded by Ibrahim and Jennifer.

## Experience

- Scroll-controlled cinematic video entrance with reversible playback
- Staged editorial typography, cinematic imagery, and reduced-motion support
- Editorial practice, method, inquiry form, and closing sections
- Dedicated `/products/` directory, linked from the main navigation; each product entry links to its own product page
- The homepage has only a small thumbnail/directory link with a one-line description directly before the inquiry section, near the bottom. Do not add full product sections to the homepage.
- Entrance video, scrolling behavior, and navigation timing are preserved; no visible skip control added
- Responsive layouts tested at 1440×1000 and 390×844
- Ad creative lives at `/ad-creative/`, linked from Flagship digital services. Five independent brand concepts and a click-to-play Remotion showcase demonstrate the service; it is not a product-directory entry.

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

Add another `article.product-entry` to `products/index.html` with the product name, short description, preview image, and its dedicated URL. Keep pricing, trials, samples, and signup on the individual product page. The homepage directory link stays small and does not grow as products are added. Vite builds the homepage, products directory, and ad-creative service page; GitHub Pages deploys them in the same site artifact.

## Ad creative showcase

The seven optimized WebP concepts across five brands in `public/media/ad-creative/` are derived from Ibrahim's September 7 Downloads originals, which remain unchanged. Approved Supergoop examples are the coffee-cup tan lines and transparent-gel 50, not the model-based variants. Both the brick and “Just a little. Actually, more.” Poppy & Pout concepts are included. The full images are available through gallery links; captions disclose concept status. The film is silent, 28 seconds at 1440×900 / 24 fps, with native controls and no autoplay. Remotion is a separate offline production tool in `../../tools/ad-creative-film/`, not a runtime site dependency. See its README for rendering and source mapping.

## Preserved experiments

The earlier ThreeUI cloth adaptation, its attribution notice, and the custom shader experiment remain in `src/` for future flagship concepts. The current entrance uses the optimized all-intra video in `public/media/` so scrolling can seek smoothly in either direction.
