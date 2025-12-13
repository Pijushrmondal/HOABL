import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";

const app = express();
const PORT = 9000;
const servicePort = 4000;
const consumerService = `/consumer/api`;
const consumerTarget = `http://localhost:${servicePort + 1}`;

const consumerOnboardTarget = `http://localhost:${servicePort + 9}`;
const consumerOnboardService = `/consumer/onboarding/api`;

const adminService = `/fleet/api`;
const adminTarget = `http://localhost:${servicePort + 2}`;

const opsConsumerService = `/ops-consumer/api`;
const opsConsumerTarget = `http://localhost:${servicePort + 5}`;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Gateway running ✅");
});

// app.use(express.json(), (req, res, next) => {
//   // if (req.originalUrl.includes("security-deposit-due")) {
//   const token = req.headers.authorization || req.headers["x-access-token"];
//   console.log("------ Incoming API Call ------");
//   console.log("URL:", req.originalUrl);
//   console.log("Method:", req.method);
//   console.log("Token:", token);
//   console.log("Query Params:", req.query);
//   console.log("Request Body:", req.body);
//   console.log("------------------------------");
//   // console.log(req);
//   // }
//   next();
// });

app.use(
  adminService,
  createProxyMiddleware({
    target: adminTarget,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      return `${adminService}${path}`;
    },
  }),
);

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
app.use(
  consumerOnboardService,
  createProxyMiddleware({
    target: consumerOnboardTarget,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      return `${consumerOnboardService}${path}`;
    },
  }),
);

app.use(
  opsConsumerService,
  createProxyMiddleware({
    target: opsConsumerTarget,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      return `${opsConsumerService}${path}`;
    },
  }),
);

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
