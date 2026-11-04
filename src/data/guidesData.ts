import { GuideArticle } from '../types';

export const GUIDES: GuideArticle[] = [
  {
    slug: 'margin-vs-markup',
    title: 'Margin vs. Markup: The Definitive Formula Guide',
    subtitle: 'Why confusing margin and markup quietly destroys business profitability and how to master both.',
    category: 'Financial Fundamentals',
    readTime: '6 min read',
    publishDate: 'Updated November 2026',
    author: 'Fincelio Quantitative Editorial Team',
    summary: 'A 50% markup is NOT a 50% profit margin. Discover the mathematical relationship, conversion equations, and real-world pricing examples to avoid dangerous under-pricing.',
    relatedCalculatorSlug: 'markup-calculator',
    sections: [
      {
        heading: 'The Most Costly Mistake in Retail Pricing',
        content: [
          'Many founders and business owners mistakenly assume that applying a 30% markup to their product cost yields a 30% profit margin. This fundamental error costs ecommerce and retail businesses tens of thousands of dollars in lost operating income every year.',
          'Profit margin describes profit as a percentage of the selling price (the money coming in), whereas markup describes profit as a percentage of product cost (the money going out). Because selling price is always higher than cost in a profitable business, your margin percentage will ALWAYS be lower than your markup percentage.',
        ],
      },
      {
        heading: 'The Core Mathematical Formulas',
        content: [
          'To understand the mechanics, examine the formulas side by side:',
          '1. Gross Profit = Selling Price − Cost',
          '2. Profit Margin (%) = (Gross Profit ÷ Selling Price) × 100',
          '3. Markup (%) = (Gross Profit ÷ Cost) × 100',
          'If an inventory item costs $60 and you sell it for $100, your gross profit is $40.',
          'Your Markup is ($40 ÷ $60) × 100 = 66.67%.',
          'Your Margin is ($40 ÷ $100) × 100 = 40.00%.',
        ],
        callout: 'Rule of Thumb: Margin can never reach 100% (unless cost is $0), but markup can exceed 100%, 200%, or 1,000% indefinitely.',
      },
      {
        heading: 'Direct Conversion Equations',
        content: [
          'When adjusting prices or analyzing competitor margins, use these exact algebraic conversions:',
          '• Markup to Margin: Margin = [Markup ÷ (100 + Markup)] × 100',
          '• Margin to Markup: Markup = [Margin ÷ (100 − Margin)] × 100',
          'For instance, if your company requires a 25% profit margin to cover overhead and marketing, the required markup is: 25 ÷ (100 − 25) = 25 ÷ 75 = 33.33% markup.',
        ],
      },
      {
        heading: 'Practical Application for Business Leaders',
        content: [
          'When budgeting marketing campaigns, transaction fees, and operating expenses, your targets are typically expressed as a percentage of gross revenue. Therefore, your financial model is built on MARGIN.',
          'When pricing individual purchase orders or negotiating with suppliers, quotes are based on COST. Therefore, your supplier conversations use MARKUP.',
          'Always use the Fincelio Markup and Profit Margin calculators to ensure your quotes translate accurately into bottom-line net profit.',
        ],
      },
    ],
  },
  {
    slug: 'real-landed-cost',
    title: 'How to Calculate Real Landed Cost for Imported Goods',
    subtitle: 'From FOB supplier quotes to your domestic warehouse: accounting for freight, tariffs, port fees, and hidden cargo costs.',
    category: 'Supply Chain & Sourcing',
    readTime: '8 min read',
    publishDate: 'Updated November 2026',
    author: 'Fincelio Quantitative Editorial Team',
    summary: 'Supplier quotes (FOB/EXW) only represent a fraction of inventory expense. Learn how to track and allocate shipping, customs tariffs, demurrage, and marine insurance to determine true unit landed cost.',
    relatedCalculatorSlug: 'landed-cost-calculator',
    sections: [
      {
        heading: 'Why FOB Price is a Vanity Metric',
        content: [
          'When sourcing inventory from overseas manufacturers—whether in Shenzhen, Vietnam, or Mexico—the initial quotation provided is usually EXW (Ex Works) or FOB (Free On Board). This price only reflects what you pay at the factory gate or loading port.',
          'If you set your retail selling price based solely on this FOB number, unexpected freight surcharges, import tariffs, and harbor fees will quickly turn a seemingly profitable 60% margin product into an operating loss.',
        ],
      },
      {
        heading: 'The 5 Components of Landed Cost',
        content: [
          'A complete Landed Cost equation must encompass five distinct cost buckets:',
          '1. Purchase Cost (FOB): The unit cost paid directly to the supplier.',
          '2. Freight & Transit: Ocean container charges, air cargo bills, bunker adjustment factors (BAF), and drayage to your warehouse.',
          '3. Customs Duties & Tariffs: National harmonized tariff schedule (HTS) duties, anti-dumping duties, and merchandise processing fees (MPF).',
          '4. Marine & Cargo Insurance: Protecting shipment against container loss, water damage, or maritime general average claims.',
          '5. Brokerage & Port Handling: Customs broker filing fees, port terminal handling charges (THC), palletization, and storage.',
        ],
        callout: 'Landed Cost Formula: Landed Cost Per Unit = (FOB Cost + Freight + Insurance + Tariffs + Handling) ÷ Total Units Received.',
      },
      {
        heading: 'How to Allocate Freight Across Mixed Shipments',
        content: [
          'When importing multiple SKUs in a single container, how should freight and handling be distributed?',
          '• By Weight: Ideal for dense, heavy raw materials (steel, liquids, glass).',
          '• By Volume (CBM): Ideal for light, bulky consumer goods (apparel, cushions, electronics).',
          '• By Value: Standard practice for customs tariffs, where duties are assessed as an ad valorem percentage of commercial invoice value.',
        ],
      },
      {
        heading: 'Managing Landed Cost Inflation',
        content: [
          'Regularly auditing your Landed Cost Multiplier (Landed Cost ÷ FOB Cost) gives your purchasing team immediate visibility into freight inflation.',
          'If your historical multiplier was 1.25x and jumps to 1.48x due to canal disruptions or tariff adjustments, your pricing must be adjusted before inventory arrives on shelves.',
        ],
      },
    ],
  },
  {
    slug: 'ecommerce-unit-economics',
    title: 'E-commerce Unit Economics: Mastering Break-Even ROAS',
    subtitle: 'The essential formula every direct-to-consumer founder needs to ensure Meta and Google ad spend generates true profit.',
    category: 'E-commerce & Growth',
    readTime: '7 min read',
    publishDate: 'Updated November 2026',
    author: 'Fincelio Quantitative Editorial Team',
    summary: 'A 3.0x ROAS might sound impressive, but depending on your product costs and returns, it might still lose money. Master contribution margin and break-even ROAS modeling.',
    relatedCalculatorSlug: 'ecommerce-profit-calculator',
    sections: [
      {
        heading: 'The Illusion of Top-Line Ad Spend ROAS',
        content: [
          'In modern digital commerce, advertising dashboards proudly report ROAS (Return On Ad Spend). Marketing agencies celebrate a "3.5x blended ROAS" on paid media campaigns.',
          'Yet at the end of the month, the founder looks at the business bank balance and wonders where the cash went. The reason? Advertising dashboards have no concept of Cost of Goods Sold (COGS), fulfillment fees, payment gateway cuts, or return rates.',
        ],
      },
      {
        heading: 'Deriving the Break-Even ROAS Formula',
        content: [
          'Break-even ROAS is the minimum return on advertising spend required so that your revenue after deducting all variable costs exactly equals zero net profit.',
          'Step 1: Determine your Pre-Ad Contribution Margin Percentage:',
          'Contribution Margin % = (Revenue − COGS − Shipping − Payment Fees − Refunds) ÷ Revenue',
          'Step 2: Calculate Break-Even ROAS:',
          'Break-Even ROAS = 1 ÷ Contribution Margin %',
          'For example, if your direct product costs, packaging, 3PL fulfillment, and Stripe fees leave you with a 40% margin before advertising (0.40):',
          'Break-Even ROAS = 1 ÷ 0.40 = 2.50x (or 250%).',
        ],
        callout: 'Key Insight: If your campaigns achieve 2.50x ROAS, every dollar of margin goes toward paying ad platforms. Only the ROAS generated above 2.50x contributes to your operating net profit.',
      },
      {
        heading: 'Accounting for Return Rates & Payment Gateway Friction',
        content: [
          'Many DTC brands fail to deduct refunds and non-refundable merchant fees in unit economics models. Payment processors typically charge 2.9% + $0.30 per transaction and do NOT refund the processing fee when a customer returns an order.',
          'If your return rate is 8% (common in apparel and footwear), your actual unit revenue is 92% of gross receipts, yet you have already incurred the outbound shipping and payment charge.',
        ],
      },
      {
        heading: 'Scaling with Unit Economic Discipline',
        content: [
          'Before increasing monthly ad spend from $5,000 to $50,000, model your store inside the Fincelio E-commerce Profit Calculator. Know your exact Break-even ROAS for each SKU tier and protect your cash flow.',
        ],
      },
    ],
  },
  {
    slug: 'pricing-strategy',
    title: 'Pricing Strategy: Cost-Plus vs Value-Based Pricing',
    subtitle: 'How to transition from defensive cost-recovery pricing to value-capture models that boost margins.',
    category: 'Strategy & Growth',
    readTime: '6 min read',
    publishDate: 'Updated November 2026',
    author: 'Fincelio Quantitative Editorial Team',
    summary: 'Compare cost-plus, competitive pricing, and value-based pricing methodologies. Learn how to establish a profitable pricing floor while maximizing customer perceived value.',
    relatedCalculatorSlug: 'selling-price-calculator',
    sections: [
      {
        heading: 'The Two Foundations of Pricing',
        content: [
          'Setting product prices is one of the highest-leverage decisions in business. A 1% improvement in price realization typically produces an 8% to 11% increase in operating profit—far greater than a corresponding 1% increase in sales volume.',
          'Yet most companies default to basic Cost-Plus pricing: calculate what it takes to make the item, add an arbitrary 30% or 50% markup, and publish the price tag.',
        ],
      },
      {
        heading: 'Cost-Plus Pricing: Pros, Cons, and Safe Use Cases',
        content: [
          'Cost-Plus pricing calculates total cost per unit (materials, labor, allocated overhead) and adds a fixed margin percentage.',
          'Advantages: Simple to calculate, ensures every sale covers direct production costs, and easy to justify to institutional buyers.',
          'Disadvantages: Completely ignores what customers are willing to pay, penalizes efficiency (reducing costs forces you to reduce prices), and often ignores channel transaction cuts.',
        ],
        callout: 'Best Practice: Use Cost-Plus formulas to establish your absolute non-negotiable PRICING FLOOR. Never price below your break-even floor.',
      },
      {
        heading: 'Value-Based Pricing: Capturing Perceived Utility',
        content: [
          'Value-based pricing decouples retail price from production cost, anchoring instead on the customer’s perceived value, time saved, emotional benefit, or return on investment.',
          'If your software or tool saves an enterprise client $100,000 annually in manual labor, pricing at $10,000 represents a 10x ROI for the buyer, even if server hosting costs you only $20 per month.',
        ],
      },
      {
        heading: 'Building a Multi-Tier Pricing Architecture',
        content: [
          'Leading businesses blend both strategies by creating 3 pricing scenarios: Conservative (high volume/competitive), Target (optimized margin), and Premium (value-capture with premium packaging or white-glove support).',
          'Use the Fincelio Selling Price Calculator to model all three scenarios side-by-side with automatic transaction fee protections.',
        ],
      },
    ],
  },
];
