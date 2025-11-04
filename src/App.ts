import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";
const app = express();
const basePort = 4000;

const consumer = {
  target: `http://localhost:${basePort + 1}`,
  changeOrigin: true,
};

const PORT = 9000;

// Morgan Middleware for logging
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json(`common gate way run at port ${PORT}`);
});

// Proxy paths based on some criteria, e.g., path starts with /api1 goes to port 3000
app.use(
  "/consumer",
  (req, res, next) => {
    // console.log(req);
    next();
  },
  createProxyMiddleware(consumer),
);

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
