// Configuration
var CONFIG = {
  JSON_URL: 'https://raw.githubusercontent.com/kajju027/Fancode-Events-Json/refs/heads/main/fancode.json',
  PLAYER_PATH: 'IOS/',
  WHATSAPP: 'https://whatsapp.com/channel/0029VaeylYYBPzjVNomWuZ0T/'
};

// Category icon map (same neutral style for all)
var CAT_ICONS = {
  cricket: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M5 5c1.5 1.5 4.5 1.5 6 0"/><path d="M5 11c1.5-1.5 4.5-1.5 6 0"/></svg>',
  football: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1 9.8 5.5H14.5L10.8 8.2 12.3 13 8 10.2 3.7 13 5.2 8.2 1.5 5.5H6.2z"/></svg>',
  tennis: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"/></svg>',
  f1: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M3 1.5v13M3 1.5h9l-2.5 2.5L13.5 6.5H3"/></svg>',
  golf: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="11" cy="12" r="3"/><path d="M11 9V2L8 4l3 2"/></svg>',
  badminton: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="11" r="4"/><path d="M8 7V2"/><path d="M6 4h4"/></svg>',
  kabaddi: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="5" cy="5" r="2"/><circle cx="11" cy="5" r="2"/><path d="M5 7v5M11 7v5M5 10h6"/></svg>',
  basketball: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M2 8h12M8 2c-2 2.5-2 9.5 0 12M8 2c2 2.5 2 9.5 0 12"/></svg>',
  hockey: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 10 4"/><circle cx="12" cy="11" r="2.5"/></svg>',
  boxing: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="10" r="4"/><path d="M8 6V2M6 3h4"/></svg>',
  baseball: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M5 2.5C6 5 6 11 5 13.5M11 2.5C10 5 10 11 11 13.5"/></svg>',
  table_tennis: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="2" width="12" height="8" rx="1"/><path d="M8 10v4M5 14h6"/></svg>',
  volleyball: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M2 6c3 1 5 3 6 6M14 6c-3 1-5 3-6 6"/></svg>',
  rugby: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><ellipse cx="8" cy="8" rx="3" ry="6"/><path d="M5 3c0 0 1.5 2.5 6 2.5M5 13c0 0 1.5-2.5 6-2.5"/></svg>',
  esports: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="4" width="14" height="7" rx="1.5"/><path d="M4 11v2M12 11v2M5 7h1M10 7h1"/></svg>'
};

var DEFAULT_ICON = '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M8 5v6M5 8h6"/></svg>';

// Partial match to find category key
function catKey(str) {
  if (!str) return null;
  var s = str.toLowerCase();
  var map = [
    ['cricket', 'cricket'], ['football', 'football'], ['soccer', 'football'],
    ['tennis', 'tennis'], ['f1', 'f1'], ['formula', 'f1'], ['racing', 'f1'],
    ['golf', 'golf'], ['badminton', 'badminton'], ['kabaddi', 'kabaddi'],
    ['basketball', 'basketball'], ['hockey', 'hockey'], ['boxing', 'boxing'],
    ['mma', 'boxing'], ['ufc', 'boxing'], ['wrestling', 'boxing'],
    ['baseball', 'baseball'], ['table tennis', 'table_tennis'], ['ping pong', 'table_tennis'],
    ['volleyball', 'volleyball'], ['rugby', 'rugby'], ['esports', 'esports'],
    ['gaming', 'esports'], ['e-sports', 'esports']
  ];
  for (var i = 0; i < map.length; i++) {
    if (s.includes(map[i][0])) return map[i][1];
  }
  return null;
}

function getIcon(category) {
  var k = catKey(category);
  return k ? CAT_ICONS[k] : DEFAULT_ICON;
}

// SVG snippets
var ICO = {
  play:   '<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  shield: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  clock:  '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  heart:  '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  empty:  '<svg class="w-8 h-8 opacity-15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
};

// DOM
var grid       = document.getElementById('matchesGrid');
var lastUpdate = document.getElementById('lastUpdate');
var authorWrap = document.getElementById('authorWrap');
var authorName = document.getElementById('authorName');
var qInput     = document.getElementById('q');
var joinBtn    = document.getElementById('joinWhatsApp');
var loadingEl  = document.getElementById('loadingIndicator');
var fullData   = null;

