document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  const video = document.getElementById('videoPlayer');
  const player = new shaka.Player(video);

  player.addEventListener('error', onError);

  async function loadVideo() {
    try {
      await player.load('https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd', 0, 'application/dash+xml');
      console.log('The video has been successfully loaded!');
    } catch (error) {
      onError(error);
    }
  }

  // Configure DRM
  player.configure({
    drm: {
      servers: {
        'org.w3.clearkey': 'data:application/json;base64,eyJrdmsiOiB7ImFlMjY4NDViZDMzMDM4YTljMDc3NGEwOTgxMDA3Mjk0IjogIjYzYWM2NjJkZGUzMTBjZmI0Y2M2ZjliNDNiMzQxOTZkIn19',
      }
    }
  });

  loadVideo();
}

function onError(event) {
  console.error('Error code', event.detail.code, 'object', event.detail);
}
