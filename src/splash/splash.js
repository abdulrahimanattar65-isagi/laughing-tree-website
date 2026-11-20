import './splash.css';

export function runSplash({ onDone } = {}) {
  if (typeof window === 'undefined') {
    onDone?.();
    return;
  }

  const root = document.getElementById('root');
  const html = document.documentElement;
  const previousFocus = document.activeElement;
  const wasInert = root?.inert ?? false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const overlay = document.createElement('div');
  overlay.className = 'brand-splash';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Welcome to Laughing Tree');
  overlay.tabIndex = -1;

  const video = document.createElement('video');
  video.className = 'brand-splash__video';
  video.muted = true;
  video.defaultMuted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('aria-hidden', 'true');

  overlay.append(video);
  document.body.appendChild(overlay);
  html.classList.add('brand-splash-active');
  root?.classList.add('brand-splash-behind');
  if (root) root.inert = true;
  overlay.focus({ preventScroll: true });

  let finished = false;
  let watchdog;

  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(watchdog);
    video.pause();
    window.removeEventListener('keydown', onKey);
    root?.classList.add('brand-splash-reveal');
    overlay.classList.add('brand-splash--fade');
    setTimeout(() => {
      const restoreFocus = overlay.contains(document.activeElement);
      overlay.remove();
      video.removeAttribute('src');
      video.load();
      html.classList.remove('brand-splash-active');
      root?.classList.remove('brand-splash-behind', 'brand-splash-reveal');
      if (root) root.inert = wasInert;
      if (restoreFocus) previousFocus?.focus({ preventScroll: true });
      onDone?.();
    }, reduced ? 0 : 1000);
  }

  function onKey(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      overlay.focus({ preventScroll: true });
    } else if (event.key === 'Escape') {
      event.preventDefault();
      finish();
    }
  }

  video.addEventListener('ended', finish);
  video.addEventListener('error', finish);
  video.addEventListener('playing', () => {
    if (finished) return;
    clearTimeout(watchdog);
    const remaining = Number.isFinite(video.duration) ? video.duration - video.currentTime : 30;
    watchdog = setTimeout(finish, Math.max(0, remaining) * 1000 + 5000);
  });
  window.addEventListener('keydown', onKey);
  // Reveal the site if loading or autoplay cannot complete.
  watchdog = setTimeout(finish, 10000);
  if (reduced) {
    finish();
    return;
  }
  video.src = window.matchMedia('(max-width: 760px)').matches
    ? '/assets/laughing-tree-9x16.mp4'
    : '/assets/splash-logo.mp4';
  video.play()?.catch(finish);
}
