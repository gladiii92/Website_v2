import '../../index.css'; // Global styles

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }, { lang: 'fr' }];
}

import LayoutClient from '@/components/LayoutClient';

export default async function RootLayout({ children, params }) {
  return (
    <html lang={(await params).lang}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <LayoutClient lang={(await params).lang}>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}


