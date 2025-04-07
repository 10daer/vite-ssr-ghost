import compression from "compression";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderPage } from "vite-plugin-ssr";

// For development with Vite
const isProduction = process.env.NODE_ENV === "production";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

startServer();

async function startServer() {
  const app = express();

  // Compression for better performance
  app.use(compression());

  // Serve static files
  if (isProduction) {
    app.use(
      express.static(path.resolve(root, "dist/client"), {
        maxAge: "1y",
      })
    );
  } else {
    // In dev mode, Vite handles static assets
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  // SSR route handler
  app.get("*", async (req, res, next) => {
    try {
      const pageContextInit = {
        urlOriginal: req.originalUrl,
      };

      const pageContext = await renderPage(pageContextInit);
      const { httpResponse } = pageContext;

      if (!httpResponse) {
        return next();
      }

      const { body, statusCode, contentType, earlyHints } = httpResponse;

      if (res.writeEarlyHints) {
        res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
      }

      res.status(statusCode).type(contentType).send(body);
    } catch (error) {
      next(error);
    }
  });

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again later.");
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
