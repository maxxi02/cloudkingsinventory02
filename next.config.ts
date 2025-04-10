import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'assets.aceternity.com',
      'cdn.discordapp.com',
      'avatars.githubusercontent.com',
    ],
  },
};

export default nextConfig;
