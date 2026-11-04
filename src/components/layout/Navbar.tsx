import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useCurrency, CURRENCIES } from '../../context/CurrencyContext';
import { CurrencyCode } from '../../types';
import { CALCULATORS } from '../../data/calculatorsMeta';
import { Search, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { path, navigate } = useRouter();
  const { currency, setCurrencyCode } = useCurrency();
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Business', href: '/business-calculators' },
    { label: 'E-commerce', href: '/ecommerce-calculators' },
    { label: 'All Calculators', href: '/financial-calculators' },
    { label: 'Guides', href: '/guides' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E3EBE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => {
              navigate('/');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#21965A] rounded-md shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-[#21965A] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              F
            </div>
            <span className="text-xl font-bold tracking-tight text-[#17231C] whitespace-nowrap">
              Fincelio
            </span>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#17231C]/80">
            {navLinks.map((link) => {
              const isActive = path === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => navigate(link.href)}
                  className={`hover:text-[#21965A] transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                    isActive ? 'text-[#21965A] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#21965A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Currency selector & Search CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Currency Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#17231C] bg-[#F4F8F5] border border-[#E3EBE5] rounded-lg hover:border-[#21965A]/50 transition-colors whitespace-nowrap cursor-pointer"
                aria-label="Select currency"
                aria-expanded={currencyDropdownOpen}
              >
                <span className="font-mono font-semibold">{currency.symbol}</span>
                <span className="text-[#17231C]/70">{currency.code}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#17231C]/60" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white border border-[#E3EBE5] rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[11px] font-semibold text-[#17231C]/50 uppercase tracking-wider">
                    Select Currency
                  </div>
                  {Object.values(CURRENCIES).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrencyCode(c.code as CurrencyCode);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left cursor-pointer transition-colors ${
                        c.code === currency.code
                          ? 'bg-[#E5F5EB] text-[#21965A] font-semibold'
                          : 'text-[#17231C] hover:bg-[#F4F8F5]'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="font-mono text-[#17231C]/70">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Search Action */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#17231C] bg-[#F4F8F5] hover:bg-[#E5F5EB] border border-[#E3EBE5] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              title="Search calculators (Press /)"
            >
              <Search className="w-3.5 h-3.5 text-[#21965A]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline text-[10px] bg-white border border-[#E3EBE5] px-1 rounded text-[#17231C]/60">
                /
              </kbd>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#17231C]/80 hover:text-[#21965A] rounded-lg hover:bg-[#F4F8F5] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E3EBE5] bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  navigate(link.href);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  path === link.href
                    ? 'bg-[#E5F5EB] text-[#21965A] font-semibold'
                    : 'text-[#17231C] hover:bg-[#F4F8F5]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E3EBE5]">
            <div className="text-xs font-semibold text-[#17231C]/50 px-3 pb-1">
              Popular Calculators
            </div>
            <div className="grid grid-cols-2 gap-1 pt-1">
              {CALCULATORS.slice(0, 4).map((calc) => (
                <button
                  key={calc.slug}
                  onClick={() => {
                    navigate(`/${calc.slug}`);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-1.5 text-xs text-[#17231C]/80 hover:text-[#21965A] truncate"
                >
                  {calc.shortTitle}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
