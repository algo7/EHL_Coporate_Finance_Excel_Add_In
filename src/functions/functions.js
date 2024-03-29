﻿/**
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
 * @param {number} x Last value
 * @param {number} required_return Required Return
 * @param {number} growth_rate Growth Rate
 * @returns {number} Evaluation
 */
function DDM_CONSTANT_GROWTH(x, growth_rate, required_return) {
  return (x * (1 + growth_rate)) / (required_return - growth_rate);
}

/**
 * Calculate the average return of a stock
 * @customfunction
 * @param {number[][]} x Stock Price
 * @returns {number} The average return of the stock
 */
function AVG_RETURN(x) {
  if (x.length > 1) {
    const flattened = x.flat();
    const return_per_period = []
    for (let i = 1; i < flattened.length; i++) {
      return_per_period.push((flattened[i] - flattened[i - 1]) / flattened[i - 1])
    }

    const sum = return_per_period.reduce(function (x, y) {
      return x + y;
    }, 0);

    return sum / return_per_period.length;
  }

  const return_per_period = []
  for (let i = 1; i < x[0].length; i++) {
    return_per_period.push((x[0][i] - x[0][i - 1]) / x[0][i - 1])
  }

  const sum = return_per_period.reduce(function (x, y) {
    return x + y;
  }, 0);

  return sum / return_per_period.length;
}

/**
 * Calculate the average volatility of a stock
 * @customfunction
 * @param {number[][]} x 
 * @returns {number} The average volatility
 */
function AVG_VOLATILITY(x) {
  if (x.length > 1) {
    const flattened = x.flat();
    const return_per_period = []
    for (let i = 1; i < flattened.length; i++) {
      return_per_period.push((flattened[i] - flattened[i - 1]) / flattened[i - 1])
    }

    const mean = return_per_period.reduce(function (x, y) {
      return x + y;
    }, 0) / return_per_period.length;

    // Assigning (value - mean) ^ 2 to every array item
    const xx = return_per_period.map((k) => {
      return (k - mean) ** 2
    })

    // Calculating the sum of updated array
    let sum2 = xx.reduce((acc, curr) => acc + curr, 0);

    // Returning the Standard deviation
    return Math.sqrt(sum2 / (xx.length - 1))
  }

  const return_per_period = []
  for (let i = 1; i < flattened.length; i++) {
    return_per_period.push((x[0][i] - x[0][i - 1]) / x[0][i - 1])
  }

  const mean = return_per_period.reduce(function (x, y) {
    return x + y;
  }, 0) / return_per_period.length;

  // Assigning (value - mean) ^ 2 to every array item
  const xx = return_per_period.map((k) => {
    return (k - mean) ** 2
  })

  // Calculating the sum of updated array
  let sum2 = xx.reduce((acc, curr) => acc + curr, 0);

  // Returning the Standard deviation
  return Math.sqrt(sum2 / (xx.length - 1))
}

/**
 * Calculate the volatility of a portfolio of 2 assets
 * @customfunction
 * @param {number} volatility_1 Volatility of the first asset
 * @param {number} volatility_2 Volatility of the second asset
 * @param {number} weight Weight of the first asset
 * @param {number} correlation The correlation of the two assets
 * @returns {number} Volatility of the portfolio
 */
