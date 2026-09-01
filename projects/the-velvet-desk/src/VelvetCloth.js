import { createElement, useMemo } from 'react';
import threeUiClothSource from './vendor/threeui/woven-cloth-source.js';

const replaceRequired = (source, target, value) => {
  if (!source.includes(target)) throw new Error(`Velvet Cloth adapter could not find: ${target}`);
  return source.replace(target, value);
};

function brandCloth(source) {
  const replacements = [
    ["<title>Lumina Weavers · Kinetic Textiles, Kyoto</title>", "<title>The Velvet Desk · Intelligence, beautifully applied.</title>"],
    ["g.addColorStop(0, '#efe6d4');", "g.addColorStop(0, '#65152b');"],
    ["g.addColorStop(0.5, '#e9dfca');", "g.addColorStop(0.5, '#420b1b');"],
    ["g.addColorStop(1, '#e3d7bf');", "g.addColorStop(1, '#25070f');"],
    ["x.strokeStyle = '#a5202c';", "x.strokeStyle = '#c8a36d';"],
    ["x.strokeStyle = '#7c1622';", "x.strokeStyle = '#eadfce';"],
    ["x.fillStyle = '#a5202c';", "x.fillStyle = '#f1e8dc';"],
    ["x.fillText('L W', W/2, 190);", "x.fillText('T V D', W/2, 190);"],
    ["x.fillStyle = '#7c1622';", "x.fillStyle = '#c8a36d';"],
    ["x.fillText('· KYOTO ·', W/2, 246);", "x.fillText('· INTELLIGENCE ·', W/2, 246);"],
    ["x.fillStyle = '#9e1e2a';", "x.fillStyle = '#f1e8dc';"],
    ["x.font = 'bold 118px Georgia, \"Times New Roman\", serif';", "x.font = 'bold 96px Georgia, \"Times New Roman\", serif';"],
    ["x.fillText('LUMINA', W/2, 400);", "x.fillText('THE VELVET', W/2, 400);"],
    ["x.fillText('WEAVERS', W/2, 520);", "x.fillText('DESK', W/2, 520);"],
    ["x.fillStyle = '#7c1622';", "x.fillStyle = '#c8a36d';"],
    ["x.fillText('K I N E T I C   T E X T I L E S   ·   2 0 2 4', W/2, 626);", "x.fillText('B E A U T I F U L L Y   ·   A P P L I E D', W/2, 626);"],
  ];
  return replacements.reduce((result, [target, value]) => replaceRequired(result, target, value), source);
}

function isolateScene(source) {
  const focus = `<style data-velvet-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: #16090b !important; }
body { position: relative !important; }
body > * { visibility: hidden !important; }
body[data-velvet-ready] > [data-velvet-scene] { visibility: visible !important; }
[data-velvet-residual] { display: none !important; }
[data-velvet-scene] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
</style>`;
  const isolation = `<script data-velvet-focus>
(function () {
  function isolate() {
    var scene = document.querySelector('body > div.fixed.inset-0.overflow-hidden.z-0');
    if (!scene || document.body.hasAttribute('data-velvet-ready')) return;
    scene.setAttribute('data-velvet-scene', '');
    document.body.appendChild(scene);
    Array.from(document.body.children).forEach(function (element) {
      if (element === scene) return;
      element.setAttribute('data-velvet-residual', '');
      element.setAttribute('aria-hidden', 'true');
    });
    document.body.setAttribute('data-velvet-ready', '');
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(isolate, 100); }, { once: true });
  else setTimeout(isolate, 100);
  window.addEventListener('load', isolate, { once: true });
})();
<\/script>`;
  return source.replace(/<\/head>/i, `${focus}</head>`).replace(/<\/body>/i, `${isolation}</body>`);
}

export function VelvetCloth({ className, style }) {
  const srcDoc = useMemo(() => isolateScene(brandCloth(threeUiClothSource)), []);
  return createElement('iframe', {
    className,
    title: 'The Velvet Desk kinetic textile',
    srcDoc,
    sandbox: 'allow-scripts',
    loading: 'eager',
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      border: 0,
      background: '#16090b',
      ...style,
    },
  });
}
