/* Week 3 — Applied Class */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w03q1",
    week: 3,
    label: "Question 1",
    title: "Maximum likelihood for the geometric distribution",
    difficulty: "Easy",
    exam: "Q1",
    topics: ["mle"],
    hint: {
      text: `Write the likelihood as $p^{n}(1-p)^{S-n}$. The score is $n/p - (S-n)/(1-p)$; to prove it is a global maximum, check the sign of $\\ell'$ either side of the stationary point — and treat $S = n$ on its own.`,
      refs: ["l03", "l04"]
    },
    stem: `The number of trials required to obtain the first success is modelled by the geometric distribution, with pmf
<div class="display">$$f(x;p) = p(1-p)^{x-1}, \\quad x = 1,2,3,\\dots, \\quad p \\in (0,1].$$</div>
Suppose $X_1,\\dots,X_n$ is a random sample from this distribution.`,
    parts: [
      { l: "a", t: `Write down the likelihood function for this model.` },
      { l: "b", t: `Write down the score function.` },
      {
        l: "c",
        t: `Determine the maximum likelihood estimator of $p$. Make sure you demonstrate that you have found the global maximum of the likelihood, including the possibility that the maximum occurs at the boundary $p = 1$.`
      }
    ],
    answer: [
      {
        l: "a",
        t: `Let $S = \\sum_{i=1}^{n} x_i$. Then
<div class="display">$$L(p) = \\prod_{i=1}^{n} p(1-p)^{x_i-1} = p^{n}(1-p)^{S-n}, \\quad 0 < p \\le 1.$$</div>`
      },
      {
        l: "b",
        t: `The log-likelihood is $\\ell(p) = n\\log p + (S-n)\\log(1-p)$. For an interior point $0 < p < 1$, the score function is
<div class="display">$$U(p) = \\ell'(p) = \\frac{n}{p} - \\frac{S-n}{1-p}.$$</div>`
      },
      {
        l: "c",
        t: `First suppose $S > n$. Setting the score to zero gives
<div class="display">$$\\frac{n}{p} = \\frac{S-n}{1-p} \\quad\\Longrightarrow\\quad n(1-p) = p(S-n) \\quad\\Longrightarrow\\quad n = pS,$$</div>
so $\\hat{p} = n/S = 1/\\bar{X}$.

To confirm this is the global maximum, note that $\\ell'(p) = \\frac{n}{p} - \\frac{S-n}{1-p}$ is positive when $p < n/S$ and negative when $p > n/S$. Hence $\\ell$ increases up to $n/S$ and decreases afterwards, so $p = n/S$ is the global maximum.

If $S = n$ then every observation equals one and
<div class="display">$$L(p) = p^{n}, \\quad 0 < p \\le 1,$$</div>
which is maximised at the boundary $p = 1$. The formula $\\hat{p} = n/S$ also returns $\\hat{p} = 1$ in this case. Therefore in all cases
<div class="display">$$\\hat{p} = \\frac{n}{\\sum_{i=1}^{n} X_i} = \\frac{1}{\\bar{X}}.$$</div>`
      }
    ]
  },

  {
    id: "w03q2",
    week: 3,
    label: "Question 2",
    title: "Existence and uniqueness of an MLE on a closed interval",
    difficulty: "Hard",
    exam: "Q1",
    topics: ["mle", "testing"],
    hint: {
      text: `Existence comes from continuity on the closed interval $[-1,1]$. Uniqueness comes from the sign of $U'(\\theta)$. For (d), ask what happens when every observation has the same sign.`,
      refs: ["l03"]
    },
    stem: `Suppose $X_1,\\dots,X_n$ is a random sample from a distribution with probability density function
<div class="display">$$f(x;\\theta) = \\tfrac{1}{2}(1+\\theta x), \\quad x \\in (-1,1), \\quad \\theta \\in [-1,1].$$</div>`,
    parts: [
      { l: "a", t: `Write down the likelihood function for this model.` },
      { l: "b", t: `Write down the score function.` },
      { l: "c", t: `Show that the MLE exists. Also show that, except for a case which occurs with probability zero, the MLE is unique.` },
      { l: "d", t: `Explain why the MLE may occur at the boundary $\\theta = -1$ or $\\theta = 1$.` }
    ],
    answer: [
      {
        l: "a",
        t: `<div class="display">$$L(\\theta) = \\prod_{i=1}^{n} \\tfrac{1}{2}(1+\\theta x_i) = 2^{-n}\\prod_{i=1}^{n}(1+\\theta x_i), \\quad -1 \\le \\theta \\le 1.$$</div>`
      },
      {
        l: "b",
        t: `The log-likelihood is $\\ell(\\theta) = -n\\log 2 + \\sum_{i=1}^{n}\\log(1+\\theta x_i)$, so for $-1 < \\theta < 1$,
<div class="display">$$U(\\theta) = \\ell'(\\theta) = \\sum_{i=1}^{n} \\frac{x_i}{1+\\theta x_i}.$$</div>`
      },
      {
        l: "c",
        t: `<strong>Existence.</strong> Since $x_i \\in (-1,1)$ and $\\theta \\in [-1,1]$, we have $1+\\theta x_i > 0$, so the likelihood is continuous on the closed bounded interval $[-1,1]$. A continuous function on a closed bounded interval attains its maximum, so the MLE exists.

<strong>Uniqueness.</strong> Differentiating the score,
<div class="display">$$U'(\\theta) = -\\sum_{i=1}^{n} \\frac{x_i^{2}}{(1+\\theta x_i)^{2}}.$$</div>
Except in the case $x_1 = \\cdots = x_n = 0$, this is strictly negative, so $U$ is strictly decreasing. Because the observations come from a continuous distribution, the probability that all observations are exactly zero is zero. Hence, except for this probability-zero case, $U$ is strictly decreasing and can cross zero at most once. If it crosses zero there is a unique interior maximiser; if it does not, the maximum is at one of the two endpoints. In either case the MLE is unique.`
      },
      {
        l: "d",
        t: `The largest value of the likelihood over $[-1,1]$ need not occur where the score vanishes. If all $x_i > 0$ then
<div class="display">$$U(\\theta) = \\sum_{i=1}^{n} \\frac{x_i}{1+\\theta x_i} > 0 \\quad \\text{for all } \\theta \\in [-1,1],$$</div>
so $\\ell$ is increasing on the whole interval and $\\hat{\\theta} = 1$. Similarly, if all $x_i < 0$ then $U(\\theta) < 0$ throughout and $\\hat{\\theta} = -1$.`
      }
    ]
  },

  {
    id: "w03q3",
    week: 3,
    label: "Question 3",
    title: "MLE for $U[\\theta, 2\\theta]$: consistency, bias and MSE",
    difficulty: "Hard",
    exam: "Q1",
    topics: ["mle", "estimation", "sampling"],
    hint: {
      text: `The likelihood is an indicator function, not something you can differentiate. Write down where it is non-zero and note that $\\theta^{-n}$ decreases in $\\theta$, so you want the smallest admissible $\\theta$. For (c) use $P(X_{(n)} < c) = \\left(\\frac{c-\\theta}{\\theta}\\right)^{n}$.`,
      refs: ["l03", "l02"]
    },
    stem: `Suppose $X_1,\\dots,X_n$ is a random sample from $U[\\theta, 2\\theta]$, the uniform distribution on $[\\theta, 2\\theta]$, where $\\theta > 0$.`,
    parts: [
      { l: "a", t: `Write down the likelihood function $L(\\theta)$ for this model.` },
      { l: "b", t: `Determine the maximum likelihood estimator. (Remember not every MLE is found by differentiating.)` },
      { l: "c", t: `Show that the MLE is consistent. It may help to recall that if $X_1,\\dots,X_n$ are independent and $Y = \\max\\{X_1,\\dots,X_n\\}$, then $P(Y < c) = \\prod_{i=1}^{n} P(X_i < c)$ for any $c > 0$.` },
      { l: "d", t: `Determine the bias of the MLE. It may help to first find the distribution function of $X_{(n)}$.` },
      { l: "e", t: `Determine the mean squared error of the MLE.` }
    ],
    answer: [
      {
        l: "a",
        t: `Let $x_{(1)} = \\min\\{x_1,\\dots,x_n\\}$ and $x_{(n)} = \\max\\{x_1,\\dots,x_n\\}$. The density of one observation is $f(x;\\theta) = \\theta^{-1} I(\\theta \\le x \\le 2\\theta)$, so
<div class="display">$$L(\\theta) = \\theta^{-n} I\\{\\theta \\le x_{(1)},\\; x_{(n)} \\le 2\\theta\\} = \\theta^{-n} I\\left\\{\\frac{x_{(n)}}{2} \\le \\theta \\le x_{(1)}\\right\\}.$$</div>`
      },
      {
        l: "b",
        t: `The likelihood is nonzero only when $x_{(n)}/2 \\le \\theta \\le x_{(1)}$. On that interval $\\theta^{-n}$ is decreasing in $\\theta$, so the likelihood is maximised by taking the smallest allowable value of $\\theta$:
<div class="display">$$\\hat{\\theta} = \\frac{X_{(n)}}{2}.$$</div>`
      },
      {
        l: "c",
        t: `Since $X_{(n)} \\le 2\\theta$ we have $\\hat{\\theta} \\le \\theta$. For $0 < \\varepsilon < \\theta/2$,
<div class="display">$$P_\\theta(|\\hat{\\theta} - \\theta| > \\varepsilon) = P_\\theta\\!\\left(\\theta - \\frac{X_{(n)}}{2} > \\varepsilon\\right) = P_\\theta(X_{(n)} < 2\\theta - 2\\varepsilon).$$</div>
For $\\theta \\le c \\le 2\\theta$, $P_\\theta(X_i < c) = \\dfrac{c-\\theta}{\\theta}$. Hence with $c = 2\\theta - 2\\varepsilon$,
<div class="display">$$P_\\theta(X_{(n)} < 2\\theta - 2\\varepsilon) = \\left(1 - \\frac{2\\varepsilon}{\\theta}\\right)^{n} \\to 0$$</div>
as $n \\to \\infty$. Therefore $\\hat{\\theta} \\xrightarrow{p} \\theta$ and the MLE is consistent.`
      },
      {
        l: "d",
        t: `For $\\theta \\le y \\le 2\\theta$,
<div class="display">$$P_\\theta(X_{(n)} \\le y) = \\prod_{i=1}^{n} P_\\theta(X_i \\le y) = \\left(\\frac{y-\\theta}{\\theta}\\right)^{n}.$$</div>
Define $W = \\dfrac{X_{(n)} - \\theta}{\\theta}$, so $0 \\le W \\le 1$ and $P(W \\le w) = w^{n}$. Then $W$ has density $n w^{n-1}$ on $(0,1)$ and
<div class="display">$$\\mathrm{E}(W) = \\int_{0}^{1} w\\,n w^{n-1}\\,dw = \\frac{n}{n+1}.$$</div>
Since $X_{(n)} = \\theta(1+W)$,
<div class="display">$$\\mathrm{E}_\\theta(X_{(n)}) = \\theta\\left(1 + \\frac{n}{n+1}\\right) = \\theta\\,\\frac{2n+1}{n+1},$$</div>
so
<div class="display">$$\\mathrm{E}_\\theta(\\hat{\\theta}) = \\tfrac{1}{2}\\mathrm{E}_\\theta(X_{(n)}) = \\theta\\,\\frac{2n+1}{2(n+1)}$$</div>
and
<div class="display">$$\\mathrm{Bias}(\\hat{\\theta}) = \\mathrm{E}_\\theta(\\hat{\\theta}) - \\theta = -\\frac{\\theta}{2(n+1)}.$$</div>
The MLE is biased downward.`
      },
      {
        l: "e",
        t: `Use $\\mathrm{MSE}(\\hat{\\theta}) = \\mathrm{Var}(\\hat{\\theta}) + \\mathrm{Bias}(\\hat{\\theta})^{2}$. From the density of $W$,
<div class="display">$$\\mathrm{E}(W^{2}) = \\int_{0}^{1} w^{2}\\,n w^{n-1}\\,dw = \\frac{n}{n+2},$$</div>
so
<div class="display">$$\\mathrm{Var}(W) = \\frac{n}{n+2} - \\left(\\frac{n}{n+1}\\right)^{2} = \\frac{n}{(n+1)^{2}(n+2)}.$$</div>
Because $X_{(n)} = \\theta(1+W)$,
<div class="display">$$\\mathrm{Var}(X_{(n)}) = \\theta^{2}\\,\\frac{n}{(n+1)^{2}(n+2)} \\quad\\Longrightarrow\\quad \\mathrm{Var}(\\hat{\\theta}) = \\frac{\\theta^{2}\\,n}{4(n+1)^{2}(n+2)}.$$</div>
Also $\\mathrm{Bias}(\\hat{\\theta})^{2} = \\dfrac{\\theta^{2}}{4(n+1)^{2}}$. Hence
<div class="display">$$\\mathrm{MSE}(\\hat{\\theta}) = \\frac{\\theta^{2}\\,n}{4(n+1)^{2}(n+2)} + \\frac{\\theta^{2}}{4(n+1)^{2}} = \\frac{\\theta^{2}}{2(n+1)(n+2)}.$$</div>`
      }
    ]
  },

  {
    id: "w03q4",
    week: 3,
    label: "Question 4",
    title: "Estimating $\\exp(\\mu)$ when $X \\sim \\mathrm{N}(\\mu,1)$",
    difficulty: "Easy",
    exam: "Q1",
    topics: ["mle", "estimation"],
    hint: {
      text: `Invariance gives the MLE of $\\exp(\\mu)$ straight away. To check unbiasedness use the normal mgf with $t = 1$ and the fact that $\\bar{X} \\sim \\mathrm{N}(\\mu, 1/n)$.`,
      refs: ["l03", "l02"]
    },
    stem: `Suppose $X_1,\\dots,X_n$ is a random sample from $\\mathrm{N}(\\mu,1)$.`,
    parts: [
      { l: "a", t: `Determine the MLE of $\\exp(\\mu)$. (You can use what you know about the MLE of $\\mu$.)` },
      { l: "b", t: `Is the MLE of $\\exp(\\mu)$ an unbiased estimator? It may help to recall that the moment generating function of $Y \\sim \\mathrm{N}(\\mu,\\sigma^{2})$ is $M(t) = \\mathrm{E}[e^{tY}] = \\exp(\\mu t + \\tfrac{1}{2}\\sigma^{2}t^{2})$, $t \\in \\mathbb{R}$.` },
      { l: "c", t: `Construct an unbiased estimator of $\\exp(\\mu)$ based on the MLE.` }
    ],
    answer: [
      {
        l: "a",
        t: `The MLE of $\\mu$ is $\\hat{\\mu} = \\bar{X}$. By the invariance property of maximum likelihood estimators, the MLE of $\\exp(\\mu)$ is
<div class="display">$$\\exp(\\bar{X}).$$</div>`
      },
      {
        l: "b",
        t: `Since $X_i \\sim \\mathrm{N}(\\mu,1)$, we have $\\bar{X} \\sim \\mathrm{N}\\!\\left(\\mu, \\tfrac{1}{n}\\right)$. Using the normal moment generating function with $t = 1$,
<div class="display">$$\\mathrm{E}_\\mu[e^{\\bar{X}}] = \\exp\\!\\left(\\mu + \\frac{1}{2n}\\right) \\neq \\exp(\\mu).$$</div>
So $\\exp(\\bar{X})$ is not unbiased for $\\exp(\\mu)$; its bias is
<div class="display">$$\\mathrm{Bias}\\{\\exp(\\bar{X})\\} = \\exp(\\mu)\\left[\\exp\\!\\left(\\frac{1}{2n}\\right) - 1\\right].$$</div>`
      },
      {
        l: "c",
        t: `Since $\\mathrm{E}_\\mu[e^{\\bar{X}}] = \\exp(\\mu)\\exp\\!\\left(\\dfrac{1}{2n}\\right)$, multiplying by $\\exp\\!\\left(-\\dfrac{1}{2n}\\right)$ removes the bias. Thus
<div class="display">$$\\exp\\!\\left(\\bar{X} - \\frac{1}{2n}\\right)$$</div>
is an unbiased estimator of $\\exp(\\mu)$.`
      }
    ]
  },

  {
    id: "w03q5",
    week: 3,
    label: "Question 5",
    title: "Zero-inflated Poisson: log-likelihood and numerical MLE",
    difficulty: "Medium",
    topics: ["mle", "simulation"],
    hint: {
      text: `Split the log-likelihood into the $x_i = 0$ terms and the $x_i > 0$ terms. In part (b), compare $\\hat{\\pi}$ with the observed proportion of zeros — that is the whole point of the model.`,
      refs: ["l03", "l04"]
    },
    stem: `The zero-inflated Poisson distribution has probability mass function
<div class="display">$$f(x;\\pi,\\lambda) = \\begin{cases} \\pi + (1-\\pi)e^{-\\lambda}, &amp; x = 0, \\\\[4pt] (1-\\pi)e^{-\\lambda}\\dfrac{\\lambda^{x}}{x!}, &amp; x = 1,2,\\dots, \\end{cases}$$</div>
where $0 \\le \\pi \\le 1$ and $\\lambda > 0$. It is used to model count data with more zeros than would be expected under the usual Poisson distribution.

The file <code>fish.csv</code> records the number of fish caught by each group visiting a state park. The data contain many zeros, partly because some groups did not fish and partly because some groups fished but caught no fish. There are $n = 250$ groups, the sample mean count is $3.296$, the mean of the squared counts is $145.696$, and $142$ of the $250$ groups caught no fish.`,
    parts: [
      { l: "a", t: `Write down the log-likelihood for this model.` },
      {
        l: "b",
        t: `The following code evaluates the negative log-likelihood and minimises it with <code>optim</code>, starting from the method of moments estimate.
<pre><code>zip_negloglik &lt;- function(theta, data) {
  p      &lt;- theta[1]
  lambda &lt;- theta[2]

  loglik &lt;- rep(0, length(data))
  zeros  &lt;- (data == 0)
  loglik[-zeros] &lt;- log(1 - p) - lambda +
                    data[-zeros]*log(lambda) + lfactorial(data[-zeros])
  loglik[zeros]  &lt;- log(p + (1 - p)*exp(-lambda))
  return(-sum(loglik))
}

# method of moments starting values
m1 &lt;- mean(data)
m2 &lt;- mean(data^2)
lambda_hat &lt;- m2/m1 - 1
pi_hat     &lt;- 1 - m1/lambda_hat
c(pi_hat, lambda_hat)
# [1] 0.9237106 43.2038796

theta_MLE &lt;- optim(c(pi_hat, lambda_hat), zip_negloglik,
                   method = "L-BFGS-B",
                   lower = c(1e-8, 1e-8),
                   upper = c(1 - 1e-8, Inf),
                   data = data)
theta_MLE</code></pre>
The output was
<pre><code>$par
[1] 0.567789 7.625909

$value
[1] -2485.994

$convergence
[1] 0

$message
[1] "CONVERGENCE: REL_REDUCTION_OF_F &lt;= FACTR*EPSMCH"</code></pre>
(i) Write down the maximum likelihood estimates and interpret each one in the context of the data.

(ii) What does the convergence code <code>0</code> tell you?

(iii) The method of moments starting value for $\\lambda$ is $43.2$, yet the MLE is $7.63$. By considering the sample mean and the proportion of zeros, explain why the method of moments estimator performs so poorly here, and why a poor starting value does not prevent <code>optim</code> from locating the maximum.`
      }
    ],
    answer: [
      {
        l: "a",
        t: `Let $x_1,\\dots,x_n$ denote the observed counts. Splitting the observations into zeros and positives,
<div class="display">$$\\begin{aligned}
\\ell(\\pi,\\lambda) = &amp;\\sum_{i:\\,x_i=0} \\log\\{\\pi + (1-\\pi)e^{-\\lambda}\\} \\\\
&amp;+ \\sum_{i:\\,x_i>0} \\left[\\log(1-\\pi) - \\lambda + x_i\\log\\lambda - \\log(x_i!)\\right].
\\end{aligned}$$</div>
The first sum is the contribution from the zero observations, the second from the positive ones.`
      },
      {
        l: "b",
        t: `(i) The maximum likelihood estimates are
<div class="display">$$\\hat{\\pi} = 0.568, \\qquad \\hat{\\lambda} = 7.626.$$</div>
Reading these through the model: about $56.8\\%$ of groups did not fish at all, and among the groups that did fish the mean catch is about $7.6$ fish.

Note that $\\hat{\\pi} = 0.568$ is almost exactly the observed proportion of zeros, $142/250 = 0.568$. That is what the model is built to do: the point mass at zero absorbs the groups that never fished, while the Poisson part describes the positive counts.

(ii) A convergence code of $0$ means <code>optim</code> reported success — no further reduction in the negative log-likelihood was attainable within the numerical tolerance. The reported point is therefore a local minimum of the negative log-likelihood, hence a local maximum of the log-likelihood. A code of $0$ does not by itself prove the maximum is global, but here the log-likelihood is well behaved and the answer is confirmed by starting from different values.

(iii) The method of moments estimator gives
<div class="display">$$\\hat{\\lambda} = \\frac{m_2}{m_1} - 1 = \\frac{145.696}{3.296} - 1 = 43.2,$$</div>
far above the MLE. The reason is the extreme zero-inflation and over-dispersion of these data. With $56.8\\%$ zeros, the raw second moment $m_2$ is inflated by a small number of very large counts, so the moment equations attribute far too much of the spread to $\\lambda$ rather than to $\\pi$. Forcing $m_1 = r(1-p)/p$ and $m_2 = r(1-p)/p^2$ to hold simultaneously then requires an implausibly large $\\lambda$.

Likelihood-based estimation does not suffer from this, because it uses the whole shape of the distribution rather than two summary moments. Once $\\lambda$ is allowed to fall to $7.6$, the fitted zero-inflation probability rises to $0.568$ and the implied mean matches $\\bar{x} = 3.296$.

A poor starting value does not prevent <code>optim</code> from finding the maximum because the algorithm simply follows the gradient of the negative log-likelihood downhill; starting from $\\lambda = 43.2$ the iterates move steadily towards $7.63$ and converge. Starting values matter for reliability only when the objective has several local optima, which is not the case here.`
      }
    ]
  }
);
