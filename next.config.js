/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Disable server-side features
  reactStrictMode: true,
  experimental: {
    // Disable static generation
    appDir: true,
  },
  // Force client-side rendering
  runtime: 'client',
};

module.exports = nextConfig;
