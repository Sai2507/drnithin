const fs = require("fs");

let tpl = fs.readFileSync("template.html", "utf8");

// 1. Replace Gallery Section HTML
const galStart = tpl.indexOf("<!-- SURGICAL GALLERY & CLINICAL MOMENTS -->");
const galEnd = tpl.indexOf("<!-- COMPREHENSIVE APPOINTMENT BOOKING WIZARD -->");

if (galStart !== -1 && galEnd !== -1) {
  const newGalHtml = `<!-- SURGICAL GALLERY & CLINICAL MOMENTS -->
  <section id="gallery" style="padding: 5rem 0; background: var(--bg-main);">
    <div class="container">
      
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 2.5rem;">
        <span class="badge badge-teal" style="margin-bottom: 0.75rem;">Visual Documentation</span>
        <h2 style="font-size: clamp(2rem, 4vw, 2.85rem); margin-bottom: 0.75rem;">Clinical Gallery &amp; Facilities</h2>
        <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 650px;">
          Explore Dr. Nithin's international surgical training, sports injury work with Olympic &amp; celebrity athletes, advanced operating theatres, and rapid patient recovery milestones.
        </p>

        <!-- Category Filter Pills -->
        <div class="flex gap-2" style="flex-wrap: wrap; justify-content: center; margin-top: 1.5rem;" id="galleryFilterContainer">
          <button class="gallery-filter-pill active" data-category="all" style="padding: 0.5rem 1.15rem; border-radius: 9999px; border: 1px solid var(--primary); background: var(--primary); color: #fff; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;">
            All Photos (16)
          </button>
          <button class="gallery-filter-pill" data-category="Celebrities &amp; Athletes" style="padding: 0.5rem 1.15rem; border-radius: 9999px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;">
            Celebrities &amp; Athletes (5)
          </button>
          <button class="gallery-filter-pill" data-category="Surgical Procedures" style="padding: 0.5rem 1.15rem; border-radius: 9999px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;">
            Surgical Procedures (2)
          </button>
          <button class="gallery-filter-pill" data-category="Patient Recovery" style="padding: 0.5rem 1.15rem; border-radius: 9999px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;">
            Patient Recovery (2)
          </button>
          <button class="gallery-filter-pill" data-category="International Conferences" style="padding: 0.5rem 1.15rem; border-radius: 9999px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;">
            Conferences &amp; Academics (3)
          </button>
          <button class="gallery-filter-pill" data-category="Clinical Consultations" style="padding: 0.5rem 1.15rem; border-radius: 9999px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;">
            Clinical Consultations (2)
          </button>
          <button class="gallery-filter-pill" data-category="Hospital Facilities" style="padding: 0.5rem 1.15rem; border-radius: 9999px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;">
            Hospital Facilities (2)
          </button>
        </div>
      </div>

      <!-- 16-Photo Gallery Grid -->
      <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 4rem;" id="galleryGrid">
      </div>

      <div style="margin-top: 2rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h3 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Educational Video Center</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Understand surgical procedures and recovery exercises through concise video walkthroughs.</p>
        </div>

        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;" id="videosGrid">
        </div>
      </div>

    </div>
  </section>

  `;
  tpl = tpl.substring(0, galStart) + newGalHtml + tpl.substring(galEnd);
  console.log("Updated Gallery Section HTML");
}

// 2. Replace Lightbox Modal HTML
const lbStart = tpl.indexOf("<!-- LIGHTBOX MODAL -->");
const lbEnd = tpl.indexOf("<!-- VIDEO MODAL -->");

