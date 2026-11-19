const fs = require('fs');

function inspectCondition(file) {
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, 'utf8');
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
  clean = clean.replace(/<\/(p|div|h[1-6]|li)>/gi, '\n');
  clean = clean.replace(/<br\s*[\/]?>/gi, '\n');
  clean = clean.replace(/<[^>]+>/g, ' ');
  clean = clean.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ');
  const lines = clean.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(l => l.length > 0);
  return lines.join('\n');
}

const sampleFiles = [
  'page_acl-repair-reconstruction_.html',
  'page_rotator-cuff-repair_.html',
  'page_robotic-orthopedic-surgeries_.html',
  'page_regenerative-orthopedic-therapies-biologics-healing_.html',
  'page_total-shoulder-replacement_.html',
  'page_sports-nutrition-recovery-guidance_.html'
];

sampleFiles.forEach(f => {
  console.log(`\n================= ${f} =================`);
  const text = inspectCondition(f);
  console.log(text ? text.slice(0, 1200) : 'Not found');
});

