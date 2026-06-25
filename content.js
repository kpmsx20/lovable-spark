console.log("[ContentScript] Lovable started");
function activateBypass() {
  try {
    localStorage.setItem("__ql_bypass_active", "1");
  } catch (error5) {}
  window.postMessage(
    {
      type: "qlBypassState",
      active: true,
    },
    "*",
  );
}
function deactivateBypass() {
  try {
    localStorage.removeItem("__ql_bypass_active");
  } catch (error6) {}
  window.postMessage(
    {
      type: "qlBypassState",
      active: false,
    },
    "*",
  );
}
function buildSessionHeaders(param23) {
  return new Promise(function (param24) {
    var value9 = navigator.userAgent || "";
    var value10 =
      navigator.userAgentData && navigator.userAgentData.brands
        ? navigator.userAgentData.brands
        : [];
    var text2 = "";
    for (var count3 = 0; count3 < value10.length; count3++) {
      if (count3 > 0) {
        text2 += ", ";
      }
      text2 +=
        '"' + value10[count3].brand + '";v="' + value10[count3].version + '"';
    }
    var value11 =
      navigator.userAgentData && navigator.userAgentData.platform
        ? navigator.userAgentData.platform
        : "Windows";
    var value12 =
      navigator.userAgentData && navigator.userAgentData.mobile ? "?1" : "?0";
    var value13 =
      navigator.languages && navigator.languages.length
        ? navigator.languages.slice(0, 3).join(",")
        : navigator.language || "en-US";
    var config3 = {
      "user-agent": value9,
      "sec-ch-ua": text2,
      "sec-ch-ua-mobile": value12,
      "sec-ch-ua-platform": '"' + value11 + '"',
      "accept-language": value13,
      "accept-encoding": "gzip, deflate, br, zstd",
      origin: "https://lovable.dev",
      referer: "https://lovable.dev/projects/" + (param23 || ""),
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
        function (param25) {
          if (param25 && param25.cookie) {
            config3.cookie = param25.cookie;
          }
          param24(config3);
        },
      );
    } catch (error7) {
      param24(config3);
    }
  });
}
function escapeHtml(param26) {
  if (!param26) {
    return "";
  }
  const value14 = document.createElement("div");
  value14.textContent = String(param26);
  return value14.innerHTML;
}
function sanitizeUrl(param27) {
  if (!param27) {
    return "";
  }
  try {
    const value15 = new URL(param27);
    if (value15.protocol === "http:" || value15.protocol === "https:") {
      return param27;
    }
    return "";
  } catch (error8) {
    return "";
  }
}
function decodeJwtPayload(param28) {
  try {
    const value16 = String(param28 || "")
      .replace(/^Bearer\s+/i, "")
      .trim();
    const value17 = value16.split(".");
    if (value17.length < 2) {
      return null;
    }
    const value18 = value17[1].replace(/-/g, "+").replace(/_/g, "/");
    const value19 = value18 + "=".repeat((4 - (value18.length % 4)) % 4);
    return JSON.parse(atob(value19));
  } catch (error9) {
    return null;
  }
}
function bgFetch(param29, value20 = {}) {
  return new Promise((param30, param31) => {
    chrome.runtime.sendMessage(
      {
        action: "proxyFetch",
        url: param29,
        method: value20.method || "POST",
        headers: value20.headers || {},
        body: value20.body || null,
      },
      (param32) => {
        if (chrome.runtime.lastError) {
          console.error(
            "[bgFetch] runtime error:",
            chrome.runtime.lastError.message,
          );
          return param31(new Error(chrome.runtime.lastError.message));
        }
        if (!param32) {
          return param31(new Error("No response from background"));
        }
        if (param32.data && typeof param32.data === "object") {
          if (!param32.ok) {
            const value21 =
              param32.data.error ||
              param32.data.message ||
              param32.data.detail ||
              JSON.stringify(param32.data);
            console.error(
              "[bgFetch] HTTP " + param32.status + " →",
              param32.data,
            );
            return param31(
              new Error("HTTP " + param32.status + ": " + value21),
            );
          }
          param30(param32.data);
        } else if (!param32.ok) {
          param31(
            new Error(
              "Fetch failed via background (status " + param32.status + ")",
            ),
          );
        } else {
          param30(param32.data);
        }
      },
    );
  });
}
function euStoreLicenseState(param29) {
  const state = window.EUBackend.storageState(param29);
  qlSessionId = state.ql_session_id;
  qlUserName = state.ql_user_name;
  qlExpiresAt = state.ql_expires_at;
  qlActivatedAt = state.ql_activated_at;
  qlLicenseStatus = state.ql_license_status;
  qlOnlineCount = param29.online_count || 0;
  return state;
}
function euApplyActiveBranding() {
  chrome.storage.local.get(["eu_branding", "ql_branding", "eu_license_status", "ql_license_status"], (param29) => {
    const branding = param29.eu_branding || param29.ql_branding || {};
    if (window.EUBackend) {
      const statusText = param29.eu_license_status || param29.ql_license_status || "";
      window.EUBackend.applyBranding(document, { ...branding, statusText });
    }
  });
}
function euRenderOperationBlock(param29, operations) {
  if (!window.EUBackend || !param29 || !operations) return false;
  let kind = "";
  if (window.EUBackend.isMaintenanceActive(operations)) {
    kind = "maintenance";
  } else if (window.EUBackend.shouldBlockForUpgrade(operations)) {
    kind = "upgrade";
  }
  if (!kind) return false;
  param29.innerHTML = window.EUBackend.renderBlockPage(kind, operations);
  return true;
}
function euCheckOperationBlock(param29) {
  chrome.storage.local.get(["eu_operations", "ql_operations"], (param30) => {
    euRenderOperationBlock(param29, param30.eu_operations || param30.ql_operations);
  });
}
function euMaybeShowOptionalUpgrade(operations) {
  if (!window.EUBackend || !operations || window.EUBackend.shouldBlockForUpgrade(operations)) return;
  if (!window.EUBackend.shouldShowUpgrade(operations)) return;
  const upgrade = operations.forceUpgrade || {};
  const key = "eu_update_notice_" + (upgrade.latestVersion || "latest");
  chrome.storage.local.get([key], (param29) => {
    if (param29[key]) return;
    chrome.storage.local.set({ [key]: true });
    const message = upgrade.releaseNotes
      ? (upgrade.message || "A new version is available.") + "\n\n" + upgrade.releaseNotes
      : upgrade.message || "A new version is available.";
    showCustomAlert("Update Available", message);
  });
}
let qlSessionId = null;
let qlHeartbeatInterval = null;
let qlUserName = null;
let qlExpiresAt = null;
let qlActivatedAt = null;
let qlLicenseStatus = null;
let qlOnlineCount = 0;
let qlMinimized = false;
let qlHeight = 520;
let qlSpeechRecognition = null;
let qlIsRecording = false;
let qlDeviceId = null;
let qlShieldActive = false;
let qlSidebarActivateTimer = null;
let _qlLastStartupHb = 0;
let qlActiveTab = "prompt";
let qlChatHistory = [];
const QL_HISTORY_KEY = "ql_chat_history";
const QL_MAX_HISTORY = 200;
function getDeviceId() {
  return getHardwareFingerprint();
}
function createUI() {
  if (document.getElementById("ql-floating")) {
    return;
  }
  chrome.storage.local.get(
    ["ql_sidebar_mode", "ql_native_chat", "ql_license_valid"],
    (param33) => {
      if (param33.ql_sidebar_mode === true) {
        qlRetryCount = qlRetryDelays.length;
        if (param33.ql_license_valid) {
          activateBypass();
        }
        return;
      }
      if (param33.ql_native_chat === true) {
        qlRetryCount = qlRetryDelays.length;
        return;
      }
      _buildFloatingUI();
    },
  );
}
function _qlOpenSidePanel() {
  chrome.runtime.sendMessage({
    action: "openSidePanel",
  });
  var value22 = document.createElement("div");
  value22.textContent = "Click the extension icon to open the panel";
  value22.style.cssText =
    "position:fixed;top:16px;right:16px;z-index:2147483647;background:#0f172a;color:#fff;padding:10px 16px;border-radius:8px;font-size:14px;font-family:sans-serif;pointer-events:none;box-shadow:0 4px 12px rgba(0,0,0,.4);";
  document.body.appendChild(value22);
  setTimeout(function () {
    if (value22.parentNode) {
      value22.parentNode.removeChild(value22);
    }
  }, 4000);
}
function _buildFloatingUI() {
  if (document.getElementById("ql-floating")) {
    return;
  }
  const value23 = document.createElement("div");
  value23.id = "ql-floating";
  const value24 = Math.max(10, window.innerWidth - 400);
  value23.style.left = value24 + "px";
  value23.style.top = "80px";
  document.body.appendChild(value23);
  value23.addEventListener("click", function (param34) {
    var value25 = param34.target;
    while (value25 && value25 !== value23) {
      if (value25.id === "ql-validate-btn") {
        validateLicense();
        return;
      }
      if (value25.id === "ql-sidepanel-btn") {
        _qlOpenSidePanel();
        return;
      }
      value25 = value25.parentElement;
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
      "ql_minimized",
      "ql_height",
      "ql_dark_mode",
      "ql_user_name",
      "ql_expires_at",
      "ql_activated_at",
      "ql_license_status",
      "ql_session_id",
    ],
    async (param35) => {
      qlMinimized = param35.ql_minimized || false;
      qlHeight = param35.ql_height || 520;
      if (param35.ql_dark_mode === false) {
        value23.classList.add("ql-light");
      }
      if (qlMinimized) {
        value23.classList.add("ql-minimized");
      }
      const euActiveLicenseKey = param35.eu_license_key || param35.ql_license_key;
      const euLicenseValid = param35.eu_license_valid || param35.ql_license_valid;
      if (euLicenseValid) {
        activateBypass();
      }
      qlDeviceId = await getDeviceId();
      const value26 = await new Promise((param36) =>
        chrome.storage.local.get(["ql_sidebar_mode"], param36),
      );
      if (value26.ql_sidebar_mode === true) {
        if (euLicenseValid) {
          activateBypass();
        }
        return;
      }
      if (euLicenseValid) {
        qlUserName = param35.eu_user_name || param35.ql_user_name || null;
        qlExpiresAt = param35.eu_expires_at || param35.ql_expires_at || null;
        qlActivatedAt = param35.eu_activated_at || param35.ql_activated_at || null;
        qlLicenseStatus = param35.eu_license_status || param35.ql_license_status || null;
        qlSessionId = param35.eu_session_id || param35.ql_session_id || null;
        showMainUI(value23);
        activateBypass();
        euApplyActiveBranding();
        if (euActiveLicenseKey && Date.now() - _qlLastStartupHb > 5000) {
          _qlLastStartupHb = Date.now();
          const callback1 = (param37) => {
            window.EUBackend.validateLicense(euActiveLicenseKey, {
              heartbeat: true,
              deviceId: qlDeviceId,
            })
              .then((param39) => {
                console.log(
                  "[EU] Startup heartbeat (attempt " + param37 + "):",
                  JSON.stringify(param39),
                );
                if (param39.valid) {
                  chrome.storage.local.set(euStoreLicenseState(param39));
                  activateBypass();
                  const value27 = document.querySelector(".ql-profile-name");
                  if (value27) {
                    value27.textContent = qlUserName || "User";
                  }
                  updateTrialCountdown();
                  euApplyActiveBranding();
                  const value28 = document.getElementById("ql-floating");
                  if (value28) {
                    euCheckOperationBlock(value28);
                  }
                  euMaybeShowOptionalUpgrade(param39.operations);
                } else if (param39.reason === "device_conflict") {
                  if (param37 < 2) {
                    setTimeout(() => callback1(param37 + 1), 5000);
                    return;
                  }
                  chrome.storage.local.remove(window.EUBackend.clearKeys());
                  deactivateBypass();
                  const value28 = document.getElementById("ql-floating");
                  if (value28) {
                    showLicenseGate(value28);
                  }
                  setTimeout(
                    () => showCustomAlert("Access Denied", param39.message),
                    500,
                  );
                } else if (param39.reason === "rate_limited") {
                  if (param37 < 2) {
                    setTimeout(() => callback1(param37 + 1), 30000);
                    return;
                  }
                } else {
                  chrome.storage.local.remove(window.EUBackend.clearKeys());
                  deactivateBypass();
                  const value29 = document.getElementById("ql-floating");
                  if (value29) {
                    showLicenseGate(value29);
                  }
                }
              })
              .catch(() => {
                if (param37 < 2) {
                  setTimeout(() => callback1(param37 + 1), 10000);
                }
              });
          };
          callback1(1);
        }
      } else {
        deactivateBypass();
        showLicenseGate(value23);
      }
      setupDrag();
      setupResize();
    },
  );
}
function showLicenseGate(param40) {
  param40.innerHTML = templateLicenseGate(qlMinimized);
  setTimeout(() => {
    const value30 = document.getElementById("ql-buy-license-btn");
    if (value30) {
      value30.addEventListener("click", () =>
        window.open(
          "https://lovable.dev",
          "_blank",
          "noopener,noreferrer",
        ),
      );
    }
    setupMinimize();
  }, 50);
}
async function validateLicense() {
  const value31 = document.getElementById("ql-license-input");
  const value32 = document.getElementById("ql-license-log");
  const value33 = value31 ? value31.value.trim().toUpperCase() : "";
  if (!value33) {
    if (value32) {
      value32.className = "ql-log-error";
      value32.innerText = "⚠ Enter a key";
    }
    return;
  }
  if (value32) {
    value32.className = "ql-log-info";
    value32.innerHTML = SVG_ICONS.clock + " Validating...";
  }
  try {
    if (!qlDeviceId) {
      qlDeviceId = await getDeviceId();
    }
    const value35 = await window.EUBackend.validateLicense(value33, {
      deviceId: qlDeviceId,
    });
    if (value35.valid) {
      qlExpiredHandled = false;
      const euState = euStoreLicenseState(value35);
      chrome.storage.local.set(
        euState,
        () => {
          activateBypass();
          if (value32) {
            value32.className = "ql-log-success";
            value32.innerText = "✓ " + value35.message;
          }
          try {
            if (typeof QLSounds !== "undefined") {
              QLSounds.activation();
            }
          } catch (error10) {}
          setTimeout(() => {
            const value36 = document.getElementById("ql-floating");
            if (value36) {
              if (!euRenderOperationBlock(value36, value35.operations)) {
                showMainUI(value36);
              }
              euApplyActiveBranding();
              euMaybeShowOptionalUpgrade(value35.operations);
            }
            startHeartbeat(value33);
          }, 800);
        },
      );
    } else if (value32) {
      value32.className = "ql-log-error";
      value32.innerText = "✗ " + value35.message;
    }
  } catch (error11) {
    if (value32) {
      value32.className = "ql-log-error";
      value32.innerText = "✗ Connection error";
    }
  }
}
function showMainUI(param41) {
  const value37 = qlUserName || "User";
  const value38 =
    String(qlLicenseStatus).toLowerCase() === "trial"
      ? '<span class="ql-status-badge ql-badge-test">TEST</span>'
      : '<span class="ql-status-badge ql-badge-pro">ACTIVE</span>';
  param41.innerHTML = templateMainUI(value37, value38, qlMinimized);
  euCheckOperationBlock(param41);
  param41.style.height = qlHeight + "px";
  setTimeout(() => {
    euApplyActiveBranding();
    updateSyncStatus();
    setupSend();
    setupStorageWatch();
    setupMinimize();
    setupSuggestionChips();
    setupWatermarkButton();
    updateTrialCountdown();
    setupDrag();
    setupResize();
    setupDarkMode();
    setupOptimize();
    setupSpeech();
    setupNotifications();
    setupModoPlan();
    setupFileAttachment();
    setupShield();
    setupTabs();
    loadChatHistory();
    setupNativeChatButton();
    setupClipboardPaste();
    setupDownloadProject();
    checkForUpdatePopup();
    checkResellerRolePopup();
    chrome.storage.local.get(["eu_license_key", "eu_session_id", "ql_license_key", "ql_session_id"], (param42) => {
      const activeLicenseKey = param42.eu_license_key || param42.ql_license_key;
      if (activeLicenseKey) {
        qlSessionId = param42.eu_session_id || param42.ql_session_id || qlSessionId;
        startHeartbeat(activeLicenseKey);
      }
    });
    var value39 = document.getElementById("ql-sidepanel-btn");
    if (value39) {
      value39.addEventListener("click", function (param43) {
        param43.stopPropagation();
        _qlOpenSidePanel();
      });
    }
    const value40 = document.getElementById("ql-logout-btn");
    if (value40) {
      value40.addEventListener("click", () => {
        if (qlHeartbeatInterval) {
          clearInterval(qlHeartbeatInterval);
        }
        chrome.storage.local.remove(
          window.EUBackend.clearKeys(),
          () => {
            deactivateBypass();
            qlUserName = null;
            qlExpiresAt = null;
            qlActivatedAt = null;
            qlLicenseStatus = null;
            qlSessionId = null;
            showLicenseGate(param41);
          },
        );
      });
    }
  }, 30);
}
function showCustomAlert(param44, param45) {
  try {
    if (typeof QLSounds !== "undefined" && QLSounds.errorFromMessage) {
      var value41 = (param44 || "") + " " + (param45 || "");
      if (
        /error|fail|denied|invalid|expir|limit|payment|rate|token|credit|session/i.test(
          value41,
        )
      ) {
        QLSounds.errorFromMessage(value41);
      }
    }
  } catch (error12) {}
  const value42 = document.getElementById("ql-custom-alert");
  if (!value42) {
    return;
  }
  const value43 = value42.querySelector(".ql-alert-title");
  const value44 = value42.querySelector(".ql-alert-message");
  const value45 = value42.querySelector(".ql-alert-ok-btn");
  if (value43) {
    value43.textContent = param44;
  }
  if (value44) {
    value44.textContent = param45;
  }
  value42.style.display = "flex";
  if (value45) {
    value45.onclick = () => {
      value42.style.display = "none";
    };
  }
  setTimeout(() => {
    value42.style.display = "none";
  }, 4000);
}
function setupOptimize() {
  const value46 = document.getElementById("ql-optimize-btn");
  if (!value46) {
    return;
  }
  value46.addEventListener("click", async () => {
    const value47 = document.getElementById("ql-msg");
    if (!value47 || !value47.value.trim()) {
      showCustomAlert("Warning", "Enter a prompt before optimizing.");
      return;
    }
    const value48 = value47.value.trim();
    value46.classList.add("ql-tool-loading");
    value46.disabled = true;
    const value49 = await new Promise((param46) =>
      chrome.storage.local.get(["eu_license_key", "ql_license_key"], param46),
    );
    const value50 = window.EUBackend.getLicenseKey(value49);
    try {
      const value51 = await window.EUBackend.improvePrompt(value48, value50);
      if (value51.optimized_prompt) {
        value47.value = value51.optimized_prompt;
        showCustomAlert(
          "Prompt Optimized!",
          "Your prompt was improved with AI and is ready to send.",
        );
      } else if (value51.error) {
        showCustomAlert("Error", value51.error);
      }
    } catch (error13) {
      console.error("[Optimize] error:", error13);
      showCustomAlert(
        "Error",
        "Failed to connect to the optimizer: " + (error13.message || ""),
      );
    } finally {
      value46.classList.remove("ql-tool-loading");
      value46.disabled = false;
    }
  });
}
function setupSpeech() {
  const value52 = document.getElementById("ql-speech-btn");
  if (!value52) {
    return;
  }
  const value53 = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!value53) {
    value52.title = "Speech is not supported in this browser";
    value52.style.opacity = "0.4";
    value52.style.cursor = "not-allowed";
    return;
  }
  value52.addEventListener("click", (param47) => {
    param47.preventDefault();
    param47.stopPropagation();
    if (qlIsRecording && qlSpeechRecognition) {
      qlSpeechRecognition.stop();
      return;
    }
    try {
      qlSpeechRecognition = new value53();
      qlSpeechRecognition.lang = "en-US";
      qlSpeechRecognition.continuous = true;
      qlSpeechRecognition.interimResults = true;
      qlSpeechRecognition.maxAlternatives = 1;
      let text3 = "";
      const value54 = document.getElementById("ql-msg");
      qlSpeechRecognition.onstart = () => {
        qlIsRecording = true;
        value52.classList.add("ql-recording");
        text3 = value54 ? value54.value : "";
        console.log("[QL Speech] Recording started");
      };
      qlSpeechRecognition.onresult = (param48) => {
        let text4 = "";
        for (
          let value55 = param48.resultIndex;
          value55 < param48.results.length;
          value55++
        ) {
          const value56 = param48.results[value55][0].transcript;
          if (param48.results[value55].isFinal) {
            text3 += value56 + " ";
          } else {
            text4 += value56;
          }
        }
        if (value54) {
          value54.value = text3 + text4;
        }
      };
      qlSpeechRecognition.onerror = (param49) => {
        console.warn("[QL Speech] Error:", param49.error);
        qlIsRecording = false;
        value52.classList.remove("ql-recording");
        if (param49.error === "not-allowed") {
          showCustomAlert(
            "Permission Denied",
            "Allow microphone access in your browser settings.",
          );
        } else if (param49.error === "no-speech") {
          showCustomAlert(
            "No Audio",
            "No speech detected. Try again.",
          );
        } else if (param49.error !== "aborted") {
          showCustomAlert("Voice Error", "Error: " + param49.error);
        }
      };
      qlSpeechRecognition.onend = () => {
        qlIsRecording = false;
        value52.classList.remove("ql-recording");
        if (value54) {
          value54.value = text3.trim();
        }
        console.log("[QL Speech] Recording finished");
      };
      qlSpeechRecognition.start();
    } catch (error14) {
      console.error("[QL Speech] Failed to start:", error14);
      qlIsRecording = false;
      value52.classList.remove("ql-recording");
      showCustomAlert(
        "Error",
        "Could not start speech recognition.",
      );
    }
  });
}
function setupNotifications() {
  const value57 = document.querySelector(".ql-notif-btn");
  const value58 = document.getElementById("ql-notif-panel");
  const value59 = document.getElementById("ql-notif-close");
  if (!value57 || !value58) {
    return;
  }
  value57.addEventListener("click", (param50) => {
    param50.stopPropagation();
    const value60 = value58.style.display !== "none";
    value58.style.display = value60 ? "none" : "block";
    if (!value60) {
      loadNotifications();
    }
  });
  if (value59) {
    value59.addEventListener("click", (param51) => {
      param51.stopPropagation();
      value58.style.display = "none";
    });
  }
  checkUnreadNotifications();
}
async function loadNotifications() {
  const value61 = document.getElementById("ql-notif-list");
  if (!value61) {
    return;
  }
  value61.innerHTML = '<p class="ql-notif-empty">Loading...</p>';
  try {
    const value62 = await window.EUBackend.getNotifications();
    if (!value62 || value62.length === 0) {
      value61.innerHTML = '<p class="ql-notif-empty">No notifications.</p>';
      return;
    }
    const value63 = value62.map((param52) => param52.id);
    chrome.storage.local.set({
      ql_read_notifs: value63,
    });
    const value64 = document.querySelector(".ql-notif-badge");
    if (value64) {
      value64.style.display = "none";
    }
    value61.innerHTML = value62
      .map((param53) => {
        const value65 = new Date(param53.created_at).toLocaleDateString(
          "en-US",
        );
        const value66 = sanitizeUrl(param53.link);
        const value67 = value66
          ? '<a href="' +
            escapeHtml(value66) +
            '" target="_blank" rel="noopener noreferrer" class="ql-notif-link">Open link →</a>'
          : "";
        return (
          '<div class="ql-notif-item"><div class="ql-notif-item-title">' +
          escapeHtml(param53.title) +
          '</div><div class="ql-notif-item-msg">' +
          escapeHtml(param53.message) +
          "</div>" +
          value67 +
          '<div class="ql-notif-item-date">' +
          value65 +
          "</div></div>"
        );
      })
      .join("");
  } catch (error15) {
    value61.innerHTML = '<p class="ql-notif-empty">Failed to load.</p>';
  }
}
async function checkUnreadNotifications() {
  try {
    const value68 = await window.EUBackend.getNotifications();
    if (!value68 || value68.length === 0) {
      return;
    }
    chrome.storage.local.get(["ql_read_notifs"], (param54) => {
      const value69 = param54.ql_read_notifs || [];
      const value70 = value68.filter(
        (param55) => !value69.includes(param55.id),
      ).length;
      const value71 = document.querySelector(".ql-notif-badge");
      if (value71) {
        if (value70 > 0) {
          value71.textContent = value70;
          value71.style.display = "flex";
        } else {
          value71.style.display = "none";
        }
      }
    });
  } catch (error16) {}
}
function setupSuggestionChips() {
  const value72 = document.getElementById("ql-chips");
  if (!value72) {
    return;
  }
  PROMPT_TEMPLATES.forEach((param56) => {
    const value73 = document.createElement("button");
    value73.className = "ql-chip";
    value73.innerHTML = param56.icon + " " + param56.label;
    value73.title = param56.prompt;
    value73.addEventListener("click", () => {
      const value74 = document.getElementById("ql-msg");
      if (value74) {
        value74.value = param56.prompt;
      }
    });
    value72.appendChild(value73);
  });
}
var WATERMARK_PROMPT =
  "use CSS to completely hide the Lovable badge (the 'Made with Lovable' element), without breaking the layout";
