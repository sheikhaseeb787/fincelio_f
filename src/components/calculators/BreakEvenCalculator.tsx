import React, { useState, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { calculateBreakEven } from '../../lib/calculations/breakEven';
import { CalculatorLayout } from '../shared/CalculatorLayout';
import { NumberInput } from '../shared/NumberInput';
import { ShareExportBar } from '../shared/ShareExportBar';
import { FAQItem } from '../../types';
import { Target, TrendingUp, Layers, CheckCircle } from 'lucide-react';

const FAQS: FAQItem[] = [
  {
    question: 'What is the Contribution Margin?',
    answer: 'Contribution margin is the selling price per unit minus variable cost per unit. It represents the actual portion of every sale that contributes toward paying off your fixed overhead expenses (rent, salaries, licenses). Once fixed costs are fully covered, 100% of the contribution margin becomes operating net profit.',
  },
  {
    question: 'What is the difference between Fixed Costs and Variable Costs?',
    answer: 'Fixed costs remain constant regardless of how many units you sell (e.g. office rent, base salaries, monthly software subscriptions, insurance). Variable costs increase directly with every unit produced or sold (e.g. raw materials, packaging, transaction fees, direct labor).',
  },
  {
    question: 'How do I calculate Break-Even with a Target Profit Goal?',
    answer: 'To achieve a specific profit target: Units Needed = (Fixed Costs + Target Profit Goal) ÷ Contribution Margin per Unit. This calculator computes both your base break-even point and the volume required to hit your target profit.',
  },
];

export const BreakEvenCalculator: React.FC = () => {
  const { currency, formatMoney, formatPercent, formatNumber } = useCurrency();

  const [fixedCosts, setFixedCosts] = useState<number>(12000);
  const [variableCosts, setVariableCosts] = useState<number>(35);
  const [sellingPrice, setSellingPrice] = useState<number>(95);
  const [targetProfit, setTargetProfit] = useState<number>(8000);

  const presets = [
    {
      label: 'SaaS / Micro-Startup',
      description: 'Fixed $5,000/mo, Variable $5/sub, Price $49/mo',
      onSelect: () => {
        setFixedCosts(5000);
        setVariableCosts(5);
        setSellingPrice(49);
        setTargetProfit(10000);
      },
    },
    {
      label: 'Retail Coffee Shop',
      description: 'Fixed $14,000/mo, Variable $1.80/cup, Price $5.50',
      onSelect: () => {
        setFixedCosts(14000);
        setVariableCosts(1.8);
        setSellingPrice(5.5);
        setTargetProfit(6000);
      },
    },
    {
      label: 'B2B Manufacturing Run',
      description: 'Fixed $25,000, Variable $45/unit, Price $120',
      onSelect: () => {
        setFixedCosts(25000);
        setVariableCosts(45);
        setSellingPrice(120);
        setTargetProfit(15000);
      },
    },
  ];

  const result = useMemo(() => {
    return calculateBreakEven({
      fixedCosts,
      variableCosts,
      sellingPrice,
      targetProfit,
    });
  }, [fixedCosts, variableCosts, sellingPrice, targetProfit]);

  const handleReset = () => {
    setFixedCosts(12000);
    setVariableCosts(35);
    setSellingPrice(95);
    setTargetProfit(8000);
  };

  const getSummaryText = () => {
    return `Fincelio Break-Even Analysis:
Fixed Overhead: ${formatMoney(result.fixedCosts)}
Variable Cost per Unit: ${formatMoney(result.variableCosts)}
Selling Price: ${formatMoney(result.sellingPrice)}
Contribution Margin: ${formatMoney(result.contributionMargin)} (${formatPercent(result.contributionMarginRatio)})
Break-Even Units: ${formatNumber(result.breakEvenUnits)} units
Break-Even Revenue: ${formatMoney(result.breakEvenRevenue)}
Target Profit Goal: ${formatMoney(result.targetProfit)}
Target Profit Volume: ${formatNumber(result.targetProfitUnits)} units (${formatMoney(result.targetProfitRevenue)})
Calculated on Fincelio.com`;
  };

  const getCsvData = () => ({
    filename: 'fincelio-break-even-analysis',
    rows: [
      ['Fixed Costs', result.fixedCosts],
      ['Variable Cost per Unit', result.variableCosts],
      ['Selling Price per Unit', result.sellingPrice],
      ['Contribution Margin', result.contributionMargin],
      ['Contribution Margin Ratio (%)', result.contributionMarginRatio.toFixed(2)],
      ['Break-Even Units', result.breakEvenUnits],
      ['Break-Even Revenue', result.breakEvenRevenue],
      ['Target Profit Goal', result.targetProfit],
      ['Target Profit Units', result.targetProfitUnits],
      ['Target Profit Revenue', result.targetProfitRevenue],
    ] as [string, string | number][],
  });

  return (
    <CalculatorLayout
      title="Break-Even Calculator"
      slug="break-even-calculator"
      category="business"
      categoryLabel="Business Tools"
      description="Calculate the exact number of units and sales revenue required to cover fixed operating costs, evaluate contribution margins, and model target profit goals."
      presets={presets}
      faqs={FAQS}
      relatedSlugs={['profit-margin-calculator', 'product-cost-calculator', 'ecommerce-profit-calculator']}
      resultsNode={
        <div className="space-y-6">
          {/* Hero Metric */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-5 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#17231C]/60">
              Break-Even Volume Required
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#21965A] font-mono tabular-nums">
                {formatNumber(result.breakEvenUnits)} <span className="text-xl font-normal text-[#17231C]">units</span>
              </span>
              <span className="text-base font-bold text-[#17231C] font-mono tabular-nums">
                {formatMoney(result.breakEvenRevenue)}
              </span>
            </div>
            <div className="mt-2 text-xs text-[#17231C]/70">
              Sales needed to completely absorb your {formatMoney(result.fixedCosts)} fixed costs at {formatMoney(result.contributionMargin)} contribution margin per unit.
            </div>
          </div>

          {/* Target Profit Target Callout */}
          {result.targetProfit > 0 && (
            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4 flex items-start gap-3">
              <div className="p-2 bg-[#E5F5EB] text-[#21965A] rounded-lg shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-1">
                <div className="font-semibold text-[#17231C]">
                  To hit {formatMoney(result.targetProfit)} Target Profit:
                </div>
                <div className="text-sm font-bold text-[#21965A] font-mono tabular-nums">
                  {formatNumber(result.targetProfitUnits)} units · {formatMoney(result.targetProfitRevenue)} revenue
                </div>
                <div className="text-[#17231C]/65">
                  Requires +{formatNumber(result.targetProfitUnits - result.breakEvenUnits)} units beyond break-even.
                </div>
              </div>
            </div>
          )}

          {/* Metric Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Contribution Margin
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.contributionMargin)}
              </div>
              <div className="text-xs text-[#21965A] font-mono mt-0.5 font-medium tabular-nums">
                {formatPercent(result.contributionMarginRatio)} of price
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Fixed Overhead
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.fixedCosts)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                Must be covered first
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Variable Cost / Unit
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.variableCosts)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                Direct incremental cost
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Selling Price / Unit
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.sellingPrice)}
              </div>
              <div className="text-xs text-[#17231C]/60 mt-0.5">
                Unit invoice value
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
            Profit & Loss Volume Scenarios
          </h3>
          <p className="text-xs sm:text-sm text-[#17231C]/70 mb-5">
            Examine how your operating profit scales from operating at a deficit to operating at 200% of break-even volume.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E3EBE5] text-[#17231C]/70 font-semibold bg-[#F4F8F5]">
                  <th className="py-2.5 px-3">Production Level</th>
                  <th className="py-2.5 px-3 text-right">Units Sold</th>
                  <th className="py-2.5 px-3 text-right">Revenue</th>
                  <th className="py-2.5 px-3 text-right">Total Costs</th>
                  <th className="py-2.5 px-3 text-right">Net Profit / (Loss)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EBE5]">
                {result.scenarios.map((sc) => {
                  const isProfit = sc.profitOrLoss > 0;
                  const isLoss = sc.profitOrLoss < 0;

                  return (
                    <tr
                      key={sc.percentOfBreakEven}
                      className={sc.isBreakEven ? 'bg-[#E5F5EB]/60 font-semibold text-[#17231C]' : 'hover:bg-[#F4F8F5] transition-colors'}
                    >
                      <td className="py-2.5 px-3 flex items-center gap-1.5">
                        <span>{sc.percentOfBreakEven}% of BEP</span>
                        {sc.isBreakEven && (
                          <span className="text-[10px] text-[#21965A] font-bold uppercase tracking-wider bg-white px-1.5 py-0.2 rounded border border-[#21965A]/30">
                            Zero Profit/Loss
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                        {formatNumber(sc.units)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                        {formatMoney(sc.revenue)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#17231C]/70">
                        {formatMoney(sc.totalCosts)}
                      </td>
                      <td
                        className={`py-2.5 px-3 text-right font-mono tabular-nums font-semibold ${
                          isProfit ? 'text-[#21965A]' : isLoss ? 'text-red-600' : 'text-[#17231C]'
                        }`}
                      >
                        {sc.profitOrLoss < 0 ? `(${formatMoney(Math.abs(sc.profitOrLoss))})` : formatMoney(sc.profitOrLoss)}
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
            Break-Even Accounting Formulas
          </h3>
          <div className="p-4 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl font-mono text-xs space-y-2">
            <div className="text-[#17231C]/80">Contribution Margin per Unit = Selling Price − Variable Cost</div>
            <div className="text-[#17231C]/80">Contribution Margin Ratio = (Contribution Margin ÷ Selling Price) × 100</div>
            <div className="text-[#21965A] font-bold">Break-Even Units = Fixed Costs ÷ Contribution Margin per Unit</div>
            <div className="text-[#21965A] font-bold">Break-Even Revenue = Break-Even Units × Selling Price</div>
            <div className="text-[#17231C]/80">Target Profit Units = (Fixed Costs + Target Profit) ÷ Contribution Margin</div>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <NumberInput
          label="Total Fixed Costs"
          value={fixedCosts}
          onChange={setFixedCosts}
          prefix={currency.symbol}
          helpText="Monthly rent, base salaries, software, insurance"
          min={0}
        />

        <NumberInput
          label="Variable Cost per Unit"
          value={variableCosts}
          onChange={setVariableCosts}
          prefix={currency.symbol}
          helpText="Raw materials, packaging, transaction charges"
          min={0}
        />

        <NumberInput
          label="Selling Price per Unit"
          value={sellingPrice}
          onChange={setSellingPrice}
          prefix={currency.symbol}
          helpText="Average invoice price to client or consumer"
          min={0}
        />

        <NumberInput
          label="Target Profit Goal (Optional)"
          value={targetProfit}
          onChange={setTargetProfit}
          prefix={currency.symbol}
          helpText="Desired monthly or project net operating profit"
          min={0}
        />
      </div>
    </CalculatorLayout>
  );
};
