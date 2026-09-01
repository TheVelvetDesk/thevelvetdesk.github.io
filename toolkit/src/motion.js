const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (from, to, amount) => from + (to - from) * amount;

export function createMotionStudio({ hero, onFrame }) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const scroll = { current: 0, target: 0, velocity: 0 };
  let frame = 0;
  let last = performance.now();

  const measure = () => {
    if (!hero) return 0;
    const range = Math.max(1, hero.offsetHeight - window.innerHeight);
    return clamp(-hero.getBoundingClientRect().top / range);
  };

  const tick = (now) => {
    const delta = Math.min(40, now - last);
    last = now;
    scroll.target = measure();
    const previous = scroll.current;
    const scrollEase = 1 - Math.pow(1 - 0.145, delta / (1000 / 60));
    const pointerEase = 1 - Math.pow(1 - 0.1, delta / (1000 / 60));
    scroll.current = reduceMotion ? scroll.target : lerp(scroll.current, scroll.target, scrollEase);
    scroll.velocity = scroll.current - previous;
    pointer.x = reduceMotion ? pointer.targetX : lerp(pointer.x, pointer.targetX, pointerEase);
    pointer.y = reduceMotion ? pointer.targetY : lerp(pointer.y, pointer.targetY, pointerEase);
    onFrame?.({ progress: scroll.current, velocity: scroll.velocity, pointer, delta, reduceMotion });
    frame = requestAnimationFrame(tick);
  };

  const onPointer = (event) => {
    pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
  };

  window.addEventListener('pointermove', onPointer, { passive: true });
  frame = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onPointer);
  };
}

export function setupReveals() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
}

export function setupMagneticControls() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll('[data-magnetic]').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
    });
    element.addEventListener('pointerleave', () => {
      element.style.transform = '';
    });
  });
}

export async function extractLightBackdrop(image, { start = 220, end = 238 } = {}) {
  if (!image) return;
  if (!image.complete) await new Promise((resolve, reject) => {
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', reject, { once: true });
  });
  await image.decode?.();

  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  const frame = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = frame.data;

  for (let index = 0; index < pixels.length; index += 4) {
    const red = pixels[index];
    const green = pixels[index + 1];
    const blue = pixels[index + 2];
    const darkest = Math.min(red, green, blue);
    const brightest = Math.max(red, green, blue);
    const isNeutral = brightest - darkest < 13;
    if (!isNeutral || darkest <= start) continue;
    const remaining = clamp((end - darkest) / (end - start));
    pixels[index + 3] = Math.round(pixels[index + 3] * remaining);
  }

  context.putImageData(frame, 0, 0);
  image.src = canvas.toDataURL('image/png');
  await image.decode?.();
}

export { clamp, lerp };
