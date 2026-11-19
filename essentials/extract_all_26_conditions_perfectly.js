const fs = require('fs');

const conditionFiles = fs.readdirSync('.').filter(f => 
  f.startsWith('page_') && 
  f.endsWith('_.html') && 
  !f.includes('sitemap') && 
  !f.includes('about') && 
  !f.includes('contact') && 
  !f.includes('gallery') && 
  !f.includes('videos') && 
  !f.includes('blogs') && 
  !f.includes('conditions_')
);

console.log('Condition files count:', conditionFiles.length);

const imageMapping = JSON.parse(fs.readFileSync('image_mapping.json', 'utf8'));

function extractTabs(html) {
  const contentIdx = html.indexOf('e-n-tabs-content');
  if (contentIdx === -1) return null;

  // Find footer or end
  let endIdx = html.indexOf('About', contentIdx);
  if (endIdx === -1) endIdx = html.indexOf('Yashoda Hospitals', contentIdx);
  const tabsSection = html.slice(contentIdx, endIdx !== -1 ? endIdx : contentIdx + 30000);

  const panelSplits = tabsSection.split(/id=["']e-n-tab-content-[^"']+["']/i);

  function parsePanel(chunk) {
    if (!chunk) return { intro: '', items: [], outro: '' };

    // Extract all list items
    const items = [];
    const liMatches = chunk.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    for (const lim of liMatches) {
      const text = lim[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      if (text) items.push(text);
    }

    // Extract all paragraphs
    const paragraphs = [];
    const pMatches = chunk.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    for (const pm of pMatches) {
      const text = pm[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      if (text && !items.some(item => item === text || item.includes(text)) && !text.includes('© 2025') && !text.includes('Yashoda Hospitals')) {
        paragraphs.push(text);
      }
    }

    let intro = '';
    let outro = '';
    if (paragraphs.length === 1 && items.length > 0) {
      intro = paragraphs[0];
    } else if (paragraphs.length >= 2 && items.length > 0) {
      intro = paragraphs[0];
      outro = paragraphs[paragraphs.length - 1];
    } else if (items.length === 0 && paragraphs.length > 0) {
      // paragraphs themselves are the items
      return { intro: '', items: paragraphs, outro: '' };
    }

    return { intro, items, outro, allParagraphs: paragraphs };
  }

  return {
    symptomsTab: parsePanel(panelSplits[1]),
    treatmentsTab: parsePanel(panelSplits[2]),
    procedureTab: parsePanel(panelSplits[3]),
    faqsTab: parsePanel(panelSplits[4])
  };
}

const allConditions = [];

conditionFiles.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  let pageTitle = titleMatch ? titleMatch[1].replace(/&#038;/g, '&').replace(/&#8211;/g, '–').replace(/ \| Dr Nithin Bejjanki.*/, '').replace(/ in Secunderabad.*/, '').trim() : '';

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : pageTitle;

  // Tagline
  let tagline = '';
  const taglineMatch = html.match(/<h1[^>]*>[\s\S]*?<\/h1>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  if (taglineMatch) {
    tagline = taglineMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Overview paragraph right under headline/banner
  let overview = '';
  const ovMatches = html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
  for (const om of ovMatches) {
    const text = om[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length > 120 && !text.includes('Skip to content') && !text.includes('Yashoda Hospitals') && !text.includes('Dr. Nithin Kumar Bejjanki, an internationally trained orthopaedic surgeon, specializes in arthroscopy')) {
      overview = text;
      break;
    }
  }

  // Image
  const imgMatch = html.match(/class=["'][^"']*elementor-image[^"']*["'][\s\S]*?<img[^>]+src=["']([^"']+)["']/i) ||
                   html.match(/<img[^>]+src=["'](https:\/\/drnithin\.com\/wp-content\/uploads\/[^"']+)["']/i);
  let image = imgMatch ? imgMatch[1] : '';

  let local = imageMapping[image];
  if (!local && image) {
    const fn = image.split('/').pop().split('?')[0];
    for (const [k, v] of Object.entries(imageMapping)) {
      if (k.includes(fn)) {
        local = v;
        break;
      }
    }
  }

  // Extract the 4 tabs
  const tabData = extractTabs(html);

  // Category determination
  let category = 'General Orthopaedics';
  const slug = file.toLowerCase();
  if (slug.includes('knee') || slug.includes('acl') || slug.includes('meniscus') || slug.includes('tibial') || slug.includes('patella')) {
    category = 'Knee Specialities';
  } else if (slug.includes('shoulder') || slug.includes('rotator')) {
    category = 'Shoulder Specialities';
  } else if (slug.includes('sports') || slug.includes('athlete') || slug.includes('nutrition')) {
    category = 'Sports Medicine & Recovery';
  } else if (slug.includes('cartilage') || slug.includes('regenerative') || slug.includes('robotic')) {
    category = 'Robotic & Regenerative Biologics';
  } else if (slug.includes('ankle') || slug.includes('elbow')) {
    category = 'Ankle & Elbow';
  }

  // Custom fixes for the cloned pages
  let finalTitle = h1Text || pageTitle;
  if (file.includes('meniscus-repair')) {
    finalTitle = 'Meniscus Repair & Preservation';
    category = 'Knee Specialities';
  } else if (file.includes('reverse-shoulder-replacement')) {
    finalTitle = 'Reverse Shoulder Replacement';
    category = 'Shoulder Specialities';
  } else if (file.includes('sports-injury-treatment')) {
    finalTitle = 'Sports Injury Treatment';
  }

  allConditions.push({
    id: file.replace('page_', '').replace('_.html', ''),
    file,
    title: finalTitle.replace(/&amp;/g, '&').replace(/&#038;/g, '&'),
    category,
    tagline: tagline || overview.slice(0, 140) + '...',
    overview,
    image,
    localImage: local || image,
    tabData: tabData || {
      symptomsTab: { intro: '', items: [], outro: '' },
      treatmentsTab: { intro: '', items: [], outro: '' },
      procedureTab: { intro: '', items: [], outro: '' },
      faqsTab: { intro: '', items: [], outro: '' }
    }
  });
});

console.log(`Parsed ${allConditions.length} conditions.`);
allConditions.forEach((c, i) => {
  console.log(`${i+1}. ${c.title} -> Sym: ${c.tabData.symptomsTab.items.length}, Treat: ${c.tabData.treatmentsTab.items.length}, Proc: ${c.tabData.procedureTab.items.length || c.tabData.procedureTab.allParagraphs?.length || 0}, FAQs: ${c.tabData.faqsTab.items.length || c.tabData.faqsTab.allParagraphs?.length || 0}`);
});

fs.writeFileSync('all_conditions_perfect.json', JSON.stringify(allConditions, null, 2));

