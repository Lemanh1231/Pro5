const DISCORD_USER_ID = '1027893420594831413';
// Keep native context menus for controls and links, block elsewhere on profile.
document.addEventListener('contextmenu', (event) => {
  if (event.target instanceof Element && event.target.closest('button, a, input, textarea, select, [role="button"], [contenteditable="true"]')) return;
  event.preventDefault();
});
const LANYARD_API_BASE = window.location.origin;
function isTextControl(target) {
  const element = target instanceof Element ? target : target?.parentElement;
  return Boolean(element?.closest('input, textarea, [contenteditable=""], [contenteditable="true"]'));
}
['selectstart', 'copy', 'cut'].forEach((type) => {
  document.addEventListener(type, (event) => {
    if (!isTextControl(event.target)) event.preventDefault();
  });
});
const DECORATIONS = [
  'anime-dang-yeu.png',
  'anime-do-mo-hoi.png',
  'anime-gian-du.png',
  'anime-hon-lia-kho-xac.png',
  'anime-mat-long-lanh.png',
  'anime-nani.png',
  'anime-toa-nang-luong.png',
  'fantasy-hoa-kiem.png',
  'fantasy-ma-thuat.png',
  'fantasy-tinh-linh.png',
  'a_57807030ab60f7ac0c4a1998aa091bbf.png',
];

const terminalScreen = document.getElementById('terminal-screen');
const profileScreen = document.getElementById('profile-screen');
const enterButton = document.getElementById('enter-console-btn');
const cmdTabs = document.getElementById('cmd-tabs');
const cmdNewTab = document.getElementById('cmd-new-tab');
const cmdLog = document.getElementById('cmd-log');
const cmdForm = document.getElementById('cmd-form');
const cmdInput = document.getElementById('cmd-input');

const presenceEls = {
  avatar: document.getElementById('avatar-image'),
  decoration: document.getElementById('avatar-decoration'),
  displayName: document.getElementById('display-name'),
  username: document.getElementById('username'),
  orb: document.getElementById('status-orb'),
  statusText: document.getElementById('status-text'),
  customStatusLine: document.getElementById('custom-status-line'),
  updated: document.getElementById('last-updated'),
  clientPlatformText: document.getElementById('client-platform-text'),
  clientPlatformBtn: document.getElementById('client-platform-btn'),
  activitiesEmpty: document.getElementById('activities-empty'),
  spotifyActivityCard: document.getElementById('spotify-activity-card'),
  spotifyArt: document.getElementById('spotify-art'),
  spotifyArtFallback: document.getElementById('spotify-art-fallback'),
  spotifyTitle: document.getElementById('spotify-activity-title'),
  spotifyArtist: document.getElementById('spotify-artist'),
  spotifyAlbum: document.getElementById('spotify-album'),
  spotifyProgressFill: document.getElementById('spotify-progress-fill'),
  spotifyCurrentTime: document.getElementById('spotify-current-time'),
  spotifyTotalTime: document.getElementById('spotify-total-time'),
  gameActivityCard: document.getElementById('game-activity-card'),
  gameArt: document.getElementById('game-art'),
  gameArtFallback: document.getElementById('game-art-fallback'),
  gameType: document.getElementById('game-activity-type'),
  gameTitle: document.getElementById('game-activity-title'),
  gameDetail: document.getElementById('game-activity-detail'),
  gameState: document.getElementById('game-activity-state'),
  gameTime: document.getElementById('game-activity-time'),
  publicFlags: document.getElementById('public-flags'),
  typingName: document.getElementById('profile-typing-name'),
};

const statusLabels = {
  online: 'Đang online',
  idle: 'Đang rảnh',
  dnd: 'Đừng làm phiền',
  offline: 'Đang offline',
};

const profileTypingWords = [
  'Leman',
  'Sensei of Kivotos',
  'Midnight Coder',
  'Lo-fi & Coffee',
  'New Eridu Proxy',
  'Astral Trailblazer',
  'Lost in Virtual Reality'
];

const activityTypes = {
  0: { label: 'Đang chơi', icon: '🎮' },
  1: { label: 'Đang stream', icon: '📡' },
  2: { label: 'Đang nghe', icon: '♪' },
  3: { label: 'Đang xem', icon: '▶' },
  5: { label: 'Đang thi đấu', icon: '⚔' },
};

const gameActivityImageFallbacks = {
  'league of legends': 'https://cdn2.steamgriddb.com/icon/829b36203cfeb01c2da00f1c496beba6.png',
  'lol': 'https://cdn2.steamgriddb.com/icon/829b36203cfeb01c2da00f1c496beba6.png',
  'genshin impact': './data/games/genshin.png',
  'genshin': './data/games/genshin.png',
  'zenless zone zero': './data/games/zenless-zone-zero.png',
  'zenless': './data/games/zenless-zone-zero.png',
  'zzz': './data/games/zenless-zone-zero.png',
  'honkai: star rail': './data/games/honkai-star-rail.png',
  'honkai star rail': './data/games/honkai-star-rail.png',
  'star rail': './data/games/honkai-star-rail.png',
  'hsr': './data/games/honkai-star-rail.png',
  'minecraft': './data/games/minecraft.png',
  'clash of clans': './data/games/clash-of-clans.png',
  'hentaiz': './data/games/hentaiz.png',
};

const discordBadges = [
  { bit: 1 << 0, icon: '🛡️', label: 'Discord Staff' },
  { bit: 1 << 1, icon: '🤝', label: 'Partnered Server Owner' },
  { bit: 1 << 2, icon: '🎤', label: 'HypeSquad Events' },
  { bit: 1 << 3, icon: '🐞', label: 'Bug Hunter Level 1' },
  { bit: 1 << 6, icon: '🦁', label: 'HypeSquad Bravery' },
  { bit: 1 << 7, icon: '💡', label: 'HypeSquad Brilliance' },
  { bit: 1 << 8, icon: '⚖️', label: 'HypeSquad Balance' },
  { bit: 1 << 9, icon: '✨', label: 'Early Supporter' },
  { bit: 1 << 14, icon: '🐞', label: 'Bug Hunter Level 2' },
  { bit: 1 << 16, icon: '🤖', label: 'Verified Bot' },
  { bit: 1 << 17, icon: '👨‍💻', label: 'Early Verified Bot Developer' },
  { bit: 1 << 18, icon: '🛡', label: 'Discord Certified Moderator' },
  { bit: 1 << 22, icon: '🌱', label: 'Active Developer' },
];

const introFullText = [
  'SHITTIM CHEST OS [Kernel v2.4.0-kivotos (x86_64)]',
  '(c) General Student Council. All rights reserved.',
  '>> SCHALE TACTICAL MAINFRAME ONLINE',
  '> AUTH: Seven Sorrows // Ancient Laws',
  '[ PASS ] BIOMETRIC: SENSEI CONFIRMED',
  '[ PASS ] DECRYPT CORE: [PEREZ-UZZAH]',
  '[ SYNC ] DAEMONS: ARONA & PLANA ONLINE',
  '[ LIVE ] TELEMETRY: REALTIME SYNCED',
  '----------------------------------------',
  '  OPERATOR : PLANA & ARONA-SENPAI',
  '  STATUS   : SENSEI (100% RESONANCE)',
  '----------------------------------------',
  '>> PRESS ENTER OR CLICK TO ENTER SCHALE OFFICE.'
].join('\n');

let activeTabId = 'boot';
let tabCount = 1;
let introTimer = null;
const cmdTabsState = [
  {
    id: 'boot',
    title: 'SHITTIM CHEST // AUTH',
    shortTitle: 'SHITTIM // AUTH',
    type: 'auth',
    log: '',
    input: '',
    cwd: '/schale/sensei',
    boot: true,
    interactive: false,
    typing: true,
  },
];

function getPromptText(tab) {
  const cwd = tab?.cwd || '/schale/sensei';
  let rel = cwd;
  if (cwd === '/schale/sensei') {
    rel = '~';
  } else if (cwd.startsWith('/schale/sensei/')) {
    rel = '~/' + cwd.slice('/schale/sensei/'.length);
  }
  const host = typeof window !== 'undefined' && window.innerWidth <= 480 ? 'chest' : 'shittim-chest';
  return `sensei@${host}:${rel}$`;
}

function activeCmdTab() {
  return cmdTabsState.find((tab) => tab.id === activeTabId) || cmdTabsState[0];
}

function getTabIconSvg(type) {
  if (type === 'terminal') {
    return `<svg class="tab-svg-icon icon-term" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`;
  }
  return `<svg class="tab-svg-icon icon-shittim-star" viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="url(#tab-shittim-grad)" stroke="#35e8ff" stroke-width="0.8"/><circle cx="12" cy="12" r="2.2" fill="#ffffff"/><defs><linearGradient id="tab-shittim-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="#35e8ff"/><stop offset="0.5" stop-color="#80e5ff"/><stop offset="1" stop-color="#ff7adf"/></linearGradient></defs></svg>`;
}

function renderCmdTabs() {
  cmdTabs.innerHTML = cmdTabsState.map((tab) => {
    const isActive = tab.id === activeTabId;
    const isBoot = tab.id === 'boot';
    const dotClass = isBoot ? 'dot-arona' : 'dot-plana';
    const iconType = tab.type || (isBoot ? 'auth' : 'terminal');
    const iconSvg = getTabIconSvg(iconType);
    const fullTitle = tab.title || (isBoot ? 'SHITTIM CHEST // AUTH' : 'TERMINAL // SCHALE');
    const shortTitle = tab.shortTitle || (isBoot ? 'SHITTIM // AUTH' : 'TERMINAL');
    const isOpeningClass = tab.isNew ? 'tab-opening' : '';

    return `
      <button class="cmd-tab ${isActive ? 'active-tab' : ''} ${isOpeningClass} tab-${tab.id}" type="button" data-tab-id="${tab.id}" role="tab" aria-selected="${isActive}">
        <span class="cmd-tab-topline"></span>
        <span class="cmd-tab-glow"></span>
        <span class="cmd-tab-title">
          <span class="tab-pulse-dot ${dotClass}"><span class="tab-radar-ring"></span></span>
          <span class="tab-icon-wrap ${isBoot ? 'icon-shittim' : 'icon-term'}">${iconSvg}</span>
          <span class="cmd-tab-text">
            <span class="title-full">${escapeCmdHtml(fullTitle)}</span>
            <span class="title-short">${escapeCmdHtml(shortTitle)}</span>
          </span>
        </span>
        ${cmdTabsState.length > 1 && !tab.boot ? '<span class="cmd-tab-close" data-close-tab title="Đóng tab">×</span>' : ''}
      </button>
    `;
  }).join('');

  cmdTabsState.forEach((t) => { delete t.isNew; });
}

function escapeCmdHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character]));
}

function formatTerminalLine(line) {
  const safeLine = escapeCmdHtml(line);
  if (/^\s*\[\s*(PASS|OK)\s*\]/i.test(line)) {
    return safeLine.replace(/\[\s*(PASS|OK)\s*\]/i, '<span class="tag-pass">[ PASS ]</span>');
  }
  if (/^\s*\[\s*SYNC\s*\]/i.test(line)) {
    return safeLine.replace(/\[\s*SYNC\s*\]/i, '<span class="tag-sync">[ SYNC ]</span>');
  }
  if (/^\s*\[\s*LIVE\s*\]/i.test(line)) {
    return safeLine.replace(/\[\s*LIVE\s*\]/i, '<span class="tag-live">[ LIVE ]</span>');
  }
  if (/^\s*\[DIR\]/i.test(safeLine)) {
    return safeLine.replace(/\[DIR\]/i, '<span class="cmd-dir">[DIR]</span>');
  }
  if (/^\s*\[EXEC\]/i.test(safeLine)) {
    return safeLine.replace(/\[EXEC\]/i, '<span class="cmd-exec">[EXEC]</span>');
  }
  if (/^\s*\[FILE\]/i.test(safeLine)) {
    return safeLine.replace(/\[FILE\]/i, '<span class="cmd-file">[FILE]</span>');
  }
  if (safeLine.includes('[v]')) {
    safeLine = safeLine.replace(/\[v\]/g, '<span class="tag-pass" style="color: #3ee87d; font-weight: 700;">[v]</span>');
  }
  if (safeLine.includes('[ ]')) {
    safeLine = safeLine.replace(/\[\s*\]/g, '<span style="color: #f0b232; font-weight: 700;">[ ]</span>');
  }
  if (/^\s*[┌└├│╔║╠╚═─]/.test(safeLine)) {
    return `<span class="cmd-dossier-border">${safeLine}</span>`;
  }
  if (/^\s*([A-Za-z0-9_💎🎫🪙📦\s\-]{2,20})\s*:\s*/.test(safeLine) && !/^(http|https|sensei@|uid=)/i.test(safeLine.trim())) {
    return safeLine.replace(/^(\s*[^:]+:)/, '<span class="cmd-dossier-label">$1</span>');
  }
  if (/^\s*\/\//.test(line)) {
    return `<span class="cmd-comment">${safeLine}</span>`;
  }
  if (/^\s*&gt;\s*AUTH PHRASE:/i.test(safeLine)) {
    return safeLine.replace(/&gt;\s*AUTH PHRASE:/i, '<span class="cmd-auth-phrase">&gt; AUTH PHRASE:</span>');
  }
  if (/OPERATOR\s*:\s*PLANA &amp; ARONA-SENPAI/i.test(safeLine)) {
    return safeLine
      .replace('PLANA', '<span class="name-plana">PLANA</span>')
      .replace('ARONA-SENPAI', '<span class="name-arona">ARONA-SENPAI</span>');
  }
  if (safeLine.includes('(100% RESONANCE)')) {
    return safeLine.replace('(100% RESONANCE)', '<span class="tag-sync" style="background: rgba(53,232,255,0.12); padding: 1px 6px; border-radius: 4px; border: 1px solid rgba(53,232,255,0.3);">(100% RESONANCE)</span>');
  }
  if (safeLine.includes('Kernel v2.4.0-kivotos (x86_64)')) {
    return safeLine.replace('Kernel v2.4.0-kivotos (x86_64)', '<span class="cmd-kernel">Kernel v2.4.0-kivotos (x86_64)</span>');
  }
  if (/&gt;&gt;\s*(PRESS ENTER|TOUCH SCREEN|CLICK)/i.test(safeLine)) {
    return `<span class="tag-touch-prompt">${safeLine}</span>`;
  }
  if (/^\s*sensei@(shittim-chest|chest):[^$]*\$\s*/.test(safeLine)) {
    return `<span class="cmd-user-prompt">${safeLine}</span>`;
  }
  return safeLine;
}

let scrollPending = false;
function scrollTerminalToBottom() {
  const tab = typeof activeCmdTab === 'function' ? activeCmdTab() : null;
  if (tab && tab.boot) return;
  const cmdBody = document.querySelector('.cmd-body');
  if (cmdBody && !scrollPending) {
    scrollPending = true;
    requestAnimationFrame(() => {
      cmdBody.scrollTop = cmdBody.scrollHeight;
      scrollPending = false;
    });
  }
}

let terminalRenderTimer = null;
let lastTerminalRender = -Infinity;
let renderedTerminalTab = null;
let renderedTerminalLines = [];
const terminalBeam = document.createElement('span');
terminalBeam.className = 'terminal-beam';
terminalBeam.setAttribute('aria-hidden', 'true');
let terminalBeamPosition = null;
let terminalBeamAnimation = null;
const terminalTrail = document.createElement('span');
terminalTrail.className = 'terminal-cursor-trail';
terminalTrail.setAttribute('aria-hidden', 'true');
document.body.appendChild(terminalTrail);
function renderTerminalLines(tab) {
  const lines = tab.log.split('\n');
  const changedTab = renderedTerminalTab !== tab.id;
  terminalBeam.remove();
  if (changedTab) {
    cmdLog.replaceChildren();
    renderedTerminalLines = [];
    terminalBeamPosition = null;
  }
  while (cmdLog.children.length > lines.length) cmdLog.lastElementChild.remove();
  const fragment = document.createDocumentFragment();
  lines.forEach((line, index) => {
    let node = cmdLog.children[index];
    if (!node) {
      node = document.createElement('span');
      node.className = 'terminal-output-line';
      fragment.appendChild(node);
    }
    if (changedTab || renderedTerminalLines[index] !== line ||
        (index === renderedTerminalLines.length - 1) !== (index === lines.length - 1) ||
        !node.hasChildNodes()) {
      node.innerHTML = formatTerminalLine(line);
      // Keep blank lines and original pre-wrap layout without extra margins.
      if (index < lines.length - 1) node.appendChild(document.createTextNode('\n'));
    }
  });
  cmdLog.appendChild(fragment);
  renderedTerminalLines = lines;
  renderedTerminalTab = tab.id;
  if (tab.typing) {
    cmdLog.lastElementChild.appendChild(terminalBeam);
    const position = terminalBeam.getBoundingClientRect();
    terminalBeamAnimation?.cancel();
    if (terminalBeamPosition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Kitty-like ribbon: head is instant; the old position trails behind it.
      const old = terminalBeamPosition;
      const left = Math.min(old.x, position.x);
      const top = Math.min(old.y, position.y);
      const height = position.height;
      const ox = old.x - left, oy = old.y - top;
      const nx = position.x - left, ny = position.y - top;
      Object.assign(terminalTrail.style, {
        left: `${left}px`, top: `${top}px`,
        width: `${Math.abs(old.x - position.x) + 3}px`,
        height: `${Math.abs(old.y - position.y) + height}px`,
        clipPath: `polygon(${ox}px ${oy}px, ${ox + 2}px ${oy + height}px, ${nx + 2}px ${ny + height}px, ${nx}px ${ny}px)`
      });
      terminalBeamAnimation = terminalTrail.animate([
        { opacity: .55 }, { opacity: 0 }
      ], { duration: 180, easing: 'ease-out' });
    }
    terminalBeamPosition = { x: position.x, y: position.y };
  } else {
    terminalBeamAnimation?.cancel();
    terminalBeamPosition = null;
  }
}
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && terminalScreen.classList.contains('active')) renderCmdBody(true);
});
function renderCmdBody(immediate = false) {
  if (!terminalScreen.classList.contains('active') || document.hidden) return;
  // Typing can tick every 7ms; cap expensive HTML/scroll work to 30fps.
  const wait = 33 - (performance.now() - lastTerminalRender);
  if (!immediate && wait > 0) {
    if (terminalRenderTimer === null) {
      terminalRenderTimer = setTimeout(() => {
        terminalRenderTimer = null;
        renderCmdBody(true);
      }, wait);
    }
    return;
  }
  clearTimeout(terminalRenderTimer);
  terminalRenderTimer = null;
  lastTerminalRender = performance.now();
  const tab = activeCmdTab();
  const cmdBody = document.querySelector('.cmd-body');
  if (cmdBody) {
    cmdBody.classList.toggle('boot-active', Boolean(tab && tab.boot));
  }
  renderTerminalLines(tab);
  cmdLog.classList.toggle('typing', Boolean(tab.typing));
  cmdForm.classList.toggle('hidden', !tab.interactive);
  enterButton.classList.toggle('hidden', !tab.boot);
  cmdInput.value = tab.input || '';

  const promptUser = document.getElementById('cmd-prompt-user');
  if (promptUser) {
    promptUser.textContent = getPromptText(tab);
  }
  if (!tab.boot) {
    scrollTerminalToBottom();
  }
}

