/* Week 5 — Applied Class */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w05q1",
    week: 5,
    label: "Question 1",
    title: "Full column rank, invertibility and zero-variance estimates",
    difficulty: "Medium",
    exam: "Q2",
    topics: ["regression", "estimation"],
    hint: {
      text: `Prove both directions. If $\\mathbf{X}\\mathbf{c} = \\mathbf{0}$ then $\\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{c} = \\mathbf{0}$. Conversely, pre-multiply by $\\mathbf{c}^{\\top}$ and use $\\mathbf{c}^{\\top}\\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{c} = \\lVert\\mathbf{X}\\mathbf{c}\\rVert^{2}$.`,
      refs: ["l07"]
    },
    stem: `Suppose that $\\mathbf{Y} \\sim \\mathrm{N}(\\mathbf{X}\\boldsymbol{\\beta}, \\sigma^{2}\\mathbf{I}_n)$, where $\\mathbf{X}$ is an $n \\times p$ matrix, $n > p$ and $\\sigma^{2} > 0$. If $\\mathbf{X}$ has full column rank (that is, there is no $\\mathbf{c} \\in \\mathbb{R}^{p}\\setminus\\{\\mathbf{0}\\}$ such that $\\mathbf{X}\\mathbf{c} = \\mathbf{0}$) the MLE is unique and given by
<div class="display">$$\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}\\mathbf{Y}.$$</div>`,
    parts: [
      { l: "a", t: `Show that $\\mathbf{X}^{\\top}\\mathbf{X}$ is invertible if and only if $\\mathbf{X}$ has full column rank.` },
      { l: "b", t: `Let $\\mathbf{c} \\in \\mathbb{R}^{p}$. An unbiased estimator of $\\mathbf{c}^{\\top}\\boldsymbol{\\beta}$ is $\\mathbf{c}^{\\top}\\hat{\\boldsymbol{\\beta}}$. Is there a vector $\\mathbf{c} \\in \\mathbb{R}^{p}\\setminus\\{\\mathbf{0}\\}$ for which $\\mathrm{Var}(\\mathbf{c}^{\\top}\\hat{\\boldsymbol{\\beta}}) = 0$?` }
    ],
    answer: [
      {
        l: "a",
        t: `A square matrix $\\mathbf{A}$ is invertible if and only if $\\mathbf{A}\\mathbf{x} = \\mathbf{0}$ implies $\\mathbf{x} = \\mathbf{0}$.

Suppose $\\mathbf{X}$ does not have full column rank, so there is $\\mathbf{c} \\in \\mathbb{R}^{p}\\setminus\\{\\mathbf{0}\\}$ with $\\mathbf{X}\\mathbf{c} = \\mathbf{0}$. Then $\\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{c} = \\mathbf{X}^{\\top}\\mathbf{0} = \\mathbf{0}$, and since $\\mathbf{c} \\neq \\mathbf{0}$ the matrix $\\mathbf{X}^{\\top}\\mathbf{X}$ is not invertible.

Conversely, suppose $\\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{c} = \\mathbf{0}$ for some $\\mathbf{c} \\in \\mathbb{R}^{p}\\setminus\\{\\mathbf{0}\\}$. Then
<div class="display">$$\\mathbf{c}^{\\top}\\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{c} = \\mathbf{c}^{\\top}\\mathbf{0} = 0.$$</div>
But $\\mathbf{c}^{\\top}\\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{c} = \\lVert \\mathbf{X}\\mathbf{c} \\rVert^{2}$, and a norm is zero only for the zero vector, so $\\mathbf{X}\\mathbf{c} = \\mathbf{0}$. Hence $\\mathbf{X}$ does not have full column rank.

Taking the contrapositive in both directions, $\\mathbf{X}^{\\top}\\mathbf{X}$ is invertible if and only if $\\mathbf{X}$ has full column rank.`
      },
      {
        l: "b",
        t: `Let $\\mathbf{d} = (\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{c}$, so that $\\mathbf{c} = \\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{d}$. Then
<div class="display">$$\\frac{\\mathrm{Var}(\\mathbf{c}^{\\top}\\hat{\\boldsymbol{\\beta}})}{\\sigma^{2}} = \\mathbf{c}^{\\top}(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{c} = (\\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{d})^{\\top}\\mathbf{d} = \\mathbf{d}^{\\top}\\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{d} = \\lVert \\mathbf{X}\\mathbf{d} \\rVert^{2}.$$</div>
Since $\\mathbf{X}^{\\top}\\mathbf{X}$ is invertible and $\\mathbf{c} \\neq \\mathbf{0}$, we get $\\mathbf{d} \\neq \\mathbf{0}$. Since $\\mathbf{X}$ has full column rank, $\\mathbf{X}\\mathbf{d} \\neq \\mathbf{0}$. It follows that $\\mathbf{c} \\neq \\mathbf{0}$ implies $\\mathrm{Var}(\\mathbf{c}^{\\top}\\hat{\\boldsymbol{\\beta}}) > 0$.

So no such $\\mathbf{c}$ exists: every non-trivial linear combination of $\\hat{\\boldsymbol{\\beta}}$ has strictly positive variance.`
      }
    ]
  },

  {
    id: "w05q2",
    week: 5,
    label: "Question 2",
    title: "Regression through the origin: consistency and MSE comparison",
    difficulty: "Hard",
    exam: "Q2",
    topics: ["regression", "estimation", "sampling"],
    hint: {
      text: `$\\hat{\\beta}_n$ is the least-squares solution with a single column. For consistency use MSE $\\to 0$ and the fact that partial sums of $x_j^2$ are non-decreasing. For (e) apply Cauchy–Schwarz to $a_j = x_j$ and $b_j = x_j^{-1}$.`,
      refs: ["l07", "l02"]
    },
    stem: `Consider the regression-through-the-origin model
<div class="display">$$Y_i = \\beta x_i + \\varepsilon_i,$$</div>
where the $\\varepsilon_i$ are IID $\\mathrm{N}(0,\\sigma^{2})$ and $x_1, x_2, \\dots$ is a fixed (non-random) sequence. Assume that $x_1 \\neq 0$.`,
    parts: [
      { l: "a", t: `Let $\\hat{\\beta}_n$ denote the MLE of $\\beta$ from the first $n$ observations. Write down an expression for $\\hat{\\beta}_n$.` },
      { l: "b", t: `State the distribution of $\\hat{\\beta}_n$.` },
      { l: "c", t: `Give a necessary and sufficient condition on $x_1, x_2, \\dots$ for $\\hat{\\beta}_n$ to be a consistent estimator of $\\beta$, that is for all $\\delta > 0$, $\\lim_{n\\to\\infty} P(|\\hat{\\beta}_n - \\beta| > \\delta) = 0$.` },
      { l: "d", t: `Interpret the condition in part (c) in terms of the sensitivity of the mean response to changes in $\\beta$. Explain why increasing the number of observations does not necessarily guarantee consistency.` },
      { l: "e", t: `Suppose $x_j \\neq 0$ for all $j$. An alternative estimator of $\\beta$ is
<div class="display">$$\\tilde{\\beta}_n = n^{-1}\\sum_{j=1}^{n}\\frac{Y_j}{x_j}.$$</div>
Use the Cauchy–Schwarz inequality $\\left(\\sum_{j=1}^{n} a_j b_j\\right)^{2} \\le \\left(\\sum_{j=1}^{n} a_j^{2}\\right)\\left(\\sum_{j=1}^{n} b_j^{2}\\right)$ to show that $\\mathrm{MSE}(\\hat{\\beta}_n) \\le \\mathrm{MSE}(\\tilde{\\beta}_n)$. When is the MSE of the two estimators equal?` }
    ],
    answer: [
      {
        l: "a",
        t: `Here $\\mathbf{X} = (x_1,\\dots,x_n)^{\\top}$, so $\\mathbf{X}^{\\top}\\mathbf{X} = \\sum_{j=1}^{n} x_j^{2}$ and $\\mathbf{X}^{\\top}\\mathbf{Y} = \\sum_{j=1}^{n} x_j Y_j$. Hence
<div class="display">$$\\hat{\\beta}_n = \\frac{\\sum_{j=1}^{n} x_j Y_j}{\\sum_{j=1}^{n} x_j^{2}}.$$</div>`
      },
      {
        l: "b",
        t: `For the general linear model $\\hat{\\boldsymbol{\\beta}} \\sim \\mathrm{N}(\\boldsymbol{\\beta}, \\sigma^{2}(\\mathbf{X}^{\\top}\\mathbf{X})^{-1})$, so here
<div class="display">$$\\hat{\\beta}_n \\sim \\mathrm{N}\\!\\left(\\beta,\\; \\sigma^{2}\\Big(\\sum_{j=1}^{n} x_j^{2}\\Big)^{-1}\\right).$$</div>`
      },
      {
        l: "c",
        t: `If the MSE of an estimator converges to zero then the estimator is consistent. Since $\\hat{\\beta}_n$ is unbiased, $\\mathrm{MSE}(\\hat{\\beta}_n) = \\mathrm{Var}(\\hat{\\beta}_n) = \\sigma^{2}\\big(\\sum_j x_j^{2}\\big)^{-1}$, which tends to $0$ if and only if
<div class="display">$$\\sum_{j=1}^{n} x_j^{2} \\to \\infty.$$</div>
That condition is sufficient. To see it is also necessary, suppose $\\sum_j x_j^{2}$ does not tend to $\\infty$. Because the partial sums are non-decreasing, they must be bounded above by some finite $C_1$. Then
<div class="display">$$\\begin{aligned}
P(|\\hat{\\beta}_n - \\beta| > \\delta)
&amp;= P\\!\\left(\\frac{|\\hat{\\beta}_n - \\beta|}{\\sigma}\\sqrt{\\sum_{j=1}^{n} x_j^{2}} > \\frac{\\delta}{\\sigma}\\sqrt{\\sum_{j=1}^{n} x_j^{2}}\\right) \\\\
&amp;= P\\!\\left(|Z| > \\frac{\\delta}{\\sigma}\\sqrt{\\sum_{j=1}^{n} x_j^{2}}\\right)
\\ge P\\!\\left(|Z| > \\frac{\\delta\\sqrt{C_1}}{\\sigma}\\right) > 0,
\\end{aligned}$$</div>
where $Z \\sim \\mathrm{N}(0,1)$. So $\\hat{\\beta}_n$ cannot be consistent. Hence the necessary and sufficient condition is $\\sum_{j=1}^{n} x_j^{2} \\to \\infty$.`
      },
      {
        l: "d",
        t: `Since $\\mathrm{Var}(\\hat{\\beta}_n) = \\sigma^{2}\\big/\\sum_j x_j^{2}$, and a change in $\\beta$ changes the mean of $Y_j$ by an amount proportional to $x_j$: when $|x_j|$ is close to zero, the mean response barely responds to $\\beta$ while the error variance stays $\\sigma^{2}$, so such an observation contributes little precision.

The condition $\\sum_j x_j^{2} \\to \\infty$ says the accumulated squared magnitudes of the design values must grow without bound. Merely adding observations is not enough: if the $x_j$ approach zero quickly enough that $\\sum_j x_j^{2}$ stays bounded, the estimator remains imprecise no matter how large $n$ is, and it is inconsistent.`
      },
      {
        l: "e",
        t: `First compute the MSE of $\\tilde{\\beta}_n$. Since $\\mathrm{E}(Y_j) = \\beta x_j$,
<div class="display">$$\\mathrm{E}(\\tilde{\\beta}_n) = n^{-1}\\sum_{j=1}^{n} x_j^{-1}\\,\\mathrm{E}(Y_j) = n^{-1}\\sum_{j=1}^{n} x_j^{-1}\\,x_j\\beta = \\beta,$$</div>
so $\\tilde{\\beta}_n$ is unbiased, and
<div class="display">$$\\mathrm{Var}(\\tilde{\\beta}_n) = n^{-2}\\sum_{j=1}^{n} x_j^{-2}\\,\\mathrm{Var}(Y_j) = \\sigma^{2}\\,n^{-2}\\sum_{j=1}^{n} x_j^{-2}.$$</div>
Hence $\\mathrm{MSE}(\\tilde{\\beta}_n) = \\sigma^{2} n^{-2}\\sum_j x_j^{-2}$. We want to show
<div class="display">$$\\Big(\\sum_{j=1}^{n} x_j^{2}\\Big)^{-1} \\le n^{-2}\\sum_{j=1}^{n} x_j^{-2},$$</div>
which is equivalent to
<div class="display">$$n^{2} \\le \\Big(\\sum_{j=1}^{n} x_j^{2}\\Big)\\Big(\\sum_{j=1}^{n} x_j^{-2}\\Big).$$</div>
This follows from Cauchy–Schwarz with $a_j = x_j$ and $b_j = x_j^{-1}$, since then $\\sum_j a_j b_j = n$.

Equality in Cauchy–Schwarz holds if and only if $(x_1,\\dots,x_n)$ and $(x_1^{-1},\\dots,x_n^{-1})$ are linearly dependent, i.e. $x_j = c\\,x_j^{-1}$ for all $j$ and some constant $c$, which means $x_j^{2} = c$ for all $j$. So the MSEs are equal exactly when
<div class="display">$$|x_1| = |x_2| = \\cdots = |x_n|.$$</div>`
      }
    ]
  },

  {
    id: "w05q3",
    week: 5,
    label: "Question 3",
    title: "Omitting a variable that is orthogonal to the design",
    difficulty: "Medium",
    exam: "Q2",
    topics: ["regression", "estimation"],
    hint: {
      text: `Substitute the true model into $\\hat{\\boldsymbol{\\beta}}$ and take expectations to find the omission bias. For (d) use $\\mathbf{H}\\mathbf{X} = \\mathbf{X}$, $\\mathbf{H}\\mathbf{z} = \\mathbf{0}$, and that $\\mathbf{I}-\\mathbf{H}$ is symmetric and idempotent.`,
      refs: ["l07", "l08"]
    },
    stem: `Suppose that the true regression model is
<div class="display">$$\\mathbf{Y} = \\mathbf{X}\\boldsymbol{\\beta} + \\gamma\\mathbf{z} + \\boldsymbol{\\varepsilon}, \\qquad \\boldsymbol{\\varepsilon} \\sim \\mathrm{N}_n(\\mathbf{0}, \\sigma^{2}\\mathbf{I}_n),$$</div>
where $\\mathbf{X}$ is an $n \\times p$ matrix with full column rank and $\\mathbf{z} \\in \\mathbb{R}^{n}$ contains the observed values of an additional explanatory variable.

Suppose $\\mathbf{z}$ is omitted and the model containing only the explanatory variables in $\\mathbf{X}$ is fitted. The resulting estimator is $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}\\mathbf{Y}$.`,
    parts: [
      { l: "a", t: `Find $\\mathrm{E}(\\hat{\\boldsymbol{\\beta}})$ under the true model.` },
      { l: "b", t: `Suppose that $\\mathbf{z}$ is orthogonal to every column of $\\mathbf{X}$. Show that $\\hat{\\boldsymbol{\\beta}}$ is an unbiased estimator of $\\boldsymbol{\\beta}$.` },
      { l: "c", t: `Suppose that the fitted model contains an intercept. What does the condition that $\\mathbf{z}$ is orthogonal to the intercept column imply about the observed values in $\\mathbf{z}$?` },
      {
        l: "d",
        t: `Let $\\mathbf{H} = \\mathbf{X}(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}$ be the influence matrix for the fitted model and $\\mathbf{e} = \\mathbf{Y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}}$ the residual vector. Assume $\\mathbf{z}$ is orthogonal to every column of $\\mathbf{X}$.
<ul>
<li>(i) Show that $\\mathbf{H}\\mathbf{z} = \\mathbf{0}$.</li>
<li>(ii) Find an expression for $\\mathbf{e}$.</li>
<li>(iii) Find $\\mathrm{E}(\\mathbf{e})$ and $\\mathrm{Var}(\\mathbf{e})$.</li>
<li>(iv) Explain what these results show about the effect of omitting $\\mathbf{z}$.</li>
</ul>`
      }
    ],
    answer: [
      {
        l: "a",
        t: `Substituting the true model into the estimator,
<div class="display">$$\\begin{aligned}
\\hat{\\boldsymbol{\\beta}} &amp;= (\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}(\\mathbf{X}\\boldsymbol{\\beta} + \\gamma\\mathbf{z} + \\boldsymbol{\\varepsilon}) \\\\
&amp;= \\boldsymbol{\\beta} + \\gamma(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}\\mathbf{z} + (\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}\\boldsymbol{\\varepsilon}.
\\end{aligned}$$</div>
Since $\\mathrm{E}(\\boldsymbol{\\varepsilon}) = \\mathbf{0}$,
<div class="display">$$\\mathrm{E}(\\hat{\\boldsymbol{\\beta}}) = \\boldsymbol{\\beta} + \\gamma(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}\\mathbf{z},$$</div>
so the bias from omitting $\\mathbf{z}$ is $\\mathrm{Bias}(\\hat{\\boldsymbol{\\beta}}) = \\gamma(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}\\mathbf{z}$.`
      },
      {
        l: "b",
        t: `$\\mathbf{z}$ is orthogonal to every column of $\\mathbf{X}$ if and only if $\\mathbf{X}^{\\top}\\mathbf{z} = \\mathbf{0}$. Then from part (a),
<div class="display">$$\\mathrm{E}(\\hat{\\boldsymbol{\\beta}}) = \\boldsymbol{\\beta} + \\gamma(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{0} = \\boldsymbol{\\beta},$$</div>
so $\\hat{\\boldsymbol{\\beta}}$ is unbiased for $\\boldsymbol{\\beta}$.`
      },
      {
        l: "c",
        t: `If the fitted model contains an intercept, one column of $\\mathbf{X}$ is $\\mathbf{1}_n = (1,\\dots,1)^{\\top}$. Orthogonality of $\\mathbf{z}$ to this column requires
<div class="display">$$\\mathbf{1}_n^{\\top}\\mathbf{z} = \\sum_{i=1}^{n} z_i = 0,$$</div>
that is $\\bar{z} = 0$. The observed values of the omitted variable must be centred at zero.`
      },
      {
        l: "d",
        t: `(i) Since $\\mathbf{X}^{\\top}\\mathbf{z} = \\mathbf{0}$,
<div class="display">$$\\mathbf{H}\\mathbf{z} = \\mathbf{X}(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}\\mathbf{z} = \\mathbf{0}.$$</div>

(ii) The residual vector is $\\mathbf{e} = (\\mathbf{I}_n - \\mathbf{H})\\mathbf{Y}$. Substituting the true model,
<div class="display">$$\\mathbf{e} = (\\mathbf{I}_n - \\mathbf{H})\\mathbf{X}\\boldsymbol{\\beta} + \\gamma(\\mathbf{I}_n - \\mathbf{H})\\mathbf{z} + (\\mathbf{I}_n - \\mathbf{H})\\boldsymbol{\\varepsilon}.$$</div>
Because $\\mathbf{H}\\mathbf{X} = \\mathbf{X}$ and $\\mathbf{H}\\mathbf{z} = \\mathbf{0}$,
<div class="display">$$\\mathbf{e} = \\gamma\\mathbf{z} + (\\mathbf{I}_n - \\mathbf{H})\\boldsymbol{\\varepsilon}.$$</div>

(iii) Therefore
<div class="display">$$\\mathrm{E}(\\mathbf{e}) = \\gamma\\mathbf{z}, \\qquad \\mathrm{Var}(\\mathbf{e}) = (\\mathbf{I}_n - \\mathbf{H})\\,\\sigma^{2}\\mathbf{I}_n\\,(\\mathbf{I}_n - \\mathbf{H})^{\\top} = \\sigma^{2}(\\mathbf{I}_n - \\mathbf{H}),$$</div>
since $\\mathbf{H}$ is symmetric and idempotent, so that $\\mathbf{I}_n - \\mathbf{H}$ is symmetric and idempotent as well. Hence
<div class="display">$$\\mathbf{e} \\sim \\mathrm{N}\\big(\\gamma\\mathbf{z},\\; \\sigma^{2}(\\mathbf{I}_n - \\mathbf{H})\\big).$$</div>

(iv) Omitting $\\mathbf{z}$ does not bias $\\hat{\\boldsymbol{\\beta}}$, but it does contaminate the residuals: $\\mathrm{E}(e_i) = \\gamma z_i$. The omitted effect survives as a systematic component of the residuals instead of being absorbed into the estimated coefficients of the included variables. Consequently, a plot of the residuals against $\\mathbf{z}$ would tend to show a linear pattern whenever $\\gamma \\neq 0$ — a useful diagnostic for a missing variable.`
      }
    ]
  },

  {
    id: "w05q4",
    week: 5,
    label: "Question 4",
    title: "Influence and leverage in the SAT regression",
    difficulty: "Medium",
    exam: "Q2",
    topics: ["regression", "diagnostics"],
    hint: {
      text: `Cook's distance combines a standardised residual with leverage. Compare each state's leverage with the average $p/n = 0.10$, and read the <code>dfbeta</code> rows to see what deletion actually does.`,
      refs: ["l08", "l09"]
    },
    stem: `The <code>sat</code> data in the <code>faraway</code> package contain state-level educational expenditure and SAT results for the 50 US states in 1994–95. Fit the model
<div class="display">$$\\texttt{total} = \\beta_0 + \\beta_1\\texttt{expend} + \\beta_2\\texttt{salary} + \\beta_3\\texttt{ratio} + \\beta_4\\texttt{takers} + \\varepsilon.$$</div>
Use appropriate diagnostic quantities and plots to answer the questions below. For every plot displayed, explain what feature is relevant and what conclusion you draw. Do not display a plot unless you have something substantive to say about it.
<pre><code>library(faraway)
?sat
sat_lm &lt;- lm(total ~ expend + salary + ratio + takers, data = sat)

sat_diagnostics &lt;- data.frame(
  rstandard      = rstandard(sat_lm),
  leverage       = hatvalues(sat_lm),
  cooks.distance = cooks.distance(sat_lm),
  row.names      = rownames(sat)
)
sat_diagnostics[order(sat_diagnostics$cooks.distance, decreasing = TRUE), ][1:5, ]
dfbeta(sat_lm)["Utah", ]
dfbeta(sat_lm)["California", ]</code></pre>
Relevant output (there are $n = 50$ observations and $p = 5$ coefficients):
<pre><code>                 rstandard leverage cooks.distance
Utah                  2.390    0.292          0.472
West Virginia        -2.859    0.062          0.108
North Dakota          2.124    0.081          0.080
New Hampshire         2.103    0.083          0.080
Connecticut           0.979    0.225          0.056

&gt; dfbeta(sat_lm)["Utah", ]
(Intercept)      expend      salary       ratio      takers
    -47.874       5.405      -1.459       4.015       0.026

&gt; dfbeta(sat_lm)["California", ]
(Intercept)      expend      salary       ratio      takers
      9.320       1.262      -0.307      -0.368      -0.009</code></pre>

Two plots were also produced: Cook's distance against the observation index, with a screening line at $4/n = 0.08$; and pupil-to-teacher ratio against each of expenditure per pupil and percentage of SAT takers, with Utah and California labelled.

<figure>
  <img src="img/sat-cooks.png" alt="Cook's distance for each of the 50 states in the SAT regression, with a dashed screening line at 4/n = 0.08.">
  <figcaption>Cook's distance by state, with the screening line at $4/n = 0.08$.</figcaption>
</figure>

<figure>
  <img src="img/sat-expend-ratio.png" alt="Two scatterplots of pupil-to-teacher ratio against expenditure per pupil and against percentage of SAT takers, with Utah and California labelled.">
  <figcaption>Pupil-to-teacher ratio against expenditure per pupil (left) and percentage of SAT takers (right).</figcaption>
</figure>`,
    parts: [
      { l: "a", t: `According to the output, Utah has the largest Cook's distance. Report its Cook's distance, leverage and standardised residual, and explain why this state is influential.` },
      { l: "b", t: `Refitting the model without Utah gives
<pre><code>sat_no_utah_lm &lt;- lm(total ~ expend + salary + ratio + takers,
                     data = sat[row.names(sat) != "Utah", ])
summary(sat_no_utah_lm)

#              Estimate Std. Error t value Pr(&gt;|t|)
# (Intercept) 1093.8460    53.4226  20.475   &lt;2e-16
# expend        -0.9427    10.1922  -0.092    0.927
# salary         3.0964     2.3283   1.330    0.190
# ratio         -7.6391     3.4279  -2.229    0.031
# takers        -2.9308     0.2188 -13.397   &lt;2e-16</code></pre>
The full-model estimates were
<table>
<tr><th></th><th>Estimate</th><th>Std. Error</th><th>$t$ value</th><th>$\\Pr(>|t|)$</th></tr>
<tr><td>(Intercept)</td><td>1045.9715</td><td>52.8698</td><td>19.784</td><td>$< 2\\times10^{-16}$</td></tr>
<tr><td>expend</td><td>4.4626</td><td>10.5465</td><td>0.423</td><td>0.674</td></tr>
<tr><td>salary</td><td>1.6379</td><td>2.3872</td><td>0.686</td><td>0.496</td></tr>
<tr><td>ratio</td><td>$-3.6242$</td><td>3.2154</td><td>$-1.127$</td><td>0.266</td></tr>
<tr><td>takers</td><td>$-2.9045$</td><td>0.2313</td><td>$-12.559$</td><td>$2.61\\times10^{-16}$</td></tr>
</table>
How do the estimated coefficients change when Utah is removed? Which change most? Do the principal conclusions from the model change?` },
      { l: "c", t: `West Virginia has the largest absolute standardised residual. Why does deleting West Virginia have less effect on the estimated coefficients than deleting Utah?` },
      { l: "d", t: `California has a relatively high leverage of $0.282$. Does deleting California have a large effect on the estimated coefficients? Explain your answer using both its leverage and its standardised residual.` }
    ],
    answer: [
      {
        l: "a",
        t: `Reading the output from largest to smallest Cook's distance:
<div class="display">$$D_{\\text{Utah}} = 0.472, \\quad h_{\\text{Utah}} = 0.292, \\quad r_{\\text{Utah}} = 2.390;$$</div>
West Virginia is a distant second with $D = 0.108$.
Utah is influential because it combines high leverage with a fairly large residual — both factors enter Cook's distance. Its covariate values are unusual: it has the lowest expenditure per pupil, the highest pupil-to-teacher ratio and one of the lowest percentages of SAT takers. Its observed total score is also substantially larger than the value predicted by the model.

The gap in the output is what matters: $0.472$ against $0.108$ for the runner-up, both far above the screening value $4/n = 4/50 = 0.08$ but separated from each other by a factor of more than four. Utah is therefore not merely the largest, it is in a class of its own.`
      },
      {
        l: "b",
        t: `The full model gives
<table>
<tr><th></th><th>Estimate</th><th>Std. Error</th><th>$t$ value</th><th>$\\Pr(>|t|)$</th></tr>
<tr><td>(Intercept)</td><td>1045.9715</td><td>52.8698</td><td>19.784</td><td>$< 2\\times10^{-16}$</td></tr>
<tr><td>expend</td><td>4.4626</td><td>10.5465</td><td>0.423</td><td>0.674</td></tr>
<tr><td>salary</td><td>1.6379</td><td>2.3872</td><td>0.686</td><td>0.496</td></tr>
<tr><td>ratio</td><td>$-3.6242$</td><td>3.2154</td><td>$-1.127$</td><td>0.266</td></tr>
<tr><td>takers</td><td>$-2.9045$</td><td>0.2313</td><td>$-12.559$</td><td>$2.61\\times10^{-16}$</td></tr>
</table>
The change in each coefficient when Utah is deleted is given by <code>dfbeta(sat_lm)["Utah",]</code>:
<pre><code>  (Intercept)        expend        salary         ratio        takers
 -47.87443743   5.40533354  -1.45851225   4.01491196   0.02632387</code></pre>
The intercept and the coefficients of expend, salary and ratio change noticeably: the estimate for expend changes sign and the magnitude for ratio more than doubles. However these coefficients are imprecisely estimated in the full model, as the large standard errors relative to the estimates show.

Deleting Utah does not materially affect the coefficient of takers, so the principal conclusion about SAT participation is unchanged. It does affect conclusions about some other covariates: after removing Utah the estimated coefficient of ratio becomes more negative and its p-value falls below $0.05$.

<pre><code>sat_no_utah_lm &lt;- lm(total ~ expend + salary + ratio + takers,
                     data = sat[row.names(sat) != "Utah",])
summary(sat_no_utah_lm)

#              Estimate Std. Error t value Pr(&gt;|t|)
# (Intercept) 1093.8460    53.4226  20.475   &lt;2e-16
# expend        -0.9427    10.1922  -0.092    0.927
# salary         3.0964     2.3283   1.330    0.190
# ratio         -7.6391     3.4279  -2.229    0.031
# takers        -2.9308     0.2188 -13.397   &lt;2e-16</code></pre>`
      },
      {
        l: "c",
        t: `West Virginia has
<div class="display">$$D_{\\text{WV}} = 0.108, \\quad h_{\\text{WV}} = 0.062, \\quad r_{\\text{WV}} = -2.859.$$</div>
It is the clearest response outlier — observed total $932$ against a fitted value of about $1022.5$ — but its leverage is below the average leverage $p/n = 5/50 = 0.10$. Its covariate values are therefore not unusual enough for it to pull strongly on the fitted regression surface.

Utah has a somewhat smaller absolute standardised residual but much higher leverage. Influence depends on both the size of the residual and the leverage, so Utah has a much larger effect on the estimated coefficients.`
      },
      {
        l: "d",
        t: `California has relatively high leverage ($0.282$) but its standardised residual is small in magnitude, about $-0.572$, and its Cook's distance is only about $0.026$ — well below the guideline $4/n = 0.08$. Although it is unusual in the predictor space, it lies reasonably close to the fitted regression surface, so deleting it does not have a large effect. This is confirmed by
<pre><code>dfbeta(sat_lm)["California",]
#  (Intercept)      expend      salary       ratio      takers
#   9.31992536  1.26239336 -0.30738250 -0.36782899 -0.00878391</code></pre>
The lesson: high leverage creates the potential for influence, but a high-leverage observation with a small residual need not be influential.`
      }
    ]
  }
);
