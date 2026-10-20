import { cn } from '@/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  ariaLabel?: string;
}

export function LoadingSpinner({ size = 'md', className, ariaLabel = 'Loading' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
    xl: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex items-center justify-center" role="status" aria-live="polite">
      <svg
        className={cn('animate-spin text-accent', sizes[size], className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'title' | 'image' | 'card' | 'avatar';
  lines?: number;
}

export function Skeleton({ className, variant = 'text', lines = 1, ...props }: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';

  switch (variant) {
    case 'text':
      return (
        <div className={cn(baseStyles, 'h-4 w-full', className)} {...props} />
      );
    case 'title':
      return (
        <div className={cn(baseStyles, 'h-6 w-3/4', className)} {...props} />
      );
    case 'image':
      return (
        <div className={cn(baseStyles, 'aspect-video w-full', className)} {...props} />
      );
    case 'avatar':
      return (
        <div className={cn(baseStyles, 'h-10 w-10 rounded-full', className)} {...props} />
      );
    case 'card':
      return (
        <div className={cn(baseStyles, 'rounded-xl overflow-hidden', className)} {...props}>
          <div className="aspect-video w-full" />
          <div className="p-4 space-y-3">
            <div className="h-6 w-3/4" />
            <div className="h-4 w-full" />
            <div className="h-4 w-5/6" />
          </div>
        </div>
      );
    default:
      return (
        <div className={cn(baseStyles, className)} {...props} />
      );
  }
}

export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export function SkeletonList(count: number = 4) {
  return (
    <div className="news-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}