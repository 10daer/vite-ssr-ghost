
  
  // index.js - Main Application
  const express = require('express');
  const { ProductMatcher } = require('./ProductMatcher');
  const StorisConnection = require('./config/database');
  const StorisProductService = require('./services/StorisProductService');
  
  const app = express();
  const port = process.env.PORT || 3000;
  
  // Initialize services
  const storisConnection = new StorisConnection();
  const productService = new StorisProductService(storisConnection);
  const productMatcher = new ProductMatcher();
  
  // Middleware
  app.use(express.json());
  
  // Setup synchronization
  async function syncProducts() {
    try {
      await storisConnection.connect();
      const products = await productService.fetchProducts();
      
      // Clear existing products and add new ones
      productMatcher.products = [];
      products.forEach(product => productMatcher.addProduct(product));
      
      logger.info(`Synced ${products.length} products from STORIS`);
    } catch (error) {
      logger.error('Sync error:', error);
    }
  }
  
  // API Endpoints
  app.get('/api/products', async (req, res) => {
    try {
      const products = await productService.fetchProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/api/matches/:productId', async (req, res) => {
    try {
      const product = productMatcher.products.find(p => p.id === req.params.productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const matches = productMatcher.findCompatibleProducts(product);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Sync products every hour
  setInterval(syncProducts, 3600000);
  
  // Initial sync on startup
  syncProducts().then(() => {
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  });