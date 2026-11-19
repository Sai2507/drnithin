const fs = require("fs");

let tpl = fs.readFileSync("template.html", "utf8");

// 1. Inject the new CSS styles for navigation
const navStyles = `
    /* Modern Desktop & Mobile Navigation Styles */
    .nav-desktop {
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .desktop-nav-link {
      color: var(--text-muted);
      text-decoration: none !important;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 0.45rem 0.75rem;
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

    /* Book Button Text Control: Single text on desktop, compact on mobile */
    .nav-book-text-long {
      display: inline !important;
    }
    .nav-book-text-short {
      display: none !important;
    }
    @media (max-width: 640px) {
      .nav-book-text-long {
        display: none !important;
      }
      .nav-book-text-short {
        display: inline !important;
      }
    }

    /* Modern Mobile Drawer Navigation Links */
    .mobile-nav-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 0.85rem;
      border-radius: 0.85rem;
      text-decoration: none !important;
      color: var(--text-main) !important;
      font-size: 0.95rem;
      font-weight: 600;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .mobile-nav-link:hover, .mobile-nav-link:active {
      background: var(--primary-light) !important;
      color: var(--primary-dark) !important;
      border-color: rgba(2, 132, 199, 0.3) !important;
      transform: translateX(4px);
    }
    .dark .mobile-nav-link {
      background: var(--bg-card);
      color: #f1f5f9 !important;
      border-color: var(--border-color);
    }
    .dark .mobile-nav-link:hover, .dark .mobile-nav-link:active {
      background: rgba(56, 189, 248, 0.15) !important;
      color: #38bdf8 !important;
    }
    .mobile-nav-icon {
      width: 32px;
      height: 32px;
      border-radius: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.95rem;
      flex-shrink: 0;
    }
    .mobile-nav-arrow {
      color: var(--text-muted);
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 1;
      transition: transform 0.2s;
    }
    .mobile-nav-link:hover .mobile-nav-arrow {
      transform: translateX(3px);
      color: var(--primary);
    }
`;

// Insert navStyles right before </style>
tpl = tpl.replace("</style>", navStyles + "\n  </style>");

// 2. Replace Header and Mobile Drawer HTML
const headerStart = tpl.indexOf("<!-- Main Navigation Header -->");
const headerEnd = tpl.indexOf("<!-- HERO SECTION -->");

