// Database service using IndexedDB for client-side caching
// In production, replace with Prisma + PostgreSQL/SQLite backend

import type { NewsArticle, Category, PaginatedResponse, SearchParams, SearchResult } from '@/types';

const DB_NAME = 'BrikingNyusDB';
const DB_VERSION = 1;
const STORES = {
  articles: 'articles',
  categories: 'categories',
  searchCache: 'searchCache',
  bookmarks: 'bookmarks',
  history: 'history',
  settings: 'settings',
} as const;

let dbInstance: IDBDatabase | null = null;

export async function initDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORES.articles)) {
        const articleStore = db.createObjectStore(STORES.articles, { keyPath: 'id' });
        articleStore.createIndex('slug', 'slug', { unique: true });
        articleStore.createIndex('category', 'category.slug', { unique: false });
        articleStore.createIndex('publishedAt', 'publishedAt', { unique: false });
        articleStore.createIndex('isFeatured', 'isFeatured', { unique: false });
        articleStore.createIndex('isBreaking', 'isBreaking', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.categories)) {
        db.createObjectStore(STORES.categories, { keyPath: 'slug' });
      }

      if (!db.objectStoreNames.contains(STORES.searchCache)) {
        const searchStore = db.createObjectStore(STORES.searchCache, { keyPath: 'query' });
        searchStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.bookmarks)) {
        db.createObjectStore(STORES.bookmarks, { keyPath: 'articleId' });
      }

      if (!db.objectStoreNames.contains(STORES.history)) {
        const historyStore = db.createObjectStore(STORES.history, { keyPath: 'id', autoIncrement: true });
        historyStore.createIndex('articleId', 'articleId', { unique: false });
        historyStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.settings)) {
        db.createObjectStore(STORES.settings, { keyPath: 'key' });
      }
    };
  });
}

function getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
  if (!dbInstance) throw new Error('Database not initialized');
  return dbInstance.transaction(storeName, mode).objectStore(storeName);
}

// Article operations
export async function saveArticle(article: NewsArticle): Promise<void> {
  const store = getStore(STORES.articles, 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.put(article);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function saveArticles(articles: NewsArticle[]): Promise<void> {
  const store = getStore(STORES.articles, 'readwrite');
  return Promise.all(articles.map(article => 
    new Promise<void>((resolve, reject) => {
      const request = store.put(article);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    })
  )).then(() => {});
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const store = getStore(STORES.articles);
  const index = store.index('slug');
  return new Promise((resolve, reject) => {
    const request = index.get(slug);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function getArticlesByCategory(categorySlug: string, limit: number = 20): Promise<NewsArticle[]> {
  const store = getStore(STORES.articles);
  const index = store.index('category');
  return new Promise((resolve, reject) => {
    const request = index.getAll(categorySlug, limit);
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function getFeaturedArticles(limit: number = 10): Promise<NewsArticle[]> {
  const store = getStore(STORES.articles);
  const index = store.index('isFeatured');
  return new Promise((resolve, reject) => {
    const request = index.getAll(true, limit);
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function getBreakingNews(limit: number = 5): Promise<NewsArticle[]> {
  const store = getStore(STORES.articles);
  const index = store.index('isBreaking');
  return new Promise((resolve, reject) => {
    const request = index.getAll(true, limit);
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function getLatestArticles(limit: number = 20): Promise<NewsArticle[]> {
  const store = getStore(STORES.articles);
  const index = store.index('publishedAt');
  return new Promise((resolve, reject) => {
    const request = index.openCursor(null, 'prev');
    const results: NewsArticle[] = [];
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor && results.length < limit) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function searchArticlesLocal(query: string, params: SearchParams = {}): Promise<SearchResult> {
  const store = getStore(STORES.articles);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const allArticles = request.result || [];
      const lowerQuery = query.toLowerCase();
      
      let filtered = allArticles.filter(article => 
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        article.category.name.toLowerCase().includes(lowerQuery)
      );

      if (params.category) {
        filtered = filtered.filter(a => a.category.slug === params.category);
      }

      if (params.sort === 'popular') {
        filtered.sort((a, b) => b.viewCount - a.viewCount);
      } else if (params.sort === 'trending') {
        filtered.sort((a, b) => b.viewCount / (Date.now() - new Date(b.publishedAt).getTime()) - a.viewCount / (Date.now() - new Date(a.publishedAt).getTime()));
      } else {
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      }

      const page = params.page || 1;
      const limit = params.limit || 12;
      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      resolve({
        articles: paginated,
        total: filtered.length,
        facets: { categories: [], tags: [], sources: [] },
      });
    };
    request.onerror = () => reject(request.error);
  });
}

// Category operations
export async function saveCategories(categories: Category[]): Promise<void> {
  const store = getStore(STORES.categories, 'readwrite');
  return Promise.all(categories.map(cat => 
    new Promise<void>((resolve, reject) => {
      const request = store.put(cat);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    })
  )).then(() => {});
}

export async function getCategories(): Promise<Category[]> {
  const store = getStore(STORES.categories);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

// Search cache
export async function cacheSearchResult(query: string, result: SearchResult): Promise<void> {
  const store = getStore(STORES.searchCache, 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.put({ query, result, timestamp: Date.now() });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getCachedSearchResult(query: string, maxAge: number = 5 * 60 * 1000): Promise<SearchResult | null> {
  const store = getStore(STORES.searchCache);
  return new Promise((resolve, reject) => {
    const request = store.get(query);
    request.onsuccess = () => {
      const cached = request.result;
      if (cached && Date.now() - cached.timestamp < maxAge) {
        resolve(cached.result);
      } else {
        resolve(null);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

// Bookmarks
export async function addBookmark(articleId: string): Promise<void> {
  const store = getStore(STORES.bookmarks, 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.put({ articleId, timestamp: Date.now() });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function removeBookmark(articleId: string): Promise<void> {
  const store = getStore(STORES.bookmarks, 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.delete(articleId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getBookmarks(): Promise<string[]> {
  const store = getStore(STORES.bookmarks);
  return new Promise((resolve, reject) => {
    const request = store.getAllKeys();
    request.onsuccess = () => resolve(request.result as string[]);
    request.onerror = () => reject(request.error);
  });
}

// History
export async function addToHistory(articleId: string): Promise<void> {
  const store = getStore(STORES.history, 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.add({ articleId, timestamp: Date.now() });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getHistory(limit: number = 20): Promise<string[]> {
  const store = getStore(STORES.history);
  const index = store.index('timestamp');
  return new Promise((resolve, reject) => {
    const request = index.openCursor(null, 'prev');
    const results: string[] = [];
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor && results.length < limit) {
        if (!results.includes(cursor.value.articleId)) {
          results.push(cursor.value.articleId);
        }
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

// Settings
export async function getSetting(key: string): Promise<any> {
  const store = getStore(STORES.settings);
  return new Promise((resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result?.value);
    request.onerror = () => reject(request.error);
  });
}

export async function setSetting(key: string, value: any): Promise<void> {
  const store = getStore(STORES.settings, 'readwrite');
  return new Promise((resolve, reject) => {
    const request = store.put({ key, value });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Cleanup old data
export async function cleanupOldData(days: number = 30): Promise<void> {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const store = getStore(STORES.history, 'readwrite');
  const index = store.index('timestamp');
  
  return new Promise((resolve, reject) => {
    const request = index.openCursor(IDBKeyRange.upperBound(cutoff));
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      } else {
        resolve();
      }
    };
    request.onerror = () => reject(request.error);
  });
}