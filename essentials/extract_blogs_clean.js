const fs = require('fs');

const blogConfigs = [
  {
    file: 'clean_page_blogs_recognizing-rheumatoid-arthritis-symptoms-a-guide-for-the-general-public_.html.txt',
    title: 'Recognizing Rheumatoid Arthritis Symptoms: A Guide for the General Public',
    image: 'assets/images/17071096.jpg',
    date: 'October 9, 2025',
    category: 'Joint Health & Rheumatology',
    readTime: '5 min read'
  },
  {
    file: 'clean_page_blogs_tendonitis-causes-symptoms-diagnosis-and-treatment_.html.txt',
    title: 'Tendonitis: Causes, Symptoms, Diagnosis, and Treatment',
    image: 'assets/images/EN-DRNI-B-OR-CN2301-V1_20251027_174320_v1.jpg',
    date: 'October 27, 2025',
    category: 'Sports Medicine & Tendon Care',
    readTime: '6 min read'
  },
  {
    file: 'clean_page_blogs_arthroscopic-bankart-repair-procedure-recovery-and-patient-guide_.html.txt',
    title: 'Arthroscopic Bankart Repair: Procedure, Recovery, and Patient Guide',
    image: 'assets/images/EN-DRNI-B-OR-CN2301-V2_20251118_125303_v1.jpg',
    date: 'November 18, 2025',
    category: 'Shoulder Arthroscopy & Instability',
    readTime: '7 min read'
  }
];

const fullBlogs = blogConfigs.map(cfg => {
  const text = fs.readFileSync(cfg.file, 'utf8');
  const lines = text.split('\n');
  const bodyLines = [];
  let recording = false;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!recording) {
      if (l === 'Blog' && lines[i+1] && lines[i+1].length > 10) {
        recording = true;
        continue;
      }
    } else {
      if (l === 'About' && lines[i+1] && lines[i+1].includes('Dr. Nithin Kumar Bejjanki, an internationally trained')) {
        break; // end reached
      }
      if (l.includes('Yashoda Hospitals') && lines[i+1] && lines[i+1].includes('+91-7207171115')) {
        break;
      }
      bodyLines.push(l);
    }
  }

  // Find headings, paragraphs, bullet points
  const sections = [];
  let curSection = { heading: 'Introduction', paragraphs: [] };

  bodyLines.forEach(l => {
    // Check if line looks like a subhead
    if (l.endsWith('?') || l.startsWith('How ') || l.startsWith('What ') || l.startsWith('When ') || l.startsWith('Common ') || l.startsWith('Early ') || l.startsWith('Treatment ') || l.startsWith('Diagnosis ') || l.startsWith('Causes ') || l.startsWith('Recovery ') || l.startsWith('Procedure ') || l.startsWith('Understanding ') || l.startsWith('Key Takeaways') || l.startsWith('Conclusion')) {
      if (curSection.paragraphs.length > 0) {
        sections.push(curSection);
      }
      curSection = { heading: l, paragraphs: [] };
    } else {
      curSection.paragraphs.push(l);
    }
  });
  if (curSection.paragraphs.length > 0) {
    sections.push(curSection);
  }

  return {
    ...cfg,
    excerpt: bodyLines.slice(0, 3).join(' ').slice(0, 220) + '...',
    bodyText: bodyLines.join('\n\n'),
    sections
  };
});

fs.writeFileSync('blogs_full.json', JSON.stringify(fullBlogs, null, 2));
console.log('Saved blogs_full.json with', fullBlogs.length, 'articles.');
fullBlogs.forEach(b => console.log(b.title, 'Sections:', b.sections.length, 'Total lines:', b.bodyText.length));

