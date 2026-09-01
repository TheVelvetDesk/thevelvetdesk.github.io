import './styles.css';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { VelvetCloth } from './VelvetCloth.js';
import { createMotionStudio, setupMagneticControls, setupReveals, clamp } from '../../../toolkit/src/motion.js';

document.documentElement.classList.add('js');

const hero = document.querySelector('[data-hero]');
const root = document.documentElement;

const clothMount = document.querySelector('[data-threeui-cloth]');
createRoot(clothMount).render(createElement(VelvetCloth, {
  className: 'threeui-cloth-frame',
  style: { width: '100%', height: '100%' },
}));

const chapterFor = (progress) => {
  if (progress < 0.26) return '01 / 04';
  if (progress < 0.54) return '02 / 04';
  if (progress < 0.8) return '03 / 04';
  return '04 / 04';
};

createMotionStudio({
  hero,
  onFrame({ progress, velocity, pointer, delta }) {
    root.style.setProperty('--hero-progress', progress.toFixed(4));
    root.style.setProperty('--hero-velocity', clamp(Math.abs(velocity) * 24, 0, 1).toFixed(4));
    root.style.setProperty('--pointer-nx', pointer.x.toFixed(4));
    root.style.setProperty('--pointer-ny', pointer.y.toFixed(4));
    document.querySelector('[data-scroll-progress]').style.transform = `scaleX(${Math.max(0.03, progress)})`;
    document.querySelector('[data-chapter]').textContent = chapterFor(progress);
  },
});

setupReveals();
setupMagneticControls();

const nav = document.querySelector('[data-nav]');
let previousScroll = window.scrollY;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  nav.classList.toggle('is-compact', current > 70);
  nav.classList.toggle('is-hidden', current > previousScroll && current > window.innerHeight * 0.8);
  previousScroll = current;
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
document.body.classList.add('is-loaded');
