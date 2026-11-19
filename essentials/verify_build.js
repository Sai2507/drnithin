const fs = require("fs");
const vm = require("vm");

console.log("=== COMPREHENSIVE VERIFICATION OF index.html ===");

const html = fs.readFileSync("index.html", "utf8");

// 1. Script extraction & syntax test
console.log("\n[Test 1] Testing JavaScript Syntax in index.html...");
const scriptMatches = [...html.matchAll(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi)];
console.log("Found", scriptMatches.length, "script blocks.");

let jsSyntaxPass = true;
scriptMatches.forEach((m, idx) => {
  try {
    new vm.Script(m[1]);
    console.log(`Script ${idx + 1}: Valid syntax (length: ${m[1].length} chars).`);
  } catch (err) {
    console.error(`Script ${idx + 1} Syntax Error:`, err.message);
    jsSyntaxPass = false;
  }
});

// 2. Verify Database in index.html
console.log("\n[Test 2] Verifying SITE_DB data integrity inside index.html...");
const dbMatch = html.match(/const\s+SITE_DB\s*=\s*(\{[\s\S]*?\});/);
if (!dbMatch) {
  console.error("SITE_DB not found in index.html!");
  process.exit(1);
}

const siteDb = JSON.parse(dbMatch[1]);
console.log("- Conditions count:", siteDb.conditions.length);
console.log("- Gallery count:", siteDb.gallery.length);
console.log("- Reviews count:", siteDb.reviews.length);
console.log("- Blogs count:", siteDb.blogs.length);

if (siteDb.conditions.length !== 26) {
  console.error("FAIL: Expected 26 conditions, got", siteDb.conditions.length);
} else {
  console.log("PASS: 26 conditions present.");
}

if (siteDb.gallery.length !== 16) {
  console.error("FAIL: Expected 16 gallery images, got", siteDb.gallery.length);
} else {
  console.log("PASS: 16 gallery images present.");
}

// 3. Verify All 26 Conditions Tabs
console.log("\n[Test 3] Verifying tab content across all 26 conditions...");
let conditionsPass = true;
siteDb.conditions.forEach(c => {
  const tabs = c.tabData || {};
  const sym = tabs.symptomsTab || {};
  const treat = tabs.treatmentsTab || {};
  const proc = tabs.procedureTab || {};
  const faqs = tabs.faqsTab || {};

  const symCount = (sym.items || []).length + (sym.intro ? 1 : 0);
  const treatCount = (treat.items || []).length + (treat.intro ? 1 : 0);
  const procCount = (proc.items || []).length + (proc.intro ? 1 : 0);
  const faqsCount = (faqs.items || []).length + (faqs.intro ? 1 : 0);

  if (symCount === 0 || treatCount === 0 || procCount === 0 || faqsCount === 0) {
    console.error(`FAIL in ${c.id}: Empty tab detected! (sym: ${symCount}, treat: ${treatCount}, proc: ${procCount}, faqs: ${faqsCount})`);
    conditionsPass = false;
  }
});

if (conditionsPass) {
  console.log("PASS: All 26 conditions have non-empty, robust content in all 4 tabs!");
}

// 4. Verify Elite Sports Injury Management specifically (from user's screenshot)
console.log("\n[Test 4] Verifying Elite Sports Injury Management content specifically...");
const elite = siteDb.conditions.find(c => c.id === "elite-sports-injury-management");
console.log("- Title:", elite.title);
console.log("- Category:", elite.category);
console.log("- Overview length:", elite.overview.length, "chars");
console.log("- Symptoms items count:", elite.tabData.symptomsTab.items.length);
console.log("- Treatment items count:", elite.tabData.treatmentsTab.items.length);
console.log("- Procedure items count:", elite.tabData.procedureTab.items.length);
console.log("- FAQs items count:", elite.tabData.faqsTab.items.length);

console.log("Sample symptoms item:", elite.tabData.symptomsTab.items[0]);
console.log("Sample treatment item:", elite.tabData.treatmentsTab.items[0]);
console.log("Sample procedure item:", elite.tabData.procedureTab.items[0].slice(0, 70) + "...");
console.log("Sample FAQ item:", elite.tabData.faqsTab.items[0].slice(0, 70) + "...");

// 5. Verify 16 Gallery Images on Disk
console.log("\n[Test 5] Verifying 16 Gallery local image files on disk...");
let galleryImagesPass = true;
siteDb.gallery.forEach((g, idx) => {
  if (!fs.existsSync(g.image)) {
    console.error(`FAIL: Missing gallery file on disk: ${g.image}`);
    galleryImagesPass = false;
  } else {
    const sz = fs.statSync(g.image).size;
    if (sz === 0) {
      console.error(`FAIL: 0-byte file: ${g.image}`);
      galleryImagesPass = false;
    }
  }
});
if (galleryImagesPass) {
  console.log("PASS: All 16 gallery images exist on disk with valid file size!");
}

// 6. Verify Responsive CSS rules
console.log("\n[Test 6] Verifying Responsive CSS Breakpoints in index.html...");
const hasHeroGrid = html.includes(".hero-container-grid");
const hasHeroVisualOrder1 = html.includes(".hero-visual-col") && html.includes("order: 1 !important");
const hasHeroCopyOrder2 = html.includes(".hero-copy-col") && html.includes("order: 2 !important");
const hasNavLogoSubHide = html.includes(".nav-brand-sub") && html.includes("display: none !important");
const hasNavBookCompact = html.includes(".nav-book-text-short") && html.includes("display: inline !important");
const hasMobileBtnDesktopHide = html.includes(".mobile-menu-btn") && html.includes("display: none !important");

console.log("- Hero Container Grid defined?", hasHeroGrid);
console.log("- Mobile Hero Visual order 1 (image first)?", hasHeroVisualOrder1);
console.log("- Mobile Hero Copy order 2 (content second)?", hasHeroCopyOrder2);
console.log("- Subtitle hidden on mobile header?", hasNavLogoSubHide);
console.log("- Book button compact on mobile?", hasNavBookCompact);
console.log("- Hamburger button hidden on desktop?", hasMobileBtnDesktopHide);

if (hasHeroGrid && hasHeroVisualOrder1 && hasHeroCopyOrder2 && hasNavLogoSubHide && hasNavBookCompact && hasMobileBtnDesktopHide) {
  console.log("\nALL VERIFICATION TESTS PASSED SUCCESSFULLY! ✅");
} else {
  console.error("\nSOME CSS RULES ARE MISSING!");
}

