/* Assignment 2 */
(window.QBANK = window.QBANK || []).push(
  {
    id: "a2q1",
    group: "Assignment 2",
    label: "Question 1",
    source: "assignment",
    title: "Information, the Cramér–Rao bound and standard errors",
    difficulty: "Hard",
    topics: ["info", "mle", "estimation"],
    stem: `This question builds on Assignment 1. In Question 1 of Assignment 1 we met the Rayleigh distribution, with density
<div class="display">$$f(x;\\theta) = \\frac{x}{\\theta}\\exp\\left(-\\frac{x^{2}}{2\\theta}\\right), \\qquad x > 0, \\;\\theta > 0,$$</div>
for which $\\mathrm{E}_\\theta(X^{2}) = 2\\theta$ and $\\mathrm{E}_\\theta(X^{4}) = 8\\theta^{2}$, and the MLE is $\\hat{\\theta} = \\frac{1}{2n}\\sum_{i=1}^{n}X_i^{2}$. Let $X_1,\\dots,X_n$ be a random sample from this distribution.

In Question 3 of Assignment 1 we fitted the Lomax distribution by maximum likelihood, using data in <code>lomax.csv</code>.`,
    parts: [
      { l: "a", t: `Determine the expected information in the sample by both (i) taking the expectation of the observed information and (ii) computing the variance of the score function. Verify that the two calculations give the same result.` },
      { l: "b", t: `Does the MLE of $\\theta$ attain the Cramér–Rao lower bound? Justify your answer.` },
      { l: "c", t: `Let $\\theta_0$ denote the true parameter value. State the limiting distribution of $\\sqrt{n}(\\hat{\\theta} - \\theta_0)$.` },
      {
        l: "d",
        t: `For the Lomax data the fitted model was extended to return the Hessian of the negative log-likelihood at the MLE:
<pre><code>fit &lt;- optim(par = MoM, fn = negloglik, method = "L-BFGS-B",
             lower = c(0, 0), data = data, hessian = TRUE)
fit$par
#    alpha   lambda
# 4.857471 39.30154
fit$hessian
#           [,1]      [,2]
# [1,] 42.381827 -4.343897
# [2,] -4.343897  0.459352</code></pre>
Provide standard errors for the MLE of $(\\alpha,\\lambda)$, and interpret them.`
      },
      {
        l: "e",
        t: `Assume $\\alpha > 1$, so that the mean of the distribution is
<div class="display">$$\\mathrm{E}_{\\boldsymbol{\\theta}}(X) = \\frac{\\lambda}{\\alpha-1}.$$</div>
Using the results of part (d), compute the MLE of the mean of the distribution and its standard error, and give a 95% confidence interval.`
      }
    ],
    answer: [
      {
        l: "a",
        t: `Write $S = \\sum_{i=1}^{n} X_i^{2}$. From Assignment 1,
<div class="display">$$\\ell(\\theta) = \\text{const} - n\\log\\theta - \\frac{S}{2\\theta}, \\quad U(\\theta) = -\\frac{n}{\\theta} + \\frac{S}{2\\theta^{2}}, \\quad \\ell''(\\theta) = \\frac{n}{\\theta^{2}} - \\frac{S}{\\theta^{3}}.$$</div>

<strong>(i) Via the observed information.</strong> The observed information is
<div class="display">$$J(\\theta) = -\\ell''(\\theta) = \\frac{S}{\\theta^{3}} - \\frac{n}{\\theta^{2}}.$$</div>
Since $\\mathrm{E}_\\theta(S) = n(2\\theta) = 2n\\theta$,
<div class="display">$$I(\\theta) = \\mathrm{E}_\\theta[J(\\theta)] = \\frac{2n\\theta}{\\theta^{3}} - \\frac{n}{\\theta^{2}} = \\frac{n}{\\theta^{2}}.$$</div>

<strong>(ii) Via the variance of the score.</strong> Using $\\mathrm{Var}(S) = \\sum_i \\mathrm{Var}(X_i^{2}) = n\\,(8\\theta^{2} - 4\\theta^{2}) = 4n\\theta^{2}$,
<div class="display">$$\\mathrm{Var}_\\theta(U(\\theta)) = \\mathrm{Var}\\left(\\frac{S}{2\\theta^{2}}\\right) = \\frac{4n\\theta^{2}}{4\\theta^{4}} = \\frac{n}{\\theta^{2}}.$$</div>
The two calculations agree, as they must.`
      },
      {
        l: "b",
        t: `Yes. From Assignment 1, $\\hat{\\theta}$ is unbiased and $\\mathrm{Var}(\\hat{\\theta}) = \\theta^{2}/n$. The Cramér–Rao lower bound for any unbiased estimator of $\\theta$ is
<div class="display">$$\\frac{1}{I(\\theta)} = \\frac{\\theta^{2}}{n},$$</div>
which equals $\\mathrm{Var}(\\hat{\\theta})$ exactly. So $\\hat{\\theta}$ attains the Cramér–Rao lower bound and is therefore a minimum-variance unbiased estimator.`
      },
      {
        l: "c",
        t: `Since $\\theta_0$ is an interior point and the usual regularity conditions hold,
<div class="display">$$\\sqrt{n}(\\hat{\\theta} - \\theta_0) \\xrightarrow{d} \\mathrm{N}\\!\\left(0, \\frac{1}{i(\\theta_0)}\\right) = \\mathrm{N}(0, \\theta_0^{2}),$$</div>
where $i(\\theta) = 1/\\theta^{2}$ is the information for a single observation (since $I(\\theta) = n\\,i(\\theta)$).`
      },
      {
        l: "d",
        t: `Because <code>optim</code> is minimising the negative log-likelihood, the Hessian it returns is the observed information matrix at the MLE:
<div class="display">$$J(\\hat{\\boldsymbol{\\theta}}) = \\begin{pmatrix} 42.3818 &amp; -4.3439 \\\\ -4.3439 &amp; 0.4594 \\end{pmatrix}.$$</div>
Inverting gives the estimated covariance matrix
<div class="display">$$J(\\hat{\\boldsymbol{\\theta}})^{-1} = \\begin{pmatrix} 0.7672 &amp; 7.2552 \\\\ 7.2552 &amp; 70.7862 \\end{pmatrix},$$</div>
so the standard errors are the square roots of the diagonal entries:
<div class="display">$$\\widehat{\\mathrm{se}}(\\hat{\\alpha}) = \\sqrt{0.7672} = 0.876, \\qquad \\widehat{\\mathrm{se}}(\\hat{\\lambda}) = \\sqrt{70.7862} = 8.413.$$</div>
Both estimates are many standard errors from zero ($z = 4.857/0.876 = 5.55$ and $z = 39.30/8.413 = 4.67$), so both parameters are clearly needed.

Note that the off-diagonal entry is large positive: the estimated correlation between the two estimates is
<div class="display">$$\\frac{7.2552}{0.876 \\times 8.413} \\approx 0.984,$$</div>
so $\\hat{\\alpha}$ and $\\hat{\\lambda}$ are very strongly positively correlated. Intuitively this is because $\\alpha$ and $\\lambda$ trade off against one another in controlling the scale and tail weight of the Lomax distribution, so the data pin down their combination more precisely than either separately.`
      },
      {
        l: "e",
        t: `Let $g(\\alpha,\\lambda) = \\lambda/(\\alpha-1)$. Its gradient is
<div class="display">$$\\nabla g = \\left(-\\frac{\\lambda}{(\\alpha-1)^{2}},\\; \\frac{1}{\\alpha-1}\\right)^{\\top},$$</div>
which at the MLE is
<div class="display">$$\\nabla g(\\hat{\\alpha},\\hat{\\lambda}) = \\left(-\\frac{39.3015}{(3.8575)^{2}},\\; \\frac{1}{3.8575}\\right)^{\\top} = (-2.6415,\\; 0.2592)^{\\top}.$$</div>
The MLE of the mean follows from the invariance property:
<div class="display">$$\\hat{\\mu} = \\frac{\\hat{\\lambda}}{\\hat{\\alpha}-1} = \\frac{39.3015}{3.8575} = 10.188.$$</div>
The delta method gives its variance,
<div class="display">$$\\widehat{\\mathrm{Var}}(\\hat{\\mu}) = \\nabla g^{\\top} J(\\hat{\\boldsymbol{\\theta}})^{-1} \\nabla g \\approx 0.1739,$$</div>
so
<div class="display">$$\\widehat{\\mathrm{se}}(\\hat{\\mu}) = \\sqrt{0.1739} = 0.417.$$</div>
A 95% Wald interval is therefore
<div class="display">$$10.188 \\pm 1.96(0.417) = (9.371,\\; 11.006).$$</div>
Reassuringly, this interval comfortably contains the sample mean $\\bar{x} = 10.217$, which is what we would hope for a reasonable fit. The standard error of $\\hat{\\mu}$ is much smaller than the standard error of either parameter individually because of the strong positive correlation between $\\hat{\\alpha}$ and $\\hat{\\lambda}$: the two errors largely cancel in the ratio $\\lambda/(\\alpha-1)$.`
      }
    ]
  },

  {
    id: "a2q2",
    group: "Assignment 2",
    label: "Question 2",
    source: "assignment",
    title: "Estimating $\\sigma$ from residuals, reparametrisation and leverage",
    difficulty: "Hard",
    topics: ["regression", "estimation", "diagnostics"],
    stem: `Consider the standard linear regression model
<div class="display">$$\\mathbf{Y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}, \\qquad \\boldsymbol{\\varepsilon} \\sim \\mathrm{N}(\\mathbf{0}, \\sigma^{2}\\mathbf{I}),$$</div>
where $\\mathbf{X}$ is an $n \\times p$ matrix with full column rank and $n > p$. Let $\\mathbf{H} = \\mathbf{X}(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}$ denote the influence matrix.`,
    parts: [
      {
        l: "a",
        t: `Let $\\mathbf{e} = \\mathbf{Y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}} = (\\mathbf{I}-\\mathbf{H})\\mathbf{Y}$ be the vector of residuals. We are interested in the following estimator of $\\sigma$:
<div class="display">$$\\hat{\\sigma}_c = c\\sum_{i=1}^{n}|e_i|,$$</div>
where $c$ may depend on the model matrix $\\mathbf{X}$ but not on the response $\\mathbf{Y}$.
<ul>
<li>(i) Determine $c$ so that $\\hat{\\sigma}_c$ is an unbiased estimator of $\\sigma$. You may use the fact that $\\mathrm{E}|Z| = \\sqrt{2/\\pi}$ for $Z \\sim \\mathrm{N}(0,1)$.</li>
<li>(ii) The residuals are generally not independent. Explain why independence is not required in determining the expectation of $\\hat{\\sigma}_c$.</li>
</ul>`
      },
      {
        l: "b",
        t: `Let $\\mathbf{A}$ be a $p \\times p$ invertible matrix, and consider the reparametrised model with model matrix $\\tilde{\\mathbf{X}} = \\mathbf{X}\\mathbf{A}$.
<ul>
<li>(i) Express the ordinary least-squares estimator obtained using model matrix $\\tilde{\\mathbf{X}}$ in terms of $\\hat{\\boldsymbol{\\beta}}$.</li>
<li>(ii) Show that the residuals obtained using $\\tilde{\\mathbf{X}}$ are identical to those obtained using $\\mathbf{X}$.</li>
</ul>`
      },
      {
        l: "c",
        t: `Suppose the observed response for observation $j$ is increased by an amount $\\delta$, while all other observed responses remain unchanged. The new response vector is $\\tilde{\\mathbf{Y}} = \\mathbf{Y} + \\delta\\mathbf{u}_j$, where $\\mathbf{u}_j$ has a $1$ in position $j$ and zeros elsewhere. Let $\\mathbf{e}$ and $\\tilde{\\mathbf{e}}$ denote the residual vectors obtained using $\\mathbf{Y}$ and $\\tilde{\\mathbf{Y}}$.
<ul>
<li>(i) Determine the change in the residuals $\\tilde{e}_j - e_j$ and $\\tilde{e}_i - e_i$ for $i \\neq j$.</li>
<li>(ii) Hence explain why an unusual response at an observation with high leverage may not produce a large residual.</li>
</ul>`
      }
    ],
    answer: [
      {
        l: "a",
        t: `(i) Since $\\mathbf{e} = (\\mathbf{I}-\\mathbf{H})\\mathbf{Y}$ and $\\mathbf{H}$ is symmetric and idempotent,
<div class="display">$$\\mathrm{Var}(\\mathbf{e}) = \\sigma^{2}(\\mathbf{I}-\\mathbf{H})(\\mathbf{I}-\\mathbf{H})^{\\top} = \\sigma^{2}(\\mathbf{I}-\\mathbf{H}),$$</div>
so $e_i \\sim \\mathrm{N}(0, \\sigma^{2}(1-h_{ii}))$, where $h_{ii}$ is the $i$th leverage. Writing $e_i = \\sigma\\sqrt{1-h_{ii}}\\,Z$ with $Z \\sim \\mathrm{N}(0,1)$,
<div class="display">$$\\mathrm{E}|e_i| = \\sigma\\sqrt{1-h_{ii}}\\;\\mathrm{E}|Z| = \\sigma\\sqrt{\\frac{2}{\\pi}}\\sqrt{1-h_{ii}}.$$</div>
Hence
<div class="display">$$\\mathrm{E}(\\hat{\\sigma}_c) = c\\sum_{i=1}^{n}\\mathrm{E}|e_i| = c\\,\\sigma\\sqrt{\\frac{2}{\\pi}}\\sum_{i=1}^{n}\\sqrt{1-h_{ii}},$$</div>
and this equals $\\sigma$ for all $\\sigma$ precisely when
<div class="display">$$c = \\sqrt{\\frac{\\pi}{2}}\\bigg/\\sum_{i=1}^{n}\\sqrt{1-h_{ii}}.$$</div>
Since $c$ depends only on the leverages, which depend only on $\\mathbf{X}$, this is a valid choice.

(ii) The expectation of a sum is the sum of the expectations,
<div class="display">$$\\mathrm{E}\\left(\\sum_{i=1}^{n}|e_i|\\right) = \\sum_{i=1}^{n}\\mathrm{E}|e_i|,$$</div>
and this identity holds regardless of any dependence between the $e_i$. Linearity of expectation requires no independence assumption. All we needed was the <em>marginal</em> distribution of each $e_i$, which the calculation above supplies. Independence would be needed to work out the <em>variance</em> of $\\hat{\\sigma}_c$, but not its expectation.`
      },
      {
        l: "b",
        t: `(i) Using $\\tilde{\\mathbf{X}} = \\mathbf{X}\\mathbf{A}$ and the fact that $(\\mathbf{P}\\mathbf{Q})^{-1} = \\mathbf{Q}^{-1}\\mathbf{P}^{-1}$ and $(\\mathbf{X}\\mathbf{A})^{\\top} = \\mathbf{A}^{\\top}\\mathbf{X}^{\\top}$,
<div class="display">$$\\begin{aligned}
\\tilde{\\boldsymbol{\\beta}} &amp;= (\\tilde{\\mathbf{X}}^{\\top}\\tilde{\\mathbf{X}})^{-1}\\tilde{\\mathbf{X}}^{\\top}\\mathbf{Y}
= (\\mathbf{A}^{\\top}\\mathbf{X}^{\\top}\\mathbf{X}\\mathbf{A})^{-1}\\mathbf{A}^{\\top}\\mathbf{X}^{\\top}\\mathbf{Y} \\\\
&amp;= \\mathbf{A}^{-1}(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}(\\mathbf{A}^{\\top})^{-1}\\mathbf{A}^{\\top}\\mathbf{X}^{\\top}\\mathbf{Y}
= \\mathbf{A}^{-1}(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}\\mathbf{Y} = \\mathbf{A}^{-1}\\hat{\\boldsymbol{\\beta}}.
\\end{aligned}$$</div>

(ii) The fitted values are
<div class="display">$$\\tilde{\\mathbf{X}}\\tilde{\\boldsymbol{\\beta}} = \\mathbf{X}\\mathbf{A}\\mathbf{A}^{-1}\\hat{\\boldsymbol{\\beta}} = \\mathbf{X}\\hat{\\boldsymbol{\\beta}},$$</div>
so the residuals are
<div class="display">$$\\tilde{\\mathbf{e}} = \\tilde{\\mathbf{Y}} - \\tilde{\\mathbf{X}}\\tilde{\\boldsymbol{\\beta}} = \\mathbf{Y} - \\mathbf{X}\\hat{\\boldsymbol{\\beta}} = \\mathbf{e}.$$</div>
Equivalently, the influence matrix is unchanged: $\\tilde{\\mathbf{H}} = \\tilde{\\mathbf{X}}(\\tilde{\\mathbf{X}}^{\\top}\\tilde{\\mathbf{X}})^{-1}\\tilde{\\mathbf{X}}^{\\top} = \\mathbf{X}\\mathbf{A}\\mathbf{A}^{-1}(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}(\\mathbf{A}^{\\top})^{-1}\\mathbf{A}^{\\top}\\mathbf{X}^{\\top} = \\mathbf{H}$. Re-parametrising a model therefore leaves the fit, the residuals and the leverages untouched; only the meaning of the coefficients changes.`
      },
      {
        l: "c",
        t: `(i) By linearity of $\\mathbf{I}-\\mathbf{H}$,
<div class="display">$$\\tilde{\\mathbf{e}} = (\\mathbf{I}-\\mathbf{H})\\tilde{\\mathbf{Y}} = (\\mathbf{I}-\\mathbf{H})\\mathbf{Y} + \\delta(\\mathbf{I}-\\mathbf{H})\\mathbf{u}_j = \\mathbf{e} + \\delta(\\mathbf{I}-\\mathbf{H})\\mathbf{u}_j.$$</div>
The $j$th component of $(\\mathbf{I}-\\mathbf{H})\\mathbf{u}_j$ is $1-h_{jj}$, while for $i \\neq j$ it is $-h_{ij}$. Hence
<div class="display">$$\\tilde{e}_j - e_j = \\delta(1-h_{jj}), \\qquad \\tilde{e}_i - e_i = -\\delta h_{ij} \\;\\; (i \\neq j).$$</div>

(ii) The change in the residual at observation $j$ is $\\delta(1-h_{jj})$, which is small whenever the leverage $h_{jj}$ is close to one. So if observation $j$ has high leverage, a large shift $\\delta$ in its response moves the fitted value almost as much as the observation itself: the line is pulled towards the point and the residual barely changes. Consequently a genuine outlier at a high-leverage point can have a modest residual, which is why residual size alone is not a reliable way to detect unusual observations, and why leverage must be considered alongside the residual.`
      }
    ]
  },

  {
    id: "a2q3",
    group: "Assignment 2",
    label: "Question 3",
    source: "assignment",
    title: "Choosing design points to minimise variances",
    difficulty: "Hard",
    topics: ["regression", "estimation"],
    stem: `A researcher wishes to investigate the effects of two quantitative covariates, $x_1$ and $x_2$, on a response $Y$. The researcher can choose the $n$ design points $(x_{1,1},x_{2,1}),\\dots,(x_{1,n},x_{2,n})$ at which the response is observed.`,
    parts: [
      {
        l: "a",
        t: `First, consider the simple linear regression model
<div class="display">$$Y_i = \\beta_0 + \\beta_1 x_{1,i} + \\varepsilon_i, \\qquad \\varepsilon_i \\overset{\\text{iid}}{\\sim} \\mathrm{N}(0,\\sigma^{2}).$$</div>
<ul>
<li>(i) Derive the variance of $\\hat{\\beta}_0$, using the fact that
<div class="display">$$\\left(\\sum_{i=1}^{n}\\begin{pmatrix}1 &amp; z_i \\\\ z_i &amp; z_i^{2}\\end{pmatrix}\\right)^{-1} = \\begin{pmatrix}\\dfrac{1}{n} + \\dfrac{\\bar{z}^{2}}{S_{zz}} &amp; -\\dfrac{\\bar{z}}{S_{zz}} \\\\[8pt] -\\dfrac{\\bar{z}}{S_{zz}} &amp; \\dfrac{1}{S_{zz}}\\end{pmatrix},$$</div>
where $\\bar{z} = n^{-1}\\sum_{i=1}^{n} z_i$ and $S_{zz} = \\sum_{i=1}^{n}(z_i - \\bar{z})^{2}$. Hence state a condition on the design points under which this variance attains its minimum possible value.</li>
<li>(ii) Suppose that $-1 \\le x_{1,i} \\le 1$ for all $i$ and that $n$ is even. How should the $x_{1,i}$ be chosen to minimise the variance of $\\hat{\\beta}_1$? Justify your answer.</li>
</ul>`
      },
      {
        l: "b",
        t: `Now consider the multiple linear regression model
<div class="display">$$Y_i = \\beta_0 + \\beta_1 x_{1,i} + \\beta_2 x_{2,i} + \\varepsilon_i, \\qquad \\varepsilon_i \\overset{\\text{iid}}{\\sim} \\mathrm{N}(0,\\sigma^{2}). \\tag{1}$$</div>
Assume that each design point is of the form $(x_{1,i},0)$ or $(0,x_{2,i})$, and that $\\sum_{i=1}^{n}x_{1,i} = \\sum_{i=1}^{n}x_{2,i} = 0$. For the model matrix to have full column rank we also need $\\sum_{i=1}^{n}x_{1,i}^{2} > 0$ and $\\sum_{i=1}^{n}x_{2,i}^{2} > 0$.
<ul>
<li>(i) Let $\\mathbf{X}$ be the model matrix. Determine $\\mathbf{X}^{\\top}\\mathbf{X}$ and hence show that this matrix is diagonal.</li>
<li>(ii) Suppose the researcher omits $x_2$ and fits the reduced model $Y_i = \\alpha_0 + \\alpha_1 x_{1,i} + \\varepsilon_i$. It is not hard to show that $\\hat{\\alpha}_0 = \\hat{\\beta}_0$ and $\\hat{\\alpha}_1 = \\hat{\\beta}_1$. If $\\beta_2 \\neq 0$, explain how omitting $x_2$ affects the usual estimator of the error variance in the reduced model. Is it unbiased, upward biased or downward biased?</li>
<li>(iii) Derive an expression for the leverage of each observation, with separate expressions for observations whose design point is $(x_{1,i},0)$ and those whose design point is $(0,x_{2,i})$.</li>
<li>(iv) The researcher suspects the covariates may interact and attempts to fit $Y_i = \\beta_0 + \\beta_1x_{1,i} + \\beta_2x_{2,i} + \\beta_3x_{1,i}x_{2,i} + \\varepsilon_i$. Explain why $\\beta_3$ cannot be estimated with this data.</li>
</ul>`
      }
    ],
    answer: [
      {
        l: "a",
        t: `(i) With $z_i = x_{1,i}$, the model matrix satisfies $\\mathbf{X}^{\\top}\\mathbf{X} = \\sum_i \\begin{pmatrix}1 &amp; z_i \\\\ z_i &amp; z_i^{2}\\end{pmatrix}$, so
<div class="display">$$\\mathrm{Var}(\\hat{\\beta}_0) = \\sigma^{2}\\left[\\left(\\mathbf{X}^{\\top}\\mathbf{X}\\right)^{-1}\\right]_{11} = \\sigma^{2}\\left(\\frac{1}{n} + \\frac{\\bar{z}^{2}}{S_{zz}}\\right).$$</div>
Since $\\bar{z}^{2} \\ge 0$ and $S_{zz} > 0$, this variance is minimised when $\\bar{z} = 0$, i.e. when the design points are centred so that their mean is zero. The minimum value is then $\\sigma^{2}/n$, which is the same as the variance of the mean of $n$ observations — the best that can be achieved.

(ii) Now $\\mathrm{Var}(\\hat{\\beta}_1) = \\sigma^{2}/S_{zz}$ where $S_{zz} = \\sum_i (x_{1,i}-\\bar{x}_1)^{2}$, so we want to maximise $S_{zz} = \\sum_i x_{1,i}^{2} - n\\bar{x}_1^{2}$.

Since $|x_{1,i}| \\le 1$, each $x_{1,i}^{2} \\le 1$, so $\\sum_i x_{1,i}^{2} \\le n$ with equality if and only if every $x_{1,i}^{2} = 1$. Also $\\bar{x}_1^{2} \\ge 0$. Hence
<div class="display">$$S_{zz} = \\sum_{i=1}^{n}x_{1,i}^{2} - n\\bar{x}_1^{2} \\le n,$$</div>
with equality requiring both $\\sum_i x_{1,i}^{2} = n$ (so every $x_{1,i} \\in \\{-1,1\\}$) and $\\bar{x}_1 = 0$.

Because $n$ is even we can take exactly $n/2$ of the $x_{1,i}$ equal to $-1$ and $n/2$ equal to $+1$; then $\\bar{x}_1 = 0$ and $S_{zz} = n$, giving $\\mathrm{Var}(\\hat{\\beta}_1) = \\sigma^{2}/n$, the minimum possible. So the design points should be split evenly between the two endpoints $x_1 = -1$ and $x_1 = +1$. Intuitively, the slope is estimated most precisely from design points as far apart as possible, placed symmetrically about the centre.`
      },
      {
        l: "b",
        t: `(i) The three columns of $\\mathbf{X}$ are $\\mathbf{1}$, $\\mathbf{x}_1$ and $\\mathbf{x}_2$, so
<div class="display">$$\\mathbf{X}^{\\top}\\mathbf{X} = \\begin{pmatrix}n &amp; \\sum_i x_{1,i} &amp; \\sum_i x_{2,i} \\\\ \\sum_i x_{1,i} &amp; \\sum_i x_{1,i}^{2} &amp; \\sum_i x_{1,i}x_{2,i} \\\\ \\sum_i x_{2,i} &amp; \\sum_i x_{1,i}x_{2,i} &amp; \\sum_i x_{2,i}^{2}\\end{pmatrix} = \\begin{pmatrix}n &amp; 0 &amp; 0 \\\\ 0 &amp; \\sum_i x_{1,i}^{2} &amp; 0 \\\\ 0 &amp; 0 &amp; \\sum_i x_{2,i}^{2}\\end{pmatrix},$$</div>
since $\\sum_i x_{1,i} = \\sum_i x_{2,i} = 0$ by assumption, and $\\sum_i x_{1,i}x_{2,i} = 0$ because at every design point one of $x_{1,i}, x_{2,i}$ is zero. The matrix is therefore diagonal. These two assumptions are exactly what makes the covariates orthogonal to each other and to the intercept.

(ii) Let $\\mathrm{RSS}_{\\text{full}}$ be the residual sum of squares from (1) on $n - 3$ degrees of freedom, and $\\mathrm{RSS}_{\\text{red}}$ that from (2) on $n-2$ degrees of freedom. Because the columns are orthogonal, adding $x_2$ to the model explains precisely $\\hat{\\beta}_2^{2}\\sum_i x_{2,i}^{2}$, so
<div class="display">$$\\mathrm{RSS}_{\\text{red}} = \\mathrm{RSS}_{\\text{full}} + \\hat{\\beta}_2^{2}\\sum_{i=1}^{n}x_{2,i}^{2}.$$</div>
Taking expectations, and using $\\mathrm{E}(\\mathrm{RSS}_{\\text{full}}) = \\sigma^{2}(n-3)$ and $\\mathrm{E}(\\hat{\\beta}_2) = \\beta_2$,
<div class="display">$$\\mathrm{E}(\\mathrm{RSS}_{\\text{red}}) = \\sigma^{2}(n-3) + \\beta_2^{2}\\sum_{i=1}^{n}x_{2,i}^{2}.$$</div>
The reduced-model variance estimator is $\\hat{\\sigma}^{2}_{\\text{red}} = \\mathrm{RSS}_{\\text{red}}/(n-2)$, so
<div class="display">$$\\mathrm{E}(\\hat{\\sigma}^{2}_{\\text{red}}) = \\sigma^{2}\\,\\frac{n-3}{n-2} + \\frac{\\beta_2^{2}\\sum_i x_{2,i}^{2}}{n-2} > \\sigma^{2}$$</div>
whenever $\\beta_2 \\neq 0$. So it is <strong>upward biased</strong>. Two things push it up: the omitted variable's contribution survives in the residual sum of squares, and the divisor is smaller.

(iii) The leverage is $h_{ii} = \\mathbf{x}_i^{\\top}(\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{x}_i$, and since $\\mathbf{X}^{\\top}\\mathbf{X}$ is diagonal its inverse has diagonal entries $1/n$, $1/\\sum_j x_{1,j}^{2}$ and $1/\\sum_j x_{2,j}^{2}$. For a design point of the form $(x_{1,i},0)$ the covariate row is $(1, x_{1,i}, 0)$, so
<div class="display">$$h_{ii} = \\frac{1}{n} + \\frac{x_{1,i}^{2}}{\\sum_{j=1}^{n}x_{1,j}^{2}},$$</div>
and for a design point $(0, x_{2,i})$ the row is $(1, 0, x_{2,i})$, so
<div class="display">$$h_{ii} = \\frac{1}{n} + \\frac{x_{2,i}^{2}}{\\sum_{j=1}^{n}x_{2,j}^{2}}.$$</div>
In both cases the leverage is $1/n$ plus the observation's share of the variation in whichever covariate is non-zero at that point. The two sets of leverages sum to $1 + 1 = 2$, which matches the trace of $\\mathbf{H}$ being $p = 3$ minus the $1/n$ from the intercept column.

(iv) At every design point one of $x_{1,i}$ or $x_{2,i}$ is zero, so the interaction column has entries $x_{1,i}x_{2,i} = 0$ for every $i$. The interaction column is therefore the zero vector, which is a linear combination of the other columns. The model matrix no longer has full column rank, so $\\mathbf{X}^{\\top}\\mathbf{X}$ is singular and $\\beta_3$ is not identifiable: we would need design points where both $x_1$ and $x_2$ are non-zero to estimate an interaction.`
      }
    ]
  },

  {
    id: "a2q4",
    group: "Assignment 2",
    label: "Question 4",
    source: "assignment",
    title: "Delivery times: regression, collinearity and influence",
    difficulty: "Medium",
    topics: ["regression", "diagnostics"],
    stem: `A distributor of temperature-controlled medical supplies wants to predict the time required to complete each delivery route. For $60$ weekday routes the following were recorded:
<ul>
<li><code>distance</code>: total route distance in kilometres;</li>
<li><code>delivery_stops</code>: number of delivery stops;</li>
<li><code>packages</code>: number of temperature-controlled packages;</li>
<li><code>traffic</code>: index, with $0$ representing free-flowing traffic;</li>
<li><code>completion_time</code>: minutes from depot departure to return.</li>
</ul>
The data are stored in <code>Delivery.csv</code>.`,
    parts: [
      { l: "a", t: `Fit a multiple linear regression model with completion time as the response and the other variables as covariates. Write down the fitted regression model, including the parameter estimates and the residual standard error.` },
      { l: "b", t: `The variance inflation factors and the covariate correlation matrix are
<pre><code>&gt; vif(fit)
      distance delivery_stops       packages        traffic
         1.234          8.315          8.320          1.035

&gt; cor(d[, c("distance","delivery_stops","packages","traffic")])
               distance delivery_stops packages traffic
distance          1.000          0.738    0.720  -0.174
delivery_stops    0.738          1.000    0.937  -0.179
packages          0.720          0.937    1.000  -0.181
traffic          -0.174         -0.179   -0.181   1.000</code></pre>
Identify any evidence of collinearity and explain which relationships among the predictors appear to be producing it.` },
      { l: "c", t: `Use studentised residuals to identify any observations you consider to be outliers. State and justify the criterion you use.
<pre><code>&gt; sort(rstudent(fit))[c(1:3, 58:60)]
     [ordered by size]
       24        33        55 
 3.42541   4.67219   2.11230
&gt; qt(1 - 0.05/(2*60), df = 55)
[1] 3.5359</code></pre>` },
      { l: "d", t: `Identify the route with the largest Cook's distance. Refitting without it gives
<pre><code>&gt; which.max(cooks.distance(fit))
24
&gt; dfbeta(fit)[24, ]
(Intercept)       distance delivery_stops       packages        traffic
 -10.776845       0.159178      -0.151184       0.147584       0.115257

&gt; coef(summary(fit))[, "Estimate"]
   (Intercept)       distance delivery_stops       packages        traffic
     7.6446870      1.4978533      5.2849953      0.1655073      1.3310544

&gt; coef(summary(lm(completion_time ~ distance + delivery_stops + packages + traffic,
&gt;                 data = d[-24, ])))[, "Estimate"]
   (Intercept)       distance delivery_stops       packages        traffic
    18.4214815      1.3387173      5.4361695      0.0179468      1.2157631</code></pre>
Compare the estimated coefficients with those from the original model. Which estimated coefficient changes most relative to its original standard error? Are the substantive conclusions affected?` },
      { l: "e", t: `Route 51 has a leverage of $0.409$, the largest in the data, yet its Cook's distance is only $0.0017$ and its studentised residual is $-0.109$. Why isn't its Cook's distance also large?` }
    ],
    answer: [
      {
        l: "a",
        t: `The fitted model is
<div class="display">$$\\begin{aligned}
\\widehat{\\texttt{completion\\_time}} = &amp;\\; 7.645 + 1.498\\,\\texttt{distance} + 5.285\\,\\texttt{delivery\\_stops} \\\\
&amp;+ 0.166\\,\\texttt{packages} + 1.331\\,\\texttt{traffic},
\\end{aligned}$$</div>
with residual standard error $\\hat{\\sigma} = 13.996$ on $55$ degrees of freedom. The model explains $R^{2} = 0.914$ of the variation in completion time (adjusted $R^{2} = 0.908$).

Interpretation: each additional kilometre adds about $1.5$ minutes, each additional stop about $5.3$ minutes, and each unit on the traffic index about $1.3$ minutes. The coefficient on <code>packages</code> is small and not distinguishable from zero ($t = 0.27$, $p = 0.79$).

<table>
<tr><th></th><th>Estimate</th><th>Std. Error</th><th>$t$</th><th>$p$</th></tr>
<tr><td>(Intercept)</td><td>7.645</td><td>8.350</td><td>0.92</td><td>0.364</td></tr>
<tr><td>distance</td><td>1.498</td><td>0.119</td><td>12.59</td><td>$< 0.001$</td></tr>
<tr><td>delivery_stops</td><td>5.285</td><td>1.103</td><td>4.79</td><td>$< 0.001$</td></tr>
<tr><td>packages</td><td>0.166</td><td>0.617</td><td>0.27</td><td>0.789</td></tr>
<tr><td>traffic</td><td>1.331</td><td>0.172</td><td>7.76</td><td>$< 0.001$</td></tr>
</table>`
      },
      {
        l: "b",
        t: `The VIFs for <code>delivery_stops</code> ($8.32$) and <code>packages</code> ($8.32$) are around $8$, well above the usual screening value of $5$ (or $10$ at the extreme), while <code>distance</code> ($1.23$) and <code>traffic</code> ($1.04$) are almost uncorrelated with the other predictors.

The correlation matrix explains why: <code>delivery_stops</code> and <code>packages</code> have a correlation of $0.937$. Routes with many stops naturally also carry many packages, so these two variables carry largely the same information.

The consequence is that the variance of each of these two coefficients is inflated roughly eightfold, so their standard errors are about $\\sqrt{8.32} \\approx 2.9$ times larger than they would be for orthogonal covariates. This is precisely why <code>packages</code> has such a large standard error ($0.617$) relative to its estimate ($0.166$): the data cannot easily separate the effect of extra packages from the effect of extra stops.`
      },
      {
        l: "c",
        t: `The largest absolute studentised residual belongs to route 33, with a value of $4.672$. Route 24 follows with $3.425$.

For a formal criterion we should account for screening all $60$ observations at once. Under the model each externally studentised residual has a $t_{55}$ distribution, so a two-sided Bonferroni test at an overall $5\\%$ level uses the critical value
<div class="display">$$t_{55,\\,1-0.05/(2\\times 60)} = 3.536.$$</div>
Only route 33 exceeds this, so route 33 is the only observation that is a clear outlier after adjusting for multiplicity. Route 24 is worth inspecting but is not significant at the $5\\%$ familywise level.

Note that we should look at <em>both</em> tails: it is large residuals in either direction that count.`
      },
      {
        l: "d",
        t: `Route 24 has the largest Cook's distance, $0.629$ — comfortably above the screening value $4/n = 4/60 = 0.067$.

The <code>dfbeta</code> row for route 24 gives the change in each coefficient when it is removed:
<table>
<tr><th></th><th>(Intercept)</th><th>distance</th><th>delivery_stops</th><th>packages</th><th>traffic</th></tr>
<tr><td><code>dfbeta</code></td><td>$-10.777$</td><td>$+0.159$</td><td>$-0.151$</td><td>$+0.148$</td><td>$+0.115$</td></tr>
<tr><td>original SE</td><td>$8.350$</td><td>$0.119$</td><td>$1.103$</td><td>$0.617$</td><td>$0.172$</td></tr>
<tr><td>change / SE</td><td>$-1.29$</td><td>$1.34$</td><td>$-0.14$</td><td>$0.24$</td><td>$0.67$</td></tr>
</table>
Measured relative to its own standard error, the coefficient that changes most is <code>distance</code>, by $1.34$ standard errors; the intercept changes by $-1.29$ standard errors, essentially as much.

Comparing the two fitted models: the <code>distance</code> coefficient falls from $1.498$ to $1.339$, <code>delivery_stops</code> rises slightly from $5.285$ to $5.436$, <code>packages</code> collapses from $0.166$ to $0.018$, and the intercept rises from $7.6$ to $18.4$.

The substantive conclusions are <strong>not</strong> materially affected. Distance, stops and traffic remain strongly significant with coefficients of the same sign and similar magnitude, and <code>packages</code> was never significant to begin with. The residual standard error drops from $13.996$ to $12.803$, so route 24 was adding noise, but the story the model tells is unchanged.`
      },
      {
        l: "e",
        t: `Cook's distance combines leverage <em>and</em> residual size:
<div class="display">$$D_i = \\frac{r_i^{2}}{p}\\cdot\\frac{h_{ii}}{1-h_{ii}}.$$</div>
Route 51 has high leverage ($h_{ii} = 0.409$) but an almost zero studentised residual ($-0.109$): its observed completion time of $256$ minutes is very close to the fitted value of $257.2$. With $r_i^{2}$ close to zero, $D_i$ is close to zero whatever the leverage.

Substantively, route 51 has an unusual combination of predictors (a mid-range distance of $32$ km but a large number of stops, $34$, and packages, $60$) — so it is unusual in the covariate space — but the response is exactly what the model predicts for that combination. High leverage creates the <em>potential</em> for influence; without a large residual, the potential is not realised.`
      }
    ]
  },

  {
    id: "a2q5",
    group: "Assignment 2",
    label: "Question 5 (STAT2904)",
    source: "assignment",
    title: "Estimating the mean when variance equals mean",
    difficulty: "Hard",
    topics: ["estimation", "info", "mle"],
    stem: `The total signal accumulated by a detector has both expected signal and signal variance proportional to the exposure time. In suitable units, an exposure time $\\theta > 0$ produces a measurement distributed as $\\mathrm{N}(\\theta,\\theta)$. Suppose $X_1,\\dots,X_n$ is a random sample from this distribution.`,
    parts: [
      { l: "a", t: `Show that $\\bar{X}$ is an unbiased estimator of $\\theta$, and determine its variance.` },
      { l: "b", t: `Calculate the Fisher information about $\\theta$ in the sample, and hence obtain the Cramér–Rao lower bound for the variance of an unbiased estimator of $\\theta$. Does $\\bar{X}$ attain this lower bound? Justify your answer.` },
      { l: "c", t: `Express the observations as an intercept-only linear regression model. Use the Gauss–Markov theorem to state an optimality property of $\\bar{X}$.` },
      { l: "d", t: `The Cramér–Rao calculation shows that $\\bar{X}$ does not attain the lower bound, whereas the Gauss–Markov theorem shows that $\\bar{X}$ is optimal within a particular class of estimators. Explain why these conclusions do not contradict one another. Your answer should identify the class of estimators considered by each theorem.` },
      { l: "e", t: `Show that the maximum likelihood estimator of $\\theta$ is
<div class="display">$$\\hat{\\theta}_{\\text{MLE}} = \\frac{-1 + \\sqrt{1 + 4\\overline{X^{2}}}}{2}, \\qquad \\text{where } \\overline{X^{2}} = \\frac{1}{n}\\sum_{i=1}^{n}X_i^{2}.$$</div>
Explain why this estimator is not a linear function of the observations, and hence why the Gauss–Markov theorem does not compare it with $\\bar{X}$.` }
    ],
    answer: [
      {
        l: "a",
        t: `Since $\\mathrm{E}(X_i) = \\theta$,
<div class="display">$$\\mathrm{E}(\\bar{X}) = \\frac{1}{n}\\sum_{i=1}^{n}\\mathrm{E}(X_i) = \\theta,$$</div>
so $\\bar{X}$ is unbiased. Because $\\mathrm{Var}(X_i) = \\theta$ and the observations are independent,
<div class="display">$$\\mathrm{Var}(\\bar{X}) = \\frac{1}{n^{2}}\\sum_{i=1}^{n}\\mathrm{Var}(X_i) = \\frac{\\theta}{n}.$$</div>`
      },
      {
        l: "b",
        t: `The density is $f(x;\\theta) = (2\\pi\\theta)^{-1/2}\\exp\\{-\\frac{(x-\\theta)^{2}}{2\\theta}\\}$, so for one observation
<div class="display">$$\\log f(x;\\theta) = -\\tfrac{1}{2}\\log(2\\pi) - \\tfrac{1}{2}\\log\\theta - \\frac{(x-\\theta)^{2}}{2\\theta}.$$</div>
Differentiating twice and taking expectations (using $\\mathrm{E}(X-\\theta) = 0$ and $\\mathrm{E}\\{(X-\\theta)^{2}\\} = \\theta$),
<div class="display">$$-\\mathrm{E}\\!\\left(\\frac{\\partial^{2}\\log f}{\\partial\\theta^{2}}\\right) = \\frac{1}{2\\theta^{2}} + \\frac{1}{\\theta} = \\frac{1+2\\theta}{2\\theta^{2}}.$$</div>
Hence the information in the sample is
<div class="display">$$I(\\theta) = \\frac{n(1+2\\theta)}{2\\theta^{2}},$$</div>
and the Cramér–Rao lower bound is
<div class="display">$$\\frac{1}{I(\\theta)} = \\frac{2\\theta^{2}}{n(1+2\\theta)}.$$</div>

Comparing with $\\mathrm{Var}(\\bar{X}) = \\theta/n$:
<div class="display">$$\\frac{\\mathrm{Var}(\\bar{X})}{\\text{CRLB}} = \\frac{\\theta/n}{2\\theta^{2}/\\{n(1+2\\theta)\\}} = \\frac{1+2\\theta}{2\\theta} = 1 + \\frac{1}{2\\theta} > 1$$</div>
for every $\\theta > 0$. So $\\bar{X}$ does <strong>not</strong> attain the bound; there is strictly less efficient unbiased estimation available, and some other unbiased estimator must do better.`
      },
      {
        l: "c",
        t: `Writing $X_i = \\theta + \\varepsilon_i$ with $\\varepsilon_i \\sim \\mathrm{N}(0,\\theta)$, and $\\mathbf{X} = \\mathbf{1}_n$, gives the intercept-only model
<div class="display">$$\\mathbf{X} = \\mathbf{1}_n, \\qquad \\boldsymbol{\\beta} = \\theta, \\qquad \\mathbf{Y} = \\mathbf{1}_n\\theta + \\boldsymbol{\\varepsilon}.$$</div>
The Gauss–Markov theorem then states that the least-squares estimator $\\bar{X} = (\\mathbf{1}_n^{\\top}\\mathbf{1}_n)^{-1}\\mathbf{1}_n^{\\top}\\mathbf{Y}$ is the <em>best linear unbiased estimator</em> (BLUE): among all unbiased estimators that are linear functions of the observations, $\\bar{X}$ has the smallest variance. (Gauss–Markov does not itself require normality, only that the errors are uncorrelated with mean zero and common variance.)`
      },
      {
        l: "d",
        t: `There is no contradiction because the two results refer to different classes of estimators.

<ul>
<li>The <strong>Cramér–Rao bound</strong> applies to <em>all</em> unbiased estimators, linear or not. Since $\\bar{X}$ does not reach the bound, it is not the best unbiased estimator overall.</li>
<li>The <strong>Gauss–Markov theorem</strong> applies only to the smaller class of <em>linear</em> unbiased estimators. Within that class $\\bar{X}$ is optimal, which says nothing about whether a nonlinear unbiased estimator could do better.</li>
</ul>

The two statements are perfectly consistent: $\\bar{X}$ is the best of the linear unbiased estimators, but its variance exceeds the theoretical floor that applies to the wider class of all unbiased estimators. The improvement must therefore come from a nonlinear estimator — and indeed the MLE in part (e) is exactly that.`
      },
      {
        l: "e",
        t: `The log-likelihood is
<div class="display">$$\\ell(\\theta) = -\\frac{n}{2}\\log(2\\pi\\theta) - \\frac{1}{2\\theta}\\sum_{i=1}^{n}(X_i-\\theta)^{2},$$</div>
and setting $\\partial\\ell/\\partial\\theta = 0$ gives (after multiplying through by $2\\theta^{2}$ and using $\\frac{1}{n}\\sum_i (X_i-\\theta)^{2} = \\overline{X^{2}} - 2\\theta\\bar{X} + \\theta^{2}$)
<div class="display">$$\\theta^{2} + \\theta - \\overline{X^{2}} = 0.$$</div>
The positive root is
<div class="display">$$\\hat{\\theta}_{\\text{MLE}} = \\frac{-1 + \\sqrt{1+4\\overline{X^{2}}}}{2},$$</div>
where the negative root is discarded because $\\theta > 0$.

This estimator is <em>not</em> a linear function of the observations: the square root of $\\overline{X^{2}} = \\frac{1}{n}\\sum_i X_i^{2}$ makes it nonlinear in the $X_i$. Consequently it lies outside the class covered by the Gauss–Markov theorem, so Gauss–Markov makes no claim about it and there is no conflict with $\\bar{X}$ being BLUE. Indeed it is this nonlinear estimator that is able to get closer to the Cramér–Rao bound.`
      }
    ]
  }
);
