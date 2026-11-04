import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { CALCULATORS } from '../../data/calculatorsMeta';
import { GUIDES } from '../../data/guidesData';
import { Search, Calculator, BookOpen, Layers, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredCalculators = CALCULATORS.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.toLowerCase().includes(q))
  );

  const filteredGuides = GUIDES.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.summary.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
  );

  const categories = [
    { title: 'Business Calculators', href: '/business-calculators', desc: 'Break-even, product cost, markup, and wholesale tools' },
    { title: 'E-commerce Calculators', href: '/ecommerce-calculators', desc: 'Landed cost, selling price, and online store profit metrics' },
    { title: 'All Financial Calculators', href: '/financial-calculators', desc: 'Complete suite of unit economics and margin tools' },
  ].filter((c) => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));

  const totalResults = filteredCalculators.length + filteredGuides.length + categories.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border border-[#E3EBE5] rounded-2xl shadow-2xl max-w-xl w-full flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E3EBE5]">
          <Search className="w-5 h-5 text-[#21965A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators, formulas, or guides..."
            className="flex-1 bg-transparent text-[#17231C] text-sm placeholder:text-[#17231C]/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#17231C]/40 hover:text-[#17231C] rounded-lg cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {totalResults === 0 ? (
            <div className="py-8 text-center text-sm text-[#17231C]/60">
              No results found for &ldquo;{query}&rdquo;. Try &ldquo;margin&rdquo;, &ldquo;landed cost&rdquo;, or &ldquo;break-even&rdquo;.
            </div>
          ) : (
            <>
              {filteredCalculators.length > 0 && (
                <div className="space-y-1">
                  <div className="px-3 py-1 text-[11px] font-bold text-[#17231C]/50 uppercase tracking-wider">
                    Calculators
                  </div>
                  {filteredCalculators.map((calc) => (
                    <button
                      key={calc.slug}
                      onClick={() => {
                        navigate(`/${calc.slug}`);
                        onClose();
                      }}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-[#F4F8F5] transition-colors text-left group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#E5F5EB] flex items-center justify-center shrink-0 text-[#21965A] group-hover:bg-[#21965A] group-hover:text-white transition-colors">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-[#17231C] group-hover:text-[#21965A] transition-colors">
                          {calc.title}
                        </div>
                        <div className="text-xs text-[#17231C]/70 line-clamp-1">
                          {calc.description}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#17231C]/30 group-hover:text-[#21965A] transition-colors shrink-0 self-center" />
                    </button>
                  ))}
                </div>
              )}

              {categories.length > 0 && (
                <div className="space-y-1">
                  <div className="px-3 py-1 text-[11px] font-bold text-[#17231C]/50 uppercase tracking-wider">
                    Categories
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat.href}
                      onClick={() => {
                        navigate(cat.href);
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F4F8F5] transition-colors text-left group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F4F8F5] border border-[#E3EBE5] flex items-center justify-center shrink-0 text-[#17231C]/70">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-[#17231C]">
                          {cat.title}
                        </div>
                        <div className="text-xs text-[#17231C]/60 truncate">
                          {cat.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {filteredGuides.length > 0 && (
                <div className="space-y-1">
                  <div className="px-3 py-1 text-[11px] font-bold text-[#17231C]/50 uppercase tracking-wider">
                    Financial Guides
                  </div>
                  {filteredGuides.map((guide) => (
                    <button
                      key={guide.slug}
                      onClick={() => {
                        navigate(`/guides/${guide.slug}`);
                        onClose();
                      }}
                      className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-[#F4F8F5] transition-colors text-left group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F4F8F5] border border-[#E3EBE5] flex items-center justify-center shrink-0 text-[#17231C]/70">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-[#17231C] group-hover:text-[#21965A] transition-colors">
                          {guide.title}
                        </div>
                        <div className="text-xs text-[#17231C]/60 line-clamp-1">
                          {guide.summary}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#F4F8F5] border-t border-[#E3EBE5] text-[11px] text-[#17231C]/60 flex items-center justify-between">
          <span>Press ESC to close</span>
          <span>Instant live search</span>
        </div>
      </div>
    </div>
  );
};
