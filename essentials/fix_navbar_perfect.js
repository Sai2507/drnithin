const fs = require("fs");

let tpl = fs.readFileSync("template.html", "utf8");

// 1. Update CSS in <style>
const oldCssMarker = "/* Header & Mobile Navbar Responsiveness */";
const nextCssMarker = "/* Hero Section Responsive Layout";

const startCss = tpl.indexOf(oldCssMarker);
const endCss = tpl.indexOf(nextCssMarker);

if (startCss !== -1 && endCss !== -1) {
  const newCss = `/* Header & Mobile Navbar Responsiveness */
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
    }

    .nav-brand {
      display: flex !important;
      align-items: center !important;
      gap: 0.75rem !important;
      text-decoration: none !important;
      color: inherit !important;
      flex-shrink: 0 !important;
      white-space: nowrap !important;
    }

    .nav-brand-title {
      font-size: 1.15rem !important;
      font-weight: 800 !important;
      line-height: 1.2 !important;
      white-space: nowrap !important;
    }

    .nav-brand-sub {
      font-size: 0.75rem !important;
      color: var(--text-muted) !important;
      font-weight: 600 !important;
      white-space: nowrap !important;
    }

    .nav-desktop {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      flex-shrink: 1;
    }

    .desktop-nav-link {
      color: var(--text-muted);
      text-decoration: none !important;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.4rem 0.65rem;
      border-radius: 9999px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
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
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.15rem 0.45rem;
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
      gap: 0.75rem;
      flex-shrink: 0;
    }

    /* Breakpoint: Below 1220px, switch to accessible drawer so brand never wraps */
    .mobile-menu-btn {
      display: none !important;
    }

    @media (max-width: 1220px) {
      .nav-desktop {
        display: none !important;
      }
      .mobile-menu-btn {
        display: inline-flex !important;
      }
    }

    @media (min-width: 1221px) {
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
        padding: 0.5rem 0.85rem !important;
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
  tpl = tpl.substring(0, startCss) + newCss + tpl.substring(endCss);
}

// 2. Update Header HTML with .header-container, .nav-brand, .nav-brand-title, .nav-brand-sub, .header-actions
const oldHdrStart = tpl.indexOf("<!-- Main Navigation Header -->");
const oldHdrEnd = tpl.indexOf("<!-- Mobile Off-Canvas Drawer");

if (oldHdrStart !== -1 && oldHdrEnd !== -1) {
  const newHeader = `<!-- Main Navigation Header -->
  <header style="position: sticky; top: 0; z-index: 50;" class="glass-nav">
    <div class="container header-container">
      
      <!-- Brand Logo & Doctor Info (Never Wraps or Compresses) -->
      <a href="#home" class="nav-brand">
        <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #0284c7, #0d9488); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 1.25rem; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3); overflow: hidden; border: 2px solid #fff; flex-shrink: 0;">
          <img src="assets/images/cropped-mobile-banner-5-68b6fbc38ccf7-180x180.webp" alt="Dr Nithin" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='block';">
          <span style="display:none;">DN</span>
        </div>
        <div>
          <div class="nav-brand-title text-gradient">Dr. Nithin Kumar Bejjanki</div>
          <div class="nav-brand-sub">MRCS (UK), FRCS (Tr &amp; Ortho) • Yashoda Hospitals</div>
        </div>
      </a>

      <!-- Desktop Navigation Menu (Styled Pills with Badges) -->
      <nav class="nav-desktop">
        <a href="#about" class="desktop-nav-link">About</a>
        <a href="#conditions" class="desktop-nav-link">
          <span>Specialities</span>
          <span class="nav-count-badge">26</span>
        </a>
        <a href="#triage" class="desktop-nav-link">Symptom Checker</a>
        <a href="#knee-shoulder" class="desktop-nav-link">Keyhole Surgery</a>
        <a href="#reviews" class="desktop-nav-link">
          <span>Reviews</span>
          <span class="nav-count-badge">1150+</span>
        </a>
        <a href="#blogs" class="desktop-nav-link">Guides</a>
        <a href="#gallery" class="desktop-nav-link">Gallery</a>
        <a href="#contact" class="desktop-nav-link">Location</a>
      </nav>

      <!-- Right Header Controls -->
      <div class="header-actions">
        <button id="themeToggleBtn" aria-label="Toggle Dark Mode" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-main); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; flex-shrink: 0;">
          <svg id="themeMoonIcon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
          <svg id="themeSunIcon" style="display:none;" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>
        </button>

        <a href="#book-appointment" class="btn btn-primary nav-book-btn" style="padding: 0.65rem 1.25rem; font-size: 0.875rem; white-space: nowrap; flex-shrink: 0;">
          <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span class="nav-book-text-long">Book Appointment</span>
          <span class="nav-book-text-short">Book</span>
        </a>

        <button id="mobileMenuOpenBtn" class="mobile-menu-btn" aria-label="Open Navigation" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-main); width: 40px; height: 40px; border-radius: 0.5rem; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>

    </div>
  </header>

  `;
  tpl = tpl.substring(0, oldHdrStart) + newHeader + tpl.substring(oldHdrEnd);
}

fs.writeFileSync("template.html", tpl, "utf8");
console.log("template.html updated with robust flex-shrink:0 and white-space:nowrap!");

