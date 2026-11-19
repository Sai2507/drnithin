const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

console.log('--- INDEX.HTML VALIDATION ---');
console.log('File size:', (html.length / 1024).toFixed(2), 'KB');

// Check script tag extraction
const scriptMatches = html.match(/<script>([\s\S]*?)<\/script>/gi);
console.log('Script tags count:', scriptMatches.length);

// Check if __SITE_DATABASE__ was replaced
if (html.includes('__SITE_DATABASE__')) {
  console.error('ERROR: __SITE_DATABASE__ placeholder was not replaced!');
} else {
  console.log('SUCCESS: Database successfully embedded.');
}

// Test parsing embedded JSON in script
const dbMatch = html.match(/const SITE_DB = ({[\s\S]*?});\s*\n\s*\/\/ Theme Management/);
if (dbMatch) {
  try {
    const parsed = JSON.parse(dbMatch[1]);
    console.log('Parsed database:');
    console.log('- Doctor:', parsed.doctor.name);
    console.log('- Conditions count:', parsed.conditions.length);
    console.log('- Blogs count:', parsed.blogs.length);
    console.log('- Reviews count:', parsed.reviews.length);
    console.log('- Gallery items count:', parsed.gallery.length);
    console.log('- Videos count:', parsed.videos.length);
  } catch (err) {
    console.error('ERROR parsing embedded JSON:', err.message);
  }
} else {
  console.log('Could not find SITE_DB regex, checking direct presence');
}

// Check local images referenced
const localImages = html.match(/assets\/images\/[a-zA-Z0-9._-]+/g) || [];
console.log('Local images references found:', localImages.length);

// Verify all referenced images exist on disk
let missing = 0;
new Set(localImages).forEach(img => {
  if (!fs.existsSync(img)) {
    console.log('Missing image file:', img);
    missing++;
  }
});
console.log('Missing image files on disk:', missing);

