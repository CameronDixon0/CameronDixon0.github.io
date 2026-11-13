/*
 * Exam mode.
 *
 * Question text never changes in the data files. This module says, per question, how the
 * question should be *trimmed* when exam mode is on:
 *
 *   drop        part labels to remove (not answerable in a written exam)
 *   addendum    HTML appended to the stem: results you are given, so that surviving parts
 *               stand alone. This is the "giving some result that we wouldn't otherwise
 *               know" allowance.
 *   reword      replacement text for a surviving part, when its wording referred to a
 *               dropped part or to software
 *   answerPatch replacement answer text for a surviving part, for the same reason
 *
 * A question missing from this table is already fully exam-viable and is shown unchanged.
 *
 * What counts as exam-viable: answerable with pen, paper and a basic scientific calculator
 * (so logarithms, powers, roots and the four operations are fine), using only the printed
 * table of probabilities and quantiles, or values given in the addendum. Not viable:
 * numerical optimisation, simulation, numerically evaluating long sums or integrals, or
 * looking up a probability that is not supplied.
 */
(function () {
  "use strict";

  /* The table printed on the final page of the paper. */
  var SHEET = [
    ["qnorm(0.950)", "1.644854"],
    ["qnorm(0.975)", "1.959964"],
    ["qnorm(0.990)", "2.326348"],
    ["qnorm(0.995)", "2.575829"],
    ["pnorm(1.131)", "0.8709725"],
    ["pt(1.74, 17)", "0.9500354"],
    ["pt(-1.74, 17)", "0.04996462"],
    ["pt(2.567, 17)", "0.9900014"],
    ["pt(-1.398, 17)", "0.09004422"],
    ["qchisq(0.90, 1)", "2.705543"],
    ["qchisq(0.95, 1)", "3.841459"],
    ["qchisq(0.99, 1)", "6.634897"],
    ["pchisq(2.91, 1)", "0.9119681"],
    ["qf(0.90, 6, 63)", "1.869819"],
    ["qf(0.95, 6, 63)", "2.246408"],
    ["qf(0.99, 6, 63)", "3.102767"],
    ["pf(5.66, 6, 63)", "0.9999055"],
    ["qf(0.90, 9, 60)", "1.738020"],
    ["qf(0.95, 9, 60)", "2.040098"],
    ["qf(0.99, 9, 60)", "2.718454"],
    ["pf(3.61, 9, 60)", "0.9988009"],
    ["pf(7.57, 9, 9)", "0.002956763"],
    ["qgamma(0.90, 15, rate = 12)", "1.677334"],
    ["qgamma(0.95, 15, rate = 12)", "1.823874"],
    ["qgamma(0.99, 15, rate = 12)", "2.120508"],
    ["qgamma(0.90, 15, rate = 1/12)", "241.5361"],
    ["qgamma(0.95, 15, rate = 1/12)", "262.6378"],
    ["qgamma(0.99, 15, rate = 1/12)", "305.3531"],
    ["pi", "3.141593"],
    ["sqrt(pi)", "1.772454"],
    ["sqrt(2*pi)", "2.506628"],
    ["1/sqrt(2*pi)", "0.3989423"],
    ["exp(1)", "2.718282"]
  ];

  window.EXAM_MODE = {
    sheet: SHEET,

    questions: {
      /* ---- Week 3: the numerical-optimiser part cannot be set in a written exam ---- */
      w03q5: {
        drop: ["b"]
      },

      /* ---- Week 9: 22 observations; supply the summaries so the CI is the work ---- */
      w09e1: {
        addendum:
          "You may use the sample mean $\\bar{x} = 8.682$ and sample standard deviation $s = 2.835$, and $t_{21,\\,0.95} = 1.7207$."
      },

      /* ---- Week 9: P(X >= 25) for Bin(100, 1/6) needs a computer ---- */
      w09e4: {
        addendum:
          "You may use $P(X \\ge 25) = 0.022$ where $X \\sim \\mathrm{Bin}(100, 1/6)$."
      },

      /* ---- Week 10: chi-squared with 17 degrees of freedom is not in the table ---- */
      w10e2: {
        addendum: "You may use $\\chi^{2}_{17,\\,0.95} = 27.587$."
      },

      /* ---- Week 10: Poisson tail probabilities ---- */
      w10e4: {
        addendum:
          "You may use $P(\\mathrm{Poisson}(109.5) \\ge 127) = 0.055$, $P(\\mathrm{Poisson}(109.5) \\ge 128) = 0.045$, " +
          "$P(\\mathrm{Poisson}(135) \\ge 128) = 0.738$ and $P(\\mathrm{Poisson}(109.5) \\ge 132) = 0.020$."
      },

      w10e5: {
        addendum:
          "You may use $P(\\mathrm{Poisson}(112.5) \\ge 132) = 0.039$, $P(\\mathrm{Poisson}(114) \\ge 132) = 0.053$, " +
          "$P(\\mathrm{Poisson}(15 \\times 7.579) \\ge 132) = 0.0500$ and $P(\\mathrm{Poisson}(15 \\times 7.834) \\ge 132) = 0.0999$."
      },

      /* ---- Week 10: a grid of normal powers needs many pnorm values ---- */
      w10e6: {
        reword: {
          b: "For sample size $n = 5$, find the value $c$ such that the level of the test is $\\alpha = 0.01$. " +
             "You may use $qnorm(0.99) = 2.326$.",
          c: "For sample sizes $n = 10, 20, 40$ the power at selected alternatives is<br>\n" +
             "<table>\n" +
             "<tr><th>$\\mu_1$</th><th>$n=10$</th><th>$n=20$</th><th>$n=40$</th></tr>\n" +
             "<tr><td>0.4</td><td>0.144</td><td>0.296</td><td>0.581</td></tr>\n" +
             "<tr><td>0.8</td><td>0.581</td><td>0.895</td><td>0.997</td></tr>\n" +
             "<tr><td>1.2</td><td>0.929</td><td>0.999</td><td>1.000</td></tr>\n" +
             "<tr><td>1.6</td><td>0.997</td><td>1.000</td><td>1.000</td></tr>\n" +
             "<tr><td>2.0</td><td>1.000</td><td>1.000</td><td>1.000</td></tr>\n" +
             "</table>\n" +
             "For reference, at $\\mu_1 = 1.0$ with $n = 5$ the power is $0.464$. " +
             "What happens to the power at a fixed $\\mu_1$ as the sample size grows?",
          d: "Now suppose $X_1,\\dots,X_n$ are a random sample from a $\\mathrm{N}(\\mu, 10^{2})$ distribution. The power at selected alternatives is<br>\n" +
             "<table>\n" +
             "<tr><th>$\\mu_1$</th><th>$n=10$</th><th>$n=20$</th><th>$n=40$</th></tr>\n" +
             "<tr><td>4</td><td>0.144</td><td>0.296</td><td>0.581</td></tr>\n" +
             "<tr><td>8</td><td>0.581</td><td>0.895</td><td>0.997</td></tr>\n" +
             "<tr><td>12</td><td>0.929</td><td>0.999</td><td>1.000</td></tr>\n" +
             "<tr><td>16</td><td>0.997</td><td>1.000</td><td>1.000</td></tr>\n" +
             "<tr><td>20</td><td>1.000</td><td>1.000</td><td>1.000</td></tr>\n" +
             "</table>\n" +
             "Compare this table with the one in part (c)."
        },
        answerPatch: {
          b: "Under $H_0$, $\\bar{X} \\sim \\mathrm{N}(0, 1/n)$, so $\\sqrt{n}\\bar{X} \\sim \\mathrm{N}(0,1)$. We require\n" +
             "<div class=\"display\">$$0.01 = P(\\mathrm{N}(0,1) \\ge 2.326) = P_{H_0}(\\sqrt{5}\\,\\bar{X} \\ge 2.326) = P_{H_0}(\\bar{X} \\ge 1.04),$$</div>\n" +
             "so $c = 2.326/\\sqrt{5} = 1.04$, using $qnorm(0.99) = 2.326$ from the table.",
          c: "For sample size $n$ the $1\\%$ cutoff is $c_n = 2.326/\\sqrt{n}$, and the power is\n" +
             "<div class=\"display\">$$\\text{power}(\\mu_1) = P\\left(\\mathrm{N}(0,1) \\ge \\sqrt{n}(c_n - \\mu_1)\\right).$$</div>\n" +
             "At every fixed $\\mu_1$ the power increases with $n$: at $\\mu_1 = 0.8$ it goes $0.581 \\to 0.895 \\to 0.997$ as $n$ goes $10 \\to 20 \\to 40$. Larger samples give a steeper power curve, because the standard error of $\\bar{X}$ shrinks.",
          d: "Now $\\sigma = 10$. The LRT again reduces to $\\{\\bar{X} \\ge c\\}$, with $c_n = 10 \\times 2.326/\\sqrt{n}$, and\n" +
             "<div class=\"display\">$$\\text{power}(\\mu_1) = P\\left(\\mathrm{N}(0,1) \\ge \\frac{\\sqrt{n}(c_n - \\mu_1)}{10}\\right).$$</div>\n" +
             "The table is numerically identical to the one in part (c)."
        }
      },

      /* ---- Week 11: chi-squared quantiles for 5 and 11 degrees of freedom ---- */
      w11e2: {
        addendum: "You may use $\\chi^{2}_{5,\\,0.95} = 11.070$."
      },

      w11e3: {
        addendum: "You may use $\\chi^{2}_{11,\\,0.95} = 19.675$."
      },

      /* ---- Week 12: the within-group sum of squares is 15 numbers of hand arithmetic;
         an exam would print the ANOVA table and ask you to complete it, as the sample
         paper does. ---- */
      w12e2: {
        drop: ["c", "d"],
        addendum:
          "You are given that $\\mathrm{SS}_{\\text{diet}} = 1228.27$ g$^{2}$ and $\\mathrm{SS}_{\\text{residual}} = 66.74$ g$^{2}$, and that $F_{2,12,\\,0.95} = 3.885$.",
        reword: {
          f: "Using the sums of squares above, complete the ANOVA table:\n" +
             "<table>\n" +
             "<tr><th>Source</th><th>df</th><th>SS</th><th>MS</th><th>$F$</th><th>$P(F)$</th></tr>\n" +
             "<tr><td>Diet</td><td></td><td>1228.27</td><td></td><td></td><td></td></tr>\n" +
             "<tr><td>Residual</td><td></td><td>66.74</td><td></td><td></td><td></td></tr>\n" +
             "<tr><td>Total</td><td></td><td></td><td></td><td></td><td></td></tr>\n" +
             "</table>\n" +
             "What do you conclude about weight gain and protein diet levels?"
        },
        answerPatch: {
          f: "<table>\n" +
             "<tr><th>Source</th><th>df</th><th>SS</th><th>MS</th><th>$F$</th><th>$P(F)$</th></tr>\n" +
             "<tr><td>Diet</td><td>2</td><td>1228.27</td><td>614.14</td><td>110.43</td><td>$1.873\\times10^{-8}$</td></tr>\n" +
             "<tr><td>Residual</td><td>12</td><td>66.74</td><td>5.56</td><td></td><td></td></tr>\n" +
             "<tr><td>Total</td><td>14</td><td>1295.01</td><td></td><td></td><td></td></tr>\n" +
             "</table>\n" +
             "The $F$ statistic is $614.14/5.56 = 110.43$, far above $F_{2,12,\\,0.95} = 3.885$, so we reject $H_0$: there is very strong evidence that mean weight gain varied with protein level in the diet."
        }
      },

      /* ---- Week 13: group summaries instead of 20 numbers of hand arithmetic ---- */
      w13e1: {
        addendum:
          "You may use the following group means and standard deviations: I $\\bar{y} = 290.4$, $s = 57.0$; " +
          "II $323.2$, $67.0$; III $274.8$, $68.0$; IV $371.2$, $60.2$. The residual standard deviation is $63.2$ on $16$ degrees of freedom."
      },

      w13e3: {
        addendum:
          "The within-cell standard deviations range from $0.13$ (poison III, treatment C) to $3.36$ (poison II, treatment B); " +
          "on the reciprocal scale they range from $0.020$ to $0.083$."
      },

      /* ---- Assignment 3 ---- */
      a3q2: {
        addendum:
          "You may use the quantiles $qbeta(0.025, 24, 32) = 0.303$ and $qbeta(0.975, 24, 32) = 0.559$."
      },

      a3q4: {
        drop: ["g"],
        addendum:
          "You may use $P(X \\le 15) = 0.0955$ and $P(X \\ge 26) = 0.0573$ for $X \\sim \\mathrm{Bin}(50, 0.4)$, and " +
          "$P(X \\ge 29) = 0.00762$ under $H_0$ and $P(X \\ge 29) = 0.1611$ under $p = 0.5$."
      },

      a3q6: {
        addendum: "You may use $2\\,P(N \\le 4) = 0.049$ where $N \\sim \\mathrm{Bin}(17, 0.5)$."
      },

      /* ---- Assignment 4 ---- */
      a4q1: {
        addendum:
          "You may use $qbeta(0.005, 8, 7) = 0.2234$ and $qbeta(0.995, 8, 7) = 0.8276$."
      },

      a4q2: {
        addendum: "You may use $\\chi^{2}_{4,\\,0.95} = 9.488$."
      },

      a4q3: {
        drop: ["f"],
        addendum:
          "You may use the values $-2\\log\\Lambda = 14.21$ and $\\chi^{2}_{6,\\,0.95} = 12.592$.",
        reword: {
          g: "Using part (d), compute Pearson's $\\chi^{2}$ statistic. Is it numerically close to the $-2\\log\\Lambda$ statistic of $14.21$ given above?",
          h: "Carry out the hypothesis test using the value of Pearson's $\\chi^{2}$ statistic you obtained in part (g), " +
             "by computing and interpreting a $p$-value, and state your conclusion in a way that is understandable to a population health scientist."
        },
        answerPatch: {
          h: "The degrees of freedom are\n" +
             "<div class=\"display\">$$(3-1)(4-1) = 6,$$</div>\n" +
             "matching the parameter count: $12 - 1 = 11$ under the alternative against $2 + 3 = 5$ under the null.\n\n" +
             "Using Pearson's statistic from part (g),\n" +
             "<div class=\"display\">$$p = P(\\chi^{2}_{6} \\ge 15.37) = 0.0176 \\approx 1.8\\%.$$</div>\n" +
             "Since $15.37 > \\chi^{2}_{6,\\,0.95} = 12.592$ we reject $H_0$ at the $5\\%$ level; equivalently $p = 1.8\\% < 5\\%$.\n\n" +
             "<strong>Conclusion for a population health scientist.</strong> There is moderately strong evidence that tuberculosis severity is related to ABO blood type in this population. The clearest departure is that Eskimos with blood type B appear to have more moderate/advanced tuberculosis than expected if severity were unrelated to blood type: the observed count is $13$ against an expected $6.18$."
        }
      },

      a4q4: {
        addendum: "You may use $F_{1,8,\\,0.95} = 5.318$."
      }
    }
  };
})();
