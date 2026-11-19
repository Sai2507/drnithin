const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('sitemap'));

const allImages = new Set();
const siteData = {};

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Extract images
  const imgMatches = content.matchAll(/(?:src|data-src|srcset)=["']([^"']*)["']/gi);
  for (const m of imgMatches) {
    const parts = m[1].split(/[\s,]+/);
    for (const p of parts) {
      if (/\.(png|jpe?g|svg|webp|gif|avif)/i.test(p) && !p.startsWith('data:')) {
        let clean = p.split('?')[0];
        if (clean.startsWith('//')) clean = 'https:' + clean;
        allImages.add(clean);
      }
    }
  }
});

console.log(`Found ${allImages.size} unique image URLs across ${htmlFiles.length} pages.`);

// Save image list
fs.writeFileSync('images_list.json', JSON.stringify(Array.from(allImages), null, 2));

// Let's inspect videos page
if (fs.existsSync('page_videos_.html')) {
  const vidsHtml = fs.readFileSync('page_videos_.html', 'utf8');
  console.log('\n--- VIDEOS HTML SNIPPET ---');
  const iframes = vidsHtml.match(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi) || [];
  console.log('Iframes:', iframes);
  const ytMatches = vidsHtml.match(/(?:youtube\.com|youtu\.be)[^\s"'<>]+/gi) || [];
  console.log('YouTube links:', ytMatches);
}

// Let's inspect gallery page
if (fs.existsSync('page_gallery_.html')) {
  const galHtml = fs.readFileSync('page_gallery_.html', 'utf8');
  console.log('\n--- GALLERY HTML SNIPPET ---');
  const galImgs = galHtml.match(/(?:src|data-src)=["']([^"']*\.(?:webp|jpg|jpeg|png))["']/gi) || [];
  console.log('Gallery images count:', galImgs.length);
  console.log('Gallery images sample:', galImgs.slice(0, 10));
}

