const fs = require('fs');

const blogFiles = [
  'page_blogs_recognizing-rheumatoid-arthritis-symptoms-a-guide-for-the-general-public_.html',
  'page_blogs_tendonitis-causes-symptoms-diagnosis-and-treatment_.html',
  'page_blogs_arthroscopic-bankart-repair-procedure-recovery-and-patient-guide_.html'
];

const blogs = [];

blogFiles.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  let title = titleMatch ? titleMatch[1].replace(/ - drnithinkumar.*/, '').replace(/ &#8211; .*/, '').replace(/ \| .*/, '').trim() : '';

  // Extract author, date
  const dateMatch = html.match(/class=["'][^"']*elementor-post-info__item--type-date[^"']*["'][\s\S]*?>([\s\S]*?)<\/span>/i) ||
                    html.match(/datetime=["']([^"']+)["']/i);
  let date = dateMatch ? dateMatch[1].replace(/<[^>]+>/g, '').trim() : 'October 2025';

  // Extract image
  const imgMatch = html.match(/<img[^>]+src=["'](https:\/\/drnithin\.com\/wp-content\/uploads\/[^"']+)["']/i);
  let image = imgMatch ? imgMatch[1] : '';

  // Extract article body content
  // Looking for post content
  let bodyMatch = html.match(/<div class=["'][^"']*elementor-widget-theme-post-content[^"']*["']>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i) ||
                  html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  
  let rawBody = bodyMatch ? bodyMatch[1] : html;
  // Clean scripts & styles
  let cleanBody = rawBody.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                         .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                         .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');

  let cleanText = cleanBody.replace(/<\/(p|div|h[1-6]|li)>/gi, '\n')
                           .replace(/<br\s*[\/]?>/gi, '\n')
                           .replace(/<[^>]+>/g, ' ')
                           .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ');

  const lines = cleanText.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(l => l.length > 0);

  // Filter out header/nav/footer lines
  const articleLines = [];
  let started = false;
  for (const l of lines) {
    if (l.includes('Home') && l.includes('Blogs') && l.includes('Skip to content')) continue;
    if (l === 'About' && articleLines.length > 10) break;
    if (l.includes('Yashoda Hospitals') && articleLines.length > 10) break;
    if (l.includes('Dr. Nithin Kumar Bejjanki, an internationally trained')) break;
    if (l === title || l.includes('Introduction') || l.includes('Understanding') || l.includes('Overview')) started = true;
    if (started) {
      articleLines.push(l);
    }
  }

  blogs.push({
    file,
    title,
    date,
    image,
    excerpt: articleLines.slice(1, 4).join(' ').slice(0, 200) + '...',
    content: articleLines.join('\n\n')
  });
});

fs.writeFileSync('blogs_structured.json', JSON.stringify(blogs, null, 2));
console.log(`Extracted ${blogs.length} blogs successfully.`);

