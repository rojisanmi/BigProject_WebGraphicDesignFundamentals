# Briking Nyus - Modern News Portal

A modern, performant, and accessible Indonesian news portal built with React 18, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

### Core Features
- **Modern Stack**: React 18 + TypeScript + Vite 5 + Tailwind CSS 3
- **Real-time News**: Integration with NewsAPI.org, GNews, NewsData.io, and 25+ Indonesian RSS feeds
- **Responsive Design**: Mobile-first, works on all devices (320px - 1920px+)
- **Dark Mode**: System preference + manual toggle with localStorage persistence
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, JSON-LD structured data (NewsArticle, WebSite, BreadcrumbList)
- **Accessibility**: WCAG 2.1 AA compliant, semantic HTML, keyboard navigation, ARIA labels, focus management
- **Performance**: Code splitting, lazy loading, optimized images, caching, bundle splitting
- **PWA Ready**: Installable, offline support via Service Worker (configurable)
- **Type Safe**: Full TypeScript coverage with strict mode

### News Features
- **Breaking News Ticker**: Real-time breaking news marquee
- **Category Pages**: 11 categories with filtering, sorting, pagination
- **Article Pages**: Rich content with hero, meta, related articles, sidebar
- **Search**: Real-time debounced search with facets and filters
- **Trending**: View-count based trending algorithm
- **Bookmarks**: LocalStorage-based bookmark system
- **Reading History**: Local history tracking
- **Newsletter**: Email subscription with validation

### Technical Features
- **IndexedDB**: Client-side caching for offline support
- **TanStack Query**: Server state management with caching, deduping, background refetch
- **React Hook Form**: Form validation with Zod-ready schema
- **DOMPurify**: XSS protection for article content
- **Intersection Observer**: Lazy loading images
- **Virtualized Lists**: For large article sets (ready to implement)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+ or pnpm 8+

### Installation

```bash
# Navigate to project
cd briking-nyus

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your API keys to .env.local
# Get free keys from:
# - NewsAPI.org (https://newsapi.org/register) - 100 req/day
# - GNews (https://gnews.io/register) - 100 req/day
# - NewsData.io (https://newsdata.io/register) - 200 req/day

# Start development server
npm run dev
```

Open http://localhost:3000 to view the app.

## 📁 Project Structure

```
briking-nyus/
├── public/                      # Static assets
│   ├── images/                  # Logos, favicons, article images (60+ files)
│   ├── favicon.svg
│   └── placeholder.jpg
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Base components (Button, Card, Input, etc.)
│   │   ├── layout/              # Layout components (Header, Footer, PageLayout)
│   │   ├── news/                # News-specific components (NewsCard, NewsGrid, ArticleBody)
│   │   └── forms/               # Form components (ContactForm, SearchForm)
│   ├── pages/                   # Page components (route-level)
│   │   ├── Home.tsx             # Landing page with hero, categories, latest
│   │   ├── Category.tsx         # Category listing with filters
│   │   ├── Article.tsx          # Full article with SEO
│   │   ├── Search.tsx           # Search with facets
│   │   ├── Contact.tsx          # Contact form + FAQ
│   │   ├── About.tsx            # About page with team, milestones
│   │   └── NotFound.tsx         # Friendly 404 page
│   ├── hooks/                   # Custom React hooks
│   │   ├── useDarkMode.ts       # Dark mode management
│   │   ├── useNews.ts           # TanStack Query hooks for news data
│   │   └── useSearch.ts         # Search with debouncing
│   ├── services/                # API clients and data fetching
│   │   ├── newsApi.ts           # NewsAPI.org, GNews, NewsData.io
│   │   ├── rssParser.ts         # 25+ Indonesian RSS feeds parser
│   │   └── database.ts          # IndexedDB for client-side caching
│   ├── utils/                   # Utility functions
│   │   └── index.ts             # cn(), date formatting, slug, etc.
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts             # NewsArticle, Category, Author, SEO, etc.
│   ├── styles/                  # Global styles and Tailwind config
│   │   └── globals.css          # Tailwind + custom components layer
│   ├── data/                    # Static data
│   │   └── categories.ts        # 11 categories with colors, icons
│   ├── main.tsx                 # App entry point
│   └── App.tsx                  # Root component with routing
├── index.html                   # HTML template with SEO meta
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── .env.example
└── README.md
```

