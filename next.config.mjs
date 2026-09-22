/** @type {import('next').NextConfig} */
const nextConfig = {
  // 把你的區域網路 IP 加入白名單
  allowedDevOrigins: ['192.168.1.116'],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;