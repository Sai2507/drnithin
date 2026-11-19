const fs = require('fs');

function extractTabsFromHtml(html) {
  const contentIdx = html.indexOf('e-n-tabs-content');
  if (contentIdx === -1) {
    return null;
  }

  // Get everything from e-n-tabs-content to the next major section or footer
  const footerIdx = html.indexOf('About', contentIdx);
  const tabsSection = html.slice(contentIdx, footerIdx !== -1 ? footerIdx : contentIdx + 25000);

  // Split by role="tabpanel" or id="e-n-tab-content-
  const panelSplits = tabsSection.split(/id=["']e-n-tab-content-[^"']+["']/i);
  // panelSplits[0] is preamble before tab 1
  // panelSplits[1] is tab 1
  // panelSplits[2] is tab 2
  // panelSplits[3] is tab 3
  // panelSplits[4] is tab 4

  function parsePanel(chunk) {
    if (!chunk) return { intro: '', items: [], outro: '', fullText: [] };

    // Find all <p> and <li> items
    // First let's extract <li>
    const items = [];
    const liMatches = chunk.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    for (const lim of liMatches) {
      const text = lim[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      if (text) items.push(text);
    }

    // Now let's extract <p> tags
    const paragraphs = [];
    const pMatches = chunk.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    for (const pm of pMatches) {
      // Don't include <p> if it was inside a <li>
      const pText = pm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      if (pText && !items.some(item => item === pText || item.includes(pText))) {
        paragraphs.push(pText);
      }
    }

    // If no <li> found, paragraphs might be the items
    return {
      paragraphs,
      items: items.length > 0 ? items : paragraphs,
      rawItems: items
    };
  }

  return {
    symptomsTab: parsePanel(panelSplits[1]),
    treatmentsTab: parsePanel(panelSplits[2]),
    procedureTab: parsePanel(panelSplits[3]),
    faqsTab: parsePanel(panelSplits[4])
  };
}

// Test on 5 condition pages
const testFiles = [
  'page_elite-sports-injury-management_.html',
  'page_acl-repair-reconstruction_.html',
  'page_rotator-cuff-repair_.html',
  'page_knee-arthroscopy_.html',
  'page_shoulder-arthroscopy_.html',
  'page_cartilage-regeneration-surgery_.html'
];

testFiles.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const res = extractTabsFromHtml(html);
  console.log(`\n=== ${f} ===`);
  if (!res) {
    console.log('NO TABS FOUND');
  } else {
    console.log('Symptoms Tab items:', res.symptomsTab.items.length, 'paras:', res.symptomsTab.paragraphs.length);
    console.log('  sample:', res.symptomsTab.items[0]);
    console.log('Treatments Tab items:', res.treatmentsTab.items.length, 'paras:', res.treatmentsTab.paragraphs.length);
    console.log('  sample:', res.treatmentsTab.items[0]);
    console.log('Procedure Tab items:', res.procedureTab.items.length, 'paras:', res.procedureTab.paragraphs.length);
    console.log('  sample:', res.procedureTab.items[0]);
    console.log('FAQs Tab items:', res.faqsTab.items.length, 'paras:', res.faqsTab.paragraphs.length);
    console.log('  sample:', res.faqsTab.items[0]);
  }
});

