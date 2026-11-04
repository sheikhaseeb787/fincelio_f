export interface EcommerceProfitInputs {
  revenue: number;
  orders: number;
  cogs: number;
  shippingFulfillment: number;
  paymentFeePercent: number;
  paymentFeeFixed: number;
  adSpend: number;
  refundRatePercent: number;
  monthlyFixedExpenses: number;
}

export interface EcommerceProfitResult {
  revenue: number;
  orders: number;
  aov: number;
  cogs: number;
  shippingFulfillment: number;
  paymentFeesTotal: number;
  adSpend: number;
  refundsTotal: number;
  monthlyFixedExpenses: number;
  totalExpenses: number;
  netProfit: number;
  netMarginPercent: number;
  profitPerOrder: number;
  contributionMarginBeforeAds: number;
  contributionMarginPercentBeforeAds: number;
  breakEvenRoas: number;
  currentRoas: number;
  roasStatus: 'profitable' | 'break_even' | 'unprofitable';
  waterfall: {
    label: string;
    amount: number;
    percentOfRevenue: number;
    isDeduction: boolean;
  }[];
}

export function calculateEcommerceProfit(inputs: EcommerceProfitInputs): EcommerceProfitResult {
  const revenue = Math.max(0, Number(inputs.revenue) || 0);
  const orders = Math.max(1, Number(inputs.orders) || 1);
  const cogs = Math.max(0, Number(inputs.cogs) || 0);
  const shipping = Math.max(0, Number(inputs.shippingFulfillment) || 0);
  const payPct = Math.max(0, Number(inputs.paymentFeePercent) || 0) / 100;
  const payFixed = Math.max(0, Number(inputs.paymentFeeFixed) || 0);
  const adSpend = Math.max(0, Number(inputs.adSpend) || 0);
  const refundPct = Math.max(0, Number(inputs.refundRatePercent) || 0) / 100;
  const fixedExpenses = Math.max(0, Number(inputs.monthlyFixedExpenses) || 0);

  const aov = revenue / orders;
  const paymentFeesTotal = revenue * payPct + orders * payFixed;
  const refundsTotal = revenue * refundPct;

  // Direct variable costs before advertising
  const directCostsBeforeAds = cogs + shipping + paymentFeesTotal + refundsTotal;
  const contributionMarginBeforeAds = revenue - directCostsBeforeAds;
  const contributionMarginPercentBeforeAds =
    revenue > 0 ? (contributionMarginBeforeAds / revenue) * 100 : 0;

  // Break-even ROAS = 1 / (Contribution Margin Before Ads as a decimal)
  // E.g. If margin before ads is 40%, 1 / 0.40 = 2.50x
  let breakEvenRoas = 0;
  if (contributionMarginPercentBeforeAds > 0) {
    breakEvenRoas = 100 / contributionMarginPercentBeforeAds;
  }

  // Current ROAS = Revenue / Ad Spend
  const currentRoas = adSpend > 0 ? revenue / adSpend : 0;

  const totalExpenses = directCostsBeforeAds + adSpend + fixedExpenses;
  const netProfit = revenue - totalExpenses;
  const netMarginPercent = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const profitPerOrder = netProfit / orders;

  let roasStatus: 'profitable' | 'break_even' | 'unprofitable' = 'profitable';
  if (netProfit < 0) {
    roasStatus = 'unprofitable';
  } else if (Math.abs(netProfit) < 1) {
    roasStatus = 'break_even';
  }

  const waterfall = [
    { label: 'Gross Revenue', amount: revenue, percentOfRevenue: 100, isDeduction: false },
    {
      label: 'Cost of Goods (COGS)',
      amount: cogs,
      percentOfRevenue: revenue > 0 ? (cogs / revenue) * 100 : 0,
      isDeduction: true,
    },
    {
      label: 'Shipping & Fulfillment',
      amount: shipping,
      percentOfRevenue: revenue > 0 ? (shipping / revenue) * 100 : 0,
      isDeduction: true,
    },
    {
      label: 'Payment Processing',
      amount: paymentFeesTotal,
      percentOfRevenue: revenue > 0 ? (paymentFeesTotal / revenue) * 100 : 0,
      isDeduction: true,
    },
    {
      label: 'Refunds & Returns',
      amount: refundsTotal,
      percentOfRevenue: revenue > 0 ? (refundsTotal / revenue) * 100 : 0,
      isDeduction: true,
    },
    {
      label: 'Advertising (Ad Spend)',
      amount: adSpend,
      percentOfRevenue: revenue > 0 ? (adSpend / revenue) * 100 : 0,
      isDeduction: true,
    },
    {
      label: 'Fixed Overhead & Software',
      amount: fixedExpenses,
      percentOfRevenue: revenue > 0 ? (fixedExpenses / revenue) * 100 : 0,
      isDeduction: true,
    },
  ];

  return {
    revenue,
    orders,
    aov,
    cogs,
    shippingFulfillment: shipping,
    paymentFeesTotal,
    adSpend,
    refundsTotal,
    monthlyFixedExpenses: fixedExpenses,
    totalExpenses,
    netProfit,
    netMarginPercent,
    profitPerOrder,
    contributionMarginBeforeAds,
    contributionMarginPercentBeforeAds,
    breakEvenRoas,
    currentRoas,
    roasStatus,
    waterfall,
  };
}
