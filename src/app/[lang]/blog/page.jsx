import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from '@/lib/blog';

export default async function BlogIndex({ params }) {
  const lang = (await params).lang;
  const posts = getSortedPostsData(lang);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="serif-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Edelstein Lexikon & Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Wissen und Insights direkt von unseren Experten
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

