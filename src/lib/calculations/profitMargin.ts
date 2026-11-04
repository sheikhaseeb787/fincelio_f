export interface ProfitMarginInputs {
  cost: number;
  sellingPrice: number;
  additionalExpenses: number;
  targetMargin?: number;
}

export interface ProfitMarginResult {
  cost: number;
  sellingPrice: number;
  additionalExpenses: number;
  totalCost: number;
  grossProfit: number;
  grossMarginPercent: number;
  netProfit: number;
  netMarginPercent: number;
  markupPercent: number;
  targetSellingPrice?: number;
}

export function calculateProfitMargin(inputs: ProfitMarginInputs): ProfitMarginResult {
  const cost = Math.max(0, Number(inputs.cost) || 0);
  const sellingPrice = Math.max(0, Number(inputs.sellingPrice) || 0);
  const additionalExpenses = Math.max(0, Number(inputs.additionalExpenses) || 0);

  const totalCost = cost + additionalExpenses;
  const grossProfit = sellingPrice - cost;
  const netProfit = sellingPrice - totalCost;

  const grossMarginPercent = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;
  const netMarginPercent = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;
  const markupPercent = cost > 0 ? (grossProfit / cost) * 100 : 0;

  let targetSellingPrice: number | undefined;
  if (inputs.targetMargin !== undefined && inputs.targetMargin < 100) {
    const tm = inputs.targetMargin / 100;
    // targetSellingPrice - totalCost = tm * targetSellingPrice => targetSellingPrice * (1 - tm) = totalCost
    if (1 - tm > 0) {
      targetSellingPrice = totalCost / (1 - tm);
    }
  }

  return {
    cost,
    sellingPrice,
    additionalExpenses,
    totalCost,
    grossProfit,
    grossMarginPercent,
    netProfit,
    netMarginPercent,
    markupPercent,
    targetSellingPrice,
  };
}
