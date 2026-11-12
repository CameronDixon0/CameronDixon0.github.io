/* Week 7 — Applied Class */
(window.QBANK = window.QBANK || []).push(
  {
    id: "w07q1",
    week: 7,
    label: "Question 1",
    title: "Challenger O-rings: $T_{50}$, the delta method and changing units",
    difficulty: "Medium",
    topics: ["logistic", "mle", "info"],
    stem: `Before the launch of the space shuttle Challenger, information was available from 23 previous shuttle launches. For launch $i$ let $Y_i = 1$ if an incident of damage to the field-joint O-rings was observed and $Y_i = 0$ otherwise, and let $x_i$ denote the launch temperature in degrees Fahrenheit. Consider the logistic regression model
<div class="display">$$Y_i \\sim \\mathrm{Bernoulli}(p_i), \\qquad \\log\\left(\\frac{p_i}{1-p_i}\\right) = \\beta_0 + \\beta_1 x_i.$$</div>
The data and model are entered in R as follows, with relevant output shown.
<pre><code>orings &lt;- data.frame(
  temperature = c(53, 57, 58, 63, 66, 67, 67, 67, 68, 69,
                  70, 70, 70, 70, 72, 73, 75, 75, 76, 76,
                  78, 79, 81),
  damage = c(1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
             1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0)
)

fit &lt;- glm(damage ~ temperature, family = binomial, data = orings)
summary(fit)
vcov(fit)

# Coefficients:
#             Estimate Std. Error z value Pr(&gt;|z|)
# (Intercept)  15.0429     7.3786   2.039   0.0415
# temperature  -0.2322     0.1082  -2.145   0.0320
#
# &gt; vcov(fit)
#             (Intercept) temperature
# (Intercept)   54.444183   -0.796385
# temperature   -0.796385    0.011715</code></pre>
Let $T_{50}$ be the launch temperature at which the model gives a probability of $0.5$ that an O-ring damage incident occurs.`,
    parts: [
      { l: "a", t: `Express $T_{50}$ in terms of $\\beta_0$ and $\\beta_1$. Hence determine its maximum likelihood estimate and state the property of maximum likelihood estimators used.` },
      { l: "b", t: `Suppose that $\\hat{\\theta}$ is an MLE of $\\theta \\in \\mathbb{R}^{d}$ and that $g : \\mathbb{R}^{d} \\to \\mathbb{R}$ is differentiable. Recall that
<div class="display">$$g(\\hat{\\theta}) \\;\\dot{\\sim}\\; \\mathrm{N}\\left(g(\\theta),\\; \\nabla g(\\theta)^{\\top} I(\\theta)^{-1} \\nabla g(\\theta)\\right).$$</div>
Use this result and the output from <code>vcov(fit)</code> to calculate the estimated standard error of $\\hat{T}_{50}$.` },
      { l: "c", t: `Suppose temperature is instead measured in degrees Celsius, with $C = \\tfrac{5}{9}(T-32)$. Express the logistic regression model in terms of $C$. Determine how the fitted intercept, fitted slope, $\\hat{T}_{50}$ and its estimated standard error change. Explain why the fitted probabilities do not change.` }
    ],
    answer: [
      {
        l: "a",
        t: `At $T_{50}$ the probability of damage is $0.5$, so the log-odds are zero:
<div class="display">$$0 = \\beta_0 + \\beta_1 T_{50} \\quad\\Longrightarrow\\quad T_{50} = -\\frac{\\beta_0}{\\beta_1}.$$</div>
By the invariance property of maximum likelihood estimators,
<div class="display">$$\\hat{T}_{50} = -\\frac{\\hat{\\beta}_0}{\\hat{\\beta}_1} = -\\frac{15.0429}{-0.2322} = 64.8\\,^{\\circ}\\mathrm{F}.$$</div>`
      },
      {
        l: "b",
        t: `Define $g(\\beta_0,\\beta_1) = -\\beta_0/\\beta_1$. Then
<div class="display">$$\\nabla g(\\beta_0,\\beta_1) = \\left(-\\frac{1}{\\beta_1},\\; \\frac{\\beta_0}{\\beta_1^{2}}\\right)^{\\top}.$$</div>
Evaluated at the MLE,
<div class="display">$$\\nabla g(\\hat{\\beta}_0,\\hat{\\beta}_1) = \\left(-\\frac{1}{-0.2322},\\; \\frac{15.0429}{(-0.2322)^{2}}\\right)^{\\top} = (4.307,\\; 279.091)^{\\top}.$$</div>
The matrix reported by <code>vcov(fit)</code> estimates $I(\\beta)^{-1}$, so
<div class="display">$$\\widehat{\\mathrm{Var}}(\\hat{T}_{50}) = (4.307,\\; 279.091)
\\begin{pmatrix} 54.444183 &amp; -0.796385 \\\\ -0.796385 &amp; 0.011715 \\end{pmatrix}
\\begin{pmatrix} 4.307 \\\\ 279.091 \\end{pmatrix} \\approx 7.891.$$</div>
Hence
<div class="display">$$\\widehat{\\mathrm{se}}(\\hat{T}_{50}) = \\sqrt{7.891} = 2.81\\,^{\\circ}\\mathrm{F}.$$</div>`
      },
      {
        l: "c",
        t: `Since $T = 32 + \\tfrac{9}{5}C$,
<div class="display">$$\\mathrm{logit}(p) = \\beta_0 + \\beta_1\\left(32 + \\tfrac{9}{5}C\\right) = \\left(\\beta_0 + 32\\beta_1\\right) + \\tfrac{9}{5}\\beta_1 C.$$</div>
Writing the model as $\\mathrm{logit}(p) = \\beta_0^{*} + \\beta_1^{*}C$,
<div class="display">$$\\hat{\\beta}_0^{*} = \\hat{\\beta}_0 + 32\\hat{\\beta}_1 = 7.6137, \\qquad \\hat{\\beta}_1^{*} = \\tfrac{9}{5}\\hat{\\beta}_1 = -0.4179.$$</div>
The estimated 50% temperature on the Celsius scale is
<div class="display">$$\\hat{C}_{50} = \\tfrac{5}{9}\\left(\\hat{T}_{50} - 32\\right) = 18.22\\,^{\\circ}\\mathrm{C}.$$</div>
Because the Fahrenheit-to-Celsius conversion multiplies temperature differences by $5/9$,
<div class="display">$$\\widehat{\\mathrm{se}}(\\hat{C}_{50}) = \\tfrac{5}{9}\\,\\widehat{\\mathrm{se}}(\\hat{T}_{50}) = 1.56\\,^{\\circ}\\mathrm{C}.$$</div>
The fitted probabilities do not change, because the re-expressed coefficients give exactly the same fitted linear predictor at every physical temperature.`
      }
    ]
  },

  {
    id: "w07q2",
    week: 7,
    label: "Question 2",
    title: "Kyphosis: interpreting a logistic fit and checking it",
    difficulty: "Medium",
    topics: ["logistic", "diagnostics"],
    stem: `The <code>kyphosis</code> data frame contains information on 81 children who underwent corrective spinal surgery. The response records whether kyphosis was present or absent following surgery. The explanatory variables are the child's age in months (Age), the number of vertebrae involved in the operation (Number), and the number of the first (topmost) vertebra operated on (Start). Define a successful outcome to mean that kyphosis was absent following surgery. The following model was fitted in R.
<pre><code>data(kyphosis, package = "rpart")
kyphosis$success &lt;- as.integer(kyphosis$Kyphosis == "absent")
fit &lt;- glm(success ~ Age + Number + Start, family = binomial, data = kyphosis)
summary(fit)

# Coefficients:
#             Estimate Std. Error z value Pr(&gt;|z|)
# (Intercept)  2.03693    1.44958   1.405 0.16003
# Age         -0.01093    0.00645  -1.696 0.08996
# Number      -0.41060    0.22486  -1.826 0.06791
# Start        0.20651    0.06771   3.050 0.00229
#
# Null deviance: 83.234 on 80 degrees of freedom
# Residual deviance: 61.380 on 77 degrees of freedom
# AIC: 69.380</code></pre>`,
    parts: [
      { l: "a", t: `Write down the fitted logistic regression model.` },
      { l: "b", t: `Interpret the fitted coefficient for Start in terms of the odds of a successful outcome.` },
      { l: "c", t: `Use the fitted coefficient for Age to determine the multiplicative change in the odds of a successful outcome associated with an increase in age of one year, holding Number and Start fixed. Interpret the result.` },
      { l: "d", t: `Explain why a plot of the individual raw residuals $y_i - \\hat{p}_i$ against the fitted linear predictors is difficult to interpret for this model. How does binning the residuals make the plot more informative?` },
      {
        l: "e",
        t: `The raw residuals were binned by fitted linear predictor into $9$ bins, and in each bin the average raw residual was computed together with a reference band of about two standard errors.
<pre><code>library(arm)
binnedplot(x = predict(fit, type = "link"),
           y = residuals(fit, type = "response"),
           nclass = 9,
           xlab = "Fitted linear predictor",
           ylab = "Average raw residual")</code></pre>
The binned summaries were
<table>
<tr><th>bin</th><th>mean fitted $\\hat{\\eta}$</th><th>avg raw residual</th><th>reference band</th><th>obs. success rate</th></tr>
<tr><td>1</td><td>$-0.92$</td><td>$0.017$</td><td>$-0.324$ to $0.359$</td><td>$0.889$</td></tr>
<tr><td>2</td><td>$0.20$</td><td>$0.005$</td><td>$-0.331$ to $0.341$</td><td>$0.778$</td></tr>
<tr><td>3</td><td>$1.04$</td><td>$0.153$</td><td>$-0.052$ to $0.358$</td><td>$0.667$</td></tr>
<tr><td>4</td><td>$1.53$</td><td>$-0.265$</td><td>$-0.614$ to $0.084$</td><td>$1.000$</td></tr>
<tr><td>5</td><td>$2.04$</td><td>$-0.107$</td><td>$-0.403$ to $0.190$</td><td>$0.667$</td></tr>
<tr><td>6</td><td>$2.43$</td><td>$0.081$</td><td>$0.076$ to $0.087$</td><td>$0.667$</td></tr>
<tr><td>7</td><td>$2.72$</td><td>$0.062$</td><td>$0.058$ to $0.066$</td><td>$0.667$</td></tr>
<tr><td>8</td><td>$3.24$</td><td>$0.039$</td><td>$0.032$ to $0.045$</td><td>$1.000$</td></tr>
<tr><td>9</td><td>$4.21$</td><td>$0.015$</td><td>$0.012$ to $0.019$</td><td>$0.778$</td></tr>
</table>
Notice that in bins 6–9 the observed responses are nearly all the same, so the raw residuals have very little empirical variation and the reference bands collapse towards zero. Points outside these very narrow bands should therefore not automatically be interpreted as evidence of lack of fit. What do the binned residuals suggest about the adequacy of the fitted model? Justify your conclusion by considering the overall pattern as well as the behaviour of the reference bands.`
      },
      { l: "f", t: `Estimate the probability of a successful outcome for a child aged $96$ months when six vertebrae are involved in the operation and the first vertebra operated on is vertebra $8$.` },
      { l: "g", t: `Suppose the response were instead coded as $1$ when postoperative kyphosis is present. Explain how the fitted regression coefficients and fitted probabilities would change.` }
    ],
    answer: [
      {
        l: "a",
        t: `<div class="display">$$\\log\\left(\\frac{\\hat{p}_i}{1-\\hat{p}_i}\\right) = 2.03693 - 0.01093\\,\\texttt{Age}_i - 0.41060\\,\\texttt{Number}_i + 0.20651\\,\\texttt{Start}_i.$$</div>`
      },
      {
        l: "b",
        t: `For children of the same age and with the same number of vertebrae involved, increasing Start by one vertebra multiplies the fitted odds of a successful outcome by
<div class="display">$$e^{0.20651} = 1.229.$$</div>
So the fitted odds of kyphosis being absent are about $1.23$ times as large when the first vertebra operated on increases by one, holding Age and Number fixed.`
      },
      {
        l: "c",
        t: `Age is measured in months, so an increase of one year corresponds to an increase of $12$ in Age. The fitted odds are multiplied by
<div class="display">$$e^{12\\times(-0.01093)} = e^{-0.13116} = 0.877.$$</div>
Thus, for fixed Number and Start, the fitted odds of a successful outcome are multiplied by about $0.88$ for each additional year of age — about $12.3\\%$ lower.`
      },
      {
        l: "d",
        t: `Because $y_i$ is binary, the raw residual is
<div class="display">$$y_i - \\hat{p}_i = \\begin{cases} 1 - \\hat{p}_i, &amp; y_i = 1, \\\\[4pt] -\\hat{p}_i, &amp; y_i = 0. \\end{cases}$$</div>
The individual residuals therefore lie on two curved branches determined by the binary response, which makes systematic departures from the fitted model very difficult to see. Averaging residuals within intervals of the fitted linear predictor smooths away the binary pattern: under an adequate model the binned average residuals should be scattered around zero without a systematic pattern.`
      },
      {
        l: "e",
        t: `There is no clear systematic pattern in the binned residuals. The relatively large positive and negative residuals in the middle of the plot remain within the reference limits. At the right of the plot the residuals are all positive, but they are small and appear unusual only because the empirical reference limits have collapsed. This may indicate slight underprediction for observations with large fitted probabilities, but it does not provide clear evidence of lack of fit.`
      },
      {
        l: "f",
        t: `The fitted linear predictor is
<div class="display">$$\\hat{\\eta} = 2.03693 - 0.01093(96) - 0.41060(6) + 0.20651(8) \\approx 0.1761.$$</div>
Therefore the estimated probability of a successful outcome is
<div class="display">$$\\hat{p} = \\frac{e^{0.1761}}{1 + e^{0.1761}} \\approx 0.544.$$</div>`
      },
      {
        l: "g",
        t: `If $p_i^{*} = 1 - p_i$ denotes the probability that kyphosis is present, then
<div class="display">$$\\log\\left(\\frac{p_i^{*}}{1-p_i^{*}}\\right) = -\\log\\left(\\frac{p_i}{1-p_i}\\right).$$</div>
Consequently every fitted regression coefficient changes sign. The fitted probability of kyphosis being present is $1 - \\hat{p}_i$, so the fitted probabilities for the two possible outcomes add to one.`
      }
    ]
  },

  {
    id: "w07q3",
    week: 7,
    label: "Question 3",
    title: "Wells data: interpreting odds and checking the mean structure",
    difficulty: "Easy",
    topics: ["logistic", "diagnostics"],
    stem: `The Wells data contain information from 3020 households in Bangladesh whose wells had unsafe arsenic levels. The response <code>switch</code> records whether a household switched to another well. The explanatory variables are distance to the nearest known safe well, arsenic concentration in the household's original well, and years of education of the household head. Load and prepare the data as follows.
<pre><code>data(Wells, package = "carData")
Wells$switch01 &lt;- as.integer(Wells$switch == "yes")
Wells$dist100  &lt;- Wells$distance / 100
Wells$educ4    &lt;- Wells$education / 4</code></pre>
Thus <code>dist100</code> measures distance in hundreds of metres and <code>educ4</code> measures education in units of four years.`,
    parts: [
      { l: "a", t: `A logistic regression model was fitted and gave
<pre><code>&gt; fit.wells &lt;- glm(switch01 ~ dist100 + arsenic + educ4,
&gt;                   family = binomial, data = Wells)
&gt; summary(fit.wells)$coefficients
              Estimate Std. Error z value  Pr(&gt;|z|)
(Intercept)  -0.213856   0.093086 -2.2974  0.021585
dist100      -0.895635   0.104607 -8.5619 1.114e-17
arsenic       0.468379   0.041592 11.2612 1.928e-29
educ4         0.171335   0.038314  4.4719 7.759e-06

&gt; exp(coef(fit.wells))
(Intercept)     dist100     arsenic       educ4
     0.8074      0.4083      1.5974      1.1868</code></pre>
There are $n = 3020$ households. Examine the fitted coefficients and state which effects are clearly needed.` },
      { l: "b", t: `Interpret the estimated coefficient of dist100 in terms of the odds of switching wells.` },
      { l: "c", t: `Interpret the estimated coefficient of arsenic in terms of the odds of switching wells.` },
      { l: "d", t: `Binning the raw residuals by fitted linear predictor into $40$ bins gave average residuals ranging from $-0.159$ to $0.107$. Only one of the $40$ bins had an average residual outside the $\\pm 2$ standard-error band, and that band was computed from the empirical spread of the residuals within the bin.

Does this provide clear evidence of lack of fit? Explain.` },
      { l: "e", t: `Binning the raw residuals by **arsenic concentration** into $40$ bins gave
<table>
<tr><th>bin</th><th>mean arsenic</th><th>avg raw residual</th><th>bin</th><th>mean arsenic</th><th>avg raw residual</th></tr>
<tr><td>1</td><td>0.52</td><td>$-0.274$</td><td>21</td><td>1.33</td><td>$-0.030$</td></tr>
<tr><td>2</td><td>0.55</td><td>$-0.196$</td><td>25</td><td>1.62</td><td>$0.154$</td></tr>
<tr><td>3</td><td>0.57</td><td>$-0.073$</td><td>30</td><td>2.13</td><td>$0.090$</td></tr>
<tr><td>8</td><td>0.73</td><td>$-0.075$</td><td>35</td><td>2.90</td><td>$-0.067$</td></tr>
<tr><td>17</td><td>1.13</td><td>$0.077$</td><td>40</td><td>5.46</td><td>$-0.062$</td></tr>
</table>
Three of the $40$ bins have averages outside the $\\pm2$ standard-error band, and the two lowest-arsenic bins are by far the most negative. Interpret the pattern.` },
      { l: "f", t: `What aspect of the fitted model should be reconsidered in light of the plot in part (e)?` }
    ],
    answer: [
      {
        l: "a",
        t: `<pre><code>fit.wells &lt;- glm(switch01 ~ dist100 + arsenic + educ4,
                  family = binomial, data = Wells)
summary(fit.wells)</code></pre>
The estimated coefficients are approximately $-0.214$ (intercept), $-0.896$ (dist100), $0.468$ (arsenic) and $0.171$ (educ4).`
      },
      {
        l: "b",
        t: `Holding arsenic concentration and education fixed, an additional 100 metres to the nearest safe well multiplies the fitted odds of switching by $e^{-0.896} \\approx 0.408$. That is, the fitted odds are about $59.2\\%$ lower for each additional 100 metres.`
      },
      {
        l: "c",
        t: `Holding distance and education fixed, a one-unit increase in arsenic concentration multiplies the fitted odds of switching by $e^{0.468} \\approx 1.60$. The fitted odds are therefore about $60\\%$ higher for a one-unit increase in arsenic concentration.`
      },
      {
        l: "d",
        t: `The binned residuals by fitted linear predictor give no clear evidence of lack of fit. They are scattered on both sides of zero with no sustained trend or curvature, and only one of the $40$ bins has an average outside the $\\pm2$ standard-error band. A single borderline bin would not, by itself, constitute clear evidence of a systematic discrepancy.`
      },
      {
        l: "e",
        t: `The two binned residuals corresponding to the lowest arsenic concentrations, at $-0.274$ and $-0.196$, lie far below the lower reference line (their standard errors are only about $0.05$). So for households with the lowest arsenic concentrations the fitted model substantially overestimates the probability of switching.

There is also a broader systematic pattern. After the two large negative residuals at the lowest arsenic concentrations, the residuals tend to be positive over the next part of the arsenic range and become more negative again at higher concentrations. So the relationship between arsenic concentration and the probability of switching is not adequately represented across the observed range by the fitted model.`
      },
      {
        l: "f",
        t: `The <em>form</em> of the arsenic effect should be reconsidered. The model assumes arsenic concentration has a linear effect on the log-odds of switching, but the residual pattern suggests that this assumption is inadequate. A different functional form for arsenic should be considered — although this plot alone does not determine which form to use.`
      }
    ]
  }
);
