/* Week 13 — Tutorial */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w13e1",
    week: 13,
    label: "Exercise 1",
    title: "Comparing four control groups: ANOVA versus pairwise testing",
    difficulty: "Medium",
    topics: ["anova", "multiplicity", "testing"],
    hint: {
      text: `With five observations per group the quartiles of a boxplot are barely meaningful, so show the individual points. The ANOVA has $(3,16)$ degrees of freedom. For the pairwise test, remember the pair was chosen after looking at the data — Bonferroni over the six comparisons.`,
      refs: ["w11l12", "w11l3"]
    },
    stem: `A large study investigating the use of carbon tetrachloride as a worm killer is described in Armitage (1983). We focus on a subset of the experiment involving four control groups. If there are differences among these four control groups, this may be attributable to variations in experimental conditions, lab settings, lab technicians and so on — so a more carefully controlled experiment may be needed for follow-up studies.

The numbers of worms in each of five rats under each of four control groups at the end of the study are
<table>
<tr><th>Group I</th><th>Group II</th><th>Group III</th><th>Group IV</th></tr>
<tr><td>279</td><td>378</td><td>172</td><td>381</td></tr>
<tr><td>338</td><td>275</td><td>335</td><td>346</td></tr>
<tr><td>334</td><td>412</td><td>335</td><td>340</td></tr>
<tr><td>198</td><td>265</td><td>282</td><td>471</td></tr>
<tr><td>303</td><td>286</td><td>250</td><td>318</td></tr>
</table>
<pre><code>worms = c(279, 378, 172, 381, 338, 275, 335, 346, 334, 412,
          335, 340, 198, 265, 282, 471, 303, 286, 250, 318)
group = rep(c("I","II","III","IV"), 5)

library(lattice)
dotplot(worms ~ group, xlab = "Group", ylab = "No. of worms",
        main = "Number of worms in rats in each of four control groups")</code></pre>`,
    parts: [
      { l: "a", t: `The five observations per group can be displayed either as a side-by-side dotplot or as a side-by-side boxplot. Argue why the dotplot is the more appropriate choice for these data.` },
      { l: "b", t: `Visually assess the validity of the "common variance" assumption that underpins ANOVA.` },
      { l: "c", t: `Test whether there are any mean differences between the four control groups. Write down an underlying model for the data and clearly state the null and alternative hypotheses in terms of the model parameters. The ANOVA gave
<pre><code>&gt; anova(lm(worms ~ group))

# Analysis of Variance Table
#
# Response: worms
#           Df Sum Sq Mean Sq F value Pr(&gt;F)
# group      3  27234  9078.1  2.2712 0.1195
# Residuals 16  63954  3997.1</code></pre>
State the test statistic and its null distribution, and make your decision based on the $p$-value.` },
      { l: "d", t: `A rival statistician notes that the sample mean of Group IV ($\\bar{y}_{4\\bullet} = 371.2$) appears much larger than that of Group III ($\\bar{y}_{3\\bullet} = 274.8$). The two sample standard deviations are $s_4 = 60.20$ and $s_3 = 67.97$. The rival's pooled two-sample $t$ test on groups IV and III gives
<pre><code>&gt; t.test(worms ~ group, data = d,
&gt;        subset = group %in% c("III", "IV"), var.equal = TRUE)

#         Two Sample t-test
# t = -2.374, df = 8, p-value = 0.04496
# 95 percent confidence interval:
#  -190.038534   -2.761466
# sample estimates:
# mean in group III  mean in group IV
#             274.8            371.2</code></pre>
Verify the test statistic from the group means and standard deviations, then state the $p$-value and the rival's conclusion.` },
      { l: "e", t: `How do we reconcile the apparent contradiction between our results from part (c) and part (d)? Suggest a quick-and-dirty way to adjust one of these approaches appropriately.` }
    ],
    answer: [
      {
        l: "a",
        t: `There are only five observations per group. A boxplot is constructed from the median, quartiles and extremes, which are barely meaningful when computed from five points — the "box" and the whiskers can suggest structure that is an artefact of a very small sample. A dotplot shows every observation, so the actual spread, clustering and any outliers are visible directly, and the reader can judge the group differences without an intermediate summary.`
      },
      {
        l: "b",
        t: `The sample means and standard deviations are
<table>
<tr><th></th><th>Group I</th><th>Group II</th><th>Group III</th><th>Group IV</th></tr>
<tr><td>mean</td><td>290.4</td><td>323.2</td><td>274.8</td><td>371.2</td></tr>
<tr><td>sd</td><td>57.0</td><td>67.0</td><td>68.0</td><td>60.2</td></tr>
</table>
They are all of similar magnitude, and the visual spread within each group on the dotplot is comparable. The common variance assumption is therefore plausible.`
      },
      {
        l: "c",
        t: `Model: $Y_{ji} = \\mu_j + \\varepsilon_{ji}$ with $\\varepsilon_{ji} \\overset{\\text{iid}}{\\sim} \\mathrm{N}(0,\\sigma^{2})$, $j = \\mathrm{I},\\mathrm{II},\\mathrm{III},\\mathrm{IV}$ and $i = 1,\\dots,5$.

$H_0 : \\mu_1 = \\mu_2 = \\mu_3 = \\mu_4$ versus $H_1$: not all group means are equal.

The ANOVA decomposition gives
<table>
<tr><th>Source</th><th>df</th><th>SS</th><th>MS</th><th>$F$</th><th>$p$</th></tr>
<tr><td>Group</td><td>3</td><td>27234.2</td><td>9078.1</td><td>2.271</td><td>0.1195</td></tr>
<tr><td>Residual</td><td>16</td><td>63953.6</td><td>3997.1</td><td></td><td></td></tr>
<tr><td>Total</td><td>19</td><td>91187.8</td><td></td><td></td><td></td></tr>
</table>
The $p$-value is $P(F_{3,16} \\ge 2.271) = 0.12$, so there is no evidence of a difference in mean worm counts among the four control groups. We retain $H_0$.`
      },
      {
        l: "d",
        t: `A pooled two-sample $t$ test on groups III and IV only gives
<div class="display">$$s_{\\text{pooled}}^{2} = \\frac{4(60.20)^{2} + 4(67.97)^{2}}{8} = 4122.0, \\qquad s_{\\text{pooled}} = 64.20,$$</div>
<div class="display">$$\\mathrm{SE} = 64.20\\sqrt{\\tfrac{1}{5}+\\tfrac{1}{5}} = 40.61, \\qquad t = \\frac{371.2 - 274.8}{40.61} = 2.374$$</div>
on $8$ degrees of freedom. The two-sided $p$-value is $0.045$, so at the $5\\%$ level the rival rejects $H_0 : \\mu_3 = \\mu_4$ and concludes that group IV has a higher mean worm count than group III.`
      },
      {
        l: "e",
        t: `There is no contradiction: these are two different tests answering two different questions, and the pairwise test was chosen <em>after</em> inspecting the data.

The ANOVA asks whether <em>any</em> of the four means differ. The $t$ test asks whether the two groups with the <em>most extreme observed means</em> differ — but there are $\\binom{4}{2} = 6$ possible pairwise comparisons, and picking the most extreme one after looking at the data is data snooping. The nominal $5\\%$ level no longer applies, because with six comparisons the chance that <em>some</em> pair looks significant under a true null is much larger than $5\\%$.

A quick-and-dirty correction is Bonferroni: multiply the pairwise $p$-value by the number of comparisons,
<div class="display">$$0.045 \\times 6 = 0.27,$$</div>
or equivalently compare it with $\\alpha/6 = 0.0083$. The difference is no longer significant, consistent with the ANOVA.

If instead the $t$ test uses the pooled residual standard deviation from all four groups ($63.2$ on $16$ df) the unadjusted $p$-value is $0.028$, and the Bonferroni-adjusted value is $0.17$ — again not significant. Either way the two analyses agree once multiplicity is accounted for.`
      }
    ]
  },

  {
    id: "w13e2",
    week: 13,
    label: "Exercise 2",
    title: "Laptops and scrotal temperatures",
    difficulty: "Medium",
    topics: ["anova", "diagnostics"],
    hint: {
      text: `A balanced one-way ANOVA with $n = 50$ per group, so the CLT covers moderate non-normality. The assumption worth checking carefully is constant variance.`,
      refs: ["w11l12", "w10l3"]
    },
    stem: `Studies have suggested that heating the scrotum by just $1\\,^{\\circ}\\mathrm{C}$ can temporarily reduce sperm count and quality, while a $2\\,^{\\circ}\\mathrm{C}$ increase can cause long-term irreversible damage.

Sheynkin et al. (2011) examined the effect of using a laptop computer on the lap on changes in scrotal temperature. A total of 150 male participants were randomly assigned to one of three sitting conditions (legs together, legs apart, and legs together with a laptop cooling pad). Each participant used the same laptop to watch the same video for 60 minutes, after which the change in scrotal temperature was recorded. The research question is whether there are differences in scrotal temperature change between the three sitting conditions.

The dataset can be read into R with
<pre><code>scrotaltemp = read.csv("scrotaltemp.csv", header = T)</code></pre>`,
    parts: [
      { l: "a", t: `Suppose you were given this dataset, which has $n = 50$ participants in each of the three conditions. Which plot would you choose to summarise it, and why would that plot be a good visual summary of these data? (Your answer should explain why a boxplot is appropriate here, whereas a dotplot was preferable in Exercise 1.)` },
      { l: "b", t: `The research question is addressed with a one-way ANOVA of temperature change on sitting condition. Write down an underlying model for the data and clearly state the null and alternative hypotheses in terms of the model parameters. On the assumption that the ANOVA $F$ statistic was significant, explain how you would identify which conditions differ from which, and how you would protect the error rate across the three pairwise comparisons.` },
      { l: "c", t: `Critically assess any assumptions you made in your analysis from part (b).` },
      { l: "d", t: `In light of your findings from parts (a)–(c), and any other analyses you deem relevant, which of the three sitting conditions would you recommend to a male friend who is going to be using a laptop on his lap to watch a movie tonight?` }
    ],
    answer: [
      {
        l: "a",
        t: `A side-by-side boxplot of temperature change against sitting condition.
With $n = 50$ per group, boxplots are appropriate: they summarise the centre, spread, skewness and outliers of each group compactly, so the relative location and overlap of the three distributions is easy to see. Unlike the small samples in Exercise 1, $50$ observations per group is enough for the quartiles to be meaningful.`
      },
      {
        l: "b",
        t: `Model: $Y_{ji} = \\mu_j + \\varepsilon_{ji}$ with $\\varepsilon_{ji} \\overset{\\text{iid}}{\\sim} \\mathrm{N}(0,\\sigma^{2})$, $j = 1,2,3$ (the sitting conditions) and $i = 1,\\dots,50$.

$H_0 : \\mu_1 = \\mu_2 = \\mu_3$ (no difference between conditions) versus $H_1$: not all $\\mu_j$ equal.
<pre><code>fit &lt;- lm(tempchange ~ condition, data = scrotaltemp)
anova(fit)</code></pre>
The one-way ANOVA $F$ statistic is $F = \\mathrm{MS}_{\\text{between}}/\\mathrm{MS}_{\\text{within}}$, compared with an $F_{2,147}$ distribution. A small $p$-value provides evidence that the mean temperature change differs between at least two of the conditions.

Because the groups are balanced with $n = 50$ each, this test is robust to moderate departures from normality, and would have good power to detect differences of practical interest.`
      },
      {
        l: "c",
        t: `The assumptions are:
<ul>
<li><strong>Independence.</strong> Participants were randomly assigned to conditions, so observations are independent — this is the assumption that really matters, and it is satisfied by design.</li>
<li><strong>Constant variance.</strong> Check with a residual-versus-fitted plot and, for example, Levene's test or by comparing group standard deviations. If the variances differ noticeably, use Welch's one-way test (<code>oneway.test</code>) which does not assume equal variances.</li>
<li><strong>Normality of errors.</strong> Check with a normal quantile plot of the residuals. With $n = 50$ per group the $F$ test is robust to mild non-normality by the central limit theorem, so this is the least important assumption; strong skewness or outliers would be the concern.</li>
<li>Temperature change is a continuous measurement, so the model is appropriate provided there is no censoring or rounding at zero.</li>
</ul>`
      },
      {
        l: "d",
        t: `The recommendation follows the ordering of the estimated group means: choose whichever condition produces the <em>smallest</em> mean increase in scrotal temperature. Physiologically, both "legs apart" (which increases the distance between the thighs and the scrotum and allows air circulation) and the "cooling pad" condition are designed to reduce heating relative to "legs together".

So: recommend the condition with the lowest fitted mean. If the ANOVA found a significant difference and the post-hoc comparison shows that legs apart and the cooling pad are both significantly better than legs together but not significantly different from each other, then either of those two is fine — and a cooling pad is the more practical choice if he wants to keep his legs together.

If the ANOVA gives no significant difference, the honest answer is that this study provides no evidence that the conditions differ in temperature change, so the choice should be made on comfort rather than on health grounds — while noting that keeping the laptop off the lap entirely is the safest option.`
      }
    ]
  },

  {
    id: "w13e3",
    week: 13,
    label: "Exercise 3",
    title: "Two-way ANOVA of survival times by poison and treatment",
    difficulty: "Hard",
    topics: ["anova", "transform", "diagnostics"],
    hint: {
      text: `Assess the interaction <em>before</em> the main effects — if it is non-zero, main effects on their own are misleading. For constant variance compare the within-cell standard deviations; a reciprocal is a variance-stabilising transformation with a natural interpretation as a rate.`,
      refs: ["w12l3", "w11l3"]
    },
    stem: `The following table gives survival times (in hours) for animals in an experiment with three poisons, four treatments and four replications per experimental setting.
<table>
<tr><th rowspan="2">Poison</th><th colspan="2">A</th><th colspan="2">B</th><th colspan="2">C</th><th colspan="2">D</th></tr>
<tr><td>3.1</td><td>4.5</td><td>8.2</td><td>11.0</td><td>4.3</td><td>4.5</td><td>4.5</td><td>7.1</td></tr>
<tr><td>I</td><td>4.6</td><td>4.3</td><td>8.8</td><td>7.2</td><td>6.3</td><td>7.6</td><td>6.6</td><td>6.2</td></tr>
<tr><td>II</td><td>3.6</td><td>2.9</td><td>9.2</td><td>6.1</td><td>4.4</td><td>3.5</td><td>5.6</td><td>10.0</td></tr>
<tr><td></td><td>4.0</td><td>2.3</td><td>4.9</td><td>12.4</td><td>3.1</td><td>4.0</td><td>7.1</td><td>3.8</td></tr>
<tr><td>III</td><td>2.2</td><td>2.1</td><td>3.0</td><td>3.7</td><td>2.3</td><td>2.5</td><td>3.0</td><td>3.6</td></tr>
<tr><td></td><td>1.8</td><td>2.3</td><td>3.8</td><td>2.9</td><td>2.4</td><td>2.2</td><td>3.1</td><td>3.3</td></tr>
</table>
<pre><code>survivaltime = c(3.1,4.5,4.6,4.3,8.2,11.0,8.8,7.2,4.3,4.5,6.3,7.6,4.5,7.1,6.6,6.2,
                 3.6,2.9,4.0,2.3,9.2,6.1,4.9,12.4,3.1,4.0,2.3,2.5,7.1,3.8,3.0,3.6,
                 2.2,2.1,1.8,2.3,3.0,3.7,3.8,2.9,2.3,2.5,2.4,2.2,3.0,3.6,3.1,3.3)

Treatment = rep(c(rep("A",4),rep("B",4),rep("C",4),rep("D",4)), 3)
Poison    = c(rep("I",16), rep("II",16), rep("III",16))

library(lattice)
dotplot(survivaltime ~ Treatment | Poison, layout = c(3,1),
        ylab = "Survival time (hours)", xlab = "Treatment")</code></pre>`,
    parts: [
      { l: "a", t: `The four replications per setting can be displayed either as side-by-side-by-side dotplots (one panel per poison) or as boxplots. Argue why the dotplot is the more appropriate choice for these data.` },
      { l: "b", t: `A two-way ANOVA with interaction gave
<pre><code>&gt; anova(lm(survivaltime ~ Poison * Treatment))

# Analysis of Variance Table
#
# Response: survivaltime
#                  Df Sum Sq Mean Sq F value    Pr(&gt;F)
# Poison            2 93.615  46.807  24.397 2.009e-07 ***
# Treatment         3 92.127  30.709  16.006 8.925e-07 ***
# Poison:Treatment  6 26.960   4.493   2.342   0.05183 .
# Residuals        36 69.070   1.919</code></pre>
State the model being fitted, and interpret the three tests. What do the $p$-values tell you about the effects of the two main factors and their interaction?` },
      { l: "c", t: `Critically assess the assumptions behind ANOVA in the context of these data.` },
      { l: "d", t: `Box and Cox (1964) suggested that the reciprocal of survival time can be interpreted as a rate of death. A two-way ANOVA on the reciprocals gave
<pre><code>&gt; d$inv &lt;- 1/d$survivaltime
&gt; anova(lm(inv ~ Poison * Treatment))

# Analysis of Variance Table
#
# Response: inv
#                  Df  Sum Sq   Mean Sq F value    Pr(&gt;F)
# Poison            2 0.32038 0.160189 54.1003 1.419e-11 ***
# Treatment         3 0.20316 0.067721 22.8714 1.837e-08 ***
# Poison:Treatment  6 0.03426 0.005709  1.9282    0.1027
# Residuals        36 0.10659 0.002961</code></pre>
Compare these results with those from part (b). Which conclusions are unchanged, and which change?` },
      { l: "e", t: `Critically assess the assumptions behind ANOVA when using the reciprocals.` },
      { l: "f", t: `Which of the two analyses is more appropriate for these data? Briefly justify your choice.` }
    ],
    answer: [
      {
        l: "a",
        t: `There are only four replications per experimental setting. As in Exercise 1, a boxplot built from four points is driven by quantiles that are barely meaningful and can suggest structure that is an artefact of the tiny sample. A dotplot displays every observation, so the spread within each poison-by-treatment cell can be judged directly and the reader can see the interaction pattern across the three panels.`
      },
      {
        l: "b",
        t: `<pre><code>anova(lm(survivaltime ~ Poison * Treatment))</code></pre>
<table>
<tr><th>Source</th><th>df</th><th>SS</th><th>MS</th><th>$F$</th><th>$p$</th></tr>
<tr><td>Poison</td><td>2</td><td>93.615</td><td>46.807</td><td>24.40</td><td>$2.0\\times10^{-7}$</td></tr>
<tr><td>Treatment</td><td>3</td><td>92.127</td><td>30.709</td><td>16.01</td><td>$8.9\\times10^{-7}$</td></tr>
<tr><td>Poison $\\times$ Treatment</td><td>6</td><td>26.960</td><td>4.493</td><td>2.34</td><td>0.052</td></tr>
<tr><td>Residuals</td><td>36</td><td>69.070</td><td>1.919</td><td></td><td></td></tr>
</table>
Both main effects are highly significant: survival time depends strongly on the poison and on the treatment. The interaction is borderline ($p = 0.052$), giving weak evidence that the effect of treatment differs between poisons — visually, the treatment B advantage is much larger under poisons I and II than under poison III.`
      },
      {
        l: "c",
        t: `The ANOVA assumptions are independence of the errors, normality, and a constant variance $\\sigma^{2}$ across all $12$ cells.

<strong>Independence</strong> is plausible by design. <strong>Normality</strong> is hard to assess with only four observations per cell; the residual quantile plot is the best available check, but the $F$ tests are reasonably robust provided there are no gross outliers.

<strong>Constant variance</strong> is the real concern here. The cell standard deviations range from $0.13$ (poison III, treatment C) to $3.36$ (poison II, treatment B) — a ratio of about $26$ — and they are clearly larger for the cells with larger means. Survival times are positive and right-skewed, and the variance grows with the mean, so the constant-variance assumption is doubtful on the original scale.`
      },
      {
        l: "d",
        t: `<pre><code>d$inv &lt;- 1/d$survivaltime
anova(lm(inv ~ Poison * Treatment))</code></pre>
<table>
<tr><th>Source</th><th>df</th><th>SS</th><th>MS</th><th>$F$</th><th>$p$</th></tr>
<tr><td>Poison</td><td>2</td><td>0.32038</td><td>0.160189</td><td>54.10</td><td>$1.4\\times10^{-11}$</td></tr>
<tr><td>Treatment</td><td>3</td><td>0.20316</td><td>0.067721</td><td>22.87</td><td>$1.8\\times10^{-8}$</td></tr>
<tr><td>Poison $\\times$ Treatment</td><td>6</td><td>0.03426</td><td>0.005709</td><td>1.93</td><td>0.103</td></tr>
<tr><td>Residuals</td><td>36</td><td>0.10659</td><td>0.002961</td><td></td><td></td></tr>
</table>
The main effects remain highly significant — indeed more strongly so — while the interaction is now clearly non-significant ($p = 0.10$). So the substantive conclusions about the main effects are unchanged, but the borderline interaction on the original scale disappears on the reciprocal scale.`
      },
      {
        l: "e",
        t: `Independence and normality of the errors are assessed as before, on the residual scale.

Constant variance is markedly improved: the cell standard deviations on the reciprocal scale range from $0.020$ to $0.083$, a ratio of only about $4.1$ (compared with $26$ on the original scale), and they no longer increase systematically with the cell mean. So the reciprocal transformation <em>stabilises</em> the variance, which is exactly what a variance-stabilising transformation is supposed to do.

The reciprocal is also interpretable: $1/(\\text{survival time})$ is a death rate, so the model is a linear model for rates rather than times. One caveat is that if any survival time were very small the reciprocal would be very large and unstable; here the smallest is $1.8$, so that is not a problem.`
      },
      {
        l: "f",
        t: `The analysis on the reciprocals is more appropriate. It satisfies the constant-variance assumption far better (cell SD ratio $\\approx 4$ rather than $\\approx 26$), which is the assumption clearly violated on the original scale. The reciprocal also has a natural scientific interpretation as a death rate, which is what the poison and treatment effects plausibly act on multiplicatively.

The main substantive conclusions are the same either way — both poison and treatment have strong effects. The one conclusion that changes is the interaction, which is borderline on the original scale ($p = 0.052$) and clearly absent on the reciprocal scale ($p = 0.10$); since the reciprocal analysis is the better-fitting one, we prefer to conclude that the effects of poison and treatment are additive on the rate scale.`
      }
    ]
  },

  {
    id: "w13e4",
    week: 13,
    label: "Exercise 4",
    title: "A two-way ANOVA with interactions written as a linear model",
    difficulty: "Medium",
    topics: ["anova", "regression"],
    hint: {
      text: `Count the parameters: $1 + 2 + 3 + 6 = 12$ columns for a $3\\times4$ table. With treatment coding the baseline cell is poison I, treatment A, so $\\mu$ is that cell's mean.`,
      refs: ["w12l3", "w12l12"]
    },
    stem: `Recall that a linear model is any model that can be written in the form
<div class="display">$$Y_i = \\mathbf{x}_i^{\\top}\\boldsymbol{\\beta} + \\varepsilon_i,$$</div>
where $\\mathbf{x}_i$ is a vector of covariates for observation $i$, $\\boldsymbol{\\beta}$ is a vector of regression parameters and each $\\varepsilon_i$ is a random variable with mean $0$. In vector–matrix form,
<div class="display">$$\\mathbf{Y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon},$$</div>
where $\\mathbf{Y} = (Y_1,\\dots,Y_n)^{\\top}$ is the vector of all responses, $\\mathbf{X}$ is the design matrix and $\\boldsymbol{\\varepsilon}$ is the vector of random errors.`,
    parts: [
      { l: "a", t: `Write the two-way ANOVA model with interactions from Exercise 3(b) in the form of a linear model. Clearly describe what the covariate matrix $\\mathbf{X}$ looks like, identify each component of the parameter $\\boldsymbol{\\beta}$, and state the distribution of the error vector $\\boldsymbol{\\varepsilon}$.` }
    ],
    answer: [
      {
        l: "a",
        t: `There are $3 \\text{ poisons} \\times 4 \\text{ treatments} \\times 4 \\text{ replications} = 48$ observations, so $n = 48$.

Using the default "treatment" (dummy-variable) coding, the two-way ANOVA model with interaction is
<div class="display">$$Y_{jki} = \\mu + \\alpha_j + \\tau_k + (\\alpha\\tau)_{jk} + \\varepsilon_{jki}, \\quad j \\in \\{\\mathrm{I},\\mathrm{II},\\mathrm{III}\\},\\; k \\in \\{A,B,C,D\\},\\; i = 1,\\dots,4,$$</div>
with the identifiability constraints $\\alpha_{\\mathrm{I}} = 0$, $\\tau_A = 0$ and $(\\alpha\\tau)_{\\mathrm{I},k} = (\\alpha\\tau)_{j,A} = 0$. So
<div class="display">$$\\boldsymbol{\\beta} = \\left(\\mu,\\; \\alpha_{\\mathrm{II}},\\; \\alpha_{\\mathrm{III}},\\; \\tau_B,\\; \\tau_C,\\; \\tau_D,\\; (\\alpha\\tau)_{\\mathrm{II},B},\\; (\\alpha\\tau)_{\\mathrm{II},C},\\; (\\alpha\\tau)_{\\mathrm{II},D},\\; (\\alpha\\tau)_{\\mathrm{III},B},\\; (\\alpha\\tau)_{\\mathrm{III},C},\\; (\\alpha\\tau)_{\\mathrm{III},D}\\right)^{\\top},$$</div>
a vector of $d = 1 + 2 + 3 + 6 = 12$ parameters. Here $\\mu$ is the mean for the baseline cell (poison I, treatment A), $\\alpha_j$ is the difference between poison $j$ and poison I, $\\tau_k$ is the difference between treatment $k$ and treatment A, and $(\\alpha\\tau)_{jk}$ is the extra deviation of cell $(j,k)$ beyond the two main effects.

$\\mathbf{X}$ is the $48 \\times 12$ matrix whose columns are, in order:
<ul>
<li>an intercept column of $48$ ones;</li>
<li>$\\mathbf{D}_{\\mathrm{II}}$ — $1$ for the $16$ observations on poison II (rows 17–32), $0$ otherwise;</li>
<li>$\\mathbf{D}_{\\mathrm{III}}$ — $1$ for the $16$ observations on poison III (rows 33–48), $0$ otherwise;</li>
<li>$\\mathbf{T}_B, \\mathbf{T}_C, \\mathbf{T}_D$ — indicators for treatments B, C, D, each with four ones inside every block of $16$ rows (e.g. $\\mathbf{T}_B = 1$ for rows 5–8, 21–24 and 37–40);</li>
<li>six interaction columns, each the product of a poison indicator and a treatment indicator, e.g. $\\mathbf{D}_{\\mathrm{II}}\\cdot\\mathbf{T}_B$ is $1$ only for rows 21–24.</li>
</ul>
With the rows ordered as in the data vector (poison I, then II, then III; within each poison treatments A, B, C, D; four reps each), the pattern of the first few rows is
<table>
<tr><th>rows</th><th>cell</th><th>$\\mathbf{1}$</th><th>$\\mathbf{D}_{\\mathrm{II}}$</th><th>$\\mathbf{D}_{\\mathrm{III}}$</th><th>$\\mathbf{T}_B$</th><th>$\\mathbf{T}_C$</th><th>$\\mathbf{T}_D$</th><th>$\\mathbf{D}_{\\mathrm{II}}\\mathbf{T}_B$</th><th>$\\cdots$</th></tr>
<tr><td>1–4</td><td>I, A</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>$\\cdots$</td></tr>
<tr><td>5–8</td><td>I, B</td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>$\\cdots$</td></tr>
<tr><td>21–24</td><td>II, B</td><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>1</td><td>$\\cdots$</td></tr>
</table>
The $12$ columns are linearly independent, so $\\mathbf{X}$ has full column rank and the least-squares estimate $\\hat{\\boldsymbol{\\beta}} = (\\mathbf{X}^{\\top}\\mathbf{X})^{-1}\\mathbf{X}^{\\top}\\mathbf{Y}$ is unique.

Finally,
<div class="display">$$\\boldsymbol{\\varepsilon} \\sim \\mathrm{N}_{48}\\left(\\mathbf{0},\\; \\sigma^{2}\\mathbf{I}_{48}\\right).$$</div>
So the model is $\\mathbf{Y} = \\mathbf{X}\\boldsymbol{\\beta} + \\boldsymbol{\\varepsilon}$ with $\\boldsymbol{\\varepsilon} \\sim \\mathrm{N}_n(\\mathbf{0}, \\sigma^{2}\\mathbf{I}_n)$. This is exactly what <code>lm(survivaltime ~ Poison * Treatment)</code> fits: the $F$ tests for the main effects and interaction are testing the corresponding blocks of $\\boldsymbol{\\beta}$ against zero.

Note that a different choice of constraint — for example the sum-to-zero constraint, or no constraint with $\\mathbf{X}$ not of full rank — describes exactly the same family of fitted values; only the meaning of the parameters changes, not the fitted model.`
      }
    ]
  }
);
