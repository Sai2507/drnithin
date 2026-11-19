const { execSync } = require('child_process');
const fs = require('fs');

const servicePages = [
  'https://drnithin.com/sports-injury-treatment/',
  'https://drnithin.com/elite-athlete-treatment/',
  'https://drnithin.com/sports-nutrition-recovery-guidance/',
  'https://drnithin.com/knee-pain-assessment/',
  'https://drnithin.com/acl-repair-reconstruction/',
  'https://drnithin.com/revision-acl-surgery/',
  'https://drnithin.com/meniscus-repair/',
  'https://drnithin.com/cartilage-repair/',
  'https://drnithin.com/cartilage-regeneration-surgery/',
  'https://drnithin.com/tibial-osteotomy-knee-realignment/',
  'https://drnithin.com/patella-dislocation-management/',
  'https://drnithin.com/shoulder-pain-treatment/',
  'https://drnithin.com/frozen-shoulder-treatment/',
  'https://drnithin.com/rotator-cuff-repair/',
  'https://drnithin.com/shoulder-dislocation-instability/',
  'https://drnithin.com/complex-shoulder-trauma-management/',
  'https://drnithin.com/total-shoulder-replacement/',
  'https://drnithin.com/reverse-shoulder-replacement/',
  'https://drnithin.com/ankle-injury-treatments/',
  'https://drnithin.com/ligament-tear-reconstruction-ankle/',
  'https://drnithin.com/arthroscopy-for-ankle-elbow/',
  'https://drnithin.com/robotic-orthopedic-surgeries/',
  'https://drnithin.com/regenerative-orthopedic-therapies-biologics-healing/',
  'https://drnithin.com/blogs/recognizing-rheumatoid-arthritis-symptoms-a-guide-for-the-general-public/',
  'https://drnithin.com/blogs/tendonitis-causes-symptoms-diagnosis-and-treatment/',
  'https://drnithin.com/blogs/arthroscopic-bankart-repair-procedure-recovery-and-patient-guide/'
];

servicePages.forEach(u => {
  const rawName = u.replace('https://drnithin.com/', '').replace(/[^a-zA-Z0-9_-]/g, '_');
  const outFile = `page_${rawName}.html`;
  if (!fs.existsSync(outFile)) {
    console.log(`Fetching ${u} -> ${outFile}`);
    try {
      execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${u}" -o "${outFile}"`);
    } catch (e) {
      console.log(`Error ${u}:`, e.message);
    }
  }
});
console.log('Finished fetching service and blog pages.');

