import AboutClient from '@/components/AboutClient';

export async function generateMetadata({ params }) {
  const titles = {
    de: {
      About: 'Über uns | NobleCutGems',
      AboutDesc: 'Erfahren Sie mehr über NobleCutGems, unsere Leidenschaft für exquisite Edelsteine und unser Engagement für Qualität.',
      AGB: 'AGB | NobleCutGems',
      Contact: 'Kontakt | NobleCutGems',
      Datenschutz: 'Datenschutz | NobleCutGems',
      Impressum: 'Impressum | NobleCutGems'
    },
    en: {
      About: 'About Us | NobleCutGems',
      AboutDesc: 'Learn more about NobleCutGems, our passion for exquisite gemstones, and our commitment to quality and ethical sourcing.',
      AGB: 'Terms | NobleCutGems',
      Contact: 'Contact | NobleCutGems',
      Datenschutz: 'Privacy Policy | NobleCutGems',
      Impressum: 'Imprint | NobleCutGems'
    },
    fr: {
      About: 'À propos | NobleCutGems',
      AboutDesc: 'En savoir plus sur NobleCutGems, notre passion pour les pierres précieuses exquises et notre engagement envers la qualité.',
      AGB: 'CGV | NobleCutGems',
      Contact: 'Contact | NobleCutGems',
      Datenschutz: 'Confidentialité | NobleCutGems',
      Impressum: 'Mentions Légales | NobleCutGems'
    }
  };

  const title = titles[(await params).lang]?.['About'] || titles.de['About'];
  const description = titles[(await params).lang]?.['AboutDesc'] || titles.de['AboutDesc'];
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.noblecutgems.com/${(await params).lang}/about`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.noblecutgems.com/${(await params).lang}/about`,
      locale: (await params).lang,
    }
  };
}

export default async function Page({ params }) {
  return <AboutClient lang={(await params).lang} />;
}