function setupWatermarkButton() {
  var value75 = document.getElementById("ql-remove-watermark");
  if (!value75) {
    return;
  }
  value75.addEventListener("click", async function () {
    var value76 = document.getElementById("ql-log");
    value75.disabled = true;
      value75.textContent = "⏳ Sending...";
    try {
      await sendNativeToLovable(WATERMARK_PROMPT);
      if (value76) {
        value76.className = "ql-log-success";
        value76.innerText =
          "✓ Prompt sent! Wait for Lovable to apply the CSS.";
      }
    } catch (error17) {
      if (value76) {
        value76.className = "ql-log-error";
        value76.innerText = "✗ " + (error17.message || error17);
      }
    } finally {
      value75.disabled = false;
      value75.textContent = "Remove Watermark";
    }
  });
}
function updateTrialCountdown() {
  if (!qlExpiresAt) {
    return;
  }
  const value77 = document.getElementById("ql-trial-countdown");
  if (!value77) {
    return;
  }
  value77.style.display = "block";
  const value78 = Date.now();
  function function1() {
    const value79 = new Date(qlExpiresAt).getTime();
    const value80 = Math.max(value79 - value78, 3600000);
    const value81 = value79 - Date.now();
    if (value81 <= 0) {
      value77.innerHTML =
        '<span class="ql-countdown-expired">' +
        t("countdown.expired") +
        '</span><div class="ql-trial-bar"><div class="ql-trial-bar-fill ql-bar-expired" style="width:0%"></div></div>';
      handleLicenseExpired();
      return;
    }
    const value82 = Math.floor(value81 / 86400000);
    const value83 = Math.floor((value81 % 86400000) / 3600000);
    const value84 = Math.floor((value81 % 3600000) / 60000);
    const value85 = Math.floor((value81 % 60000) / 1000);
    const value86 = Math.max(0, Math.min(100, (value81 / value80) * 100));
    let text5 = "";
    if (value82 > 0) {
      text5 = value82 + "d " + value83 + "h " + value84 + "m";
    } else if (value83 > 0) {
      text5 =
        value83 +
        "h " +
        value84 +
        "m " +
        String(value85).padStart(2, "0") +
        "s";
    } else {
      text5 = value84 + ":" + String(value85).padStart(2, "0");
    }
    const value87 = value86 < 20 ? " ql-bar-urgent" : "";
    const value88 =
      qlLicenseStatus === "trial"
        ? t("countdown.trial")
        : t("countdown.license");
    value77.innerHTML =
      '<div class="ql-countdown-row"><span class="ql-countdown-icon">' +
      SVG_ICONS.clock +
      '</span><span class="ql-countdown-label">' +
      value88 +
      '</span><span class="ql-countdown-time">' +
      text5 +
      '</span></div><div class="ql-trial-bar"><div class="ql-trial-bar-fill' +
      value87 +
      '" style="width:' +
      value86 +
      '%"></div></div>';
  }
  function1();
  if (window.qlCountdownInterval) {
    clearInterval(window.qlCountdownInterval);
  }
  window.qlCountdownInterval = setInterval(function1, 1000);
}
function setupMinimize() {
  const value89 = document.getElementById("ql-minimize");
  if (!value89) {
    return;
  }
  value89.addEventListener("click", (param57) => {
    param57.stopPropagation();
    const value90 = document.getElementById("ql-floating");
    if (!value90) {
      return;
    }
    qlMinimized = !qlMinimized;
    value90.classList.toggle("ql-minimized", qlMinimized);
    value89.textContent = qlMinimized ? "□" : "−";
    chrome.storage.local.set({
      ql_minimized: qlMinimized,
    });
  });
}
function setupDarkMode() {
  const value91 = document.querySelector('.ql-icon-btn[title="Tema"]');
  if (!value91) {
    return;
  }
  value91.addEventListener("click", (param58) => {
    param58.stopPropagation();
    const value92 = document.getElementById("ql-floating");
    if (!value92) {
      return;
    }
    const value93 = value92.classList.toggle("ql-light");
    chrome.storage.local.set({
      ql_dark_mode: !value93,
    });
  });
}
function setupModoPlan() {
  const value94 = document.getElementById("ql-modo-plano");
  if (!value94) {
    return;
  }
  chrome.storage.local.get(["ql_modo_plano"], (param59) => {
    if (param59.ql_modo_plano === true) {
      value94.checked = true;
    }
  });
  value94.addEventListener("change", () => {
    chrome.storage.local.set({
      ql_modo_plano: value94.checked,
    });
    if (value94.checked) {
      showModoPlanAlert();
    }
  });
}
function showModoPlanAlert() {
  const value95 = document.querySelector(".ql-modo-plano-overlay");
  if (value95) {
    value95.remove();
  }
  const value96 = document.createElement("div");
  value96.className = "ql-modo-plano-overlay";
  value96.innerHTML =
    '<div class="ql-modo-plano-modal"><div class="ql-modo-plano-icon">⚠️</div><div class="ql-modo-plano-title">Warning - Plan Mode</div><div class="ql-modo-plano-body">The <strong>Plan/Think Mode</strong> can consume credits, but it provides useful help. Use it carefully!</div><div class="ql-modo-plano-steps"><div class="ql-modo-plano-step"><span class="ql-modo-plano-step-num">1</span><span class="ql-modo-plano-step-text">Enable <strong>Plan Mode</strong> to generate a plan.</span></div><div class="ql-modo-plano-step"><span class="ql-modo-plano-step-num">2</span><span class="ql-modo-plano-step-text">In Lovable, <strong>do not click the Approve button</strong>; just copy the new plan.</span></div><div class="ql-modo-plano-step"><span class="ql-modo-plano-step-num">3</span><span class="ql-modo-plano-step-text">Paste the copied plan into the extension prompt.</span></div><div class="ql-modo-plano-step"><span class="ql-modo-plano-step-num">4</span><span class="ql-modo-plano-step-text"><strong>Turn off Plan Mode</strong> and send through the extension; no extra credits will be consumed.</span></div></div><div class="ql-modo-plano-check"><input type="checkbox" id="ql-modo-plano-dismiss" /><label for="ql-modo-plano-dismiss">Do not show again</label></div><button class="ql-modo-plano-btn" id="ql-modo-plano-ok">Got it!</button></div>';
  const value97 = document.getElementById("ql-floating");
  if (value97) {
    value97.appendChild(value96);
  } else {
    document.body.appendChild(value96);
  }
  requestAnimationFrame(() => value96.classList.add("ql-modo-plano-visible"));
  const callback2 = () => {
    value96.classList.remove("ql-modo-plano-visible");
    setTimeout(() => value96.remove(), 180);
  };
  const value98 = value96.querySelector("#ql-modo-plano-ok");
  if (value98) {
    value98.addEventListener("click", () => {
      const value99 = value96.querySelector("#ql-modo-plano-dismiss");
      if (value99 && value99.checked) {
        chrome.storage.local.set({
          ql_modo_plano_alert_dismissed: true,
        });
      }
      callback2();
    });
  }
  value96.addEventListener("click", (param60) => {
    if (param60.target === value96) {
      callback2();
    }
  });
}
function setupShield() {
  const value100 = document.getElementById("ql-shield-btn");
  if (!value100) {
    return;
  }
  chrome.storage.local.get(["ql_shield_active"], (param61) => {
    if (param61.ql_shield_active === true) {
      qlShieldActive = true;
      value100.classList.add("ql-shield-active");
      const value101 = document.getElementById("ql-shield-label");
      if (value101) {
        value101.textContent = "Disable Shield";
      }
      injectShieldOverlay();
    }
  });
  value100.addEventListener("click", () => {
    qlShieldActive = !qlShieldActive;
    chrome.storage.local.set({
      ql_shield_active: qlShieldActive,
    });
    const value102 = document.getElementById("ql-shield-label");
    if (qlShieldActive) {
      value100.classList.add("ql-shield-active");
      if (value102) {
        value102.textContent = "Disable Shield";
      }
      injectShieldOverlay();
      showCustomAlert(
        "Shield Enabled 🛡️",
        "The Lovable input is locked. Use the extension to send prompts.",
      );
    } else {
      value100.classList.remove("ql-shield-active");
      if (value102) {
        value102.textContent = "Enable Shield";
      }
      removeShieldOverlay();
      showCustomAlert(
        "Shield Disabled",
        "The Lovable input is unlocked again.",
      );
    }
  });
}
function injectShieldOverlay() {
  if (document.getElementById("ql-shield-overlay")) {
    return;
  }
  const value103 = document.querySelector("form#chat-input");
  if (!value103) {
    setTimeout(injectShieldOverlay, 1000);
    return;
  }
  const value104 = getComputedStyle(value103).position;
  if (value104 === "static") {
    value103.style.position = "relative";
  }
  const value105 = document.createElement("div");
  value105.id = "ql-shield-overlay";
  value105.className = "ql-shield-overlay";
  value105.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span class="ql-shield-overlay-text">🛡️ Protected by Lovable</span><span class="ql-shield-overlay-sub">Use the extension to send prompts</span>';
  value105.addEventListener(
    "click",
    (param62) => {
      param62.preventDefault();
      param62.stopPropagation();
      param62.stopImmediatePropagation();
    },
    true,
  );
  value105.addEventListener(
    "mousedown",
    (param63) => {
      param63.preventDefault();
      param63.stopPropagation();
      param63.stopImmediatePropagation();
    },
    true,
  );
  value105.addEventListener(
    "keydown",
    (param64) => {
      param64.preventDefault();
      param64.stopPropagation();
    },
    true,
  );
  value103.appendChild(value105);
  const value106 = value103.querySelectorAll(
    "input, button, textarea, [contenteditable]",
  );
  value106.forEach((param65) => {
    if (param65.id !== "ql-shield-overlay") {
      param65.dataset.qlShieldDisabled = param65.disabled || "";
      param65.dataset.qlShieldTabindex = param65.getAttribute("tabindex") || "";
      param65.setAttribute("tabindex", "-1");
      if (param65.tagName !== "DIV") {
        param65.disabled = true;
      }
      if (param65.contentEditable === "true") {
        param65.contentEditable = "false";
        param65.dataset.qlShieldEditable = "true";
      }
    }
  });
}
function removeShieldOverlay() {
  const value107 = document.getElementById("ql-shield-overlay");
  if (value107) {
    value107.remove();
  }
  const value108 = document.querySelector("form#chat-input");
  if (!value108) {
    return;
  }
  const value109 = value108.querySelectorAll("[data-ql-shield-disabled]");
  value109.forEach((param66) => {
    const value110 = param66.dataset.qlShieldDisabled;
    if (value110 === "true") {
      param66.disabled = true;
    } else if (value110 === "" || value110 === "false") {
      param66.disabled = false;
    }
    delete param66.dataset.qlShieldDisabled;
    const value111 = param66.dataset.qlShieldTabindex;
    if (value111) {
      param66.setAttribute("tabindex", value111);
    } else {
      param66.removeAttribute("tabindex");
    }
    delete param66.dataset.qlShieldTabindex;
    if (param66.dataset.qlShieldEditable === "true") {
      param66.contentEditable = "true";
      delete param66.dataset.qlShieldEditable;
    }
  });
}
let qlHbConflictCount = 0;
let qlHbNetworkFailCount = 0;
function startHeartbeat(param67) {
  if (qlHeartbeatInterval) {
    clearInterval(qlHeartbeatInterval);
  }
  qlHbConflictCount = 0;
  qlHbNetworkFailCount = 0;
  qlHeartbeatInterval = setInterval(async () => {
    try {
      const value112 = await window.EUBackend.validateLicense(param67, {
        heartbeat: true,
        deviceId: qlDeviceId,
      });
      if (!value112.valid) {
        const value114 = value112.reason === "device_conflict";
        const value115 =
          value112.reason === "expired" ||
          value112.reason === "suspended" ||
          (value112.message &&
            (value112.message.includes("expired") ||
              value112.message.includes("suspended")));
        if (value114) {
          qlHbConflictCount++;
          if (qlHbConflictCount < 2) {
            return;
          }
        }
        if (value114 || value115) {
          clearInterval(qlHeartbeatInterval);
          deactivateBypass();
          chrome.storage.local.remove(
            window.EUBackend.clearKeys(),
            () => {
              const value116 = document.getElementById("ql-floating");
              if (value116) {
                showLicenseGate(value116);
              }
              if (value114) {
                setTimeout(
                  () => showCustomAlert("Access Denied", value112.message),
                  500,
                );
              }
            },
          );
        }
        return;
      }
      qlHbConflictCount = 0;
      qlHbNetworkFailCount = 0;
      activateBypass();
      qlOnlineCount = value112.online_count || 0;
      const value113 = document.getElementById("ql-online-count");
      if (value113) {
        value113.textContent = qlOnlineCount;
      }
      chrome.storage.local.set(euStoreLicenseState(value112));
      const value118 = document.getElementById("ql-floating");
      if (value118 && euRenderOperationBlock(value118, value112.operations)) {
        return;
      }
      euApplyActiveBranding();
      euMaybeShowOptionalUpgrade(value112.operations);
      if (value112.user_name) {
        qlUserName = value112.user_name;
        chrome.storage.local.set({
          ql_user_name: qlUserName,
        });
        const value117 = document.querySelector(".ql-profile-name");
        if (value117) {
          value117.textContent = value112.user_name;
        }
      }
    } catch (error18) {
      console.warn("[QL] Heartbeat error", error18);
      qlHbNetworkFailCount++;
      if (qlHbNetworkFailCount >= 5) {
        deactivateBypass();
        qlHbNetworkFailCount = 0;
      }
    }
  }, 60000);
}
let qlExpiredHandled = false;
function handleLicenseExpired() {
  if (qlExpiredHandled) {
    return;
  }
  qlExpiredHandled = true;
  if (qlHeartbeatInterval) {
    clearInterval(qlHeartbeatInterval);
  }
  if (window.qlCountdownInterval) {
    clearInterval(window.qlCountdownInterval);
  }
  const value118 = document.createElement("div");
  value118.className = "ql-sweetalert-overlay";
  value118.innerHTML = templateExpiredOverlay();
  const value119 = document.getElementById("ql-floating");
  if (value119) {
    value119.appendChild(value118);
  }
  requestAnimationFrame(() => value118.classList.add("ql-sweetalert-visible"));
  const value120 = value118.querySelector("#ql-sweetalert-close");
  if (value120) {
    value120.addEventListener("click", () => {
      value118.classList.remove("ql-sweetalert-visible");
      setTimeout(() => {
        value118.remove();
        chrome.storage.local.remove(
          window.EUBackend.clearKeys(),
          () => {
            if (value119) {
              showLicenseGate(value119);
            }
          },
        );
      }, 300);
    });
  }
}
function qlBootstrap() {
  if (document.getElementById("ql-floating")) {
    return;
  }
  if (!document.body) {
    var value121 = new MutationObserver(function () {
      if (document.body) {
        value121.disconnect();
        qlBootstrap();
      }
    });
    value121.observe(document.documentElement, {
      childList: true,
    });
    return;
  }
  createUI();
}
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  setTimeout(qlBootstrap, 50);
} else {
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(qlBootstrap, 50);
  });
}
var qlRetryCount = 0;
var qlRetryDelays = [300, 600, 1000, 1500, 2000, 3000, 4000, 5000];
function qlRetryInit() {
  if (
    document.getElementById("ql-floating") ||
    qlRetryCount >= qlRetryDelays.length
  ) {
    return;
  }
  var value122 = qlRetryDelays[qlRetryCount];
  qlRetryCount++;
  setTimeout(function () {
    if (!document.getElementById("ql-floating") && document.body) {
      createUI();
    }
    qlRetryInit();
  }, value122);
}
qlRetryInit();
chrome.storage.onChanged.addListener((param68, param69) => {
  if (param69 !== "local") {
    return;
  }
  if (param68.ql_sidebar_mode) {
    if (param68.ql_sidebar_mode.newValue === true) {
      if (qlSidebarActivateTimer) {
        clearTimeout(qlSidebarActivateTimer);
        qlSidebarActivateTimer = null;
      }
      const value123 = document.getElementById("ql-floating");
      if (value123) {
        value123.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        value123.style.opacity = "0";
        value123.style.transform = "scale(0.95)";
        setTimeout(() => {
          if (qlHeartbeatInterval) {
            clearInterval(qlHeartbeatInterval);
          }
          if (window.qlCountdownInterval) {
            clearInterval(window.qlCountdownInterval);
          }
          value123.remove();
        }, 350);
      }
    } else if (param68.ql_sidebar_mode.newValue === false) {
      qlSidebarActivateTimer = setTimeout(() => {
        qlSidebarActivateTimer = null;
        _buildFloatingUI();
        setTimeout(() => {
          const value124 = document.getElementById("ql-floating");
          if (value124) {
            value124.style.opacity = "0";
            value124.style.transform = "scale(0.95) translateX(20px)";
            requestAnimationFrame(() => {
              value124.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";
              value124.style.opacity = "1";
              value124.style.transform = "scale(1) translateX(0)";
            });
          }
        }, 50);
      }, 100);
    }
  }
});
function updateSyncStatus() {
  chrome.storage.local.get(
    ["lovable_projectId", "lovable_token"],
    (param70) => {
      const value125 = document.getElementById("ql-sync-status");
      if (!value125) {
        return;
      }
      if (param70.lovable_projectId && param70.lovable_token) {
        value125.className = "ql-sync-status ql-sync-ok";
        const value126 = param70.lovable_projectId.substring(0, 6);
        value125.innerHTML =
          '<span class="ql-sync-text">' +
          t("sync.ok") +
          " " +
          t("sync.project") +
          " " +
          value126 +
          "...</span>";
      } else {
        value125.className = "ql-sync-status ql-sync-waiting";
        value125.innerHTML =
          '<span class="ql-sync-text">' +
          SVG_ICONS.clock +
          t("sync.waiting") +
          "</span>";
      }
    },
  );
}
let _qlStorageWatchSetup = false;
function setupStorageWatch() {
  if (_qlStorageWatchSetup) {
    return;
  }
  _qlStorageWatchSetup = true;
  chrome.storage.onChanged.addListener((param71) => {
    if (param71.lovable_projectId || param71.lovable_token) {
      updateSyncStatus();
    }
  });
}
function requestLatestTokenFromHook(value127 = 1200) {
  return new Promise((param72) => {
    let flag1 = false;
    function function2(param73) {
      if (flag1) {
        return;
      }
      flag1 = true;
      clearTimeout(value128);
      chrome.storage.onChanged.removeListener(function3);
      param72(param73);
    }
    function function3(param74, param75) {
      if (param75 !== "local") {
        return;
      }
      if (param74.lovable_token && param74.lovable_token.newValue) {
        function2(true);
      }
    }
    const value128 = setTimeout(
      () => function2(false),
      Math.max(300, value127),
    );
    chrome.storage.onChanged.addListener(function3);
    try {
      window.postMessage(
        {
          type: "lovableRequestToken",
        },
        "*",
      );
      setTimeout(
        () =>
          window.postMessage(
            {
              type: "lovableRequestToken",
            },
            "*",
          ),
        120,
      );
    } catch (error19) {
      function2(false);
    }
  });
}
function loadChatHistory(param76) {
  chrome.storage.local.get([QL_HISTORY_KEY], (param77) => {
    qlChatHistory = param77[QL_HISTORY_KEY] || [];
    updateHistoryBadge();
    if (param76) {
      param76();
    }
  });
}
function saveChatHistory() {
  if (qlChatHistory.length > QL_MAX_HISTORY) {
    qlChatHistory = qlChatHistory.slice(-QL_MAX_HISTORY);
  }
  chrome.storage.local.set({
    [QL_HISTORY_KEY]: qlChatHistory,
  });
}
function addToChatHistory(param78, param79) {
  qlChatHistory.push({
    text: param78,
    timestamp: new Date().toISOString(),
    status: param79 || "ok",
  });
  saveChatHistory();
  updateHistoryBadge();
}
function updateHistoryBadge() {
  const value129 = document.getElementById("ql-history-badge");
  if (!value129) {
    return;
  }
  if (qlChatHistory.length > 0) {
    value129.textContent = qlChatHistory.length;
    value129.style.display = "inline-flex";
  } else {
    value129.style.display = "none";
  }
}
function formatChatDate(param80) {
  var value130 = new Date(param80);
  var value131 = new Date();
  var value132 = new Date(
    value131.getFullYear(),
    value131.getMonth(),
    value131.getDate(),
  );
  var value133 = new Date(
    value130.getFullYear(),
    value130.getMonth(),
    value130.getDate(),
  );
  var value134 = (value132 - value133) / 86400000;
  if (value134 === 0) {
    return "Today";
  }
  if (value134 === 1) {
    return "Yesterday";
  }
  if (value134 < 7) {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][value130.getDay()];
  }
  return value130.toLocaleDateString("en-US");
}
function formatChatTime(param81) {
  var value135 = new Date(param81);
  return (
    String(value135.getHours()).padStart(2, "0") +
    ":" +
    String(value135.getMinutes()).padStart(2, "0")
  );
}
function renderHistoryView() {
  const value136 = document.getElementById("ql-tab-content");
  if (!value136) {
    return;
  }
  if (!qlChatHistory.length) {
    value136.innerHTML =
      '<div class="ql-chat-empty"><div style="font-size:28px;margin-bottom:8px">💬</div><div style="font-size:13px;font-weight:600;color:var(--ql-text-primary,#f4f4f5)">No messages</div><div style="font-size:11px;color:var(--ql-text-muted,#71717a);margin-top:4px">Your sent prompts will appear here.</div></div>';
    return;
  }
  let text6 = '<div class="ql-chat-messages">';
  let text7 = "";
  for (let count4 = 0; count4 < qlChatHistory.length; count4++) {
    const value139 = qlChatHistory[count4];
    const value140 = formatChatDate(value139.timestamp);
    if (value140 !== text7) {
      text6 +=
        '<div class="ql-chat-date-divider"><span class="ql-chat-date-label">' +
        value140 +
        "</span></div>";
      text7 = value140;
    }
    const value141 =
      value139.status === "error" ? "ql-chat-status-err" : "ql-chat-status-ok";
    const value142 = value139.status === "error" ? "✗ Error" : "✓ Sent";
    const value143 =
      value139.text.length > 300
        ? escapeHtml(value139.text.substring(0, 300)) + "…"
        : escapeHtml(value139.text);
    text6 +=
      '<div class="ql-chat-bubble" title="' +
      escapeHtml(value139.text) +
      '">' +
      value143 +
      '<div class="ql-chat-meta"><span class="' +
      value141 +
      '">' +
      value142 +
      '</span><span class="ql-chat-time">' +
      formatChatTime(value139.timestamp) +
      "</span></div></div>";
  }
  text6 += "</div>";
  text6 +=
    '<div class="ql-chat-actions"><span class="ql-chat-count">' +
    qlChatHistory.length +
    " mensagen" +
    (qlChatHistory.length === 1 ? "" : "s") +
    '</span><button class="ql-chat-clear" id="ql-chat-clear">🗑 Clean</button></div>';
  value136.innerHTML = text6;
  const value137 = value136.querySelector(".ql-chat-messages");
  if (value137) {
    value137.scrollTop = value137.scrollHeight;
  }
  const value138 = document.getElementById("ql-chat-clear");
  if (value138) {
    value138.addEventListener("click", () => {
      qlChatHistory = [];
      saveChatHistory();
      updateHistoryBadge();
      renderHistoryView();
    });
  }
}
function renderPromptView() {
  const value144 = document.getElementById("ql-tab-content");
  if (!value144) {
    return;
  }
  value144.innerHTML =
    '<textarea id="ql-msg" rows="3" placeholder="Enter your command..." spellcheck="false"></textarea><div id="ql-attach-preview" class="ql-attach-preview" style="display:none"></div><div class="ql-action-bar"><div class="ql-action-left"><label class="ql-toggle"><input type="checkbox" id="ql-modo-plano"><span class="ql-toggle-slider"></span></label><span class="ql-toggle-label-inline">Plan Mode</span></div><div class="ql-action-center"><button id="ql-attach-btn" class="ql-attach-btn" title="Attach file (max. 10)">📎</button><button id="ql-optimize-btn" class="ql-tool-btn" title="Optimize with AI">' +
    SVG_ICONS.openai +
    '</button><button id="ql-speech-btn" class="ql-tool-btn" title="Voice to text">' +
    SVG_ICONS.mic +
    '</button></div><div class="ql-action-right-send"><button id="ql-send" class="ql-send-btn">Send</button></div></div><input type="file" id="ql-file-input" multiple style="display:none" accept="image/png,image/jpeg,image/webp"><div id="ql-log"></div><div class="ql-shortcuts-section"><span class="ql-shortcuts-title">QUICK SHORTCUTS</span><div class="ql-shortcuts-grid" id="ql-chips"></div></div><button id="ql-remove-watermark" class="ql-watermark-btn">Remove Watermark</button><button id="ql-shield-btn" class="ql-shield-btn"><span id="ql-shield-label">Enable Shield</span></button><button id="ql-native-chat-btn" class="ql-native-chat-btn">Use Standard Chat</button><button id="ql-security-scan" class="ql-watermark-btn" style="background:linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.08));border-color:rgba(245,158,11,0.3);color:#fbbf24;margin-top:6px">Security Analysis</button><button id="ql-download-project" class="ql-watermark-btn" style="background:linear-gradient(135deg,rgba(59,130,246,0.12),rgba(37,99,235,0.08));border-color:rgba(59,130,246,0.3);color:#60a5fa;margin-top:6px">Download Source Code</button><div id="ql-download-status" style="display:none"></div>';
  setupSend();
  setupSuggestionChips();
  setupWatermarkButton();
  setupOptimize();
  setupSpeech();
  setupModoPlan();
  setupFileAttachment();
  setupShield();
  setupNativeChatButton();
  setupClipboardPaste();
  setupSecurityAnalysis();
  setupDownloadProject();
}
function setupTabs() {
  const value145 = document.querySelectorAll(".ql-tab");
  value145.forEach((param82) => {
    param82.addEventListener("click", () => {
      const value146 = param82.getAttribute("data-tab");
      qlActiveTab = value146;
      document
        .querySelectorAll(".ql-tab")
        .forEach((param83) =>
          param83.classList.toggle(
            "ql-tab-active",
            param83.getAttribute("data-tab") === value146,
          ),
        );
      if (value146 === "history") {
        loadChatHistory(() => renderHistoryView());
      } else {
        renderPromptView();
      }
    });
  });
}
function _qlUlid() {
  const text8 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  let value147 = Date.now();
  let text9 = "";
  for (let count5 = 9; count5 >= 0; count5--) {
    text9 = text8[value147 % 32] + text9;
    value147 = Math.floor(value147 / 32);
  }
  for (let count6 = 0; count6 < 16; count6++) {
    text9 += text8[Math.floor(Math.random() * 32)];
  }
  return text9;
}
function sendViaWs(param84, param85) {
  return new Promise(function (param86, param87) {
    const config4 = {
      id: "umsg_" + _qlUlid(),
      message: param84,
      files: [],
      selected_elements: [],
      chat_only: false,
      view: "editor",
      view_description: "",
      optimisticImageUrls: [],
      ai_message_id: "aimsg_" + _qlUlid(),
      thread_id: "main",
      current_page: window.location.pathname || "/",
      current_viewport_width: window.innerWidth || 1280,
      current_viewport_height: window.innerHeight || 800,
      current_viewport_dpr: window.devicePixelRatio || 1,
      model: null,
    };
    var value148 = setTimeout(function () {
      window.removeEventListener("message", function4);
      param87(new Error("Timeout: WebSocket did not respond"));
    }, 6000);
    function function4(param88) {
      if (param88.source !== window || !param88.data) {
        return;
      }
      if (param88.data.type !== "lovableWsSendResult") {
        return;
      }
      clearTimeout(value148);
      window.removeEventListener("message", function4);
      if (param88.data.success) {
        param86();
      } else {
        param87(new Error(param88.data.error || "WebSocket send failed"));
      }
    }
    window.addEventListener("message", function4);
    window.postMessage(
      {
        type: "lovableSendViaWs",
        payload: config4,
      },
      "*",
    );
  });
}
chrome.runtime.onMessage.addListener(function (param89, param90, param91) {
  if (param90.id !== chrome.runtime.id) {
    return;
  }
  if (param89.action === "qlSendViaWs") {
    sendNativeToLovable(param89.message)
      .then(function () {
        param91({
          ok: true,
        });
      })
      .catch(function (param92) {
        param91({
          ok: false,
          error: param92.message,
        });
      });
    return true;
  }
  if (param89.action === "qlActivateNativeChat") {
    activateNativeChat();
    param91({
      ok: true,
    });
    return true;
  }
  if (param89.action === "qlDeactivateNativeChat") {
    deactivateNativeChat();
    param91({
      ok: true,
    });
    return true;
  }
  if (param89.action === "qlActivateBypass") {
    activateBypass();
    param91({
      ok: true,
    });
    return true;
  }
  if (param89.action === "qlDeactivateBypass") {
    deactivateBypass();
    param91({
      ok: true,
    });
    return true;
  }
  if (param89.action === "qlQuickProjectInit") {
    quickProjectInit()
      .then(function () {
        param91({
          ok: true,
        });
      })
      .catch(function (param93) {
        param91({
          ok: false,
          error: param93.message,
        });
      });
    return true;
  }
  if (param89.action === "qlRequestToken") {
    requestLatestTokenFromHook()
      .then(function () {
        param91({
          ok: true,
        });
      })
      .catch(function () {
        param91({
          ok: false,
        });
      });
    return true;
  }
  if (param89.action === "qlPublishProject" || param89.action === "PUBLISH_PROJECT") {
    (async () => {
      try {
        const { token, projectId } = await getStoredLovableTokenAndProject();
        const res = await publishProject({ projectId, token });
        param91(res);
      } catch (err) {
        param91({ ok: false, error: err.message });
      }
    })();
    return true;
  }
  if (param89.action === "qlGetSecurityData" || param89.action === "GET_SECURITY_DATA") {
    (async () => {
      try {
        const { token, projectId } = await getStoredLovableTokenAndProject();
        const res = await getSecurityData({ projectId, token });
        param91(res);
      } catch (err) {
        param91({ ok: false, error: err.message });
      }
    })();
    return true;
  }
  if (param89.action === "qlRunSecurityScan" || param89.action === "RUN_SECURITY_SCAN") {
    (async () => {
      try {
        const { token, projectId } = await getStoredLovableTokenAndProject();
        const res = await runSecurityScan({ projectId, token, force: param89.force });
        param91(res);
      } catch (err) {
        param91({ ok: false, error: err.message });
      }
    })();
    return true;
  }
  if (param89.action === "qlFixAllSecurity" || param89.action === "FIX_ALL_SECURITY") {
    (async () => {
      try {
        const { token, projectId } = await getStoredLovableTokenAndProject();
        const res = await fixAllSecurityFindings({ projectId, token, findings: param89.findings || _lastSecurityFindings });
        param91(res);
      } catch (err) {
        param91({ ok: false, error: err.message });
      }
    })();
    return true;
  }
});
async function quickProjectInit() {
  if (window.location.pathname.match(/\/projects\/[a-f0-9-]{36}/i)) {
    throw new Error(
      "Use this button on the Lovable home screen, with no project open.",
    );
  }
  const value149 = document.querySelector("form#chat-input");
  if (!value149) {
    throw new Error(
      "Form not found. Make sure you are on the Lovable home screen.",
    );
  }
  const value150 = value149.querySelector('[contenteditable="true"]');
  if (!value150) {
    throw new Error("Text field not found.");
  }
  const value151 = document.getElementById("chatinput-send-message-button");
  if (!value151) {
    throw new Error("Create button not found.");
  }
  value150.focus();
  document.execCommand("selectAll", false, null);
  document.execCommand("insertText", false, ".");
  await new Promise((param94) => setTimeout(param94, 300));
  if (value151.disabled) {
    value151.removeAttribute("disabled");
  }
  value151.click();
  const value152 = await new Promise(function (param95) {
    const count7 = 25000;
    const value153 = Date.now();
    const value154 = setInterval(function () {
      if (Date.now() - value153 > count7) {
        clearInterval(value154);
        param95(false);
        return;
      }
      const value155 = document.querySelector(
        'button[aria-label="Stop generating"]',
      );
      if (value155 && !value155.disabled) {
        clearInterval(value154);
        value155.click();
        param95(true);
      }
    }, 200);
  });
  if (!value152) {
    throw new Error(
      "Timeout waiting for Stop. Check if a project was created in your list.",
    );
  }
}
const MAX_FILES = 10;
const MAX_FILE_SIZE = 20971520;
let qlAttachedFiles = [];
function formatFileSize(param96) {
  if (param96 < 1024) {
    return param96 + " B";
  }
  if (param96 < 1048576) {
    return (param96 / 1024).toFixed(1) + " KB";
  }
  return (param96 / 1048576).toFixed(1) + " MB";
}
function isImageType(param97) {
  return ["image/png", "image/jpeg", "image/webp"].includes(param97);
}
async function compressImage(param98) {
  return new Promise((param99) => {
    const value156 = new Image();
    const value157 = URL.createObjectURL(param98);
    value156.onload = () => {
      URL.revokeObjectURL(value157);
      const count8 = 1280;
      let value158 = value156.width;
      let value159 = value156.height;
      if (value158 > count8 || value159 > count8) {
        const value164 = Math.min(count8 / value158, count8 / value159);
        value158 = Math.round(value158 * value164);
        value159 = Math.round(value159 * value164);
      }
      const value160 = document.createElement("canvas");
      value160.width = value158;
      value160.height = value159;
      const value161 = value160.getContext("2d");
      value161.drawImage(value156, 0, 0, value158, value159);
      const value162 =
        param98.type === "image/png" ? "image/png" : "image/jpeg";
      const value163 = param98.type === "image/png" ? undefined : 0.8;
      value160.toBlob(
        (param100) => {
          if (!param100) {
            return param99({
              file: param98,
              previewUrl: null,
            });
          }
          const value165 = new File([param100], param98.name, {
            type: value162,
          });
          const value166 = URL.createObjectURL(param100);
          param99({
            file: value165,
            previewUrl: value166,
          });
        },
        value162,
        value163,
      );
    };
    value156.onerror = () => {
      URL.revokeObjectURL(value157);
      param99({
        file: param98,
        previewUrl: null,
      });
    };
    value156.src = value157;
  });
}
function decodeJwtUserId(param101) {
  const value167 = decodeJwtPayload(param101);
  if (!value167 || typeof value167 !== "object") {
    return null;
  }
  return value167.sub || value167.user_id || null;
}
async function uploadFileDirect(param102, param103) {
  const value168 = crypto.randomUUID();
  const callback3 = (param104) => {
    if (param104 && typeof param104.type === "string" && param104.type.trim()) {
      return param104.type;
    }
    const value174 = (
      param104 && param104.name ? param104.name : ""
    ).toLowerCase();
    const value175 = value174.includes(".") ? value174.split(".").pop() : "";
    const config5 = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      webp: "image/webp",
      gif: "image/gif",
    };
    return config5[value175] || "application/octet-stream";
  };
  const callback4 = (param105, param106) => {
    const value176 = param106 && param106.name ? String(param106.name) : "";
    const value177 = value176.includes(".")
      ? value176.split(".").pop().toLowerCase()
      : "";
    const value178 =
      value177 && /^[a-z0-9]{1,10}$/.test(value177) ? value177 : "png";
    const value179 = Date.now();
    return "uploads/" + value179 + "-" + param105 + "." + value178;
  };
  const value169 = callback3(param102);
  if (!param102.type) {
    try {
      param102 = new File([param102], param102.name || "file", { type: value169 });
    } catch (error27) {}
  }
  const value170 = await new Promise((param107) =>
    chrome.storage.local.get(["eu_license_key", "ql_license_key"], param107),
  );
  return window.EUBackend.uploadMedia(param102, window.EUBackend.getLicenseKey(value170));
}
function renderAttachPreview() {
  const value181 = document.getElementById("ql-attach-preview");
  if (!value181) {
    return;
  }
  if (qlAttachedFiles.length === 0) {
    value181.style.display = "none";
    value181.innerHTML = "";
    return;
  }
  value181.style.display = "flex";
  value181.innerHTML = qlAttachedFiles
    .map((param109, param110) => {
      const value182 = param109.previewUrl
        ? '<img class="ql-attach-thumb" src="' +
          param109.previewUrl +
          '" alt="">'
        : '<div class="ql-attach-icon">📄</div>';
      const value183 = param109.uploading ? " ql-attach-uploading" : "";
      return (
        '<div class="ql-attach-item' +
        value183 +
        '" data-idx="' +
        param110 +
        '">' +
        value182 +
        '<div class="ql-attach-info"><span class="ql-attach-name" title="' +
        escapeHtml(param109.file_name) +
        '">' +
        escapeHtml(param109.file_name) +
        '</span><span class="ql-attach-size">' +
        escapeHtml(param109.sizeLabel) +
        '</span></div><button class="ql-attach-remove" data-idx="' +
        param110 +
        '">✕</button></div>'
      );
    })
    .join("");
  value181.querySelectorAll(".ql-attach-remove").forEach((param111) => {
    param111.addEventListener("click", (param112) => {
      param112.stopPropagation();
      const value184 = parseInt(param111.getAttribute("data-idx"));
      if (qlAttachedFiles[value184] && qlAttachedFiles[value184].previewUrl) {
        URL.revokeObjectURL(qlAttachedFiles[value184].previewUrl);
      }
      qlAttachedFiles.splice(value184, 1);
      renderAttachPreview();
    });
  });
}
function setupFileAttachment() {
  const value185 = document.getElementById("ql-attach-btn");
  const value186 = document.getElementById("ql-file-input");
  if (!value185 || !value186) {
    return;
  }
  value185.addEventListener("click", () => {
    if (qlAttachedFiles.length >= MAX_FILES) {
      showCustomAlert("Limit", "Maximum of " + MAX_FILES + " files.");
      return;
    }
    value186.click();
  });
  value186.addEventListener("change", async () => {
    const value187 = Array.from(value186.files || []);
    value186.value = "";
    if (!value187.length) {
      return;
    }
    const value188 = await new Promise((param113) =>
      chrome.storage.local.get(["lovable_token"], param113),
    );
    let value189 = value188.lovable_token || "";
    if (!value189) {
      showCustomAlert(
        "Error",
        "Token not captured. Navigate in Lovable to sync.",
      );
      return;
    }
    if (value189.startsWith("Bearer ")) {
      value189 = value189.slice(7);
    }
    const callback5 = async (param114) => {
      const value190 = await param114.slice(0, 12).arrayBuffer();
      const value191 = new Uint8Array(value190);
      const value192 =
        value191[0] === 137 &&
        value191[1] === 80 &&
        value191[2] === 78 &&
        value191[3] === 71;
      const value193 =
        value191[0] === 255 && value191[1] === 216 && value191[2] === 255;
      const value194 =
        value191[0] === 82 &&
        value191[1] === 73 &&
        value191[2] === 70 &&
        value191[3] === 70 &&
        value191[8] === 87 &&
        value191[9] === 69 &&
        value191[10] === 66 &&
        value191[11] === 80;
      return value192 || value193 || value194;
    };
    for (const value195 of value187) {
      if (qlAttachedFiles.length >= MAX_FILES) {
        showCustomAlert(
          "Limit",
          "Maximum of " + MAX_FILES + " files reached.",
        );
        break;
      }
      if (!isImageType(value195.type)) {
        showCustomAlert(
          "Invalid type",
          value195.name + " is not an image. Only PNG, JPEG, and WEBP are accepted.",
        );
        continue;
      }
      if (value195.size > MAX_FILE_SIZE) {
        showCustomAlert("Large file", value195.name + " exceeds 20MB.");
        continue;
      }
      const value196 = await callback5(value195);
      if (!value196) {
        showCustomAlert(
          "Invalid file",
          value195.name + " is not a valid image.",
        );
        continue;
      }
      let value197 = value195;
      let value198 = null;
      if (isImageType(value195.type)) {
        const value201 = await compressImage(value195);
        value197 = value201.file;
        value198 = value201.previewUrl;
      }
      const value199 = isImageType(value197.type);
      const value200 = qlAttachedFiles.length;
      qlAttachedFiles.push({
        file_id: null,
        file_name: value195.name,
        previewUrl: value198,
        file_type: value197.type,
        sizeLabel: formatFileSize(value197.size),
        uploading: true,
        rawFile: value197,
      });
      renderAttachPreview();
      try {
        const value202 = await uploadFileDirect(value197, value189);
        qlAttachedFiles[value200].file_id = value202.file_id;
        qlAttachedFiles[value200].public_url = value202.public_url;
        qlAttachedFiles[value200].uploading = false;
        renderAttachPreview();
      } catch (error20) {
        console.warn(
          "[QL Upload] Failed to upload to storage:",
          error20.message,
        );
        qlAttachedFiles[value200].uploading = false;
        qlAttachedFiles[value200].uploadFailed = true;
        renderAttachPreview();
        showCustomAlert(
          "Upload Error",
          "Could not upload the image: " +
            (error20.message || "unknown error"),
        );
      }
    }
  });
}
async function sendNativeToLovable(param115) {
  const value203 = document.querySelector("form#chat-input");
  if (!value203) {
    throw new Error("Lovable chat not found. Open a project.");
  }
  const value204 = value203.querySelector('[contenteditable="true"]');
  if (!value204) {
    throw new Error("Chat editor not found on the page.");
  }
  const value205 = document.getElementById("chatinput-send-message-button");
  if (!value205) {
    throw new Error("please wait");
  }
  value204.focus();
  document.execCommand("selectAll", false, null);
  document.execCommand("insertText", false, param115);
  await new Promise((param116) => setTimeout(param116, 200));
  const value206 = value205.disabled;
  if (value206) {
    value205.removeAttribute("disabled");
  }
  value205.click();
  if (value206) {
    value205.setAttribute("disabled", "");
  }
}
function setupSend() {
  const value207 = document.getElementById("ql-send");
  if (!value207) {
    return;
  }
  value207.addEventListener("click", async () => {
    var value208 = document.getElementById("ql-msg");
    const value209 = value208 ? (value208.value || "").trim() : "";
    const value210 = document.getElementById("ql-log");
    if (!value209) {
      if (value210) {
        value210.className = "ql-log-error";
        value210.innerText = "⚠ Empty prompt";
      }
      return;
    }
    const value211 = qlAttachedFiles.filter(function (param117) {
      return (
        param117.public_url && !param117.uploading && !param117.uploadFailed
      );
    });
    const value212 = value211.length > 0;
    var value213 = value209;
    if (value212) {
      var value214 = value211
        .map(function (param118) {
          return param118.public_url;
        })
        .join("\n");
      var value215 =
        value211.length > 1
          ? "Attached files:\n"
          : "Attached file: ";
      value213 = value209 + "\n\n" + value215 + value214;
    }
    try {
      if (value210) {
        value210.className = "ql-log-info";
        value210.innerHTML = value212
          ? "📎 Sending with image..."
          : SVG_ICONS.clock + " Sending prompt...";
      }
      value207.classList.add("ql-sending");
      value207.disabled = true;
      await sendNativeToLovable(value213);
      if (value210) {
        value210.className = "ql-log-success";
        value210.innerText = value212
          ? "✓ Prompt sent!"
          : "✓ Prompt sent!";
      }
      try {
        if (typeof QLSounds !== "undefined") {
          QLSounds.promptSent();
        }
      } catch (error21) {}
      addToChatHistory(value209, "ok");
      var value216 = document.getElementById("ql-msg");
      if (value216) {
        value216.value = "";
      }
      qlAttachedFiles.forEach((param119) => {
        if (param119.previewUrl) {
          URL.revokeObjectURL(param119.previewUrl);
        }
      });
      qlAttachedFiles = [];
      renderAttachPreview();
    } catch (error22) {
      if (value210) {
        value210.className = "ql-log-error";
        value210.innerText = "✗ " + (error22.message || error22);
      }
      addToChatHistory(value209, "error");
    } finally {
      value207.classList.remove("ql-sending");
      value207.disabled = false;
    }
  });
}
let _dragCleanup = null;
let _resizeCleanup = null;
function setupDrag() {
  if (_dragCleanup) {
    _dragCleanup();
    _dragCleanup = null;
  }
  const value217 = document.getElementById("ql-floating");
  const value218 = document.getElementById("ql-header");
  if (!value217 || !value218) {
    return;
  }
  let flag2 = false;
  let count9 = 0;
  let count10 = 0;
  let count11 = 0;
  let count12 = 0;
  function function5(param120) {
    var value219 = param120.target;
    while (value219 && value219 !== value218) {
      var value220 = value219.nodeName;
      if (
        value220 === "BUTTON" ||
        value220 === "INPUT" ||
        value220 === "SELECT" ||
        value220 === "TEXTAREA" ||
        value220 === "A"
      ) {
        return;
      }
      value219 = value219.parentElement;
    }
    if (param120.pointerType === "mouse" && param120.button !== 0) {
      return;
    }
    const value221 = value217.getBoundingClientRect();
    count9 = param120.clientX;
    count10 = param120.clientY;
    count11 = value221.left;
    count12 = value221.top;
    flag2 = true;
    try {
      value218.setPointerCapture(param120.pointerId);
    } catch (error23) {}
    document.addEventListener("pointermove", function6);
    document.addEventListener("pointerup", function7);
  }
  function function6(param121) {
    if (!flag2) {
      return;
    }
    document.body.style.userSelect = "none";
    let value222 = count11 + (param121.clientX - count9);
    let value223 = count12 + (param121.clientY - count10);
    value222 = Math.max(
      0,
      Math.min(value222, window.innerWidth - value217.offsetWidth),
    );
    value223 = Math.max(
      0,
      Math.min(value223, window.innerHeight - value217.offsetHeight),
    );
    value217.style.left = value222 + "px";
    value217.style.top = value223 + "px";
  }
  function function7(param122) {
    if (!flag2) {
      return;
    }
    flag2 = false;
    document.body.style.userSelect = "";
    try {
      value218.releasePointerCapture(param122.pointerId);
    } catch (error24) {}
    document.removeEventListener("pointermove", function6);
    document.removeEventListener("pointerup", function7);
    document.body.style.userSelect = "";
  }
  value218.addEventListener("pointerdown", function5, {
    passive: false,
  });
  _dragCleanup = function () {
    value218.removeEventListener("pointerdown", function5);
    document.removeEventListener("pointermove", function6);
    document.removeEventListener("pointerup", function7);
  };
}
function setupResize() {
  if (_resizeCleanup) {
    _resizeCleanup();
    _resizeCleanup = null;
  }
  const value224 = document.getElementById("ql-floating");
  const value225 = document.getElementById("ql-resize-handle");
  if (!value224 || !value225) {
    return;
  }
  let flag3 = false;
  let count13 = 0;
  let count14 = 0;
  function function8(param123) {
    param123.preventDefault();
    param123.stopPropagation();
    flag3 = true;
    count13 = param123.clientY;
    count14 = value224.offsetHeight;
    try {
      value225.setPointerCapture(param123.pointerId);
    } catch (error25) {}
    document.addEventListener("pointermove", function9);
    document.addEventListener("pointerup", function10);
    document.body.style.userSelect = "none";
  }
  function function9(param124) {
    if (!flag3) {
      return;
    }
    let value226 = count14 + (param124.clientY - count13);
    value226 = Math.max(200, Math.min(value226, window.innerHeight * 0.8));
    value224.style.height = value226 + "px";
  }
  function function10(param125) {
    if (!flag3) {
      return;
    }
    flag3 = false;
    qlHeight = value224.offsetHeight;
    chrome.storage.local.set({
      ql_height: qlHeight,
    });
    try {
      value225.releasePointerCapture(param125.pointerId);
    } catch (error26) {}
    document.removeEventListener("pointermove", function9);
    document.removeEventListener("pointerup", function10);
    document.body.style.userSelect = "";
  }
  value225.addEventListener("pointerdown", function8, {
    passive: false,
  });
  _resizeCleanup = function () {
    value225.removeEventListener("pointerdown", function8);
    document.removeEventListener("pointermove", function9);
    document.removeEventListener("pointerup", function10);
  };
}
function setupClipboardPaste() {
  var value227 = document.getElementById("ql-msg");
  if (!value227) {
    return;
  }
  var value228 = document.getElementById("ql-floating") || value227;
  var value229 = null;
  function function11() {
    if (value229) {
      return;
    }
    value229 = document.createElement("div");
    value229.className = "ql-drag-overlay";
    value229.innerHTML =
      '<div class="ql-drag-overlay-inner">📂 Drop files here</div>';
    var value230 = document.getElementById("ql-floating");
    if (value230) {
      value230.appendChild(value229);
    }
  }
  function function12() {
    if (value229) {
      value229.remove();
      value229 = null;
    }
  }
  value228.addEventListener("dragover", function (param126) {
    param126.preventDefault();
    param126.stopPropagation();
    function11();
  });
  value228.addEventListener("dragleave", function (param127) {
    param127.preventDefault();
    param127.stopPropagation();
    if (!value228.contains(param127.relatedTarget)) {
      function12();
    }
  });
  value228.addEventListener("drop", async function (param128) {
    param128.preventDefault();
    param128.stopPropagation();
    function12();
    var value231 = Array.from(param128.dataTransfer.files || []);
    if (!value231.length) {
      return;
    }
    await handleFilesAttach(value231);
  });
  value227.addEventListener("paste", async function (param129) {
    var value232 = param129.clipboardData && param129.clipboardData.items;
    if (!value232) {
      return;
    }
    var items5 = [];
    for (var count15 = 0; count15 < value232.length; count15++) {
      var value233 = value232[count15];
      if (value233.kind === "file") {
        param129.preventDefault();
        var value234 = value233.getAsFile();
        if (value234) {
          items5.push(value234);
        }
      }
    }
    if (items5.length > 0) {
      await handleFilesAttach(items5);
    }
  });
}
async function handleFilesAttach(param130) {
  if (qlAttachedFiles.length >= MAX_FILES) {
    showCustomAlert("Limit", "Maximo " + MAX_FILES + " files.");
    return;
  }
  var value235 = await new Promise(function (param131) {
    chrome.storage.local.get(["lovable_token"], param131);
  });
  var value236 = value235.lovable_token || "";
  if (!value236) {
    showCustomAlert("Error", "Token not captured.");
    return;
  }
  if (value236.indexOf("Bearer ") === 0) {
    value236 = value236.slice(7);
  }
  for (var count16 = 0; count16 < param130.length; count16++) {
    var value237 = param130[count16];
    if (qlAttachedFiles.length >= MAX_FILES) {
      break;
    }
    if (value237.size > MAX_FILE_SIZE) {
      showCustomAlert("Too large", value237.name + " exceeds 20MB.");
      continue;
    }
    var value238 = value237;
    var value239 = null;
    if (isImageType(value237.type)) {
      var value240 = await compressImage(value237);
      value238 = value240.file;
      value239 = value240.previewUrl;
    }
    var value241 = qlAttachedFiles.length;
    qlAttachedFiles.push({
      file_id: null,
      file_name: value237.name || "file_" + Date.now(),
      previewUrl: value239,
      file_type: value238.type,
      sizeLabel: formatFileSize(value238.size),
      uploading: true,
      rawFile: value238,
    });
    renderAttachPreview();
    try {
      var value242 = await uploadFileDirect(value238, value236);
      qlAttachedFiles[value241].file_id = value242.file_id;
      qlAttachedFiles[value241].uploading = false;
      renderAttachPreview();
    } catch (error27) {
      qlAttachedFiles[value241].uploading = false;
      qlAttachedFiles[value241].file_id = "local_direct_" + crypto.randomUUID();
      qlAttachedFiles[value241].uploadFailed = true;
      renderAttachPreview();
    }
  }
  showCustomAlert("Attached 📎", param130.length + " file(s) added!");
}
var CURRENT_EXT_VERSION_POPUP = "3.0";
function setupDownloadProject() {
  var value243 = document.getElementById("ql-download-project");
  if (!value243) {
    return;
  }
  value243.addEventListener("click", async function () {
    var value244 = document.getElementById("ql-download-status");
    value243.disabled = true;
    value243.textContent = "Preparing...";
    if (value244) {
      value244.style.display = "block";
      value244.className = "ql-log-info";
      value244.textContent = "Checking token and project...";
    }
    try {
      var value247 = await new Promise(function (param132) {
        chrome.storage.local.get(
          ["lovable_token", "lovable_projectId"],
          param132,
        );
      });
      var value248 = value247.lovable_token || "";
      var value249 = value247.lovable_projectId || "";
      if (value248.indexOf("Bearer ") === 0) {
        value248 = value248.slice(7);
      }
      var value250 = value249;
      if (!value250) {
        throw new Error("Open a Lovable project page first.");
      }
      if (!value248) {
        var value251 = await new Promise(function (param133) {
          chrome.runtime.sendMessage(
            {
              action: "readCookies",
            },
            function (param134) {
              param133(param134);
            },
          );
        });
        if (
          value251 &&
          value251.success &&
          value251.tokens &&
          value251.tokens.length > 0
        ) {
          value248 = value251.tokens[0].token;
        }
      }
      if (!value248) {
        throw new Error(
          "Token not found. Open a Lovable project and wait for sync.",
        );
      }
      value243.textContent = "Downloading...";
      if (value244) {
        value244.textContent = "Downloading project files...";
      }
      var value252 = await new Promise(function (param135) {
        chrome.runtime.sendMessage(
          {
            action: "downloadProject",
            projectId: value250,
            token: value248,
          },
          function (param136) {
            param135(param136);
          },
        );
      });
      if (!value252 || !value252.success) {
        throw new Error(
          value252 && value252.error ? value252.error : "Download failed",
        );
      }
      var value253 = value252.files;
      if (!value253 || value253.length === 0) {
        throw new Error("No files found in the project.");
      }
      if (value244) {
        value244.textContent =
          "Creating ZIP with " + value253.length + " files...";
      }
      value243.textContent = "Packaging...";
      if (typeof JSZip === "undefined") {
        throw new Error("JSZip is not loaded. Use the Side Panel.");
      }
      var value254 = new JSZip();
      var items6 = [
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
      var count17 = 0;
      for (var count18 = 0; count18 < value253.length; count18++) {
        var value255 = value253[count18];
        if (!value255.name || value255.sizeExceeded) {
          continue;
        }
        if (value255.contents && value255.binary) {
          value254.file(value255.name, value255.contents, {
            base64: true,
            binary: true,
          });
          count17++;
        } else if (
          !value255.contents &&
          items6.some(function (param137) {
            return value255.name.toLowerCase().endsWith(param137);
          })
        ) {
          try {
            var value256 = await fetch(
              "https://api.lovable.dev/projects/" +
                value250 +
                "/files/raw?path=" +
                encodeURIComponent(value255.name),
              {
                method: "GET",
                headers: {
                  Authorization: "Bearer " + value248,
                },
                credentials: "omit",
                mode: "cors",
              },
            );
            if (value256.ok) {
              value254.file(value255.name, await value256.arrayBuffer(), {
                binary: true,
              });
              count17++;
            } else if (value255.contents) {
              value254.file(value255.name, value255.contents);
              count17++;
            }
          } catch (error29) {
            if (value255.contents) {
              value254.file(value255.name, value255.contents);
              count17++;
            }
          }
        } else if (value255.contents) {
          value254.file(value255.name, value255.contents);
          count17++;
        }
      }
      var value257 = await value254.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9,
        },
      });
      var value258 = document.createElement("a");
      value258.href = URL.createObjectURL(value257);
      value258.download =
        "lovable-" +
        value250.substring(0, 8) +
        "-" +
        new Date().toISOString().split("T")[0] +
        ".zip";
      document.body.appendChild(value258);
      value258.click();
      document.body.removeChild(value258);
      URL.revokeObjectURL(value258.href);
      if (value244) {
        value244.className = "ql-log-success";
        value244.textContent = count17 + " files downloaded!";
      }
      value243.textContent = "Download Complete!";
      setTimeout(function () {
        value243.textContent = "Download Source Code";
        value243.disabled = false;
        if (value244) {
          value244.style.display = "none";
        }
      }, 4000);
    } catch (error30) {
      if (value244) {
        value244.className = "ql-log-error";
        value244.textContent = error30.message || error30;
        value244.style.display = "block";
      }
      value243.textContent = "Failed";
      setTimeout(function () {
        value243.textContent = "Download Source Code";
        value243.disabled = false;
      }, 3000);
    }
  });
}
async function checkForUpdatePopup() {
  chrome.storage.local.get(["eu_operations", "ql_operations"], (param138) => {
    euMaybeShowOptionalUpgrade(param138.eu_operations || param138.ql_operations);
  });
}
async function checkResellerRolePopup() {
  return;
}
let qlNativeChatActive = false;
let qlNativeChatCleanup = null;
function activateNativeChat() {
  qlNativeChatActive = true;
  chrome.storage.local.set({
    ql_native_chat: true,
  });
  const value266 = document.getElementById("ql-floating");
  if (value266) {
    value266.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    value266.style.opacity = "0";
    value266.style.transform = "scale(0.95) translateX(20px)";
    setTimeout(() => {
      value266.style.display = "none";
    }, 350);
  }
  injectNativeChatOverlay();
}
function deactivateNativeChat() {
  qlNativeChatActive = false;
  chrome.storage.local.set({
    ql_native_chat: false,
  });
  if (qlNativeChatCleanup) {
    qlNativeChatCleanup();
    qlNativeChatCleanup = null;
  }
  const value267 = document.getElementById("ql-native-badge");
  if (value267) {
    value267.remove();
  }
  const value268 = document.getElementById("ql-native-return-btn");
  if (value268) {
    value268.remove();
  }
  const value269 = document.getElementById("chatinput-send-message-button");
  if (value269) {
    value269.classList.remove("ql-native-send-active");
    value269.style.animation = "";
  }
  const value270 = document.getElementById("ql-floating");
  if (value270) {
    value270.style.display = "";
    value270.style.opacity = "0";
    value270.style.transform = "scale(0.95)";
    requestAnimationFrame(() => {
      value270.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      value270.style.opacity = "1";
      value270.style.transform = "scale(1) translateX(0)";
    });
  } else {
    _buildFloatingUI();
  }
}
function injectNativeChatOverlay() {
  const value271 = document.querySelector("form#chat-input");
  if (!value271) {
    setTimeout(injectNativeChatOverlay, 500);
    return;
  }
  if (!document.getElementById("ql-native-badge")) {
    const value273 = getComputedStyle(value271).position;
    if (value273 === "static") {
      value271.style.position = "relative";
    }
    const value274 = document.createElement("div");
    value274.id = "ql-native-badge";
    value274.className = "ql-native-badge";
    value274.innerHTML = "⚡ <span>Lovable</span>";
    value271.appendChild(value274);
  }
  if (!document.getElementById("ql-native-return-btn")) {
    const value275 = document.createElement("button");
    value275.id = "ql-native-return-btn";
    value275.className = "ql-native-return-btn";
    value275.innerHTML = "← Back to Extension";
    value275.addEventListener("click", (param140) => {
      param140.preventDefault();
      param140.stopPropagation();
      deactivateNativeChat();
    });
    value271.parentElement.insertBefore(value275, value271.nextSibling);
  }
  const value272 = document.getElementById("chatinput-send-message-button");
  if (value272) {
    value272.classList.add("ql-native-send-active");
  }
  function function13(param141) {
    if (!qlNativeChatActive) {
      return;
    }
    const value276 = value271.querySelector('[contenteditable="true"]');
    const value277 = value276
      ? (value276.innerText || value276.textContent || "").trim()
      : "";
    if (value277) {
      addToChatHistory(value277, "ok");
    }
  }
  function function14(param142) {
    if (!qlNativeChatActive) {
      return;
    }
    const value278 = value271.querySelector('[contenteditable="true"]');
    const value279 = value278
      ? (value278.innerText || value278.textContent || "").trim()
      : "";
    if (value279) {
      addToChatHistory(value279, "ok");
    }
  }
  function function15(param143) {
    if (!qlNativeChatActive) {
      return;
    }
    if (param143.key === "Enter" && !param143.shiftKey) {
      const value280 = value271.querySelector('[contenteditable="true"]');
      const value281 = value280
        ? (value280.innerText || value280.textContent || "").trim()
        : "";
      if (value281) {
        addToChatHistory(value281, "ok");
      }
    }
  }
  if (value272) {
    value272.addEventListener("click", function13, true);
  }
  value271.addEventListener("submit", function14, true);
  value271.addEventListener("keydown", function15, true);
  qlNativeChatCleanup = function () {
    if (value272) {
      value272.removeEventListener("click", function13, true);
    }
    value271.removeEventListener("submit", function14, true);
    value271.removeEventListener("keydown", function15, true);
  };
}
async function sendViaNativeChat(param144, param145) {
  addToChatHistory(param144, "ok");
}
function showNativeSendingOverlay(param146) {
  const text10 = "ql-native-sending-overlay";
  const value282 = document.getElementById(text10);
  if (!param146) {
    if (value282) {
      value282.remove();
    }
    return;
  }
  if (value282) {
    return;
  }
  const value283 = document.createElement("div");
  value283.id = text10;
  value283.className = "ql-native-sending-overlay";
  value283.innerHTML = '<div class="ql-spinner"></div> Enviando prompt...';
  document.body.appendChild(value283);
}
function showNativeChatToast(param147, param148) {
  const value284 = document.getElementById("ql-native-toast");
  if (value284) {
    value284.remove();
  }
  const value285 = document.createElement("div");
  value285.id = "ql-native-toast";
  value285.className = "ql-native-toast ql-native-toast-" + param148;
  value285.textContent = param147;
  document.body.appendChild(value285);
  requestAnimationFrame(() =>
    value285.classList.add("ql-native-toast-visible"),
  );
  setTimeout(() => {
    value285.classList.remove("ql-native-toast-visible");
    setTimeout(() => value285.remove(), 300);
  }, 3000);
}
function setupNativeChatButton() {
  const value286 = document.getElementById("ql-native-chat-btn");
  if (!value286) {
    return;
  }
  value286.addEventListener("click", () => {
    activateNativeChat();
  });
}
chrome.storage.local.get(["ql_native_chat"], (param149) => {
  if (param149.ql_native_chat === true) {
    qlNativeChatActive = true;
    setTimeout(() => {
      const value287 = document.getElementById("ql-floating");
      if (value287) {
        value287.style.display = "none";
      }
      injectNativeChatOverlay();
    }, 500);
  }
});
window.addEventListener("message", function (param150) {
  if (!param150.data || param150.data.type !== "qlPreviewBuilt") {
    return;
  }
  if (param150.origin !== "https://lovable.dev") {
    return;
  }
  setTimeout(function () {
    const value288 = Array.from(document.querySelectorAll("iframe"));
    const value289 =
      value288.find(function (param151) {
        return (
          param151.src &&
          (param151.src.includes("lovableproject.com") ||
            param151.src.includes("lovable-app") ||
            (param151.src.includes(".lovable.") &&
              !param151.src.includes("lovable.dev")))
        );
      }) ||
      value288.find(function (param152) {
        return (
          param152.src &&
          param152.src.startsWith("https://") &&
          !param152.src.includes("chrome-extension://") &&
          !param152.src.includes("lovable.dev")
        );
      });
    if (value289 && value289.src) {
      console.log(
        "[QL] 🔄 Auto-refresh preview iframe after bypass:",
        value289.src.slice(0, 80),
      );
      const value290 = value289.src;
      value289.src = "";
      setTimeout(function () {
        value289.src = value290;
      }, 100);
    } else {
      console.log(
        "[QL] [qlPreviewBuilt] NONE iframe preview found — reload the preview manually",
      );
    }
  }, 2500);
});
window.addEventListener("message", (param153) => {
  if (!param153.data || param153.data.type !== "lovableTokenFound") {
    return;
  }
  if (param153.origin !== "https://lovable.dev") {
    return;
  }
  const config6 = {};
  if (param153.data.token && typeof param153.data.token === "string") {
    config6.lovable_token = param153.data.token
      .replace(/^Bearer\s+/i, "")
      .trim();
  }
  if (param153.data.projectId && typeof param153.data.projectId === "string") {
    config6.lovable_projectId = param153.data.projectId;
  }
  if (!Object.keys(config6).length) {
    return;
  }
  chrome.storage.local.set(config6, () => {
    updateSyncStatus();
    setTimeout(updateSyncStatus, 200);
    setTimeout(updateSyncStatus, 800);
  });
});

