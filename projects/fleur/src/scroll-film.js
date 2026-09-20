export function createScrollFilm({ sections, video, onUpdate }) {
  const nodes = Array.from(sections);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (value) => Math.min(1, Math.max(0, value));
  let frame = 0;
  let target = 0;

  const seek = () => {
    if (!video || reduced.matches || !Number.isFinite(video.duration) || video.seeking) return;
    const time = target * Math.max(0, video.duration - 0.05);
    if (Math.abs(video.currentTime - time) > 0.035) video.currentTime = time;
  };

  const measure = () => {
    frame = 0;
    const viewport = window.innerHeight;
    const progress = {};
    let active = null;
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      progress[node.dataset.act] = clamp((viewport * 0.7 - rect.top) / Math.max(1, rect.height * 0.85));
      if (rect.top <= viewport * 0.6) active = node.dataset.act;
    });
    target = Object.values(progress).reduce((sum, value) => sum + value, 0) / Math.max(1, nodes.length);
    onUpdate({ progress, active, global: target, reducedMotion: reduced.matches });
    seek();
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(measure);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  video?.addEventListener('loadedmetadata', schedule);
  video?.addEventListener('seeked', seek);
  measure();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    reduced.removeEventListener('change', schedule);
    video?.removeEventListener('loadedmetadata', schedule);
    video?.removeEventListener('seeked', seek);
  };
}
