/* Week 9 — Tutorial */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w09e1",
    week: 9,
    label: "Exercise 1",
    title: "Robustness of t-methods to non-normal data",
    difficulty: "Easy",
    topics: ["simulation", "ci", "sampling"],
    hint: {
      text: `Compute $\\bar{x} \\pm t_{n-1,0.95}\\,s/\\sqrt{n}$. Then compare the coverage column with $0.90$: think about the skewness of the Poisson distribution when $\\mu$ is small, and about samples where every observation is zero.`,
      refs: ["w7l12", "w9l3"]
    },
    stem: `t-based methods are derived under the assumption of normal data. However, the main reason t-methods have proven so useful in almost all areas of applied science is that they are remarkably robust to departures from normality, even with moderate sample sizes. In this exercise we test the practical performance of the classical t-based confidence interval when applied to Poisson data, which are quite evidently not normal.`,
    parts: [
      { l: "a", t: `A sample of $n = 22$ Poisson observations with population mean $\\mu = 8.7654$ (unknown to the analyst) was generated with <code>rpois(22, 8.7654)</code>:
<pre><code>[1]  5  4  7  9  9 10  7  8  9 12 12 13 11  7 10 10  9 12 10  5 10  2</code></pre>
(i) Compute the sample mean and sample standard deviation.
(ii) Hence compute a classical t-based $90\\%$ confidence interval for the true population mean, and state it in the form "I am $90\\%$ confident that the true mean is between … and …".
(iii) Inspect the data: does this sample look like it came from a normal distribution? Why does that matter for the validity of the interval?` },
      { l: "b", t: `A coverage study was run with $N = 1{,}000$ repeated samples at each setting, recording whether the nominal $90\\%$ interval contained $\\mu$:
<pre><code>N = 1000
coverage90 = vector()

n  = 15
mu = 3.0

for (i in 1:N) {
  mydata = rpois(n, mu)
  xbar = mean(mydata)
  s    = sd(mydata)

  margin.of.error = qt(0.95, df = n - 1) * s/sqrt(n)
  lower = xbar - margin.of.error
  upper = xbar + margin.of.error

  coverage90[i] = (mu &gt;= lower) * (mu &lt;= upper)
}
mean(coverage90)</code></pre>
Repeating this across several settings gave
<table>
<tr><th>$\\mu$</th><th>$n$</th><th>coverage of nominal $90\\%$ interval</th></tr>
<tr><td>0.2</td><td>15</td><td>0.837</td></tr>
<tr><td>0.5</td><td>15</td><td>0.874</td></tr>
<tr><td>1.2</td><td>15</td><td>0.905</td></tr>
<tr><td>3.0</td><td>15</td><td>0.898</td></tr>
<tr><td>8.8</td><td>22</td><td>0.901</td></tr>
<tr><td>16.8</td><td>15</td><td>0.899</td></tr>
<tr><td>16.8</td><td>30</td><td>0.901</td></tr>
</table>
Does the $90\\%$ t-based confidence interval have the correct coverage in all these scenarios? Relate any pattern you see to the shape of the Poisson distribution.` },
      { l: "c", t: `What goes wrong with the interval in part (a) if every observation in the sample happens to be zero? What does this tell you about the limits of the robustness of t-methods?` }
    ],
    answer: [
      {
        l: "a",
        t: `(i) The sample has $n = 22$ observations summing to $191$, so
<div class="display">$$\\bar{x} = \\frac{191}{22} = 8.682, \\qquad s = 2.835.$$</div>

(ii) With $t_{21,\\,0.95} = 1.7207$,
<div class="display">$$\\bar{x} \\pm t_{n-1,\\,0.95}\\,\\frac{s}{\\sqrt{n}} = 8.682 \\pm 1.7207\\times\\frac{2.835}{\\sqrt{22}} = 8.682 \\pm 1.040,$$</div>
giving the $90\\%$ interval
<div class="display">$$(7.64,\\; 9.72).$$</div>
So "I am $90\\%$ confident that the true population mean is between $7.64$ and $9.72$."

(iii) The data do <em>not</em> look normal: they are integer-valued counts, with a sample that includes repeated values ($9$, $10$ and $12$ appear several times) and an observed range from $2$ to $13$. A normal distribution is continuous and symmetric; the Poisson is discrete and its variance equals its mean. The t-interval assumes the sample mean is normally distributed, which holds here only approximately, by the central limit theorem — so the interval's coverage is approximate, not exact. At $\\mu \\approx 8.8$ with $n = 22$ the approximation is evidently good enough, which is the point of the exercise.`
      },
      {
        l: "b",
        t: `For moderate and large $\\mu$ — say $\\mu \\gtrsim 1$ — the empirical coverage is very close to the nominal $90\\%$: $0.905$ at $\\mu = 1.2$, $0.898$ at $\\mu = 3$, $0.901$ at $\\mu = 8.8$, $0.899$ and $0.901$ at $\\mu = 16.8$. The t-interval is therefore remarkably robust to the non-normality of Poisson data at these sample sizes: the sample mean is approximately normal by the central limit theorem, and $s^2$ is a stable estimate of the variance (which for the Poisson equals $\\mu$).

The one clear failure is at very small $\\mu$, where the coverage drops to $0.837$ at $\\mu = 0.2$ and $0.874$ at $\\mu = 0.5$. Two things go wrong there. The Poisson distribution is severely right-skewed when $\\mu$ is small — most observations are $0$ with occasional larger values — so the central limit theorem has not yet taken effect at $n = 15$. And the t-interval is symmetric about $\\bar{x}$ while the sampling distribution of $\\bar{X}$ is not, so the two tails are mis-covered in opposite directions.

The pattern is exactly what you would expect: robustness improves as $\\mu$ (hence the "signal") grows relative to the discreteness and skewness, and as $n$ grows.`
      },
      {
        l: "c",
        t: `If every observation is zero then $\\bar{x} = 0$ and $s = 0$, so the margin of error is zero and the interval collapses to the single point $\\{0\\}$. That interval is degenerate and is certain to miss the true $\\mu > 0$, so it contributes a coverage failure.

This matters because the probability of an all-zero sample is far from negligible for small $\\mu$: for $\\mu = 0.2$ and $n = 15$ it is $e^{-15(0.2)} = e^{-3} \\approx 0.05$, i.e. about $5\\%$ of samples. Such samples were excluded from the coverage figures in part (b), which is part of why the small-$\\mu$ coverage looks as good as it does.

The general lesson: t-methods are robust to non-normality in the <em>shape</em> of the distribution, but they assume $s > 0$ and a continuous spread. They break down when the data are so discrete and sparse that a whole sample can be constant.`
      }
    ]
  },

  {
    id: "w09e2",
    week: 9,
    label: "Exercise 2",
    title: "Significance level, power, type I and type II errors",
    difficulty: "Easy",
    topics: ["testing"],
    hint: {
      text: `Each sentence is about one of three things: the level (a probability under $H_0$), the power (a probability under $H_1$), or the $p$-value. Keep those three separate and the true/false answers follow.`,
      refs: ["w8l3", "w9l3"]
    },
    stem: `Are each of the following sentences true or false? If a sentence is false, modify it appropriately so that it becomes true.`,
    parts: [
      { l: "a", t: `The significance level of a test is equal to the probability that the null hypothesis is true.` },
      { l: "b", t: `If the significance level of a test is decreased, the power would be expected to increase.` },
      { l: "c", t: `If a test is rejected at significance level $\\alpha$, then the probability that the null hypothesis is true equals $\\alpha$.` },
      { l: "d", t: `The probability that the null hypothesis is falsely rejected is equal to the power of the test.` },
      { l: "e", t: `A type I error occurs when the statistic falls in the rejection region of the test.` },
      { l: "f", t: `A type II error is more serious than a type I error.` },
      { l: "g", t: `The power of a test is determined by the null distribution of the test statistic.` },
      { l: "h", t: `The $p$-value is a random variable.` }
    ],
    answer: [
      {
        l: "a",
        t: `<strong>False.</strong> The significance level is the probability of rejecting the null hypothesis when it is in fact true: $\\alpha = P_{H_0}(\\text{reject } H_0)$. It says nothing about the prior probability that $H_0$ is true.`
      },
      {
        l: "b",
        t: `<strong>False.</strong> If the significance level is decreased the power would be expected to <em>decrease</em> as well — the rejection region shrinks, so it is harder to reject under either hypothesis.`
      },
      {
        l: "c",
        t: `<strong>False.</strong> If a test is rejected at significance level $\\alpha$, then the probability of having made a Type I error is $\\alpha$ — that is, $P(\\text{reject } H_0 \\mid H_0 \\text{ true}) = \\alpha$. It is not the probability that $H_0$ is true.`
      },
      {
        l: "d",
        t: `<strong>False.</strong> The probability that the null hypothesis is <em>correctly</em> rejected is equal to the power of the test. (Falsely rejecting $H_0$ is a Type I error, with probability $\\alpha$.)`
      },
      {
        l: "e",
        t: `<strong>False as stated.</strong> A Type I error occurs when the statistic falls in the rejection region <em>and</em> the null hypothesis is true.`
      },
      {
        l: "f",
        t: `<strong>Depends on the context; generally false.</strong> A Type I error (rejecting a true null, e.g. convicting an innocent defendant or approving an ineffective drug) is usually regarded as the more serious of the two.`
      },
      {
        l: "g",
        t: `<strong>False.</strong> The power is determined by the distribution of the test statistic under the <em>alternative</em>; the null distribution determines the <em>level</em> of the test.`
      },
      {
        l: "h",
        t: `<strong>True.</strong> The $p$-value is a function of the data, hence a random variable, and under a continuous null it has a $\\mathrm{Uniform}(0,1)$ distribution.`
      }
    ]
  },

  {
    id: "w09e3",
    week: 9,
    label: "Exercise 3",
    title: "Testing for a biased coin: level, power and the power curve",
    difficulty: "Easy",
    exam: "Q4",
    topics: ["testing", "distributions"],
    hint: {
      text: `$X \\sim \\mathrm{Bin}(10,p)$. The level is $P(\\text{reject} \\mid p = 0.5)$; the power at $p$ is the same sum of four binomial probabilities evaluated at $p$ instead of $0.5$.`,
      refs: ["w8l3", "w9l3"]
    },
    stem: `A coin is to be thrown independently $10$ times to test the hypothesis that the coin is fair versus the alternative that the coin is biased. A decision rule is proposed to reject the null hypothesis if either $0$ or $1$, or $9$ or $10$ heads are observed.`,
    parts: [
      { l: "a", t: `Identify the parameter of interest in this test and write down the null and alternative hypotheses in terms of this parameter.` },
      { l: "b", t: `What is the significance level of this test?` },
      { l: "c", t: `If in fact the probability of heads is $0.1$ (i.e. the coin is severely biased), what is the power of this test?` },
      { l: "d", t: `Evaluating the power of this test across the whole parameter space gives
<table>
<tr><th>$p$</th><td>0</td><td>0.1</td><td>0.2</td><td>0.3</td><td>0.4</td><td>0.5</td><td>0.6</td><td>0.7</td><td>0.8</td><td>0.9</td><td>1</td></tr>
<tr><th>power</th><td>1</td><td>0.736</td><td>0.376</td><td>0.150</td><td>0.048</td><td>0.022</td><td>0.048</td><td>0.150</td><td>0.376</td><td>0.736</td><td>1</td></tr>
</table>
Describe the shape of the power curve. What does it say about the ability of this test to detect small departures from fairness?` }
    ],
    answer: [
      {
        l: "a",
        t: `Let $p$ be the underlying probability of heads. Then $H_0 : p = 0.5$ versus $H_1 : p \\neq 0.5$.`
      },
      {
        l: "b",
        t: `Let $X$ be the number of heads in the $10$ tosses. The level is the probability of rejecting when $H_0$ is true; then $X \\sim \\mathrm{Bin}(10, 0.5)$ and
<div class="display">$$\\begin{aligned}
\\alpha &amp;= P_{H_0}(X = 0) + P_{H_0}(X = 1) + P_{H_0}(X = 9) + P_{H_0}(X = 10) \\\\
&amp;= 0.5^{10} + \\binom{10}{1}0.5^{10} + \\binom{10}{9}0.5^{10} + 0.5^{10} = \\frac{22}{1024} = 0.021.
\\end{aligned}$$</div>`
      },
      {
        l: "c",
        t: `Under the alternative value $p = 0.1$, $X \\sim \\mathrm{Bin}(10, 0.1)$, so
<div class="display">$$\\begin{aligned}
\\text{power} &amp;= P_{p=0.1}(X = 0) + P(X = 1) + P(X = 9) + P(X = 10) \\\\
&amp;= 0.9^{10} + \\binom{10}{1}(0.1)(0.9)^{9} + \\binom{10}{9}(0.1)^{9}(0.9) + 0.1^{10} = 0.736.
\\end{aligned}$$</div>`
      },
      {
        l: "d",
        t: `The curve is U-shaped and symmetric about $p = 0.5$, where it attains its minimum value $\\alpha = 0.022$. It rises to $1$ at $p = 0$ and $p = 1$, and is the same for $p$ and $1 - p$.

The test is powerful only against <em>severely</em> biased coins: at $p = 0.1$ the power is $0.736$, but at $p = 0.3$ it has fallen to $0.150$, and at $p = 0.4$ — only $0.1$ away from fairness — the power is just $0.048$. So this rejection region is very poorly suited to detecting mild bias. That is unsurprising: the rule only rejects on the two most extreme outcomes and discards all the information in the middle of the distribution, and with $n = 10$ tosses there is little information to begin with.`
      }
    ]
  },

  {
    id: "w09e4",
    week: 9,
    label: "Exercise 4",
    title: "Testing for a loaded die",
    difficulty: "Easy",
    exam: "Q5",
    topics: ["testing", "distributions"],
    hint: {
      text: `$X \\sim \\mathrm{Bin}(100, 1/6)$ under $H_0$. Note what the result <em>doesn't</em> account for: the outcome tested was chosen after seeing which face looked most unusual.`,
      refs: ["w8l3", "w10l3"]
    },
    stem: `We suspect a certain die to be loaded. Rolling it $100$ times we observe $25$ sixes. Is there enough evidence to justify our suspicion?`,
    parts: [
      { l: "a", t: `Identify the parameter of interest here and write down the null and alternative hypotheses in terms of this parameter.` },
      { l: "b", t: `Compute the $p$-value of this test and make a decision between the two hypotheses you specified in part (a).` }
    ],
    answer: [
      {
        l: "a",
        t: `Because only sixes are recorded, the parameter of interest is the proportion $p$ of sixes for this die. The null hypothesis is $H_0 : p = 1/6$ (a fair die) versus $H_1 : p \\neq 1/6$ (a loaded die).`
      },
      {
        l: "b",
        t: `Let $X$ be the number of sixes in $100$ rolls. Under $H_0$, $X \\sim \\mathrm{Bin}(100, 1/6)$. The one-sided $p$-value for $H_1 : p > 1/6$ is
<div class="display">$$P(X \\ge x_{\\text{obs}}) = P(X \\ge 25) = 0.022,$$</div>
using software or the normal approximation. The two-sided $p$-value for $H_1 : p \\neq 1/6$ is therefore
<div class="display">$$2 \\times 0.022 = 0.043.$$</div>
Since $0.043 < 0.05$ we can reject the null hypothesis in favour of the alternative at the $5\\%$ level.

<em>Caveat.</em> This $p$-value was computed after noticing that sixes were the most unusual outcome, so it does not account for the fact that any of the six faces could have been the "most unusual". See Week 11 Exercise 2(g) for the multiplicity correction.`
      }
    ]
  }
);
