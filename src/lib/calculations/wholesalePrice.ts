export interface WholesalePriceInputs {
  productionCost: number;
  laborCost: number;
  packagingCost: number;
  wholesaleMarginPercent: number;
  retailerMarginPercent: number;
}

export interface BulkWhiolesaleTier {
  tierName: string;
  minQuantity: number;
  discountPercent: number;
  wholesalePrice: number;
  manufacturerProfit: number;
  manufacturerMarginPercent: number;
  suggestedRetailPrice: number;
}

export interface WholesalePriceResult {
  productionCost: number;
  laborCost: number;
  packagingCost: number;
  totalCostOfGoods: number;
  wholesaleMarginPercent: number;
  wholesalePrice: number;
  manufacturerProfit: number;
  manufacturerMarkupPercent: number;
  retailerMarginPercent: number;
  suggestedRetailPrice: number;
  retailerProfit: number;
  bulkTiers: BulkWhiolesaleTier[];
}

export function calculateWholesalePrice(inputs: WholesalePriceInputs): WholesalePriceResult {
  const prod = Math.max(0, Number(inputs.productionCost) || 0);
  const labor = Math.max(0, Number(inputs.laborCost) || 0);
  const pkg = Math.max(0, Number(inputs.packagingCost) || 0);
  const wholesaleMarginPct = Math.max(0, Math.min(95, Number(inputs.wholesaleMarginPercent) || 0));
  const retailerMarginPct = Math.max(0, Math.min(95, Number(inputs.retailerMarginPercent) || 50));

  const totalCostOfGoods = prod + labor + pkg;

  // Wholesale Price = COGS / (1 - wholesaleMargin)
  const denomWholesale = 1 - wholesaleMarginPct / 100;
  const wholesalePrice = denomWholesale > 0 ? totalCostOfGoods / denomWholesale : totalCostOfGoods;

  const manufacturerProfit = wholesalePrice - totalCostOfGoods;
  const manufacturerMarkupPercent =
    totalCostOfGoods > 0 ? (manufacturerProfit / totalCostOfGoods) * 100 : 0;

  // MSRP = Wholesale Price / (1 - retailerMargin)
  const denomRetail = 1 - retailerMarginPct / 100;
  const suggestedRetailPrice =
    denomRetail > 0 ? wholesalePrice / denomRetail : wholesalePrice * 2;

  const retailerProfit = suggestedRetailPrice - wholesalePrice;

  // Bulk Tiers
  const tierConfigs = [
    { tierName: 'Standard MOQ (1 – 99 units)', minQuantity: 1, discount: 0 },
    { tierName: 'Tier 1 Wholesale (100 – 499 units)', minQuantity: 100, discount: 5 },
    { tierName: 'Tier 2 Wholesale (500 – 999 units)', minQuantity: 500, discount: 10 },
    { tierName: 'Master Distributor (1,000+ units)', minQuantity: 1000, discount: 15 },
  ];

  const bulkTiers: BulkWhiolesaleTier[] = tierConfigs.map((t) => {
    const discountedPrice = wholesalePrice * (1 - t.discount / 100);
    const mfgProf = discountedPrice - totalCostOfGoods;
    const mfgMargin = discountedPrice > 0 ? (mfgProf / discountedPrice) * 100 : 0;
    const msrp = denomRetail > 0 ? discountedPrice / denomRetail : discountedPrice * 2;

    return {
      tierName: t.tierName,
      minQuantity: t.minQuantity,
      discountPercent: t.discount,
      wholesalePrice: discountedPrice,
      manufacturerProfit: mfgProf,
      manufacturerMarginPercent: mfgMargin,
      suggestedRetailPrice: msrp,
    };
  });

  return {
    productionCost: prod,
    laborCost: labor,
    packagingCost: pkg,
    totalCostOfGoods,
    wholesaleMarginPercent: wholesaleMarginPct,
    wholesalePrice,
    manufacturerProfit,
    manufacturerMarkupPercent,
    retailerMarginPercent: retailerMarginPct,
    suggestedRetailPrice,
    retailerProfit,
    bulkTiers,
  };
}
