import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { FAQItem } from '../../types';
import { CALCULATORS } from '../../data/calculatorsMeta';
import { AdSlot } from '../layout/AdSlot';
import { ChevronDown, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface ExamplePreset {
  label: string;
  description?: string;
  onSelect: () => void;
}

interface CalculatorLayoutProps {
  title: string;
  slug: string;
  category: 'business' | 'ecommerce' | 'financial';
  categoryLabel: string;
  description: string;
  presets?: ExamplePreset[];
  children: React.ReactNode;
  resultsNode: React.ReactNode;
  formulaNode?: React.ReactNode;
  scenarioNode?: React.ReactNode;
  faqs?: FAQItem[];
  relatedSlugs?: string[];
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  title,
  slug,
  category,
  categoryLabel,
  description,
  presets,
  children,
  resultsNode,
  formulaNode,
  scenarioNode,
  faqs,
  relatedSlugs = [],
}) => {
  const { navigate } = useRouter();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categoryPath =
    category === 'business'
      ? '/business-calculators'
      : category === 'ecommerce'
      ? '/ecommerce-calculators'
      : '/financial-calculators';

  const relatedCalculators = CALCULATORS.filter(
    (c) => c.slug !== slug && (relatedSlugs.includes(c.slug) || c.category === category)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb - Clean unboxed text with typographic separator */}
      <nav className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-6 no-print">
        <button onClick={() => navigate('/')} className="hover:text-[#21965A] transition-colors cursor-pointer">
          Fincelio
        </button>
        <span aria-hidden="true">/</span>
        <button onClick={() => navigate(categoryPath)} className="hover:text-[#21965A] transition-colors cursor-pointer">
          {categoryLabel}
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#17231C] font-medium truncate">{title}</span>
      </nav>

      {/* Header section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17231C]">
              {title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#17231C]/75 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Example presets */}
          {presets && presets.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 no-print shrink-0">
              <span className="text-xs font-medium text-[#17231C]/60 mr-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#21965A]" /> Examples:
              </span>
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={p.onSelect}
                  className="px-2.5 py-1 text-xs font-medium text-[#17231C] bg-[#F4F8F5] hover:bg-[#E5F5EB] border border-[#E3EBE5] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  title={p.description}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main calculation workspace: 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12">
        {/* Left Column: Inputs Form */}
        <div className="lg:col-span-6 bg-white border border-[#E3EBE5] rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E3EBE5] pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#17231C]/80">
              Input Parameters
            </h2>
            <span className="text-xs text-[#21965A] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Live Reactive
            </span>
          </div>
          {children}
        </div>

        {/* Right Column: Results & Unit Economics Panel */}
        <div className="lg:col-span-6 bg-[#F4F8F5] border border-[#E3EBE5] rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E3EBE5] pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#17231C]/80">
              Calculation Output & Analysis
            </h2>
            <span className="text-xs text-[#17231C]/60">Verified Formulas</span>
          </div>
          {resultsNode}
        </div>
      </div>

      {/* Scenarios Section if present */}
      {scenarioNode && (
        <div className="mb-12 bg-white border border-[#E3EBE5] rounded-2xl p-6 sm:p-8 shadow-xs">
          {scenarioNode}
        </div>
      )}

      {/* Mid-page Ad Slot */}
      <AdSlot placement="inline" />

      {/* Mathematical Formula & Working Example Section */}
      {formulaNode && (
        <div className="mb-12 bg-white border border-[#E3EBE5] rounded-2xl p-6 sm:p-8 shadow-xs">
          {formulaNode}
        </div>
      )}

      {/* Calculator FAQs */}
      {faqs && faqs.length > 0 && (
        <div className="mb-12 bg-[#F4F8F5] border border-[#E3EBE5] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl mb-6">
            <h2 className="text-xl font-bold text-[#17231C]">
              Frequently Asked Questions & Financial Nuances
            </h2>
            <p className="text-xs sm:text-sm text-[#17231C]/70 mt-1">
              Clear answers to the most common questions regarding {title.toLowerCase()} methodology.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white border border-[#E3EBE5] rounded-xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-[#17231C] hover:text-[#21965A] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#17231C]/60 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#17231C]/80 leading-relaxed border-t border-[#E3EBE5]/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Calculators */}
      {relatedCalculators.length > 0 && (
        <div className="pt-4 border-t border-[#E3EBE5] no-print">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#17231C]">
              Related Financial Calculators
            </h3>
            <button
              onClick={() => navigate('/financial-calculators')}
              className="text-xs font-semibold text-[#21965A] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View all 8 calculators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedCalculators.map((c) => (
              <button
                key={c.slug}
                onClick={() => navigate(`/${c.slug}`)}
                className="p-4 bg-white border border-[#E3EBE5] rounded-xl hover:border-[#21965A]/50 hover:shadow-xs transition-all text-left cursor-pointer group"
              >
                <div className="text-sm font-bold text-[#17231C] group-hover:text-[#21965A] transition-colors">
                  {c.title}
                </div>
                <div className="text-xs text-[#17231C]/65 line-clamp-2 mt-1">
                  {c.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
