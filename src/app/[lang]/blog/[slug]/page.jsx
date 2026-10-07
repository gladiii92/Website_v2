import { getPostData, getSortedPostsData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

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

export default async function BlogPost({ params }) {
  const { lang, slug } = await params;
  const postData = await getPostData(slug, lang);

  if (!postData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link 
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
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

