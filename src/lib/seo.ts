export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  schema?: Record<string, unknown>;
}

export function updateDocumentSeo(config: PageSeoConfig) {
  if (typeof document === 'undefined') return;

  // Title
  document.title = config.title;

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // OpenGraph title & description
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', config.title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', config.description);

  let twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', config.title);

  let twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', config.description);

  // Canonical tag
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const origin = window.location.origin;
  canonical.setAttribute('href', `${origin}${config.canonicalPath}`);

  // JSON-LD Structured Data
  let script = document.getElementById('fincelio-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'fincelio-jsonld';
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }

  const structuredData = config.schema || {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Fincelio Financial Calculators',
    url: `${origin}${config.canonicalPath}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description: config.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  script.textContent = JSON.stringify(structuredData);
}
