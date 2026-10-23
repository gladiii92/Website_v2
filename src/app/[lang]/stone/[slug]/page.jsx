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
    mpn: `NCG-${stone.id}`,
    brand: {
      '@type': 'Brand',
      name: 'NobleCutGems',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.noblecutgems.com/${lang}/stone/${slug}`,
      priceCurrency: 'EUR',
      price: stone.price_eur,
      priceValidUntil: '2027-12-31',
      availability: stone.is_sold ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'NobleCutGems',
      },
      shippingDetails: [
        {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '10.00',
            currency: 'EUR',
          },
          shippingDestination: [
            { '@type': 'DefinedRegion', addressCountry: 'DE' },
          ],
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 2,
              maxValue: 4,
              unitCode: 'DAY',
            },
          },
        },
        {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '20.00',
            currency: 'EUR',
          },
          shippingDestination: [
            { '@type': 'DefinedRegion', addressCountry: 'AT' },
            { '@type': 'DefinedRegion', addressCountry: 'CH' },
            { '@type': 'DefinedRegion', addressCountry: 'FR' },
            { '@type': 'DefinedRegion', addressCountry: 'IT' },
            { '@type': 'DefinedRegion', addressCountry: 'NL' },
            { '@type': 'DefinedRegion', addressCountry: 'BE' },
            { '@type': 'DefinedRegion', addressCountry: 'ES' },
          ],
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 3,
              maxValue: 7,
              unitCode: 'DAY',
            },
          },
        },
        {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '50.00',
            currency: 'EUR',
          },
          shippingDestination: [
            { '@type': 'DefinedRegion', addressCountry: 'US' },
            { '@type': 'DefinedRegion', addressCountry: 'CA' },
            { '@type': 'DefinedRegion', addressCountry: 'GB' },
            { '@type': 'DefinedRegion', addressCountry: 'AU' },
          ],
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 3,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 7,
              maxValue: 21,
              unitCode: 'DAY',
            },
          },
        },
      ],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: ['DE', 'AT', 'CH', 'FR', 'US', 'GB'],
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnShippingFees',
      },
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
