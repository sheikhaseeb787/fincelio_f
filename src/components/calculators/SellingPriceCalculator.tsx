import React, { useState, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { calculateSellingPrice } from '../../lib/calculations/sellingPrice';
import { CalculatorLayout } from '../shared/CalculatorLayout';
import { NumberInput } from '../shared/NumberInput';
import { ShareExportBar } from '../shared/ShareExportBar';
import { FAQItem } from '../../types';
import { DollarSign, ShieldAlert, Sparkles, Tag } from 'lucide-react';

const FAQS: FAQItem[] = [
  {
    question: 'Why do payment gateway and marketplace fees increase required selling price so drastically?',
    answer: 'Marketplace fees (e.g. 15% on Amazon) and payment processing fees (e.g. 2.9% + $0.30) are assessed against the TOTAL customer payment, which includes your profit and taxes. As price increases, the absolute fee paid also increases. The algebraic denominator 1 − (fees% + margin%) correctly accounts for this compounding effect.',
  },
  {
    question: 'What is the Minimum Profitable Selling Price?',
    answer: 'This is your exact break-even floor price where your net profit is exactly $0. Selling below this price means you lose money on every unit delivered. Selling above it generates operational profit.',
  },
  {
    question: 'How are the three pricing scenarios calculated?',
    answer: 'The calculator generates three realistic strategic scenarios: Conservative (high volume, 10% lower margin to compete aggressively), Target (your selected profit margin), and Premium (15% higher margin for brand positioning and marketing buffer).',
  },
];

export const SellingPriceCalculator: React.FC = () => {
  const { currency, formatMoney, formatPercent } = useCurrency();

  const [productCost, setProductCost] = useState<number>(30);
  const [shippingPackaging, setShippingPackaging] = useState<number>(6.5);
  const [advertisingExpenses, setAdvertisingExpenses] = useState<number>(14);
  const [paymentFeePercent, setPaymentFeePercent] = useState<number>(2.9);
  const [paymentFeeFixed, setPaymentFeeFixed] = useState<number>(0.3);
  const [marketplaceFeePercent, setMarketplaceFeePercent] = useState<number>(5.0);
  const [desiredProfitMarginPercent, setDesiredProfitMarginPercent] = useState<number>(25);

  const presets = [
    {
      label: 'Shopify DTC Brand',
      description: 'COGS $25, Ship $6, CAC $12, Stripe 2.9%+$0.30, Target 30%',
      onSelect: () => {
        setProductCost(25);
        setShippingPackaging(6);
        setAdvertisingExpenses(12);
        setPaymentFeePercent(2.9);
        setPaymentFeeFixed(0.3);
        setMarketplaceFeePercent(0);
        setDesiredProfitMarginPercent(30);
      },
    },
    {
      label: 'Amazon FBA Merchant',
      description: 'COGS $15, Inbound $3, PPC $8, Amazon 15%, Target 20%',
      onSelect: () => {
        setProductCost(15);
        setShippingPackaging(3);
        setAdvertisingExpenses(8);
        setPaymentFeePercent(0);
        setPaymentFeeFixed(0);
        setMarketplaceFeePercent(15);
        setDesiredProfitMarginPercent(20);
      },
    },
    {
      label: 'High-Ticket Premium',
      description: 'COGS $85, Ship $15, CAC $35, Target 40%',
      onSelect: () => {
        setProductCost(85);
        setShippingPackaging(15);
        setAdvertisingExpenses(35);
        setPaymentFeePercent(3.2);
        setPaymentFeeFixed(0.4);
        setMarketplaceFeePercent(3);
        setDesiredProfitMarginPercent(40);
      },
    },
  ];

  const result = useMemo(() => {
    return calculateSellingPrice({
      productCost,
      shippingPackaging,
      advertisingExpenses,
      paymentFeePercent,
      paymentFeeFixed,
      marketplaceFeePercent,
      desiredProfitMarginPercent,
    });
  }, [
    productCost,
    shippingPackaging,
    advertisingExpenses,
    paymentFeePercent,
    paymentFeeFixed,
    marketplaceFeePercent,
    desiredProfitMarginPercent,
  ]);

  const handleReset = () => {
    setProductCost(30);
    setShippingPackaging(6.5);
    setAdvertisingExpenses(14);
    setPaymentFeePercent(2.9);
    setPaymentFeeFixed(0.3);
    setMarketplaceFeePercent(5.0);
    setDesiredProfitMarginPercent(25);
  };

  const getSummaryText = () => {
    return `Fincelio Selling Price Recommendation:
Target Selling Price: ${formatMoney(result.targetSellingPrice)}
Minimum Profitable Floor Price: ${formatMoney(result.minimumProfitablePrice)}
Product Cost: ${formatMoney(result.productCost)}
Shipping & Packing: ${formatMoney(result.shippingPackaging)}
Ad Spend (CAC): ${formatMoney(result.advertisingExpenses)}
Payment Processing: ${formatMoney(result.paymentFeeAmount)}
Marketplace Fees: ${formatMoney(result.marketplaceFeeAmount)}
Net Profit per Unit: ${formatMoney(result.netProfit)} (${formatPercent(result.actualMarginPercent)})
Calculated on Fincelio.com`;
  };

  const getCsvData = () => ({
    filename: 'fincelio-selling-price-analysis',
    rows: [
      ['Target Selling Price', result.targetSellingPrice],
      ['Minimum Profitable Floor Price', result.minimumProfitablePrice],
      ['Product Cost (COGS)', result.productCost],
      ['Shipping & Packaging', result.shippingPackaging],
      ['Advertising (CAC)', result.advertisingExpenses],
      ['Payment Gateway Fees', result.paymentFeeAmount],
      ['Marketplace Platform Fees', result.marketplaceFeeAmount],
      ['Total Variable Cost', result.totalVariableCost],
      ['Net Profit per Unit', result.netProfit],
      ['Net Profit Margin (%)', result.actualMarginPercent.toFixed(2)],
    ] as [string, string | number][],
  });

  return (
    <CalculatorLayout
      title="Selling Price Calculator"
      slug="selling-price-calculator"
      category="ecommerce"
      categoryLabel="E-commerce Tools"
      description="Determine the exact selling price needed to achieve your desired profit margin after deducting product costs, shipping, advertising, and platform transaction cuts."
      presets={presets}
      faqs={FAQS}
      relatedSlugs={['profit-margin-calculator', 'ecommerce-profit-calculator', 'landed-cost-calculator']}
      resultsNode={
        <div className="space-y-6">
          {/* Hero Metric */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-5 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#17231C]/60">
              Recommended Target Selling Price
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#21965A] font-mono tabular-nums">
                {formatMoney(result.targetSellingPrice)}
              </span>
              <span className="text-sm font-semibold text-[#17231C] font-mono tabular-nums">
                +{formatMoney(result.netProfit)} net profit
              </span>
            </div>
            <div className="mt-2 text-xs text-[#17231C]/70">
              Guarantees your <strong className="text-[#17231C] font-mono">{formatPercent(result.actualMarginPercent)}</strong> profit margin after all transaction and ad fees.
            </div>
          </div>

          {/* Break-even floor alert */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 bg-[#F4F8F5] text-[#17231C]/80 rounded-lg shrink-0">
              <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-[#17231C]">
                Minimum Profitable Floor: <span className="font-mono text-[#21965A] font-bold">{formatMoney(result.minimumProfitablePrice)}</span>
              </div>
              <div className="text-[#17231C]/70 mt-0.5">
                Never price below this threshold; selling at this price yields zero profit and barely recovers direct costs.
              </div>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-4 space-y-2.5">
            <div className="text-xs font-bold text-[#17231C] uppercase tracking-wider pb-1 border-b border-[#E3EBE5]">
              Per-Unit Cost & Fee Distribution
            </div>
            <div className="divide-y divide-[#E3EBE5]/60 text-xs text-[#17231C]/80">
              <div className="py-1.5 flex justify-between">
                <span>Product Cost (COGS)</span>
                <span className="font-mono font-medium">{formatMoney(result.productCost)}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Shipping & Packaging</span>
                <span className="font-mono font-medium">{formatMoney(result.shippingPackaging)}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Advertising CAC</span>
                <span className="font-mono font-medium">{formatMoney(result.advertisingExpenses)}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Payment Processing ({paymentFeePercent}% + {formatMoney(paymentFeeFixed)})</span>
                <span className="font-mono font-medium">{formatMoney(result.paymentFeeAmount)}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span>Marketplace / Platform ({marketplaceFeePercent}%)</span>
                <span className="font-mono font-medium">{formatMoney(result.marketplaceFeeAmount)}</span>
              </div>
              <div className="py-2 flex justify-between font-bold text-[#17231C] bg-[#F4F8F5] -mx-4 px-4 rounded-b-xl">
                <span>Net Profit ({formatPercent(result.actualMarginPercent)})</span>
                <span className="font-mono text-[#21965A]">{formatMoney(result.netProfit)}</span>
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
            Strategic Pricing Scenarios
          </h3>
          <p className="text-xs sm:text-sm text-[#17231C]/70 mb-5">
            Evaluate conservative volume pricing versus premium margin positioning side-by-side.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {result.scenarios.map((sc, i) => {
              const isTarget = i === 1;
              return (
                <div
                  key={sc.name}
                  className={`p-5 rounded-xl border transition-all ${
                    isTarget
                      ? 'bg-[#E5F5EB]/50 border-[#21965A] shadow-xs'
                      : 'bg-white border-[#E3EBE5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#17231C]/70">
                      {sc.name}
                    </span>
                    {isTarget && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#21965A] bg-white px-2 py-0.5 rounded-full border border-[#21965A]/30">
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="mt-3 text-2xl font-bold font-mono text-[#17231C] tabular-nums">
                    {formatMoney(sc.sellingPrice)}
                  </div>
                  <div className="mt-1 text-xs text-[#21965A] font-semibold font-mono tabular-nums">
                    {formatPercent(sc.marginPercent)} Net Margin
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E3EBE5] text-xs text-[#17231C]/80 space-y-1">
                    <div className="flex justify-between">
                      <span>Profit per Unit:</span>
                      <span className="font-mono font-semibold">{formatMoney(sc.netProfit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return on Costs:</span>
                      <span className="font-mono">{formatPercent(sc.roiPercent, 1)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      }
      formulaNode={
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#17231C]">
            Mathematical Selling Price Deduction Formula
          </h3>
          <div className="p-4 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl font-mono text-xs space-y-2">
            <div className="text-[#17231C]/80">Direct Costs = Product Cost + Shipping + Advertising</div>
            <div className="text-[#17231C]/80">Total Fee Rate = (Payment Fee % + Marketplace Fee %) ÷ 100</div>
            <div className="text-[#21965A] font-bold">
              Selling Price = (Direct Costs + Fixed Gateway Fee) ÷ [1 − Total Fee Rate − (Desired Margin ÷ 100)]
            </div>
            <div className="text-[#17231C]/60 text-[11px] pt-1 font-sans">
              *The denominator subtracts both percentage fees and desired margin from 1, mathematically protecting your target profit against commission clawbacks.
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <NumberInput
          label="Product Cost (COGS)"
          value={productCost}
          onChange={setProductCost}
          prefix={currency.symbol}
          helpText="Manufacturing or acquisition cost"
          min={0}
        />

        <NumberInput
          label="Shipping & Packaging per Unit"
          value={shippingPackaging}
          onChange={setShippingPackaging}
          prefix={currency.symbol}
          helpText="Box, bubble wrap, domestic postage"
          min={0}
        />

        <NumberInput
          label="Advertising / Customer Acquisition (CAC)"
          value={advertisingExpenses}
          onChange={setAdvertisingExpenses}
          prefix={currency.symbol}
          helpText="Blended paid ad spend per unit sold"
          min={0}
        />

        <div className="grid grid-cols-2 gap-3 pt-1">
          <NumberInput
            label="Payment Fee (%)"
            value={paymentFeePercent}
            onChange={setPaymentFeePercent}
            suffix="%"
            helpText="e.g. 2.9% for Stripe"
            min={0}
            step="0.1"
          />
          <NumberInput
            label="Payment Fixed Fee"
            value={paymentFeeFixed}
            onChange={setPaymentFeeFixed}
            prefix={currency.symbol}
            helpText="e.g. $0.30 per charge"
            min={0}
            step="0.05"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Marketplace Fee (%)"
            value={marketplaceFeePercent}
            onChange={setMarketplaceFeePercent}
            suffix="%"
            helpText="e.g. 15% Amazon, 5% Etsy"
            min={0}
            step="0.5"
          />
          <NumberInput
            label="Desired Margin (%)"
            value={desiredProfitMarginPercent}
            onChange={setDesiredProfitMarginPercent}
            suffix="%"
            helpText="Target net percentage"
            min={1}
            max={90}
            step="1"
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};
