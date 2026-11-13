/* Week 12 — Tutorial */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w12e1",
    week: 12,
    label: "Exercise 1",
    title: "Grades and majors: association in a contingency table",
    difficulty: "Medium",
    exam: "Q5",
    topics: ["tables", "testing"],
    hint: {
      text: `A test of association: $H_0$ says $p_{ij} = p_{i\\bullet}p_{\\bullet j}$. R's warning is about expected counts below $5$, which is exactly when the exact (permutation) test is preferable.`,
      refs: ["w10l3"]
    },
    stem: `Grades from a statistics class, classified by the students' majors, are tabulated below.
<table>
<tr><th>Grade</th><th>Psychology</th><th>Biology</th><th>Other</th><th>Total</th></tr>
<tr><td>A</td><td>8</td><td>15</td><td>13</td><td>36</td></tr>
<tr><td>B</td><td>14</td><td>19</td><td>15</td><td>48</td></tr>
<tr><td>C</td><td>15</td><td>4</td><td>7</td><td>26</td></tr>
<tr><td>D–F</td><td>3</td><td>1</td><td>4</td><td>8</td></tr>
<tr><th>Total</th><th>40</th><th>39</th><th>39</th><th>118</th></tr>
</table>
Is there an association between grade and major?`,
    parts: [
      { l: "a", t: `Write down the null and alternative hypotheses, either in words or using symbols.` },
      { l: "b", t: `As a first attempt, Pearson's $\\chi^{2}$ test of association was carried out:
<pre><code>grades = c(8,15,13,14,19,15,15,4,7,3,1,4)
table1 = matrix(grades, byrow = T, nrow = 4)
chisq.test(table1)

# Pearson's Chi-squared test
data:  table1
X-squared = 12.183, df = 6, p-value = 0.058

# Warning message:
# In chisq.test(table1) : Chi-squared approximation may be incorrect

chisq.test(table1)$expected
         [,1]     [,2]     [,3]
[1,] 12.20339 11.89831 11.89831
[2,] 16.27119 15.86441 15.86441
[3,]  8.81356  8.59322  8.59322
[4,]  2.71186  2.64407  2.64407</code></pre>
What is the conclusion of this test? Why did R give a warning message? Look at the calculated expected counts.` },
      { l: "c", t: `Write out the logical argument behind Fisher's exact test in the context of this scenario.` },
      { l: "d", t: `Fisher's exact test was carried out with a simulated $p$-value based on $10^{5}$ replicates:
<pre><code>&gt; chisq.test(table1, simulate.p.value = T, B = 100000)

# Pearson's Chi-squared test with simulated p-value
# (based on 1e+05 replicates)
data:  table1
X-squared = 12.183, df = NA, p-value = 0.05623</code></pre>
Write a short conclusion summarising your findings, and explain why this $p$-value is more trustworthy than the one in part (b).` }
    ],
    answer: [
      {
        l: "a",
        t: `In words, $H_0$ is that a student's statistics grade is independent of (unrelated to) their major, and $H_1$ is that they are associated.

In symbols,
<div class="display">$$H_0 : p_{ij} = p_{i\\bullet}\\times p_{\\bullet j} \\quad\\text{for } i = 1,2,3,4 \\text{ and } j = 1,2,3,$$</div>
where $p_{i\\bullet}$ is the overall proportion of students with grade $i$ and $p_{\\bullet j}$ the overall proportion in major $j$. $H_1$ is that not all joint probabilities factorise into the product of their marginals.`
      },
      {
        l: "b",
        t: `Taken naively, there is moderate-to-marginal evidence that grades are related to major at the $5\\%$ level, since the $p$-value is $0.058$ — just above $0.05$.

R warns because some expected counts are below $5$: the entire bottom row has expected counts of about $2.71$, $2.64$ and $2.64$. When there are fewer than $5$ expected counts in some cells, the asymptotic $\\chi^{2}$ approximation to Pearson's statistic is no longer valid.`
      },
      {
        l: "c",
        t: `Fisher's exact test conditions on the observed margins. If grades are unrelated to major, then $36$ students would have received A's, $48$ B's, $26$ C's and $8$ D–F's <em>regardless</em> of their majors; and, if major is unrelated to statistical ability, then $40$ students would have chosen Psychology, $39$ Biology and $39$ Other <em>regardless</em> of their grades.

So under the null of no association the row and column totals are fixed, but the counts inside the table could have been any configuration with those same margins. Fisher's exact test enumerates (or samples from) all such tables, and computes the probability of observing a table at least as extreme as the one obtained.`
      },
      {
        l: "d",
        t: `Fisher's exact test gives a simulated $p$-value of $0.05623$, which is close to the Pearson $p$-value of $0.058$ but does not rely on the doubtful $\\chi^{2}$ approximation.

If there were no association between grades and majors, counts at least this unusual would have occurred about $5.6\\%$ of the time by chance alone. There is, at best, only marginal evidence of an association.`
      }
    ]
  },

  {
    id: "w12e2",
    week: 12,
    label: "Exercise 2",
    title: "Weight gain and protein diet: a one-way ANOVA by hand",
    difficulty: "Easy",
    exam: "Q6",
    topics: ["anova"],
    hint: {
      text: `$\\mathrm{SS}_{\\text{diet}} = 5\\sum_j(\\bar{y}_{j\\bullet}-\\bar{y}_{\\bullet\\bullet})^2$ and $\\mathrm{SS}_{\\text{residual}}$ is the within-group sum. Degrees of freedom: $3-1 = 2$ between, and $3\\times(5-1) = 12$ within.`,
      refs: ["w11l12", "w11l3"]
    },
    stem: `To investigate weight gain and diet quality, 15 male weaning rats were randomly assigned to one of three protein diets. Their weight gains (in grams) after one week were
<table>
<tr><th>Diet</th><th colspan="5">weight gain (g)</th><th>group mean</th></tr>
<tr><td>Low</td><td>3.89</td><td>3.87</td><td>3.26</td><td>2.70</td><td>3.82</td><td>3.51</td></tr>
<tr><td>Medium</td><td>8.54</td><td>9.32</td><td>8.76</td><td>9.30</td><td>10.45</td><td>9.27</td></tr>
<tr><td>High</td><td>20.39</td><td>24.22</td><td>30.91</td><td>22.78</td><td>26.33</td><td>24.93</td></tr>
</table>
In this exercise we manually demonstrate the ANOVA sum-of-squares decomposition.`,
    parts: [
      { l: "a", t: `Write down the one-way ANOVA model corresponding to this experiment.` },
      { l: "b", t: `State the null and alternative hypotheses associated with this ANOVA.` },
      { l: "c", t: `Compute (i) the sample means $\\bar{Y}_{j\\bullet}$ of each group and (ii) the overall sample mean $\\bar{Y}_{\\bullet\\bullet}$ of all observations.` },
      {
        l: "d",
        t: `Compute (i) the between-groups sum of squares $\\mathrm{SS}_{\\text{diet}} = 5\\sum_j (\\bar{Y}_{j\\bullet} - \\bar{Y}_{\\bullet\\bullet})^{2}$; (ii) the within-groups residual sum of squares $\\mathrm{SS}_{\\text{residual}} = \\sum_{j,i}(Y_{ji} - \\bar{Y}_{j\\bullet})^{2}$; (iii) their sum; (iv) the total sum of squares $\\mathrm{SS}_{\\text{total}} = \\sum_{j,i}(Y_{ji} - \\bar{Y}_{\\bullet\\bullet})^{2}$.`
      },
      { l: "e", t: `What are the degrees of freedom associated with $\\mathrm{SS}_{\\text{diet}}$, $\\mathrm{SS}_{\\text{residual}}$ and $\\mathrm{SS}_{\\text{total}}$?` },
      {
        l: "f",
        t: `Using your calculations from (d)–(e), complete the ANOVA table:
<table>
<tr><th>Source</th><th>df</th><th>SS</th><th>MS</th><th>$F$</th><th>$P(F)$</th></tr>
<tr><td>Diet</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Residual</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>Total</td><td></td><td></td><td></td><td></td><td></td></tr>
</table>
What do you conclude about weight gain and protein diet levels?`
      },
      {
        l: "g",
        t: `The same analysis can be produced in R with <code>anova(lm(weight.gain ~ diet))</code>, where <code>weight.gain</code> stacks the $15$ observations and <code>diet</code> is a factor with levels <code>"Low"</code>, <code>"Medium"</code> and <code>"High"</code>.

Why is it legitimate to fit this model with <code>lm</code> rather than with a dedicated ANOVA routine? What does that tell you about the relationship between ANOVA and linear regression, and what would you expect the printed degrees of freedom to be?`
      }
    ],
    answer: [
      {
        l: "a",
        t: `<div class="display">$$Y_{ji} = \\mu_j + \\varepsilon_{ji}, \\qquad \\varepsilon_{ji} \\overset{\\text{iid}}{\\sim} \\mathrm{N}(0,\\sigma^{2}), \\qquad j = 1,2,3, \\quad i = 1,\\dots,5.$$</div>`
      },
      { l: "b", t: `$H_0 : \\mu_1 = \\mu_2 = \\mu_3$ versus $H_1$: not all group means are the same.` },
      {
        l: "c",
        t: `(i) $\\bar{Y}_{\\text{Low}\\bullet} = (3.89+3.87+3.26+2.70+3.82)/5 = 3.51$ g; $\\bar{Y}_{\\text{Med}\\bullet} = 9.27$ g; $\\bar{Y}_{\\text{High}\\bullet} = 24.93$ g.

(ii) $\\bar{Y}_{\\bullet\\bullet} = (3.89+3.87+\\cdots+26.33)/15 = 12.57$ g.`
      },
      {
        l: "d",
        t: `(i) The between-groups sum of squares is
<div class="display">$$\\begin{aligned}
\\mathrm{SS}_{\\text{diet}} &amp;= 5\\sum_j (\\bar{Y}_{j\\bullet} - \\bar{Y}_{\\bullet\\bullet})^{2} \\\\
&amp;= 5\\left[(3.51-12.57)^{2} + (9.27-12.57)^{2} + (24.93-12.57)^{2}\\right] = \\mathbf{1228.27}\\ \\mathrm{g}^{2}.
\\end{aligned}$$</div>
(ii) Summing the squared deviations within each group,
<div class="display">$$\\mathrm{SS}_{\\text{residual}} = \\sum_{j,i}(Y_{ji} - \\bar{Y}_{j\\bullet})^{2} = \\mathbf{66.74}\\ \\mathrm{g}^{2}.$$</div>
(iii) $\\mathrm{SS}_{\\text{diet}} + \\mathrm{SS}_{\\text{residual}} = 1228.27 + 66.74 = \\mathbf{1295.01}\\ \\mathrm{g}^{2}$.

(iv) $\\mathrm{SS}_{\\text{total}} = \\sum_{j,i}(Y_{ji} - \\bar{Y}_{\\bullet\\bullet})^{2} = \\mathbf{1295.01}\\ \\mathrm{g}^{2}$, the same as in (iii) — as it must be.`
      },
      {
        l: "e",
        t: `There are $2$ gaps between $3$ diets, so $\\mathrm{df}_{\\text{diet}} = 2$. There are $4$ gaps between the $5$ observations within each group, so $\\mathrm{df}_{\\text{residual}} = 4\\times3 = 12$. Hence $\\mathrm{df}_{\\text{total}} = 2+12 = 14$, matching the $14$ gaps between $15$ observations.`
      },
      {
        l: "f",
        t: `<table>
<tr><th>Source</th><th>df</th><th>SS</th><th>MS</th><th>$F$</th><th>$P(F)$</th></tr>
<tr><td>Diet</td><td>2</td><td>1228.27</td><td>614.14</td><td>110.43</td><td>$1.873\\times10^{-8}$</td></tr>
<tr><td>Residual</td><td>12</td><td>66.74</td><td>5.56</td><td></td><td></td></tr>
<tr><td>Total</td><td>14</td><td>1295.01</td><td></td><td></td><td></td></tr>
</table>
The $F$ statistic is $614.14/5.56 = 110.43$ with $p$-value $1.873\\times10^{-8}$, so there is very strong evidence that mean weight gain varied with protein level in the diet.`
      },
      {
        l: "g",
        t: `ANOVA is a special case of a linear model, so <code>lm</code> is exactly the right tool. With a single categorical covariate and the treatment (dummy-variable) coding, $\\mathbf{X}$ has an intercept column plus two indicator columns for the Medium and High diets, so the model fitted by <code>lm</code> is
<div class="display">$$Y_{ji} = \\mu + \\alpha_{\\text{Med}}\\mathbf{1}\\{j = \\text{Med}\\} + \\alpha_{\\text{High}}\\mathbf{1}\\{j = \\text{High}\\} + \\varepsilon_{ji},$$</div>
which is the one-way ANOVA model in the contrast parametrisation of Exercise 4. The residual sum of squares, and hence $\\hat{\\sigma}^{2}$, are identical to those from the cell-means version, and <code>anova</code> reports $F = \\mathrm{MS}_{\\text{diet}}/\\mathrm{MS}_{\\text{residual}}$ as the partial $F$ test for dropping the <code>diet</code> factor — exactly the statistic computed by hand in part (f).

The degrees of freedom printed are $2$ for <code>diet</code> (three levels less one, matching $\\mathrm{df}_{\\text{diet}}$) and $12$ for the residuals ($15 - 3$, matching $\\mathrm{df}_{\\text{residual}}$), for $14$ in total. Running
<pre><code>anova(lm(weight.gain ~ diet))

# Analysis of Variance Table
#
# Response: weight.gain
#           Df Sum Sq Mean Sq F value    Pr(&gt;F)
# diet       2 1228.27  614.14  110.43 1.873e-08 ***
# Residuals 12   66.74    5.56</code></pre>
confirms the hand calculation in part (f): $614.14$ is $1228.27/2$, and the $F$ ratio $614.14/5.56 = 110.43$ has p-value $1.873\\times10^{-8}$.`
      }
    ]
  },

  {
    id: "w12e3",
    week: 12,
    label: "Exercise 3",
    title: "Two-group ANOVA versus the two-sample $t$ test",
    difficulty: "Medium",
    exam: "Q6",
    topics: ["anova", "testing", "distributions"],
    hint: {
      text: `The identity $F = T^{2}$ is the whole point. Write $\\mathrm{SS}_{\\text{group}}$ in terms of $\\bar{y}_{1\\bullet}-\\bar{y}_{2\\bullet}$ using the weighted expression for the overall mean.`,
      refs: ["w11l12", "w12l12"]
    },
    stem: `Consider the one-way ANOVA model
<div class="display">$$Y_{ji} = \\mu_j + \\varepsilon_{ji}, \\qquad j = 1,2, \\quad i = 1,2,\\dots,r_j,$$</div>
where $\\varepsilon_{ji} \\overset{\\text{iid}}{\\sim} \\mathrm{N}(0,\\sigma^{2})$ across both indices. The number of replications need not be equal in the two groups.`,
    parts: [
      { l: "a", t: `Write out the expressions for the between-groups sum of squares $\\mathrm{SS}_{\\text{group}}$ and the within-group residual sum of squares $\\mathrm{SS}_{\\text{residual}}$.` },
      { l: "b", t: `Explain why $\\mathrm{df}_{\\text{group}} = 1$ and $\\mathrm{df}_{\\text{residual}} = r_1 + r_2 - 2$.` },
      { l: "c", t: `Show that $F = \\mathrm{MS}_{\\text{group}}/\\mathrm{MS}_{\\text{residual}}$ is equivalent to $T^{2}$, where $T$ is the usual two-sample $t$ statistic
<div class="display">$$T = \\frac{\\bar{Y}_{1\\bullet} - \\bar{Y}_{2\\bullet}}{S_{\\text{pooled}}\\sqrt{1/r_1 + 1/r_2}}.$$</div>` },
      { l: "d", t: `State the distributions of both $F$ and $T$ under the null hypothesis $H_0 : \\mu_1 = \\mu_2$.` },
      { l: "e", t: `Using parts (c) and (d), what can you say about the relationship between a $t_d$ distribution and an $F_{1,d}$ distribution?` },
      { l: "f", t: `With only two groups, what is an advantage of a two-sample $t$ test over an ANOVA?` }
    ],
    answer: [
      {
        l: "a",
        t: `<div class="display">$$\\mathrm{SS}_{\\text{group}} = r_1(\\bar{Y}_{1\\bullet} - \\bar{Y}_{\\bullet\\bullet})^{2} + r_2(\\bar{Y}_{2\\bullet} - \\bar{Y}_{\\bullet\\bullet})^{2}$$</div>
<div class="display">$$\\mathrm{SS}_{\\text{residual}} = \\sum_{i=1}^{r_1}(Y_{1i} - \\bar{Y}_{1\\bullet})^{2} + \\sum_{i=1}^{r_2}(Y_{2i} - \\bar{Y}_{2\\bullet})^{2}.$$</div>`
      },
      {
        l: "b",
        t: `There is one gap between two groups, so $\\mathrm{df}_{\\text{group}} = 2-1 = 1$. Within the two groups there are $r_1-1$ and $r_2-1$ gaps respectively, so $\\mathrm{df}_{\\text{residual}} = (r_1-1) + (r_2-1) = r_1+r_2-2$.`
      },
      {
        l: "c",
        t: `The overall mean is the weighted average of the two sample means,
<div class="display">$$\\bar{Y}_{\\bullet\\bullet} = \\frac{r_1\\bar{Y}_{1\\bullet} + r_2\\bar{Y}_{2\\bullet}}{r_1+r_2},$$</div>
so
<div class="display">$$\\begin{aligned}
\\mathrm{SS}_{\\text{group}} &amp;= r_1(\\bar{Y}_{1\\bullet} - \\bar{Y}_{\\bullet\\bullet})^{2} + r_2(\\bar{Y}_{2\\bullet} - \\bar{Y}_{\\bullet\\bullet})^{2}
= \\frac{r_1r_2}{r_1+r_2}(\\bar{Y}_{1\\bullet} - \\bar{Y}_{2\\bullet})^{2} \\\\
&amp;= \\frac{(\\bar{Y}_{1\\bullet} - \\bar{Y}_{2\\bullet})^{2}}{1/r_1 + 1/r_2}.
\\end{aligned}$$</div>
The pooled variance is related to the residual sum of squares by $S_{\\text{pooled}}^{2} = \\mathrm{SS}_{\\text{residual}}/(r_1+r_2-2)$. Hence
<div class="display">$$F = \\frac{\\mathrm{SS}_{\\text{group}}/1}{\\mathrm{SS}_{\\text{residual}}/(r_1+r_2-2)} = \\frac{(\\bar{Y}_{1\\bullet} - \\bar{Y}_{2\\bullet})^{2}}{S_{\\text{pooled}}^{2}(1/r_1 + 1/r_2)} = T^{2}.$$</div>`
      },
      {
        l: "d",
        t: `Under $H_0 : \\mu_1 = \\mu_2$, $T$ has a $t_{r_1+r_2-2}$ distribution and $F$ has an $F_{1,\\,r_1+r_2-2}$ distribution.`
      },
      {
        l: "e",
        t: `Since $F = T^{2}$, an $F_{1,d}$ distribution is exactly the distribution of the square of a $t_d$ random variable.`
      },
      {
        l: "f",
        t: `A two-sample $t$ test can test one-sided alternatives such as $H_1 : \\mu_1 > \\mu_2$ or $H_1 : \\mu_1 < \\mu_2$. ANOVA can only test the two-sided alternative $H_1 : \\mu_1 \\neq \\mu_2$, because it is based on the squared difference.`
      }
    ]
  },

  {
    id: "w12e4",
    week: 12,
    label: "Exercise 4",
    title: "Working with different ANOVA parametrisations",
    difficulty: "Hard",
    exam: "Q6",
    topics: ["anova", "mle"],
    hint: {
      text: `Maximise $\\ell$ over $(\\mu,\\alpha_j,\\sigma^2)$. The constraint $\\sum_j \\alpha_j = 0$ is what makes $\\hat{\\mu}$ the overall mean; the contrast constraint $\\alpha_1 = 0$ instead makes $\\hat{\\mu}$ the mean of group 1.`,
      refs: ["w12l12"]
    },
    stem: `The one-way ANOVA model in the mean parametrisation is
<div class="display">$$Y_{ji} = \\mu_j + \\varepsilon_{ji}, \\qquad j = 1,\\dots,J, \\quad i = 1,\\dots,r_j,$$</div>
with $\\varepsilon_{ji} \\overset{\\text{iid}}{\\sim} \\mathrm{N}(0,\\sigma^{2})$. Under this parametrisation the $\\mu_j$ are the population group means.

Consider two other equivalent parametrisations of the same model. For simplicity assume the balanced case $r_1 = r_2 = \\cdots = r_J = r$.

<strong>Sum constraint:</strong> $Y_{ji} = \\mu + \\alpha_j + \\varepsilon_{ji}$, with $\\sum_{j=1}^{J}\\alpha_j = 0$.

<strong>Contrast:</strong> $Y_{ji} = \\mu + \\alpha_j + \\varepsilon_{ji}$, with $\\alpha_1 \\equiv 0$.`,
    parts: [
      { l: "a", t: `Give an interpretation of the parameters $\\mu, \\alpha_1, \\dots, \\alpha_J$ under the sum constraint parametrisation.` },
      { l: "b", t: `Show that the MLEs under the sum parametrisation are
<div class="display">$$\\hat{\\mu} = \\bar{Y}_{\\bullet\\bullet}, \\quad \\hat{\\alpha}_j = \\bar{Y}_{j\\bullet} - \\bar{Y}_{\\bullet\\bullet}, \\quad \\hat{\\sigma}^{2} = \\frac{1}{Jr}\\sum_{j=1}^{J}\\sum_{i=1}^{r}(Y_{ji} - \\bar{Y}_{j\\bullet})^{2}.$$</div>` },
      { l: "c", t: `What are the fitted means $\\hat{\\mu} + \\hat{\\alpha}_j$ for each group $j$ under the sum parametrisation?` },
      { l: "d", t: `Give an interpretation of the parameters $\\mu, \\alpha_2, \\dots, \\alpha_J$ under the contrast parametrisation.` },
      { l: "e", t: `Show that the MLEs under the contrast parametrisation are $\\hat{\\mu} = \\bar{Y}_{1\\bullet}$ and $\\hat{\\alpha}_j = \\bar{Y}_{j\\bullet} - \\bar{Y}_{1\\bullet}$ for $j = 2,\\dots,J$, with the same $\\hat{\\sigma}^{2}$.` },
      { l: "f", t: `What are the fitted means $\\hat{\\mu} + \\hat{\\alpha}_j$ under the contrast parametrisation? By comparing your results from (c) and (f), and the expressions for $\\hat{\\sigma}^{2}$, convince yourself that both parametrisations fit exactly the same model to the data.` }
    ],
    answer: [
      {
        l: "a",
        t: `Under the sum constraint, $\\mu$ is the overall mean of all groups, $\\mu = (\\mu_1 + \\cdots + \\mu_J)/J$, and each $\\alpha_j$ is the difference between the mean of group $j$ and the overall mean, $\\alpha_j = \\mu_j - \\mu$. (The constraint $\\sum_j \\alpha_j = 0$ is exactly what makes this interpretation consistent.)`
      },
      {
        l: "b",
        t: `The joint likelihood is
<div class="display">$$L(\\mu,\\alpha_1,\\dots,\\alpha_J,\\sigma^{2} \\mid \\mathbf{Y}) = \\left(\\frac{1}{\\sqrt{2\\pi\\sigma^{2}}}\\right)^{Jr}\\exp\\left\\{-\\frac{1}{2\\sigma^{2}}\\sum_{j=1}^{J}\\sum_{i=1}^{r}(Y_{ji} - \\mu - \\alpha_j)^{2}\\right\\}.$$</div>
Maximising $L$ is equivalent to maximising the log-likelihood
<div class="display">$$\\ell = -\\frac{Jr}{2}\\log(\\sigma^{2}) - \\frac{1}{2\\sigma^{2}}\\sum_{j}\\sum_{i}(Y_{ji} - \\mu - \\alpha_j)^{2} + \\text{constant}.$$</div>

Differentiating with respect to $\\mu$ and setting to zero,
<div class="display">$$0 = \\sum_j\\sum_i (Y_{ji} - \\mu - \\alpha_j) \\quad\\Longleftrightarrow\\quad Jr\\mu = \\sum_j\\sum_i Y_{ji} - r\\sum_j \\alpha_j.$$</div>
Because $\\sum_j \\alpha_j = 0$, this gives $\\hat{\\mu} = \\frac{1}{Jr}\\sum_j\\sum_i Y_{ji} = \\bar{Y}_{\\bullet\\bullet}$.

Differentiating with respect to $\\alpha_j$ and setting to zero,
<div class="display">$$0 = \\sum_i (Y_{ji} - \\mu - \\alpha_j) \\quad\\Longleftrightarrow\\quad r\\alpha_j = \\sum_i Y_{ji} - r\\mu,$$</div>
so $\\hat{\\alpha}_j = \\bar{Y}_{j\\bullet} - \\hat{\\mu} = \\bar{Y}_{j\\bullet} - \\bar{Y}_{\\bullet\\bullet}$.

Finally, differentiating with respect to $\\sigma^{2}$ and setting to zero,
<div class="display">$$0 = -\\frac{Jr}{2\\sigma^{2}} + \\frac{1}{2\\sigma^{4}}\\sum_{j}\\sum_{i}(Y_{ji} - \\mu - \\alpha_j)^{2}$$</div>
gives
<div class="display">$$\\hat{\\sigma}^{2} = \\frac{1}{Jr}\\sum_{j}\\sum_{i}(Y_{ji} - \\hat{\\mu} - \\hat{\\alpha}_j)^{2} = \\frac{1}{Jr}\\sum_{j}\\sum_{i}(Y_{ji} - \\bar{Y}_{j\\bullet})^{2}.$$</div>`
      },
      {
        l: "c",
        t: `<div class="display">$$\\hat{\\mu} + \\hat{\\alpha}_j = \\bar{Y}_{\\bullet\\bullet} + \\bar{Y}_{j\\bullet} - \\bar{Y}_{\\bullet\\bullet} = \\bar{Y}_{j\\bullet},$$</div>
precisely the group sample means.`
      },
      {
        l: "d",
        t: `Under the contrast parametrisation, $\\mu$ represents the mean of group 1 ($\\mu \\equiv \\mu_1$), and each $\\alpha_j$ represents the difference between the mean of group $j$ and group 1, $\\alpha_j = \\mu_j - \\mu_1$ for $j = 2,3,\\dots,J$. (This is the default parametrisation used by R.)`
      },
      {
        l: "e",
        t: `Using analogous calculations to part (b): differentiating with respect to $\\mu$ gives $r\\mu = \\sum_i Y_{1i}$ (since $\\alpha_1 \\equiv 0$), so $\\hat{\\mu} = \\bar{Y}_{1\\bullet}$. Differentiating with respect to $\\alpha_j$ gives $r\\alpha_j = \\sum_i Y_{ji} - r\\hat{\\mu}$, so $\\hat{\\alpha}_j = \\bar{Y}_{j\\bullet} - \\bar{Y}_{1\\bullet}$ for $j = 2,\\dots,J$. And
<div class="display">$$\\hat{\\sigma}^{2} = \\frac{1}{Jr}\\sum_{j}\\sum_{i}(Y_{ji} - \\bar{Y}_{j\\bullet})^{2},$$</div>
the same expression as before.`
      },
      {
        l: "f",
        t: `<div class="display">$$\\hat{\\mu} + \\hat{\\alpha}_j = \\bar{Y}_{1\\bullet} + \\bar{Y}_{j\\bullet} - \\bar{Y}_{1\\bullet} = \\bar{Y}_{j\\bullet},$$</div>
again exactly the group sample means (and for $j = 1$ this reads $\\hat{\\mu} = \\bar{Y}_{1\\bullet}$).

Since both parametrisations give identical fitted means $\\bar{Y}_{j\\bullet}$ for every group and identical $\\hat{\\sigma}^{2}$, they fit exactly the same model to the data. The parametrisations merely relabel the same $J$-dimensional family of group means; the fitted values, residuals and sums of squares are unchanged. This is why ANOVA conclusions never depend on which constraint is chosen.`
      }
    ]
  }
);
