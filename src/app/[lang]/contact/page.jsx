import ContactClient from '@/components/ContactClient';

export async function generateMetadata({ params }) {
  const titles = {
    de: {
      About: 'Über uns | NobleCutGems',
      AGB: 'AGB | NobleCutGems',
      Contact: 'Kontakt | NobleCutGems',
      Datenschutz: 'Datenschutz | NobleCutGems',
      Impressum: 'Impressum | NobleCutGems'
    },
    en: {
      About: 'About Us | NobleCutGems',
      AGB: 'Terms | NobleCutGems',
      Contact: 'Contact | NobleCutGems',
      Datenschutz: 'Privacy Policy | NobleCutGems',
      Impressum: 'Imprint | NobleCutGems'
    },
    fr: {
      About: 'À propos | NobleCutGems',
      AGB: 'CGV | NobleCutGems',
      Contact: 'Contact | NobleCutGems',
      Datenschutz: 'Confidentialité | NobleCutGems',
      Impressum: 'Mentions Légales | NobleCutGems'
    }
  };

  const title = titles[(await params).lang]?.['Contact'] || titles.de['Contact'];
  
  return {
    title,
    alternates: {
      canonical: `https://www.noblecutgems.com/${(await params).lang}/contact`,
      languages: {
        de: 'https://www.noblecutgems.com/de/contact',
        en: 'https://www.noblecutgems.com/en/contact',
        fr: 'https://www.noblecutgems.com/fr/contact',
        'x-default': 'https://www.noblecutgems.com/en/contact',
      },
    },
    openGraph: {
      title,
      url: `https://www.noblecutgems.com/${(await params).lang}/contact`,
      locale: (await params).lang,
    }
  };
}

import React, { Suspense } from 'react';

export default async function Page({ params }) {
  return (
    <Suspense fallback={<div className="min-h-screen py-24" />}>
      <ContactClient lang={(await params).lang} />
    </Suspense>
  );
}

