const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://portfolio-ser.herokuapp.com',
      changeOrigin: true,
    })
  );
};