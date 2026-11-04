export type MarkupMode =
  | 'cost_to_price'
  | 'price_to_markup'
  | 'markup_to_margin'
  | 'margin_to_markup'
  | 'reverse_markup';

export interface MarkupResult {
  cost: number;
  sellingPrice: number;
  markupPercent: number;
  marginPercent: number;
  grossProfit: number;
  multiplier: number;
  bulkTiers: {
    markupPercent: number;
    sellingPrice: number;
    profit: number;
    marginPercent: number;
  }[];
}

export function markupToMargin(markup: number): number {
  if (markup <= -100) return -100;
  return (markup / (100 + markup)) * 100;
}

export function marginToMarkup(margin: number): number {
  if (margin >= 100) return 0;
  return (margin / (100 - margin)) * 100;
}

export function calculateMarkup(
  mode: MarkupMode,
  params: {
    cost?: number;
    sellingPrice?: number;
    markupPercent?: number;
    marginPercent?: number;
  }
): MarkupResult {
  let cost = Math.max(0, Number(params.cost) || 0);
  let sellingPrice = Math.max(0, Number(params.sellingPrice) || 0);
  let markupPercent = Number(params.markupPercent) || 0;
  let marginPercent = Number(params.marginPercent) || 0;

  switch (mode) {
    case 'cost_to_price': {
      sellingPrice = cost * (1 + markupPercent / 100);
      marginPercent = sellingPrice > 0 ? ((sellingPrice - cost) / sellingPrice) * 100 : 0;
      break;
    }
    case 'price_to_markup': {
      markupPercent = cost > 0 ? ((sellingPrice - cost) / cost) * 100 : 0;
      marginPercent = sellingPrice > 0 ? ((sellingPrice - cost) / sellingPrice) * 100 : 0;
      break;
    }
    case 'markup_to_margin': {
      marginPercent = markupToMargin(markupPercent);
      if (cost > 0) {
        sellingPrice = cost * (1 + markupPercent / 100);
      } else if (sellingPrice > 0) {
        cost = sellingPrice * (1 - marginPercent / 100);
      }
      break;
    }
    case 'margin_to_markup': {
      markupPercent = marginToMarkup(marginPercent);
      if (cost > 0) {
        sellingPrice = cost * (1 + markupPercent / 100);
      } else if (sellingPrice > 0) {
        cost = sellingPrice * (1 - marginPercent / 100);
      }
      break;
    }
    case 'reverse_markup': {
      // sellingPrice = cost * (1 + markup/100) => cost = sellingPrice / (1 + markup/100)
      if (1 + markupPercent / 100 !== 0) {
        cost = sellingPrice / (1 + markupPercent / 100);
      }
      marginPercent = sellingPrice > 0 ? ((sellingPrice - cost) / sellingPrice) * 100 : 0;
      break;
    }
  }

  const grossProfit = sellingPrice - cost;
  const multiplier = cost > 0 ? sellingPrice / cost : 0;

  // Generate bulk tiers for standard markup ranges based on base cost
  const baseCost = cost > 0 ? cost : 50;
  const standardMarkups = [15, 25, 35, 50, 65, 80, 100, 150, 200];
  const bulkTiers = standardMarkups.map((m) => {
    const sp = baseCost * (1 + m / 100);
    const p = sp - baseCost;
    const mg = (p / sp) * 100;
    return {
      markupPercent: m,
      sellingPrice: sp,
      profit: p,
      marginPercent: mg,
    };
  });

  return {
    cost,
    sellingPrice,
    markupPercent,
    marginPercent,
    grossProfit,
    multiplier,
    bulkTiers,
  };
}
