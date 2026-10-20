export interface RSSItem {
  title: string;
  link: string;
  description?: string;
  content?: string;
  pubDate: string;
  author?: string;
  categories?: string[];
  enclosure?: { url: string; type: string; length?: string };
  guid?: string;
  'media:content'?: { url: string; type: string };
  'media:thumbnail'?: { url: string };
}

export interface RSSFeed {
  title: string;
  link: string;
  description: string;
  language?: string;
  lastBuildDate?: string;
  items: RSSItem[];
  image?: { url: string; title: string; link: string };
}

const INDONESIAN_RSS_FEEDS = [
  { name: 'Detik.com', url: 'https://rss.detik.com/index.php/detikcom', category: 'hot' },
  { name: 'Kompas.com', url: 'https://www.kompas.com/rss', category: 'hot' },
  { name: 'Tempo.co', url: 'https://rss.tempo.co/nasional', category: 'hot' },
  { name: 'CNN Indonesia', url: 'https://www.cnnindonesia.com/rss/nasional', category: 'hot' },
  { name: 'Liputan6.com', url: 'https://www.liputan6.com/feed', category: 'hot' },
  { name: 'Antara News', url: 'https://antaranews.com/rss/terkini', category: 'hot' },
  { name: 'Republika', url: 'https://www.republika.co.id/rss', category: 'hot' },
  { name: 'Tribunnews', url: 'https://www.tribunnews.com/rss', category: 'hot' },
  { name: 'SindoNews', url: 'https://rss.sindonews.com/nasional', category: 'hot' },
  { name: 'Okezone', url: 'https://news.okezone.com/rss', category: 'hot' },
  { name: 'Detik Sport', url: 'https://rss.detik.com/index.php/sport', category: 'sport' },
  { name: 'Kompas Bola', url: 'https://bola.kompas.com/rss', category: 'sport' },
  { name: 'CNN Indonesia Sport', url: 'https://www.cnnindonesia.com/rss/olahraga', category: 'sport' },
  { name: 'Detik Food', url: 'https://rss.detik.com/index.php/food', category: 'food' },
  { name: 'Kompas Food', url: 'https://food.kompas.com/rss', category: 'food' },
  { name: 'Detik Travel', url: 'https://rss.detik.com/index.php/travel', category: 'travel' },
  { name: 'Kompas Travel', url: 'https://travel.kompas.com/rss', category: 'travel' },
  { name: 'Detik Health', url: 'https://rss.detik.com/index.php/health', category: 'health' },
  { name: 'Kompas Health', url: 'https://health.kompas.com/rss', category: 'health' },
  { name: 'Detik Finance', url: 'https://rss.detik.com/index.php/finance', category: 'finance' },
  { name: 'Kompas Bisnis', url: 'https://bisnis.kompas.com/rss', category: 'finance' },
  { name: 'CNN Indonesia Teknologi', url: 'https://www.cnnindonesia.com/rss/teknologi', category: 'science' },
  { name: 'Kompas Tekno', url: 'https://tekno.kompas.com/rss', category: 'science' },
  { name: 'Detik Inet', url: 'https://rss.detik.com/index.php/inet', category: 'science' },
  { name: 'Detik Oto', url: 'https://rss.detik.com/index.php/oto', category: 'oto' },
  { name: 'Kompas Otomotif', url: 'https://otomotif.kompas.com/rss', category: 'oto' },
  { name: 'CNN Indonesia Hiburan', url: 'https://www.cnnindonesia.com/rss/hiburan', category: 'hype' },
  { name: 'Kompas Hiburan', url: 'https://hiburan.kompas.com/rss', category: 'hype' },
];

async function fetchWithProxy(url: string): Promise<string> {
  // In production, use a CORS proxy or backend
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error(`Failed to fetch RSS: ${response.status}`);
  return response.text();
}

