import type { NewsArticle, SearchParams, PaginatedResponse, SearchResult, Category } from '@/types';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '';
const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY || '';
const NEWSDATA_API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY || '';

const BASE_URLS = {
  newsapi: 'https://newsapi.org/v2',
  gnews: 'https://gnews.io/api/v4',
  newsdata: 'https://newsdata.io/api/1',
};

interface RawArticle {
  title: string;
  description?: string;
  content?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: { name: string; id?: string };
  author?: string;
  category?: string;
}

function mapNewsAPIArticle(article: RawArticle, categorySlug: string): NewsArticle | null {
  if (!article.title || !article.url) return null;
  if (article.title === '[Removed]') return null;

  const slug = generateSlug(article.title);
  const readTime = calculateReadTime(article.content || article.description || '');

  return {
    id: `newsapi-${slug}-${Date.now()}`,
    slug,
    title: article.title,
    excerpt: article.description || article.content?.substring(0, 160) || 'Tidak ada ringkasan.',
    content: article.content || article.description || '',
    featuredImage: {
      url: article.urlToImage || '/images/placeholder.jpg',
      alt: article.title,
      credit: article.source.name,
    },
    category: getCategoryBySlug(categorySlug),
    tags: extractTags(article.title, article.description),
    author: { id: 'newsapi', name: article.author || article.source.name || 'NewsAPI' },
    source: { id: 'newsapi', name: article.source.name, url: article.url },
    publishedAt: article.publishedAt,
    updatedAt: article.publishedAt,
    readTime,
    viewCount: Math.floor(Math.random() * 10000),
    isBreaking: false,
    isFeatured: false,
    seo: { metaTitle: article.title, metaDescription: article.description || '' },
  };
}

function mapGNewsArticle(article: RawArticle, categorySlug: string): NewsArticle | null {
  if (!article.title || !article.url) return null;

  const slug = generateSlug(article.title);
  const readTime = calculateReadTime(article.content || article.description || '');

  return {
    id: `gnews-${slug}-${Date.now()}`,
    slug,
    title: article.title,
    excerpt: article.description || article.content?.substring(0, 160) || 'Tidak ada ringkasan.',
    content: article.content || article.description || '',
    featuredImage: {
      url: article.urlToImage || '/images/placeholder.jpg',
      alt: article.title,
      credit: article.source.name,
    },
    category: getCategoryBySlug(categorySlug),
    tags: extractTags(article.title, article.description),
    author: { id: 'gnews', name: article.author || article.source.name || 'GNews' },
    source: { id: 'gnews', name: article.source.name, url: article.url },
    publishedAt: article.publishedAt,
    updatedAt: article.publishedAt,
    readTime,
    viewCount: Math.floor(Math.random() * 10000),
    isBreaking: false,
    isFeatured: false,
    seo: { metaTitle: article.title, metaDescription: article.description || '' },
  };
}

function getCategoryBySlug(slug: string) {
  const categories: Record<string, any> = {
    general: { slug: 'hot', name: 'HotNYUS', nameEn: 'Hot News', color: '#FF6B35', icon: 'flame', order: 1, isActive: true, description: '' },
    business: { slug: 'finance', name: 'FinanceNYUS', nameEn: 'Finance', color: '#198754', icon: 'dollar-sign', order: 8, isActive: true, description: '' },
    entertainment: { slug: 'hype', name: 'HypeNYUS', nameEn: 'Entertainment', color: '#FF1493', icon: 'sparkles', order: 11, isActive: true, description: '' },
    health: { slug: 'health', name: 'HealthNYUS', nameEn: 'Health', color: '#DC3545', icon: 'heart-pulse', order: 7, isActive: true, description: '' },
    science: { slug: 'science', name: 'ScienceNYUS', nameEn: 'Science', color: '#6F42C1', icon: 'flask-conical', order: 5, isActive: true, description: '' },
    sports: { slug: 'sport', name: 'SportNYUS', nameEn: 'Sports', color: '#28A745', icon: 'trophy', order: 2, isActive: true, description: '' },
    technology: { slug: 'science', name: 'ScienceNYUS', nameEn: 'Technology', color: '#6F42C1', icon: 'flask-conical', order: 5, isActive: true, description: '' },
  };
  return categories[slug] || categories.general;
}