function renderCmd() {
  renderCmdTabs();
  renderCmdBody(true);
}

const terminalMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const terminalAnimations = new WeakMap();
function animateTerminalElement(element, frames, duration = 180) {
  if (!element) return;
  terminalAnimations.get(element)?.cancel();
  if (terminalMotionPreference.matches || document.hidden || !element.animate) return;
  const animation = element.animate(frames, {
    // end-4/dots-hyprland: emphasizedDecel (browser approximation).
    duration, easing: 'cubic-bezier(.05,.7,.1,1)'
  });
  terminalAnimations.set(element, animation);
}

function switchCmdTab(tabId, reason = 'swap') {
  if (isClosingTab || !cmdTabsState.some((tab) => tab.id === tabId)) return;
  if (activeTabId === tabId && reason === 'swap') return;
  const previousIndex = cmdTabsState.findIndex((tab) => tab.id === activeTabId);
  activeTabId = tabId;
  if (reason === 'open') renderCmdTabs();
  // Keep existing tab nodes on switches: no rebuilding SVGs or losing focus.
  cmdTabs.querySelectorAll('.cmd-tab').forEach((button) => {
    const selected = button.dataset.tabId === tabId;
    button.classList.toggle('active-tab', selected);
    button.setAttribute('aria-selected', String(selected));
  });
  renderCmdBody(true);

  const direction = cmdTabsState.findIndex((tab) => tab.id === tabId) >= previousIndex ? 1 : -1;
  animateTerminalElement(cmdLog, [
    { opacity: 0, transform: reason === 'open' ? 'scale(.8)' : `translateX(${direction * 24}px)` },
    { opacity: 1, transform: 'translateX(0) scale(1)' }
  ], reason === 'open' ? 300 : 240);

  const tab = activeCmdTab();
  if (tab.interactive && cmdInput) {
    cmdInput.focus();
  }
}

function finishBootTyping() {
  if (introTimer) {
    clearTimeout(introTimer);
    introTimer = null;
  }
  const bootTab = cmdTabsState.find((t) => t.id === 'boot');
  if (bootTab && bootTab.typing) {
    bootTab.log = introFullText;
    bootTab.typing = false;
  }
  if (activeTabId === 'boot') {
    renderCmdBody();
  }
}

let terminalSkipBound = false;
function setupTerminalSkip() {
  if (terminalSkipBound || !terminalScreen) return;
  terminalSkipBound = true;
  terminalScreen.addEventListener('click', (e) => {
    if (e.target.closest('#enter-console-btn') || e.target.closest('#cmd-new-tab') || e.target.closest('.cmd-tab')) return;
    const currentTab = activeCmdTab();
    if (currentTab.id === 'boot' && currentTab.typing) {
      finishBootTyping();
    } else if (currentTab.typing && typeof currentTab.skipTyping === 'function') {
      currentTab.skipTyping();
    }
  });
}

function typeIntro() {
  const tab = cmdTabsState.find((t) => t.id === 'boot');
  if (!tab) return;

  finishBootTyping();
  tab.log = '';
  tab.typing = true;

  let charIndex = 0;
  const fullText = introFullText;

  setupTerminalSkip();

  function typeNext() {
    if (charIndex >= fullText.length) {
      tab.typing = false;
      if (activeTabId === 'boot') {
        renderCmdBody();
        scrollTerminalToBottom();
      }
      return;
    }

    const char = fullText[charIndex];
    let step = 1;
    let delay = 48;

    if (char === '-' && fullText.slice(charIndex, charIndex + 8) === '--------') {
      step = 1;
      delay = 48;
    } else if (char === '\n') {
      step = 1;
      delay = 100;
    } else if (char === '[' && fullText.slice(charIndex, charIndex + 8) === '[ PASS ]') {
      step = 1;
      delay = 48;
    } else if (char === '[' && (fullText.slice(charIndex, charIndex + 8) === '[ SYNC ]' || fullText.slice(charIndex, charIndex + 8) === '[ LIVE ]')) {
      step = 1;
      delay = 48;
    }

    tab.log += fullText.slice(charIndex, charIndex + step);
    charIndex += step;

    if (activeTabId === 'boot') {
      renderCmdBody();
      scrollTerminalToBottom();
    }

    introTimer = setTimeout(typeNext, delay);
  }

  typeNext();
}
renderCmd();
typeIntro();

function showScreen(screen) {
  [terminalScreen, profileScreen].forEach((item) => item.classList.remove('active'));
  screen.classList.add('active');
  document.body.classList.toggle('terminal-active', screen === terminalScreen);
  if (screen === profileScreen && typeof syncPanelPlacement === 'function') {
    syncPanelPlacement();
  }
}

function typeTextForTab(tab, text, speed = 48, onDone = () => {}) {
  let index = 0;
  tab.typing = true;
  const prefix = tab.log;

  function finishTyping() {
    if (!tab.typing) return;
    if (tab.typeTimer) {
      clearTimeout(tab.typeTimer);
      tab.typeTimer = null;
    }
    tab.log = prefix + text;
    tab.typing = false;
    if (tab.id === activeTabId) {
      renderCmdBody();
      scrollTerminalToBottom();
    }
    onDone();
  }

  tab.skipTyping = finishTyping;

  function step() {
    if (!cmdTabsState.includes(tab)) return;
    if (!tab.typing) return;

    if (index >= text.length) {
      finishTyping();
      return;
    }

    const char = text[index];
    let chunkSize = 1;
    let delay = speed;
    if (char === '\n') {
      delay = 100;
    } else if (text.slice(index, index + 3) === '>> ') {
      chunkSize = 1;
      delay = speed;
    }

    tab.log = prefix + text.slice(0, index + chunkSize);
    index += chunkSize;

    if (tab.id === activeTabId) {
      renderCmdBody();
      scrollTerminalToBottom();
    }

    tab.typeTimer = setTimeout(step, delay);
  }

  step();
}

enterButton.addEventListener('click', enterConsole);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && terminalScreen.classList.contains('active') && document.activeElement !== cmdInput) enterConsole();
});

const vfs = {
  '/schale/sensei': {
    type: 'dir',
    parent: '/schale/sensei',
    items: {
      'documents': { type: 'dir_ref', target: '/schale/sensei/documents' },
      'student_records': { type: 'dir_ref', target: '/schale/sensei/student_records' },
      'pyroxene_vault': { type: 'dir_ref', target: '/schale/sensei/pyroxene_vault' },
      'profile.exe': {
        type: 'exec',
        desc: 'Sensei Central Office executable binary'
      },
      'README.txt': {
        type: 'file',
        content: [
          '=== SCHALE TERMINAL (v2.4.0) ===',
          'Sensei Autonomous Kivotos OS',
          '',
          '- "ls"        : List directories',
          '- "cd <dir>"  : Enter folder',
          '- "cat <file>": Read dossier',
          '- "./profile.exe": Sensei Office',
          '- "help"      : Kivotos directives',
        ].join('\n')
      }
    }
  },
  '/schale/sensei/student_records': {
    type: 'dir',
    parent: '/schale/sensei',
    items: {
      'shiroko.txt': {
        type: 'file',
        content: [
          '┌── [DOSSIER: SUNAOKAMI SHIROKO] ────┐',
          '  Academy : Abydos High School',
          '  Club    : Foreclosure Task Force',
          '  Halo    : Azure hexagonal cross',
          '  Weapon  : AR [WHITE FANG 465]',
          '  Quote   : "Nn... Sensei. Today\'s',
          '             cycling route is ready.',
          '             Let\'s go together."',
          '└────────────────────────────────────┘'
        ].join('\n')
      },
      'hoshino.txt': {
        type: 'file',
        content: [
          '┌── [DOSSIER: TAKANASHI HOSHINO] ────┐',
          '  Academy : Abydos High School',
          '  Club    : Abydos Vice President',
          '  Halo    : Eye of Horus golden halo',
          '  Weapon  : SG [Eye of Horus]',
          '  Quote   : "Uhee~ Sensei, it\'s warm',
          '             today... Old Hoshino',
          '             wants to nap with you."',
          '└────────────────────────────────────┘'
        ].join('\n')
      },
      'hina.txt': {
        type: 'file',
        content: [
          '┌── [DOSSIER: SORASAKI HINA] ────────┐',
          '  Academy : Gehenna Academy',
          '  Club    : Prefect Team Head',
          '  Halo    : Obsidian gothic halo',
          '  Weapon  : MG [The End: Destroyer]',
          '  Quote   : "Sensei... whenever you',
          '             are here, the burden',
          '             feels lighter. Stay."',
          '└────────────────────────────────────┘'
        ].join('\n')
      },
      'yuuka.txt': {
        type: 'file',
        content: [
          '┌── [DOSSIER: HAYASE YUUKA] ─────────┐',
          '  Academy : Millennium Science',
          '  Club    : Seminar Treasurer',
          '  Halo    : Digital calculation ring',
          '  Weapon  : Dual SMG [Logic&Reason]',
          '  Quote   : "Sensei!! Did you spend',
          '             pyroxenes recklessly?!',
          '             Let\'s balance ledger!"',
          '└────────────────────────────────────┘'
        ].join('\n')
      },
      'arisu.txt': {
        type: 'file',
        content: [
          '┌── [DOSSIER: TENDOU ARISU] ─────────┐',
          '  Academy : Millennium Science',
          '  Club    : Game Dev Dept (Hero)',
          '  Halo    : 8-bit luminous crown',
          '  Weapon  : Railgun [Sword of Light]',
          '  Quote   : "Pan-paka-pan! Sensei has',
          '             joined party! Arisu will',
          '             protect Hero Sensei!"',
          '└────────────────────────────────────┘'
        ].join('\n')
      },
      'mika.txt': {
        type: 'file',
        content: [
          '┌── [DOSSIER: MISONO MIKA] ──────────┐',
          '  Academy : Trinity General School',
          '  Club    : Tea Party (Patrician)',
          '  Halo    : Angelic stellar crown',
          '  Weapon  : SMG [Quirky & Stella]',
          '  Quote   : "Waho~ Sensei! Did you',
          '             come see your Princess?',
          '             Let\'s eat roll cake~"',
          '└────────────────────────────────────┘'
        ].join('\n')
      },
      'plana.txt': {
        type: 'file',
        content: [
          '┌── [DOSSIER: PLANA (SUB-OP)] ───────┐',
          '  Subsystem: Shittim Chest Auxiliary',
          '  Protocol : Perez-Uzzah Decrypt',
          '  Halo     : Deep lavender halo',
          '  Quote    : "Sensei... Plana watches',
          '             over you. May your',
          '             pulls shine purple 💜."',
          '└────────────────────────────────────┘'
        ].join('\n')
      },
      'arona.txt': {
        type: 'file',
        content: [
          '┌── [DOSSIER: ARONA (MAIN-OP)] ──────┐',
          '  Subsystem: Shittim Chest Primary',
          '  Protocol : Sanctum Tower Key',
          '  Halo     : Sky-blue luminous halo',
          '  Quote    : "Sensei! Welcome back!',
          '             Next 10-pull will be',
          '             purple! (Probably!) 🍓"',
          '└────────────────────────────────────┘'
        ].join('\n')
      },
      'kotori.txt': {
        type: 'file',
        content: [
          '┌── [DOSSIER: TOYOMI KOTORI] ────────┐',
          '  Academy : Millennium Science',
          '  Club    : Veritas Hacker Group',
          '  Halo    : Electronic gear halo',
          '  Weapon  : AR [Info Delivery]',
          '  Quote   : "Sensei! Did you know?!',
          '             In computer architecture,',
          '             cache coherence and',
          '             socket threads...',
          '             (explains for 3 hours)"',
          '└────────────────────────────────────┘'
        ].join('\n')
      }
    }
  },
  '/schale/sensei/documents': {
    type: 'dir',
    parent: '/schale/sensei',
    items: {
      'schale_protocol.txt': {
        type: 'file',
        content: [
          '┌── [SCHALE PROTOCOL #01] ───────────┐',
          '  1. Extraterritorial authority',
          '     granted by Student Council.',
          '  2. Sensei may mobilize students',
          '     across all Kivotos districts.',
          '  3. Perez-Uzzah security keys',
          '     must stay synced with Chest.',
          '└────────────────────────────────────┘'
        ].join('\n')
      },
      'todo.txt': {
        type: 'file',
        content: [
          '┌── [SENSEI SCHALE SCHEDULE] ────────┐',
          '  [v] 1. Sync Arona & Plana core',
          '  [v] 2. Deploy Kotori web server',
          '  [ ] 3. Review Abydos water bills',
          '  [ ] 4. Sign off Seminar budget',
          '  [ ] 5. Tea time with Trinity',
          '└────────────────────────────────────┘'
        ].join('\n')
      }
    }
  },
  '/schale/sensei/pyroxene_vault': {
    type: 'dir',
    parent: '/schale/sensei',
    items: {
      'balance.txt': {
        type: 'file',
        content: [
          '┌── [SCHALE PYROXENE VAULT] ─────────┐',
          '  💎 Pyroxenes : 24,000 (1 Spark)',
          '  🎫 10-Ticket : 2x',
          '  🎫 1-Ticket  : 10x',
          '  🪙 Credits   : 999,999,999 Yen',
          '  📦 Eligma    : 1,500',
          '  Status       : Guaranteed 3★ Ready',
          '└────────────────────────────────────┘'
        ].join('\n')
      }
    }
  }
};

const schaleTodoState = [
  { id: 1, done: true, title: 'Sync Arona & Plana core', student: 'Arona & Plana' },
  { id: 2, done: true, title: 'Deploy Kotori web server', student: 'Kotori' },
  {
    id: 3,
    done: false,
    title: 'Review Abydos water bills',
    student: 'Ayane',
    aliases: ['water', 'abydos', 'water bills', 'bills', 'ayane'],
    response: '[AYANE // ABYDOS] 👓 "Cảm ơn Sensei đã phê duyệt hóa đơn nước cho Abydos! Em đã đóng dấu thanh toán và gửi cho Hội Đồng rồi ạ~"'
  },
  {
    id: 4,
    done: false,
    title: 'Sign off Seminar budget',
    student: 'Yuuka',
    aliases: ['budget', 'seminar', 'seminar budget', 'sign', 'yuuka'],
    response: '[YUUKA // SEMINAR] 🧮 "Sensei đã ký duyệt ngân sách tháng này rồi nhé! Em sẽ không cằn nhằn về việc Sensei mua mô hình nữa đâu... (chắc vậy)!"'
  },
  {
    id: 5,
    done: false,
    title: 'Tea time with Trinity',
    student: 'Mika',
    aliases: ['tea', 'trinity', 'tea time', 'rollcake', 'mika'],
    response: '[MIKA // TEA PARTY] ☕ "Waho~ Sensei đến uống trà chiều với em rồi! Mika đã chuẩn bị bánh roll cake dâu tây ngọt ngào nhất cho Sensei nè 💕"'
  }
];

function updateTodoTxtContent() {
  const lines = ['┌── [SENSEI SCHALE SCHEDULE] ────────┐'];
  schaleTodoState.forEach((t) => {
    const mark = t.done ? '[v]' : '[ ]';
    lines.push(`  ${mark} ${t.id}. ${t.title}`);
  });
  lines.push('└────────────────────────────────────┘');
  const full = lines.join('\n');
  if (vfs['/schale/sensei/documents']?.items['todo.txt']) {
    vfs['/schale/sensei/documents'].items['todo.txt'].content = full;
  }
  return full;
}

function openCmdTab() {
  if (isClosingTab) return;
  finishBootTyping();

  const existingInteractiveTab = cmdTabsState.find((tab) => tab.interactive || tab.id === 'cmd-input-tab');
  if (existingInteractiveTab) {
    switchCmdTab(existingInteractiveTab.id);
    return;
  }

  if (cmdNewTab) {
    animateTerminalElement(cmdNewTab, [
      { transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }
    ], 220);
  }

  tabCount += 1;
  const id = 'cmd-input-tab';
  const staticHeader = [
    'SHITTIM CHEST OS [Kernel v2.4.0-kivotos (x86_64)]',
    '(c) General Student Council. All rights reserved.',
    '',
  ].join('\n');
  const tips = [
    '>> SCHALE TACTICAL SUBSYSTEM READY.',
    '>> Operator: Plana / A.R.O.N.A.',
    '',
    'System Navigation:',
    '  ls                 List directories',
    '  cd student_records Kivotos dossiers',
    '  cat <file.txt>     Read student file',
    '  ./profile.exe      Sensei Office',
    '  help               Full directives',
    '',
  ].join('\n');
  const tab = {
    id,
    title: 'TERMINAL // SCHALE',
    shortTitle: 'TERMINAL',
    type: 'terminal',
    log: staticHeader,
    input: '',
    cwd: '/schale/sensei',
    boot: false,
    interactive: false,
    typing: true,
    isNew: true,
  };
  cmdTabsState.push(tab);
  switchCmdTab(id, 'open');
  typeTextForTab(tab, tips, 48, () => {
    tab.interactive = true;
    tab.typing = false;
    if (tab.id === activeTabId) {
      renderCmdBody();
      cmdInput.focus();
    }
  });
}

