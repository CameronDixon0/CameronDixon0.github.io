/* Week 11 — Tutorial */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w11e1",
    week: 11,
    label: "Exercise 1",
    title: "Basic properties of the multinomial distribution",
    difficulty: "Medium",
    topics: ["distributions", "tables"],
    hint: {
      text: `For the marginal, sum the joint pmf over the other counts and recognise the remaining sum as a multinomial probability that equals $1$. For the covariance, compute $\\mathrm{E}(X_1X_2) = n(n-1)p_1p_2$.`,
      refs: ["w10l12"]
    },
    stem: `Let $\\mathbf{X} = (X_1, X_2, \\dots, X_K)^{\\top}$ be a random sample of counts from a multinomial distribution with parameters $\\mathbf{p} = (p_1, \\dots, p_K)^{\\top}$, such that $1 = p_1 + \\cdots + p_K$ and $n = X_1 + \\cdots + X_K$ is the sample size. Recall that the joint pmf is
<div class="display">$$P(X_1 = x_1, \\dots, X_K = x_K) = \\frac{n!}{x_1!\\,x_2!\\cdots x_K!}\\,p_1^{x_1}p_2^{x_2}\\cdots p_K^{x_K},$$</div>
for vectors $\\mathbf{x} = (x_1,\\dots,x_K)^{\\top}$ that sum to $n$.`,
    parts: [
      { l: "a", t: `Show that the marginal distribution of each count $X_k$ is $\\mathrm{Binomial}(n, p_k)$.` },
      { l: "b", t: `Hence show that $\\mathrm{E}(X_k) = np_k$ and $\\mathrm{Var}(X_k) = np_k(1-p_k)$.` },
      { l: "c", t: `Clearly the counts $X_k$ and $X_{k'}$ in any two categories $k$ and $k'$ are dependent (why?). Show that $\\mathrm{Cov}(X_k, X_{k'}) = -np_kp_{k'}$ for $k \\neq k'$.` },
      { l: "d", t: `For $K = 2$ categories, what is the correlation between the counts $X_1$ and $X_2$? (Do we really need a formula to deduce this?)` }
    ],
    answer: [
      {
        l: "a",
        t: `Without loss of generality consider the marginal distribution of $X_1$. Summing the joint pmf over all configurations of the other counts that leave the total at $n$,
<div class="display">$$\\begin{aligned}
P(X_1 = x_1) &amp;= \\sum_{x_2+\\cdots+x_K = n-x_1} \\frac{n!}{x_1!\\,x_2!\\cdots x_K!}\\,p_1^{x_1}p_2^{x_2}\\cdots p_K^{x_K} \\\\
&amp;= \\binom{n}{x_1}p_1^{x_1}(1-p_1)^{n-x_1}\\!\\!\\sum_{x_2+\\cdots+x_K=n-x_1}\\!\\!\\frac{(n-x_1)!}{x_2!\\cdots x_K!}\\left(\\frac{p_2}{1-p_1}\\right)^{x_2}\\!\\cdots\\left(\\frac{p_K}{1-p_1}\\right)^{x_K}.
\\end{aligned}$$</div>
The sum is $1$, because it is the total probability of a multinomial distribution on the remaining $K-1$ categories with probabilities $p_j/(1-p_1)$. Hence
<div class="display">$$P(X_1 = x_1) = \\binom{n}{x_1}p_1^{x_1}(1-p_1)^{n-x_1},$$</div>
the $\\mathrm{Binomial}(n,p_1)$ pmf. The argument is identical for any $k$.`
      },
      {
        l: "b",
        t: `Since $X_k \\sim \\mathrm{Binomial}(n,p_k)$,
<div class="display">$$\\mathrm{E}(X_k) = np_k \\quad\\text{and}\\quad \\mathrm{Var}(X_k) = np_k(1-p_k).$$</div>`
      },
      {
        l: "c",
        t: `The counts are dependent because they must sum to the fixed total $n$: if one count increases, the others must collectively decrease.

Consider $X_1$ and $X_2$. By the same argument as in part (a), their marginal joint distribution is trinomial:
<div class="display">$$P(X_1 = x_1, X_2 = x_2) = \\frac{n!}{x_1!\\,x_2!\\,(n-x_1-x_2)!}\\,p_1^{x_1}p_2^{x_2}(1-p_1-p_2)^{n-x_1-x_2}.$$</div>
Then
<div class="display">$$\\begin{aligned}
\\mathrm{E}(X_1X_2) &amp;= \\sum_{x_1,x_2} x_1x_2\\,P(X_1 = x_1, X_2 = x_2) \\\\
&amp;= \\sum \\frac{n!}{(x_1-1)!\\,(x_2-1)!\\,(n-x_1-x_2)!}\\,p_1^{x_1}p_2^{x_2}(1-p_1-p_2)^{n-x_1-x_2}.
\\end{aligned}$$</div>
Substituting $\\tilde{n} = n-2$, $\\tilde{x}_1 = x_1-1$, $\\tilde{x}_2 = x_2-1$ and using $n! = n(n-1)\\tilde{n}!$, this becomes $n(n-1)p_1p_2$ times the total probability of a $\\mathrm{Multinomial}(\\tilde{n}; p_1,p_2,\\dots,p_K)$, which is $1$. So
<div class="display">$$\\mathrm{E}(X_1X_2) = n(n-1)p_1p_2.$$</div>
Therefore
<div class="display">$$\\mathrm{Cov}(X_1,X_2) = \\mathrm{E}(X_1X_2) - \\mathrm{E}(X_1)\\mathrm{E}(X_2) = n(n-1)p_1p_2 - (np_1)(np_2) = -np_1p_2.$$</div>
The same argument applies to any pair $X_k, X_{k'}$.`
      },
      {
        l: "d",
        t: `For $K = 2$, $p_2 = 1-p_1$, so the covariance is $-np_1(1-p_1)$ and both variances equal $np_1(1-p_1)$. Hence
<div class="display">$$\\mathrm{corr}(X_1,X_2) = \\frac{-np_1(1-p_1)}{np_1(1-p_1)} = -1,$$</div>
i.e. they are perfectly negatively correlated. We did not need any formula for this: with only two categories, the count in the first completely determines the count in the second, since $X_2 = n - X_1$.`
      }
    ]
  },

  {
    id: "w11e2",
    week: 11,
    label: "Exercise 2",
    title: "Goodness-of-fit test for a die, and data snooping",
    difficulty: "Medium",
    exam: "Q5",
    topics: ["gof", "tables", "multiplicity"],
    hint: {
      text: `Pearson's statistic is $\\sum (O-E)^2/E$ with $E = 100/6$ and $5$ degrees of freedom. Compare $-2\\log\\Lambda$ with the same $\\chi^{2}_5$. For (g) the correction for having six faces to choose from is a Bonferroni multiplication.`,
      refs: ["w10l12", "w10l3"]
    },
    stem: `In an earlier tutorial a die was rolled $100$ times and the number of sixes was observed to be $25$. The full set of observed counts is
<table>
<tr><th>face</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>
<tr><th>counts</th><td>17</td><td>15</td><td>12</td><td>18</td><td>13</td><td>25</td></tr>
</table>
We are interested in testing whether this die is fair or loaded.`,
    parts: [
      { l: "a", t: `Write down the null and alternative hypotheses, both in words and mathematically in terms of the probability vector $\\mathbf{p} = (p_1,\\dots,p_6)^{\\top}$.` },
      { l: "b", t: `If the null hypothesis is true, what counts would we have expected to see for each face?` },
      { l: "c", t: `Compute (i) the generalized likelihood ratio $\\Lambda$, (ii) $-2\\log\\Lambda$, and (iii) Pearson's $\\chi^{2}$ test statistic for these data.` },
      { l: "d", t: `What is the distribution of Pearson's $\\chi^{2}$ statistic under the null hypothesis?` },
      { l: "e", t: `Compute and interpret a $p$-value for testing the fairness of this die. What do you conclude?` },
      { l: "f", t: `Earlier we found moderately strong evidence that $p_6 \\neq 1/6$ ($p$-value $0.043$). How do you reconcile the apparent contradiction with your conclusion in part (e)?` },
      { l: "g", t: `Suggest a quick way to correct the $p$-value of $0.043$. Do your conclusions change after applying this correction?` }
    ],
    answer: [
      {
        l: "a",
        t: `In words, $H_0$ is that the die is fair and $H_1$ is that it is loaded. Mathematically,
<div class="display">$$H_0 : \\mathbf{p} = \\mathbf{p}^{*} = \\left(\\tfrac{1}{6},\\dots,\\tfrac{1}{6}\\right)^{\\top} \\quad\\text{vs}\\quad H_1 : \\mathbf{p} \\neq \\mathbf{p}^{*},$$</div>
i.e. at least one $p_i \\neq 1/6$.`
      },
      { l: "b", t: `If the die is fair each face is expected $100/6 = 16.67$ times.` },
      {
        l: "c",
        t: `(i) The generalized likelihood ratio is
<div class="display">$$\\Lambda = \\frac{L(\\mathbf{p}^{*} \\mid \\mathbf{x})}{L(\\hat{\\mathbf{p}} \\mid \\mathbf{x})} = \\frac{(1/6)^{100}}{\\left(\\frac{17}{100}\\right)^{17}\\!\\left(\\frac{15}{100}\\right)^{15}\\!\\left(\\frac{12}{100}\\right)^{12}\\!\\left(\\frac{18}{100}\\right)^{18}\\!\\left(\\frac{13}{100}\\right)^{13}\\!\\left(\\frac{25}{100}\\right)^{25}} = 0.045.$$</div>
(ii) Hence $-2\\log\\Lambda = -2\\log(0.045) = 6.212$.

(iii) Pearson's statistic is
<div class="display">$$\\chi^{2} = \\sum_{i=1}^{6}\\frac{(O_i - E_i)^{2}}{E_i} = \\frac{(17-16.67)^2 + (15-16.67)^2 + (12-16.67)^2 + (18-16.67)^2 + (13-16.67)^2 + (25-16.67)^2}{16.67} = 6.559.$$</div>
Pearson's statistic and the exact GLRT are, again, very close numerically.`
      },
      { l: "d", t: `Under $H_0$, Pearson's $\\chi^{2}$ statistic has an approximate $\\chi^{2}_{5}$ distribution ($6$ cells minus $1$ constraint).` },
      {
        l: "e",
        t: `The $p$-value is $P(\\chi^{2}_{5} \\ge 6.559) = 0.256$. There is therefore no evidence that the die is loaded, and we retain the claim that it is fair.`
      },
      {
        l: "f",
        t: `The $p$-value of $0.043$ came from testing the "most unusual" category that we happened to notice in the data — the sixes. The $p$-value in part (e) takes into account the outcome of all six faces simultaneously.

If we look at the data first and then choose the most unusual subset of outcomes to test, we can almost always force a "significant" result. This is <em>data snooping</em> (or post-hoc hypothesising): the nominal $5\\%$ level is no longer valid because the hypothesis was chosen using the data.`
      },
      {
        l: "g",
        t: `Since there are six faces and any one of them could have been the most unusual, a quick Bonferroni correction multiplies the $p$-value by $6$:
<div class="display">$$0.043 \\times 6 = 0.26.$$</div>
After adjusting for multiplicity there is again no evidence that the die is loaded, consistent with the goodness-of-fit test.`
      }
    ]
  },

  {
    id: "w11e3",
    week: 11,
    label: "Exercise 3",
    title: "Are suicide rates constant throughout the year?",
    difficulty: "Easy",
    exam: "Q5",
    topics: ["gof"],
    hint: {
      text: `Expected counts are proportional to the number of days in each month. Degrees of freedom: twelve cells minus one constraint, so $11$.`,
      refs: ["w10l12", "w10l3"]
    },
    stem: `Are suicide rates constant throughout the year, or could they be affected by seasonal factors such as weather, holidays and financial cycles? The National Center for Health Statistics collected the following distribution of suicides in the United States by month in 1970.
<table>
<tr><th>Month</th><th>Suicides</th><th>Days</th></tr>
<tr><td>Jan.</td><td>1867</td><td>31</td></tr>
<tr><td>Feb.</td><td>1789</td><td>28</td></tr>
<tr><td>Mar.</td><td>1944</td><td>31</td></tr>
<tr><td>Apr.</td><td>2094</td><td>30</td></tr>
<tr><td>May.</td><td>2097</td><td>31</td></tr>
<tr><td>Jun.</td><td>1981</td><td>30</td></tr>
<tr><td>Jul.</td><td>1887</td><td>31</td></tr>
<tr><td>Aug.</td><td>2024</td><td>31</td></tr>
<tr><td>Sep.</td><td>1928</td><td>30</td></tr>
<tr><td>Oct.</td><td>2032</td><td>31</td></tr>
<tr><td>Nov.</td><td>1978</td><td>30</td></tr>
<tr><td>Dec.</td><td>1859</td><td>31</td></tr>
<tr><th>Total</th><th>23480</th><th>365</th></tr>
</table>`,
    parts: [
      { l: "a", t: `What was the overall rate of suicides per day throughout 1970?` },
      { l: "b", t: `If the suicide rate is indeed constant throughout the year, what counts would we have expected to see in each of the twelve months?` },
      { l: "c", t: `Compute Pearson's $\\chi^{2}$ statistic for these data. What is its distribution under the null?` },
      { l: "d", t: `Compute and interpret a $p$-value for testing whether the suicide rate is constant throughout the year. What is your conclusion?` },
      { l: "e", t: `Look at the signs and magnitudes of the individual relative deviations $(O_i - E_i)/\\sqrt{E_i}$ for each month. Is there any pattern? Qualitatively summarise your findings.` }
    ],
    answer: [
      { l: "a", t: `The overall rate is $23480/365 = 64.329$ suicides per day.` },
      {
        l: "b",
        t: `If the rate is constant, the expected count in each month is $64.329 \\times (\\text{number of days in that month})$, i.e. $E_i = 1994.19$ for a 31-day month and $E_i = 1929.86$ for a 30-day month, with $E_{\\text{Feb}} = 1801.21$.
<table>
<tr><th>Month</th><th>Observed</th><th>Expected</th><th>$(O-E)/\\sqrt{E}$</th></tr>
<tr><td>Jan.</td><td>1867</td><td>1994.19</td><td>$-2.85$</td></tr>
<tr><td>Feb.</td><td>1789</td><td>1801.21</td><td>$-0.29$</td></tr>
<tr><td>Mar.</td><td>1944</td><td>1994.19</td><td>$-1.12$</td></tr>
<tr><td>Apr.</td><td>2094</td><td>1929.86</td><td>$3.74$</td></tr>
<tr><td>May.</td><td>2097</td><td>1994.19</td><td>$2.30$</td></tr>
<tr><td>Jun.</td><td>1981</td><td>1929.86</td><td>$1.16$</td></tr>
<tr><td>Jul.</td><td>1887</td><td>1994.19</td><td>$-2.40$</td></tr>
<tr><td>Aug.</td><td>2024</td><td>1994.19</td><td>$0.67$</td></tr>
<tr><td>Sep.</td><td>1928</td><td>1929.86</td><td>$-0.04$</td></tr>
<tr><td>Oct.</td><td>2032</td><td>1994.19</td><td>$0.85$</td></tr>
<tr><td>Nov.</td><td>1978</td><td>1929.86</td><td>$1.10$</td></tr>
<tr><td>Dec.</td><td>1859</td><td>1994.19</td><td>$-3.03$</td></tr>
</table>`
      },
      {
        l: "c",
        t: `<div class="display">$$\\chi^{2} = \\sum_{i=1}^{12}\\frac{(O_i - E_i)^{2}}{E_i} = 47.37.$$</div>
Under the null the statistic has a $\\chi^{2}$ distribution with $11$ degrees of freedom: the null hypothesis completely specifies the rate in each month (proportional to the number of days), so there are $12$ cells minus $1$ constraint.`
      },
      {
        l: "d",
        t: `The $p$-value is $P(\\chi^{2}_{11} \\ge 47.37) = 1.85\\times10^{-6}$. If the rate of suicides were uniform throughout the year, deviations at least this large would occur by chance less than $0.0002\\%$ of the time. There is extremely strong evidence that the suicide rate is not constant throughout the year.`
      },
      {
        l: "e",
        t: `Looking at the relative deviations in the table: the largest negative values are January $(-2.85)$, December $(-3.03)$ and July $(-2.40)$, while the largest positive values are April $(3.74)$ and May $(2.30)$.

So the suicide rate appears lowest in the US winter months and highest during April/May, at the beginning of the third financial quarter. The pattern is suggestive but these data cannot establish causality.`
      }
    ]
  },

  {
    id: "w11e4",
    week: 11,
    label: "Exercise 4",
    title: "Assessing authorship via word usage",
    difficulty: "Medium",
    exam: "Q5",
    topics: ["tables"],
    hint: {
      text: `A test of homogeneity: $E_{ij} = (\\text{row}_i \\times \\text{col}_j)/N$ and $(r-1)(c-1)$ degrees of freedom. Pool Austen's three works first — that is what part (a) licenses you to do.`,
      refs: ["w10l3"]
    },
    stem: `Probabilistic models of word counts can be used to measure literary style, and such counts have settled controversies about disputed authorship. Morton (1978) counted the occurrences of six words in several works: chapters 1 and 3 of <em>Sense and Sensibility</em>, chapters 1, 2 and 3 of <em>Emma</em>, chapters 1 and 6 of <em>Sanditon</em> (by Austen), and chapters 12 and 24 of <em>Sanditon</em> (by an imitator).
<table>
<tr><th>Word</th><th>Sense &amp; Sensibility</th><th>Emma</th><th>Sanditon (Austen)</th><th>Sanditon (imitator)</th></tr>
<tr><td>a</td><td>147</td><td>186</td><td>101</td><td>83</td></tr>
<tr><td>an</td><td>25</td><td>26</td><td>11</td><td>29</td></tr>
<tr><td>this</td><td>32</td><td>39</td><td>15</td><td>15</td></tr>
<tr><td>that</td><td>94</td><td>105</td><td>37</td><td>22</td></tr>
<tr><td>with</td><td>59</td><td>74</td><td>28</td><td>43</td></tr>
<tr><td>without</td><td>18</td><td>10</td><td>10</td><td>4</td></tr>
<tr><th>Total</th><th>375</th><th>440</th><th>202</th><th>196</th></tr>
</table>`,
    parts: [
      { l: "a", t: `Are the relative frequencies of usage of these six words consistent across the three Austen works? The relevant counts were input and tested with
<pre><code>Austen.counts = c(147,186,101,
                  25, 26, 11,
                  32, 39, 15,
                  94,105, 37,
                  59, 74, 28,
                  18, 10, 10)
Austen.table = matrix(Austen.counts, nrow = 6, byrow = T)
chisq.test(Austen.table)

# Pearson's Chi-squared test
data:  Austen.table
X-squared = 12.271, df = 10, p-value = 0.267</code></pre>
State the hypotheses, check that the degrees of freedom are correct, and state your conclusion.` },
      { l: "b", t: `In light of your findings from part (a), the Austen counts can be pooled and tested against the imitator:
<pre><code>pooled.counts = apply(Austen.table, 1, sum)
Imitator.counts = c(83, 29, 15, 22, 43, 4)
combined.table = matrix(c(pooled.counts, Imitator.counts),
                        nrow = 6, byrow = F)
chisq.test(combined.table)

# Pearson's Chi-squared test
data:  combined.table
X-squared = 32.81, df = 5, p-value = 0.00041</code></pre>
What does this test assess, and what do you conclude? Why is it legitimate to pool Austen's three works here?` },
      { l: "c", t: `Look at the signs and magnitudes of the individual relative deviations $(O_i - E_i)/\\sqrt{E_i}$ for each of the six words. Which words were over- or under-used by the imitator?` }
    ],
    answer: [
      {
        l: "a",
        t: `$H_0$: the relative frequency of usage of these six words is the same across all three Austen works. $H_1$: at least one work uses these six words with different relative frequencies.

Across the three Austen works the word "a" appears $434$ times out of $1017$ words, so under homogeneity its expected count in <em>Sense and Sensibility</em> is $375 \\times 434/1017 = 160.03$, and similarly for the other cells ($E_{ij} = \\text{row}_i \\times \\text{col}_j / N$):
<table>
<tr><th>Word</th><th>S&amp;S</th><th>Emma</th><th>Sanditon (A)</th><th>Total</th></tr>
<tr><td>a</td><td>147 (160.03)</td><td>186 (187.77)</td><td>101 (86.20)</td><td>434</td></tr>
<tr><td>an</td><td>25 (22.86)</td><td>26 (26.82)</td><td>11 (12.31)</td><td>62</td></tr>
<tr><td>this</td><td>32 (31.71)</td><td>39 (37.21)</td><td>15 (17.08)</td><td>86</td></tr>
<tr><td>that</td><td>94 (87.02)</td><td>105 (102.10)</td><td>37 (46.88)</td><td>236</td></tr>
<tr><td>with</td><td>59 (59.37)</td><td>74 (69.66)</td><td>28 (31.98)</td><td>161</td></tr>
<tr><td>without</td><td>18 (14.01)</td><td>10 (16.44)</td><td>10 (7.55)</td><td>38</td></tr>
</table>
Pearson's statistic is
<div class="display">$$\\chi^{2} = \\sum_{i,j}\\frac{(O_{ij} - E_{ij})^{2}}{E_{ij}} = 12.271$$</div>
on $(6-1)\\times(3-1) = 10$ degrees of freedom. The $p$-value is $P(\\chi^{2}_{10} \\ge 12.271) = 0.267$, so we conclude that Austen's usage of these six words was consistent across the three works.`
      },
      {
        l: "b",
        t: `Given part (a), we can pool Austen's three works and test homogeneity against the imitator:
<table>
<tr><th>Word</th><th>Austen</th><th>Imitator</th></tr>
<tr><td>a</td><td>434 (433.5)</td><td>83 (83.5)</td></tr>
<tr><td>an</td><td>62 (76.3)</td><td>29 (14.7)</td></tr>
<tr><td>this</td><td>86 (84.7)</td><td>15 (16.3)</td></tr>
<tr><td>that</td><td>236 (216.3)</td><td>22 (41.7)</td></tr>
<tr><td>with</td><td>161 (171.0)</td><td>43 (33.0)</td></tr>
<tr><td>without</td><td>38 (35.2)</td><td>4 (6.8)</td></tr>
<tr><th>Total</th><th>1017</th><th>196</th></tr>
</table>
<div class="display">$$\\chi^{2} = \\sum_{i,j}\\frac{(O_{ij} - E_{ij})^{2}}{E_{ij}} = 32.81$$</div>
on $(6-1)\\times(2-1) = 5$ degrees of freedom. The $p$-value is $P(\\chi^{2}_{5} \\ge 32.81) = 0.00041 = 0.04\\%$. There is very strong evidence that the imitator's word usage was not consistent with Austen's.`
      },
      {
        l: "c",
        t: `The relative deviations reported by <code>chisq.test(...)$residuals</code> are
<pre><code>         [,1]      [,2]
[1,]  0.02586  -0.05890
[2,] -1.63668   3.72816
[3,]  0.14343  -0.32672
[4,]  1.33866  -3.04932
[5,] -0.76747   1.74822
[6,]  0.46957  -1.06963</code></pre>
Compared with Jane Austen, the imitator <strong>over-used "an"</strong> (deviation $+3.73$) and <strong>under-used "that"</strong> (deviation $-3.05$) by the largest margins, with "with" over-used ($+1.75$) to a lesser extent. Usage of "a" and "this" was nearly identical.`
      }
    ]
  }
);