let _lastSecurityFindings = [];

async function getStoredLovableTokenAndProject() {
  var value247 = await new Promise(function (resolve) {
    chrome.storage.local.get(
      ["lovable_token", "lovable_projectId"],
      resolve
    );
  });
  var token = value247.lovable_token || "";
  var projectId = value247.lovable_projectId || "";
  if (token.indexOf("Bearer ") === 0) {
    token = token.slice(7);
  }
  if (!token) {
    var value251 = await new Promise(function (resolve) {
      chrome.runtime.sendMessage(
        { action: "readCookies" },
        function (response) { resolve(response); }
      );
    });
    if (value251 && value251.success && value251.tokens && value251.tokens.length > 0) {
      token = value251.tokens[0].token;
    }
  }
  return { token, projectId };
}

function setupSecurityAnalysis() {
  const btn = document.getElementById("ql-security-scan");
  if (!btn) return;
  btn.addEventListener("click", async function () {
    let modal = document.getElementById("security-modal");
    if (!modal) {
      const container = document.createElement("div");
      container.innerHTML = templateSecurityModal();
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
        renderSecurityState("loading", "Starting a new analysis...");
        try {
          const { token, projectId } = await getStoredLovableTokenAndProject();
          const res = await runSecurityScan({ projectId, token, force: true });
          if (!res.ok) {
            throw new Error(res.error || "Scan failed");
          }
          renderSecurityState("loading", "Analysis started. Waiting for results...");
          await new Promise((resolve) => setTimeout(resolve, 5000));
          await loadSecurityFindings(modal);
        } catch (err) {
          renderSecurityState("error", err.message);
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
          const { token, projectId } = await getStoredLovableTokenAndProject();
          const res = await fixAllSecurityFindings({ projectId, token, findings: _lastSecurityFindings });
          if (res.ok) {
            if (fixText) fixText.textContent = "✓ Sent!";
            setTimeout(() => {
              modal.setAttribute("hidden", "");
              if (fixText) fixText.textContent = "Fix All";
            }, 1800);
          } else {
            throw new Error(res.error || "Fix failed");
          }
        } catch (err) {
          renderSecurityState("error", err.message);
        } finally {
          fixBtn.disabled = false;
          if (fixSpinner) fixSpinner.style.display = "none";
        }
      });
    }

    modal.removeAttribute("hidden");
    renderSecurityState("loading", "Loading analysis...");
    await loadSecurityFindings(modal);
  });
}

