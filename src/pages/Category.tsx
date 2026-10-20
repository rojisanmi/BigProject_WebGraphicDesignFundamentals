import { useParams } from 'react-router-dom';
import { ArrowLeft, Filter, ChevronDown, Loader2, Grid, List } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils';
import { NewsCard, NewsGrid } from '@/components/news';
import { Button, Badge, Dropdown, DropdownTrigger, Input, Skeleton, Card, CardContent } from '@/components/ui';
import { Container, Section } from '@/components/layout/PageLayout';
import { getCategoryColor, getCategoryIcon, formatRelativeTime, formatDate } from '@/utils';
import { categories, getCategory, getActiveCategories } from '@/data/categories';
import type { Category, NewsArticle } from '@/types';
import { mockArticles } from './Home';

const categoryIcons: Record<string, React.ReactNode> = {
  hot: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 4-5 4-5s4 3 4 5 1 1 1 1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16a5 5 0 00-5-5" /></svg>,
  sport: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  food: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
  global: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  science: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14.064v3.591a1 1 0 001.447.895l3.847-2.564a1 1 0 000-1.789l-3.846-2.564A1 1 0 0010 8.44v3.624z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 2v2.2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.56 11.92a10.97 10.97 0 0110.88 0" /></svg>,
  lifestyle: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  health: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 002 12v9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9v3a2 2 0 01-2 2H5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 00-9-9" /></svg>,
  finance: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="12" y1="1" x2="12" y2="23" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
  travel: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 4-5 4-5s4 3 4 5 1 1 1 1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16a5 5 0 00-5-5" /></svg>,
  oto: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.92 6.01c-.144-.03-.287-.06-.431-.092a4.004 4.004 0 00-1.777-.516 2 2 0 00-1.722.958l-.123.123-2.828 2.828a2 2 0 01-2.828 0L8.155 8.62l-.123-.122a2 2 0 00-1.722-.958 4.004 4.004 0 00-1.777.516c-.246.07-.484.187-.706.35a9.617 9.617 0 00-.762 1.171 10 10 0 00-.287 2.511c0 .923.074 1.839.214 2.738a1 1 0 01-.744.995 12.512 12.512 0 01-3.01 0 1 1 0 01-.745-.995c.14-.898.214-1.813.214-2.738a10 10 0 00-.287-2.51 9.62 9.62 0 00-.762-1.17c-.222-.162-.46-.28-.706-.35A4.004 4.004 0 002 6.01c-.542 0-1.017.283-1.279.697A7.02 7.02 0 00.473 9.4a4 4 0 000 5.201c.148.23.345.455.56.67 3.076 2.956 8.332 2.956 11.407 0 .215-.214.412-.438.56-.67a4 4 0 000-5.201 7.02 7.02 0 00-.57-2.69c-.262-.414-.737-.697-1.279-.697zm-2.636 1.509a1 1 0 01.553.14l1.026 1.027a1 1 0 001.414 0l1.027-1.027a1 1 0 011.553-.14c.483 0 .955.221 1.27.57a4.5 4.5 0 011.191 1.936c.054.187.092.376.106.567a1 1 0 01-.836 1.185 12 12 0 01-2.337.738 1 1 0 01-.917-.47 7 7 0 00-2.136-2.137 1 1 0 01-.47-.917 12 12 0 01.738-2.337 1 1 0 011.185-.836c.19.014.38.052.567.106a4.5 4.5 0 011.936 1.191c.35.315.57.786.57 1.27zM9 15a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>,
  hype: <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M21 3v4M19 5h-4M5 21v-4M3 19h4M21 21v-4M19 19h-4" /></svg>,
};

