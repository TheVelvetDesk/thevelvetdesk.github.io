// Motion approach inspired by adxy/minima and rebuilt with original Velvet Desk artwork.
const SPRITE_COLUMNS = 4;
const SPRITE_ROWS = 3;
const SPRITES_PER_SHEET = SPRITE_COLUMNS * SPRITE_ROWS;
const SPRITE_GUTTER_X = 7;
const SPRITE_GUTTER_TOP = 1;
const SPRITE_GUTTER_BOTTOM = 7;
const SPRITE_SOURCES = [
  '/media/velvet-nyc-crowd.webp',
  '/media/velvet-nyc-crowd-2.webp',
  '/media/velvet-nyc-crowd-3.webp',
  '/media/velvet-nyc-crowd-4.webp',
];

const randomBetween = (min, max) => min + Math.random() * (max - min);
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const crowdSizeFor = (width) => {
  if (width < 560) return 16;
  if (width < 920) return 24;
  return 36;
};

const shuffled = (items) => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
};

export const setupCrowdFooter = () => {
  const canvas = document.querySelector('[data-contact-crowd]');
  const section = canvas?.closest('.contact');
  if (!(canvas instanceof HTMLCanvasElement) || !(section instanceof HTMLElement)) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  const images = SPRITE_SOURCES.map(() => new Image());
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    peeps: [],
    spriteQueue: [],
    visible: false,
    imageRequested: false,
    ready: false,
    frame: 0,
    lastTime: 0,
    pointerX: 0,
    pointerY: 0,
  };

  const spriteDetails = (spriteId) => {
    const sheetIndex = Math.floor(spriteId / SPRITES_PER_SHEET);
    const spriteIndex = spriteId % SPRITES_PER_SHEET;
    const cellWidth = images[sheetIndex].naturalWidth / SPRITE_COLUMNS;
    const cellHeight = images[sheetIndex].naturalHeight / SPRITE_ROWS;
    const spriteWidth = cellWidth - SPRITE_GUTTER_X * 2;
    const spriteHeight = cellHeight - SPRITE_GUTTER_TOP - SPRITE_GUTTER_BOTTOM;
    return {
      spriteId,
      sheetIndex,
      sourceX: (spriteIndex % SPRITE_COLUMNS) * cellWidth + SPRITE_GUTTER_X,
      sourceY: Math.floor(spriteIndex / SPRITE_COLUMNS) * cellHeight + SPRITE_GUTTER_TOP,
      spriteWidth,
      spriteHeight,
    };
  };

  const assignNextSprite = (peep) => {
    const previousSprite = peep.spriteId;
    const nextSprite = state.spriteQueue.shift();
    Object.assign(peep, spriteDetails(nextSprite));
    state.spriteQueue.push(previousSprite);
  };

  const populate = () => {
    const totalSprites = SPRITES_PER_SHEET * images.length;
    const pool = shuffled(Array.from({ length: totalSprites }, (_, index) => index));
    const count = crowdSizeFor(state.width);
    const baseScale = state.width < 560 ? .62 : state.width < 920 ? .76 : .9;

    state.spriteQueue = pool.slice(count);
    state.peeps = pool.slice(0, count).map((spriteId, index) => {
      const sprite = spriteDetails(spriteId);
      const depth = clamp((index % 5) / 4 + randomBetween(-.06, .06));
      const requestedScale = baseScale * randomBetween(.5, .9) * (.72 + depth * .34);
      const safeScale = (state.height - 34) / sprite.spriteHeight;
      const scale = Math.min(requestedScale, safeScale);
      const width = sprite.spriteWidth * scale;
      const height = sprite.spriteHeight * scale;
      const direction = Math.random() > .5 ? 1 : -1;
      const bottom = state.height + randomBetween(4, 24) - depth * 8;

      return {
        ...sprite,
        width,
        height,
        depth,
        direction,
        x: randomBetween(-width, state.width),
        y: Math.max(18, bottom - height),
        speed: direction * randomBetween(8, 19) * (.74 + depth * .42),
        bob: randomBetween(1.5, 4.5),
        phase: randomBetween(0, Math.PI * 2),
        frequency: randomBetween(1.2, 1.9),
      };
    }).sort((a, b) => a.depth - b.depth);
  };

  const updateParallax = () => {
    if (reducedMotion.matches) {
      section.style.setProperty('--city-far-x', '0px');
      section.style.setProperty('--city-far-y', '0px');
      section.style.setProperty('--city-near-x', '0px');
      section.style.setProperty('--city-near-y', '0px');
      section.style.setProperty('--city-crowd-x', '0px');
      return;
    }

    const bounds = section.getBoundingClientRect();
    const scrollPosition = clamp((window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)) - .5;
    section.style.setProperty('--city-far-x', `${state.pointerX * -8}px`);
    section.style.setProperty('--city-far-y', `${scrollPosition * -24 + state.pointerY * -4}px`);
    section.style.setProperty('--city-near-x', `${state.pointerX * 14}px`);
    section.style.setProperty('--city-near-y', `${scrollPosition * -38 + state.pointerY * 5}px`);
    section.style.setProperty('--city-crowd-x', `${state.pointerX * 7}px`);
  };

  const draw = (time, delta = 0) => {
    context.clearRect(0, 0, state.width, state.height);

    state.peeps.forEach((peep) => {
      if (!reducedMotion.matches) {
        peep.x += peep.speed * delta;
        if (peep.direction > 0 && peep.x > state.width + peep.width) {
          assignNextSprite(peep);
          peep.x = -peep.width - randomBetween(0, state.width * .15);
        } else if (peep.direction < 0 && peep.x < -peep.width * 1.25) {
          assignNextSprite(peep);
          peep.x = state.width + randomBetween(0, state.width * .15);
        }
      }

      const bob = reducedMotion.matches ? 0 : Math.sin(time * .001 * peep.frequency + peep.phase) * peep.bob;
      context.save();
      context.globalAlpha = .5 + peep.depth * .48;
      context.translate(peep.x + (peep.direction < 0 ? peep.width : 0), peep.y + bob);
      context.scale(peep.direction < 0 ? -1 : 1, 1);
      context.drawImage(
        images[peep.sheetIndex],
        peep.sourceX,
        peep.sourceY,
        peep.spriteWidth,
        peep.spriteHeight,
        0,
        0,
        peep.width,
        peep.height,
      );
      context.restore();
    });
  };

  const animate = (time) => {
    if (!state.visible || document.hidden || reducedMotion.matches) {
      state.frame = 0;
      state.lastTime = time;
      return;
    }

    const delta = Math.min(.05, Math.max(0, (time - state.lastTime) / 1000));
    state.lastTime = time;
    updateParallax();
    draw(time, delta);
    state.frame = requestAnimationFrame(animate);
  };

  const start = () => {
    if (state.frame || reducedMotion.matches || !state.visible || document.hidden || !state.ready) return;
    state.lastTime = performance.now();
    state.frame = requestAnimationFrame(animate);
  };

  const resize = () => {
    if (!state.ready) return;
    const bounds = canvas.getBoundingClientRect();
    state.width = Math.max(1, Math.round(bounds.width));
    state.height = Math.max(1, Math.round(bounds.height));
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    populate();
    updateParallax();
    draw(performance.now());
    start();
  };

  const loadImages = async () => {
    await Promise.all(images.map((image, index) => new Promise((resolve, reject) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', reject, { once: true });
      image.src = SPRITE_SOURCES[index];
    })));
    state.ready = true;
    resize();
    canvas.classList.add('is-ready');
  };

  const observer = new IntersectionObserver(([entry]) => {
    state.visible = entry.isIntersecting;
    if (state.visible && !state.imageRequested) {
      state.imageRequested = true;
      void loadImages();
    }
    if (!state.visible && state.frame) {
      cancelAnimationFrame(state.frame);
      state.frame = 0;
    }
    start();
  }, { rootMargin: '360px 0px' });

  observer.observe(canvas);
  new ResizeObserver(resize).observe(canvas);

  section.addEventListener('pointermove', (event) => {
    const bounds = section.getBoundingClientRect();
    state.pointerX = clamp((event.clientX - bounds.left) / bounds.width, 0, 1) * 2 - 1;
    state.pointerY = clamp((event.clientY - bounds.top) / bounds.height, 0, 1) * 2 - 1;
  }, { passive: true });
  section.addEventListener('pointerleave', () => {
    state.pointerX = 0;
    state.pointerY = 0;
  });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && state.frame) {
      cancelAnimationFrame(state.frame);
      state.frame = 0;
      updateParallax();
      draw(performance.now());
    } else {
      start();
    }
  });

  document.addEventListener('visibilitychange', start);
};
