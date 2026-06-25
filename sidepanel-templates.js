function spEscapeHtml(param198) {
  if (!param198) {
    return "";
  }
  const value414 = document.createElement("div");
  value414.textContent = String(param198);
  return value414.innerHTML;
}
const SP_SVG = {
  sparkles:
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
  mic: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  wrench:
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  edit: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  shield:
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  zap: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  msgSq:
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  trendUp:
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  palette:
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="0.5"/><circle cx="17.5" cy="10.5" r="0.5"/><circle cx="8.5" cy="7.5" r="0.5"/><circle cx="6.5" cy="12" r="0.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  box: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
  search:
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  openai:
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.372L15.115 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.403-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>',
  clock:
    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:3px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
};
const SP_TEMPLATES = [
  {
    icon: SP_SVG.wrench,
    label: t("prompt.bugs.label"),
    prompt: t("prompt.bugs.text"),
  },
  {
    icon: SP_SVG.edit,
    label: t("prompt.refactor.label"),
    prompt: t("prompt.refactor.text"),
  },
  {
    icon: SP_SVG.shield,
    label: t("prompt.errors.label"),
    prompt: t("prompt.errors.text"),
  },
  {
    icon: SP_SVG.zap,
    label: t("prompt.optimize.label"),
    prompt: t("prompt.optimize.text"),
  },
  {
    icon: SP_SVG.msgSq,
    label: t("prompt.comments.label"),
    prompt: t("prompt.comments.text"),
  },
  {
    icon: SP_SVG.trendUp,
    label: t("prompt.seo.label"),
    prompt: t("prompt.seo.text"),
  },
  {
    icon: SP_SVG.palette,
    label: t("prompt.ui.label"),
    prompt: t("prompt.ui.text"),
  },
  {
    icon: SP_SVG.box,
    label: t("prompt.components.label"),
    prompt: t("prompt.components.text"),
  },
  {
    icon: SP_SVG.search,
    label: t("prompt.review.label"),
    prompt: t("prompt.review.text"),
  },
];
function spEscapeHtml(param199) {
  if (!param199) {
    return "";
  }
  const value415 = document.createElement("div");
  value415.textContent = String(param199);
  return value415.innerHTML;
}
function spSanitizeUrl(param200) {
  if (!param200) {
    return "";
  }
  try {
    const value416 = new URL(param200);
    if (value416.protocol === "http:" || value416.protocol === "https:") {
      return param200;
    } else {
      return "";
    }
  } catch (error61) {
    return "";
  }
}
function spTemplateLicenseGate() {
  return (
    '<div class="sp-license-gate"><div class="sp-lock-icon"><img src="' +
    chrome.runtime.getURL("assets/logo-master-lovable-square.png") +
    '" alt="Lovable" style="width:56px;height:56px;border-radius:12px;"></div><p class="sp-gate-title" data-i18n="license.title">' +
    t("license.title") +
    '</p><p class="sp-gate-desc" data-i18n="license.desc">' +
    t("license.desc") +
    '</p><input class="sp-input" id="sp-license-input" placeholder="XXXX-XXXX-XXXX-XXXX" spellcheck="false"><button class="sp-btn-primary" id="sp-validate-btn" data-i18n="license.validate">' +
    t("license.validate") +
    '</button><div class="sp-log" id="sp-license-log"></div></div>'
  );
}
function spTemplateMainUI(param201, param202) {
  return (
    '<div id="sp-update-banner" style="display:none"></div><div class="sp-profile-card"><div class="sp-profile-top"><span class="sp-profile-name" id="sp-name">' +
    param201 +
    "</span>" +
    param202 +
    '</div><div class="sp-sync-status" id="sp-sync">' +
    SP_SVG.clock +
    t("sync.waiting") +
    '</div><div class="sp-trial-countdown" id="sp-countdown" style="display:none"></div></div><div id="sp-reseller-btn" style="display:none;margin-bottom:14px"><a href="https://lovable.dev" target="_blank" style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;border:1px solid rgba(124,90,255,0.3);background:rgba(124,90,255,0.06);color:var(--ql-accent);text-decoration:none;font-size:12px;font-weight:700;transition:all 0.2s">🌐 Official Site<span style="margin-left:auto;font-size:10px;opacity:0.6">→</span></a></div><textarea class="sp-textarea" id="sp-msg" rows="3" placeholder="Enter your command..." spellcheck="false"></textarea><div id="sp-attach-preview" class="sp-attach-preview" style="display:none"></div><div class="sp-action-bar"><div class="sp-action-left"><label class="sp-toggle"><input type="checkbox" id="sp-modo-plano"><span class="sp-toggle-slider"></span></label><span class="sp-toggle-label">Plan</span></div><div class="sp-action-center"><button class="sp-attach-btn" id="sp-attach-btn" title="Attach file">📎</button><button class="sp-tool-btn" id="sp-optimize" title="Optimize with AI">' +
    SP_SVG.openai +
    '</button><button class="sp-tool-btn" id="sp-speech" title="Voice">' +
    SP_SVG.mic +
    '</button></div><button class="sp-send-btn" id="sp-send">Send</button></div><input type="file" id="sp-file-input" multiple style="display:none" accept="*/*"><div class="sp-log" id="sp-log"></div><span class="sp-shortcuts-title">QUICK SHORTCUTS</span><div class="sp-shortcuts-grid" id="sp-chips"></div><button id="sp-remove-watermark" class="sp-watermark-btn" data-i18n="btn.watermark">' +
    t("btn.watermark") +
    '</button><div id="sp-download-status" class="sp-log" style="display:none"></div>'
  );
}
function spTemplateStatusBadge(param203) {
  if (String(param203).toLowerCase() === "trial") {
    return '<span class="sp-status-badge sp-badge-test">TEST</span>';
  }
  return '<span class="sp-status-badge sp-badge-pro">PRO</span>';
}
function spTemplateAlert(param204, param205) {
  return (
    '<div class="sp-alert-box"><div class="sp-alert-icon">✅</div><div class="sp-alert-title">' +
    spEscapeHtml(param204) +
    '</div><div class="sp-alert-message">' +
    spEscapeHtml(param205) +
    '</div><button class="sp-alert-ok">OK</button></div>'
  );
}
function spTemplateNotifItem(param206) {
  var value417 =
    "en-US";
  const value418 = new Date(param206.created_at).toLocaleDateString(value417);
  const value419 = spSanitizeUrl(param206.link);
  const value420 = value419
    ? '<a href="' +
      spEscapeHtml(value419) +
      '" target="_blank" rel="noopener noreferrer" class="sp-notif-link">' +
      t("notif.openLink") +
      "</a>"
    : "";
  return (
    '<div class="sp-notif-item"><div class="sp-notif-item-title">' +
    spEscapeHtml(param206.title) +
    '</div><div class="sp-notif-item-msg">' +
    spEscapeHtml(param206.message) +
    "</div>" +
    value420 +
    '<div class="sp-notif-item-date">' +
    value418 +
    "</div></div>"
  );
}
function spTemplateUpdateBanner(param207, param208, param209) {
  return (
    '<div style="padding:10px 12px;background:linear-gradient(135deg,rgba(251,191,36,0.12),rgba(245,158,11,0.08));border:1px solid rgba(251,191,36,0.3);border-radius:10px;margin:8px 0"><div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><span style="font-size:14px">🔔</span><strong style="font-size:11px;color:#f59e0b"><span data-i18n="update.title">' +
    t("update.title") +
    "</span>" +
    spEscapeHtml(param207 || "") +
    '!</strong></div><p style="font-size:10px;color:#a1a1aa;margin:0 0 6px;white-space:pre-line">' +
    spEscapeHtml(param208 || "") +
    "</p>" +
    (param209
      ? '<a href="' +
        spEscapeHtml(param209) +
        '" target="_blank" style="display:inline-block;padding:4px 12px;background:#f59e0b;color:#000;border-radius:6px;text-decoration:none;font-size:10px;font-weight:700"><span data-i18n="update.download">' +
        t("update.download") +
        "</span>" +
        spEscapeHtml(param207 || "") +
        "</a>"
      : "") +
    "</div>"
  );
}
function spTemplateCountdown(param210, param211, param212, param213) {
  return (
    '<div class="sp-countdown-row"><span>' +
    SP_SVG.clock +
    '</span><span class="sp-countdown-label">' +
    param210 +
    '</span><span class="sp-countdown-time">' +
    param211 +
    '</span></div><div class="sp-trial-bar"><div class="sp-trial-bar-fill' +
    param213 +
    '" style="width:' +
    param212 +
    '%"></div></div>'
  );
}
function spTemplateAttachItem(param214, param215) {
  const value421 = param214.previewUrl
    ? '<img class="sp-attach-thumb" src="' + param214.previewUrl + '" alt="">'
    : '<div class="sp-attach-icon">📄</div>';
  return (
    '<div class="sp-attach-item' +
    (param214.uploading ? " sp-attach-uploading" : "") +
    '">' +
    value421 +
    '<div class="sp-attach-info"><span class="sp-attach-name" title="' +
    spEscapeHtml(param214.file_name) +
    '">' +
    spEscapeHtml(param214.file_name) +
    '</span><span class="sp-attach-size">' +
    spEscapeHtml(param214.sizeLabel) +
    '</span></div><button class="sp-attach-remove" data-idx="' +
    param215 +
    '">✕</button></div>'
  );
}
function spFormatFileSize(param216) {
  if (param216 < 1024) {
    return param216 + " B";
  }
  if (param216 < 1048576) {
    return (param216 / 1024).toFixed(1) + " KB";
  }
  return (param216 / 1048576).toFixed(1) + " MB";
}
function spTemplateTabs(param217, param218) {
  var value422 =
    param218 > 0 ? '<span class="sp-tab-badge">' + param218 + "</span>" : "";
  return (
    '<div class="sp-tabs"><button class="sp-tab' +
    (param217 === "prompt" ? " sp-tab-active" : "") +
    '" data-tab="prompt"><span data-i18n="tab.prompt">' +
    t("tab.prompt") +
    '</span></button><button class="sp-tab' +
    (param217 === "history" ? " sp-tab-active" : "") +
    '" data-tab="history"><span data-i18n="tab.history">' +
    t("tab.history") +
    "</span>" +
    (value422 ? " " + value422 : "") +
    "</button></div>"
  );
}
function spTemplateChatEmpty() {
  return (
    '<div class="sp-chat-empty"><div class="sp-chat-empty-icon">💬</div><div class="sp-chat-empty-title" data-i18n="history.empty.title">' +
    t("history.empty.title") +
    '</div><div class="sp-chat-empty-desc" data-i18n="history.empty.desc">' +
    t("history.empty.desc") +
    "</div></div>"
  );
}
function spFormatChatDate(param219) {
  var value423 = new Date(param219);
  var value424 = new Date();
  var value425 = new Date(
    value424.getFullYear(),
    value424.getMonth(),
    value424.getDate(),
  );
  var value426 = new Date(
    value423.getFullYear(),
    value423.getMonth(),
    value423.getDate(),
  );
  var value427 = (value425 - value426) / 86400000;
  if (value427 === 0) {
    return t("date.today");
  }
  if (value427 === 1) {
    return t("date.yesterday");
  }
  var value428 = t("date.days");
  if (value427 < 7 && Array.isArray(value428)) {
    return value428[value423.getDay()];
  }
  var value429 =
    "en-US";
  return value423.toLocaleDateString(value429);
}
function spFormatChatTime(param220) {
  var value430 = new Date(param220);
  return (
    String(value430.getHours()).padStart(2, "0") +
    ":" +
    String(value430.getMinutes()).padStart(2, "0")
  );
}
function spTemplateChatBubble(param221) {
  var value431 =
    param221.status === "error" ? "sp-chat-status-err" : "sp-chat-status-ok";
  var value432 = param221.status === "error" ? t("chat.error") : t("chat.sent");
  var value433 =
    param221.text.length > 300
      ? spEscapeHtml(param221.text.substring(0, 300)) + "…"
      : spEscapeHtml(param221.text);
  return (
    '<div class="sp-chat-bubble" title="' +
    spEscapeHtml(param221.text) +
    '">' +
    value433 +
    '<div class="sp-chat-meta"><span class="sp-chat-status ' +
    value431 +
    '">' +
    value432 +
    '</span><span class="sp-chat-time">' +
    spFormatChatTime(param221.timestamp) +
    '</span><span class="sp-chat-check">✓✓</span></div></div>'
  );
}
function spTemplateChatHistory(param222) {
  if (!param222 || !param222.length) {
    return spTemplateChatEmpty();
  }
  var text12 = '<div class="sp-chat-messages">';
  var text13 = "";
  for (var count27 = 0; count27 < param222.length; count27++) {
    var value434 = param222[count27];
    var value435 = spFormatChatDate(value434.timestamp);
    if (value435 !== text13) {
      text12 +=
        '<div class="sp-chat-date-divider"><span class="sp-chat-date-label">' +
        value435 +
        "</span></div>";
      text13 = value435;
    }
    text12 += spTemplateChatBubble(value434);
  }
  text12 += "</div>";
  var value436 = t("history.count");
  var value437 =
    typeof value436 === "function"
      ? value436(param222.length)
      : param222.length + " messages";
  text12 +=
    '<div class="sp-chat-actions"><span class="sp-chat-count">' +
    value437 +
    '</span><button class="sp-chat-clear" id="sp-chat-clear" data-i18n="history.clear">' +
    t("history.clear") +
    "</button></div>";
  return text12;
}
function spTemplateSecurityModal() {
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
