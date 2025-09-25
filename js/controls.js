import { icons } from './playlist.js';
import { formatTime, getProgressPctFromEvent } from './utils.js';

export function initControls(player, loadItem, playlist, getCurrentIndex) {
  const container = player.el();
  const controlsWrap = document.createElement('div');
  controlsWrap.className = 'controls-wrap controls-visible';
  controlsWrap.innerHTML = `
    <div class="hover-tip-layer">
    </div>
    <div class="progress-row">
      <div class="time-label" id="time-start">
      00:00
      </div>
      <div class="progress" id="progress">
        <div class="progress-buffered" id="progress-buffered">
        </div>
        <div class="progress-played" id="progress-played">
        </div>
        <div class="progress-thumb" id="progress-thumb">
        </div>
        <div class="hover-tip" id="hover-tip">
        </div>
      </div>
      <div class="time-label" id="time-end">
      00:00
      </div>
    </div>
    <div class="bottom-controls">
      <div class="left-controls">
        <button class="btn" id="btn-prev">
        </button>
        <button class="btn" id="btn-play">
        </button>
        <button class="btn" id="btn-next">
        </button>
        <div class="volume-wrap">
          <button class="btn" id="btn-mute">
          </button>
          <input type="range" id="volume" class="volume-slider" min="0" max="1" step="0.01"/>
        </div>
      </div>
      <div class="right-controls">
        <button class="btn" id="btn-full">
        </button>
      </div>
    </div>
  `;
  container.appendChild(controlsWrap);

  // Query elements
  const btnPlay = controlsWrap.querySelector('#btn-play');
  const btnPrev = controlsWrap.querySelector('#btn-prev');
  const btnNext = controlsWrap.querySelector('#btn-next');
  const btnMute = controlsWrap.querySelector('#btn-mute');
  const btnFull = controlsWrap.querySelector('#btn-full');
  const vol = controlsWrap.querySelector('#volume');
  const timeStart = controlsWrap.querySelector('#time-start');
  const timeEnd = controlsWrap.querySelector('#time-end');
  const progress = controlsWrap.querySelector('#progress');
  const progressBuffered = controlsWrap.querySelector('#progress-buffered');
  const progressPlayed = controlsWrap.querySelector('#progress-played');
  const progressThumb = controlsWrap.querySelector('#progress-thumb');
  const hoverTip = controlsWrap.querySelector('#hover-tip');

  // Set icons
  btnPrev.innerHTML = icons.prev;
  btnPlay.innerHTML = icons.play;
  btnNext.innerHTML = icons.next;
  btnMute.innerHTML = icons.volume;
  btnFull.innerHTML = icons.fullscreen;

  let lastVolumeBeforeMute = 0.7;

  // Play/Pause
  btnPlay.addEventListener('click', () => {
    player.paused() ? player.play() : player.pause()
  });
  player.on('play', () => {
    btnPlay.innerHTML = icons.pause
  });
  player.on('pause', () => {
    btnPlay.innerHTML = icons.play
  });

  // Prev/Next
  btnPrev.addEventListener('click', () => {
    loadItem(getCurrentIndex() - 1)
  });
  btnNext.addEventListener('click', () => {
    loadItem(getCurrentIndex() + 1)
  });

  // Volume
  function syncVolumeUI() {
    const v = player.muted() ? 0 : player.volume();
    vol.value = String(v);
    btnMute.innerHTML = v === 0 ? icons.mute : icons.volume;
  }

  vol.addEventListener('input', (e) => {
    const v = Number(e.target.value);
    if (v === 0) 
      player.muted(true);
    else {
      player.muted(false);
      player.volume(v);
      lastVolumeBeforeMute = v;
    }
    syncVolumeUI();
  });

  btnMute.addEventListener('click', () => {
    if (player.muted() || player.volume() === 0) {
      player.muted(false);
      player.volume(lastVolumeBeforeMute);
    } else {
      lastVolumeBeforeMute = player.volume();
      player.muted(true);
    }
    syncVolumeUI();
  });

  // Fullscreen
  btnFull.addEventListener('click', () => {
     player.isFullscreen() ? player.exitFullscreen() : player.requestFullscreen()
    });

  // Time + progress update
  function updateTimes() {
    const current = player.currentTime() || 0;

    const duration = player.duration() || 0;

    timeStart.textContent = formatTime(current);

    timeEnd.textContent = `-${formatTime(Math.max(0, duration - current))}`;

    const playedPct = duration ? (current / duration) * 100 : 0;


    progressPlayed.style.width = `${playedPct}%`;
    
    progressThumb.style.left = `${playedPct}%`;
    
    const buf = player.buffered();
    
    const bufferedEnd = buf?.length ? buf.end(buf.length - 1) : 0;
    
    progressBuffered.style.width = `${duration ? Math.min(bufferedEnd, duration) / duration * 100 : 0}%`;
  }
  ['timeupdate','durationchange','loadedmetadata','progress'].forEach(ev => {
    player.on(ev, updateTimes)
  });

  // Seek
  let seeking = false;
  const seekToPct = (p) => {
    const d = player.duration() || 0;
    player.currentTime(p * d); 
    };

  const onSeekStart = (e) => {
    seeking = true;
    seekToPct(getProgressPctFromEvent(e, progress)); 
  };
  const onSeekMove = (e) => {
    if(seeking) seekToPct(getProgressPctFromEvent(e, progress));
  };
  const onSeekEnd = () => {
    seeking = false;
  };

  progress.addEventListener('mousedown', onSeekStart);

  progress.addEventListener('mousemove', onSeekMove);

  // Using event capturing to ensure this fires even if the mouse is outside the window

  window.addEventListener('mouseup', onSeekEnd, true);

  progress.addEventListener('touchstart', onSeekStart, {passive:true});

  progress.addEventListener('touchmove', onSeekMove, {passive:true});
  
  progress.addEventListener('touchend', onSeekEnd, {passive:true});

  player.on('dispose', () => {
    window.removeEventListener('mouseup', onSeekEnd, true);
  });

  // Hover tip
  progress.addEventListener('mousemove', (e) => {
    const pct = getProgressPctFromEvent(e, progress);
    const hoverTime = (player.duration() || 0) * pct;
    hoverTip.textContent = formatTime(hoverTime);
    hoverTip.style.left = `${pct * progress.offsetWidth}px`;
    hoverTip.style.display = 'block';
  });

  progress.addEventListener('mouseleave', () =>{ 
    hoverTip.style.display = 'none'
  });

  // Auto-hide
  let hideTimer = null;
  function showControls() {
    controlsWrap.classList.add('controls-visible');
    controlsWrap.classList.remove('controls-hidden');
    if(hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { 
      if(!seeking && !player.paused())
        { controlsWrap.classList.remove('controls-visible');
           controlsWrap.classList.add('controls-hidden'); 
          }},2000);
  }
  ['mousemove','touchstart','keydown'].forEach(evt => {
    container.addEventListener(evt, showControls, {passive:true})
  });
  player.on('play', showControls); 
  player.on('pause', showControls);

  // Initialize volume & UI
  player.on('volumechange', syncVolumeUI);
  player.ready(() => { 
    player.volume(0.7); 
    player.muted(false); 
    syncVolumeUI(); 
    updateTimes(); });
}
