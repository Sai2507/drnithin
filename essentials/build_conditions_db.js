const fs = require('fs');
const path = require('path');

function extractConditionDetails(file) {
  const html = fs.readFileSync(file, 'utf8');
  
  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  let pageTitle = titleMatch ? titleMatch[1].replace(/&#038;/g, '&').replace(/&#8211;/g, '–').replace(/ \| Dr Nithin Bejjanki.*/, '').replace(/ in Secunderabad.*/, '').trim() : '';

  // Get breadcrumb or h1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : pageTitle;

  // Tagline (often in a p or subhead right under header)
  let tagline = '';
  const taglineMatch = html.match(/<h1[^>]*>[\s\S]*?<\/h1>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
  if (taglineMatch) {
    tagline = taglineMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Find image
  const imgMatch = html.match(/class=["'][^"']*elementor-image[^"']*["'][\s\S]*?<img[^>]+src=["']([^"']+)["']/i) ||
                   html.match(/<img[^>]+src=["'](https:\/\/drnithin\.com\/wp-content\/uploads\/[^"']+)["']/i);
  let image = imgMatch ? imgMatch[1] : '';

  // Extract clean text
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
  clean = clean.replace(/<\/(p|div|h[1-6]|li)>/gi, '\n');
  clean = clean.replace(/<br\s*[\/]?>/gi, '\n');
  clean = clean.replace(/<[^>]+>/g, ' ');
  clean = clean.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ');
  const lines = clean.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(l => l.length > 0);

  // Parse Sections:
  // Usually we have: Overview, Symptoms & Conditions Treated, Treatment Options, Procedure Details, FAQs & Recovery
  let overview = '';
  let symptoms = [];
  let treatments = [];
  let procedure = [];
  let faqs = [];

  let currentSection = 'start';
  
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l === 'About' && lines[i+1] && lines[i+1].includes('Dr. Nithin Kumar Bejjanki, an internationally trained')) {
      break; // reached footer
    }
    
    if (l.includes('Symptoms & Conditions Treated')) {
      currentSection = 'symptoms';
      continue;
    } else if (l.includes('Treatment Options')) {
      currentSection = 'treatments';
      continue;
    } else if (l.includes('Procedure Details')) {
      currentSection = 'procedure';
      continue;
    } else if (l.includes('FAQs & Recovery') || l.includes('Frequently Asked Questions')) {
      currentSection = 'faqs';
      continue;
    }

    if (currentSection === 'start') {
      if (l.length > 100 && !l.includes('Secunderabad') && !l.includes('Skip to content') && !l.includes('Book Appointment')) {
        overview += (overview ? ' ' : '') + l;
      }
    } else if (currentSection === 'symptoms') {
      if (!l.includes('Symptoms & Conditions') && l.length > 5) {
        symptoms.push(l);
      }
    } else if (currentSection === 'treatments') {
      if (!l.includes('Treatment Options') && l.length > 5) {
        treatments.push(l);
      }
    } else if (currentSection === 'procedure') {
      if (!l.includes('Procedure Details') && l.length > 5) {
        procedure.push(l);
      }
    } else if (currentSection === 'faqs') {
      if (!l.includes('FAQs & Recovery') && l.length > 5) {
        faqs.push(l);
      }
    }
  }

  // Determine category
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

  return {
    id: file.replace('page_', '').replace('_.html', ''),
    file,
    title: h1Text || pageTitle,
    category,
    tagline: tagline || overview.slice(0, 120) + '...',
    overview,
    symptoms,
    treatments,
    procedure,
    faqs,
    image
  };
}

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

const allConditions = conditionFiles.map(extractConditionDetails);
fs.writeFileSync('all_conditions_structured.json', JSON.stringify(allConditions, null, 2));
console.log(`Structured ${allConditions.length} conditions into all_conditions_structured.json`);

