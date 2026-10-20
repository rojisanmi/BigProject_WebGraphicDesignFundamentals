import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, locale: string = 'id-ID'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: string | Date, locale: string = 'id-ID'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(date: string | Date, locale: string = 'id-ID'): string {
  const d = new Date(date);
  return d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function formatRelativeTime(date: string | Date, locale: string = 'id-ID'): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Baru saja';
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  
  return formatDateShort(d, locale);
}

export function calculateReadTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function getCategoryColor(slug: string): string {
  const colors: Record<string, string> = {
    hot: '#FF6B35',
    sport: '#28A745',
    food: '#E83E8C',
    global: '#FD7E14',
    science: '#6F42C1',
    lifestyle: '#E83E8C',
    health: '#DC3545',
    finance: '#198754',
    travel: '#0DCAF0',
    oto: '#6C757D',
    hype: '#FF1493',
  };
  return colors[slug] || '#6C757D';
}

export function getCategoryIcon(slug: string): string {
  const icons: Record<string, string> = {
    hot: 'flame',
    sport: 'trophy',
    food: 'utensils',
    global: 'globe',
    science: 'flask-conical',
    lifestyle: 'heart',
    health: 'heart-pulse',
    finance: 'dollar-sign',
    travel: 'plane',
    oto: 'car',
    hype: 'sparkles',
  };
  return icons[slug] || 'newspaper';
}

export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

export function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function shareArticle(data: { title: string; url: string; text?: string }): Promise<void> {
  if (navigator.share) {
    return navigator.share(data);
  }
  return copyToClipboard(data.url);
}

export function getQueryParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function setQueryParam(key: string, value: string): void {
  const params = getQueryParams();
  params.set(key, value);
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}

export function removeQueryParam(key: string): void {
  const params = getQueryParams();
  params.delete(key);
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}