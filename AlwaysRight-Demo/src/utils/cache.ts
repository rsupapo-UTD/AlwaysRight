import { SalesData, Statistics, TopProduct, OrderStatus } from '../types/dashboard';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class DataCache {
  private static instance: DataCache;
  private cache: Map<string, CacheItem<any>>;
  private readonly DEFAULT_EXPIRY = 5 * 60 * 1000; // 5分钟

  private constructor() {
    this.cache = new Map();
  }

  static getInstance() {
    if (!DataCache.instance) {
      DataCache.instance = new DataCache();
    }
    return DataCache.instance;
  }

  set<T>(key: string, data: T, expiry: number = this.DEFAULT_EXPIRY) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }
}

export const dataCache = DataCache.getInstance(); 