const newHeaderAndDrawer = `<!-- Main Navigation Header -->
  <header style="position: sticky; top: 0; z-index: 50;" class="glass-nav">
    <div class="container flex items-center justify-between" style="padding-top: 0.75rem; padding-bottom: 0.75rem;">
      
      <!-- Brand Logo & Doctor Info -->
      <a href="#home" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #0284c7, #0d9488); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 1.25rem; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3); overflow: hidden; border: 2px solid #fff; flex-shrink: 0;">
          <img src="assets/images/cropped-mobile-banner-5-68b6fbc38ccf7-180x180.webp" alt="Dr Nithin" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='block';">
          <span style="display:none;">DN</span>
        </div>
        <div>
          <div style="font-size: 1.15rem; font-weight: 800; line-height: 1.2;" class="text-gradient">Dr. Nithin Kumar Bejjanki</div>
          <div class="nav-logo-sub" style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">MRCS (UK), FRCS (Tr &amp; Ortho) • Yashoda Hospitals</div>
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
        <a href="#blogs" class="desktop-nav-link">Clinical Guides</a>
        <a href="#gallery" class="desktop-nav-link">Gallery</a>
        <a href="#contact" class="desktop-nav-link">Location</a>
      </nav>

      <!-- Right Header Controls -->
      <div class="flex items-center gap-3">
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

  <!-- Mobile Off-Canvas Drawer (Modern Medical App Style) -->
  <div id="mobileDrawer" style="position: fixed; inset: 0; z-index: 99; background: rgba(9, 21, 40, 0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
    <div id="mobileDrawerContent" style="position: absolute; right: 0; top: 0; bottom: 0; width: 88%; max-width: 340px; background: var(--bg-card); padding: 1.25rem 1.25rem 1.5rem; display: flex; flex-direction: column; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: -10px 0 35px rgba(0,0,0,0.35); overflow-y: auto;">
      
      <!-- Drawer Header with Doctor Profile -->
      <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color); margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <div style="width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #0284c7, #0d9488); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; overflow: hidden; border: 2px solid var(--primary-light);">
            <img src="assets/images/cropped-mobile-banner-5-68b6fbc38ccf7-180x180.webp" alt="Dr Nithin" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none';">
          </div>
          <div>
            <div style="font-weight: 800; font-size: 0.95rem; line-height: 1.2; color: var(--text-main);">Dr. Nithin Bejjanki</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">Orthopaedic &amp; Sports Surgeon</div>
          </div>
        </div>
        <button id="mobileMenuCloseBtn" aria-label="Close Menu" style="width: 34px; height: 34px; border-radius: 50%; background: var(--bg-main); border: 1px solid var(--border-color); color: var(--text-main); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.1rem; transition: all 0.2s;">✕</button>
      </div>

      <!-- Quick OPD Consultation Status -->
      <div style="background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 0.75rem; padding: 0.55rem 0.85rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem;">
        <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#22c55e; flex-shrink:0;"></span>
        <span style="color: var(--text-muted);"><strong>Yashoda Secunderabad:</strong> Mon–Sat OPD</span>
      </div>

      <!-- Styled Mobile Navigation List -->
      <div class="mobile-nav-list" style="display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1.25rem;">
        <a href="#about" class="mobile-nav-link">
          <div class="flex items-center gap-3">
            <span class="mobile-nav-icon" style="background: #e0f2fe; color: #0284c7;">👨‍⚕️</span>
            <span>About Dr. Nithin</span>
          </div>
          <span class="mobile-nav-arrow">›</span>
        </a>

        <a href="#conditions" class="mobile-nav-link">
          <div class="flex items-center gap-3">
            <span class="mobile-nav-icon" style="background: #ccfbf1; color: #0f766e;">🦴</span>
            <span>26 Specialities</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="nav-count-badge">26</span>
            <span class="mobile-nav-arrow">›</span>
          </div>
        </a>

        <a href="#triage" class="mobile-nav-link">
          <div class="flex items-center gap-3">
            <span class="mobile-nav-icon" style="background: #fef3c7; color: #b45309;">🩺</span>
            <span>Symptom Checker</span>
          </div>
          <span class="mobile-nav-arrow">›</span>
        </a>

        <a href="#knee-shoulder" class="mobile-nav-link">
          <div class="flex items-center gap-3">
            <span class="mobile-nav-icon" style="background: #e0e7ff; color: #4338ca;">🔬</span>
            <span>Keyhole Arthroscopy</span>
          </div>
          <span class="mobile-nav-arrow">›</span>
        </a>

        <a href="#reviews" class="mobile-nav-link">
          <div class="flex items-center gap-3">
            <span class="mobile-nav-icon" style="background: #fef9c3; color: #ca8a04;">⭐</span>
            <span>Google Reviews</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="nav-count-badge">1150+</span>
            <span class="mobile-nav-arrow">›</span>
          </div>
        </a>

        <a href="#blogs" class="mobile-nav-link">
          <div class="flex items-center gap-3">
            <span class="mobile-nav-icon" style="background: #f3e8ff; color: #7e22ce;">📚</span>
            <span>Clinical Guides</span>
          </div>
          <span class="mobile-nav-arrow">›</span>
        </a>

        <a href="#gallery" class="mobile-nav-link">
          <div class="flex items-center gap-3">
            <span class="mobile-nav-icon" style="background: #fee2e2; color: #dc2626;">📸</span>
            <span>Surgical Gallery</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="nav-count-badge">16</span>
            <span class="mobile-nav-arrow">›</span>
          </div>
        </a>

        <a href="#contact" class="mobile-nav-link">
          <div class="flex items-center gap-3">
            <span class="mobile-nav-icon" style="background: #ecfdf5; color: #059669;">📍</span>
            <span>Hospital Location</span>
          </div>
          <span class="mobile-nav-arrow">›</span>
        </a>
      </div>

      <!-- Drawer Bottom Action Buttons -->
      <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.65rem;">
        <a href="#book-appointment" class="btn btn-primary" style="width: 100%; padding: 0.75rem 1rem; font-size: 0.925rem; font-weight: 700;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Book Consultation
        </a>
        <a href="https://wa.me/917207171115?text=Hello%20Dr.%20Nithin,%20I%20would%20like%20to%20consult%20regarding%20an%20orthopedic%20issue" target="_blank" class="btn btn-whatsapp" style="width: 100%; padding: 0.75rem 1rem; font-size: 0.925rem;">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
          Chat on WhatsApp
        </a>
      </div>

    </div>
  </div>\n\n  `;

tpl = tpl.substring(0, headerStart) + newHeaderAndDrawer + tpl.substring(headerEnd);

// 3. Fix line with hero portrait onerror
tpl = tpl.replace(
  'onerror="this.src=\\"https://drnithin.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-16-at-4.23.00-PM-68b6d80a18eb7-e1756812836254.webp\\""',
  'onerror="this.src=\'https://drnithin.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-16-at-4.23.00-PM-68b6d80a18eb7-e1756812836254.webp\'"'
);
tpl = tpl.replace(
  'onerror="this.src="https://drnithin.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-16-at-4.23.00-PM-68b6d80a18eb7-e1756812836254.webp""',
  'onerror="this.src=\'https://drnithin.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-16-at-4.23.00-PM-68b6d80a18eb7-e1756812836254.webp\'"'
);

fs.writeFileSync("template.html", tpl, "utf8");
console.log("template.html updated with styled desktop & mobile menus!");

