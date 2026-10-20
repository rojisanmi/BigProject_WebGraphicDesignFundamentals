import { Link } from 'react-router-dom';
import { Clock, Eye, Bookmark, Share2, Zap } from 'lucide-react';
import { cn } from '@/utils';
import { Card, Badge } from '@/components/ui';
import { OptimizedImage } from '@/components/ui/Image';
import { formatRelativeTime, getCategoryColor, calculateReadTime } from '@/utils';
import { categories, getCategoryIcon } from '@/data/categories';
import type { NewsArticle, Category } from '@/types';
import { createElement } from 'react';

const categoryIconComponents: Record<string, React.ReactNode> = {
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

function getCategoryIconComponent(slug: string) {
  return categoryIconComponents[slug] || categoryIconComponents.hot;
}

export function NewsCard({
  article,
  variant = 'default',
  showCategory = true,
  showAuthor = false,
  showStats = true,
  showImage = true,
  className,
}: {
  article: NewsArticle;
  variant?: 'default' | 'featured' | 'compact' | 'horizontal' | 'list';
  showCategory?: boolean;
  showAuthor?: boolean;
  showStats?: boolean;
  showImage?: boolean;
  className?: string;
}) {
  const categoryColor = getCategoryColor(article.category.slug);
  const categoryIcon = getCategoryIconComponent(article.category.slug);
  const readTime = calculateReadTime(article.content);

  const variants = {
    default: '',
    featured: '',
    compact: '',
    horizontal: 'flex flex-col sm:flex-row',
    list: 'flex flex-col sm:flex-row',
  };

  const imageSizes = {
    default: 'aspect-video',
    featured: 'aspect-[16/9]',
    compact: 'aspect-video w-full sm:w-48',
    horizontal: 'aspect-video w-full sm:w-64',
    list: 'aspect-video w-full sm:w-48',
  };

  const content = (
    <Link to={`/article/${article.slug}`} className="block group" aria-label={`Baca artikel: ${article.title}`}>
      {showImage && (
        <div className={cn('relative overflow-hidden rounded-t-xl sm:rounded-tl-xl sm:rounded-tr-none sm:rounded-bl-xl', variants[variant], imageSizes[variant])}>
          <OptimizedImage
            src={article.featuredImage.url}
            alt={article.featuredImage.alt}
            width={article.featuredImage.width}
            height={article.featuredImage.height}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {showCategory && (
            <div className="absolute top-2 left-2">
              <Badge variant="category" color={categoryColor} className="gap-1.5">
                {categoryIcon}
                <span>{article.category.name}</span>
              </Badge>
            </div>
          )}
          {article.isBreaking && (
            <div className="absolute top-2 right-2">
              <Badge variant="category" color="#DC3545" className="gap-1.5 animate-pulse">
                <Zap className="h-3.5 w-3.5" />
                <span>Breaking</span>
              </Badge>
            </div>
          )}
          {article.isFeatured && !article.isBreaking && (
            <div className="absolute top-2 right-2">
              <Badge variant="category" color={categoryColor} className="gap-1.5">
                <span>Unggulan</span>
              </Badge>
            </div>
          )}
        </div>
      )}

      <div className={cn('p-4 flex flex-col flex-1', variant === 'horizontal' && 'sm:pt-0')}>
        {showCategory && !showImage && (
          <Badge variant="category" color={categoryColor} className="mb-2 self-start gap-1.5">
            {categoryIcon}
            <span>{article.category.name}</span>
          </Badge>
        )}

        <h3 className={cn(
          'font-heading font-semibold text-primary dark:text-white line-clamp-2 group-hover:text-accent transition-colors',
          variant === 'featured' ? 'text-xl' : variant === 'compact' ? 'text-base' : 'text-lg'
        )}>
          {article.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
          {article.excerpt}
        </p>

        {(showStats || showAuthor) && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {showAuthor && article.author && (
              <span className="flex items-center gap-1">
                {article.author.avatar ? (
                  <img src={article.author.avatar} alt="" className="h-4 w-4 rounded-full" />
                ) : (
                  <div className="h-4 w-4 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium text-xs">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <span className="font-medium text-gray-700 dark:text-gray-300">{article.author.name}</span>
              </span>
            )}
            {showStats && (
              <>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatRelativeTime(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {readTime} min baca
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  {article.viewCount.toLocaleString('id-ID')}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </Link>
  );

  if (variant === 'horizontal' || variant === 'list') {
    return (
      <Card variant={variant === 'horizontal' ? 'horizontal' : 'default'} hover className={cn(variants[variant], className)}>
        {content}
      </Card>
    );
  }

  return (
    <Card hover className={cn(variants[variant], className)}>
      {content}
    </Card>
  );
}

export function NewsCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'featured' | 'compact' | 'horizontal' }) {
  return (
    <Card variant={variant === 'horizontal' ? 'horizontal' : 'default'} className="animate-pulse">
      {variant === 'horizontal' ? (
        <div className="flex flex-col sm:flex-row">
          <div className="aspect-video w-full sm:w-64 bg-gray-200 dark:bg-gray-700" />
          <div className="p-4 flex flex-col flex-1 space-y-3">
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-auto" />
          </div>
        </div>
      ) : (
        <>
          <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700" />
          <div className="p-4 space-y-3">
            <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-auto" />
          </div>
        </>
      )}
    </Card>
  );
}