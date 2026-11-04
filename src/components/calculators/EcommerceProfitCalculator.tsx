import React, { useState, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { calculateEcommerceProfit } from '../../lib/calculations/ecommerceProfit';
import { CalculatorLayout } from '../shared/CalculatorLayout';
import { NumberInput } from '../shared/NumberInput';
import { ShareExportBar } from '../shared/ShareExportBar';
import { FAQItem } from '../../types';
import { ShoppingCart, TrendingUp, AlertTriangle, CheckCircle, Percent } from 'lucide-react';

const FAQS: FAQItem[] = [
  {
    question: 'What is Break-even ROAS and how do I use it?',
    answer: 'Break-even ROAS (Return On Ad Spend) is the minimum advertising efficiency required for your store to not lose money. It equals 1 ÷ Pre-Ad Contribution Margin. If your product and operational costs take up 60% of revenue, your margin before ads is 40% (0.40). Your break-even ROAS is 1 ÷ 0.40 = 2.50x. Any ad campaign generating below 2.50x is actively draining your bank account.',
  },
  {
    question: 'Why do returns and refunds impact ecommerce profitability so severely?',
    answer: 'When a customer requests a refund, you lose the revenue and the original shipping cost. Furthermore, payment processors (Stripe, Shopify Payments, PayPal) retain their 2.9% transaction fee. A 10% refund rate can wipe out 30% to 50% of your bottom-line net profit.',
  },
  {
    question: 'How is Profit Per Order calculated?',
    answer: 'Profit per order takes your total net profit (after subtracting all COGS, shipping, payment fees, marketing ad spend, and fixed apps/overhead) and divides it by total order count: Profit Per Order = Net Profit ÷ Total Orders.',
  },
];

export const EcommerceProfitCalculator: React.FC = () => {
  const { currency, formatMoney, formatPercent, formatNumber } = useCurrency();

  const [revenue, setRevenue] = useState<number>(50000);
  const [orders, setOrders] = useState<number>(650);
  const [cogs, setCogs] = useState<number>(14000);
  const [shippingFulfillment, setShippingFulfillment] = useState<number>(4500);
  const [paymentFeePercent, setPaymentFeePercent] = useState<number>(2.9);
  const [paymentFeeFixed, setPaymentFeeFixed] = useState<number>(0.3);
  const [adSpend, setAdSpend] = useState<number>(16000);
  const [refundRatePercent, setRefundRatePercent] = useState<number>(4.0);
  const [monthlyFixedExpenses, setMonthlyFixedExpenses] = useState<number>(3200);

  const presets = [
    {
      label: 'Scaling DTC Store ($50k/mo)',
      description: '650 orders, AOV $77, 32% ad spend',
      onSelect: () => {
        setRevenue(50000);
        setOrders(650);
        setCogs(14000);
        setShippingFulfillment(4500);
        setPaymentFeePercent(2.9);
        setPaymentFeeFixed(0.3);
        setAdSpend(16000);
        setRefundRatePercent(4.0);
        setMonthlyFixedExpenses(3200);
      },
    },
    {
      label: 'High-Margin Boutique ($120k/mo)',
      description: 'AOV $180, low returns, 22% ad spend',
      onSelect: () => {
        setRevenue(120000);
        setOrders(665);
        setCogs(24000);
        setShippingFulfillment(8000);
        setPaymentFeePercent(2.7);
        setPaymentFeeFixed(0.3);
        setAdSpend(28000);
        setRefundRatePercent(2.5);
        setMonthlyFixedExpenses(6500);
      },
    },
    {
      label: 'Apparel Store (High Returns)',
      description: '8% return rate, tight margins',
      onSelect: () => {
        setRevenue(80000);
        setOrders(1200);
        setCogs(28000);
        setShippingFulfillment(9600);
        setPaymentFeePercent(2.9);
        setPaymentFeeFixed(0.3);
        setAdSpend(26000);
        setRefundRatePercent(8.5);
        setMonthlyFixedExpenses(4500);
      },
    },
  ];

  const result = useMemo(() => {
    return calculateEcommerceProfit({
      revenue,
      orders,
      cogs,
      shippingFulfillment,
      paymentFeePercent,
      paymentFeeFixed,
      adSpend,
      refundRatePercent,
      monthlyFixedExpenses,
    });
  }, [
    revenue,
    orders,
    cogs,
    shippingFulfillment,
    paymentFeePercent,
    paymentFeeFixed,
    adSpend,
    refundRatePercent,
    monthlyFixedExpenses,
  ]);

  const handleReset = () => {
    setRevenue(50000);
    setOrders(650);
    setCogs(14000);
    setShippingFulfillment(4500);
    setPaymentFeePercent(2.9);
    setPaymentFeeFixed(0.3);
    setAdSpend(16000);
    setRefundRatePercent(4.0);
    setMonthlyFixedExpenses(3200);
  };

  const getSummaryText = () => {
    return `Fincelio E-commerce Profitability Summary:
Gross Revenue: ${formatMoney(result.revenue)} (${formatNumber(result.orders)} orders @ ${formatMoney(result.aov)} AOV)
COGS: ${formatMoney(result.cogs)}
Shipping & Fulfillment: ${formatMoney(result.shippingFulfillment)}
Payment Gateway Fees: ${formatMoney(result.paymentFeesTotal)}
Refunds & Returns: ${formatMoney(result.refundsTotal)}
Ad Spend: ${formatMoney(result.adSpend)}
Fixed Expenses: ${formatMoney(result.monthlyFixedExpenses)}
NET MONTHLY PROFIT: ${formatMoney(result.netProfit)} (${formatPercent(result.netMarginPercent)})
PROFIT PER ORDER: ${formatMoney(result.profitPerOrder)}
Break-Even ROAS: ${result.breakEvenRoas.toFixed(2)}x
Current ROAS: ${result.currentRoas.toFixed(2)}x
Calculated on Fincelio.com`;
  };

  const getCsvData = () => ({
    filename: 'fincelio-ecommerce-profit-analysis',
    rows: [
      ['Gross Revenue', result.revenue],
      ['Orders Count', result.orders],
      ['Average Order Value (AOV)', result.aov.toFixed(2)],
      ['Cost of Goods Sold (COGS)', result.cogs],
      ['Shipping & Fulfillment', result.shippingFulfillment],
      ['Payment Gateway Fees', result.paymentFeesTotal.toFixed(2)],
      ['Refunds & Returns', result.refundsTotal.toFixed(2)],
      ['Advertising Spend', result.adSpend],
      ['Monthly Fixed Overhead', result.monthlyFixedExpenses],
      ['Net Monthly Profit', result.netProfit.toFixed(2)],
      ['Net Margin (%)', result.netMarginPercent.toFixed(2)],
      ['Profit Per Order', result.profitPerOrder.toFixed(2)],
      ['Break-Even ROAS', result.breakEvenRoas.toFixed(2)],
      ['Current ROAS', result.currentRoas.toFixed(2)],
    ] as [string, string | number][],
  });

  return (
    <CalculatorLayout
      title="E-commerce Profit Calculator"
      slug="ecommerce-profit-calculator"
      category="ecommerce"
      categoryLabel="E-commerce Tools"
      description="Analyze net monthly online store profit, order unit economics, refund costs, and calculate your exact break-even ROAS for paid advertising."
      presets={presets}
      faqs={FAQS}
      relatedSlugs={['selling-price-calculator', 'profit-margin-calculator', 'landed-cost-calculator']}
      resultsNode={
        <div className="space-y-6">
          {/* Hero Metric */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-5 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#17231C]/60">
              Net Monthly Profit
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span
                className={`text-3xl sm:text-4xl font-extrabold font-mono tabular-nums ${
                  result.netProfit >= 0 ? 'text-[#21965A]' : 'text-red-600'
                }`}
              >
                {formatMoney(result.netProfit)}
              </span>
              <span className="text-sm font-semibold text-[#17231C] font-mono tabular-nums">
                {formatPercent(result.netMarginPercent)} net margin
              </span>
            </div>
            <div className="mt-2 text-xs text-[#17231C]/70">
              Generating <strong className="font-mono text-[#17231C]">{formatMoney(result.profitPerOrder)}</strong> profit per order across {formatNumber(result.orders)} orders at {formatMoney(result.aov)} AOV.
            </div>
          </div>

          {/* Break-Even ROAS Callout */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 bg-[#E5F5EB] text-[#21965A] rounded-lg shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-xs flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#17231C]">
                  Break-Even ROAS Target:
                </span>
                <span className="font-mono font-bold text-sm text-[#21965A]">
                  {result.breakEvenRoas.toFixed(2)}x
                </span>
              </div>
              <div className="text-[#17231C]/70 mt-1">
                Your current ad spend generates <strong className="font-mono">{result.currentRoas.toFixed(2)}x ROAS</strong>.
                {result.currentRoas >= result.breakEvenRoas ? (
                  <span className="text-[#21965A] font-medium ml-1">
                    ✓ Campaigns are generating profitable contribution margin.
                  </span>
                ) : (
                  <span className="text-red-600 font-medium ml-1">
                    ⚠ Campaigns are operating below break-even return.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Metrics 4-grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Average Order Value
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.aov)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                Revenue ÷ Orders
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Profit Per Order
              </div>
              <div className="text-xl font-bold font-mono text-[#21965A] mt-1 tabular-nums">
                {formatMoney(result.profitPerOrder)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                Bottom-line net cash
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Pre-Ad Margin
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatPercent(result.contributionMarginPercentBeforeAds)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                {formatMoney(result.contributionMarginBeforeAds)} available
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Total Expenses
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.totalExpenses)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                All operating deductions
              </div>
            </div>
          </div>

          <ShareExportBar
            onReset={handleReset}
            getSummaryText={getSummaryText}
            getCsvData={getCsvData}
          />
        </div>
      }
      scenarioNode={
        <div>
          <h3 className="text-lg font-bold text-[#17231C] mb-2">
            Monthly P&L Waterfall Statement
          </h3>
          <p className="text-xs sm:text-sm text-[#17231C]/70 mb-5">
            Step-by-step breakdown of monthly income from top-line sales to net retained earnings.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E3EBE5] text-[#17231C]/70 font-semibold bg-[#F4F8F5]">
                  <th className="py-2.5 px-3">Financial Line Item</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                  <th className="py-2.5 px-3 text-right">% of Revenue</th>
                  <th className="py-2.5 px-3 text-right">Per Order Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EBE5]">
                {result.waterfall.map((row) => (
                  <tr key={row.label} className="hover:bg-[#F4F8F5] transition-colors">
                    <td className="py-2.5 px-3 font-medium text-[#17231C]">
                      {row.label}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-mono tabular-nums ${
                        row.isDeduction ? 'text-[#17231C]/80' : 'text-[#17231C] font-semibold'
                      }`}
                    >
                      {row.isDeduction ? `−${formatMoney(row.amount)}` : formatMoney(row.amount)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#17231C]/60">
                      {formatPercent(row.percentOfRevenue)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#17231C]/70">
                      {formatMoney(row.amount / result.orders)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#E5F5EB]/60 font-bold text-[#17231C]">
                  <td className="py-3 px-3">NET PROFIT RETAINED</td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-[#21965A]">
                    {formatMoney(result.netProfit)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-[#21965A]">
                    {formatPercent(result.netMarginPercent)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-[#21965A]">
                    {formatMoney(result.profitPerOrder)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
      formulaNode={
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#17231C]">
            E-commerce Unit Economics Formulas
          </h3>
          <div className="p-4 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl font-mono text-xs space-y-2">
            <div className="text-[#17231C]/80">Pre-Ad Contribution Margin = Revenue − (COGS + Shipping + Payment Fees + Returns)</div>
            <div className="text-[#21965A] font-bold">Break-Even ROAS = 1 ÷ (Pre-Ad Contribution Margin ÷ Revenue)</div>
            <div className="text-[#17231C]/80">Current ROAS = Gross Revenue ÷ Advertising Spend</div>
            <div className="text-[#21965A] font-bold">Net Profit = Revenue − Total Operating Costs − Ad Spend − Fixed Overhead</div>
            <div className="text-[#17231C]/80">Profit per Order = Net Profit ÷ Total Orders</div>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Monthly Revenue"
            value={revenue}
            onChange={setRevenue}
            prefix={currency.symbol}
            helpText="Gross sales receipts"
            min={0}
          />
          <NumberInput
            label="Total Orders Count"
            value={orders}
            onChange={setOrders}
            suffix="orders"
            helpText="Monthly orders fulfilled"
            min={1}
            step={1}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Total COGS"
            value={cogs}
            onChange={setCogs}
            prefix={currency.symbol}
            helpText="Factory product cost"
            min={0}
          />
          <NumberInput
            label="Shipping & Fulfillment"
            value={shippingFulfillment}
            onChange={setShippingFulfillment}
            prefix={currency.symbol}
            helpText="Postage & pick-pack fees"
            min={0}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Advertising Spend (Ad Spend)"
            value={adSpend}
            onChange={setAdSpend}
            prefix={currency.symbol}
            helpText="Meta, Google, TikTok ads"
            min={0}
          />
          <NumberInput
            label="Refunds & Returns (%)"
            value={refundRatePercent}
            onChange={setRefundRatePercent}
            suffix="%"
            helpText="Share of sales returned"
            min={0}
            max={50}
            step="0.5"
          />
        </div>

        <NumberInput
          label="Monthly Fixed Overhead & Apps"
          value={monthlyFixedExpenses}
          onChange={setMonthlyFixedExpenses}
          prefix={currency.symbol}
          helpText="Shopify plan, Klaviyo, warehouse rent, team"
          min={0}
        />
      </div>
    </CalculatorLayout>
  );
};
