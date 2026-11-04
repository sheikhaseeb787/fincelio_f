import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-[#21965A] transition-colors cursor-pointer">
          Fincelio
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#17231C] font-medium">Financial Disclaimer</span>
      </nav>

      <div className="mb-10 pb-6 border-b border-[#E3EBE5]">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17231C]">
          Financial & Mathematical Disclaimer
        </h1>
        <p className="mt-2 text-xs text-[#17231C]/60">
          Important Notice Regarding Calculation Outputs and Business Decision-Making
        </p>
      </div>

      <div className="space-y-8 text-[#17231C]/80 text-sm leading-relaxed">
        <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <div className="font-bold">Not Financial, Accounting, or Tax Advice</div>
            <div className="leading-relaxed">
              The calculations, mathematical formulas, and insights provided on Fincelio are strictly for informational and educational estimation purposes. They do not constitute formal financial planning, certified public accounting (CPA), legal, or tax advice.
            </div>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">1. Estimation Accuracy & Rounding</h2>
          <p>
            While Fincelio strives for complete mathematical precision and tests all formulas against standard double-entry accounting models, real-world commerce is influenced by unpredictable external variables, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>Currency exchange rate fluctuations and foreign transaction surcharges.</li>
            <li>Dynamic payment gateway fees, disputed chargeback costs, and merchant reserve requirements.</li>
            <li>Port demurrage, detention, customs inspection fees, and changing tariff classifications.</li>
            <li>Non-linear marketing attribution and seasonal consumer return behavior.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">2. Independent Verification Responsibility</h2>
          <p>
            Before signing binding purchase orders with manufacturing suppliers, committing marketing ad budgets, signing commercial leases, or filing corporate tax returns, you must independently verify your numbers with certified accounting or legal professionals.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">3. External Links & Third-Party References</h2>
          <p>
            Fincelio may contain links to external third-party websites, shipping carriers, regulatory tariff schedules, or software applications. We have no control over the content, terms, or privacy policies of those external entities and accept no responsibility for actions taken on third-party domains.
          </p>
        </section>
      </div>
    </div>
  );
};
