/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  ...(isDev ? {} : { output: 'export' }),
  images: {
    unoptimized: true,
  },
  experimental: {
    agentUpgrade: 'security',
  },
  ...(isDev
    ? {
        async redirects() {
          return [
            {
              source: '/',
              destination: '/de',
              permanent: false,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
