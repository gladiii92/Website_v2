import { notFound } from 'next/navigation';
import StoneClient from '@/components/StoneClient';
import { gemstones } from '../../../../data/Gemstones';

export function generateStaticParams() {
  const languages = ['de', 'en', 'fr'];
  const params = [];

  for (const lang of languages) {
    for (const stone of gemstones) {
      if (stone.slug) {
        params.push({ lang, slug: stone.slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  const slug = (await params).slug;

  const stone = gemstones.find((s) => s.slug === slug);
  if (!stone) return {};

  const title = `${stone.name} | NobleCutGems`;
  const description = stone[`description_${lang}`] ? stone[`description_${lang}`].substring(0, 160) : 'Entdecken Sie exklusive Edelsteine bei NobleCutGems.';
  const url = `https://www.noblecutgems.com/${lang}/stone/${slug}`;
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'NobleCutGems',
      images: stone.main_image_url ? [
        {
          url: `https://www.noblecutgems.com${stone.main_image_url}`,
        },
      ] : [],
      locale: lang,
      type: 'article',
    },
  };
}

export default async function StonePage({ params }) {
  const lang = (await params).lang;
  const slug = (await params).slug;
  
  const stone = gemstones.find((s) => s.slug === slug);
  if (!stone) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: stone.name,
    image: stone.main_image_url ? `https://www.noblecutgems.com${stone.main_image_url}` : undefined,
    description: stone[`description_${lang}`],
    offers: {
      '@type': 'Offer',
      url: `https://www.noblecutgems.com/${lang}/stone/${slug}`,
      priceCurrency: 'EUR',
      price: stone.price_eur,
      availability: stone.is_sold ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoneClient lang={lang} slug={slug} />
    </>
  );
}

