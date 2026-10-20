import { useState } from 'react';
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/utils';
import { Button, Input } from '@/components/ui';
import { Dropdown, DropdownTrigger } from '@/components/ui/Dropdown';
import { categories } from '@/data/categories';
import { useSearch } from '@/hooks';

export function SearchForm({ className, showFilters = false }: { className?: string; showFilters?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)} role="search">
      <div className="relative">
        <Search className={cn('absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors', isFocused ? 'text-accent' : 'text-gray-400')} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Cari berita, topik, atau kata kunci..."
          className={cn('input pl-10 pr-10', isFocused && 'ring-2 ring-accent/20')}
          aria-label="Search news"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {showFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Dropdown>
            <DropdownTrigger className="flex items-center gap-2">
              <Filter className="h-4 w-4" aria-hidden="true" />
              <span>Kategori</span>
            </DropdownTrigger>
            <Dropdown
              items={[
                { label: 'Semua Kategori', onClick: () => {} },
                { divider: true },
                ...categories.map((cat) => ({
                  label: cat.name,
                  onClick: () => {},
                })),
              ]}
            />
          </Dropdown>

          <Dropdown>
            <DropdownTrigger className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              <span>Urutkan</span>
            </DropdownTrigger>
            <Dropdown
              items={[
                { label: 'Terbaru', onClick: () => {} },
                { label: 'Terpopuler', onClick: () => {} },
                { label: 'Trending', onClick: () => {} },
                { label: 'Terlama', onClick: () => {} },
              ]}
            />
          </Dropdown>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            aria-expanded={showFilterPanel}
            aria-controls="filter-panel"
          >
            Filter Lanjutan
          </button>
        </div>
      )}

      {showFilterPanel && (
        <div id="filter-panel" className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg animate-slide-down">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="date-from" className="label">Dari Tanggal</label>
              <Input id="date-from" type="date" />
            </div>
            <div>
              <label htmlFor="date-to" className="label">Sampai Tanggal</label>
              <Input id="date-to" type="date" />
            </div>
            <div>
              <label htmlFor="source" className="label">Sumber</label>
              <Input id="source" type="text" placeholder="Cari sumber..." />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export function SearchResults({ query, className }: { query: string; className?: string }) {
  const { results, isLoading, totalResults, hasResults, facets } = useSearch();

  if (isLoading) {
    return (
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <Search className="h-8 w-8 text-gray-400" aria-hidden="true" />
        </div>
        <h3 className="heading-3 mb-2">Tidak Ditemukan</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Tidak ada hasil untuk <strong className="text-primary dark:text-white">"{query}"</strong>.
          Coba kata kunci lain atau periksa ejaan.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ditemukan <strong className="text-primary dark:text-white">{totalResults.toLocaleString('id-ID')}</strong> hasil untuk <strong className="text-primary dark:text-white">"{query}"</strong>
        </p>
        {facets?.categories.length && (
          <div className="flex flex-wrap gap-2">
            {facets.categories.slice(0, 5).map((facet) => (
              <button key={facet.slug} className="badge variant="outline"">
                {facet.slug} ({facet.count})
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((article) => (
          <article key={article.id}>
            <a href={`/article/${article.slug}`} className="block group">
              {article.featuredImage && (
                <div className="aspect-video rounded-lg overflow-hidden mb-3">
                  <img
                    src={article.featuredImage.url}
                    alt={article.featuredImage.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <h3 className="font-heading font-semibold text-primary dark:text-white line-clamp-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="badge variant="category" color={article.category.color}>
                  {article.category.name}
                </span>
                <time>{new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}