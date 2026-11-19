const fs = require('fs');

function testFile(filename) {
  const html = fs.readFileSync(filename, 'utf8');
  console.log(`\n================ Testing ${filename} ================`);

  // Let's find all tabpanel divs
  const panels = [];
  for (let i = 1; i <= 4; i++) {
    const startStr = `data-tab-index="${i}"`;
    const idx = html.indexOf(startStr);
    // Find the next tab or end of tab container
    if (idx !== -1) {
      let nextIdx = -1;
      if (i < 4) {
        nextIdx = html.indexOf(`data-tab-index="${i+1}"`, idx + 10);
      } else {
        // for tab 4, find where footer starts or section ends
        nextIdx = html.indexOf('class="elementor-element elementor-element-', idx + 100);
        // or search for About Us / Yashoda Hospitals
        const footerIdx = html.indexOf('Yashoda Hospitals', idx);
        if (footerIdx !== -1 && (nextIdx === -1 || footerIdx < nextIdx)) nextIdx = footerIdx;
      }
      
      const chunk = nextIdx !== -1 ? html.slice(idx, nextIdx) : html.slice(idx, idx + 4000);
      
      // Clean HTML tags and extract bullets and paragraphs
      // Extract <li> items
      const lis = [];
      const liMatches = chunk.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      for (const lim of liMatches) {
        const text = lim[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (text) lis.push(text);
      }

      // Extract <p> items
      const ps = [];
      const pMatches = chunk.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
      for (const pm of pMatches) {
        const text = pm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (text && !text.includes('Yashoda Hospitals') && !text.includes('© 2025')) ps.push(text);
      }

      console.log(`Tab ${i}: found ${lis.length} bullets, ${ps.length} paragraphs`);
      if (lis.length > 0) console.log(`  Sample bullet:`, lis[0]);
      if (ps.length > 0) console.log(`  Sample paragraph:`, ps[0]);
    } else {
      console.log(`Tab ${i} NOT FOUND`);
    }
  }
}

testFile('page_elite-sports-injury-management_.html');
testFile('page_acl-repair-reconstruction_.html');
testFile('page_rotator-cuff-repair_.html');
testFile('page_knee-arthroscopy_.html');
testFile('page_shoulder-arthroscopy_.html');

