import { createExperience } from './scenes/hero-scene';

const SCROLL_EASING = 0.075;
const PROGRESS_TOLERANCE = 0.0001;

function mountHero() {
  const container = document.getElementById('scene');
  const section = document.querySelector<HTMLElement>('.flight-scroll');
  const stage = document.querySelector<HTMLElement>('.flight-stage');
  if (!container || !section || !stage) return;

  let experience: ReturnType<typeof createExperience>;
  try {
    experience = createExperience(container);
  } catch (error) {
    console.error(error);
    return;
  }

  const events = new AbortController();
  const { signal } = events;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let targetProgress = 0;
  let progress = 0;
  let frameId = 0;

  function renderFrame() {
    frameId = 0;
    progress = reducedMotion.matches
      ? targetProgress
      : progress + (targetProgress - progress) * SCROLL_EASING;
    if (Math.abs(targetProgress - progress) < PROGRESS_TOLERANCE) progress = targetProgress;
    experience.updateFlight(progress, window.innerWidth < 800);
    if (progress !== targetProgress) frameId = requestAnimationFrame(renderFrame);
  }

  const measure = () => {
    const pinTop = parseFloat(getComputedStyle(stage).top) || 0;
    const distance = Math.max(1, section.offsetHeight - stage.offsetHeight);
    targetProgress = Math.max(0, Math.min(1, (pinTop - section.getBoundingClientRect().top) / distance));
    if (!frameId) frameId = requestAnimationFrame(renderFrame);
  };

  window.addEventListener('scroll', measure, { passive: true, signal });
  window.addEventListener('resize', measure, { signal });
  reducedMotion.addEventListener('change', measure, { signal });
  measure();

  return () => {
    events.abort();
    cancelAnimationFrame(frameId);
    experience.dispose();
  };
}

function mountNotices() {
  const toast = document.getElementById('ai-toast');
  if (!toast) return;

  const events = new AbortController();
  let timer: ReturnType<typeof setTimeout>;
  const hide = () => {
    toast.classList.remove('show');
    toast.textContent = '';
  };

  const bindNotice = (selector: string, message: string) => {
    const show = () => {
      clearTimeout(timer);
      toast.textContent = message;
      toast.classList.add('show');
      timer = setTimeout(hide, 2200);
    };
    for (const button of document.querySelectorAll(selector)) {
      button.addEventListener('click', show, { signal: events.signal });
    }
  };

  bindNotice('.mcp-connect', 'MCP 연결 기능을 준비하고 있어요. 공개 시 연결 방법을 안내할게요.');
  bindNotice('.app-download', '산들 앱은 출시 준비 중이에요.');

  return () => {
    events.abort();
    clearTimeout(timer);
    hide();
  };
}

export function mountLanding() {
  const disposeHero = mountHero();
  const disposeNotices = mountNotices();

  return () => {
    disposeHero?.();
    disposeNotices?.();
  };
}