if (lbStart !== -1 && lbEnd !== -1) {
  const newLbHtml = `<!-- ENHANCED INTERACTIVE LIGHTBOX MODAL -->
  <div id="galleryLightboxModal" class="modal-backdrop" onclick="if(event.target === this) closeGalleryLightbox()">
    <div style="position: relative; max-width: 900px; width: 94%; max-height: 90vh; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 1.25rem; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
      
      <!-- Top Bar: Counter & Close -->
      <div style="padding: 0.85rem 1.25rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); background: var(--bg-card);">
        <div class="flex items-center gap-2">
          <span id="galleryLightboxCategory" class="badge badge-teal">Category</span>
          <span id="galleryLightboxCounter" style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Photo 1 of 16</span>
        </div>
        <button onclick="closeGalleryLightbox()" aria-label="Close" style="background: none; border: none; color: var(--text-main); font-size: 1.5rem; cursor: pointer; padding: 0.25rem 0.5rem; border-radius: 0.5rem; line-height: 1;">✕</button>
      </div>

      <!-- Main Image View with Navigation Arrows -->
      <div style="position: relative; flex-grow: 1; min-height: 300px; max-height: 58vh; background: #070e1b; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img id="galleryLightboxImg" src="" alt="Gallery Image" style="max-width: 100%; max-height: 58vh; object-fit: contain; transition: opacity 0.2s;">
        
        <!-- Prev Button -->
        <button id="galleryLightboxPrevBtn" onclick="navigateGalleryLightbox(-1)" aria-label="Previous Photo" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); width: 42px; height: 42px; border-radius: 50%; background: rgba(0,0,0,0.65); color: #fff; border: 1px solid rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 1.5rem; line-height: 1;">
          ‹
        </button>
        <!-- Next Button -->
        <button id="galleryLightboxNextBtn" onclick="navigateGalleryLightbox(1)" aria-label="Next Photo" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); width: 42px; height: 42px; border-radius: 50%; background: rgba(0,0,0,0.65); color: #fff; border: 1px solid rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; font-size: 1.5rem; line-height: 1;">
          ›
        </button>
      </div>

      <!-- Caption & Details -->
      <div style="padding: 1rem 1.25rem; background: var(--bg-card); border-top: 1px solid var(--border-color);">
        <h4 id="galleryLightboxTitle" style="font-size: 1.15rem; margin-bottom: 0.25rem; line-height: 1.3;">Image Title</h4>
        <p id="galleryLightboxCaption" style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">Image Caption</p>
      </div>

    </div>
  </div>

  `;
  tpl = tpl.substring(0, lbStart) + newLbHtml + tpl.substring(lbEnd);
  console.log("Updated Lightbox Modal HTML");
}

// 3. Update Gallery JavaScript Logic
const galJsStart = tpl.indexOf("// RENDER GALLERY");
const galJsEnd = tpl.indexOf("// RENDER VIDEOS");

if (galJsStart !== -1 && galJsEnd !== -1) {
  const newGalJs = `// RENDER GALLERY WITH 16 PHOTOS & CATEGORY FILTERING
    let currentGalleryCategory = 'all';
    let currentFilteredGallery = [...SITE_DB.gallery];
    let currentLightboxIndex = 0;

    function renderGallery(cat = 'all') {
      currentGalleryCategory = cat;
      if (cat === 'all') {
        currentFilteredGallery = [...SITE_DB.gallery];
      } else {
        currentFilteredGallery = SITE_DB.gallery.filter(item => {
          if (cat === 'International Conferences' || cat === 'Conferences & Academics') {
            return item.category.includes('Conference') || item.category.includes('Academic');
          }
          if (cat === 'Celebrities & Athletes') {
            return item.category.includes('Celebrities') || item.category.includes('Athletes');
          }
          return item.category === cat;
        });
      }

      // Update filter pills UI
      document.querySelectorAll('.gallery-filter-pill').forEach(btn => {
        const btnCat = btn.getAttribute('data-category');
        if (btnCat === cat) {
          btn.classList.add('active');
          btn.style.background = 'var(--primary)';
          btn.style.color = '#fff';
          btn.style.borderColor = 'var(--primary)';
        } else {
          btn.classList.remove('active');
          btn.style.background = 'var(--bg-card)';
          btn.style.color = 'var(--text-main)';
          btn.style.borderColor = 'var(--border-color)';
        }
      });

      const galleryGrid = document.getElementById('galleryGrid');
      galleryGrid.innerHTML = currentFilteredGallery.map((g, idx) => \`
        <div class="card" style="padding: 0; cursor: pointer; border-radius: 1rem; overflow: hidden; display: flex; flex-direction: column;" onclick="openGalleryLightbox(\${idx})">
          <div style="position: relative; overflow: hidden; aspect-ratio: 4/3; background: #0f172a;">
            <img src="\${g.image}" alt="\${g.title}" style="width:100%; height:100%; object-fit:cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'" onerror="this.src='\${g.fallbackImage}'">
            <span class="badge" style="position: absolute; top: 0.75rem; left: 0.75rem; background: rgba(9, 21, 40, 0.85); color: #38bdf8; font-size: 0.725rem; backdrop-filter: blur(4px);">
              \${g.category}
            </span>
            <div style="position: absolute; bottom: 0.75rem; right: 0.75rem; width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,0.6); color:#fff; display:flex; align-items:center; justify-content:center; font-size: 0.85rem; backdrop-filter: blur(4px);">
              🔍
            </div>
          </div>
          <div style="padding: 1rem; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-weight: 700; font-size: 1rem; line-height: 1.35; margin-bottom: 0.35rem;">\${g.title}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.45;">\${g.caption}</div>
            </div>
            <div style="margin-top: 0.75rem; font-size: 0.75rem; color: var(--primary); font-weight: 700; display: flex; align-items: center; gap: 0.25rem;">
              <span>View Full Photo</span> <span>→</span>
            </div>
          </div>
        </div>
      \`).join('');
    }

    // Attach pill click events
    document.querySelectorAll('.gallery-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        renderGallery(cat);
      });
    });

    renderGallery('all');

    `;
  tpl = tpl.substring(0, galJsStart) + newGalJs + tpl.substring(galJsEnd);
  console.log("Updated Gallery Render JavaScript Logic");
}

