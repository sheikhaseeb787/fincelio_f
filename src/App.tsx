import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { RouterProvider, useRouter, normalizePath } from './context/RouterContext';
import { updateDocumentSeo } from './lib/seo';
import { CALCULATORS } from './data/calculatorsMeta';
import { GUIDES } from './data/guidesData';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CookieConsent } from './components/layout/CookieConsent';
import { SearchModal } from './components/layout/SearchModal';
import { SitemapModal } from './components/layout/SitemapModal';

// Calculators
import { ProfitMarginCalculator } from './components/calculators/ProfitMarginCalculator';
import { MarkupCalculator } from './components/calculators/MarkupCalculator';
import { SellingPriceCalculator } from './components/calculators/SellingPriceCalculator';
import { BreakEvenCalculator } from './components/calculators/BreakEvenCalculator';
import { LandedCostCalculator } from './components/calculators/LandedCostCalculator';
import { EcommerceProfitCalculator } from './components/calculators/EcommerceProfitCalculator';
import { WholesalePriceCalculator } from './components/calculators/WholesalePriceCalculator';
import { ProductCostCalculator } from './components/calculators/ProductCostCalculator';

// Pages
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { GuidesListPage } from './pages/GuidesListPage';
import { GuideDetailPage } from './pages/GuideDetailPage';

// Trust Pages
import { AboutPage } from './pages/trust/AboutPage';
import { ContactPage } from './pages/trust/ContactPage';
import { PrivacyPolicyPage } from './pages/trust/PrivacyPolicyPage';
import { TermsPage } from './pages/trust/TermsPage';
import { DisclaimerPage } from './pages/trust/DisclaimerPage';
import { CookiePolicyPage } from './pages/trust/CookiePolicyPage';

