import videojs from 'video.js';
import 'videojs-hotkeys';
import { playlist } from './playlist.js';

export function initPlayer() {
  const player = videojs('player', {
    autoplay: true,
    controls: false,
    preload: 'auto',
    fill: true,
  });

  player.ready(() => {
    player.hotkeys?.({ enableModifiersForNumbers: false, seekStep: 5, volumeStep: 0.05 });
  });

  player.on('ended', () => {
    loadItem(index + 1);
  });

  let index = 0;

  function loadItem(i) {
    index = (i + playlist.length) % playlist.length;
    const item = playlist[index];
    player.pause();
    player.poster(item.poster || '');
    player.src(item.sources);
    player.load();
    player.play().catch(() => {});
  }

  loadItem(0);

  return { player, loadItem, getCurrentIndex: () => index };
}
