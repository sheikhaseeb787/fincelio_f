import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { Cookie, Check, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const { navigate } = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('fincelio_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('fincelio_cookie_consent', 'all');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('fincelio_cookie_consent', 'essential');
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white border border-[#E3EBE5] rounded-xl shadow-xl p-5 text-[#17231C]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E5F5EB] flex items-center justify-center shrink-0 text-[#21965A]">
            <Cookie className="w-4 h-4" />
          </div>
          <div className="space-y-1.5 flex-1 text-xs leading-relaxed">
            <div className="font-semibold text-sm text-[#17231C]">
              Cookie & Privacy Preferences
            </div>
            <p className="text-[#17231C]/75">
              Fincelio uses essential local browser storage to remember your preferred currency and calculations. We also partner with privacy-respecting analytics and standard advertising networks.
            </p>
            <div>
              <button
                onClick={() => navigate('/cookie-policy')}
                className="text-[#21965A] hover:underline font-medium"
              >
                Read our Cookie Policy
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2.5 pt-3 border-t border-[#E3EBE5]">
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="px-3 py-1.5 text-xs font-medium text-[#17231C]/80 hover:text-[#17231C] bg-[#F4F8F5] hover:bg-[#E3EBE5]/50 border border-[#E3EBE5] rounded-lg transition-colors cursor-pointer"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#21965A] hover:bg-[#1A7A48] rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};
