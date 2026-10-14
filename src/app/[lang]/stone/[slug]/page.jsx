import { notFound } from 'next/navigation';
import StoneClient from '@/components/StoneClient';
import { gemstones } from '../../../../data/Gemstones';

function stripHtml(htmlString) {
  if (!htmlString) return '';
  return htmlString
    .replace(/<[^>]*>?/gm, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

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

  const title = `${stone.name} (${stone.carat_weight}ct) | NobleCutGems`;
  const rawDescription = stone[`description_${lang}`] || stone.description_de || 'Entdecken Sie exklusive Edelsteine bei NobleCutGems.';
  const description = stripHtml(rawDescription).substring(0, 160);
  const url = `https://www.noblecutgems.com/${lang}/stone/${slug}`;
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'de': `https://www.noblecutgems.com/de/stone/${slug}`,
        'en': `https://www.noblecutgems.com/en/stone/${slug}`,
        'fr': `https://www.noblecutgems.com/fr/stone/${slug}`,
        'x-default': `https://www.noblecutgems.com/en/stone/${slug}`,
      },
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
    description: stripHtml(stone[`description_${lang}`] || stone.description_de || ''),
    sku: `NCG-${stone.id}`,
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
