async function generateHardwareFingerprint() {
  const items7 = [];
  try {
    items7.push(
      "screen:" + screen.width + "x" + screen.height,
      "depth:" + screen.colorDepth,
      "pixelRatio:" + window.devicePixelRatio,
    );
  } catch (error33) {}
  try {
    items7.push("platform:" + navigator.platform);
    items7.push("cores:" + (navigator.hardwareConcurrency || "unknown"));
    items7.push("memory:" + (navigator.deviceMemory || "unknown"));
    items7.push("maxTouchPoints:" + (navigator.maxTouchPoints || 0));
    items7.push(
      "langs:" + (navigator.languages || [navigator.language]).join(","),
    );
  } catch (error34) {}
  try {
    items7.push("tz:" + Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch (error35) {}
  try {
    const value297 = document.createElement("canvas");
    const value298 =
      value297.getContext("webgl") || value297.getContext("experimental-webgl");
    if (value298) {
      const value299 = value298.getExtension("WEBGL_debug_renderer_info");
      if (value299) {
        items7.push(
          "gpu:" + value298.getParameter(value299.UNMASKED_RENDERER_WEBGL),
        );
        items7.push(
          "gpuVendor:" + value298.getParameter(value299.UNMASKED_VENDOR_WEBGL),
        );
      }
      items7.push("glVersion:" + value298.getParameter(value298.VERSION));
      items7.push(
        "maxTexture:" + value298.getParameter(value298.MAX_TEXTURE_SIZE),
      );
      items7.push(
        "maxViewport:" +
          value298.getParameter(value298.MAX_VIEWPORT_DIMS).join(","),
      );
    }
  } catch (error36) {}
  try {
    const value300 = document.createElement("canvas");
    value300.width = 200;
    value300.height = 50;
    const value301 = value300.getContext("2d");
    if (value301) {
      value301.textBaseline = "top";
      value301.font = "14px 'Arial'";
      value301.fillStyle = "#f60";
      value301.fillRect(125, 1, 62, 20);
      value301.fillStyle = "#069";
      value301.fillText("QLFingerprint", 2, 15);
      value301.fillStyle = "rgba(102, 204, 0, 0.7)";
      value301.fillText("QLFingerprint", 4, 17);
      items7.push("canvas:" + value300.toDataURL().substring(0, 100));
    }
  } catch (error37) {}
  try {
    const value302 = new (
      window.OfflineAudioContext || window.webkitOfflineAudioContext
    )(1, 44100, 44100);
    const value303 = value302.createOscillator();
    value303.type = "triangle";
    value303.frequency.setValueAtTime(10000, value302.currentTime);
    const value304 = value302.createDynamicsCompressor();
    value304.threshold.setValueAtTime(-50, value302.currentTime);
    value304.knee.setValueAtTime(40, value302.currentTime);
    value304.ratio.setValueAtTime(12, value302.currentTime);
    value304.attack.setValueAtTime(0, value302.currentTime);
    value304.release.setValueAtTime(0.25, value302.currentTime);
    value303.connect(value304);
    value304.connect(value302.destination);
    value303.start(0);
    const value305 = await new Promise((param154, param155) => {
      value302.startRendering().then(param154).catch(param155);
      setTimeout(() => param155(new Error("timeout")), 1000);
    });
    const value306 = value305.getChannelData(0);
    let count19 = 0;
    for (let count20 = 4500; count20 < 5000; count20++) {
      count19 += Math.abs(value306[count20]);
    }
    items7.push("audio:" + count19.toFixed(6));
  } catch (error38) {}
  try {
    const items8 = [
      "monospace",
      "sans-serif",
      "serif",
      "Courier New",
      "Georgia",
      "Helvetica",
      "Times New Roman",
      "Trebuchet MS",
      "Verdana",
      "Impact",
      "Comic Sans MS",
      "Segoe UI",
      "Tahoma",
      "Calibri",
      "Consolas",
      "Lucida Console",
      "Palatino Linotype",
    ];
    const value307 = document.createElement("canvas");
    value307.width = 500;
    value307.height = 50;
    const value308 = value307.getContext("2d");
    if (value308) {
      const config7 = {};
      const items9 = ["monospace", "sans-serif", "serif"];
      const text11 = "mmmmmmmmmmlli";
      items9.forEach((param156) => {
        value308.font = "72px " + param156;
        config7[param156] = value308.measureText(text11).width;
      });
      const items10 = [];
      items8.forEach((param157) => {
        let flag4 = false;
        items9.forEach((param158) => {
          value308.font = "72px '" + param157 + "'," + param158;
          if (value308.measureText(text11).width !== config7[param158]) {
            flag4 = true;
          }
        });
        if (flag4) {
          items10.push(param157);
        }
      });
      items7.push("fonts:" + items10.join("|"));
    }
  } catch (error39) {}
  const value291 = items7.join("||");
  const value292 = new TextEncoder();
  const value293 = value292.encode(value291);
  const value294 = await crypto.subtle.digest("SHA-256", value293);
  const value295 = Array.from(new Uint8Array(value294));
  const value296 = value295
    .map((param159) => param159.toString(16).padStart(2, "0"))
    .join("");
  return value296;
}
let _cachedFingerprint = null;
async function getHardwareFingerprint() {
  if (_cachedFingerprint) {
    return _cachedFingerprint;
  }
  return new Promise(async (param160) => {
    chrome.storage.local.get(["ql_hw_fingerprint"], async (param161) => {
      if (param161.ql_hw_fingerprint) {
        _cachedFingerprint = param161.ql_hw_fingerprint;
        param160(_cachedFingerprint);
      } else {
        try {
          const value309 = await generateHardwareFingerprint();
          _cachedFingerprint = value309;
          chrome.storage.local.set({
            ql_hw_fingerprint: value309,
          });
          param160(value309);
        } catch (error40) {
          const value310 = crypto.randomUUID();
          _cachedFingerprint = value310;
          chrome.storage.local.set({
            ql_hw_fingerprint: value310,
          });
          param160(value310);
        }
      }
    });
  });
}
