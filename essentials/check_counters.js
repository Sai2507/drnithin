const fs = require('fs');
const html = fs.readFileSync('site_home.html', 'utf8');

// Find all data-to-value or counter configs
const counterMatches = html.match(/data-to-value="[^"]+"/g);
console.log('data-to-value:', counterMatches);

const durationMatches = html.match(/data-duration="[^"]+"/g);
console.log('data-duration:', durationMatches);

// Find blocks containing Years Of Experience
const idx = html.indexOf('Years Of Experience');
if (idx !== -1) {
  console.log('Context around Years Of Experience:');
  console.log(html.slice(Math.max(0, idx - 400), idx + 800));
}

