import React from 'react';
import { useRouter } from '../context/RouterContext';
import { GUIDES } from '../data/guidesData';
import { CALCULATORS } from '../data/calculatorsMeta';
import { AdSlot } from '../components/layout/AdSlot';
import { BookOpen, Calculator, ArrowRight, ArrowLeft, Clock, Calendar, UserCheck } from 'lucide-react';

interface GuideDetailPageProps {
  slug: string;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();

  const guide = GUIDES.find((g) => g.slug === slug) || GUIDES[0];
  const relatedCalc = CALCULATORS.find((c) => c.slug === guide.relatedCalculatorSlug);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-8">
        <button onClick={() => navigate('/')} className="hover:text-[#21965A] transition-colors cursor-pointer">
          Fincelio
        </button>
        <span aria-hidden="true">/</span>
        <button onClick={() => navigate('/guides')} className="hover:text-[#21965A] transition-colors cursor-pointer">
          Guides
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#17231C] font-medium truncate">{guide.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-10 pb-8 border-b border-[#E3EBE5]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#21965A] mb-3">
          <span>{guide.category}</span>
          <span>·</span>
          <span className="text-[#17231C]/60">{guide.readTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#17231C] leading-tight">
          {guide.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#17231C]/75 leading-relaxed">
          {guide.subtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-[#17231C]/60">
          <div className="flex items-center gap-1.5 font-medium text-[#17231C]">
            <UserCheck className="w-4 h-4 text-[#21965A]" />
            <span>{guide.author}</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{guide.publishDate}</span>
          </div>
          <span>·</span>
          <span>Verified Formulas</span>
        </div>
      </header>

      {/* Interactive Tool Banner CTA */}
      {relatedCalc && (
        <div className="mb-12 p-6 bg-[#E5F5EB] border border-[#21965A]/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#21965A]">
              Interactive Financial Tool
            </div>
            <div className="text-base font-bold text-[#17231C] mt-1">
              Try the {relatedCalc.title}
            </div>
            <div className="text-xs text-[#17231C]/75 mt-0.5">
              Put the principles in this article to work with instant live numbers.
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/${relatedCalc.slug}`)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#21965A] hover:bg-[#1A7A48] rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <span>Open Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Article Body */}
      <div className="space-y-10 text-[#17231C]/85 text-base leading-relaxed">
        {guide.sections.map((section, idx) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#17231C] tracking-tight pt-2">
              {idx + 1}. {section.heading}
            </h2>

            {section.content.map((p, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {p}
              </p>
            ))}

            {section.callout && (
              <div className="my-6 p-5 bg-[#F4F8F5] border-l-4 border-[#21965A] rounded-r-xl text-sm font-medium text-[#17231C] leading-relaxed">
                {section.callout}
              </div>
            )}
          </section>
        ))}
      </div>

      <AdSlot placement="inline" />

      {/* Footer Navigation */}
      <footer className="mt-16 pt-8 border-t border-[#E3EBE5] flex items-center justify-between">
        <button
          onClick={() => navigate('/guides')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17231C]/70 hover:text-[#21965A] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Guides</span>
        </button>

        {relatedCalc && (
          <button
            onClick={() => navigate(`/${relatedCalc.slug}`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#21965A] hover:underline cursor-pointer"
          >
            <span>Calculate with {relatedCalc.shortTitle}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </footer>
    </article>
  );
};
