export function formatTime(seconds = 0) {
  if (!isFinite(seconds)) return '00:00';
  seconds = Math.max(0, Math.floor(seconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function getProgressPctFromEvent(e, progressEl) {
  const rect = progressEl.getBoundingClientRect();
  const x = (e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX) - rect.left;
  return Math.min(1, Math.max(0, x / rect.width));
}
