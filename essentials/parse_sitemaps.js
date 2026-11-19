const fs = require('fs');

function parseSitemap(file) {
  const xml = fs.readFileSync(file, 'utf8');
  const urls = [];
  const urlMatches = xml.matchAll(/<url>([\s\S]*?)<\/url>/g);
  for (const m of urlMatches) {
    const locMatch = m[1].match(/<loc>([^<]+)<\/loc>/);
    const imgMatches = m[1].matchAll(/<image:loc>([^<]+)<\/image:loc>/g);
    const images = Array.from(imgMatches).map(im => im[1]);
    if (locMatch) {
      urls.push({ loc: locMatch[1], images });
    }
  }
  return urls;
}

const posts = parseSitemap('page_post-sitemap_xml.html');
const pages = parseSitemap('page_page-sitemap_xml.html');

console.log('--- POSTS ---');
console.log(JSON.stringify(posts, null, 2));

console.log('\n--- PAGES ---');
console.log(JSON.stringify(pages, null, 2));

