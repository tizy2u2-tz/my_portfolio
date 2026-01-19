/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/my_portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my_portfolio/' : '',
  trailingSlash: true,
};

module.exports = nextConfig;
