import { notFound } from 'next/navigation';
import CollectionClient from '@/components/CollectionClient';

const translations = {
  de: {
    collectiontitle: 'Unsere Kollektion | NobleCutGems',
    collectionsubtitle: 'Entdecken Sie außergewöhnliche Edelsteine aus aller Welt',
  },
  en: {
    collectiontitle: 'Our Collection | NobleCutGems',
    collectionsubtitle: 'Discover exceptional gemstones from around the world',
  },
  fr: {
    collectiontitle: 'Notre Collection | NobleCutGems',
    collectionsubtitle: 'Découvrez des pierres précieuses exceptionnelles du monde entier',
  },
};

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  const t = translations[lang];
  if (!t) return {};

  return {
    title: t.collectiontitle,
    description: t.collectionsubtitle,
    alternates: {
      canonical: `https://www.noblecutgems.com/${lang}/collection`,
    },
    openGraph: {
      title: t.collectiontitle,
      description: t.collectionsubtitle,
      url: `https://www.noblecutgems.com/${lang}/collection`,
      siteName: 'NobleCutGems',
      locale: lang,
      type: 'website',
    },
  };
}

export default async function CollectionPage({ params }) {
  const lang = (await params).lang;
  
  if (!translations[lang]) {
    notFound();
  }

  const t = translations[lang];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'NobleCutGems Collection',
    url: `https://www.noblecutgems.com/${lang}/collection`,
    description: t.collectionsubtitle,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CollectionClient lang={lang} />
    </>
  );
}

