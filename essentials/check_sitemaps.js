const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.startsWith('page_') && f.endsWith('.html'));

console.log('Downloaded files:', files);

// Check sitemaps
files.forEach(file => {
  if (file.includes('sitemap')) {
    console.log(`\n--- SITEMAP CONTENT: ${file} ---`);
    console.log(fs.readFileSync(file, 'utf8').slice(0, 1500));
  }
});

