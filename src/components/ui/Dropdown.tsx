import { useState, useRef, useEffect, Fragment } from 'react';
import { cn } from '@/utils';
import { ChevronDown, X } from 'lucide-react';

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  divider?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, items, align = 'right', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={cn('relative inline-block', className)} ref={dropdownRef}>
      <div ref={triggerRef}>{trigger}</div>
      {isOpen && (
        <Fragment>
          <div className="fixed inset-0 z-40" aria-hidden="true" onClick={() => setIsOpen(false)} />
          <div
            className={cn(
              'dropdown-menu z-50 min-w-[180px]',
              align === 'right' ? 'right-0' : 'left-0'
            )}
            role="menu"
            aria-orientation="vertical"
          >
            {items.map((item, index) => (
              <Fragment key={index}>
                {item.divider && (
                  <hr className="my-1 border-gray-100 dark:border-gray-700" role="separator" />
                )}
                {item.href ? (
                  <a
                    href={item.href}
                    className={cn(
                      'dropdown-item',
                      item.danger && 'text-red-600 dark:text-red-400',
                      item.disabled && 'opacity-50 pointer-events-none'
                    )}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => setIsOpen(false)}
                    disabled={item.disabled}
                  >
                    {item.icon && <span className="mr-2 flex h-4 w-4">{item.icon}</span>}
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      'dropdown-item w-full',
                      item.danger && 'text-red-600 dark:text-red-400',
                      item.disabled && 'opacity-50 pointer-events-none'
                    )}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    disabled={item.disabled}
                  >
                    {item.icon && <span className="mr-2 flex h-4 w-4">{item.icon}</span>}
                    {item.label}
                  </button>
                )}
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
}

interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function DropdownTrigger({ children, className, 'aria-label': ariaLabel }: DropdownTriggerProps) {
  return (
    <button
      type="button"
      className={cn('inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors', className)}
      aria-haspopup="true"
      aria-expanded="false"
      aria-label={ariaLabel}
    >
      {children}
      <ChevronDown className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}