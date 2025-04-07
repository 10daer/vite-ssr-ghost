const fs = require("fs");
const path = require("path");

const structure = {
  ".github/workflows": ["deploy.yml"],
  helm: ["Chart.yaml", "values.yaml"],
  "helm/templates": ["deployment.yaml", "service.yaml", "ingress.yaml"],
  public: ["favicon.ico", "robots.txt"],
  "src/assets/fonts": [],
  "src/assets/images": [],
  "src/components/common": ["Button.jsx", "Card.jsx"],
  "src/components/layout": ["Footer.jsx", "Header.jsx", "Layout.jsx"],
  "src/components/ui": ["BlogCard.jsx", "FeaturedPost.jsx"],
  "src/hooks": ["useGhostContent.js"],
  "src/lib": ["ghost.js"],
  "src/pages": ["Home.jsx", "Blog.jsx", "About.jsx", "Post.jsx"],
  "src/routes": ["index.js"],
  "src/styles": ["global.css", "theme.js"],
  src: ["entry-client.jsx", "entry-server.jsx", "App.jsx"],
  server: ["index.js"],
  ".": [
    ".env",
    ".env.example",
    ".gitignore",
    "package.json",
    "vite.config.js",
    "tailwind.config.js",
    "postcss.config.js",
    "README.md",
  ],
};

function createStructure(base, items) {
  for (const [dir, files] of Object.entries(items)) {
    const fullPath = path.join(base, dir);
    fs.mkdirSync(fullPath, { recursive: true });
    for (const file of files) {
      const filePath = path.join(fullPath, file);
      fs.writeFileSync(filePath, "", "utf8");
    }
  }
}

createStructure(process.cwd(), structure);

console.log("Folder structure created successfully.");
