# The Velvet Desk

The first project in the Flagship Site Builder studio: a motion-led website for an AI consulting, business systems, and digital experience company founded by Ibrahim and Jennifer.

## Experience

- Scroll-controlled 400vh hero sequence
- Customized ThreeUI Woven Cloth simulation with brand typography embedded into the moving textile
- Pointer-reactive depth, orbit lines, staged type transitions, magnetic calls to action, and reduced-motion support
- Editorial practice, live-system, method, founders, and contact sections
- Responsive layouts tested at 1440×1000 and 390×844

## Run

From `flagship-site-builder/`:

```bash
npm install
npm run dev:velvet
npm run build
```

## Customize before launch

1. Confirm that the `hello@thevelvetdesk.org` mailbox is active; it is currently used as the contact link.
2. Replace any positioning copy that Ibrahim and Jennifer want to narrow by industry or service.
3. Add real case studies only when the claims and metrics can be supported. The current `−73%` interface is explicitly labeled illustrative.
4. Add analytics, scheduling, privacy language, and form handling when the preferred services are chosen.
5. Deploy to the confirmed official domain: `thevelvetdesk.org`.

## ThreeUI adaptation

The hero is derived from ThreeUI Community's Woven Cloth scene and retokenized in `src/VelvetCloth.js`. The source snapshot and attribution notice live under `src/vendor/threeui/`. Preserve the notice when distributing the project.

The project intentionally keeps its older custom shader experiment at `src/velvet-field.js`; it is unused, but remains available to the shared studio for future concepts.
