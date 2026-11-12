/* Assignment 4 */
(window.QBANK = window.QBANK || []).push(
  {
    id: "a4q1",
    group: "Assignment 4",
    label: "Question 1",
    source: "assignment",
    title: "Testing whether two exponential rates are equal",
    difficulty: "Hard",
    topics: ["lrt", "testing", "distributions"],
    stem: `Let $X_1,\\dots,X_8$ be a random sample from an exponential distribution with density
<div class="display">$$f_X(x) = \\lambda e^{-\\lambda x}, \\qquad x \\ge 0,$$</div>
and $Y_1,\\dots,Y_7$ an independent sample from an exponential distribution with density
<div class="display">$$f_Y(y) = \\theta e^{-\\theta y}, \\qquad y \\ge 0.$$</div>
Both $\\lambda > 0$ and $\\theta > 0$ are unknown. We want to test $H_0 : \\lambda = \\theta$ against $H_1 : \\lambda \\neq \\theta$.

It is given to you that under $H_0$,
<div class="display">$$T(\\mathbf{X},\\mathbf{Y}) = \\frac{\\sum_i X_i}{\\sum_i X_i + \\sum_j Y_j} \\sim \\mathrm{Beta}(8, 7).$$</div>`,
    parts: [
      { l: "a", t: `Show that under the null hypothesis, the maximum likelihood estimator of $\\lambda = \\theta$ is
<div class="display">$$\\hat{\\lambda} = \\hat{\\theta} = \\frac{15}{\\sum_i X_i + \\sum_j Y_j}.$$</div>` },
      { l: "b", t: `Show that under the alternative hypothesis, the maximum likelihood estimators of $\\lambda$ and $\\theta$ are $\\hat{\\lambda} = 8/\\sum_i X_i$ and $\\hat{\\theta} = 7/\\sum_j Y_j$ respectively.` },
      { l: "c", t: `Construct a generalised likelihood ratio test for $H_0 : \\lambda = \\theta$ versus $H_1 : \\lambda \\neq \\theta$, and show that it reduces to a test based on large or small values of $T(\\mathbf{X},\\mathbf{Y})$.` },
      { l: "d", t: `Explain how you would set the critical value(s) for your test from part (c) to control the Type I error at $\\alpha = 1\\%$, and write down your decision rule explicitly.` },
      { l: "e", t: `Is your test from parts (c)–(d) uniformly most powerful for testing $H_0$ against $H_1$ at the $1\\%$ significance level? Briefly explain why or why not.` }
    ],
    answer: [
      {
        l: "a",
        t: `Under $H_0$ all $15$ observations come from the same exponential distribution, so writing $\\lambda$ for the common rate,
<div class="display">$$L(\\lambda) = \\prod_{i=1}^{8}\\lambda e^{-\\lambda X_i}\\prod_{j=1}^{7}\\lambda e^{-\\lambda Y_j} = \\lambda^{15}\\exp\\left\\{-\\lambda\\left(\\sum_i X_i + \\sum_j Y_j\\right)\\right\\}.$$</div>
The log-likelihood and its derivative are
<div class="display">$$\\ell(\\lambda) = 15\\log\\lambda - \\lambda\\left(\\sum_i X_i + \\sum_j Y_j\\right), \\qquad \\frac{\\partial\\ell}{\\partial\\lambda} = \\frac{15}{\\lambda} - \\left(\\sum_i X_i + \\sum_j Y_j\\right).$$</div>
Setting the derivative to zero gives $\\hat{\\lambda} = 15/\\left(\\sum_i X_i + \\sum_j Y_j\\right)$, and the second derivative $-15/\\lambda^{2} < 0$ confirms this is a maximum. Since $\\lambda = \\theta$ under $H_0$, $\\hat{\\theta} = \\hat{\\lambda}$.`
      },
      {
        l: "b",
        t: `Under $H_1$ the likelihood factorises into a piece in $\\lambda$ and a piece in $\\theta$:
<div class="display">$$L(\\lambda,\\theta) = \\lambda^{8}\\exp\\left\\{-\\lambda\\sum_i X_i\\right\\}\\cdot\\theta^{7}\\exp\\left\\{-\\theta\\sum_j Y_j\\right\\}.$$</div>
So
<div class="display">$$\\ell(\\lambda,\\theta) = 8\\log\\lambda - \\lambda\\sum_i X_i + 7\\log\\theta - \\theta\\sum_j Y_j.$$</div>
Setting each partial derivative to zero,
<div class="display">$$\\frac{8}{\\lambda} = \\sum_i X_i \\;\\Longrightarrow\\; \\hat{\\lambda} = \\frac{8}{\\sum_i X_i}, \\qquad \\frac{7}{\\theta} = \\sum_j Y_j \\;\\Longrightarrow\\; \\hat{\\theta} = \\frac{7}{\\sum_j Y_j}.$$</div>`
      },
      {
        l: "c",
        t: `The generalised likelihood ratio is the ratio of the maximised likelihoods under the two hypotheses:
<div class="display">$$\\Lambda = \\frac{\\sup_{H_0}L(\\lambda,\\theta)}{\\sup_{H_1}L(\\lambda,\\theta)} = \\frac{\\hat{\\lambda}_0^{15}e^{-15}}{\\hat{\\lambda}^{8}e^{-8}\\,\\hat{\\theta}^{7}e^{-7}},$$</div>
where $\\hat{\\lambda}_0 = 15/(\\sum X + \\sum Y)$. Substituting the three MLEs, the powers of $e$ cancel exactly ($e^{-15} = e^{-8-7}$), leaving
<div class="display">$$\\begin{aligned}
\\Lambda &amp;= \\frac{15^{15}}{\\left(\\sum X + \\sum Y\\right)^{15}}\\cdot\\frac{\\left(\\sum X\\right)^{8}}{8^{8}}\\cdot\\frac{\\left(\\sum Y\\right)^{7}}{7^{7}} \\\\
&amp;= \\frac{15^{15}}{8^{8}\\,7^{7}}\\;T^{8}(1-T)^{7},
\\end{aligned}$$</div>
where $T = \\sum X/(\\sum X + \\sum Y)$ and $1 - T = \\sum Y/(\\sum X + \\sum Y)$.

Now $\\Lambda$ is a constant times $g(T) = T^{8}(1-T)^{7}$. This function is $0$ at $T = 0$ and at $T = 1$, and
<div class="display">$$\\frac{d}{dT}\\log g(T) = \\frac{8}{T} - \\frac{7}{1-T},$$</div>
which is zero at $T = 8/15$. Hence $g$ increases on $[0, 8/15]$ and decreases on $[8/15, 1]$, so <em>small</em> values of $\\Lambda$ correspond to $T$ being either small or large. The GLRT therefore rejects $H_0$ for
<div class="display">$$\\{T \\le c_1\\} \\cup \\{T \\ge c_2\\}$$</div>
for suitable critical values $c_1 < c_2$.`
      },
      {
        l: "d",
        t: `Under $H_0$ we have $T \\sim \\mathrm{Beta}(8,7)$, an exact distribution (which is why the test does not need any large-sample approximation). We need $c_1 < c_2$ with
<div class="display">$$0.01 = P(T \\le c_1) + P(T \\ge c_2).$$</div>
The simplest choice splits the $1\\%$ equally between the two tails, so $P(T \\le c_1) = 0.005$ and $P(T \\le c_2) = 0.995$:
<pre><code>qbeta(0.005, 8, 7)   # [1] 0.2234259
qbeta(0.995, 8, 7)   # [1] 0.8276016</code></pre>
So the decision rule is: <strong>reject $H_0$ if</strong>
<div class="display">$$\\{T \\le 0.223\\} \\cup \\{T \\ge 0.828\\}.$$</div>
Intuitively, $T$ is the proportion of the total waiting time contributed by the $X$ sample; if the two rates are equal this should be close to $8/15 = 0.533$, and we reject when it is unusually far to either side.

(A student could instead choose $c_1, c_2$ to satisfy $c_1^{8}(1-c_1)^{7} = c_2^{8}(1-c_2)^{7}$ so that the rule is <em>exactly</em> the GLRT; this gives $c_1 = 0.222$ and $c_2 = 0.827$, and is equally acceptable.)

<em>Computer note:</em> part of the original question asked you to run this code. The values are given above, so no computer is needed.`
      },
      {
        l: "e",
        t: `No. For alternatives with $\\lambda > \\theta$ the $X$'s tend to be smaller than the $Y$'s, so $\\sum X_i$ tends to be small relative to $\\sum Y_j$ and $T$ tends to be small; by the Neyman–Pearson lemma the most powerful test then rejects only for small $T$. For alternatives with $\\lambda < \\theta$ the opposite happens and the most powerful test rejects only for large $T$.

These two one-sided tests are different, so no single test can be most powerful against both kinds of alternative. The two-sided test from parts (c)–(d) splits its $1\\%$ between both tails and so is less powerful than the corresponding one-sided test on each side. Since the alternative $H_1 : \\lambda \\neq \\theta$ is two-sided, no uniformly most powerful test exists.`
      }
    ]
  },

  {
    id: "a4q2",
    group: "Assignment 4",
    label: "Question 2",
    source: "assignment",
    title: "Comparing ratings across two groups of users",
    difficulty: "Medium",
    topics: ["tables", "testing"],
    stem: `A recent poll asked social media users for their opinion on a photo-sharing app removing the number of "likes" from posts, on a five-point scale: $1$ = strongly disagree, $2$ = disagree, $3$ = neutral, $4$ = agree, $5$ = strongly agree.

Of the $n = 198$ respondents, $98$ were "influencers" (over $10{,}000$ followers) and $100$ were regular users. The counts are
<table>
<tr><th>user</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>total</th></tr>
<tr><td>regular</td><td>19</td><td>18</td><td>21</td><td>22</td><td>20</td><td>100</td></tr>
<tr><td>influencer</td><td>27</td><td>15</td><td>6</td><td>18</td><td>32</td><td>98</td></tr>
<tr><th>total</th><th>46</th><th>33</th><th>27</th><th>40</th><th>52</th><th>198</th></tr>
</table>`,
    parts: [
      { l: "a", t: `Describe how you would visualise these data. What does the table immediately suggest?` },
      { l: "b", t: `Do the two types of users exhibit differing opinions? Answer by carrying out an appropriate hypothesis test. Clearly state the null and alternative hypotheses, propose a test statistic, compute and interpret a $p$-value, and write your conclusions in a way that is understandable to a social scientist.` },
      { l: "c", t: `State and critically assess any assumption(s) you made in answering part (b).` },
      { l: "d", t: `A social scientist suggests comparing the two groups using a two-sample $t$ test applied directly to the five-point responses. Explain to her why this is inappropriate here.` }
    ],
    answer: [
      {
        l: "a",
        t: `The ratings are <em>categorical</em>, so we should plot counts (or proportions) in each category separately for each user type — most clearly a comparative bar chart, or a stacked bar chart, of the counts against rating, with the two user types distinguished.

The table immediately shows that opinions of regular users are fairly uniform across all five ratings ($19, 18, 21, 22, 20$ — almost flat), whereas influencers are much more polarised, clustering at the extremes ($27$ strongly disagree and $32$ strongly agree, but only $6$ neutral).`
      },
      {
        l: "b",
        t: `$H_0$: the distribution of opinion ratings is the same for both user types. $H_1$: the distributions are not the same. Writing $\\mathbf{p}_{\\text{reg}}$ and $\\mathbf{p}_{\\text{inf}}$ for the underlying proportion vectors over the five ratings,
<div class="display">$$H_0 : \\mathbf{p}_{\\text{reg}} = \\mathbf{p}_{\\text{inf}} \\quad\\text{versus}\\quad H_1 : \\mathbf{p}_{\\text{reg}} \\neq \\mathbf{p}_{\\text{inf}}.$$</div>
This is a test of homogeneity in a $2 \\times 5$ contingency table. The test statistic is Pearson's $\\chi^{2}$,
<div class="display">$$\\chi^{2} = \\sum_{\\text{cells}}\\frac{(O - E)^{2}}{E},$$</div>
where the expected counts under $H_0$ are $E_{ij} = (\\text{row}_i)(\\text{col}_j)/n$. These are
<table>
<tr><th>user</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr><td>regular</td><td>23.23</td><td>16.67</td><td>13.64</td><td>20.20</td><td>26.26</td></tr>
<tr><td>influencer</td><td>22.77</td><td>16.33</td><td>13.36</td><td>19.80</td><td>25.74</td></tr>
</table>
Evaluating,
<div class="display">$$\\chi^{2} = \\frac{(19-23.23)^{2}}{23.23} + \\frac{(18-16.67)^{2}}{16.67} + \\cdots + \\frac{(32-25.74)^{2}}{25.74} = 13.15$$</div>
on $(2-1)(5-1) = 4$ degrees of freedom. The $p$-value is
<div class="display">$$P(\\chi^{2}_{4} \\ge 13.15) = 0.0106 \\approx 1.1\\%.$$</div>
Since $0.011 < 0.05$ we reject $H_0$.

<strong>Conclusion for a social scientist.</strong> There is moderate-to-strong evidence that regular users and influencers hold different opinions about removing the like counts. Inspecting the table, influencers are far more polarised: they are more likely than regular users to both strongly disagree <em>and</em> strongly agree, and much less likely to be neutral. Regular users are roughly evenly spread across all five opinions.`
      },
      {
        l: "c",
        t: `The assumptions behind the $\\chi^{2}$ test are:

<ul>
<li><strong>Independence of observations.</strong> Each respondent contributes one rating. This is questionable here: it is an online poll, so respondents may forward it to friends or followers and may encourage others to vote in a particular way, which would break independence. Users who bother to participate in an online poll also tend to hold stronger opinions than non-respondents, so the sample is unlikely to be representative of social media users generally.</li>
<li><strong>Sufficiently large expected counts.</strong> Every expected count above is at least $13.36$, well above $5$, so the asymptotic $\\chi^{2}_{4}$ approximation is reliable. This assumption is comfortably satisfied.</li>
<li><strong>No double counting</strong>, and a well-defined and consistently understood five-point scale.</li>
</ul>

The large-count assumption is fine; the independence and representativeness assumptions are the real concern, and they limit how far these conclusions can be generalised.`
      },
      {
        l: "d",
        t: `The responses are <strong>categories</strong>, not measurements. The numbers $1$ to $5$ merely label the ordered categories, and the "distance" between $1$ and $2$ need not equal the distance between $4$ and $5$ — let alone mean anything like "one unit of agreement".

Because of this, it is meaningless to compute means and standard deviations of the responses, which is exactly what a two-sample $t$ test requires. Concretely, if we relabelled the scale as $-3, -1, 0, 1, 3$ (the same ordering, the same information), the means, the standard deviations and hence the $t$ statistic would all change, and could even reverse the conclusion — whereas a $\\chi^{2}$ test on the counts is completely unaffected by relabelling.

A $t$ test would also implicitly assume normality of the responses within each group, which cannot hold for five-point categorical data. The correct approach for comparing the distribution of a categorical response across two groups is the test of homogeneity used in part (b). (If the interest were specifically in a single ordinal summary such as "agree versus not", a test on that derived binary category would be appropriate, or a rank-based test could be used, but not a $t$ test on the raw scores.)`
      }
    ]
  },

  {
    id: "a4q3",
    group: "Assignment 4",
    label: "Question 3",
    source: "assignment",
    title: "Tuberculosis severity and blood type",
    difficulty: "Medium",
    topics: ["tables", "gof", "testing"],
    stem: `Overfield and Klauber (1980) published data on the incidence of tuberculosis in relation to ABO blood groups in a sample of Eskimos:
<table>
<tr><th>tuberculosis severity</th><th>O</th><th>A</th><th>AB</th><th>B</th></tr>
<tr><td>moderate or advanced</td><td>7</td><td>5</td><td>3</td><td>13</td></tr>
<tr><td>minimal</td><td>27</td><td>32</td><td>8</td><td>18</td></tr>
<tr><td>not present</td><td>55</td><td>50</td><td>7</td><td>24</td></tr>
</table>
We want to investigate whether tuberculosis incidence is related to blood type. Let $p_{ij}$ denote the underlying proportion of the population with severity $i \\in \\{\\text{mod/adv}, \\text{minimal}, \\text{none}\\}$ and blood type $j \\in \\{\\text{O}, \\text{A}, \\text{AB}, \\text{B}\\}$.`,
    parts: [
      { l: "a", t: `Write down the null and alternative hypotheses in words.` },
      { l: "b", t: `Write down the likelihood function for $\\mathbf{p}$ given the observed counts $\\mathbf{x}$.` },
      { l: "c", t: `Under the null hypothesis, $p_{ij} = p_{i\\bullet}\\times p_{\\bullet j}$ for each $i$ and $j$. Show that under the null model the maximum likelihood estimates of each $p_{i\\bullet}$ and $p_{\\bullet j}$ are $\\hat{p}_{i\\bullet} = x_{i\\bullet}/n$ and $\\hat{p}_{\\bullet j} = x_{\\bullet j}/n$, where $x_{i\\bullet}$ is the observed number of cases of severity $i$, $x_{\\bullet j}$ is the observed number of blood type $j$, and $n$ is the total sample size.` },
      { l: "d", t: `Using part (c), what counts would we expect to see in each cell of the table if the null hypothesis were true?` },
      { l: "e", t: `Under the alternative hypothesis there are no restrictions on the cell proportions $p_{ij}$ (except that they must sum to $1$). State the maximum likelihood estimates $\\hat{p}_{ij}$ under the alternative.` },
      { l: "f", t: `Using parts (b), (c) and (e), numerically evaluate the generalised likelihood ratio test statistic
<div class="display">$$\\Lambda = \\frac{\\sup_{H_0}L(\\mathbf{p}\\mid\\mathbf{x})}{\\sup_{H_1}L(\\mathbf{p}\\mid\\mathbf{x})},$$</div>
and also the transformation $-2\\log\\Lambda$.` },
      { l: "g", t: `Using part (d), compute Pearson's $\\chi^{2}$ statistic. Is it numerically close to the $-2\\log\\Lambda$ statistic from part (f)?` },
      { l: "h", t: `Carry out the hypothesis test by computing and interpreting a $p$-value, and state your conclusion in a way that is understandable to a population health scientist.` },
      { l: "i", t: `One cell contains only $3$ counts, which may make the asymptotic $\\chi^{2}$ distribution inaccurate. Using an alternative approach, redo the analysis to account for the low counts. Does your conclusion change?` }
    ],
    answer: [
      { l: "a", t: `$H_0$: tuberculosis severity is independent of (unrelated to) blood type. $H_1$: tuberculosis severity is related to blood type.` },
      {
        l: "b",
        t: `The counts form a multinomial sample of size $n = 249$ over $3 \\times 4 = 12$ cells, so
<div class="display">$$L(\\mathbf{p}\\mid\\mathbf{x}) = \\binom{n}{x_{11},\\dots,x_{34}}\\prod_{i,j}p_{ij}^{\\,x_{ij}} \\propto \\prod_{i,j}p_{ij}^{\\,x_{ij}}.$$</div>
Writing it out for this table,
<div class="display">$$L \\propto (p_{11})^{7}(p_{12})^{5}(p_{13})^{3}(p_{14})^{13}(p_{21})^{27}(p_{22})^{32}\\cdots(p_{34})^{24}.$$</div>`
      },
      {
        l: "c",
        t: `Substituting $p_{ij} = p_{i\\bullet}p_{\\bullet j}$ and grouping by row and by column,
<div class="display">$$\\begin{aligned}
L &amp;\\propto (p_{1\\bullet})^{7+5+3+13}(p_{2\\bullet})^{27+32+8+18}(1-p_{1\\bullet}-p_{2\\bullet})^{55+50+7+24} \\\\
&amp;\\quad\\times (p_{\\bullet 1})^{7+27+55}(p_{\\bullet 2})^{5+32+50}(p_{\\bullet 3})^{3+8+7}(1-p_{\\bullet 1}-p_{\\bullet 2}-p_{\\bullet 3})^{13+18+24} \\\\
&amp;= (p_{1\\bullet})^{x_{1\\bullet}}(p_{2\\bullet})^{x_{2\\bullet}}(p_{3\\bullet})^{x_{3\\bullet}}(p_{\\bullet 1})^{x_{\\bullet 1}}(p_{\\bullet 2})^{x_{\\bullet 2}}(p_{\\bullet 3})^{x_{\\bullet 3}}(p_{\\bullet 4})^{x_{\\bullet 4}},
\\end{aligned}$$</div>
where $p_{3\\bullet} = 1-p_{1\\bullet}-p_{2\\bullet}$ and $p_{\\bullet 4} = 1-p_{\\bullet 1}-p_{\\bullet 2}-p_{\\bullet 3}$.

The log-likelihood is therefore a sum of two independent multinomial log-likelihoods, one for the rows and one for the columns, and each is maximised in the usual way. For $p_{1\\bullet}$ and $p_{2\\bullet}$ the score equations are
<div class="display">$$0 = \\frac{\\partial\\ell}{\\partial p_{1\\bullet}} = \\frac{x_{1\\bullet}}{p_{1\\bullet}} - \\frac{x_{3\\bullet}}{p_{3\\bullet}}, \\qquad 0 = \\frac{\\partial\\ell}{\\partial p_{2\\bullet}} = \\frac{x_{2\\bullet}}{p_{2\\bullet}} - \\frac{x_{3\\bullet}}{p_{3\\bullet}},$$</div>
so $x_{i\\bullet}/p_{i\\bullet}$ is the same constant $k$ for all three rows. Summing, $\\sum_i x_{i\\bullet} = k\\sum_i p_{i\\bullet} = k$, so $k = n$ and $\\hat{p}_{i\\bullet} = x_{i\\bullet}/n$. The column estimates follow by the identical argument. Numerically,
<div class="display">$$\\hat{p}_{1\\bullet} = 28/249, \\quad \\hat{p}_{2\\bullet} = 85/249, \\quad \\hat{p}_{3\\bullet} = 136/249,$$</div>
<div class="display">$$\\hat{p}_{\\bullet 1} = 89/249, \\quad \\hat{p}_{\\bullet 2} = 87/249, \\quad \\hat{p}_{\\bullet 3} = 18/249, \\quad \\hat{p}_{\\bullet 4} = 55/249.$$</div>`
      },
      {
        l: "d",
        t: `The expected count in cell $(i,j)$ is $n\\,\\hat{p}_{i\\bullet}\\hat{p}_{\\bullet j} = x_{i\\bullet}x_{\\bullet j}/n$. For example, the first cell has expected count $28 \\times 89/249 = 10.01$. For all cells:
<table>
<tr><th>severity</th><th>O</th><th>A</th><th>AB</th><th>B</th></tr>
<tr><td>moderate or advanced</td><td>10.01</td><td>9.78</td><td>2.02</td><td>6.18</td></tr>
<tr><td>minimal</td><td>30.38</td><td>29.70</td><td>6.14</td><td>18.78</td></tr>
<tr><td>not present</td><td>48.61</td><td>47.52</td><td>9.83</td><td>30.04</td></tr>
</table>`
      },
      {
        l: "e",
        t: `With no restrictions on $\\mathbf{p}$, the multinomial likelihood is maximised at the sample proportions:
<div class="display">$$\\hat{p}_{ij} = \\frac{x_{ij}}{n},$$</div>
so for example $\\hat{p}_{11} = 7/249$, and similarly for every other cell.`
      },
      {
        l: "f",
        t: `A convenient form of $-2\\log\\Lambda$ for multinomial data compares observed against expected counts:
<div class="display">$$-2\\log\\Lambda = 2\\sum_{\\text{cells}}O\\log\\frac{O}{E}.$$</div>
Evaluating over the $12$ cells,
<div class="display">$$-2\\log\\Lambda = 2\\left[7\\log\\frac{7}{10.01} + 5\\log\\frac{5}{9.78} + \\cdots + 24\\log\\frac{24}{30.04}\\right] = 14.21.$$</div>
Hence
<div class="display">$$\\Lambda = e^{-14.21/2} = 8.2\\times10^{-4} \\approx \\frac{1}{1220}.$$</div>
<em>Interpretation:</em> the observed table was about $1220$ times more likely under the alternative than under the null.`
      },
      {
        l: "g",
        t: `Using the expected counts from part (d),
<div class="display">$$\\chi^{2} = \\sum_{\\text{cells}}\\frac{(O-E)^{2}}{E} = \\frac{(7-10.01)^{2}}{10.01} + \\frac{(5-9.78)^{2}}{9.78} + \\cdots + \\frac{(24-30.04)^{2}}{30.04} = 15.37.$$</div>
So Pearson's statistic ($15.37$) is numerically close to $-2\\log\\Lambda$ ($14.21$) — as it always is for large samples, since both are approximations to the same quadratic form. Conclusions based on either statistic will agree.`
      },
      {
        l: "h",
        t: `The degrees of freedom are
<div class="display">$$(3-1)(4-1) = 6,$$</div>
matching the count of free parameters: $12 - 1 = 11$ under the alternative against $2 + 3 = 5$ under the null, giving $11 - 5 = 6$.

Using Pearson's statistic,
<div class="display">$$p = P(\\chi^{2}_{6} \\ge 15.37) = 0.0176 \\approx 1.8\\%.$$</div>
(Using $-2\\log\\Lambda = 14.21$ instead gives $p = 0.0274$, the same conclusion.)

<strong>Conclusion for a population health scientist.</strong> There is moderately strong evidence that tuberculosis severity is related to ABO blood type in this population. Inspecting the table, the clearest departure is that Eskimos with blood type B appear to have more moderate/advanced tuberculosis than expected if severity were unrelated to blood type: the observed count is $13$ against an expected $6.18$. Blood type AB shows the opposite tendency, though on a very small count.`
      },
      {
        l: "i",
        t: `An alternative is <strong>Fisher's exact test</strong>, which does not rely on the $\\chi^{2}$ approximation.

The argument runs as follows. If tuberculosis severity is unrelated to blood type, then the total number of Eskimos with blood type O, A, AB or B would have been exactly what it was regardless of tuberculosis incidence — it depends on the genetics of the population, not on the disease. Likewise the totals with moderate/advanced, minimal or no tuberculosis would have been unchanged, since each person's disease status was determined by medical factors unrelated to blood type. The <em>margins</em> of the table can therefore be regarded as fixed. Under the null, every table with these same margins would then be equally likely, so we can permute the entries while keeping the margins fixed and compare the observed table with the resulting distribution.

Carrying this out (with $100{,}000$ simulated tables, since the enumeration is large):
<pre><code>table2 = matrix(c(7,5,3,13, 27,32,8,18, 55,50,7,24), nrow = 3, byrow = TRUE)
chisq.test(table2, simulate.p.value = TRUE, B = 100000)

# Pearson's Chi-squared test with simulated p-value
# (based on 1e+05 replicates)
# X-squared = 15.37, df = NA, p-value = 0.01686</code></pre>
The simulated $p$-value is $0.0169$, very close to the asymptotic $0.0176$ from part (h).

<strong>The conclusion does not change.</strong> There is still moderately strong evidence that tuberculosis severity is related to ABO blood type. With only $3$ counts in the AB cell the asymptotic approximation was indeed slightly suspect, but here it performed well — as it usually does once the total sample size is reasonably large, even if one cell count is small. ($\\texttt{fisher.test}(\\texttt{table2, simulate.p.value=TRUE})$ gives about $0.021$, which is also acceptable; simulated $p$-values vary slightly from run to run.)`
      }
    ]
  },

  {
    id: "a4q4",
    group: "Assignment 4",
    label: "Question 4",
    source: "assignment",
    title: "Vitamin B12, antibiotics and weight gain: a two-way ANOVA",
    difficulty: "Medium",
    topics: ["anova", "regression"],
    stem: `A trial examined the effects of vitamin B12 dietary supplements and antibiotics on weight gain in pigs. Twelve adult pigs were randomly divided into four groups (standard chow; chow with vitamin B12; chow with antibiotics; chow with both). After one week their weight gain (in grams) was recorded.

We model the weight gains using a two-way ANOVA with interaction:
<div class="display">$$Y_{jki} = \\mu + \\alpha_j + \\beta_k + \\delta_{jk} + \\varepsilon_{jki},$$</div>
where $j = 1,2$ indexes antibiotics, $k = 1,2$ indexes vitamin B12, and $i = 1,2,3$ indexes the observations within each group, with $\\varepsilon_{jki} \\overset{\\text{iid}}{\\sim} \\mathrm{N}(0,\\sigma^{2})$.

Using the contrast constraints $\\alpha_1 = 0$, $\\beta_1 = 0$ and $\\delta_{1k} = \\delta_{j1} = 0$, $\\mu$ is the mean of the baseline group (no antibiotics, no vitamin B12), $\\alpha_2$ is the mean change from adding antibiotics only, $\\beta_2$ the mean change from adding vitamin B12 only, and $\\delta_{22}$ the additional mean change from adding both simultaneously.`,
    parts: [
      { l: "a", t: `Show that under the contrast constraints the MLEs are
<div class="display">$$\\hat{\\mu} = \\bar{Y}_{11\\bullet}, \\quad \\hat{\\alpha}_2 = \\bar{Y}_{21\\bullet} - \\bar{Y}_{11\\bullet}, \\quad \\hat{\\beta}_2 = \\bar{Y}_{12\\bullet} - \\bar{Y}_{11\\bullet}, \\quad \\hat{\\delta}_{22} = \\bar{Y}_{22\\bullet} - \\bar{Y}_{21\\bullet} - \\bar{Y}_{12\\bullet} + \\bar{Y}_{11\\bullet}.$$</div>` },
      { l: "b", t: `Show that the sum-of-squares decomposition
<div class="display">$$\\mathrm{SS}_{\\text{Total}} = \\mathrm{SS}_{A} + \\mathrm{SS}_{B} + \\mathrm{SS}_{AB} + \\mathrm{SS}_{\\text{residual}}$$</div>
holds, where $\\mathrm{SS}_{\\text{Total}} = \\sum_{jki}(Y_{jki}-\\bar{Y}_{\\bullet\\bullet\\bullet})^{2}$, $\\mathrm{SS}_A = \\sum_{jki}(\\bar{Y}_{j\\bullet\\bullet}-\\bar{Y}_{\\bullet\\bullet\\bullet})^{2}$, $\\mathrm{SS}_B = \\sum_{jki}(\\bar{Y}_{\\bullet k\\bullet}-\\bar{Y}_{\\bullet\\bullet\\bullet})^{2}$, $\\mathrm{SS}_{AB} = \\sum_{jki}(\\bar{Y}_{jk\\bullet}-\\bar{Y}_{j\\bullet\\bullet}-\\bar{Y}_{\\bullet k\\bullet}+\\bar{Y}_{\\bullet\\bullet\\bullet})^{2}$ and $\\mathrm{SS}_{\\text{residual}} = \\sum_{jki}(Y_{jki}-\\bar{Y}_{jk\\bullet})^{2}$. <em>Hint:</em> start from
<div class="display">$$Y_{jki}-\\bar{Y}_{\\bullet\\bullet\\bullet} = (Y_{jki}-\\bar{Y}_{jk\\bullet}) + (\\bar{Y}_{j\\bullet\\bullet}-\\bar{Y}_{\\bullet\\bullet\\bullet}) + (\\bar{Y}_{\\bullet k\\bullet}-\\bar{Y}_{\\bullet\\bullet\\bullet}) + (\\bar{Y}_{jk\\bullet}-\\bar{Y}_{j\\bullet\\bullet}-\\bar{Y}_{\\bullet k\\bullet}+\\bar{Y}_{\\bullet\\bullet\\bullet}).$$</div>` },
      { l: "c", t: `Explain why $\\mathrm{SS}_{\\text{residual}}/\\sigma^{2} \\sim \\chi^{2}_{\\mathrm{df}_{\\text{residual}}}$, where $\\mathrm{df}_{\\text{residual}} = JK(r-1) = 8$, with $J = K = 2$ and $r = 3$.` },
      { l: "d", t: `Briefly argue why $\\mathrm{SS}_{\\text{residual}}$ is independent of $\\mathrm{SS}_{AB}$.` },
      { l: "e", t: `Under $H_0$: all interaction terms $\\delta_{jk} = 0$, it can be shown that $\\mathrm{SS}_{AB}/\\sigma^{2} \\sim \\chi^{2}_{\\mathrm{df}_{AB}}$ with $\\mathrm{df}_{AB} = (J-1)(K-1) = 1$. Using parts (c) and (d), argue why the null distribution of
<div class="display">$$F = \\frac{\\mathrm{MS}_{AB}}{\\mathrm{MS}_{\\text{residual}}} = \\frac{\\mathrm{SS}_{AB}/\\mathrm{df}_{AB}}{\\mathrm{SS}_{\\text{residual}}/\\mathrm{df}_{\\text{residual}}}$$</div>
is an $F$ distribution with numerator degrees of freedom $\\mathrm{df}_{AB}$ and denominator degrees of freedom $\\mathrm{df}_{\\text{residual}}$.` },
      {
        l: "f",
        t: `A partially complete two-way ANOVA table for the pigs data is
<table>
<tr><th>Source</th><th>df</th><th>SS</th><th>MS</th><th>$F$</th><th>$P$</th></tr>
<tr><td>VitaminB12</td><td>1</td><td>218700</td><td>218700</td><td>60.33</td><td>$< 0.0001$</td></tr>
<tr><td>Antibiotics</td><td>1</td><td>19200</td><td>19200</td><td>5.30</td><td>$\\approx 0.05$</td></tr>
<tr><td>VitaminB12:Antibiotics</td><td>1</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
<tr><td>Residuals</td><td>?</td><td>29000</td><td>?</td><td></td><td></td></tr>
<tr><td>Total</td><td>11</td><td>439700</td><td></td><td></td><td></td></tr>
</table>
Using your results from parts (b) and (e), complete the table. Hence summarise the main finding(s) of this experiment and write a short conclusion.`
      }
    ],
    answer: [
      {
        l: "a",
        t: `Each observation has distribution $Y_{jki} \\overset{\\text{ind}}{\\sim} \\mathrm{N}(\\mu+\\alpha_j+\\beta_k+\\delta_{jk},\\,\\sigma^{2})$, so
<div class="display">$$L(\\mu,\\boldsymbol{\\alpha},\\boldsymbol{\\beta},\\boldsymbol{\\delta}\\mid\\mathbf{Y}) = \\left(\\frac{1}{2\\pi\\sigma^{2}}\\right)^{N/2}\\exp\\left\\{-\\frac{1}{2\\sigma^{2}}\\sum_{jki}(Y_{jki}-\\mu-\\alpha_j-\\beta_k-\\delta_{jk})^{2}\\right\\}$$</div>
with $N = 12$. Maximising the likelihood over the mean parameters is equivalent to minimising the sum of squares in the exponent. Under the contrast constraints the only free mean parameters are $\\mu, \\alpha_2, \\beta_2, \\delta_{22}$.

Differentiating with respect to $\\delta_{22}$ (only the $(j,k) = (2,2)$ cell is affected):
<div class="display">$$0 = -2\\sum_{i}(Y_{22i}-\\mu-\\alpha_2-\\beta_2-\\delta_{22}) \\;\\Longrightarrow\\; 3\\delta_{22} = \\sum_i Y_{22i} - 3\\mu - 3\\alpha_2 - 3\\beta_2,$$</div>
so $\\delta_{22} = \\bar{Y}_{22\\bullet}-\\mu-\\alpha_2-\\beta_2$.

Differentiating with respect to $\\alpha_2$ (six observations, recalling $\\alpha_1 = \\delta_{21} = 0$):
<div class="display">$$0 = -2\\sum_{k,i}(Y_{2ki}-\\mu-\\alpha_2-\\beta_k-\\delta_{2k}) \\;\\Longrightarrow\\; \\alpha_2 = \\bar{Y}_{2\\bullet\\bullet} - \\mu - \\tfrac{1}{2}\\beta_2 - \\tfrac{1}{2}\\delta_{22}.$$</div>
Substituting the expression for $\\delta_{22}$ and using $\\bar{Y}_{2\\bullet\\bullet} = \\tfrac{1}{2}(\\bar{Y}_{21\\bullet}+\\bar{Y}_{22\\bullet})$ for the balanced design,
<div class="display">$$\\alpha_2 = \\bar{Y}_{2\\bullet\\bullet} - \\tfrac{1}{2}\\beta_2 - \\tfrac{1}{2}(\\bar{Y}_{22\\bullet}-\\mu-\\alpha_2-\\beta_2) - \\mu.$$</div>
The $\\beta_2$ terms cancel, and solving the remaining equation for $\\alpha_2$ gives $\\alpha_2 = \\bar{Y}_{21\\bullet} - \\mu$. Symmetrically, $\\beta_2 = \\bar{Y}_{12\\bullet} - \\mu$.

Substituting both into $\\delta_{22}$ gives $\\delta_{22} = \\bar{Y}_{22\\bullet}-\\bar{Y}_{21\\bullet}-\\bar{Y}_{12\\bullet}+\\mu$. Finally differentiating with respect to $\\mu$ and substituting everything,
<div class="display">$$\\mu = \\bar{Y}_{\\bullet\\bullet\\bullet} - \\tfrac{1}{2}\\alpha_2 - \\tfrac{1}{2}\\beta_2 - \\tfrac{1}{4}\\delta_{22} = \\bar{Y}_{11\\bullet},$$</div>
using $4\\bar{Y}_{\\bullet\\bullet\\bullet} = \\bar{Y}_{11\\bullet}+\\bar{Y}_{12\\bullet}+\\bar{Y}_{21\\bullet}+\\bar{Y}_{22\\bullet}$ in the balanced design. Back-substituting,
<div class="display">$$\\hat{\\mu} = \\bar{Y}_{11\\bullet}, \\quad \\hat{\\alpha}_2 = \\bar{Y}_{21\\bullet}-\\bar{Y}_{11\\bullet}, \\quad \\hat{\\beta}_2 = \\bar{Y}_{12\\bullet}-\\bar{Y}_{11\\bullet}, \\quad \\hat{\\delta}_{22} = \\bar{Y}_{22\\bullet}-\\bar{Y}_{21\\bullet}-\\bar{Y}_{12\\bullet}+\\bar{Y}_{11\\bullet}.$$</div>
(A much quicker route: there are exactly four free mean parameters and four group means, so the fitted group means must equal the sample group means. Solving the four resulting equations gives the same answer.)`
      },
      {
        l: "b",
        t: `Squaring the hinted identity and summing over $j,k,i$ produces the four squared terms plus six cross-product terms. Every cross-product is zero:

<ul>
<li>The three terms involving $(Y_{jki}-\\bar{Y}_{jk\\bullet})$ multiply it by a quantity that does not depend on $i$, and $\\sum_i (Y_{jki}-\\bar{Y}_{jk\\bullet}) = 0$ for every cell $(j,k)$.</li>
<li>$\\sum_{jki}(\\bar{Y}_{j\\bullet\\bullet}-\\bar{Y}_{\\bullet\\bullet\\bullet})(\\bar{Y}_{\\bullet k\\bullet}-\\bar{Y}_{\\bullet\\bullet\\bullet}) = 3\\left(\\sum_j (\\bar{Y}_{j\\bullet\\bullet}-\\bar{Y}_{\\bullet\\bullet\\bullet})\\right)\\left(\\sum_k (\\bar{Y}_{\\bullet k\\bullet}-\\bar{Y}_{\\bullet\\bullet\\bullet})\\right) = 0$, since each bracket sums to zero.</li>
<li>$\\sum_k(\\bar{Y}_{jk\\bullet}-\\bar{Y}_{j\\bullet\\bullet}-\\bar{Y}_{\\bullet k\\bullet}+\\bar{Y}_{\\bullet\\bullet\\bullet}) = 2\\bar{Y}_{j\\bullet\\bullet}-2\\bar{Y}_{j\\bullet\\bullet}-2\\bar{Y}_{\\bullet\\bullet\\bullet}+2\\bar{Y}_{\\bullet\\bullet\\bullet} = 0$ for every $j$, which kills the second-last cross term; summing over $j$ kills the last one.</li>
</ul>

What survives is exactly
<div class="display">$$\\mathrm{SS}_{\\text{Total}} = \\mathrm{SS}_{\\text{residual}} + \\mathrm{SS}_{A} + \\mathrm{SS}_{B} + \\mathrm{SS}_{AB},$$</div>
as required.`
      },
      {
        l: "c",
        t: `Within each of the $JK = 4$ cells, the observations are iid normal with common variance $\\sigma^{2}$, so the within-cell sum of squares $\\sum_i (Y_{jki}-\\bar{Y}_{jk\\bullet})^{2}$ has a $\\sigma^{2}\\chi^{2}_{r-1}$ distribution with $r-1 = 2$ degrees of freedom. The four cells are independent of one another, and
<div class="display">$$\\mathrm{SS}_{\\text{residual}} = \\sum_{j,k}\\sum_{i}(Y_{jki}-\\bar{Y}_{jk\\bullet})^{2}$$</div>
is a sum of four independent $\\sigma^{2}\\chi^{2}_{2}$ variables. Sums of independent $\\chi^{2}$ variables have $\\chi^{2}$ distributions with the degrees of freedom added, so
<div class="display">$$\\frac{\\mathrm{SS}_{\\text{residual}}}{\\sigma^{2}} \\sim \\chi^{2}_{8},$$</div>
matching $JK(r-1) = 4 \\times 2 = 8$.`
      },
      {
        l: "d",
        t: `Within each cell, the sample mean $\\bar{Y}_{jk\\bullet}$ and the within-cell sum of squares $\\sum_i(Y_{jki}-\\bar{Y}_{jk\\bullet})^{2}$ are independent for normal data (a standard result: for a normal sample, the sample mean is independent of the deviations about it). Hence the total residual sum of squares — a sum of these within-cell quantities — is independent of all the cell means $\\{\\bar{Y}_{jk\\bullet}\\}$.

Now $\\mathrm{SS}_{AB} = \\sum_{jki}(\\bar{Y}_{jk\\bullet}-\\bar{Y}_{j\\bullet\\bullet}-\\bar{Y}_{\\bullet k\\bullet}+\\bar{Y}_{\\bullet\\bullet\\bullet})^{2}$ depends only on the cell means $\\{\\bar{Y}_{jk\\bullet}\\}$, since every term is a function of cell means alone. Therefore $\\mathrm{SS}_{\\text{residual}}$ is independent of $\\mathrm{SS}_{AB}$.`
      },
      {
        l: "e",
        t: `By part (c) and the given result,
<div class="display">$$F = \\frac{\\mathrm{SS}_{AB}/\\mathrm{df}_{AB}}{\\mathrm{SS}_{\\text{residual}}/\\mathrm{df}_{\\text{residual}}} = \\frac{\\left(\\mathrm{SS}_{AB}/\\sigma^{2}\\right)/\\mathrm{df}_{AB}}{\\left(\\mathrm{SS}_{\\text{residual}}/\\sigma^{2}\\right)/\\mathrm{df}_{\\text{residual}}} \\sim \\frac{\\chi^{2}_{\\mathrm{df}_{AB}}/\\mathrm{df}_{AB}}{\\chi^{2}_{\\mathrm{df}_{\\text{residual}}}/\\mathrm{df}_{\\text{residual}}},$$</div>
the $\\sigma^{2}$'s having cancelled. The numerator is independent of the denominator by part (d), and a ratio of two independent $\\chi^{2}$ variables each divided by its degrees of freedom has, by definition, an $F$ distribution with those degrees of freedom. Hence
<div class="display">$$F \\sim F_{\\mathrm{df}_{AB},\\; \\mathrm{df}_{\\text{residual}}} = F_{1,8}.$$</div>`
      },
      {
        l: "f",
        t: `By the decomposition of part (b),
<div class="display">$$\\mathrm{SS}_{AB} = 439700 - 218700 - 19200 - 29000 = 172800.$$</div>
The residual degrees of freedom are $11 - 1 - 1 - 1 = 8$, and $\\mathrm{MS} = \\mathrm{SS}/\\mathrm{df}$ throughout. The completed table is
<table>
<tr><th>Source</th><th>df</th><th>SS</th><th>MS</th><th>$F$</th><th>$P$</th></tr>
<tr><td>VitaminB12</td><td>1</td><td>218700</td><td>218700</td><td>60.33</td><td>$< 0.0001$</td></tr>
<tr><td>Antibiotics</td><td>1</td><td>19200</td><td>19200</td><td>5.30</td><td>$\\approx 0.05$</td></tr>
<tr><td>VitaminB12:Antibiotics</td><td>1</td><td>172800</td><td>172800</td><td>47.67</td><td>$0.0001$</td></tr>
<tr><td>Residuals</td><td>8</td><td>29000</td><td>3625</td><td></td><td></td></tr>
<tr><td>Total</td><td>11</td><td>439700</td><td></td><td></td><td></td></tr>
</table>
Here $\\mathrm{MS}_{\\text{residual}} = 29000/8 = 3625$, and for example $F_{AB} = 172800/3625 = 47.67$ with
<div class="display">$$P(F_{1,8} \\ge 47.67) = 0.0001.$$</div>

<strong>Findings.</strong> The interaction should be assessed first, and it is highly significant. This means the effect of vitamin B12 depends on whether antibiotics are present, and vice versa; consequently we should <em>not</em> interpret the two main effects in isolation. In particular, quoting a single "effect of antibiotics" from the $F = 5.30$ row would be misleading, because that main effect is an average over two situations in which the effect is very different.

Looking at the raw weight gains, vitamin B12 has a large positive effect when antibiotics are present but little effect when they are absent. The 172800 of interaction sum of squares — nearly $40\\%$ of the total variation — is direct evidence of this.

<strong>Conclusion.</strong> Both supplements matter, but their effects are not additive: the benefit of vitamin B12 is realised largely in the presence of antibiotics. A recommendation would be to consider the combination, rather than either supplement alone.`
      }
    ]
  },

  {
    id: "a4q5",
    group: "Assignment 4",
    label: "Question 5 (STAT2904)",
    source: "assignment",
    title: "GLRT for a Pareto tail index",
    difficulty: "Hard",
    topics: ["lrt", "mle", "testing"],
    stem: `Let $X_1,\\dots,X_n$ be iid random variables from a Pareto distribution with density
<div class="display">$$f(x\\mid\\theta,\\nu) = \\begin{cases}\\dfrac{\\theta\\nu^{\\theta}}{x^{\\theta+1}}, &amp; x \\ge \\nu, \\\\[6pt] 0, &amp; \\text{otherwise},\\end{cases}$$</div>
where $\\theta, \\nu > 0$ are two unknown parameters.`,
    parts: [
      { l: "a", t: `Find the MLEs for $\\theta$ and $\\nu$.` },
      { l: "b", t: `If it is given that $\\theta = 1$, does that change the MLE for $\\nu$?` },
      { l: "c", t: `Construct a generalised likelihood ratio test for
<div class="display">$$H_0 : \\theta = 1, \\;\\nu \\text{ unknown} \\quad\\text{versus}\\quad H_1 : \\theta \\neq 1, \\;\\nu \\text{ unknown},$$</div>
and show that it reduces to a test based on either small or large values of
<div class="display">$$T(\\mathbf{X}) = \\log\\left[\\frac{\\prod_{i=1}^{n}X_i}{(\\min_i X_i)^{n}}\\right].$$</div>` }
    ],
    answer: [
      {
        l: "a",
        t: `The likelihood is
<div class="display">$$L(\\theta,\\nu) = \\begin{cases}\\theta^{n}\\nu^{n\\theta}\\prod_{i=1}^{n}X_i^{-(\\theta+1)}, &amp; \\nu \\le \\text{all } X_i, \\\\ 0, &amp; \\text{otherwise.}\\end{cases}$$</div>
For each fixed $\\theta > 0$ this is a strictly increasing function of $\\nu$ — the larger $\\nu$, the larger the likelihood — but $\\nu$ cannot exceed any observation without the likelihood switching to zero. Hence
<div class="display">$$\\hat{\\nu} = \\min_i X_i.$$</div>

Fixing $\\nu = \\hat{\\nu}$, the log-likelihood is
<div class="display">$$\\ell(\\theta) = n\\log\\theta + n\\theta\\log\\hat{\\nu} - (\\theta+1)\\sum_{i=1}^{n}\\log X_i,$$</div>
and differentiating with respect to $\\theta$,
<div class="display">$$0 = \\frac{n}{\\theta} + n\\log\\hat{\\nu} - \\sum_{i=1}^{n}\\log X_i \\;\\Longrightarrow\\; \\hat{\\theta} = \\frac{n}{\\sum_i \\log X_i - n\\log\\hat{\\nu}} = \\frac{n}{\\sum_i \\log(X_i/\\hat{\\nu})}.$$</div>
Note that $\\hat{\\theta} = n/T(\\mathbf{X})$, where $T$ is the statistic defined in part (c).`
      },
      {
        l: "b",
        t: `No. The MLE for $\\nu$ is $\\hat{\\nu} = \\min_i X_i$ regardless of the value of $\\theta$: in part (a) the argument for $\\nu$ did not use any particular $\\theta$, because for every $\\theta > 0$ the likelihood increases in $\\nu$ until the support constraint binds. Knowing $\\theta = 1$ therefore leaves $\\hat{\\nu}$ unchanged; only the MLE for $\\theta$ is affected (it is fixed at $1$).`
      },
      {
        l: "c",
        t: `The generalised likelihood ratio is
<div class="display">$$\\Lambda = \\frac{\\sup_{H_0}L(\\theta,\\nu)}{\\sup_{H_1}L(\\theta,\\nu)} = \\frac{L(1,\\hat{\\nu})}{L(\\hat{\\theta},\\hat{\\nu})}.$$</div>
Since $\\hat{\\nu} = \\min_i X_i$ under both hypotheses, writing $m = \\hat{\\nu}$ and $P = \\prod_i X_i$,
<div class="display">$$L(1,m) = m^{n}\\prod_i X_i^{-2}, \\qquad L(\\hat{\\theta},m) = \\hat{\\theta}^{n}m^{n\\hat{\\theta}}\\prod_i X_i^{-(\\hat{\\theta}+1)}.$$</div>
Dividing,
<div class="display">$$\\begin{aligned}
\\Lambda &amp;= \\hat{\\theta}^{-n}\\,m^{n-n\\hat{\\theta}}\\prod_i X_i^{\\hat{\\theta}-1}
= \\hat{\\theta}^{-n}\\left(\\frac{\\prod_i X_i}{m^{n}}\\right)^{\\hat{\\theta}-1} \\\\
&amp;= \\hat{\\theta}^{-n}e^{T(\\hat{\\theta}-1)},
\\end{aligned}$$</div>
using $T = \\log\\left[\\prod_i X_i/m^{n}\\right]$. Substituting $\\hat{\\theta} = n/T$,
<div class="display">$$\\Lambda = \\left(\\frac{T}{n}\\right)^{n}e^{n-T},$$</div>
which is a function of $T$ alone.

Now differentiate $\\log\\Lambda = n\\log T - n\\log n + n - T$ with respect to $T$:
<div class="display">$$\\frac{d}{dT}\\log\\Lambda = \\frac{n}{T} - 1,$$</div>
which is positive for $T < n$ and negative for $T > n$. So $\\Lambda$ increases in $T$ up to its maximum value of $1$ at $T = n$ (corresponding to $\\hat{\\theta} = 1$, exactly the null), and then decreases.

Hence <em>small</em> values of $\\Lambda$ correspond to $T$ being either small or large, and the GLRT rejects $H_0$ when
<div class="display">$$\\{T \\le c_1\\} \\cup \\{T \\ge c_2\\}.$$</div>

<em>Computer note.</em> The original question continued by asking you to simulate the null distribution of $T$ (for $n = 25$ with $\\nu = 2.1$) in order to locate the critical values $c_1, c_2$, since the distribution of $T$ is too difficult to derive analytically. That part requires a computer and is therefore not included here; the analytic content, which is what an exam can test, is the reduction above together with the observation that the critical values must be obtained by simulation because $T$ has no closed-form null distribution.`
      }
    ]
  },

  {
    id: "a4q6",
    group: "Assignment 4",
    label: "Question 6 (bonus)",
    source: "assignment",
    title: "A pivot when the variance grows with the mean",
    difficulty: "Medium",
    topics: ["ci", "sampling", "distributions"],
    stem: `In some settings the measurement variability increases as the measurement itself increases. Rather than model such measurements as $\\mathrm{N}(\\mu,\\sigma^{2})$, one may use $\\mathrm{N}(\\mu,\\mu^{2})$, in which the variance increases with the mean.

Let $X_1,\\dots,X_n \\overset{\\text{iid}}{\\sim} \\mathrm{N}(\\mu,\\mu^{2})$, where the mean $\\mu > 0$ is an unknown parameter.`,
    parts: [
      { l: "a", t: `Suggest a pivot transformation for this problem.` },
      { l: "b", t: `Using your result from part (a), or otherwise, explain how a $90\\%$ confidence interval for $\\mu$ can be constructed based on the observations $X_1,\\dots,X_n$.` }
    ],
    answer: [
      {
        l: "a",
        t: `Since $\\mathrm{E}(X_i) = \\mu$ and $\\mathrm{Var}(X_i) = \\mu^{2}$, the standardised observation
<div class="display">$$Z_i = \\frac{X_i - \\mu}{\\mu} = \\frac{X_i}{\\mu} - 1 \\sim \\mathrm{N}(0,1)$$</div>
is free of $\\mu$. Averaging,
<div class="display">$$U = \\frac{\\bar{X} - \\mu}{\\mu/\\sqrt{n}} = \\sqrt{n}\\,\\frac{\\bar{X}-\\mu}{\\mu} \\sim \\mathrm{N}(0,1),$$</div>
and the distribution of $U$ does not depend on $\\mu$, so $U$ is a pivot for $\\mu$.

Note a pleasant feature of this model: the variance is a known function of the parameter, so no separate estimate of spread is needed and the pivot is exactly standard normal — there is no $t$ distribution and no appeal to the central limit theorem, even for small $n$.`
      },
      {
        l: "b",
        t: `Starting from the $90\\%$ statement about the standard normal, with $z_{0.95} = 1.645$,
<div class="display">$$0.90 = P(-1.645 \\le U \\le 1.645) = P\\left(-1.645 \\le \\sqrt{n}\\,\\frac{\\bar{X}-\\mu}{\\mu} \\le 1.645\\right).$$</div>
Write $c = 1.645/\\sqrt{n}$. Then the event inside the probability is
<div class="display">$$-c \\le \\frac{\\bar{X}}{\\mu} - 1 \\le c \\;\\Longleftrightarrow\\; 1-c \\le \\frac{\\bar{X}}{\\mu} \\le 1+c.$$</div>
Since $\\mu > 0$ and (provided $c < 1$) both bounds are positive, inverting gives
<div class="display">$$\\frac{\\bar{X}}{1+c} \\le \\mu \\le \\frac{\\bar{X}}{1-c}.$$</div>
So a $90\\%$ confidence interval for $\\mu$ is
<div class="display">$$\\left(\\frac{\\bar{X}}{1 + 1.645/\\sqrt{n}},\\; \\frac{\\bar{X}}{1 - 1.645/\\sqrt{n}}\\right).$$</div>
Provided $\\sqrt{n} > 1.645$, i.e. $n \\ge 3$, this is a proper interval with both endpoints positive. Note that it is <em>not</em> symmetric about $\\bar{X}$: because the variance grows with the mean, the plausible values of $\\mu$ below $\\bar{X}$ are compressed relative to those above it, so the interval extends further above $\\bar{X}$ than below.`
      }
    ]
  }
);
