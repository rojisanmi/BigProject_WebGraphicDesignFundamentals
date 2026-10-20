#!/usr/bin/env node
// scripts/generate-sitemap.js
// Run after build: node scripts/generate-sitemap.js

import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://brikingnyus.com';
const OUTPUT_DIR = path.join(process.cwd(), 'dist');

const staticRoutes = [
  { path: '/', changefreq: 'hourly', priority: 1.0 },
  { path: '/search', changefreq: 'daily', priority: 0.8 },
  { path: '/contact', changefreq: 'monthly', priority: 0.7 },
  { path: '/about', changefreq: 'monthly', priority: 0.7 },
  { path: '/privacy', changefreq: 'yearly', priority: 0.5 },
  { path: '/terms', changefreq: 'yearly', priority: 0.5 },
  { path: '/cookies', changefreq: 'yearly', priority: 0.5 },
  { path: '/guidelines', changefreq: 'yearly', priority: 0.5 },
  { path: '/careers', changefreq: 'monthly', priority: 0.6 },
  { path: '/advertise', changefreq: 'monthly', priority: 0.6 },
  { path: '/newsletter', changefreq: 'weekly', priority: 0.7 },
  { path: '/rss', changefreq: 'daily', priority: 0.8 },
  { path: '/app', changefreq: 'monthly', priority: 0.6 },
  { path: '/widgets', changefreq: 'monthly', priority: 0.5 },
  { path: '/api-docs', changefreq: 'monthly', priority: 0.5 },
];

const categories = [
  'hot', 'sport', 'food', 'global', 'science',
  'lifestyle', 'health', 'finance', 'travel', 'oto', 'hype'
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  // Static routes
  staticRoutes.forEach(route => {
    sitemap += `
  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  // Category pages
  categories.forEach(cat => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/category/${cat}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // Note: Article URLs would be dynamically generated from database
  // This is a template - in production, fetch from database
  /*
  articles.forEach(article => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/article/${article.slug}</loc>
    <lastmod>${article.updatedAt.split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <news:news>
      <news:publication>
        <news:name>Briking Nyus</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${article.publishedAt}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      <news:keywords>${article.tags.join(', ')}</news:keywords>
    </news:news>
  </url>`;
  });
  */

  sitemap += `
</urlset>`;

  // Write sitemap
  const sitemapPath = path.join(OUTPUT_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`✅ Sitemap generated at ${sitemapPath}`);

  // Generate robots.txt
  const robots = `# Briking Nyus - robots.txt
User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 10

# Disallow admin/private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /*.json$
Disallow: /search?q=
Disallow: /category/*?page=

# Allow important paths
Allow: /article/
Allow: /category/
Allow: /search
Allow: /rss
Allow: /newsletter

# Host
Host: ${BASE_URL}
`;

  const robotsPath = path.join(OUTPUT_DIR, 'robots.txt');
  fs.writeFileSync(robotsPath, robots);
  console.log(`✅ robots.txt generated at ${robotsPath}`);
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&apos;');
}

generateSitemap();