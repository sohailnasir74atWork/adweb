import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/profile/', '/settings', '/chat/dm/'],
      },
    ],
    sitemap: 'https://www.adoptmevalues.app/sitemap.xml',
  };
}
