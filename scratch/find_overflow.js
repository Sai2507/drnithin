const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');

console.log('=== CHECKING STYLES.CSS ===');
// Check all width/min-width in styles.css
const cssLines = css.split('\n');
cssLines.forEach((line, idx) => {
  const m = line.match(/(width|min-width)\s*:\s*([0-9]+)px/);
  if (m) {
    const val = parseInt(m[2]);
    if (val >= 250) {
      console.log(`styles.css:${idx + 1}: ${line.trim()}`);
    }
  }
});

console.log('\n=== CHECKING INDEX.HTML INLINE STYLES ===');
const htmlLines = html.split('\n');
htmlLines.forEach((line, idx) => {
  const m = line.match(/(width|min-width)\s*:\s*([0-9]+)px/);
  if (m) {
    const val = parseInt(m[2]);
    if (val >= 250) {
      console.log(`index.html:${idx + 1}: ${line.trim()}`);
    }
  }
});

console.log('\n=== CHECKING GRID / FLEX TEMPLATES ===');
htmlLines.forEach((line, idx) => {
  if (line.includes('grid-template-columns') || line.includes('minmax(')) {
    console.log(`index.html:${idx + 1}: ${line.trim()}`);
  }
});

cssLines.forEach((line, idx) => {
  if (line.includes('grid-template-columns') || line.includes('minmax(')) {
    console.log(`styles.css:${idx + 1}: ${line.trim()}`);
  }
});