function parseRSS(xmlText: string): RSSFeed | null {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      console.error('RSS Parse Error:', parseError.textContent);
      return null;
    }

    const channel = xmlDoc.querySelector('channel');
    if (!channel) return null;

    const items = Array.from(channel.querySelectorAll('item')).map(item => {
      const getText = (tag: string) => item.querySelector(tag)?.textContent?.trim() || '';
      const getAttr = (tag: string, attr: string) => item.querySelector(tag)?.getAttribute(attr) || '';

      return {
        title: getText('title'),
        link: getText('link'),
        description: getText('description'),
        content: getText('content:encoded') || getText('content'),
        pubDate: getText('pubDate'),
        author: getText('author') || getText('dc:creator'),
        categories: Array.from(item.querySelectorAll('category')).map(c => c.textContent?.trim() || '').filter(Boolean),
        enclosure: item.querySelector('enclosure') ? {
          url: item.querySelector('enclosure')!.getAttribute('url') || '',
          type: item.querySelector('enclosure')!.getAttribute('type') || '',
          length: item.querySelector('enclosure')!.getAttribute('length') || '',
        } : undefined,
        guid: getText('guid'),
        'media:content': item.querySelector('media\\:content, content') ? {
          url: item.querySelector('media\\:content, content')!.getAttribute('url') || '',
          type: item.querySelector('media\\:content, content')!.getAttribute('type') || '',
        } : undefined,
        'media:thumbnail': item.querySelector('media\\:thumbnail') ? {
          url: item.querySelector('media\\:thumbnail')!.getAttribute('url') || '',
        } : undefined,
      };
    });

    return {
      title: channel.querySelector('title')?.textContent?.trim() || '',
      link: channel.querySelector('link')?.textContent?.trim() || '',
      description: channel.querySelector('description')?.textContent?.trim() || '',
      language: channel.querySelector('language')?.textContent?.trim(),
      lastBuildDate: channel.querySelector('lastBuildDate')?.textContent?.trim(),
      items,
      image: channel.querySelector('image') ? {
        url: channel.querySelector('image url')?.textContent?.trim() || '',
        title: channel.querySelector('image title')?.textContent?.trim() || '',
        link: channel.querySelector('image link')?.textContent?.trim() || '',
      } : undefined,
    };
  } catch (error) {
    console.error('RSS parsing error:', error);
    return null;
  }
}

function extractImage(item: RSSItem): string | null {
  // Try multiple sources for image
  if (item.enclosure?.url && item.enclosure.type.startsWith('image/')) return item.enclosure.url;
  if (item['media:content']?.url) return item['media:content'].url;
  if (item['media:thumbnail']?.url) return item['media:thumbnail'].url;
  
  // Try to extract from description/content
  const html = item.content || item.description || '';
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];
  
  return null;
}

function sanitizeContent(html: string): string {
  // Basic sanitization - in production use DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');
}

export async function fetchRSSFeed(url: string): Promise<RSSFeed | null> {
  try {
    const xmlText = await fetchWithProxy(url);
    return parseRSS(xmlText);
  } catch (error) {
    console.error(`Failed to fetch RSS from ${url}:`, error);
    return null;
  }
}

export async function fetchAllRSSFeeds(): Promise<Map<string, RSSItem[]>> {
  const results = new Map<string, RSSItem[]>();
  
  await Promise.allSettled(
    INDONESIAN_RSS_FEEDS.map(async (feed) => {
      const rss = await fetchRSSFeed(feed.url);
      if (rss) {
        results.set(feed.category, rss.items);
      }
    })
  );
  
  return results;
}

export function normalizeRSSItem(item: RSSItem, sourceName: string, categorySlug: string) {
  const imageUrl = extractImage(item);
  const slug = generateSlug(item.title);
  const readTime = calculateReadTime(item.content || item.description || '');

  return {
    id: `rss-${sourceName}-${slug}-${Date.now()}`,
    slug,
    title: item.title,
    excerpt: item.description ? sanitizeContent(item.description).substring(0, 160) : 'Tidak ada ringkasan.',
    content: sanitizeContent(item.content || item.description || ''),
    featuredImage: {
      url: imageUrl || '/images/placeholder.jpg',
      alt: item.title,
      credit: sourceName,
    },
    category: { slug: categorySlug } as any, // Will be resolved later
    tags: item.categories || [],
    author: { id: 'rss', name: item.author || sourceName },
    source: { id: 'rss', name: sourceName, url: item.link },
    publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
    updatedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
    readTime,
    viewCount: 0,
    isBreaking: false,
    isFeatured: false,
    seo: { metaTitle: item.title, metaDescription: item.description?.substring(0, 160) },
  };
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export { INDONESIAN_RSS_FEEDS };