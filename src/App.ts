import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";
const app = express();
const PORT = 4000;

const optionsAdminBe = {
  target: `http://localhost:${PORT + 4}`,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "/fleet/api",  // rewrite /api → /fleet/api
  },
}


// Morgan Middleware for logging
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json(`common gate way run at port ${PORT}`);
});

app.use(
  "/fleet",
  createProxyMiddleware(optionsAdminBe),
);

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
