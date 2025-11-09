import { createClient, RedisClientType } from 'redis';
import config from './index';
import logger from '../utils/logger';

class RedisClient {
  private client: RedisClientType | null = null;

  /**
   * Initialize Redis connection
   */
  async connect(): Promise<void> {
    try {
      const redisConfig: any = {
        socket: {
          host: config.redis.host,
          port: config.redis.port,
        },
        database: config.redis.db,
      };

      // Add password if configured
      if (config.redis.password) {
        redisConfig.password = config.redis.password;
      }

      this.client = createClient(redisConfig);

      // Error handler
      this.client.on('error', (err) => {
        logger.error('Redis client error:', err);
      });

      // Connect handler
      this.client.on('connect', () => {
        logger.info('Redis client connecting...');
      });

      // Ready handler
      this.client.on('ready', () => {
        logger.info('Redis client ready');
      });

      // Reconnecting handler
      this.client.on('reconnecting', () => {
        logger.warn('Redis client reconnecting...');
      });

      await this.client.connect();
      
      // Test connection
      await this.client.ping();
      
      logger.info('Redis connection established successfully');
    } catch (error) {
      logger.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  /**
   * Get Redis client instance
   */
  getClient(): RedisClientType {
    if (!this.client) {
      throw new Error('Redis client not initialized. Call connect() first.');
    }
    return this.client;
  }

  /**
   * Set a key-value pair with optional expiration
   */
  async set(key: string, value: string, expirationSeconds?: number): Promise<void> {
    if (!this.client) {
      throw new Error('Redis client not initialized. Call connect() first.');
    }

    try {
      if (expirationSeconds) {
        await this.client.setEx(key, expirationSeconds, value);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      logger.error('Redis SET error:', { key, error });
      throw error;
    }
  }

  /**
   * Get a value by key
   */
  async get(key: string): Promise<string | null> {
    if (!this.client) {
      throw new Error('Redis client not initialized. Call connect() first.');
    }

    try {
      return await this.client.get(key);
    } catch (error) {
      logger.error('Redis GET error:', { key, error });
      throw error;
    }
  }

  /**
   * Delete a key
   */
  async del(key: string): Promise<void> {
    if (!this.client) {
      throw new Error('Redis client not initialized. Call connect() first.');
    }

    try {
      await this.client.del(key);
    } catch (error) {
      logger.error('Redis DEL error:', { key, error });
      throw error;
    }
  }

  /**
   * Check if a key exists
   */
  async exists(key: string): Promise<boolean> {
    if (!this.client) {
      throw new Error('Redis client not initialized. Call connect() first.');
    }

    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      logger.error('Redis EXISTS error:', { key, error });
      throw error;
    }
  }

  /**
   * Set expiration on a key
   */
  async expire(key: string, seconds: number): Promise<void> {
    if (!this.client) {
      throw new Error('Redis client not initialized. Call connect() first.');
    }

    try {
      await this.client.expire(key, seconds);
    } catch (error) {
      logger.error('Redis EXPIRE error:', { key, error });
      throw error;
    }
  }

  /**
   * Close Redis connection
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.client = null;
      logger.info('Redis connection closed');
    }
  }
}

// Export singleton instance
export default new RedisClient();
