export interface SellingPriceInputs {
  productCost: number;
  shippingPackaging: number;
  advertisingExpenses: number;
  paymentFeePercent: number;
  paymentFeeFixed: number;
  marketplaceFeePercent: number;
  desiredProfitMarginPercent: number;
}

export interface ScenarioResult {
  name: string;
  marginPercent: number;
  sellingPrice: number;
  netProfit: number;
  roiPercent: number;
}

export interface SellingPriceResult {
  minimumProfitablePrice: number;
  targetSellingPrice: number;
  productCost: number;
  shippingPackaging: number;
  advertisingExpenses: number;
  paymentFeeAmount: number;
  marketplaceFeeAmount: number;
  totalVariableCost: number;
  netProfit: number;
  actualMarginPercent: number;
  scenarios: ScenarioResult[];
}

// Formula:
// SP = CostTotal + (SP * feePct) + feeFixed + (SP * targetMargin)
// SP - SP * (feePct + targetMargin) = CostTotal + feeFixed
// SP = (CostTotal + feeFixed) / (1 - feePct - targetMargin)
function computePriceForMargin(
  directCosts: number,
  feeFixed: number,
  feePercent: number,
  targetMarginPercent: number
): { price: number; paymentFee: number; marketplaceFee: number; netProfit: number } {
  const marginDecimal = Math.max(0, Math.min(95, targetMarginPercent)) / 100;
  const feeDecimal = Math.max(0, Math.min(90, feePercent)) / 100;

  const denominator = 1 - feeDecimal - marginDecimal;
  if (denominator <= 0.01) {
    return { price: 0, paymentFee: 0, marketplaceFee: 0, netProfit: 0 };
  }

  const price = (directCosts + feeFixed) / denominator;
  return { price, paymentFee: 0, marketplaceFee: 0, netProfit: 0 };
}

export function calculateSellingPrice(inputs: SellingPriceInputs): SellingPriceResult {
  const productCost = Math.max(0, Number(inputs.productCost) || 0);
  const shipping = Math.max(0, Number(inputs.shippingPackaging) || 0);
  const advertising = Math.max(0, Number(inputs.advertisingExpenses) || 0);
  const paymentPct = Math.max(0, Number(inputs.paymentFeePercent) || 0) / 100;
  const paymentFixed = Math.max(0, Number(inputs.paymentFeeFixed) || 0);
  const marketplacePct = Math.max(0, Number(inputs.marketplaceFeePercent) || 0) / 100;
  const targetMarginPct = Math.max(0, Math.min(95, Number(inputs.desiredProfitMarginPercent) || 0));

  const directCosts = productCost + shipping + advertising;
  const combinedFeeRate = paymentPct + marketplacePct;

  // Minimum profitable price (0% profit margin)
  const denomMin = 1 - combinedFeeRate;
  const minimumProfitablePrice =
    denomMin > 0 ? (directCosts + paymentFixed) / denomMin : directCosts + paymentFixed;

  // Target price
  const denomTarget = 1 - combinedFeeRate - targetMarginPct / 100;
  const targetSellingPrice =
    denomTarget > 0 ? (directCosts + paymentFixed) / denomTarget : minimumProfitablePrice;

  // Breakdowns at target price
  const paymentFeeAmount = targetSellingPrice * paymentPct + paymentFixed;
  const marketplaceFeeAmount = targetSellingPrice * marketplacePct;
  const totalVariableCost =
    productCost + shipping + advertising + paymentFeeAmount + marketplaceFeeAmount;
  const netProfit = targetSellingPrice - totalVariableCost;
  const actualMarginPercent =
    targetSellingPrice > 0 ? (netProfit / targetSellingPrice) * 100 : 0;

  // Three scenarios
  const marginScenarios = [
    { name: 'Conservative (Volume)', margin: Math.max(5, targetMarginPct - 10) },
    { name: 'Target (Balanced)', margin: targetMarginPct },
    { name: 'Premium (Brand)', margin: Math.min(90, targetMarginPct + 15) },
  ];

  const scenarios: ScenarioResult[] = marginScenarios.map((sc) => {
    const denom = 1 - combinedFeeRate - sc.margin / 100;
    const price = denom > 0 ? (directCosts + paymentFixed) / denom : minimumProfitablePrice;
    const fees = price * combinedFeeRate + paymentFixed;
    const prof = price - (directCosts + fees);
    const roi = directCosts > 0 ? (prof / directCosts) * 100 : 0;
    return {
      name: sc.name,
      marginPercent: sc.margin,
      sellingPrice: price,
      netProfit: prof,
      roiPercent: roi,
    };
  });

  return {
    minimumProfitablePrice,
    targetSellingPrice,
    productCost,
    shippingPackaging: shipping,
    advertisingExpenses: advertising,
    paymentFeeAmount,
    marketplaceFeeAmount,
    totalVariableCost,
    netProfit,
    actualMarginPercent,
    scenarios,
  };
}
