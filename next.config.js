/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove reactCompiler for now to avoid issues
  async rewrites() {
    return [
      {
        source: '/api/fish/:path*',
        destination: 'http://127.0.0.1:8000/:path*', // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig