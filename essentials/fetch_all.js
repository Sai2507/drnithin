const { execSync } = require('child_process');
const fs = require('fs');

const urls = [
  'https://drnithin.com/wp-sitemap.xml',
  'https://drnithin.com/sitemap.xml',
  'https://drnithin.com/about-us/',
  'https://drnithin.com/conditions/',
  'https://drnithin.com/knee-arthroscopy/',
  'https://drnithin.com/shoulder-arthroscopy/',
  'https://drnithin.com/elite-sports-injury-management/',
  'https://drnithin.com/gallery/',
  'https://drnithin.com/blogs/',
  'https://drnithin.com/videos/',
  'https://drnithin.com/contact-us/'
];

urls.forEach(u => {
  try {
    const rawName = u.replace(/https?:\/\/drnithin\.com\/?/g, '').replace(/[^a-zA-Z0-9_-]/g, '_') || 'home';
    const outFile = `page_${rawName}.html`;
    console.log(`Fetching ${u} -> ${outFile}`);
    execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${u}" -o "${outFile}"`);
  } catch (e) {
    console.log(`Error fetching ${u}:`, e.message);
  }
});

