import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { NewsArticle, SearchParams, PaginatedResponse, SearchResult, Category } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export function useNews(params: SearchParams = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  return useQuery({
    queryKey: ['news', params],
    queryFn: () => fetchJson<PaginatedResponse<NewsArticle>>(`${API_BASE}/news?${searchParams}`),
    placeholderData: (previousData) => previousData,
  });
}

export function useInfiniteNews(params: Omit<SearchParams, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: ['news', 'infinite', params],
    queryFn: async ({ pageParam = 1 }) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, String(value));
        }
      });
      searchParams.append('page', String(pageParam));
      searchParams.append('limit', '12');
      return fetchJson<PaginatedResponse<NewsArticle>>(`${API_BASE}/news?${searchParams}`);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage < lastPage.meta.lastPage) {
        return lastPage.meta.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchJson<NewsArticle>(`${API_BASE}/articles/${slug}`),
    enabled: !!slug,
  });
}

export function useRelatedArticles(slug: string, limit: number = 4) {
  return useQuery({
    queryKey: ['articles', 'related', slug],
    queryFn: () => fetchJson<NewsArticle[]>(`${API_BASE}/articles/${slug}/related?limit=${limit}`),
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchJson<Category[]>(`${API_BASE}/categories`),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => fetchJson<Category>(`${API_BASE}/categories/${slug}`),
    enabled: !!slug,
  });
}

export function useSearch(query: string, params: Omit<SearchParams, 'q'> = {}) {
  return useQuery({
    queryKey: ['search', query, params],
    queryFn: () => {
      const searchParams = new URLSearchParams({ q: query });
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.append(key, String(value));
        }
      });
      return fetchJson<SearchResult>(`${API_BASE}/search?${searchParams}`);
    },
    enabled: query.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useBreakingNews() {
  return useQuery({
    queryKey: ['news', 'breaking'],
    queryFn: () => fetchJson<NewsArticle[]>(`${API_BASE}/news/breaking`),
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFeaturedNews() {
  return useQuery({
    queryKey: ['news', 'featured'],
    queryFn: () => fetchJson<NewsArticle[]>(`${API_BASE}/news/featured`),
    staleTime: 10 * 60 * 1000,
  });
}

export function useTrendingNews(category?: string) {
  return useQuery({
    queryKey: ['news', 'trending', category],
    queryFn: () => fetchJson<NewsArticle[]>(`${API_BASE}/news/trending${category ? `?category=${category}` : ''}`),
    staleTime: 15 * 60 * 1000,
  });
}

export function useSubmitContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; email: string; subject: string; message: string }) =>
      fetchJson<{ success: boolean; message: string }>(`${API_BASE}/contact`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact'] });
    },
  });
}

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: (email: string) =>
      fetchJson<{ success: boolean; message: string }>(`${API_BASE}/newsletter`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
  });
}

export function useViewCount(slug: string) {
  return useMutation({
    mutationFn: () =>
      fetchJson<{ views: number }>(`${API_BASE}/articles/${slug}/view`, { method: 'POST' }),
    onSuccess: (data) => {
      // Update cache if needed
    },
  });
}