export interface BreakEvenInputs {
  fixedCosts: number;
  variableCosts: number;
  sellingPrice: number;
  targetProfit?: number;
}

export interface BreakEvenScenario {
  units: number;
  percentOfBreakEven: number;
  revenue: number;
  totalCosts: number;
  profitOrLoss: number;
  isBreakEven?: boolean;
}

export interface BreakEvenResult {
  fixedCosts: number;
  variableCosts: number;
  sellingPrice: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
  targetProfit: number;
  targetProfitUnits: number;
  targetProfitRevenue: number;
  scenarios: BreakEvenScenario[];
}

export function calculateBreakEven(inputs: BreakEvenInputs): BreakEvenResult {
  const fixedCosts = Math.max(0, Number(inputs.fixedCosts) || 0);
  const variableCosts = Math.max(0, Number(inputs.variableCosts) || 0);
  const sellingPrice = Math.max(0, Number(inputs.sellingPrice) || 0);
  const targetProfit = Math.max(0, Number(inputs.targetProfit) || 0);

  const contributionMargin = sellingPrice - variableCosts;
  const contributionMarginRatio =
    sellingPrice > 0 ? (contributionMargin / sellingPrice) * 100 : 0;

  let breakEvenUnits = 0;
  let breakEvenRevenue = 0;
  let targetProfitUnits = 0;
  let targetProfitRevenue = 0;

  if (contributionMargin > 0) {
    breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
    breakEvenRevenue = breakEvenUnits * sellingPrice;

    if (targetProfit > 0) {
      targetProfitUnits = Math.ceil((fixedCosts + targetProfit) / contributionMargin);
      targetProfitRevenue = targetProfitUnits * sellingPrice;
    }
  }

  // Scenarios at different production / sales levels
  const baseUnits = Math.max(10, breakEvenUnits > 0 ? breakEvenUnits : 100);
  const multipliers = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  const scenarios: BreakEvenScenario[] = multipliers.map((mul) => {
    const units = Math.round(baseUnits * mul);
    const revenue = units * sellingPrice;
    const totalCosts = fixedCosts + units * variableCosts;
    const profitOrLoss = revenue - totalCosts;

    return {
      units,
      percentOfBreakEven: Math.round(mul * 100),
      revenue,
      totalCosts,
      profitOrLoss,
      isBreakEven: mul === 1.0,
    };
  });

  return {
    fixedCosts,
    variableCosts,
    sellingPrice,
    contributionMargin,
    contributionMarginRatio,
    breakEvenUnits,
    breakEvenRevenue,
    targetProfit,
    targetProfitUnits,
    targetProfitRevenue,
    scenarios,
  };
}
