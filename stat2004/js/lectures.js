/*
 * Catalogue of the lecture decks in lectures/, so question hints can refer to them by
 * short id.
 *
 * The PDFs are image-only (scanned handwritten notes), so the descriptions below come
 * from the deck titles, dates and topic content. Hints link to the whole deck rather
 * than a page number: the decks are only 1–12 pages, and pointing at a page that turned
 * out to be wrong would be worse than letting the reader scroll.
 */
(function () {
  "use strict";

  window.LECTURES = {
    l01: {
      file: "lectures/STAT2004_Lecture01_30July2026_updated.pdf",
      label: "Lecture 1 (Week 1) — Sampling distributions"
    },
    l02: {
      file: "lectures/STAT2004_Lecture02_31July2026.pdf",
      label: "Lecture 2 (Week 1) — Evaluating estimators: bias, variance, MSE, consistency"
    },
    l03: {
      file: "lectures/STAT2004_Lecture03_06August2026.pdf",
      label: "Lecture 3 (Week 2) — Maximum likelihood estimation"
    },
    l04: {
      file: "lectures/STAT2004_Lecture04_07August2026.pdf",
      label: "Lecture 4 (Week 2) — Likelihood and score functions"
    },
    l05: {
      file: "lectures/STAT2004_Lecture05_13August2026.pdf",
      label: "Lecture 5 (Week 3) — Information and the Cramér–Rao lower bound"
    },
    l06: {
      file: "lectures/STAT2004_Lecture06_14August2026.pdf",
      label: "Lecture 6 (Week 3) — Asymptotic normality and the delta method"
    },
    l07: {
      file: "lectures/STAT2004_Lecture07_20August2026.pdf",
      label: "Lecture 7 (Week 4) — Multiple linear regression"
    },
    l08: {
      file: "lectures/STAT2004_Lecture08_21August2026.pdf",
      label: "Lecture 8 (Week 4) — The influence matrix and residuals"
    },
    l09: {
      file: "lectures/STAT2004_Lecture09_27August2026_update.pdf",
      label: "Lecture 9 (Week 5) — Outliers, leverage and collinearity"
    },
    l10: {
      file: "lectures/STAT2004_Lecture10_28August2026.pdf",
      label: "Lecture 10 (Week 5) — Regression diagnostics"
    },
    l11: {
      file: "lectures/STAT2004_Lecture11_03September2026.pdf",
      label: "Lecture 11 (Week 6) — Logistic regression"
    },
    l12: {
      file: "lectures/STAT2004_Lecture12_04September2026.pdf",
      label: "Lecture 12 (Week 6) — Iteratively reweighted least squares"
    },
    w7l12: {
      file: "lectures/Week7Lecture1and2.pdf",
      label: "Week 7, Lectures 1–2 — Confidence intervals and pivot quantities"
    },
    w7l3: {
      file: "lectures/Week7Lecture3-1.pdf",
      label: "Week 7, Lecture 3 — Confidence intervals (continued)"
    },
    w8l12: {
      file: "lectures/Week8Lecture1and2.pdf",
      label: "Week 8, Lectures 1–2 — Bayesian inference: priors and posteriors"
    },
    w8l3: {
      file: "lectures/Week8Lecture3.pdf",
      label: "Week 8, Lecture 3 — Hypothesis testing and the likelihood ratio test"
    },
    w9l12: {
      file: "lectures/Week9Lecture1and2.pdf",
      label: "Week 9, Lectures 1–2 — Likelihood ratio tests in practice"
    },
    w9l3: {
      file: "lectures/Week9Lecture3.pdf",
      label: "Week 9, Lecture 3 — P-values, power and tests for discrete data"
    },
    w10l12: {
      file: "lectures/Week10Lecture1and2.pdf",
      label: "Week 10, Lectures 1–2 — Multinomial inference and goodness of fit"
    },
    w10l3: {
      file: "lectures/Week10Lecture3.pdf",
      label: "Week 10, Lecture 3 — Pearson's chi-squared: homogeneity and independence"
    },
    w11l12: {
      file: "lectures/Week11Lecture1and2.pdf",
      label: "Week 11, Lectures 1–2 — One-way ANOVA"
    },
    w11l3: {
      file: "lectures/Week11Lecture3.pdf",
      label: "Week 11, Lecture 3 — ANOVA tables and contrasts"
    },
    w12l12: {
      file: "lectures/Week12Lecture1and2.pdf",
      label: "Week 12, Lectures 1–2 — ANOVA parametrisations"
    },
    w12l3: {
      file: "lectures/Week12Lecture3b.pdf",
      label: "Week 12, Lecture 3 — Two-way ANOVA and interactions"
    },
    w13l1: {
      file: "lectures/Week13Lecture1.pdf",
      label: "Week 13, Lecture 1 — Regression and ANOVA recap"
    }
  };
})();