function extractTags(title: string, description?: string): string[] {
  const text = `${title} ${description || ''}`.toLowerCase();
  const commonTags = [
    'indonesia', 'jakarta', 'politik', 'ekonomi', 'bisnis', 'teknologi', 'olahraga', 'sepak bola',
    'kesehatan', 'covid', 'vaksin', 'pendidikan', 'hukum', 'korupsi', 'pemerintahan', 'presiden',
    'dpr', 'mahkamah', 'polisi', 'tni', 'banjir', 'gempa', 'gunung api', 'cuaca', 'bmkg',
    'internasional', 'as', 'china', 'russia', 'ukraina', 'israel', 'palestina', 'asean',
    'hiburan', 'selebrity', 'film', 'musik', 'k-pop', 'drama', 'sinetron',
    'gaya hidup', 'fashion', 'travel', 'wisata', 'kuliner', 'resep', 'makanan',
    'otomotif', 'mobil', 'motor', 'listrik', 'ev', 'honda', 'toyota', 'yamaha',
  ];
  return commonTags.filter(tag => text.includes(tag)).slice(0, 5);
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function fetchNewsAPI(category: string = 'general', page: number = 1, pageSize: number = 12): Promise<PaginatedResponse<NewsArticle>> {
  if (!NEWS_API_KEY) {
    return { data: [], meta: { currentPage: 1, perPage: pageSize, total: 0, lastPage: 1 } };
  }

  try {
    const url = `${BASE_URLS.newsapi}/top-headlines?country=id&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'NewsAPI error');
    }

    const articles = data.articles
      .map((a: RawArticle) => mapNewsAPIArticle(a, category))
      .filter((a: NewsArticle | null): a is NewsArticle => a !== null);

    return {
      data: articles,
      meta: {
        currentPage: page,
        perPage: pageSize,
        total: data.totalResults,
        lastPage: Math.ceil(data.totalResults / pageSize),
      },
    };
  } catch (error) {
    console.error('NewsAPI fetch error:', error);
    return { data: [], meta: { currentPage: 1, perPage: pageSize, total: 0, lastPage: 1 } };
  }
}

export async function fetchGNews(category: string = 'general', page: number = 1, pageSize: number = 12): Promise<PaginatedResponse<NewsArticle>> {
  if (!GNEWS_API_KEY) {
    return { data: [], meta: { currentPage: 1, perPage: pageSize, total: 0, lastPage: 1 } };
  }

  try {
    const url = `${BASE_URLS.gnews}/top-headlines?category=${category}&lang=id&country=id&page=${page}&max=${pageSize}&apikey=${GNEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors.join(', '));
    }

    const articles = data.articles
      .map((a: RawArticle) => mapGNewsArticle(a, category))
      .filter((a: NewsArticle | null): a is NewsArticle => a !== null);

    return {
      data: articles,
      meta: {
        currentPage: page,
        perPage: pageSize,
        total: data.totalArticles || articles.length,
        lastPage: Math.ceil((data.totalArticles || articles.length) / pageSize),
      },
    };
  } catch (error) {
    console.error('GNews fetch error:', error);
    return { data: [], meta: { currentPage: 1, perPage: pageSize, total: 0, lastPage: 1 } };
  }
}

export async function fetchNewsDataIO(category: string = 'general', page: number = 1, pageSize: number = 12): Promise<PaginatedResponse<NewsArticle>> {
  if (!NEWDATA_API_KEY) {
    return { data: [], meta: { currentPage: 1, perPage: pageSize, total: 0, lastPage: 1 } };
  }

  try {
    const url = `${BASE_URLS.newsdata}/news?category=${category}&language=id&page=${page}&size=${pageSize}&apikey=${NEWDATA_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'success') {
      throw new Error(data.results?.message || 'NewsData.io error');
    }

    // Similar mapping logic...
    return { data: [], meta: { currentPage: 1, perPage: pageSize, total: 0, lastPage: 1 } };
  } catch (error) {
    console.error('NewsData.io fetch error:', error);
    return { data: [], meta: { currentPage: 1, perPage: pageSize, total: 0, lastPage: 1 } };
  }
}

export async function fetchAllSources(params: SearchParams = {}): Promise<PaginatedResponse<NewsArticle>> {
  const category = params.category || 'general';
  const page = params.page || 1;
  const limit = params.limit || 12;

  const [newsapi, gnews] = await Promise.allSettled([
    fetchNewsAPI(category, page, Math.ceil(limit / 2)),
    fetchGNews(category, page, Math.ceil(limit / 2)),
  ]);

  const allArticles: NewsArticle[] = [];
  if (newsapi.status === 'fulfilled') allArticles.push(...newsapi.value.data);
  if (gnews.status === 'fulfilled') allArticles.push(...gnews.value.data);

  // Deduplicate by URL/title similarity
  const uniqueArticles = deduplicateArticles(allArticles);

  // Sort by published date
  uniqueArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const paginated = uniqueArticles.slice(0, limit);

  return {
    data: paginated,
    meta: {
      currentPage: page,
      perPage: limit,
      total: uniqueArticles.length,
      lastPage: Math.ceil(uniqueArticles.length / limit),
    },
  };
}

function deduplicateArticles(articles: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>();
  return articles.filter(article => {
    const key = article.url || article.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function searchArticles(query: string, params: SearchParams = {}): Promise<SearchResult> {
  if (!NEWS_API_KEY && !GNEWS_API_KEY) {
    return { articles: [], total: 0, facets: { categories: [], tags: [], sources: [] } };
  }

  try {
    const results = await fetchAllSources({ ...params, q: query });
    return {
      articles: results.data,
      total: results.meta.total,
      facets: { categories: [], tags: [], sources: [] },
    };
  } catch (error) {
    console.error('Search error:', error);
    return { articles: [], total: 0, facets: { categories: [], tags: [], sources: [] } };
  }
}