async function loadSecurityFindings(modal) {
  try {
    const { token, projectId } = await getStoredLovableTokenAndProject();
    if (!projectId) {
      throw new Error("Open a Lovable project page first.");
    }
    if (!token) {
      throw new Error("Token not found. Open a Lovable project and wait for sync.");
    }
    const res = await getSecurityData({ projectId, token });
    if (!res.ok) {
      throw new Error(res.error || "Failed to load security data");
    }
    renderSecurityFindings(modal, res.data);
  } catch (err) {
    renderSecurityState("error", err.message);
  }
}

function renderSecurityState(state, message) {
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

function renderSecurityFindings(modal, data) {
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

  _lastSecurityFindings = findings;

  const counts = { error: 0, warn: 0, info: 0 };
  for (const item of findings) {
    const lvl = (item.level || "info").toLowerCase();
    if (counts[lvl] !== undefined) counts[lvl]++;
    else counts.info++;
  }

  if (findings.length === 0) {
    if (fixAll) fixAll.style.display = "none";
    renderSecurityState("empty", "All set. No security findings found.");
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

  // Sort findings by severity
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

async function publishProject(input) {
  try {
    const response = await fetch("https://api.lovable.dev/projects/" + input.projectId + "/deployments?async=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + input.token
      },
      body: "{}"
    });
    if (!response.ok && response.status !== 202) {
      let messageText = "";
      try {
        messageText = (await response.text()).slice(0, 120);
      } catch (error) {}
      return {
        ok: false,
        status: response.status,
        error: "HTTP " + response.status + (messageText ? ": " + messageText : "")
      };
    }
    const dataValue = await response.json().catch(() => ({}));
    return { ok: true, deployment: dataValue };
  } catch (error) {
    return { ok: false, error: error.message || String(error) };
  }
}

async function getSecurityData(input) {
  try {
    const response = await fetch("https://api.lovable.dev/projects/" + input.projectId + "/security/data", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + input.token
      }
    });
    if (!response.ok) {
      let messageText = "";
      try {
        messageText = (await response.text()).slice(0, 120);
      } catch (error) {}
      return {
        ok: false,
        status: response.status,
        error: "HTTP " + response.status + (messageText ? ": " + messageText : "")
      };
    }
    const dataValue = await response.json().catch(() => ({}));
    return { ok: true, data: dataValue };
  } catch (error) {
    return { ok: false, error: error.message || String(error) };
  }
}

