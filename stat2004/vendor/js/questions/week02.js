/* Week 2 — Applied Class */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w02q1",
    week: 2,
    label: "Question 1",
    title: "Laplace's estimator of a Bernoulli proportion",
    difficulty: "Medium",
    topics: ["sampling", "estimation", "distributions"],
    stem: `Suppose $X_1,\\dots,X_n$ is a random sample from a $\\mathrm{Bernoulli}(p)$ distribution. Laplace's estimator of the proportion $p$ is
<div class="display">$$\\hat{p}_L = \\frac{\\sum_{j=1}^{n} X_j + 1}{n + 2}.$$</div>`,
    parts: [
      { l: "a", t: `What is the sampling distribution of $S = \\sum_{j=1}^{n} X_j$?` },
      { l: "b", t: `Is $\\hat{p}_L$ an unbiased estimator of $p$? If not, determine the bias of $\\hat{p}_L$.` },
      { l: "c", t: `Determine the mean-squared error of $\\hat{p}_L$.` },
      { l: "d", t: `For which values of $p$ does $\\hat{p}_L$ have smaller MSE than the usual estimator $\\hat{p} = n^{-1}\\sum_{j=1}^{n} X_j$?` }
    ],
    answer: [
      {
        l: "a",
        t: `As $X_1,\\dots,X_n$ are independent Bernoulli$(p)$, $S$ is a sum of $n$ independent Bernoulli trials, so
<div class="display">$$S \\sim \\mathrm{Binomial}(n, p).$$</div>
For what follows, recall $\\mathrm{E}_p(S) = np$ and $\\mathrm{Var}_p(S) = np(1-p)$.`
      },
      {
        l: "b",
        t: `Applying the definition of bias,
<div class="display">$$\\mathrm{bias}(\\hat{p}_L; p) = \\mathrm{E}_p\\!\\left[\\frac{S+1}{n+2}\\right] - p = \\frac{np+1}{n+2} - p = \\frac{1-2p}{n+2}.$$</div>
So $\\hat{p}_L$ is biased, and its bias is zero only when $p = 1/2$.`
      },
      {
        l: "c",
        t: `Since $\\hat{p}_L$ is a linear function of $S$,
<div class="display">$$\\mathrm{Var}_p(\\hat{p}_L) = \\frac{\\mathrm{Var}_p(S)}{(n+2)^2} = \\frac{np(1-p)}{(n+2)^2}.$$</div>
Hence
<div class="display">$$\\mathrm{MSE}(\\hat{p}_L; p) = \\mathrm{Var}(\\hat{p}_L) + \\mathrm{bias}(\\hat{p}_L)^2 = \\frac{np(1-p) + (1-2p)^2}{(n+2)^2}.$$</div>`
      },
      {
        l: "d",
        t: `The usual estimator $\\hat{p} = S/n$ is unbiased, so $\\mathrm{MSE}(\\hat{p}) = \\mathrm{Var}(\\hat{p}) = p(1-p)/n$. Thus $\\hat{p}_L$ has smaller MSE when
<div class="display">$$\\frac{np(1-p) + (1-2p)^2}{(n+2)^2} < \\frac{p(1-p)}{n},$$</div>
which is equivalent to
<div class="display">$$n(1-2p)^2 < 4(n+1)p(1-p) \\quad\\Longleftrightarrow\\quad p^2 - p + \\frac{n}{4(2n+1)} < 0.$$</div>
This quadratic has its global minimum at $p = 1/2$ and roots
<div class="display">$$\\frac{1 \\pm \\sqrt{(n+1)/(2n+1)}}{2}.$$</div>
Therefore $\\hat{p}_L$ has smaller MSE exactly for
<div class="display">$$\\frac{1 - \\sqrt{(n+1)/(2n+1)}}{2} < p < \\frac{1 + \\sqrt{(n+1)/(2n+1)}}{2},$$</div>
that is, for $p$ close to $1/2$ — the region where Laplace's shrinkage towards $1/2$ pays off.`
      }
    ]
  },

  {
    id: "w02q2",
    week: 2,
    label: "Question 2",
    title: "Estimation for the exponential rate parameter",
    difficulty: "Medium",
    topics: ["sampling", "moments", "estimation", "distributions"],
    stem: `Suppose $X_1,\\dots,X_n$ is a random sample from an $\\mathrm{Exp}(\\lambda)$ distribution, where $\\lambda > 0$ is the rate parameter so the pdf is $f(x;\\lambda) = \\lambda e^{-\\lambda x}$ for $x \\ge 0$ and $f(x;\\lambda) = 0$ for $x < 0$.

It may be helpful to know that if $Y \\sim \\mathrm{Gamma}(\\alpha,\\beta)$, then
<div class="display">$$\\mathrm{E}(Y) = \\frac{\\alpha}{\\beta}, \\quad \\mathrm{Var}(Y) = \\frac{\\alpha}{\\beta^2}, \\quad \\mathrm{E}(Y^{-1}) = \\frac{\\beta}{\\alpha-1}, \\quad \\mathrm{Var}(Y^{-1}) = \\frac{\\beta^2}{(\\alpha-1)^2(\\alpha-2)},$$</div>
and the moment generating function of $Y$ is
<div class="display">$$M_Y(t) = \\left(\\frac{\\beta}{\\beta-t}\\right)^{\\alpha}, \\quad t < \\beta.$$</div>
The $\\mathrm{Exp}(\\lambda)$ distribution coincides with the $\\mathrm{Gamma}(1,\\lambda)$ distribution.`,
    parts: [
      { l: "a", t: `Show that the sampling distribution of $\\bar{X}$ is $\\mathrm{Gamma}(n, n\\lambda)$.` },
      { l: "b", t: `Determine the method of moments estimator for $\\lambda$.` },
      { l: "c", t: `Determine the bias of the estimator from part (b).` },
      { l: "d", t: `Determine the constant $c$ such that $c/\\bar{X}$ is an unbiased estimator of $\\lambda$.` },
      { l: "e", t: `Does the estimator from part (d) have a smaller MSE than the method of moments estimator? Justify your answer.` }
    ],
    answer: [
      {
        l: "a",
        t: `The moment generating function of $\\bar{X}$ is
<div class="display">$$M_{\\bar{X}}(t) = \\mathrm{E}\\left[e^{t\\bar{X}}\\right] = \\mathrm{E}\\left[\\prod_{j=1}^{n} e^{X_j t/n}\\right] = \\prod_{j=1}^{n} M_{X_j}(t/n),$$</div>
using independence. Each $X_j$ is $\\mathrm{Gamma}(1,\\lambda)$, so
<div class="display">$$M_{\\bar{X}}(t) = \\prod_{j=1}^{n} \\frac{\\lambda}{\\lambda - t/n} = \\left(\\frac{\\lambda}{\\lambda - t/n}\\right)^{n} = \\left(\\frac{n\\lambda}{n\\lambda - t}\\right)^{n},$$</div>
which is the moment generating function of a $\\mathrm{Gamma}(n, n\\lambda)$ distribution. Moment generating functions are unique, so $\\bar{X} \\sim \\mathrm{Gamma}(n, n\\lambda)$.`
      },
      {
        l: "b",
        t: `Since $\\mathrm{E}_\\lambda(X) = 1/\\lambda$, equating this to the first sample moment gives $1/\\lambda = \\bar{X}$, so
<div class="display">$$\\hat{\\lambda} = 1/\\bar{X}.$$</div>`
      },
      {
        l: "c",
        t: `Using $\\bar{X} \\sim \\mathrm{Gamma}(n, n\\lambda)$ together with $\\mathrm{E}(Y^{-1}) = \\beta/(\\alpha-1)$ for $\\alpha = n$, $\\beta = n\\lambda$,
<div class="display">$$\\mathrm{bias}(\\hat{\\lambda}; \\lambda) = \\mathrm{E}_\\lambda(1/\\bar{X}) - \\lambda = \\frac{n\\lambda}{n-1} - \\lambda = \\frac{\\lambda}{n-1}.$$</div>
So $\\hat{\\lambda}$ overestimates $\\lambda$ on average.`
      },
      {
        l: "d",
        t: `We need $\\mathrm{E}_\\lambda(c/\\bar{X}) = \\lambda$, that is $c\\,n\\lambda/(n-1) = \\lambda$. Taking
<div class="display">$$c = \\frac{n-1}{n}$$</div>
gives an unbiased estimator $\\tilde{\\lambda} = \\dfrac{n-1}{n\\bar{X}}$.`
      },
      {
        l: "e",
        t: `Since $\\tilde{\\lambda}$ is unbiased and $c < 1$,
<div class="display">$$\\mathrm{MSE}(\\tilde{\\lambda}; \\lambda) = \\mathrm{Var}(\\tilde{\\lambda}) = c^2\\,\\mathrm{Var}(1/\\bar{X}),$$</div>
whereas
<div class="display">$$\\mathrm{MSE}(\\hat{\\lambda}; \\lambda) = \\mathrm{Var}(1/\\bar{X}) + \\mathrm{bias}(\\hat{\\lambda}; \\lambda)^2.$$</div>
Because $c^2 < 1$ and the squared bias is non-negative, $\\mathrm{MSE}(\\tilde{\\lambda}; \\lambda) < \\mathrm{MSE}(\\hat{\\lambda}; \\lambda)$. So yes, the bias-corrected estimator has smaller MSE. (Note that $\\mathrm{Var}(1/\\bar{X})$ is finite only when $n > 2$.)`
      }
    ]
  },

  {
    id: "w02q3",
    week: 2,
    label: "Question 3",
    title: "Unbiasedness of the sample median",
    difficulty: "Hard",
    topics: ["sampling", "estimation", "distributions"],
    stem: `Suppose $X_1,\\dots,X_{2n+1}$ is a random sample. The statistical model is $\\mathcal{F} = \\{f(x;\\theta) = g(x-\\theta) : \\theta \\in \\mathbb{R}\\}$, where $g$ is some fixed pdf that is symmetric about $0$ and satisfies
<div class="display">$$\\int_{-\\infty}^{\\infty} |x|\\,g(x)\\,dx < \\infty.$$</div>
Using results from ordered statistics, it can be shown that the sample median $M$ has sampling distribution with pdf
<div class="display">$$f_M(x;\\theta) = \\frac{(2n+1)!}{n!\\,n!}\\,[F(x;\\theta)]^{n}\\,[1-F(x;\\theta)]^{n}\\,f(x;\\theta), \\quad x \\in \\mathbb{R},$$</div>
where $F(x;\\theta)$ is the cdf corresponding to $f(x;\\theta)$.`,
    parts: [
      { l: "a", t: `Show that $F(\\theta+x;\\theta) = 1 - F(\\theta-x;\\theta)$ for $x \\in \\mathbb{R}$.` },
      { l: "b", t: `Show that $M$ is an unbiased estimator of $\\theta$.` }
    ],
    answer: [
      {
        l: "a",
        t: `Each pdf $f(x;\\theta) = g(x-\\theta)$ in the model is symmetric about $\\theta$, because $g$ is symmetric about $0$. This implies $F(\\theta;\\theta) = 1/2$.

For $x \\ge 0$, substituting $v = u-\\theta$,
<div class="display">$$F(\\theta+x;\\theta) - F(\\theta;\\theta) = \\int_{\\theta}^{\\theta+x} g(u-\\theta)\\,du = \\int_{0}^{x} g(v)\\,dv.$$</div>
Similarly, again with $v = u-\\theta$,
<div class="display">$$F(\\theta;\\theta) - F(\\theta-x;\\theta) = \\int_{\\theta-x}^{\\theta} g(u-\\theta)\\,du = \\int_{-x}^{0} g(v)\\,dv = \\int_{0}^{x} g(v)\\,dv,$$</div>
where the last equality uses the symmetry of $g$ about $0$. Hence
<div class="display">$$F(\\theta+x;\\theta) - \\tfrac{1}{2} = \\tfrac{1}{2} - F(\\theta-x;\\theta),$$</div>
which gives $F(\\theta+x;\\theta) = 1 - F(\\theta-x;\\theta)$. For $x < 0$ the same identity follows by replacing $x$ with $-x$.`
      },
      {
        l: "b",
        t: `Write $c = \\dfrac{(2n+1)!}{n!\\,n!}$. Using the identity from part (a) and the symmetry of $f$,
<div class="display">$$\\begin{aligned}
f_M(\\theta+x;\\theta) &amp;= c\\,[F(\\theta+x;\\theta)]^{n}\\,[1-F(\\theta+x;\\theta)]^{n}\\,f(\\theta+x;\\theta) \\\\
&amp;= c\\,[1-F(\\theta-x;\\theta)]^{n}\\,[F(\\theta-x;\\theta)]^{n}\\,f(\\theta-x;\\theta) \\\\
&amp;= f_M(\\theta-x;\\theta).
\\end{aligned}$$</div>
So the sampling distribution of $M$ is symmetric about $\\theta$, and therefore $\\mathrm{E}_\\theta(M) = \\theta$ provided the expectation exists.

It remains to check existence. Since $0 \\le F(x;\\theta) \\le 1$,
<div class="display">$$\\begin{aligned}
\\int_{-\\infty}^{\\infty} |x|\\,f_M(x;\\theta)\\,dx &amp;\\le c\\int_{-\\infty}^{\\infty} |x|\\,f(x;\\theta)\\,dx
= c\\int_{-\\infty}^{\\infty} |u+\\theta|\\,g(u)\\,du \\\\
&amp;\\le c\\left(\\int_{-\\infty}^{\\infty} |u|\\,g(u)\\,du
+ |\\theta|\\int_{-\\infty}^{\\infty} g(u)\\,du\\right) < \\infty,
\\end{aligned}$$</div>
using the stated integrability of $|x|g(x)$. Hence the expectation exists and $M$ is unbiased for $\\theta$.`
      }
    ]
  },

  {
    id: "w02q4",
    week: 2,
    label: "Question 4",
    title: "Consistency and a simulation study for the geometric",
    difficulty: "Medium",
    topics: ["estimation", "sampling", "simulation"],
    stem: `Suppose $X_1,\\dots,X_n$ is a random sample from a $\\mathrm{Geometric}(p)$ distribution whose support is the positive integers $\\{1,2,\\dots\\}$. As $\\mathrm{E}_p(X) = 1/p$, the method of moments estimator is $\\hat{p} = 1/\\bar{X}$.`,
    parts: [
      { l: "a", t: `Is $\\hat{p}$ a consistent estimator of $p$? Justify your answer.` },
      {
        l: "b",
        t: `A simulation study was carried out with $p = 0.75$ using the following code, which scales the bias, variance and MSE of $\\hat{p}$ by $n$ for each sample size.
<pre><code>p  &lt;- 0.75
B  &lt;- 10000
ns &lt;- c(10, 50, 100, 500, 1000, 5000)

results &lt;- sapply(ns, function(n) {
  phat &lt;- replicate(B, 1/mean(rgeom(n, p) + 1))
  c(nBias = n*(mean(phat) - p),
    nVar  = n*var(phat),
    nMSE  = n*mean((phat - p)^2))
})
results</code></pre>
The output was
<table>
<tr><th></th><th>$n = 10$</th><th>$50$</th><th>$100$</th><th>$500$</th><th>$1000$</th><th>$5000$</th></tr>
<tr><td>$n \\times \\text{bias}$</td><td>0.188</td><td>0.212</td><td>0.155</td><td>0.171</td><td>0.130</td><td>0.067</td></tr>
<tr><td>$n \\times \\text{variance}$</td><td>0.129</td><td>0.139</td><td>0.141</td><td>0.140</td><td>0.142</td><td>0.141</td></tr>
<tr><td>$n \\times \\text{MSE}$</td><td>0.133</td><td>0.140</td><td>0.141</td><td>0.140</td><td>0.142</td><td>0.141</td></tr>
</table>
with $B = 10{,}000$ replicates for each $n$. What do you notice about these scaled quantities as $n$ increases? What does this tell you about the rate at which the bias and the variance of $\\hat{p}$ shrink, and which of the two dominates the MSE?

<br><em>Note:</em> <code>rgeom</code> simulates from the geometric distribution supported on $\\{0,1,2,\\dots\\}$, so one is added to the simulated values.`
      }
    ],
    answer: [
      {
        l: "a",
        t: `Yes. The $X_i$ are iid with finite mean and variance, so by the law of large numbers $\\bar{X}_n \\xrightarrow{p} 1/p$. The function $h(x) = 1/x$ is continuous on $(0,\\infty)$, so the continuous mapping theorem gives
<div class="display">$$h(\\bar{X}_n) = 1/\\bar{X}_n \\xrightarrow{p} h(1/p) = p.$$</div>
Hence $1/\\bar{X}_n$ is a consistent estimator of $p$.`
      },
      {
        l: "b",
        t: `The scaled quantities are essentially flat in $n$: $n\\times\\text{variance}$ sits at about $0.14$ for every sample size, and $n\\times\\text{MSE}$ agrees with it to within about $0.005$. Meanwhile $n\\times\\text{bias}$ fluctuates around $0.15$–$0.2$ without any clear trend, apart from sampling noise (each entry is itself an average over $B = 10{,}000$ replicates).

So both the bias and the variance of $\\hat{p}$ are of order $1/n$:
<div class="display">$$\\mathrm{Var}(\\hat{p}) \\approx \\frac{0.14}{n}, \\qquad \\mathrm{bias}(\\hat{p}) \\approx \\frac{0.2}{n}.$$</div>
The MSE is therefore dominated by the variance, exactly as expected since
<div class="display">$$\\mathrm{MSE}(\\hat{p}) = \\mathrm{Var}(\\hat{p}) + \\mathrm{bias}(\\hat{p})^2,$$</div>
and the squared bias is of order $1/n^2$, so it is negligible relative to the variance for large $n$.

Two conclusions follow. First, $\\mathrm{MSE}(\\hat{p}) \\to 0$ at rate $1/n$, which is the numerical confirmation of the consistency established in part (a). Second, the dominance of the variance term over the squared bias is the usual state of affairs for a well-behaved estimator: the bias correction that would remove the $O(1/n)$ bias is not worth pursuing here, because it would buy a reduction of order $1/n^2$ in the MSE.`
      }
    ]
  },

  {
    id: "w02q5",
    week: 2,
    label: "Question 5",
    title: "Method of moments for the negative binomial",
    difficulty: "Medium",
    topics: ["moments", "estimation"],
    stem: `The negative binomial distribution is used to model over-dispersed counts, that is counts where the variance is larger than the mean. Write $\\mathrm{NB}(r,p)$ for the distribution with probability mass function
<div class="display">$$f(x) = \\binom{x+r-1}{r-1} p^{r} (1-p)^{x}, \\quad x = 0,1,2,\\dots,$$</div>
where $r \\in (0,\\infty)$ and $p \\in (0,1]$. If $X \\sim \\mathrm{NB}(r,p)$, then
<div class="display">$$\\mathrm{E}(X) = \\frac{r(1-p)}{p} \\quad\\text{and}\\quad \\mathrm{Var}(X) = \\frac{r(1-p)}{p^{2}}.$$</div>
Let $X_1,\\dots,X_n$ be a random sample from $\\mathrm{NB}(r,p)$.`,
    parts: [
      { l: "a", t: `Determine the method of moments estimator for $(r,p)$.` },
      { l: "b", t: `Under what conditions does your method of moments estimator belong to the parameter space?` }
    ],
    answer: [
      {
        l: "a",
        t: `Write $\\bar{X}$ for the sample mean and
<div class="display">$$\\hat{\\sigma}^2 = n^{-1}\\sum_{j=1}^{n} X_j^2 - \\bar{X}^2$$</div>
for the sample variance about the origin. The method of moments estimator solves
<div class="display">$$\\bar{X} = \\frac{r(1-p)}{p} \\quad\\text{and}\\quad \\hat{\\sigma}^2 = \\frac{r(1-p)}{p^{2}}.$$</div>
Dividing the second equation by the first,
<div class="display">$$\\hat{\\sigma}^2 = \\frac{r(1-p)}{p}\\cdot\\frac{1}{p} = \\frac{\\bar{X}}{p},$$</div>
so
<div class="display">$$\\hat{p} = \\frac{\\bar{X}}{\\hat{\\sigma}^2}.$$</div>
Substituting back into the first equation and solving for $r$,
<div class="display">$$\\bar{X} = \\frac{r(1-\\hat{p})}{\\hat{p}} = \\frac{r(\\hat{\\sigma}^2 - \\bar{X})}{\\bar{X}} \\quad\\Longrightarrow\\quad \\hat{r} = \\frac{\\bar{X}^2}{\\hat{\\sigma}^2 - \\bar{X}}.$$</div>`
      },
      {
        l: "b",
        t: `We need $\\hat{r} > 0$ and $\\hat{p} \\in (0,1]$. First,
<div class="display">$$0 < \\hat{p} = \\frac{\\bar{X}}{\\hat{\\sigma}^2} \\le 1 \\quad\\Longleftrightarrow\\quad \\bar{X} \\le \\hat{\\sigma}^2 \\quad (\\text{given } \\bar{X} > 0),$$</div>
and
<div class="display">$$0 < \\hat{r} = \\frac{\\bar{X}^2}{\\hat{\\sigma}^2 - \\bar{X}} < \\infty \\quad\\Longleftrightarrow\\quad \\hat{\\sigma}^2 > \\bar{X}.$$</div>
The two conditions coincide, so the method of moments estimator of $(r,p)$ lies in the parameter space precisely when
<div class="display">$$\\hat{\\sigma}^2 > \\bar{X},$$</div>
i.e. when the sample is over-dispersed — exactly the situation the negative binomial is meant to describe.`
      }
    ]
  }
);
