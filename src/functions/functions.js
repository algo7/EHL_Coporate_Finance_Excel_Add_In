/* eslint-disable no-unused-vars */
/* global console setInterval, clearInterval */

/**
 * DDM 2 Stage Growth
 * @customfunction
 * @param {number} growth_rate_1 Growth rate in the beginning
 * @param {number} growth_rate_2 Growth rate in the end till infinity
 * @param {number} required_return Required return
 * @param {number} period Period in years
 * @param {number} starting_devidend starting devidend
 * @returns {number} Evaluation
 */
function DDM_2STAGE(growth_rate_1, growth_rate_2, required_return, period, starting_devidend) {
  const a = [starting_devidend];
  const b = [];

  for (let index = 0; index < period - 1; index++) {
    a[index + 1] = a[index] * (1 + growth_rate_1);
  }

  for (let index = 1; index < a.length; index++) {
    b.push(a[index - 1] / (1 + required_return) ** index);
  }
  b.push(a[a.length - 1] / (1 + required_return) ** period);

  const xxx = a[a.length - 1] * (1 + growth_rate_2);
  const yyy = (1 + required_return) ** period * (required_return - growth_rate_2);

  const sum = b.reduce(function (x, y) {
    return x + y;
  }, 0);

  return sum + xxx / yyy;
}

/**
 * DDM Constant Growth
 * @customfunction
 * @param {number} x
 * @param {number} required_return Required Return
 * @param {number} growth_rate Growth Rate
 * @returns {number} Evaluation
 */
function DDM_CONSTANT_GROWTH(x, growth_rate, required_return) {
  return (x * (1 + growth_rate)) / (required_return - growth_rate);
}

/**
 * DDM Constant Growth
 * @customfunction
 * @param {number} x
 * @param {number} required_return Required Return
 * @returns {number} Evaluation
 */
function DDM_ZERO_GROWTH(x, required_return) {
  return x / required_return;
}

/**
 * Sharpe Ratio
 * @customfunction
 * @param {number} rt Return
 * @param {number} rf Risk Free Rate
 * @param {number} vol Volatility
 * @returns {number} Sharpe Ratio
 */
function SHARP_RATIO(rt, rf, vol) {
  return (rt - rf) / vol;
}

/**
 * CAPM Expected Return
 * @customfunction
 * @param {number} rf Risk Free Rate
 * @param {number} beta Beta
 * @param {number} rp Risk Premium
 * @returns {number} Expected Return
 */
function CAPM_EXPECTED_RETURN(rf, beta, rp) {
  return rf + beta * rp;
}

/**
 * Volatility Annualization - Daily
 * @customfunction
 * @param {number} stdev Standard Deviation of the returns
 * @returns {number} Annualized Risk
 */
function RISK_ANNUALIZED_DAILY(stdev) {
  return stdev * Math.sqrt(252);
}

/**
 * Volatility Annualization - Weekly
 * @customfunction
 * @param {number} stdev Standard Deviation of the returns
 * @returns {number} Annualized Risk
 */
function RISK_ANNUALIZED_WEEKLY(stdev) {
  return stdev * Math.sqrt(52);
}

/**
 * Volatility Annualization - Monthly
 * @customfunction
 * @param {number} stdev Standard Deviation of the returns
 * @returns {number} Annualized Risk
 */
function RISK_ANNUALIZED_MONTHLY(stdev) {
  return stdev * Math.sqrt(12);
}

/**
 * Volatility Annualization - Quaterly
 * @customfunction
 * @param {number} stdev Standard Deviation of the returns
 * @returns {number} Annualized Risk
 */
function RISK_ANNUALIZED_QUATERLY(stdev) {
  return stdev * Math.sqrt(4);
}

/**
 * Return Annualization - Daily
 * @customfunction
 * @param {number} rt Return
 * @returns {number} Annualized Return
 */
function RETURN_ANNUALIZED_DAILY(rt) {
  return rt * 252;
}

/**
 * Return Annualization - Weekly
 * @customfunction
 * @param {number} rt Return
 * @returns {number} Annualized Return
 */
function RETURN_ANNUALIZED_WEEKLY(rt) {
  return rt * 52;
}

/**
 * Return Annualization - Monthly
 * @customfunction
 * @param {number} rt Return
 * @returns {number} Annualized Return
 */
function RETURN_ANNUALIZED_MONTHLY(rt) {
  return rt * 12;
}

/**
 * Return Annualization - Quaterly
 * @customfunction
 * @param {number} rt Return
 * @returns {number} Annualized Return
 */
function RETURN_ANNUALIZED_QUATERLY(rt) {
  return rt * 4;
}
