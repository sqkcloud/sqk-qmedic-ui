const OHIF = (process.env.OHIF_VIEWER_URL || 'http://localhost:3001').replace(/\/$/, '');
const DCM4CHEE = (process.env.DCM4CHEE_BASE_URL || 'http://localhost:8080/dcm4chee-arc').replace(/\/$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Keep /viewer prefix all the way through
      { source: '/viewer', destination: `${OHIF}/viewer/` },
      { source: '/viewer/:path*', destination: `${OHIF}/viewer/:path*` },

      // DICOMweb proxy
      { source: '/dicomweb', destination: `${DCM4CHEE}` },
      { source: '/dicomweb/:path*', destination: `${DCM4CHEE}/:path*` },

      // existing dcm4chee REST proxy
      { source: '/api/dcm4chee/:path*', destination: `${DCM4CHEE}/:path*` },
    ];
  },

  webpack(config) {
    // Prevent Next from trying to compile the OHIF monorepo source
    config.watchOptions = {
      ...(config.watchOptions || {}),
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/ohif-app/Viewers/**',
      ],
    };
    return config;
  },
};

module.exports = nextConfig;
