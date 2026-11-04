import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#17231C]/60 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-[#21965A] transition-colors cursor-pointer">
          Fincelio
        </button>
        <span aria-hidden="true">/</span>
        <span className="text-[#17231C] font-medium">Privacy Policy</span>
      </nav>

      <div className="mb-10 pb-6 border-b border-[#E3EBE5]">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17231C]">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-[#17231C]/60">
          Last Updated: November 2026 · Compliant with GDPR, CCPA, and Google AdSense Publisher Policies
        </p>
      </div>

      <div className="space-y-8 text-[#17231C]/80 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">1. Introduction & Overview</h2>
          <p>
            At Fincelio (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we take your privacy seriously. This Privacy Policy describes how information is collected, used, and protected when you visit our website at fincelio.com and use our financial calculators and educational resources.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">2. Zero Server-Side Financial Data Storage</h2>
          <div className="p-4 bg-[#E5F5EB] border border-[#21965A]/20 rounded-xl text-xs sm:text-sm text-[#17231C]">
            <strong>Core Privacy Guarantee:</strong> All financial numbers, product costs, selling prices, margins, revenues, and ad spends entered into Fincelio calculators are processed solely within your local web browser engine. We do not transmit, log, store, or sell your proprietary commercial figures to any external database or server.
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">3. Information We Collect Automatically (Log Data)</h2>
          <p>
            Like most websites, our hosting servers automatically record standard internet log information, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>Internet Protocol (IP) addresses (anonymized where required by law).</li>
            <li>Browser type and version.</li>
            <li>Referring and exit pages.</li>
            <li>Operating system.</li>
            <li>Date and time stamps of requests.</li>
          </ul>
          <p>
            This data is used strictly for technical performance monitoring, server security, and preventing denial-of-service disruptions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">4. Cookies and Web Storage</h2>
          <p>
            Fincelio uses local storage (localStorage) exclusively to remember your preferences (such as your chosen display currency and cookie consent preference). We may also work with verified third-party partners (including Google Analytics and Google AdSense) that place cookies to measure web traffic and display relevant advertisements.
          </p>
          <p>
            You can review, modify, or decline cookies at any time via your browser settings or our dedicated <button onClick={() => navigate('/cookie-policy')} className="text-[#21965A] font-semibold hover:underline">Cookie Policy</button>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">5. Google AdSense & Third-Party Advertising</h2>
          <p>
            Google, as a third-party vendor, uses cookies to serve ads on Fincelio. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#21965A] underline">Google Ads Settings</a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#21965A] underline">aboutads.info</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">6. User Rights (GDPR & CCPA)</h2>
          <p>
            Depending on your jurisdiction, you have statutory rights regarding your personal data, including the right to access, rectify, delete, or restrict the processing of personal data. Since we do not require account registration or store personal financial entries, our footprint of user data is intentionally minimal.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#17231C]">7. Contact Our Data Protection Team</h2>
          <p>
            If you have questions regarding this Privacy Policy or our data handling practices, please contact us at: <a href="mailto:privacy@fincelio.com" className="text-[#21965A] underline font-medium">privacy@fincelio.com</a> or via our <button onClick={() => navigate('/contact')} className="text-[#21965A] underline font-medium">Contact Page</button>.
          </p>
        </section>
      </div>
    </div>
  );
};
