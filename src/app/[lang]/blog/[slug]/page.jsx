import { getPostData, getSortedPostsData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const backLabels = {
  de: 'Zurück zur Übersicht',
  en: 'Back to Overview',
  fr: 'Retour aux articles',
};

export async function generateStaticParams() {
  const params = [];
  const langs = ['de', 'en', 'fr'];
  for (const lang of langs) {
    const posts = getSortedPostsData(lang);
    for (const post of posts) {
      params.push({ lang, slug: post.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const postData = await getPostData(slug, lang);

  if (!postData) return {};

  const title = `${postData.title} | NobleCutGems`;
  const description = postData.excerpt || postData.title;
  const url = `https://www.noblecutgems.com/${lang}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        de: `https://www.noblecutgems.com/de/blog/${slug}`,
        en: `https://www.noblecutgems.com/en/blog/${slug}`,
        fr: `https://www.noblecutgems.com/fr/blog/${slug}`,
        'x-default': `https://www.noblecutgems.com/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'NobleCutGems',
      images: postData.cover ? [{ url: `https://www.noblecutgems.com${postData.cover}` }] : [],
      locale: lang,
      type: 'article',
    },
  };
}

export default async function BlogPost({ params }) {
  const { lang, slug } = await params;
  const postData = await getPostData(slug, lang);

  if (!postData) {
    notFound();
  }

  const backText = backLabels[lang] || backLabels.de;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link 
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          {backText}
        </Link>
        
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="serif-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {postData.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-12">
            <span>{postData.date}</span>
            <span>•</span>
            <span>{postData.author}</span>
          </div>
          
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} className="text-gray-700 dark:text-gray-300 leading-relaxed" />
        </article>
      </div>
    </main>
  );
}
