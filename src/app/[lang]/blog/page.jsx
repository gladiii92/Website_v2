import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from '@/lib/blog';

const blogTitles = {
  de: {
    title: 'Edelstein Lexikon & Blog | NobleCutGems',
    heading: 'Edelstein Lexikon & Blog',
    subheading: 'Wissen und Insights direkt von unseren gemmologischen Experten',
  },
  en: {
    title: 'Gemstone Journal & Guide | NobleCutGems',
    heading: 'Gemstone Journal & Guide',
    subheading: 'Expert insights, origin guides and untreated gemstone knowledge',
  },
  fr: {
    title: 'Guide & Blog des Pierres Précieuses | NobleCutGems',
    heading: 'Guide & Blog des Pierres Précieuses',
    subheading: 'Savoir et insights rédigés par nos experts gemmologues',
  },
};

export function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }, { lang: 'fr' }];
}

export async function generateMetadata({ params }) {
  const lang = (await params).lang;
  const t = blogTitles[lang] || blogTitles.de;

  return {
    title: t.title,
    description: t.subheading,
    alternates: {
      canonical: `https://www.noblecutgems.com/${lang}/blog`,
      languages: {
        de: 'https://www.noblecutgems.com/de/blog',
        en: 'https://www.noblecutgems.com/en/blog',
        fr: 'https://www.noblecutgems.com/fr/blog',
        'x-default': 'https://www.noblecutgems.com/en/blog',
      },
    },
    openGraph: {
      title: t.title,
      description: t.subheading,
      url: `https://www.noblecutgems.com/${lang}/blog`,
      siteName: 'NobleCutGems',
      locale: lang,
      type: 'website',
    },
  };
}

export default async function BlogIndex({ params }) {
  const lang = (await params).lang;
  const posts = getSortedPostsData(lang);
  const t = blogTitles[lang] || blogTitles.de;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="serif-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t.heading}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {t.subheading}
          </p>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--primary-color)' }} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(({ id, date, title, excerpt, cover }) => (
            <Link key={id} href={`/${lang}/blog/${id}`}>
              <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {cover && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={cover} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{date}</p>
                  <h3 className="serif-heading text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
