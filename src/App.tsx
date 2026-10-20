import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageLayout } from '@/components/layout/PageLayout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const CategoryPage = lazy(() => import('@/pages/Category').then(m => ({ default: m.CategoryPage })));
const ArticlePage = lazy(() => import('@/pages/Article').then(m => ({ default: m.ArticlePage })));
const SearchPage = lazy(() => import('@/pages/Search').then(m => ({ default: m.SearchPage })));
const ContactPage = lazy(() => import('@/pages/Contact').then(m => ({ default: m.ContactPage })));
const AboutPage = lazy(() => import('@/pages/About').then(m => ({ default: m.AboutPage })));
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })));

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <Routes>
            <Route path="/" element={<PageLayout><Home /></PageLayout>} />
            <Route path="/category/:slug" element={<PageLayout><CategoryPage /></PageLayout>} />
            <Route path="/article/:slug" element={<PageLayout><ArticlePage /></PageLayout>} />
            <Route path="/search" element={<PageLayout><SearchPage /></PageLayout>} />
            <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
            <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
            <Route path="/404" element={<PageLayout><NotFound /></PageLayout>} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;