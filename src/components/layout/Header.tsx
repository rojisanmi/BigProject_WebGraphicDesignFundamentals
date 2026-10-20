import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search, Heart, Bell, ChevronDown } from 'lucide-react';
import { cn } from '@/utils';
import { Button } from '@/components/ui';
import { Dropdown, DropdownTrigger } from '@/components/ui/Dropdown';
import { categories } from '@/data/categories';
import { useDarkMode } from '@/hooks/useDarkMode';

const navCategories = [
  { slug: 'hot', name: 'HotNYUS' },
  { slug: 'sport', name: 'SportNYUS' },
  { slug: 'oto', name: 'OtoNYUS' },
  { slug: 'travel', name: 'TravelNYUS' },
  { slug: 'food', name: 'FoodNYUS' },
  { slug: 'health', name: 'HealthNYUS' },
  { slug: 'finance', name: 'FinanceNYUS' },
  { slug: 'lifestyle', name: 'LifestyleNYUS' },
  { slug: 'global', name: 'GlobalNYUS' },
  { slug: 'science', name: 'ScienceNYUS' },
  { slug: 'hype', name: 'HypeNYUS' },
];

const socialLinks = [
  { name: 'Facebook', icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
  { name: 'Twitter', icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg> },
  { name: 'Instagram', icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
  { name: 'YouTube', icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L16.278 12z" /></svg> },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const location = useLocation();
  const { isDark, toggleDark } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setHoveredCategory(null);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('q')?.toString().trim();
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-[#0F0F1A]/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex h-16 lg:h-14 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-2"
            aria-label="Briking Nyus - Home"
          >
            <div className="relative">
              <img
                src="/images/logo.gif"
                alt=""
                width="40"
                height="40"
                className="h-10 w-10 object-contain"
                aria-hidden="true"
              />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-xl sm:text-2xl text-primary dark:text-white hidden sm:block">
              Briking<span className="text-accent">Nyus</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            <Link
              to="/"
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                location.pathname === '/'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Beranda
              </span>
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" onMouseEnter={() => setHoveredCategory('all')} onMouseLeave={() => setHoveredCategory(null)}>
              <Dropdown>
                <DropdownTrigger 
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1',
                    hoveredCategory === 'all' ? 'bg-gray-100 dark:bg-gray-800' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                  aria-label="Categories"
                >
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Kategori
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  </span>
                </DropdownTrigger>
                <Dropdown
                  items={[
                    { label: 'Semua Kategori', href: '/', divider: false },
                    { divider: true },
                    ...navCategories.map((cat) => ({
                      label: cat.name,
                      href: `/category/${cat.slug}`,
                      icon: <span className="w-5 h-5 flex items-center justify-center" style={{ color: cat.slug === 'hot' ? '#FF6B35' : cat.slug === 'sport' ? '#28A745' : cat.slug === 'food' ? '#E83E8C' : cat.slug === 'global' ? '#FD7E14' : cat.slug === 'science' ? '#6F42C1' : cat.slug === 'lifestyle' ? '#E83E8C' : cat.slug === 'health' ? '#DC3545' : cat.slug === 'finance' ? '#198754' : cat.slug === 'travel' ? '#0DCAF0' : cat.slug === 'oto' ? '#6C757D' : '#FF1493' }}>
                        {cat.slug === 'hot' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 4-5 4-5s4 3 4 5 1 1 1 1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16a5 5 0 00-5-5" /></svg>}
                        {cat.slug === 'sport' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        {cat.slug === 'food' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
                        {cat.slug === 'global' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>}
                        {cat.slug === 'science' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14.064v3.591a1 1 0 001.447.895l3.847-2.564a1 1 0 000-1.789l-3.846-2.564A1 1 0 0010 8.44v3.624z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 2v2.2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.56 11.92a10.97 10.97 0 0110.88 0" /></svg>}
                        {cat.slug === 'lifestyle' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                        {cat.slug === 'health' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 002 12v9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9v3a2 2 0 01-2 2H5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 00-9-9" /></svg>}
                        {cat.slug === 'finance' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="12" y1="1" x2="12" y2="23" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>}
                        {cat.slug === 'travel' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 4-5 4-5s4 3 4 5 1 1 1 1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16a5 5 0 00-5-5" /></svg>}
                        {cat.slug === 'oto' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.92 6.01c-.144-.03-.287-.06-.431-.092a4.004 4.004 0 00-1.777-.516 2 2 0 00-1.722.958l-.123.123-2.828 2.828a2 2 0 01-2.828 0L8.155 8.62l-.123-.122a2 2 0 00-1.722-.958 4.004 4.004 0 00-1.777.516c-.246.07-.484.187-.706.35a9.617 9.617 0 00-.762 1.171 10 10 0 00-.287 2.511c0 .923.074 1.839.214 2.738a1 1 0 01-.744.995 12.512 12.512 0 01-3.01 0 1 1 0 01-.745-.995c.14-.898.214-1.813.214-2.738a10 10 0 00-.287-2.51 9.62 9.62 0 00-.762-1.17c-.222-.162-.46-.28-.706-.35A4.004 4.004 0 002 6.01c-.542 0-1.017.283-1.279.697A7.02 7.02 0 00.473 9.4a4 4 0 000 5.201c.148.23.345.455.56.67 3.076 2.956 8.332 2.956 11.407 0 .215-.214.412-.438.56-.67a4 4 0 000-5.201 7.02 7.02 0 00-.57-2.69c-.262-.414-.737-.697-1.279-.697zm-2.636 1.509a1 1 0 01.553.14l1.026 1.027a1 1 0 001.414 0l1.027-1.027a1 1 0 011.553-.14c.483 0 .955.221 1.27.57a4.5 4.5 0 011.191 1.936c.054.187.092.376.106.567a1 1 0 01-.836 1.185 12 12 0 01-2.337.738 1 1 0 01-.917-.47 7 7 0 00-2.136-2.137 1 1 0 01-.47-.917 12 12 0 01.738-2.337 1 1 0 011.185-.836c.19.014.38.052.567.106a4.5 4.5 0 011.936 1.191c.35.315.57.786.57 1.27zM9 15a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>}
                        {cat.slug === 'hype' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M21 3v4M19 5h-4M5 21v-4M3 19h4M21 21v-4M19 19h-4" /></svg>}
                      </span>
                    })),
                    { divider: true },
                    { label: 'Mungkin Anda Suka', href: '/recommended' },
                  ]}
                  align="left"
                />
              </Dropdown>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* Search Toggle (Mobile) */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              onClick={toggleDark}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="h-5 w-5 rotate-0 transition-transform duration-300" />
              ) : (
                <Moon className="h-5 w-5 rotate-0 transition-transform duration-300" />
              )}
            </button>

            {/* Bookmarks */}
            <Link
              to="/bookmarks"
              className="hidden sm:flex p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              aria-label="Bookmarks"
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Link>

            {/* Notifications */}
            <button
              type="button"
              className="hidden sm:flex p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden animate-slide-down border-t border-gray-100 dark:border-gray-800 px-4 py-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                name="q"
                placeholder="Cari berita, topik, atau kata kunci..."
                className="input pl-10"
                autoFocus
                aria-label="Search news"
              />
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-[#0F0F1A] animate-slide-down"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b border-gray-100 dark:border-gray-800 px-4">
              <span className="font-heading font-semibold text-primary dark:text-white">Menu</span>
              <button
                type="button"
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
              <div>
                <Link
                  to="/"
                  className={cn(
                    'block px-3 py-2 rounded-lg text-base font-medium',
                    location.pathname === '/'
                      ? 'bg-accent text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Beranda
                  </span>
                </Link>
              </div>

              <div>
                <h3 className="overline mb-3">Kategori</h3>
                <ul className="space-y-1" role="list">
                  {navCategories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        to={`/category/${cat.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="w-5 h-5 flex items-center justify-center" style={{ color: cat.slug === 'hot' ? '#FF6B35' : cat.slug === 'sport' ? '#28A745' : cat.slug === 'food' ? '#E83E8C' : cat.slug === 'global' ? '#FD7E14' : cat.slug === 'science' ? '#6F42C1' : cat.slug === 'lifestyle' ? '#E83E8C' : cat.slug === 'health' ? '#DC3545' : cat.slug === 'finance' ? '#198754' : cat.slug === 'travel' ? '#0DCAF0' : cat.slug === 'oto' ? '#6C757D' : '#FF1493' }}>
                          {cat.slug === 'hot' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 4-5 4-5s4 3 4 5 1 1 1 1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16a5 5 0 00-5-5" /></svg>}
                          {cat.slug === 'sport' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                          {cat.slug === 'food' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
                          {cat.slug === 'global' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>}
                          {cat.slug === 'science' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14.064v3.591a1 1 0 001.447.895l3.847-2.564a1 1 0 000-1.789l-3.846-2.564A1 1 0 0010 8.44v3.624z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 2v2.2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.56 11.92a10.97 10.97 0 0110.88 0" /></svg>}
                          {cat.slug === 'lifestyle' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                          {cat.slug === 'health' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 002 12v9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9v3a2 2 0 01-2 2H5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 00-9-9" /></svg>}
                          {cat.slug === 'finance' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="12" y1="1" x2="12" y2="23" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>}
                          {cat.slug === 'travel' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 4-5 4-5s4 3 4 5 1 1 1 1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16a5 5 0 00-5-5" /></svg>}
                          {cat.slug === 'oto' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.92 6.01c-.144-.03-.287-.06-.431-.092a4.004 4.004 0 00-1.777-.516 2 2 0 00-1.722.958l-.123.123-2.828 2.828a2 2 0 01-2.828 0L8.155 8.62l-.123-.122a2 2 0 00-1.722-.958 4.004 4.004 0 00-1.777.516c-.246.07-.484.187-.706.35a9.617 9.617 0 00-.762 1.171 10 10 0 00-.287 2.511c0 .923.074 1.839.214 2.738a1 1 0 01-.744.995 12.512 12.512 0 01-3.01 0 1 1 0 01-.745-.995c.14-.898.214-1.813.214-2.738a10 10 0 00-.287-2.51 9.62 9.62 0 00-.762-1.17c-.222-.162-.46-.28-.706-.35A4.004 4.004 0 002 6.01c-.542 0-1.017.283-1.279.697A7.02 7.02 0 00.473 9.4a4 4 0 000 5.201c.148.23.345.455.56.67 3.076 2.956 8.332 2.956 11.407 0 .215-.214.412-.438.56-.67a4 4 0 000-5.201 7.02 7.02 0 00-.57-2.69c-.262-.414-.737-.697-1.279-.697zm-2.636 1.509a1 1 0 01.553.14l1.026 1.027a1 1 0 001.414 0l1.027-1.027a1 1 0 011.553-.14c.483 0 .955.221 1.27.57a4.5 4.5 0 011.191 1.936c.054.187.092.376.106.567a1 1 0 01-.836 1.185 12 12 0 01-2.337.738 1 1 0 01-.917-.47 7 7 0 00-2.136-2.137 1 1 0 01-.47-.917 12 12 0 01.738-2.337 1 1 0 011.185-.836c.19.014.38.052.567.106a4.5 4.5 0 011.936 1.191c.35.315.57.786.57 1.27zM9 15a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>}
                          {cat.slug === 'hype' && <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M21 3v4M19 5h-4M5 21v-4M3 19h4M21 21v-4M19 19h-4" /></svg>}
                        </span>
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <h3 className="overline mb-3">Ikuti Kami</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="text-gray-500 hover:text-accent transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}