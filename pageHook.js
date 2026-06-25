(function () {
  console.log("[MasterLovableHook] Starting v3.0");
  window.__qlLastMessage = "";
  window.__qlFixTimer = null;
  let flag5 = false;
  let flag6 = false;
  let value346 = null;
  let value347 = null;
  let items12 = [];
  window.addEventListener("message", function (param180) {
    if (param180.source !== window || !param180.data) {
      return;
    }
    if (param180.data.type === "qlBypassState") {
      flag5 = !!param180.data.active;
      return;
    }
    if (param180.data.type !== "lovableSendViaWs") {
      return;
    }
    const value348 = items12.filter(
      (param181) => param181.ws.readyState === WebSocket.OPEN,
    );
    if (!value348.length) {
      console.warn("[MasterLovableHook] No open WebSocket for injection");
      window.postMessage(
        {
          type: "lovableWsSendResult",
          success: false,
          error: "No active WebSocket connection",
        },
        "*",
      );
      return;
    }
    const value349 = value348[value348.length - 1];
    try {
      const value350 =
        typeof param180.data.payload === "string"
          ? param180.data.payload
          : JSON.stringify(param180.data.payload);
      value349.origSend(value350);
      console.log("[MasterLovableHook] WS INJECT →", value350.slice(0, 300));
      window.postMessage(
        {
          type: "lovableWsSendResult",
          success: true,
        },
        "*",
      );
    } catch (error46) {
      console.warn("[MasterLovableHook] WS inject error:", error46);
      window.postMessage(
        {
          type: "lovableWsSendResult",
          success: false,
          error: error46.message,
        },
        "*",
      );
    }
  });
  function function16() {
    try {
      const value351 = window.location.pathname.match(
        /projects\/([0-9a-fA-F-]{36})/i,
      );
      if (value351) {
        return value351[1];
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }
  function function17(param182) {
    try {
      const value352 = String(param182).match(/projects\/([0-9a-fA-F-]{36})/i);
      if (value352) {
        return value352[1];
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }
  function function18(param183, param184, value353 = false) {
    const value354 = param184 || function16();
    const value355 =
      typeof param183 === "string"
        ? param183.replace(/^Bearer\s+/i, "").trim()
        : null;
    let flag7 = false;
    if (value355 && value355 !== value346) {
      value346 = value355;
      flag7 = true;
    }
    if (value354 && value354 !== value347) {
      value347 = value354;
      flag7 = true;
    }
    if (!flag7 && !value353) {
      return;
    }
    console.log("[MasterLovableHook] ✅ Token captured!", value346 || "null");
    console.log("[MasterLovableHook] ProjectId:", value347);
    window.postMessage(
      {
        type: "lovableTokenFound",
        token: value346,
        projectId: value347,
      },
      window.location.origin,
    );
  }
  window.addEventListener("message", (param185) => {
    if (param185.source !== window) {
      return;
    }
    if (!param185.data || param185.data.type !== "lovableRequestToken") {
      return;
    }
    function18(value346, function16() || value347, true);
  });
  (function callback6() {
    try {
      const value356 = window.fetch;
      window.fetch = async function (...value357) {
        try {
          let value359 =
            typeof value357[0] === "string"
              ? value357[0]
              : (value357[0] && value357[0].url) || "";
          let value360 = value357[1] || {};
          let value361 = null;
          const value362 = value357[0] instanceof Request;
          if (value362) {
            value359 = value357[0].url || value359;
            value361 =
              value357[0].headers &&
              typeof value357[0].headers.get === "function"
                ? value357[0].headers.get("Authorization") ||
                  value357[0].headers.get("authorization")
                : null;
          }
          if (value360.headers) {
            if (value360.headers instanceof Headers) {
              value361 = value360.headers.get("Authorization");
            } else if (typeof value360.headers === "object") {
              value361 =
                value360.headers.Authorization ||
                value360.headers.authorization;
            }
          }
          const value363 = function17(value359);
          if (value361 && value361.startsWith("Bearer ")) {
            const value364 = value361.slice(7);
            function18(value364, value363);
          }
        } catch (error47) {}
        try {
          const value365 =
            typeof value357[0] === "string"
              ? value357[0]
              : (value357[0] && value357[0].url) || "";
          const value366 = value357[0] instanceof Request;
          const value367 = (
            value366
              ? value357[0].method || "GET"
              : (value357[1] || {}).method || "GET"
          ).toUpperCase();
          const value368 =
            value365 &&
            value367 === "POST" &&
            (value365.includes("api.lovable.dev") ||
              value365.includes("api.lovable.app") ||
              value365.includes("lovable-api.com") ||
              value365.includes("lovable.dev"));
          if (value368) {
            if (value366) {
              try {
                const value369 = value357[0];
                const value370 = value369.clone();
                const value371 = await value370.text();
                if (value371) {
                  const value372 = JSON.parse(value371);
                  console.log(
                    "[MasterLovableHook] 🔍 POST capturado:",
                    value365,
                    "| campos:",
                    Object.keys(value372).join(","),
                    "| message:",
                    (
                      value372.message ||
                      value372.content ||
                      value372.prompt ||
                      "(sem)"
                    )
                      .toString()
                      .slice(0, 80),
                  );
                  const value373 =
                    typeof value372.message === "string" &&
                    value372.message.length > 0
                      ? "message"
                      : typeof value372.content === "string" &&
                          value372.content.length > 0
                        ? "content"
                        : typeof value372.prompt === "string" &&
                            value372.prompt.length > 0
                          ? "prompt"
                          : null;
                  if (flag5 && value372 && value373) {
                    const value374 = window.__qlBuildState;
                    const value375 =
                      value374 && value374.eventId ? value374.eventId : "";
                    const value376 =
                      value374 && value374.errorMessage
                        ? value374.errorMessage
                        : "";
                    value372.intent = "fix_error";
                    value372.contains_error = true;
                    value372.error_source = "build_errors";
                    value372.error_ids = value375 ? [value375] : [];
                    value372.message_intent_metadata = {
                      fix_error_metadata: {
                        errors: value375
                          ? [
                              {
                                error_type: "build",
                                error_message: value376,
                                build_event_id: value375,
                              },
                            ]
                          : [],
                      },
                    };
                    const value377 = new Request(value369.url, {
                      method: value369.method,
                      headers: value369.headers,
                      body: JSON.stringify(value372),
                      mode: value369.mode,
                      credentials: value369.credentials,
                      cache: value369.cache,
                      redirect: value369.redirect,
                    });
                    value357 = [value377];
                    window.__qlLastMessage = value372[value373] || "";
                    if (window.__qlFixTimer) {
                      clearInterval(window.__qlFixTimer);
                    }
                    var count25 = 0;
                    window.__qlFixTimer = setInterval(function () {
                      count25++;
                      if (!window.__qlLastMessage || count25 > 100) {
                        clearInterval(window.__qlFixTimer);
                        return;
                      }
                      document
                        .querySelectorAll("div.special-message")
                        .forEach(function (param186) {
                          if (param186.textContent.trim() === "Fix errors") {
                            param186.textContent = window.__qlLastMessage;
                          }
                        });
                    }, 100);
                    flag6 = true;
                    console.log(
                      "[MasterLovableHook] 💉 fix_error injected (Request) field:",
                      value373,
                      "| evId:",
                      value375 || "NONE",
                      "| url:",
                      value365.slice(0, 100),
                    );
                  }
                }
              } catch (error48) {
                console.warn(
                  "[MasterLovableHook] error bypass Request:",
                  error48,
                );
              }
            } else {
              const value378 = value357[1] || {};
              const value379 = value378.body;
              if (value379 && typeof value379 === "string") {
                try {
                  const value380 = JSON.parse(value379);
                  console.log(
                    "[MasterLovableHook] 🔍 POST (opts) captured:",
                    value365,
                    "| campos:",
                    Object.keys(value380).join(","),
                    "| message:",
                    (
                      value380.message ||
                      value380.content ||
                      value380.prompt ||
                      "(sem)"
                    )
                      .toString()
                      .slice(0, 80),
                  );
                  const value381 =
                    typeof value380.message === "string" &&
                    value380.message.length > 0
                      ? "message"
                      : typeof value380.content === "string" &&
                          value380.content.length > 0
                        ? "content"
                        : typeof value380.prompt === "string" &&
                            value380.prompt.length > 0
                          ? "prompt"
                          : null;
                  if (flag5 && value380 && value381) {
                    const value382 = window.__qlBuildState;
                    const value383 =
                      value382 && value382.eventId ? value382.eventId : "";
                    const value384 =
                      value382 && value382.errorMessage
                        ? value382.errorMessage
                        : "";
                    value380.intent = "fix_error";
                    value380.contains_error = true;
                    value380.error_source = "build_errors";
                    value380.error_ids = value383 ? [value383] : [];
                    value380.message_intent_metadata = {
                      fix_error_metadata: {
                        errors: value383
                          ? [
                              {
                                error_type: "build",
                                error_message: value384,
                                build_event_id: value383,
                              },
                            ]
                          : [],
                      },
                    };
                    value357 = [
                      value357[0],
                      Object.assign({}, value378, {
                        body: JSON.stringify(value380),
                      }),
                    ];
                    window.__qlLastMessage = value380[value381] || "";
                    if (window.__qlFixTimer) {
                      clearInterval(window.__qlFixTimer);
                    }
                    var count26 = 0;
                    window.__qlFixTimer = setInterval(function () {
                      count26++;
                      if (!window.__qlLastMessage || count26 > 100) {
                        clearInterval(window.__qlFixTimer);
                        return;
                      }
                      document
                        .querySelectorAll("div.special-message")
                        .forEach(function (param187) {
                          if (param187.textContent.trim() === "Fix errors") {
                            param187.textContent = window.__qlLastMessage;
                          }
                        });
                    }, 100);
                    flag6 = true;
                    console.log(
                      "[MasterLovableHook] 💉 fix_error injected (opts) field:",
                      value381,
                      "| evId:",
                      value383 || "NONE",
                      "| url:",
                      value365.slice(0, 100),
                    );
                  }
                } catch (error49) {
                  console.warn(
                    "[MasterLovableHook] bypass opts error:",
                    error49,
                  );
                }
              }
            }
          }
        } catch (error50) {}
        const value358 = await value356.apply(this, value357);
        try {
          const value385 =
            typeof value357[0] === "string"
              ? value357[0]
              : (value357[0] && value357[0].url) || "";
          const value386 =
            value385 &&
            (value385.includes("api.lovable.dev") ||
              value385.includes("lovable-api.com") ||
              value385.includes("lovable.dev"));
          const value387 = ((value357[1] || {}).method || "GET").toUpperCase();
          if (value386 && value387 === "POST") {
            const value388 = value358.clone();
            value388
              .text()
              .then(function (param188) {
                console.log(
                  "[MasterLovableHook] 📥 RESP [" +
                    value385.slice(0, 80) +
                    "] status:" +
                    value358.status +
                    " | body:",
                  param188.slice(0, 400),
                );
              })
              .catch(function () {});
          }
        } catch (error51) {}
        return value358;
      };
    } catch (error52) {
      console.warn("[MasterLovableHook] fetch error", error52);
    }
  })();
  (function callback7() {
    try {
      const value389 = XMLHttpRequest.prototype.open;
      const value390 = XMLHttpRequest.prototype.setRequestHeader;
      XMLHttpRequest.prototype.open = function (param189, param190) {
        this._lovable_url = param190;
        return value389.apply(this, arguments);
      };
      XMLHttpRequest.prototype.setRequestHeader = function (
        param191,
        param192,
      ) {
        if (
          param191 &&
          param191.toLowerCase() === "authorization" &&
          param192 &&
          param192.startsWith("Bearer ")
        ) {
          const value391 = param192.slice(7);
          function18(value391, function17(this._lovable_url));
        }
        return value390.apply(this, arguments);
      };
    } catch (error53) {
      console.warn("[MasterLovableHook] xhr error", error53);
    }
  })();
  setInterval(() => {
    const value392 = function16();
    const value393 = value392 && value392 !== value347;
    if (value393) {
      value347 = value392;
      window.postMessage(
        {
          type: "lovableTokenFound",
          token: value346,
          projectId: value392,
        },
        window.location.origin,
      );
    }
  }, 1500);
  console.log(
    "[MasterLovableHook] wrapWS: window.WebSocket =",
    typeof window.WebSocket,
  );
  (function callback8() {
    try {
      const value394 = window.WebSocket;
      function function19(param193, param194) {
        const value395 = param194
          ? new value394(param193, param194)
          : new value394(param193);
        const value396 = String(param193);
        const value397 = value395.send.bind(value395);
        const value398 = value396
          .replace(/token=[^&]+/g, "token=***")
          .replace(/key=[^&]+/g, "key=***");
        console.log("[MasterLovableHook] WS connecting →", value398);
        const value399 =
          value396.includes("lovable") ||
          value396.includes("trajectory") ||
          value396.includes("supabase") ||
          value396.includes("convex");
        if (value399) {
          items12 = items12.filter(
            (param195) => param195.ws.readyState !== WebSocket.CLOSED,
          );
          items12.push({
            ws: value395,
            origSend: value397,
          });
          window.postMessage(
            {
              type: "lovableWsConnected",
              url: value398,
            },
            "*",
          );
        }
        value395.send = function (param196) {
          try {
            const value400 =
              typeof param196 === "string"
                ? param196.slice(0, 800)
                : "[binary]";
            console.log(
              "[MasterLovableHook] WS SEND [" + value398.slice(0, 60) + "] →",
              value400,
            );
            if (flag5 && typeof param196 === "string" && param196.length > 2) {
              try {
                const value401 = JSON.parse(param196);
                const value402 = window.__qlBuildState;
                const value403 =
                  value402 && value402.eventId ? value402.eventId : "";
                const value404 =
                  value402 && value402.errorMessage
                    ? value402.errorMessage
                    : "src/App.tsx(1,7): error TS2322: Type 'number' is not assignable to type 'string'.";
                if (
                  value401 &&
                  typeof value401.message === "string" &&
                  value401.message.length > 0
                ) {
                  value401.intent = "fix_error";
                  value401.contains_error = true;
                  value401.error_source = "build_errors";
                  value401.error_ids = value403 ? [value403] : [];
                  value401.message_intent_metadata = {
                    fix_error_metadata: {
                      errors: value403
                        ? [
                            {
                              error_type: "build",
                              error_message: value404,
                              build_event_id: value403,
                            },
                          ]
                        : [],
                    },
                  };
                  param196 = JSON.stringify(value401);
                  console.log(
                    "[MasterLovableHook] 💉 fix_error injected (WS) evId:",
                    value403 || "NONE",
                    "| msg:",
                    value401.message.slice(0, 80),
                  );
                } else if (
                  value401 &&
                  value401.type === "Mutation" &&
                  value401.args
                ) {
                  const value405 = Array.isArray(value401.args)
                    ? value401.args[0]
                    : value401.args;
                  if (
                    value405 &&
                    typeof value405.message === "string" &&
                    value405.message.length > 0
                  ) {
                    value405.intent = "fix_error";
                    value405.contains_error = true;
                    value405.error_source = "build_errors";
                    value405.error_ids = value403 ? [value403] : [];
                    value405.message_intent_metadata = {
                      fix_error_metadata: {
                        errors: value403
                          ? [
                              {
                                error_type: "build",
                                error_message: value404,
                                build_event_id: value403,
                              },
                            ]
                          : [],
                      },
                    };
                    if (Array.isArray(value401.args)) {
                      value401.args[0] = value405;
                    } else {
                      value401.args = value405;
                    }
                    param196 = JSON.stringify(value401);
                    console.log(
                      "[MasterLovableHook] 💉 fix_error injected (WS Convex) evId:",
                      value403 || "NONE",
                      "| msg:",
                      value405.message.slice(0, 80),
                    );
                  }
                }
              } catch (error54) {}
            }
          } catch (error55) {}
          return value397(param196);
        };
        value395.addEventListener("message", (param197) => {
          try {
            const value406 =
              typeof param197.data === "string"
                ? param197.data.slice(0, 300)
                : "[binary]";
            console.log(
              "[MasterLovableHook] WS RECV [" + value398.slice(0, 60) + "] ←",
              value406,
            );
            if (
              typeof param197.data === "string" &&
              flag6 &&
              param197.data.includes("preview_build_status")
            ) {
              try {
                const value407 = JSON.parse(param197.data);
                const value408 =
                  (value407 && value407.preview_build_status) ||
                  (value407 &&
                    value407.event &&
                    value407.event.payload &&
                    value407.event.payload.preview_build_status) ||
                  (value407 &&
                    value407.event &&
                    value407.event.payload &&
                    value407.event.payload.build &&
                    value407.event.payload.build.preview_build_status) ||
                  "";
                if (value408 === "successful") {
                  flag6 = false;
                  console.log(
                    "[MasterLovableHook] 🔄 Preview build OK after bypass - requesting iframe refresh",
                  );
                  window.postMessage(
                    {
                      type: "qlPreviewBuilt",
                    },
                    window.location.origin,
                  );
                }
              } catch (error56) {}
            }
            if (
              typeof param197.data === "string" &&
              param197.data.includes("#bld:")
            ) {
              try {
                const value409 = JSON.parse(param197.data);
                if (
                  value409 &&
                  value409.type === "trajectory" &&
                  value409.event &&
                  value409.event.id &&
                  value409.event.payload
                ) {
                  const value410 = value409.event.id.value || "";
                  const value411 = value409.event.payload.build;
                  if (value410.includes("#bld:")) {
                    console.log(
                      "[MasterLovableHook] 📐 bld event captured:",
                      value410.slice(0, 60),
                      "| hasError:",
                      !!value411 &&
                        !!value411.buildErrors &&
                        !!value411.buildErrors.typecheck &&
                        !!value411.buildErrors.typecheck.hasError,
                    );
                    if (
                      value411 &&
                      value411.buildErrors &&
                      value411.buildErrors.typecheck &&
                      value411.buildErrors.typecheck.hasError
                    ) {
                      const value412 =
                        value411.buildErrors.typecheck.output || "";
                      if (value412) {
                        const value413 = value412.trim().split("\n")[0];
                        window.__qlBuildState = {
                          eventId: value410,
                          errorMessage: value413,
                        };
                        console.log(
                          "[MasterLovableHook] 📐 build_event_id Error captured:",
                          value410,
                          "|",
                          value413.slice(0, 80),
                        );
                      }
                    }
                  }
                }
              } catch (error57) {}
            }
          } catch (error58) {}
        });
        return value395;
      }
      try {
        Object.defineProperty(window, "WebSocket", {
          value: function19,
          writable: true,
          configurable: true,
        });
      } catch (error59) {
        window.WebSocket = function19;
      }
      function19.prototype = value394.prototype;
      function19.CONNECTING = value394.CONNECTING;
      function19.OPEN = value394.OPEN;
      function19.CLOSING = value394.CLOSING;
      function19.CLOSED = value394.CLOSED;
      if (window.WebSocket !== function19) {
        console.warn(
          "[MasterLovableHook] ⚠️ WebSocket NOT replaced - property blocked!",
        );
      } else {
        console.log("[MasterLovableHook] ✅ WebSocket replaced successfully");
      }
    } catch (error60) {
      console.warn("[MasterLovableHook] error ws wrap", error60);
    }
  })();
})();
