import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  canonicalUrl: string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const normalizePath = (raw: string): string => {
  if (!raw) return '/';
  let clean = raw.split('?')[0].split('#')[0];
  if (!clean.startsWith('/')) clean = '/' + clean;
  // keep trailing slash standard or without trailing slash
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean || '/';
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const navigate = useCallback((to: string) => {
    const clean = normalizePath(to);
    if (clean === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', clean);
    setPath(clean);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);

  useEffect(() => {
    const handlePopState = () => {
      setPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const canonicalUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${path === '/' ? '' : path}`
    : `https://fincelio.com${path === '/' ? '' : path}`;

  return (
    <RouterContext.Provider value={{ path, navigate, canonicalUrl }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
