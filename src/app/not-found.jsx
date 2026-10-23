'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Gem, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;

    // Intelligent auto-redirect for old un-prefixed routes
    if (path.startsWith('/stone/')) {
      const slug = path.replace('/stone/', '');
      setRedirecting(true);
      window.location.replace(`/de/stone/${slug}`);
      return;
    }

    if (path.startsWith('/edelsteine/')) {
      const slug = path.replace('/edelsteine/', '');
      setRedirecting(true);
      window.location.replace(`/de/stone/${slug}`);
      return;
    }

    if (path.startsWith('/category/')) {
      const cat = path.replace('/category/', '');
      setRedirecting(true);
      window.location.replace(`/de/category/${cat}`);
      return;
    }

    const flatRedirects = {
      '/home': '/de',
      '/Home': '/de',
      '/agb': '/de/agb',
      '/AGB': '/de/agb',
      '/contact': '/de/contact',
      '/Contact': '/de/contact',
      '/about': '/de/about',
      '/About': '/de/about',
      '/collection': '/de/collection',
      '/Collection': '/de/collection',
      '/privacy': '/de/privacy',
      '/datenschutz': '/de/privacy',
      '/imprint': '/de/imprint',
      '/impressum': '/de/imprint',
      '/wishlist': '/de/wishlist'
    };

    if (flatRedirects[path]) {
      setRedirecting(true);
      window.location.replace(flatRedirects[path]);
    }
  }, []);

  if (redirecting) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-zinc-400 text-sm tracking-wide">Weiterleitung zum gewünschten Edelstein...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 shadow-2xl relative">
          <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
          <Gem className="w-9 h-9 text-amber-400" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400/90 font-medium">
            Status 404 • Nicht Gefunden
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white">
            Edelstein nicht auffindbar
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Die von Ihnen aufgerufene Seite oder das gesuchte Unikat existiert unter dieser Adresse nicht mehr oder ist bereits vergeben.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/de/collection"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-medium text-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shadow-lg shadow-amber-500/10"
          >
            <span>Aktuelle Kollektion ansehen</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/de"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-300 hover:text-white font-medium text-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600"
          >
            <Home className="w-4 h-4" />
            <span>Zur Startseite</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

