const fs = require('fs');

const html = fs.readFileSync('page_elite-sports-injury-management_.html', 'utf8');

const contentIdx = html.indexOf('e-n-tabs-content');
console.log('e-n-tabs-content index:', contentIdx);

if (contentIdx !== -1) {
  const slice = html.slice(contentIdx, contentIdx + 6000);
  console.log(slice);
}

