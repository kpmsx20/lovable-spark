window._ql_lang = "en";
const _I18N_CLOCK_SVG =
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:3px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
var _I18N_EN = {
    "license.title": "Activate License",
    "license.desc": "Enter your license key to unlock.",
    "license.validate": "Validate License",
    "license.divider": "official site",
    "header.notifications": "Notifications",
    "header.sidepanel": "Open in Side Panel",
    "header.theme": "Theme",
    "header.logout": "Logout",
    "sync.waiting": "Waiting for sync...",
    "sync.ok": "✅ Synced!",
    "sync.project": "Project:",
    "tab.prompt": "Prompt",
    "tab.history": "History",
    "prompt.placeholder": "Enter your command...",
    "toggle.licenseMode": "Plan Mode",
    "toggle.licenseMode.short": "Plan",
    "btn.attach": "Attach file (max. 10)",
    "btn.attach.short": "Attach file",
    "btn.optimize": "Optimize with AI",
    "btn.speech": "Voice to text",
    "btn.speech.short": "Voice",
    "btn.send": "Send",
    "shortcuts.title": "QUICK SHORTCUTS",
    "btn.watermark": "Remove Watermark",
    "btn.shield.on": "Enable Shield",
    "btn.shield.off": "Disable Shield",
    "btn.nativeChat": "Use Standard Chat",
    "btn.download": "Download Source Code",
    "btn.publish": "🌐 Publish Project",
    "btn.security": "🛡️ Security Analysis",
    "btn.cloud": "☁️ Enable Lovable Cloud",
    "footer.brand": "Lovable • v3.0",
    "notif.title": "Notifications",
    "notif.loading": "Loading...",
    "notif.none": "No notifications.",
    "notif.error": "Failed to load.",
    "notif.openLink": "Open link →",
    loading: "Loading...",
    "alert.success": "Success!",
    "btn.ok": "OK",
    "expired.title": "License Expired!",
    "expired.text": "Contact your provider to renew your license!",
    "expired.renew": "🌐 Visit Site",
    "expired.close": "Close",
    "countdown.trial": "Trial expires in",
    "countdown.license": "License expires in",
    "countdown.expired": "⏰ License expired",
    "history.empty.title": "No messages",
    "history.empty.desc": "Your sent prompts will appear here as history.",
    "history.clear": "🗑 Clear History",
    "history.count": function (param163) {
      return param163 + " message" + (param163 === 1 ? "" : "s");
    },
    "date.today": "Today",
    "date.yesterday": "Yesterday",
    "date.days": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    "chat.sent": "✓ Sent",
    "chat.error": "✗ Error",
    "update.title": "New update v",
    "update.download": "Download v",
    "sp.backToPopup": "◀ Popup",
    "shield.overlay.text": "🛡️ Protected by Lovable",
    "shield.overlay.sub": "Use the extension to send prompts",
    "prompt.bugs.label": "Bugs",
    "prompt.refactor.label": "Refactor",
    "prompt.errors.label": "Errors",
    "prompt.optimize.label": "Optimize",
    "prompt.comments.label": "Comments",
    "prompt.seo.label": "SEO",
    "prompt.ui.label": "UI",
    "prompt.components.label": "Components",
    "prompt.review.label": "Review",
    "prompt.bugs.text":
      "Analyze the code and identify all bugs, errors and failures. Fix each one explaining the problem and the solution applied.",
    "prompt.refactor.text":
      "Elaborate a complete refactoring and optimization plan for the system in steps.",
    "prompt.errors.text":
      "Implement robust error handling throughout the code, including try/catch, validations and friendly error messages for the user.",
    "prompt.optimize.text":
      "Analyze and optimize system performance, identifying bottlenecks, improving queries, reducing re-renders and applying best practices.",
    "prompt.comments.text":
      "Add clear comments and documentation throughout the code, explaining the logic, parameters and return values of each function.",
    "prompt.seo.text":
      "Create a complete SEO optimization plan for this site. Include: meta tags analysis (title, description, og:image), headings structure (H1-H6), sitemap.xml, robots.txt, structured data (JSON-LD), performance (Core Web Vitals), accessibility, friendly URLs, canonical tags, alt text on images, lazy loading, and internal link building strategies. Implement all identified improvements.",
    "prompt.ui.text":
      "Improve the user interface making it more modern, responsive and accessible, following UX/UI best practices.",
    "prompt.components.text":
      "Reorganize the code separating into reusable, well-structured components with single responsibilities.",
    "prompt.review.text":
      "Do a complete code review identifying quality, security, performance issues and suggesting improvements.",
  };

