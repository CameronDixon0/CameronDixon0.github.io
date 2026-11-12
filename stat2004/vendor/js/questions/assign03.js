/* Assignment 3 */
(window.QBANK = window.QBANK || []).push(
  {
    id: "a3q1",
    group: "Assignment 3",
    label: "Question 1",
    source: "assignment",
    title: "Two competing confidence intervals for a variance",
    difficulty: "Medium",
    topics: ["ci", "distributions"],
    stem: `Measurements from a physics lab machine follow a normal distribution with some mean $\\mu$ and some variance $\\sigma^{2}$. To investigate the precision of this machine, $18$ independent measurements $X_1,\\dots,X_{18}$ are taken at random times over three days. Based on the sample variance
<div class="display">$$S^{2} = \\frac{1}{17}\\sum_{i=1}^{18}(X_i - \\bar{X})^{2},$$</div>
two competing confidence intervals for the unknown variance $\\sigma^{2}$ are proposed:
<div class="display">$$\\text{Ross's interval: } (0.563\\,S^{2},\\; 2.247\\,S^{2}), \\qquad \\text{Alan's interval: } (0.598\\,S^{2},\\; 2.653\\,S^{2}).$$</div>`,
    parts: [
      { l: "a", t: `State the distribution of the transformed random variable $17S^{2}/\\sigma^{2}$.` },
      { l: "b", t: `Using your result from part (a), or otherwise, show that both intervals will contain the unknown $\\sigma^{2}$ with $95\\%$ confidence.` },
      { l: "c", t: `Which of these two $95\\%$ confidence intervals is "better"? Briefly justify your choice.` }
    ],
    answer: [
      { l: "a", t: `For normal data, the sum of squares about the sample mean satisfies
<div class="display">$$\\frac{17S^{2}}{\\sigma^{2}} = \\frac{1}{\\sigma^{2}}\\sum_{i=1}^{18}(X_i-\\bar{X})^{2} \\sim \\chi^{2}_{17}.$$</div>` },
      {
        l: "b",
        t: `Start from a probability statement about the $\\chi^{2}_{17}$ distribution with cutoffs $a$ and $b$ derived from each interval, and pivot on $\\sigma^{2}$:
<div class="display">$$0.95 = P(a \\le \\chi^{2}_{17} \\le b) = P\\!\\left(a \\le \\frac{17S^{2}}{\\sigma^{2}} \\le b\\right) = P\\!\\left(\\frac{17S^{2}}{b} \\le \\sigma^{2} \\le \\frac{17S^{2}}{a}\\right).$$</div>

<strong>Ross's interval.</strong> Matching $17/b = 0.563$ and $17/a = 2.247$ gives $b = 30.196$ and $a = 7.566$. Then
<pre><code>pchisq(30.196, 17) - pchisq(7.566, 17)
# [1] 0.950</code></pre>

<strong>Alan's interval.</strong> Matching $17/b = 0.598$ and $17/a = 2.653$ gives $b = 28.428$ and $a = 6.408$. Then
<pre><code>pchisq(28.428, 17) - pchisq(6.408, 17)
# [1] 0.9498 = 0.950</code></pre>

Hence both intervals contain the true $\\sigma^{2}$ with $95\\%$ confidence. Note that neither interval splits the $5\\%$ equally between the two tails: Ross's uses approximately the $0.5\\%$ and $99.5\\%$ quantiles, Alan's approximately the $1\\%$ and $99\\%$ quantiles.`
      },
      {
        l: "c",
        t: `There is no single correct answer, and either of the following arguments is reasonable.

<strong>Prefer Ross's interval.</strong> Both intervals have the same $95\\%$ coverage, so on the usual criterion of preferring the more informative interval, we should choose the shorter one. Ross's interval has relative width
<div class="display">$$2.247 - 0.563 = 1.684,$$</div>
whereas Alan's has relative width $2.653 - 0.598 = 2.055$. Ross's interval is about $18\\%$ narrower, so it is preferable.

<strong>Argue that neither is "better".</strong> Both intervals capture the true $\\sigma^{2}$ with probability $0.95$. For any given dataset there is no guarantee that either interval captures the true value, so there is no sense in which one interval is intrinsically more accurate than the other — the choice is a matter of which secondary property (such as width) one cares about.`
      }
    ]
  },

  {
    id: "a3q2",
    group: "Assignment 3",
    label: "Question 2",
    source: "assignment",
    title: "Prior and posterior beliefs with a Beta$(1,8)$ prior",
    difficulty: "Medium",
    topics: ["bayes", "distributions", "ci"],
    stem: `Consider the Skittles versus M&amp;Ms example from the lectures. Suppose our prior belief about the underlying true proportion $p$ of Skittles is characterised by
<div class="display">$$f(p) \\propto (1-p)^{7}, \\qquad 0 \\le p \\le 1.$$</div>`,
    parts: [
      { l: "a", t: `The prior is a $\\mathrm{Beta}(1,8)$ density, whose values are
<table>
<tr><th>$p$</th><td>0.01</td><td>0.05</td><td>0.10</td><td>0.20</td><td>0.30</td><td>0.50</td><td>0.70</td><td>0.90</td><td>0.99</td></tr>
<tr><th>$f(p)$</th><td>7.46</td><td>5.59</td><td>3.83</td><td>1.68</td><td>0.66</td><td>0.06</td><td>0.002</td><td>$\\approx 0$</td><td>$\\approx 0$</td></tr>
</table>
Sketch $f(p)$ across $0 \\le p \\le 1$.` },
      { l: "b", t: `Qualitatively describe this prior belief. Around what values of $p$ is it strongest, and around what values is it weakest?` },
      { l: "c", t: `After carrying out the experiment we observe $x = 23$ Skittles out of $n = 47$ samples. Show how the prior should be updated by computing the posterior belief.` },
      { l: "d", t: `The posterior is $\\mathrm{Beta}(24,32)$, whose density values are
<table>
<tr><th>$p$</th><td>0.10</td><td>0.20</td><td>0.30</td><td>0.40</td><td>0.43</td><td>0.50</td><td>0.60</td><td>0.70</td></tr>
<tr><th>$f(p \\mid x)$</th><td>$\\approx 0$</td><td>0.005</td><td>0.887</td><td>5.575</td><td>5.999</td><td>3.316</td><td>0.218</td><td>0.001</td></tr>
</table>
Sketch the posterior belief together with the prior, over $0 \\le p \\le 1$.` },
      { l: "e", t: `Qualitatively describe how our belief about $p$ has changed after observing the data.` },
      { l: "f", t: `Construct and interpret a $95\\%$ credible interval for the underlying true proportion $p$ based on the posterior belief.` },
      {
        l: "g",
        t: `Comparing all the priors and posteriors covered in the course, comment on (i) the effect of the prior belief on the posterior belief, and (ii) the effect of the data on the posterior belief. Relevant summaries for the same data ($x = 23$, $n = 47$, sample proportion $0.489$) are
<table>
<tr><th>Prior</th><th>Posterior</th><th>Posterior mean</th><th>$95\\%$ credible interval</th></tr>
<tr><td>$\\mathrm{Beta}(1,1)$ (uniform)</td><td>$\\mathrm{Beta}(24,25)$</td><td>0.490</td><td>(0.352, 0.628)</td></tr>
<tr><td>$\\mathrm{Beta}(0.5,0.5)$</td><td>$\\mathrm{Beta}(23.5,24.5)$</td><td>0.490</td><td>(0.351, 0.629)</td></tr>
<tr><td>$\\mathrm{Beta}(1,8)$</td><td>$\\mathrm{Beta}(24,32)$</td><td>0.429</td><td>(0.303, 0.559)</td></tr>
</table>`
      }
    ],
    answer: [
      {
        l: "a",
        t: `Writing $f(p) = c(1-p)^{7}$ and normalising, $\\int_0^1 (1-p)^{7}dp = 1/8$, so $c = 8$ and
<div class="display">$$f(p) = 8(1-p)^{7}, \\qquad 0 \\le p \\le 1.$$</div>
This is the $\\mathrm{Beta}(1,8)$ density. It decreases monotonically from $f(0) = 8$ down to $f(1) = 0$, a curve that falls steeply near $p = 0$ and flattens towards $p = 1$.`
      },
      {
        l: "b",
        t: `The belief is <strong>strongest near $p = 0$</strong> and <strong>weakest near $p = 1$</strong>: we expect Skittles to be only a small proportion of the mix. Quantitatively,
<div class="display">$$P(p < 0.2) = 1 - (1-0.2)^{8} = 0.832,$$</div>
so about $83\\%$ of the prior probability lies below $0.2$, while the density at $p = 0.7$ is only $0.002$.

This is a strongly opinionated prior: it says that a proportion near $1$ is essentially impossible, in stark contrast to a uniform or $\\mathrm{Beta}(0.5,0.5)$ prior.`
      },
      {
        l: "c",
        t: `With $X \\mid p \\sim \\mathrm{Binomial}(47,p)$ and observed $x = 23$, the likelihood is
<div class="display">$$f(x = 23 \\mid p) = \\binom{47}{23}p^{23}(1-p)^{24} \\propto p^{23}(1-p)^{24}.$$</div>
By Bayes' theorem the posterior is proportional to likelihood times prior:
<div class="display">$$\\begin{aligned}
f(p \\mid x = 23) &amp;\\propto p^{23}(1-p)^{24}\\cdot(1-p)^{7} \\\\
&amp;= p^{23}(1-p)^{31} = p^{24-1}(1-p)^{32-1}.
\\end{aligned}$$</div>
This is the kernel of a $\\mathrm{Beta}(24,\\,32)$ distribution. (In general a $\\mathrm{Beta}(a,b)$ prior with a $\\mathrm{Binomial}(n,p)$ likelihood gives a $\\mathrm{Beta}(a+x,\\,b+n-x)$ posterior.)`
      },
      {
        l: "d",
        t: `The posterior density rises from essentially zero at $p = 0$, peaks around $p \\approx 0.43$ and falls away to zero as $p \\to 1$. Compared with the prior — which was concentrated at the left-hand end and monotonically decreasing — the posterior is a bell shape centred near the middle of the interval.`
      },
      {
        l: "e",
        t: `Our belief has moved dramatically. The prior put $83\\%$ of its mass below $p = 0.2$ and assigned essentially no probability to large $p$; the posterior is centred at
<div class="display">$$\\mathrm{E}(p \\mid x) = \\frac{24}{56} = 0.429$$</div>
with almost all its mass between $p = 0.2$ and $p = 0.7$. It is also far more concentrated: the prior spread over the whole unit interval, whereas the posterior has a standard deviation of only about $0.065$.

The posterior sits slightly below the sample proportion $23/47 = 0.489$, which shows the prior is still exerting a small pull towards small $p$; but the data have clearly dominated.`
      },
      {
        l: "f",
        t: `Take the $2.5\\%$ and $97.5\\%$ quantiles of the $\\mathrm{Beta}(24,32)$ posterior (any split of the $5\\%$ between the two tails is acceptable):
<pre><code>qbeta(c(0.025, 0.975), 24, 32)
# [1] 0.3029999 0.5589427</code></pre>
So the $95\\%$ credible interval is
<div class="display">$$(0.303,\\; 0.559).$$</div>
<strong>Interpretation.</strong> Given our prior belief and the observed data, there is a $95\\%$ probability that the true proportion of Skittles lies between $0.303$ and $0.559$.

Note how different this interpretation is from a frequentist confidence interval: here the probability statement is directly about $p$, which is treated as random, whereas a confidence interval statement is about the long-run behaviour of the procedure.`
      },
      {
        l: "g",
        t: `(i) <strong>The effect of the prior.</strong> A strongly opinionated prior has a noticeable effect on the posterior. The weak uniform and $\\mathrm{Beta}(0.5,0.5)$ priors give almost identical posteriors centred at $0.490$, essentially the sample proportion; the strongly opinionated $\\mathrm{Beta}(1,8)$ prior pulls the posterior down to $0.429$ and shifts the credible interval correspondingly to $(0.303, 0.559)$. The comparison illustrates that the prior matters most when it is concentrated somewhere the data do not support.

(ii) <strong>The effect of the data.</strong> Provided the prior assigns positive density everywhere on $(0,1)$, the data pull the posterior towards the sample proportion regardless of the prior: all three posteriors are centred near $0.43$–$0.49$, close to $23/47 = 0.489$. The prior cannot hold out against the data. Moreover, the influence of the prior shrinks as the sample size grows — with $n = 47$ observations the likelihood is much more concentrated than the $\\mathrm{Beta}(1,8)$ prior, and with more data still the three posteriors would become practically indistinguishable. This is the sense in which the Bayesian and frequentist answers agree in large samples.`
      }
    ]
  },

  {
    id: "a3q3",
    group: "Assignment 3",
    label: "Question 3",
    source: "assignment",
    title: "A confidence interval for the bound of a uniform distribution",
    difficulty: "Medium",
    topics: ["ci", "sampling", "mle"],
    stem: `Let $X_1,X_2,\\dots,X_n \\overset{\\text{iid}}{\\sim} \\mathrm{Uniform}(-\\theta,\\theta)$, where $\\theta \\ge 0$ is an unknown parameter.`,
    parts: [
      { l: "a", t: `State the distribution of $U_1 = |X_1|/\\theta$.` },
      { l: "b", t: `Show that the MLE of $\\theta$ is $\\hat{\\theta} = \\max\\{|X_1|,|X_2|,\\dots,|X_n|\\}$.` },
      { l: "c", t: `Using part (a), or otherwise, show that $U_{(n)} = \\hat{\\theta}/\\theta$ has cumulative distribution function
<div class="display">$$P(U_{(n)} \\le u) = \\begin{cases}0, &amp; u < 0, \\\\ u^{n}, &amp; 0 \\le u \\le 1, \\\\ 1, &amp; u > 1.\\end{cases}$$</div>` },
      { l: "d", t: `Is $U_{(n)}$ a pivot quantity for $\\theta$? Briefly explain your answer.` },
      { l: "e", t: `Using part (c), or otherwise, find a pair of critical values $a$ and $b$ such that $P(a \\le U_{(n)} \\le b) = 0.95$.` },
      { l: "f", t: `A sample of $n = 7$ observations is taken, giving
<div class="display">$$1.421 \\quad -1.197 \\quad 0.476 \\quad 1.106 \\quad -2.456 \\quad 1.865 \\quad -0.581$$</div>
Using parts (d) and (e), or otherwise, construct and interpret a $95\\%$ confidence interval for $\\theta$ based on these data.` },
      { l: "g", t: `A student concludes that "there is a $95\\%$ chance that the true $\\theta$ is contained within the interval calculated in part (f)". Do you agree? Briefly explain why or why not.` }
    ],
    answer: [
      { l: "a", t: `$|X_1|$ has a $\\mathrm{Uniform}(0,\\theta)$ distribution, since $X_1$ is uniform on $(-\\theta,\\theta)$ and we fold the negative half onto the positive half. Hence
<div class="display">$$U_1 = \\frac{|X_1|}{\\theta} \\sim \\mathrm{Uniform}(0,1).$$</div>` },
      {
        l: "b",
        t: `The joint likelihood is
<div class="display">$$L(\\theta \\mid \\mathbf{X}) = \\begin{cases}(1/2\\theta)^{n}, &amp; -\\theta \\le X_i \\le \\theta \\text{ for all } i, \\\\ 0, &amp; \\text{otherwise}\\end{cases} = \\begin{cases}(1/2\\theta)^{n}, &amp; \\theta \\ge \\max_i|X_i|, \\\\ 0, &amp; \\text{otherwise.}\\end{cases}$$</div>
On the region where it is positive, $(2\\theta)^{-n}$ is strictly decreasing in $\\theta$: the smaller $\\theta$ is, the larger the likelihood. But $\\theta$ cannot fall below $\\max_i|X_i|$, because there the likelihood drops to zero. Hence the likelihood is maximised at
<div class="display">$$\\hat{\\theta} = \\max_i |X_i|.$$</div>`
      },
      {
        l: "c",
        t: `Since $\\hat{\\theta} = \\max_i |X_i|$,
<div class="display">$$\\begin{aligned}
P(U_{(n)} \\le u) &amp;= P\\left(\\max\\left\\{\\tfrac{|X_1|}{\\theta},\\dots,\\tfrac{|X_n|}{\\theta}\\right\\} \\le u\\right)
= P\\left(\\tfrac{|X_1|}{\\theta} \\le u, \\dots, \\tfrac{|X_n|}{\\theta} \\le u\\right) \\\\
&amp;= \\prod_{i=1}^{n}P\\left(\\tfrac{|X_i|}{\\theta} \\le u\\right) \\quad\\text{(independence)}
= \\left[P\\left(\\tfrac{|X_1|}{\\theta} \\le u\\right)\\right]^{n} \\quad\\text{(identically distributed)}.
\\end{aligned}$$</div>
By part (a) each $|X_i|/\\theta \\sim \\mathrm{Uniform}(0,1)$, so
<div class="display">$$P(U_{(n)} \\le u) = \\begin{cases}0, &amp; u < 0, \\\\ u^{n}, &amp; 0 \\le u \\le 1, \\\\ 1, &amp; u > 1.\\end{cases}$$</div>`
      },
      {
        l: "d",
        t: `Yes. The distribution of $U_{(n)} = \\hat{\\theta}/\\theta$ does not depend on $\\theta$ — the cdf in part (c) involves no unknown parameters. A function of the data and the parameter whose distribution is free of the parameter is the definition of a pivot quantity.`
      },
      {
        l: "e",
        t: `There is no unique choice of $a$ and $b$. The most common approach is to put equal probability in the two tails. Using the cdf from part (c),
<div class="display">$$0.025 = P(U_{(n)} \\le a) = a^{n} \\;\\Longrightarrow\\; a = (0.025)^{1/n},$$</div>
<div class="display">$$0.975 = P(U_{(n)} \\le b) = b^{n} \\;\\Longrightarrow\\; b = (0.975)^{1/n}.$$</div>
So taking $a = (0.025)^{1/n}$ and $b = (0.975)^{1/n}$ gives $P(a \\le U_{(n)} \\le b) = 0.975 - 0.025 = 0.95$. (Any other pair with $b^{n} - a^{n} = 0.95$ would also work, and would give a different interval width.)`
      },
      {
        l: "f",
        t: `For $n = 7$,
<div class="display">$$a = (0.025)^{1/7} = 0.5904, \\qquad b = (0.975)^{1/7} = 0.9964,$$</div>
so $P(0.5904 \\le U_{(7)} \\le 0.9964) = 0.95$. Pivoting,
<div class="display">$$0.95 = P\\left(0.5904 \\le \\frac{\\hat{\\theta}}{\\theta} \\le 0.9964\\right) = P\\left(\\frac{\\hat{\\theta}}{0.9964} \\le \\theta \\le \\frac{\\hat{\\theta}}{0.5904}\\right).$$</div>
The observed data have absolute maximum $|x|_{(7)} = 2.456$ (from the observation $-2.456$), so
<div class="display">$$\\left(\\frac{2.456}{0.9964},\\; \\frac{2.456}{0.5904}\\right) = (2.465,\\; 4.160).$$</div>
<strong>Interpretation.</strong> We can be $95\\%$ confident that the true upper bound $\\theta$ of the uniform distribution lies between $2.465$ and $4.160$.

Sanity check: the interval must contain the largest absolute observation, $2.456$, and it does — as it must, since $\\hat{\\theta}$ is the lower limit of the range of possible $\\theta$ values.`
      },
      {
        l: "g",
        t: `No, this is incorrect. The statement confuses the confidence <em>procedure</em> with the realised interval.

Before the data are collected, the random interval constructed in this way contains $\\theta$ with probability $0.95$ — that is what "95% confidence" means: the procedure works in $95\\%$ of all possible samples. But once the sample has been collected and the numerical interval $(2.465, 4.160)$ computed, there is no randomness left. The true $\\theta$ is a fixed unknown number, and it is either inside that interval or outside it; we simply do not know which. There is therefore no "95% chance" attaching to this particular interval.

The correct statement is: "the procedure that produced this interval captures $\\theta$ in $95\\%$ of samples."`
      }
    ]
  },

  {
    id: "a3q4",
    group: "Assignment 3",
    label: "Question 4",
    source: "assignment",
    title: "Testing a failure probability: level, power, LRT and sample size",
    difficulty: "Medium",
    topics: ["testing", "lrt", "distributions"],
    stem: `A current industry-standard engineering model predicts that a certain type of concrete block has a $40\\%$ chance of failure under a two-tonne load. A civil engineer obtains $50$ independent samples of such blocks, subjects each to a two-tonne load, and records the total number $X$ of blocks that broke. She decides she will reject $H_0 : p = 0.4$ in favour of $H_1 : p \\neq 0.4$ if $X \\le 15$ or $X \\ge 26$.

She then proposes an alternative model predicting a $50\\%$ failure probability, and wants to test whether her new model is more accurate than the current standard.`,
    parts: [
      { l: "a", t: `What is the significance level $\\alpha$ of the test with rejection region $\\{X \\le 15\\} \\cup \\{X \\ge 26\\}$?` },
      { l: "b", t: `The power of this test at a grid of values of $p$ is
<table>
<tr><th>$p$</th><td>0.1</td><td>0.2</td><td>0.3</td><td>0.35</td><td>0.45</td><td>0.5</td><td>0.6</td><td>0.7</td></tr>
<tr><th>power</th><td>$\\approx 1$</td><td>0.969</td><td>0.570</td><td>0.290</td><td>0.219</td><td>0.447</td><td>0.902</td><td>0.998</td></tr>
</table>
Describe the shape of the power curve. Is it symmetric about $p = 0.4$? Why or why not?` },
      { l: "c", t: `Construct a likelihood ratio test of $H_0 : p = 0.4$ versus $H_1 : p = 0.5$ based on the number of failures $X$ from $50$ trials.` },
      { l: "d", t: `Show that the LRT is equivalent to the test with rejection region $\\{X \\ge c\\}$ for some cutoff $c$.` },
      { l: "e", t: `Changes in industry standards should not be taken lightly, so a significance level of $1\\%$ is often used in engineering instead of $5\\%$. Find the cutoff value $c$ for carrying out this test at the $1\\%$ significance level.` },
      { l: "f", t: `If the alternative model is actually correct, what is the power of this test?` },
      { l: "g", t: `What sample size is needed to increase the power of this test to $90\\%$, while keeping the level of the test at $1\\%$?` }
    ],
    answer: [
      {
        l: "a",
        t: `Under $H_0$, $X \\sim \\mathrm{Bin}(50, 0.4)$, so the level is
<div class="display">$$\\alpha = P(X \\le 15) + P(X \\ge 26).$$</div>
Using software,
<pre><code>pbinom(15, 50, 0.4)
# [1] 0.09550171
1 - pbinom(25, 50, 0.4)
# [1] 0.05734376
pbinom(15, 50, 0.4) + 1 - pbinom(25, 50, 0.4)
# [1] 0.1528455</code></pre>
So
<div class="display">$$\\alpha = 0.0955 + 0.0573 = 0.1528 = 15.3\\%.$$</div>
This is a high level: the test would falsely reject a correct standard model about $15\\%$ of the time.`
      },
      {
        l: "b",
        t: `The power curve is U-shaped, attaining its minimum value $\\alpha = 0.153$ at $p = 0.4$ and rising towards $1$ as $p$ moves towards $0$ or towards $1$.

It is <strong>not</strong> symmetric about $p = 0.4$. For example the power at $p = 0.3$ is $0.570$, whereas at the equally distant $p = 0.5$ it is only $0.447$. The reason is that the rejection region is asymmetric relative to the mean of $50(0.4) = 20$: the cutoff $X \\le 15$ is $5$ below the mean while $X \\ge 26$ is $6$ above it, so the lower tail provides more probability under the null ($0.0955$ against $0.0573$) and correspondingly detects shifts to small $p$ more effectively.

The practical implication is that this test is better at detecting a failure probability lower than claimed than one that is higher.`
      },
      {
        l: "c",
        t: `The likelihood for $p$ given $X$ is
<div class="display">$$L(p \\mid X) = \\binom{50}{X}p^{X}(1-p)^{50-X},$$</div>
so the likelihood ratio for $H_0 : p = 0.4$ against $H_1 : p = 0.5$ is
<div class="display">$$\\frac{L(0.4 \\mid X)}{L(0.5 \\mid X)} = \\frac{0.4^{X}\\,0.6^{50-X}}{0.5^{X}\\,0.5^{50-X}} = \\left(\\frac{0.6}{0.5}\\right)^{50}\\left(\\frac{0.4}{0.6}\\right)^{X} = 1.2^{50}\\left(\\frac{2}{3}\\right)^{X}.$$</div>
The binomial coefficient cancels.`
      },
      {
        l: "d",
        t: `Writing the statistic as
<div class="display">$$\\Lambda = 1.2^{50}\\left(\\frac{2}{3}\\right)^{X},$$</div>
we see that $1.2^{50}$ is a constant and $2/3 < 1$, so $\\Lambda$ is a strictly decreasing function of $X$. Small values of $\\Lambda$ therefore correspond to large values of $X$, and the rejection rule "$\\Lambda \\le k$" is equivalent to
<div class="display">$$\\{X \\ge c\\}$$</div>
for some cutoff $c$. This makes sense: we reject the claim $p = 0.4$ in favour of $p = 0.5$ when we observe an unusually large number of failures.`
      },
      {
        l: "e",
        t: `We need the smallest $c$ with
<div class="display">$$P(X \\ge c) \\le 0.01, \\qquad X \\sim \\mathrm{Bin}(50, 0.4).$$</div>
Using software,
<pre><code>qbinom(0.99, 50, 0.4)
# [1] 28
1 - pbinom(28, 50, 0.4)
# [1] 0.007617426</code></pre>
So rejecting when $X \\ge 29$ gives a level of
<div class="display">$$P(X \\ge 29) = 0.00762 = 0.76\\%,$$</div>
the largest attainable level not exceeding $1\\%$ (the discreteness of the binomial prevents hitting $1\\%$ exactly). Hence $c = 29$.`
      },
      {
        l: "f",
        t: `With the decision rule $\\{X \\ge 29\\}$ and $X \\sim \\mathrm{Bin}(50, 0.5)$ under the alternative,
<pre><code>1 - pbinom(28, 50, 0.5)
# [1] 0.1611182</code></pre>
so
<div class="display">$$\\text{power} = P(X \\ge 29) = 0.161 = 16.1\\%.$$</div>
Despite the alternative being $10$ percentage points away from the null, the test rejects only about $16\\%$ of the time.`
      },
      {
        l: "g",
        t: `As $n$ changes, the cutoff must be recomputed to keep the level at $1\\%$ — it is meaningless to keep testing $X \\ge 29$ when $n$ grows, since the mean $0.4n$ of the null distribution moves. For each candidate $n$ we set $c-1$ to be the $99\\%$ quantile of $\\mathrm{Bin}(n,0.4)$ and compute the power $P(X \\ge c)$ under $p = 0.5$, increasing $n$ until the power reaches $0.9$:
<pre><code>n = 50
repeat {
  c.minus.1 = qbinom(0.99, n, 0.4)
  power = 1 - pbinom(c.minus.1, n, 0.5)
  if (power &gt;= 0.9) break
  n = n + 1
}
n            # 322
c.minus.1    # 149
power        # 0.9000703</code></pre>
So $n = 322$ blocks are needed, with the decision rule
<div class="display">$$\\text{reject } H_0 \\text{ if } X \\ge 150,$$</div>
which has power $0.900$. Because the alternative $p = 0.5$ is close to the null $p = 0.4$, a large sample is required to detect the difference reliably while protecting the Type I error at $1\\%.$`
      }
    ]
  },

  {
    id: "a3q5",
    group: "Assignment 3",
    label: "Question 5 (STAT2904)",
    source: "assignment",
    title: "Shortest confidence interval via the probability integral transform",
    difficulty: "Hard",
    topics: ["ci", "mle", "sampling"],
    stem: `Let $X_1,\\dots,X_n$ be an iid sample from a continuous distribution with density
<div class="display">$$f_\\theta(x) = \\frac{2x}{\\theta^{2}}, \\qquad 0 \\le x \\le \\theta,$$</div>
where $\\theta > 0$ is an unknown parameter.`,
    parts: [
      { l: "a", t: `Derive the MLE $\\hat{\\theta}$.` },
      { l: "b", t: `Find the cdf of $\\hat{\\theta}$.` },
      { l: "c", t: `Using part (b), construct a pivot for $\\theta$ via the cumulative probability transform method, and state the distribution of your pivot variable.` },
      { l: "d", t: `Using your pivot, show that any interval of the form
<div class="display">$$\\left(\\frac{X_{(n)}}{(a+0.95)^{1/2n}},\\; \\frac{X_{(n)}}{a^{1/2n}}\\right), \\qquad 0 \\le a \\le 0.05,$$</div>
defines a $95\\%$ confidence interval for $\\theta$.` },
      { l: "e", t: `Find the value of $a$ that minimises the length of the interval from part (d).` },
      { l: "f", t: `Give the shortest $95\\%$ confidence interval for $\\theta$ based on the realisations
<div class="display">$$1.227 \\quad 3.829 \\quad 4.813 \\quad 4.874 \\quad 5.142$$</div>` }
    ],
    answer: [
      {
        l: "a",
        t: `The likelihood is
<div class="display">$$L(\\theta \\mid \\mathbf{X}) = \\begin{cases}\\dfrac{2^{n}\\prod_i X_i}{\\theta^{2n}}, &amp; 0 < \\text{all } X_i < \\theta, \\\\[6pt] 0, &amp; \\text{otherwise}\\end{cases}$$</div>
On the region where it is positive, $\\theta^{-2n}$ is decreasing in $\\theta$, so the likelihood is largest for the smallest admissible $\\theta$. But $\\theta$ cannot be smaller than $X_{(n)} = \\max_i X_i$ without the likelihood switching to zero. Hence
<div class="display">$$\\hat{\\theta} = X_{(n)}.$$</div>`
      },
      {
        l: "b",
        t: `For $0 \\le m \\le \\theta$,
<div class="display">$$P(\\hat{\\theta} \\le m) = P(\\text{all } X_i \\le m) = \\prod_{i=1}^{n}P(X_i \\le m) = \\left(\\int_0^{m}\\frac{2x}{\\theta^{2}}dx\\right)^{n} = \\left(\\frac{m^{2}}{\\theta^{2}}\\right)^{n}.$$</div>
So the cdf of $\\hat{\\theta}$ is
<div class="display">$$F(m) = \\left(\\frac{m}{\\theta}\\right)^{2n}, \\qquad 0 \\le m \\le \\theta.$$</div>`
      },
      {
        l: "c",
        t: `Because $\\hat{\\theta}$ has a continuous distribution, the probability integral transform gives a pivot: applying the cdf,
<div class="display">$$U = F(\\hat{\\theta}) = \\left(\\frac{\\hat{\\theta}}{\\theta}\\right)^{2n} \\sim \\mathrm{Uniform}(0,1).$$</div>
The distribution of $U$ does not involve $\\theta$, so it is a pivot.`
      },
      {
        l: "d",
        t: `Starting from a probability statement about the uniform distribution, valid for any $0 \\le a \\le 0.05$,
<div class="display">$$\\begin{aligned}
0.95 &amp;= P(a \\le U \\le a + 0.95) \\\\
&amp;= P\\left(a \\le \\left(\\frac{\\hat{\\theta}}{\\theta}\\right)^{2n} \\le a + 0.95\\right) \\\\
&amp;= P\\left(a^{1/2n} \\le \\frac{\\hat{\\theta}}{\\theta} \\le (a+0.95)^{1/2n}\\right) \\\\
&amp;= P\\left(\\frac{\\hat{\\theta}}{(a+0.95)^{1/2n}} \\le \\theta \\le \\frac{\\hat{\\theta}}{a^{1/2n}}\\right).
\\end{aligned}$$</div>
Substituting $\\hat{\\theta} = X_{(n)}$ gives the stated interval, which therefore has $95\\%$ coverage for every $a \\in [0, 0.05]$. Note that a smaller $a$ shifts probability out of the lower tail of $U$ into the upper tail, trading off the two endpoints against each other.`
      },
      {
        l: "e",
        t: `The length of the interval is
<div class="display">$$\\hat{\\theta}\\left[\\frac{1}{a^{1/2n}} - \\frac{1}{(a+0.95)^{1/2n}}\\right].$$</div>
Differentiate the bracket with respect to $a$:
<div class="display">$$\\frac{d}{da}\\left[a^{-1/2n} - (a+0.95)^{-1/2n}\\right] = -\\frac{1}{2n}a^{-1/2n-1} + \\frac{1}{2n}(a+0.95)^{-1/2n-1}.$$</div>
Since $a < a + 0.95$, we have $a^{-1/2n-1} > (a+0.95)^{-1/2n-1}$, so the derivative is negative throughout $0 < a \\le 0.05$. The length is therefore a strictly decreasing function of $a$ on $[0,0.05]$, and is minimised at the largest allowable value
<div class="display">$$a = 0.05.$$</div>
Intuitively, pushing $a$ up moves probability into the lower tail of $U$, which lengthens the upper end of the $\\theta$ interval only slightly while shortening the lower end considerably. The resulting shortest interval is
<div class="display">$$\\left(X_{(n)},\\; \\frac{X_{(n)}}{(0.05)^{1/2n}}\\right),$$</div>
a one-sided interval with lower endpoint $X_{(n)}$.`
      },
      {
        l: "f",
        t: `For $n = 5$ the maximum observation is $x_{(n)} = 5.142$, and
<div class="display">$$(0.05)^{1/10} = 0.7413.$$</div>
So the shortest $95\\%$ interval is
<div class="display">$$\\left(5.142,\\; \\frac{5.142}{0.7413}\\right) = (5.142,\\; 6.938).$$</div>
We can be $95\\%$ confident that the true $\\theta$ that generated this dataset lies between $5.142$ and $6.938$. As expected, the lower limit is exactly the largest observation, since $\\theta$ cannot be smaller than any observation.`
      }
    ]
  },

  {
    id: "a3q6",
    group: "Assignment 3",
    label: "Question 6 (bonus)",
    source: "assignment",
    title: "A distribution-free interval for the population median",
    difficulty: "Hard",
    topics: ["ci", "distributions", "simulation"],
    stem: `Let $X_1,\\dots,X_{17}$ be a random sample of size $n = 17$ from some arbitrary continuous distribution with unknown population median $m$.`,
    parts: [
      { l: "a", t: `Show that the interval $[X_{(5)}, X_{(13)}]$ defines an (approximate) $95\\%$ confidence interval for the population median $m$. Here $X_{(5)}$ denotes the fifth smallest observation and $X_{(13)}$ the fifth largest.` },
      {
        l: "b",
        t: `Suppose the underlying distribution is actually $t_2$, which has median (and mean) $0$. A simulation of $B = 10{,}000$ samples of size $n = 17$ from $t_2$ gave the following comparison with the classical interval $\\bar{X} \\pm t_{16}^{(0.975)}S/\\sqrt{17}$:
<pre><code># coverage: proportion of intervals containing 0
mean(order.ci[,1] &lt;= 0 &amp; 0 &lt;= order.ci[,2])   # [1] 0.9525
mean(t.ci[,1] &lt;= 0 &amp; 0 &lt;= t.ci[,2])            # [1] 0.9634

# interval widths
summary(order.ci[,2] - order.ci[,1])
#    Min. 1st Qu. Median    Mean 3rd Qu.    Max.
#  0.2892  1.1830 1.4969  1.5632  1.8751  5.9480
summary(t.ci[,2] - t.ci[,1])
#    Min. 1st Qu. Median    Mean 3rd Qu.     Max.
#  0.5196  1.4269 1.8445  2.4368  2.5305 840.6009</code></pre>
Compare the relative merits of the two intervals for capturing the true median of $0$.`
      }
    ],
    answer: [
      {
        l: "a",
        t: `The interval $[X_{(5)}, X_{(13)}]$ fails to contain $m$ precisely when fewer than $5$ observations fall below $m$, or fewer than $5$ fall above $m$. Let $N$ be the number of observations below the median. Because the distribution is continuous, each observation is equally likely to fall below or above $m$, so
<div class="display">$$N \\sim \\mathrm{Binomial}(17,\\; 0.5).$$</div>
The interval contains $m$ exactly when $5 \\le N \\le 12$ (if $N \\le 4$ then $X_{(5)}$ lies above $m$; if $N \\ge 13$ then $X_{(13)}$ lies below $m$). Hence
<div class="display">$$\\begin{aligned}
P\\big(m \\notin [X_{(5)}, X_{(13)}]\\big) &amp;= P(N \\le 4) + P(N \\ge 13) \\\\
&amp;= 2\\,P(N \\le 4) \\quad\\text{(by symmetry of the binomial about } 8.5)\\\\
&amp;= 2\\,(0.02452) = 0.04904.
\\end{aligned}$$</div>
Using R,
<pre><code>2*pbinom(4, 17, 0.5)
# [1] 0.04904175</code></pre>
Therefore
<div class="display">$$P\\big(m \\in [X_{(5)}, X_{(13)}]\\big) = 1 - 0.0490 = 0.951,$$</div>
so the interval has approximately $95\\%$ coverage. The coverage is <em>exact</em> (given a continuous distribution and therefore no ties), and remarkably it holds for <em>every</em> continuous distribution — no model for the data is needed, only order statistics.`
      },
      {
        l: "b",
        t: `Both intervals achieve about $95\\%$ coverage: the order-statistic interval gives $0.9525$, matching almost exactly its exact coverage of $0.951$ from part (a), and the $t$ interval gives $0.9634$, slightly conservative.

The decisive difference is <strong>width</strong>. The median width is $1.50$ for the order-statistic interval against $1.84$ for the $t$ interval, and the mean width is $1.56$ against $2.44$.

The reason lies in the tails. The $t_2$ distribution has infinite variance, so $S$ is not a stable estimate of spread: a single very large observation inflates both $\\bar{X}$ and $S$, and the $t$ interval then becomes enormous. This is visible in the summary: the $t$ interval's width has a maximum of $840.6$ against only $5.95$ for the order-statistic interval. Because order statistics ignore the <em>magnitudes</em> of extreme observations and depend only on their ranks, they are completely insensitive to such outliers.

<strong>Conclusion.</strong> For heavy-tailed data the order-statistic interval is clearly preferable: it attains its designed coverage exactly, it is narrower on average, and — crucially — its width is <em>bounded</em> by the observed data rather than being at the mercy of a single wild observation. The $t$ interval's reliance on $\\bar{X}$ and $S$ is its weakness here, even though it is slightly conservative in coverage.`
      }
    ]
  }
);
