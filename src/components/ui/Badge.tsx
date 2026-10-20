import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'category' | 'outline' | 'dot';
  color?: string;
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', color, size = 'md', className, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center gap-1.5 font-medium rounded-full';
    const variants = {
      default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      category: 'text-white',
      outline: 'border border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300',
      dot: 'bg-transparent p-0',
    };
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
    };

    const style = color && (variant === 'category' || variant === 'dot') ? { backgroundColor: color } : undefined;
    const textColor = color && variant === 'category' ? { color: '#ffffff' } : undefined;

    if (variant === 'dot') {
      return (
        <span
          ref={ref}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          style={style}
          {...props}
        >
          <span
            className="relative flex h-5 w-5 items-center justify-center"
            style={textColor}
          >
            <span className="absolute h-1.5 w-1.5 rounded-full bg-current" />
            {children}
          </span>
        </span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        style={style}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';