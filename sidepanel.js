(function () {
  let value444 = null;
  let value445 = null;
  let value446 = null;
  let value447 = null;
  let value448 = null;
  let value449 = null;
  let flag8 = false;
  let value450 = null;
  let value451 = null;
  let value452 = null;
  let flag9 = false;
  function function20() {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (param223) => {
        if (
          param223[0] &&
          param223[0].url &&
          param223[0].url.includes("lovable.dev")
        ) {
          chrome.tabs.sendMessage(param223[0].id, {
            action: "qlActivateBypass",
          });
        } else {
          chrome.tabs.query(
            {
              url: "*://lovable.dev/*",
            },
            (param224) => {
              (param224 || []).forEach((param225) => {
                try {
                  chrome.tabs.sendMessage(param225.id, {
                    action: "qlActivateBypass",
                  });
                } catch (error62) {}
              });
            },
          );
        }
      },
    );
  }
  let value453 = null;
  let flag10 = false;
  let items13 = [];
  let text16 = "prompt";
  let items14 = [];
  const count28 = 15;
  const count29 = 20971520;
  const text17 = "ql_chat_history";
  const count30 = 200;
  const text18 = "3.0";
  function function21(param226) {
    return new Promise(function (param227) {
      var value456 = navigator.userAgent || "";
      var value457 =
        navigator.userAgentData && navigator.userAgentData.brands
          ? navigator.userAgentData.brands
          : [];
      var text20 = "";
      for (var count33 = 0; count33 < value457.length; count33++) {
        if (count33 > 0) {
          text20 += ", ";
        }
        text20 +=
          '"' +
          value457[count33].brand +
          '";v="' +
          value457[count33].version +
          '"';
      }
      var value458 =
        navigator.userAgentData && navigator.userAgentData.platform
          ? navigator.userAgentData.platform
          : "Windows";
      var value459 =
        navigator.userAgentData && navigator.userAgentData.mobile ? "?1" : "?0";
      var value460 =
        navigator.languages && navigator.languages.length
          ? navigator.languages.slice(0, 3).join(",")
          : navigator.language || "en-US";
      var config8 = {
        "user-agent": value456,
        "sec-ch-ua": text20,
        "sec-ch-ua-mobile": value459,
        "sec-ch-ua-platform": '"' + value458 + '"',
        "accept-language": value460,
        "accept-encoding": "gzip, deflate, br, zstd",
        origin: "https://lovable.dev",
        referer: "https://lovable.dev/projects/" + (param226 || ""),
        priority: "u=1, i",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      };
      try {
        chrome.runtime.sendMessage(
          {
            action: "getLovableCookies",
          },
          function (param228) {
            if (param228 && param228.cookie) {
              config8.cookie = param228.cookie;
            }
            param227(config8);
          },
        );
      } catch (error63) {
        param227(config8);
      }
    });
  }
  function function22(param229) {
    return new Promise((param230, param231) => {
      try {
        if (!chrome.runtime || !chrome.runtime.id) {
          return param231(new Error("Extension context invalidated"));
        }
        chrome.runtime.sendMessage(param229, (param232) => {
          if (chrome.runtime.lastError) {
            return param231(new Error(chrome.runtime.lastError.message));
          }
          param230(param232);
        });
      } catch (error64) {
        param231(new Error("Extension context invalidated"));
      }
    });
  }
  function function23(param233, value461 = {}) {
    return new Promise((param234, param235) => {
      try {
        if (!chrome.runtime || !chrome.runtime.id) {
          return param235(new Error("Extension context invalidated"));
        }
        chrome.runtime.sendMessage(
          {
            action: "proxyFetch",
            url: param233,
            method: value461.method || "POST",
            headers: value461.headers || {},
            body: value461.body || null,
          },
          (param236) => {
            if (chrome.runtime.lastError) {
              return param235(new Error(chrome.runtime.lastError.message));
            }
            if (!param236) {
              return param235(new Error("No response"));
            }
            if (param236.data && typeof param236.data === "object") {
              param234(param236.data);
            } else if (!param236.ok) {
              param235(new Error("Fetch failed (" + param236.status + ")"));
            } else {
              param234(param236.data);
            }
          },
        );
      } catch (error65) {
        param235(new Error("Extension context invalidated"));
      }
    });
  }
  function function24() {
    return getHardwareFingerprint();
  }
  function euStoreLicenseState(param237) {
    const state = window.EUBackend.storageState(param237);
    value444 = state.ql_session_id;
    value445 = state.ql_user_name;
    value446 = state.ql_expires_at;
    value447 = state.ql_license_status;
    value451 = state.ql_license_id;
    return state;
  }
  function euApplyActiveBranding() {
    chrome.storage.local.get(["eu_branding", "ql_branding", "eu_license_status", "ql_license_status"], (param237) => {
      const branding = param237.eu_branding || param237.ql_branding || {};
      if (window.EUBackend) {
        const statusText = param237.eu_license_status || param237.ql_license_status || "";
        window.EUBackend.applyBranding(document, { ...branding, statusText });
      }
    });
  }
  function euRenderOperationBlock(operations) {
    if (!window.EUBackend || !operations) return false;
    let kind = "";
    if (window.EUBackend.isMaintenanceActive(operations)) {
      kind = "maintenance";
    } else if (window.EUBackend.shouldBlockForUpgrade(operations)) {
      kind = "upgrade";
    }
    if (!kind) return false;
    const body = document.getElementById("sp-body");
    if (body) {
      body.innerHTML = window.EUBackend.renderBlockPage(kind, operations);
    }
    return true;
  }
  function euCheckOperationBlock() {
    chrome.storage.local.get(["eu_operations", "ql_operations"], (param237) => {
      euRenderOperationBlock(param237.eu_operations || param237.ql_operations);
    });
  }
  function euMaybeShowOptionalUpgrade(operations) {
    if (!window.EUBackend || !operations || window.EUBackend.shouldBlockForUpgrade(operations)) return;
    if (!window.EUBackend.shouldShowUpgrade(operations)) return;
    const upgrade = operations.forceUpgrade || {};
    const key = "eu_update_notice_" + (upgrade.latestVersion || "latest");
    chrome.storage.local.get([key], (param237) => {
      if (param237[key]) return;
      chrome.storage.local.set({ [key]: true });
      const message = upgrade.releaseNotes
        ? (upgrade.message || "A new version is available.") + "\n\n" + upgrade.releaseNotes
        : upgrade.message || "A new version is available.";
      function25("Update Available", message);
    });
  }
  function function25(param237, param238) {
    const value462 = document.querySelector(".sp-alert-overlay");
    if (value462) {
      value462.remove();
    }
    const value463 = document.createElement("div");
    value463.className = "sp-alert-overlay";
    value463.innerHTML = spTemplateAlert(param237, param238);
    document.body.appendChild(value463);
    value463
      .querySelector(".sp-alert-ok")
      .addEventListener("click", () => value463.remove());
    setTimeout(() => value463.remove(), 4000);
  }
  window.addEventListener("pagehide", () => {
    try {
      chrome.storage.local.set({
        ql_sidebar_mode: false,
      });
    } catch (error66) {}
    try {
      chrome.runtime.sendMessage({
        action: "deactivateSidebar",
      });
    } catch (error67) {}
  });
  window.addEventListener("pageshow", () => {
    try {
      chrome.storage.local.set({
        ql_sidebar_mode: true,
      });
    } catch (error68) {}
  });
  document.getElementById("sp-back-to-popup").addEventListener("click", () => {
    try {
      chrome.storage.local.set({
        ql_sidebar_mode: false,
      });
    } catch (error69) {}
    try {
      chrome.runtime.sendMessage({
        action: "deactivateSidebar",
      });
    } catch (error70) {}
    try {
      window.close();
    } catch (error71) {}
  });
  document.querySelector(".sp-theme-btn").addEventListener("click", () => {
    const value464 = document.body.classList.toggle("sp-light");
    chrome.storage.local.set({
      ql_dark_mode: !value464,
    });
  });
  document.querySelector(".sp-logout-btn").addEventListener("click", () => {
    if (value448) {
      clearInterval(value448);
    }
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (param239) => {
        if (param239[0]) {
          chrome.tabs.sendMessage(param239[0].id, {
            action: "qlDeactivateBypass",
          });
        }
      },
    );
    chrome.storage.local.remove(
      window.EUBackend.clearKeys(),
      () => {
        value445 = null;
        value446 = null;
        value447 = null;
        value444 = null;
        function30();
      },
    );
  });
  const value454 = document.getElementById("sp-notif-panel");
  document
    .querySelector(".sp-notif-btn")
    .addEventListener("click", (param240) => {
      param240.stopPropagation();
      const value465 = value454.style.display !== "none";
      value454.style.display = value465 ? "none" : "block";
      if (!value465) {
        function26();
      }
    });
  document.getElementById("sp-notif-close").addEventListener("click", () => {
      value454.style.display = "none";
    });
  document
    .getElementById("sp-notif-markread")
    .addEventListener("click", async () => {
      try {
        const value467 = await window.EUBackend.getNotifications();
        if (value467 && value467.length) {
          chrome.storage.local.set({
            ql_read_notifs: value467.map((param241) => param241.id),
          });
        }
      } catch (error72) {}
      const value466 = document.querySelector(".sp-notif-badge");
      if (value466) {
        value466.style.display = "none";
      }
      value454.style.display = "none";
    });
  async function function26() {
    const value468 = document.getElementById("sp-notif-list");
    value468.innerHTML = '<p class="sp-notif-empty">Loading...</p>';
    try {
      const value469 = await window.EUBackend.getNotifications();
      if (!value469 || !value469.length) {
        value468.innerHTML =
          '<p class="sp-notif-empty">No notifications.</p>';
        return;
      }
      const value470 = value469.map((param242) => param242.id);
      chrome.storage.local.set({
        ql_read_notifs: value470,
      });
      const value471 = document.querySelector(".sp-notif-badge");
      if (value471) {
        value471.style.display = "none";
      }
      value468.innerHTML = value469
        .map((param243) => spTemplateNotifItem(param243))
        .join("");
    } catch (error73) {
      value468.innerHTML = '<p class="sp-notif-empty">Failed to load.</p>';
    }
  }
  async function function27() {
    try {
      const value472 = await window.EUBackend.getNotifications();
      if (!value472 || !value472.length) {
        return;
      }
      chrome.storage.local.get(["ql_read_notifs"], (param244) => {
        const value473 = param244.ql_read_notifs || [];
        const value474 = value472.filter(
          (param245) => !value473.includes(param245.id),
        ).length;
        const value475 = document.querySelector(".sp-notif-badge");
        if (value475) {
          value475.textContent = value474;
          value475.style.display = value474 > 0 ? "flex" : "none";
        }
      });
    } catch (error74) {}
  }
  async function function28() {
    chrome.storage.local.get(["eu_operations", "ql_operations"], (param246) => {
      euMaybeShowOptionalUpgrade(param246.eu_operations || param246.ql_operations);
    });
  }
  async function function29() {
    return;
  }
  function function30() {
    const value484 = document.getElementById("sp-body");
    const valueFooter = document.getElementById("sp-footer");
    if (valueFooter) {
      valueFooter.style.display = "none";
    }
    value484.innerHTML = spTemplateLicenseGate();
    document
      .getElementById("sp-validate-btn")
      .addEventListener("click", function31);
  }
  async function function31() {
    const value485 = document.getElementById("sp-license-input");
    const value486 = document.getElementById("sp-license-log");
    const value487 = value485 ? value485.value.trim().toUpperCase() : "";
    if (!value487) {
      value486.className = "sp-log sp-log-error";
      value486.textContent = "⚠ Enter a key";
      return;
    }
    value486.className = "sp-log sp-log-info";
    value486.innerHTML = SP_SVG.clock + " Validating...";
    try {
      if (!value449) {
        value449 = await function24();
      }
      const value489 = await window.EUBackend.validateLicense(value487, {
        deviceId: value449,
      });
      if (value489.valid) {
        const euState = euStoreLicenseState(value489);
        chrome.storage.local.set(
          euState,
          () => {
            value486.className = "sp-log sp-log-success";
            value486.textContent = "✓ " + value489.message;
            function20();
            setTimeout(() => {
              if (!euRenderOperationBlock(value489.operations)) {
                function39();
              }
              euApplyActiveBranding();
              euMaybeShowOptionalUpgrade(value489.operations);
              function55(value487);
            }, 800);
          },
        );
      } else {
        value486.className = "sp-log sp-log-error";
        value486.textContent = "✗ " + value489.message;
      }
    } catch (error77) {
      value486.className = "sp-log sp-log-error";
      value486.textContent = "✗ Connection error";
    }
  }
  function function32(param248) {
    chrome.storage.local.get([text17], function (param249) {
      items14 = param249[text17] || [];
      if (param248) {
        param248();
      }
    });
  }
  function function33() {
    if (items14.length > count30) {
      items14 = items14.slice(-count30);
    }
    chrome.storage.local.set({
      [text17]: items14,
    });
  }
  function function34(param250, param251) {
    items14.push({
      text: param250,
      timestamp: new Date().toISOString(),
      status: param251 || "ok",
    });
    function33();
    function35();
  }
  function function35() {
    var value490 = document.querySelector(
      '.sp-tab[data-tab="history"] .sp-tab-badge',
    );
    if (value490) {
      value490.textContent = items14.length;
    }
  }
  function function36() {
    var value491 = document.getElementById("sp-tab-content");
    if (!value491) {
      return;
    }
    value491.innerHTML = spTemplateChatHistory(items14);
    var value492 = value491.querySelector(".sp-chat-messages");
    if (value492) {
      value492.scrollTop = value492.scrollHeight;
    }
    var value493 = document.getElementById("sp-chat-clear");
    if (value493) {
      value493.addEventListener("click", function () {
        items14 = [];
        function33();
        function36();
      });
    }
  }
  function function37() {
    var value494 = document.getElementById("sp-tab-content");
    if (!value494) {
      return;
    }
    value494.innerHTML = spTemplatePromptContent();
  }
  function function38(param252) {
    text16 = param252;
    document.querySelectorAll(".sp-tab").forEach(function (param253) {
      param253.classList.toggle(
        "sp-tab-active",
        param253.getAttribute("data-tab") === param252,
      );
    });
    if (param252 === "history") {
      function32(function () {
        function36();
      });
    } else {
      function40();
    }
  }
  function function39() {
    const value495 = spEscapeHtml(value445 || "User");
    const value496 = spTemplateStatusBadge(value447);
    const value497 = document.getElementById("sp-body");
    const valueFooter = document.getElementById("sp-footer");
    if (valueFooter) {
      valueFooter.style.display = "flex";
    }
    function32(function () {
      value497.innerHTML =
        '<div id="sp-update-banner" style="display:none"></div><div class="sp-profile-card"><div class="sp-profile-top"><span class="sp-profile-name" id="sp-name">' +
        value495 +
        "</span>" +
        value496 +
        '</div><div class="sp-sync-status" id="sp-sync">' +
        SP_SVG.clock +
        t("sync.waiting") +
        '</div><div class="sp-trial-countdown" id="sp-countdown" style="display:none"></div></div><div id="sp-reseller-btn" style="display:none;margin-bottom:14px"><a href="https://lovable.dev" target="_blank" style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;border:1px solid rgba(124,90,255,0.3);background:rgba(124,90,255,0.06);color:var(--ql-accent);text-decoration:none;font-size:12px;font-weight:700;transition:all 0.2s">💼 Official Site<span style="margin-left:auto;font-size:10px;opacity:0.6">→</span></a></div>' +
        spTemplateTabs(text16, items14.length) +
        '<div id="sp-tab-content"></div>';
      document.querySelectorAll(".sp-tab").forEach(function (param254) {
        param254.addEventListener("click", function () {
          function38(param254.getAttribute("data-tab"));
        });
      });
      if (text16 === "history") {
        function36();
      } else {
        function40();
      }
      function42();
      if (!flag9) {
        flag9 = true;
        chrome.storage.onChanged.addListener((param255) => {
          if (param255.lovable_projectId || param255.lovable_token) {
            function42();
          }
        });
      }
      function43();
      chrome.storage.local.get(
        ["ql_license_key", "ql_session_id"],
        (param256) => {
          if (param256.ql_license_key) {
            value444 = param256.ql_session_id || value444;
            function55(param256.ql_license_key);
          }
        },
      );
      function27();
      if (value452) {
        clearInterval(value452);
      }
      value452 = setInterval(function27, 300000);
      function28();
      function29();
    });
  }
  function function40() {
    var value498 = document.getElementById("sp-tab-content");
    if (!value498) {
      return;
    }
    value498.innerHTML =
      '<textarea class="sp-textarea" id="sp-msg" rows="3" placeholder="Enter your command..." spellcheck="false"></textarea><div id="sp-attach-preview" class="sp-attach-preview" style="display:none"></div><div class="sp-action-bar"><div class="sp-action-left"><label class="sp-toggle"><input type="checkbox" id="sp-modo-plano"><span class="sp-toggle-slider"></span></label><span class="sp-toggle-label">Plan</span></div><div class="sp-action-center"><button class="sp-attach-btn" id="sp-attach-btn" title="Attach file">📎</button><button class="sp-tool-btn" id="sp-optimize" title="Optimize with AI">' +
      SP_SVG.openai +
      '</button><button class="sp-tool-btn" id="sp-speech" title="Voice">' +
      SP_SVG.mic +
      '</button></div><button class="sp-send-btn" id="sp-send">Send</button></div><input type="file" id="sp-file-input" multiple style="display:none" accept="image/png,image/jpeg,image/webp"><div class="sp-log" id="sp-log"></div><span class="sp-shortcuts-title">QUICK SHORTCUTS</span><div class="sp-shortcuts-grid" id="sp-chips"></div><button id="sp-remove-watermark" class="sp-watermark-btn">Remove Watermark</button><button id="sp-shield-btn" class="sp-shield-btn"><span id="sp-shield-label">Enable Shield</span></button><button id="sp-native-chat-btn" class="sp-shield-btn" style="background:linear-gradient(135deg,rgba(124,90,255,0.12),rgba(168,85,247,0.08));border-color:rgba(124,90,255,0.3);color:var(--ql-accent,#67e8f9);margin-top:6px"><span id="sp-native-chat-label">Use Standard Chat</span></button><button id="sp-download-project" class="sp-watermark-btn" style="background:linear-gradient(135deg,rgba(59,130,246,0.12),rgba(37,99,235,0.08));border-color:rgba(59,130,246,0.3);color:#60a5fa;margin-top:6px">Download Source Code</button><button id="sp-security-scan" class="sp-watermark-btn" style="background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.08));border-color:rgba(245,158,11,0.3);color:#fbbf24;margin-top:6px">Security Analysis</button><button id="sp-quick-init" class="sp-watermark-btn" style="background:linear-gradient(135deg,rgba(250,204,21,0.12),rgba(234,179,8,0.08));border-color:rgba(250,204,21,0.35);color:#facc15;margin-top:6px">Create New Project</button><div id="sp-download-status" class="sp-log" style="display:none"></div>';
    const value499 = document.getElementById("sp-chips");
    SP_TEMPLATES.forEach((param257) => {
      const value500 = document.createElement("button");
      value500.className = "sp-chip";
      value500.innerHTML = param257.icon + " " + param257.label;
      value500.title = param257.prompt;
      value500.addEventListener("click", () => {
        document.getElementById("sp-msg").value = param257.prompt;
      });
      value499.appendChild(value500);
    });
    chrome.storage.local.get(["ql_modo_plano"], (param258) => {
      if (param258.ql_modo_plano) {
        document.getElementById("sp-modo-plano").checked = true;
      }
    });
    document
      .getElementById("sp-modo-plano")
      .addEventListener("change", function () {
        const value501 = this;
        chrome.storage.local.set({
          ql_modo_plano: value501.checked,
        });
        if (value501.checked) {
          function51();
        }
      });
    function50();
    function56();
    document.getElementById("sp-send").addEventListener("click", function53);
    document
      .getElementById("sp-optimize")
      .addEventListener("click", function54);
    function41();
    function52();
    function59();
    function62();
    function58();
    function65();
    setupSpSecurityAnalysis();
  }
  function function41() {
    var value502 = document.getElementById("sp-speech");
    if (!value502) {
      return;
    }
    var value503 = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!value503) {
      value502.title = "Speech is not supported in this browser";
      value502.style.opacity = "0.4";
      value502.style.cursor = "not-allowed";
      return;
    }
    value502.addEventListener("click", function (param259) {
      param259.preventDefault();
      param259.stopPropagation();
      if (flag10 && value453) {
        value453.stop();
        return;
      }
      try {
        value453 = new value503();
        value453.lang = "en-US";
        value453.continuous = true;
        value453.interimResults = true;
        value453.maxAlternatives = 1;
        var text21 = "";
        var value504 = document.getElementById("sp-msg");
        value453.onstart = function () {
          flag10 = true;
          value502.classList.add("sp-recording");
          value502.style.color = "#ef4444";
          value502.style.animation = "pulse 1s infinite";
          text21 = value504 ? value504.value : "";
          console.log("[SP Speech] Recording started");
        };
        value453.onresult = function (param260) {
          var text22 = "";
          for (
            var value505 = param260.resultIndex;
            value505 < param260.results.length;
            value505++
          ) {
            var value506 = param260.results[value505][0].transcript;
            if (param260.results[value505].isFinal) {
              text21 += value506 + " ";
            } else {
              text22 += value506;
            }
          }
          if (value504) {
            value504.value = text21 + text22;
          }
        };
        value453.onerror = function (param261) {
          console.warn("[SP Speech] Error:", param261.error);
          flag10 = false;
          value502.classList.remove("sp-recording");
          value502.style.color = "";
          value502.style.animation = "";
          if (param261.error === "not-allowed") {
            function25(
              "Permission Denied",
              "Allow microphone access in your browser settings.",
            );
          } else if (param261.error === "no-speech") {
            function25("No Audio", "No speech detected. Try again.");
          } else if (param261.error !== "aborted") {
            function25("Voice Error", "Error: " + param261.error);
          }
        };
        value453.onend = function () {
          flag10 = false;
          value502.classList.remove("sp-recording");
          value502.style.color = "";
          value502.style.animation = "";
          if (value504) {
            value504.value = text21.trim();
          }
          console.log("[SP Speech] Recording finished");
        };
        value453.start();
      } catch (error78) {
        console.error("[SP Speech] Failed to start:", error78);
        flag10 = false;
        value502.classList.remove("sp-recording");
        value502.style.color = "";
        value502.style.animation = "";
        function25("Error", "Could not start speech recognition.");
      }
    });
  }
  function function42() {
    chrome.storage.local.get(
      ["lovable_projectId", "lovable_token"],
      (param262) => {
        const value507 = document.getElementById("sp-sync");
        if (!value507) {
          return;
        }
        if (param262.lovable_projectId && param262.lovable_token) {
          value507.className = "sp-sync-status sp-sync-ok";
          value507.textContent =
            t("sync.ok") +
            " " +
            t("sync.project") +
            " " +
            param262.lovable_projectId.substring(0, 6) +
            "...";
        } else {
          value507.className = "sp-sync-status sp-sync-waiting";
          value507.innerHTML = SP_SVG.clock + t("sync.waiting");
        }
      },
    );
  }
  function function43() {
    if (!value446) {
      return;
    }
    const value508 = document.getElementById("sp-countdown");
    if (!value508) {
      return;
    }
    value508.style.display = "flex";
    const value509 = Date.now();
    function function66() {
      const value510 = new Date(value446).getTime();
      const value511 = Math.max(value510 - value509, 3600000);
      const value512 = value510 - Date.now();
      if (value512 <= 0) {
        value508.innerHTML =
          '<span style="color:var(--ql-danger);font-weight:600;font-size:12px">' +
          t("countdown.expired") +
          "</span>";
        return;
      }
      const value513 = Math.floor(value512 / 86400000);
      const value514 = Math.floor((value512 % 86400000) / 3600000);
      const value515 = Math.floor((value512 % 3600000) / 60000);
      const value516 = Math.floor((value512 % 60000) / 1000);
      const value517 = Math.max(0, Math.min(100, (value512 / value511) * 100));
      let value518 =
        value513 > 0
          ? value513 + "d " + value514 + "h " + value515 + "m"
          : value514 > 0
            ? value514 +
              "h " +
              value515 +
              "m " +
              String(value516).padStart(2, "0") +
              "s"
            : value515 + ":" + String(value516).padStart(2, "0");
      const value519 =
        String(value447).toLowerCase() === "trial" ? t("countdown.trial") : t("countdown.license");
      const value520 = value517 < 20 ? " sp-bar-urgent" : "";
      value508.innerHTML = spTemplateCountdown(
        value519,
        value518,
        value517,
        value520,
      );
    }
    function66();
    if (value450) {
      clearInterval(value450);
    }
    value450 = setInterval(function66, 1000);
  }
  function function44(param263) {
    try {
      const value521 = param263.split(".");
      if (value521.length < 2) {
        return null;
      }
      const value522 = value521[1].replace(/-/g, "+").replace(/_/g, "/");
      const value523 = value522 + "=".repeat((4 - (value522.length % 4)) % 4);
      const value524 = JSON.parse(atob(value523));
      return value524.sub || value524.user_id || null;
    } catch (error79) {
      return null;
    }
  }
  async function function45(param264) {
    return new Promise((param265) => {
      const value525 = new Image();
      const value526 = URL.createObjectURL(param264);
      value525.onload = () => {
        URL.revokeObjectURL(value526);
        const count34 = 1280;
        let value527 = value525.width;
        let value528 = value525.height;
        if (value527 > count34 || value528 > count34) {
          const value531 = Math.min(count34 / value527, count34 / value528);
          value527 = Math.round(value527 * value531);
          value528 = Math.round(value528 * value531);
        }
        const value529 = document.createElement("canvas");
        value529.width = value527;
        value529.height = value528;
        value529.getContext("2d").drawImage(value525, 0, 0, value527, value528);
        const value530 =
          param264.type === "image/png" ? "image/png" : "image/jpeg";
        value529.toBlob(
          (param266) => {
            if (!param266) {
              return param265({
                file: param264,
                previewUrl: null,
              });
            }
            param265({
              file: new File([param266], param264.name, {
                type: value530,
              }),
              previewUrl: URL.createObjectURL(param266),
            });
          },
          value530,
          param264.type === "image/png" ? undefined : 0.8,
        );
      };
      value525.onerror = () => {
        URL.revokeObjectURL(value526);
        param265({
          file: param264,
          previewUrl: null,
        });
      };
      value525.src = value526;
    });
  }
  function function46(param267) {
    if (param267 && typeof param267.type === "string" && param267.type.trim()) {
      return param267.type;
    }
    const value532 = (
      param267 && param267.name ? param267.name : ""
    ).toLowerCase();
    const value533 = value532.includes(".") ? value532.split(".").pop() : "";
    const config10 = {
      pdf: "application/pdf",
      txt: "text/plain",
      csv: "text/csv",
      json: "application/json",
      zip: "application/zip",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xls: "application/vnd.ms-excel",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      mp3: "audio/mpeg",
      wav: "audio/wav",
      mp4: "video/mp4",
      webm: "video/webm",
    };
    return config10[value533] || "application/octet-stream";
  }
  function function47(param268, param269) {
    const value534 = param269 && param269.name ? String(param269.name) : "";
    const value535 = value534.includes(".")
      ? value534.split(".").pop().toLowerCase()
      : "";
    const value536 =
      value535 && /^[a-z0-9]{1,10}$/.test(value535) ? value535 : "bin";
    return param268 + "." + value536;
  }
  async function function48(param270, param271) {
    const value537 = crypto.randomUUID();
    const value538 = function46(param270);
    if (!param270.type) {
      try {
        param270 = new File([param270], param270.name || function47(value537, param270), {
          type: value538,
        });
      } catch (error80) {}
    }
    const value539 = await new Promise((param272) =>
      chrome.storage.local.get(["eu_license_key", "ql_license_key"], param272),
    );
    return window.EUBackend.uploadMedia(param270, window.EUBackend.getLicenseKey(value539));
  }
  function function49() {
    const value543 = document.getElementById("sp-attach-preview");
    if (!value543) {
      return;
    }
    if (items13.length === 0) {
      value543.style.display = "none";
      value543.innerHTML = "";
      return;
    }
    value543.style.display = "flex";
    value543.innerHTML = items13
      .map((param274, param275) => spTemplateAttachItem(param274, param275))
      .join("");
    value543.querySelectorAll(".sp-attach-remove").forEach((param276) => {
      param276.addEventListener("click", () => {
        const value544 = parseInt(param276.getAttribute("data-idx"));
        if (items13[value544] && items13[value544].previewUrl) {
          URL.revokeObjectURL(items13[value544].previewUrl);
        }
        items13.splice(value544, 1);
        function49();
      });
    });
  }
  function function50() {
    const value545 = document.getElementById("sp-attach-btn");
    const value546 = document.getElementById("sp-file-input");
    if (!value545 || !value546) {
      return;
    }
    value545.addEventListener("click", () => {
      if (items13.length >= count28) {
        function25("Limit", "Maximum " + count28 + " files.");
        return;
      }
      value546.click();
    });
    value546.addEventListener("change", async () => {
      const value547 = Array.from(value546.files || []);
      value546.value = "";
      if (!value547.length) {
        return;
      }
      const value548 = await new Promise((param277) =>
        chrome.storage.local.get(["lovable_token"], param277),
      );
      let value549 = value548.lovable_token || "";
      if (!value549) {
        function25("Error", "Token not captured.");
        return;
      }
      if (value549.startsWith("Bearer ")) {
        value549 = value549.slice(7);
      }
      const items15 = ["image/png", "image/jpeg", "image/webp"];
      const callback9 = async (param278) => {
        const value550 = await param278.slice(0, 12).arrayBuffer();
        const value551 = new Uint8Array(value550);
        const value552 =
          value551[0] === 137 &&
          value551[1] === 80 &&
          value551[2] === 78 &&
          value551[3] === 71;
        const value553 =
          value551[0] === 255 && value551[1] === 216 && value551[2] === 255;
        const value554 =
          value551[0] === 82 &&
          value551[1] === 73 &&
          value551[2] === 70 &&
          value551[3] === 70 &&
          value551[8] === 87 &&
          value551[9] === 69 &&
          value551[10] === 66 &&
          value551[11] === 80;
        return value552 || value553 || value554;
      };
      for (const value555 of value547) {
        if (items13.length >= count28) {
          break;
        }
        if (!items15.includes(value555.type)) {
          function25(
            "Invalid type",
            value555.name +
              " is not an image. Only PNG, JPEG, and WEBP are accepted.",
          );
          continue;
        }
        if (value555.size > count29) {
          function25("Too large", value555.name + " exceeds 20MB.");
          continue;
        }
        const value556 = await callback9(value555);
        if (!value556) {
          function25(
            "Invalid file",
            value555.name + " is not a valid image.",
          );
          continue;
        }
        let value557 = value555;
        let value558 = null;
        if (["image/png", "image/jpeg", "image/webp"].includes(value555.type)) {
          const value561 = await function45(value555);
          value557 = value561.file;
          value558 = value561.previewUrl;
        }
        const value559 = ["image/png", "image/jpeg", "image/webp"].includes(
          value557.type,
        );
        const value560 = items13.length;
        items13.push({
          file_id: null,
          file_name: value555.name,
          previewUrl: value558,
          file_type: value557.type,
          sizeLabel: spFormatFileSize(value557.size),
          uploading: true,
          rawFile: value557,
        });
        function49();
        try {
          const value562 = await function48(value557, value549);
          items13[value560].file_id = value562.file_id;
          items13[value560].public_url = value562.public_url;
          items13[value560].uploading = false;
          function49();
        } catch (error80) {
          console.warn("[QL] Upload failed:", error80.message);
          items13[value560].uploading = false;
          items13[value560].uploadFailed = true;
          function49();
          function25(
            "Upload Error",
            "Could not upload the image: " +
              (error80.message || "unknown error"),
          );
        }
      }
    });
  }
  function function51() {
    const value563 = document.createElement("div");
    value563.className = "sp-modal-overlay";
    value563.innerHTML =
      '<div class="sp-modal"><div class="sp-modal-icon">⚠️</div><div class="sp-modal-title">Warning - Plan Mode</div><div class="sp-modal-body">The <strong>Plan/Think Mode</strong> can consume credits, but it provides useful help. Use it carefully!</div><div style="margin-bottom:14px;"><div class="sp-modal-step"><span class="sp-modal-step-num">1</span><span class="sp-modal-step-text">Enable <strong>Plan Mode</strong> and send your prompt through the extension.</span></div><div class="sp-modal-step"><span class="sp-modal-step-num">2</span><span class="sp-modal-step-text">Lovable will generate a plan. <strong>Do NOT click the "Approve" button</strong> inside Lovable.</span></div><div class="sp-modal-step"><span class="sp-modal-step-num">3</span><span class="sp-modal-step-text"><strong>Copy the generated plan</strong> and paste it into the extension prompt field.</span></div><div class="sp-modal-step"><span class="sp-modal-step-num">4</span><span class="sp-modal-step-text"><strong>Turn off Plan Mode</strong> and send the prompt through the extension. No extra credits will be consumed!</span></div></div><div class="sp-modal-check"><input type="checkbox" id="sp-modal-dismiss" /><label for="sp-modal-dismiss">Do not show again</label></div><button class="sp-modal-btn" id="sp-modal-ok">Got it!</button></div>';
    document.body.appendChild(value563);
    document
      .getElementById("sp-modal-ok")
      .addEventListener("click", function () {
        var value564 = document.getElementById("sp-modal-dismiss").checked;
        if (value564) {
          chrome.storage.local.set({
            ql_modo_plano_alert_dismissed: true,
          });
        }
        value563.remove();
      });
    value563.addEventListener("click", function (param279) {
      if (param279.target === value563) {
        value563.remove();
      }
    });
  }
  var text19 =
    "use CSS to completely hide the Lovable badge (the 'Made with Lovable' element), without breaking the layout";
  function function52() {
    var value565 = document.getElementById("sp-remove-watermark");
    if (!value565) {
      return;
    }
    value565.addEventListener("click", async function () {
      var value566 = document.getElementById("sp-log");
      value565.disabled = true;
      value565.textContent = "⏳ Sending...";
      try {
        var value567 = await new Promise(function (param280) {
          chrome.tabs.query(
            {
              active: true,
              currentWindow: true,
            },
            param280,
          );
        });
        if (!value567[0]) {
          throw new Error("No active tab found.");
        }
        await new Promise(function (param281, param282) {
          chrome.tabs.sendMessage(
            value567[0].id,
            {
              action: "qlSendViaWs",
              message: text19,
            },
            function (param283) {
              if (chrome.runtime.lastError) {
                return param282(new Error(chrome.runtime.lastError.message));
              }
              if (param283 && param283.ok) {
                param281();
              } else {
                param282(
                  new Error(
                    (param283 && param283.error) ||
                      "Send failed - make sure an open Lovable project is active.",
                  ),
                );
              }
            },
          );
        });
        value566.className = "sp-log sp-log-success";
        value566.textContent =
          "✓ Prompt sent! Wait for Lovable to apply the CSS.";
      } catch (error81) {
        value566.className = "sp-log sp-log-error";
        value566.textContent = "✗ " + (error81.message || error81);
      } finally {
        value565.disabled = false;
        value565.textContent = "🚫 Remove Watermark";
      }
    });
  }
  async function function53() {
    const value568 = document.getElementById("sp-msg").value.trim();
    const value569 = document.getElementById("sp-modo-plano").checked;
    const value570 = document.getElementById("sp-log");
    const value571 = document.getElementById("sp-send");
    if (!value568) {
      value570.className = "sp-log sp-log-error";
      value570.textContent = "⚠ Empty prompt";
      return;
    }
    value571.disabled = true;
    value571.innerHTML = SP_SVG.clock;
    const value572 = items13.filter(function (param284) {
      return param284.uploading;
    });
    if (value572.length > 0) {
      value570.className = "sp-log sp-log-error";
      value570.innerHTML =
        SP_SVG.clock +
        " Aguarde — " +
        value572.length +
        " file(s) still uploading.";
      value571.disabled = false;
      value571.textContent = "Send";
      return;
    }
    const value573 = items13.filter(function (param285) {
      return param285.uploadFailed;
    });
    if (value573.length > 0) {
      value570.className = "sp-log sp-log-error";
      value570.textContent =
        "✗ " +
        value573.length +
        " file(s) failed to upload. Remove them and try again.";
      value571.disabled = false;
      value571.textContent = "Send";
      return;
    }
    const value574 = items13.filter(function (param286) {
      return (
        param286.public_url && !param286.uploading && !param286.uploadFailed
      );
    });
    const value575 = value574.length > 0;
    var value576 = value568;
    if (value575) {
      var value577 = value574
        .map(function (param287) {
          return param287.public_url;
        })
        .join("\n");
      var value578 =
        value574.length > 1
          ? "Attached files:\n"
          : "Attached file: ";
      value576 = value568 + "\n\n" + value578 + value577;
    }
    if (value575) {
      value570.className = "sp-log sp-log-info";
      value570.textContent = "📎 Attaching image link...";
    } else {
      value570.className = "sp-log sp-log-info";
      value570.innerHTML = SP_SVG.clock + " Sending...";
    }
    try {
      const value579 = await new Promise((param288) =>
        chrome.storage.local.get(
          ["lovable_projectId", "lovable_token"],
          param288,
        ),
      );
      const value580 = value579.lovable_projectId || "";
      if (!value580) {
        value570.className = "sp-log sp-log-error";
        value570.textContent = "⚠ Project not synced";
        value571.disabled = false;
        value571.textContent = "Send";
        return;
      }
      const value581 = await new Promise((param289) =>
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },
          param289,
        ),
      );
      const value582 = value581[0] && value581[0].id;
      if (!value582) {
        throw new Error("No active Lovable tab found");
      }
      await new Promise(function (param290, param291) {
        chrome.tabs.sendMessage(
          value582,
          {
            action: "qlSendViaWs",
            message: value576,
          },
          function (param292) {
            if (chrome.runtime.lastError) {
              return param291(new Error(chrome.runtime.lastError.message));
            }
            if (param292 && param292.ok) {
              param290();
            } else {
              param291(
                new Error(
                  (param292 && param292.error) || "Send failed through WebSocket",
                ),
              );
            }
          },
        );
      });
      value570.className = "sp-log sp-log-success";
      value570.textContent = value575
        ? "✓ Prompt sent!"
        : "✓ Prompt sent!";
      function34(value568, "ok");
      document.getElementById("sp-msg").value = "";
      items13.forEach((param293) => {
        if (param293.previewUrl) {
          URL.revokeObjectURL(param293.previewUrl);
        }
      });
      items13 = [];
      function49();
    } catch (error82) {
      value570.className = "sp-log sp-log-error";
      value570.textContent = "✗ " + spFormatErrorMessage(error82);
      function34(value568, "error");
    } finally {
      value571.disabled = false;
      value571.textContent = "Send";
    }
  }
  async function function54() {
    const value583 = document.getElementById("sp-msg");
    const value584 = document.getElementById("sp-optimize");
    if (!value583 || !value583.value.trim()) {
      function25("Warning", "Enter a prompt before optimizing.");
      return;
    }
    value584.classList.add("sp-tool-loading");
    value584.disabled = true;
    try {
      const value585 = await new Promise((param294) =>
        chrome.storage.local.get(["eu_license_key", "ql_license_key"], param294),
      );
      const value586 = await window.EUBackend.improvePrompt(
        value583.value.trim(),
        window.EUBackend.getLicenseKey(value585),
      );
      if (value586.optimized_prompt) {
        value583.value = value586.optimized_prompt;
        function25("Prompt Optimized!", "Your prompt was improved with AI.");
      } else if (value586.error) {
        function25("Error", value586.error);
      }
    } catch (error83) {
      function25("Error", "Optimization failed: " + (error83.message || ""));
    } finally {
      value584.classList.remove("sp-tool-loading");
      value584.disabled = false;
    }
  }
  let count31 = 0;
  let count32 = 0;
  function function55(param295) {
    if (value448) {
      clearInterval(value448);
    }
    count31 = 0;
    count32 = 0;
    value448 = setInterval(async () => {
      try {
        if (!chrome.runtime || !chrome.runtime.id) {
          clearInterval(value448);
          console.warn("[SP] Heartbeat stopped: extension context invalidated");
          return;
        }
        const value587 = await window.EUBackend.validateLicense(param295, {
          heartbeat: true,
          deviceId: value449,
        });
        if (!value587.valid) {
          const value588 = value587.reason === "device_conflict";
          const value589 =
            value588 ||
            value587.reason === "expired" ||
            value587.reason === "suspended" ||
            (value587.message &&
              (value587.message.includes("expired") ||
                value587.message.includes("suspended")));
          if (value588) {
            count31++;
            if (count31 < 2) {
              return;
            }
          }
          if (value589) {
            clearInterval(value448);
            chrome.storage.local.remove(
              window.EUBackend.clearKeys(),
              () => function30(),
            );
            try {
              chrome.tabs.query(
                {
                  active: true,
                  currentWindow: true,
                },
                function (param296) {
                  if (param296[0]) {
                    chrome.tabs.sendMessage(param296[0].id, {
                      action: "qlDeactivateBypass",
                    });
                  }
                },
              );
            } catch (error84) {}
            if (value588) {
              setTimeout(
                () => function25("Access Denied", value587.message),
                500,
              );
            }
          }
          return;
        }
        count31 = 0;
        count32 = 0;
        chrome.storage.local.set(euStoreLicenseState(value587));
        if (euRenderOperationBlock(value587.operations)) {
          return;
        }
        euApplyActiveBranding();
        euMaybeShowOptionalUpgrade(value587.operations);
        if (value587.user_name) {
          value445 = value587.user_name;
          const value590 = document.getElementById("sp-name");
          if (value590) {
            value590.textContent = value587.user_name;
          }
        }
        if (value587.expires_at) {
          value446 = value587.expires_at;
        }
        if (value587.status) {
          value447 = value587.status;
        }
      } catch (error85) {
        if (
          error85.message &&
          error85.message.includes("Extension context invalidated")
        ) {
          clearInterval(value448);
          console.warn("[SP] Heartbeat stopped: extension context invalidated");
          return;
        }
        count32++;
        if (count32 >= 5) {
          try {
            chrome.tabs.query(
              {
                active: true,
                currentWindow: true,
              },
              function (param297) {
                if (param297[0]) {
                  chrome.tabs.sendMessage(param297[0].id, {
                    action: "qlDeactivateBypass",
                  });
                }
              },
            );
          } catch (error86) {}
          count32 = 0;
        }
      }
    }, 60000);
  }
  function function56() {
    var value591 = document.getElementById("sp-msg");
    if (!value591) {
      return;
    }
    var value592 = document.getElementById("sp-body") || value591;
    var value593 = null;
    function function67() {
      if (value593) {
        return;
      }
      value593 = document.createElement("div");
      value593.className = "sp-drag-overlay";
      value593.innerHTML =
        '<div class="sp-drag-overlay-inner">📂 Drop files here</div>';
      document.body.appendChild(value593);
    }
    function function68() {
      if (value593) {
        value593.remove();
        value593 = null;
      }
    }
    value592.addEventListener("dragover", function (param298) {
      param298.preventDefault();
      param298.stopPropagation();
      function67();
    });
    value592.addEventListener("dragleave", function (param299) {
      param299.preventDefault();
      param299.stopPropagation();
      if (!value592.contains(param299.relatedTarget)) {
        function68();
      }
    });
    value592.addEventListener("drop", async function (param300) {
      param300.preventDefault();
      param300.stopPropagation();
      function68();
      var value594 = Array.from(param300.dataTransfer.files || []);
      if (!value594.length) {
        return;
      }
      await function57(value594);
    });
    value591.addEventListener("paste", async function (param301) {
      var value595 = param301.clipboardData && param301.clipboardData.items;
      if (!value595) {
        return;
      }
      var items16 = [];
      for (var count35 = 0; count35 < value595.length; count35++) {
        var value596 = value595[count35];
        if (value596.kind === "file") {
          param301.preventDefault();
          var value597 = value596.getAsFile();
          if (value597) {
            items16.push(value597);
          }
        }
      }
      if (items16.length > 0) {
        await function57(items16);
      }
    });
  }
  async function function57(param302) {
    if (items13.length >= count28) {
      function25("Limit", "Maximo " + count28 + " files.");
      return;
    }
    var value598 = await new Promise(function (param303) {
      chrome.storage.local.get(["lovable_token"], param303);
    });
    var value599 = value598.lovable_token || "";
    if (!value599) {
      function25("Error", "Token not captured.");
      return;
    }
    if (value599.indexOf("Bearer ") === 0) {
      value599 = value599.slice(7);
    }
    for (var count36 = 0; count36 < param302.length; count36++) {
      var value600 = param302[count36];
      if (items13.length >= count28) {
        break;
      }
      if (value600.size > count29) {
        function25("Too large", value600.name + " exceeds 20MB.");
        continue;
      }
      var value601 = value600;
      var value602 = null;
      if (
        ["image/png", "image/jpeg", "image/webp"].indexOf(value600.type) >= 0
      ) {
        var value603 = await function45(value600);
        value601 = value603.file;
        value602 = value603.previewUrl;
      }
      var value604 = items13.length;
      items13.push({
        file_id: null,
        file_name: value600.name || "file_" + Date.now(),
        previewUrl: value602,
        file_type: value601.type,
        sizeLabel: spFormatFileSize(value601.size),
        uploading: true,
        rawFile: value601,
      });
      function49();
      try {
        var value605 = await function48(value601, value599);
        items13[value604].file_id = value605.file_id;
        items13[value604].public_url = value605.public_url;
        items13[value604].uploading = false;
        function49();
      } catch (error87) {
        items13[value604].uploading = false;
        items13[value604].uploadFailed = true;
        function49();
        function25(
          "Upload Error",
          "Could not upload the image: " +
            (error87.message || "unknown error"),
        );
      }
    }
    const value606 = items13.filter(function (param304) {
      return param304.public_url && !param304.uploadFailed;
    }).length;
    if (value606 > 0) {
      function25("Attached 📎", value606 + " file(s) ready to send!");
    }
  }
  function function58() {
    var value607 = document.getElementById("sp-download-project");
    if (!value607) {
      return;
    }
    value607.addEventListener("click", async function () {
      var value608 = document.getElementById("sp-download-status");
      value607.disabled = true;
      value607.textContent = "🔄 Preparing...";
      if (value608) {
        value608.style.display = "block";
        value608.className = "sp-log sp-log-info";
        value608.textContent = "🔍 Checking token and project...";
      }
      try {
        var value612 = await new Promise(function (param305) {
          chrome.storage.local.get(
            ["lovable_token", "lovable_projectId"],
            param305,
          );
        });
        var value613 = value612.lovable_token || "";
        var value614 = value612.lovable_projectId || "";
        if (value613.indexOf("Bearer ") === 0) {
          value613 = value613.slice(7);
        }
        var value615 = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        var value616 = value615[0];
        var value617 = value614;
        if (!value617 && value616 && value616.url) {
          var value618 = value616.url.match(/\/projects\/([a-f0-9-]+)/);
          if (value618) {
            value617 = value618[1];
          }
        }
        if (!value617) {
          throw new Error("Open a Lovable project page first.");
        }
        if (!value613) {
          if (value608) {
            value608.textContent = "🔄 Trying cookies...";
          }
          var value619 = await new Promise(function (param306) {
            chrome.runtime.sendMessage(
              {
                action: "readCookies",
              },
              function (param307) {
                param306(param307);
              },
            );
          });
          if (
            value619 &&
            value619.success &&
            value619.tokens &&
            value619.tokens.length > 0
          ) {
            value613 = value619.tokens[0].token;
          }
        }
        if (!value613) {
          throw new Error(
            "Token not found. Open a Lovable project and wait for sync.",
          );
        }
        if (value608) {
          value608.textContent = "📡 Downloading project files...";
        }
        value607.textContent = "📡 Downloading...";
        var value620 = await new Promise(function (param308) {
          chrome.runtime.sendMessage(
            {
              action: "downloadProject",
              projectId: value617,
              token: value613,
            },
            function (param309) {
              param308(param309);
            },
          );
        });
        if (!value620 || !value620.success) {
          throw new Error(
            value620 && value620.error ? value620.error : "Download failed",
          );
        }
        var value621 = value620.files;
        if (!value621 || value621.length === 0) {
          throw new Error("No files found in the project.");
        }
        if (value608) {
          value608.textContent =
            "📦 Creating ZIP with " + value621.length + " files...";
        }
        value607.textContent = "📦 Packaging...";
        if (typeof JSZip === "undefined") {
          throw new Error("JSZip library not loaded.");
        }
        var value622 = new JSZip();
        var items17 = [
          ".png",
          ".jpg",
          ".jpeg",
          ".gif",
          ".svg",
          ".ico",
          ".webp",
          ".bmp",
          ".tiff",
        ];
        var count37 = 0;
        for (var count38 = 0; count38 < value621.length; count38++) {
          var value623 = value621[count38];
          if (!value623.name) {
            continue;
          }
          if (value623.sizeExceeded) {
            continue;
          }
          if (value623.contents && value623.binary) {
            value622.file(value623.name, value623.contents, {
              base64: true,
              binary: true,
            });
            count37++;
          } else if (
            !value623.contents &&
            items17.some(function (param310) {
              return (
                value623.name
                  .toLowerCase()
                  .indexOf(param310, value623.name.length - param310.length) !==
                -1
              );
            })
          ) {
            try {
              var value624 = encodeURIComponent(value623.name);
              var value625 =
                "https://api.lovable.dev/projects/" +
                value617 +
                "/files/raw?path=" +
                value624;
              var value626 = await fetch(value625, {
                method: "GET",
                headers: {
                  Authorization: "Bearer " + value613,
                  Accept: "*/*",
                },
                credentials: "omit",
                mode: "cors",
              });
              if (value626.ok) {
                var value627 = await value626.arrayBuffer();
                value622.file(value623.name, value627, {
                  binary: true,
                });
                count37++;
              } else if (value623.contents) {
                value622.file(value623.name, value623.contents);
                count37++;
              }
            } catch (error89) {
              if (value623.contents) {
                value622.file(value623.name, value623.contents);
                count37++;
              }
            }
          } else if (value623.contents) {
            value622.file(value623.name, value623.contents);
            count37++;
          }
        }
        if (value608) {
          value608.textContent = "🗜️ Comprimindo " + count37 + " files...";
        }
        var value628 = await value622.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: {
            level: 9,
          },
        });
        var value629 = new Date().toISOString().split("T")[0];
        var value630 =
          "lovable-" + value617.substring(0, 8) + "-" + value629 + ".zip";
        var value631 = URL.createObjectURL(value628);
        var value632 = document.createElement("a");
        value632.href = value631;
        value632.download = value630;
        document.body.appendChild(value632);
        value632.click();
        document.body.removeChild(value632);
        URL.revokeObjectURL(value631);
        if (value608) {
          value608.className = "sp-log sp-log-success";
          value608.textContent =
            "✅ " + count37 + " files downloaded successfully!";
        }
        value607.textContent = "✅ Download Complete!";
        setTimeout(function () {
          value607.textContent = "Download Source Code";
          value607.disabled = false;
          if (value608) {
            value608.style.display = "none";
          }
        }, 4000);
      } catch (error90) {
        if (value608) {
          value608.className = "sp-log sp-log-error";
          value608.textContent = "❌ " + spFormatErrorMessage(error90);
          value608.style.display = "block";
        }
        value607.textContent = "❌ Failed";
        setTimeout(function () {
          value607.textContent = "Download Source Code";
          value607.disabled = false;
        }, 3000);
      }
    });
  }
  (async function callback10() {
    try {
      chrome.storage.local.set({
        ql_sidebar_mode: true,
      });
    } catch (error91) {}
    try {
      chrome.runtime.sendMessage({
        action: "spPanelReady",
      });
    } catch (error92) {}
    value449 = await function24();
    chrome.storage.local.get(["ql_dark_mode"], (param311) => {
      if (param311.ql_dark_mode === false) {
        document.body.classList.add("sp-light");
      }
    });
    chrome.storage.local.get(
      [
        "ql_license_valid",
        "ql_license_key",
        "eu_license_valid",
        "eu_license_key",
        "eu_user_name",
        "eu_expires_at",
        "eu_activated_at",
        "eu_license_status",
        "eu_session_id",
        "eu_license_id",
        "ql_user_name",
        "ql_expires_at",
        "ql_activated_at",
        "ql_license_status",
        "ql_session_id",
        "ql_license_id",
      ],
      async (param312) => {
        const activeLicenseKey = param312.eu_license_key || param312.ql_license_key;
        if (param312.eu_license_valid || param312.ql_license_valid) {
          value445 = param312.eu_user_name || param312.ql_user_name || null;
          value446 = param312.eu_expires_at || param312.ql_expires_at || null;
          value447 = param312.eu_license_status || param312.ql_license_status || null;
          value444 = param312.eu_session_id || param312.ql_session_id || null;
          value451 = param312.eu_license_id || param312.ql_license_id || null;
          function39();
          function20();
          euApplyActiveBranding();
          euCheckOperationBlock();
          if (activeLicenseKey) {
            const callback11 = async (param313) => {
              try {
                const value633 = await window.EUBackend.validateLicense(activeLicenseKey, {
                  heartbeat: true,
                  deviceId: value449,
                });
                if (value633.valid) {
                  chrome.storage.local.set(euStoreLicenseState(value633));
                  const value634 = document.getElementById("sp-name");
                  if (value634) {
                    value634.textContent = value445 || "User";
                  }
                  euApplyActiveBranding();
                  euCheckOperationBlock();
                  euMaybeShowOptionalUpgrade(value633.operations);
                  function43();
                } else if (value633.reason === "device_conflict") {
                  if (param313 < 2) {
                    setTimeout(() => callback11(param313 + 1), 5000);
                    return;
                  }
                  chrome.storage.local.remove(window.EUBackend.clearKeys());
                  function30();
                  setTimeout(
                    () => function25("Access Denied", value633.message),
                    500,
                  );
                } else if (value633.reason === "rate_limited") {
                  if (param313 < 2) {
                    setTimeout(() => callback11(param313 + 1), 30000);
                    return;
                  }
                } else {
                  const value635 =
                    value633.reason === "expired" ||
                    value633.reason === "suspended" ||
                    (value633.message &&
                      (value633.message.includes("expired") ||
                        value633.message.includes("suspended")));
                  if (value635) {
                    chrome.storage.local.remove(window.EUBackend.clearKeys());
                    function30();
                  }
                }
              } catch (error93) {}
            };
            callback11(1);
          }
        } else {
          function30();
        }
      },
    );
  })();
  let flag11 = false;
  function function59() {
    const value636 = document.getElementById("sp-shield-btn");
    if (!value636) {
      return;
    }
    chrome.storage.local.get(["ql_shield_active"], (param314) => {
      if (param314.ql_shield_active === true) {
        flag11 = true;
        value636.classList.add("sp-shield-active");
        const value637 = document.getElementById("sp-shield-label");
        if (value637) {
          value637.textContent = "Disable Shield";
        }
        function60();
      }
    });
    value636.addEventListener("click", () => {
      const value638 = !flag11;
      const value639 = document.getElementById("sp-shield-label");
      if (value638) {
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },
          (param315) => {
            const value640 = (param315 && param315[0] && param315[0].url) || "";
            if (!value640.includes("lovable.dev")) {
              function25(
                "Shield unavailable",
                "Open Lovable (lovable.dev) to enable Shield.",
              );
              return;
            }
            flag11 = true;
            chrome.storage.local.set({
              ql_shield_active: true,
            });
            value636.classList.add("sp-shield-active");
            if (value639) {
              value639.textContent = "Disable Shield";
            }
            function60();
            function25(
              "Shield Enabled 🛡️",
              "The Lovable input is locked.",
            );
          },
        );
      } else {
        flag11 = false;
        chrome.storage.local.set({
          ql_shield_active: false,
        });
        value636.classList.remove("sp-shield-active");
        if (value639) {
          value639.textContent = "Enable Shield";
        }
        function61();
        function25("Shield Disabled", "The Lovable input is unlocked.");
      }
    });
  }
  function function60() {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (param316) => {
        if (param316[0]) {
          chrome.scripting
            .executeScript({
              target: {
                tabId: param316[0].id,
              },
              func: function () {
                if (document.getElementById("ql-shield-overlay")) {
                  return;
                }
                const value641 = document.querySelector("form#chat-input");
                if (!value641) {
                  return;
                }
                const value642 = getComputedStyle(value641).position;
                if (value642 === "static") {
                  value641.style.position = "relative";
                }
                const value643 = document.createElement("div");
                value643.id = "ql-shield-overlay";
                value643.style.cssText =
                  "position:absolute;inset:0;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;border-radius:24px;background:rgba(10,10,11,0.88);backdrop-filter:blur(8px);border:1.5px solid rgba(124,90,255,0.3);box-shadow:0 0 40px -8px rgba(124,90,255,0.25);cursor:not-allowed;pointer-events:all;";
                value643.innerHTML =
                  '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 12px rgba(56,189,248,0.5))"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span style="color:#67e8f9;font-size:13px;font-weight:600;font-family:Inter,sans-serif">🛡️ Protected by Lovable</span><span style="color:#71717a;font-size:10px;font-family:Inter,sans-serif">Use the extension to send prompts</span>';
                ["click", "mousedown", "keydown"].forEach((param317) =>
                  value643.addEventListener(
                    param317,
                    (param318) => {
                      param318.preventDefault();
                      param318.stopPropagation();
                      param318.stopImmediatePropagation();
                    },
                    true,
                  ),
                );
                value641.appendChild(value643);
                value641
                  .querySelectorAll("input,button,textarea,[contenteditable]")
                  .forEach((param319) => {
                    if (param319.id === "ql-shield-overlay") {
                      return;
                    }
                    param319.dataset.qlShieldDisabled = param319.disabled || "";
                    param319.setAttribute("tabindex", "-1");
                    if (param319.tagName !== "DIV") {
                      param319.disabled = true;
                    }
                    if (param319.contentEditable === "true") {
                      param319.contentEditable = "false";
                      param319.dataset.qlShieldEditable = "true";
                    }
                  });
              },
            })
            .catch(() => {});
        }
      },
    );
  }
  function function61() {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (param320) => {
        if (param320[0]) {
          chrome.scripting
            .executeScript({
              target: {
                tabId: param320[0].id,
              },
              func: function () {
                const value644 = document.getElementById("ql-shield-overlay");
                if (value644) {
                  value644.remove();
                }
                const value645 = document.querySelector("form#chat-input");
                if (!value645) {
                  return;
                }
                value645
                  .querySelectorAll("[data-ql-shield-disabled]")
                  .forEach((param321) => {
                    const value646 = param321.dataset.qlShieldDisabled;
                    if (value646 === "true") {
                      param321.disabled = true;
                    } else {
                      param321.disabled = false;
                    }
                    delete param321.dataset.qlShieldDisabled;
                    param321.removeAttribute("tabindex");
                    if (param321.dataset.qlShieldEditable === "true") {
                      param321.contentEditable = "true";
                      delete param321.dataset.qlShieldEditable;
                    }
                  });
              },
            })
            .catch(() => {});
        }
      },
    );
  }
  var flag12 = false;
  function function62() {
    var value647 = document.getElementById("sp-native-chat-btn");
    if (!value647) {
      return;
    }
    chrome.storage.local.get(["ql_native_chat"], function (param322) {
      if (param322.ql_native_chat === true) {
        flag12 = true;
        value647.style.background =
          "linear-gradient(135deg,rgba(34,197,94,0.15),rgba(22,163,74,0.1))";
        value647.style.borderColor = "rgba(34,197,94,0.4)";
        value647.style.color = "#4ade80";
        var value648 = document.getElementById("sp-native-chat-label");
        if (value648) {
          value648.textContent = "Back to Extension";
        }
      }
    });
    value647.addEventListener("click", function () {
      flag12 = !flag12;
      chrome.storage.local.set({
        ql_native_chat: flag12,
      });
      var value649 = document.getElementById("sp-native-chat-label");
      if (flag12) {
        value647.style.background =
          "linear-gradient(135deg,rgba(34,197,94,0.15),rgba(22,163,74,0.1))";
        value647.style.borderColor = "rgba(34,197,94,0.4)";
        value647.style.color = "#4ade80";
        if (value649) {
          value649.textContent = "Back to Extension";
        }
        function63();
        function25(
          "Standard Chat Enabled 💬",
          "Use Lovable native input with the extension features.",
        );
      } else {
        value647.style.background =
          "linear-gradient(135deg,rgba(124,90,255,0.12),rgba(168,85,247,0.08))";
        value647.style.borderColor = "rgba(124,90,255,0.3)";
        value647.style.color = "var(--ql-accent,#67e8f9)";
        if (value649) {
          value649.textContent = "Use Standard Chat";
        }
        function64();
        function25("Standard Chat Disabled", "Returned to extension mode.");
      }
    });
  }
  function function63() {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (param323) {
        if (!param323[0]) {
          return;
        }
        chrome.tabs.sendMessage(
          param323[0].id,
          {
            action: "qlActivateNativeChat",
          },
          function () {},
        );
      },
    );
  }
  function function64() {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      function (param324) {
        if (!param324[0]) {
          return;
        }
        chrome.tabs.sendMessage(
          param324[0].id,
          {
            action: "qlDeactivateNativeChat",
          },
          function () {},
        );
      },
    );
  }
  function function65() {
    var value650 = document.getElementById("sp-quick-init");
    if (!value650) {
      return;
    }
    value650.addEventListener("click", async function () {
      var value651 = document.getElementById("sp-download-status");
      value650.disabled = true;
      value650.innerHTML = SP_SVG.clock + " Project awaiting...";
      if (value651) {
        value651.style.display = "block";
        value651.className = "sp-log sp-log-info";
        value651.textContent =
          "🚀 Typing placeholder and clicking Build...";
      }
      var value652 = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!value652[0]) {
        value650.disabled = false;
        value650.textContent = "Create New Project";
        return;
      }
      chrome.tabs.sendMessage(
        value652[0].id,
        {
          action: "qlQuickProjectInit",
        },
        function (param325) {
          if (chrome.runtime.lastError || !param325) {
            var value653 = spFormatErrorMessage(chrome.runtime.lastError || "No response. Make sure you are on the Lovable home screen.");
            if (value651) {
              value651.className = "sp-log sp-log-error";
              value651.textContent = "❌ " + value653;
            }
            value650.textContent = "❌ Failed";
          } else if (param325.ok) {
            if (value651) {
              value651.className = "sp-log sp-log-success";
              value651.textContent =
                "✅ Empty project created! Send your real prompt through the extension.";
            }
            value650.textContent = "✅ Prompt!";
          } else {
            if (value651) {
              value651.className = "sp-log sp-log-error";
              value651.textContent = "❌ " + (param325.error || "Error");
            }
            value650.textContent = "❌ Failed";
          }
          setTimeout(function () {
            value650.textContent = "Create New Project";
            value650.disabled = false;
            if (value651) {
              value651.style.display = "none";
            }
          }, 5000);
        },
      );
    });
  }

  function spFormatErrorMessage(error) {
    if (!error) return "unknown error";
    const msg = error.message || String(error);
    if (msg.includes("Could not establish connection") || msg.includes("Receiving end does not exist")) {
      return "Please open a project first and try again or if you already open just refresh or reload the page and try again";
    }
    return msg;
  }

  let _spLastSecurityFindings = [];

  function setupSpSecurityAnalysis() {
    const btn = document.getElementById("sp-security-scan");
    if (!btn) return;
    btn.addEventListener("click", async function () {
      let modal = document.getElementById("security-modal");
      if (!modal) {
        const container = document.createElement("div");
        container.innerHTML = spTemplateSecurityModal();
        modal = container.firstElementChild;
        document.body.appendChild(modal);

        // Close events
        modal.querySelector("#security-modal-close").addEventListener("click", () => {
          modal.setAttribute("hidden", "");
        });
        modal.querySelector("#security-backdrop").addEventListener("click", () => {
          modal.setAttribute("hidden", "");
        });

        // Rescan event
        modal.querySelector("#security-rescan").addEventListener("click", async () => {
          const rescanBtn = modal.querySelector("#security-rescan");
          const rescanText = modal.querySelector(".security-rescan-text");
          const rescanSpinner = modal.querySelector(".security-rescan-spinner");
          
          rescanBtn.disabled = true;
          if (rescanSpinner) rescanSpinner.style.display = "inline-block";
          if (rescanText) rescanText.textContent = "Analyzing...";
          spRenderSecurityState("loading", "Starting a new analysis...");
          try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tabs[0]) throw new Error("No active tab found.");
            
            const res = await new Promise((resolve, reject) => {
              chrome.tabs.sendMessage(tabs[0].id, { action: "qlRunSecurityScan", force: true }, (response) => {
                if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
                else resolve(response);
              });
            });
            if (!res || !res.ok) {
              throw new Error(res?.error || "Scan failed");
            }
            spRenderSecurityState("loading", "Analysis started. Waiting for results...");
            await new Promise((resolve) => setTimeout(resolve, 5000));
            await spLoadSecurityFindings(modal);
          } catch (err) {
            spRenderSecurityState("error", spFormatErrorMessage(err));
          } finally {
            rescanBtn.disabled = false;
            if (rescanSpinner) rescanSpinner.style.display = "none";
            if (rescanText) rescanText.textContent = "Scan again now";
          }
        });

        // Fix All event
        modal.querySelector("#security-fix-all").addEventListener("click", async () => {
          const fixBtn = modal.querySelector("#security-fix-all");
          const fixText = modal.querySelector(".security-fixall-text");
          const fixSpinner = modal.querySelector(".security-fixall-spinner");

          fixBtn.disabled = true;
          if (fixSpinner) fixSpinner.style.display = "inline-block";
          if (fixText) fixText.textContent = "Sending...";
          try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            if (!tabs[0]) throw new Error("No active tab found.");
            
            const res = await new Promise((resolve, reject) => {
              chrome.tabs.sendMessage(tabs[0].id, { action: "qlFixAllSecurity", findings: _spLastSecurityFindings }, (response) => {
                if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
                else resolve(response);
              });
            });
            if (res && res.ok) {
              if (fixText) fixText.textContent = "✓ Sent!";
              setTimeout(() => {
                modal.setAttribute("hidden", "");
                if (fixText) fixText.textContent = "Fix All";
              }, 1800);
            } else {
              throw new Error(res?.error || "Fix failed");
            }
          } catch (err) {
            spRenderSecurityState("error", spFormatErrorMessage(err));
          } finally {
            fixBtn.disabled = false;
            if (fixSpinner) fixSpinner.style.display = "none";
          }
        });
      }

      modal.removeAttribute("hidden");
      spRenderSecurityState("loading", "Loading analysis...");
      await spLoadSecurityFindings(modal);
    });
  }

  async function spLoadSecurityFindings(modal) {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tabs[0]) throw new Error("No active tab found.");
      
      const res = await new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "qlGetSecurityData" }, (response) => {
          if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
          else resolve(response);
        });
      });
      if (!res || !res.ok) {
        throw new Error(res?.error || "Failed to load security data");
      }
      spRenderSecurityFindings(modal, res.data);
    } catch (err) {
      spRenderSecurityState("error", spFormatErrorMessage(err));
    }
  }

  function spRenderSecurityState(state, message) {
    const body = document.getElementById("security-body");
    const summary = document.getElementById("security-summary");
    const fixAll = document.getElementById("security-fix-all");
    if (!body) return;
    body.innerHTML = "";
    if (summary) {
      summary.style.display = "none";
      summary.innerHTML = "";
    }
    if (fixAll) fixAll.style.display = "none";

    if (state === "loading") {
      const loader = document.createElement("div");
      loader.className = "security-loading";
      loader.innerHTML = '<div class="sl-spinner"></div><div>' + (message || "Loading analysis...") + '</div>';
      body.appendChild(loader);
    } else if (state === "error") {
      const errorDiv = document.createElement("div");
      errorDiv.className = "security-error";
      errorDiv.textContent = message || "Failed to load.";
      body.appendChild(errorDiv);
    } else if (state === "empty") {
      const emptyDiv = document.createElement("div");
      emptyDiv.className = "security-empty";
      emptyDiv.textContent = message || "All set. No security findings found.";
      body.appendChild(emptyDiv);
    }
  }

  function spRenderSecurityFindings(modal, data) {
    const body = document.getElementById("security-body");
    const summary = document.getElementById("security-summary");
    const fixAll = document.getElementById("security-fix-all");
    if (!body) return;
    body.innerHTML = "";
    if (summary) summary.innerHTML = "";

    const findings = [];
    const results = data?.results || {};
    for (const [scanner, scanData] of Object.entries(results)) {
      const list = scanData?.findings || [];
      for (const item of list) {
        findings.push({
          ...item,
          scanner: scanData?.scanner_name || scanner
        });
      }
    }

    _spLastSecurityFindings = findings;

    const counts = { error: 0, warn: 0, info: 0 };
    for (const item of findings) {
      const lvl = (item.level || "info").toLowerCase();
      if (counts[lvl] !== undefined) counts[lvl]++;
      else counts.info++;
    }

    if (findings.length === 0) {
      if (fixAll) fixAll.style.display = "none";
      spRenderSecurityState("empty", "All set. No security findings found.");
      return;
    }

    if (fixAll) fixAll.style.display = "inline-flex";
    if (summary) {
      summary.style.display = "flex";
      const labels = { error: "errors", warn: "warnings", info: "info" };
      for (const level of ["error", "warn", "info"]) {
        if (counts[level] === 0) continue;
        const badge = document.createElement("span");
        badge.className = "sev-badge";
        badge.dataset.level = level;
        badge.innerHTML = '<span class="sev-dot"></span><span>' + counts[level] + " " + labels[level] + "</span>";
        summary.appendChild(badge);
      }
    }

    const severityWeight = { error: 0, warn: 1, info: 2 };
    const sortedFindings = [...findings].sort((a, b) => {
      const wA = severityWeight[(a.level || "info").toLowerCase()] ?? 2;
      const wB = severityWeight[(b.level || "info").toLowerCase()] ?? 2;
      return wA - wB;
    });

    const ul = document.createElement("ul");
    ul.className = "findings-list";
    for (const item of sortedFindings) {
      const li = document.createElement("li");
      li.className = "finding-item";
      li.dataset.level = (item.level || "info").toLowerCase();

      const header = document.createElement("div");
      header.className = "finding-header";

      const badge = document.createElement("span");
      badge.className = "sev-badge";
      badge.dataset.level = (item.level || "info").toLowerCase();
      badge.innerHTML = '<span class="sev-dot"></span><span>' + (item.level || "info").toUpperCase() + "</span>";
      header.appendChild(badge);

      const name = document.createElement("span");
      name.className = "finding-name";
      name.textContent = item.name || item.id || "Untitled finding";
      header.appendChild(name);

      if (item.scanner) {
        const scannerSpan = document.createElement("span");
        scannerSpan.className = "finding-scanner";
        scannerSpan.textContent = item.scanner;
        header.appendChild(scannerSpan);
      }

      li.appendChild(header);

      if (item.description) {
        const desc = document.createElement("p");
        desc.className = "finding-desc";
        desc.textContent = String(item.description).replace(/\s*Remediation:\s*https?:\/\/\S+/i, "").trim();
        li.appendChild(desc);
      }

      if (item.link) {
        const a = document.createElement("a");
        a.className = "finding-link";
        a.href = item.link;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "See how to fix →";
        li.appendChild(a);
      }

      ul.appendChild(li);
    }
    body.appendChild(ul);
  }
})();
