import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCurrency } from '../context/CurrencyContext';
import { CALCULATORS, GENERAL_FAQS } from '../data/calculatorsMeta';
import { GUIDES } from '../data/guidesData';
import { AdSlot } from '../components/layout/AdSlot';
import {
  Search,
  Calculator,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  BookOpen,
  ChevronDown,
  Layers,
  Sparkles,
  DollarSign,
  Percent,
} from 'lucide-react';

interface HomePageProps {
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch }) => {
  const { navigate } = useRouter();
  const { currency, formatMoney, formatPercent } = useCurrency();

  // Interactive quick calculator sandbox widget in Hero
  const [quickCost, setQuickCost] = useState<number>(40);
  const [quickPrice, setQuickPrice] = useState<number>(100);
  const quickProfit = Math.max(0, quickPrice - quickCost);
  const quickMargin = quickPrice > 0 ? (quickProfit / quickPrice) * 100 : 0;
  const quickMarkup = quickCost > 0 ? (quickProfit / quickCost) * 100 : 0;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const popularCalculators = CALCULATORS.filter((c) => c.featured);
  const businessCalculators = CALCULATORS.filter(
    (c) => c.slug === 'break-even-calculator' || c.slug === 'product-cost-calculator' || c.slug === 'wholesale-price-calculator' || c.slug === 'markup-calculator'
  );
  const ecommerceCalculators = CALCULATORS.filter(
    (c) => c.slug === 'ecommerce-profit-calculator' || c.slug === 'landed-cost-calculator' || c.slug === 'selling-price-calculator' || c.slug === 'profit-margin-calculator'
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 sm:pb-20 bg-gradient-to-b from-[#F4F8F5]/80 via-white to-white border-b border-[#E3EBE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy & Search Launcher */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#21965A]">
                <span>Worldwide Financial Engine</span>
                <span aria-hidden="true">·</span>
                <span>100% Free Client-Side Calculations</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#17231C] leading-[1.1]">
                Your Numbers. <br />
                <span className="text-[#21965A]">Your Financial Clarity.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#17231C]/75 max-w-xl leading-relaxed">
                High-precision profit margin, markup, landed cost, break-even, and e-commerce calculators built for modern founders, retailers, and online operators.
              </p>

              {/* Calculator Search Bar */}
              <div className="pt-2 max-w-lg">
                <div
                  onClick={onOpenSearch}
                  className="flex items-center gap-3 p-3 bg-white border border-[#E3EBE5] hover:border-[#21965A] rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <Search className="w-5 h-5 text-[#21965A] shrink-0" />
                  <span className="text-sm text-[#17231C]/50 group-hover:text-[#17231C]/80 flex-1">
                    Search 8 financial calculators or formulas...
                  </span>
                  <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-[#17231C]/50 bg-[#F4F8F5] border border-[#E3EBE5] rounded-md">
                    Press /
                  </kbd>
                </div>

                {/* Popular Tags */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#17231C]/60">
                  <span className="font-medium">Quick jump:</span>
                  <button
                    onClick={() => navigate('/profit-margin-calculator')}
                    className="hover:text-[#21965A] hover:underline"
                  >
                    Profit Margin
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => navigate('/break-even-calculator')}
                    className="hover:text-[#21965A] hover:underline"
                  >
                    Break-Even
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => navigate('/selling-price-calculator')}
                    className="hover:text-[#21965A] hover:underline"
                  >
                    Selling Price
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => navigate('/landed-cost-calculator')}
                    className="hover:text-[#21965A] hover:underline"
                  >
                    Landed Cost
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Quick-Margin Widget */}
            <div className="lg:col-span-5 bg-white border border-[#E3EBE5] rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#E3EBE5] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E5F5EB] flex items-center justify-center text-[#21965A]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#17231C]">
                    Instant Live Calculator Sandbox
                  </span>
                </div>
                <span className="text-[11px] text-[#21965A] font-semibold">
                  Live Preview
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[#17231C]">
                    <span>Product Cost</span>
                    <span className="font-mono text-[#17231C]/70">{formatMoney(quickCost)}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={quickCost}
                    onChange={(e) => setQuickCost(Number(e.target.value))}
                    className="w-full accent-[#21965A] cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-[#17231C]">
                    <span>Selling Price</span>
                    <span className="font-mono text-[#17231C]/70">{formatMoney(quickPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={quickPrice}
                    onChange={(e) => setQuickPrice(Number(e.target.value))}
                    className="w-full accent-[#21965A] cursor-pointer"
                  />
                </div>
              </div>

              {/* Instant Output Pill-Free Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#17231C]/60">
                    Profit Margin
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#21965A] mt-1 tabular-nums">
                    {formatPercent(quickMargin, 1)}
                  </div>
                  <div className="text-[11px] text-[#17231C]/60 mt-0.5">
                    {formatMoney(quickProfit)} gross profit
                  </div>
                </div>

                <div className="p-3.5 bg-[#F4F8F5] border border-[#E3EBE5] rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#17231C]/60">
                    Markup on Cost
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#17231C] mt-1 tabular-nums">
                    {formatPercent(quickMarkup, 1)}
                  </div>
                  <div className="text-[11px] text-[#17231C]/60 mt-0.5">
                    {(quickCost > 0 ? quickPrice / quickCost : 1).toFixed(2)}x price multiplier
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/profit-margin-calculator')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#21965A] hover:bg-[#1A7A48] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Open Full Profit Margin Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#21965A]">
              Essential Tools
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17231C] mt-1">
              Popular Financial Calculators
            </h2>
          </div>
          <button
            onClick={() => navigate('/financial-calculators')}
            className="text-xs font-semibold text-[#21965A] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Browse all 8 calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCalculators.map((calc) => (
            <div
              key={calc.slug}
              className="bg-white border border-[#E3EBE5] rounded-2xl p-6 hover:border-[#21965A]/50 hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => navigate(`/${calc.slug}`)}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E5F5EB] flex items-center justify-center text-[#21965A] group-hover:bg-[#21965A] group-hover:text-white transition-colors mb-4">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#17231C] group-hover:text-[#21965A] transition-colors">
                  {calc.title}
                </h3>
                <p className="mt-2 text-xs text-[#17231C]/70 leading-relaxed line-clamp-3">
                  {calc.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E3EBE5] flex items-center justify-between">
                <span className="text-[11px] text-[#17231C]/50 font-medium">
                  {calc.readingTime}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#21965A] group-hover:translate-x-1 transition-transform">
                  <span>Calculate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Business Calculators Category Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-[#F4F8F5] border border-[#E3EBE5] rounded-3xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#21965A]">
                Category Showcase
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C] mt-1">
                Business & Operational Calculators
              </h2>
              <p className="text-xs sm:text-sm text-[#17231C]/70 mt-1 max-w-2xl">
                Master fixed overhead absorption, production batches, and B2B wholesale pricing structures with verified enterprise formulas.
              </p>
            </div>
            <button
              onClick={() => navigate('/business-calculators')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#21965A] hover:bg-[#1A7A48] rounded-xl transition-colors cursor-pointer shrink-0"
            >
              View Business Category
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {businessCalculators.map((c) => (
              <button
                key={c.slug}
                onClick={() => navigate(`/${c.slug}`)}
                className="p-5 bg-white border border-[#E3EBE5] rounded-2xl hover:border-[#21965A] transition-all text-left group cursor-pointer"
              >
                <div className="text-sm font-bold text-[#17231C] group-hover:text-[#21965A] transition-colors">
                  {c.title}
                </div>
                <div className="text-xs text-[#17231C]/65 line-clamp-2 mt-1.5 leading-relaxed">
                  {c.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ecommerce Calculators Category Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-white border border-[#E3EBE5] rounded-3xl space-y-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#21965A]">
                Category Showcase
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C] mt-1">
                E-commerce & Unit Economics Calculators
              </h2>
              <p className="text-xs sm:text-sm text-[#17231C]/70 mt-1 max-w-2xl">
                Engineered for Shopify, Amazon, and DTC merchants. Model payment fees, ad returns, and landed container freight before buying inventory.
              </p>
            </div>
            <button
              onClick={() => navigate('/ecommerce-calculators')}
              className="px-4 py-2 text-xs font-semibold text-[#17231C] bg-[#F4F8F5] hover:bg-[#E5F5EB] border border-[#E3EBE5] rounded-xl transition-colors cursor-pointer shrink-0"
            >
              View E-commerce Category
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ecommerceCalculators.map((c) => (
              <button
                key={c.slug}
                onClick={() => navigate(`/${c.slug}`)}
                className="p-5 bg-[#F4F8F5] border border-[#E3EBE5] rounded-2xl hover:border-[#21965A] hover:bg-white transition-all text-left group cursor-pointer"
              >
                <div className="text-sm font-bold text-[#17231C] group-hover:text-[#21965A] transition-colors">
                  {c.title}
                </div>
                <div className="text-xs text-[#17231C]/65 line-clamp-2 mt-1.5 leading-relaxed">
                  {c.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How Fincelio Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#21965A]">
            Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C] mt-1">
            How Fincelio Works
          </h2>
          <p className="text-sm text-[#17231C]/70 mt-2">
            Three simple steps to transition from guesswork to mathematical confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F4F8F5] border border-[#E3EBE5] rounded-2xl p-7 text-left space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#21965A] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-base font-bold text-[#17231C]">
              Input Your Real Commercial Parameters
            </h3>
            <p className="text-xs sm:text-sm text-[#17231C]/70 leading-relaxed">
              Enter your product acquisition cost, shipping fees, advertising expenses, and platform commission rates. Use curated presets for instant reference.
            </p>
          </div>

          <div className="bg-[#F4F8F5] border border-[#E3EBE5] rounded-2xl p-7 text-left space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#21965A] text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-base font-bold text-[#17231C]">
              Instant Client-Side Formula Execution
            </h3>
            <p className="text-xs sm:text-sm text-[#17231C]/70 leading-relaxed">
              Formulas calculate reactively in your web browser with zero network latency. Your sensitive financial margins and numbers never leave your device.
            </p>
          </div>

          <div className="bg-[#F4F8F5] border border-[#E3EBE5] rounded-2xl p-7 text-left space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#21965A] text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="text-base font-bold text-[#17231C]">
              Multi-Scenario Clarity & CSV Export
            </h3>
            <p className="text-xs sm:text-sm text-[#17231C]/70 leading-relaxed">
              Analyze sensitivity matrices, inspect exact mathematical breakdowns, copy clean summaries, or export spreadsheet-ready CSV files in one click.
            </p>
          </div>
        </div>
      </section>

      <AdSlot placement="inline" />

      {/* Latest Financial Guides Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#21965A]">
              Editorial Insights
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17231C] mt-1">
              Latest Financial & Pricing Guides
            </h2>
          </div>
          <button
            onClick={() => navigate('/guides')}
            className="text-xs font-semibold text-[#21965A] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Explore all guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GUIDES.slice(0, 2).map((guide) => (
            <div
              key={guide.slug}
              className="bg-white border border-[#E3EBE5] rounded-2xl p-7 hover:border-[#21965A]/50 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              onClick={() => navigate(`/guides/${guide.slug}`)}
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-2">
                  <span className="font-semibold text-[#21965A]">{guide.category}</span>
                  <span>·</span>
                  <span>{guide.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-[#17231C] group-hover:text-[#21965A] transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#17231C]/70 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E3EBE5] flex items-center justify-between text-xs font-semibold text-[#21965A]">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General FAQs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F8F5] border border-[#E3EBE5] rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#21965A]">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17231C] mt-1">
              Financial Formulas & Technical Clarity
            </h2>
            <p className="text-xs sm:text-sm text-[#17231C]/70 mt-1">
              Common questions on calculation accuracy, margin definitions, and privacy.
            </p>
          </div>

          <div className="space-y-3">
            {GENERAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white border border-[#E3EBE5] rounded-xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-[#17231C] hover:text-[#21965A] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#17231C]/60 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#17231C]/80 leading-relaxed border-t border-[#E3EBE5]/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
