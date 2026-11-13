/* Week 8 — Tutorial */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w08e1",
    week: 8,
    label: "Exercise 1",
    title: "Pivot transformation for exponential data",
    difficulty: "Easy",
    topics: ["sampling", "ci", "distributions"],
    hint: {
      text: `Get the cdf of $Y = \\lambda X$ directly from the cdf of $X$ — that is easier than transforming the density. A pivot is a function of the data and the parameter whose distribution does not involve the parameter; once you have one, invert the probability statement.`,
      refs: ["w7l12", "w7l3"]
    },
    stem: `Let $X \\sim \\mathrm{Exp}(\\lambda)$, with pdf and cdf given respectively by
<div class="display">$$f_\\lambda(x) = \\lambda e^{-\\lambda x} \\quad\\text{and}\\quad F_\\lambda(x) = 1 - e^{-\\lambda x}, \\qquad x \\ge 0,$$</div>
where $\\lambda > 0$ is an unknown parameter.`,
    parts: [
      { l: "a", t: `Find the distribution of $Y = \\lambda X$ and show that it is a pivot quantity.` },
      { l: "b", t: `Find cutoff values $a$ and $b$ such that the following probability statement holds: $99\\% = P(a \\le Y \\le b)$.` },
      { l: "c", t: `Using your results from (a) and (b), or otherwise, construct a $99\\%$ confidence interval for $\\lambda$ based on the observation $X$.` },
      { l: "d", t: `Evaluate the confidence interval from part (c) based on the realisation $x = 12.41882$. Interpret your confidence interval in the form of a sentence.` },
      { l: "e", t: `The true value of $\\lambda$ that generated the realisation $x = 12.41882$ is hidden somewhere on Alan's laptop. Did the interval you calculated in part (d) contain this true value?` }
    ],
    answer: [
      {
        l: "a",
        t: `It is easier to work with the cdf than the pdf:
<div class="display">$$P(Y \\le y) = P(\\lambda X \\le y) = P(X \\le y/\\lambda) = F_\\lambda(y/\\lambda) = 1 - e^{-y}, \\qquad y \\ge 0.$$</div>
So $Y = \\lambda X$ has a standard $\\mathrm{Exp}(1)$ distribution, which does not depend on any unknown parameter. It is therefore a pivot quantity.`
      },
      {
        l: "b",
        t: `There is no unique pair $(a,b)$ satisfying $99\\% = P(a \\le Y \\le b)$. One natural choice is to use the $0.5\\%$ and $99.5\\%$ quantiles of the $\\mathrm{Exp}(1)$ distribution:
<div class="display">$$0.005 = P(Y \\le a) = 1 - e^{-a} \\quad\\Longrightarrow\\quad a = -\\log(0.995) = 0.005,$$</div>
<div class="display">$$0.995 = P(Y \\le b) = 1 - e^{-b} \\quad\\Longrightarrow\\quad b = -\\log(0.005) = 5.298.$$</div>`
      },
      {
        l: "c",
        t: `From parts (a) and (b),
<div class="display">$$\\begin{aligned}
0.99 &amp;= P(0.005 \\le Y \\le 5.298) &amp;&amp; \\text{(cutoffs from (b))} \\\\
&amp;= P(0.005 \\le \\lambda X \\le 5.298) &amp;&amp; \\text{(pivot step from (a))} \\\\
&amp;= P\\left(\\frac{0.005}{X} \\le \\lambda \\le \\frac{5.298}{X}\\right).
\\end{aligned}$$</div>
So a $99\\%$ confidence interval for $\\lambda$ is
<div class="display">$$\\left(\\frac{0.005}{X},\\; \\frac{5.298}{X}\\right).$$</div>`
      },
      {
        l: "d",
        t: `With $x = 12.41882$,
<div class="display">$$\\left(\\frac{0.005}{12.41882},\\; \\frac{5.298}{12.41882}\\right) = (0.0004,\\; 0.427).$$</div>
We can be $99\\%$ confident that the true population $\\lambda$ lies between $0.0004$ and $0.427$.`
      },
      {
        l: "e",
        t: `We can never know whether this particular numerical interval $(0.0004, 0.427)$ contains the true value. The confidence statement is about the <em>procedure</em>: it produces an interval that contains the true $\\lambda$ in $99\\%$ of samples. There is no guarantee that it worked for this particular sample — indeed, in any given application we cannot tell.`
      }
    ]
  },

  {
    id: "w08e2",
    week: 8,
    label: "Exercise 2",
    title: "Prior and posterior beliefs for a Beta–binomial model",
    difficulty: "Easy",
    topics: ["bayes", "distributions"],
    hint: {
      text: `Conjugate update: a Beta prior with a binomial likelihood gives a Beta posterior — add the successes to $\\alpha$ and the failures to $\\beta$. No integration required.`,
      refs: ["w8l12"]
    },
    stem: `In a lecture, Max stated that his prior belief about the true proportion $p$ of Skittles before an in-class experiment was "around $50\\%$". What if our prior belief was the opposite of Max's?`,
    parts: [
      { l: "a", t: `Consider a prior belief about $p$ characterised by
<div class="display">$$f(p) \\propto p^{0.5-1}(1-p)^{0.5-1},$$</div>
which corresponds to a $\\mathrm{Beta}(0.5, 0.5)$ distribution. Values of the density are
<table>
<tr><th>$p$</th><td>0.01</td><td>0.05</td><td>0.10</td><td>0.20</td><td>0.30</td><td>0.50</td><td>0.70</td><td>0.80</td><td>0.90</td><td>0.95</td><td>0.99</td></tr>
<tr><th>$f(p)$</th><td>3.20</td><td>1.46</td><td>1.06</td><td>0.80</td><td>0.70</td><td>0.64</td><td>0.70</td><td>0.80</td><td>1.06</td><td>1.46</td><td>3.20</td></tr>
</table>
Sketch this prior as a function of $p$ across $0 \\le p \\le 1$.` },
      { l: "b", t: `Using the graph from part (a), qualitatively describe this prior belief. In particular, explain why this is (in some sense) the "opposite" of Max's belief.` },
      { l: "c", t: `Show that after observing $x = 23$ Skittles out of $n = 47$ samples, our posterior belief should be updated to
<div class="display">$$f(p \\mid x = 23) \\propto p^{23+0.5-1}(1-p)^{24+0.5-1}.$$</div>
What distribution does this correspond to?` },
      { l: "d", t: `Values of the posterior density are
<table>
<tr><th>$p$</th><td>0.30</td><td>0.40</td><td>0.45</td><td>0.49</td><td>0.50</td><td>0.55</td><td>0.60</td><td>0.70</td></tr>
<tr><th>$f(p \\mid x = 23)$</th><td>0.15</td><td>2.61</td><td>4.77</td><td>5.50</td><td>5.44</td><td>3.91</td><td>1.74</td><td>0.07</td></tr>
</table>
The density is already negligible (below $10^{-3}$) at $p = 0.20$ and $p = 0.80$. Sketch the posterior belief $f(p \\mid x = 23)$ as a function of $p$ across $0 \\le p \\le 1$.` },
      { l: "e", t: `Give an intuitive explanation as to why our posterior belief here has changed so much from our prior belief.` }
    ],
    answer: [
      {
        l: "a",
        t: `The $\\mathrm{Beta}(0.5,0.5)$ density is U-shaped, with peaks at $p = 0$ and $p = 1$ and a valley around $p = 0.5$.
<pre><code>p     &lt;- seq(0.001, 0.999, length.out = 1000)
prior &lt;- dbeta(p, 0.5, 0.5)

plot(p, prior, type = "l", lwd = 2,
     xlab = expression(p), ylab = expression(f(p)),
     main = "Prior belief: Beta(0.5, 0.5)")</code></pre>`
      },
      {
        l: "b",
        t: `This prior places very little belief around $p = 0.5$ and instead concentrates belief near $0$ and near $1$. In other words, we believe the true Skittles proportion is likely to be highly skewed one way or the other, but it is not going to be around $50\\%$.

That is qualitatively the opposite of Max's belief, which put most of its mass around $0.5$.`
      },
      {
        l: "c",
        t: `By Bayes' theorem the posterior is proportional to the likelihood times the prior. Since $X \\mid p \\sim \\mathrm{Binomial}(n = 47, p)$, the likelihood is
<div class="display">$$f(x = 23 \\mid p) = \\binom{47}{23} p^{23}(1-p)^{24} \\propto p^{23}(1-p)^{24}.$$</div>
Multiplying by the prior,
<div class="display">$$f(p \\mid x = 23) \\propto p^{23}(1-p)^{24}\\cdot p^{0.5-1}(1-p)^{0.5-1} = p^{23+0.5-1}(1-p)^{24+0.5-1}.$$</div>
This is the kernel of a <strong>$\\mathrm{Beta}(23.5,\\, 24.5)$</strong> distribution.`
      },
      {
        l: "d",
        t: `The posterior is unimodal, with its hump at $\\dfrac{23.5}{23.5+24.5} = 0.49$.
<pre><code>posterior &lt;- dbeta(p, 23.5, 24.5)

plot(p, posterior, type = "l", lwd = 2,
     xlab = expression(p), ylab = expression(f(p * "|" * x == 23)),
     main = "Posterior belief: Beta(23.5, 24.5)")</code></pre>`
      },
      {
        l: "e",
        t: `Even though our starting belief was that the Skittle population might be highly skewed either way (closer to $0\\%$ or closer to $100\\%$), after observing 23 Skittles out of 47 our belief has shifted away from the extremes. The likelihood from 47 observations is far more concentrated than the prior, so the data dominate: the bulk of our belief now lies near the middle of the parameter space, where the observed data suggests $p$ is.`
      }
    ]
  }
);
