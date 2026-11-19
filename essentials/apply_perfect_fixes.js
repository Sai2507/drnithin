const fs = require("fs");

let tpl = fs.readFileSync("template.html", "utf8");

// 1. UPDATE CSS FOR NAVBAR & BREAKPOINT
const oldCssStart = tpl.indexOf("/* Header & Mobile Navbar Responsiveness */");
const oldCssEnd = tpl.indexOf("/* Hero Section Responsive Layout");

if (oldCssStart !== -1 && oldCssEnd !== -1) {
  const newCss = `/* Header & Mobile Navbar Responsiveness */
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding-top: 0.65rem;
      padding-bottom: 0.65rem;
      width: 100%;
    }

    .nav-brand {
      display: flex !important;
      align-items: center !important;
      gap: 0.65rem !important;
      text-decoration: none !important;
      color: inherit !important;
      flex-shrink: 0 !important;
      white-space: nowrap !important;
    }

    .nav-brand-title {
      font-size: 1.05rem !important;
      font-weight: 800 !important;
      line-height: 1.2 !important;
      white-space: nowrap !important;
    }

    .nav-brand-sub {
      font-size: 0.725rem !important;
      color: var(--text-muted) !important;
      font-weight: 600 !important;
      white-space: nowrap !important;
    }

    .nav-desktop {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      flex-shrink: 0;
    }

    .desktop-nav-link {
      color: var(--text-muted);
      text-decoration: none !important;
      font-size: 0.825rem;
      font-weight: 600;
      padding: 0.35rem 0.55rem;
      border-radius: 9999px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      white-space: nowrap;
    }

    .desktop-nav-link:hover {
      color: var(--primary);
      background: var(--primary-light);
    }

    .dark .desktop-nav-link:hover {
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
    }

    .desktop-nav-link.active {
      color: #ffffff;
      background: var(--primary);
    }

    .nav-count-badge {
      background: rgba(2, 132, 199, 0.12);
      color: var(--primary);
      font-size: 0.685rem;
      font-weight: 700;
      padding: 0.1rem 0.4rem;
      border-radius: 9999px;
      line-height: 1;
      transition: all 0.2s;
    }

    .desktop-nav-link:hover .nav-count-badge {
      background: var(--primary);
      color: #ffffff;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
      white-space: nowrap;
    }

    .nav-book-btn {
      padding: 0.55rem 1rem !important;
      font-size: 0.85rem !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
    }

    /* Breakpoint: Below 1040px, switch cleanly to mobile drawer */
    .mobile-menu-btn {
      display: none !important;
    }

    @media (max-width: 1040px) {
      .nav-desktop {
        display: none !important;
      }
      .mobile-menu-btn {
        display: inline-flex !important;
      }
    }

    @media (min-width: 1041px) {
      .mobile-menu-btn {
        display: none !important;
      }
    }

    @media (max-width: 768px) {
      .nav-brand-sub {
        display: none !important;
      }
    }

    @media (max-width: 640px) {
      .top-announcement-bar {
        padding: 0.35rem 0 !important;
      }
      .top-announcement-inner {
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
        gap: 0.25rem !important;
      }
      .top-announcement-inner .top-phone {
        margin-left: 0 !important;
      }
      .nav-book-btn {
        padding: 0.45rem 0.75rem !important;
        font-size: 0.8rem !important;
      }
      .nav-book-text-long {
        display: none !important;
      }
      .nav-book-text-short {
        display: inline !important;
      }
    }

    `;
  tpl = tpl.substring(0, oldCssStart) + newCss + tpl.substring(oldCssEnd);
  console.log("Updated CSS for navbar and responsive breakpoints");
}

// 2. UPDATE HEADER HTML WITH 6 STREAMLINED LINKS THAT FIT COMFORTABLY
const oldHeaderStart = tpl.indexOf("<!-- Main Navigation Header -->");
const oldHeaderEnd = tpl.indexOf("<!-- Mobile Off-Canvas Drawer");

if (oldHeaderStart !== -1 && oldHeaderEnd !== -1) {
  const newHeader = `<!-- Main Navigation Header -->
  <header style="position: sticky; top: 0; z-index: 50;" class="glass-nav">
    <div class="container header-container">
      
      <!-- Brand Logo & Doctor Info -->
      <a href="#home" class="nav-brand">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #0284c7, #0d9488); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 1.15rem; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3); overflow: hidden; border: 2px solid #fff; flex-shrink: 0;">
          <img src="assets/images/cropped-mobile-banner-5-68b6fbc38ccf7-180x180.webp" alt="Dr Nithin" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='block';">
          <span style="display:none;">DN</span>
        </div>
        <div>
          <div class="nav-brand-title text-gradient">Dr. Nithin Kumar Bejjanki</div>
          <div class="nav-brand-sub">FRCS (Tr &amp; Ortho) • Yashoda Hospitals</div>
        </div>
      </a>

      <!-- Desktop Navigation Menu (6 Streamlined Sleek Links) -->
      <nav class="nav-desktop">
        <a href="#about" class="desktop-nav-link">About</a>
        <a href="#conditions" class="desktop-nav-link">
          <span>Specialities</span>
          <span class="nav-count-badge">26</span>
        </a>
        <a href="#triage" class="desktop-nav-link">Symptom Checker</a>
        <a href="#reviews" class="desktop-nav-link">
          <span>Reviews</span>
          <span class="nav-count-badge">1150+</span>
        </a>
        <a href="#gallery" class="desktop-nav-link">
          <span>Gallery</span>
          <span class="nav-count-badge">16</span>
        </a>
        <a href="#contact" class="desktop-nav-link">Location</a>
      </nav>

      <!-- Right Header Controls -->
      <div class="header-actions">
        <button id="themeToggleBtn" aria-label="Toggle Dark Mode" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-main); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0;">
          <svg id="themeMoonIcon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
          <svg id="themeSunIcon" style="display:none;" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>
        </button>

        <a href="#book-appointment" class="btn btn-primary nav-book-btn">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span class="nav-book-text-long">Book Appointment</span>
          <span class="nav-book-text-short">Book</span>
        </a>

        <button id="mobileMenuOpenBtn" class="mobile-menu-btn" aria-label="Open Navigation" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-main); width: 38px; height: 38px; border-radius: 0.5rem; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>

    </div>
  </header>

  `;
  tpl = tpl.substring(0, oldHeaderStart) + newHeader + tpl.substring(oldHeaderEnd);
  console.log("Updated Header HTML with 6 streamlined links");
}

// 3. REPLACE LIGHTBOX MODAL HTML TO MATCH ALL JAVASCRIPT IDs
const lbStart = tpl.indexOf("<!-- GALLERY LIGHTBOX MODAL -->");
const lbEnd = tpl.indexOf("<!-- VIDEO PLAYER MODAL -->");

if (lbStart !== -1 && lbEnd !== -1) {
  const newLightboxHtml = `<!-- GALLERY LIGHTBOX MODAL -->
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
  </div>\n\n  `;
  tpl = tpl.substring(0, lbStart) + newLightboxHtml + tpl.substring(lbEnd);
  console.log("Updated Lightbox Modal HTML with galleryLightboxModal and controls");
}

fs.writeFileSync("template.html", tpl, "utf8");
console.log("template.html updated successfully!");

