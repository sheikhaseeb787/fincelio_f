import React, { useState, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { calculateMarkup, MarkupMode, markupToMargin, marginToMarkup } from '../../lib/calculations/markup';
import { CalculatorLayout } from '../shared/CalculatorLayout';
import { NumberInput } from '../shared/NumberInput';
import { ShareExportBar } from '../shared/ShareExportBar';
import { FAQItem } from '../../types';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';

const FAQS: FAQItem[] = [
  {
    question: 'How do I convert a 50% markup into profit margin?',
    answer: 'Using the conversion equation: Margin = [Markup ÷ (100 + Markup)] × 100. For a 50% markup: 50 ÷ (100 + 50) = 50 ÷ 150 = 33.33% margin. A 50% markup yields a 33.33% profit margin.',
  },
  {
    question: 'What is Keystone Markup?',
    answer: 'Keystone markup is the traditional retail pricing convention of doubling the wholesale cost (a 100% markup). If a retailer buys an item for $50 and sells it for $100, the markup is 100%, and the gross profit margin is 50%.',
  },
  {
    question: 'What is Reverse Markup?',
    answer: 'Reverse markup is used when you know your competitor\'s retail price and the standard industry markup, and you want to work backwards to deduce their initial unit cost: Cost = Selling Price ÷ (1 + Markup ÷ 100).',
  },
];

export const MarkupCalculator: React.FC = () => {
  const { currency, formatMoney, formatPercent } = useCurrency();

  const [mode, setMode] = useState<MarkupMode>('cost_to_price');
  const [cost, setCost] = useState<number>(60);
  const [sellingPrice, setSellingPrice] = useState<number>(100);
  const [markupPercent, setMarkupPercent] = useState<number>(50);
  const [marginPercent, setMarginPercent] = useState<number>(33.33);

  const presets = [
    {
      label: 'Keystone (100% Markup)',
      description: 'Standard retail 2x multiplier',
      onSelect: () => {
        setCost(50);
        setMarkupPercent(100);
        setMode('cost_to_price');
      },
    },
    {
      label: 'Competitive 35% Markup',
      description: 'Wholesale electronics pricing',
      onSelect: () => {
        setCost(80);
        setMarkupPercent(35);
        setMode('cost_to_price');
      },
    },
    {
      label: 'Convert 40% Margin to Markup',
      description: 'Find required markup for 40% margin',
      onSelect: () => {
        setCost(100);
        setMarginPercent(40);
        setMode('margin_to_markup');
      },
    },
  ];

  const result = useMemo(() => {
    return calculateMarkup(mode, {
      cost,
      sellingPrice,
      markupPercent,
      marginPercent,
    });
  }, [mode, cost, sellingPrice, markupPercent, marginPercent]);

  const handleReset = () => {
    setCost(60);
    setSellingPrice(100);
    setMarkupPercent(50);
    setMarginPercent(33.33);
    setMode('cost_to_price');
  };

  const getSummaryText = () => {
    return `Fincelio Markup Calculation (${mode}):
Cost: ${formatMoney(result.cost)}
Selling Price: ${formatMoney(result.sellingPrice)}
Gross Profit: ${formatMoney(result.grossProfit)}
Markup: ${formatPercent(result.markupPercent)}
Profit Margin: ${formatPercent(result.marginPercent)}
Cost Multiplier: ${result.multiplier.toFixed(2)}x
Calculated on Fincelio.com`;
  };

  const getCsvData = () => ({
    filename: 'fincelio-markup-analysis',
    rows: [
      ['Mode', mode],
      ['Cost', result.cost],
      ['Selling Price', result.sellingPrice],
      ['Gross Profit', result.grossProfit],
      ['Markup (%)', result.markupPercent.toFixed(2)],
      ['Profit Margin (%)', result.marginPercent.toFixed(2)],
      ['Multiplier', result.multiplier.toFixed(2)],
    ] as [string, string | number][],
  });

  return (
    <CalculatorLayout
      title="Markup Calculator"
      slug="markup-calculator"
      category="business"
      categoryLabel="Business Tools"
      description="Calculate markup from cost and selling price, convert between markup and margin, perform reverse markups, and evaluate bulk pricing tiers."
      presets={presets}
      faqs={FAQS}
      relatedSlugs={['profit-margin-calculator', 'wholesale-price-calculator', 'selling-price-calculator']}
      resultsNode={
        <div className="space-y-6">
          {/* Hero Metric */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-5 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#17231C]/60">
              {mode === 'cost_to_price' || mode === 'margin_to_markup'
                ? 'Resulting Selling Price'
                : 'Calculated Markup'}
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#21965A] font-mono tabular-nums">
                {mode === 'cost_to_price' || mode === 'margin_to_markup'
                  ? formatMoney(result.sellingPrice)
                  : formatPercent(result.markupPercent)}
              </span>
              <span className="text-sm font-semibold text-[#17231C] font-mono tabular-nums">
                {formatMoney(result.grossProfit)} profit
              </span>
            </div>
            <div className="mt-2 text-xs text-[#17231C]/70">
              Yields an equivalent profit margin of{' '}
              <strong className="text-[#17231C] font-mono">{formatPercent(result.marginPercent)}</strong> on gross sales.
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Markup Percentage
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatPercent(result.markupPercent)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                Added on top of cost
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Profit Margin
              </div>
              <div className="text-xl font-bold font-mono text-[#21965A] mt-1 tabular-nums">
                {formatPercent(result.marginPercent)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                Share of selling price
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Base Cost
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.cost)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                Initial product acquisition
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Cost Multiplier
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {result.multiplier.toFixed(2)}x
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                Price ÷ Cost
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
            Bulk Markup vs Margin Comparison Table
          </h3>
          <p className="text-xs sm:text-sm text-[#17231C]/70 mb-5">
            Evaluate standard retail and wholesale markup rates on your base cost of {formatMoney(result.cost > 0 ? result.cost : 50)} to choose the optimal pricing strategy.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E3EBE5] text-[#17231C]/70 font-semibold bg-[#F4F8F5]">
                  <th className="py-2.5 px-3">Markup Rate</th>
                  <th className="py-2.5 px-3 text-right">Resulting Price</th>
                  <th className="py-2.5 px-3 text-right">Gross Profit</th>
                  <th className="py-2.5 px-3 text-right">Equivalent Margin</th>
                  <th className="py-2.5 px-3 text-right">Pricing Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EBE5]">
                {result.bulkTiers.map((tier) => {
                  const isCurrent = Math.abs(tier.markupPercent - result.markupPercent) < 2;
                  let tierNote = 'Discount / Competitive';
                  if (tier.markupPercent >= 100) tierNote = 'Keystone / Premium';
                  else if (tier.markupPercent >= 50) tierNote = 'Standard Retail';

                  return (
                    <tr
                      key={tier.markupPercent}
                      className={isCurrent ? 'bg-[#E5F5EB]/60 font-semibold text-[#17231C]' : 'hover:bg-[#F4F8F5] transition-colors'}
                    >
                      <td className="py-2.5 px-3 font-mono font-medium">
                        {tier.markupPercent}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                        {formatMoney(tier.sellingPrice)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#21965A]">
                        {formatMoney(tier.profit)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                        {formatPercent(tier.marginPercent)}
                      </td>
                      <td className="py-2.5 px-3 text-right text-xs text-[#17231C]/60">
                        {tierNote}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      }
      formulaNode={
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#17231C]">
            Markup Mathematical Reference & Conversion Equations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl font-mono text-xs space-y-2">
              <div className="font-semibold text-[#17231C] font-sans">Formula Glossary</div>
              <div className="text-[#17231C]/80">Selling Price = Cost × (1 + Markup ÷ 100)</div>
              <div className="text-[#17231C]/80">Markup % = [(Price − Cost) ÷ Cost] × 100</div>
              <div className="text-[#21965A] font-bold">Margin = [Markup ÷ (100 + Markup)] × 100</div>
              <div className="text-[#21965A] font-bold">Markup = [Margin ÷ (100 − Margin)] × 100</div>
              <div className="text-[#17231C]/80">Reverse Cost = Selling Price ÷ (1 + Markup ÷ 100)</div>
            </div>

            <div className="p-4 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl text-xs space-y-2">
              <div className="font-semibold text-[#17231C]">Quick Conversion Reference</div>
              <div className="divide-y divide-[#E3EBE5]/60 text-[#17231C]/80">
                <div className="py-1 flex justify-between"><span>25% Markup</span><span className="font-mono text-[#21965A] font-bold">20.0% Margin</span></div>
                <div className="py-1 flex justify-between"><span>33.3% Markup</span><span className="font-mono text-[#21965A] font-bold">25.0% Margin</span></div>
                <div className="py-1 flex justify-between"><span>50% Markup</span><span className="font-mono text-[#21965A] font-bold">33.3% Margin</span></div>
                <div className="py-1 flex justify-between"><span>100% Markup (Keystone)</span><span className="font-mono text-[#21965A] font-bold">50.0% Margin</span></div>
                <div className="py-1 flex justify-between"><span>200% Markup</span><span className="font-mono text-[#21965A] font-bold">66.7% Margin</span></div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* 5-Mode selector tabs */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#17231C]">Calculation Mode</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-1 bg-[#F4F8F5] rounded-xl border border-[#E3EBE5]">
          {[
            { id: 'cost_to_price', label: 'Cost → Selling Price' },
            { id: 'price_to_markup', label: 'Price → Markup %' },
            { id: 'markup_to_margin', label: 'Markup → Margin' },
            { id: 'margin_to_markup', label: 'Margin → Markup' },
            { id: 'reverse_markup', label: 'Reverse (Price → Cost)' },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id as MarkupMode)}
              className={`py-1.5 px-2 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center truncate ${
                mode === m.id
                  ? 'bg-white text-[#17231C] font-semibold shadow-xs'
                  : 'text-[#17231C]/70 hover:text-[#17231C]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-2">
        {(mode === 'cost_to_price' || mode === 'price_to_markup' || mode === 'markup_to_margin' || mode === 'margin_to_markup') && (
          <NumberInput
            label="Product Cost"
            value={cost}
            onChange={setCost}
            prefix={currency.symbol}
            helpText="What you paid to make or buy the item"
            min={0}
          />
        )}

        {(mode === 'cost_to_price' || mode === 'markup_to_margin' || mode === 'reverse_markup') && (
          <NumberInput
            label="Markup Percentage (%)"
            value={markupPercent}
            onChange={setMarkupPercent}
            suffix="%"
            helpText="Percentage added to cost"
            min={0}
          />
        )}

        {(mode === 'price_to_markup' || mode === 'reverse_markup') && (
          <NumberInput
            label="Selling Price"
            value={sellingPrice}
            onChange={setSellingPrice}
            prefix={currency.symbol}
            helpText="Final price charged to customer"
            min={0}
          />
        )}

        {mode === 'margin_to_markup' && (
          <NumberInput
            label="Desired Profit Margin (%)"
            value={marginPercent}
            onChange={setMarginPercent}
            suffix="%"
            helpText="Margin % you want to convert into markup"
            min={0}
            max={99}
          />
        )}
      </div>
    </CalculatorLayout>
  );
};
