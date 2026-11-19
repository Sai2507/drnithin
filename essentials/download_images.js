const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

if (!fs.existsSync('assets')) fs.mkdirSync('assets');
if (!fs.existsSync('assets/images')) fs.mkdirSync('assets/images');

const images = JSON.parse(fs.readFileSync('images_list.json', 'utf8'));

// Filter out irrelevant images (like wordpress emoji, google analytics, etc.)
const relevantImages = images.filter(url => {
  if (url.includes('s.w.org')) return false;
  if (url.includes('google-analytics')) return false;
  if (url.includes('wp-content/plugins/elementor/assets/images/placeholder.png')) return false;
  return true;
});

console.log(`Total images to download: ${relevantImages.length}`);

const mapping = {};

relevantImages.forEach((url, i) => {
  try {
    let cleanUrl = url.startsWith('//') ? 'https:' + url : url;
    if (!cleanUrl.startsWith('http')) {
      if (cleanUrl.startsWith('/')) cleanUrl = 'https://drnithin.com' + cleanUrl;
      else cleanUrl = 'https://drnithin.com/' + cleanUrl;
    }

    const urlObj = new URL(cleanUrl);
    let base = path.basename(urlObj.pathname);
    if (!base || base.length < 3) base = `img_${i}.jpg`;
    // sanitize base
    base = base.replace(/[^a-zA-Z0-9._-]/g, '_');
    const localPath = path.join('assets/images', base);

    if (!fs.existsSync(localPath)) {
      console.log(`[${i+1}/${relevantImages.length}] Downloading: ${base}`);
      execSync(`curl.exe -sL -A "Mozilla/5.0" "${cleanUrl}" -o "${localPath}"`);
      // check if file is valid
      const stat = fs.statSync(localPath);
      if (stat.size === 0) {
        fs.unlinkSync(localPath);
        console.log(`Failed (0 bytes): ${cleanUrl}`);
      } else {
        mapping[url] = 'assets/images/' + base;
        mapping[cleanUrl] = 'assets/images/' + base;
      }
    } else {
      mapping[url] = 'assets/images/' + base;
      mapping[cleanUrl] = 'assets/images/' + base;
    }
  } catch (err) {
    console.log(`Error downloading ${url}:`, err.message);
  }
});

fs.writeFileSync('image_mapping.json', JSON.stringify(mapping, null, 2));
console.log(`Completed downloading images. Local files count: ${fs.readdirSync('assets/images').length}`);

