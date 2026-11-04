import React, { useState, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { calculateWholesalePrice } from '../../lib/calculations/wholesalePrice';
import { CalculatorLayout } from '../shared/CalculatorLayout';
import { NumberInput } from '../shared/NumberInput';
import { ShareExportBar } from '../shared/ShareExportBar';
import { FAQItem } from '../../types';
import { Building2, Store, Percent, TrendingUp } from 'lucide-react';

const FAQS: FAQItem[] = [
  {
    question: 'How do manufacturers balance Wholesale Margin and Retailer Margin?',
    answer: 'Traditional B2B wholesale operates on a two-step margin structure: 1) The brand sells to the retailer at Wholesale Price (typically targeting a 40%–60% manufacturer margin over COGS); 2) The retailer applies a 50% keystone margin (100% markup) to sell to consumers at the Suggested Retail Price (MSRP).',
  },
  {
    question: 'Why must MSRP be calculated carefully?',
    answer: 'If your wholesale price is set too high relative to retail value, retailers will refuse to stock your SKU because they cannot make their required 50% margin. Conversely, if your MSRP is set too low, your brand will compete directly against your retail partners, causing channel conflict.',
  },
  {
    question: 'How do Bulk Minimum Order Quantity (MOQ) tiers work?',
    answer: 'Distributors and boutique stores ordering larger quantities (e.g. 500 or 1,000 units) expect volume discount tiers (5%–15% off standard wholesale). Because larger orders lower your packaging and freight overhead, your absolute profit per run remains strong.',
  },
];

export const WholesalePriceCalculator: React.FC = () => {
  const { currency, formatMoney, formatPercent, formatNumber } = useCurrency();

  const [productionCost, setProductionCost] = useState<number>(14.5);
  const [laborCost, setLaborCost] = useState<number>(4.0);
  const [packagingCost, setPackagingCost] = useState<number>(2.5);
  const [wholesaleMarginPercent, setWholesaleMarginPercent] = useState<number>(45);
  const [retailerMarginPercent, setRetailerMarginPercent] = useState<number>(50);

  const presets = [
    {
      label: 'Apparel / Fashion Brand',
      description: 'COGS $22, Wholesale 45%, Keystone Retailer 50%',
      onSelect: () => {
        setProductionCost(16);
        setLaborCost(3.5);
        setPackagingCost(2.5);
        setWholesaleMarginPercent(45);
        setRetailerMarginPercent(50);
      },
    },
    {
      label: 'Artisan Food & Beverage',
      description: 'High volume, lower margins (35% wholesale, 40% retail)',
      onSelect: () => {
        setProductionCost(3.2);
        setLaborCost(1.1);
        setPackagingCost(0.9);
        setWholesaleMarginPercent(35);
        setRetailerMarginPercent(40);
      },
    },
    {
      label: 'Consumer Hardware / Tech',
      description: 'High MSRP headroom, 50% wholesale, 45% retailer',
      onSelect: () => {
        setProductionCost(42);
        setLaborCost(8.0);
        setPackagingCost(5.0);
        setWholesaleMarginPercent(50);
        setRetailerMarginPercent(45);
      },
    },
  ];

  const result = useMemo(() => {
    return calculateWholesalePrice({
      productionCost,
      laborCost,
      packagingCost,
      wholesaleMarginPercent,
      retailerMarginPercent,
    });
  }, [
    productionCost,
    laborCost,
    packagingCost,
    wholesaleMarginPercent,
    retailerMarginPercent,
  ]);

  const handleReset = () => {
    setProductionCost(14.5);
    setLaborCost(4.0);
    setPackagingCost(2.5);
    setWholesaleMarginPercent(45);
    setRetailerMarginPercent(50);
  };

  const getSummaryText = () => {
    return `Fincelio Wholesale Pricing Schedule:
Total COGS: ${formatMoney(result.totalCostOfGoods)} (Materials: ${formatMoney(result.productionCost)}, Labor: ${formatMoney(result.laborCost)}, Packaging: ${formatMoney(result.packagingCost)})
Wholesale Price: ${formatMoney(result.wholesalePrice)}
Manufacturer Profit: ${formatMoney(result.manufacturerProfit)} (${formatPercent(result.wholesaleMarginPercent)} margin)
Suggested Retail Price (MSRP): ${formatMoney(result.suggestedRetailPrice)}
Retailer Profit: ${formatMoney(result.retailerProfit)} (${formatPercent(result.retailerMarginPercent)} retailer margin)
Calculated on Fincelio.com`;
  };

  const getCsvData = () => ({
    filename: 'fincelio-wholesale-pricing-analysis',
    rows: [
      ['Production / Materials', result.productionCost],
      ['Direct Labor', result.laborCost],
      ['Packaging & Barcoding', result.packagingCost],
      ['Total Cost of Goods (COGS)', result.totalCostOfGoods],
      ['Wholesale Margin (%)', result.wholesaleMarginPercent],
      ['Wholesale Price', result.wholesalePrice],
      ['Manufacturer Profit', result.manufacturerProfit],
      ['Manufacturer Markup (%)', result.manufacturerMarkupPercent.toFixed(2)],
      ['Retailer Margin (%)', result.retailerMarginPercent],
      ['Suggested Retail Price (MSRP)', result.suggestedRetailPrice],
      ['Retailer Profit', result.retailerProfit],
    ] as [string, string | number][],
  });

  return (
    <CalculatorLayout
      title="Wholesale Price Calculator"
      slug="wholesale-price-calculator"
      category="business"
      categoryLabel="Business Tools"
      description="Compute wholesale prices, manufacturer profit margins, suggested retail price (MSRP), and analyze retailer profits across bulk order tiers."
      presets={presets}
      faqs={FAQS}
      relatedSlugs={['markup-calculator', 'profit-margin-calculator', 'product-cost-calculator']}
      resultsNode={
        <div className="space-y-6">
          {/* Dual Hero Metric: Wholesale & MSRP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4 shadow-xs">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#17231C]/60 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#21965A]" /> Your Wholesale Price
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#21965A] mt-2 tabular-nums">
                {formatMoney(result.wholesalePrice)}
              </div>
              <div className="text-xs text-[#17231C]/70 mt-1">
                +{formatMoney(result.manufacturerProfit)} profit ({formatPercent(result.wholesaleMarginPercent)} margin)
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4 shadow-xs">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#17231C]/60 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-[#3B82F6]" /> Suggested Retail (MSRP)
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#17231C] mt-2 tabular-nums">
                {formatMoney(result.suggestedRetailPrice)}
              </div>
              <div className="text-xs text-[#17231C]/70 mt-1">
                Leaves {formatMoney(result.retailerProfit)} profit for retailer ({formatPercent(result.retailerMarginPercent)} margin)
              </div>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Total COGS
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.totalCostOfGoods)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                Materials + Labor + Pack
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Wholesale Markup
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatPercent(result.manufacturerMarkupPercent)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                {(result.totalCostOfGoods > 0 ? result.wholesalePrice / result.totalCostOfGoods : 1).toFixed(2)}x markup over COGS
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Retailer Profit / Unit
              </div>
              <div className="text-xl font-bold font-mono text-[#21965A] mt-1 tabular-nums">
                {formatMoney(result.retailerProfit)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                MSRP − Wholesale
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Retailer Multiplier
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {(result.wholesalePrice > 0 ? result.suggestedRetailPrice / result.wholesalePrice : 2).toFixed(2)}x
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                MSRP ÷ Wholesale
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
            Volume Wholesale Pricing Tiers (MOQ Schedule)
          </h3>
          <p className="text-xs sm:text-sm text-[#17231C]/70 mb-5">
            Standard B2B tiered discounting schedule for retailers and distributors.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E3EBE5] text-[#17231C]/70 font-semibold bg-[#F4F8F5]">
                  <th className="py-2.5 px-3">Order Tier & Quantity</th>
                  <th className="py-2.5 px-3 text-right">Volume Discount</th>
                  <th className="py-2.5 px-3 text-right">Wholesale Price</th>
                  <th className="py-2.5 px-3 text-right">Your Unit Profit</th>
                  <th className="py-2.5 px-3 text-right">Your Margin</th>
                  <th className="py-2.5 px-3 text-right">MSRP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EBE5]">
                {result.bulkTiers.map((t, idx) => (
                  <tr
                    key={t.tierName}
                    className={idx === 0 ? 'bg-[#E5F5EB]/60 font-semibold text-[#17231C]' : 'hover:bg-[#F4F8F5] transition-colors'}
                  >
                    <td className="py-2.5 px-3 font-medium text-[#17231C]">
                      {t.tierName}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#17231C]/70">
                      {t.discountPercent}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-[#17231C]">
                      {formatMoney(t.wholesalePrice)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#21965A]">
                      {formatMoney(t.manufacturerProfit)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                      {formatPercent(t.manufacturerMarginPercent)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#17231C]/80">
                      {formatMoney(t.suggestedRetailPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      formulaNode={
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#17231C]">
            Wholesale & Keystone Mathematical Formulas
          </h3>
          <div className="p-4 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl font-mono text-xs space-y-2">
            <div className="text-[#17231C]/80">Total Cost of Goods (COGS) = Production + Labor + Packaging</div>
            <div className="text-[#21965A] font-bold">Wholesale Price = Total COGS ÷ [1 − (Wholesale Margin % ÷ 100)]</div>
            <div className="text-[#21965A] font-bold">Suggested Retail Price (MSRP) = Wholesale Price ÷ [1 − (Retailer Margin % ÷ 100)]</div>
            <div className="text-[#17231C]/80">Manufacturer Unit Profit = Wholesale Price − Total COGS</div>
            <div className="text-[#17231C]/80">Retailer Unit Profit = MSRP − Wholesale Price</div>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <NumberInput
          label="Production / Raw Materials per Unit"
          value={productionCost}
          onChange={setProductionCost}
          prefix={currency.symbol}
          helpText="Raw material and component cost"
          min={0}
        />

        <NumberInput
          label="Direct Labor per Unit"
          value={laborCost}
          onChange={setLaborCost}
          prefix={currency.symbol}
          helpText="Assembly, sewing, fabrication"
          min={0}
        />

        <NumberInput
          label="Packaging & Barcoding per Unit"
          value={packagingCost}
          onChange={setPackagingCost}
          prefix={currency.symbol}
          helpText="Product box, hangtag, barcode label"
          min={0}
        />

        <div className="grid grid-cols-2 gap-3 pt-1">
          <NumberInput
            label="Your Wholesale Margin (%)"
            value={wholesaleMarginPercent}
            onChange={setWholesaleMarginPercent}
            suffix="%"
            helpText="Manufacturer target margin"
            min={5}
            max={90}
            step={1}
          />

          <NumberInput
            label="Retailer Margin (%)"
            value={retailerMarginPercent}
            onChange={setRetailerMarginPercent}
            suffix="%"
            helpText="50% is standard keystone"
            min={10}
            max={85}
            step={1}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};
