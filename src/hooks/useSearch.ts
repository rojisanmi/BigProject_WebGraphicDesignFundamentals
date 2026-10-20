import { useState, useCallback, useMemo } from 'react';
import { useSearch as useSearchQuery } from './useNews';
import type { SearchParams } from '@/types';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Omit<SearchParams, 'q'>>({});
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useMemo(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, error, refetch } = useSearchQuery(debouncedQuery, filters);

  const updateFilters = useCallback((newFilters: Partial<Omit<SearchParams, 'q'>>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    setFilters({});
  }, []);

  const hasResults = data && data.articles.length > 0;
  const totalResults = data?.total ?? 0;

  return {
    query,
    setQuery,
    debouncedQuery,
    filters,
    updateFilters,
    clearFilters,
    clearSearch,
    results: data?.articles ?? [],
    facets: data?.facets,
    totalResults,
    hasResults,
    isLoading,
    error,
    refetch,
  };
}

export function useSearchSuggestions(query: string) {
  // In a real app, this would call a suggestions API
  // For now, return empty array
  return useMemo(() => [], [query]);
}