async function runSecurityScan(input) {
  try {
    const response = await fetch("https://api.lovable.dev/projects/" + input.projectId + "/security-scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + input.token
      },
      body: JSON.stringify({
        scanner_configs: [
          { name: "connector_security_scan" },
          { name: "agent_security" }
        ],
        force: !!input.force
      })
    });
    if (!response.ok) {
      let messageText = "";
      try {
        messageText = (await response.text()).slice(0, 120);
      } catch (error) {}
      return {
        ok: false,
        status: response.status,
        error: "HTTP " + response.status + (messageText ? ": " + messageText : "")
      };
    }
    const dataValue = await response.json().catch(() => ({}));
    return { ok: true, data: dataValue };
  } catch (error) {
    return { ok: false, error: error.message || String(error) };
  }
}

async function fixAllSecurityFindings(input) {
  try {
    const dataValue = Array.isArray(input.findings) ? input.findings : [];
    if (dataValue.length === 0) {
      return { ok: false, error: "no findings to fix" };
    }
    const items = dataValue.map((item) => {
      const asset = {
        id: item.id,
        internal_id: item.internal_id || item.id,
        name: item.name,
        description: item.description,
        level: item.level,
        link: item.link
      };
      if (item.category) asset.category = item.category;
      if (item.details) asset.details = item.details;
      if (item.remediation_difficulty) asset.remediation_difficulty = item.remediation_difficulty;
      if (item.metadata) asset.metadata = item.metadata;
      return {
        scanner_name: item.scanner || "unknown",
        finding: asset
      };
    });
    const messageText = "umsg_" + makeClientMessageId();
    const messageText2 = "aimsg_" + makeClientMessageId();
    const chatMessage = {
      id: messageText,
      message: "Load the security issues from the scan results and fix them.",
      files: [],
      selected_elements: [],
      chat_only: false,
      optimisticImageUrls: [],
      intent: "security_fix_v2",
      ai_message_id: messageText2,
      thread_id: "main",
      view: "services",
      view_description: "The user is viewing the More panel which consolidates Analytics, Cloud, Payments, Security, and SEO & AI search views. The security scan findings are: " + JSON.stringify(items) + ".",
      current_page: "/",
      current_viewport_width: window.innerWidth || 1200,
      current_viewport_height: window.innerHeight || 800,
      current_viewport_dpr: window.devicePixelRatio || 1,
      model: null,
      session_replay: "",
      client_logs: [],
      network_requests: [],
      runtime_errors: [],
      integration_metadata: { browser: {} }
    };
    const response = await fetch("https://api.lovable.dev/projects/" + input.projectId + "/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + input.token
      },
      body: JSON.stringify(chatMessage)
    });
    if (!response.ok && response.status !== 202) {
      let messageText3 = "";
      try {
        messageText3 = (await response.text()).slice(0, 120);
      } catch (error) {}
      return {
        ok: false,
        status: response.status,
        error: "HTTP " + response.status + (messageText3 ? ": " + messageText3 : "")
      };
    }
    return { ok: true, message_id: messageText, count: dataValue.length };
  } catch (error) {
    return { ok: false, error: error.message || String(error) };
  }
}

function makeClientMessageId() {
  const messageText = "0123456789abcdefghjkmnpqrstvwxyz";
  let now = Date.now(), messageText2 = "";
  for (let count = 0; count < 10; count++) {
    messageText2 = messageText[now % 32] + messageText2;
    now = Math.floor(now / 32);
  }
  let messageText3 = "";
  for (let count = 0; count < 16; count++) {
    messageText3 += messageText[Math.floor(Math.random() * 32)];
  }
  return messageText2 + messageText3;
}

