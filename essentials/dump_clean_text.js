const fs = require('fs');

function getReadableContent(file) {
  const html = fs.readFileSync(file, 'utf8');
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
  clean = clean.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '');
  
  // Replace br and paragraph tags with newlines
  clean = clean.replace(/<\/(p|div|h[1-6]|li|section|article)>/gi, '\n');
  clean = clean.replace(/<br\s*[\/]?>/gi, '\n');
  clean = clean.replace(/<[^>]+>/g, ' ');
  // decode html entities
  clean = clean.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#039;/g, "'")
               .replace(/&nbsp;/g, ' ');

  const lines = clean.split('\n')
    .map(l => l.replace(/\s+/g, ' ').trim())
    .filter(l => l.length > 0);

  return lines.join('\n');
}

const interestingFiles = [
  'site_home.html',
  'page_about-us_.html',
  'page_conditions_.html',
  'page_knee-arthroscopy_.html',
  'page_shoulder-arthroscopy_.html',
  'page_elite-sports-injury-management_.html',
  'page_contact-us_.html',
  'page_blogs_.html',
  'page_blogs_recognizing-rheumatoid-arthritis-symptoms-a-guide-for-the-general-public_.html',
  'page_blogs_tendonitis-causes-symptoms-diagnosis-and-treatment_.html',
  'page_blogs_arthroscopic-bankart-repair-procedure-recovery-and-patient-guide_.html'
];

interestingFiles.forEach(f => {
  if (fs.existsSync(f)) {
    fs.writeFileSync(`clean_${f}.txt`, getReadableContent(f));
    console.log(`Saved clean_${f}.txt (${fs.statSync(`clean_${f}.txt`).size} bytes)`);
  }
});

