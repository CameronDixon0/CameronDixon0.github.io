/* Week 4 — Applied Class */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w04q1",
    week: 4,
    label: "Question 1",
    title: "Information and asymptotics for the geometric MLE",
    difficulty: "Medium",
    topics: ["info", "mle", "estimation"],
    stem: `The number of trials required to obtain the first success is modelled by the geometric distribution, with pmf
<div class="display">$$f(x;p) = p(1-p)^{x-1}, \\quad x = 1,2,3,\\dots, \\quad p \\in (0,1].$$</div>
It can be shown that if $X \\sim \\mathrm{Geometric}(p)$ then $\\mathrm{E}_p(X) = p^{-1}$ and $\\mathrm{Var}_p(X) = p^{-2}(1-p)$. Suppose $X_1,\\dots,X_n$ is a random sample from this distribution, and let $p_0$ denote the true value of the parameter.`,
    parts: [
      { l: "a", t: `Determine the expected information and observed information.` },
      { l: "b", t: `Suppose $p_0 \\in (0,1)$. State the asymptotic distribution of $\\sqrt{n}(\\hat{p} - p_0)$, where $\\hat{p}$ is the MLE.` },
      { l: "c", t: `What is the distribution of $\\hat{p}$ when $p_0 = 1$? Explain why this is not described by the usual asymptotic normality result.` },
      { l: "d", t: `Suppose you want to estimate the mean of the distribution, which is $p^{-1}$. Does the MLE of $p^{-1}$ achieve the Cramér–Rao lower bound?` }
    ],
    answer: [
      {
        l: "a",
        t: `The likelihood is $L(p) = p^{n}(1-p)^{\\sum_i x_i - n}$, so
<div class="display">$$\\ell(p) = n\\log p + \\left(\\sum_i x_i - n\\right)\\log(1-p)$$</div>
and
<div class="display">$$\\begin{aligned}
U(p) &amp;= \\ell'(p) = \\frac{n}{p} - \\frac{\\sum_i x_i - n}{1-p}, \\\\
\\ell''(p) &amp;= -\\frac{n}{p^{2}} - \\frac{\\sum_i x_i - n}{(1-p)^{2}}.
\\end{aligned}$$</div>
Hence the observed information is
<div class="display">$$J(p) = -\\ell''(p) = \\frac{n}{p^{2}} + \\frac{\\sum_i x_i - n}{(1-p)^{2}}.$$</div>
Taking expectations and using $\\mathrm{E}_p\\!\\left(\\sum_i X_i\\right) = n/p$,
<div class="display">$$I(p) = \\mathrm{E}_p[J(p)] = \\frac{n}{p^{2}} + \\frac{n/p - n}{(1-p)^{2}} = \\frac{n}{p^{2}(1-p)}.$$</div>`
      },
      {
        l: "b",
        t: `The MLE is $\\hat{p} = n/\\sum_i X_i = 1/\\bar{X}$. For $p_0 \\in (0,1)$ the usual MLE asymptotic normality result gives
<div class="display">$$\\sqrt{n}(\\hat{p} - p_0) \\xrightarrow{d} \\mathrm{N}\\!\\left(0, \\frac{1}{i(p_0)}\\right),$$</div>
where $i(p_0) = \\dfrac{1}{p_0^{2}(1-p_0)}$ is the expected information for a single observation (since $I(p) = n\\,i(p)$). Therefore
<div class="display">$$\\sqrt{n}(\\hat{p} - p_0) \\xrightarrow{d} \\mathrm{N}\\!\\left(0,\\; p_0^{2}(1-p_0)\\right).$$</div>`
      },
      {
        l: "c",
        t: `If $p_0 = 1$ then $P_{p_0}(X_i = 1) = 1$ for every $i$, so $X_1 = \\cdots = X_n = 1$ with probability one and
<div class="display">$$\\hat{p} = \\frac{n}{\\sum_i X_i} = 1$$</div>
with probability one. Thus $\\hat{p}$ has a degenerate distribution concentrated at $1$. The standard asymptotic normality theorem requires the true parameter to be an interior point of the parameter space; here $p_0 = 1$ lies on the boundary, so the regularity conditions fail.`
      },
      {
        l: "d",
        t: `Let $g(p) = 1/p$. By equivariance the MLE of $1/p$ is $1/\\hat{p} = \\bar{X}$, and since $\\mathrm{E}_p(X) = 1/p$, $\\bar{X}$ is unbiased for $1/p$. Its variance is
<div class="display">$$\\mathrm{Var}_p(\\bar{X}) = n^{-1}\\mathrm{Var}_p(X) = \\frac{1-p}{np^{2}}.$$</div>
Since $g'(p) = -1/p^{2}$, the Cramér–Rao lower bound is
<div class="display">$$\\frac{(g'(p))^{2}}{I(p)} = \\frac{1/p^{4}}{n/\\{p^{2}(1-p)\\}} = \\frac{1-p}{np^{2}},$$</div>
which equals $\\mathrm{Var}_p(\\bar{X})$ exactly. So yes — the MLE of $p^{-1}$ attains the Cramér–Rao lower bound.`
      }
    ]
  },

  {
    id: "w04q2",
    week: 4,
    label: "Question 2",
    title: "Observed information and boundary asymptotics",
    difficulty: "Medium",
    topics: ["info", "mle"],
    stem: `Suppose $X_1,\\dots,X_n$ is a random sample from a distribution with probability density function
<div class="display">$$f(x;\\theta) = \\tfrac{1}{2}(1+\\theta x), \\quad x \\in (-1,1), \\quad \\theta \\in [-1,1].$$</div>
Let $\\theta_0$ denote the true value of the parameter.`,
    parts: [
      { l: "a", t: `Determine the observed information.` },
      { l: "b", t: `Suppose $\\theta_0 = 0$. Determine the expected information and state the asymptotic distribution of $\\sqrt{n}(\\hat{\\theta} - \\theta_0)$, where $\\hat{\\theta}$ is the MLE.` },
      { l: "c", t: `Suppose $\\theta_0 = -1$. Explain why the usual asymptotic normality result cannot hold for $\\sqrt{n}(\\hat{\\theta} - \\theta_0)$.` }
    ],
    answer: [
      {
        l: "a",
        t: `We have $\\ell(\\theta) = -n\\log 2 + \\sum_{i=1}^{n}\\log(1+\\theta x_i)$ and
<div class="display">$$U(\\theta) = \\ell'(\\theta) = \\sum_{i=1}^{n} \\frac{x_i}{1+\\theta x_i}, \\qquad \\ell''(\\theta) = -\\sum_{i=1}^{n} \\frac{x_i^{2}}{(1+\\theta x_i)^{2}}.$$</div>
Hence the observed information is
<div class="display">$$J(\\theta) = -\\ell''(\\theta) = \\sum_{i=1}^{n} \\frac{x_i^{2}}{(1+\\theta x_i)^{2}}.$$</div>`
      },
      {
        l: "b",
        t: `<div class="display">$$I(\\theta) = \\mathrm{E}_\\theta[J(\\theta)] = \\sum_{i=1}^{n} \\mathrm{E}_\\theta\\!\\left[\\frac{X_i^{2}}{(1+\\theta X_i)^{2}}\\right] = n\\,\\mathrm{E}_\\theta\\!\\left[\\frac{X^{2}}{(1+\\theta X)^{2}}\\right].$$</div>
When $\\theta = 0$ the density is $f(x;0) = \\tfrac{1}{2}$ on $(-1,1)$, so
<div class="display">$$I(0) = n\\cdot\\frac{1}{2}\\int_{-1}^{1} x^{2}\\,dx = \\frac{n}{3}.$$</div>
The usual asymptotic normality result then gives
<div class="display">$$\\sqrt{n}(\\hat{\\theta} - 0) \\xrightarrow{d} \\mathrm{N}\\!\\left(0, \\frac{1}{i(0)}\\right) = \\mathrm{N}(0, 3),$$</div>
since $i(0) = 1/3$ is the information for one observation.`
      },
      {
        l: "c",
        t: `Because the parameter space is $[-1,1]$, the MLE must satisfy $-1 \\le \\hat{\\theta} \\le 1$. If $\\theta_0 = -1$ then
<div class="display">$$\\sqrt{n}(\\hat{\\theta} - \\theta_0) = \\sqrt{n}(\\hat{\\theta} + 1) \\ge 0$$</div>
with probability one. A non-degenerate normal random variable cannot be non-negative with probability one, so the centred asymptotic normality result cannot hold at the boundary point $\\theta_0 = -1$.`
      }
    ]
  },

  {
    id: "w04q3",
    week: 4,
    label: "Question 3",
    title: "A constrained multinomial model for plant cells",
    difficulty: "Hard",
    topics: ["mle", "tables", "info"],
    stem: `Recall that if $(N_0, N_1, \\dots, N_k)$ has a multinomial distribution with cell probabilities $(\\pi_0, \\dots, \\pi_k)$ and total count $n$, then
<div class="display">$$P(N_0 = n_0, \\dots, N_k = n_k) = \\frac{n!}{n_0!\\cdots n_k!}\\,\\pi_0^{n_0}\\cdots\\pi_k^{n_k},$$</div>
where $\\sum_i n_i = n$ and $\\sum_i \\pi_i = 1$.

A certain type of plant cell is classified into four versions. A simple one-parameter model motivated by genetic considerations assigns the probabilities
<div class="display">$$\\frac{2+\\theta}{4}, \\quad \\frac{1-\\theta}{4}, \\quad \\frac{1-\\theta}{4}, \\quad \\frac{\\theta}{4},$$</div>
where $\\theta \\in (0,1)$ is unknown. Suppose a sample of $n$ cells has observed frequencies $(n_0, n_1, n_2, n_3)$ with $n = n_0 + n_1 + n_2 + n_3$.`,
    parts: [
      { l: "a", t: `Show that, up to a multiplicative constant not depending on $\\theta$, the likelihood depends on $n_1$ and $n_2$ only through $n_1 + n_2$.` },
      { l: "b", t: `Does the MLE exist when $n_1 + n_2 = 0$? Justify your answer. Identify the necessary and sufficient conditions for the MLE to exist.` },
      { l: "c", t: `Determine an expression for the MLE of $\\theta$ assuming it exists.` },
      { l: "d", t: `Determine the asymptotic variance of $\\hat{\\theta}$.` }
    ],
    answer: [
      {
        l: "a",
        t: `<div class="display">$$\\begin{aligned}
L(\\theta) &amp;= \\frac{n!}{n_0!\\,n_1!\\,n_2!\\,n_3!}\\left(\\frac{2+\\theta}{4}\\right)^{n_0}\\left(\\frac{1-\\theta}{4}\\right)^{n_1}\\left(\\frac{1-\\theta}{4}\\right)^{n_2}\\left(\\frac{\\theta}{4}\\right)^{n_3} \\\\
&amp;= \\frac{n!}{n_0!\\,n_1!\\,n_2!\\,n_3!}\\left(\\frac{2+\\theta}{4}\\right)^{n_0}\\left(\\frac{1-\\theta}{4}\\right)^{n_1+n_2}\\left(\\frac{\\theta}{4}\\right)^{n_3}.
\\end{aligned}$$</div>
So, up to a constant, the likelihood depends on $n_1$ and $n_2$ only through their sum.`
      },
      {
        l: "b",
        t: `Let $m = n_1 + n_2$. Ignoring constants, the log-likelihood is
<div class="display">$$\\ell(\\theta) = n_0\\log(2+\\theta) + m\\log(1-\\theta) + n_3\\log\\theta, \\quad 0 < \\theta < 1.$$</div>
If $m = 0$ then $\\ell(\\theta) = n_0\\log(2+\\theta) + n_3\\log\\theta$, which is increasing on $(0,1)$. Its supremum is approached as $\\theta \\uparrow 1$, but $\\theta = 1$ is not in the parameter space, so <strong>the MLE does not exist when $m = 0$</strong>.

In general
<div class="display">$$\\ell'(\\theta) = \\frac{n_0}{2+\\theta} - \\frac{m}{1-\\theta} + \\frac{n_3}{\\theta}, \\qquad \\ell''(\\theta) = -\\frac{n_0}{(2+\\theta)^{2}} - \\frac{m}{(1-\\theta)^{2}} - \\frac{n_3}{\\theta^{2}} \\le 0,$$</div>
so $\\ell'$ is decreasing.

If $m > 0$ and $n_3 > 0$ then $\\ell'(\\theta) \\to +\\infty$ as $\\theta \\downarrow 0$ and $\\ell'(\\theta) \\to -\\infty$ as $\\theta \\uparrow 1$, so a root exists and is unique.

If $m > 0$ and $n_3 = 0$ then $\\ell'(\\theta) = 0$ has a solution in $(0,1)$ if and only if $\\ell'(0^{+}) = \\tfrac{n_0}{2} - m > 0$, i.e. $n_0 > 2m$. Otherwise the supremum is approached as $\\theta \\downarrow 0$, outside the open parameter space.

So the MLE exists if and only if
<div class="display">$$m > 0 \\;\\text{ and }\\; (n_3 > 0 \\;\\text{ or }\\; n_0 > 2m).$$</div>`
      },
      {
        l: "c",
        t: `With $m = n_1 + n_2$, setting the score to zero gives $\\dfrac{n_0}{2+\\theta} - \\dfrac{m}{1-\\theta} + \\dfrac{n_3}{\\theta} = 0$. Multiplying by $\\theta(1-\\theta)(2+\\theta)$ and simplifying,
<div class="display">$$n\\theta^{2} + (n_3 + 2m - n_0)\\theta - 2n_3 = 0.$$</div>
The root in $(0,1)$, when it exists, is
<div class="display">$$\\hat{\\theta} = \\frac{n_0 - n_3 - 2m + \\sqrt{(n_3 + 2m - n_0)^{2} + 8n\\,n_3}}{2n},$$</div>
that is, with $m = n_1 + n_2$,
<div class="display">$$\\hat{\\theta} = \\frac{n_0 - n_3 - 2(n_1+n_2) + \\sqrt{\\{n_3 + 2(n_1+n_2) - n_0\\}^{2} + 8n\\,n_3}}{2n}.$$</div>`
      },
      {
        l: "d",
        t: `From part (b) the observed information is
<div class="display">$$J(\\theta) = \\frac{n_0}{(2+\\theta)^{2}} + \\frac{n_1+n_2}{(1-\\theta)^{2}} + \\frac{n_3}{\\theta^{2}}.$$</div>
Since $\\mathrm{E}_\\theta(N_0) = \\dfrac{n(2+\\theta)}{4}$, $\\mathrm{E}_\\theta(N_1+N_2) = \\dfrac{n(1-\\theta)}{2}$ and $\\mathrm{E}_\\theta(N_3) = \\dfrac{n\\theta}{4}$,
<div class="display">$$I(\\theta) = \\mathrm{E}_\\theta[J(\\theta)] = \\frac{n}{4}\\left(\\frac{1}{2+\\theta} + \\frac{2}{1-\\theta} + \\frac{1}{\\theta}\\right) = \\frac{n(1+2\\theta)}{2\\theta(1-\\theta)(2+\\theta)}.$$</div>
Therefore
<div class="display">$$\\sqrt{n}(\\hat{\\theta} - \\theta_0) \\xrightarrow{d} \\mathrm{N}\\!\\left(0, \\frac{1}{i(\\theta_0)}\\right), \\qquad \\frac{1}{i(\\theta)} = \\frac{2\\theta(1-\\theta)(2+\\theta)}{1+2\\theta},$$</div>
so the asymptotic variance of $\\hat{\\theta}$ is $\\dfrac{2\\theta(1-\\theta)(2+\\theta)}{n(1+2\\theta)}$.`
      }
    ]
  },

  {
    id: "w04q4",
    week: 4,
    label: "Question 4",
    title: "Standard errors for the zero-inflated Poisson MLE",
    difficulty: "Easy",
    topics: ["info", "mle", "simulation"],
    stem: `In the Week 3 applied class we used R to find the maximum likelihood estimator of the zero-inflated Poisson distribution, with probability mass function
<div class="display">$$f(x;\\pi,\\lambda) = \\begin{cases} \\pi + (1-\\pi)e^{-\\lambda}, &amp; x = 0, \\\\[4pt] (1-\\pi)e^{-\\lambda}\\dfrac{\\lambda^{x}}{x!}, &amp; x = 1,2,\\dots, \\end{cases}$$</div>
where $0 \\le \\pi \\le 1$ and $\\lambda > 0$.`,
    parts: [
      { l: "a", t: `The following code fits the model with <code>hessian = TRUE</code> and extracts the covariance matrix of the estimates.
<pre><code>theta_MLE &lt;- optim(c(pi_hat, lambda_hat), zip_negloglik,
                   method = "L-BFGS-B",
                   lower = c(1e-8, 1e-8),
                   upper = c(1 - 1e-8, Inf),
                   data = data,
                   hessian = TRUE)
theta_MLE$par
theta_MLE$hessian
solve(theta_MLE$hessian)</code></pre>
The output was
<pre><code>&gt; theta_MLE$par
[1] 0.567789 7.625909

&gt; theta_MLE$hessian
            [,1]        [,2]
[1,] 1017.8597443 -0.2146353
[2,]   -0.2146353 14.1164838

&gt; solve(theta_MLE$hessian)
              [,1]         [,2]
[1,]  9.824568e-04 1.493785e-05
[2,]  1.493785e-05 7.083940e-02</code></pre>
(i) Explain what the Hessian returned by <code>optim</code> estimates, and hence identify the observed information matrix at the MLE.

(ii) Obtain the standard errors of $\\hat{\\pi}$ and $\\hat{\\lambda}$.

(iii) Give a $95\\%$ Wald confidence interval for $\\lambda$ and interpret it.` }
    ],
    answer: [
      {
        l: "a",
        t: `(i) Because <code>optim</code> minimises the negative log-likelihood, the Hessian it returns is the matrix of second derivatives of $-\\ell$, i.e. it estimates the <em>observed information</em> at the MLE:
<div class="display">$$J(\\hat{\\theta}) = -\\frac{\\partial^{2}\\ell}{\\partial\\theta\\,\\partial\\theta^{\\top}} = \\begin{pmatrix} 1017.86 &amp; -0.215 \\\\ -0.215 &amp; 14.116 \\end{pmatrix}.$$</div>
Inverting gives the asymptotic covariance matrix of the MLE, whose diagonal entries are the estimated variances:
<div class="display">$$J(\\hat{\\theta})^{-1} = \\begin{pmatrix} 9.825\\times10^{-4} &amp; 1.494\\times10^{-5} \\\\ 1.494\\times10^{-5} &amp; 7.084\\times10^{-2} \\end{pmatrix}.$$</div>

(ii) Taking square roots of the diagonal entries,
<div class="display">$$\\widehat{\\mathrm{se}}(\\hat{\\pi}) = \\sqrt{9.825\\times10^{-4}} = 0.0313, \\qquad \\widehat{\\mathrm{se}}(\\hat{\\lambda}) = \\sqrt{7.084\\times10^{-2}} = 0.2662.$$</div>

(iii) A $95\\%$ Wald interval for $\\lambda$ is
<div class="display">$$\\hat{\\lambda} \\pm 1.96\\,\\widehat{\\mathrm{se}}(\\hat{\\lambda}) = 7.626 \\pm 1.96(0.2662) = (7.104,\\; 8.148).$$</div>
We can be $95\\%$ confident that, among the groups that did fish, the mean catch lies between about $7.1$ and $8.1$ fish.

Note that the off-diagonal entry of the covariance matrix is tiny relative to the diagonal entries: the estimated correlation between $\\hat{\\pi}$ and $\\hat{\\lambda}$ is
<div class="display">$$\\frac{1.494\\times10^{-5}}{0.0313 \\times 0.2662} \\approx 0.0018,$$</div>
so the two estimates are essentially uncorrelated in this sample. Both estimates are many standard errors from zero ($z \\approx 18.1$ for $\\pi$ and $z \\approx 28.7$ for $\\lambda$), so both parameters are clearly needed.`

      }
    ]
  },

  {
    id: "w04q5",
    week: 4,
    label: "Question 5",
    title: "The inverse Gaussian: score, MLE and information",
    difficulty: "Hard",
    topics: ["mle", "info"],
    stem: `The inverse Gaussian distribution is often used to model positive, right-skewed waiting times. Let $X_1,\\dots,X_n$ be a random sample from an inverse Gaussian distribution with density
<div class="display">$$f(x;\\mu,\\lambda) = \\left(\\frac{\\lambda}{2\\pi x^{3}}\\right)^{1/2}\\exp\\left\\{-\\frac{\\lambda(x-\\mu)^{2}}{2\\mu^{2}x}\\right\\}, \\quad x > 0,$$</div>
where $\\mu > 0$ and $\\lambda > 0$. For this parametrisation, $\\mathrm{E}(X) = \\mu$ and $\\mathrm{Var}(X) = \\dfrac{\\mu^{3}}{\\lambda}$.`,
    parts: [
      { l: "a", t: `Determine the score function for $\\theta = (\\mu,\\lambda)$.` },
      { l: "b", t: `Determine the maximum likelihood estimator of $\\theta$.` },
      { l: "c", t: `Show that the expected information matrix is
<div class="display">$$I(\\theta) = \\begin{pmatrix} \\dfrac{n\\lambda}{\\mu^{3}} &amp; 0 \\\\[6pt] 0 &amp; \\dfrac{n}{2\\lambda^{2}} \\end{pmatrix}.$$</div>` },
      { l: "d", t: `What does it imply, asymptotically, that the expected information matrix is diagonal?` }
    ],
    answer: [
      {
        l: "a",
        t: `The log-likelihood is
<div class="display">$$\\ell(\\theta) = \\frac{n}{2}\\log\\lambda - \\frac{n}{2}\\log(2\\pi) - \\frac{3}{2}\\sum_{i=1}^{n}\\log x_i - \\frac{\\lambda}{2}\\sum_{i=1}^{n}\\frac{(x_i-\\mu)^{2}}{\\mu^{2}x_i}.$$</div>
Since $\\dfrac{(x_i-\\mu)^{2}}{\\mu^{2}x_i} = \\dfrac{x_i}{\\mu^{2}} - \\dfrac{2}{\\mu} + \\dfrac{1}{x_i}$,
<div class="display">$$\\frac{\\partial}{\\partial\\mu}\\left\\{\\frac{(x_i-\\mu)^{2}}{\\mu^{2}x_i}\\right\\} = -\\frac{2x_i}{\\mu^{3}} + \\frac{2}{\\mu^{2}}.$$</div>
Therefore
<div class="display">$$U_\\mu(\\mu,\\lambda) = \\frac{\\partial\\ell}{\\partial\\mu} = \\frac{\\lambda}{\\mu^{3}}\\sum_{i=1}^{n}(x_i-\\mu),$$</div>
and
<div class="display">$$U_\\lambda(\\mu,\\lambda) = \\frac{\\partial\\ell}{\\partial\\lambda} = \\frac{n}{2\\lambda} - \\frac{1}{2}\\sum_{i=1}^{n}\\frac{(x_i-\\mu)^{2}}{\\mu^{2}x_i}.$$</div>`
      },
      {
        l: "b",
        t: `Setting $U_\\mu = 0$ gives $\\sum_{i=1}^{n}(x_i-\\mu) = 0$, so $\\hat{\\mu} = \\bar{x}$. Setting $U_\\lambda = 0$ with $\\mu = \\hat{\\mu}$ gives
<div class="display">$$\\frac{n}{2\\lambda} = \\frac{1}{2}\\sum_{i=1}^{n}\\frac{(x_i-\\hat{\\mu})^{2}}{\\hat{\\mu}^{2}x_i},$$</div>
so the joint MLE is
<div class="display">$$\\hat{\\mu} = \\bar{x}, \\qquad \\hat{\\lambda} = \\frac{n}{\\sum_{i=1}^{n}\\dfrac{(x_i-\\bar{x})^{2}}{\\bar{x}^{2}x_i}} = \\frac{n}{\\sum_{i=1}^{n}\\dfrac{1}{x_i} - \\dfrac{n}{\\bar{x}}}.$$</div>`
      },
      {
        l: "c",
        t: `From part (a), $U_\\mu = \\dfrac{\\lambda}{\\mu^{3}}\\left(\\sum_i x_i - n\\mu\\right)$. Differentiating with respect to $\\mu$,
<div class="display">$$\\frac{\\partial^{2}\\ell}{\\partial\\mu^{2}} = \\lambda\\left(-\\frac{3}{\\mu^{4}}\\sum_i x_i + \\frac{2n}{\\mu^{3}}\\right),$$</div>
and since $\\mathrm{E}(X_i) = \\mu$,
<div class="display">$$-\\mathrm{E}_\\theta\\!\\left(\\frac{\\partial^{2}\\ell}{\\partial\\mu^{2}}\\right) = \\lambda\\left(\\frac{3}{\\mu^{4}}(n\\mu) - \\frac{2n}{\\mu^{3}}\\right) = \\frac{n\\lambda}{\\mu^{3}}.$$</div>
Next, $\\dfrac{\\partial^{2}\\ell}{\\partial\\lambda^{2}} = -\\dfrac{n}{2\\lambda^{2}}$, so
<div class="display">$$-\\mathrm{E}_\\theta\\!\\left(\\frac{\\partial^{2}\\ell}{\\partial\\lambda^{2}}\\right) = \\frac{n}{2\\lambda^{2}}.$$</div>
Finally,
<div class="display">$$\\frac{\\partial^{2}\\ell}{\\partial\\lambda\\,\\partial\\mu} = \\frac{1}{\\mu^{3}}\\sum_i (x_i-\\mu),$$</div>
whose expectation is zero. Therefore
<div class="display">$$I(\\theta) = \\begin{pmatrix} \\dfrac{n\\lambda}{\\mu^{3}} &amp; 0 \\\\[6pt] 0 &amp; \\dfrac{n}{2\\lambda^{2}} \\end{pmatrix}.$$</div>`
      },
      {
        l: "d",
        t: `The usual asymptotic normality result says
<div class="display">$$\\sqrt{n}\\,(\\hat{\\theta} - \\theta) \\xrightarrow{d} \\mathrm{N}\\left(\\mathbf{0},\\; i(\\theta)^{-1}\\right).$$</div>
Since the expected information matrix is diagonal, so is its inverse, and hence the limiting covariance between $\\hat{\\mu}$ and $\\hat{\\lambda}$ is zero. Asymptotically the two MLEs are therefore uncorrelated, and because the limiting distribution is joint normal, they are also asymptotically independent. This does not mean $\\hat{\\mu}$ and $\\hat{\\lambda}$ are independent in finite samples.`
      }
    ]
  }
);
