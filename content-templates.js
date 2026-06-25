const SVG_ICONS = {
  wrench:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  shield:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  zap: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  msgSquare:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  trendUp:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  palette:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="0.5"/><circle cx="17.5" cy="10.5" r="0.5"/><circle cx="8.5" cy="7.5" r="0.5"/><circle cx="6.5" cy="12" r="0.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  box: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  search:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  bell: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  moon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  mic: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  refresh:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
  headphones:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
  sparkles:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
  sidePanel:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
  logout:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  openai:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.372L15.115 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.403-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>',
  clock:
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:3px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
};
const PROMPT_TEMPLATES = [
  {
    icon: SVG_ICONS.wrench,
    label: t("prompt.bugs.label"),
    prompt: t("prompt.bugs.text"),
  },
  {
    icon: SVG_ICONS.edit,
    label: t("prompt.refactor.label"),
    prompt: t("prompt.refactor.text"),
  },
  {
    icon: SVG_ICONS.shield,
    label: t("prompt.errors.label"),
    prompt: t("prompt.errors.text"),
  },
  {
    icon: SVG_ICONS.zap,
    label: t("prompt.optimize.label"),
    prompt: t("prompt.optimize.text"),
  },
  {
    icon: SVG_ICONS.msgSquare,
    label: t("prompt.comments.label"),
    prompt: t("prompt.comments.text"),
  },
  {
    icon: SVG_ICONS.trendUp,
    label: t("prompt.seo.label"),
    prompt: t("prompt.seo.text"),
  },
  {
    icon: SVG_ICONS.palette,
    label: t("prompt.ui.label"),
    prompt: t("prompt.ui.text"),
  },
  {
    icon: SVG_ICONS.box,
    label: t("prompt.components.label"),
    prompt: t("prompt.components.text"),
  },
  {
    icon: SVG_ICONS.search,
    label: t("prompt.review.label"),
    prompt: t("prompt.review.text"),
  },
];
function templateLicenseGate(param19) {
  return (
    '<div id="ql-header"><div class="ql-header-left"><span class="ql-dot"></span><img class="ql-title-logo" src="' +
    chrome.runtime.getURL("assets/logo-master-lovable-square.png") +
    '" alt=""><span class="ql-title">Lovable</span></div><div class="ql-header-right"><span class="ql-badge">v3.0</span>' +
    langSw() +
    '<button id="ql-minimize" class="ql-minimize-btn">' +
    (param19 ? "□" : "−") +
    '</button></div></div><div id="ql-body"><div class="ql-license-gate"><div class="ql-lock-icon"><img src="' +
    chrome.runtime.getURL("assets/logo-master-lovable-square.png") +
    '" alt="Lovable" style="width:56px;height:56px;border-radius:12px;"></div><p class="ql-gate-title" data-i18n="license.title">' +
    t("license.title") +
    '</p><p class="ql-gate-desc" data-i18n="license.desc">' +
    t("license.desc") +
    '</p><div class="ql-field"><input id="ql-license-input" placeholder="XXXX-XXXX-XXXX-XXXX" spellcheck="false"></div><button id="ql-validate-btn" data-i18n="license.validate">' +
    t("license.validate") +
    '</button><div id="ql-license-log"></div></div></div><div id="ql-resize-handle" class="ql-resize-handle"></div>'
  );
}
function templateMainUI(param20, param21, param22) {
  return (
    '<div id="ql-header"><div class="ql-header-left"><span class="ql-brand"><img class="ql-brand-logo" src="' +
    chrome.runtime.getURL("assets/logo-master-lovable-square.png") +
    '" alt=""><span>Lovable</span></span><span class="ql-badge-pro-header">PRO</span></div><div class="ql-header-right">' +
    langSw() +
    '<button class="ql-icon-btn ql-notif-btn" data-i18n-title="header.notifications" title="' +
    t("header.notifications") +
    '">' +
    SVG_ICONS.bell +
    '<span class="ql-notif-badge" style="display:none">0</span></button><button id="ql-sidepanel-btn" class="ql-icon-btn" data-i18n-title="header.sidepanel" title="' +
    t("header.sidepanel") +
    '">' +
    SVG_ICONS.sidePanel +
    '</button><button class="ql-icon-btn" data-i18n-title="header.theme" title="' +
    t("header.theme") +
    '">' +
    SVG_ICONS.moon +
    '</button><button id="ql-logout-btn" class="ql-icon-btn" data-i18n-title="header.logout" title="' +
    t("header.logout") +
    '">' +
    SVG_ICONS.logout +
    '</button><button id="ql-minimize" class="ql-icon-btn">' +
    (param22 ? "□" : "−") +
    '</button></div></div><div id="ql-body"><div id="ql-update-banner" style="display:none"></div><div class="ql-profile-card"><div class="ql-profile-top"><div class="ql-profile-info"><span class="ql-profile-name">' +
    escapeHtml(param20) +
    "</span>" +
    param21 +
    '</div></div><div id="ql-sync-status" class="ql-sync-status ql-sync-waiting"><span class="ql-sync-text" data-i18n="sync.waiting">' +
    SVG_ICONS.clock +
    t("sync.waiting") +
    '</span></div><div id="ql-trial-countdown" class="ql-trial-countdown" style="display:none"></div></div><div id="ql-reseller-btn" style="display:none;margin-bottom:14px"><a href="https://lovable.dev" target="_blank" style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;border:1px solid rgba(124,90,255,0.3);background:rgba(124,90,255,0.06);color:var(--ql-accent,#7c5aff);text-decoration:none;font-size:12px;font-weight:700;transition:all 0.2s">🌐 Official Site<span style="margin-left:auto;font-size:10px;opacity:0.6">→</span></a></div><div class="ql-tabs" id="ql-tabs"><button class="ql-tab ql-tab-active" data-tab="prompt" data-i18n="tab.prompt">' +
    t("tab.prompt") +
    '</button><button class="ql-tab" data-tab="history" data-i18n="tab.history">' +
    t("tab.history") +
    ' <span class="ql-tab-badge" id="ql-history-badge" style="display:none">0</span></button></div><div id="ql-tab-content"><textarea id="ql-msg" rows="3" data-i18n-placeholder="prompt.placeholder" placeholder="' +
    t("prompt.placeholder") +
    '" spellcheck="false"></textarea><div id="ql-attach-preview" class="ql-attach-preview" style="display:none"></div><div class="ql-action-bar"><div class="ql-action-left"><label class="ql-toggle"><input type="checkbox" id="ql-modo-plano"><span class="ql-toggle-slider"></span></label><span class="ql-toggle-label-inline" data-i18n="toggle.licenseMode">' +
    t("toggle.licenseMode") +
    '</span></div><div class="ql-action-center"><button id="ql-attach-btn" class="ql-attach-btn" data-i18n-title="btn.attach" title="' +
    t("btn.attach") +
    '">📎</button><button id="ql-optimize-btn" class="ql-tool-btn" data-i18n-title="btn.optimize" title="' +
    t("btn.optimize") +
    '">' +
    SVG_ICONS.openai +
    '</button><button id="ql-speech-btn" class="ql-tool-btn" data-i18n-title="btn.speech" title="' +
    t("btn.speech") +
    '">' +
    SVG_ICONS.mic +
    '</button></div><div class="ql-action-right-send"><button id="ql-send" class="ql-send-btn" data-i18n="btn.send">' +
    t("btn.send") +
    '</button></div></div><input type="file" id="ql-file-input" multiple style="display:none" accept="*/*"><div id="ql-log"></div><div class="ql-shortcuts-section"><span class="ql-shortcuts-title" data-i18n="shortcuts.title">' +
    t("shortcuts.title") +
    '</span><div class="ql-shortcuts-grid" id="ql-chips"></div></div><button id="ql-remove-watermark" class="ql-watermark-btn" data-i18n="btn.watermark">' +
    t("btn.watermark") +
    '</button><button id="ql-shield-btn" class="ql-shield-btn"><span id="ql-shield-label" data-i18n="btn.shield.on">' +
    t("btn.shield.on") +
    '</span></button><button id="ql-native-chat-btn" class="ql-native-chat-btn">' +
    t("btn.nativeChat") +
    '</button><button id="ql-security-scan" class="ql-watermark-btn" style="background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.08));border-color:rgba(245,158,11,0.3);color:#fbbf24;margin-top:6px" data-i18n="btn.security">' +
    t("btn.security") +
    '</button><button id="ql-download-project" class="ql-watermark-btn" style="background:linear-gradient(135deg,rgba(59,130,246,0.12),rgba(37,99,235,0.08));border-color:rgba(59,130,246,0.3);color:#60a5fa;margin-top:6px" data-i18n="btn.download">' +
    t("btn.download") +
    '</button><div id="ql-download-status" style="display:none"></div></div><div id="ql-footer" class="ql-footer"><div class="ql-footer-row"><span class="ql-footer-version">Lovable • v3.0</span><div id="ql-social-links" class="ql-social-links"></div></div></div><div id="ql-resize-handle" class="ql-resize-handle"></div><div id="ql-notif-panel" class="ql-notif-panel" style="display:none"><div class="ql-notif-header"><span data-i18n="notif.title">' +
    t("notif.title") +
    '</span><button id="ql-notif-close" class="ql-notif-close-btn">✕</button></div><div id="ql-notif-list" class="ql-notif-list"><p class="ql-notif-empty" data-i18n="notif.loading">' +
    t("notif.loading") +
    '</p></div></div><div id="ql-custom-alert" class="ql-custom-alert" style="display:none"><div class="ql-alert-content"><div class="ql-alert-icon">✅</div><div class="ql-alert-title" data-i18n="alert.success">' +
    t("alert.success") +
    '</div><div class="ql-alert-message"></div><button class="ql-alert-ok-btn" data-i18n="btn.ok">' +
    t("btn.ok") +
    "</button></div></div>"
  );
}
function templateExpiredOverlay() {
  return (
    '<div class="ql-sweetalert-box"><div class="ql-sweetalert-icon" style="color:#ef4444;font-size:52px;line-height:1;">✕</div><h2 class="ql-sweetalert-title" data-i18n="expired.title">' +
    t("expired.title") +
    '</h2><p class="ql-sweetalert-text" data-i18n="expired.text">' +
    t("expired.text") +
    '</p><div class="ql-sweetalert-actions"><button class="ql-sweetalert-btn ql-sweetalert-btn-secondary" id="ql-sweetalert-close" data-i18n="expired.close">' +
    t("expired.close") +
    "</button></div></div>"
  );
}

