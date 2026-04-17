(function () {

  // Config
  var JSON_URL = 'https://raw.githubusercontent.com/kajju027/Fancode-Events-Json/refs/heads/main/fancode.json';
  var WHATSAPP = 'https://whatsapp.com/channel/0029VaeylYYBPzjVNomWuZ0T/';
  var VIEW_KEY = 'Fancode Official ™';
  var HIT_BASE = 'https://sayan-prime.pages.dev/api/hit?key=';
  var GET_BASE = 'https://sayan-prime.pages.dev/api/get?key=';

  // DOM
  var videoScreen  = document.getElementById('videoScreen');
  var video        = document.getElementById('video');
  var wrap         = document.getElementById('playerWrap');
  var loader       = document.getElementById('spLoader');
  var overlay      = document.getElementById('spOverlay');
  var controls     = document.getElementById('spControls');
  var playBtn      = document.getElementById('spPlayBtn');
  var icoPlay      = document.getElementById('icoPlay');
  var icoPause     = document.getElementById('icoPause');
  var progressBar  = document.getElementById('spProgress');
  var filled       = document.getElementById('spFilled');
  var buffered     = document.getElementById('spBuffered');
  var timeEl       = document.getElementById('spTime');
  var volBtn       = document.getElementById('spVolBtn');
  var icoVolOn     = document.getElementById('icoVolOn');
  var icoVolOff    = document.getElementById('icoVolOff');
  var volRange     = document.getElementById('spVolRange');
  var qualityBtn   = document.getElementById('spQualityBtn');
  var qualityMenu  = document.getElementById('spQualityMenu');
  var fsBtn        = document.getElementById('spFsBtn');
  var popup        = document.getElementById('popup');

  var hls = null;
  var qualities = [];
  var hideTimer = null;
  var isDragging = false;
  var popupShown = false;

  // Helpers
  function fmt(s) {
    if (isNaN(s) || !isFinite(s)) return '0:00';
    var m = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function formatViews(n) {
    if (!n || isNaN(n)) return '0';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return String(n);
  }

  function showOffline() {
    document.documentElement.innerHTML =
      '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Offline</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">' +
      '<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#09090b;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:"Inter",sans-serif;gap:16px;color:#fff;padding:20px;text-align:center}' +
      'h1{font-family:"Space Grotesk",sans-serif;font-size:20px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#52525b}' +
      'p{color:#3f3f46;font-size:13px}' +
      'a{color:#71717a;text-decoration:none;font-size:13px;border-bottom:1px solid #3f3f46;padding-bottom:2px}a:hover{color:#a1a1aa}</style></head><body>' +
      '<h1>Stream Offline</h1><p>Please check back later</p>' +
      '<a href="https://sayan-mete.pages.dev/contact" target="_blank">Contact Admin</a></body></html>';
  }

  // Show/hide controls
  function showControls() {
    wrap.classList.add('sp-show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      if (!video.paused) wrap.classList.remove('sp-show');
    }, 3000);
  }

  function togglePlay() {
    if (video.paused) { video.play().catch(function(){}); }
    else { video.pause(); }
  }

  function updatePlayIcon() {
    if (video.paused) {
      icoPlay.style.display = '';
      icoPause.style.display = 'none';
      wrap.classList.add('sp-paused');
    } else {
      icoPlay.style.display = 'none';
      icoPause.style.display = '';
      wrap.classList.remove('sp-paused');
    }
  }

  // Seek
  function seekTo(e) {
    var rect = progressBar.getBoundingClientRect();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    if (video.duration) video.currentTime = pct * video.duration;
  }

  progressBar.addEventListener('mousedown', function (e) { isDragging = true; seekTo(e); });
  document.addEventListener('mousemove', function (e) { if (isDragging) seekTo(e); });
  document.addEventListener('mouseup', function () { isDragging = false; });
  progressBar.addEventListener('touchstart', function (e) { isDragging = true; seekTo(e); }, { passive: true });
  document.addEventListener('touchmove', function (e) { if (isDragging) seekTo(e); }, { passive: true });
  document.addEventListener('touchend', function () { isDragging = false; });

  // Time update
  video.addEventListener('timeupdate', function () {
    if (!isDragging && video.duration) {
      filled.style.width = (video.currentTime / video.duration * 100) + '%';
      timeEl.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
    }
  });

  video.addEventListener('progress', function () {
    if (video.buffered.length > 0 && video.duration) {
      buffered.style.width = (video.buffered.end(video.buffered.length - 1) / video.duration * 100) + '%';
    }
  });

  video.addEventListener('play', updatePlayIcon);
  video.addEventListener('pause', updatePlayIcon);

  // Overlay click
  overlay.addEventListener('click', togglePlay);
  playBtn.addEventListener('click', togglePlay);

  // Double tap to fullscreen (mobile)
  var lastTap = 0;
  overlay.addEventListener('touchend', function (e) {
    var now = Date.now();
    if (now - lastTap < 300) toggleFullscreen();
    lastTap = now;
  });

  // Mouse move to show controls
  wrap.addEventListener('mousemove', showControls);
  wrap.addEventListener('touchstart', showControls, { passive: true });

  // Volume
  volRange.addEventListener('input', function () {
    video.volume = this.value / 100;
    video.muted = false;
    updateVolIcon();
  });

  volBtn.addEventListener('click', function () {
    video.muted = !video.muted;
    updateVolIcon();
  });

  function updateVolIcon() {
    if (video.muted || video.volume === 0) {
      icoVolOn.style.display = 'none';
      icoVolOff.style.display = '';
    } else {
      icoVolOn.style.display = '';
      icoVolOff.style.display = 'none';
    }
  }

  // Quality
  qualityBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    qualityMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', function (e) {
    if (!qualityMenu.contains(e.target) && e.target !== qualityBtn) {
      qualityMenu.classList.add('hidden');
    }
  });

  function buildQualityMenu(levels) {
    qualities = levels.map(function (l) { return l.height; });
    var def = qualities.includes(720) ? 720 : qualities[0];
    var html = '<div class="sp-qopt' + (def === -1 ? ' sp-active' : '') + '" data-q="-1">Auto</div>';
    qualities.forEach(function (q) {
      html += '<div class="sp-qopt' + (q === def ? ' sp-active' : '') + '" data-q="' + q + '">' + q + 'p</div>';
    });
    qualityMenu.innerHTML = html;
    qualityBtn.textContent = def === -1 ? 'Auto' : def + 'p';

    qualityMenu.querySelectorAll('.sp-qopt').forEach(function (el) {
      el.addEventListener('click', function () {
        var q = parseInt(this.getAttribute('data-q'));
        qualityMenu.querySelectorAll('.sp-qopt').forEach(function (o) { o.classList.remove('sp-active'); });
        this.classList.add('sp-active');
        qualityBtn.textContent = q === -1 ? 'Auto' : q + 'p';
        if (hls) hls.currentLevel = q === -1 ? -1 : qualities.indexOf(q);
      });
    });
  }

  // Fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      (wrap.requestFullscreen || wrap.webkitRequestFullscreen || wrap.msRequestFullscreen).call(wrap);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
    }
  }

  fsBtn.addEventListener('click', toggleFullscreen);

  document.addEventListener('fullscreenchange', function () {
    if (screen.orientation && screen.orientation.lock) {
      if (document.fullscreenElement) screen.orientation.lock('landscape').catch(function(){});
      else screen.orientation.unlock();
    }
  });

  // View counter
  function startViewCounter() {
    fetch(HIT_BASE + VIEW_KEY + '&_=' + Date.now()).catch(function(){});
    function update() {
      fetch(GET_BASE + VIEW_KEY + '&_=' + Date.now())
        .then(function(r){ return r.json(); })
        .then(function(j){
          var el = document.getElementById('viewCount');
          if (el) el.textContent = formatViews(j.total || 0) + ' Views';
        })
        .catch(function(){
          var el = document.getElementById('viewCount');
          if (el) el.textContent = '0 Views';
        });
    }
    update();
    setInterval(update, 5000);
  }

  // Update header UI
  function updateUI(data) {
    var title = data.match_name || data.title || (data.team_1 + ' vs ' + data.team_2) || 'Live Stream';
    document.getElementById('headerTitle').textContent = title;

    var badge = document.getElementById('headerBadge');
    var status = (data.status || '').toUpperCase().trim();
    if (status === 'LIVE') {
      badge.innerHTML = '<span class="w-[6px] h-[6px] rounded-full bg-emerald-400 live-dot"></span>LIVE';
      badge.className = 'flex items-center gap-[6px] px-2.5 py-[5px] rounded-lg bg-emerald-500/8 border border-emerald-500/12 text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-400 flex-shrink-0';
    } else {
      badge.textContent = data.status || 'UPCOMING';
      badge.className = 'flex items-center gap-[6px] px-2.5 py-[5px] rounded-lg bg-zinc-800/40 border border-zinc-800/30 text-[9px] font-bold uppercase tracking-[0.1em] text-zinc-500 flex-shrink-0';
    }

    document.getElementById('compactTournament').textContent = data.event_name || data.tournament || '-';
    document.getElementById('compactTime').textContent = data.startTime || '-';
    document.getElementById('compactStreamType').textContent = data.streamType || 'Standard';
  }

  // Init player with hls.js
  function initPlayer(src) {
    if (Hls.isSupported() && src && src.includes('.m3u8')) {
      hls = new Hls({
        lowLatencyMode: true,
        backBufferLength: 90,
        manifestLoadingTimeOut: 10000,
        manifestLoadingMaxRetry: 3,
        levelLoadingTimeOut: 10000,
        levelLoadingMaxRetry: 3,
        xhrSetup: function (xhr) { xhr.withCredentials = false; }
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, function (ev, data) {
        loader.classList.add('hidden');
        buildQualityMenu(data.levels);

        var def = qualities.includes(720) ? 720 : qualities[0];
        var idx = qualities.indexOf(def);
        if (idx !== -1) hls.currentLevel = idx;

        video.play().catch(function(){});
      });

      hls.on(Hls.Events.ERROR, function (ev, data) {
        if (data.fatal) {
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            hls.startLoad();
          } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            hls.recoverMediaError();
          } else {
            showOffline();
          }
        }
      });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      loader.classList.add('hidden');
      video.play().catch(function(){});
    } else {
      showOffline();
    }
  }

  // Button events
  document.getElementById('btnWhatsApp').addEventListener('click', function () {
    window.open(WHATSAPP, '_blank');
    popup.classList.add('hidden');
  });

  document.getElementById('btnShare').addEventListener('click', function () {
    navigator.clipboard.writeText(window.location.href).then(function () {
      alert('Link Copied!');
    }).catch(function () {
      alert('Copy failed. Use browser URL bar.');
    });
  });

  document.getElementById('popupJoin').addEventListener('click', function () {
    window.open(WHATSAPP, '_blank');
    popup.classList.add('hidden');
  });

  document.getElementById('popupClose').addEventListener('click', function () {
    popup.classList.add('hidden');
  });

  // Init
  async function init() {
    var params = new URLSearchParams(window.location.search);
    var matchId = params.get('id');
    var isAdFree = params.has('adfree');

    if (!matchId) { showOffline(); return; }

    videoScreen.classList.remove('hidden');
    videoScreen.style.display = 'block';
    video.volume = 0.8;

    updateUI({ title: 'Live Stream', status: 'LIVE', tournament: '-', startTime: '-', streamType: isAdFree ? 'Ad Free' : 'Standard' });
    startViewCounter();

    var videoSrc = null;

    try {
      var res = await fetch(JSON_URL, { cache: 'no-store' });
      var data = await res.json();
      var matches = data.matches || [];
      var found = matches.filter(function (m) { return String(m.match_id) === matchId; });

      if (found.length > 0) {
        var match = found[0];

        if (isAdFree && match.adfree_url) videoSrc = match.adfree_url;
        else if (match.dai_url) videoSrc = match.dai_url;

        updateUI({
          match_name: match.match_name || match.title || (match.team_1 + ' vs ' + match.team_2),
          status: match.status,
          event_name: match.event_name || match.event_category,
          startTime: match.startTime,
          streamType: isAdFree ? 'Ad Free' : 'Standard'
        });
      }
    } catch (e) {
      console.log('JSON fetch failed');
    }

    if (!videoSrc) { showOffline(); return; }

    initPlayer(videoSrc);

    if (!popupShown) {
      setTimeout(function () { popup.classList.remove('hidden'); popupShown = true; }, 2000);
    }
  }

  init();

})();
