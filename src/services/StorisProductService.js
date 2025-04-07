  class StorisProductService {
    constructor(storisConnection) {
      this.connection = storisConnection;
    }
  
    async fetchProducts() {
      const sql = `
        SELECT 
          item.item-num AS id,
          item.description AS name,
          item.category AS type,
          item.size AS size,
          item.material,
          price.amount AS price,
          item.sku
        FROM 
          PUB.item
        LEFT JOIN 
          PUB.price ON item.item-num = price.item-num
        WHERE 
          item.status = 'ACTIVE'
      `;
  
      try {
        const products = await this.connection.query(sql);
        return this.transformProducts(products);
      } catch (error) {
        logger.error('Error fetching products:', error);
        throw error;
      }
    }
  
    transformProducts(storisProducts) {
      return storisProducts.map(product => ({
        id: product.id.trim(),
        name: product.name.trim(),
        type: this.mapProductType(product.type),
        size: this.mapSize(product.size),
        material: product.material.trim(),
        price: parseFloat(product.price),
        sku: product.sku.trim(),
        attributes: this.extractAttributes(product)
      }));
    }
  
    mapProductType(storisCategory) {
      const categoryMap = {
        'MAT': ProductType.MATTRESS,
        'BED': ProductType.BEDFRAME,
        'HDR': ProductType.HEADBOARD,
        'FDN': ProductType.FOUNDATION
      };
      return categoryMap[storisCategory] || storisCategory;
    }
  
    mapSize(storisSize) {
      const sizeMap = {
        'TW': Size.TWIN,
        'TXL': Size.TWIN_XL,
        'FL': Size.FULL,
        'QN': Size.QUEEN,
        'KG': Size.KING,
        'CK': Size.CAL_KING
      };
      return sizeMap[storisSize] || storisSize;
    }
  
    extractAttributes(product) {
      // Extract additional attributes based on STORIS data structure
      return {
        department: product.department?.trim(),
        vendor: product.vendor?.trim(),
        style: product.style?.trim(),
        // Add other relevant attributes
      };
    }
  }