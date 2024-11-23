/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // 优化热重载配置
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  // 添加页面扩展名配置
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig 