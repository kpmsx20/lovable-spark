(function (param326) {
  var value654 = null;
  function function69() {
    if (value654) {
      return value654;
    }
    var value655 = param326.AudioContext || param326.webkitAudioContext;
    if (!value655) {
      return null;
    }
    try {
      value654 = new value655();
    } catch (error94) {
      return null;
    }
    return value654;
  }
  function function70(param327, param328, param329, param330) {
    var value656 = function69();
    if (!value656) {
      return;
    }
    var value657 = value656.currentTime + param328;
    var value658 = value656.createOscillator();
    var value659 = value656.createGain();
    value658.type = "sine";
    value658.frequency.value = param327;
    value659.gain.setValueAtTime(0.0001, value657);
    value659.gain.exponentialRampToValueAtTime(
      param330 || 0.12,
      value657 + 0.02,
    );
    value659.gain.exponentialRampToValueAtTime(0.0001, value657 + param329);
    value658.connect(value659);
    value659.connect(value656.destination);
    value658.start(value657);
    value658.stop(value657 + param329 + 0.05);
  }
  function function71() {
    function70(523.25, 0, 0.25, 0.1);
    function70(659.25, 0.12, 0.25, 0.1);
    function70(783.99, 0.24, 0.35, 0.12);
  }
  function function72() {
    function70(440, 0, 0.55, 0.06);
    function70(659.25, 0.25, 0.85, 0.05);
    function70(880, 0.55, 1.2, 0.04);
  }
  function function73(param331) {
    try {
      var value660 = chrome.runtime.getURL("sounds/" + param331);
      var value661 = new Audio(value660);
      value661.volume = 0.55;
      value661.play().catch(function () {});
    } catch (error95) {}
  }
  function function74(param332) {
    if (!param332) {
      return;
    }
    var value662 = (param332 + "").toLowerCase();
    if (
      value662.indexOf("payment required") !== -1 ||
      value662.indexOf("payment") !== -1 ||
      value662.indexOf("credit") !== -1 ||
      value662.indexOf("credit") !== -1 ||
      value662.indexOf("insufficient") !== -1 ||
      value662.indexOf(" 402") !== -1
    ) {
      function73("error-payment.mp3");
      return;
    }
    if (
      value662.indexOf("rate limit") !== -1 ||
      value662.indexOf("rate-limit") !== -1 ||
      value662.indexOf("many attempts") !== -1 ||
      value662.indexOf("too many") !== -1 ||
      value662.indexOf(" 429") !== -1
    ) {
      function73("error-ratelimit.mp3");
      return;
    }
    if (
      value662.indexOf("token") !== -1 ||
      value662.indexOf("session") !== -1 ||
      value662.indexOf("auth") !== -1 ||
      value662.indexOf(" 401") !== -1 ||
      value662.indexOf(" 403") !== -1
    ) {
      function73("error-token.mp3");
      return;
    }
  }
  param326.QLSounds = {
    activation: function71,
    promptSent: function72,
    errorFromMessage: function74,
    payment: function () {
      function73("error-payment.mp3");
    },
    rateLimit: function () {
      function73("error-ratelimit.mp3");
    },
    token: function () {
      function73("error-token.mp3");
    },
  };
})(typeof window !== "undefined" ? window : self);
