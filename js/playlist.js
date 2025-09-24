export const playlist = [
  {
    name: 'MP4 Sample',
    sources: [{ src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', type: 'application/x-mpegURL' }],
    poster: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=1200&q=80&auto=format&fit=crop'
  },
  {
    name: 'HLS Big Buck',
    sources: [{ src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8', type: 'application/x-mpegURL' }],
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop'
  },
  {
    name: 'DASH Sintel',
    sources: [{ src: 'https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd', type: 'application/dash+xml' }],
    poster: 'https://images.unsplash.com/photo-1529336953121-a0ce72e0f9ff?w=1200&q=80&auto=format&fit=crop'
  },
  {
    name: 'MP4 Tears of Steel',
    sources: [{ src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video/mp4' }],
    poster: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop'
  }
];

export const icons = {
  prev: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6v12h2V6H6zm3.5 6l8.5 6V6l-8.5 6z"/></svg>`,
  next: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6v12h2V6h-2zM6 6v12l8.5-6L6 6z"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  pause: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
  volume: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 9v6h4l5 5V4l-5 5H7z"/></svg>`,
  mute: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12l4.5 4.5-1.5 1.5L15 13.5V19l-5-5H7V9h3l5-5v6.5l4.5-4.5L21 7.5 16.5 12z"/></svg>`,
  fullscreen: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H7v5zm10 7h-3v2h5v-5h-2v3zm-3-11v2h3v3h2V5h-5z"/></svg>`
};