function PORTFOLIO_RISK(volatility_1, volatility_2, weight, correlation) {
  const weight_1 = weight
  const weight_2 = 1 - weight
  return Math.sqrt((volatility_1 * weight_1) ** 2 + (volatility_2 * weight_2) ** 2 + 2 * weight_1 * weight_2 * volatility_1 * volatility_2 * correlation);
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
 * Volatility Annualization
 * @customfunction
 * @param {number} stdev Standard Deviation of the returns
 * @param {number} period 1 = Daily, 2 = Weekly, 3 = Monthly, 4 = Quarterly
 * @returns {number} Annualized Risk
 */
function RISK_ANNUALIZED(stdev, period) {
  switch (period) {
    case 1:
      return stdev * Math.sqrt(252);
    case 2:
      return stdev * Math.sqrt(52);
    case 3:
      return stdev * Math.sqrt(12);
    case 4:
      return stdev * Math.sqrt(4);
  }
}

/**
 * Return Annualization
 * @customfunction
 * @param {number} rt Return
 * @param {number} period 1 = Daily, 2 = Weekly, 3 = Monthly, 4 = Quarterly
 * @returns {number} Annualized Return
 */
function RETURN_ANNUALIZED(rt, period) {
  switch (period) {
    case 1:
      return rt * 252;
    case 2:
      return rt * 52;
    case 3:
      return rt * 12;
    case 4:
      return rt * 4;
  }
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

/**
 * Calculate bid-ask spread
 * @customfunction
 * @param {number} bid_price Bid price
 * @param {number} ask_price Ask Price
 * @returns {number} The spread
 */
function BID_ASK(bid_price, ask_price) {
  return (ask_price - bid_price) / ((ask_price + bid_price) / 2);
}

/**
 * Calculate the rate of return of a constant perpetuity
 * @customfunction
 * @param {number} cf0 Cash Flow of the first period => 0 when paid at the end of the period
 * @param {number} cf1 Cash Flow of the second period
 * @param {number} pv The present value
 * @param {number} type 0 = begining of period, 1 = end of period 
 * @returns {number} The rate of return
 */
function PERPETUITY_CONSTANT_RATE(cf0, cf1, pv, type) {
  if (type === 0) {
    return cf1 / (pv - cf0)
  }
  return cf1 / pv
}

/**
 * Calculate the present value of a constant perpetuity
 * @customfunction
 * @param {number} cf0 Cash Flow of the first period => 0 when paid at the end of the period
 * @param {number} cf1 Cash Flow of the second period
 * @param {number} rate The rate of return
 * @param {number} type 0 = begining of period, 1 = end of period
 * @returns {number} The present value
 */
function PERPETUITY_CONSTANT_PV(cf0, cf1, rate, type) {
  if (type === 0) {
    return cf0 + (cf1 / rate)
  }
  return cf1 / rate
}

/**
 * Calculate the present value of a growth perpetuity
 * @customfunction
 * @param {number} cf0 Cash Flow of the first period => 0 when paid at the end of the period
 * @param {number} cf1 Cash Flow of the second period
 * @param {number} rate_of_return The rate of return
 * @param {number} growth_rate The growth rate
 * @param {number} type 0 = begining of period, 1 = end of period
 * @returns {number} The present value
 */
function PERPETUITY_GROWTH_PV(cf0, cf1, rate_of_return, growth_rate, type) {
  if (type === 0) {
    return cf0 + (cf1 / (rate_of_return - growth_rate))
  }
  return cf1 / (rate_of_return - growth_rate)
}

/**
 * Calculate the profitibility index
 * @customfunction
 * @param {number} npv The net present value of the project
 * @param {number} initial_investment The initial investment amount
 * @returns {number} The profitibility index
 */
function PROFITABILITY_INDEX(npv, initial_investment) {
  return 1 + (npv / Math.abs(initial_investment))
}


// Real Estate Fianace Stuff
// /**
//  * Calculate the income return of a real estate investment
//  * @customfunction
//  * @param {number[][]} cash_flow Cash flow in the period
//  * @param {number} end_asset_value The end of value of the asset
//  * @returns {number} The income return of the investment
//  */
// function REF_INCOME_RETURN(cash_flow, end_asset_value) {
//   if (cash_flow.length > 1) {
//     const flattened = cash_flow.flat();
//     const sum = flattened.reduce(function (x, y) {
//       return x + y;
//     }, 0);

//     return sum / end_asset_value;
//   }

//   const sum = cash_flow[0].reduce(function (x, y) {
//     return x + y;
//   }, 0);

//   return sum / end_asset_value;
// }

// /**
//  * Calculate the appreciation return of a real estate investment
//  * @customfunction
//  * @param {number} starting_asset_value Asset value at the beginning
//  * @param {number} ending_asset_value Asset value at the end
//  * @returns {number} The appreciation return of the investment
//  */
// function REF_APPECIATION_RETURN(starting_asset_value, ending_asset_value) {
//   return (ending_asset_value - starting_asset_value) / starting_asset_value;
// }

// /**
//  * Calculate the total return of a real estate investment
//  * @customfunction
//  * @param {number[][]} cash_flow Cash flow in the period
//  * @param {number} starting_asset_value Asset value at the beginning
//  * @param {number} ending_asset_value Asset value at the end
//  * @returns {number} The total return of the investment
//  */
// function REF_TOTAL_RETURN(cash_flow, starting_asset_value, ending_asset_value) {
//   if (cash_flow.length > 1) {
//     const flattened = cash_flow.flat();
//     const sum = flattened.reduce(function (x, y) {
//       return x + y;
//     }, 0);

//     return (sum + ending_asset_value - starting_asset_value) / starting_asset_value;
//   }

//   const sum = cash_flow[0].reduce(function (x, y) {
//     return x + y;
//   }, 0);

//   return (sum + ending_asset_value - starting_asset_value) / starting_asset_value;
// }

// /**
//  * Calculate the inflation-adjusted (real) return of a real estate investment
//  * @customfunction
//  * @param {number} nominal_return Nominal (total) return of the investment
//  * @param {number} inflation_rate Inflation rate
//  * @returns {number} The real return of the investment
//  */
// function REF_REAL_RETURN(nominal_return, inflation_rate) {
//   return (1 + nominal_return) / (1 + inflation_rate) - 1;
// }

// /**
//  * Calculate the arithmetic average return of a real estate investment
//  * @customfunction
//  * @param {number[][]} returns The return of each period
//  * @returns {number} The arithmatic average return of the investment
//  */
// function REF_ARITHEMETIC_AVERAGE_RETURN(returns) {
//   if (returns.length > 1) {
//     const flattened = returns.flat();
//     const sum = flattened.reduce(function (x, y) {
//       return x + y;
//     }, 0);

//     return sum * (1 / flattened.length);
//   }

//   const sum = returns[0].reduce(function (x, y) {
//     return x + y;
//   }, 0);

//   return sum * (1 / returns[0].length);
// }

// /**
//  * Calculate the geometric average return or compound annual growth rateof a real estate investment. Can also be used to calculate depreciation.
//  * @customfunction
//  * @param {number} initial_investment The initial investment volume / Rent of the older property
//  * @param {number} ending_asset_value The end of value of the asset / Rent of the younger property
//  * @param {number} periods The number of periods / Age of the old property - the age of the younger property
//  * @returns {number} The geometric average return / CAGR of the investment
//  */
// function REF_CAGR(initial_investment, ending_asset_value, periods) {
//   return (ending_asset_value / initial_investment) ** (1 / periods) - 1;
// }

// /**
//  * Calculate the CAGR of a real estate investment without investment volume
//  * @customfunction
//  * @param {number[][]} returns
//  * @returns {number} The CAGR of the investment
//  */
// function REF_CAGR_DIRECT(returns) {
//   if (returns.length > 1) {
//     const flattened = returns.flat();
//     const sum = flattened
//       .map((return_p) => 1 + return_p)
//       .reduce(function (x, y) {
//         return x * y;
//       });

//     return sum ** (1 / flattened.length) - 1;
//   }

//   const sum = returns[0]
//     .map((return_p) => 1 + return_p)
//     .reduce(function (x, y) {
//       return x * y;
//     });

//   return sum ** (1 / returns[0].length) - 1;
// }

// /**
//  * Calculate the historical growth rate of a real estate asset. Can also be used to calculate depreciation.
//  * @customfunction
//  * @param {number} start_time The start time / Age of the younger property
//  * @param {number} end_time  The end time / Age of the older property
//  * @param {number} old_rent The old rent of the asset
//  * @param {number} current_rent The current rent of the asset
//  * @returns {number} The historical growth rate
//  */
// function REF_HISTORICAL_GROWTH(start_time, end_time, old_rent, current_rent) {
//   return (current_rent / old_rent) ** (1 / (end_time - start_time)) - 1;
// }

// /**
//  * Calculate the estimated rental growth rate of a real estate asset
//  * @customfunction
//  * @param {number} historical_growth_rate The historical growth rate
//  * @param {number} real_deprication The deprication
//  * @param {number} historical_inflation The historical inflation
//  * @param {number} expected_future_inflation The expected future inflation
//  * @returns {number} The estimated rental growth rate
//  */
// function REF_RENTAL_GROWTH(historical_growth_rate, real_deprication, historical_inflation, expected_future_inflation) {
//   return historical_growth_rate - real_deprication - historical_inflation + expected_future_inflation;
// }

// /**
//  * Calculate WACC
//  * @customfunction
//  * @param {number} rd Return on debt / cost of debt
//  * @param {number} re Return on equity
//  * @param {number} debt_percentage Debt percentage / ratio
//  * @param {number} equity_percentage Equity percentage / ratio
//  * @returns {number} The WACC
//  */
// function REF_WACC(rd, re, debt_percentage, equity_percentage) {
//   return rd * debt_percentage + re * equity_percentage;
// }

// /**
//  * Calculate WACC from LTV
//  * @customfunction
//  * @param {number} ltv Loan-to-value ratio
//  * @param {number} rd Return on debt / cost of debt
//  * @param {number} re Return on equity
//  * @returns {number} The WACC
//  */
// function REF_WACC_FROM_LTV(ltv, rd, re) {
//   return REF_WACC(rd, re, ltv, 1 - ltv);
// }

// /**
//  * Calculate WACC after tax
//  * @customfunction
//  * @param {number} rd Return on debt / cost of debt
//  * @param {number} re Return on equity
//  * @param {number} debt_percentage Debt percentage / ratio
//  * @param {number} equity_percentage Equity percentage / ratio
//  * @param {number} tax_rate Tax rate  
//  * @returns {number} The WACC
//  */
// function REF_AFT_TAX_WACC(rd, re, debt_percentage, equity_percentage, tax_rate) {
//   return re * equity_percentage * debt_percentage * rd * (1 - tax_rate)
// }

// /**
//  * Calculate WACC after tax from LTV
//  * @customfunction
//  * @param {number} ltv Loan-to-value ratio 
//  * @param {number} re Return on equity
//  * @param {number} rd Return on debt / cost of debt
//  * @param {number} tax_rate Tax rate 
//  * @returns {number} WACC after tax
//  */
// function REF_AFT_TAX_WACC_FROM_LTV(ltv, re, rd, tax_rate) {
//   return (1 - ltv) * re + ltv * rd * (1 - tax_rate);
// }

// /**
//  * Calculate the return on equity of a property given LTV and return on property
//  * @customfunction
//  * @param {number} ltv Loan to value ratio
//  * @param {number} rd Return on debt / cost of debt
//  * @param {number} rp Return on property / WACC / discout rate
//  * @returns {number} The return on equity
//  */
// function REF_RE(ltv, rd, rp) {
//   return rp + (ltv / (1 - ltv)) * (rp - rd);
// }

// /**
//  * Calculate adjusted cap rate (NOI => PBCTF) given the capex as a percentage of NOI
//  * @customfunction
//  * @param {number} noi_cap_rate NOI-based cap rate
//  * @param {number} capex_percentage Capex as a percentage of NOI
//  * @returns {number} PBTCF-based cap rate
//  */
// function REF_ADJUSTED_CAP_RATE(noi_cap_rate, capex_percentage) {
//   return (noi_cap_rate * (1 - capex_percentage)) / 1;
// }

// /**
//  * Conver PBTCF-based cap rate to NOI-based cap rate given the capex as a percentage of NOI
//  * @customfunction
//  * @param {number} pbcf_cap_rate PBTCF-based cap rate
//  * @param {number} capex_percentage Capex as a percentage of NOI
//  * @returns {number} NOI-based cap rate
//  */
// function REF_CAP_RATE_PBTCF_TO_NOI(pbcf_cap_rate, capex_percentage) {
//   return pbcf_cap_rate / (1 - capex_percentage);
// }

// /**
//  * Calculate the maxmium loan amount based on LTV creteria
//  * @customfunction
//  * @param {number} ltv The Loan to Value ratio
//  * @param {number} market_value The market value of the asset
//  * @returns {number} The loan amount
//  */
// function REF_LTV_LOAN(ltv, market_value) {
//   return ltv * market_value
// }

// /**
//  * Calculate the maximum loan amount based on the DSCR creteria
//  * @customfunction
//  * @param {number} noi The net operating income
//  * @param {number} dscr The debt service coverage ratio
//  * @param {number} interest_rate The interest rate
//  * @returns {number} The loan amount
//  */
// function REF_DSCR_LOAN(noi, dscr, interest_rate) {
//   return (noi / dscr) / interest_rate
// }

// /**
//  * Calculate the maximum annual debt service based on the DSCR creteria
//  * @param {number} noi The net operating income 
//  * @param {number} dscr The debt service coverage ratio
//  * @returns {number} The maximum annual debt service
//  */
// function REF_DSCR_MAX_ANNUAL_DEBT_SERVICE(noi, dscr) {
//   return noi / dscr
// }

// /**
//  * Calculate the intrest rate of a loan based on LTV
//  * @customfunction
//  * @param {number} ltv Loan to value ratio
//  * @param {number} re Return on equity
//  * @param {number} rp Return on property
//  * @returns {number} The intrest rate
//  */
// function REF_INT_RATE_FROM_LTV(ltv, re, rp) {
//   return (-re + rp) / ltv + re
// }

// /**
//  * Calculate the depreciation expense of a property per unit of asset useful life
//  * @customfunction
//  * @param {number} asset_value The asset value
//  * @param {number} asset_useful_life The asset useful life (years, months, days)
//  * @returns {number} The depreciation expesne
//  */
// function REF_DEP_EXPENSE(asset_value, asset_useful_life) {
//   return asset_value / asset_useful_life
// }

// /**
//  * Calculate the remaining book value of an asset given the asset useful life, and the holding period
//  * @customfunction
//  * @param {number} land_value The land value
//  * @param {number} building_value building value
//  * @param {number} asset_useful_life The asset useful life (years, months, days)
//  * @param {number} holding_period The holding period (years, months, days) - Same unit as asset_useful_life
//  * @returns {number} The remaining book value of the asset
//  */
// function REF_ASSET_REMAINING_BOOK_VALUE(land_value, building_value, asset_useful_life, holding_period) {
//   return (land_value + building_value) - (building_value / asset_useful_life) * holding_period
// }

// /**
//  * Calculate the refinancing new loan amount
//  * @customfunction
//  * @param {number} olb the old loan balance
//  * @param {number} pp The prepayment penalty percentage
//  * @param {number} og The origination fee percentage
//  * @returns {number} The new loan amount
//  */
// function REF_REFINANCING_NEW_LOAN_AMOUNT(olb, pp, og,) {
//   return olb * (1 + pp) / (1 - og)
// }