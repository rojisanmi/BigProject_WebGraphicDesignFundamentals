import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', hover = false, className, ...props }, ref) => {
    const baseStyles = 'bg-white dark:bg-gray-900 rounded-xl shadow-card overflow-hidden transition-all duration-300';
    const variants = {
      default: '',
      featured: '',
      compact: 'p-4',
      horizontal: 'flex flex-col sm:flex-row',
    };
    const hoverStyles = hover ? 'hover:shadow-card-hover hover:-translate-y-1' : '';

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-0', className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ children, className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-heading font-semibold text-primary dark:text-white', className)} {...props}>
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ children, className, ...props }, ref) => (
    <p ref={ref} className={cn('text-muted-foreground text-sm mt-1', className)} {...props}>
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0 border-t border-gray-100 dark:border-gray-800', className)} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export const CardImage = forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn('w-full h-auto object-cover', className)}
      loading="lazy"
      {...props}
    />
  )
);
CardImage.displayName = 'CardImage';