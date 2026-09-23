const CURSOR_FRAMES = Array.from({ length: 30 }, (_, index) => `/media/cursor-v/v${index + 1}.webp`);

export const setupCursorCarousel = () => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cursor = document.createElement('div');
  cursor.className = 'v-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<img class="is-visible" alt="" /><img alt="" />';
  document.body.append(cursor);

  const layers = [...cursor.querySelectorAll('img')];
  let activeLayer = 0;
  let frameIndex = 0;
  let targetX = -100;
  let targetY = -100;
  let currentX = targetX;
  let currentY = targetY;

  layers[0].src = CURSOR_FRAMES[0];
  CURSOR_FRAMES.slice(1).forEach((source) => {
    const preload = new Image();
    preload.src = source;
  });

  const renderPosition = () => {
    currentX += (targetX - currentX) * .34;
    currentY += (targetY - currentY) * .34;
    cursor.style.setProperty('--cursor-x', `${currentX}px`);
    cursor.style.setProperty('--cursor-y', `${currentY}px`);
    requestAnimationFrame(renderPosition);
  };

  const nextFrame = () => {
    if (reducedMotion.matches || !cursor.classList.contains('is-visible')) return;
    frameIndex = (frameIndex + 1) % CURSOR_FRAMES.length;
    const nextLayer = activeLayer === 0 ? 1 : 0;
    layers[nextLayer].src = CURSOR_FRAMES[frameIndex];
    layers[nextLayer].classList.add('is-visible');
    layers[activeLayer].classList.remove('is-visible');
    activeLayer = nextLayer;
  };

  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!cursor.classList.contains('is-visible')) {
      currentX = targetX;
      currentY = targetY;
      cursor.classList.add('is-visible');
    }
    cursor.classList.toggle('is-over-control', Boolean(event.target.closest('a, button, input, textarea, select, label')));
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
  window.addEventListener('blur', () => cursor.classList.remove('is-visible'));
  window.addEventListener('pointerdown', () => cursor.classList.add('is-pressed'), { passive: true });
  window.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'), { passive: true });

  window.setInterval(nextFrame, 3000);
  requestAnimationFrame(renderPosition);
};
