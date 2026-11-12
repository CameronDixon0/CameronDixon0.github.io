/* Theme controller: system preference by default, explicit override remembered. */
(function () {
  "use strict";

  var STORAGE_KEY = "stat2004-theme";
  var root = document.documentElement;

  /* Resolve "system" to a concrete light/dark choice. */
  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function stored() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch (e) {
      return null; /* private mode / blocked storage */
    }
  }

  function current() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var next = theme === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", "Switch to " + next + " mode");
    btn.setAttribute("title", "Switch to " + next + " mode");
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  /* Apply as early as possible to avoid a flash of the wrong theme. */
  apply(stored() || systemTheme());

  /* While the user has not chosen explicitly, follow live system changes. */
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function () {
      if (!stored()) apply(systemTheme());
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  window.themeToggle = function () {
    var next = current() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore storage failures — the choice simply won't persist */
    }
    apply(next);
  };

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", window.themeToggle);
    apply(current());
  });
})();
