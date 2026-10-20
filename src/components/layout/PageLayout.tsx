import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={className}>
      <div className="pt-16 pb-4 min-h-screen">
        {children}
      </div>
    </div>
  );
}

export function Section({ children, className, id, ariaLabel }: {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section id={id} aria-label={ariaLabel} className={className}>
      {children}
    </section>
  );
}

export function Container({ children, className, size = 'default' }: {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}) {
  const sizes = {
    default: 'max-w-7xl',
    narrow: 'max-w-3xl',
    wide: 'max-w-[90rem]',
    full: 'max-w-full',
  };

  return (
    <div className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Grid({ children, className, columns = 1, gap = 6, responsive = true }: {
  children: ReactNode;
  className?: string;
  columns?: number | { base: number; sm: number; md: number; lg: number; xl: number };
  gap?: number;
  responsive?: boolean;
}) {
  let gridCols = '';
  
  if (typeof columns === 'number') {
    gridCols = `grid-cols-${columns}`;
  } else if (responsive) {
    const { base = 1, sm = 2, md = 3, lg = 4, xl = 5 } = columns;
    gridCols = `grid-cols-${base} sm:grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl}`;
  } else {
    gridCols = `grid-cols-${columns.base}`;
  }

  return (
    <div className={`grid gap-${gap} ${gridCols} ${className}`}>
      {children}
    </div>
  );
}

export function Flex({ children, className, direction, justify, align, gap, wrap, flex }: {
  children: ReactNode;
  className?: string;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  gap?: number;
  wrap?: boolean;
  flex?: number | string;
}) {
  const dir = direction ? `flex-${direction}` : '';
  const jst = justify ? `justify-${justify}` : '';
  const al = align ? `items-${align}` : '';
  const gp = gap ? `gap-${gap}` : '';
  const wr = wrap ? 'flex-wrap' : '';
  const fl = flex ? `flex-${flex}` : '';

  return (
    <div className={`flex ${dir} ${jst} ${al} ${gp} ${wr} ${fl} ${className}`}>
      {children}
    </div>
  );
}

export function Stack({ children, className, direction = 'vertical', spacing = 4, divider }: {
  children: ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  spacing?: number;
  divider?: ReactNode;
}) {
  const childArray = React.Children.toArray(children);
  
  return (
    <div className={cn('space-y-0', className)} role="list">
      {childArray.map((child, index) => (
        <div key={index} className={cn(
          direction === 'vertical' ? `space-y-${spacing}` : `space-x-${spacing}`,
          index > 0 && divider && 'relative'
        )} role="listitem">
          {index > 0 && divider && (
            <div className="absolute -top-px left-0 right-0" aria-hidden="true">
              {divider}
            </div>
          )}
          {child}
        </div>
      ))}
    </div>
  );
}

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}