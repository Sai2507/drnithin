const fs = require('fs');
const path = require('path');

function cleanHtmlText(html) {
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
  clean = clean.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '');
  clean = clean.replace(/<\/(p|div|h[1-6]|li|section|article)>/gi, '\n');
  clean = clean.replace(/<br\s*[\/]?>/gi, '\n');
  clean = clean.replace(/<[^>]+>/g, ' ');
  clean = clean.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ');
  return clean.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(l => l.length > 0).join('\n');
}

const files = fs.readdirSync('.').filter(f => f.startsWith('page_') && f.endsWith('.html') && !f.includes('sitemap'));

const parsedData = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/&#038;/g, '&').replace(/&#8211;/g, '–').trim() : '';

  // Extract meta description
  const metaMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const metaDesc = metaMatch ? metaMatch[1].trim() : '';

  // Find images in this file
  const images = [];
  const imgRegex = /(?:src|data-src)=["']([^"']*\.(?:webp|jpg|jpeg|png|svg|avif))["']/gi;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    if (!m[1].includes('plugins/') && !m[1].includes('themes/') && !m[1].includes('google.com')) {
      images.push(m[1]);
    }
  }

  // Extract main headings and paragraphs
  const cleanText = cleanHtmlText(content);
  parsedData[f] = {
    title,
    metaDesc,
    images: [...new Set(images)],
    rawTextPreview: cleanText.slice(0, 500),
    fullCleanText: cleanText
  };
});

fs.writeFileSync('all_parsed_pages.json', JSON.stringify(parsedData, null, 2));
console.log(`Parsed ${Object.keys(parsedData).length} pages into all_parsed_pages.json`);