var _I18N = { en: _I18N_EN };
function t(param165) {
  var value314 = _I18N_EN[param165];
  return value314 !== undefined ? value314 : param165;
}
function langSw() {
  return "";
}
function setLang() {
  window._ql_lang = "en";
  _applyTranslations();
}
function _getCurrentTemplates() {
  var value316 =
    typeof SVG_ICONS !== "undefined"
      ? SVG_ICONS
      : typeof SP_SVG !== "undefined"
        ? {
            wrench: SP_SVG.wrench,
            edit: SP_SVG.edit,
            shield: SP_SVG.shield,
            zap: SP_SVG.zap,
            msgSquare: SP_SVG.msgSq,
            trendUp: SP_SVG.trendUp,
            palette: SP_SVG.palette,
            box: SP_SVG.box,
            search: SP_SVG.search,
          }
        : {};
  return [
    { icon: value316.wrench || "", label: t("prompt.bugs.label"), prompt: t("prompt.bugs.text") },
    { icon: value316.edit || "", label: t("prompt.refactor.label"), prompt: t("prompt.refactor.text") },
    { icon: value316.shield || "", label: t("prompt.errors.label"), prompt: t("prompt.errors.text") },
    { icon: value316.zap || "", label: t("prompt.optimize.label"), prompt: t("prompt.optimize.text") },
    { icon: value316.msgSquare || "", label: t("prompt.comments.label"), prompt: t("prompt.comments.text") },
    { icon: value316.trendUp || "", label: t("prompt.seo.label"), prompt: t("prompt.seo.text") },
    { icon: value316.palette || "", label: t("prompt.ui.label"), prompt: t("prompt.ui.text") },
    { icon: value316.box || "", label: t("prompt.components.label"), prompt: t("prompt.components.text") },
    { icon: value316.search || "", label: t("prompt.review.label"), prompt: t("prompt.review.text") },
  ];
}
function _rebuildChips() {
  var value317 = _getCurrentTemplates();
  var value318 = document.getElementById("ql-chips");
  if (value318) {
    value318.innerHTML = "";
    value317.forEach(function (param167) {
      var value320 = document.createElement("button");
      value320.className = "ql-chip";
      value320.innerHTML = param167.icon + " " + param167.label;
      value320.title = param167.prompt;
      value320.addEventListener("click", function () {
        var value321 = document.getElementById("ql-msg");
        if (value321) value321.value = param167.prompt;
      });
      value318.appendChild(value320);
    });
  }
  var value319 = document.getElementById("sp-chips");
  if (value319) {
    value319.innerHTML = "";
    value317.forEach(function (param168) {
      var value322 = document.createElement("button");
      value322.className = "sp-chip";
      value322.innerHTML = param168.icon + " " + param168.label;
      value322.title = param168.prompt;
      value322.addEventListener("click", function () {
        var value323 = document.getElementById("sp-msg");
        if (value323) value323.value = param168.prompt;
      });
      value319.appendChild(value322);
    });
  }
}
function _setTxt(param169, param170) {
  var value324 = document.querySelector(param169);
  if (value324) value324.textContent = t(param170);
}
function _setPlaceholder(param171, param172) {
  var value325 = document.querySelector(param171);
  if (value325) value325.placeholder = t(param172);
}
function _setTitle(param173, param174) {
  var value326 = document.querySelector(param173);
  if (value326) value326.title = t(param174);
}
function _setLastTextNode(param175, param176) {
  if (!param175) return;
  for (var value327 = param175.childNodes.length - 1; value327 >= 0; value327--) {
    if (param175.childNodes[value327].nodeType === 3) {
      param175.childNodes[value327].textContent = " " + param176;
      return;
    }
  }
  param175.appendChild(document.createTextNode(" " + param176));
}
function _applyTranslations() {
  window._ql_lang = "en";
  var value328 = document.querySelectorAll("[data-i18n]");
  for (var count21 = 0; count21 < value328.length; count21++) {
    var value329 = t(value328[count21].getAttribute("data-i18n"));
    if (typeof value329 === "string") value328[count21].textContent = value329;
  }
  var value330 = document.querySelectorAll("[data-i18n-title]");
  for (var count22 = 0; count22 < value330.length; count22++) {
    value330[count22].title = t(value330[count22].getAttribute("data-i18n-title"));
  }
  var value331 = document.querySelectorAll("[data-i18n-placeholder]");
  for (var count23 = 0; count23 < value331.length; count23++) {
    value331[count23].placeholder = t(value331[count23].getAttribute("data-i18n-placeholder"));
  }
  _setPlaceholder("#ql-msg", "prompt.placeholder");
  _setTxt(".ql-toggle-label-inline", "toggle.licenseMode");
  _setTitle("#ql-attach-btn", "btn.attach");
  _setTitle("#ql-optimize-btn", "btn.optimize");
  _setTitle("#ql-speech-btn", "btn.speech");
  _setTxt("#ql-send", "btn.send");
  _setTxt(".ql-shortcuts-title", "shortcuts.title");
  _setTxt("#ql-remove-watermark", "btn.watermark");
  _setLastTextNode(document.getElementById("ql-native-chat-btn"), t("btn.nativeChat"));
  _setTxt("#ql-download-project", "btn.download");
  _setTxt("#ql-security-scan", "btn.security");
  _setTxt("#ql-validate-btn", "license.validate");
  _setTxt(".ql-gate-title", "license.title");
  _setTxt(".ql-gate-desc", "license.desc");
  _setTitle(".ql-notif-btn", "header.notifications");
  _setTitle("#ql-sidepanel-btn", "header.sidepanel");
  var value333 = document.getElementById("ql-shield-label");
  if (value333) {
    var value334 = document.getElementById("ql-shield-btn");
    value333.textContent = value334 && value334.classList.contains("ql-shield-active") ? t("btn.shield.off") : t("btn.shield.on");
  }
  var value335 = document.querySelector("#ql-sync-status .ql-sync-text");
  if (value335) {
    var value336 = document.getElementById("ql-sync-status");
    if (value336 && value336.classList.contains("ql-sync-ok")) {
      var value337 = value335.textContent.match(/([a-z0-9]{6})\.\.\./i);
      value335.textContent = t("sync.ok") + " " + t("sync.project") + (value337 ? " " + value337[1] + "..." : "");
    } else {
      value335.innerHTML = _I18N_CLOCK_SVG + t("sync.waiting");
    }
  }
  _setTxt(".ql-shield-overlay-text", "shield.overlay.text");
  _setTxt(".ql-shield-overlay-sub", "shield.overlay.sub");
  _setTxt(".ql-notif-header span:first-child", "notif.title");
  _setTxt(".sp-notif-header span:first-child", "notif.title");
  _setPlaceholder("#sp-msg", "prompt.placeholder");
  _setTxt(".sp-toggle-label", "toggle.licenseMode.short");
  _setTitle("#sp-attach-btn", "btn.attach.short");
  _setTitle("#sp-optimize", "btn.optimize");
  _setTitle("#sp-speech", "btn.speech.short");
  _setTxt("#sp-send", "btn.send");
  _setTxt(".sp-shortcuts-title", "shortcuts.title");
  _setTxt("#sp-remove-watermark", "btn.watermark");
  _setTxt("#sp-native-chat-label", "btn.nativeChat");
  _setTxt("#sp-download-project", "btn.download");
  _setTxt("#sp-security-scan", "btn.security");
  _setTxt("#sp-validate-btn", "license.validate");
  _setTxt(".sp-gate-title", "license.title");
  _setTxt(".sp-gate-desc", "license.desc");
  var value338 = document.getElementById("sp-shield-label");
  if (value338) {
    var value339 = document.getElementById("sp-shield-btn");
    value338.textContent = value339 && value339.classList.contains("sp-shield-active") ? t("btn.shield.off") : t("btn.shield.on");
  }
  var value340 = document.getElementById("sp-sync");
  if (value340) {
    if (value340.classList.contains("sp-sync-ok")) {
      var value341 = value340.textContent.match(/([a-z0-9]{6})\.\.\./i);
      value340.textContent = t("sync.ok") + " " + t("sync.project") + (value341 ? " " + value341[1] + "..." : "");
    } else {
      value340.innerHTML = _I18N_CLOCK_SVG + t("sync.waiting");
    }
  }
  _rebuildChips();
  _setupObservers();
}
var _ql_observed = {};
var _ql_obsTimer = null;
function _setupObservers() {
  var items11 = ["ql-tab-content", "sp-tab-content", "sp-body"];
  items11.forEach(function (param177) {
    if (_ql_observed[param177]) return;
    var value342 = document.getElementById(param177);
    if (!value342) return;
    _ql_observed[param177] = true;
    new MutationObserver(function () {
      clearTimeout(_ql_obsTimer);
      _ql_obsTimer = setTimeout(_applyTranslations, 60);
    }).observe(value342, { childList: true });
  });
}
try {
  chrome.storage.local.set({ ql_lang: "en" });
} catch (error45) {}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", _applyTranslations);
} else {
  _applyTranslations();
}