const AppContent: React.FC = () => {
  const { path, navigate } = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [sitemapOpen, setSitemapOpen] = useState(false);

  // Global keyboard shortcut '/' to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !searchOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Dynamic SEO update on route change
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fincelio.com';

    // 1. Check if calculator page
    const calc = CALCULATORS.find((c) => `/${c.slug}` === path);
    if (calc) {
      updateDocumentSeo({
        title: `${calc.title} – Fincelio Financial Calculators`,
        description: calc.description,
        canonicalPath: `/${calc.slug}`,
        schema: {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: calc.title,
          url: `${origin}/${calc.slug}`,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All',
          description: calc.description,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      });
      return;
    }

    // 2. Check if guide detail page
    if (path.startsWith('/guides/')) {
      const slug = path.replace('/guides/', '');
      const guide = GUIDES.find((g) => g.slug === slug);
      if (guide) {
        updateDocumentSeo({
          title: `${guide.title} | Fincelio Guides`,
          description: guide.summary,
          canonicalPath: path,
          schema: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.summary,
            author: { '@type': 'Organization', name: 'Fincelio Quantitative Team' },
            publisher: { '@type': 'Organization', name: 'Fincelio' },
            url: `${origin}${path}`,
          },
        });
        return;
      }
    }

    // 3. Static page SEO configs
    switch (path) {
      case '/':
        updateDocumentSeo({
          title: 'Fincelio – Financial Calculators | Your Numbers. Your Financial Clarity.',
          description:
            'Accurate, free, and instant business and e-commerce financial calculators for profit margins, markups, landed costs, break-even point, and unit economics.',
          canonicalPath: '/',
        });
        break;
      case '/business-calculators':
        updateDocumentSeo({
          title: 'Business Calculators – Fincelio',
          description:
            'Free business financial planning calculators for break-even analysis, unit production costs, wholesale pricing, and markup.',
          canonicalPath: '/business-calculators',
        });
        break;
      case '/ecommerce-calculators':
        updateDocumentSeo({
          title: 'E-commerce Calculators – Fincelio',
          description:
            'E-commerce unit economics calculators for break-even ROAS, landed import costs, target selling price, and online store net margins.',
          canonicalPath: '/ecommerce-calculators',
        });
        break;
      case '/financial-calculators':
        updateDocumentSeo({
          title: 'All Financial Calculators – Fincelio',
          description:
            'Comprehensive directory of verified pricing, margin, and business financial calculation tools.',
          canonicalPath: '/financial-calculators',
        });
        break;
      case '/guides':
        updateDocumentSeo({
          title: 'Financial & Pricing Guides – Fincelio',
          description:
            'Authoritative guides and mathematical formulas on margin vs. markup, true landed cost, break-even ROAS, and pricing strategies.',
          canonicalPath: '/guides',
        });
        break;
      case '/about':
        updateDocumentSeo({
          title: 'About Us – Fincelio Financial Calculators',
          description:
            'Learn about Fincelio mission, editorial standards, and commitment to free, privacy-focused financial tools.',
          canonicalPath: '/about',
        });
        break;
      case '/contact':
        updateDocumentSeo({
          title: 'Contact Us – Fincelio',
          description:
            'Get in touch with the Fincelio quantitative engineering and editorial team.',
          canonicalPath: '/contact',
        });
        break;
      case '/privacy-policy':
        updateDocumentSeo({
          title: 'Privacy Policy – Fincelio',
          description:
            'Read the Fincelio Privacy Policy. 100% client-side calculator processing with zero server-side data collection.',
          canonicalPath: '/privacy-policy',
        });
        break;
      case '/terms-and-conditions':
        updateDocumentSeo({
          title: 'Terms and Conditions – Fincelio',
          description: 'Terms and conditions governing the use of Fincelio financial calculator tools.',
          canonicalPath: '/terms-and-conditions',
        });
        break;
      case '/disclaimer':
        updateDocumentSeo({
          title: 'Financial Disclaimer – Fincelio',
          description:
            'Important financial estimation disclaimer regarding Fincelio calculators and mathematical results.',
          canonicalPath: '/disclaimer',
        });
        break;
      case '/cookie-policy':
        updateDocumentSeo({
          title: 'Cookie Policy – Fincelio',
          description:
            'Transparent explanation of essential storage, analytics, and advertising cookies on Fincelio.',
          canonicalPath: '/cookie-policy',
        });
        break;
      default:
        updateDocumentSeo({
          title: 'Page Not Found – Fincelio',
          description: 'The requested financial calculator page could not be found.',
          canonicalPath: path,
        });
        break;
    }
  }, [path]);

  // Page Routing
  const renderCurrentPage = () => {
    // 1. Calculators
    if (path === '/profit-margin-calculator') return <ProfitMarginCalculator />;
    if (path === '/markup-calculator') return <MarkupCalculator />;
    if (path === '/selling-price-calculator') return <SellingPriceCalculator />;
    if (path === '/break-even-calculator') return <BreakEvenCalculator />;
    if (path === '/landed-cost-calculator') return <LandedCostCalculator />;
    if (path === '/ecommerce-profit-calculator') return <EcommerceProfitCalculator />;
    if (path === '/wholesale-price-calculator') return <WholesalePriceCalculator />;
    if (path === '/product-cost-calculator') return <ProductCostCalculator />;

    // 2. Categories
    if (path === '/business-calculators') return <CategoryPage category="business" />;
    if (path === '/ecommerce-calculators') return <CategoryPage category="ecommerce" />;
    if (path === '/financial-calculators') return <CategoryPage category="financial" />;

    // 3. Guides
    if (path === '/guides') return <GuidesListPage />;
    if (path.startsWith('/guides/')) {
      const slug = path.replace('/guides/', '');
      return <GuideDetailPage slug={slug} />;
    }

    // 4. Trust Pages
    if (path === '/about') return <AboutPage />;
    if (path === '/contact') return <ContactPage />;
    if (path === '/privacy-policy') return <PrivacyPolicyPage />;
    if (path === '/terms-and-conditions') return <TermsPage />;
    if (path === '/disclaimer') return <DisclaimerPage />;
    if (path === '/cookie-policy') return <CookiePolicyPage />;

    // 5. Homepage
    if (path === '/') return <HomePage onOpenSearch={() => setSearchOpen(true)} />;

    // 6. 404 Fallback
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="text-5xl font-extrabold text-[#21965A]">404</div>
        <h1 className="text-2xl font-bold text-[#17231C]">Page Not Found</h1>
        <p className="text-sm text-[#17231C]/70">
          The calculator or page you requested at <code className="bg-[#F4F8F5] px-1 py-0.5 rounded font-mono text-xs">{path}</code> does not exist or has been relocated.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#21965A] hover:bg-[#1A7A48] rounded-xl transition-colors cursor-pointer"
          >
            Return to Homepage
          </button>
          <button
            onClick={() => navigate('/financial-calculators')}
            className="px-4 py-2 text-xs font-semibold text-[#17231C] bg-[#F4F8F5] hover:bg-[#E5F5EB] border border-[#E3EBE5] rounded-xl transition-colors cursor-pointer"
          >
            Browse All Calculators
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17231C]">
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      <Footer onOpenSitemap={() => setSitemapOpen(true)} />
      <CookieConsent />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <SitemapModal
        isOpen={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <CurrencyProvider>
        <AppContent />
      </CurrencyProvider>
    </RouterProvider>
  );
}
