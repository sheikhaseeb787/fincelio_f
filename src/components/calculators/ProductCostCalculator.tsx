import React, { useState, useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { calculateProductCost } from '../../lib/calculations/productCost';
import { CalculatorLayout } from '../shared/CalculatorLayout';
import { NumberInput } from '../shared/NumberInput';
import { ShareExportBar } from '../shared/ShareExportBar';
import { FAQItem } from '../../types';
import { Factory, Layers, Sparkles, TrendingDown } from 'lucide-react';

const FAQS: FAQItem[] = [
  {
    question: 'How should manufacturing overhead be allocated to a batch of products?',
    answer: 'Manufacturing overhead includes indirect expenses that support production but cannot be traced to a single unit (e.g. factory floor rent, equipment depreciation, supervisor wages, utilities). The standard cost accounting method is to divide monthly overhead by expected monthly unit production capacity, or allocate based on machine hours.',
  },
  {
    question: 'How do batch quantities lower unit cost (economies of scale)?',
    answer: 'Direct costs (materials, variable labor) scale linearly with batch size. However, fixed manufacturing overhead, machine calibration, and inbound shipping pallets remain relatively stable. As batch quantity doubles or triples, these fixed costs are distributed across more units, dramatically reducing Cost Per Unit.',
  },
  {
    question: 'What is the Bill of Materials (BOM)?',
    answer: 'The Bill of Materials is a comprehensive inventory of the raw components, assemblies, sub-assemblies, and quantities required to manufacture an end product. In this calculator, "Raw Materials" represents the sum of your BOM for the batch.',
  },
];

export const ProductCostCalculator: React.FC = () => {
  const { currency, formatMoney, formatPercent, formatNumber } = useCurrency();

  const [materials, setMaterials] = useState<number>(4500);
  const [labor, setLaborCost] = useState<number>(2200);
  const [packaging, setPackagingCost] = useState<number>(650);
  const [freight, setFreightCost] = useState<number>(850);
  const [handling, setHandlingCost] = useState<number>(350);
  const [overhead, setOverheadCost] = useState<number>(1450);
  const [batchQuantity, setBatchQuantity] = useState<number>(500);

  const presets = [
    {
      label: 'Skincare / Cosmetics Batch',
      description: '500 jars, $4.5k ingredients, $2.2k lab compounding',
      onSelect: () => {
        setMaterials(4500);
        setLaborCost(2200);
        setPackagingCost(650);
        setFreightCost(850);
        setHandlingCost(350);
        setOverheadCost(1450);
        setBatchQuantity(500);
      },
    },
    {
      label: 'Machined Metal Hardware',
      description: '1,000 components, high material and machine run time',
      onSelect: () => {
        setMaterials(9200);
        setLaborCost(4100);
        setPackagingCost(800);
        setFreightCost(1200);
        setHandlingCost(500);
        setOverheadCost(3200);
        setBatchQuantity(1000);
      },
    },
    {
      label: 'Handcrafted Apparel Run',
      description: '150 designer jackets, heavy direct labor cut & sew',
      onSelect: () => {
        setMaterials(3800);
        setLaborCost(4500);
        setPackagingCost(450);
        setFreightCost(350);
        setHandlingCost(250);
        setOverheadCost(1100);
        setBatchQuantity(150);
      },
    },
  ];

  const result = useMemo(() => {
    return calculateProductCost({
      materials,
      labor,
      packaging,
      freight,
      handling,
      overhead,
      batchQuantity,
    });
  }, [
    materials,
    labor,
    packaging,
    freight,
    handling,
    overhead,
    batchQuantity,
  ]);

  const handleReset = () => {
    setMaterials(4500);
    setLaborCost(2200);
    setPackagingCost(650);
    setFreightCost(850);
    setHandlingCost(350);
    setOverheadCost(1450);
    setBatchQuantity(500);
  };

  const getSummaryText = () => {
    return `Fincelio Product Cost Analysis:
Batch Quantity: ${formatNumber(result.batchQuantity)} units
Total Production Cost: ${formatMoney(result.totalProductionCost)}
COST PER UNIT: ${formatMoney(result.costPerUnit)}
Materials: ${formatMoney(materials)} (${formatMoney(materials / batchQuantity)}/unit)
Direct Labor: ${formatMoney(labor)} (${formatMoney(labor / batchQuantity)}/unit)
Packaging: ${formatMoney(packaging)} (${formatMoney(packaging / batchQuantity)}/unit)
Freight: ${formatMoney(freight)} (${formatMoney(freight / batchQuantity)}/unit)
Handling: ${formatMoney(handling)} (${formatMoney(handling / batchQuantity)}/unit)
Overhead: ${formatMoney(overhead)} (${formatMoney(overhead / batchQuantity)}/unit)
Calculated on Fincelio.com`;
  };

  const getCsvData = () => ({
    filename: 'fincelio-product-cost-analysis',
    rows: [
      ['Batch Quantity', result.batchQuantity],
      ['Total Production Cost', result.totalProductionCost],
      ['Cost Per Unit', result.costPerUnit],
      ...result.components.map((c) => [c.name, c.totalAmount]),
    ] as [string, string | number][],
  });

  return (
    <CalculatorLayout
      title="Product Cost Calculator"
      slug="product-cost-calculator"
      category="business"
      categoryLabel="Business Tools"
      description="Calculate comprehensive unit production costs by aggregating bill of materials, labor, packaging, freight, handling, and manufacturing overhead."
      presets={presets}
      faqs={FAQS}
      relatedSlugs={['wholesale-price-calculator', 'landed-cost-calculator', 'break-even-calculator']}
      resultsNode={
        <div className="space-y-6">
          {/* Hero Metric */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-5 shadow-xs">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#17231C]/60">
              Total Cost Per Unit
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#21965A] font-mono tabular-nums">
                {formatMoney(result.costPerUnit)}
              </span>
              <span className="text-sm font-semibold text-[#17231C] font-mono tabular-nums">
                {formatMoney(result.totalProductionCost)} total batch
              </span>
            </div>
            <div className="mt-2 text-xs text-[#17231C]/70">
              Complete unit absorption cost across {formatNumber(result.batchQuantity)} units produced.
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Raw Materials / Unit
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(materials / batchQuantity)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                {formatMoney(materials)} batch total
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Direct Labor / Unit
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(labor / batchQuantity)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                {formatMoney(labor)} batch total
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Overhead / Unit
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney(overhead / batchQuantity)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                {formatMoney(overhead)} batch total
              </div>
            </div>

            <div className="bg-white border border-[#E3EBE5] rounded-xl p-4">
              <div className="text-[11px] font-semibold text-[#17231C]/60 uppercase tracking-wider">
                Packaging & Freight
              </div>
              <div className="text-xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                {formatMoney((packaging + freight + handling) / batchQuantity)}
              </div>
              <div className="text-xs text-[#17231C]/60 font-mono mt-0.5 tabular-nums">
                Logistics & boxing
              </div>
            </div>
          </div>

          {/* Visual Percentage Distribution Bar */}
          <div className="bg-white border border-[#E3EBE5] rounded-xl p-4 space-y-2.5">
            <div className="text-xs font-semibold text-[#17231C] flex justify-between">
              <span>Production Cost Breakdown</span>
              <span className="font-mono text-[11px] text-[#17231C]/60">100% of Batch</span>
            </div>
            <div className="h-3 w-full bg-[#E3EBE5] rounded-full overflow-hidden flex">
              {result.components.map((c) => (
                <div
                  key={c.name}
                  style={{ width: `${c.percentOfTotal}%`, backgroundColor: c.color }}
                  className="transition-all duration-300"
                  title={`${c.name}: ${formatPercent(c.percentOfTotal)}`}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-[#17231C]/75 pt-1">
              {result.components.map((c) => (
                <div key={c.name} className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="truncate">{c.name} ({c.percentOfTotal.toFixed(1)}%)</span>
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
            Batch Scale Sensitivity & Economies of Scale
          </h3>
          <p className="text-xs sm:text-sm text-[#17231C]/70 mb-5">
            See how cost per unit drops as you scale batch production runs and distribute fixed manufacturing overhead.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E3EBE5] text-[#17231C]/70 font-semibold bg-[#F4F8F5]">
                  <th className="py-2.5 px-3">Production Scale</th>
                  <th className="py-2.5 px-3 text-right">Batch Units</th>
                  <th className="py-2.5 px-3 text-right">Total Production Cost</th>
                  <th className="py-2.5 px-3 text-right">Cost Per Unit</th>
                  <th className="py-2.5 px-3 text-right">Unit Savings %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EBE5]">
                {result.sensitivities.map((s, idx) => (
                  <tr
                    key={s.multiplier}
                    className={idx === 0 ? 'bg-[#E5F5EB]/60 font-semibold text-[#17231C]' : 'hover:bg-[#F4F8F5] transition-colors'}
                  >
                    <td className="py-2.5 px-3 font-medium text-[#17231C]">
                      {s.multiplier === 1 ? 'Current Batch (1x Base)' : `${s.multiplier}x Scale Run`}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                      {formatNumber(s.batchSize)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#17231C]/80">
                      {formatMoney(s.totalCost)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-[#17231C]">
                      {formatMoney(s.costPerUnit)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-[#21965A]">
                      {s.unitSavingsPercent > 0 ? `−${formatPercent(s.unitSavingsPercent, 1)}` : '0.0%'}
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
            Production Cost Accounting Equation
          </h3>
          <div className="p-4 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl font-mono text-xs space-y-2">
            <div className="text-[#17231C]/80">
              Total Production Cost = Materials + Direct Labor + Packaging + Freight + Handling + Allocated Overhead
            </div>
            <div className="text-[#21965A] font-bold">
              Cost Per Unit = Total Production Cost ÷ Batch Quantity
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <NumberInput
          label="Batch Quantity (Units Produced)"
          value={batchQuantity}
          onChange={setBatchQuantity}
          suffix="units"
          helpText="Total items produced in this manufacturing run"
          min={1}
          step={1}
        />

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Raw Materials (BOM)"
            value={materials}
            onChange={setMaterials}
            prefix={currency.symbol}
            helpText="Bill of materials for batch"
            min={0}
          />
          <NumberInput
            label="Direct Labor"
            value={labor}
            onChange={setLaborCost}
            prefix={currency.symbol}
            helpText="Assembly, machining, wages"
            min={0}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Packaging & Labels"
            value={packaging}
            onChange={setPackagingCost}
            prefix={currency.symbol}
            helpText="Bottles, boxes, inserts"
            min={0}
          />
          <NumberInput
            label="Inbound Freight"
            value={freight}
            onChange={setFreightCost}
            prefix={currency.symbol}
            helpText="Raw material transit costs"
            min={0}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="Handling & Quality QA"
            value={handling}
            onChange={setHandlingCost}
            prefix={currency.symbol}
            helpText="Inspection & unloading"
            min={0}
          />
          <NumberInput
            label="Allocated Overhead"
            value={overhead}
            onChange={setOverheadCost}
            prefix={currency.symbol}
            helpText="Rent, power, equipment depreciation"
            min={0}
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};
