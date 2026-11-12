/*
 * Per-question triage state, persisted in localStorage.
 *
 * A question has at most one status:
 *   "flag" — cannot do it yet
 *   "star" — come back to it
 *   "tick" — confident, done
 *
 * The statuses are deliberately mutually exclusive: a question lives in exactly
 * one bucket, so "how many are left?" has a single, unambiguous answer.
 */
(function () {
  "use strict";

  var KEY = "stat2004-status";
  var VALID = { flag: true, star: true, tick: true };

  var data = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return {};
      var clean = {};
      for (var id in parsed) {
        if (Object.prototype.hasOwnProperty.call(parsed, id) && VALID[parsed[id]]) {
          clean[id] = parsed[id];
        }
      }
      return clean;
    } catch (e) {
      return {}; /* private mode, blocked storage, or corrupt JSON */
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      /* the toggle still works for this session, it just will not persist */
    }
  }

  window.Progress = {
    /* "flag" | "star" | "tick" | null */
    get: function (id) {
      return data[id] || null;
    },

    /* Set a status, or clear it by passing the current one or null. */
    set: function (id, status) {
      if (status && VALID[status]) data[id] = status;
      else delete data[id];
      save();
      return data[id] || null;
    },

    /* Click behaviour: same status again clears it. */
    toggle: function (id, status) {
      var next = data[id] === status ? null : status;
      return window.Progress.set(id, next);
    },

    /* How many questions currently hold each status. */
    counts: function () {
      var out = { flag: 0, star: 0, tick: 0 };
      for (var id in data) {
        if (Object.prototype.hasOwnProperty.call(data, id) && out[data[id]] !== undefined) {
          out[data[id]] += 1;
        }
      }
      return out;
    },

    /* Total questions with any status. */
    total: function () {
      return Object.keys(data).length;
    },

    clearAll: function () {
      data = {};
      save();
    }
  };
})();
