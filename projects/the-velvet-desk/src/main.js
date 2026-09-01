import './styles.css';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { LiquidFormBackground } from '@designcodeio/threeui/components/LiquidFormBackground';
import { createMotionStudio, setupMagneticControls, setupReveals, clamp } from '../../../toolkit/src/motion.js';

document.documentElement.classList.add('js');

const hero = document.querySelector('[data-hero]');
const proof = document.querySelector('.proof');
const root = document.documentElement;

const signalMount = document.querySelector('[data-threeui-signal]');
createRoot(signalMount).render(createElement(LiquidFormBackground, {
  className: 'threeui-signal-frame',
  speed: 0.34,
  morph: 0.82,
  noiseScale: 0.76,
  mouseAmount: 0.08,
  metal: 1.18,
  camera: 5.1,
  tintHue: 347,
  tintAmount: 0.72,
}));

const chapterFor = (progress) => {
  if (progress < 0.32) return '01 / 03';
  if (progress < 0.7) return '02 / 03';
  return '03 / 03';
};

const range = (progress, start, end) => {
  const value = clamp((progress - start) / (end - start));
  return value * value * (3 - 2 * value);
};

const proofProgress = () => {
  if (!proof) return 0;
  const travel = Math.max(1, proof.offsetHeight - window.innerHeight);
  return clamp(-proof.getBoundingClientRect().top / travel);
};

const metric = document.querySelector('[data-proof-metric]');

createMotionStudio({
  hero,
  onFrame({ progress, velocity, pointer }) {
    const titleExit = range(progress, 0.1, 0.38);
    const thesisIn = range(progress, 0.28, 0.55);
    const heroExit = range(progress, 0.76, 0.97);
    const proofValue = proofProgress();

    root.style.setProperty('--hero-progress', progress.toFixed(4));
    root.style.setProperty('--hero-title-exit', titleExit.toFixed(4));
    root.style.setProperty('--hero-thesis-in', thesisIn.toFixed(4));
    root.style.setProperty('--hero-exit', heroExit.toFixed(4));
    root.style.setProperty('--hero-velocity', clamp(Math.abs(velocity) * 24, 0, 1).toFixed(4));
    root.style.setProperty('--pointer-nx', pointer.x.toFixed(4));
    root.style.setProperty('--pointer-ny', pointer.y.toFixed(4));
    root.style.setProperty('--proof-progress', proofValue.toFixed(4));
    document.querySelector('[data-scroll-progress]').style.transform = `scaleX(${Math.max(0.03, progress)})`;
    document.querySelector('[data-chapter]').textContent = chapterFor(progress);
    if (metric) metric.textContent = Math.round(73 * range(proofValue, 0.5, 0.84));
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
