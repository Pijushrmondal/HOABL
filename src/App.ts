import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";

const app = express();
const PORT = 9000;
const target = "http://localhost:4001";

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Gateway running ✅");
});

// Proxy main consumer API - preserve full path
// When Express matches /consumer/api, it strips the prefix before passing to middleware
// So we need to add it back with pathRewrite
app.use(
  "/consumer/api",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    // Add back the /consumer/api prefix that Express strips
    // path will be like "/docs" or "/docs/swagger-ui.css" after Express strips the prefix
    pathRewrite: (path, req) => {
      return `/consumer/api${path}`;
    },
  }),
);

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
