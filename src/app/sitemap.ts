import type { MetadataRoute } from 'next';
import { company } from '@/data/company';
import { locales } from '@/i18n/config';

const pages = [
  { path: '', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((lang) => ({
      url: `${company.siteUrl}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${company.siteUrl}/${l}${path}`])),
      },
    }))
  );
}
