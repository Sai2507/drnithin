const fs = require("fs");

console.log("Reading template.html and site_database.json...");
const template = fs.readFileSync("template.html", "utf8");
const db = JSON.parse(fs.readFileSync("site_database.json", "utf8"));

console.log("Database stats:");
console.log("- Conditions count:", db.conditions ? db.conditions.length : 0);
console.log("- Gallery count:", db.gallery ? db.gallery.length : 0);
console.log("- Reviews count:", db.reviews ? db.reviews.length : 0);
console.log("- Blogs count:", db.blogs ? db.blogs.length : 0);

const dbJson = JSON.stringify(db);
const compiled = template.replace("__SITE_DATABASE__", dbJson);

fs.writeFileSync("index.html", compiled, "utf8");
console.log("index.html compiled successfully! File size:", fs.statSync("index.html").size, "bytes");

