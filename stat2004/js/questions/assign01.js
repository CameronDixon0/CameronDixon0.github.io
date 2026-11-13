/* Assignment 1 */
(window.QBANK = window.QBANK || []).push(
  {
    id: "a1q1",
    group: "Assignment 1",
    label: "Question 1",
    source: "assignment",
    title: "The Rayleigh distribution: MLE, bias, MSE and consistency",
    difficulty: "Medium",
    exam: "Q1",
    topics: ["mle", "estimation", "sampling"],
    hint: {
      text: `$\\ell'(\\theta) = -n/\\theta + S/(2\\theta^{2})$ where $S = \\sum x_i^{2}$; rewriting $U(\\theta) = (S-2n\\theta)/(2\\theta^{2})$ shows the sign change. Bias comes from $\\mathrm{E}(X^{2}) = 2\\theta$, and the MSE from $\\mathrm{Var}(X^{2}) = 8\\theta^{2}-(2\\theta)^{2}$.`,
      refs: ["l03", "l02"]
    },
    stem: `The Rayleigh distribution is often used to model non-negative magnitudes, such as wind speeds, wave heights or signal amplitudes. Its probability density function is
<div class="display">$$f(x;\\theta) = \\frac{x}{\\theta}\\exp\\left(-\\frac{x^{2}}{2\\theta}\\right), \\qquad x > 0, \\;\\theta > 0.$$</div>
Let $X_1,\\dots,X_n$ be a random sample from this distribution. It may help to know that
<div class="display">$$\\mathrm{E}_\\theta(X^{2}) = 2\\theta, \\qquad \\mathrm{E}_\\theta(X^{4}) = 8\\theta^{2}.$$</div>`,
    parts: [
      { l: "a", t: `Write down the log-likelihood function for this model.` },
      { l: "b", t: `Write down the score function, that is the derivative of the log-likelihood with respect to $\\theta$.` },
      { l: "c", t: `Determine the maximum likelihood estimator of $\\theta$. Make sure you establish that you have the global maximum of the likelihood.` },
      { l: "d", t: `Determine the bias of the maximum likelihood estimator of $\\theta$.` },
      { l: "e", t: `Determine the mean squared error of the maximum likelihood estimator of $\\theta$.` },
      { l: "f", t: `Is the maximum likelihood estimator of $\\theta$ a consistent estimator? Justify your answer.` }
    ],
    answer: [
      {
        l: "a",
        t: `The likelihood is
<div class="display">$$L(\\theta) = \\prod_{i=1}^{n}\\frac{x_i}{\\theta}\\exp\\left(-\\frac{x_i^{2}}{2\\theta}\\right) = \\left(\\prod_{i=1}^{n} x_i\\right)\\theta^{-n}\\exp\\left(-\\frac{1}{2\\theta}\\sum_{i=1}^{n} x_i^{2}\\right).$$</div>
Hence the log-likelihood is
<div class="display">$$\\ell(\\theta) = \\sum_{i=1}^{n}\\log x_i - n\\log\\theta - \\frac{1}{2\\theta}\\sum_{i=1}^{n} x_i^{2}.$$</div>`
      },
      {
        l: "b",
        t: `Differentiating,
<div class="display">$$U(\\theta) = \\frac{d\\ell(\\theta)}{d\\theta} = -\\frac{n}{\\theta} + \\frac{1}{2\\theta^{2}}\\sum_{i=1}^{n} x_i^{2}.$$</div>`
      },
      {
        l: "c",
        t: `Setting the score equal to zero gives
<div class="display">$$-\\frac{n}{\\theta} + \\frac{1}{2\\theta^{2}}\\sum_{i=1}^{n} x_i^{2} = 0 \\quad\\Longrightarrow\\quad \\hat{\\theta} = \\frac{1}{2n}\\sum_{i=1}^{n} X_i^{2}.$$</div>

To check this is the global maximum, let $S = \\sum_i x_i^{2}$. Then
<div class="display">$$U(\\theta) = \\frac{S - 2n\\theta}{2\\theta^{2}},$$</div>
which is positive for $\\theta < S/(2n)$ and negative for $\\theta > S/(2n)$. Hence $\\ell$ increases up to $S/(2n)$ and decreases afterwards, so $\\hat{\\theta} = S/(2n)$ is the global maximiser.`
      },
      {
        l: "d",
        t: `Since $\\hat{\\theta} = \\frac{1}{2n}\\sum_{i=1}^{n}X_i^{2}$,
<div class="display">$$\\mathrm{E}_\\theta(\\hat{\\theta}) = \\frac{1}{2n}\\sum_{i=1}^{n}\\mathrm{E}_\\theta(X_i^{2}) = \\frac{1}{2n}\\,n(2\\theta) = \\theta.$$</div>
Therefore
<div class="display">$$\\mathrm{Bias}(\\hat{\\theta}) = \\mathrm{E}_\\theta(\\hat{\\theta}) - \\theta = 0,$$</div>
so the MLE is unbiased.`
      },
      {
        l: "e",
        t: `Since $\\hat{\\theta}$ is unbiased, $\\mathrm{MSE}(\\hat{\\theta}) = \\mathrm{Var}(\\hat{\\theta})$. Now
<div class="display">$$\\mathrm{Var}(X^{2}) = \\mathrm{E}_\\theta(X^{4}) - \\{\\mathrm{E}_\\theta(X^{2})\\}^{2} = 8\\theta^{2} - (2\\theta)^{2} = 4\\theta^{2}.$$</div>
Because the $X_i$ are independent,
<div class="display">$$\\mathrm{Var}(\\hat{\\theta}) = \\frac{1}{4n^{2}}\\sum_{i=1}^{n}\\mathrm{Var}(X_i^{2}) = \\frac{1}{4n^{2}}\\,n(4\\theta^{2}) = \\frac{\\theta^{2}}{n}.$$</div>
Thus
<div class="display">$$\\mathrm{MSE}(\\hat{\\theta}) = \\frac{\\theta^{2}}{n}.$$</div>`
      },
      {
        l: "f",
        t: `Yes. Since
<div class="display">$$\\mathrm{MSE}(\\hat{\\theta}) = \\frac{\\theta^{2}}{n} \\to 0 \\quad\\text{as } n \\to \\infty,$$</div>
the mean squared error converges to zero, and an estimator whose MSE tends to zero is consistent. So $\\hat{\\theta} \\xrightarrow{p} \\theta$.`
      }
    ]
  },

  {
    id: "a1q2",
    group: "Assignment 1",
    label: "Question 2",
    source: "assignment",
    title: "The zero-truncated Poisson: existence and uniqueness of the MLE",
    difficulty: "Hard",
    exam: "Q1",
    topics: ["mle", "estimation"],
    hint: {
      text: `The score can be written as $\\frac{n}{\\theta}[\\bar{X}-g(\\theta)]$. To show $g$ is increasing you need $e^{\\theta} > 1+\\theta$. The range of $g$ on $(0,\\infty)$ tells you exactly when the MLE exists.`,
      refs: ["l03"]
    },
    stem: `The zero-truncated Poisson distribution is used to model count data where only positive counts can be observed, or where zero counts are excluded from the sample. Its probability mass function is
<div class="display">$$f(x;\\theta) = \\frac{\\theta^{x}}{x!\\,\\{e^{\\theta} - 1\\}}, \\qquad x \\in \\{1,2,\\dots\\}, \\;\\theta > 0.$$</div>
Let $X_1,\\dots,X_n$ be a random sample from this distribution.`,
    parts: [
      { l: "a", t: `Write down the log-likelihood function for this model.` },
      { l: "b", t: `Write down the score function and show that the maximum likelihood estimator must satisfy $g(\\theta) = \\bar{X}$, where
<div class="display">$$g(\\theta) = \\frac{\\theta}{1 - e^{-\\theta}}$$</div>
and $\\bar{X} = n^{-1}\\sum_{j=1}^{n} X_j$.` },
      { l: "c", t: `Show that $g$ is strictly increasing on $(0,\\infty)$.` },
      { l: "d", t: `When does the maximum likelihood estimator exist?` },
      { l: "e", t: `Assuming the maximum likelihood estimator exists, is it unique? Justify your answer.` }
    ],
    answer: [
      {
        l: "a",
        t: `The likelihood is
<div class="display">$$L(\\theta) = \\prod_{i=1}^{n}\\frac{\\theta^{x_i}}{x_i!\\,(e^{\\theta}-1)} = \\frac{\\theta^{\\sum_i x_i}}{\\left(\\prod_i x_i!\\right)(e^{\\theta}-1)^{n}},$$</div>
so the log-likelihood is
<div class="display">$$\\ell(\\theta) = \\left(\\sum_{i=1}^{n} x_i\\right)\\log\\theta - \\sum_{i=1}^{n}\\log(x_i!) - n\\log(e^{\\theta}-1).$$</div>`
      },
      {
        l: "b",
        t: `Differentiating with respect to $\\theta$,
<div class="display">$$U(\\theta) = \\frac{d\\ell(\\theta)}{d\\theta} = \\frac{\\sum_{i=1}^{n} x_i}{\\theta} - n\\,\\frac{e^{\\theta}}{e^{\\theta}-1}.$$</div>
Since $\\dfrac{e^{\\theta}}{e^{\\theta}-1} = \\dfrac{1}{1-e^{-\\theta}}$, this can be rewritten as
<div class="display">$$U(\\theta) = n\\left[\\frac{\\bar{X}}{\\theta} - \\frac{1}{1-e^{-\\theta}}\\right] = \\frac{n}{\\theta}\\left[\\bar{X} - g(\\theta)\\right].$$</div>
Since $n/\\theta > 0$, setting $U(\\theta) = 0$ is equivalent to $g(\\theta) = \\bar{X}$.`
      },
      {
        l: "c",
        t: `Write $g(\\theta) = \\theta/(1-e^{-\\theta})$. Differentiating,
<div class="display">$$g'(\\theta) = \\frac{(1-e^{-\\theta}) - \\theta e^{-\\theta}}{(1-e^{-\\theta})^{2}}.$$</div>
The denominator is positive for $\\theta > 0$, so it suffices to show the numerator is positive. Write it as
<div class="display">$$1 - (1+\\theta)e^{-\\theta}.$$</div>
Since $e^{\\theta} > 1+\\theta$ for $\\theta > 0$ (from its Taylor series, whose terms beyond the linear one are strictly positive), multiplying by $e^{-\\theta} > 0$ gives $(1+\\theta)e^{-\\theta} < 1$. Hence the numerator is positive and
<div class="display">$$g'(\\theta) > 0 \\quad\\text{for } \\theta > 0,$$</div>
so $g$ is strictly increasing on $(0,\\infty)$.`
      },
      {
        l: "d",
        t: `We need to solve $g(\\theta) = \\bar{X}$ for $\\theta > 0$. The limits of $g$ are
<div class="display">$$\\lim_{\\theta\\to 0^{+}} g(\\theta) = \\lim_{\\theta\\to 0^{+}}\\frac{1}{e^{-\\theta}} = 1 \\quad\\text{(L'Hôpital)}$$</div>
and
<div class="display">$$\\lim_{\\theta\\to\\infty} g(\\theta) = \\infty,$$</div>
since $1-e^{-\\theta} \\to 1$. Because $g$ is strictly increasing and continuous, its range on $(0,\\infty)$ is $(1,\\infty)$. Therefore a finite MLE exists if and only if
<div class="display">$$\\bar{X} > 1.$$</div>
Since each observation is a positive integer, $\\bar{X} = 1$ occurs exactly when every observation equals one, and in that case there is no solution in $(0,\\infty)$.`
      },
      {
        l: "e",
        t: `Yes. If the MLE exists then $\\bar{X} > 1$. Suppose there were two solutions $\\theta_1 \\neq \\theta_2$ of $g(\\theta) = \\bar{X}$, and without loss of generality take $\\theta_1 < \\theta_2$. Since $g$ is strictly increasing, $g(\\theta_1) < g(\\theta_2)$, contradicting $g(\\theta_1) = g(\\theta_2) = \\bar{X}$. Hence the MLE is unique whenever it exists.`
      }
    ]
  },

  {
    id: "a1q3",
    group: "Assignment 1",
    label: "Question 3",
    source: "assignment",
    title: "The Lomax distribution: method of moments and numerical MLE",
    difficulty: "Hard",
    exam: "Q1",
    topics: ["moments", "mle", "estimation"],
    hint: {
      text: `For the method of moments, divide the variance equation by the mean equation. Note $m_2 - m_1^{2} = \\left(\\frac{n-1}{n}\\right)s^{2}$. For (d), read $\\alpha$ as the tail index: it decides which moments even exist.`,
      refs: ["l01", "l02", "l03"]
    },
    stem: `The Lomax distribution is a heavy-tailed distribution often used to model positive-valued data such as insurance losses, lifetimes or waiting times. Its density is
<div class="display">$$f(x;\\boldsymbol{\\theta}) = \\frac{\\alpha}{\\lambda}\\left(1+\\frac{x}{\\lambda}\\right)^{-(\\alpha+1)}, \\qquad x > 0, \\;\\boldsymbol{\\theta} = (\\alpha,\\lambda) \\in (0,\\infty)^{2}.$$</div>
The mean and variance are
<div class="display">$$\\mathrm{E}_{\\boldsymbol{\\theta}}(X) = \\begin{cases}\\dfrac{\\lambda}{\\alpha-1}, &amp; \\alpha > 1, \\\\[6pt] \\infty, &amp; 0 < \\alpha \\le 1,\\end{cases} \\qquad \\mathrm{Var}_{\\boldsymbol{\\theta}}(X) = \\begin{cases}\\dfrac{\\lambda^{2}\\alpha}{(\\alpha-1)^{2}(\\alpha-2)}, &amp; \\alpha > 2, \\\\[6pt] \\infty, &amp; 0 < \\alpha \\le 2.\\end{cases}$$</div>
Let $X_1,\\dots,X_n$ be a random sample from this distribution. The file <code>lomax.csv</code> contains $n = 1000$ observations.`,
    parts: [
      { l: "a", t: `Identify one difficulty with applying the method of moments for this distribution.` },
      { l: "b", t: `Assuming the relevant moments exist and are finite, provide expressions for the method of moments estimator of $\\boldsymbol{\\theta} = (\\alpha,\\lambda)$ in terms of the sample mean and sample variance. You need to identify any condition(s) required for the estimator to give a value in the parameter space $(0,\\infty)^{2}$.` },
      { l: "c", t: `Write down the log-likelihood function for this model.` },
      {
        l: "d",
        t: `For the data in <code>lomax.csv</code> ($n = 1000$) the sample mean is $\\bar{x} = 10.217$ and the sample variance is $s^{2} = 187.03$, so $\\left(\\frac{n-1}{n}\\right)s^{2} = 186.84 > \\bar{x}^{2} = 104.38$ and the method of moments estimates are $\\hat{\\alpha} = 4.5317$, $\\hat{\\lambda} = 36.08$. The negative log-likelihood is then minimised as follows.
<pre><code>negloglik &lt;- function(theta, data) {
  alpha  &lt;- theta[1]
  lambda &lt;- theta[2]
  loglik &lt;- length(data)*log(alpha) - length(data)*log(lambda) -
            (alpha + 1)*sum(log(1 + data/lambda))
  return(-loglik)
}

fit &lt;- optim(par = c(alpha0, lambda0), fn = negloglik,
             method = "L-BFGS-B", lower = c(0, 0), data = data)
fit$par
#    alpha   lambda
# 4.857471 39.30154</code></pre>
Write down the maximum likelihood estimates and interpret them in the context of a heavy-tailed distribution. Why is the estimate of $\\alpha$ important here?`
      }
    ],
    answer: [
      {
        l: "a",
        t: `The required theoretical moments do not always exist. The mean is finite only for $\\alpha > 1$, and the variance only for $\\alpha > 2$. A method of moments estimator that matches the sample mean and variance is therefore only meaningful under the assumption $\\alpha > 2$. In addition, for heavy-tailed data the sample mean — and especially the sample variance — can be very unstable in finite samples, so the moment equations can be badly behaved even when the moments do exist.`
      },
      {
        l: "b",
        t: `Let $m_1 = \\frac{1}{n}\\sum_i X_i = \\bar{X}$ and $m_2 = \\frac{1}{n}\\sum_i X_i^{2}$, so that $m_2 - m_1^{2} = \\left(\\frac{n-1}{n}\\right)s^{2}$. Using $\\mathrm{E}(X^{2}) = \\mathrm{Var}(X) + \\{\\mathrm{E}(X)\\}^{2}$, the moment equations are
<div class="display">$$m_1 = \\frac{\\lambda}{\\alpha-1}, \\qquad m_2 = \\frac{\\lambda^{2}\\alpha}{(\\alpha-1)^{2}(\\alpha-2)} + \\frac{\\lambda^{2}}{(\\alpha-1)^{2}}.$$</div>
The first equation gives $\\lambda = m_1(\\alpha-1)$. Substituting into the second,
<div class="display">$$m_2 - m_1^{2} = \\frac{m_1^{2}(\\alpha-1)^{2}\\alpha}{(\\alpha-1)^{2}(\\alpha-2)} = \\frac{m_1^{2}\\alpha}{\\alpha-2}.$$</div>
Hence $(m_2-m_1^{2})(\\alpha-2) = m_1^{2}\\alpha$, which rearranges to $\\alpha(m_2 - 2m_1^{2}) = 2(m_2-m_1^{2})$, giving
<div class="display">$$\\hat{\\alpha}_{\\text{MoM}} = \\frac{2(m_2-m_1^{2})}{m_2 - 2m_1^{2}} = \\frac{2\\left(\\frac{n-1}{n}\\right)s^{2}}{\\left(\\frac{n-1}{n}\\right)s^{2} - \\bar{X}^{2}}$$</div>
and
<div class="display">$$\\hat{\\lambda}_{\\text{MoM}} = \\bar{X}(\\hat{\\alpha}_{\\text{MoM}}-1) = \\frac{\\bar{X}\\left[\\left(\\frac{n-1}{n}\\right)s^{2} + \\bar{X}^{2}\\right]}{\\left(\\frac{n-1}{n}\\right)s^{2} - \\bar{X}^{2}}.$$</div>
For these to lie in $(0,\\infty)^{2}$ we need $\\left(\\frac{n-1}{n}\\right)s^{2} > \\bar{X}^{2}$, which also guarantees $\\hat{\\alpha} > 2$ and hence that the moments used are finite.`
      },
      {
        l: "c",
        t: `The likelihood is $L(\\alpha,\\lambda) = \\prod_{i=1}^{n}\\frac{\\alpha}{\\lambda}\\left(1+\\frac{x_i}{\\lambda}\\right)^{-(\\alpha+1)}$, so
<div class="display">$$\\ell(\\alpha,\\lambda) = n\\log\\alpha - n\\log\\lambda - (\\alpha+1)\\sum_{i=1}^{n}\\log\\left(1+\\frac{x_i}{\\lambda}\\right),$$</div>
for $\\alpha > 0$ and $\\lambda > 0$.`
      },
      {
        l: "d",
        t: `The maximum likelihood estimates are
<div class="display">$$\\hat{\\alpha} = 4.857, \\qquad \\hat{\\lambda} = 39.30.$$</div>
The estimate $\\hat{\\lambda} = 39.30$ sets the scale of the distribution, while $\\hat{\\alpha} = 4.857$ is the tail index: it controls how quickly the tail decays. Its value matters for two reasons.

First, it determines which moments exist. Here $\\hat{\\alpha} > 2$, so both the mean and the variance are finite (at least according to the fitted model), and the sample variance is a meaningful summary. Had $\\hat{\\alpha}$ fallen below $2$, the variance would be infinite and below $1$ even the mean would be infinite.

Second, smaller $\\alpha$ means a heavier tail. A value around $4.9$ indicates a right-skewed but not extremely heavy-tailed distribution, consistent with a finite fitted mean of
<div class="display">$$\\hat{\\lambda}/(\\hat{\\alpha}-1) = 39.30/3.857 \\approx 10.19,$$</div>
which is close to the sample mean of $10.217$ — a useful check that the fit is sensible.`
      }
    ]
  },

  {
    id: "a1q4",
    group: "Assignment 1",
    label: "Question 4",
    source: "assignment",
    title: "Estimating $p^{2}$ from a Binomial$(2,p)$ sample",
    difficulty: "Medium",
    exam: "Q1",
    topics: ["estimation", "mle"],
    hint: {
      text: `$Y_j$ is Bernoulli$(p^{2})$, so $\\mathrm{E}(Y_j) = p^{2}$. For the MLE use invariance, then $\\mathrm{E}(\\hat{p}^{2}) = \\mathrm{Var}(\\hat{p}) + \\{\\mathrm{E}(\\hat{p})\\}^{2}$ with $\\hat{p} = S/(2n)$.`,
      refs: ["l02", "l03"]
    },
    stem: `Let $X_1,\\dots,X_n$ be a random sample from a $\\mathrm{Binomial}(2,p)$ distribution, where $p \\in [0,1]$. We are interested in estimating $p^{2}$, the probability of two successes from two trials.`,
    parts: [
      {
        l: "a",
        t: `Define random variables $Y_1,\\dots,Y_n$ by
<div class="display">$$Y_j = \\begin{cases}1, &amp; X_j = 2, \\\\ 0, &amp; X_j \\neq 2.\\end{cases}$$</div>
Show that $n^{-1}\\sum_{j=1}^{n} Y_j$ is an unbiased estimator of $p^{2}$.`
      },
      { l: "b", t: `Determine the mean squared error of the estimator in part (a).` },
      { l: "c", t: `It is known that the maximum likelihood estimator of $p$ is $\\hat{p} = \\frac{1}{2n}\\sum_{j=1}^{n} X_j$. Determine the maximum likelihood estimator of $p^{2}$.` },
      { l: "d", t: `Determine the bias of the maximum likelihood estimator of $p^{2}$ from part (c).` },
      {
        l: "e",
        t: `For large $n$, the mean squared error of the maximum likelihood estimator of $p^{2}$ is approximately
<div class="display">$$\\frac{2p^{3}(1-p)}{n}.$$</div>
Using this approximation, compare the mean squared error of the maximum likelihood estimator with that of the estimator in part (a). Which estimator is preferred under this criterion?`
      }
    ],
    answer: [
      {
        l: "a",
        t: `Since $X_j \\sim \\mathrm{Binomial}(2,p)$,
<div class="display">$$P(X_j = 2) = \\binom{2}{2}p^{2}(1-p)^{0} = p^{2},$$</div>
so $Y_j \\sim \\mathrm{Bernoulli}(p^{2})$ and $\\mathrm{E}(Y_j) = p^{2}$. Therefore
<div class="display">$$\\mathrm{E}\\left(\\frac{1}{n}\\sum_{j=1}^{n} Y_j\\right) = \\frac{1}{n}\\sum_{j=1}^{n}\\mathrm{E}(Y_j) = p^{2},$$</div>
so the estimator is unbiased for $p^{2}$.`
      },
      {
        l: "b",
        t: `Since the estimator is unbiased, its MSE equals its variance. Because $Y_j \\sim \\mathrm{Bernoulli}(p^{2})$, we have $\\mathrm{Var}(Y_j) = p^{2}(1-p^{2})$, so
<div class="display">$$\\mathrm{MSE}\\left(\\frac{1}{n}\\sum_{j=1}^{n}Y_j\\right) = \\mathrm{Var}\\left(\\frac{1}{n}\\sum_{j=1}^{n}Y_j\\right) = \\frac{1}{n^{2}}\\,n\\,p^{2}(1-p^{2}) = \\frac{p^{2}(1-p^{2})}{n}.$$</div>`
      },
      {
        l: "c",
        t: `By the invariance property of maximum likelihood estimators, the MLE of $p^{2}$ is obtained by substituting $\\hat{p}$ into $p^{2}$:
<div class="display">$$\\widehat{p^{2}}_{\\text{MLE}} = \\hat{p}^{2} = \\left(\\frac{1}{2n}\\sum_{j=1}^{n} X_j\\right)^{2}.$$</div>`
      },
      {
        l: "d",
        t: `Let $S = \\sum_{j=1}^{n} X_j$. Since each $X_j \\sim \\mathrm{Binomial}(2,p)$, we have $S \\sim \\mathrm{Binomial}(2n,p)$ and $\\hat{p} = S/(2n)$, with
<div class="display">$$\\mathrm{E}(\\hat{p}) = p, \\qquad \\mathrm{Var}(\\hat{p}) = \\frac{p(1-p)}{2n}.$$</div>
Now
<div class="display">$$\\mathrm{E}(\\hat{p}^{2}) = \\mathrm{Var}(\\hat{p}) + \\{\\mathrm{E}(\\hat{p})\\}^{2} = \\frac{p(1-p)}{2n} + p^{2}.$$</div>
Therefore
<div class="display">$$\\mathrm{Bias}(\\hat{p}^{2}) = \\mathrm{E}(\\hat{p}^{2}) - p^{2} = \\frac{p(1-p)}{2n},$$</div>
so the MLE of $p^{2}$ is biased upward.`
      },
      {
        l: "e",
        t: `The ratio of the mean squared errors is
<div class="display">$$\\frac{\\mathrm{MSE}(\\hat{p}^{2})}{\\mathrm{MSE}\\left(n^{-1}\\sum_j Y_j\\right)} \\approx \\frac{2p^{3}(1-p)/n}{p^{2}(1-p^{2})/n} = \\frac{2p^{3}(1-p)}{p^{2}(1-p^{2})}.$$</div>
Since $1-p^{2} = (1-p)(1+p)$, this simplifies to
<div class="display">$$\\frac{2p^{3}(1-p)}{p^{2}(1-p)(1+p)} = \\frac{2p}{1+p}.$$</div>
For $0 < p < 1$ we have $2p < 1+p$, so $2p/(1+p) < 1$ and the MLE has the smaller mean squared error. Under this criterion the maximum likelihood estimator $\\hat{p}^{2}$ is preferred, despite being biased — its variance is small enough to more than compensate for the bias.`
      }
    ]
  },

  {
    id: "a1q5",
    group: "Assignment 1",
    label: "Question 5 (STAT2904)",
    source: "assignment",
    title: "Maximum likelihood for an unknown support set",
    difficulty: "Hard",
    topics: ["mle", "distributions"],
    hint: {
      text: `The likelihood is $|A|^{-n}$ multiplied by an indicator that $B \\subseteq A$, where $B$ is the set of observed values. So maximise over sets containing $B$ — you want $|A|$ as small as possible.`,
      refs: ["l03"]
    },
    stem: `Let $m$ be known and suppose $A$ is an unknown non-empty subset of $\\{1,\\dots,m\\}$. Let $X_1,\\dots,X_n$ be independent random variables with
<div class="display">$$P_A(X = x) = \\begin{cases}1/|A|, &amp; x \\in A, \\\\ 0, &amp; x \\notin A.\\end{cases}$$</div>`,
    parts: [
      { l: "a", t: `Write down the likelihood function for $A$.` },
      { l: "b", t: `Find the maximum likelihood estimator of $A$.` },
      { l: "c", t: `Let $K = |A|$. Use the invariance property to find the maximum likelihood estimator of $K$.` },
      { l: "d", t: `Is the maximum likelihood estimator of $K$ biased? Justify your answer.` },
      { l: "e", t: `Is the maximum likelihood estimator of $A$ consistent as $n \\to \\infty$, with $m$ and $A$ fixed? Justify your answer.` }
    ],
    answer: [
      {
        l: "a",
        t: `Let $B = \\{x_1,\\dots,x_n\\}$ denote the set of distinct observed values. The joint probability of the sample is
<div class="display">$$L(A) = \\prod_{i=1}^{n} P_A(X_i = x_i).$$</div>
If every observed value lies in $A$ then each factor is $1/|A|$; if at least one observed value is outside $A$ then the likelihood is zero. Therefore
<div class="display">$$L(A) = |A|^{-n}\\,I(B \\subseteq A),$$</div>
where $A$ ranges over non-empty subsets of $\\{1,\\dots,m\\}$.`
      },
      {
        l: "b",
        t: `The likelihood is positive only when $B \\subseteq A$. Among all such subsets, $L(A) = |A|^{-n}$, which is maximised by making $|A|$ as small as possible. The smallest subset containing all observed values is $B$ itself, so
<div class="display">$$\\hat{A} = B = \\{X_1,\\dots,X_n\\},$$</div>
that is, the MLE of $A$ is the set of distinct observed values.`
      },
      {
        l: "c",
        t: `By the invariance property, the MLE of $K = |A|$ is $\\hat{K} = |\\hat{A}|$, i.e.
<div class="display">$$\\hat{K} = \\left|\\{X_1,\\dots,X_n\\}\\right|,$$</div>
the number of distinct values observed in the sample.`
      },
      {
        l: "d",
        t: `Yes, except in the trivial case $K = 1$. For each $a \\in A$ define $I_a = I\\{a \\text{ is observed at least once}\\}$, so that $\\hat{K} = \\sum_{a \\in A} I_a$. For a fixed $a \\in A$, the probability it is never observed in $n$ draws is $(1 - 1/K)^{n}$, hence
<div class="display">$$\\mathrm{E}(I_a) = P(a \\text{ is observed at least once}) = 1 - \\left(1-\\frac{1}{K}\\right)^{n}.$$</div>
Therefore
<div class="display">$$\\mathrm{E}(\\hat{K}) = K\\left[1 - \\left(1-\\frac{1}{K}\\right)^{n}\\right],$$</div>
and
<div class="display">$$\\mathrm{Bias}(\\hat{K}) = \\mathrm{E}(\\hat{K}) - K = -K\\left(1-\\frac{1}{K}\\right)^{n}.$$</div>
This is negative whenever $K > 1$, so $\\hat{K}$ is biased downward: some elements of $A$ may simply never appear in the sample.`
      },
      {
        l: "e",
        t: `Yes. The estimator equals $A$ exactly when every element of $A$ has been observed at least once. Let $K = |A|$. By the union bound,
<div class="display">$$P(\\hat{A} \\neq A) = P\\left(\\bigcup_{a \\in A}\\{a \\text{ not sampled in } n \\text{ draws}\\}\\right) \\le \\sum_{a\\in A}\\left(1-\\frac{1}{K}\\right)^{n} = K\\left(1-\\frac{1}{K}\\right)^{n}.$$</div>
Since $K$ is fixed and $(1-1/K)^{n} \\to 0$ as $n\\to\\infty$ (as $K \\ge 1$), the bound tends to zero. Hence $P(\\hat{A} \\neq A) \\to 0$, i.e. $P(\\hat{A} = A) \\to 1$, and $\\hat{A}$ is consistent for $A$.`
      }
    ]
  }
);
