import DOMPurify from 'dompurify';
import { useEffect, useRef } from 'react';
import { cn } from '@/utils';
import { OptimizedImage } from '@/components/ui/Image';
import { Badge } from '@/components/ui';
import type { NewsArticle, ImageAsset } from '@/types';

interface ArticleBodyProps {
  article: NewsArticle;
  className?: string;
}

export function ArticleBody({ article, className }: ArticleBodyProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Enhance images with lazy loading and lightbox
      const images = contentRef.current.querySelectorAll('img');
      images.forEach((img) => {
        img.loading = 'lazy';
        img.classList.add('rounded-lg', 'my-6', 'max-w-full', 'h-auto');
      });

      // Enhance links
      const links = contentRef.current.querySelectorAll('a');
      links.forEach((link) => {
        if (link.href.startsWith('http')) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.classList.add('text-accent', 'underline', 'hover:text-accent-hover');
        }
      });

      // Enhance blockquotes
      const blockquotes = contentRef.current.querySelectorAll('blockquote');
      blockquotes.forEach((bq) => {
        bq.classList.add('border-l-4', 'border-accent', 'pl-4', 'italic', 'text-gray-600', 'dark:text-gray-400', 'my-4');
      });

      // Enhance code blocks
      const codeBlocks = contentRef.current.querySelectorAll('pre');
      codeBlocks.forEach((block) => {
        block.classList.add('bg-gray-100', 'dark:bg-gray-800', 'p-4', 'rounded-lg', 'overflow-x-auto', 'my-4');
      });
    }
  }, [article.content]);

  const sanitizedContent = DOMPurify.sanitize(article.content, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img', 'figure', 'figcaption',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'div', 'span',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'width', 'height', 'target', 'rel', 'class', 'id'],
  });

  return (
    <article className={cn('prose prose-lg dark:prose-invert max-w-none', className)}>
      <div
        ref={contentRef}
        className="article-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </article>
  );
}

interface ArticleHeroProps {
  article: NewsArticle;
  className?: string;
}

export function ArticleHero({ article, className }: ArticleHeroProps) {
  return (
    <header className={cn('mb-8', className)}>
      {article.featuredImage && (
        <figure className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
          <OptimizedImage
            src={article.featuredImage.url}
            alt={article.featuredImage.alt}
            width={article.featuredImage.width}
            height={article.featuredImage.height}
            priority
            className="w-full h-full object-cover"
          />
          {article.featuredImage.credit && (
            <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm">
              {article.featuredImage.credit}
            </figcaption>
          )}
        </figure>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className="badge-category"
          style={{ backgroundColor: article.category.color }}
        >
          {article.category.name}
        </span>
        {article.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
        ))}
      </div>

      <h1 className="heading-1 mb-4">{article.title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
        {article.author && (
          <div className="flex items-center gap-2">
            {article.author.avatar ? (
              <img src={article.author.avatar} alt="" className="h-8 w-8 rounded-full" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium">
                {article.author.name.charAt(0)}
              </div>
            )}
            <span className="font-medium text-gray-700 dark:text-gray-300">{article.author.name}</span>
          </div>
        )}
        <time dateTime={article.publishedAt}>
          {new Date(article.publishedAt).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })} WIB
        </time>
        {article.updatedAt !== article.publishedAt && (
          <>
            <span aria-hidden="true">·</span>
            <time dateTime={article.updatedAt}>
              Diperbarui: {new Date(article.updatedAt).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </>
        )}
        <span aria-hidden="true">·</span>
        <span>{article.readTime} min baca</span>
      </div>
    </header>
  );
}

interface ArticleMetaProps {
  article: NewsArticle;
  onShare?: (platform: string) => void;
  className?: string;
}

export function ArticleMeta({ article, onShare, className }: ArticleMetaProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${article.title} - Briking Nyus`;

  const shareLinks = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.52 3.46A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12c0 2.31.64 4.47 1.78 6.38L0 24l6.38-1.78A12.06 12.06 0 0012 24c6.63 0 12-5.37 12-12a12.07 12.07 0 00-3.48-8.54zM12 21.35c-5.16 0-9.35-4.19-9.35-9.35S6.84 2.65 12 2.65 21.35 6.84 21.35 12 17.16 21.35 12 21.35zm3.78-6.14c-.14-.07-.62-.35-1.07-.63-.44-.28-.72-.44-.87-.52-.14-.08-.33-.13-.52.14-.19.27-.62.78-.77 1.15-.15.37-.15.52-.07.67.27.44 1.02.87 1.12.92.25.13 3.55 1.59 4.57.92 1.02-.66 1.57-2.04 1.67-2.53.1-.48.07-.82-.12-1.18-.2-.36-.62-.64-1.1-.64-.37 0-.77.1-.97.26-.3.24-.72.5-.77.62-.07.18-.25.13-.42-.02-.18-.16-.53-.4-.82-.7-.28-.28-.48-.47-.62-.58-.15-.12-.33-.08-.45.08-.23.29-.57.64-.82 1.2l-.46.98c-.07.18-.07.28-.2.28-.28 0-.58-.15-.97-.4-.39-.24-.53-.3-.67-.33-.2-.05-.41-.02-.62.13l-.57.4c-.35.25-.73.38-1.02.2-.3-.17-.52-.3-.77-.37-.28-.08-.63-.08-.87 0-.28.08-.5.19-.74.34-.6.38-1.4.84-2.02 1.32-.66.5-1.1 1-.98 1.07.13.07 1.02-.02 1.63.6.32.33.57.78.57 1.33 0 .56-.24 1.02-.63 1.32l-.72.58c-.33.27-.45.43-.48.52-.03.08-.02.17.07.33.1.17.3.56.73.9.5.42 1.48.64 2.28.64.64 0 1.15-.1 1.6-.34.4-.2.76-.53.76-1.03 0-.52-.2-.95-.6-1.23-.3-.2-.8-.5-1.2-.8-.4-.3-.6-.5-.6-.62 0-.1.1-.3.2-.35.07-.04 1.5-.7 3.08-2.08 1.75-1.5 2.67-2.3 3.13-2.8.4-.4.52-.5.7-.5.33 0 .48.1.62.3.3.3.3.6.3.87 0 .4-.32.9-.76 1.36-.44.46-1.08 1.02-1.67 1.47-.7.53-1.45 1.02-1.97 1.1-.3.06-.5.08-.73.08-.27 0-.5-.02-.7-.1-.2-.08-.4-.15-.58-.3" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      ),
    },
    {
      name: 'Copy Link',
      href: '#',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      onClick: (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(shareUrl);
        onShare?.('copy');
      },
    },
  ];

  return (
    <div className={cn('flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100 dark:border-gray-800', className)}>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Bagikan:</span>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={link.onClick}
            className="p-2 rounded-lg text-gray-500 hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors"
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

interface RelatedArticlesProps {
  articles: NewsArticle[];
  title?: string;
  className?: string;
}

export function RelatedArticles({ articles, title = 'Berita Terkait', className }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className={cn('mt-12', className)} aria-labelledby="related-heading">
      <h2 id="related-heading" className="heading-3 mb-6">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.id}>
            <Link to={`/article/${article.slug}`} className="block group">
              {article.featuredImage && (
                <div className="aspect-video rounded-lg overflow-hidden mb-3">
                  <OptimizedImage
                    src={article.featuredImage.url}
                    alt={article.featuredImage.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <h3 className="font-heading font-semibold text-primary dark:text-white line-clamp-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <time className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
                {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';