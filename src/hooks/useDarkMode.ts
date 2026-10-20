import { useState, useEffect, useCallback } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  const toggleDark = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const setDark = useCallback((value: boolean) => {
    setIsDark(value);
  }, []);

  return { isDark, toggleDark, setDark };
}