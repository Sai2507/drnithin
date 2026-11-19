const fs = require('fs');

function extractInfo(filename) {
  if (!fs.existsSync(filename)) return null;
  const html = fs.readFileSync(filename, 'utf8');
  
  // Extract clean text blocks
  // Let's find h1, h2, h3, h4, p
  const headings = [];
  const hRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = hRegex.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text) headings.push({ tag: m[1], text });
  }

  // Extract phone numbers and addresses
  const phones = html.match(/(?:\+91|91)?[- ]?[6-9]\d{9}/g) || [];
  const emails = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];

  return { filename, headings, phones: [...new Set(phones)], emails: [...new Set(emails)] };
}

console.log('--- HOME INFO ---');
console.log(JSON.stringify(extractInfo('site_home.html'), null, 2));

console.log('--- ABOUT US INFO ---');
console.log(JSON.stringify(extractInfo('page_about-us_.html'), null, 2));

console.log('--- CONTACT US INFO ---');
console.log(JSON.stringify(extractInfo('page_contact-us_.html'), null, 2));

