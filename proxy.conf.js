module.exports = {
  '/api/dcm4chee': {
    target: process.env.DCM4CHEE_BASE_URL || 'http://localhost:8080/dcm4chee-arc',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api/dcm4chee': '',
    },
  },
  '/dicomweb': {
    target: process.env.DCM4CHEE_BASE_URL || 'http://localhost:8080/dcm4chee-arc',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/dicomweb': '',
    },
  },
  '/viewer': {
    target: process.env.OHIF_VIEWER_URL || 'http://localhost:3001',
    secure: false,
    changeOrigin: true,
    // Keep the /viewer basename so OHIF assets resolve under /viewer/*.
  },
};
