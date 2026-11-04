import React, { useState, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { calculateLandedCost } from '../../lib/calculations/landedCost';
import { CalculatorLayout } from '../shared/CalculatorLayout';
import { NumberInput } from '../shared/NumberInput';
import { ShareExportBar } from '../shared/ShareExportBar';
import { FAQItem } from '../../types';
import { Ship, Anchor, ShieldCheck, Box } from 'lucide-react';

const FAQS: FAQItem[] = [
  {
    question: 'What is the Landed Cost Multiplier?',
    answer: 'The Landed Cost Multiplier is your True Landed Cost Per Unit divided by the initial FOB Purchase Price (e.g. $27.00 ÷ $20.00 = 1.35x). It reveals that freight, tariffs, and customs add an extra 35% on top of your factory quote. Knowing this multiplier enables your purchasing team to quickly estimate landed costs for future quotes without recalculating every line item.',
  },
  {
    question: 'How are customs duties and tariffs calculated?',
    answer: 'Customs duties are typically assessed by national customs authorities as an ad valorem percentage against the commercial invoice value (the total purchase cost of the goods). In some jurisdictions, duties are calculated on CIF value (Cost, Insurance, and Freight). This calculator uses standard ad valorem commercial valuation.',
  },
  {
    question: 'Why should I never price products based on the FOB supplier invoice?',
    answer: 'Because international freight, customs clearance, terminal handling charges (THC), and marine insurance frequently add between 20% and 50%+ to the factory price. If you price using FOB, your real profit margins will be severely diminished upon arrival at your warehouse.',
  },
];

export const LandedCostCalculator: React.FC = () => {
  const { currency, formatMoney, formatPercent, formatNumber } = useCurrency();

  const [purchaseCostPerUnit, setPurchaseCostPerUnit] = useState<number>(18.5);
  const [productQuantity, setProductQuantity] = useState<number>(1000);
  const [freightCost, setFreightCost] = useState<number>(3200);
  const [insuranceCost, setInsuranceCost] = useState<number>(250);
  const [dutyRatePercent, setDutyRatePercent] = useState<number>(7.5);
  const [brokerageAndHandling, setBrokerageAndHandling] = useState<number>(450);

  const presets = [
    {
      label: 'Ocean 20ft Container Import',
      description: 'FOB $15, 2,500 units, $4,800 freight, 6.5% duty',
      onSelect: () => {
        setPurchaseCostPerUnit(15);
        setProductQuantity(2500);
        setFreightCost(4800);
        setInsuranceCost(350);
        setDutyRatePercent(6.5);
        setBrokerageAndHandling(650);
      },
    },
    {
      label: 'Air Freight Rush Shipment',
      description: 'FOB $32, 200 units, $1,800 air cargo, 4.0% duty',
      onSelect: () => {
        setPurchaseCostPerUnit(32);
        setProductQuantity(200);
        setFreightCost(1800);
        setInsuranceCost(120);
        setDutyRatePercent(4.0);
        setBrokerageAndHandling(300);
      },
    },
    {
      label: 'Domestic Truckload Freight',
      description: 'FOB $45, 500 units, $1,200 LTL shipping, 0% duty',
      onSelect: () => {
        setPurchaseCostPerUnit(45);
        setProductQuantity(500);
        setFreightCost(1200);
        setInsuranceCost(150);
        setDutyRatePercent(0);
        setBrokerageAndHandling(100);
      },
    },
  ];

  const result = useMemo(() => {
    return calculateLandedCost({
      purchaseCostPerUnit,
      productQuantity,
      freightCost,
      insuranceCost,
      dutyRatePercent,
      brokerageAndHandling,
    });
  }, [
    purchaseCostPerUnit,
    productQuantity,
    freightCost,
    insuranceCost,
    dutyRatePercent,
    brokerageAndHandling,
  ]);

  const handleReset = () => {
    setPurchaseCostPerUnit(18.5);
    setProductQuantity(1000);
    setFreightCost(3200);
    setInsuranceCost(250);
    setDutyRatePercent(7.5);
    setBrokerageAndHandling(450);
  };

  const getSummaryText = () => {
    return `Fincelio Landed Cost Analysis:
Order Quantity: ${formatNumber(result.productQuantity)} units
Initial FOB Unit Cost: ${formatMoney(result.purchaseCostPerUnit)}
Total FOB Value: ${formatMoney(result.totalPurchaseCost)}
Total Freight: ${formatMoney(result.freightCost)} (${formatMoney(result.freightPerUnit)}/unit)
Customs Duties: ${formatMoney(result.dutyAmount)} (${formatMoney(result.dutyPerUnit)}/unit)
Marine Insurance: ${formatMoney(result.insuranceCost)}
Brokerage & Handling: ${formatMoney(result.brokerageAndHandling)}
TOTAL LANDED COST: ${formatMoney(result.totalLandedCost)}
LANDED COST PER UNIT: ${formatMoney(result.landedCostPerUnit)}
Cost Multiplier: ${result.landedCostMultiplier.toFixed(2)}x
Calculated on Fincelio.com`;
  };

  const getCsvData = () => ({
    filename: 'fincelio-landed-cost-analysis',
    rows: [
      ['Product Quantity', result.productQuantity],
      ['FOB Unit Cost', result.purchaseCostPerUnit],
      ['Total FOB Cost', result.totalPurchaseCost],
      ['Freight Cost', result.freightCost],
      ['Insurance Cost', result.insuranceCost],
      ['Duties Amount', result.dutyAmount],
      ['Brokerage and Handling', result.brokerageAndHandling],
      ['Total Landed Cost', result.totalLandedCost],
      ['Landed Cost Per Unit', result.landedCostPerUnit],
      ['Landed Cost Multiplier', result.landedCostMultiplier.toFixed(2)],
    ] as [string, string | number][],
  });

  return (
    <CalculatorLayout
      title="Landed Cost Calculator"
      slug="landed-cost-calculator"
      category="ecommerce"
      categoryLabel="E-commerce Tools"
      description="Determine true landed cost per unit by aggregating factory purchase price, sea or air freight, cargo insurance, customs duties, and port brokerage."
      presets={presets}
      faqs={FAQS}
      relatedSlugs={['selling-price-calculator', 'profit-margin-calculator', 'ecommerce-profit-calculator']}
      resultsNode={
        <div className="space-y-6">
          {/* Hero Metric */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-5 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#17231C]/60">
              True Landed Cost Per Unit
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#21965A] font-mono tabular-nums">
                {formatMoney(result.landedCostPerUnit)}
              </span>
              <span className="text-xs font-bold text-[#17231C] font-mono bg-[#E5F5EB] px-2.5 py-1 rounded-lg border border-[#21965A]/20">
                {result.landedCostMultiplier.toFixed(2)}x FOB Multiplier
              </span>
            </div>
            <div className="mt-2 text-xs text-[#17231C]/70">
              Total shipment landed investment: <strong className="font-mono text-[#17231C]">{formatMoney(result.totalLandedCost)}</strong> across {formatNumber(result.productQuantity)} units.
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                FOB Purchase Value
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.totalPurchaseCost)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                {formatMoney(result.purchaseCostPerUnit)} / unit
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Shipping & Freight
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.freightCost)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                +{formatMoney(result.freightPerUnit)} / unit
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Customs Duties & Tariffs
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.dutyAmount)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                +{formatMoney(result.dutyPerUnit)} / unit ({dutyRatePercent}%)
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Insurance & Brokerage
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(result.insuranceCost + result.brokerageAndHandling)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                +{formatMoney(result.insurancePerUnit + result.brokeragePerUnit)} / unit
              </div>
            </div>
          </div>

          {/* Visual Percentage Distribution Bar */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-4 space-y-2.5">
            <div className="text-xs font-semibold text-[#17231C] flex justify-between">
              <span>Landed Cost Distribution</span>
              <span className="font-mono text-[11px] text-[#17231C]/60">100% of Landed Total</span>
            </div>
            <div className="h-3 w-full bg-[#E3EBE5] rounded-full overflow-hidden flex">
              {result.distribution.map((d) => (
                <div
                  key={d.category}
                  style={{ width: `${d.percent}%`, backgroundColor: d.color }}
                  className="transition-all duration-300"
                  title={`${d.category}: ${formatPercent(d.percent)}`}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-[#17231C]/75 pt-1">
              {result.distribution.map((d) => (
                <div key={d.category} className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="truncate">{d.category} ({d.percent.toFixed(1)}%)</span>
                </div>
              ))}
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
            Per-Unit Landed Cost Breakdown Table
          </h3>
          <p className="text-xs sm:text-sm text-[#17231C]/70 mb-5">
            Clear itemized allocation for a shipment of {formatNumber(result.productQuantity)} units.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E3EBE5] text-[#17231C]/70 font-semibold bg-[#F4F8F5]">
                  <th className="py-2.5 px-3">Expense Item</th>
                  <th className="py-2.5 px-3 text-right">Shipment Total</th>
                  <th className="py-2.5 px-3 text-right">Per Unit Cost</th>
                  <th className="py-2.5 px-3 text-right">% of Landed Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EBE5]">
                {result.distribution.map((item) => (
                  <tr key={item.category} className="hover:bg-[#F4F8F5] transition-colors">
                    <td className="py-2.5 px-3 font-medium text-[#17231C] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                      <span>{item.category}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                      {formatMoney(item.amount)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-[#17231C]">
                      {formatMoney(item.perUnit)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#17231C]/70">
                      {formatPercent(item.percent)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#E5F5EB]/60 font-bold text-[#17231C]">
                  <td className="py-3 px-3">TOTAL LANDED COST</td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums">
                    {formatMoney(result.totalLandedCost)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-[#21965A]">
                    {formatMoney(result.landedCostPerUnit)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums">
                    100.00%
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
            Landed Cost Mathematical Equation
          </h3>
          <div className="p-4 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl font-mono text-xs space-y-2">
            <div className="text-[#17231C]/80">Total FOB Cost = Purchase Cost per Unit × Quantity</div>
            <div className="text-[#17231C]/80">Customs Duties = Total FOB Cost × (Duty Rate % ÷ 100)</div>
            <div className="text-[#21965A] font-bold">
              Total Landed Cost = FOB Cost + Freight + Cargo Insurance + Duties + Brokerage Fees
            </div>
            <div className="text-[#21965A] font-bold">
              Landed Cost Per Unit = Total Landed Cost ÷ Product Quantity
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <NumberInput
          label="Purchase Cost per Unit (FOB Price)"
          value={purchaseCostPerUnit}
          onChange={setPurchaseCostPerUnit}
          prefix={currency.symbol}
          helpText="Factory invoice unit quote"
          min={0}
        />

        <NumberInput
          label="Product Quantity / Batch Size"
          value={productQuantity}
          onChange={setProductQuantity}
          suffix="units"
          helpText="Total items in this shipment"
          min={1}
          step={1}
        />

        <NumberInput
          label="Total Freight & Shipping Cost"
          value={freightCost}
          onChange={setFreightCost}
          prefix={currency.symbol}
          helpText="Ocean container, air cargo, or drayage"
          min={0}
        />

        <NumberInput
          label="Cargo / Marine Insurance"
          value={insuranceCost}
          onChange={setInsuranceCost}
          prefix={currency.symbol}
          helpText="Transit protection policy fee"
          min={0}
        />

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Customs Duty Rate (%)"
            value={dutyRatePercent}
            onChange={setDutyRatePercent}
            suffix="%"
            helpText="Ad valorem tariff rate"
            min={0}
            step="0.5"
          />
          <NumberInput
            label="Brokerage & Port Fees"
            value={brokerageAndHandling}
            onChange={setBrokerageAndHandling}
            prefix={currency.symbol}
            helpText="Customs broker, dock charges, THC"
            min={0}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};
