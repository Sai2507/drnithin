const fs = require('fs');

const db = JSON.parse(fs.readFileSync('site_database.json', 'utf8'));

// We will generate the complete index.html file
console.log('Generating index.html from site_database.json...');
console.log('Doctor:', db.doctor.name);
console.log('Conditions:', db.conditions.length);
console.log('Blogs:', db.blogs.length);
console.log('Reviews:', db.reviews.length);
console.log('Gallery:', db.gallery.length);
console.log('Videos:', db.videos.length);

