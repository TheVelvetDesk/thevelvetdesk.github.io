import './styles.css';
import { acts, ramenIllustration } from './acts.js';
import { layoutAssembly } from './assembly.js';
import { createScrollFilm } from './scroll-film.js';

const storyPosRef = { value: 0 };
const backdrop = document.querySelector('[data-backdrop]');

const stageInner = document.querySelector('[data-stage-inner]');
const caption = document.querySelector('[data-stage-caption]');
const actsWrap = document.querySelector('[data-acts]');
const nav = document.querySelector('[data-nav]');

stageInner.innerHTML = ramenIllustration;
const layers = Object.fromEntries(
  ['bowl', 'raw', 'broth', 'noodles', 'chashu', 'egg', 'garnish', 'steam'].map((id) => [id, stageInner.querySelector(`#${id}`)])
);

actsWrap.innerHTML = acts.map((act) => `
  <section class="act" id="${act.id}" data-act="${act.id}" aria-labelledby="title-${act.id}">
    <div class="act-card">
      <p class="act-index">${act.index} <span>/ 05</span></p>
      <p class="act-kicker">${act.kicker}</p>
      <h2 class="act-title" id="title-${act.id}">${act.title}</h2>
      <p class="act-body">${act.body}</p>
      <p class="act-detail">${act.detail}</p>
    </div>
  </section>`).join('');

const stageEl = document.querySelector('[data-stage]');
const stageWrap = document.querySelector('.stage-wrap');
const videoWrap = document.querySelector('[data-stage-video]');
const finalFrame = document.querySelector('[data-stage-final]');
const scrollVideo = videoWrap.querySelector('[data-scroll-video]');
let videoDuration = 0;
let videoReady = false;
let videoSeeking = false;
scrollVideo.preload = 'auto';
scrollVideo.pause();
const syncVideoState = () => {
  if (Number.isFinite(scrollVideo.duration) && scrollVideo.duration > 0) videoDuration = scrollVideo.duration;
  if (scrollVideo.readyState >= 2 && !videoReady) {
    videoReady = true;
    console.info('[kairo] scroll video ready, duration', videoDuration.toFixed(2));
  }
};
scrollVideo.addEventListener('loadedmetadata', syncVideoState);
scrollVideo.addEventListener('loadeddata', syncVideoState);
scrollVideo.addEventListener('canplay', syncVideoState);
scrollVideo.addEventListener('seeked', () => { videoSeeking = false; });
scrollVideo.addEventListener('seeking', () => { videoSeeking = true; });
scrollVideo.addEventListener('error', () => {
  console.warn('[kairo] scroll video error', scrollVideo.error);
});
syncVideoState();
scrollVideo.load();
window.__kairoVideo = scrollVideo;

const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)');

const setupFilm = (el, name) => {
  const film = { el, duration: 0, ready: false };
  el.pause();
  const sync = () => {
    if (Number.isFinite(el.duration) && el.duration > 0) film.duration = el.duration;
    if (el.readyState >= 2 && !film.ready) {
      film.ready = true;
      console.info(`[kairo] ${name} ready, duration`, film.duration.toFixed(2));
    }
  };
  el.addEventListener('loadedmetadata', sync);
  el.addEventListener('loadeddata', sync);
  el.addEventListener('canplay', sync);
  el.addEventListener('error', () => console.warn(`[kairo] ${name} error`, el.error));
  sync();
  el.load();
  return film;
};
const bgHero = setupFilm(backdrop.querySelector('[data-bg-hero]'), 'bg street');
const bgTable = setupFilm(backdrop.querySelector('[data-bg-table]'), 'bg table');

const scrubTo = (film, progress) => {
  if (!film.ready || film.duration <= 0 || document.hidden) return;
  const target = clamp01(progress) * Math.max(0, film.duration - 0.05);
  if (Math.abs(film.el.currentTime - target) > 0.03) {
    try { film.el.currentTime = target; } catch { /* seek in progress */ }
  }
};

const scrubVideo = () => {
  if (!reducedMq.matches) {
    scrubTo({ el: scrollVideo, duration: videoDuration, ready: videoReady }, storyPosRef.value / 5);
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const page = clamp01(window.scrollY / max);
    scrubTo(bgHero, page / 0.8);
    scrubTo(bgTable, (page - 0.75) / 0.25);
    const tableOp = smoothstep((page - 0.78) / 0.12);
    bgHero.el.style.opacity = (1 - tableOp).toFixed(3);
    bgTable.el.style.opacity = tableOp.toFixed(3);
  } else {
    bgHero.el.style.opacity = 1;
    bgTable.el.style.opacity = 0;
  }
  requestAnimationFrame(scrubVideo);
};
requestAnimationFrame(scrubVideo);

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smoothstep = (v) => { const x = clamp01(v); return x * x * (3 - 2 * x); };

const cleanup = createScrollFilm({
  sections: actsWrap.querySelectorAll('[data-act]'),
  video: null,
  onUpdate: ({ progress, active, global, reducedMotion }) => {
    const assembly = layoutAssembly(progress, reducedMotion);
    layers.bowl.style.opacity = reducedMotion ? 1 : 1 - assembly.raw;
    layers.raw.style.opacity = reducedMotion ? 0 : assembly.raw;
    assembly.ingredients.forEach((item) => {
      layers[item.id].style.opacity = item.opacity;
      layers[item.id].style.transform = `translate(${item.x}px, ${item.y}px) scale(${item.scale})`;
    });
    layers.steam.style.opacity = reducedMotion ? 0 : assembly.steam;
    caption.textContent = global >= 0.999 ? 'The signature bowl · ready to serve' : active ? `${acts.find((act) => act.id === active).index} / 05 · ${active}` : 'Before the first simmer';
    document.documentElement.style.setProperty('--progress', global);
    const order = ['broth', 'noodles', 'chashu', 'egg', 'garnish'];
    const storyPos = order.reduce((sum, id) => sum + (progress[id] ?? 0), 0);
    storyPosRef.value = storyPos;
    if (reducedMotion || !videoReady) {
      videoWrap.style.opacity = 0;
      finalFrame.style.opacity = 0;
      stageEl.style.opacity = 1;
    } else {
      videoWrap.style.opacity = 1;
      finalFrame.style.opacity = smoothstep((storyPos - 4.55) / 0.45).toFixed(3);
      stageEl.style.opacity = 0;
    }
    nav.classList.toggle('is-solid', window.scrollY > 40);
    const pastHero = window.scrollY > window.innerHeight * 0.35;
    const aboveFooter = (document.documentElement.scrollHeight - window.scrollY - window.innerHeight) > 140;
    stageWrap.style.opacity = (pastHero && aboveFooter) ? 1 : 0;
  },
});

const dialog = document.querySelector('#reservation');
document.querySelector('[data-reserve]').addEventListener('click', () => dialog.showModal());
document.querySelector('[data-close]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});

if (import.meta.hot) import.meta.hot.dispose(cleanup);
