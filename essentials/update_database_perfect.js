const fs = require('fs');

const perfectConditions = JSON.parse(fs.readFileSync('all_conditions_perfect.json', 'utf8'));
const currentDb = JSON.parse(fs.readFileSync('site_database.json', 'utf8'));

// Update conditions in currentDb
currentDb.conditions = perfectConditions;

fs.writeFileSync('site_database.json', JSON.stringify(currentDb, null, 2));
console.log('Updated site_database.json with all 26 perfect conditions!');

// Check sample condition (Elite Sports Injury Management)
const elite = currentDb.conditions.find(c => c.id.includes('elite-sports'));
console.log('\n--- ELITE SPORTS INJURY MANAGEMENT CHECK ---');
console.log('Title:', elite.title);
console.log('Symptoms items count:', elite.tabData.symptomsTab.items.length);
console.log('Symptoms sample:', elite.tabData.symptomsTab.items[0]);
console.log('Treatments items count:', elite.tabData.treatmentsTab.items.length);
console.log('Treatments sample:', elite.tabData.treatmentsTab.items[0]);
console.log('Procedure items count:', elite.tabData.procedureTab.items.length);
console.log('Procedure sample:', elite.tabData.procedureTab.items[0]);
console.log('FAQs items count:', elite.tabData.faqsTab.items.length);
console.log('FAQs sample:', elite.tabData.faqsTab.items[0]);

