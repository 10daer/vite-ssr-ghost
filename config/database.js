  require('dotenv').config();
  const odbc = require('node-odbc');
  const winston = require('winston');
  
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  
  class StorisConnection {
    constructor() {
      this.connectionString = process.env.PROGRESS_CONNECTION_STRING;
      this.connection = null;
    }
  
    async connect() {
      try {
        this.connection = await new Promise((resolve, reject) => {
          odbc.connect(this.connectionString, (error, connection) => {
            if (error) {
              logger.error('Connection error:', error);
              reject(error);
            }
            resolve(connection);
          });
        });
        logger.info('Successfully connected to STORIS database');
        return true;
      } catch (error) {
        logger.error('Failed to connect to STORIS:', error);
        throw error;
      }
    }
  
    async query(sql, params = []) {
      try {
        const result = await new Promise((resolve, reject) => {
          this.connection.query(sql, params, (error, result) => {
            if (error) reject(error);
            resolve(result);
          });
        });
        return result;
      } catch (error) {
        logger.error('Query error:', error);
        throw error;
      }
    }
  }