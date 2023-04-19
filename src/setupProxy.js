const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://118.67.130.33:8000",
      changeOrigin: true,
      secure: true
    })
  );
};
