import { Link, useLocation } from 'react-router-dom';
import { Home, Search, RotateCcw, BookOpen, TrendingUp, MessageSquare, ArrowLeft } from 'lucide-react';
import { cn } from '@/utils';
import { Button, Card, CardContent } from '@/components/ui';
import { Container } from '@/components/layout/PageLayout';
import { mockArticles } from './Home';

export function NotFound() {
  const location = useLocation();

  const suggestions = [
    { label: 'Kembali ke Beranda', href: '/', icon: Home, description: 'Mulai jelajahi berita terbaru' },
    { label: 'Cari Berita Lain', href: '/search', icon: Search, description: 'Temukan topik yang Anda inginkan' },
    { label: 'Berita Terbaru', href: '/latest', icon: RotateCcw, description: 'Lihat update terbaru hari ini' },
    { label: 'Kategori Populer', href: '/category/hot', icon: TrendingUp, description: 'Hot news & breaking news' },
  ];

  const popularArticles = mockArticles.slice(0, 3);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Container>
        <div className="max-w-md mx-auto text-center py-16">
          {/* Error Illustration */}
          <div className="mb-8 relative">
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <span className="font-display font-bold text-4xl text-accent">404</span>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white dark:bg-gray-900 border-4 border-accent/20 flex items-center justify-center shadow-lg">
                <BookOpen className="h-8 w-8 text-accent" aria-hidden="true" />
              </div>
            </div>
          </div>

          <h1 className="heading-1 mb-4">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-sm mx-auto">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Mungkin URL salah ketik atau halaman sudah dihapus.
          </p>

          {/* Quick Actions */}
          <div className="grid gap-3 sm:grid-cols-2 mb-10">
            {suggestions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="card p-4 text-left hover:border-accent/50 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <action.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-primary dark:text-white block">{action.label}</span>
                    <span className="text-xs text-gray-500">{action.description}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Search */}
          <form className="mb-10 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search-404" className="sr-only">Cari berita</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
              <input
                id="search-404"
                type="search"
                placeholder="Coba cari berita lain..."
                className="input pl-10"
              />
            </div>
          </form>

          {/* Popular Articles */}
          <div className="text-left mb-10">
            <h2 className="heading-4 mb-4 text-center">Mungkin Anda Menyukai</h2>
            <div className="space-y-3">
              {popularArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.slug}`} className="flex gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                  <div className="flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden">
                    <img src={article.featuredImage.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-primary dark:text-white text-sm line-clamp-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Badge variant="category" color={article.category.color} className="text-xs px-1.5 py-0.5 gap-1">
                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: article.category.color }} />
                        {article.category.name}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Error Details */}
          <details className="mt-10 text-left">
            <summary className="flex items-center justify-between text-sm text-gray-500 cursor-pointer">
              <span>Detail Teknis</span>
              <RotateCcw className="h-4 w-4 transition-transform" />
            </summary>
            <div className="mt-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              <div><strong>Path:</strong> {location.pathname}</div>
              <div><strong>Search:</strong> {location.search || '(none)'}</div>
              <div><strong>Hash:</strong> {location.hash || '(none)'}</div>
              <div><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 80) + '...' : 'N/A'}</div>
              <div><strong>Timestamp:</strong> {new Date().toISOString()}</div>
            </div>
          </details>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500">
            <p>Masih butuh bantuan? <Link to="/contact" className="text-accent hover:underline">Hubungi kami</Link> atau <Link to="/" className="text-accent hover:underline ml-2">kembali ke beranda</Link></p>
          </div>
        </div>
      </Container>
    </div>
  );
}