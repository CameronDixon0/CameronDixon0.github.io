/* Week 6 — Applied Class */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w06q1",
    week: 6,
    label: "Question 1",
    title: "Collinearity, $R^{2}$ and why correlated covariates can both matter",
    difficulty: "Hard",
    topics: ["regression", "diagnostics"],
    stem: `Suppose that $\\mathbf{z}$ and $\\mathbf{u}$ are nonzero vectors satisfying
<div class="display">$$\\mathbf{u}^{\\top}\\mathbf{1} = \\mathbf{z}^{\\top}\\mathbf{1} = \\mathbf{z}^{\\top}\\mathbf{u} = 0 \\quad\\text{and}\\quad \\mathbf{z}^{\\top}\\mathbf{z} = \\mathbf{u}^{\\top}\\mathbf{u}.$$</div>
For a small positive constant $\\delta$, define
<div class="display">$$\\mathbf{x}_1 = \\mathbf{z} + \\delta\\mathbf{u}, \\qquad \\mathbf{x}_2 = \\mathbf{z} - \\delta\\mathbf{u}, \\qquad \\mathbf{y} = \\mathbf{u}.$$</div>
All regression models include an intercept.`,
    parts: [
      { l: "a", t: `Show that the sample correlation between $\\mathbf{x}_1$ and $\\mathbf{x}_2$ is
<div class="display">$$\\frac{\\mathbf{x}_1^{\\top}\\mathbf{x}_2}{\\lVert \\mathbf{x}_1 \\rVert\\,\\lVert \\mathbf{x}_2 \\rVert} = \\frac{1-\\delta^{2}}{1+\\delta^{2}}.$$</div>` },
      {
        l: "b",
        t: `The coefficient of determination can be evaluated as
<div class="display">$$R^{2} = \\frac{\\sum_{i=1}^{n}(\\hat{y}_i - \\bar{y})^{2}}{\\sum_{i=1}^{n}(y_i - \\bar{y})^{2}}.$$</div>
Show that each of the simple regressions of $\\mathbf{y}$ on $\\mathbf{x}_1$ and of $\\mathbf{y}$ on $\\mathbf{x}_2$ has $R^{2} = \\dfrac{\\delta^{2}}{1+\\delta^{2}}$. Interpret the results from parts (a) and (b) when $\\delta$ is small — in particular, comment on the correlation between the two covariates and on their individual explanatory power for $\\mathbf{y}$.`
      },
      {
        l: "c",
        t: `Express $\\mathbf{y}$ as a linear combination of $\\mathbf{x}_1$ and $\\mathbf{x}_2$. Hence determine the coefficients and the value of $R^{2}$ for the multiple regression of $\\mathbf{y}$ on $\\mathbf{x}_1$ and $\\mathbf{x}_2$. Use your results to explain why high correlation between two covariates does not, by itself, justify removing one of them from a regression model.`
      }
    ],
    answer: [
      {
        l: "a",
        t: `Since $\\mathbf{z}$ and $\\mathbf{u}$ are orthogonal to $\\mathbf{1}$, both $\\mathbf{x}_1$ and $\\mathbf{x}_2$ have sample mean zero. Put $S = \\mathbf{z}^{\\top}\\mathbf{z} = \\mathbf{u}^{\\top}\\mathbf{u}$. Using $\\mathbf{z}^{\\top}\\mathbf{u} = 0$,
<div class="display">$$\\mathbf{x}_1^{\\top}\\mathbf{x}_2 = (\\mathbf{z}+\\delta\\mathbf{u})^{\\top}(\\mathbf{z}-\\delta\\mathbf{u}) = \\mathbf{z}^{\\top}\\mathbf{z} - \\delta^{2}\\mathbf{u}^{\\top}\\mathbf{u} = (1-\\delta^{2})S.$$</div>
Also
<div class="display">$$\\lVert \\mathbf{x}_1 \\rVert^{2} = \\lVert \\mathbf{x}_2 \\rVert^{2} = \\mathbf{z}^{\\top}\\mathbf{z} + \\delta^{2}\\mathbf{u}^{\\top}\\mathbf{u} = (1+\\delta^{2})S.$$</div>
Therefore
<div class="display">$$\\mathrm{cor}(\\mathbf{x}_1, \\mathbf{x}_2) = \\frac{(1-\\delta^{2})S}{(1+\\delta^{2})S} = \\frac{1-\\delta^{2}}{1+\\delta^{2}}.$$</div>`
      },
      {
        l: "b",
        t: `All vectors are centred, so $\\bar{y} = 0$ and the fitted intercept is zero. For the regression on $\\mathbf{x}_1$,
<div class="display">$$\\hat{\\beta}_1 = \\frac{\\mathbf{x}_1^{\\top}\\mathbf{y}}{\\mathbf{x}_1^{\\top}\\mathbf{x}_1} = \\frac{\\delta S}{(1+\\delta^{2})S} = \\frac{\\delta}{1+\\delta^{2}}.$$</div>
Thus $\\hat{\\mathbf{y}} = \\hat{\\beta}_1\\mathbf{x}_1$, and the fitted sum of squares is
<div class="display">$$\\sum_{i=1}^{n}(\\hat{y}_i - \\bar{y})^{2} = \\lVert \\hat{\\mathbf{y}} \\rVert^{2} = \\hat{\\beta}_1^{2}\\,\\mathbf{x}_1^{\\top}\\mathbf{x}_1 = \\frac{\\delta^{2}}{(1+\\delta^{2})^{2}}(1+\\delta^{2})S = \\frac{\\delta^{2}}{1+\\delta^{2}}S.$$</div>
The denominator is $\\sum_{i=1}^{n}(y_i - \\bar{y})^{2} = \\mathbf{y}^{\\top}\\mathbf{y} = S$. Hence $R^{2} = \\dfrac{\\delta^{2}}{1+\\delta^{2}}$. For the regression on $\\mathbf{x}_2$ the slope is $-\\delta/(1+\\delta^{2})$, so the fitted sum of squares and $R^{2}$ are unchanged.

When $\\delta$ is small the correlation between the covariates is close to one, whereas the $R^{2}$ from either simple regression is close to zero. The covariates are almost identical, yet neither individually explains much of $\\mathbf{y}$.`
      },
      {
        l: "c",
        t: `Since $\\mathbf{x}_1 - \\mathbf{x}_2 = 2\\delta\\mathbf{u}$ and $\\mathbf{y} = \\mathbf{u}$,
<div class="display">$$\\mathbf{y} = \\frac{1}{2\\delta}\\mathbf{x}_1 - \\frac{1}{2\\delta}\\mathbf{x}_2.$$</div>
The intercept is zero, the slopes are $\\dfrac{1}{2\\delta}$ and $-\\dfrac{1}{2\\delta}$, and the fit is exact, so $R^{2} = 1$.

Although the covariates are almost perfectly correlated, their small difference contains all the information about the response. Dropping either covariate would destroy most of the explanatory power, and the coefficients are large in magnitude precisely because they multiply almost-identical vectors that nearly cancel.

So high correlation between two covariates is not, by itself, a reason to remove one of them: collinearity inflates standard errors and makes individual coefficients hard to interpret, but it does not destroy the model's ability to predict, and both variables may carry essential information.`
      }
    ]
  },

  {
    id: "w06q2",
    week: 6,
    label: "Question 2",
    title: "Deleting an observation with a zero residual",
    difficulty: "Easy",
    topics: ["regression", "diagnostics"],
    stem: `Consider a linear regression model with design matrix $\\mathbf{X}$ of full column rank. Suppose that observation $i$ has residual $e_i = 0$.`,
    parts: [
      { l: "a", t: `Show that deleting observation $i$ does not change the least-squares coefficient estimates, provided that the design matrix for the remaining observations has full column rank.` },
      { l: "b", t: `What effect does the deletion have on the usual unbiased estimator of the error variance?` }
    ],
    answer: [
      {
        l: "a",
        t: `The full-data normal equations are
<div class="display">$$\\sum_{j=1}^{n} \\mathbf{x}_j\\left(y_j - \\mathbf{x}_j^{\\top}\\hat{\\boldsymbol{\\beta}}\\right) = \\mathbf{0}.$$</div>
The contribution from observation $i$ is $\\mathbf{x}_i e_i = \\mathbf{x}_i\\cdot 0 = \\mathbf{0}$. Removing this term leaves
<div class="display">$$\\sum_{j \\neq i} \\mathbf{x}_j\\left(y_j - \\mathbf{x}_j^{\\top}\\hat{\\boldsymbol{\\beta}}\\right) = \\mathbf{0}.$$</div>
So the full-data estimate satisfies the normal equations for the remaining observations. Since the design matrix of the remaining observations has full column rank, their solution is unique, and hence the coefficient estimates are unchanged.`
      },
      {
        l: "b",
        t: `The residual sum of squares is unchanged, because the deleted residual is zero and the estimates do not change. If the model has $p$ coefficients, the estimator changes from
<div class="display">$$\\hat{\\sigma}^{2} = \\frac{\\mathrm{RSS}}{n-p} \\quad\\text{to}\\quad \\hat{\\sigma}^{2}_{(-i)} = \\frac{\\mathrm{RSS}}{n-p-1}.$$</div>
It therefore increases (when $\\mathrm{RSS} > 0$), since the same residual sum of squares is divided by one fewer degree of freedom.`
      }
    ]
  },

  {
    id: "w06q3",
    week: 6,
    label: "Question 3",
    title: "Diagnostics, transformations and Box–Cox for the trees data",
    difficulty: "Medium",
    topics: ["regression", "diagnostics", "transform"],
    stem: `The <code>trees</code> dataset in R contains measurements from 31 felled black cherry trees:
<ul>
<li><strong>Girth</strong> — the diameter of the tree, in inches;</li>
<li><strong>Height</strong> — the height of the tree, in feet;</li>
<li><strong>Volume</strong> — the volume of timber, in cubic feet.</li>
</ul>
Although the first variable is called Girth, it measures diameter rather than circumference.`,
    parts: [
      { l: "a", t: `The model is fitted and diagnostics computed with
<pre><code>trees_lm &lt;- lm(Volume ~ Girth + Height, data = trees)
coef(trees_lm); summary(trees_lm)$sigma
rstudent(trees_lm); hatvalues(trees_lm); cooks.distance(trees_lm)</code></pre>
Output:
<pre><code>&gt; coef(trees_lm)
(Intercept)       Girth      Height
  -57.98766    4.70816    0.33925

&gt; summary(trees_lm)$sigma
[1] 3.881832

&gt; largest externally studentised residuals
   31    18     2
2.766 1.860 1.652

&gt; largest leverages
   31    20     3
0.227 0.211 0.177

&gt; largest Cook's distances
   31    18     3
0.605 0.178 0.167</code></pre>
The four standard diagnostic plots are

<figure>
  <img src="img/trees-diag-raw.png" alt="Residuals versus fitted values, normal quantile plot, scale-location plot and Cook's distance plot for the simple linear regression of Volume on Girth and Height.">
  <figcaption>Diagnostic plots for <code>lm(Volume ~ Girth + Height)</code>.</figcaption>
</figure>

The residual standard deviation is $\hat{\sigma} = 3.882$, and the correlation between $|e_i|$ and the fitted value is $0.28$.

Using the plots together with the numerical summaries, assess the assumptions of the linear regression model. Comment on any evidence of an inadequate mean structure, nonconstant error variance, or unusual observations.` },
      {
        l: "b",
        t: `One way of allowing for curvature is to add quadratic terms:
<div class="display">$$\\texttt{Volume} = \\beta_0 + \\beta_1\\texttt{Girth} + \\beta_2\\texttt{Girth}^{2} + \\beta_3\\texttt{Height} + \\beta_4\\texttt{Height}^{2} + \\varepsilon.$$</div>
Fitting this model gives
<pre><code>&gt; coef(trees_quad)
(Intercept)       Girth  I(Girth^2)      Height I(Height^2)
   -0.95507    -2.79657     0.26545     0.11942     0.00168

&gt; summary(trees_quad)$sigma
[1] 2.673752

&gt; p-values
(Intercept)       Girth  I(Girth^2)      Height I(Height^2)
     0.9880      0.0680      0.0000      0.9472      0.8865

&gt; largest Cook's distances
   18    17    30
0.491 0.242 0.088</code></pre>
The four diagnostic plots for this model are

<figure>
  <img src="img/trees-diag-quad.png" alt="Diagnostic plots for the additive quadratic model for Volume.">
  <figcaption>Diagnostic plots for the quadratic model.</figcaption>
</figure>

Compare these diagnostics with those from part (a). Does the addition of quadratic terms adequately address the problems identified in part (a)? Comment briefly on whether there is a scientific reason to expect timber volume to be an additive quadratic function of diameter and height.`
      },
      {
        l: "c",
        t: `Approximating the trunk by a cylinder suggests that its volume should be approximately proportional to its cross-sectional area multiplied by its height, giving $\\texttt{Volume} \\approx c\\,\\texttt{Girth}^{2}\\,\\texttt{Height}$. Use this to motivate a linear regression model for $\\log(\\texttt{Volume})$ in terms of $\\log(\\texttt{Girth})$ and $\\log(\\texttt{Height})$. The model is fitted below; assess its diagnostics against parts (a) and (b), and compare the estimated coefficients of $\\log(\\texttt{Girth})$ and $\\log(\\texttt{Height})$ with the geometrically suggested values $2$ and $1$.
<pre><code>&gt; coef(trees_log)
(Intercept)  log(Girth) log(Height)
  -6.631617    1.982650    1.117124

&gt; summary(trees_log)$sigma
[1] 0.08138917

&gt; summary(trees_log)$coefficients
              Estimate Std. Error t value  Pr(&gt;|t|)
(Intercept)  -6.631617   0.799790 -8.2917 5.060e-09
log(Girth)    1.982650   0.075011 26.4316 1.320e-21
log(Height)   1.117124   0.204438  5.4644 7.011e-06

&gt; largest |studentised residuals|
   18    15    16
2.326 2.258 1.920

&gt; largest Cook's distances
   18    17    11
0.224 0.106 0.070</code></pre>

The four diagnostic plots for this model are

<figure>
  <img src="img/trees-diag-log.png" alt="Diagnostic plots for the log-log model for Volume.">
  <figcaption>Diagnostic plots for <code>lm(log(Volume) ~ log(Girth) + log(Height))</code>.</figcaption>
</figure>`
      },
      {
        l: "d",
        t: `Retaining $\\log(\\texttt{Girth})$ and $\\log(\\texttt{Height})$ as covariates, consider the Box–Cox family
<div class="display">$$g_\\lambda(y) = \\begin{cases} \\dfrac{y^{\\lambda} - 1}{\\lambda}, &amp; \\lambda \\neq 0, \\\\[6pt] \\log(y), &amp; \\lambda = 0. \\end{cases}$$</div>
Use <code>boxcox</code> from <code>MASS</code> to construct a Box–Cox profile likelihood for $g_\\lambda(\\texttt{Volume}) = \\beta_0 + \\beta_1\\log(\\texttt{Girth}) + \\beta_2\\log(\\texttt{Height}) + \\varepsilon$, which gives
<pre><code>&gt; bc &lt;- boxcox(trees_bc, lambda = seq(-0.5, 0.5, length = 101))
&gt; bc$x[which.max(bc$y)]
[1] -0.07
&gt; bc$x[bc$y &gt; max(bc$y) - qchisq(0.95, 1)/2]   # approx 95% interval
[1] -0.24  0.10</code></pre>
Is $\\lambda = 1$ plausible? Is $\\lambda = 0$ plausible? Taking account of both the profile likelihood and the diagnostic plots, recommend a final model.`
      }
    ],
    answer: [
      {
        l: "a",
        t: `The fitted model is
<div class="display">$$\\widehat{\\texttt{Volume}} = -57.99 + 4.708\\,\\texttt{Girth} + 0.339\\,\\texttt{Height},$$</div>
with estimated error standard deviation $3.882$.

The <em>residuals-versus-fitted</em> plot shows a clear systematic curve: the residuals are positive for small fitted values, dip negative through the middle of the range, and turn positive again at the largest fitted values. Binning the residuals by fitted value makes this explicit — the bin means run $+2.58$, $-0.14$, $-1.77$, $-2.56$, $-0.94$, $+2.31$ — whereas a well-specified linear model would have mean residual near zero everywhere. This is direct evidence of an <strong>inadequate mean structure</strong>: the true relationship is curved, so a purely linear fit in Girth and Height is wrong.

The <em>scale-location</em> plot makes the second problem visible: the spread of the standardised residuals increases steadily with the fitted value. The binned residual standard deviations rise from $1.11$ to $4.88$, and the correlation between $|e_i|$ and the fitted value is $0.28$. This is evidence of <strong>nonconstant (increasing) error variance</strong>, which invalidates the usual standard errors and hence the $t$ and $F$ tests.

For <strong>normality</strong>, the <em>normal Q-Q plot</em> is close to a straight line over most of its range, with mild departures in the tails (observations 18 and 31). Taking the numerical summary and the plot together, the residuals do not show any serious departure from normality — the mean structure and variance are the problems, not the distributional shape.

Finally, the <em>Cook's distance</em> plot isolates a single dominant point, tree 31, while the numbers show tree 31 also has the largest absolute studentised residual ($2.77$) and a high leverage ($0.227$).

Tree 31 has the largest externally studentised residual (about $2.77$), high leverage ($0.227$) and Cook's distance about $0.61$, so it is unusual and influential, although not an overwhelming outlier.`
      },
      {
        l: "b",
        t: `Comparing the plots with those of part (a), the systematic curve in the residuals-versus-fitted plot has largely gone — the lowess line now runs close to zero across the fitted range instead of tracing a U — so the curvature has been addressed. The <em>scale-location</em> plot, however, still fans out with the fitted value, so unequal spread remains. The normal Q-Q plot is acceptable apart from mild tail departures.

The squared height term contributes little (its $p$-value is $0.887$, and the $p$-value for Girth is $0.068$ while that for Girth$^{2}$ is below $0.001$), and the raw powers produce strong numerical collinearity. The reduction in the residual standard deviation from $3.882$ to $2.674$ shows the fit is much better than in part (a).

More importantly, an additive quadratic model has no clear geometric justification: volume should depend on the <em>product</em> of cross-sectional area and height, not on separate additive powers of diameter and height.`
      },
      {
        l: "c",
        t: `Taking logarithms of $\\texttt{Volume} \\approx c\\,\\texttt{Girth}^{2}\\,\\texttt{Height}$ gives
<div class="display">$$\\log(\\texttt{Volume}) = \\log c + 2\\log(\\texttt{Girth}) + \\log(\\texttt{Height}),$$</div>
which motivates the log-linear regression. The fitted model is
<div class="display">$$\\widehat{\\log(\\texttt{Volume})} = -6.632 + 1.983\\log(\\texttt{Girth}) + 1.117\\log(\\texttt{Height}),$$</div>
with estimated error standard deviation $0.0814$ on the log scale. The residual standard deviation has fallen from $3.882$ in part (a) and $2.674$ in part (b), on a scale where the fitted values now run from about $2.6$ to $4.1$, so this is a far better fit.

The residuals-versus-fitted plot now shows no important curvature and no funnel shape, so both problems identified in part (a) have been addressed. The normal Q-Q plot is close to a straight line, so normality is supported. Tree 18 has the largest studentised residual ($2.326$ in absolute value) and the largest Cook's distance ($0.224$), but neither is large enough to be a compelling outlier, and the other residuals are unremarkable.

The estimated exponents $1.98$ and $1.12$ are close to the geometrically suggested values $2$ and $1$, which is strong support for the cylindrical model. Both coefficients are many standard errors from zero ($t = 26.4$ and $t = 5.46$), so both are needed.`
      },
      {
        l: "d",
        t: `The model supplied to <code>boxcox</code> retains the logged covariates but leaves the response untransformed, so the function profiles over transformations of Volume. The profile likelihood is maximised at $\\hat{\\lambda} = -0.07$, with an approximate $95\\%$ interval $(-0.24,\\, 0.10)$.

Since that interval comfortably contains $0$, the logarithmic transformation $\\lambda = 0$ is plausible. It does not contain $1$, and $1$ is far outside it, so the untransformed response is clearly not supported. Together with the improved fit and the geometric interpretation from part (c), this supports the log-linear model of part (c) as the final model.`
      }
    ]
  },

  {
    id: "w06q4",
    week: 6,
    label: "Question 4",
    title: "Outliers, collinearity and VIFs in the SAT regression",
    difficulty: "Medium",
    topics: ["regression", "diagnostics", "multiplicity"],
    stem: `The <code>sat</code> data in the <code>faraway</code> package contain state-level educational expenditure and SAT results for the 50 US states in 1994–95. Fit the model
<div class="display">$$\\texttt{total} = \\beta_0 + \\beta_1\\texttt{expend} + \\beta_2\\texttt{salary} + \\beta_3\\texttt{ratio} + \\beta_4\\texttt{takers} + \\varepsilon.$$</div>
<pre><code>library(faraway)
?sat
sat_lm &lt;- lm(total ~ expend + salary + ratio + takers, data = sat)</code></pre>`,
    parts: [
      { l: "a", t: `The following output was obtained, where $n = 50$.
<pre><code>&gt; sat_rstud &lt;- rstudent(sat_lm)
&gt; sort(sat_rstud)[c(1:3, 48:50)]
 West Virginia         Nevada  South Carolina        Utah   North Dakota  New Hampshire
        -3.124         -1.732          -1.469         2.530          2.214          2.190

&gt; qt(1 - 0.05/(2*n), df = 45)
[1] 3.5203</code></pre>
Are there any observations that might reasonably be regarded as outliers? Identify any such states and comment on the strength of the evidence, taking account of the number of observations being screened.` },
      { l: "b", t: `The variance inflation factors and the covariate correlation matrix are
<pre><code>&gt; vif(sat_lm)
  expend   salary    ratio   takers
   9.465    9.217    2.433    1.755

&gt; cor(sat[c("expend", "salary", "ratio", "takers")])
       expend salary  ratio takers
expend   1.000  0.870 -0.371  0.593
salary   0.870  1.000 -0.001  0.617
ratio   -0.371 -0.001  1.000 -0.213
takers   0.593  0.617 -0.213  1.000</code></pre>
Is there evidence of collinearity? If so, identify the covariates principally involved and explain what the corresponding variance inflation factors indicate about the precision of their estimated coefficients.` },
      { l: "c", t: `Dropping expend and refitting gives
<pre><code>&gt; coef(summary(sat_lm))["salary", c("Estimate", "Std. Error")]
  Estimate Std. Error
  1.637909   2.387210

&gt; sat_reduced &lt;- update(sat_lm, . ~ . - expend)
&gt; coef(summary(sat_reduced))["salary", c("Estimate", "Std. Error")]
  Estimate Std. Error
  2.552518   1.004487

&gt; vif(sat_reduced)
  salary    ratio   takers
   1.662    1.078    1.741</code></pre>
Compare the estimated coefficient and standard error for salary in the two models, and explain the changes you observe in the light of the variance inflation factors. Does dropping expend materially change your conclusions about salary?` }
    ],
    answer: [
      {
        l: "a",
        t: `<pre><code>sat_rstud &lt;- rstudent(sat_lm)
sort(sat_rstud)
n &lt;- nrow(sat)
bonf_crit &lt;- qt(1 - 0.05/(2*n), df = 44)
bonf_crit
sat[which.max(abs(sat_rstud)), ]</code></pre>
West Virginia has the largest absolute studentised residual, approximately $-3.12$. Under the model each externally studentised residual has a $t$ distribution on 44 degrees of freedom. For an overall significance level of $0.05$ the two-sided Bonferroni critical value is
<div class="display">$$t_{44,\\,1-0.05/(2\\times 50)} \\approx 3.526.$$</div>
Since $|-3.12| < 3.526$, no state is declared an outlier after the Bonferroni correction. West Virginia is the most unusual observation and warrants inspection, but the evidence is insufficient at the 5% familywise level.`
      },
      {
        l: "b",
        t: `<pre><code>vif(sat_lm)
cor(sat[c("expend", "salary", "ratio", "takers")])</code></pre>
The VIFs are approximately
<table>
<tr><th></th><th>expend</th><th>salary</th><th>ratio</th><th>takers</th></tr>
<tr><td>VIF</td><td>9.5</td><td>9.3</td><td>2.4</td><td>1.8</td></tr>
</table>
There is substantial collinearity involving expend and salary, which are strongly positively associated. Their coefficient variances are about nine times those that would arise from comparable orthogonal covariates, so their standard errors are inflated by factors of about three. This makes their separate partial effects difficult to estimate precisely.`
      },
      {
        l: "c",
        t: `<pre><code>sat_reduced &lt;- update(sat_lm, . ~ . - expend)
coef(summary(sat_lm))["salary", c("Estimate", "Std. Error")]
coef(summary(sat_reduced))["salary", c("Estimate", "Std. Error")]
vif(sat_reduced)</code></pre>
In the full model the salary coefficient is about $1.64$ with standard error $2.39$, so there is little evidence of a partial salary effect. After dropping expend, its coefficient is about $2.55$ with standard error about $1.00$. The reduced-model VIFs are approximately $1.66$ for salary, $1.08$ for ratio and $1.74$ for takers.

Removing expend greatly reduces the collinearity and hence the standard error of the salary coefficient. Salary now appears positively associated with total SAT score conditional on ratio and takers. This is not evidence that expenditure is irrelevant: the reduced coefficient combines salary's association with the response with variation previously attributed to expenditure.`
      }
    ]
  }
);
