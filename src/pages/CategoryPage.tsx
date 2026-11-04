import React from 'react';
import { useRouter } from '../context/RouterContext';
import { CALCULATORS } from '../data/calculatorsMeta';
import { GUIDES } from '../data/guidesData';
import { AdSlot } from '../components/layout/AdSlot';
import { Calculator, ArrowRight, BookOpen, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';

interface CategoryPageProps {
  category: 'business' | 'ecommerce' | 'financial';
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { navigate } = useRouter();

  const configs = {
    business: {
      title: 'Business Calculators',
      subtitle: 'Essential financial planning, cost absorption, and pricing tools for growing enterprises.',
      intro: 'Running a resilient enterprise requires continuous visibility into fixed overhead absorption, pricing floors, and manufacturing unit economics. These calculators help entrepreneurs, operations managers, and finance leaders model business viability without spreadsheets.',
      slugs: ['break-even-calculator', 'product-cost-calculator', 'profit-margin-calculator', 'markup-calculator', 'wholesale-price-calculator'],
      kpis: [
        { label: 'Contribution Margin', desc: 'Portion of sales revenue that covers fixed corporate overhead.' },
        { label: 'Break-Even Point (BEP)', desc: 'The exact sales volume where net operating profit equals zero.' },
        { label: 'Cost of Goods Sold (COGS)', desc: 'Direct unit production costs excluding administrative overhead.' },
      ],
    },
    ecommerce: {
      title: 'E-commerce Calculators',
      subtitle: 'High-precision unit economics and margin calculators tailored for DTC brands and online stores.',
      intro: 'Modern digital commerce margins are constantly challenged by rising ad acquisition costs (CAC), ocean freight inflation, returns, and payment gateway cuts. Use these specialized calculators to protect store profitability.',
      slugs: ['ecommerce-profit-calculator', 'selling-price-calculator', 'landed-cost-calculator', 'profit-margin-calculator'],
      kpis: [
        { label: 'Break-Even ROAS', desc: 'The minimum advertising return needed to cover all product and fulfillment costs.' },
        { label: 'True Landed Cost', desc: 'Factory purchase price plus freight, insurance, import tariffs, and harbor handling.' },
        { label: 'Net Profit per Order', desc: 'Retained bottom-line cash remaining after all variable fees and monthly apps.' },
      ],
    },
    financial: {
      title: 'Financial & Pricing Calculators',
      subtitle: 'Complete suite of verified mathematical tools for margin engineering, markup, and profitability.',
      intro: 'Explore all 8 Fincelio financial calculators. Every tool runs directly in your web browser with zero tracking, verified formulas, and instant CSV/PDF export capability.',
      slugs: CALCULATORS.map((c) => c.slug),
      kpis: [
        { label: 'Gross vs Net Margin', desc: 'Distinguish direct product profitability from overall company profitability.' },
        { label: 'Margin vs Markup', desc: 'Master the conversion between cost additions and revenue percentages.' },
        { label: 'Keystone Pricing', desc: 'Traditional two-tier wholesale and retail multiplier architecture.' },
      ],
    },
  };

  const current = configs[category];
  const categoryCalculators = CALCULATORS.filter((c) => current.slugs.includes(c.slug));
  const relatedGuides = GUIDES.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-[#21965A] transition-colors cursor-pointer">
          Fincelio
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#17231C] font-medium">{current.title}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17231C]">
          {current.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#17231C]/75 leading-relaxed">
          {current.subtitle}
        </p>
        <p className="mt-3 text-sm text-[#17231C]/65 leading-relaxed">
          {current.intro}
        </p>
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {current.kpis.map((kpi) => (
          <div key={kpi.label} className="p-5 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#21965A]">
              {kpi.label}
            </div>
            <div className="text-xs text-[#17231C]/75 mt-1.5 leading-relaxed">
              {kpi.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Calculators Grid */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#17231C]">
            Available {current.title} ({categoryCalculators.length})
          </h2>
          <span className="text-xs text-[#17231C]/60">100% Free · No Sign-Up</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCalculators.map((calc) => (
            <div
              key={calc.slug}
              className="bg-white border border-[#E3EBE5] rounded-2xl p-6 hover:border-[#21965A]/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E5F5EB] flex items-center justify-center text-[#21965A] group-hover:bg-[#21965A] group-hover:text-white transition-colors">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-[#17231C]/50 font-medium">
                    {calc.readingTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17231C] group-hover:text-[#21965A] transition-colors">
                  {calc.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#17231C]/70 leading-relaxed">
                  {calc.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E3EBE5] flex items-center justify-between">
                <span className="text-xs text-[#17231C]/60">
                  Instant calculation
                </span>
                <button
                  type="button"
                  onClick={() => navigate(`/${calc.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#21965A] group-hover:underline cursor-pointer"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdSlot placement="inline" />

      {/* Relevant Guides */}
      <div className="mt-14 pt-10 border-t border-[#E3EBE5]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#17231C]">
              Related Financial & Operational Guides
            </h2>
            <p className="text-xs sm:text-sm text-[#17231C]/70 mt-1">
              Deepen your quantitative understanding with our editorial team&apos;s mathematical breakdowns.
            </p>
          </div>
          <button
            onClick={() => navigate('/guides')}
            className="text-xs font-semibold text-[#21965A] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedGuides.map((guide) => (
            <div
              key={guide.slug}
              className="bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl p-5 hover:border-[#21965A]/40 transition-colors cursor-pointer flex flex-col justify-between"
              onClick={() => navigate(`/guides/${guide.slug}`)}
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#17231C]/60 mb-2">
                  <span>{guide.category}</span>
                  <span>·</span>
                  <span>{guide.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-[#17231C] hover:text-[#21965A] transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="mt-2 text-xs text-[#17231C]/70 line-clamp-3">
                  {guide.summary}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E3EBE5]/70 flex items-center justify-between text-xs font-medium text-[#21965A]">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
