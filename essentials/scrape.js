const fs = require('fs');

const html = fs.readFileSync('site_home.html', 'utf8');

const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
console.log('TITLE:', titleMatch ? titleMatch[1] : 'N/A');

const links = new Set();
const linkRegex = /href=["']([^"']*)["']/gi;
let m;
while ((m = linkRegex.exec(html)) !== null) {
  links.add(m[1]);
}

console.log('\n--- INTERNAL / RELEVANT LINKS ---');
for (const l of Array.from(links).sort()) {
  if (l.includes('drnithin.com') || l.startsWith('/') || l.startsWith('#') || (!l.startsWith('http') && !l.startsWith('mailto:') && !l.startsWith('tel:'))) {
    console.log(l);
  }
}

console.log('\n--- EXTERNAL LINKS / SOCIAL / TEL / MAILTO ---');
for (const l of Array.from(links).sort()) {
  if (l.startsWith('tel:') || l.startsWith('mailto:') || l.includes('whatsapp') || l.includes('facebook') || l.includes('instagram') || l.includes('linkedin') || l.includes('youtube') || l.includes('twitter') || l.includes('maps') || l.includes('google')) {
    console.log(l);
  }
}

const images = new Set();
const imgRegex = /(?:src|data-src|srcset)=["']([^"']*)["']/gi;
while ((m = imgRegex.exec(html)) !== null) {
  const parts = m[1].split(/[\s,]+/);
  for (const p of parts) {
    if (/\.(png|jpe?g|svg|webp|gif|ico)/i.test(p)) {
      images.add(p);
    }
  }
}
console.log('\n--- IMAGES (' + images.size + ') ---');
for (const img of Array.from(images).sort()) {
  console.log(img);
}

