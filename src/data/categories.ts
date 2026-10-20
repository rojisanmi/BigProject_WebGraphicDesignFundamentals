import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    slug: 'hot',
    name: 'HotNYUS',
    nameEn: 'Hot News',
    description: 'Berita breaking news dan viral terkini',
    color: '#FF6B35',
    icon: 'flame',
    order: 1,
    isActive: true,
  },
  {
    id: '2',
    slug: 'sport',
    name: 'SportNYUS',
    nameEn: 'Sports',
    description: 'Berita olahraga terupdate: sepak bola, basket, F1, dan lainnya',
    color: '#28A745',
    icon: 'trophy',
    order: 2,
    isActive: true,
  },
  {
    id: '3',
    slug: 'food',
    name: 'FoodNYUS',
    nameEn: 'Food',
    description: 'Resep, kuliner, tips memasak, dan review makanan',
    color: '#E83E8C',
    icon: 'utensils',
    order: 3,
    isActive: true,
  },
  {
    id: '4',
    slug: 'global',
    name: 'GlobalNYUS',
    nameEn: 'Global',
    description: 'Berita internasional dan dunia',
    color: '#FD7E14',
    icon: 'globe',
    order: 4,
    isActive: true,
  },
  {
    id: '5',
    slug: 'science',
    name: 'ScienceNYUS',
    nameEn: 'Science & Tech',
    description: 'Sains, teknologi, inovasi, dan penemuan terbaru',
    color: '#6F42C1',
    icon: 'flask-conical',
    order: 5,
    isActive: true,
  },
  {
    id: '6',
    slug: 'lifestyle',
    name: 'LifestyleNYUS',
    nameEn: 'Lifestyle',
    description: 'Gaya hidup, fashion, travel, dan inspirasi',
    color: '#E83E8C',
    icon: 'heart',
    order: 6,
    isActive: true,
  },
  {
    id: '7',
    slug: 'health',
    name: 'HealthNYUS',
    nameEn: 'Health',
    description: 'Kesehatan, wellness, tips medis, dan berita kesehatan',
    color: '#DC3545',
    icon: 'heart-pulse',
    order: 7,
    isActive: true,
  },
  {
    id: '8',
    slug: 'finance',
    name: 'FinanceNYUS',
    nameEn: 'Finance',
    description: 'Bisnis, keuangan, investasi, dan ekonomi',
    color: '#198754',
    icon: 'dollar-sign',
    order: 8,
    isActive: true,
  },
  {
    id: '9',
    slug: 'travel',
    name: 'TravelNYUS',
    nameEn: 'Travel',
    description: 'Destinasi wisata, tips traveling, dan review hotel',
    color: '#0DCAF0',
    icon: 'plane',
    order: 9,
    isActive: true,
  },
  {
    id: '10',
    slug: 'oto',
    name: 'OtoNYUS',
    nameEn: 'Automotive',
    description: 'Mobil, motor, review kendaraan, dan otomotif',
    color: '#6C757D',
    icon: 'car',
    order: 10,
    isActive: true,
  },
  {
    id: '11',
    slug: 'hype',
    name: 'HypeNYUS',
    nameEn: 'Entertainment',
    description: 'Hiburan, selebritas, musik, film, dan K-pop',
    color: '#FF1493',
    icon: 'sparkles',
    order: 11,
    isActive: true,
  },
];

export const categoryMap = new Map(categories.map(c => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryMap.get(slug);
}

export function getCategoryColor(slug: string): string {
  return categoryMap.get(slug)?.color || '#6C757D';
}

export function getCategoryIcon(slug: string): string {
  return categoryMap.get(slug)?.icon || 'newspaper';
}

export function getActiveCategories(): Category[] {
  return categories.filter(c => c.isActive).sort((a, b) => a.order - b.order);
}

export const categorySlugs = categories.map(c => c.slug);