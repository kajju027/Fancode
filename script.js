var CONFIG = {
  JSON_URL: 'https://raw.githubusercontent.com/kajju027/Fancode-Events-Json/refs/heads/main/fancode.json',
  PLAYER_PATH: 'IOS/',
  WHATSAPP: 'https://whatsapp.com/channel/0029VaeylYYBPzjVNomWuZ0T/'
};

var CAT_STYLES = {
  Cricket:  { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M5 5c1.5 1.5 4.5 1.5 6 0"/><path d="M5 11c1.5-1.5 4.5-1.5 6 0"/></svg>' },
  Football: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1 9.8 5.5H14.5L10.8 8.2 12.3 13 8 10.2 3.7 13 5.2 8.2 1.5 5.5H6.2z"/></svg>' },
  Tennis:   { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"/></svg>' },
  Golf:     { bg: 'bg-lime-500/10', text: 'text-lime-400', border: 'border-lime-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="11" cy="12" r="3"/><path d="M11 9V2L8 4l3 2"/></svg>' },
  F1:       { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M3 1.5v13M3 1.5h9l-2.5 2.5L13.5 6.5H3"/></svg>' },
  Badminton:{ bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="11" r="4"/><path d="M8 7V2M6 4h4"/></svg>' },
  Kabaddi:  { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="5" cy="5" r="2"/><circle cx="11" cy="5" r="2"/><path d="M5 7v5M11 7v5M5 10h6"/></svg>' },
  Basketball:{ bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M2 8h12M8 2c-2 2.5-2 9.5 0 12M8 2c2 2.5 2 9.5 0 12"/></svg>' },
  Hockey:   { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 12 10 4"/><circle cx="12" cy="11" r="2.5"/></svg>' },
  Boxing:   { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="10" r="4"/><path d="M8 6V2M6 3h4"/></svg>' },
  Baseball: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M5 2.5C6 5 6 11 5 13.5M11 2.5C10 5 10 11 11 13.5"/></svg>' },
  Rugby:    { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><ellipse cx="8" cy="8" rx="3" ry="6"/><path d="M5 3c0 0 1.5 2.5 6 2.5M5 13c0 0 1.5-2.5 6-2.5"/></svg>' },
  Esports:  { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="1" y="4" width="14" height="7" rx="1.5"/><path d="M4 11v2M12 11v2M5 7h1M10 7h1"/></svg>' }
};

var CAT_DEF = { bg: 'bg-zinc-500/10', text: 'text-zinc-400', border: 'border-zinc-500/15', icon: '<svg class="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="8" cy="8" r="6"/><path d="M8 5v6M5 8h6"/></svg>' };

var CAT_KEY_MAP = [
  ['cricket','Cricket'],['football','Football'],['soccer','Football'],
  ['tennis','Tennis'],['golf','Golf'],['f1','F1'],['formula','F1'],['racing','F1'],
  ['badminton','Badminton'],['kabaddi','Kabaddi'],['basketball','Basketball'],
  ['hockey','Hockey'],['boxing','Boxing'],['mma','Boxing'],['ufc','Boxing'],['wrestling','Boxing'],
  ['baseball','Baseball'],['rugby','Rugby'],['esports','Esports'],['gaming','Esports']
];

var ICO = {
  play:   '<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  shield: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  clock:  '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  empty:  '<svg class="w-8 h-8 opacity-15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>'
};

var grid = document.getElementById('matchesGrid');
var lastUpdate = document.getElementById('lastUpdate');
var authorWrap = document.getElementById('authorWrap');
var authorName = document.getElementById('authorName');
var qInput = document.getElementById('q');
var joinBtn = document.getElementById('joinWhatsApp');
var loadingEl = document.getElementById('loadingIndicator');
var fullData = null;

function esc(s) { var d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }

function getCatStyle(category) {
  if (!category) return CAT_DEF;
  var s = category.toLowerCase();
  for (var i = 0; i < CAT_KEY_MAP.length; i++) {
    if (s.includes(CAT_KEY_MAP[i][0])) return CAT_STYLES[CAT_KEY_MAP[i][1]];
  }
  return CAT_DEF;
}

function showTime(t) { alert('MATCH STARTS AT:\n' + (t || 'UNKNOWN')); }

async function init() {
  loadingEl.classList.remove('hidden');
  try {
    var r = await fetch(CONFIG.JSON_URL, { cache: 'no-store' });
    if (!r.ok) throw new Error('FAIL');
    fullData = await r.json();

    lastUpdate.textContent = (fullData.last_updated || 'N/A').toUpperCase();

    if (fullData.Author) {
      authorName.textContent = fullData.Author;
      authorWrap.classList.remove('hidden');
      authorWrap.classList.add('flex');
    }

    var live = fullData.live_matches || [];
    var upcoming = fullData.upcoming_matches || [];
    render(live.concat(upcoming));
  } catch (e) {
    grid.innerHTML = '<div class="col-span-full flex flex-col items-center py-24 text-zinc-600"><p class="text-[10px] font-semibold tracking-[0.15em] uppercase">Failed to load</p></div>';
  } finally {
    loadingEl.classList.add('hidden');
  }
}

function render(list) {
  grid.innerHTML = '';
  if (!list.length) {
    grid.innerHTML = '<div class="col-span-full flex flex-col items-center py-24 text-zinc-600 gap-4">' + ICO.empty + '<p class="text-[10px] font-semibold tracking-[0.15em] uppercase">No Matches Found</p></div>';
    return;
  }

  list.forEach(function (m, i) {
    var isLive = m.type === 'live';
    var cat = getCatStyle(m.category);
    var name = esc(m.match || 'Match');
    var evt = esc(m.tournament || m.category || 'EVENT');
    var img = m.image || 'https://via.placeholder.com/800x450?text=NO+IMAGE';
    var link = CONFIG.PLAYER_PATH + '?id=' + m.match_id;

    var card = document.createElement('div');
    card.className = 'card-enter group bg-zinc-900/40 border border-zinc-800/25 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700/30';
    card.style.animationDelay = i * 30 + 'ms';

    var topLine = isLive ? '<div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>' : '';

    var statusHtml = isLive
      ? '<span class="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-emerald-400"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot"></span>Live</span>'
      : '';

    var actions = '';
    if (isLive) {
      actions =
        '<div class="flex gap-2 mt-3">' +
          '<a href="' + link + '" target="_blank" class="flex-1 inline-flex items-center justify-center gap-1.5 py-[10px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[10.5px] font-bold uppercase tracking-[0.05em] transition-all duration-200 hover:-translate-y-px no-underline shadow-lg shadow-indigo-600/10">' + ICO.play + 'Watch Now</a>' +
          '<a href="' + link + '" target="_blank" class="flex-1 inline-flex items-center justify-center gap-1.5 py-[10px] rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 hover:border-amber-500/30 text-[10.5px] font-bold uppercase tracking-[0.05em] transition-all duration-200 hover:-translate-y-px no-underline">' + ICO.shield + 'Ad Free</a>' +
        '</div>';
    } else {
      actions =
        '<div class="mt-3">' +
          '<button onclick="showTime(\'' + esc(m.startTime) + '\')" class="flex items-center justify-center gap-1.5 w-full py-[10px] rounded-xl bg-zinc-800/30 hover:bg-zinc-800/60 text-zinc-600 hover:text-zinc-400 border border-zinc-800/25 text-[10.5px] font-bold uppercase tracking-[0.05em] transition-all duration-200 cursor-pointer">' + ICO.clock + 'Upcoming</button>' +
        '</div>';
    }

    card.innerHTML =
      '<div class="relative overflow-hidden bg-zinc-950 aspect-[16/10]">' +
        topLine +
        '<img src="' + img + '" alt="' + name + '" class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none"></div>' +
        '<span class="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2 py-[3px] rounded-lg text-[8px] font-bold uppercase tracking-[0.1em] ' + cat.bg + ' ' + cat.text + ' ' + cat.border + ' backdrop-blur-sm">' + cat.icon + esc(m.category || 'SPORT') + '</span>' +
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

qInput.addEventListener('input', function () {
  if (!fullData) return;
  var q = qInput.value.trim().toLowerCase();
  var live = fullData.live_matches || [];
  var upcoming = fullData.upcoming_matches || [];
  var all = live.concat(upcoming);
  var f = all.filter(function (m) {
    var h = [m.match, m.tournament, m.category].filter(Boolean).join(' ').toLowerCase();
    return h.includes(q);
  });
  render(f);
});

document.addEventListener('keydown', function (e) {
  if (e.key === '/' && document.activeElement !== qInput) { e.preventDefault(); qInput.focus(); }
  if (e.key === 'Escape' && document.activeElement === qInput) { qInput.blur(); qInput.value = ''; qInput.dispatchEvent(new Event('input')); }
});

joinBtn.addEventListener('click', function () { window.open(CONFIG.WHATSAPP, '_blank'); });

init();
