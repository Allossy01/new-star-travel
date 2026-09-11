import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://newstartravel.dz', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://newstartravel.dz/#packages', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://newstartravel.dz/#contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
