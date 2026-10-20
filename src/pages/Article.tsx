import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, Bookmark, Share2, Tag, User, ChevronRight, Calendar, MessageSquare, Heart, Flag } from 'lucide-react';
import { cn } from '@/utils';
import { Button, Badge, Card, CardContent, Skeleton } from '@/components/ui';
import { ArticleHero, ArticleBody, ArticleMeta, RelatedArticles } from '@/components/news/ArticleBody';
import { OptimizedImage } from '@/components/ui/Image';
import { Container } from '@/components/layout/PageLayout';
import { getCategoryColor, formatRelativeTime, calculateReadTime, formatDate } from '@/utils';
import { categories, getCategory, getActiveCategories } from '@/data/categories';
import type { NewsArticle, Category } from '@/types';
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

function ArticleContent({ article }: { article: NewsArticle }) {
  const location = useLocation();
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + location.pathname : '';
  const shareText = article.title;

  const shareLinks = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
    { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg> },
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.46A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12c0 2.31.64 4.47 1.78 6.38L0 24l6.38-1.78A12.06 12.06 0 0012 24c6.63 0 12-5.37 12-12a12.07 12.07 0 00-3.48-8.54z" /></svg> },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" /></svg> },
    { name: 'Copy Link', href: '#', icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>, onClick: (e: React.MouseEvent) => { e.preventDefault(); navigator.clipboard.writeText(shareUrl); } },
  ];

  return (
    <article className="min-h-screen">
      <ArticleHero article={article} />

      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ArticleBody article={article} />

            <ArticleMeta article={article} onShare={(platform) => console.log('Shared via', platform)} />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-500">Tags:</span>
                  {article.tags.map((tag) => (
                    <Link key={tag} to={`/search?tag=${encodeURIComponent(tag)}`} className="badge variant='outline'">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {article.author && (
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {article.author.avatar ? (
                      <img src={article.author.avatar} alt="" className="h-16 w-16 rounded-full" />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-2xl">
                        {article.author.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold text-primary dark:text-white">{article.author.name}</h3>
                      <Badge variant="outline" className="text-xs">Penulis</Badge>
                    </div>
                    {article.author.bio && <p className="mt-2 text-gray-600 dark:text-gray-400">{article.author.bio}</p>}
                    {article.author.social && (
                      <div className="mt-3 flex gap-3">
                        {article.author.social.twitter && <a href={article.author.social.twitter} target="_blank" rel="noopener" className="text-gray-400 hover:text-accent transition-colors" aria-label="Twitter"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg></a>}
                        {article.author.social.linkedin && <a href={article.author.social.linkedin} target="_blank" rel="noopener" className="text-gray-400 hover:text-accent transition-colors" aria-label="LinkedIn"><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" /></svg></a>}
                        {article.author.social.instagram && <a href={article.author.social.instagram} target="_blank" rel="noopener" className="text-gray-400 hover:text-accent transition-colors" aria-label="Instagram"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Engagement Bar */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors" aria-label="Suka">
                <Heart className="h-5 w-5" />
                <span className="text-sm font-medium">Suka</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors" aria-label="Bookmark">
                <Bookmark className="h-5 w-5" />
                <span className="text-sm font-medium">Simpan</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors" aria-label="Komentar">
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm font-medium">Komentar</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors ml-auto" aria-label="Laporkan">
                <Flag className="h-5 w-5" />
                <span className="text-sm font-medium">Laporkan</span>
              </button>
            </div>

            {/* Related Articles */}
            <RelatedArticles articles={mockArticles.filter(a => a.id !== article.id && a.category.slug === article.category.slug).slice(0, 3)} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Trending */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="heading-4 mb-4 flex items-center gap-2">
                    <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    Trending
                  </h3>
                  <div className="space-y-4">
                    {mockArticles
                      .filter(a => a.id !== article.id)
                      .sort((a, b) => b.viewCount - a.viewCount)
                      .slice(0, 5)
                      .map((trending, index) => (
                        <Link key={trending.id} to={`/article/${trending.slug}`} className="flex gap-3 group">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-primary dark:text-white line-clamp-2 group-hover:text-accent transition-colors text-sm">
                              {trending.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                              <Badge variant="category" color={getCategoryColor(trending.category.slug)} className="text-xs px-1.5 py-0.5 gap-1">
                                {categoryIcons[trending.category.slug]}
                                <span>{trending.category.name}</span>
                              </Badge>
                              <span>{formatRelativeTime(trending.publishedAt)}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="heading-4 mb-4">Kategori</h3>
                  <div className="flex flex-wrap gap-2">
                    {getActiveCategories().map((cat) => (
                      <Link key={cat.slug} to={`/category/${cat.slug}`} className="badge variant="outline"" style={{ borderColor: cat.color, color: cat.color }}>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-accent to-accent-hover">
                <CardContent className="pt-6 text-white">
                  <h3 className="heading-4 mb-2">Newsletter Harian</h3>
                  <p className="text-white/80 text-sm mb-4">Dapatkan berita terpilih setiap pagi.</p>
                  <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                    <input type="email" placeholder="Email Anda" className="input bg-white/10 border-white/20 text-white placeholder:text-white/60 flex-1" aria-label="Email for newsletter" />
                    <Button type="submit" variant="secondary" className="whitespace-nowrap">Daftar</Button>
                  </form>
                </CardContent>
              </Card>

              {/* Share Article */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="heading-4 mb-4 flex items-center gap-2">
                    <Share2 className="h-5 w-5 text-accent" />
                    Bagikan Artikel
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {shareLinks.slice(0, 4).map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={link.onClick}
                        className="flex-1 min-w-[80px] p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-center text-gray-600 dark:text-gray-400 hover:bg-accent/10 hover:text-accent transition-colors"
                        aria-label={`Share on ${link.name}`}
                      >
                        <div className="mx-auto mb-1">{link.icon}</div>
                        <span className="text-xs font-medium">{link.name === 'Copy Link' ? 'Salin' : link.name}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? mockArticles.find(a => a.slug === slug) : null;

  if (!article) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="heading-2 mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Artikel yang Anda cari tidak ada atau telah dihapus.</p>
          <Link to="/" className="btn btn-primary">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Person', name: article.author.name },
    publisher: { '@type': 'Organization', name: 'Briking Nyus', logo: { '@type': 'ImageObject', url: '/images/logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': shareUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ArticleContent article={article} />
    </>
  );
}