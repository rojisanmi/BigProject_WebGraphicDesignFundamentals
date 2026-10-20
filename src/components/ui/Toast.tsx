import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>,
    document.body
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(toast.id), 200);
    }, toast.duration ?? 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const styles = {
    success: 'border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20',
    error: 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20',
    warning: 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
    info: 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20',
  };

  const Icon = icons[toast.type];

  return (
    <div
      className={cn(
        'toast pointer-events-auto flex items-start gap-3 min-w-[300px] max-w-md',
        styles[toast.type],
        isExiting && 'animate-out fade-out slide-out-to-right'
      )}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5 text-current">
        <Icon className={cn(
          'h-5 w-5',
          toast.type === 'success' && 'text-green-500',
          toast.type === 'error' && 'text-red-500',
          toast.type === 'warning' && 'text-yellow-500',
          toast.type === 'info' && 'text-blue-500'
        )} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{toast.title}</p>
        {toast.message && (
          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{toast.message}</p>
        )}
        {toast.action && (
          <button
            type="button"
            className="mt-2 text-sm font-medium text-accent hover:text-accent-hover underline"
            onClick={() => {
              toast.action.onClick();
              onRemove(toast.id);
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss notification"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export function toast({
  type = 'info',
  title,
  message,
  duration,
  action,
}: Omit<Toast, 'id'>) {
  // This is a helper for non-React contexts, but requires the context
  // In practice, you'd use useToast() hook in components
  console.warn('toast() helper requires ToastProvider context. Use useToast() hook instead.');
}