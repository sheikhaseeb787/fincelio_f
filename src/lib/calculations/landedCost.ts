export interface LandedCostInputs {
  purchaseCostPerUnit: number;
  productQuantity: number;
  freightCost: number;
  insuranceCost: number;
  dutyRatePercent: number;
  brokerageAndHandling: number;
}

export interface LandedCostResult {
  purchaseCostPerUnit: number;
  productQuantity: number;
  totalPurchaseCost: number;
  freightCost: number;
  insuranceCost: number;
  dutyAmount: number;
  brokerageAndHandling: number;
  totalLandedCost: number;
  landedCostPerUnit: number;
  freightPerUnit: number;
  insurancePerUnit: number;
  dutyPerUnit: number;
  brokeragePerUnit: number;
  landedCostMultiplier: number;
  distribution: {
    category: string;
    amount: number;
    perUnit: number;
    percent: number;
    color: string;
  }[];
}

export function calculateLandedCost(inputs: LandedCostInputs): LandedCostResult {
  const purchaseCostPerUnit = Math.max(0, Number(inputs.purchaseCostPerUnit) || 0);
  const qty = Math.max(1, Number(inputs.productQuantity) || 1);
  const freight = Math.max(0, Number(inputs.freightCost) || 0);
  const insurance = Math.max(0, Number(inputs.insuranceCost) || 0);
  const dutyRate = Math.max(0, Number(inputs.dutyRatePercent) || 0) / 100;
  const brokerage = Math.max(0, Number(inputs.brokerageAndHandling) || 0);

  const totalPurchaseCost = purchaseCostPerUnit * qty;
  const dutyAmount = totalPurchaseCost * dutyRate;
  const totalLandedCost = totalPurchaseCost + freight + insurance + dutyAmount + brokerage;

  const landedCostPerUnit = totalLandedCost / qty;
  const freightPerUnit = freight / qty;
  const insurancePerUnit = insurance / qty;
  const dutyPerUnit = dutyAmount / qty;
  const brokeragePerUnit = brokerage / qty;

  const landedCostMultiplier =
    purchaseCostPerUnit > 0 ? landedCostPerUnit / purchaseCostPerUnit : 1.0;

  const distribution = [
    {
      category: 'Product FOB Cost',
      amount: totalPurchaseCost,
      perUnit: purchaseCostPerUnit,
      percent: totalLandedCost > 0 ? (totalPurchaseCost / totalLandedCost) * 100 : 0,
      color: '#21965A',
    },
    {
      category: 'Freight & Shipping',
      amount: freight,
      perUnit: freightPerUnit,
      percent: totalLandedCost > 0 ? (freight / totalLandedCost) * 100 : 0,
      color: '#3B82F6',
    },
    {
      category: 'Duties & Tariffs',
      amount: dutyAmount,
      perUnit: dutyPerUnit,
      percent: totalLandedCost > 0 ? (dutyAmount / totalLandedCost) * 100 : 0,
      color: '#F59E0B',
    },
    {
      category: 'Insurance',
      amount: insurance,
      perUnit: insurancePerUnit,
      percent: totalLandedCost > 0 ? (insurance / totalLandedCost) * 100 : 0,
      color: '#8B5CF6',
    },
    {
      category: 'Brokerage & Handling',
      amount: brokerage,
      perUnit: brokeragePerUnit,
      percent: totalLandedCost > 0 ? (brokerage / totalLandedCost) * 100 : 0,
      color: '#64748B',
    },
  ];

  return {
    purchaseCostPerUnit,
    productQuantity: qty,
    totalPurchaseCost,
    freightCost: freight,
    insuranceCost: insurance,
    dutyAmount,
    brokerageAndHandling: brokerage,
    totalLandedCost,
    landedCostPerUnit,
    freightPerUnit,
    insurancePerUnit,
    dutyPerUnit,
    brokeragePerUnit,
    landedCostMultiplier,
    distribution,
  };
}