// 4. Update Lightbox JavaScript Functions
const lbJsStart = tpl.indexOf("// LIGHTBOX");
const lbJsEnd = tpl.indexOf("// VIDEO MODAL");

if (lbJsStart !== -1 && lbJsEnd !== -1) {
  const newLbJs = `// ENHANCED GALLERY LIGHTBOX MODAL
    const galleryLightboxModal = document.getElementById('galleryLightboxModal');
    const galleryLightboxImg = document.getElementById('galleryLightboxImg');
    const galleryLightboxCounter = document.getElementById('galleryLightboxCounter');
    const galleryLightboxCategory = document.getElementById('galleryLightboxCategory');
    const galleryLightboxTitle = document.getElementById('galleryLightboxTitle');
    const galleryLightboxCaption = document.getElementById('galleryLightboxCaption');

    function openGalleryLightbox(idx) {
      currentLightboxIndex = idx;
      updateGalleryLightboxContent();
      galleryLightboxModal.classList.add('active');
    }

    function closeGalleryLightbox() {
      galleryLightboxModal.classList.remove('active');
    }

    function navigateGalleryLightbox(direction) {
      currentLightboxIndex += direction;
      if (currentLightboxIndex < 0) currentLightboxIndex = currentFilteredGallery.length - 1;
      if (currentLightboxIndex >= currentFilteredGallery.length) currentLightboxIndex = 0;
      updateGalleryLightboxContent();
    }

    function updateGalleryLightboxContent() {
      const item = currentFilteredGallery[currentLightboxIndex];
      if (!item) return;
      galleryLightboxImg.style.opacity = '0.3';
      setTimeout(() => {
        galleryLightboxImg.src = item.image;
        galleryLightboxImg.onerror = () => { galleryLightboxImg.src = item.fallbackImage; };
        galleryLightboxImg.style.opacity = '1';
      }, 80);
      galleryLightboxCounter.innerText = 'Photo ' + (currentLightboxIndex + 1) + ' of ' + currentFilteredGallery.length;
      galleryLightboxCategory.innerText = item.category;
      galleryLightboxTitle.innerText = item.title;
      galleryLightboxCaption.innerText = item.caption;
    }

    // Keyboard support for Lightbox
    document.addEventListener('keydown', (e) => {
      if (!galleryLightboxModal || !galleryLightboxModal.classList.contains('active')) return;
      if (e.key === 'ArrowLeft') navigateGalleryLightbox(-1);
      if (e.key === 'ArrowRight') navigateGalleryLightbox(1);
      if (e.key === 'Escape') closeGalleryLightbox();
    });

    `;
  tpl = tpl.substring(0, lbJsStart) + newLbJs + tpl.substring(lbJsEnd);
  console.log("Updated Lightbox JS Functions");
}

fs.writeFileSync("template.html", tpl, "utf8");
console.log("template.html updated successfully with 16-photo gallery and lightbox!");

