export interface ProductCostInputs {
  materials: number;
  labor: number;
  packaging: number;
  freight: number;
  handling: number;
  overhead: number;
  batchQuantity: number;
}

export interface CostComponent {
  name: string;
  totalAmount: number;
  perUnitAmount: number;
  percentOfTotal: number;
  color: string;
}

export interface BatchScaleSensitivity {
  multiplier: number;
  batchSize: number;
  totalCost: number;
  costPerUnit: number;
  unitSavingsPercent: number;
}

export interface ProductCostResult {
  totalProductionCost: number;
  costPerUnit: number;
  batchQuantity: number;
  components: CostComponent[];
  sensitivities: BatchScaleSensitivity[];
}

export function calculateProductCost(inputs: ProductCostInputs): ProductCostResult {
  const materials = Math.max(0, Number(inputs.materials) || 0);
  const labor = Math.max(0, Number(inputs.labor) || 0);
  const packaging = Math.max(0, Number(inputs.packaging) || 0);
  const freight = Math.max(0, Number(inputs.freight) || 0);
  const handling = Math.max(0, Number(inputs.handling) || 0);
  const overhead = Math.max(0, Number(inputs.overhead) || 0);
  const batchQty = Math.max(1, Number(inputs.batchQuantity) || 1);

  const totalProductionCost =
    materials + labor + packaging + freight + handling + overhead;
  const costPerUnit = totalProductionCost / batchQty;

  const rawList = [
    { name: 'Raw Materials', amount: materials, color: '#21965A' },
    { name: 'Direct Labor', amount: labor, color: '#3B82F6' },
    { name: 'Packaging', amount: packaging, color: '#10B981' },
    { name: 'Inbound Freight', amount: freight, color: '#F59E0B' },
    { name: 'Handling & Inspection', amount: handling, color: '#6366F1' },
    { name: 'Allocated Overhead', amount: overhead, color: '#64748B' },
  ];

  const components: CostComponent[] = rawList.map((c) => ({
    name: c.name,
    totalAmount: c.amount,
    perUnitAmount: c.amount / batchQty,
    percentOfTotal: totalProductionCost > 0 ? (c.amount / totalProductionCost) * 100 : 0,
    color: c.color,
  }));

  // Sensitivity analysis: Fixed overhead stays constant, variable direct costs scale with batch size
  const directVariableTotal = materials + labor + packaging + freight + handling;
  const directPerUnit = directVariableTotal / batchQty;

  const scales = [1, 1.5, 2, 3, 5];
  const sensitivities: BatchScaleSensitivity[] = scales.map((mul) => {
    const size = Math.round(batchQty * mul);
    const variableScaled = directPerUnit * size;
    // Assume 15% overhead increase per doubling due to supervisory time
    const overheadScaled = overhead * (1 + (mul - 1) * 0.15);
    const tot = variableScaled + overheadScaled;
    const cpu = tot / size;
    const savings = costPerUnit > 0 ? ((costPerUnit - cpu) / costPerUnit) * 100 : 0;

    return {
      multiplier: mul,
      batchSize: size,
      totalCost: tot,
      costPerUnit: cpu,
      unitSavingsPercent: Math.max(0, savings),
    };
  });

  return {
    totalProductionCost,
    costPerUnit,
    batchQuantity: batchQty,
    components,
    sensitivities,
  };
}
