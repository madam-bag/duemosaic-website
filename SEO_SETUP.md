# SEO Setup Documentation

This website includes comprehensive SEO optimization for better search engine visibility.

## Files Created

### 1. `public/robots.txt`
- Guides search engine crawlers
- Allows all pages to be indexed
- Points to sitemap location
- **Action Required**: Update the sitemap URL with your actual domain when deploying

### 2. `public/sitemap.xml`
- XML sitemap listing all important pages
- Includes all routes and project pages
- Helps search engines discover and index pages
- **Action Required**: 
  - Update all URLs from `https://www.duemosaicarchitects.com` to your actual domain
  - Update `<lastmod>` dates when you make changes to pages

### 3. `public/manifest.json`
- Progressive Web App (PWA) manifest
- Improves mobile experience
- Helps with app-like installation

### 4. `public/index.html`
- Comprehensive meta tags:
  - Primary meta tags (title, description, keywords)
  - Open Graph tags (Facebook, LinkedIn)
  - Twitter Card tags
  - Geographic location tags
  - Structured data (JSON-LD) for rich snippets
- **Action Required**: Update domain URLs in meta tags when deploying

### 5. `src/components/SEO.js`
- Dynamic SEO component that updates meta tags based on current route
- Automatically updates:
  - Page titles
  - Meta descriptions
  - Canonical URLs
  - Open Graph tags
  - Twitter Card tags
- Provides unique SEO for each page

## SEO Features Implemented

### ✅ On-Page SEO
- Optimized page titles and meta descriptions
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images (ensure all images have descriptive alt attributes)
- Canonical URLs to prevent duplicate content

### ✅ Technical SEO
- Mobile-responsive design
- Fast page load times (thumbnail optimization)
- Clean URL structure
- XML sitemap
- Robots.txt file
- Structured data (Schema.org)

### ✅ Social Media SEO
- Open Graph tags for Facebook/LinkedIn sharing
- Twitter Card tags for Twitter sharing
- Social media preview images

### ✅ Local SEO
- Geographic location meta tags
- Business address in structured data
- Service area information
- Contact information

## Before Deployment Checklist

1. **Update Domain URLs**:
   - Replace `https://www.duemosaicarchitects.com` with your actual domain in:
     - `public/sitemap.xml`
     - `public/robots.txt`
     - `public/index.html` (meta tags)
     - `src/components/SEO.js` (baseUrl)

2. **Update Sitemap Dates**:
   - Update `<lastmod>` dates in `sitemap.xml` to current date
   - Update dates when you make significant changes

3. **Verify Images**:
   - Ensure all images have descriptive alt text
   - Optimize images (already done with thumbnails)

4. **Submit to Search Engines**:
   - Submit sitemap to Google Search Console
   - Submit sitemap to Bing Webmaster Tools
   - Verify ownership of your domain

5. **Test Structured Data**:
   - Use Google's Rich Results Test: https://search.google.com/test/rich-results
   - Verify structured data is correct

6. **Check Mobile-Friendliness**:
   - Use Google's Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

7. **Page Speed**:
   - Test with PageSpeed Insights: https://pagespeed.web.dev/
   - Already optimized with thumbnail system

## Additional SEO Recommendations

1. **Content Updates**:
   - Regularly update project descriptions
   - Add blog/news section for fresh content
   - Update sitemap dates when content changes

2. **Backlinks**:
   - Get listed in architecture directories
   - Partner with related businesses
   - Share projects on social media

3. **Analytics**:
   - Set up Google Analytics
   - Monitor search performance
   - Track user behavior

4. **Local Listings**:
   - Google Business Profile
   - Architecture directories
   - Professional associations

## Testing Your SEO

After deployment, test your SEO with:
- **Google Search Console**: Monitor indexing and search performance
- **Bing Webmaster Tools**: Submit sitemap and monitor
- **Schema Markup Validator**: https://validator.schema.org/
- **Open Graph Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator

## Notes

- The SEO component automatically updates meta tags for each route
- Project detail pages get unique SEO based on project data
- All pages have proper canonical URLs
- Structured data helps with rich snippets in search results