let isClosingTab = false;
function closeCmdTab(tabId) {
  if (cmdTabsState.length <= 1 || isClosingTab) return;
  const index = cmdTabsState.findIndex((tab) => tab.id === tabId);
  if (index === -1 || cmdTabsState[index].boot) return;

  isClosingTab = true;
  const tabEl = document.querySelector(`.cmd-tab[data-tab-id="${tabId}"]`);
  if (tabEl) {
    tabEl.classList.add('tab-closing');
  }

  const cmdBody = document.querySelector('.cmd-body');
  if (cmdBody && activeTabId === tabId) {
    cmdBody.classList.add('body-tab-closing');
  }

  setTimeout(() => {
    const freshIndex = cmdTabsState.findIndex((tab) => tab.id === tabId);
    if (freshIndex !== -1) {
      const closingTab = cmdTabsState[freshIndex];
      if (closingTab.typeTimer) clearTimeout(closingTab.typeTimer);
      cmdTabsState.splice(freshIndex, 1);
      if (activeTabId === tabId) {
        activeTabId = cmdTabsState[Math.max(0, freshIndex - 1)].id;
      }
    }
    if (cmdBody) {
      cmdBody.classList.remove('body-tab-closing');
    }
    renderCmd();
    animateTerminalElement(cmdLog, [
      { opacity: .4, transform: 'translateY(5px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ]);
    isClosingTab = false;
  }, terminalMotionPreference.matches ? 0 : 200);
}

function normalizeUrl(value) {
  if (/^https?:\/\//i.test(value)) return value;
  if (/^[\w-]+(\.[\w-]+)+/.test(value)) return `https://${value}`;
  return '';
}

function getDailyStudentTasklist() {
  const now = new Date();
  const utc7 = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
  const y = utc7.getFullYear();
  const m = String(utc7.getMonth() + 1).padStart(2, '0');
  const d = String(utc7.getDate()).padStart(2, '0');
  const dateStr = `${y}-${m}-${d}`;

  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = (seed << 5) - seed + dateStr.charCodeAt(i);
    seed |= 0;
  }
  seed = Math.abs(seed);

  function prng(offset) {
    let t = (seed + offset) + 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  const studentPool = [
    {
      exe: 'shiroko.exe',
      club: 'Abydos',
      pid: 101,
      acts: [
        'Khảo sát cung đường đạp xe vòng quanh D.U',
        'Đo đạc khoảng cách đến ngân hàng D.U gần nhất',
        'Cùng Sensei đi dạo bờ biển cát Abydos',
        'Bảo dưỡng khẩu súng White Fang 465'
      ],
      shortActs: [
        'Khảo sát đường đạp xe D.U',
        'Tính cự ly tới ngân hàng D.U',
        'Đi dạo bờ biển cát Abydos',
        'Lau súng White Fang 465'
      ]
    },
    {
      exe: 'hoshino.exe',
      club: 'Abydos',
      pid: 102,
      acts: [
        'Ngủ gật trên chiếc ghế sofa văn phòng Schale',
        'Uhee~ Nằm phơi nắng ở hành lang cùng Sensei',
        'Đang ngâm mình trong bể bơi phao của Abydos',
        'Lười biếng đòi Sensei xoa đầu mới chịu dậy'
      ],
      shortActs: [
        'Ngủ gật trên sofa Schale',
        'Uhee~ Nằm phơi nắng cùng Sensei',
        'Ngâm mình bể bơi phao Abydos',
        'Đòi Sensei xoa đầu mới dậy'
      ]
    },
    {
      exe: 'yuuka.exe',
      club: 'Seminar',
      pid: 103,
      acts: [
        'Rà soát hóa đơn chi tiêu Pyroxene của Sensei',
        'Cân đối ngân sách Millennium quý 4',
        'Nhắc nhở Sensei không được thức khuya làm việc',
        'Tính toán quỹ Schale chính xác đến 10 số thập phân'
      ],
      shortActs: [
        'Rà soát chi tiêu Pyroxene',
        'Cân đối ngân sách Millennium',
        'Nhắc Sensei đừng thức khuya',
        'Tính quỹ Schale 10 số thập phân'
      ]
    },
    {
      exe: 'hina.exe',
      club: 'Gehenna',
      pid: 104,
      acts: [
        'Xử lý mớ công văn tồn đọng của Hội Kỷ Luật',
        'Đi tuần tra khu phố Gehenna ngăn bạo loạn',
        'Nghỉ giải lao uống trà hoa cúc cùng Sensei',
        'Lặng lẽ ngắm Sensei làm việc qua camera Schale'
      ],
      shortActs: [
        'Xử lý công văn Hội Kỷ Luật',
        'Tuần tra ngăn chặn bạo loạn',
        'Uống trà hoa cúc cùng Sensei',
        'Lặng lẽ ngắm Sensei qua camera'
      ]
    },
    {
      exe: 'kotori.exe',
      club: 'Veritas',
      pid: 105,
      acts: [
        'Giải thích kiến trúc máy tính cho Sensei (3 tiếng)',
        'Phân tích giao thức bộ nhớ đệm cache coherence',
        'Nâng cấp tường lửa cho máy chủ web kotori.click',
        'Thao thao bất tuyệt về chip xử lý lượng tử'
      ],
      shortActs: [
        'Giải thích máy tính (3 tiếng)',
        'Phân tích bộ đệm cache',
        'Nâng cấp tường lửa kotori.click',
        'Thuyết trình chip lượng tử'
      ]
    },
    {
      exe: 'arisu.exe',
      club: 'GameDev',
      pid: 106,
      acts: [
        'Cùng Sensei cày phó bản đánh trùm di tích cổ',
        'Pan-paka-pan! Vừa mở khóa trang bị ánh sáng mới',
        'Đang thử nghiệm tựa game RPG mới của phòng Game',
        'Tập vung Railgun Ánh Sáng chuẩn phong thái Dũng Sĩ'
      ],
      shortActs: [
        'Cùng Sensei cày phó bản trùm',
        'Pan-paka-pan! Mở khóa vũ khí',
        'Thử nghiệm game RPG mới',
        'Vung Railgun Dũng Sĩ Ánh Sáng'
      ]
    },
    {
      exe: 'mika.exe',
      club: 'Trinity',
      pid: 107,
      acts: [
        'Nhâm nhi bánh cuộn roll cake và chờ Sensei',
        'Waho~ Đang chọn váy đẹp để đi dạo cùng Sensei',
        'Trang trí phòng trà Tea Party bằng hoa tươi',
        'Gửi 50 tin nhắn rủ Sensei đi chơi công viên'
      ],
      shortActs: [
        'Ăn bánh roll cake chờ Sensei',
        'Waho~ Chọn váy đẹp đi chơi',
        'Trang trí phòng trà Tea Party',
        'Gửi 50 tin nhắn rủ Sensei'
      ]
    },
    {
      exe: 'aru.exe',
      club: 'PS68',
      pid: 108,
      acts: [
        'Kế hoạch làm trùm tội phạm bị Sensei bắt bài',
        'Hoảng hốt tìm tiền trả nợ tiền thuê văn phòng',
        'Tập tạo dáng quý cô xã hội đen trước gương',
        'Lỡ tay ký nhầm hợp đồng từ thiện miễn phí'
      ],
      shortActs: [
        'Kế hoạch tội phạm bị bắt bài',
        'Hoảng hốt tìm tiền trả nợ',
        'Tập tạo dáng quý cô xã hội đen',
        'Ký nhầm hợp đồng từ thiện'
      ]
    },
    {
      exe: 'fuuka.exe',
      club: 'Supply',
      pid: 109,
      acts: [
        'Nấu hộp cơm bento đặc biệt mang đến tặng Sensei',
        'Đang né tránh Câu Lạc Bộ Ẩm Thực Gourmet bắt cóc',
        'Đi chợ sớm chọn nguyên liệu tươi ngon nấu ăn',
        'Pha trà giải nhiệt cho Sensei sau giờ làm việc'
      ],
      shortActs: [
        'Nấu cơm bento tặng Sensei',
        'Né tránh CLB Ẩm Thực bắt cóc',
        'Đi chợ sớm chọn nguyên liệu',
        'Pha trà giải nhiệt cho Sensei'
      ]
    },
    {
      exe: 'koharu.exe',
      club: 'Justice',
      pid: 110,
      acts: [
        'Tử hình!! Ecchi là không được!! Đang tịch thu truyện',
        'Đỏ mặt khi Sensei bất ngờ khen dễ thương',
        'Giấu vội cuốn tạp chí bí mật dưới gầm bàn',
        'Tuần tra xung quanh văn phòng Schale bảo vệ Sensei'
      ],
      shortActs: [
        'Tử hình!! Ecchi là cấm!!',
        'Đỏ mặt khi được Sensei khen',
        'Giấu tạp chí dưới gầm bàn',
        'Tuần tra bảo vệ Sensei'
      ]
    },
    {
      exe: 'plana.exe',
      club: 'Shittim',
      pid: 111,
      acts: [
        'Theo dõi sinh trắc học và canh chừng phong bì tím 💜',
        'Đồng bộ hóa giao thức Perez-Uzzah tầng lượng tử',
        'Chuẩn bị hiệu ứng cầu vồng cho lượt roll kế tiếp',
        'Lặng lẽ quan sát Sensei làm việc qua màn hình hòm'
      ],
      shortActs: [
        'Canh chừng phong bì tím 💜',
        'Đồng bộ giao thức Perez-Uzzah',
        'Chuẩn bị hiệu ứng cầu vồng',
        'Quan sát Sensei làm việc'
      ]
    },
    {
      exe: 'arona.exe',
      club: 'Shittim',
      pid: 112,
      acts: [
        'Vừa uống sữa dâu vừa vẽ chân dung tặng Sensei 🍓',
        'Hứa với Sensei lần roll tới nhất định ra 3★ tím',
        'Ngủ nướng trong Hòm Shittim chờ Sensei đánh thức',
        'Tập nhảy vũ đạo bài hát chủ đề Kivotos'
      ],
      shortActs: [
        'Uống sữa dâu vẽ tranh Sensei 🍓',
        'Hứa lần roll tới ra 3★ tím',
        'Ngủ nướng trong Hòm Shittim',
        'Tập nhảy vũ đạo Kivotos'
      ]
    }
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 520;

  if (isMobile) {
    const lines = [`┌── [TASKLIST: ${dateStr} UTC+7] ────┐`];
    studentPool.forEach((st, idx) => {
      const actIdx = Math.floor(prng(idx * 7) * st.shortActs.length);
      const act = st.shortActs[actIdx];
      lines.push(`  ${st.exe} [${st.club}]`);
      lines.push(`  >> ${act}`);
    });
    lines.push('└────────────────────────────────────┘');
    return lines.join('\n');
  }

  const rows = [
    `Image Name (Student)       PID  School      Current Kivotos Activity (${dateStr} UTC+7)`,
    '========================= ==== =========== ==================================================='
  ];
  studentPool.forEach((st, idx) => {
    const actIdx = Math.floor(prng(idx * 7) * st.acts.length);
    const act = st.acts[actIdx];
    const nameCol = `${st.exe} [${st.club}]`.padEnd(25, ' ');
    const pidCol = String(st.pid).padEnd(4, ' ');
    const schoolCol = st.club.padEnd(11, ' ');
    rows.push(`${nameCol} ${pidCol} ${schoolCol} ${act}`);
  });
  return rows.join('\n');
}

function fakeCommand(command, tab) {
  const raw = (command || '').trim();
  const lower = raw.toLowerCase();
  const parts = raw.split(/\s+/).filter(Boolean);
  if (!parts.length) return '';

  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  const argStr = args.join(' ').trim();
  const lowerArgStr = argStr.toLowerCase();
  const cwd = tab?.cwd || '/schale/sensei';

  // DIRECTIVE: HELP
  if (['help', '?', '-h', '--help'].includes(lower)) {
    return [
      '┌── [SHITTIM CHEST DIRECTIVES] ──────┐',
      '  [FILESYSTEM DIRECTIVES]',
      '  ls, dir [-la]   List directory',
      '  cd <dir>        Change directory',
      '  cat <file>      Read file / dossier',
      '  tree            Display system tree',
      '  pwd             Print current path',
      '  ./profile.exe   Launch Sensei Office',
      '',
      '  [SCHALE & BLUE ARCHIVE]',
      '  tasklist        Students schedule ⏱',
      '  status          Chest resonance',
      '  recruit / gacha Pull 3★ envelope 💜',
      '  pyroxene        Check vault reserves',
      '  wallpaper / bg  Trigger wallpaper wipe 🖼',
      '  warp            Initiate terminal warp jump ⚡',
      '  arona / plana   Talk with operators',
      '',
      '  [SYSTEM UTILITIES]',
      '  ipconfig        Kivotos network',
      '  whoami, id      Sensei clearance',
      '  ver, winver     Kernel diagnostics',
      '  time, date      Kivotos time (UTC+7)',
      '  ping            Ping Schale node',
      '  clear / cls     Clear screen',
      '  exit            Enter Sensei Office',
      '└────────────────────────────────────┘'
    ].join('\n');
  }

  // DIRECTIVE: EXECUTE PROFILE.EXE
  if (['./profile.exe', 'profile.exe', 'run profile.exe', './profile', 'profile', 'start profile.exe', 'start profile'].includes(lower)) {
    setTimeout(() => {
      enterConsole();
    }, 400);
    return '>> [EXEC] Launching Sensei Central Office Dashboard...\n>> [SCHALE MAINFRAME] Biometric authentication confirmed.\n>> Welcome back, Sensei!';
  }

  // DIRECTIVE: PWD
  if (cmd === 'pwd') {
    return cwd;
  }

  // DIRECTIVE: WHOAMI & ID
  if (cmd === 'whoami') {
    return 'sensei (Biometric Clearance: Level 10 - Schale Advisor)';
  }
  if (cmd === 'id') {
    return 'uid=1000(sensei) gid=1000(schale) groups=1000(schale),27(sudo),1001(gsc_general_council)';
  }

  // DIRECTIVE: UNAME & HOSTNAME
  if (cmd === 'uname') {
    if (args.includes('-a') || args.includes('-r')) {
      return 'Linux shittim-chest 2.4.0-kivotos #1 SMP PREEMPT Kivotos x86_64 GNU/Linux';
    }
    return 'Linux';
  }
  if (cmd === 'hostname') {
    return 'shittim-chest';
  }

  // DIRECTIVE: UPTIME
  if (cmd === 'uptime') {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });
    return ` ${timeStr} up 4 days, 17:45, 2 active operators (Arona, Plana), load average: 0.08, 0.04, 0.01`;
  }

  // DIRECTIVE: ECHO
  if (cmd === 'echo') {
    return argStr;
  }

  // DIRECTIVE: TOUCH, MKDIR, RM
  if (['touch', 'mkdir'].includes(cmd)) {
    return `[OK] Created virtual node in memory buffer for "${argStr || 'entry'}".`;
  }
  if (cmd === 'rm') {
    return `rm: cannot remove '${argStr}': Protected by Sanctum Tower Security Protocol.`;
  }

  // DIRECTIVE: LS / DIR
  if (['ls', 'dir'].includes(cmd)) {
    const isLong = args.some((a) => /^-[a-z]*l[a-z]*/i.test(a));
    const isAll = args.some((a) => /^-[a-z]*a[a-z]*/i.test(a));
    const pathArg = args.find((a) => !a.startsWith('-'))?.toLowerCase().replace(/\/+$/, '') || '';

    let targetDir = cwd;
    if (pathArg) {
      if (pathArg === '..' || pathArg === '../') {
        targetDir = vfs[cwd]?.parent || '/schale/sensei';
      } else if (pathArg === '~' || pathArg === '/' || pathArg === '/schale/sensei') {
        targetDir = '/schale/sensei';
      } else if (pathArg.includes('studen') || pathArg.startsWith('stu')) {
        targetDir = '/schale/sensei/student_records';
      } else if (pathArg.includes('doc') || pathArg.startsWith('doc')) {
        targetDir = '/schale/sensei/documents';
      } else if (pathArg.includes('pyro') || pathArg.startsWith('pyr')) {
        targetDir = '/schale/sensei/pyroxene_vault';
      } else {
        const testPath = cwd === '/schale/sensei' ? `/schale/sensei/${pathArg}` : pathArg;
        if (vfs[testPath]) targetDir = testPath;
        else return `ls: cannot access '${pathArg}': No such file or directory`;
      }
    }

    const node = vfs[targetDir];
    if (!node) return `ls: cannot access '${pathArg || cwd}': No such file or directory`;

    if (isLong || isAll) {
      const count = Object.keys(node.items).length;
      const lines = [
        `total ${count * 4}`,
        `drwxr-xr-x 4 sensei schale 4096 Nov 22 08:00 .`,
        `drwxr-xr-x 3 root   root   4096 Nov 22 08:00 ..`,
      ];
      for (const [name, item] of Object.entries(node.items)) {
        if (item.type === 'dir' || item.type === 'dir_ref') {
          lines.push(`drwxr-xr-x 2 sensei schale 4096 Nov 22 08:00 ${name}/`);
        } else if (item.type === 'exec') {
          lines.push(`-rwxr-xr-x 1 sensei schale 8192 Nov 22 08:00 ${name}*`);
        } else {
          lines.push(`-rw-r--r-- 1 sensei schale 1024 Nov 22 08:00 ${name}`);
        }
      }
      return lines.join('\n');
    }

    const dirLines = [`Directory of ${targetDir}\n`];
    for (const [name, item] of Object.entries(node.items)) {
      if (item.type === 'dir' || item.type === 'dir_ref') {
        dirLines.push(`[DIR]  ${name}/`);
      } else if (item.type === 'exec') {
        dirLines.push(`[EXEC] ${name}*`);
      } else {
        dirLines.push(`[FILE] ${name}`);
      }
    }
    return dirLines.join('\n');
  }

  // DIRECTIVE: CD
  if (cmd === 'cd') {
    if (!args.length || ['~', '/', '/schale/sensei'].includes(lowerArgStr)) {
      tab.cwd = '/schale/sensei';
      return '';
    }
    if (lowerArgStr === '..' || lowerArgStr === '../') {
      if (cwd === '/schale/sensei') {
        return '[NOTICE] Root filesystem /schale is restricted to Schale Advisor workspace (~).';
      }
      tab.cwd = vfs[cwd]?.parent || '/schale/sensei';
      return '';
    }

    const cleanArg = lowerArgStr.replace(/\/+$/, '');
    if (cleanArg.includes('studen') || cleanArg.includes('student') || cleanArg.startsWith('stu') || cleanArg === 'hocsinh') {
      tab.cwd = '/schale/sensei/student_records';
      return '';
    }
    if (cleanArg.includes('doc') || cleanArg.startsWith('doc') || cleanArg === 'tailieu') {
      tab.cwd = '/schale/sensei/documents';
      return '';
    }
    if (cleanArg.includes('pyro') || cleanArg.startsWith('pyr') || cleanArg === 'kho' || cleanArg === 'vault') {
      tab.cwd = '/schale/sensei/pyroxene_vault';
      return '';
    }

    const currNode = vfs[cwd];
    if (currNode && currNode.items[cleanArg]) {
      const targetItem = currNode.items[cleanArg];
      if (targetItem.type === 'file' || targetItem.type === 'exec') {
        return `bash: cd: ${args[0]}: Not a directory`;
      }
    }

    return `bash: cd: ${args[0]}: No such file or directory`;
  }

  // DIRECTIVE: CAT / VIEW / OPEN / TYPE / MORE / LESS
  if (['cat', 'view', 'open', 'type', 'more', 'less'].includes(cmd)) {
    if (!args.length) return `${cmd}: missing operand`;
    const target = args[0].toLowerCase().replace(/^\.\//, '');

    function findFile(node, search) {
      if (!node || !node.items) return null;
      if (node.items[search]) return node.items[search];
      const foundKey = Object.keys(node.items).find(
        (k) => k.toLowerCase() === search || k.toLowerCase().replace(/\.txt$/, '') === search
      );
      return foundKey ? node.items[foundKey] : null;
    }

    if (target.includes('/') || target.includes('\\')) {
      const slashParts = target.split(/[\/\\]+/);
      const dirPart = slashParts[0];
      const filePart = slashParts.slice(1).join('/');

      let targetDir = cwd;
      if (dirPart === '..' || dirPart === '../') {
        targetDir = vfs[cwd]?.parent || '/schale/sensei';
      } else if (dirPart.includes('studen') || dirPart.startsWith('stu')) {
        targetDir = '/schale/sensei/student_records';
      } else if (dirPart.includes('doc') || dirPart.startsWith('doc')) {
        targetDir = '/schale/sensei/documents';
      } else if (dirPart.includes('pyro') || dirPart.startsWith('pyr')) {
        targetDir = '/schale/sensei/pyroxene_vault';
      }
      const file = findFile(vfs[targetDir], filePart);
      if (file) {
        if (file.type === 'dir' || file.type === 'dir_ref') return `cat: ${args[0]}: Is a directory`;
        if (file.type === 'exec') return `cat: ${args[0]}: Cannot display binary ELF executable file. Run ./${filePart} instead.`;
        return file.content;
      }
    }

    const file = findFile(vfs[cwd], target);
    if (file) {
      if (file.type === 'dir' || file.type === 'dir_ref') return `cat: ${args[0]}: Is a directory`;
      if (file.type === 'exec') return `cat: ${args[0]}: Cannot display binary ELF executable file. Run ./${args[0]} instead.`;
      return file.content;
    }

    if (cwd === '/schale/sensei') {
      const studentFile = findFile(vfs['/schale/sensei/student_records'], target);
      if (studentFile) return studentFile.content;
    }

    return `cat: ${args[0]}: No such file or directory`;
  }

  // BLUE ARCHIVE & KIVOTOS COMMANDS
  if (lower === 'recruit' || lower === 'gacha') {
    return "[PLANA'S BLESSING] ✨ A miraculous purple envelope has appeared! 💜 Congratulations Sensei, rate-up student recruited!";
  }
  if (['pyroxene', 'gems', 'gem', 'pyro'].includes(lower)) {
    return '[SCHALE VAULT] 💎 Pyroxenes: 24,000 (1 Spark ready! Sensei can safely pull the next banner.)';
  }
  if (lower === 'arona') {
    return '[ARONA] 🍓 "Sensei! Welcome back! Don\'t forget to drink your strawberry milk! Everything in Kivotos is peaceful today~"';
  }
  if (lower === 'plana') {
    return '[PLANA] 💜 "Sensei... Plana is monitoring all biometric telemetry. The Sanctum Tower is secure. You are safe here."';
  }
  if (['time', 'date', 'clock'].includes(lower)) {
    const now = new Date();
    const vnTime = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });
    const vnDate = now.toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    return `[KIVOTOS REALTIME] ⏱ ${vnDate} ${vnTime} (UTC+7 / Ho Chi Minh)`;
  }
  if (['exit', 'quit', 'close', 'logout'].includes(lower)) {
    if (cmdTabsState.length > 1 && !tab?.boot) {
      setTimeout(() => {
        closeCmdTab(tab.id);
      }, 250);
      return '>> [SUBSYSTEM] Closing current console session... Returning to main.';
    }
    setTimeout(() => {
      enterConsole();
    }, 350);
    return '>> [ACCESS GRANTED] Authenticating Sensei credentials... Entering office!';
  }
  if (['warp', 'hyperwarp', 'jump'].includes(lower)) {
    setTimeout(() => {
      enterConsole();
    }, 250);
    return '>> [WARP DRIVE] Perez-Uzzah quantum coordinates locked. Engaging Sanctum warp jump...';
  }
  if (['wallpaper', 'bg', 'nextbg', 'wall'].includes(lower)) {
    triggerWallpaperRotation(true);
    return '>> [WALLPAPER] Initiating holographic wipe transition... [OK]';
  }
  if (lower === 'status') {
    return '[SYSTEM] Resonance: 100% | Operator: Plana & Arona Online | Sanctum: Secure | Perez-Uzzah: Synced.';
  }
  if (lower === 'ping') {
    return 'Pinging mainframe.schale.kivotos [127.0.0.1]... Reply: time=4ms TTL=128 (Ultra-low latency)';
  }
  if (lower.startsWith('sudo') || lower === 'root' || lower === 'admin') {
    return '[ACCESS CONFIRMED] "Sensei holds permanent Superuser Biometric Clearance in Kivotos."';
  }
  // WINDOWS & DESKTOP DIRECTIVES
  if (cmd === 'echo') {
    return args.join(' ');
  }
  if (['tree'].includes(cmd)) {
    return [
      'Folder PATH listing for volume SCHALE_OS',
      'C:.',
      '├── documents',
      '│   ├── schale_protocol.txt',
      '│   └── todo.txt',
      '├── pyroxene_vault',
      '│   └── balance.txt',
      '├── student_records',
      '│   ├── arisu.txt',
      '│   ├── arona.txt',
      '│   ├── hina.txt',
      '│   ├── hoshino.txt',
      '│   ├── kotori.txt',
      '│   ├── mika.txt',
      '│   ├── plana.txt',
      '│   ├── shiroko.txt',
      '│   └── yuuka.txt',
      '├── profile.exe',
      '└── README.txt'
    ].join('\n');
  }
  if (['ipconfig', 'ifconfig'].includes(cmd)) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 520;
    if (isMobile) {
      return [
        '┌── [KIVOTOS NETWORK CONFIG] ────────┐',
        '  Host    : SCHALE-MAINFRAME',
        '  Adapter : Perez-Uzzah Ethernet',
        '  IPv4    : 10.24.77.10 (Sanctum Net)',
        '  Mask    : 255.255.0.0',
        '  Gateway : 10.24.0.1 (Sanctum Tower)',
        '  DNS 1   : 7.7.7.7 (Arona DNS)',
        '  DNS 2   : 1.0.24.1 (Plana DNS)',
        '  Domain  : schale.kivotos',
        '  Status  : Shittim Synced (100%)',
        '└────────────────────────────────────┘'
      ].join('\n');
    }
    return [
      'Windows IP Configuration (General Student Council - Kivotos)',
      '',
      'Ethernet adapter Schale-Mainframe:',
      '   Connection-specific DNS Suffix  . : schale.kivotos',
      '   Description . . . . . . . . . . . : Shittim Chest Virtual Ethernet Adapter (Perez-Uzzah Layer)',
      '   Physical Address. . . . . . . . . : BA-77-SC-HA-LE-01',
      '   DHCP Enabled. . . . . . . . . . . : Yes (Arona OS Daemon)',
      '   IPv4 Address. . . . . . . . . . . : 10.24.77.10 (Sanctum Intranet)',
      '   Subnet Mask . . . . . . . . . . . : 255.255.0.0',
      '   Default Gateway . . . . . . . . . : 10.24.0.1 (Sanctum-Tower.gsc.kivotos)',
      '   DNS Servers . . . . . . . . . . . : 7.7.7.7 (Arona Primary DNS)',
      '                                       1.0.24.1 (Plana Auxiliary DNS)',
      '   Primary WINS Server . . . . . . . : 10.24.0.7 (GSC Central Mainframe)',
      '   NetBIOS over Tcpip. . . . . . . . : Enabled (A.R.O.N.A Protocol Active)'
    ].join('\n');
  }
  if (['ver', 'winver'].includes(cmd)) {
    return 'Microsoft Windows [Version 10.0.22631.3007] // WSL2 (Kivotos Shittim Subsystem v2.4.0)';
  }
  if (['tasklist', 'ps', 'tasks'].includes(cmd)) {
    return getDailyStudentTasklist();
  }
  if (['calc', 'calculator'].includes(cmd)) {
    return '[SEMINAR CALC] 🧮 Calling Seminar Treasurer Hayase Yuuka (100kg Calculator) to balance equations!';
  }
  if (cmd === 'code') {
    return '[VS CODE KIVOTOS] Initializing Veritas IDE workspace for Sensei... Ready!';
  }
  if (['matrix', 'hack', 'veritas'].includes(cmd)) {
    return '[VERITAS HACKER COLLECTIVE] ⚡ Kotori & Chihiro bypass firewall: Sanctum Tower root access GRANTED.';
  }
  // DIRECTIVE: PROTOCOL
  if (['protocol', 'schale_protocol', 'schale_protocol.txt'].includes(lower)) {
    return vfs['/schale/sensei/documents']?.items['schale_protocol.txt']?.content || '';
  }

  // DIRECTIVE: TODO / SCHEDULE / CHECK / COMPLETE
  if (['todo', 'schedule', 'check', 'done', 'approve'].includes(cmd)) {
    let targetArg = '';
    if (['check', 'done', 'approve'].includes(cmd)) {
      targetArg = (argStr || '').toLowerCase().trim();
    } else if (args.length) {
      if (['check', 'done', 'finish', 'approve', 'sign'].includes(args[0].toLowerCase())) {
        targetArg = args.slice(1).join(' ').toLowerCase().trim();
      } else {
        targetArg = args.join(' ').toLowerCase().trim();
      }
    }

    if (!targetArg) {
      const scheduleBox = updateTodoTxtContent();
      return `${scheduleBox}\n>> [HƯỚNG DẪN TƯƠNG TÁC]:\n   - Gõ "todo check <3-5>" hoặc "check 3" để hoàn thành nhiệm vụ!\n   - Gõ "todo reset" nếu muốn đặt lại ban đầu.`;
    }

    if (targetArg === 'reset') {
      schaleTodoState[2].done = false;
      schaleTodoState[3].done = false;
      schaleTodoState[4].done = false;
      updateTodoTxtContent();
      return '[SCHALE OS] Schedule reset! Nhiệm vụ 3, 4, 5 đã chuyển về trạng thái đang chờ [ ].';
    }

    const matchedTask = schaleTodoState.find((t) => {
      if (String(t.id) === targetArg || `task ${t.id}` === targetArg || `#${t.id}` === targetArg) return true;
      if (t.aliases && t.aliases.some((a) => targetArg.includes(a))) return true;
      return false;
    });

    if (!matchedTask) {
      return `[SCHALE OS] Không tìm thấy nhiệm vụ "${targetArg}". Gõ "todo" để xem danh sách (VD: "todo check 3").`;
    }

    if (matchedTask.done) {
      return `[SCHALE OS] Nhiệm vụ #${matchedTask.id} (${matchedTask.title}) đã hoàn thành trước đó rồi! ✔`;
    }

    matchedTask.done = true;
    updateTodoTxtContent();

    const allDone = schaleTodoState.every((t) => t.done);
    let reply = `${matchedTask.response}\n>> [ĐÃ HOÀN THÀNH NHIỆM VỤ #${matchedTask.id}] "[v] ${matchedTask.title}"`;
    if (allDone) {
      reply += '\n\n✨ [XUẤT SẮC! TOÀN BỘ LỊCH TRÌNH SCHALE ĐÃ HOÀN TẤT!]\nKivotos hôm nay thật yên bình! Plana & Arona gửi tặng Sensei 1,200 Pyroxene 💎 & một Phong Bì Tím 3★! 💜';
    }
    return reply;
  }
  if (lower.startsWith('run ') || lower.startsWith('npm ') || lower.startsWith('python ') || lower.startsWith('git ')) {
    return `Executing "${command}"...\n[OK] Shittim Chest process daemon completed with code 0.`;
  }
  return `"${command}" is not recognized. Type "help" to see available directives. ✦`;
}

const cmdCtrlMin = document.querySelector('.cmd-ctrl-min');
const cmdCtrlMax = document.querySelector('.cmd-ctrl-max');
const cmdCtrlClose = document.querySelector('.cmd-ctrl-close');
const cmdWindowEl = document.querySelector('.cmd-window');
const cmdTitlebarEl = document.querySelector('.cmd-titlebar');
const cmdBodyEl = document.querySelector('.cmd-body');

function toggleMaximizeWindow() {
  if (!cmdWindowEl || !cmdCtrlMax) return;
  const isMax = cmdWindowEl.classList.toggle('maximized');
  cmdCtrlMax.textContent = isMax ? '❐' : '□';
  cmdCtrlMax.title = isMax ? 'Khôi phục kích thước' : 'Phóng to';
}

if (cmdCtrlMin) {
  cmdCtrlMin.addEventListener('click', enterConsole);
}
if (cmdCtrlMax) {
  cmdCtrlMax.addEventListener('click', toggleMaximizeWindow);
}
if (cmdCtrlClose) {
  cmdCtrlClose.addEventListener('click', enterConsole);
}
if (cmdTitlebarEl) {
  cmdTitlebarEl.addEventListener('dblclick', (e) => {
    if (!e.target.closest('button')) {
      toggleMaximizeWindow();
    }
  });
}
if (cmdBodyEl) {
  cmdBodyEl.addEventListener('click', (e) => {
    if (!e.target.closest('button, a, input')) {
      const tab = activeCmdTab();
      if (tab.interactive && cmdInput) {
        cmdInput.focus();
      }
    }
  });
}

const cmdHistory = [];
let cmdHistoryIndex = -1;

cmdInput.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
    event.preventDefault();
    const tab = activeCmdTab();
    tab.log = '';
    tab.input = '';
    renderCmdBody();
    return;
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') {
    event.preventDefault();
    const tab = activeCmdTab();
    tab.log += `${tab.log.endsWith('\n') ? '' : '\n'}${getPromptText(tab)} ${cmdInput.value}^C\n`;
    tab.input = '';
    cmdInput.value = '';
    renderCmdBody();
    return;
  }
  if (event.key === 'Tab') {
    event.preventDefault();
    const val = cmdInput.value;
    const tab = activeCmdTab();
    const cwd = tab?.cwd || '/schale/sensei';
    const currNode = vfs[cwd];
    if (!currNode) return;

    const parts = val.split(/\s+/);
    if (parts.length === 1) {
      const typed = parts[0].toLowerCase();
      const candidates = [
        'ls', 'dir', 'cd', 'cat', 'type', 'tree', 'pwd', './profile.exe', 'status', 'recruit',
        'pyroxene', 'todo', 'check', 'protocol', 'arona', 'plana', 'ipconfig', 'ver', 'tasklist', 'echo', 'calc', 'whoami', 'uname', 'uptime', 'clear', 'help', 'wallpaper', 'bg', 'warp'
      ];
      const match = candidates.find((c) => c.startsWith(typed));
      if (match) {
        cmdInput.value = match + ' ';
      }
    } else {
      const prefix = parts.slice(0, -1).join(' ') + ' ';
      const typed = parts[parts.length - 1].toLowerCase();
      const itemKeys = Object.keys(currNode.items || {});
      const match = itemKeys.find((k) => k.toLowerCase().startsWith(typed));
      if (match) {
        const item = currNode.items[match];
        const suffix = item.type === 'dir' || item.type === 'dir_ref' ? '/' : '';
        cmdInput.value = prefix + match + suffix + (suffix ? '' : ' ');
      }
    }
    tab.input = cmdInput.value;
    return;
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (!cmdHistory.length) return;
    if (cmdHistoryIndex === -1) {
      cmdHistoryIndex = cmdHistory.length - 1;
    } else if (cmdHistoryIndex > 0) {
      cmdHistoryIndex -= 1;
    }
    cmdInput.value = cmdHistory[cmdHistoryIndex] || '';
    activeCmdTab().input = cmdInput.value;
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (cmdHistoryIndex === -1) return;
    if (cmdHistoryIndex < cmdHistory.length - 1) {
      cmdHistoryIndex += 1;
      cmdInput.value = cmdHistory[cmdHistoryIndex] || '';
    } else {
      cmdHistoryIndex = -1;
      cmdInput.value = '';
    }
    activeCmdTab().input = cmdInput.value;
  }
});

