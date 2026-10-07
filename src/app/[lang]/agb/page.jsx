import AGBClient from '@/components/AGBClient';

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

  const title = titles[(await params).lang]?.['AGB'] || titles.de['AGB'];
  
  return {
    title,
    alternates: {
      canonical: `https://www.noblecutgems.com/${(await params).lang}/agb`,
    },
    openGraph: {
      title,
      url: `https://www.noblecutgems.com/${(await params).lang}/agb`,
      locale: (await params).lang,
    }
  };
}

export default async function Page({ params }) {
  return <AGBClient lang={(await params).lang} />;
}

