export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://scrambord.vercel.app/sitemap.xml',
    }
  }