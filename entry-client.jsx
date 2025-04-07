import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PageContextProvider } from "./hooks/usePageContext";
import "./styles/global.css";

// This is the entry point for client-side hydration
export async function render(pageContext) {
  const { Page, pageProps } = pageContext;

  ReactDOM.hydrateRoot(
    document.getElementById("app"),
    <PageContextProvider pageContext={pageContext}>
      <App>
        <Page {...pageProps} />
      </App>
    </PageContextProvider>
  );
}

// For client-side navigation
export const clientRouting = true;
export const hydrationCanBeAborted = true;

// Prefetch strategy to improve performance
export function prefetchStaticAssets() {
  if (import.meta.env.PROD) {
    // Prefetch critical assets
    const prefetchLinks = document.querySelectorAll('link[rel="prefetch"]');
    prefetchLinks.forEach((link) => {
      if (link.getAttribute("href")) {
        const img = new Image();
        img.src = link.getAttribute("href");
      }
    });
  }
}