cmdTabs.addEventListener('click', (event) => {
  const tabButton = event.target.closest('.cmd-tab');
  if (!tabButton) return;
  const tabId = tabButton.dataset.tabId;
  if (event.target.closest('[data-close-tab]')) closeCmdTab(tabId);
  else switchCmdTab(tabId);
});
cmdNewTab.addEventListener('click', openCmdTab);
cmdInput.addEventListener('input', () => {
  activeCmdTab().input = cmdInput.value;
});
cmdForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const tab = activeCmdTab();
  const command = cmdInput.value.trim();
  if (!command) return;
  if (['cls', 'clear'].includes(command.toLowerCase())) {
    tab.log = '';
    tab.input = '';
    renderCmdBody();
    return;
  }
  if (!cmdHistory.length || cmdHistory[cmdHistory.length - 1] !== command) {
    cmdHistory.push(command);
  }
  cmdHistoryIndex = -1;
  const promptText = getPromptText(tab);
  tab.log += `${tab.log.endsWith('\n') ? '' : '\n'}${promptText} ${command}\n`;
  const url = normalizeUrl(command);
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
    tab.log += `Opening ${url} in a new tab...\n`;
  } else {
    const res = fakeCommand(command, tab);
    if (res) {
      tab.log += `${res}\n`;
    }
  }
  tab.input = '';
  renderCmdBody();
});

