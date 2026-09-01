# ThreeUI reference

- Live catalog: https://threeui.com
- Community source: https://github.com/MengTo/threeui
- npm package: `@designcodeio/threeui`
- License: Community application/component code is MIT; bundled fonts use SIL OFL; Three.js runtime files use MIT. Review `ASSET-LICENSES.md`, `FONT-LICENSES.md`, and `THIRD_PARTY_NOTICES.md` before copying assets.

The Community repository currently documents 50 parent components, 111 routes, and 164 browse results. Use its package when a component materially improves a project; preserve its notices and avoid relying on remote preview assets in production.

Use ThreeUI as a source of adaptable motion systems, not as a substitute for art direction. Retokenize every selected component and combine it with project-specific typography, copy, interaction choreography, and layout.

## Curated flagship scene shelf

- **Woven Cloth** — Strong for fashion and tactile/editorial stories, but its printed-fabric metaphor can read as a curtain or stage reveal when used full-screen.
- **Portal Field** — Pointer-reactive ShaderMaterial portal for launches, transformation stories, and spatial transitions.
- **Structure Flow** — Thirteen field studies spanning particle domes, horizons, orbital systems, matrices, topology, fluid, embers, and vortexes.
- **Liquid Form** — Ray-marched silver form with studio reflections and pointer-responsive camera drift; strong for luxury or material-led brands.
- **Kage** — Full cinematic temple landing page with authored scroll scenes and local Three.js world.
- **Sketchbook** — Tactile editorial portfolio with page turns, magnification, zoom, drag, and botanical paper atmosphere.

The Velvet Desk now mounts the official `LiquidFormBackground` package component as a burgundy intelligence sculpture. Its wrapper—not the WebGL shader—is driven by the page scroll, which keeps the component reusable while allowing the site to control scale, position, rotation, and a clean exit fade. The earlier woven-cloth adapter and custom shader remain in the project source as preserved experiments; neither is loaded by the page.

## Scroll choreography notes

- Give every sticky scene a defined entry, transformation, and exit phase. Never leave the opening lockup visible for the full sticky range.
- Drive shared section progress from one animation frame loop and expose normalized values as CSS variables.
- Do not combine a generic reveal transform with a scroll-owned transform on the same element; the more specific reveal rule can silently override the scroll animation.
- Prefer time-normalized interpolation so motion feels consistent across 60 Hz and high-refresh-rate displays.
