import React, { useState, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { calculateProfitMargin } from '../../lib/calculations/profitMargin';
import { CalculatorLayout } from '../shared/CalculatorLayout';
import { NumberInput } from '../shared/NumberInput';
import { ShareExportBar } from '../shared/ShareExportBar';
import { FAQItem } from '../../types';
import { TrendingUp, Percent, DollarSign, ArrowRight } from 'lucide-react';

const FAQS: FAQItem[] = [
  {
    question: 'What is the mathematical difference between Gross Margin and Net Margin?',
    answer: 'Gross Margin reflects revenue minus direct Cost of Goods Sold (COGS). Net Margin reflects revenue minus both COGS and all additional operating expenses (shipping, packaging, customer acquisition, merchant fees). While gross margin reveals basic product efficiency, net margin shows what actually remains in your company bank account.',
  },
  {
    question: 'How do I use Target Margin Mode?',
    answer: 'Toggle "Target Margin Mode" at the top of the input card. Enter your product cost, additional unit expenses, and desired profit margin (e.g., 35%). The calculator will instantly solve for the required selling price using the formula: Selling Price = Total Cost ÷ (1 − Desired Margin).',
  },
  {
    question: 'Why is markup percentage always higher than profit margin percentage?',
    answer: 'Because markup divides gross profit by the smaller number (cost), whereas profit margin divides gross profit by the larger number (selling price). If cost is $50 and price is $100, profit is $50. Markup is $50 ÷ $50 = 100%, while margin is $50 ÷ $100 = 50%.',
  },
  {
    question: 'What is a healthy profit margin for business?',
    answer: 'According to corporate finance benchmarks: 5% is low margin, 10% is average, 20% is healthy, and 30%+ is exceptional. Physical retail typically operates at 5%–15% net margins, e-commerce brands target 15%–25%, while digital products and SaaS often achieve 25%–40%+ net margins.',
  },
];

export const ProfitMarginCalculator: React.FC = () => {
  const { currency, formatMoney, formatPercent } = useCurrency();

  const [mode, setMode] = useState<'standard' | 'target'>('standard');
  const [cost, setCost] = useState<number>(45);
  const [sellingPrice, setSellingPrice] = useState<number>(100);
  const [additionalExpenses, setAdditionalExpenses] = useState<number>(12);
  const [targetMargin, setTargetMargin] = useState<number>(35);

  const presets = [
    {
      label: 'D2C Consumer Goods',
      description: 'Cost $25, Price $75, Expenses $10',
      onSelect: () => {
        setCost(25);
        setSellingPrice(75);
        setAdditionalExpenses(10);
        setMode('standard');
      },
    },
    {
      label: 'SaaS / Digital Tool',
      description: 'Cost $10, Price $99, Expenses $15',
      onSelect: () => {
        setCost(10);
        setSellingPrice(99);
        setAdditionalExpenses(15);
        setMode('standard');
      },
    },
    {
      label: 'Target 40% Margin',
      description: 'Enter cost $50 with 40% margin goal',
      onSelect: () => {
        setCost(50);
        setAdditionalExpenses(15);
        setTargetMargin(40);
        setMode('target');
      },
    },
  ];

  const result = useMemo(() => {
    let effectivePrice = sellingPrice;
    if (mode === 'target') {
      const totalCost = cost + additionalExpenses;
      const tm = targetMargin / 100;
      effectivePrice = tm < 1 ? totalCost / (1 - tm) : totalCost;
    }

    return calculateProfitMargin({
      cost,
      sellingPrice: effectivePrice,
      additionalExpenses,
      targetMargin,
    });
  }, [cost, sellingPrice, additionalExpenses, targetMargin, mode]);

  const handleReset = () => {
    setCost(45);
    setSellingPrice(100);
    setAdditionalExpenses(12);
    setTargetMargin(35);
    setMode('standard');
  };

  const getSummaryText = () => {
    return `Fincelio Profit Margin Calculation:
Product Cost: ${formatMoney(result.cost)}
Additional Expenses: ${formatMoney(result.additionalExpenses)}
Total Unit Cost: ${formatMoney(result.totalCost)}
Selling Price: ${formatMoney(result.sellingPrice)}
Gross Profit: ${formatMoney(result.grossProfit)} (${formatPercent(result.grossMarginPercent)})
Net Profit: ${formatMoney(result.netProfit)} (${formatPercent(result.netMarginPercent)})
Markup: ${formatPercent(result.markupPercent)}
Calculated on Fincelio.com`;
  };

  const getCsvData = () => ({
    filename: 'fincelio-profit-margin-analysis',
    rows: [
      ['Product Cost', result.cost],
      ['Additional Expenses', result.additionalExpenses],
      ['Total Unit Cost', result.totalCost],
      ['Selling Price', result.sellingPrice],
      ['Gross Profit', result.grossProfit],
      ['Gross Margin (%)', result.grossMarginPercent.toFixed(2)],
      ['Net Profit', result.netProfit],
      ['Net Margin (%)', result.netMarginPercent.toFixed(2)],
      ['Markup (%)', result.markupPercent.toFixed(2)],
    ] as [string, string | number][],
  });

  return (
    <CalculatorLayout
      title="Profit Margin Calculator"
      slug="profit-margin-calculator"
      category="financial"
      categoryLabel="Financial Tools"
      description="Calculate gross profit, net profit margin, and markup percentage from your product cost and selling price, or determine required selling price for a target margin."
      presets={presets}
      faqs={FAQS}
      relatedSlugs={['markup-calculator', 'selling-price-calculator', 'break-even-calculator']}
      resultsNode={
        <div className="space-y-6">
          {/* Hero Metric */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-5 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#17231C]/60">
              Net Profit Margin
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#21965A] font-mono tabular-nums">
                {formatPercent(result.netMarginPercent)}
              </span>
              <span className="text-sm font-semibold text-[#17231C] font-mono tabular-nums">
                {formatMoney(result.netProfit)} / unit
              </span>
            </div>
            <div className="mt-2 text-xs text-[#17231C]/70">
              Money remaining after subtracting both product cost ({formatMoney(result.cost)}) and operating expenses ({formatMoney(result.additionalExpenses)}).
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Gross Profit
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.grossProfit)}
              </div>
              <div className="text-xs text-[#21965A] font-mono mt-0.5 font-medium tabular-nums">
                {formatPercent(result.grossMarginPercent)} gross margin
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Markup on Cost
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatPercent(result.markupPercent)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                {(result.cost > 0 ? result.sellingPrice / result.cost : 1).toFixed(2)}x cost multiplier
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Total Unit Cost
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.totalCost)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                Cost + Expenses
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Selling Price
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.sellingPrice)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                Customer invoice price
              </div>
            </div>
          </div>

          {/* Visual Percentage Breakdown Bar */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-4 space-y-2">
            <div className="text-xs font-semibold text-[#17231C] flex justify-between">
              <span>Price Distribution</span>
              <span className="font-mono text-[11px] text-[#17231C]/60">100% of Revenue</span>
            </div>
            <div className="h-3 w-full bg-[#E3EBE5] rounded-full overflow-hidden flex">
              <div
                style={{ width: `${Math.min(100, Math.max(0, (result.cost / result.sellingPrice) * 100))}%` }}
                className="bg-[#64748B] transition-all duration-300"
                title={`COGS: ${formatMoney(result.cost)}`}
              />
              <div
                style={{ width: `${Math.min(100, Math.max(0, (result.additionalExpenses / result.sellingPrice) * 100))}%` }}
                className="bg-[#F59E0B] transition-all duration-300"
                title={`Expenses: ${formatMoney(result.additionalExpenses)}`}
              />
              <div
                style={{ width: `${Math.min(100, Math.max(0, result.netMarginPercent))}%` }}
                className="bg-[#21965A] transition-all duration-300"
                title={`Net Profit: ${formatMoney(result.netProfit)}`}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#17231C]/70 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#64748B]" /> COGS ({result.sellingPrice > 0 ? ((result.cost / result.sellingPrice) * 100).toFixed(1) : 0}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Expenses ({result.sellingPrice > 0 ? ((result.additionalExpenses / result.sellingPrice) * 100).toFixed(1) : 0}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#21965A]" /> Profit ({result.netMarginPercent.toFixed(1)}%)
              </span>
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
            Pricing Sensitivity & Margin Matrix
          </h3>
          <p className="text-xs sm:text-sm text-[#17231C]/70 mb-5">
            Compare unit profit and margins at different selling price points based on your current unit cost of {formatMoney(result.totalCost)}.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E3EBE5] text-[#17231C]/70 font-semibold bg-[#F4F8F5]">
                  <th className="py-2.5 px-3">Price Point</th>
                  <th className="py-2.5 px-3 text-right">Selling Price</th>
                  <th className="py-2.5 px-3 text-right">Net Profit</th>
                  <th className="py-2.5 px-3 text-right">Net Margin</th>
                  <th className="py-2.5 px-3 text-right">Markup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EBE5]">
                {[-20, -10, 0, 10, 20, 30].map((delta) => {
                  const sp = Math.max(result.totalCost, result.sellingPrice * (1 + delta / 100));
                  const np = sp - result.totalCost;
                  const nm = sp > 0 ? (np / sp) * 100 : 0;
                  const mk = result.cost > 0 ? ((sp - result.cost) / result.cost) * 100 : 0;
                  const isCurrent = delta === 0;

                  return (
                    <tr
                      key={delta}
                      className={isCurrent ? 'bg-[#E5F5EB]/60 font-semibold text-[#17231C]' : 'hover:bg-[#F4F8F5] transition-colors'}
                    >
                      <td className="py-2.5 px-3">
                        {delta === 0 ? 'Current Price (Base)' : `${delta > 0 ? '+' : ''}${delta}% Adjustment`}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                        {formatMoney(sp)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#21965A]">
                        {formatMoney(np)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                        {formatPercent(nm)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#17231C]/75">
                        {formatPercent(mk)}
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
            Mathematical Formulas & Worked Calculation Example
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl font-mono text-xs space-y-2">
              <div className="font-semibold text-[#17231C] font-sans">Formula Breakdown</div>
              <div className="text-[#17231C]/80">Gross Profit = Selling Price − Product Cost</div>
              <div className="text-[#17231C]/80">Net Profit = Selling Price − (Cost + Expenses)</div>
              <div className="text-[#21965A] font-bold">Gross Margin % = (Gross Profit ÷ Price) × 100</div>
              <div className="text-[#21965A] font-bold">Net Margin % = (Net Profit ÷ Price) × 100</div>
              <div className="text-[#17231C]/80">Markup % = (Gross Profit ÷ Cost) × 100</div>
            </div>

            <div className="p-4 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl text-xs space-y-2">
              <div className="font-semibold text-[#17231C]">Step-by-Step Practical Example</div>
              <div className="text-[#17231C]/80">
                You purchase an artisanal bag for <strong className="font-mono">{formatMoney(45)}</strong> and spend <strong className="font-mono">{formatMoney(12)}</strong> on domestic shipping and eco-packaging.
              </div>
              <div className="text-[#17231C]/80">
                You list it on your store for <strong className="font-mono">{formatMoney(100)}</strong>.
              </div>
              <div className="text-[#17231C]/90 font-medium">
                • Total Cost = $45 + $12 = $57
                <br />
                • Net Profit = $100 − $57 = <span className="text-[#21965A] font-mono font-bold">$43.00</span>
                <br />
                • Net Margin = ($43 ÷ $100) × 100 = <span className="text-[#21965A] font-mono font-bold">43.00%</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* Mode Switcher */}
      <div className="flex items-center gap-2 p-1 bg-[#F4F8F5] rounded-xl border border-[#E3EBE5]">
        <button
          type="button"
          onClick={() => setMode('standard')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            mode === 'standard'
              ? 'bg-white text-[#17231C] shadow-xs'
              : 'text-[#17231C]/65 hover:text-[#17231C]'
          }`}
        >
          Standard Calculation (Price to Margin)
        </button>
        <button
          type="button"
          onClick={() => setMode('target')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            mode === 'target'
              ? 'bg-white text-[#17231C] shadow-xs'
              : 'text-[#17231C]/65 hover:text-[#17231C]'
          }`}
        >
          Target Margin Mode (Cost to Price)
        </button>
      </div>

      <div className="space-y-4">
        <NumberInput
          label="Product Cost (COGS)"
          value={cost}
          onChange={setCost}
          prefix={currency.symbol}
          helpText="Direct cost to acquire or manufacture"
          min={0}
        />

        <NumberInput
          label="Additional Expenses per Unit"
          value={additionalExpenses}
          onChange={setAdditionalExpenses}
          prefix={currency.symbol}
          helpText="Fulfillment, shipping, packing, processing"
          min={0}
        />

        {mode === 'standard' ? (
          <NumberInput
            label="Selling Price"
            value={sellingPrice}
            onChange={setSellingPrice}
            prefix={currency.symbol}
            helpText="Final retail sale price to customer"
            min={0}
          />
        ) : (
          <NumberInput
            label="Desired Profit Margin (%)"
            value={targetMargin}
            onChange={setTargetMargin}
            suffix="%"
            helpText="Percentage of revenue you want as net profit"
            min={0}
            max={99}
          />
        )}
      </div>
    </CalculatorLayout>
  );
};
