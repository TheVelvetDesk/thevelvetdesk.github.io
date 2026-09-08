# Ad Creative — The Velvet Desk

Offline Remotion source for the preserved Ad Creative showcase draft. The standalone page is not currently published or linked; Ad Creative appears only as the second entry on `/products/`. Preserve the film for later use. Dependencies and lockfile are isolated from the website workspace.

## Render

From this folder:

```sh
npm ci
npm run render
npm run poster
```

To use installed Chrome, append `-- --browser-executable='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'` to either rendering command. Otherwise Remotion may download its browser. The poster command writes a PNG into `../../output/playwright/`; convert it to the public WebP with:

```sh
cwebp -quiet -q 88 ../../output/playwright/showreel-poster.png -o ../../projects/the-velvet-desk/public/media/ad-creative/showreel-poster.webp
```

The composition is 672 frames, 24 fps, 1440×900, silent. Opening: 3 seconds. Seven concept studies: 3.25 seconds each. Closing: 2.25 seconds. Fonts and artwork are local to make renders independent of font-service availability. Playfair Display is distributed under the included SIL Open Font License. Check Remotion's current licensing terms for your organization before expanding usage.

## Assets and provenance

Ibrahim confirmed all work is self-initiated portfolio concepts, not commissioned or affiliated with the brands. Do not add invented results. Originals in Downloads are untouched; `cwebp -q 88` makes the public copies without changing their composition or copy.

| Public asset | Original Downloads file |
| --- | --- |
| `poppy-pout.webp` | `95214841-8918-4963-a0e0-a9fdba139e05.png` |
| `poppy-pout-more.webp` | `ChatGPT Image Sep 7, 2026, 01_20_53 PM.png` |
| `supergoop-coffee.webp` | `ChatGPT Image Sep 7, 2026, 09_49_35 AM.png` |
| `supergoop-gel.webp` | `ChatGPT Image Sep 7, 2026, 11_04_59 AM.png` |
| `earthling.webp` | `34109ab8-73c4-4b47-acfd-dc7d134bf9cc.png` |
| `experiment.webp` | `ChatGPT Image Sep 7, 2026, 01_08_05 PM.png` |
| `cocokind.webp` | `b35cf059-4796-4b6a-98b7-ddc591d84925.png` |

After a render, inspect representative frames and playback, rebuild the website, and verify desktop/mobile before publishing. Preserve the main site's entrance.
