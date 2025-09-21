import type { APIRoute } from 'astro';

// Site configuration
const SITE_URL = 'https://www.pourtheport.com';

// Static pages with their priorities and change frequencies
const staticPages = [
  // Homepage - highest priority
  { url: '', priority: 1.0, changefreq: 'weekly' },

  // Product and subscription pages - high priority
  { url: '/product', priority: 0.9, changefreq: 'monthly' },
  { url: '/subscription', priority: 0.9, changefreq: 'monthly' },

  // Educational and content pages - medium-high priority
  { url: '/natural-septic-solutions', priority: 0.8, changefreq: 'monthly' },
  { url: '/rv-septic-treatment', priority: 0.8, changefreq: 'monthly' },
  { url: '/septic-tank-maintenance', priority: 0.8, changefreq: 'monthly' },

  // Support and company pages - medium priority
  { url: '/about', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly' },
  { url: '/faq', priority: 0.7, changefreq: 'monthly' },

  // Legal pages - lower priority
  { url: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { url: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
  { url: '/refund-policy', priority: 0.3, changefreq: 'yearly' },
];

// Future blog posts structure - ready for content creation
const blogPosts = [
  { url: '/blog/septic-tank-maintenance-guide', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/natural-vs-chemical-septic-treatments', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/rv-septic-tank-treatment-guide', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/septic-tank-bacteria-science', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/drain-field-protection-tips', priority: 0.7, changefreq: 'monthly' },
  { url: '/blog/septic-system-troubleshooting', priority: 0.7, changefreq: 'monthly' },
];

export const GET: APIRoute = async () => {
  // Get current date for lastmod
  const currentDate = new Date().toISOString().split('T')[0];

  // Combine all pages
  const allPages = [...staticPages];

  // Generate XML content
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};