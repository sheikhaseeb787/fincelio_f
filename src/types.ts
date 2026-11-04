export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'INR';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
}

export interface CalculatorMeta {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'business' | 'ecommerce' | 'financial';
  keywords: string[];
  readingTime: string;
  featured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  summary: string;
  sections: {
    heading: string;
    content: string[];
    callout?: string;
  }[];
  relatedCalculatorSlug: string;
}
