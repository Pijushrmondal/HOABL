import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";

const app = express();
const PORT = 9000;
const servicePort = 4000;
const consumerTarget = `http://localhost:${servicePort + 1}`;
const consumerService = `/consumer/api`;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Gateway running ✅");
});

app.use(
  consumerService,
  createProxyMiddleware({
    target: consumerTarget,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      return `${consumerService}${path}`;
    },
  }),
);

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
