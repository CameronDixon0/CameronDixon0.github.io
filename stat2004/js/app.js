/* STAT2004 tutorial practice — filter, render, reveal. */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- topics */

  const TOPICS = [
    { id: "distributions", label: "Probability & Distributions" },
    { id: "sampling", label: "Sampling Distributions & Pivots" },
    { id: "estimation", label: "Bias, Variance & MSE" },
    { id: "moments", label: "Method of Moments" },
    { id: "mle", label: "Maximum Likelihood" },
    { id: "info", label: "Information & Asymptotics" },
    { id: "ci", label: "Confidence Intervals" },
    { id: "testing", label: "Hypothesis Testing & Power" },
    { id: "lrt", label: "Likelihood Ratio Tests" },
    { id: "bayes", label: "Bayesian Inference" },
    { id: "regression", label: "Linear Regression" },
    { id: "diagnostics", label: "Regression Diagnostics" },
    { id: "transform", label: "Transformations" },
    { id: "logistic", label: "Logistic Regression" },
    { id: "tables", label: "Contingency Tables" },
    { id: "gof", label: "Goodness of Fit" },
    { id: "anova", label: "ANOVA" },
    { id: "multiplicity", label: "Multiple Testing" },
    { id: "simulation", label: "Simulation & Computation" }
  ];

  const TOPIC_LABEL = Object.fromEntries(TOPICS.map((t) => [t.id, t.label]));
  const DIFFICULTIES = ["Easy", "Medium", "Hard"];

  /* Where a question comes from. The applied classes and the tutorials are the same
     weekly practice material, so they are not distinguished here — only the
     assignments are a separate source. */
  const SOURCES = [
    { id: "tutorial", label: "Tutorials" },
    { id: "assignment", label: "Assignments" }
  ];

  const sourceOf = (q) => q.source || "tutorial";

  /* Triage statuses. Each question holds at most one, so "how many are left?"
     has a single answer. */
  const STATUSES = [
    { id: "flag", label: "Flagged", title: "Flag: can't do this yet", key: "F" },
    { id: "star", label: "Starred", title: "Star: come back to this", key: "S" },
    { id: "tick", label: "Done", title: "Tick: confident with this", key: "T" }
  ];

  const STATUS_ICONS = {
    flag:
      '<path d="M4.5 14.5s1-1 3.75-1 4.75 1.75 7.5 1.75S19.5 14.5 19.5 14.5V4s-1 1-3.75 1-4.75-1.75-7.5-1.75S4.5 4 4.5 4Z"/><path d="M4.5 21v-6.5"/>',
    star:
      '<path d="M12 3.5l2.7 5.47 6.03.88-4.36 4.25 1.03 6-5.4-2.84-5.4 2.84 1.03-6L3.27 9.85l6.03-.88Z"/>',
    tick:
      '<path d="M20 6.5 9.5 17 4 11.5"/>'
  };

  const Progress = window.Progress || {
    get: () => null,
    toggle: () => null,
    counts: () => ({ flag: 0, star: 0, tick: 0 }),
    total: () => 0,
    clearAll: () => {}
  };

  const QUESTIONS = (window.QBANK || []).slice();
  const BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));

  /* ----------------------------------------------------------------- state */

  const LECTURES = window.LECTURES || {};

  /* The sample paper has six questions. Each exam-style question records which of them it
     resembles, so the tag doubles as a reading guide. */
  const PAPER = {
    Q1: "Paper Q1 — maximum likelihood, information, Cramér–Rao",
    Q2: "Paper Q2 — regression theory and diagnostics",
    Q3: "Paper Q3 — logistic regression from output",
    Q4: "Paper Q4 — pivots, confidence intervals and GLRTs",
    Q5: "Paper Q5 — multinomial data and Pearson's chi-squared",
    Q6: "Paper Q6 — one-way ANOVA"
  };

  const state = {
    topics: new Set(),
    diffs: new Set(),
    sources: new Set(),
    statuses: new Set(),
    examOnly: false,
    list: [],
    idx: 0,
    shuffled: false,
    revealed: new Set(),
    hinted: new Set()
  };

  const $ = (id) => document.getElementById(id);
  const el = {
    statusChips: $("status-chips"),
    diffChips: $("difficulty-chips"),
    sourceChips: $("source-chips"),
    topicChips: $("topic-chips"),
    clear: $("clear"),
    resetProgress: $("reset-progress"),
    shuffle: $("shuffle"),
    count: $("count"),
    card: $("card"),
    prev: $("prev"),
    next: $("next"),
    hint: $("hint"),
    examChips: $("exam-chips"),
    reveal: $("reveal")
  };

  /* --------------------------------------------------------------- filters */

  function matches(q) {
    const okTopic = state.topics.size === 0 || q.topics.some((t) => state.topics.has(t));
    const okDiff = state.diffs.size === 0 || state.diffs.has(q.difficulty);
    const okSource = state.sources.size === 0 || state.sources.has(sourceOf(q));
    const okExam = !state.examOnly || !!q.exam;
    const status = Progress.get(q.id);
    const okStatus = state.statuses.size === 0 || (status !== null && state.statuses.has(status));
    return okTopic && okDiff && okSource && okExam && okStatus;
  }

  function filtered() {
    return QUESTIONS.filter(matches);
  }

  function topicCount(id) {
    return QUESTIONS.filter((q) => q.topics.includes(id)).length;
  }

  function diffCount(d) {
    return QUESTIONS.filter((q) => q.difficulty === d).length;
  }

  function sourceCount(id) {
    return QUESTIONS.filter((q) => sourceOf(q) === id).length;
  }

  function examCount() {
    return QUESTIONS.filter((q) => !!q.exam).length;
  }

  function chip(label, count, pressed, onClick) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.setAttribute("aria-pressed", pressed ? "true" : "false");
    b.innerHTML = `${escapeHtml(label)}<span class="n">${count}</span>`;
    b.addEventListener("click", onClick);
    return b;
  }

  function buildFilterChips() {
    const counts = Progress.counts();

    el.statusChips.innerHTML = "";
    for (const s of STATUSES) {
      const b = chip(s.label, counts[s.id], state.statuses.has(s.id), () => {
        toggle(state.statuses, s.id);
        refresh();
      });
      b.classList.add("chip-status");
      b.dataset.status = s.id;
      b.title = s.title;
      el.statusChips.appendChild(b);
    }
    /* The progress group is only useful once something has a status. */
    el.resetProgress.hidden = Progress.total() === 0;

    el.diffChips.innerHTML = "";
    for (const d of DIFFICULTIES) {
      el.diffChips.appendChild(
        chip(d, diffCount(d), state.diffs.has(d), () => {
          toggle(state.diffs, d);
          refresh();
        })
      );
    }

    el.sourceChips.innerHTML = "";
    for (const s of SOURCES) {
      el.sourceChips.appendChild(
        chip(s.label, sourceCount(s.id), state.sources.has(s.id), () => {
          toggle(state.sources, s.id);
          refresh();
        })
      );
    }

    /* A single toggle: "only questions that resemble the sample paper". */
    el.examChips.innerHTML = "";
    const examChip = chip("Exam style", examCount(), state.examOnly, () => {
      state.examOnly = !state.examOnly;
      refresh();
    });
    examChip.title = "Only questions in the same form as the sample paper";
    el.examChips.appendChild(examChip);

    el.topicChips.innerHTML = "";
    for (const t of TOPICS) {
      el.topicChips.appendChild(
        chip(t.label, topicCount(t.id), state.topics.has(t.id), () => {
          toggle(state.topics, t.id);
          refresh();
        })
      );
    }
  }

  function toggle(set, value) {
    if (set.has(value)) set.delete(value);
    else set.add(value);
  }

  /* ----------------------------------------------------------- list + index */

  function rebuildList() {
    const current = state.list[state.idx];
    const keepId = current ? current.id : null;
    const prevIdx = state.idx;

    let next = filtered();

    if (state.shuffled) next = shuffle(next);

    state.list = next;

    if (keepId) {
      const at = next.findIndex((q) => q.id === keepId);
      if (at >= 0) {
        state.idx = at;
        return;
      }
    }
    /* The question we were on is gone: stay in place rather than jumping to the top. */
    state.idx = Math.max(0, Math.min(prevIdx, next.length - 1));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* -------------------------------------------------------------- rendering */

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  /*
   * Render authored content: split it into top-level block elements and plain text,
   * wrap the plain text in <p> and leave blocks (display maths, tables, pre, lists)
   * untouched. This keeps paragraphs and display blocks as siblings instead of
   * nesting a <div> inside a <p>.
   */
  const BLOCK_TAGS = new Set([
    "div", "figure", "ul", "ol", "table", "pre", "blockquote",
    "h1", "h2", "h3", "h4", "h5", "h6"
  ]);

  function segments(text) {
    const out = [];
    const tagRe = /<(\/?)([a-zA-Z0-9]+)([^>]*)>/g;
    let depth = 0;
    let blockStart = -1;
    let last = 0;
    let m;

    while ((m = tagRe.exec(text)) !== null) {
      const closing = m[1] === "/";
      const tag = m[2].toLowerCase();
      if (!BLOCK_TAGS.has(tag)) continue;

      if (!closing) {
        if (depth === 0) {
          if (m.index > last) out.push({ block: false, s: text.slice(last, m.index) });
          blockStart = m.index;
        }
        depth += 1;
      } else {
        depth -= 1;
        if (depth <= 0) {
          depth = 0;
          out.push({ block: true, s: text.slice(blockStart, m.index + m[0].length) });
          last = m.index + m[0].length;
        }
      }
    }
    if (last < text.length) out.push({ block: false, s: text.slice(last) });
    return out;
  }

  function blocks(text) {
    if (!text) return "";
    return segments(String(text))
      .map((seg) => {
        if (seg.block) return seg.s;
        const t = seg.s.trim();
        return t ? `<p>${t.replace(/\n/g, " ")}</p>` : "";
      })
      .join("");
  }

  function partsHtml(parts, cls) {
    if (!parts || !parts.length) return "";
    const rows = parts
      .map((p) => {
        const marker = p.l ? `<span class="pl">(${escapeHtml(p.l)})</span>` : "";
        return `<div class="part">${marker}<div>${blocks(p.t)}</div></div>`;
      })
      .join("");
    return `<div class="${cls}">${rows}</div>`;
  }

  function topicListHtml(q) {
    return q.topics
      .map((id) => TOPIC_LABEL[id])
      .filter(Boolean)
      .join(" · ");
  }

  /* A hint gives a nudge towards the method plus links to the relevant lecture decks. */
  function hintPanelHtml(q) {
    const h = q.hint || {};
    const refs = (h.refs || [])
      .map((id) => LECTURES[id])
      .filter(Boolean)
      .map(
        (l) =>
          `<li><a href="${escapeHtml(l.file)}" target="_blank" rel="noopener">${escapeHtml(
            l.label
          )}</a></li>`
      )
      .join("");

    const refsHtml = refs
      ? `<div class="hint-refs">
           <h4>Lecture notes</h4>
           <ul>${refs}</ul>
         </div>`
      : "";

    return `<section class="hint-panel">
      <h3>Hint</h3>
      <div class="hint-text">${blocks(h.text || "")}</div>
      ${refsHtml}
    </section>`;
  }

  /* Typeset $...$ (inline) and $$...$$ (display) with KaTeX. Code blocks and
     anything else in ignoredTags are left untouched. */
  function typesetMath(root) {
    if (!root || typeof window.renderMathInElement !== "function") return;
    window.renderMathInElement(root, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false,
      errorColor: "#c0392b",
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"]
    });
  }

  function statusBarHtml(q) {    const current = Progress.get(q.id);
    const buttons = STATUSES.map((s) => {
      const on = current === s.id;
      return `<button class="status-btn${on ? " is-on" : ""}" type="button"
        data-status="${s.id}" aria-pressed="${on ? "true" : "false"}"
        title="${escapeHtml(s.title)} (${s.key})" aria-label="${escapeHtml(s.title)}">
        <svg viewBox="0 0 24 24" aria-hidden="true">${STATUS_ICONS[s.id]}</svg>
      </button>`;
    }).join("");
    return `<div class="status-bar" role="group" aria-label="Question status">${buttons}</div>`;
  }

  function render() {
    const q = state.list[state.idx];

    /* count + button states */
    if (!state.list.length) {
      el.count.textContent = "No questions match your filters";
    } else {
      el.count.textContent = `Question ${state.idx + 1} of ${state.list.length}`;
    }

    el.prev.disabled = state.idx <= 0;
    el.next.disabled = state.idx >= state.list.length - 1;
    el.shuffle.disabled = state.list.length < 2;

    if (!q) {
      const why = state.statuses.size
        ? "Try selecting more topics or difficulties, or clearing the progress filter."
        : "Try selecting more topics or difficulties.";
      el.card.innerHTML = `
        <div class="empty">
          <p>Nothing here.</p>
          <p class="muted">${why}</p>
        </div>`;
      el.reveal.disabled = true;
      el.reveal.textContent = "Reveal answer";
      el.hint.disabled = true;
      el.hint.textContent = "Hint";
      return;
    }
    el.reveal.disabled = false;

    const isRevealed = state.revealed.has(q.id);
    const isHinted = state.hinted.has(q.id);
    const hasHint = !!(q.hint && q.hint.text);

    el.hint.disabled = !hasHint;
    el.hint.textContent = isHinted ? "Hide hint" : "Hint";

    const hintHtml = hasHint && isHinted ? hintPanelHtml(q) : "";

    const answerHtml = isRevealed
      ? `<section class="answer">
           <h3>Answer</h3>
           <div class="solution">
             ${partsHtml(q.answer, "parts")}
           </div>
         </section>`
      : "";

    el.card.innerHTML = `
      <header class="card-head">
        <div class="card-head-top">
          <div class="tags">
            <span class="week">${sourceOf(q) === "assignment"
        ? escapeHtml(q.group)
        : "Week " + q.week} · ${escapeHtml(q.label)}</span>
            <span class="diff" data-d="${escapeHtml(q.difficulty)}">${escapeHtml(
      q.difficulty
    )}</span>
            ${q.exam
        ? `<span class="paper-tag" title="${escapeHtml(
            PAPER[q.exam] || ""
          )}">${escapeHtml(q.exam)}</span>`
        : ""}
          </div>
          ${statusBarHtml(q)}
        </div>
        <h2 class="q-title">${escapeHtml(q.title)}</h2>
        <p class="q-topics">${escapeHtml(topicListHtml(q))}</p>
      </header>
      <div class="q-body">
        ${q.stem ? blocks(q.stem) : ""}
        ${partsHtml(q.parts, "parts")}
        ${q.note ? `<p class="q-topics">${q.note}</p>` : ""}
      </div>
      ${hintHtml}
      ${answerHtml}`;

    el.reveal.textContent = isRevealed ? "Hide answer" : "Reveal answer";

    wireStatusButtons(q);
    typesetMath(el.card);
  }

  /* Attach handlers to the freshly-rendered status buttons. */
  function wireStatusButtons(q) {
    const buttons = el.card.querySelectorAll(".status-btn");
    for (const btn of buttons) {
      btn.addEventListener("click", () => setStatus(q.id, btn.dataset.status));
    }
  }

  function setStatus(id, status) {
    Progress.toggle(id, status);
    /* Rebuild: with a progress filter active the question may drop out of the list. */
    rebuildList();
    buildFilterChips();
    render();
  }

  /* ---------------------------------------------------------------- actions */

  function refresh() {
    rebuildList();
    buildFilterChips();
    render();
  }

  function go(delta) {
    const next = state.idx + delta;
    if (next < 0 || next >= state.list.length) return;
    state.idx = next;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleReveal() {
    const q = state.list[state.idx];
    if (!q) return;
    if (state.revealed.has(q.id)) state.revealed.delete(q.id);
    else state.revealed.add(q.id);
    render();
  }

  function toggleHint() {
    const q = state.list[state.idx];
    if (!q || !q.hint) return;
    if (state.hinted.has(q.id)) state.hinted.delete(q.id);
    else state.hinted.add(q.id);
    render();
  }

  function clearFilters() {
    state.topics.clear();
    state.diffs.clear();
    state.sources.clear();
    state.statuses.clear();
    state.examOnly = false;
    state.shuffled = false;
    refresh();
  }

  function resetProgress() {
    if (!Progress.total()) return;
    if (!window.confirm("Clear all flags, stars and ticks? This cannot be undone.")) return;
    Progress.clearAll();
    /* With a progress filter active nothing can match any more, so drop it. */
    state.statuses.clear();
    refresh();
  }

  /* ------------------------------------------------------------------ wire */

  el.prev.addEventListener("click", () => go(-1));
  el.next.addEventListener("click", () => go(1));
  el.reveal.addEventListener("click", toggleReveal);
  el.hint.addEventListener("click", toggleHint);
  el.clear.addEventListener("click", clearFilters);
  el.resetProgress.addEventListener("click", resetProgress);

  el.shuffle.addEventListener("click", () => {
    const current = state.list[state.idx];
    state.shuffled = true;
    const currentId = current && current.id;
    state.list = shuffle(state.list);
    state.idx = currentId ? state.list.findIndex((q) => q.id === currentId) : 0;
    if (state.idx < 0) state.idx = 0;
    render();
  });

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "r" || e.key === "R") {
      e.preventDefault();
      toggleReveal();
    } else if (e.key === "h" || e.key === "H") {
      e.preventDefault();
      toggleHint();
    } else {
      const q = state.list[state.idx];
      if (!q) return;
      const hit = STATUSES.find((s) => s.key.toLowerCase() === e.key.toLowerCase());
      if (hit) {
        e.preventDefault();
        setStatus(q.id, hit.id);
      }
    }
  });

  /* ------------------------------------------------------------------ boot */

  buildFilterChips();
  rebuildList();
  render();
})();
