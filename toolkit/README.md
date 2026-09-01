# Flagship Toolkit

This directory is the reusable layer for future flagship websites.

- `src/motion.js` — smooth scroll state, reveal observers, magnetic controls, pointer state, and reduced-motion support.
- `prompts/` — final image-generation prompts and asset direction.
- `references/` — vetted implementation notes and source/licensing links.

Current component sources include ThreeUI for WebGL/3D scenes and Fancy Components for React/Motion microinteractions. Both are documented with licensing and selection guidance under `references/`.

The toolkit stays brand-neutral. Add project-specific WebGL scenes inside the project and use the shared scroll state to drive them.