function CategoryPageContent({ category, articles }: { category: Category; articles: NewsArticle[] }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');
  const [showFilters, setShowFilters] = useState(false);

  const sortedArticles = useMemo(() => {
    switch (sortBy) {
      case 'popular':
        return [...articles].sort((a, b) => b.viewCount - a.viewCount);
      case 'trending':
        return [...articles].sort((a, b) => 
          b.viewCount / (Date.now() - new Date(b.publishedAt).getTime()) - 
          a.viewCount / (Date.now() - new Date(a.publishedAt).getTime())
        );
      default:
        return [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
  }, [articles, sortBy]);

  return (
    <div>
      {/* Category Header */}
      <header className="mb-8 relative" style={{ borderBottom: `3px solid ${category.color}` }}>
        <div className="container-custom py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-accent mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="category" color={category.color} className="text-lg px-4 py-2 gap-1.5">
              {categoryIcons[category.slug]}
              <span>{category.name}</span>
            </Badge>
            {category.isActive && <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              Aktif
            </span>}
          </div>
          <h1 className="heading-1 mb-2">{category.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">{category.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><span className="h-5 w-5 flex items-center justify-center">{categoryIcons[category.slug]}</span> {articles.length} artikel</span>
            <span aria-hidden="true">·</span>
            <time>Diperbarui {formatRelativeTime(new Date())}</time>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 sticky top-16 z-20">
        <div className="container-custom py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} leftIcon={<Filter className="h-4 w-4" />}>
              Filter
            </Button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-gray-500">Urutkan:</span>
              <Dropdown>
                <DropdownTrigger className="btn btn-outline btn-sm flex items-center gap-1 h-9 px-3" variant="outline">
                  {sortBy === 'latest' && 'Terbaru'}
                  {sortBy === 'popular' && 'Terpopuler'}
                  {sortBy === 'trending' && 'Trending'}
                  <ChevronDown className="h-4 w-4" />
                </DropdownTrigger>
                <Dropdown
                  items={[
                    { label: 'Terbaru', onClick: () => setSortBy('latest') },
                    { label: 'Terpopuler', onClick: () => setSortBy('popular') },
                    { label: 'Trending', onClick: () => setSortBy('trending') },
                  ]}
                />
              </Dropdown>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              aria-label="Tampilan grid"
              leftIcon={<Grid className="h-4 w-4" />}
            />
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              aria-label="Tampilan daftar"
              leftIcon={<List className="h-4 w-4" />}
            />
          </div>
        </div>

        {showFilters && (
          <div className="container-custom pb-3 animate-slide-down border-t border-gray-100 dark:border-gray-800">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label htmlFor="date-from" className="label">Dari Tanggal</label>
                <Input id="date-from" type="date" />
              </div>
              <div>
                <label htmlFor="date-to" className="label">Sampai Tanggal</label>
                <Input id="date-to" type="date" />
              </div>
              <div>
                <label htmlFor="tag" className="label">Tag</label>
                <Input id="tag" type="text" placeholder="Cari tag..." />
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full" leftIcon={<Filter className="h-4 w-4" />}>
                  Reset Filter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Articles Grid */}
      <Container>
        <NewsGrid
          articles={sortedArticles}
          variant={viewMode}
          columns={{ base: 1, sm: 2, md: viewMode === 'list' ? 1 : 2, lg: viewMode === 'list' ? 1 : 3, xl: viewMode === 'list' ? 1 : 4 }}
          showCategory={false}
          showAuthor={viewMode === 'list'}
          showStats={true}
        />
      </Container>

      {/* Pagination */}
      <Container className="py-8">
        <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
          <Button variant="outline" size="sm" disabled aria-label="Halaman sebelumnya">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Button>
          <Button variant="primary" size="sm" aria-current="page" aria-label="Halaman 1">1</Button>
          <Button variant="outline" size="sm" aria-label="Halaman 2">2</Button>
          <Button variant="outline" size="sm" aria-label="Halaman 3">3</Button>
          <span className="px-2 text-gray-400">...</span>
          <Button variant="outline" size="sm" aria-label="Halaman 10">10</Button>
          <Button variant="outline" size="sm" aria-label="Halaman selanjutnya">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Button>
        </nav>
      </Container>
    </div>
  );
}

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategory(slug) : null;

  if (!category) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="heading-2 mb-4">Kategori Tidak Ditemukan</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Kategori yang Anda cari tidak ada atau telah dihapus.</p>
          <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const categoryArticles = mockArticles.filter(a => a.category.slug === category.slug);

  return (
    <CategoryPageContent category={category} articles={categoryArticles} />
  );
}