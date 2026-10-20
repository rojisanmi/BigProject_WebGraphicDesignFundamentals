import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search, X, Loader2, Filter, ChevronDown, Tag, Calendar, Hashtag, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { cn } from '@/utils';
import { NewsCard, NewsGrid } from '@/components/news';
import { Button, Input, Badge, Dropdown, DropdownTrigger, Skeleton, Card, CardContent } from '@/components/ui';
import { Container, Section } from '@/components/layout/PageLayout';
import { getCategoryColor, formatRelativeTime } from '@/utils';
import { categories, getActiveCategories } from '@/data/categories';
import type { NewsArticle } from '@/types';
import { mockArticles } from './Home';

const categoryIcons: Record<string, React.ReactNode> = {
  hot: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 4-5 4-5s4 3 4 5 1 1 1 1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16a5 5 0 00-5-5" /></svg>,
  sport: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  food: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  global: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  science: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14.064v3.591a1 1 0 001.447.895l3.847-2.564a1 1 0 000-1.789l-3.846-2.564A1 1 0 0010 8.44v3.624z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 2v2.2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.56 11.92a10.97 10.97 0 0110.88 0" /></svg>,
  lifestyle: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  health: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 002 12v9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9v3a2 2 0 01-2 2H5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 00-9-9" /></svg>,
  finance: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="12" y1="1" x2="12" y2="23" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
  travel: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 4-5 4-5s4 3 4 5 1 1 1 1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16a5 5 0 00-5-5" /></svg>,
  oto: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.92 6.01c-.144-.03-.287-.06-.431-.092a4.004 4.004 0 00-1.777-.516 2 2 0 00-1.722.958l-.123.123-2.828 2.828a2 2 0 01-2.828 0L8.155 8.62l-.123-.122a2 2 0 00-1.722-.958 4.004 4.004 0 00-1.777.516c-.246.07-.484.187-.706.35a9.617 9.617 0 00-.762 1.171 10 10 0 00-.287 2.511c0 .923.074 1.839.214 2.738a1 1 0 01-.744.995 12.512 12.512 0 01-3.01 0 1 1 0 01-.745-.995c.14-.898.214-1.813.214-2.738a10 10 0 00-.287-2.51 9.62 9.62 0 00-.762-1.17c-.222-.162-.46-.28-.706-.35A4.004 4.004 0 002 6.01c-.542 0-1.017.283-1.279.697A7.02 7.02 0 00.473 9.4a4 4 0 000 5.201c.148.23.345.455.56.67 3.076 2.956 8.332 2.956 11.407 0 .215-.214.412-.438.56-.67a4 4 0 000-5.201 7.02 7.02 0 00-.57-2.69c-.262-.414-.737-.697-1.279-.697zm-2.636 1.509a1 1 0 01.553.14l1.026 1.027a1 1 0 001.414 0l1.027-1.027a1 1 0 011.553-.14c.483 0 .955.221 1.27.57a4.5 4.5 0 011.191 1.936c.054.187.092.376.106.567a1 1 0 01-.836 1.185 12 12 0 01-2.337.738 1 1 0 01-.917-.47 7 7 0 00-2.136-2.137 1 1 0 01-.47-.917 12 12 0 01.738-2.337 1 1 0 011.185-.836c.19.014.38.052.567.106a4.5 4.5 0 011.936 1.191c.35.315.57.786.57 1.27zM9 15a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>,
  hype: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M21 3v4M19 5h-4M5 21v-4M3 19h4M21 21v-4M19 19h-4" /></svg>,
};

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        setTotalResults(0);
        return;
      }

      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filtered = mockArticles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        article.category.name.toLowerCase().includes(query.toLowerCase())
      );

      // Apply filters
      if (activeFilters.category) {
        filtered = filtered.filter(a => a.category.slug === activeFilters.category);
      }
      if (activeFilters.sort) {
        if (activeFilters.sort === 'popular') {
          filtered.sort((a, b) => b.viewCount - a.viewCount);
        } else if (activeFilters.sort === 'trending') {
          filtered.sort((a, b) => 
            b.viewCount / (Date.now() - new Date(b.publishedAt).getTime()) - 
            a.viewCount / (Date.now() - new Date(a.publishedAt).getTime())
          );
        } else {
          filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        }
      } else {
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      }

      setResults(filtered);
      setTotalResults(filtered.length);
      setIsLoading(false);
    };

    const timer = setTimeout(performSearch, 300);
    return () => clearTimeout(timer);
  }, [query, activeFilters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchParams({ q: query });
  };

  const hasActiveFilters = Object.values(activeFilters).some(v => v);

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <header className="bg-gray-50 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <Container className="py-8">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari berita, topik, atau kata kunci..."
                className="input pl-12 pr-12 text-lg py-4"
                aria-label="Search query"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" className="w-full sm:w-auto" loading={isLoading} leftIcon={isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}>
                Cari
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                leftIcon={<SlidersHorizontal className="h-4 w-4" />}
                className="sm:hidden"
              >
                Filter
              </Button>
            </div>
          </form>
        </Container>
      </header>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="lg:hidden animate-slide-down border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <Container className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-primary dark:text-white">Filter Pencarian</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="mobile-category" className="label">Kategori</label>
                <select
                  id="mobile-category"
                  value={activeFilters.category || ''}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="input"
                >
                  <option value="">Semua Kategori</option>
                  {getActiveCategories().map(cat => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="mobile-sort" className="label">Urutkan</label>
                <select
                  id="mobile-sort"
                  value={activeFilters.sort || 'latest'}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="input"
                >
                  <option value="latest">Terbaru</option>
                  <option value="popular">Terpopuler</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
              {hasActiveFilters && (
                <Button variant="outline" className="w-full" onClick={clearFilters} leftIcon={<X className="h-4 w-4" />}>
                  Hapus Semua Filter
                </Button>
              )}
            </div>
          </Container>
        </div>
      )}

      {/* Results */}
      <Container className="py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter Pencarian
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="category-filter" className="label">Kategori</label>
                      <select
                        id="category-filter"
                        value={activeFilters.category || ''}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="input"
                      >
                        <option value="">Semua Kategori</option>
                        {getActiveCategories().map(cat => (
                          <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="sort-filter" className="label">Urutkan</label>
                      <select
                        id="sort-filter"
                        value={activeFilters.sort || 'latest'}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                        className="input"
                      >
                        <option value="latest">Terbaru</option>
                        <option value="popular">Terpopuler</option>
                        <option value="trending">Trending</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="date-from" className="label">Dari Tanggal</label>
                      <Input id="date-from" type="date" value={activeFilters.dateFrom || ''} onChange={(e) => handleFilterChange('dateFrom', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="date-to" className="label">Sampai Tanggal</label>
                      <Input id="date-to" type="date" value={activeFilters.dateTo || ''} onChange={(e) => handleFilterChange('dateTo', e.target.value)} />
                    </div>
                    {hasActiveFilters && (
                      <Button variant="outline" className="w-full" onClick={clearFilters} leftIcon={<X className="h-4 w-4" />}>
                        Hapus Filter
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Tags */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
                    <Hashtag className="h-5 w-5" />
                    Tag Populer
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['indonesia', 'politik', 'ekonomi', 'olahraga', 'teknologi', 'kesehatan', 'hiburan', 'gaya hidup', 'kuliner', 'wisata', 'otomotif', 'k-pop'].map(tag => (
                      <button key={tag} className="badge variant='outline' text-xs" onClick={() => { setQuery(tag); setSearchParams({ q: tag }); }}>
                        #{tag}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Search Tips */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
                    <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    Tips Pencarian
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2"><span className="text-accent">•</span> Gunakan kata kunci spesifik untuk hasil lebih akurat</li>
                    <li className="flex items-start gap-2"><span className="text-accent">•</span> Coba sinonim atau istilah terkait</li>
                    <li className="flex items-start gap-2"><span className="text-accent">•</span> Gunakan filter kategori untuk mempersempit</li>
                    <li className="flex items-start gap-2"><span className="text-accent">•</span> Urutkan by "Terpopuler" untuk berita viral</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Main Results */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isLoading ? 'Mencari...' : `Ditemukan <strong className="text-primary dark:text-white">{totalResults.toLocaleString('id-ID')}</strong> hasil untuk <strong className="text-primary dark:text-white">"{query}"</strong>`}
              </p>
            </div>

            {isLoading ? (
              <NewsGrid articles={[]} isLoading skeletonCount={6} variant="default" columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }} />
            ) : results.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="heading-3 mb-2">Tidak Ditemukan</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Tidak ada hasil untuk <strong>"{query}"</strong>. Coba kata kunci lain, periksa ejaan, atau gunakan filter yang lebih longgar.
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" className="mt-4" onClick={clearFilters} leftIcon={<X className="h-4 w-4" />}>
                    Hapus Semua Filter
                  </Button>
                )}
              </div>
            ) : (
              <>
                <NewsGrid
                  articles={results}
                  variant="default"
                  columns={{ base: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
                  showCategory={true}
                  showAuthor={true}
                  showStats={true}
                />

                {/* Pagination */}
                {totalResults > 12 && (
                  <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                    <Button variant="outline" size="sm" disabled aria-label="Sebelumnya">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </Button>
                    <Button variant="primary" size="sm" aria-current="page">1</Button>
                    <Button variant="outline" size="sm">2</Button>
                    <Button variant="outline" size="sm">3</Button>
                    <span className="px-2 text-gray-400">...</span>
                    <Button variant="outline" size="sm">5</Button>
                    <Button variant="outline" size="sm" aria-label="Selanjutnya">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Button>
                  </nav>
                )}
              </>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}