/* Week 10 — Tutorial */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w10e1",
    week: 10,
    label: "Exercise 1",
    title: "Likelihood ratio test for exponential bulb lifetimes",
    difficulty: "Medium",
    exam: "Q4",
    topics: ["lrt", "testing"],
    hint: {
      text: `Turn the claim into a value of $\\lambda$: $P(X > 24) = 0.9$ means $\\lambda_0 = -\\log(0.9)/24$. Then form the likelihood ratio for $\\lambda_0$ against $\\lambda_1 > \\lambda_0$ and note it is small exactly when $X$ is small.`,
      refs: ["w8l3", "w9l12"]
    },
    stem: `A manufacturer advertises that $90\\%$ of their LED light bulbs last over 24 months before failure. To test whether this claim is an exaggeration, one light bulb is randomly selected and tested, and its time-to-failure $X$ is recorded. Let $X \\sim \\mathrm{Exp}(\\lambda)$, with pdf and cdf
<div class="display">$$f_\\lambda(x) = \\lambda e^{-\\lambda x} \\quad\\text{and}\\quad F_\\lambda(x) = 1 - e^{-\\lambda x}, \\qquad x \\ge 0,$$</div>
where $\\lambda > 0$ is an unknown parameter, the instantaneous rate of failure.`,
    parts: [
      { l: "a", t: `Convert the manufacturer's claim into a null hypothesis $H_0$ about $\\lambda$. Also write down the alternative hypothesis $H_1$.` },
      { l: "b", t: `Construct the likelihood ratio test for testing $H_0$ against $H_1$ based on the datum $X$, and show that it reduces to the test with rejection region $\\{X \\le d\\}$ for some critical value $d$. Does this test make intuitive sense?` },
      { l: "c", t: `Find the critical value $d$ so that the Type I error rate of this test is controlled at $5\\%$.` },
      { l: "d", t: `Is the test from parts (b) and (c) the uniformly most powerful test at the $5\\%$ level for this scenario? Briefly explain why, or why not.` },
      { l: "e", t: `Suppose that after 12 months and 12 days of usage the light bulb died. Based on the observed outcome, would you accept or reject the manufacturer's claim?` },
      { l: "f", t: `Supplement your decision by computing and interpreting a $p$-value.` }
    ],
    answer: [
      {
        l: "a",
        t: `"$90\\%$ of bulbs last over 24 months" means $P(X > 24) = 0.9$, i.e. $P(X \\le 24) = 0.1$. Using the cdf,
<div class="display">$$0.1 = F_\\lambda(24) = 1 - e^{-24\\lambda} \\quad\\Longrightarrow\\quad \\lambda = \\frac{\\log(10/9)}{24} \\approx 0.0044.$$</div>
So $H_0 : \\lambda = 0.0044$ versus the one-sided alternative $H_1 : \\lambda > 0.0044$ (a higher failure rate than claimed).`
      },
      {
        l: "b",
        t: `For a simple alternative $\\lambda = \\lambda_1 > \\lambda_0$, the likelihood ratio is
<div class="display">$$\\frac{L(\\lambda_0 \\mid X)}{L(\\lambda_1 \\mid X)} = \\frac{\\lambda_0}{\\lambda_1}\\,e^{(\\lambda_1-\\lambda_0)X}.$$</div>
Since $\\lambda_1 > \\lambda_0$, this ratio is small when $X$ is small. So the LRT rejects for small values of $X$, i.e. the rejection region is $\\{X \\le d\\}$ for some critical value $d$.

This makes intuitive sense: the shorter the observed lifetime, the more evidence against the claim that the failure rate is only $0.0044$.`
      },
      {
        l: "c",
        t: `To control the Type I error at $5\\%$ under $H_0 : \\lambda = 0.0044$, choose $d$ such that
<div class="display">$$0.05 = P_{\\lambda=0.0044}(X \\le d) = 1 - e^{-0.0044d} \\quad\\Longrightarrow\\quad d = -\\frac{\\log 0.95}{0.0044} \\approx 11.68.$$</div>
The decision rule is therefore $\\{X \\le 11.68\\}$ months.`
      },
      {
        l: "d",
        t: `Yes. By the Neyman–Pearson lemma the likelihood ratio test is most powerful for testing the simple null $\\lambda = \\lambda_0$ against any simple alternative $\\lambda = \\lambda_1 > \\lambda_0$. The resulting rejection region $\\{X \\le 11.68\\}$ does not depend on the particular $\\lambda_1$, so the test is in fact uniformly most powerful against the composite alternative $H_1 : \\lambda > \\lambda_0$.`
      },
      {
        l: "e",
        t: `The observed lifetime is 12 months and 12 days, roughly $x_{\\text{obs}} = 12.4$ months. Since $12.4 > 11.68$, the observation does not lie in the rejection region, so we retain $H_0 : \\lambda = 0.0044$ at the $5\\%$ level — we accept the manufacturer's claim on this single observation.`
      },
      {
        l: "f",
        t: `The $p$-value for this one-sided test is
<div class="display">$$P_{H_0}(X \\le x_{\\text{obs}}) = 1 - e^{-0.0044\\times 12.4} \\approx 0.053 = 5.3\\%.$$</div>
If the true failure rate were $0.0044$, a lifetime as short as 12.4 months (or shorter) would occur about $5.3\\%$ of the time. That is not especially rare, so there is only marginal evidence against the claim — consistent with our decision to retain $H_0$.`
      }
    ]
  },

  {
    id: "w10e2",
    week: 10,
    label: "Exercise 2",
    title: "Testing the precision of an apparatus",
    difficulty: "Hard",
    exam: "Q4",
    topics: ["lrt", "testing", "distributions"],
    hint: {
      text: `With a known mean, $\\sum (X_i - \\mu)^2/\\sigma_0^2 \\sim \\chi^{2}_n$; once you estimate $\\mu$ you lose a degree of freedom and get $\\chi^{2}_{n-1}$. Set the critical value at the upper $5\\%$ point, and remember the sample mean and variance are independent for normal data.`,
      refs: ["w8l3", "w9l12"]
    },
    stem: `In engineering, the precision of a random process is $1/\\sigma^{2}$, where $\\sigma^{2}$ is its variance. Higher precision means smaller variance. A machine in the physics lab that measures gravity has been correctly calibrated, so measurements from it follow a normal distribution with mean $\\mu = 9.807\\,\\mathrm{m/s^{2}}$ and some variance $\\sigma^{2}$. The industry-standard for the allowable variance of such machines is $\\sigma_0^{2}$. We make $n$ independent measurements $X_1,\\dots,X_n$ on this machine at random times over three days.`,
    parts: [
      { l: "a", t: `Write down the null and alternative hypotheses in terms of $\\sigma^{2}$.` },
      { l: "b", t: `Write down the likelihood function $L(\\sigma^{2} \\mid \\mathbf{X})$ for $\\sigma^{2}$ given the data.` },
      { l: "c", t: `Construct the likelihood ratio test and show that it is equivalent to the test with rejection region $\\left\\{\\sum_{i=1}^{n}(X_i - 9.807)^{2} \\ge c\\right\\}$ for some critical value $c$.` },
      { l: "d", t: `What is the distribution of the test statistic $\\sum_{i=1}^{n}(X_i - 9.807)^{2}$ under the null?` },
      { l: "e", t: `Explain how the critical value $c$ should be chosen so that the Type I error rate is $5\\%$.` },
      { l: "f", t: `Now suppose we are also unsure about the calibration, so both $\\mu$ and $\\sigma^{2}$ are unknown. A natural modification replaces the assumed mean $9.807$ with the sample mean $\\bar{X}$, giving the rejection region $\\left\\{\\sum_{i=1}^{n}(X_i - \\bar{X})^{2} \\ge d\\right\\}$. What is the distribution of this test statistic under the null?` },
      { l: "g", t: `Explain how the critical value $d$ should be chosen so that the Type I error rate is $5\\%$.` },
      { l: "h", t: `Suppose the industry-standard is $\\sigma_0^{2} = 0.022$ and $n = 18$ samples are to be taken. Write out the decision rule explicitly.` },
      {
        l: "i",
        t: `A machine exhibiting a bias can be re-calibrated by a technician, but if its precision is not up to standard it must go back to the manufacturer. Testing therefore follows a sequential process: first test precision; if it passes, test the mean. If both tests are carried out at the $5\\%$ level, what is the overall chance that a perfectly good machine will fail this test?`
      },
      { l: "j", t: `If we want the overall Type I error rate of this sequential test to be $5\\%$, at what level should the two individual tests be carried out?` }
    ],
    answer: [
      { l: "a", t: `$H_0 : \\sigma^{2} = \\sigma_0^{2}$ versus $H_1 : \\sigma^{2} > \\sigma_0^{2}$.` },
      {
        l: "b",
        t: `Since $X_1,\\dots,X_n$ are iid $\\mathrm{N}(9.807, \\sigma^{2})$,
<div class="display">$$L(\\sigma^{2} \\mid \\mathbf{X}) = \\left(\\frac{1}{\\sqrt{2\\pi\\sigma^{2}}}\\right)^{n}\\exp\\left\\{-\\frac{1}{2\\sigma^{2}}\\sum_{i=1}^{n}(X_i - 9.807)^{2}\\right\\}.$$</div>`
      },
      {
        l: "c",
        t: `For testing $\\sigma^{2} = \\sigma_0^{2}$ against $\\sigma^{2} = \\sigma_1^{2}$ with $\\sigma_1^{2} > \\sigma_0^{2}$,
<div class="display">$$\\frac{L(\\sigma_0^{2} \\mid \\mathbf{X})}{L(\\sigma_1^{2} \\mid \\mathbf{X})} = \\left(\\frac{\\sigma_1^{2}}{\\sigma_0^{2}}\\right)^{n/2}\\exp\\left\\{-\\frac{1}{2}\\left(\\frac{1}{\\sigma_0^{2}} - \\frac{1}{\\sigma_1^{2}}\\right)\\sum_{i=1}^{n}(X_i - 9.807)^{2}\\right\\}.$$</div>
Because $\\sigma_1^{2} > \\sigma_0^{2}$, this ratio is small when the sum of squares is large. Hence the LRT reduces to rejecting for
<div class="display">$$\\sum_{i=1}^{n}(X_i - 9.807)^{2} \\ge c.$$</div>`
      },
      {
        l: "d",
        t: `Under $H_0 : \\sigma^{2} = \\sigma_0^{2}$, standard normal theory with a known mean gives
<div class="display">$$\\frac{1}{\\sigma_0^{2}}\\sum_{i=1}^{n}(X_i - 9.807)^{2} \\sim \\chi^{2}_{n}.$$</div>`
      },
      {
        l: "e",
        t: `Writing $\\chi^{2}_{n}(0.95)$ for the upper $5\\%$ point of the $\\chi^{2}_{n}$ distribution,
<div class="display">$$0.05 = P_{H_0}\\left(\\chi^{2}_{n} \\ge \\chi^{2}_{n}(0.95)\\right) = P_{H_0}\\left(\\sum_{i=1}^{n}(X_i - 9.807)^{2} \\ge \\sigma_0^{2}\\chi^{2}_{n}(0.95)\\right),$$</div>
so take $c = \\sigma_0^{2}\\chi^{2}_{n}(0.95)$.`
      },
      {
        l: "f",
        t: `When $\\mu$ is also unknown, the sum of squares about $\\bar{X}$ loses one degree of freedom:
<div class="display">$$\\frac{1}{\\sigma_0^{2}}\\sum_{i=1}^{n}(X_i - \\bar{X})^{2} \\sim \\chi^{2}_{n-1} \\quad\\text{under } H_0.$$</div>`
      },
      {
        l: "g",
        t: `As in part (e), take $d = \\sigma_0^{2}\\chi^{2}_{n-1}(0.95)$, the upper $5\\%$ point of the $\\chi^{2}_{n-1}$ distribution.`
      },
      {
        l: "h",
        t: `Here $n = 18$ and $\\sigma_0^{2} = 0.022$, so we need the upper $5\\%$ point of $\\chi^{2}_{17}$:
<pre><code>qchisq(0.95, 17)
# [1] 27.58711</code></pre>
The decision rule is to reject (send the machine back) when
<div class="display">$$\\sum_{i=1}^{18}(X_i - \\bar{X})^{2} \\ge 0.022 \\times 27.587 \\approx 0.607.$$</div>
Equivalently, since $s^{2} = \\frac{1}{17}\\sum_{i=1}^{18}(X_i - \\bar{X})^{2}$, the rule is $s^{2} \\ge 0.0357$, or $s \\ge 0.189$.`
      },
      {
        l: "i",
        t: `If both tests are carried out at the $5\\%$ level, a perfectly good machine passes each individual test with probability $0.95$. The first test depends only on the sample variance and the second only on the sample mean, and for normal data these are independent. So the chance of passing both is
<div class="display">$$0.95 \\times 0.95 = 0.9025,$$</div>
and the chance of failing the overall sequential test is
<div class="display">$$1 - 0.9025 = 0.0975 = 9.75\\%,$$</div>
almost double the nominal $5\\%$. This is a multiple-testing problem.`
      },
      {
        l: "j",
        t: `We want a common level $\\alpha$ for the two tests such that the chance of passing both is $95\\%$:
<div class="display">$$(1-\\alpha)^{2} = 0.95 \\quad\\Longrightarrow\\quad \\alpha = 1 - \\sqrt{0.95} \\approx 0.0253 = 2.53\\%.$$</div>
(The simple Bonferroni correction $5\\%/2 = 2.5\\%$ is a quick, slightly conservative way to achieve almost the same thing.)`
      }
    ]
  },

  {
    id: "w10e3",
    week: 10,
    label: "Exercise 3*",
    title: "Sums of independent Poisson random variables",
    difficulty: "Medium",
    topics: ["distributions"],
    hint: {
      text: `This is a convolution: sum over the ways the first observation can take the value $x_1$, then collapse the sum with the binomial theorem.`,
      refs: ["w10l12", "l01"]
    },
    stem: `The Poisson distribution is useful for modelling counts over a period of time, space or volume. This question investigates the distribution of the sum of independent Poisson random variables.`,
    parts: [
      { l: "a", t: `Let $y$ be any nonnegative integer. Show, by induction or otherwise, the binomial theorem:
<div class="display">$$(\\lambda_1 + \\lambda_2)^{y} = \\sum_{j=0}^{y} \\frac{y!}{(y-j)!\\,j!}\\,\\lambda_1^{y-j}\\lambda_2^{j}.$$</div>` },
      { l: "b", t: `Let $X_1 \\sim \\mathrm{Poisson}(\\lambda_1)$ independently of $X_2 \\sim \\mathrm{Poisson}(\\lambda_2)$, and write $Y = X_1 + X_2$. Argue why
<div class="display">$$P(Y = y) = \\sum_{x_1=0}^{y} P(X_1 = x_1)\\,P(X_2 = y - x_1), \\qquad y = 0,1,2,\\dots$$</div>
(This is called a convolution.)` },
      { l: "c", t: `Using parts (a) and (b), or otherwise, show that
<div class="display">$$P(Y = y) = \\frac{(\\lambda_1+\\lambda_2)^{y}}{y!}\\,e^{-(\\lambda_1+\\lambda_2)}, \\qquad y = 0,1,2,\\dots$$</div>
Hence, what is the distribution of $Y$?` },
      { l: "d", t: `Now let $X_1,X_2,\\dots,X_n$ be an iid sample from a $\\mathrm{Poisson}(\\lambda)$ distribution. Using part (c) or otherwise, show that $Y = X_1 + \\cdots + X_n$ follows a $\\mathrm{Poisson}(n\\lambda)$ distribution.` }
    ],
    answer: [
      {
        l: "a",
        t: `<strong>Base cases.</strong> $y = 0$ and $y = 1$ are trivial; $y = 2$ gives $(\\lambda_1+\\lambda_2)^{2} = \\lambda_1^{2} + 2\\lambda_1\\lambda_2 + \\lambda_2^{2}$, matching the formula.

<strong>Inductive step.</strong> Suppose the formula holds for some integer $y$. Note that
<div class="display">$$(\\lambda_1+\\lambda_2)^{y+1} = \\lambda_1(\\lambda_1+\\lambda_2)^{y} + (\\lambda_1+\\lambda_2)^{y}\\lambda_2.$$</div>
Substituting the inductive hypothesis into both terms and collecting powers of $\\lambda_1,\\lambda_2$ gives
<div class="display">$$(\\lambda_1+\\lambda_2)^{y+1} = \\lambda_1^{y+1} + \\sum_{j=1}^{y}\\left[\\binom{y}{j} + \\binom{y}{j-1}\\right]\\lambda_1^{y+1-j}\\lambda_2^{j} + \\lambda_2^{y+1}.$$</div>
By Pascal's rule,
<div class="display">$$\\binom{y}{j} + \\binom{y}{j-1} = \\frac{y!}{(y-j)!\\,j!} + \\frac{y!}{(y-j+1)!\\,(j-1)!} = \\frac{(y+1)!}{(y+1-j)!\\,j!} = \\binom{y+1}{j},$$</div>
so
<div class="display">$$(\\lambda_1+\\lambda_2)^{y+1} = \\sum_{j=0}^{y+1}\\binom{y+1}{j}\\lambda_1^{y+1-j}\\lambda_2^{j},$$</div>
which is the formula with $y$ replaced by $y+1$. This completes the induction.`
      },
      {
        l: "b",
        t: `For the event $\\{X_1 + X_2 = y\\}$, the first observation can take any value $x_1$ from $0$ to $y$, but then necessarily $X_2 = y - x_1$. Because $X_1$ and $X_2$ are independent, summing over these disjoint ways of achieving the event gives
<div class="display">$$P(X_1 + X_2 = y) = \\sum_{x_1=0}^{y} P(X_1 = x_1)\\,P(X_2 = y - x_1).$$</div>`
      },
      {
        l: "c",
        t: `Starting from the convolution,
<div class="display">$$\\begin{aligned}
P(Y = y) &amp;= \\sum_{x_1=0}^{y} e^{-\\lambda_1}\\frac{\\lambda_1^{x_1}}{x_1!}\\;e^{-\\lambda_2}\\frac{\\lambda_2^{y-x_1}}{(y-x_1)!} \\\\
&amp;= \\frac{e^{-(\\lambda_1+\\lambda_2)}}{y!}\\sum_{x_1=0}^{y}\\frac{y!}{x_1!\\,(y-x_1)!}\\lambda_1^{x_1}\\lambda_2^{y-x_1}
= \\frac{e^{-(\\lambda_1+\\lambda_2)}}{y!}(\\lambda_1+\\lambda_2)^{y},
\\end{aligned}$$</div>
using the binomial theorem from part (a). This is exactly the $\\mathrm{Poisson}(\\lambda_1+\\lambda_2)$ pmf, so
<div class="display">$$Y = X_1 + X_2 \\sim \\mathrm{Poisson}(\\lambda_1 + \\lambda_2).$$</div>`
      },
      {
        l: "d",
        t: `Apply part (c) repeatedly: $X_1 + X_2 \\sim \\mathrm{Poisson}(2\\lambda)$, then $(X_1+X_2) + X_3 \\sim \\mathrm{Poisson}(3\\lambda)$, and so on. By induction,
<div class="display">$$Y = X_1 + \\cdots + X_n \\sim \\mathrm{Poisson}(n\\lambda).$$</div>`
      }
    ]
  },

  {
    id: "w10e4",
    week: 10,
    label: "Exercise 4",
    title: "Hypothesis tests for the Poisson call rate",
    difficulty: "Medium",
    exam: "Q4",
    topics: ["testing", "mle", "distributions"],
    hint: {
      text: `Under $H_0$ the total count is $\\mathrm{Poisson}(15 \\times 7.3)$. Rejecting for $\\bar{X} \\ge c$ is the same as rejecting for the total $\\ge 15c$ — find the smallest attainable level not exceeding $5\\%$.`,
      refs: ["w9l12", "w9l3"]
    },
    stem: `Suppose the number of enquiries coming into a call-centre follows a Poisson distribution. An employee is paid on the assumption that the call rate is $\\lambda_0 = 7.3$ calls per hour, but suspects the true rate is higher. The company randomly samples $n = 15$ one-hour blocks over two weeks and records $X_1,\\dots,X_{15}$.`,
    parts: [
      { l: "a", t: `Write down the null and alternative hypotheses being tested.` },
      { l: "b", t: `Show that the MLE of the underlying rate $\\lambda$ is the same as the method of moments estimator, namely $\\bar{X}$.` },
      { l: "c", t: `A decision rule of the form $\\bar{X} \\ge c$ is proposed. How should the critical value $c$ be set so that the Type I error is no more than $5\\%$? <em>[Hint: the sum of iid Poisson$(\\lambda)$ variables is Poisson$(n\\lambda)$.]</em>` },
      { l: "d", t: `If the true call rate is $9.0$ calls per hour, what is the power of this test? Interpret the power in a sentence.` },
      { l: "e", t: `Starting from the level you computed in part (c), the power at selected values of the true call rate is
<table>
<tr><th>$\\lambda$</th><td>7.9</td><td>8.5</td><td>9.7</td><td>10.3</td><td>10.9</td></tr>
<tr><th>power</th><td>0.203</td><td>0.494</td><td>0.935</td><td>0.987</td><td>0.998</td></tr>
</table>
Describe the shape of the power curve across $\\lambda \\ge 7.3$. At roughly what true call rate does the test first achieve $80\\%$ power, and what does that imply about the sample size in use?` },
      { l: "f", t: `The observed numbers of calls in the 15 blocks were
<div class="display">$$7 \\quad 11 \\quad 10 \\quad 11 \\quad 6 \\quad 7 \\quad 10 \\quad 9 \\quad 7 \\quad 5 \\quad 11 \\quad 5 \\quad 9 \\quad 6 \\quad 18$$</div>
Decide between the two hypotheses.` },
      { l: "g", t: `Supplement your decision by computing a $p$-value.` }
    ],
    answer: [
      { l: "a", t: `$H_0 : \\lambda = 7.3$ versus the one-sided alternative $H_1 : \\lambda > 7.3$.` },
      {
        l: "b",
        t: `The likelihood is
<div class="display">$$L(\\lambda \\mid \\mathbf{X}) = \\prod_{i=1}^{15}\\frac{\\lambda^{X_i}}{X_i!}\\,e^{-\\lambda} \\propto e^{-15\\lambda}\\,\\lambda^{X_1+\\cdots+X_{15}},$$</div>
so the log-likelihood is $\\ell(\\lambda) = -15\\lambda + (X_1+\\cdots+X_{15})\\log\\lambda + \\text{constant}$. Setting the derivative to zero,
<div class="display">$$0 = \\frac{d\\ell}{d\\lambda} = -15 + \\frac{X_1+\\cdots+X_{15}}{\\lambda} \\quad\\Longrightarrow\\quad \\hat{\\lambda} = \\frac{X_1+\\cdots+X_{15}}{15} = \\bar{X},$$</div>
which coincides with the method of moments estimator. ($\\ell$ is concave in $\\lambda$, so this is the maximum.)`
      },
      {
        l: "c",
        t: `The rule $\\{\\bar{X} \\ge c\\}$ is equivalent to $\\{X_1+\\cdots+X_{15} \\ge 15c\\}$. Under $H_0$ the total count is $\\mathrm{Poisson}(15 \\times 7.3) = \\mathrm{Poisson}(109.5)$. Using software,
<div class="display">$$P(\\mathrm{Poisson}(109.5) \\ge 127) = 0.055, \\qquad P(\\mathrm{Poisson}(109.5) \\ge 128) = 0.045.$$</div>
So rejecting when $X_1+\\cdots+X_{15} \\ge 128$, i.e. when $\\bar{X} \\ge 8.53$, has Type I error just below $5\\%$. Because the test statistic is discrete, this is the largest attainable level not exceeding $5\\%$.`
      },
      {
        l: "d",
        t: `If $\\lambda = 9.0$ then the total is $\\mathrm{Poisson}(15 \\times 9.0) = \\mathrm{Poisson}(135)$, so
<div class="display">$$\\text{power} = P_{\\lambda=9.0}(X_1+\\cdots+X_{15} \\ge 128) = P(\\mathrm{Poisson}(135) \\ge 128) \\approx 0.738.$$</div>
In words: if the true call rate is really $9.0$ calls per hour, there is about a $73.8\\%$ chance that this test correctly rejects the (too low) claimed rate of $7.3$.`
      },
      {
        l: "e",
        t: `<pre><code>lambda = (730:1100)/100
power  = 1 - ppois(127, 15*lambda)
plot(lambda, power, type = "l")</code></pre>
The curve increases monotonically from the level $0.045$ at $\\lambda = 7.3$ towards $1$, and is sigmoid in shape: it is flat near the null because the test cannot easily distinguish $\\lambda = 7.3$ from a value just above it, then rises steeply through the region where the data carry most information, and finally flattens out near $1$.

Interpolating between the tabulated values, the power reaches $0.8$ at about $\\lambda = 9.16$: the values at $8.5$ ($0.494$) and $9.7$ ($0.935$) bracket it, and the crossing lies close to the lower end because the curve is already steep there. Solving directly,
<div class="display">$$P(\\mathrm{Poisson}(15\\times 9.1) \\ge 128) \\approx 0.778, \\qquad P(\\mathrm{Poisson}(15\\times 9.2) \\ge 128) \\approx 0.814,$$</div>
so the $80\\%$ threshold is at $\\lambda \\approx 9.16$ calls per hour.

That threshold is far above the null value, and the steep part of the curve lies between roughly $8$ and $10$ calls per hour. With only $n = 15$ one-hour blocks the test therefore needs an increase of about $25\\%$ over the claimed rate before it reliably detects overpayment. This is the standard sample-size trade-off: more blocks would shift the curve to the left and make moderate departures detectable.`
      },
      {
        l: "f",
        t: `The observed total is $132$ (so $\\bar{x} = 132/15 = 8.8$). Since $132 \\ge 128$, equivalently $8.8 \\ge 8.53$, we reject $H_0 : \\lambda = 7.3$ in favour of $H_1 : \\lambda > 7.3$. The data support the employee's suspicion that the true call rate is higher than she is being paid for.`
      },
      {
        l: "g",
        t: `The $p$-value is the probability, under $H_0$, of a test statistic at least as extreme as observed:
<div class="display">$$P_{H_0}(X_1+\\cdots+X_{15} \\ge 132) = P(\\mathrm{Poisson}(109.5) \\ge 132) \\approx 0.020.$$</div>
If the call rate really were only $7.3$ per hour, a total this large or larger would occur only about $2\\%$ of the time by chance — reasonably strong evidence against the null claim.`
      }
    ]
  },

  {
    id: "w10e5",
    week: 10,
    label: "Exercise 5",
    title: "One-sided confidence intervals for the Poisson rate",
    difficulty: "Medium",
    exam: "Q4",
    topics: ["ci", "testing", "distributions"],
    hint: {
      text: `Invert the test: the confidence set is exactly the set of $\\lambda_0$ values you would <em>not</em> reject. So find the boundary $\\lambda_0$ at which the $p$-value crosses $0.05$.`,
      refs: ["w9l3", "w7l12"]
    },
    stem: `In the lectures it was shown that there is generally no pivot transformation for discrete data such as Binomial or Poisson data. For large samples the central limit theorem approximates the distribution of $\\bar{X}$, but with only $n = 15$ samples that is not justified. Instead we can construct confidence intervals for the Poisson rate $\\lambda$ by inverting hypothesis tests.

Using the observed data from the previous exercise,
<div class="display">$$7 \\quad 11 \\quad 10 \\quad 11 \\quad 6 \\quad 7 \\quad 10 \\quad 9 \\quad 7 \\quad 5 \\quad 11 \\quad 5 \\quad 9 \\quad 6 \\quad 18,$$</div>
recall that we rejected $H_0 : \\lambda = 7.3$ in favour of $H_1 : \\lambda > 7.3$ at the $5\\%$ level.`,
    parts: [
      { l: "a", t: `Suppose the null value was $\\lambda_0 = 7.5$ instead. Would we still reject $H_0 : \\lambda = 7.5$ in favour of $H_1 : \\lambda > 7.5$ at the $5\\%$ level? Answer by finding the $p$-value.` },
      { l: "b", t: `Suppose the null value was $\\lambda_0 = 7.6$ instead. Would we still reject at the $5\\%$ level? Answer by finding the $p$-value.` },
      { l: "c", t: `Show that the largest $\\lambda_0$ value that we would still reject at the $5\\%$ level is $\\lambda_0 = 7.579$ (to 3 decimal places).` },
      { l: "d", t: `Using analogous calculations to part (c), compute a $90\\%$ right one-sided confidence interval for $\\lambda$ based on the observed data. Interpret the interval in a sentence.` }
    ],
    answer: [
      {
        l: "a",
        t: `The observed total is $132$. If $\\lambda_0 = 7.5$ then under $H_0$ the total is $\\mathrm{Poisson}(15 \\times 7.5) = \\mathrm{Poisson}(112.5)$, so
<div class="display">$$\\text{$p$-value} = P(\\mathrm{Poisson}(112.5) \\ge 132) \\approx 0.039.$$</div>
Since $0.039 < 0.05$ we would still reject $H_0 : \\lambda = 7.5$ at the $5\\%$ level.`
      },
      {
        l: "b",
        t: `If $\\lambda_0 = 7.6$ the total is $\\mathrm{Poisson}(15 \\times 7.6) = \\mathrm{Poisson}(114)$, so
<div class="display">$$\\text{$p$-value} = P(\\mathrm{Poisson}(114) \\ge 132) \\approx 0.053.$$</div>
Since $0.053 > 0.05$ we would now retain $H_0 : \\lambda = 7.6$ at the $5\\%$ level.`
      },
      {
        l: "c",
        t: `Searching for the boundary between parts (a) and (b),
<div class="display">$$P(\\mathrm{Poisson}(15 \\times 7.579) \\ge 132) \\approx 0.04998, \\qquad P(\\mathrm{Poisson}(15 \\times 7.580) \\ge 132) \\approx 0.05012.$$</div>
So the largest $\\lambda_0$ we would still reject at the $5\\%$ level is $\\lambda_0 = 7.579$.

Hence any $\\lambda_0$ in $(7.580, \\infty)$ would be retained in the test of $H_0 : \\lambda = \\lambda_0$ versus $H_1 : \\lambda > \\lambda_0$ at the $5\\%$ level. Equivalently, "we can be $95\\%$ confident that the true call rate is at least $7.58$ calls per hour" — a right one-sided $95\\%$ confidence interval $(7.580, \\infty)$, constructed by inverting the test. The interval is precisely the set of parameter values that would be retained as the null.`
      },
      {
        l: "d",
        t: `Repeating the search at the $10\\%$ level, the largest $\\lambda_0$ still rejected at the $10\\%$ level is $\\lambda_0 \\approx 7.834$. So a $90\\%$ right one-sided confidence interval for $\\lambda$ is
<div class="display">$$(7.834,\\; \\infty).$$</div>
We can be $90\\%$ confident that the true call rate is at least $7.834$ calls per hour.

Note this bound is larger (tighter) than the $95\\%$ bound from part (c): a lower confidence level gives a less conservative interval.`
      }
    ]
  },

  {
    id: "w10e6",
    week: 10,
    label: "Exercise 6",
    title: "Power curves, sample size and relative effect size",
    difficulty: "Hard",
    topics: ["testing", "lrt", "simulation"],
    hint: {
      text: `The power depends on $\\sqrt{n}(c-\\mu_1)/\\sigma$, so only the <em>relative</em> effect $\\delta = \\mu_1/\\sigma$ and the sample size matter — which is why the $\\sigma = 1$ and $\\sigma = 10$ curves have the same shape.`,
      refs: ["w9l3", "w8l3"]
    },
    stem: `Let $X_1,X_2,\\dots,X_n$ be a random sample from a $\\mathrm{N}(\\mu, 1^{2})$ distribution, where the population mean $\\mu$ is an unknown parameter.`,
    parts: [
      { l: "a", t: `Construct the likelihood ratio test of $H_0 : \\mu = 0$ versus $H_1 : \\mu = \\mu_1 > 0$, and show that it reduces to the decision rule $\\{\\bar{X} \\ge c\\}$ for some critical value $c$.` },
      { l: "b", t: `For sample size $n = 5$: (i) find the value $c$ such that the level of the test is $\\alpha = 0.01$; (ii) hence compute the power at alternative values $\\mu_1 = 0.4, 0.8, 1.2, 1.6, 2.0$, and sketch the power curve over $0 \\le \\mu_1 \\le 2$.` },
      { l: "c", t: `Repeat part (b) for sample sizes $n = 10, 20, 40$, giving
<table>
<tr><th>$\\mu_1$</th><th>$n=10$</th><th>$n=20$</th><th>$n=40$</th></tr>
<tr><td>0.4</td><td>0.144</td><td>0.296</td><td>0.581</td></tr>
<tr><td>0.8</td><td>0.581</td><td>0.895</td><td>0.997</td></tr>
<tr><td>1.2</td><td>0.929</td><td>0.999</td><td>1.000</td></tr>
<tr><td>1.6</td><td>0.997</td><td>1.000</td><td>1.000</td></tr>
<tr><td>2.0</td><td>1.000</td><td>1.000</td><td>1.000</td></tr>
</table>
Combine these with the values you obtained for $n = 5$ in part (b). What happens to the power at a fixed $\\mu_1$ as the sample size grows?` },
      { l: "d", t: `Now suppose $X_1,\\dots,X_n$ are a random sample from a $\\mathrm{N}(\\mu, 10^{2})$ distribution. Repeating parts (a)–(c) gives
<table>
<tr><th>$\\mu_1$</th><th>$n=10$</th><th>$n=20$</th><th>$n=40$</th></tr>
<tr><td>4</td><td>0.144</td><td>0.296</td><td>0.581</td></tr>
<tr><td>8</td><td>0.581</td><td>0.895</td><td>0.997</td></tr>
<tr><td>12</td><td>0.929</td><td>0.999</td><td>1.000</td></tr>
<tr><td>16</td><td>0.997</td><td>1.000</td><td>1.000</td></tr>
<tr><td>20</td><td>1.000</td><td>1.000</td><td>1.000</td></tr>
</table>
Compare this table with the one in part (c).` },
      { l: "e", t: `What do you notice about the graphs in part (c) and the graphs in part (d)?` },
      { l: "f", t: `In a medical trial, $\\sigma = 1.1$ mmol/L is the day-to-day variability in LDL cholesterol levels. Suppose a new drug can improve cholesterol levels by $0.6$ mmol/L on average. Using your graphs, what sample size is needed to correctly reject $H_0 : \\mu = 0$ with power at least $80\\%$?` }
    ],
    answer: [
      {
        l: "a",
        t: `The likelihood is
<div class="display">$$L(\\mu \\mid \\mathbf{X}) = \\left(\\frac{1}{\\sqrt{2\\pi}}\\right)^{n}\\exp\\left\\{-\\frac{1}{2}\\sum_{i=1}^{n}(X_i - \\mu)^{2}\\right\\}.$$</div>
The likelihood ratio for $H_0 : \\mu = 0$ against $\\mu = \\mu_1 > 0$ is
<div class="display">$$\\frac{L(0 \\mid \\mathbf{X})}{L(\\mu_1 \\mid \\mathbf{X})} = \\exp\\left\\{-\\mu_1\\sum_{i=1}^{n}X_i + \\frac{n\\mu_1^{2}}{2}\\right\\}.$$</div>
Since $\\mu_1 > 0$, this ratio is small when $\\sum_i X_i$ is large. So the LRT is equivalent to rejecting when $\\sum_i X_i \\ge d$, which is the same as $\\{\\bar{X} \\ge c\\}$ for some critical value $c$.`
      },
      {
        l: "b",
        t: `Under $H_0$, $\\bar{X} \\sim \\mathrm{N}(0, 1/n)$, so $\\sqrt{n}\\bar{X} \\sim \\mathrm{N}(0,1)$.

<strong>(i)</strong> We require
<div class="display">$$0.01 = P(\\mathrm{N}(0,1) \\ge 2.326) = P_{H_0}(\\sqrt{5}\\,\\bar{X} \\ge 2.326) = P_{H_0}(\\bar{X} \\ge 1.04),$$</div>
so $c = 2.326/\\sqrt{5} = 1.04$.

<strong>(ii)</strong> Under the alternative, $\\bar{X} \\sim \\mathrm{N}(\\mu_1, 1/n)$ and
<div class="display">$$\\text{power}(\\mu_1) = P_{\\mu_1}(\\bar{X} \\ge 1.04) = P\\left(\\mathrm{N}(0,1) \\ge \\sqrt{5}(1.04 - \\mu_1)\\right).$$</div>
Evaluating this at the requested alternatives,
<table>
<tr><th>$\\mu_1$</th><td>0.4</td><td>0.8</td><td>1.2</td><td>1.6</td><td>2.0</td></tr>
<tr><th>power</th><td>0.076</td><td>0.296</td><td>0.640</td><td>0.895</td><td>0.984</td></tr>
</table>`
      },
      {
        l: "c",
        t: `In general the $1\\%$ cutoff for sample size $n$ is $c_n = 2.326/\\sqrt{n}$ and
<div class="display">$$\\text{power}(\\mu_1) = P\\left(\\mathrm{N}(0,1) \\ge \\sqrt{n}(c_n - \\mu_1)\\right).$$</div>
Applying this at each $n$,
<table>
<tr><th>$n$</th><th>$c_n$</th><th>power at $\\mu_1 = 0.4$</th><th>at $0.8$</th><th>at $1.2$</th></tr>
<tr><td>5</td><td>1.040</td><td>0.076</td><td>0.296</td><td>0.640</td></tr>
<tr><td>10</td><td>0.736</td><td>0.144</td><td>0.581</td><td>0.929</td></tr>
<tr><td>20</td><td>0.520</td><td>0.296</td><td>0.895</td><td>0.999</td></tr>
<tr><td>40</td><td>0.368</td><td>0.581</td><td>0.997</td><td>1.000</td></tr>
</table>
This agrees with the values found for $n = 5$ in part (b). Larger sample sizes give higher power (a steeper curve) for detecting the same alternative $\\mu_1$.`
      },
      {
        l: "d",
        t: `Now $\\sigma = 10$. The LRT again reduces to $\\{\\bar{X} \\ge c\\}$; under $H_0$, $\\bar{X} \\sim \\mathrm{N}(0, 100/n)$, so the $1\\%$ cutoff is
<div class="display">$$c_n = \\frac{10 \\times 2.326}{\\sqrt{n}}$$</div>
and
<div class="display">$$\\text{power}(\\mu_1) = P\\left(\\mathrm{N}(0,1) \\ge \\frac{\\sqrt{n}(c_n - \\mu_1)}{10}\\right).$$</div>
Evaluating this over $0 \\le \\mu_1 \\le 20$ gives the table in the question. The curves have exactly the same shape as in part (c), but with the $\\mu_1$-axis stretched by a factor of $10$.`
      },
      {
        l: "e",
        t: `The two sets of graphs are identical in shape apart from the scale of the horizontal axis, which is stretched by exactly the factor by which $\\sigma$ increased. This shows that the power of the test depends on the sample size and the <em>relative</em> effect size $\\delta = \\mu_1/\\sigma$ (the signal-to-noise ratio), not on the absolute effect size $\\mu_1$ alone.`
      },
      {
        l: "f",
        t: `Here $\\sigma = 1.1$ and $\\mu_1 = 0.6$, so the relative effect size is
<div class="display">$$\\delta = \\frac{0.6}{1.1} \\approx 0.545.$$</div>
Reading off the power curves from part (c) — which are indexed by $\\delta$ for $\\sigma = 1$ — we need the sample size at which the curve reaches $0.80$ at $\\mu_1 \\approx 0.545$. This happens at about $n = 40$ (power $\\approx 0.87$ at $n = 40$, $\\approx 0.82$ at $n = 35$), so we should recruit roughly 35–40 patients per group to detect this effect with at least $80\\%$ power at the $\\alpha = 0.01$ level.

This combination — Type I error restricted to $\\alpha = 0.01$, and power $\\ge 80\\%$ for a postulated relative effect size $\\delta$ — is a common guideline for setting sample sizes in medical studies.`
      }
    ]
  }
);
