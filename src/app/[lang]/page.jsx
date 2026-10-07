import { notFound } from 'next/navigation';
import HomeClient from '@/components/HomeClient';

export function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }, { lang: 'fr' }];
}

const siteTranslations = {
  de: {
    title: 'NobleCutGems - Exquisite Edelsteine',
    description: 'Entdecken Sie unsere sorgfältig kuratierte Kollektion seltener und außergewöhnlicher Edelsteine, jeder einzelne handverlesen für seine einzigartige Schönheit und Perfektion.',
  },
  en: {
    title: 'NobleCutGems - Exquisite Gemstones',
    description: 'Discover our carefully curated collection of rare and exceptional gemstones, each handpicked for its unique beauty and perfection.',
  },
  fr: {
    title: 'NobleCutGems - Pierres précieuses exquises',
    description: 'Découvrez notre collection soigneusement sélectionnée de pierres précieuses rares et exceptionnelles, chacune choisie pour sa beauté unique et sa perfection.',
  }
};

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  const t = siteTranslations[lang];
  if (!t) return {};

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `https://www.noblecutgems.com/${lang}`,
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://www.noblecutgems.com/${lang}`,
      siteName: 'NobleCutGems',
      images: [
        {
          url: 'https://www.noblecutgems.com/images/banner.jpg',
          width: 1200,
          height: 630,
        },
      ],
      locale: lang,
      type: 'website',
    },
  };
}

export default async function Page({ params }) {
  const lang = (await params).lang;
  
  if (!siteTranslations[lang]) {
    notFound();
  }

  const t = siteTranslations[lang];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'NobleCutGems',
      url: `https://www.noblecutgems.com/${lang}`,
      description: t.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.noblecutgems.com/{search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'NobleCutGems',
      image: 'https://www.noblecutgems.com/images/Logo.jpg',
      email: 'info@noblecutgems.com',
      telephone: '+4915168482909',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Erlenstegenstraße 80',
        addressLocality: 'Nürnberg',
        postalCode: '90491',
        addressCountry: 'DE'
      },
      url: `https://www.noblecutgems.com/${lang}`
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient lang={lang} />
    </>
  );
}