function setStatusClass(status) {
  const normalized = ['online', 'idle', 'dnd', 'offline'].includes(status) ? status : 'offline';
  presenceEls.orb.className = `status-orb ${normalized}`;
  const dot = presenceEls.statusText.querySelector('.inline-dot');
  if (dot) dot.className = `inline-dot ${normalized}`;
  return normalized;
}

function getAvatarUrl(user) {
  if (!user?.avatar) return '';
  const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
}

function getDiscordDecorationUrls(user) {
  const asset = user?.avatar_decoration_data?.asset;
  if (!asset) return [];
  const normalized = asset.replace(/^avatar-decoration-presets\//, '');
  return [
    `https://cdn.discordapp.com/avatar-decoration-presets/${normalized}.png?size=240&passthrough=true`,
    `https://cdn.discordapp.com/avatar-decoration-presets/${normalized}.png?size=96&passthrough=true`,
  ];
}

function getEmojiText(emoji) {
  if (!emoji) return '';
  if (emoji.id) return `<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>`;
  return emoji.name || '';
}

function getElapsedText(timestamps) {
  if (!timestamps?.start) return '';
  const elapsed = Math.max(0, Date.now() - Number(timestamps.start));
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours) return `Đã chạy ${hours}h ${minutes % 60}m`;
  if (minutes) return `Đã chạy ${minutes}m ${seconds % 60}s`;
  return `Đã chạy ${seconds}s`;
}

function findCustomStatus(activities = []) {
  return activities.find((activity) => activity.type === 4);
}

function getClientText(data) {
  return [
    data.active_on_discord_desktop && 'Desktop',
    data.active_on_discord_mobile && 'Mobile',
    data.active_on_discord_web && 'Web',
  ].filter(Boolean).join(' · ');
}

function getCustomStatusText(activity) {
  if (!activity) return '';
  return [getEmojiText(activity.emoji), activity.state].filter(Boolean).join(' ').trim();
}

let activityProgressTimer = null;
let activeSpotifyTimestamps = null;
let activeGameTimestamps = null;
let latestActivities = [];
let discordSpotify = null;
let officialSpotify = null;
let officialSpotifyAvailable = false;
let currentDiscordPlatform = 'Offline';
let currentDiscordStatus = 'offline';
let isDiscordOnline = false;
let spotifyFallbackTimer = null;

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(Number(milliseconds || 0) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes}:${String(totalSeconds % 60).padStart(2, '0')}`;
}

function getActivityAssetUrl(activity, assetName = 'large_image') {
  const asset = activity?.assets?.[assetName];
  if (!asset) return '';

  if (/^https?:\/\//i.test(asset)) return asset;
  if (asset.startsWith('spotify:')) return `https://i.scdn.co/image/${asset.slice(8)}`;

  if (asset.startsWith('mp:external/')) {
    // Some clients include extra encoded query segments before /https/.
    // Prefer the original public image; Discord's proxy may reject external use.
    const original = asset.match(/\/(https?)\/(.+)$/i);
    if (original) {
      const url = `${original[1]}://${original[2]}`;
      const youtube = url.match(/^https?:\/\/i\.ytimg\.com\/vi\/([\w-]+)\//);
      return youtube ? `https://i.ytimg.com/vi/${youtube[1]}/mqdefault.jpg` : url;
    }
    return `https://media.discordapp.net/${asset.slice(3)}`;
  }

  if (asset.startsWith('mp:')) return `https://media.discordapp.net/${asset.slice(3)}`;

  if (!activity.application_id) return '';
  return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${asset}.png?size=512`;
}

function getGameFallbackUrl(activity) {
  const activityName = String(activity?.name || '').trim().toLowerCase();
  if (gameActivityImageFallbacks[activityName]) return gameActivityImageFallbacks[activityName];
  for (const [key, url] of Object.entries(gameActivityImageFallbacks)) {
    if (activityName.includes(key) || key.includes(activityName)) return url;
  }
  return '';
}

function getGameActivityImageUrl(activity) {
  // Minecraft RPC may advertise its helper's logo instead of the game icon.
  if (/minecraft/i.test(String(activity?.name || ''))) {
    return gameActivityImageFallbacks.minecraft;
  }
  const assetUrl = getActivityAssetUrl(activity, 'large_image') || getActivityAssetUrl(activity, 'small_image');
  if (assetUrl) return assetUrl;

  if (activity?.application_id && activity?.icon) {
    return `https://cdn.discordapp.com/app-icons/${activity.application_id}/${activity.icon}.png?size=512`;
  }

  return getGameFallbackUrl(activity);
}

function setActivityImage(image, fallback, src, alt, fallbackSrc = '') {
  if (!image || !fallback) return;
  // Spotify album art defaults to 640px; these cards only need 300px.
  if (typeof src === 'string') {
    src = src.replace(/^(https:\/\/i\.scdn\.co\/image\/ab67616d)0000b273/i, (_, prefix) => `${prefix}00001e02`);
  }
  const nextSrc = src || fallbackSrc || '';
  if (image.dataset.activitySrc === nextSrc && nextSrc) return;
  image.dataset.activitySrc = nextSrc;
  image.loading = 'eager';
  image.decoding = 'async';
  image.fetchPriority = 'high';
  image.alt = alt || 'Ảnh hoạt động';
  image.onerror = () => {
    if (fallbackSrc && image.src !== fallbackSrc && !image.src.endsWith(fallbackSrc.replace(/^\./, ''))) {
      image.src = fallbackSrc;
      return;
    }
    image.classList.add('hidden');
    fallback.classList.remove('hidden');
  };
  const targetSrc = src || fallbackSrc;
  if (targetSrc) {
    image.classList.remove('hidden');
    fallback.classList.add('hidden');
    image.src = targetSrc;
  } else {
    image.removeAttribute('src');
    image.classList.add('hidden');
    fallback.classList.remove('hidden');
  }
}

function updateSpotifyProgress() {
  if (officialSpotifyAvailable && officialSpotify && officialSpotify.duration_ms) {
    const total = Math.max(1, Number(officialSpotify.duration_ms));
    let elapsed;
    if (officialSpotify.isPaused) {
      elapsed = Math.max(0, Math.min(total, Number(officialSpotify.progress_ms || 0)));
    } else {
      const delta = officialSpotify.clientReceivedAt
        ? Math.max(0, performance.now() - officialSpotify.clientReceivedAt)
        : 0;
      elapsed = Math.max(0, Math.min(total, Number(officialSpotify.progress_ms || 0) + delta));
    }
    presenceEls.spotifyProgressFill.style.width = `${(elapsed / total) * 100}%`;
    presenceEls.spotifyCurrentTime.textContent = formatDuration(elapsed);
    presenceEls.spotifyTotalTime.textContent = formatDuration(total);
    return;
  }

  const timestamps = activeSpotifyTimestamps;
  if (!timestamps?.start || !timestamps?.end) {
    presenceEls.spotifyProgressFill.style.width = '0%';
    presenceEls.spotifyCurrentTime.textContent = '0:00';
    presenceEls.spotifyTotalTime.textContent = '--:--';
    return;
  }

  const total = Math.max(1, Number(timestamps.end) - Number(timestamps.start));
  const elapsed = Math.max(0, Math.min(total, Date.now() - Number(timestamps.start)));
  presenceEls.spotifyProgressFill.style.width = `${(elapsed / total) * 100}%`;
  presenceEls.spotifyCurrentTime.textContent = formatDuration(elapsed);
  presenceEls.spotifyTotalTime.textContent = formatDuration(total);
}

function updateActivityTimes() {
  if (document.hidden || !profileScreen.classList.contains('active')) return;
  if (activeGameTimestamps) presenceEls.gameTime.textContent = getElapsedText(activeGameTimestamps);
  const musicProgress = document.getElementById('game-music-progress');
  if (musicProgress && !musicProgress.classList.contains('hidden') && activeGameTimestamps) {
    const start = Number(activeGameTimestamps.start);
    const end = Number(activeGameTimestamps.end);
    const total = Math.max(1, end - start);
    const elapsed = Math.max(0, Math.min(total, Date.now() - start));
    document.getElementById('game-music-fill').style.width = `${elapsed / total * 100}%`;
    document.getElementById('game-music-current').textContent = formatDuration(elapsed);
    document.getElementById('game-music-total').textContent = formatDuration(total);
  }
  if (officialSpotify && officialSpotify.isPaused) {
    const pausedDuration = officialSpotify.clientPausedAt
      ? (performance.now() - officialSpotify.clientPausedAt)
      : 5000;
    if (pausedDuration >= 5000) {
      renderPreferredActivities();
      return;
    }
  }
  updateSpotifyProgress();
}

function updateActivityCards(activities = [], spotify = null) {
  const hasSpotify = Boolean(spotify);
  const gameActivity = activities.find((activity) => activity && activity.type !== 4 && activity.name !== 'Spotify');
  const hasGame = Boolean(gameActivity);

  presenceEls.spotifyActivityCard.classList.toggle('hidden', !hasSpotify);
  presenceEls.gameActivityCard.classList.toggle('hidden', !hasGame);
  presenceEls.activitiesEmpty.classList.toggle('hidden', Boolean(hasSpotify || hasGame));

  if (hasSpotify) {
    presenceEls.spotifyTitle.textContent = spotify.song || 'Đang nghe nhạc';
    presenceEls.spotifyArtist.textContent = spotify.artist || 'Không rõ nghệ sĩ';
    presenceEls.spotifyAlbum.textContent = spotify.album ? `Album: ${spotify.album}` : '';
    activeSpotifyTimestamps = spotify.timestamps || null;
    setActivityImage(presenceEls.spotifyArt, presenceEls.spotifyArtFallback, spotify.album_art_url, `Ảnh bìa ${spotify.album || spotify.song || 'Spotify'}`);
  } else {
    activeSpotifyTimestamps = null;
  }

  if (hasGame) {
    const meta = activityTypes[gameActivity.type] || { label: 'Hoạt động', icon: '✦' };
    presenceEls.gameType.textContent = meta.label;
    presenceEls.gameTitle.textContent = gameActivity.name || 'Hoạt động đang chạy';
    presenceEls.gameDetail.textContent = gameActivity.details || '';
    presenceEls.gameState.textContent = gameActivity.state || '';
    activeGameTimestamps = gameActivity.timestamps || null;
    const hasMusicTimeline = gameActivity.type === 2 &&
      Number(activeGameTimestamps?.end) > Number(activeGameTimestamps?.start);
    document.getElementById('game-music-progress')?.classList.toggle('hidden', !hasMusicTimeline);
    presenceEls.gameTime.classList.toggle('hidden', hasMusicTimeline);
    const localFallback = getGameFallbackUrl(gameActivity);
    const imageUrl = getGameActivityImageUrl(gameActivity);
    presenceEls.gameArtFallback.textContent = meta.icon;
    setActivityImage(presenceEls.gameArt, presenceEls.gameArtFallback, imageUrl, `Ảnh ${gameActivity.name || 'hoạt động'}`, localFallback);
  } else {
    activeGameTimestamps = null;
  }

  updateActivityTimes();
  clearInterval(activityProgressTimer);
  activityProgressTimer = (hasSpotify || hasGame) ? setInterval(updateActivityTimes, 1000) : null;
}

function updatePlatformButton() {
  if (!presenceEls.clientPlatformBtn || !presenceEls.clientPlatformText) return;
  const currentSpotify = officialSpotifyAvailable ? officialSpotify : discordSpotify;
  const isPlayingSpotify = Boolean(currentSpotify && currentSpotify.isPlaying);
  const svgDot = presenceEls.clientPlatformBtn.querySelector('svg circle');

  if (isPlayingSpotify && isDiscordOnline) {
    presenceEls.clientPlatformText.textContent = `${currentDiscordPlatform} + Spotify`;
    if (svgDot) svgDot.setAttribute('fill', '#1db954');
  } else if (isPlayingSpotify) {
    presenceEls.clientPlatformText.textContent = 'Spotify';
    if (svgDot) svgDot.setAttribute('fill', '#1db954');
  } else {
    presenceEls.clientPlatformText.textContent = currentDiscordPlatform;
    if (svgDot) {
      const colors = { online: '#3ee87d', idle: '#f0b232', dnd: '#f45b69', offline: '#80848e' };
      svgDot.setAttribute('fill', colors[currentDiscordStatus] || '#80848e');
    }
  }
}

function renderPreferredActivities() {
  let activeSpotify = null;
  if (officialSpotifyAvailable) {
    if (officialSpotify && officialSpotify.isPlaying) {
      activeSpotify = officialSpotify;
    } else if (officialSpotify && officialSpotify.isPaused && !officialSpotify.isStopped) {
      const pausedDuration = officialSpotify.clientPausedAt
        ? (performance.now() - officialSpotify.clientPausedAt)
        : 5000;
      if (pausedDuration < 5000) {
        activeSpotify = officialSpotify;
      } else {
        activeSpotify = null;
      }
    }
  } else {
    activeSpotify = discordSpotify;
  }

  updateActivityCards(latestActivities, activeSpotify);
  updatePlatformButton();

  if (activeSpotify && activeSpotify.isPlaying && (!latestActivities.length || currentDiscordStatus === 'offline' || !isDiscordOnline)) {
    presenceEls.statusText.innerHTML = '<span class="inline-dot" style="background-color: #1db954; box-shadow: 0 0 8px #1db954;"></span>Đang nghe Spotify';
    presenceEls.spotifyActivityCard.classList.remove('hidden');
  }
}

const clanBadge = document.getElementById('clan-badge');
const clanBadgeIcon = document.getElementById('clan-badge-icon');
const clanBadgeTag = document.getElementById('clan-badge-tag');

const discordBadgeFlags = [
  { bit: 1 << 0, label: 'Nhân viên Discord (Discord Staff)', icon: './data/badges/discord-staff.svg' },
  { bit: 1 << 1, label: 'Chủ sở hữu máy chủ đối tác (Partnered Server Owner)', icon: './data/badges/discord-partner.svg' },
  { bit: 1 << 2, label: 'HypeSquad Events Coordinator', icon: './data/badges/hypesquad-event.svg' },
  { bit: 1 << 3, label: 'Thợ săn lỗi cấp 1 (Bug Hunter Level 1)', icon: './data/badges/bug-hunter-lv1.svg' },
  { bit: 1 << 6, label: 'HypeSquad Dũng Cảm (Bravery)', icon: './data/badges/hypesquad-bravery.svg' },
  { bit: 1 << 7, label: 'HypeSquad Lỗi Lạc (Brilliance)', icon: './data/badges/hypesquad-brilliance.svg' },
  { bit: 1 << 8, label: 'HypeSquad Cân Bằng (Balance)', icon: './data/badges/hypesquad-balance.svg' },
  { bit: 1 << 9, label: 'Người ủng hộ sớm (Early Supporter)', icon: './data/badges/early-supporter.svg' },
  { bit: 1 << 14, label: 'Thợ săn lỗi cấp 2 (Bug Hunter Level 2)', icon: './data/badges/bug-hunter-lv2.svg' },
  { bit: 1 << 17, label: 'Nhà phát triển bot xác minh sớm (Early Verified Bot Developer)', icon: './data/badges/early-verified-bot-developer.svg' },
  { bit: 1 << 18, label: 'Điều hành viên được chứng nhận (Discord Certified Moderator)', icon: './data/badges/discord-certified-moderator.svg' },
  { bit: 1 << 22, label: 'Nhà phát triển tích cực (Active Developer)', icon: './data/badges/active-developer.svg' },
];

function renderDiscordBadges(user) {
  if (!presenceEls.publicFlags) return;
  const flags = Number(user?.public_flags) || 0;
  const badges = [];

  // 1. Bitfield badges decoded from public_flags
  for (const badge of discordBadgeFlags) {
    if ((flags & badge.bit) === badge.bit) {
      badges.push({ name: badge.label, icon: badge.icon, nitro: false });
    }
  }

  // Decorations and animated avatars do not establish subscription or boost
  // tenure. Lanyard does not expose the complete Discord profile badge list;
  // render only badges supported by the public flags rather than inventing them.

  if (!badges.length) {
    presenceEls.publicFlags.innerHTML = '<span class="discord-badge empty">Không có huy hiệu</span>';
    return;
  }

  presenceEls.publicFlags.innerHTML = badges.map((badge) => `
    <span class="discord-badge ${badge.nitro ? 'nitro' : ''}" data-tooltip="${badge.name}" aria-label="${badge.name}">
      <img src="${badge.icon}" alt="${badge.name}">
    </span>
  `).join('');
}

function updateClanBadge(primaryGuild) {
  if (!clanBadge) return;
  if (primaryGuild && primaryGuild.tag && primaryGuild.identity_enabled !== false) {
    clanBadge.style.display = 'inline-flex';
    if (clanBadgeTag) clanBadgeTag.textContent = primaryGuild.tag;

    if (primaryGuild.badge && primaryGuild.identity_guild_id) {
      const badgeUrl = `https://cdn.discordapp.com/clan-badges/${primaryGuild.identity_guild_id}/${primaryGuild.badge}.png?size=32`;
      if (clanBadgeIcon) {
        clanBadgeIcon.src = badgeUrl;
        clanBadgeIcon.style.display = 'inline-block';
      }
    } else if (clanBadgeIcon) {
      clanBadgeIcon.style.display = 'none';
    }

    clanBadge.title = `Clan: ${primaryGuild.tag} (Guild ID: ${primaryGuild.identity_guild_id || ''})`;
    clanBadge.dataset.guildId = primaryGuild.identity_guild_id || '';
  } else {
    clanBadge.style.display = 'none';
  }
}

function updateMetaFields(data, user) {
  renderDiscordBadges(user);
  updateClanBadge(user?.primary_guild);
}

function setLocalDecoration() {
  const randomImage = DECORATIONS[Math.floor(Math.random() * DECORATIONS.length)];
  presenceEls.decoration.src = `./data/decoration/${randomImage}`;
  presenceEls.decoration.dataset.source = 'local';
}

function setDiscordDecoration(urls) {
  if (!urls.length) {
    if (presenceEls.decoration.dataset.source !== 'local') setLocalDecoration();
    return;
  }

  let index = 0;
  presenceEls.decoration.dataset.source = 'discord';
  presenceEls.decoration.onerror = () => {
    index += 1;
    if (urls[index]) {
      presenceEls.decoration.src = urls[index];
    } else {
      presenceEls.decoration.onerror = null;
      setLocalDecoration();
    }
  };
  presenceEls.decoration.src = urls[index];
}

const vietnamClockFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
function formatVietnamTime() {
  const parts = vietnamClockFormatter.formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value || '';
  return `VN ${get('hour')}:${get('minute')}:${get('second')} ${get('dayPeriod')}`;
}

