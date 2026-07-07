/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://rakibutsho.dev',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/server-sitemap-index.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://rakibutsho.dev/server-sitemap-index.xml',
    ],
  },
}
