import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';
import { NewsCard } from './NewsCard';
import type { NewsArticle } from '@/types';

interface NewsGridProps {
  articles: NewsArticle[];
  variant?: 'default' | 'featured' | 'compact' | 'horizontal' | 'list';
  columns?: { base: number; sm: number; md: number; lg: number; xl: number };
  showCategory?: boolean;
  showAuthor?: boolean;
  showStats?: boolean;
  className?: string;
  skeletonCount?: number;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function NewsGrid({
  articles,
  variant = 'default',
  columns = { base: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  showCategory = true,
  showAuthor = false,
  showStats = true,
  className,
  skeletonCount = 4,
  isLoading = false,
  emptyMessage = 'Tidak ada berita ditemukan.',
}: NewsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6" style={{
        gridTemplateColumns: `repeat(${columns.base}, 1fr)`
      }}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <NewsCard.Skeleton key={i} variant={variant} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  const gridCols = `grid-cols-${columns.base} sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} xl:grid-cols-${columns.xl}`;

  return (
    <div className={cn('grid gap-6', gridCols, className)} role="list">
      {articles.map((article, index) => (
        <NewsCard
          key={article.id}
          article={article}
          variant={variant}
          showCategory={showCategory}
          showAuthor={showAuthor}
          showStats={showStats}
        />
      ))}
    </div>
  );
}

interface NewsCarouselProps {
  articles: NewsArticle[];
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function NewsCarousel({
  articles,
  autoPlay = true,
  interval = 5000,
  showIndicators = true,
  showArrows = true,
  className,
}: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoPlay || articles.length <= 1) return;

    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % articles.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, articles.length, interval, isHovered]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  }, [articles.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  }, [articles.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className={cn('relative', className)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          role="group"
          aria-roledescription="carousel"
        >
          {articles.map((article, index) => (
            <div key={article.id} className="w-full flex-shrink-0 px-2" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${articles.length}`}>
              <NewsCard article={article} variant="featured" showStats={false} />
            </div>
          ))}
        </div>
      </div>

      {showArrows && articles.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-lg text-gray-700 dark:text-gray-300 hover:text-accent transition-colors z-10"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-lg text-gray-700 dark:text-gray-300 hover:text-accent transition-colors z-10"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}

      {showIndicators && articles.length > 1 && (
        <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Carousel indicators">
          {articles.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-accent w-6'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-accent/50'
              )}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface BreakingNewsTickerProps {
  articles: NewsArticle[];
  speed?: number;
}

export function BreakingNewsTicker({ articles, speed = 50 }: BreakingNewsTickerProps) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-red-600 text-white overflow-hidden" role="region" aria-label="Breaking news">
      <div className="flex items-center gap-4 px-4 py-2 whitespace-nowrap animate-marquee" style={{ animationDuration: `${articles.length * speed}s` }}>
        {articles.flatMap((article, i) => [
          <span key={`${i}-label`} className="flex-shrink-0 px-3 py-1 bg-white/20 rounded-full font-semibold text-sm">
            BREAKING
          </span>,
          <span key={`${i}-title`} className="flex-shrink-0 font-medium">
            {article.title}
          </span>,
          <span key={`${i}-sep`} className="flex-shrink-0 text-white/50">•</span>,
        ])}
      </div>
    </div>
  );
}