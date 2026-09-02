import './styles.css';
import { setupMagneticControls, setupReveals, clamp } from '../../../toolkit/src/motion.js';

document.documentElement.classList.add('js');

const root = document.documentElement;
const entrance = document.querySelector('[data-entrance]');
const entranceVideo = document.querySelector('[data-entrance-video]');
const progressBar = document.querySelector('[data-entrance-progress]');
const progressLabel = document.querySelector('[data-entrance-percent]');
const nav = document.querySelector('[data-nav]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const smoothstep = (value) => {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
};

const range = (progress, start, end) => smoothstep((progress - start) / (end - start));

const sectionProgress = (element) => {
  if (!element) return 0;
  const travel = Math.max(1, element.offsetHeight - window.innerHeight);
  return clamp(-element.getBoundingClientRect().top / travel);
};

let entranceProgress = 0;
let videoDuration = 0;
let renderedTime = 0;
let previousScroll = window.scrollY;

const readScroll = () => {
  entranceProgress = sectionProgress(entrance);
  const current = window.scrollY;
  const pastOpening = current > (entrance?.offsetHeight || 0) + window.innerHeight * 0.7;
  nav?.classList.toggle('is-compact', current > 70);
  nav?.classList.toggle('is-hidden', current > previousScroll && pastOpening);
  previousScroll = current;
};

const renderEntrance = () => {
  const progress = reducedMotion.matches ? 1 : entranceProgress;
  const videoProgress = range(progress, 0.035, 0.79);
  const welcomeExit = range(progress, 0.045, 0.2);
  const arrival = range(progress, 0.77, 0.94);
  const arrivalThe = range(progress, 0.765, 0.845);
  const arrivalVelvet = range(progress, 0.79, 0.89);
  const arrivalDesk = range(progress, 0.82, 0.925);
  root.style.setProperty('--entrance-progress', progress.toFixed(4));
  root.style.setProperty('--entrance-welcome-exit', welcomeExit.toFixed(4));
  root.style.setProperty('--entrance-arrival', arrival.toFixed(4));
  root.style.setProperty('--arrival-the', arrivalThe.toFixed(4));
  root.style.setProperty('--arrival-velvet', arrivalVelvet.toFixed(4));
  root.style.setProperty('--arrival-desk', arrivalDesk.toFixed(4));
  const entranceBottom = entrance?.getBoundingClientRect().bottom || 0;
  document.body.classList.toggle('has-entered', entranceBottom < window.innerHeight - 48 || reducedMotion.matches);

  if (progressBar) progressBar.style.transform = `scaleX(${Math.max(0.015, progress)})`;
  if (progressLabel) progressLabel.textContent = String(Math.round(progress * 100)).padStart(2, '0');
  if (entranceVideo && videoDuration > 0 && !entranceVideo.seeking) {
    const targetTime = Math.min(videoDuration - 0.025, videoDuration * videoProgress);
    renderedTime += (targetTime - renderedTime) * 0.2;
    if (Math.abs(targetTime - renderedTime) < 0.0025) renderedTime = targetTime;
    if (Math.abs(entranceVideo.currentTime - renderedTime) > 0.004) {
      entranceVideo.currentTime = renderedTime;
    }
  }

  requestAnimationFrame(renderEntrance);
};

const initializeEntranceMedia = () => {
  if (!entranceVideo || videoDuration > 0 || !Number.isFinite(entranceVideo.duration)) return;
  videoDuration = entranceVideo.duration;
  renderedTime = reducedMotion.matches ? Math.max(0, videoDuration - 0.025) : 0.001;
  entranceVideo.currentTime = renderedTime;
  document.body.classList.add('entrance-media-ready');
};

if (entranceVideo?.readyState >= 1) initializeEntranceMedia();
else entranceVideo?.addEventListener('loadedmetadata', initializeEntranceMedia, { once: true });

entranceVideo?.addEventListener('error', () => {
  document.body.classList.add('entrance-media-error');
});

window.addEventListener('scroll', readScroll, { passive: true });
window.addEventListener('resize', readScroll, { passive: true });
window.addEventListener('pointermove', (event) => {
  root.style.setProperty('--pointer-x', `${event.clientX}px`);
  root.style.setProperty('--pointer-y', `${event.clientY}px`);
}, { passive: true });

setupReveals();
setupMagneticControls();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });
});

const contactForm = document.querySelector('[data-contact-form]');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const email = String(data.get('email') || '').trim();
  const message = String(data.get('message') || '').trim();
  const subject = encodeURIComponent(`New project inquiry from ${email}`);
  const body = encodeURIComponent(`Reply to: ${email}\n\n${message}`);
  window.location.href = `mailto:hello@thevelvetdesk.org?subject=${subject}&body=${body}`;
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

readScroll();
requestAnimationFrame(renderEntrance);
document.body.classList.add('is-loaded');
