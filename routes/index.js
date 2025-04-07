// src/routes/index.js
export const routes = [
  { path: "/", component: () => import("../pages/Home") },
  { path: "/about", component: () => import("../pages/About") },
  { path: "/blog", component: () => import("../pages/Blog") },
  { path: "/blog/:slug", component: () => import("../pages/Post") },
];
