import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { CALCULATORS } from '../../data/calculatorsMeta';
import { GUIDES } from '../../data/guidesData';
import { ShieldCheck, FileText, HelpCircle, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenSitemap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSitemap }) => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#F4F8F5] border-t border-[#E3EBE5] text-[#17231C] pt-14 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-[#E3EBE5]">
          {/* Brand & Mission column */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#21965A] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                F
              </div>
              <span className="text-xl font-bold tracking-tight text-[#17231C]">
                Fincelio
              </span>
            </div>
            <p className="text-sm text-[#17231C]/80 max-w-sm leading-relaxed">
              Your Numbers. Your Financial Clarity. High-precision financial, pricing, and unit economics calculators engineered for modern founders, retailers, and e-commerce merchants.
            </p>
            <div className="pt-2 text-xs text-[#17231C]/60 space-y-1">
              <div>Instant client-side calculation · Zero data collection</div>
              <div>Tested against accepted double-entry accounting formulas</div>
            </div>
          </div>

          {/* Calculators Column */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#17231C]/90">
              Calculators
            </div>
            <ul className="space-y-2 text-sm text-[#17231C]/75">
              {CALCULATORS.map((calc) => (
                <li key={calc.slug}>
                  <button
                    onClick={() => navigate(`/${calc.slug}`)}
                    className="hover:text-[#21965A] transition-colors text-left cursor-pointer"
                  >
                    {calc.shortTitle}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories & Guides Column */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#17231C]/90">
              Categories & Guides
            </div>
            <ul className="space-y-2 text-sm text-[#17231C]/75">
              <li>
                <button
                  onClick={() => navigate('/business-calculators')}
                  className="hover:text-[#21965A] transition-colors text-left cursor-pointer"
                >
                  Business Calculators
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/ecommerce-calculators')}
                  className="hover:text-[#21965A] transition-colors text-left cursor-pointer"
                >
                  E-commerce Calculators
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/financial-calculators')}
                  className="hover:text-[#21965A] transition-colors text-left cursor-pointer"
                >
                  All Financial Tools
                </button>
              </li>
              <li className="pt-2 border-t border-[#E3EBE5]">
                <button
                  onClick={() => navigate('/guides')}
                  className="font-medium text-[#21965A] hover:underline cursor-pointer"
                >
                  Financial Guides Library
                </button>
              </li>
              {GUIDES.slice(0, 3).map((guide) => (
                <li key={guide.slug}>
                  <button
                    onClick={() => navigate(`/guides/${guide.slug}`)}
                    className="text-xs hover:text-[#21965A] transition-colors text-left truncate max-w-[200px] block cursor-pointer"
                    title={guide.title}
                  >
                    {guide.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Legal Column */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#17231C]/90">
              Trust & Legal
            </div>
            <ul className="space-y-2 text-sm text-[#17231C]/75">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-[#21965A] transition-colors text-left cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#21965A] transition-colors text-left cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy-policy')}
                  className="hover:text-[#21965A] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms-and-conditions')}
                  className="hover:text-[#21965A] transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/disclaimer')}
                  className="hover:text-[#21965A] transition-colors text-left cursor-pointer"
                >
                  Financial Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/cookie-policy')}
                  className="hover:text-[#21965A] transition-colors text-left cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>
              {onOpenSitemap && (
                <li>
                  <button
                    onClick={onOpenSitemap}
                    className="hover:text-[#21965A] transition-colors text-left cursor-pointer text-xs flex items-center gap-1 text-[#17231C]/60 pt-1"
                  >
                    <span>XML Sitemap Directory</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="py-6 text-xs text-[#17231C]/60 leading-relaxed border-b border-[#E3EBE5]">
          <p>
            <strong>Financial Estimation Disclaimer:</strong> Fincelio financial calculators and mathematical tools are provided for educational and estimation purposes only. All calculations are executed directly within your web browser and should not be construed as legal, tax, investment, or certified accounting advice. Always consult a certified public accountant (CPA) or qualified financial advisor prior to making critical commercial decisions.
          </p>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#17231C]/60 gap-4">
          <div>
            © {new Date().getFullYear()} Fincelio. All rights reserved. Your Numbers. Your Financial Clarity.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/privacy-policy')}
              className="hover:text-[#17231C] transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => navigate('/terms-and-conditions')}
              className="hover:text-[#17231C] transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => navigate('/disclaimer')}
              className="hover:text-[#17231C] transition-colors"
            >
              Disclaimer
            </button>
            <button
              onClick={() => navigate('/cookie-policy')}
              className="hover:text-[#17231C] transition-colors"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
