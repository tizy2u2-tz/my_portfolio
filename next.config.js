/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/my_portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my_portfolio/' : '',
  trailingSlash: true,
};

module.exports = nextConfig;
