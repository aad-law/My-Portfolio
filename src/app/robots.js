// Robots.txt configuration for search engines
export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'],
        },
        sitemap: 'https://aadlaw.netlify.app/sitemap.xml',
    };
}
