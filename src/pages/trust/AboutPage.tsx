import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { ShieldCheck, Award, Eye, Users, CheckCircle, Calculator } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-[#21965A] transition-colors cursor-pointer">
          Fincelio
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#17231C] font-medium">About Us</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17231C]">
          About Fincelio
        </h1>
        <p className="mt-3 text-lg text-[#21965A] font-semibold">
          Your Numbers. Your Financial Clarity.
        </p>
        <p className="mt-3 text-base text-[#17231C]/75 leading-relaxed">
          Fincelio was founded on a simple premise: commercial founders, direct-to-consumer operators, and finance professionals deserve instant, accurate, and distraction-free mathematical clarity without clunky spreadsheets or subscription paywalls.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 bg-[#F4F8F5] border border-[#E3EBE5] rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#E5F5EB] flex items-center justify-center text-[#21965A] mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#17231C]">Mathematical Integrity</h2>
          <p className="mt-2 text-xs text-[#17231C]/70 leading-relaxed">
            Every formula is verified against double-entry managerial accounting standards and accepted e-commerce unit economics equations.
          </p>
        </div>

        <div className="p-6 bg-[#F4F8F5] border border-[#E3EBE5] rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#E5F5EB] flex items-center justify-center text-[#21965A] mb-4">
            <Eye className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#17231C]">Client-Side Privacy</h2>
          <p className="mt-2 text-xs text-[#17231C]/70 leading-relaxed">
            Your proprietary margins, costs, and pricing data run 100% in your local browser engine. We never store or transmit your numbers.
          </p>
        </div>

        <div className="p-6 bg-[#F4F8F5] border border-[#E3EBE5] rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#E5F5EB] flex items-center justify-center text-[#21965A] mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#17231C]">Zero-Friction Access</h2>
          <p className="mt-2 text-xs text-[#17231C]/70 leading-relaxed">
            No forced registrations, no locked features, and no email gates. Financial clarity should be instant and globally accessible.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="space-y-8 text-[#17231C]/80 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#17231C]">
            Our Editorial Standards & Calculation Methodology
          </h2>
          <p>
            The Fincelio quantitative team consists of financial analysts, e-commerce supply chain veterans, and software engineers dedicated to eradicating costly pricing mistakes. When small businesses confuse markup with margin, or overlook customs tariffs when importing goods, the consequences can be fatal to company cash flow.
          </p>
          <p>
            We build tools that make unit economics visible. Whether calculating break-even ROAS before launching a six-figure Meta advertising campaign or establishing wholesale MOQ discounts for retail distributors, Fincelio provides clear, uncompromised answers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#17231C]">
            Worldwide Accessibility
          </h2>
          <p>
            Fincelio supports multi-currency formatting for international founders across North America, Europe, the United Kingdom, Australia, Asia, and worldwide. All tools are responsive across mobile devices, tablets, and desktop workstations.
          </p>
        </section>

        <div className="p-6 bg-[#E5F5EB] border border-[#21965A]/20 rounded-2xl flex items-center justify-between gap-4">
          <div>
            <div className="text-base font-bold text-[#17231C]">
              Ready to calculate your unit economics?
            </div>
            <div className="text-xs text-[#17231C]/70 mt-1">
              Explore our full suite of 8 financial, e-commerce, and business calculators.
            </div>
          </div>
          <button
            onClick={() => navigate('/financial-calculators')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#21965A] hover:bg-[#1A7A48] rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Explore Calculators
          </button>
        </div>
      </div>
    </div>
  );
};
