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
 * Volatility Annualization - Quarterly
 * @customfunction
 * @param {number} stdev Standard Deviation of the returns
 * @returns {number} Annualized Risk
 */
function RISK_ANNUALIZED_QUARTERLY(stdev) {
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
 * Return Annualization - Quarterly
 * @customfunction
 * @param {number} rt Return
 * @returns {number} Annualized Return
 */
function RETURN_ANNUALIZED_QUARTERLY(rt) {
  return rt * 4;
}

/**
 * Calculate the risk free rate
 * @customfunction
 * @param {number[][]} x
 * @returns {number} Risk Free Rate
 */
function RISK_FREE_RATE(x) {
  if (x.length > 1) {
    const flattened = x.flat();
    const sum = flattened.reduce(function (x, y) {
      return x + y;
    }, 0);

    return sum / flattened.length / 100;
  }
  const sum = x[0].reduce(function (x, y) {
    return x + y;
  }, 0);

  return sum / x[0].length / 100;
}

/**
 * Calculate the dirty price of the bond
 * @customfunction
 * @param {number} time_since_last_coupon time since last coupon (days/weeks/months)
 * @param {number} number_of_periods_between_coupon_paymnts number of periods between coupon (days/weeks/months)
 * @param {number} coupon_value Coupon Value
 * @param {number} clean_price Clean Price
 * @returns {number} Dirty Price
 */
function DIRTY_PRICE(time_since_last_coupon, number_of_periods_between_coupon_paymnts, coupon_value, clean_price) {
  const accrued_interest = (coupon_value * time_since_last_coupon) / number_of_periods_between_coupon_paymnts;
  return accrued_interest + clean_price;
}

// Real Estate Fianace Stuff
/**
 * Calculate the income return of a real estate investment
 * @customfunction
 * @param {number[][]} cash_flow Cash flow in the period
 * @param {number} end_asset_value The end of value of the asset
 * @returns {number} The income return of the investment
 */
function REF_INCOME_RETURN(cash_flow, end_asset_value) {
  const sum = cash_flow.reduce(function (x, y) {
    return x + y;
  }, 0);

  return sum / end_asset_value;
}

/**
 * Calculate the appreciation return of a real estate investment
 * @customfunction
 * @param {number} starting_asset_value Asset value at the beginning
 * @param {number} ending_asset_value Asset value at the end
 * @returns {number} The appreciation return of the investment
 */
function REF_APPECIATION_RETURN(starting_asset_value, ending_asset_value) {
  return (ending_asset_value - starting_asset_value) / starting_asset_value;
}

/**
 * Calculate the total return of a real estate investment
 * @param {number[][]} cash_flow Cash flow in the period
 * @customfunction
 * @param {number} starting_asset_value Asset value at the beginning
 * @param {number} ending_asset_value Asset value at the end
 * @returns {number} The total return of the investment
 */
function REF_TOTAL_RETURN(cash_flow, starting_asset_value, ending_asset_value) {
  const sum = cash_flow.reduce(function (x, y) {
    return x + y;
  }, 0);

  return (sum + ending_asset_value - starting_asset_value) / starting_asset_value;
}

/**
 * Calculate the inflation-adjusted (real) return of a real estate investment
 * @customfunction
 * @param {number} nominal_return Nominal (total) return of the investment
 * @param {number} inflation_rate Inflation rate
 * @returns {number} The real return of the investment
 */
function REF_REAL_RETURN(nominal_return, inflation_rate) {
  return (1 + nominal_return) / (1 + inflation_rate) - 1;
}

/**
 * Calculate the arithmetic average return of a real estate investment
 * @customfunction
 * @param {number[][]} returns The return of each period
 * @returns {number} The arithmatic average return of the investment
 */
function REF_ARITHEMETIC_AVERAGE_RETURN(returns) {
  const sum = returns.reduce(function (x, y) {
    return x + y;
  }, 0);

  return sum * (1 / returns.length);
}

/**
 * Calculate the geometric average return or compound annual growth rateof a real estate investment
 * @customfunction
 * @param {number} initial_investment The initial investment volume
 * @param {number} ending_asset_value The end of value of the asset
 * @param {number} periods The number of periods
 * @returns {number} The geometric average return / CAGR of the investment
 */
function REF_CAGR(initial_investment, ending_asset_value, periods) {
  return (ending_asset_value / initial_investment) ** (1 / periods) - 1;
}

/**
 * Calculate the CAGR of a real estate investment without investment volume
 * @customfunction
 * @param {number[][]} returns
 * @returns {number} The CAGR of the investment
 */
function REF_CAGR_DIRECT(returns) {
  const sum = returns.reduce(function (x, y) {
    return (1 + x) * (1 + y);
  }, 0);

  return sum ** (1 / returns.length) - 1;
}