function updateVietnamClock() {
  if (document.hidden || !profileScreen.classList.contains('active')) return;
  presenceEls.updated.textContent = formatVietnamTime();
}

updateVietnamClock();
setInterval(updateVietnamClock, 1000);

function startProfileNameTyping() {
  const target = presenceEls.typingName;
  if (!target) return;

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    if (document.hidden || !profileScreen.classList.contains('active')) {
      setTimeout(tick, 500);
      return;
    }
    const word = profileTypingWords[wordIndex];
    target.textContent = word.slice(0, charIndex);

    // Tự động tính tốc độ theo độ dài: từ dài gõ nhanh hơn để không bị lê thê
    const typeSpeed = Math.max(35, Math.min(85, Math.floor(650 / word.length)));
    const deleteSpeed = Math.max(20, Math.min(45, Math.floor(350 / word.length)));

    if (!deleting && charIndex < word.length) {
      charIndex += 1;
      setTimeout(tick, typeSpeed);
      return;
    }

    if (!deleting) {
      deleting = true;
      // Chờ một chút sau khi gõ xong để người xem kịp đọc
      setTimeout(tick, wordIndex === 0 ? 2500 : 1300);
      return;
    }

    if (charIndex > 0) {
      charIndex -= 1;
      setTimeout(tick, deleteSpeed);
      return;
    }

    deleting = false;
    wordIndex = (wordIndex + 1) % profileTypingWords.length;
    setTimeout(tick, 250);
  };

  tick();
}

startProfileNameTyping();

let spotifySocket = null;
let spotifyReconnectTimer = null;
let discordSocket = null;
let discordReconnectTimer = null;
let discordHeartbeat = null;

function connectSpotifyWS() {
  clearTimeout(spotifyReconnectTimer);
  if (spotifySocket) {
    spotifySocket.onopen = spotifySocket.onmessage = spotifySocket.onerror = spotifySocket.onclose = null;
    spotifySocket.close();
  }
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const ws = new WebSocket(`${protocol}//${window.location.host}/ws/spotify`);
  spotifySocket = ws;

  ws.onopen = () => {
    // Wait for a valid status before preferring this source over Discord.
    if (spotifyFallbackTimer) {
      clearInterval(spotifyFallbackTimer);
      spotifyFallbackTimer = null;
    }
  };

  ws.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload) {
        payload.clientReceivedAt = performance.now();
        if (payload.isPaused) {
          payload.clientPausedAt = (officialSpotify && officialSpotify.clientPausedAt) || performance.now();
        } else {
          payload.clientPausedAt = null;
        }
      }
      officialSpotifyAvailable = Boolean(payload && !payload.error && !payload.rateLimited);
      officialSpotify = payload && (payload.isPlaying || payload.isPaused) && !payload.isStopped ? payload : null;
      renderPreferredActivities();
    } catch (error) {
      console.warn('Invalid Spotify WebSocket payload:', error);
    }
  };

  const fetchSpotifyFallback = async () => {
    if (document.hidden) return;
    try {
      const response = await fetch('/api/spotify', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Spotify fallback failed: ${response.status}`);
      const payload = await response.json();
      if (payload) {
        payload.clientReceivedAt = performance.now();
        if (payload.isPaused) {
          payload.clientPausedAt = (officialSpotify && officialSpotify.clientPausedAt) || performance.now();
        } else {
          payload.clientPausedAt = null;
        }
      }
      officialSpotifyAvailable = Boolean(payload && !payload.error && !payload.rateLimited);
      officialSpotify = payload && (payload.isPlaying || payload.isPaused) && !payload.isStopped ? payload : null;
      renderPreferredActivities();
    } catch (error) {
      console.warn('Spotify fallback unavailable:', error);
      officialSpotify = null;
      officialSpotifyAvailable = false;
      renderPreferredActivities();
    }
  };
  const startSpotifyFallback = () => {
    if (spotifyFallbackTimer) return;
    fetchSpotifyFallback();
    spotifyFallbackTimer = setInterval(fetchSpotifyFallback, 10000);
  };

  ws.onerror = () => {
    officialSpotify = null;
    officialSpotifyAvailable = false;
    startSpotifyFallback();
    renderPreferredActivities();
  };

  ws.onclose = () => {
    officialSpotify = null;
    officialSpotifyAvailable = false;
    startSpotifyFallback();
    renderPreferredActivities();
    spotifyReconnectTimer = setTimeout(connectSpotifyWS, 3000);
  };
}

connectSpotifyWS();

async function fetchDiscordPresence(force = false) {
  try {
    const response = await fetch(`${LANYARD_API_BASE}/v1/users/${DISCORD_USER_ID}`, { cache: 'no-store' });
    const payload = await response.json();
    if (!payload.success) throw new Error('Lanyard returned unsuccessful response');

    if (discordSocketReady && !force) return;
    applyDiscordPresence(payload.data);
  } catch (error) {
    if (discordSocketReady) return;
    console.warn('Unable to retrieve Discord presence:', error);
  }
}

function applyDiscordPresence(data) {
    if (!data?.discord_user) return;
    const user = data.discord_user;
    const status = setStatusClass(data.discord_status);
    currentDiscordStatus = status;
    isDiscordOnline = status !== 'offline';
    const statusLabel = statusLabels[status] || 'Đang offline';
    const clientText = getClientText(data);
    const customStatusText = getCustomStatusText(findCustomStatus(data.activities));
    const activities = Array.isArray(data.activities) ? data.activities : [];
    const spotify = data.listening_to_spotify && data.spotify ? data.spotify : null;
    const avatarUrl = getAvatarUrl(user);
    const discordDecorationUrls = getDiscordDecorationUrls(user);

    profileTypingWords[0] = user.global_name || user.display_name || 'Leman';
    presenceEls.username.textContent = user.username || 'lemanh1231';
    presenceEls.customStatusLine.textContent = customStatusText || '...';
    presenceEls.statusText.innerHTML = `<span class="inline-dot ${status}"></span>${statusLabel}`;
    currentDiscordPlatform = clientText || (status === 'offline' ? 'Offline' : 'Online');
    updatePlatformButton();
    updateVietnamClock();
    if (avatarUrl) presenceEls.avatar.src = avatarUrl;

    setDiscordDecoration(discordDecorationUrls);

    latestActivities = activities;
    discordSpotify = spotify;
    renderPreferredActivities();
    updateMetaFields(data, user);
}
let discordSocketReady = false;
function connectDiscordSocket() {
  clearTimeout(discordReconnectTimer);
  clearInterval(discordHeartbeat);
  discordSocketReady = false;
  if (discordSocket) {
    discordSocket.onmessage = discordSocket.onclose = discordSocket.onerror = null;
    discordSocket.close();
  }
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  const socket = new WebSocket(`${protocol}//${location.host}/socket`);
  discordSocket = socket;
  socket.onmessage = event => {
    try {
      const message = JSON.parse(event.data);
      if (message.op === 1) {
        socket.send(JSON.stringify({op: 2, d: {subscribe_to_id: DISCORD_USER_ID}}));
        clearInterval(discordHeartbeat);
        discordHeartbeat = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({op: 3}));
        }, Math.max(1000, Number(message.d?.heartbeat_interval) || 30000));
      } else if (message.op === 0 && message.d?.discord_user) {
        discordSocketReady = true;
        applyDiscordPresence(message.d);
      }
    } catch (error) { console.warn('Discord update failed:', error); }
  };
  socket.onclose = () => {
    discordSocketReady = false;
    clearInterval(discordHeartbeat);
    fetchDiscordPresence();
    discordReconnectTimer = setTimeout(connectDiscordSocket, 5000);
  };
  socket.onerror = () => socket.close();
}
fetchDiscordPresence();
connectDiscordSocket();
setInterval(() => { if (!document.hidden && !discordSocketReady) fetchDiscordPresence(); }, 6000);

// Mobile Chrome can freeze background tabs without promptly closing sockets.
function syncPageAnimationVisibility() {
  document.documentElement.classList.toggle('page-backgrounded', document.hidden);
}
document.addEventListener('visibilitychange', syncPageAnimationVisibility);
syncPageAnimationVisibility();

// Recreate both streams on resume instead of trusting their old ready state.
let lastPresenceResume = -Infinity;
function resumePresence() {
  if (document.visibilityState === 'hidden') return;
  const now = performance.now();
  if (now - lastPresenceResume < 1000) return;
  lastPresenceResume = now;
  connectSpotifyWS();
  connectDiscordSocket();
  fetchDiscordPresence(true);
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') resumePresence();
});
window.addEventListener('pageshow', event => {
  if (event.persisted) resumePresence();
});
window.addEventListener('online', resumePresence);

function rotateDecoration() {
  if (document.hidden || !profileScreen.classList.contains('active')) return;
  if (presenceEls.decoration.dataset.source === 'discord') return;
  setLocalDecoration();
}
setInterval(rotateDecoration, 5000);

let isTerminalWarping = false;
function enterConsole() {
  if (isTerminalWarping || !terminalScreen.classList.contains('active')) return;
  document.dispatchEvent(new Event('sensei-authenticate'));
  clearTimeout(introTimer);
  clearTimeout(terminalRenderTimer);
  terminalRenderTimer = null;
  cmdTabsState.forEach((tab) => {
    clearTimeout(tab.typeTimer);
    tab.typing = false;
  });
  terminalBeamAnimation?.cancel();

  const terminalWindow = document.querySelector('.cmd-window');
  if (terminalScreen && terminalScreen.classList.contains('active') && terminalWindow) {
    isTerminalWarping = true;
    // Fade only: no 3D warp, animated blur, flash or forced boot-log render.
    const finish = () => {
      showScreen(profileScreen);
      isTerminalWarping = false;
    };
    if (terminalMotionPreference.matches || !terminalWindow.animate) {
      finish();
    } else {
      const animation = terminalWindow.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 140, easing: 'ease-out', fill: 'forwards'
      });
      animation.finished.then(finish, finish).finally(() => animation.cancel());
    }
  } else {
    showScreen(profileScreen);
  }
}

['page-one-link', 'page-two-link'].forEach((id) => {
  const element = document.getElementById(id);
  if (!element) return;
  element.addEventListener('click', (event) => event.preventDefault());
});

const colorTool = {
  page: document.getElementById('tab-colorizer'),
  profile: document.querySelector('.profile-console'),
  open: document.getElementById('mal-link'),
  back: document.getElementById('color-back'),
  text: document.getElementById('tc-input-text'),
  effect: document.getElementById('tc-effect'),
  font: document.getElementById('tc-font'),
  size: document.getElementById('tc-size'),
  c1: document.getElementById('tc-color-1'),
  c2: document.getElementById('tc-color-2'),
  c3: document.getElementById('tc-color-3'),
  bold: document.getElementById('tc-bold'),
  italic: document.getElementById('tc-italic'),
  word: document.getElementById('tc-word'),
  colorLabels: [...document.querySelectorAll('.color-picks label')],
  preview: document.getElementById('tc-preview'),
  output: document.getElementById('tc-output'),
  copy: document.getElementById('tc-copy'),
};

const BOT_STATUS_ENDPOINTS = [
  `${window.location.origin}/api/public-status`,
];
const BOT_STATUS_REFRESH_MS = 15000;
let botStatusTimer = null;
let activeBotStatusApi = null;

const botPage = {
  page: document.getElementById('tab-bot'),
  open: document.getElementById('page-two-link'),
  back: document.getElementById('bot-back'),
  avatar: document.getElementById('bot-avatar'),
  banner: document.getElementById('bot-banner-img'),
  statusDot: document.getElementById('bot-status-dot'),
  statusText: document.getElementById('bot-status-text'),
  pageTitle: document.getElementById('bot-page-title'),
  name: document.getElementById('bot-display-name'),
  customStatus: document.getElementById('bot-custom-status'),
  activityIcon: document.getElementById('bot-activity-icon'),
  hero: document.querySelector('.bot-hero'),
  invite: document.getElementById('bot-invite-link'),
  updatedAt: document.getElementById('bot-updated-at'),
  ping: document.getElementById('bot-ping'),
  servers: document.getElementById('bot-servers'),
  playing: document.getElementById('bot-playing'),
  connected: document.getElementById('bot-connected'),
  runtime: document.getElementById('bot-runtime'),
  lavalink: document.getElementById('bot-lavalink'),
};

let activeInnerPage = null;

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16));
}

function rgbToHex([r, g, b]) {
  return [r, g, b].map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0')).join('').toUpperCase();
}

function lerpColor(start, end, step, total) {
  const ratio = total <= 1 ? 0 : step / (total - 1);
  return start.map((value, index) => value + (end[index] - value) * ratio);
}

function colorAt(index, total, effect) {
  const first = hexToRgb(colorTool.c1.value);
  const mid = hexToRgb(colorTool.c2.value);
  const last = hexToRgb(colorTool.c3.value);
  if (effect === 'solid') return rgbToHex(first);
  if (effect === 'rainbow') {
    const hue = Math.round((index / Math.max(1, total)) * 300);
    const tmp = document.createElement('span');
    tmp.style.color = `hsl(${hue}, 100%, 62%)`;
    document.body.appendChild(tmp);
    const rgb = getComputedStyle(tmp).color.match(/\d+/g).slice(0, 3).map(Number);
    tmp.remove();
    return rgbToHex(rgb);
  }
  if (effect === 'three') {
    const half = Math.max(1, Math.floor((total - 1) / 2));
    return index <= half ? rgbToHex(lerpColor(first, mid, index, half + 1)) : rgbToHex(lerpColor(mid, last, index - half, total - half));
  }
  if (effect === 'mirror') {
    const half = Math.max(1, Math.floor((total - 1) / 2));
    return index <= half ? rgbToHex(lerpColor(first, mid, index, half + 1)) : rgbToHex(lerpColor(mid, first, index - half, total - half));
  }
  return rgbToHex(lerpColor(first, last, index, total));
}

function updateColorPickState() {
  if (!colorTool.effect) return;
  const effect = colorTool.effect.value;
  const enabledMap = {
    two: [true, false, true],
    mirror: [true, true, false],
    three: [true, true, true],
    solid: [true, false, false],
    random: [false, false, false],
    rainbow: [false, false, false],
  };
  const enabled = enabledMap[effect] || [true, true, true];
  colorTool.colorLabels.forEach((label, index) => {
    label.classList.toggle('disabled', !enabled[index]);
    const input = label.querySelector('input');
    if (input) input.disabled = !enabled[index];
  });
  colorTool.word.closest('label')?.classList.toggle('disabled', effect !== 'random');
  colorTool.word.disabled = effect !== 'random';
}

function buildUnityRichText() {
  if (!colorTool.text || !colorTool.effect) return;
  updateColorPickState();
  const raw = colorTool.text.value || '';
  const effect = colorTool.effect.value;
  const tokens = effect === 'random' && colorTool.word.checked ? raw.split(/(\s+)/) : [...raw];
  const visibleTokens = tokens.filter((token) => token.trim()).length || raw.length || 1;
  let visibleIndex = 0;
  let html = '';
  let rich = '';

  tokens.forEach((token, index) => {
    if (!token.trim()) {
      html += token;
      rich += token;
      return;
    }
    const color = effect === 'random'
      ? rgbToHex([Math.random() * 255, Math.random() * 255, Math.random() * 255])
      : colorAt(visibleIndex, visibleTokens, effect);
    html += `<span style="color:#${color}">${token}</span>`;
    rich += `<color=#${color}>${token}</color>`;
    visibleIndex += 1;
  });

  if (colorTool.font.value) {
    html = `<span style="font-family:${colorTool.font.value}">${html}</span>`;
  }
  if (colorTool.size.value !== '0') {
    html = `<span style="font-size:${colorTool.size.value}px">${html}</span>`;
    rich = `<size=${colorTool.size.value}>${rich}</size>`;
  }
  if (colorTool.italic.checked) {
    html = `<i>${html}</i>`;
    rich = `<i>${rich}</i>`;
  }
  if (colorTool.bold.checked) {
    html = `<b>${html}</b>`;
    rich = `<b>${rich}</b>`;
  }

  colorTool.preview.innerHTML = html || 'Preview sẽ hiện ở đây';
  colorTool.output.value = rich;
}

function showInnerPage(page, afterShow) {
  if (!page) return;
  resetCardPointer();
  activeInnerPage?.classList.add('hidden');
  activeInnerPage?.classList.remove('leaving');
  activeInnerPage = page;
  page.style.setProperty('--tilt-x', '0deg');
  page.style.setProperty('--tilt-y', '0deg');
  document.body.classList.add('color-page-active');
  colorTool.profile.classList.remove('slide-to-home');
  colorTool.profile.classList.add('slide-to-color', 'page-mode');
  page.classList.remove('hidden', 'leaving');
  afterShow?.();
  setTimeout(() => {
    colorTool.profile.classList.remove('slide-to-color');
    resetCardPointer();
  }, 760);
}

function hideInnerPage(page) {
  if (!page) return;
  resetCardPointer();
  page.classList.add('leaving');
  colorTool.profile.classList.remove('slide-to-color');
  colorTool.profile.classList.add('slide-to-home');
  setTimeout(() => {
    document.body.classList.remove('color-page-active');
    colorTool.profile.classList.remove('page-mode', 'slide-to-home');
    page.classList.add('hidden');
    page.classList.remove('leaving');
    if (activeInnerPage === page) activeInnerPage = null;
    resetCardPointer();
  }, 560);
}

function showColorPage() {
  showInnerPage(colorTool.page, buildUnityRichText);
}

function hideColorPage() {
  hideInnerPage(colorTool.page);
}

function setText(element, value) {
  if (element) element.textContent = value;
}

function setBotStatusDot(status = 'offline') {
  if (!botPage.statusDot) return;
  botPage.statusDot.className = `bot-status-dot ${status}`;
}

