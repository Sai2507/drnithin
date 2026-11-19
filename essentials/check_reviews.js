const fs = require('fs');

const html = fs.readFileSync('site_home.html', 'utf8');

// Look for ti-review or trustindex items
const matches = html.match(/class=["'][^"']*ti-review-item[^"']*["'][\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi) || [];
console.log('Trustindex review items found:', matches.length);

// Also look for author names and text
const reviewTexts = [];
const revRegex = /<div class=["']ti-review-header["']>[\s\S]*?<div class=["']ti-name["']>([\s\S]*?)<\/div>[\s\S]*?<div class=["']ti-review-content["']>([\s\S]*?)<\/div>/gi;
let m;
while ((m = revRegex.exec(html)) !== null) {
  reviewTexts.push({
    name: m[1].replace(/<[^>]+>/g, '').trim(),
    text: m[2].replace(/<[^>]+>/g, '').trim()
  });
}

console.log('Parsed reviews:', reviewTexts.length);
console.log(reviewTexts);

