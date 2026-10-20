import { useState, forwardRef, type ImgHTMLAttributes } from 'react';
import { cn } from '@/utils';
import { Skeleton } from './LoadingSpinner';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'skeleton';
  blurDataURL?: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      priority = false,
      placeholder = 'skeleton',
      blurDataURL,
      className,
      objectFit = 'cover',
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(priority);

    // Intersection Observer for lazy loading
    useEffect(() => {
      if (priority || isInView) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '100px', threshold: 0.01 }
      );

      const imgElement = ref.current;
      if (imgElement) {
        observer.observe(imgElement);
      }

      return () => observer.disconnect();
    }, [priority, isInView, ref]);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoaded(true);
      onLoad?.(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true);
      onError?.(e);
    };

    if (hasError) {
      return (
        <div
          ref={ref}
          className={cn(
            'bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400',
            className
          )}
          style={{ width, height }}
          role="img"
          aria-label={`Failed to load: ${alt}`}
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      );
    }

    if (!isLoaded && !isInView && placeholder === 'skeleton') {
      return <Skeleton variant="image" className={className} style={{ width, height }} />;
    }

    if (!isLoaded && !isInView && placeholder === 'blur' && blurDataURL) {
      return (
        <img
          ref={ref}
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className={cn(
            'w-full h-full object-cover blur-lg transition-all duration-500',
            className
          )}
          style={{ width, height, objectFit }}
        />
      );
    }

    return (
      <img
        ref={ref}
        src={isInView ? src : blurDataURL || ''}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        style={{ objectFit }}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export function Picture({
  sources,
  fallback,
  alt,
  className,
  ...props
}: {
  sources: Array<{ srcSet: string; media?: string; type?: string }>;
  fallback: OptimizedImageProps;
  alt: string;
  className?: string;
}) {
  return (
    <picture className={className}>
      {sources.map((source, index) => (
        <source key={index} srcSet={source.srcSet} media={source.media} type={source.type} />
      ))}
      <OptimizedImage {...fallback} alt={alt} {...props} />
    </picture>
  );
}