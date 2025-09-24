import '../styles/styles.css';


import { initPlayer } from './player.js';
import { initControls } from './controls.js';
import { playlist } from './playlist.js';

const app = document.getElementById('app');
app.innerHTML = `<div class="player-shell">
  <video id="player" class="video-js vjs-custom" playsinline webkit-playsinline></video>
  <div class="asset-row" id="assets"></div>
</div>`;

const { player, loadItem, getCurrentIndex } = initPlayer();
initControls(player, loadItem, playlist, getCurrentIndex);

// Build asset buttons
const assetsContainer = document.getElementById('assets');
assetsContainer.innerHTML = playlist.map((item,i)=>`<button class="asset-btn" data-i="${i}">${i+1}. ${item.name}</button>`).join('');

function updateActiveButton() {
  const currentIndex = getCurrentIndex();
  document.querySelectorAll('.asset-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === currentIndex);
  });
}

assetsContainer.addEventListener('click',(e)=>{
  const b = e.target.closest('button[data-i]');
  if(!b) return;
  loadItem(Number(b.dataset.i));
});

player.on(['loadstart', 'ended'], updateActiveButton);
