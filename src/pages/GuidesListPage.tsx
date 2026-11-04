import React from 'react';
import { useRouter } from '../context/RouterContext';
import { GUIDES } from '../data/guidesData';
import { AdSlot } from '../components/layout/AdSlot';
import { BookOpen, ArrowRight, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export const GuidesListPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-[#21965A] transition-colors cursor-pointer">
          Fincelio
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#17231C] font-medium">Financial Guides</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#21965A] mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Fincelio Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17231C]">
          Financial & Pricing Engineering Guides
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#17231C]/75 leading-relaxed">
          In-depth, mathematically grounded tutorials on margin calculation, break-even unit economics, international landed costs, and pricing strategy.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {GUIDES.map((guide) => (
          <article
            key={guide.slug}
            className="bg-white border border-[#E3EBE5] rounded-2xl p-7 hover:border-[#21965A]/50 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            onClick={() => navigate(`/guides/${guide.slug}`)}
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-3">
                <span className="font-semibold text-[#21965A]">{guide.category}</span>
                <span>·</span>
                <span>{guide.readTime}</span>
                <span>·</span>
                <span>{guide.publishDate}</span>
              </div>
              <h2 className="text-xl font-bold text-[#17231C] group-hover:text-[#21965A] transition-colors leading-snug">
                {guide.title}
              </h2>
              <p className="mt-3 text-sm text-[#17231C]/70 leading-relaxed">
                {guide.summary}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-[#E3EBE5] flex items-center justify-between">
              <span className="text-xs text-[#17231C]/50 font-medium">
                {guide.author}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#21965A] group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </article>
        ))}
      </div>

      <AdSlot placement="inline" />
    </div>
  );
};
