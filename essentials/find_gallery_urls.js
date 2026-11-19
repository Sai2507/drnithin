const fs = require('fs');

const html = fs.readFileSync('essentials/page_gallery_.html', 'utf8');
const regex = /(https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|avif))/gi;
const matches = [];
let m;
while ((m = regex.exec(html)) !== null) {
  matches.push(m[1]);
}

console.log('Matches found in essentials/page_gallery_.html:', [...new Set(matches)]);

