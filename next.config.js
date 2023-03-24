/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "next/font/google", options: { subsets: ["latin"] } },
    ],
    images: {
      domains: ["s3.us-west-2.amazonaws.com"],
    },
  },
};

module.exports = nextConfig;