function templateSecurityModal() {
  return (
    '<div id="security-modal" class="security-modal" hidden role="dialog" aria-modal="true" aria-labelledby="security-modal-title">' +
    '  <div class="security-modal-backdrop" id="security-backdrop"></div>' +
    '  <div class="security-modal-box">' +
    '    <header class="security-modal-header">' +
    '      <div class="security-modal-title-wrap">' +
    '        <span class="security-modal-icon">' +
    '          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
    '            <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z"/>' +
    '          </svg>' +
    '        </span>' +
    '        <h3 class="security-modal-title" id="security-modal-title">Security Analysis</h3>' +
    '      </div>' +
    '      <button id="security-modal-close" type="button" class="security-modal-close" aria-label="Close">✕</button>' +
    '    </header>' +
    '    <div class="security-summary" id="security-summary" style="display:none"></div>' +
    '    <div class="security-actions">' +
    '      <button id="security-rescan" type="button" class="security-rescan-btn">' +
    '        <span class="security-rescan-icon">' +
    '          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
    '            <polyline points="23 4 23 10 17 10" />' +
    '            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />' +
    '          </svg>' +
    '        </span>' +
    '        <span class="security-rescan-text">Scan again now</span>' +
    '        <span class="security-rescan-spinner" style="display:none"></span>' +
    '      </button>' +
    '      <button id="security-fix-all" type="button" class="security-fixall-btn" style="display:none">' +
    '        <span class="security-fixall-icon">' +
    '          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
    '            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' +
    '          </svg>' +
    '        </span>' +
    '        <span class="security-fixall-text">Fix All</span>' +
    '        <span class="security-fixall-spinner" style="display:none"></span>' +
    '      </button>' +
    '    </div>' +
    '    <div class="security-body" id="security-body"></div>' +
    '  </div>' +
    '</div>'
  );
}
