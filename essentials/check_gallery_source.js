const fs = require('fs');

const html = fs.readFileSync('page_gallery_.html', 'utf8');

// Find all image URLs or gallery items in page_gallery_.html
const allMatches = html.match(/(?:src|data-src|href)=["']([^"']*\.(?:jpg|jpeg|png|webp|avif))["']/gi) || [];
console.log('Matches in page_gallery_.html:', allMatches.length);
allMatches.forEach(m => console.log(m));

// Also check page-sitemap.xml for gallery attachments
const sitemap = fs.readFileSync('page_page-sitemap_xml.html', 'utf8');
const galIdx = sitemap.indexOf('gallery');
if (galIdx !== -1) {
  console.log('\nSitemap snippet for gallery:');
  console.log(sitemap.slice(galIdx - 50, galIdx + 1500));
}
