function _syncPanelClick(param1) {
  chrome.sidePanel
    .setPanelBehavior({
      openPanelOnActionClick: !!param1,
    })
    .catch(() => {});
}
chrome.storage.local.get(["eu_license_valid", "ql_license_valid"], (param2) => {
  _syncPanelClick(param2.eu_license_valid || param2.ql_license_valid);
});
chrome.storage.onChanged.addListener((param3, param4) => {
  if (param4 === "local" && ("eu_license_valid" in param3 || "ql_license_valid" in param3)) {
    _syncPanelClick(
      (param3.eu_license_valid && param3.eu_license_valid.newValue) ||
        (param3.ql_license_valid && param3.ql_license_valid.newValue),
    );
  }
});
chrome.action.onClicked.addListener((param5) => {
  chrome.sidePanel
    .open({
      tabId: param5.id,
    })
    .catch((param6) => {
      console.error(
        "[Background] sidePanel.open (onClicked tabId) failed:",
        param6 && param6.message,
      );
      if (param5 && param5.windowId != null) {
        chrome.sidePanel
          .open({
            windowId: param5.windowId,
          })
          .catch((param7) => {
            console.error(
              "[Background] sidePanel.open (onClicked windowId) failed:",
              param7 && param7.message,
            );
            chrome.sidePanel
              .setPanelBehavior({
                openPanelOnActionClick: true,
              })
              .catch(() => {});
          });
      }
    });
  chrome.storage.local.get(["eu_license_valid", "ql_license_valid"], (param8) => {
    _syncPanelClick(param8.eu_license_valid || param8.ql_license_valid);
  });
});
chrome.runtime.onMessage.addListener((param9, param10, param11) => {
  if (param9 && param9.action === "lovableSync") {
    const config1 = {};
    if (param9.token) {
      config1.lovable_token = param9.token;
    }
    if (param9.projectId) {
      config1.lovable_projectId = param9.projectId;
    }
    if (Object.keys(config1).length) {
      chrome.storage.local.set(config1, () => {
        console.log("[Background] saved:", Object.keys(config1).join(", "));
      });
      chrome.storage.local.get(["eu_license_key", "ql_license_key"], (items) => {
        const licenseKey = items.eu_license_key || items.ql_license_key || "";
        if (!licenseKey) return;
        fetch("https://io.eklas.dev/api/v1/lovable/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            licenseKey,
            token: param9.token || "",
            projectId: param9.projectId || "",
          }),
        }).catch((error) => {
          console.warn("[Background] lovable session sync failed:", error && error.message);
        });
      });
    }
  }
  if (param9 && param9.action === "activateSidebar") {
    chrome.sidePanel
      .setPanelBehavior({
        openPanelOnActionClick: true,
      })
      .catch(() => {});
    param11({
      ok: true,
    });
    return false;
  }
  if (param9 && param9.action === "spPanelReady") {
    chrome.storage.local.set({
      ql_sidebar_mode: true,
    });
    chrome.storage.local.get(["eu_license_valid", "ql_license_valid"], (param12) => {
      _syncPanelClick(param12.eu_license_valid || param12.ql_license_valid);
    });
    param11({
      ok: true,
    });
    return false;
  }
  if (param9 && param9.action === "deactivateSidebar") {
    chrome.storage.local.set({
      ql_sidebar_mode: false,
    });
    chrome.storage.local.get(["eu_license_valid", "ql_license_valid"], (param13) => {
      _syncPanelClick(param13.eu_license_valid || param13.ql_license_valid);
    });
    param11({
      ok: true,
    });
    return false;
  }
  if (param9 && param9.action === "openSidePanel") {
    chrome.sidePanel
      .setPanelBehavior({
        openPanelOnActionClick: false,
      })
      .catch(() => {});
    if (param10.tab && param10.tab.id) {
      chrome.sidePanel
        .open({
          tabId: param10.tab.id,
        })
        .catch((param14) => {
          console.warn(
            "[Background] sidePanel.open (openSidePanel msg) failed - expected on Windows:",
            param14 && param14.message,
          );
        });
    }
    param11({
      ok: true,
    });
    return false;
  }
  if (param9 && param9.action === "proxyFetch") {
    (async () => {
      try {
        const items3 = [
          "lovable.dev",
          "api.lovable.dev",
          "lovable-api.com",
          "io.eklas.dev",
        ];
        let text1 = "";
        try {
          text1 = new URL(param9.url).hostname;
        } catch (error1) {}
        if (
          !items3.some(
            (param15) => text1 === param15 || text1.endsWith("." + param15),
          )
        ) {
          param11({
            ok: false,
            status: 403,
            data: {
              error: "Unauthorized URL",
            },
          });
          return;
        }
        console.log("[Background] proxyFetch ->", param9.url);
        var config2 = {
          method: param9.method || "POST",
          headers: param9.headers || {},
        };
        if (param9.body) {
          config2.body = param9.body;
        }
        var value1 = await fetch(param9.url, config2);
        var value2 = await value1.text();
        var value3;
        try {
          value3 = JSON.parse(value2);
        } catch (error2) {
          value3 = {
            raw: value2,
          };
        }
        param11({
          ok: value1.ok,
          status: value1.status,
          data: value3,
        });
      } catch (error3) {
        console.error("[Background] proxyFetch error:", error3);
        param11({
          ok: false,
          status: 0,
          data: {
            error: error3.message || "Fetch failed in background",
          },
        });
      }
    })();
    return true;
  }
  if (param9 && param9.action === "readCookies") {
    var items1 = [
      "lovable-session-id.id",
      "lovable-session-id.custom",
      "lovable-session-id.refresh",
      "lovable-session-id.sig",
    ];
    var items2 = [];
    var count1 = 0;
    items1.forEach(function (param16) {
      chrome.cookies.get(
        {
          url: "https://lovable.dev",
          name: param16,
        },
        function (param17) {
          count1++;
          if (param17 && param17.value) {
            var value4 = param17.value.split(".");
            if (value4.length === 3 && param17.value.indexOf("eyJ") === 0) {
              items2.push({
                token: param17.value,
                cookieName: param16,
                httpOnly: param17.httpOnly,
              });
            }
          }
          if (count1 === items1.length) {
            param11({
              success: items2.length > 0,
              tokens: items2,
            });
          }
        },
      );
    });
    return true;
  }
  if (param9 && param9.action === "getLovableCookies") {
    chrome.cookies.getAll(
      {
        domain: "lovable.dev",
      },
      function (param18) {
        var items4 = [];
        if (param18 && param18.length) {
          for (var count2 = 0; count2 < param18.length; count2++) {
            var value5 = param18[count2];
            if (value5 && value5.name && typeof value5.value === "string") {
              items4.push(value5.name + "=" + value5.value);
            }
          }
        }
        param11({
          ok: true,
          cookie: items4.join("; "),
        });
      },
    );
    return true;
  }
  if (param9 && param9.action === "downloadProject") {
    (async function () {
      try {
        if (
          !param9.projectId ||
          !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            param9.projectId,
          )
        ) {
          param11({
            ok: false,
            error: "Invalid projectId",
          });
          return;
        }
        var value6 =
          "https://lovable-api.com/projects/" +
          param9.projectId +
          "/source-code";
        var value7 = await fetch(value6, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + param9.token,
            Accept: "application/json",
          },
        });
        if (!value7.ok) {
          param11({
            success: false,
            error: "API returned " + value7.status,
          });
          return;
        }
        var value8 = await value7.json();
        param11({
          success: true,
          files: value8.files || [],
        });
      } catch (error4) {
        param11({
          success: false,
          error: error4.message || "Download failed",
        });
      }
    })();
    return true;
  }
});
