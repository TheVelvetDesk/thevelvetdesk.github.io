const CURSOR_FRAMES = Array.from({ length: 30 }, (_, index) => `/media/cursor-v/v${index + 1}.webp`);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

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
  let velocityX = 0;
  let velocityY = 0;
  let tilt = 0;
  let tiltVelocity = 0;
  let stretch = 1;
  let lastRenderTime = performance.now();

  layers[0].src = CURSOR_FRAMES[0];
  CURSOR_FRAMES.slice(1).forEach((source) => {
    const preload = new Image();
    preload.src = source;
  });

  const renderPosition = (time) => {
    const frameScale = Math.min(2, Math.max(.25, (time - lastRenderTime) / 16.667));
    lastRenderTime = time;

    if (reducedMotion.matches) {
      currentX = targetX;
      currentY = targetY;
      velocityX = 0;
      velocityY = 0;
      tilt = 0;
      tiltVelocity = 0;
      stretch = 1;
    } else {
      // A damped spring gives the cursor mass; its velocity drives the lean.
      velocityX += (targetX - currentX) * .095 * frameScale;
      velocityY += (targetY - currentY) * .095 * frameScale;
      const positionDamping = Math.pow(.72, frameScale);
      velocityX *= positionDamping;
      velocityY *= positionDamping;
      currentX += velocityX * frameScale;
      currentY += velocityY * frameScale;

      const speed = Math.hypot(velocityX, velocityY);
      const targetTilt = clamp(velocityX * .9 + velocityY * .16, -24, 24);
      tiltVelocity += (targetTilt - tilt) * .14 * frameScale;
      tiltVelocity *= Math.pow(.66, frameScale);
      tilt += tiltVelocity * frameScale;

      const targetStretch = 1 + Math.min(speed * .007, .13);
      stretch += (targetStretch - stretch) * .16 * frameScale;
    }

    cursor.style.setProperty('--cursor-x', `${currentX}px`);
    cursor.style.setProperty('--cursor-y', `${currentY}px`);
    cursor.style.setProperty('--cursor-tilt', `${tilt}deg`);
    cursor.style.setProperty('--cursor-stretch-x', stretch.toFixed(4));
    cursor.style.setProperty('--cursor-stretch-y', (2 - stretch).toFixed(4));
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
      velocityX = 0;
      velocityY = 0;
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
