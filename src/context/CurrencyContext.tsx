import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, CurrencyCode } from '../types';

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', locale: 'en-CA' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatMoney: (amount: number, options?: { decimals?: number; showSymbol?: boolean }) => string;
  formatPercent: (val: number, decimals?: number) => string;
  formatNumber: (val: number, decimals?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currencyCode, setCurrencyCodeState] = useState<CurrencyCode>('USD');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fincelio_currency') as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        setCurrencyCodeState(saved);
      }
    } catch {
      // LocalStorage access may fail in isolated iframes
    }
  }, []);

  const setCurrencyCode = (code: CurrencyCode) => {
    setCurrencyCodeState(code);
    try {
      localStorage.setItem('fincelio_currency', code);
    } catch {
      // ignore
    }
  };

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const formatMoney = (
    amount: number,
    options?: { decimals?: number; showSymbol?: boolean }
  ): string => {
    if (!Number.isFinite(amount)) return `${currency.symbol}0.00`;
    const decimals = options?.decimals ?? (currency.code === 'JPY' ? 0 : 2);
    const showSymbol = options?.showSymbol ?? true;

    const formattedNum = new Intl.NumberFormat(currency.locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);

    return showSymbol ? `${currency.symbol}${formattedNum}` : formattedNum;
  };

  const formatPercent = (val: number, decimals = 2): string => {
    if (!Number.isFinite(val)) return '0.00%';
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(val);
    return `${formatted}%`;
  };

  const formatNumber = (val: number, decimals = 0): string => {
    if (!Number.isFinite(val)) return '0';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(val);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrencyCode,
        formatMoney,
        formatPercent,
        formatNumber,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