function formatUpdatedAt(value) {
  const date = value ? new Date(value) : new Date();
  return `Cập nhật ${date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
}

function getBotActivityType(customStatus, playingTracks) {
  if (Array.isArray(playingTracks) && playingTracks.length > 0) {
    return 'listening';
  }
  const text = (customStatus || '').trim().toLowerCase();
  if (!text) {
    return 'custom';
  }
  if (
    text.startsWith('đang xem') ||
    text.startsWith('xem phim') ||
    text.startsWith('xem ') ||
    text.startsWith('watching') ||
    text.includes('đang xem') ||
    text.includes('watching') ||
    text.includes('date a live') ||
    text.includes('anime') ||
    text.includes('movie') ||
    text.includes('netflix') ||
    text.includes('bilibili')
  ) {
    return 'watching';
  }
  if (
    text.startsWith('đang stream') ||
    text.startsWith('stream') ||
    text.startsWith('streaming') ||
    text.startsWith('đang phát trực tiếp') ||
    text.startsWith('phát trực tiếp') ||
    text.includes('streaming') ||
    text.includes('stream') ||
    text.includes('twitch') ||
    text.includes('live')
  ) {
    return 'streaming';
  }
  if (
    text.startsWith('đang thi đấu') ||
    text.startsWith('thi đấu') ||
    text.startsWith('competing') ||
    text.includes('thi đấu') ||
    text.includes('competing') ||
    text.includes('tournament') ||
    text.includes('esports')
  ) {
    return 'competing';
  }
  if (
    text.startsWith('đang nghe') ||
    text.startsWith('nghe') ||
    text.startsWith('listening') ||
    text.includes('đang nghe') ||
    text.includes('listening to') ||
    text.includes('spotify') ||
    text.includes('soundcloud')
  ) {
    return 'listening';
  }
  if (
    text.startsWith('đang chơi') ||
    text.startsWith('chơi') ||
    text.startsWith('playing') ||
    text.includes('đang chơi') ||
    text.includes('playing ') ||
    text.includes('game')
  ) {
    return 'playing';
  }
  return 'custom';
}

function getActivityIconHtml(type) {
  switch (type) {
    case 'watching':
      return `<svg class="act-svg act-watching" viewBox="0 0 20 20" fill="none" aria-label="Đang xem">
        <rect x="2" y="3.5" width="16" height="11" rx="2.5" stroke="#38bdf8" stroke-width="1.6"/>
        <polygon points="8.5,6.5 13.5,9 8.5,11.5" fill="#38bdf8"/>
        <path d="M7 17.5H13M10 14.5V17.5" stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round"/>
      </svg>`;
    case 'streaming':
      return `<svg class="act-svg act-streaming" viewBox="0 0 20 20" fill="none" aria-label="Đang stream">
        <rect x="2" y="4.5" width="11" height="11" rx="2" stroke="#a855f7" stroke-width="1.6"/>
        <polygon points="14,8 18,5.5 18,14.5 14,12" fill="#a855f7"/>
        <circle cx="5" cy="7.5" r="1.5" fill="#ef4444" class="stream-live-beacon"/>
      </svg>`;
    case 'competing':
      return `<svg class="act-svg act-competing" viewBox="0 0 20 20" fill="none" aria-label="Đang thi đấu">
        <path d="M6 3.5H14V8C14 10.2091 12.2091 12 10 12C7.79086 12 6 10.2091 6 8V3.5Z" stroke="#fbbf24" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M6 5.5H3.5C2.67157 5.5 2 6.17157 2 7C2 8.5 3.5 9.5 6 9.5M14 5.5H16.5C17.3284 5.5 18 6.17157 18 7C18 8.5 16.5 9.5 14 9.5" stroke="#fbbf24" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M10 12V15.5M7 17.5H13" stroke="#fbbf24" stroke-width="1.6" stroke-linecap="round"/>
      </svg>`;
    case 'playing':
      return `<svg class="act-svg act-playing" viewBox="0 0 20 20" fill="none" aria-label="Đang chơi">
        <path d="M5.5 6H14.5C16.433 6 18 7.567 18 9.5C18 11.2 16.8 14.5 15.5 15.5C14.5 16.3 13.2 14.5 12.5 13.5H7.5C6.8 14.5 5.5 16.3 4.5 15.5C3.2 14.5 2 11.2 2 9.5C2 7.567 3.567 6 5.5 6Z" stroke="#4ade80" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M6 9.5V11.5M5 10.5H7M13 10H13.01M15 11H15.01" stroke="#4ade80" stroke-width="1.6" stroke-linecap="round"/>
      </svg>`;
    case 'custom':
      return `<svg class="act-svg act-custom" viewBox="0 0 20 20" fill="none" aria-label="Trạng thái">
        <path d="M3 5.5C3 4.39543 3.89543 3.5 5 3.5H15C16.1046 3.5 17 4.39543 17 5.5V12.5C17 13.6046 16.1046 14.5 15 14.5H8.5L5 17V14.5H5C3.89543 14.5 3 13.6046 3 12.5V5.5Z" stroke="#7ee0ff" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="7" cy="9" r="0.9" fill="#7ee0ff"/>
        <circle cx="10" cy="9" r="0.9" fill="#7ee0ff"/>
        <circle cx="13" cy="9" r="0.9" fill="#7ee0ff"/>
      </svg>`;
    case 'listening':
    default:
      return `<span class="bot-audio-eq-wave" aria-label="Đang nghe">
        <span></span><span></span><span></span>
      </span>`;
  }
}

function renderBotStatus(data) {
  const bot = data.bot || data.discord || {};
  const music = data.music || data.stats || data;
  const lavalink = data.lavalink || data.lavalinkStats || {};
  const nodes = lavalink.nodes || [];
  const status = bot.status || 'offline';
  const onlineNodes = Number.isFinite(Number(lavalink.onlineCount))
    ? Number(lavalink.onlineCount)
    : Number.isFinite(Number(lavalink.nodesOnline))
      ? Number(lavalink.nodesOnline)
      : nodes.filter(node => node.online !== false).length;
  const lavalinkText = onlineNodes > 0
    ? `Đang chạy: ${onlineNodes} node・Online`
    : 'Đang chạy: 0 node・Offline';

  const botAvatar = bot.avatar || bot.avatarUrl || data.avatar;
  const botName = bot.name || bot.username || data.botName;
  const serverCount = music.servers ?? music.serverCount ?? music.guilds ?? data.servers;
  const ping = music.ping ?? music.latency ?? data.ping;
  const runtime = music.runtime || music.uptime || data.runtime;
  const playingTracks = Array.isArray(music.playingTracks) ? music.playingTracks : [];
  if (botPage.avatar && botAvatar) botPage.avatar.src = botAvatar;
  if (botPage.banner) {
    const bannerUrl = bot.banner || data.banner || './data/bot-banner.jpg?v=plana-arona-face-v4';
    if (botPage.banner.getAttribute('src') !== bannerUrl) {
      botPage.banner.src = bannerUrl;
    }
  }
  setBotStatusDot(status);
  setText(botPage.statusText, `${status.toUpperCase()}${bot.tag ? ` • ${bot.tag}` : ''}`);
  setText(botPage.name, botName || 'Plana_music');

  const activityType = getBotActivityType(bot.customStatus, playingTracks);
  if (botPage.activityIcon) {
    botPage.activityIcon.className = `bot-activity-icon type-${activityType}`;
    botPage.activityIcon.innerHTML = getActivityIconHtml(activityType);
  }

  if (botPage.customStatus) {
    if (playingTracks.length > 1) {
      const latest = playingTracks[playingTracks.length - 1];
      const others = playingTracks.length - 1;
      const tooltip = playingTracks
        .map(track => `• ${track.guildName}: ${track.title}`)
        .join('\n');
      const badge = document.createElement('span');
      badge.className = 'bot-badge';
      badge.style.cssText = 'font-size:0.78em;opacity:0.85;background:rgba(255,255,255,0.15);padding:2px 6px;border-radius:4px;margin-left:4px;';
      badge.textContent = `(+${others} phòng khác)`;
      botPage.customStatus.replaceChildren(document.createTextNode(`${latest.title} `), badge);
      botPage.customStatus.setAttribute('title', tooltip);
    } else if (playingTracks.length === 1) {
      botPage.customStatus.textContent = playingTracks[0].title;
      botPage.customStatus.removeAttribute('title');
    } else {
      setText(botPage.customStatus, bot.customStatus || 'Không có custom status');
      botPage.customStatus.removeAttribute('title');
    }
  }
  setText(botPage.ping, `${ping ?? '--'}ms`);
  if (botPage.ping && Number.isFinite(Number(ping))) {
    const numPing = Number(ping);
    if (numPing < 150) {
      botPage.ping.style.color = '#00e5ff';
    } else if (numPing < 300) {
      botPage.ping.style.color = '#ffd166';
    } else {
      botPage.ping.style.color = '#ff6b9d';
    }
  }
  setText(botPage.servers, serverCount ?? '--');
  setText(botPage.playing, `${music.playingRooms ?? '--'} phòng`);
  setText(botPage.connected, `${music.connectedRooms ?? '--'} phòng`);
  setText(botPage.runtime, runtime || '--');

  if (botPage.lavalink) {
    botPage.lavalink.textContent = lavalinkText;
    if (onlineNodes > 0) {
      botPage.lavalink.classList.add('lavalink-online');
      botPage.lavalink.classList.remove('lavalink-offline');
    } else {
      botPage.lavalink.classList.add('lavalink-offline');
      botPage.lavalink.classList.remove('lavalink-online');
    }
  }

  setText(botPage.updatedAt, formatUpdatedAt(data.updatedAt));

  if (botPage.invite && bot.inviteUrl) {
    botPage.invite.href = bot.inviteUrl;
    botPage.invite.classList.remove('disabled');
  }
}

function renderBotStatusError() {
  setBotStatusDot('offline');
  setText(botPage.statusText, 'ĐANG CHỜ • Public status chưa sẵn sàng');
  if (botPage.activityIcon) {
    botPage.activityIcon.className = 'bot-activity-icon type-custom';
    botPage.activityIcon.innerHTML = getActivityIconHtml('custom');
  }
  setText(botPage.customStatus, 'Bot đang khởi động hoặc chưa mở public status');
  setText(botPage.updatedAt, 'Sẽ tự động thử lại sau ít phút');
}

async function requestBotStatus(endpoint) {
  const response = await fetch(endpoint, { cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Status ${response.status}`);
  const data = await response.json();
  if (!data.ok) throw new Error(data.message || 'Bot API not ready');
  activeBotStatusApi = endpoint;
  return data;
}

let botStatusRequestPending = false;
async function fetchBotStatus() {
  if (document.hidden || botStatusRequestPending) return;
  botStatusRequestPending = true;
  try {
    const endpoints = activeBotStatusApi
      ? [activeBotStatusApi, ...BOT_STATUS_ENDPOINTS.filter(endpoint => endpoint !== activeBotStatusApi)]
      : BOT_STATUS_ENDPOINTS;
    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        const data = await requestBotStatus(endpoint);
        renderBotStatus(data);
        return;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error('No bot API endpoint responded');
  } catch (error) {
    console.warn('Bot status fetch failed:', error);
    renderBotStatusError();
  } finally {
    botStatusRequestPending = false;
  }
}

function startBotStatusPolling() {
  fetchBotStatus();
  clearInterval(botStatusTimer);
  botStatusTimer = setInterval(fetchBotStatus, BOT_STATUS_REFRESH_MS);
}

function stopBotStatusPolling() {
  clearInterval(botStatusTimer);
  botStatusTimer = null;
}

function showBotPage() {
  showInnerPage(botPage.page, startBotStatusPolling);
}

function hideBotPage() {
  stopBotStatusPolling();
  hideInnerPage(botPage.page);
}

if (colorTool.open) colorTool.open.addEventListener('click', (event) => { event.preventDefault(); showColorPage(); });
if (colorTool.back) colorTool.back.addEventListener('click', hideColorPage);
if (botPage.open) botPage.open.addEventListener('click', (event) => { event.preventDefault(); showBotPage(); });
if (botPage.back) botPage.back.addEventListener('click', hideBotPage);
['input', 'change'].forEach((type) => {
  ['text', 'effect', 'font', 'size', 'c1', 'c2', 'c3', 'bold', 'italic', 'word'].forEach((key) => {
    colorTool[key]?.addEventListener(type, buildUnityRichText);
  });
});
colorTool.copy?.addEventListener('click', async () => {
  await navigator.clipboard.writeText(colorTool.output.value);
  colorTool.copy.textContent = 'Đã copy!';
  setTimeout(() => { colorTool.copy.textContent = 'Copy Unity Rich Text'; }, 1200);
});
buildUnityRichText();

if (window.location.search) {
  try {
    window.history.replaceState(null, '', window.location.pathname || '/');
  } catch (e) {}
}

const interactiveCard = document.querySelector('.profile-console');
const pointerGlow = document.getElementById('pointer-glow');
let activeTiltTarget = null;
let cachedCardRect = null;
let tiltTicking = false;
let pendingPointerEvent = null;

function getTiltTarget() {
  if (!interactiveCard) return null;
  if (activeInnerPage && !activeInnerPage.classList.contains('hidden')) return activeInnerPage;
  return interactiveCard;
}

function updateCardPointer(event) {
  if (event.pointerType === 'touch' || window.innerWidth <= 880 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const target = getTiltTarget();
  if (!target) return;
  if (activeTiltTarget && activeTiltTarget !== target) resetCardPointer();
  activeTiltTarget = target;
  if (!cachedCardRect) {
    cachedCardRect = target.getBoundingClientRect();
  }
  const rect = cachedCardRect;
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const px = Math.max(0, Math.min(1, x / rect.width));
  const py = Math.max(0, Math.min(1, y / rect.height));
  const tiltY = (px - 0.5) * 2.2;
  const tiltX = (0.5 - py) * 2.2;
  target.style.setProperty('--glow-x', `${(px * 100).toFixed(1)}%`);
  target.style.setProperty('--glow-y', `${(py * 100).toFixed(1)}%`);
  target.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
  target.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
  target.classList.add('interactive-hover');
}

function resetCardPointer() {
  const target = activeTiltTarget || interactiveCard;
  cachedCardRect = null;
  if (!target) return;
  target.classList.remove('interactive-hover');
  target.style.setProperty('--tilt-x', '0deg');
  target.style.setProperty('--tilt-y', '0deg');
  activeTiltTarget = null;
}

window.addEventListener('resize', () => { cachedCardRect = null; }, { passive: true });
window.addEventListener('scroll', () => { cachedCardRect = null; }, { passive: true });

function spawnCardRipple() {}
function spawnPageRipple() {}

if (interactiveCard) {
  document.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch' || window.innerWidth <= 880) return;
    const target = getTiltTarget();
    if (!target || !target.contains(event.target)) {
      if (activeTiltTarget) resetCardPointer();
      return;
    }
    pendingPointerEvent = event;
    if (!tiltTicking) {
      tiltTicking = true;
      requestAnimationFrame(() => {
        if (pendingPointerEvent) {
          updateCardPointer(pendingPointerEvent);
        }
        tiltTicking = false;
      });
    }
  }, { passive: true });

  document.addEventListener('pointerover', (event) => {
    if (event.pointerType === 'touch' || window.innerWidth <= 880) return;
    const target = getTiltTarget();
    if (target && target.contains(event.target)) {
      activeTiltTarget = target;
      cachedCardRect = target.getBoundingClientRect();
    }
  }, { passive: true });

  document.addEventListener('pointerout', (event) => {
    if (event.pointerType === 'touch' || window.innerWidth <= 880) return;
    const target = activeTiltTarget;
    if (target && !target.contains(event.relatedTarget)) resetCardPointer();
  }, { passive: true });
}

// Panel Toggle (Collapse / Expand right widgets panel & Mobile Bottom Sheet)
const panelToggleBtn = document.getElementById('panelToggleBtn');
const rightPanelContainer = document.getElementById('rightPanelContainer');
const mobilePanelBackdrop = document.getElementById('mobilePanelBackdrop');
const closeMobilePanelBtn = document.getElementById('closeMobilePanelBtn');

function syncPanelPlacement() {
  const isMobile = window.innerWidth <= 880;
  if (!interactiveCard || !profileScreen || !rightPanelContainer) return;

  if (isMobile) {
    if (rightPanelContainer.parentElement !== profileScreen) {
      profileScreen.appendChild(rightPanelContainer);
    }
  } else {
    if (rightPanelContainer.parentElement !== interactiveCard) {
      interactiveCard.appendChild(rightPanelContainer);
    }
  }
}

window.addEventListener('resize', () => {
  syncPanelPlacement();
  if (window.innerWidth > 880) {
    document.body.classList.remove('mobile-panel-open');
    mobilePanelBackdrop?.classList.remove('active');
  }
});
syncPanelPlacement();

function setPanelState(collapsed) {
  if (!rightPanelContainer) return;
  syncPanelPlacement();
  rightPanelContainer.classList.toggle('collapsed', collapsed);
  interactiveCard?.classList.toggle('collapsed', collapsed);
  panelToggleBtn?.classList.toggle('is-collapsed', collapsed);
  mobilePanelBackdrop?.classList.toggle('active', !collapsed);

  if (collapsed) {
    panelToggleBtn?.setAttribute('title', 'Mở rộng bảng');
    panelToggleBtn?.setAttribute('aria-label', 'Mở rộng bảng');
    document.body.classList.remove('mobile-panel-open');
  } else {
    panelToggleBtn?.setAttribute('title', 'Thu gọn bảng');
    panelToggleBtn?.setAttribute('aria-label', 'Thu gọn bảng');
    if (window.innerWidth <= 880) {
      document.body.classList.add('mobile-panel-open');
    }
  }
}

if (panelToggleBtn && rightPanelContainer) {
  panelToggleBtn.addEventListener('click', () => {
    const isCurrentlyCollapsed = rightPanelContainer.classList.contains('collapsed');
    setPanelState(!isCurrentlyCollapsed);
  });
}

if (closeMobilePanelBtn) {
  closeMobilePanelBtn.addEventListener('click', () => {
    setPanelState(true);
  });
}

if (mobilePanelBackdrop) {
  mobilePanelBackdrop.addEventListener('click', () => {
    setPanelState(true);
  });
}

// ESC key closes panel if open
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && rightPanelContainer && !rightPanelContainer.classList.contains('collapsed')) {
    setPanelState(true);
  }
});

// Mobile drag handle swipe down to close
const dragHandle = document.querySelector('.mobile-drag-handle');
const mobileHeader = document.querySelector('.mobile-panel-header');
let touchStartY = 0;
let touchDiffY = 0;
let dragTicking = false;

