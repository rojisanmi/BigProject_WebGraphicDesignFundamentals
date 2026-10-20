export interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  credit?: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  logo?: string;
  reliabilityScore?: number;
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: ImageAsset;
  category: Category;
  tags: string[];
  author: Author;
  source: NewsSource;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  viewCount: number;
  isBreaking: boolean;
  isFeatured: boolean;
  seo: SEOData;
  relatedArticles?: NewsArticle[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    perPage: number;
    total: number;
    lastPage: number;
  };
}

export interface SearchParams {
  q?: string;
  category?: string;
  tag?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: 'latest' | 'popular' | 'trending';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  articles: NewsArticle[];
  total: number;
  facets: {
    categories: { slug: string; count: number }[];
    tags: { name: string; count: number }[];
    sources: { name: string; count: number }[];
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export interface NewsletterSubscription {
  email: string;
  categories?: string[];
  frequency?: 'daily' | 'weekly';
}

export interface BreakingNewsBanner {
  id: string;
  title: string;
  url: string;
  category: Category;
  publishedAt: string;
  dismissible: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  social: {
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
  categories: Category[];
  breakpoints: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: string;
  badge?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}