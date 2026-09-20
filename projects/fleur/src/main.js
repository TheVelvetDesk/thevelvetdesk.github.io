import './styles.css';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const nav = document.querySelector('[data-nav]');

const wireSpot = (stage) => {
  const spot = stage.querySelector('[data-spot]');
  if (!spot) return;
  const R = Number(stage.dataset.spotR) || 190;
  let tx = 0, ty = 0, cx = 0, cy = 0, cr = 0, tr = 0, hovering = false;
  const track = (clientX, clientY) => {
    const rect = stage.getBoundingClientRect();
    tx = clientX - rect.left;
    ty = clientY - rect.top;
    if (!hovering) {
      hovering = true;
      cx = tx; cy = ty;
    }
    tr = R;
  };
  stage.addEventListener('pointermove', (e) => track(e.clientX, e.clientY));
  stage.addEventListener('pointerdown', (e) => track(e.clientX, e.clientY));
  stage.addEventListener('pointerleave', () => { hovering = false; tr = 0; });
  if (stage.hasAttribute('data-spot-toggle')) {
    const hint = stage.querySelector('[data-spot-hint]');
    const labelA = hint ? hint.textContent : '';
    const labelB = 'The bloom takes over · click to return';
    stage.addEventListener('click', () => {
      if (cr < 60 && !stage.classList.contains('is-swapped')) return; // only switch from a real reveal
      stage.classList.toggle('is-swapped');
      if (hint) hint.textContent = stage.classList.contains('is-swapped') ? labelB : labelA;
    });
  }
  const follow = () => {
    cx += (tx - cx) * 0.2;
    cy += (ty - cy) * 0.2;
    cr += (tr - cr) * 0.16;
    if (cr > 0.5) {
      const mask = `radial-gradient(circle ${cr.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px,#000 0,#000 62%,transparent 80%)`;
      spot.style.webkitMaskImage = mask;
      spot.style.maskImage = mask;
      spot.style.opacity = clamp01(cr / 40).toFixed(3);
    } else {
      spot.style.opacity = 0;
    }
    requestAnimationFrame(follow);
  };
  requestAnimationFrame(follow);
};
document.querySelectorAll('[data-spot-stage]').forEach(wireSpot);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

const makeScrollVideo = (sectionSel, videoSel, label) => {
  const section = document.querySelector(sectionSel);
  const video = document.querySelector(videoSel);
  if (!section || !video) return null;
  const s = { section, video, target: 0, eased: 0, duration: 0, ready: false, seeking: false, snapped: false };
  video.pause();
  video.preload = 'auto';
  const sync = () => {
    if (Number.isFinite(video.duration) && video.duration > 0) s.duration = video.duration;
    if (video.readyState >= 2 && !s.ready) {
      s.ready = true;
      s.eased = video.currentTime || 0;
      console.info(`[fleur] ${label} ready, duration`, s.duration.toFixed(2));
    }
  };
  video.addEventListener('loadedmetadata', sync);
  video.addEventListener('loadeddata', sync);
  video.addEventListener('canplay', sync);
  video.addEventListener('seeking', () => { s.seeking = true; });
  video.addEventListener('seeked', () => { s.seeking = false; });
  video.addEventListener('ended', () => { s.finished = true; });
  video.addEventListener('error', () => console.warn(`[fleur] ${label} error`, video.error));
  sync();
  video.load();
  return s;
};
const scrubVideos = [
  makeScrollVideo('[data-moist]', '[data-moist-video]', 'desert video'),
  makeScrollVideo('[data-duo]', '[data-duo-video]', 'bloom video 2'),
].filter(Boolean);
window.__fleurVideo = scrubVideos[0]?.video;

const measureTargets = () => {
  scrubVideos.forEach((s) => {
    // Page-relative top: offsetTop is relative to #scents (positioned), so measure instead.
    const pageTop = s.section.getBoundingClientRect().top + window.scrollY;
    const pin = Math.max(1, s.section.offsetHeight - window.innerHeight);
    const start = pageTop + pin * 0.4; // stage settles before the bloom begins
    const span = Math.max(1, pin * 0.6); // bloom ends exactly as the section releases — no hold
    s.target = reduced.matches ? 1 : clamp01((window.scrollY - start) / span);
  });
};

const easeLoop = () => {
  if (!document.hidden) {
    scrubVideos.forEach((s) => {
      if (!s.ready || s.duration <= 0) return;
      if (reduced.matches) {
        if (!s.snapped) {
          s.snapped = true;
          try { s.video.currentTime = Math.max(0, s.duration - 0.05); } catch { /* not loaded */ }
        }
        return;
      }
      const desired = s.target * Math.max(0, s.duration - 0.05);
      s.eased += (desired - s.eased) * 0.14; // glide toward the scroll position
      if (!s.seeking && Math.abs(s.eased - s.video.currentTime) > 0.03) {
        try {
          if (typeof s.video.fastSeek === 'function') s.video.fastSeek(s.eased);
          else s.video.currentTime = s.eased;
        } catch { /* seek in progress */ }
      }
    });
  }
  requestAnimationFrame(easeLoop);
};
requestAnimationFrame(easeLoop);

let frame = 0;
const paint = () => {
  nav.classList.toggle('is-solid', window.scrollY > 40);
  measureTargets();
};
const schedule = () => {
  if (!frame) frame = requestAnimationFrame(() => { frame = 0; paint(); });
};
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule);
reduced.addEventListener('change', schedule);
paint();

const scents = document.querySelectorAll('[data-scent]');
if ('IntersectionObserver' in window && !reduced.matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  scents.forEach((s) => io.observe(s));
} else {
  scents.forEach((s) => s.classList.add('in'));
}

const shelf = document.querySelector('[data-shelf]');
if (shelf) {
  const shelfImg = shelf.querySelector('[data-shelf-img]');
  const thumbs = Array.from(document.querySelectorAll('[data-shelf-thumb]'));
  thumbs.forEach((btn) => btn.addEventListener('click', () => {
    const src = btn.dataset.shelfThumb;
    if (!src || shelfImg.getAttribute('src') === src) return;
    thumbs.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    shelf.classList.add('is-fading');
    const pre = new Image();
    pre.onload = () => {
      shelfImg.src = src;
      shelfImg.alt = btn.getAttribute('aria-label') || 'Bloom Hydrating Moisturizer';
      requestAnimationFrame(() => requestAnimationFrame(() => shelf.classList.remove('is-fading')));
    };
    pre.onerror = () => shelf.classList.remove('is-fading');
    pre.src = src;
  }));
}

const bag = [];
const countEl = document.querySelector('[data-cart-count]');
const dialog = document.querySelector('#cart');
const dialogDesc = document.querySelector('#cart-description');
document.querySelectorAll('[data-add]').forEach((btn) => {
  btn.addEventListener('click', () => {
    bag.push(btn.dataset.add);
    countEl.textContent = bag.length;
  });
});
document.querySelector('[data-cart]').addEventListener('click', () => {
  dialogDesc.textContent = bag.length
    ? `${bag.length} item${bag.length > 1 ? 's' : ''} — ${bag.join(', ')}. FLEUR is a concept demo, so nothing checks out today.`
    : dialogDesc.textContent;
  dialog.showModal();
});
document.querySelector('[data-close]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
