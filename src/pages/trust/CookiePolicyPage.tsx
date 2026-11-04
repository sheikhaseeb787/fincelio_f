import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { Cookie, Settings, CheckCircle2 } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  const { navigate } = useRouter();

  const handleResetCookies = () => {
    try {
      localStorage.removeItem('fincelio_cookie_consent');
      window.location.reload();
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-[#21965A] transition-colors cursor-pointer">
          Fincelio
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#17231C] font-medium">Cookie Policy</span>
      </nav>

      <div className="mb-10 pb-6 border-b border-[#E3EBE5]">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17231C]">
          Cookie Policy
        </h1>
        <p className="mt-2 text-xs text-[#17231C]/60">
          Last Updated: November 2026 · Transparent Cookie & Local Storage Disclosure
        </p>
      </div>

      <div className="space-y-8 text-[#17231C]/80 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your computer or mobile device when you browse websites. They are widely used to make websites work efficiently, remember user preferences, and provide analytical reporting data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">2. How Fincelio Uses Cookies & Web Storage</h2>
          <div className="border border-[#E3EBE5] rounded-xl overflow-hidden divide-y divide-[#E3EBE5]">
            <div className="p-4 bg-white">
              <div className="font-semibold text-sm text-[#17231C] flex items-center justify-between">
                <span>Essential & Functional Storage</span>
                <span className="text-xs text-[#21965A] font-bold">Always Active</span>
              </div>
              <p className="text-xs text-[#17231C]/70 mt-1">
                Remembers your selected currency preference (e.g. USD, EUR, GBP) and your cookie banner acknowledgment. These do not track personal identifying information and do not leave your browser.
              </p>
            </div>

            <div className="p-4 bg-white">
              <div className="font-semibold text-sm text-[#17231C]">
                Analytical & Performance Cookies
              </div>
              <p className="text-xs text-[#17231C]/70 mt-1">
                Help us understand which calculators are most popular, identify slow loading pages, and debug calculation errors. Data is aggregated and anonymized.
              </p>
            </div>

            <div className="p-4 bg-white">
              <div className="font-semibold text-sm text-[#17231C]">
                Advertising & Marketing Cookies (Google AdSense)
              </div>
              <p className="text-xs text-[#17231C]/70 mt-1">
                Used to display relevant advertising units that help fund free access to Fincelio calculators worldwide. These cookies may track visits across third-party websites to provide targeted commercial offers.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">3. Managing Your Cookie Preferences</h2>
          <p>
            You can modify your cookie settings directly through your web browser (Chrome, Firefox, Safari, Edge) to block or delete cookies. Note that blocking essential cookies may require you to re-select your preferred currency on each visit.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetCookies}
              className="px-4 py-2 text-xs font-semibold text-[#17231C] bg-[#F4F8F5] hover:bg-[#E5F5EB] hover:text-[#21965A] border border-[#E3EBE5] rounded-xl transition-colors cursor-pointer"
            >
              Reset Cookie Preferences & Re-open Banner
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