[dragHandle, mobileHeader].forEach((el) => {
  if (!el) return;
  el.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    if (window.innerWidth > 880) return;
    touchStartY = e.touches[0].clientY;
    touchDiffY = 0;
    if (rightPanelContainer) {
      rightPanelContainer.style.transition = 'none';
    }
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 1) return;
    if (window.innerWidth > 880 || !rightPanelContainer) return;
    const currentY = e.touches[0].clientY;
    touchDiffY = currentY - touchStartY;
    if (touchDiffY > 0 && !dragTicking) {
      dragTicking = true;
      requestAnimationFrame(() => {
        if (rightPanelContainer && touchDiffY > 0) {
          rightPanelContainer.style.transform = `translate3d(0, ${touchDiffY}px, 0)`;
        }
        dragTicking = false;
      });
    }
  }, { passive: true });

  el.addEventListener('touchend', () => {
    if (window.innerWidth > 880 || !rightPanelContainer) return;
    rightPanelContainer.style.transition = '';
    rightPanelContainer.style.transform = '';
    if (touchDiffY > 60) {
      setPanelState(true);
    }
    touchStartY = 0;
    touchDiffY = 0;
  }, { passive: true });
});

// Navigation Tabs Switching
const navTabBtns = document.querySelectorAll('.nav-tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
let tabRefreshTimer = null;

navTabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');
    if (!targetTab) return;
    if (btn.classList.contains('active')) return;
    clearTimeout(tabRefreshTimer);
    stopBotStatusPolling();

    navTabBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tabContents.forEach((c) => c.classList.remove('active'));

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const targetContent = document.getElementById(`tab-${targetTab}`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
    // Let the incoming panel paint before rebuilding content or polling APIs.
    tabRefreshTimer = setTimeout(() => {
      if (!btn.classList.contains('active')) return;
      if (targetTab === 'colorizer') buildUnityRichText();
      else if (targetTab === 'bot') startBotStatusPolling();
    }, 180);
  });
});

/* ==========================================================================
   WALLPAPER ROTATION SYSTEM (Takeshi.dev Mechanism + Web Animations API)
   ========================================================================== */
const landscapeWallpapers = [
  './data/background/landscape/3c4437837b9ee6b047aff16f23f8241c.jpg',
  './data/background/landscape/56b181f305d9fd57e81178d8ea954d6e.jpg',
  './data/background/landscape/79cbfaa6f95d927e382cbf617609ce96.jpg',
  './data/background/landscape/9357dbe9768f763c96fbd9248e12b6d9.jpg',
  './data/background/landscape/97da8aa7d42c3d86205425a8b5361cff.jpg',
  './data/background/landscape/b8eaa7ff0b8584cec6381a77de745889.jpg',
  './data/background/landscape/f382af55004fd67edf889a487b74f734.jpg',
  './data/background/landscape/bg-kivotos-pc.jpg'
];

const mobileWallpapers = [
  './data/background/mobile/5a139fa75e904df67368aee242d0a28b.jpg',
  './data/background/mobile/5c0a8e639369e16fc50033249a15f989.jpg',
  './data/background/mobile/e9be2f2444c4cf92d39c16a57bb44af2.jpg',
  './data/background/mobile/ef06f84b94f9ecc4f9d4123c95ac2dac.jpg',
  './data/background/mobile/f8dffd41910069298a1b44e8758f7d0c.jpg',
  './data/background/mobile/bg-kivotos-mobile.jpg'
];

const backgroundMobileMql = window.matchMedia('(max-width: 760px)');
const backgroundPortraitMql = window.matchMedia('(orientation: portrait)');
const backgroundReducedMotionMql = window.matchMedia('(prefers-reduced-motion: reduce)');

function isMobileWallpaperMode() {
  return Boolean(backgroundMobileMql.matches || backgroundPortraitMql.matches);
}

let currentWallpaperIndex = -1;
let currentWallpaperPoolIsMobile = isMobileWallpaperMode();
let wallpaperRotateTimer = null;
let wallpaperPreload = null;
let backgroundBusy = false;
let wallpaperViewportVersion = 0;
let wallpaperViewportPending = false;

function prepareBackgroundImage(url) {
  if (wallpaperPreload?.url === url) return wallpaperPreload.ready;
  const img = new Image();
  const ready = new Promise((resolve) => {
    img.onload = async () => {
      try {
        if (typeof img.decode === 'function') await img.decode();
        resolve(img);
      } catch (_) { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
  wallpaperPreload = { url, ready };
  return ready;
}

async function triggerWallpaperRotation(force = false) {
  if (backgroundBusy || (document.hidden && !force)) return;
  if (!force && !profileScreen.classList.contains('active')) return;
  const isMobile = isMobileWallpaperMode();
  const pool = isMobile ? mobileWallpapers : landscapeWallpapers;
  if (!pool?.length) return;
  const version = wallpaperViewportVersion;
  const firstIndex = (currentWallpaperIndex + 1) % pool.length;
  const backgroundNextEl = document.getElementById('background-next');
  backgroundBusy = true;
  let transition = null;
  try {
    for (let offset = 0; offset < pool.length; offset += 1) {
      const index = (firstIndex + offset) % pool.length;
      const image = await prepareBackgroundImage(pool[index]);
      if (version !== wallpaperViewportVersion) return;
      if (document.hidden && !force) return;
      if (!image) continue;
      const bgCssValue = `url('${pool[index]}')`;
      if (backgroundNextEl && !backgroundReducedMotionMql.matches) {
        backgroundNextEl.style.backgroundImage = `var(--background-shade), ${bgCssValue}`;
        // Animate only the reveal mask, never the image's width or scale.
        transition = backgroundNextEl.animate([
          { opacity: 1, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
        ], { duration: 1400, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
        await transition.finished;
      }
      if (version !== wallpaperViewportVersion) return;
      document.body.style.setProperty('--background-current', bgCssValue);
      currentWallpaperIndex = index;
      if (!document.hidden) void prepareBackgroundImage(pool[(index + 1) % pool.length]);
      return;
    }
  } catch (error) {
    console.warn('Wallpaper transition error:', error);
  } finally {
    transition?.cancel();
    backgroundBusy = false;
    if (wallpaperViewportPending) {
      wallpaperViewportPending = false;
      void triggerWallpaperRotation(true);
    }
  }
}

function initWallpaperRotation() {
  if (wallpaperRotateTimer) clearInterval(wallpaperRotateTimer);
  wallpaperRotateTimer = setInterval(() => {
    triggerWallpaperRotation(false);
  }, 10000);

  setTimeout(() => {
    triggerWallpaperRotation(false);
  }, 5000);

  const onViewportOrOrientationChange = () => {
    const isMobile = isMobileWallpaperMode();
    if (isMobile !== currentWallpaperPoolIsMobile) {
      currentWallpaperPoolIsMobile = isMobile;
      currentWallpaperIndex = -1;
      wallpaperViewportVersion += 1;
      if (backgroundBusy) wallpaperViewportPending = true;
      else void triggerWallpaperRotation(true);
    }
  };

  backgroundMobileMql.addEventListener('change', onViewportOrOrientationChange);
  backgroundPortraitMql.addEventListener('change', onViewportOrOrientationChange);
  const pool = currentWallpaperPoolIsMobile ? mobileWallpapers : landscapeWallpapers;
  if (pool.length) void prepareBackgroundImage(pool[0]);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWallpaperRotation);
} else {
  initWallpaperRotation();
}

// One persistent audio element: navigating panels never recreates the player.
(() => {
  const audio = document.getElementById('site-music');
  if (!audio) return;
  const dock = document.getElementById('music-dock') || document.querySelector('.music-dock');
  const toggle = document.getElementById('music-toggle');
  const playIcon = document.getElementById('music-icon-play');
  const pauseIcon = document.getElementById('music-icon-pause');
  const statusBadge = document.getElementById('music-status-badge');
  const seek = document.getElementById('music-seek');
  const seekFill = document.getElementById('music-seek-fill');
  const elapsed = document.getElementById('music-elapsed');
  const length = document.getElementById('music-length');
  const notice = document.getElementById('music-notice');
  const volInput = document.getElementById('music-volume');
  const volBtn = document.getElementById('music-vol-btn');
  const volIconOn = document.getElementById('music-vol-icon-on');
  const volIconMute = document.getElementById('music-vol-icon-mute');

  let userPaused = false;
  let authenticated = false;
  let resumeMusicOnVisible = false;
  let tracks = [{ src: '/data/music/lovely-picnic.m4a', title: 'Lovely Picnic', artist: 'Blue Archive OST 4', cover: '/data/music/lovely-picnic.webp' }];
  let trackIndex = 0;
  let lastVolume = 0.5;
  let targetMusicVolume = 0.5;
  let musicOperation = 0;
  let fadeFrame = null;
  let finishFade = null;
  const FADE_MS = 1500;
  const GAP_MS = 300;
  let isFadingOutToPause = false;
  let isChangingTrack = false;
  let naturalFadeStarted = false;

  function cancelMusicFade() {
    cancelAnimationFrame(fadeFrame);
    fadeFrame = null;
    if (finishFade) { finishFade(false); finishFade = null; }
  }

  function fadeMusicTo(target, duration = FADE_MS) {
    cancelMusicFade();
    const start = audio.volume;
    if (Math.abs(start - target) < 0.001) {
      audio.volume = target;
      return Promise.resolve(true);
    }
    const started = performance.now();
    const isFadeOut = target < start;

    return new Promise(resolve => {
      finishFade = resolve;
      const tick = now => {
        const elapsed = now - started;
        const progress = Math.min(1, elapsed / duration);

        let currentVol;
        if (isFadeOut) {
          // Smooth logarithmic/power decay for fade out so volume drops to true silence
          const factor = Math.pow(1 - progress, 1.8);
          currentVol = Math.max(0, start * factor);
          if (progress >= 0.95 || currentVol < 0.003) currentVol = 0;
        } else {
          // Smooth fade in
          const factor = 1 - Math.pow(1 - progress, 1.8);
          currentVol = Math.min(target, start + (target - start) * factor);
        }

        audio.volume = Number(currentVol.toFixed(4));

        if (progress < 1) {
          fadeFrame = requestAnimationFrame(tick);
        } else {
          audio.volume = target;
          fadeFrame = null;
          finishFade = null;
          resolve(true);
        }
      };
      fadeFrame = requestAnimationFrame(tick);
    });
  }

  async function pauseWithFade() {
    const operation = ++musicOperation;
    isFadingOutToPause = true;
    syncPlayback();
    const completed = await fadeMusicTo(0, FADE_MS);
    if (completed && operation === musicOperation && userPaused) {
      await new Promise(r => setTimeout(r, 80));
      if (operation === musicOperation && userPaused) {
        audio.pause();
      }
    }
    isFadingOutToPause = false;
    syncPlayback();
  }

  async function refreshPlaylist(randomStart = false) {
    try {
      const response = await fetch('/data/music/playlist.json', { cache: 'no-store' });
      if (!response.ok) return;
      const list = await response.json();
      const valid = list.filter(track => typeof track.src === 'string' && track.src.startsWith('/data/music/'));
      if (!valid.length) return;
      const current = tracks[trackIndex]?.src;
      tracks = valid;
      trackIndex = randomStart
        ? Math.floor(Math.random() * tracks.length)
        : Math.max(0, tracks.findIndex(track => track.src === current));
      if (randomStart) selectTrack();
    } catch (_) {}
  }

  async function changeTrack(offset) {
    if (isChangingTrack) return;
    isChangingTrack = true;
    const operation = ++musicOperation;
    cancelMusicFade();
    if (!audio.paused && !document.hidden && audio.volume > 0) {
      await fadeMusicTo(0, FADE_MS);
      if (operation !== musicOperation) {
        isChangingTrack = false;
        return;
      }
      // Safety buffer (80ms) at volume 0 so hardware audio buffer drains completely before pause
      await new Promise(r => setTimeout(r, 80));
      if (operation !== musicOperation) {
        isChangingTrack = false;
        return;
      }
    }
    await refreshPlaylist();
    if (operation !== musicOperation) {
      isChangingTrack = false;
      return;
    }
    audio.pause();
    audio.volume = 0;
    trackIndex = (trackIndex + offset + tracks.length) % tracks.length;
    selectTrack();
    naturalFadeStarted = false;

    // Nghỉ khi chuyển bài là 0.3s (300ms)
    await new Promise(resolve => setTimeout(resolve, GAP_MS));
    if (operation !== musicOperation) {
      isChangingTrack = false;
      return;
    }

    isChangingTrack = false;
    if (authenticated && !userPaused) void play();
  }

  function selectTrack() {
    const track = tracks[trackIndex];
    audio.src = track.src;
    const titleEl = document.getElementById('music-title');
    const artistEl = document.getElementById('music-artist');
    const coverEl = document.getElementById('music-cover');
    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist || '';
    if (coverEl) coverEl.src = track.cover || '/data/preview.jpg';
    seek.value = '0';
    if (seekFill) seekFill.style.width = '0%';
    elapsed.textContent = '0:00';
    length.textContent = '--:--';
  }

  audio.volume = 0;

  function syncPlayback() {
    const isPlaying = !audio.paused && !isFadingOutToPause && !userPaused;
    if (dock) dock.classList.toggle('playing', isPlaying);
    if (playIcon) playIcon.style.display = isPlaying ? 'none' : 'block';
    if (pauseIcon) pauseIcon.style.display = isPlaying ? 'block' : 'none';
    if (statusBadge) statusBadge.textContent = 'SCHALE AUDIO';
    toggle.setAttribute('aria-label', isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc');
    toggle.setAttribute('aria-pressed', String(isPlaying));
  }

  async function play() {
    if (!authenticated) return;
    if (document.hidden) {
      resumeMusicOnVisible = !userPaused;
      return;
    }
    userPaused = false;
    isFadingOutToPause = false;
    const operation = ++musicOperation;
    cancelMusicFade();
    try {
      await initialMusicPlaylist;
      if (document.hidden || userPaused || operation !== musicOperation) return;
      if (audio.paused) {
        audio.volume = 0;
        await audio.play();
      }
      if (operation !== musicOperation) return;
      notice.hidden = true;
      syncPlayback();
      const goalVol = targetMusicVolume > 0 ? targetMusicVolume : 0.5;
      void fadeMusicTo(goalVol, FADE_MS);
    } catch (error) {
      notice.hidden = false;
      notice.textContent = error.name === 'NotAllowedError'
        ? 'Bấm Play để bật nhạc'
        : 'Chưa phát được nhạc. Bấm Play để thử lại.';
      syncPlayback();
    }
  }

  toggle.addEventListener('click', () => {
    if (audio.paused || userPaused || isFadingOutToPause) {
      userPaused = false;
      void play();
    } else {
      userPaused = true;
      void pauseWithFade();
    }
  });

  document.addEventListener('sensei-authenticate', () => {
    authenticated = true;
    if (!userPaused) void play();
  }, { once: true });

  const prevBtn = document.getElementById('music-prev');
  const nextBtn = document.getElementById('music-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { void changeTrack(-1); });
  if (nextBtn) nextBtn.addEventListener('click', () => { void changeTrack(1); });

  audio.addEventListener('ended', () => { void changeTrack(1); });
  audio.addEventListener('play', syncPlayback);
  audio.addEventListener('playing', () => {
    if (document.hidden) {
      resumeMusicOnVisible = !userPaused;
      audio.pause();
    }
  });

  function suspendMusic() {
    if (authenticated && !userPaused) resumeMusicOnVisible = true;
    ++musicOperation;
    cancelMusicFade();
    if (!audio.paused) {
      resumeMusicOnVisible = !userPaused;
      audio.pause();
    }
    audio.volume = 0;
    clearSystemMedia();
  }

  function clearSystemMedia() {
    if (!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = 'none';
    } catch (_) {}
  }
  clearSystemMedia();
  audio.addEventListener('pause', clearSystemMedia);

  function resumeMusic() {
    if (!document.hidden && resumeMusicOnVisible && authenticated && !userPaused) {
      resumeMusicOnVisible = false;
      void play();
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) suspendMusic();
    else resumeMusic();
  });
  window.addEventListener('pagehide', suspendMusic);
  window.addEventListener('pageshow', resumeMusic);
  audio.addEventListener('pause', syncPlayback);

  // Volume & Mute handling
  function syncVolumeUI() {
    if (volInput) volInput.value = String(targetMusicVolume);
    const isMuted = targetMusicVolume === 0;
    if (volIconOn) volIconOn.style.display = isMuted ? 'none' : 'block';
    if (volIconMute) volIconMute.style.display = isMuted ? 'block' : 'none';
  }

  if (volInput) {
    volInput.addEventListener('input', () => {
      targetMusicVolume = Number(volInput.value);
      if (targetMusicVolume > 0) lastVolume = targetMusicVolume;
      if (!audio.paused && !userPaused) void fadeMusicTo(targetMusicVolume);
      syncVolumeUI();
    });
  }

  if (volBtn) {
    volBtn.addEventListener('click', () => {
      if (targetMusicVolume > 0) {
        lastVolume = targetMusicVolume;
        targetMusicVolume = 0;
      } else {
        targetMusicVolume = lastVolume > 0 ? lastVolume : 0.5;
      }
      if (!audio.paused && !userPaused) void fadeMusicTo(targetMusicVolume);
      syncVolumeUI();
    });
  }

  audio.addEventListener('volumechange', syncVolumeUI);

  const time = value => Number.isFinite(value) ? `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}` : '--:--';

  function syncTime() {
    if (audio.duration && !audio.paused && !userPaused && !isChangingTrack && !isFadingOutToPause) {
      const remaining = audio.duration - audio.currentTime;
      if (remaining <= 1.5 && remaining > 0 && !naturalFadeStarted) {
        naturalFadeStarted = true;
        void fadeMusicTo(0, Math.max(200, remaining * 1000));
      } else if (remaining > 1.6) {
        naturalFadeStarted = false;
      }
    }
    if (document.hidden) return;
    const profScreen = document.getElementById('profile-screen');
    if (profScreen && !profScreen.classList.contains('active')) return;
    elapsed.textContent = time(audio.currentTime);
    length.textContent = time(audio.duration);
    const pct = Number.isFinite(audio.duration) && audio.duration > 0 ? (audio.currentTime / audio.duration * 100) : 0;
    seek.value = String(pct);
    if (seekFill) seekFill.style.width = `${pct}%`;
  }

  seek.addEventListener('input', () => {
    if (Number.isFinite(audio.duration)) {
      const pct = Number(seek.value);
      audio.currentTime = pct / 100 * audio.duration;
      if (seekFill) seekFill.style.width = `${pct}%`;
    }
  });

  audio.addEventListener('timeupdate', syncTime);
  audio.addEventListener('loadedmetadata', syncTime);
  const initialMusicPlaylist = refreshPlaylist(true);
})();