function esc(s) {
  var d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

function stType(m) {
  var s = (m.status || '').toUpperCase().trim();
  if (s.includes('COMPLETED')) return 'done';
  if (s === 'LIVE') return 'live';
  return 'upcoming';
}

function showTime(t) {
  alert('MATCH STARTS AT:\n' + (t || 'UNKNOWN').toUpperCase());
}

// Load data
async function init() {
  loadingEl.classList.remove('hidden');
  try {
    var r = await fetch(CONFIG.JSON_URL, { cache: 'no-store' });
    if (!r.ok) throw new Error('FETCH FAILED');
    fullData = await r.json();
    lastUpdate.textContent = (fullData['last update time'] || 'N/A').toUpperCase();
    var author = fullData.Author || '';
    if (author) {
      authorName.textContent = author;
      authorWrap.classList.remove('hidden');
      authorWrap.classList.add('flex');
    }
    render(fullData.matches || []);
  } catch (e) {
    grid.innerHTML = '<div class="col-span-full flex flex-col items-center py-24 text-zinc-600"><p class="text-[10px] font-semibold tracking-[0.15em] uppercase">Failed to load</p></div>';
  } finally {
    loadingEl.classList.add('hidden');
  }
}

// Render cards
function render(list) {
  grid.innerHTML = '';
  if (!list.length) {
    grid.innerHTML = '<div class="col-span-full flex flex-col items-center py-24 text-zinc-600 gap-4">' + ICO.empty + '<p class="text-[10px] font-semibold tracking-[0.15em] uppercase">No Matches Found</p></div>';
    return;
  }

  list.forEach(function (m, i) {
    var st  = stType(m);
    var icon = getIcon(m.event_category);
    var name = esc(m.match_name || (m.team_1 + ' vs ' + m.team_2));
    var evt  = esc(m.event_name || m.event_category || 'EVENT');
    var img  = m.src || 'https://via.placeholder.com/800x450?text=NO+IMAGE';

    var card = document.createElement('div');
    card.className = 'card-enter group bg-zinc-900/40 border border-zinc-800/25 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700/30';
    card.style.animationDelay = i * 35 + 'ms';

    // Action buttons
    var actions = '';
    if (st === 'live') {
      var btns = '';
      if (m.dai_url) {
        btns += '<a href="' + CONFIG.PLAYER_PATH + '?id=' + m.match_id + '&dai" target="_blank" class="flex-1 inline-flex items-center justify-center gap-1.5 py-[10px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10.5px] font-bold uppercase tracking-[0.05em] transition-all duration-200 hover:-translate-y-px no-underline">' + ICO.play + 'Watch Now</a>';
      }
      if (m.adfree_url) {
        btns += '<a href="' + CONFIG.PLAYER_PATH + '?id=' + m.match_id + '&adfree" target="_blank" class="flex-1 inline-flex items-center justify-center gap-1.5 py-[10px] rounded-xl bg-zinc-800/50 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-300 border border-zinc-800/30 text-[10.5px] font-bold uppercase tracking-[0.05em] transition-all duration-200 hover:-translate-y-px no-underline">' + ICO.shield + 'Ad Free</a>';
      }
      if (!btns) btns = '<div class="flex-1 py-[10px] rounded-xl bg-zinc-800/40 text-zinc-600 text-[10.5px] font-bold uppercase tracking-[0.05em] text-center">Unavailable</div>';
      actions = '<div class="flex gap-2 mt-3">' + btns + '</div>';
    } else if (st === 'done') {
      actions = '<div class="mt-3"><a href="' + CONFIG.WHATSAPP + '" target="_blank" class="flex items-center justify-center gap-1.5 w-full py-[10px] rounded-xl bg-zinc-800/30 hover:bg-zinc-800/60 text-zinc-600 hover:text-zinc-400 border border-zinc-800/25 text-[10.5px] font-bold uppercase tracking-[0.05em] transition-all duration-200 no-underline">' + ICO.heart + 'Thank You</a></div>';
    } else {
      actions = '<div class="mt-3"><button onclick="showTime(\'' + esc(m.startTime) + '\')" class="flex items-center justify-center gap-1.5 w-full py-[10px] rounded-xl bg-zinc-800/30 hover:bg-zinc-800/60 text-zinc-600 hover:text-zinc-400 border border-zinc-800/25 text-[10.5px] font-bold uppercase tracking-[0.05em] transition-all duration-200 cursor-pointer">' + ICO.clock + 'Upcoming</button></div>';
    }

    // Live indicator line
    var topLine = st === 'live'
      ? '<div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>'
      : '';

    // Status indicator in meta
    var statusHtml = '';
    if (st === 'live') {
      statusHtml = '<span class="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-400"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot"></span>Live</span>';
    }

    card.innerHTML =
      '<div class="relative overflow-hidden bg-zinc-950 aspect-[16/10]">' +
        topLine +
        '<img src="' + img + '" alt="' + name + '" class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none"></div>' +
        '<span class="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2 py-[3px] rounded-lg text-[8px] font-bold uppercase tracking-[0.1em] bg-zinc-900/70 text-zinc-400 border border-zinc-800/40 backdrop-blur-sm">' + icon + esc(m.event_category || 'SPORT') + '</span>' +
      '</div>' +
      '<div class="px-4 pt-3 pb-4 flex flex-col gap-1.5">' +
        '<div class="flex items-center justify-between gap-2">' +
          '<h3 class="font-heading font-bold text-[13px] text-zinc-100 uppercase tracking-tight leading-snug truncate">' + name + '</h3>' +
          statusHtml +
        '</div>' +
        '<p class="text-[10.5px] text-zinc-600 font-medium leading-relaxed truncate">' + evt + '</p>' +
        actions +
      '</div>';

    grid.appendChild(card);
  });
}

// Search
qInput.addEventListener('input', function () {
  if (!fullData || !fullData.matches) return;
  var q = qInput.value.trim().toLowerCase();
  var f = fullData.matches.filter(function (m) {
    var h = [m.team_1, m.team_2, m.title, m.match_name, m.event_name, m.event_category].filter(Boolean).join(' ').toLowerCase();
    return h.includes(q);
  });
  render(f);
});

// Keyboard shortcut
document.addEventListener('keydown', function (e) {
  if (e.key === '/' && document.activeElement !== qInput) { e.preventDefault(); qInput.focus(); }
  if (e.key === 'Escape' && document.activeElement === qInput) { qInput.blur(); qInput.value = ''; qInput.dispatchEvent(new Event('input')); }
});

// WhatsApp
joinBtn.addEventListener('click', function () { window.open(CONFIG.WHATSAPP, '_blank'); });

init();
