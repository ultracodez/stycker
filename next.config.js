module.exports = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/styckers/:id',
        destination: '/stycker/:id',
        permanent: true
      },
      {
        source: '/stycker',
        destination: '/styckers',
        permanent: true
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vdhyvbckoiirgwehaiiw.supabase.co'
      }
    ]
  }
};