## 🛠 Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production (output: dist/)
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run test         # Run tests with Vitest
npm run test:ui      # Run tests with UI
```

## 🎨 Design System

### Colors
- **Primary**: `#1A1A2E` (Dark Navy)
- **Accent**: `#E94560` (Coral Red)
- **Category Colors**: Each category has its own brand color
  - Hot: `#FF6B35` | Sport: `#28A745` | Food: `#E83E8C`
  - Global: `#FD7E14` | Science: `#6F42C1` | Lifestyle: `#E83E8C`
  - Health: `#DC3545` | Finance: `#198754` | Travel: `#0DCAF0`
  - Oto: `#6C757D` | Hype: `#FF1493`

### Typography
- **Headings**: Space Grotesk (400-700)
- **Body**: Inter (300-700)
- **Display**: Syne (400-800)

### Components
All UI components in `src/components/ui/` follow consistent patterns:
- **Button**: primary, secondary, outline, ghost, danger variants + sizes
- **Card**: default, featured, compact, horizontal variants
- **Badge**: default, category, outline, dot variants
- **Input/Textarea**: label, error, helper text, icons support
- **Dropdown**: accessible menus with keyboard navigation
- **Modal**: accessible dialogs with focus trap, portal
- **Toast**: notification system with types (success, error, warning, info)
- **OptimizedImage**: lazy loading, blur placeholder, error states

## 📰 News Data Sources

### APIs (Free Tiers)
| API | Free Limit | Indonesian Support | Categories |
|-----|------------|-------------------|------------|
| NewsAPI.org | 100 req/day | ✅ country=id | 7 categories |
| GNews | 100 req/day | ✅ lang=id, country=id | 7 categories |
| NewsData.io | 200 req/day | ✅ Multiple categories | 12 categories |

### RSS Feeds (Unlimited - 25+ sources)
- **General**: Detik.com, Kompas.com, Tempo.co, CNN Indonesia, Liputan6, Antara News, Republika, Tribunnews, SindoNews, Okezone
- **Sport**: Detik Sport, Kompas Bola, CNN Indonesia Olahraga
- **Food**: Detik Food, Kompas Food
- **Travel**: Detik Travel, Kompas Travel
- **Health**: Detik Health, Kompas Health
- **Finance**: Detik Finance, Kompas Bisnis
- **Tech**: CNN Indonesia Teknologi, Kompas Tekno, Detik Inet
- **Oto**: Detik Oto, Kompas Otomotif
- **Hype**: CNN Indonesia Hiburan, Kompas Hiburan

## 🔧 Configuration

### Tailwind Config
Customize colors, fonts, animations in `tailwind.config.ts`.

### Vite Config
Build options, aliases, chunk splitting in `vite.config.ts`.

### TypeScript
Strict mode enabled. Path aliases configured in `tsconfig.json`:
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@pages/*` → `src/pages/*`
- `@hooks/*` → `src/hooks/*`
- `@services/*` → `src/services/*`
- `@types/*` → `src/types/*`
- `@utils/*` → `src/utils/*`
- `@styles/*` → `src/styles/*`

## 🧪 Testing

```bash
# Unit tests
npm run test

# With UI
npm run test:ui

# E2E tests (when configured with Playwright)
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Add environment variables in Vercel dashboard
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
# Add environment variables in Netlify dashboard
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Static Export (for CDN)
```bash
# Add to vite.config.ts
// build: { outDir: 'dist', emptyOutDir: true }
npm run build
# Deploy dist/ to any static hosting
```

## 🔐 Environment Variables

See `.env.example` for all available variables.

### Required for News Data
```env
VITE_NEWS_API_KEY=your_newsapi_key
VITE_GNEWS_API_KEY=your_gnews_key
VITE_NEWSDATA_API_KEY=your_newsdata_key
```

### Optional
```env
VITE_API_URL=/api                    # Backend API URL
VITE_GA_ID=G-XXXXXXXXXX              # Google Analytics
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx  # Error tracking
VITE_RECAPTCHA_SITE_KEY=xxx          # reCAPTCHA for forms
```

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint && npm run test`)
5. Submit a pull request

## 📞 Support

- Email: redaksi@brikingnyus.com
- Issues: GitHub Issues
- Documentation: See `/docs` folder (when available)

---

Built with ❤️ in Indonesia 🇮🇩

**Tech Stack**: React 18 • TypeScript • Vite 5 • Tailwind CSS 3 • TanStack Query • Lucide React • DOMPurify • date-fns