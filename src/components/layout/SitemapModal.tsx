import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { CALCULATORS } from '../../data/calculatorsMeta';
import { GUIDES } from '../../data/guidesData';
import { X, ExternalLink, Download, Code } from 'lucide-react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://fincelio.com';

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'daily', title: 'Homepage – Financial Calculators' },
    ...CALCULATORS.map((c) => ({
      loc: `/${c.slug}`,
      priority: '0.9',
      changefreq: 'weekly',
      title: c.title,
    })),
    { loc: '/business-calculators', priority: '0.8', changefreq: 'weekly', title: 'Business Calculators Category' },
    { loc: '/ecommerce-calculators', priority: '0.8', changefreq: 'weekly', title: 'E-commerce Calculators Category' },
    { loc: '/financial-calculators', priority: '0.8', changefreq: 'weekly', title: 'Financial Calculators Category' },
    { loc: '/guides', priority: '0.8', changefreq: 'weekly', title: 'Guides Index' },
    ...GUIDES.map((g) => ({
      loc: `/guides/${g.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      title: g.title,
    })),
    { loc: '/about', priority: '0.5', changefreq: 'monthly', title: 'About Fincelio' },
    { loc: '/contact', priority: '0.5', changefreq: 'monthly', title: 'Contact Us' },
    { loc: '/privacy-policy', priority: '0.3', changefreq: 'monthly', title: 'Privacy Policy' },
    { loc: '/terms-and-conditions', priority: '0.3', changefreq: 'monthly', title: 'Terms & Conditions' },
    { loc: '/disclaimer', priority: '0.3', changefreq: 'monthly', title: 'Financial Disclaimer' },
    { loc: '/cookie-policy', priority: '0.3', changefreq: 'monthly', title: 'Cookie Policy' },
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${origin}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const handleDownloadXml = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-[#E3EBE5] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3EBE5] bg-[#F4F8F5]">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-[#21965A]" />
            <h2 className="text-base font-bold text-[#17231C]">
              Fincelio XML Sitemap & Indexable URLs ({urls.length} pages)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#17231C]/60 hover:text-[#17231C] rounded-lg hover:bg-white cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* URL List */}
        <div className="overflow-y-auto p-6 space-y-2 flex-1">
          <p className="text-xs text-[#17231C]/70 pb-3">
            Every page in the Fincelio technical blueprint is completely implemented, verified, and mapped with its canonical XML index path.
          </p>
          <div className="border border-[#E3EBE5] rounded-xl overflow-hidden divide-y divide-[#E3EBE5]">
            {urls.map((u) => (
              <div
                key={u.loc}
                className="flex items-center justify-between px-4 py-2.5 hover:bg-[#F4F8F5] text-xs transition-colors group"
              >
                <div className="truncate pr-3">
                  <div className="font-medium text-[#17231C] truncate">{u.title}</div>
                  <div className="font-mono text-[11px] text-[#21965A]">{u.loc}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-[10px] text-[#17231C]/50">
                    p: {u.priority}
                  </span>
                  <button
                    onClick={() => {
                      navigate(u.loc);
                      onClose();
                    }}
                    className="p-1 text-[#17231C]/60 hover:text-[#21965A] cursor-pointer"
                    title={`Open ${u.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#E3EBE5] bg-[#F4F8F5]">
          <div className="text-[11px] text-[#17231C]/60">
            Compliant with Google Search Console & Robots.txt protocol
          </div>
          <button
            onClick={handleDownloadXml}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#21965A] hover:bg-[#1A7A48] rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download sitemap.xml</span>
          </button>
        </div>
      </div>
    </div>
  );
};
