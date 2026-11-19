const fs = require('fs');

function inspectBody(file) {
  if (!fs.existsSync(file)) return 'File not found';
  const html = fs.readFileSync(file, 'utf8');
  // strip scripts and styles
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  // extract elementor or main content
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1];
  const text = clean.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return { file, title, textPreview: text.slice(0, 1000), textLen: text.length, fullText: text };
}

const mainPages = [
  'site_home.html',
  'page_about-us_.html',
  'page_conditions_.html',
  'page_knee-arthroscopy_.html',
  'page_shoulder-arthroscopy_.html',
  'page_elite-sports-injury-management_.html',
  'page_gallery_.html',
  'page_videos_.html',
  'page_contact-us_.html',
  'page_blogs_.html'
];

mainPages.forEach(p => {
  const res = inspectBody(p);
  console.log(`\n=== ${p} (length: ${res.textLen}) ===`);
  console.log(`Title: ${res.title}`);
  console.log(`Text: ${res.textPreview.slice(0, 300)}...`);
});

