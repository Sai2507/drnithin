const fs = require('fs');
const files = fs.readdirSync('assets/images');

console.log('--- ALL UNIQUE IMAGES (FULL NAMES) ---');
const uniqueBases = new Set();
files.forEach(f => {
  // strip resolution suffixes like -300x200
  const normalized = f.replace(/-\d+x\d+(\.[a-z]+)$/i, '$1');
  uniqueBases.add(normalized);
});

console.log(Array.from(uniqueBases));

