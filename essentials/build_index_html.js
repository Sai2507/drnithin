const fs = require('fs');

const db = JSON.parse(fs.readFileSync('site_database.json', 'utf8'));

// Build the HTML file
const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dr. Nithin Kumar Bejjanki | Orthopaedic Surgeon & Sports Injury Specialist | Yashoda Hospitals Secunderabad</title>
  <meta name="description" content="Dr. Nithin Kumar Bejjanki - MRCS (UK), FRCS (Tr & Ortho), MCh Ortho, DSEM (IOC). 24+ years experience in knee arthroscopy, ACL reconstruction, shoulder arthroscopy, rotator cuff repair, cartilage regeneration, and robotic surgeries at Yashoda Hospitals Secunderabad.">
  <meta name="keywords" content="Dr Nithin Kumar Bejjanki, Orthopaedic Surgeon Secunderabad, Knee Arthroscopy, Shoulder Arthroscopy, ACL Surgery, Rotator Cuff Repair, Sports Injury Specialist, Yashoda Hospitals">
  <link rel="icon" href="assets/images/cropped-mobile-banner-5-68b6fbc38ccf7-32x32.webp" type="image/webp">
  
  <!-- Modern Font Stack & Tailwind CSS (Resilient Local & CDN) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --primary: #0284c7;
      --primary-dark: #0369a1;
      --primary-light: #e0f2fe;
      --secondary: #0d9488;
      --secondary-dark: #0f766e;
      --accent: #2563eb;
      --dark-navy: #091528;
      --navy-card: #0f223d;
      --text-main: #0f172a;
      --text-muted: #475569;
      --bg-main: #f8fafc;
      --bg-card: #ffffff;
      --border-color: #e2e8f0;
      --badge-bg: #f0fdf4;
      --badge-text: #166534;
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    }

    .dark {
      --primary: #38bdf8;
      --primary-dark: #0284c7;
      --primary-light: #0c4a6e;
      --secondary: #14b8a6;
      --secondary-dark: #0d9488;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --bg-main: #070e1b;
      --bg-card: #0d1a2d;
      --border-color: #1e293b;
      --badge-bg: #064e3b;
      --badge-text: #6ee7b7;
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.4);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background-color: var(--bg-main);
      color: var(--text-main);
      line-height: 1.6;
      overflow-x: hidden;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    /* Container Utility */
    .container {
      width: 100%;
      max-width: 1280px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }

    /* Glassmorphism */
    .glass-nav {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
    }
    .dark .glass-nav {
      background: rgba(7, 14, 27, 0.88);
    }

    /* Badges & Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      text-decoration: none;
      font-size: 0.95rem;
      border: 1px solid transparent;
    }
    .btn-primary {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #ffffff;
      box-shadow: 0 4px 14px 0 rgba(2, 132, 199, 0.35);
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
      box-shadow: 0 6px 20px 0 rgba(2, 132, 199, 0.45);
      transform: translateY(-2px);
    }
    .btn-secondary {
      background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
      color: #ffffff;
      box-shadow: 0 4px 14px 0 rgba(13, 148, 136, 0.35);
    }
    .btn-secondary:hover {
      background: linear-gradient(135deg, #0f766e 0%, #115e59 100%);
      transform: translateY(-2px);
    }
    .btn-outline {
      background: transparent;
      color: var(--text-main);
      border-color: var(--border-color);
    }
    .btn-outline:hover {
      background: var(--bg-card);
      border-color: var(--primary);
      color: var(--primary);
      transform: translateY(-2px);
    }
    .btn-whatsapp {
      background: #25D366;
      color: #ffffff;
    }
    .btn-whatsapp:hover {
      background: #1ebd5b;
      transform: translateY(-2px);
    }

    /* Gradients */
    .text-gradient {
      background: linear-gradient(135deg, #0284c7 0%, #0d9488 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .dark .text-gradient {
      background: linear-gradient(135deg, #38bdf8 0%, #2dd4bf 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Cards */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 1.25rem;
      padding: 1.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
      border-color: rgba(2, 132, 199, 0.3);
    }

    /* Floating Pill */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge-primary {
      background-color: var(--primary-light);
      color: var(--primary-dark);
    }
    .dark .badge-primary {
      background-color: var(--primary-light);
      color: #bae6fd;
    }
    .badge-teal {
      background-color: #ccfbf1;
      color: #0f766e;
    }
    .dark .badge-teal {
      background-color: #134e4a;
      color: #5eead4;
    }

    /* Modal Backdrop */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .modal-backdrop.active {
      opacity: 1;
      pointer-events: auto;
    }
    .modal-dialog {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 1.5rem;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: scale(0.95);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
    }
    .modal-backdrop.active .modal-dialog {
      transform: scale(1);
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg-main);
    }
    ::-webkit-scrollbar-thumb {
      background: #94a3b8;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #64748b;
    }

    /* Animations */
    @keyframes pulse-ring {
      0% { transform: scale(0.95); opacity: 0.8; }
      50% { transform: scale(1.1); opacity: 0.4; }
      100% { transform: scale(0.95); opacity: 0.8; }
    }
    .pulse-indicator {
      animation: pulse-ring 2s infinite ease-in-out;
    }

    /* Form styles */
    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--border-color);
      border-radius: 0.75rem;
      background: var(--bg-main);
      color: var(--text-main);
      font-size: 0.95rem;
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }
    .form-control:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
    }

    /* Grid utilities */
    .grid { display: grid; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .justify-between { justify-content: space-between; }
    .justify-center { justify-content: center; }
    .gap-2 { gap: 0.5rem; }
    .gap-4 { gap: 1rem; }
    .gap-6 { gap: 1.5rem; }
    .gap-8 { gap: 2rem; }
    .gap-12 { gap: 3rem; }

    /* Responsive nav */
    @media (max-width: 1024px) {
      .nav-desktop { display: none; }
      .mobile-menu-btn { display: inline-flex; }
    }
    @media (min-width: 1025px) {
      .mobile-menu-btn { display: none; }
    }
  </style>
</head>
<body>

  <!-- Top Announcement Bar -->
  <div style="background: linear-gradient(90deg, #091528 0%, #0f2b48 100%); color: #e2e8f0; font-size: 0.825rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
    <div class="container flex items-center justify-between" style="flex-wrap: wrap; gap: 0.5rem;">
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-2">
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#22c55e;" class="pulse-indicator"></span>
          <strong>OPD Consultation:</strong> Yashoda Hospitals, Secunderabad (Mon - Sat)
        </span>
        <span style="display:none;" class="md-inline">|</span>
        <span style="color:#94a3b8; display:none;" class="md-inline">International Fellowship Trained (UK, Calvert London)</span>
      </div>
      <div class="flex items-center gap-4" style="margin-left: auto;">
        <a href="tel:+917207171115" style="color:#38bdf8; text-decoration:none; font-weight:600; display:flex; align-items:center; gap:0.25rem;">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/></svg>
          +91-7207171115
        </a>
        <a href="mailto:nithindoc@gmail.com" style="color:#94a3b8; text-decoration:none; display:none;" class="md-inline">
          nithindoc@gmail.com
        </a>
      </div>
    </div>
  </div>

  <!-- Main Navigation Header -->
  <header style="position: sticky; top: 0; z-index: 50;" class="glass-nav">
    <div class="container flex items-center justify-between" style="padding-top: 0.75rem; padding-bottom: 0.75rem;">
      
      <!-- Doctor / Hospital Branding -->
      <a href="#home" style="text-decoration: none; color: inherit; display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 46px; height: 46px; border-radius: 50%; background: linear-gradient(135deg, #0284c7, #0d9488); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 1.25rem; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3); overflow: hidden; border: 2px solid #fff;">
          <img src="assets/images/cropped-mobile-banner-5-68b6fbc38ccf7-180x180.webp" alt="Dr Nithin" style="width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
          <span style="display:none;">DN</span>
        </div>
        <div>
          <div style="font-size: 1.15rem; font-weight: 800; line-height: 1.2;" class="text-gradient">Dr. Nithin Kumar Bejjanki</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">MRCS (UK), FRCS (Tr & Ortho) • Yashoda Hospitals</div>
        </div>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="nav-desktop flex items-center gap-6" style="font-size: 0.925rem; font-weight: 600;">
        <a href="#about" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">About</a>
        <a href="#conditions" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Specialities (26)</a>
        <a href="#triage" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Symptom Checker</a>
        <a href="#knee-shoulder" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Keyhole Surgery</a>
        <a href="#reviews" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Reviews (1150+)</a>
        <a href="#blogs" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Clinical Guides</a>
        <a href="#gallery" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Gallery</a>
        <a href="#contact" style="color: var(--text-muted); text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Location</a>
      </nav>

      <!-- Header Actions: Theme Toggle + Book Button -->
      <div class="flex items-center gap-3">
        <!-- Dark Mode Toggle -->
        <button id="themeToggleBtn" aria-label="Toggle Dark Mode" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-main); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;">
          <svg id="themeMoonIcon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>
          <svg id="themeSunIcon" style="display:none;" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>
        </button>

        <!-- Book Appointment Button -->
        <a href="#book-appointment" class="btn btn-primary" style="padding: 0.65rem 1.25rem; font-size: 0.875rem;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Book Appointment
        </a>

        <!-- Mobile Menu Toggle Button -->
        <button id="mobileMenuOpenBtn" class="mobile-menu-btn" aria-label="Open Navigation" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-main); width: 40px; height: 40px; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>

    </div>
  </header>

  <!-- Mobile Off-Canvas Drawer -->
  <div id="mobileDrawer" style="position: fixed; inset: 0; z-index: 99; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
    <div id="mobileDrawerContent" style="position: absolute; right: 0; top: 0; bottom: 0; width: 85%; max-width: 320px; background: var(--bg-card); padding: 1.5rem; display: flex; flex-direction: column; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: -10px 0 30px rgba(0,0,0,0.25);">
      <div class="flex items-center justify-between" style="margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
        <span style="font-weight: 700; font-size: 1.1rem;">Menu</span>
        <button id="mobileMenuCloseBtn" style="background:none; border:none; color:var(--text-main); cursor:pointer; font-size:1.5rem;">✕</button>
      </div>
      <div class="flex" style="flex-direction: column; gap: 1rem; font-size: 1.05rem; font-weight: 600;">
        <a href="#about" class="mobile-nav-link">About Dr. Nithin</a>
        <a href="#conditions" class="mobile-nav-link">26 Specialities & Conditions</a>
        <a href="#triage" class="mobile-nav-link">Joint Pain Symptom Checker</a>
        <a href="#knee-shoulder" class="mobile-nav-link">Arthroscopy Deep-Dive</a>
        <a href="#reviews" class="mobile-nav-link">Google Patient Reviews (1150+)</a>
        <a href="#blogs" class="mobile-nav-link">Clinical Patient Guides</a>
        <a href="#gallery" class="mobile-nav-link">Surgical Gallery & Videos</a>
        <a href="#contact" class="mobile-nav-link">Hospital Location & Hours</a>
      </div>
      <div style="margin-top: auto; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
        <a href="#book-appointment" class="btn btn-primary" style="width:100%; margin-bottom: 0.75rem;">Book Appointment</a>
        <a href="https://wa.me/917207171115?text=Hello%20Dr.%20Nithin,%20I%20would%20like%20to%20consult%20regarding%20an%20orthopedic%20issue" target="_blank" class="btn btn-whatsapp" style="width:100%;">
          Chat on WhatsApp
        </a>
      </div>
    </div>
  </div>

  <!-- HERO SECTION -->
  <section id="home" style="position: relative; padding: 4rem 0 3rem; overflow: hidden; background: radial-gradient(circle at 80% 20%, rgba(2, 132, 199, 0.12) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(13, 148, 136, 0.08) 0%, transparent 40%);">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem; align-items: center;">
        
        <!-- Left Hero Copy -->
        <div>
          <!-- Verified Badges -->
          <div class="flex items-center gap-2" style="flex-wrap: wrap; margin-bottom: 1.25rem;">
            <span class="badge badge-primary">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              24+ Years Clinical Excellence
            </span>
            <span class="badge badge-teal">UK Fellowship Trained (Calvert London)</span>
            <span class="badge" style="background:#fef3c7; color:#92400e;">Former National Tennis Player</span>
          </div>

          <!-- Main Title -->
          <h1 style="font-size: clamp(2.25rem, 5vw, 3.5rem); line-height: 1.15; margin-bottom: 1.25rem; font-weight: 800;">
            Advanced Arthroscopy, Sports Injuries & <span class="text-gradient">Joint Preservation</span>
          </h1>

          <!-- Credentials -->
          <div style="background: var(--bg-card); border-left: 4px solid var(--primary); padding: 0.75rem 1rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.25rem; font-size: 0.95rem; border-top: 1px solid var(--border-color); border-right: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
            <strong style="color: var(--primary-dark);">Dr. Nithin Kumar Bejjanki</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
              MRCS (UK), FRCS (Tr & Ortho), MCh Ortho, DSEM (International Olympic Committee)<br>
              Fellowship Shoulder (UK - Calvert Fellowship, London), Fellowship Knee (UK)
            </p>
          </div>

          <!-- Description -->
          <p style="font-size: 1.05rem; color: var(--text-muted); margin-bottom: 2rem; max-width: 580px;">
            Globally trained orthopaedic surgeon bringing world-class UK surgical standards to Hyderabad & Secunderabad. Specialising in keyhole knee & shoulder arthroscopy, ACL reconstructions, rotator cuff repairs, cartilage regeneration, and robotic surgeries.
          </p>

          <!-- CTAs -->
          <div class="flex items-center gap-4" style="flex-wrap: wrap; margin-bottom: 2.5rem;">
            <a href="#book-appointment" class="btn btn-primary" style="padding: 0.85rem 1.75rem; font-size: 1rem;">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Book Consultation
            </a>
            <a href="#triage" class="btn btn-outline" style="padding: 0.85rem 1.5rem; font-size: 1rem;">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              Check Your Joint Symptoms
            </a>
            <a href="https://wa.me/917207171115?text=Hello%20Dr.%20Nithin,%20I%20would%20like%20to%20consult%20regarding%20an%20orthopedic%20issue" target="_blank" class="btn btn-whatsapp" style="padding: 0.85rem 1.25rem;">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
              WhatsApp
            </a>
          </div>

          <!-- Social Proof Bar -->
          <div class="flex items-center gap-6" style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; flex-wrap: wrap;">
            <div class="flex items-center gap-3">
              <div style="background:#4285F4; color:#fff; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1rem;">G</div>
              <div>
                <div style="display:flex; align-items:center; gap:0.25rem; color:#f59e0b; font-size:0.9rem;">
                  ★★★★★ <strong style="color:var(--text-main); margin-left:0.25rem;">4.9 / 5.0</strong>
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted);">Based on <strong>1,151+ Google Reviews</strong></div>
              </div>
            </div>
            <div style="height: 30px; width: 1px; background: var(--border-color); display:none;" class="md-inline"></div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">
              <span style="color:var(--secondary); font-weight:700;">✓ Yashoda Hospitals</span> Secunderabad<br>
              <span style="font-size:0.75rem;">Cashless Health Insurance & TPA Accepted</span>
            </div>
          </div>
        </div>

        <!-- Right Hero Visual / Interactive Doctor Card -->
        <div style="position: relative; display: flex; justify-content: center;">
          
          <!-- Decorative Glow Frame -->
          <div style="position: absolute; inset: -15px; background: linear-gradient(135deg, rgba(2, 132, 199, 0.25), rgba(13, 148, 136, 0.2)); border-radius: 2rem; filter: blur(25px); z-index: 0;"></div>

          <div class="card" style="position: relative; z-index: 1; padding: 1rem; border-radius: 2rem; width: 100%; max-width: 440px; box-shadow: 0 25px 50px -12px rgba(2, 132, 199, 0.25);">
            <div style="position: relative; border-radius: 1.5rem; overflow: hidden; background: #0f172a; aspect-ratio: 4/5;">
              <img src="assets/images/img-3255-68b6bd668aa62.webp" alt="Dr. Nithin Kumar Bejjanki Orthopaedic Surgeon" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;" onerror="this.src='https://drnithin.com/wp-content/uploads/2025/09/img-3255-68b6bd668aa62-974x1024.webp'">
              
              <!-- Subtle gradient overlay -->
              <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 65%, rgba(9, 21, 40, 0.95) 100%);"></div>

              <!-- Overlay Tag -->
              <div style="position: absolute; bottom: 1rem; left: 1rem; right: 1rem; color: #ffffff;">
                <div style="font-size: 0.75rem; text-transform: uppercase; color: #38bdf8; font-weight: 700; letter-spacing: 0.05em;">Consultant Surgeon</div>
                <div style="font-size: 1.2rem; font-weight: 800;">Dr. Nithin Kumar Bejjanki</div>
                <div style="font-size: 0.8rem; opacity: 0.9;">Trained in Birmingham, Sheffield, London (Calvert)</div>
              </div>
            </div>

            <!-- Floating Stat Badges -->
            <div style="position: absolute; top: 1.5rem; left: -1rem; background: var(--bg-card); padding: 0.5rem 1rem; border-radius: 1rem; border: 1px solid var(--border-color); box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 0.5rem;" class="floating-badge">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 1rem;">🏆</div>
              <div>
                <div style="font-size: 0.85rem; font-weight: 800;">Top Specialist</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Calvert Fellowship UK</div>
              </div>
            </div>

            <div style="position: absolute; bottom: 4.5rem; right: -1rem; background: var(--bg-card); padding: 0.5rem 1rem; border-radius: 1rem; border: 1px solid var(--border-color); box-shadow: var(--shadow-lg); display: flex; align-items: center; gap: 0.5rem;" class="floating-badge">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 1rem;">⚡</div>
              <div>
                <div style="font-size: 0.85rem; font-weight: 800;">99% Success</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Fast Return to Sports</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ANIMATED METRICS COUNTER SECTION -->
  <section style="background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 3rem 0;">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem;">
        
        <div style="text-align: center; padding: 1rem;">
          <div style="font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 800; color: var(--primary);" class="counter" data-target="24">0</div>
          <div style="font-size: 1.1rem; font-weight: 700; margin-top: 0.25rem;">Years Of Experience</div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Dedicated clinical & advanced surgical practice across UK and India</p>
        </div>

        <div style="text-align: center; padding: 1rem; border-left: 1px solid var(--border-color);">
          <div style="font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 800; color: var(--secondary);" class="counter" data-target="99">0</div>
          <div style="font-size: 1.1rem; font-weight: 700; margin-top: 0.25rem;">Success Rate (%)</div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Pioneering minimally invasive techniques with exceptional outcomes</p>
        </div>

        <div style="text-align: center; padding: 1rem; border-left: 1px solid var(--border-color);">
          <div style="font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 800; color: #2563eb;" class="counter" data-target="96">0</div>
          <div style="font-size: 1.1rem; font-weight: 700; margin-top: 0.25rem;">Positive Feedback (%)</div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Verified patient satisfaction across consultations & surgeries</p>
        </div>

        <div style="text-align: center; padding: 1rem; border-left: 1px solid var(--border-color);">
          <div style="font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 800; color: #7c3aed;" class="counter" data-target="17">0</div>
          <div style="font-size: 1.1rem; font-weight: 700; margin-top: 0.25rem;">Satisfied Patients (K+)</div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Over 17,000+ individuals and athletes restored to pain-free mobility</p>
        </div>

      </div>
    </div>
  </section>

  <!-- INTERACTIVE JOINT SYMPTOM CHECKER & TRIAGE WIDGET -->
  <section id="triage" style="padding: 5rem 0; background: linear-gradient(180deg, var(--bg-main) 0%, rgba(2, 132, 199, 0.04) 100%);">
    <div class="container">
      <div style="text-align: center; max-width: 720px; margin: 0 auto 3rem;">
        <span class="badge badge-primary" style="margin-bottom: 0.75rem;">Interactive Patient Tool</span>
        <h2 style="font-size: clamp(1.85rem, 3.5vw, 2.5rem); margin-bottom: 0.75rem;">Interactive Joint Symptom Checker</h2>
        <p style="color: var(--text-muted); font-size: 1rem;">
          Unsure whether your pain needs rest, physiotherapy, or surgical evaluation? Select your symptoms below to get instant guidance on the appropriate clinical consultation.
        </p>
      </div>

      <div class="card" style="max-width: 860px; margin: 0 auto; padding: 2.5rem;">
        <!-- Step 1: Joint Selection -->
        <div style="margin-bottom: 2rem;">
          <label style="font-weight: 700; font-size: 1rem; display: block; margin-bottom: 0.75rem;">1. Which joint is causing you pain or discomfort?</label>
          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem;" id="triageJointSelect">
            <button type="button" class="triage-btn active" data-joint="knee" style="padding: 1rem; border-radius: 1rem; border: 2px solid var(--primary); background: var(--primary-light); color: var(--primary-dark); font-weight: 700; cursor: pointer; text-align: center;">
              <span style="font-size: 1.5rem; display:block; margin-bottom: 0.25rem;">🦵</span>
              Knee Joint
            </button>
            <button type="button" class="triage-btn" data-joint="shoulder" style="padding: 1rem; border-radius: 1rem; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); font-weight: 600; cursor: pointer; text-align: center;">
              <span style="font-size: 1.5rem; display:block; margin-bottom: 0.25rem;">💪</span>
              Shoulder Joint
            </button>
            <button type="button" class="triage-btn" data-joint="sports" style="padding: 1rem; border-radius: 1rem; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); font-weight: 600; cursor: pointer; text-align: center;">
              <span style="font-size: 1.5rem; display:block; margin-bottom: 0.25rem;">🏃</span>
              Sports Injury
            </button>
            <button type="button" class="triage-btn" data-joint="ankle" style="padding: 1rem; border-radius: 1rem; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-main); font-weight: 600; cursor: pointer; text-align: center;">
              <span style="font-size: 1.5rem; display:block; margin-bottom: 0.25rem;">🦶</span>
              Ankle / Elbow
            </button>
          </div>
        </div>

        <!-- Step 2: Symptom Checkboxes -->
        <div style="margin-bottom: 2rem;">
          <label style="font-weight: 700; font-size: 1rem; display: block; margin-bottom: 0.75rem;">2. What are you experiencing? (Select all that apply)</label>
          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;" id="triageSymptomOptions">
            <!-- Dynamically populated by JS based on joint -->
          </div>
        </div>

        <!-- Step 3: Duration -->
        <div style="margin-bottom: 2rem;">
          <label style="font-weight: 700; font-size: 1rem; display: block; margin-bottom: 0.75rem;">3. How long have you experienced these symptoms?</label>
          <div class="flex gap-4" style="flex-wrap: wrap;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="duration" value="acute" checked> Less than 2 weeks (Acute)
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="duration" value="subacute"> 2 to 6 weeks
            </label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
              <input type="radio" name="duration" value="chronic"> Over 6 weeks (Chronic)
            </label>
          </div>
        </div>

        <!-- Result Box -->
        <div id="triageResultBox" style="background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%); border: 1px solid rgba(2, 132, 199, 0.3); border-radius: 1.25rem; padding: 1.5rem;">
          <div class="flex items-center gap-3" style="margin-bottom: 0.75rem;">
            <div style="background: var(--primary); color:#fff; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800;">✓</div>
            <div>
              <div style="font-size:0.8rem; text-transform:uppercase; font-weight:700; color:var(--primary);">Recommended Specialty Care</div>
              <h4 id="triageResultTitle" style="font-size: 1.25rem; font-weight:800;">Knee Ligament & Meniscus Arthroscopy Evaluation</h4>
            </div>
          </div>
          <p id="triageResultDesc" style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">
            Symptoms such as knee locking or instability often indicate an anterior cruciate ligament (ACL) tear or meniscus damage. Early arthroscopic diagnosis avoids cartilage wear.
          </p>
          <div class="flex items-center gap-4" style="flex-wrap:wrap;">
            <button id="triageBookBtn" class="btn btn-primary" style="padding: 0.65rem 1.25rem; font-size: 0.9rem;">
              Pre-Fill Appointment Booking
            </button>
            <button id="triageExploreBtn" class="btn btn-outline" style="padding: 0.65rem 1.25rem; font-size: 0.9rem;">
              View Clinical Details
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ABOUT DR. NITHIN KUMAR BEJJANKI SECTION -->
  <section id="about" style="padding: 5rem 0; background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
    <div class="container">
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3.5rem; align-items: center; margin-bottom: 4rem;">
        
        <!-- Left Doctor Images Collage -->
        <div style="position: relative;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="border-radius: 1.5rem; overflow: hidden; aspect-ratio: 3/4; box-shadow: var(--shadow-lg);">
              <img src="assets/images/At-Belgium.jpg" alt="Dr Nithin in Belgium fellowship" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://drnithin.com/wp-content/uploads/2025/09/At-Belgium.jpg'">
            </div>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div style="border-radius: 1.5rem; overflow: hidden; aspect-ratio: 1; box-shadow: var(--shadow-lg);">
                <img src="assets/images/IMG_3700.jpg" alt="Dr Nithin surgery clinic" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://drnithin.com/wp-content/uploads/2025/09/IMG_3700.jpg'">
              </div>
              <div style="border-radius: 1.5rem; overflow: hidden; aspect-ratio: 1; box-shadow: var(--shadow-lg); background:#0f172a;">
                <img src="assets/images/IMG_3701.jpg" alt="Dr Nithin orthopaedic specialist" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://drnithin.com/wp-content/uploads/2025/09/IMG_3701.jpg'">
              </div>
            </div>
          </div>

          <!-- Experience Badge Card -->
          <div style="position: absolute; bottom: -1.5rem; left: 1rem; right: 1rem; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1rem 1.5rem; box-shadow: var(--shadow-xl); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-weight: 800; font-size: 1.25rem; color: var(--primary);">Calvert London Fellow</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Shoulders under Dr Andrew Wallace • Knee under Dr Andy Williams</div>
            </div>
            <div style="font-size: 2rem;">🇬🇧</div>
          </div>
        </div>

        <!-- Right Doctor Narrative with Interactive Tabs -->
        <div>
          <span class="badge badge-primary" style="margin-bottom: 0.75rem;">Meet Your Surgeon</span>
          <h2 style="font-size: clamp(2rem, 4vw, 2.85rem); line-height: 1.2; margin-bottom: 1rem;">
            Guiding Path to <span class="text-gradient">Exceptional Care</span>
          </h2>
          <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            Dr. Nithin Kumar Bejjanki is an accomplished Orthopaedic Surgeon with 24 years of surgical experience, known for his ethical practice, surgical precision, and dedication to joint preservation.
          </p>

          <!-- Interactive Tab Buttons -->
          <div class="flex gap-2" style="border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin-bottom: 1.5rem; overflow-x: auto;" id="aboutTabs">
            <button class="about-tab-btn active" data-tab="overview" style="background:none; border:none; padding:0.5rem 1rem; font-weight:700; color:var(--primary); border-bottom: 2px solid var(--primary); cursor:pointer; font-size:0.95rem;">
              Overview & Ethics
            </button>
            <button class="about-tab-btn" data-tab="training" style="background:none; border:none; padding:0.5rem 1rem; font-weight:600; color:var(--text-muted); cursor:pointer; font-size:0.95rem;">
              UK Fellowships
            </button>
            <button class="about-tab-btn" data-tab="sports" style="background:none; border:none; padding:0.5rem 1rem; font-weight:600; color:var(--text-muted); cursor:pointer; font-size:0.95rem;">
              Athletic Insight
            </button>
            <button class="about-tab-btn" data-tab="academic" style="background:none; border:none; padding:0.5rem 1rem; font-weight:600; color:var(--text-muted); cursor:pointer; font-size:0.95rem;">
              Mentorship & Charity
            </button>
          </div>

          <!-- Tab Contents -->
          <div id="aboutTabContents">
            <div id="tab-overview" class="about-content">
              <p style="color: var(--text-muted); margin-bottom: 1rem;">
                Considered one of the most ethical and skillful surgeons in the region, Dr. Nithin has treated numerous international sports professionals and helped them win medals for the country. His care extends from elite professionals to everyday patients, ensuring that everyone benefits from the same high level of dedication and excellence.
              </p>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-main); font-size: 0.95rem;">
                <li class="flex items-center gap-2"><span style="color:var(--secondary); font-weight:800;">✓</span> <strong>Joint Preservation First:</strong> Surgical repair prioritized over replacement whenever possible.</li>
                <li class="flex items-center gap-2"><span style="color:var(--secondary); font-weight:800;">✓</span> <strong>Minimally Invasive:</strong> High-definition arthroscopy with micro-incisions and rapid recovery.</li>
                <li class="flex items-center gap-2"><span style="color:var(--secondary); font-weight:800;">✓</span> <strong>Transparent Healthcare:</strong> Clear communication, honest pros/cons, and cashless insurance support.</li>
              </ul>
            </div>

            <div id="tab-training" class="about-content" style="display:none;">
              <p style="color: var(--text-muted); margin-bottom: 1rem;">
                Dr. Nithin’s extensive surgical training was carried out at renowned orthopedic centers in the United Kingdom, including Birmingham, Sheffield, Yorkshire, and culminated in a fellowship in London.
              </p>
              <div class="card" style="padding: 1rem; background: var(--bg-main); margin-bottom: 0.75rem;">
                <strong style="color:var(--primary);">Calvert Shoulder Fellowship (London)</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">Trained under world-renowned shoulder surgeon Dr. Andrew Wallace, mastering complex instability and rotator cuff repair.</p>
              </div>
              <div class="card" style="padding: 1rem; background: var(--bg-main);">
                <strong style="color:var(--secondary);">Specialist Knee Fellowship (UK)</strong>
                <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">Advanced knee arthroscopy, multi-ligament reconstruction, and cartilage repair under Dr. Andy Williams.</p>
              </div>
            </div>

            <div id="tab-sports" class="about-content" style="display:none;">
              <p style="color: var(--text-muted); margin-bottom: 1rem;">
                Health and fitness play a vital role in Dr. Nithin’s leisure time. He is a <strong>former national Lawn tennis player</strong>, granting him an intimate and rare understanding of the biomechanics, competitive pressures, and mental toughness needed during sports rehabilitation.
              </p>
              <p style="color: var(--text-muted); font-size: 0.95rem;">
                Having stood on competitive courts himself, Dr. Nithin knows that an athlete’s career hinges on precise recovery timelines. His return-to-sport protocols integrate strength conditioning, neuromuscular training, and nutrition counseling.
              </p>
            </div>

            <div id="tab-academic" class="about-content" style="display:none;">
              <p style="color: var(--text-muted); margin-bottom: 1rem;">
                Because of his passion for teaching, Dr. Nithin is an accomplished speaker at national and international orthopedic conferences, an author of medical texts, and currently <strong>heads the fellowship programme to train junior surgeons in arthroscopy</strong>.
              </p>
              <p style="color: var(--text-muted); font-size: 0.95rem;">
                He also works extensively with multiple non-profit charities, providing pro-bono surgical services and assisting in the adoption of new medical technologies for underserved communities.
              </p>
            </div>
          </div>

          <!-- Doctor Qualifications Grid -->
          <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
            <div style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.75rem;">Verified Medical Credentials</div>
            <div class="flex gap-2" style="flex-wrap: wrap;">
              <span class="badge" style="background:var(--bg-main); border:1px solid var(--border-color); color:var(--text-main);">MRCS (UK)</span>
              <span class="badge" style="background:var(--bg-main); border:1px solid var(--border-color); color:var(--text-main);">FRCS (Tr & Ortho)</span>
              <span class="badge" style="background:var(--bg-main); border:1px solid var(--border-color); color:var(--text-main);">MCh Ortho</span>
              <span class="badge" style="background:var(--bg-main); border:1px solid var(--border-color); color:var(--text-main);">DSEM (IOC)</span>
              <span class="badge" style="background:var(--bg-main); border:1px solid var(--border-color); color:var(--text-main);">Calvert Shoulder Fellow</span>
              <span class="badge" style="background:var(--bg-main); border:1px solid var(--border-color); color:var(--text-main);">Knee Fellow (UK)</span>
            </div>
          </div>

        </div>

      </div>

      <!-- Mission, Vision & Core Values Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        
        <div class="card" style="border-top: 4px solid var(--primary);">
          <div style="font-size: 1.75rem; margin-bottom: 0.75rem;">🎯</div>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Our Mission</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            To deliver ethical, advanced, and compassionate orthopedic care, specializing in arthroscopy and sports injuries, restoring mobility, enhancing performance, and empowering patients to achieve healthier, active lives.
          </p>
        </div>

        <div class="card" style="border-top: 4px solid var(--secondary);">
          <div style="font-size: 1.75rem; margin-bottom: 0.75rem;">🔭</div>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Our Vision</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            To be a globally recognized leader in orthopedic excellence, pioneering innovation, education, and research while shaping future surgeons and transforming patient outcomes through world-class expertise.
          </p>
        </div>

        <div class="card" style="border-top: 4px solid #2563eb;">
          <div style="font-size: 1.75rem; margin-bottom: 0.75rem;">⚖️</div>
          <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Our Values</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            Ethics, integrity, compassion, continuous learning, patient-first recovery, and dedication to advancing orthopedic care for individuals, professional athletes, and the medical community.
          </p>
        </div>

      </div>

    </div>
  </section>

  <!-- ALL 26 CONDITIONS & PROCEDURES HUB (WITH INSTANT LIVE SEARCH & FILTERS) -->
  <section id="conditions" style="padding: 5rem 0; background: var(--bg-main);">
    <div class="container">
      
      <!-- Section Header -->
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 3rem;">
        <span class="badge badge-primary" style="margin-bottom: 0.75rem;">Comprehensive Clinical Portfolio</span>
        <h2 style="font-size: clamp(2rem, 4vw, 2.85rem); margin-bottom: 0.75rem;">
          Specialised Treatments & <span class="text-gradient">Orthopaedic Conditions</span>
        </h2>
        <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 700px;">
          Explore all 26 clinical procedures and joint injury treatments managed by Dr. Nithin Kumar Bejjanki. Use the instant filter pills or live search below.
        </p>
      </div>

      <!-- Controls: Category Filters & Search Input -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 1.5rem; padding: 1.25rem; margin-bottom: 2.5rem; box-shadow: var(--shadow-sm);">
        <div class="flex items-center justify-between" style="flex-wrap: wrap; gap: 1rem;">
          
          <!-- Category Filter Pills -->
          <div class="flex gap-2" style="flex-wrap: wrap;" id="conditionFilterPills">
            <button class="condition-filter-btn active" data-category="all" style="padding: 0.5rem 1rem; border-radius: 9999px; font-weight: 700; font-size: 0.85rem; border: 1px solid var(--primary); background: var(--primary); color: #fff; cursor: pointer;">
              All Conditions (26)
            </button>
            <button class="condition-filter-btn" data-category="Knee Specialities" style="padding: 0.5rem 1rem; border-radius: 9999px; font-weight: 600; font-size: 0.85rem; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-main); cursor: pointer;">
              Knee Specialities (8)
            </button>
            <button class="condition-filter-btn" data-category="Shoulder Specialities" style="padding: 0.5rem 1rem; border-radius: 9999px; font-weight: 600; font-size: 0.85rem; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-main); cursor: pointer;">
              Shoulder Specialities (8)
            </button>
            <button class="condition-filter-btn" data-category="Sports Medicine & Recovery" style="padding: 0.5rem 1rem; border-radius: 9999px; font-weight: 600; font-size: 0.85rem; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-main); cursor: pointer;">
              Sports Medicine (4)
            </button>
            <button class="condition-filter-btn" data-category="Robotic & Regenerative Biologics" style="padding: 0.5rem 1rem; border-radius: 9999px; font-weight: 600; font-size: 0.85rem; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-main); cursor: pointer;">
              Robotic & Biologics (3)
            </button>
            <button class="condition-filter-btn" data-category="Ankle & Elbow" style="padding: 0.5rem 1rem; border-radius: 9999px; font-weight: 600; font-size: 0.85rem; border: 1px solid var(--border-color); background: var(--bg-main); color: var(--text-main); cursor: pointer;">
              Ankle & Elbow (3)
            </button>
          </div>

          <!-- Instant Search Bar -->
          <div style="position: relative; min-width: 260px; flex-grow: 1; max-width: 360px;">
            <svg style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="conditionSearchInput" placeholder="Search procedure (e.g. ACL, Meniscus, Rotator Cuff)..." class="form-control" style="padding-left: 2.75rem; border-radius: 9999px;">
          </div>

        </div>
      </div>

      <!-- Active Count Indicator -->
      <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; font-size: 0.9rem; color: var(--text-muted);">
        <span>Showing <strong id="conditionVisibleCount" style="color:var(--text-main);">26</strong> of 26 procedures</span>
        <span style="font-size: 0.8rem;">Click any card to read full symptoms, treatment options & recovery guide</span>
      </div>

      <!-- 26 Conditions Grid -->
      <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;" id="conditionsGrid">
        <!-- Rendered by JS from db.conditions -->
      </div>

    </div>
  </section>

  <!-- FEATURED DEEP-DIVE: KNEE & SHOULDER ARTHROSCOPY EXCELLENCE -->
  <section id="knee-shoulder" style="padding: 5rem 0; background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
    <div class="container">
      
      <div style="text-align: center; max-width: 720px; margin: 0 auto 3.5rem;">
        <span class="badge badge-teal" style="margin-bottom: 0.75rem;">Center of Excellence</span>
        <h2 style="font-size: clamp(2rem, 4vw, 2.85rem); margin-bottom: 0.75rem;">
          Minimally Invasive <span class="text-gradient">Keyhole Arthroscopy</span>
        </h2>
        <p style="color: var(--text-muted); font-size: 1.05rem;">
          How Dr. Nithin's advanced keyhole surgery techniques repair complex joint damage with minimal tissue disruption, faster pain relief, and rapid return to sports.
        </p>
      </div>

      <!-- Two-Column Showcase -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2.5rem; margin-bottom: 4rem;">
        
        <!-- Knee Arthroscopy Card -->
        <div class="card" style="padding: 2rem;">
          <div style="position: relative; border-radius: 1rem; overflow: hidden; height: 220px; margin-bottom: 1.5rem;">
            <img src="assets/images/17617-68b7aaceedb11.webp" alt="Knee Arthroscopy" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://drnithin.com/wp-content/uploads/2025/09/17617-68b7aaceedb11.webp'">
            <div style="position: absolute; top: 1rem; left: 1rem;">
              <span class="badge" style="background:#0284c7; color:#fff;">Knee Arthroscopy</span>
            </div>
          </div>
          <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">ACL & Meniscus Joint Preservation</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">
            Utilizing sub-centimeter incisions and 4K optical visualization, Dr. Nithin accurately reconstructs torn cruciate ligaments (ACL/PCL) and repairs meniscal cartilage tears with anatomical fidelity.
          </p>

          <!-- 4 Steps Flow -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="flex items-center gap-3">
              <span style="background:var(--primary-light); color:var(--primary-dark); font-weight:800; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">1</span>
              <span style="font-size:0.9rem;"><strong>Diagnostic Scoping:</strong> Direct intra-articular visual probe under 4K camera</span>
            </div>
            <div class="flex items-center gap-3">
              <span style="background:var(--primary-light); color:var(--primary-dark); font-weight:800; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">2</span>
              <span style="font-size:0.9rem;"><strong>Tear Repair / Reconstruction:</strong> Bio-absorbable anchors & hamstring/bone-patellar grafts</span>
            </div>
            <div class="flex items-center gap-3">
              <span style="background:var(--primary-light); color:var(--primary-dark); font-weight:800; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">3</span>
              <span style="font-size:0.9rem;"><strong>Cartilage Biologics:</strong> Optional microfracture / PRP injection for healing</span>
            </div>
            <div class="flex items-center gap-3">
              <span style="background:var(--primary-light); color:var(--primary-dark); font-weight:800; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">4</span>
              <span style="font-size:0.9rem;"><strong>Rapid Mobilization:</strong> Same-day or next-day weight-bearing protocol</span>
            </div>
          </div>

          <button onclick="openConditionModalById('knee-arthroscopy')" class="btn btn-outline" style="width: 100%;">
            Explore Knee Arthroscopy Details →
          </button>
        </div>

        <!-- Shoulder Arthroscopy Card -->
        <div class="card" style="padding: 2rem;">
          <div style="position: relative; border-radius: 1rem; overflow: hidden; height: 220px; margin-bottom: 1.5rem;">
            <img src="assets/images/59166653_arthroscopy_shoulder_18-1-e1758697141798.jpg" alt="Shoulder Arthroscopy" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://drnithin.com/wp-content/uploads/2025/09/59166653_arthroscopy_shoulder_18-1-e1758697141798.jpg'">
            <div style="position: absolute; top: 1rem; left: 1rem;">
              <span class="badge" style="background:#0d9488; color:#fff;">Shoulder Arthroscopy</span>
            </div>
          </div>
          <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">Rotator Cuff & Bankart Repair</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">
            Trained in London under Dr. Andrew Wallace (the Calvert Fellowship), Dr. Nithin provides unmatched expertise in resolving recurrent shoulder dislocations, rotator cuff tears, and frozen shoulder.
          </p>

          <!-- Recovery Timeline Roadmap -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="flex items-center gap-3">
              <span style="background:#ccfbf1; color:#0f766e; font-weight:800; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">W1</span>
              <span style="font-size:0.9rem;"><strong>Weeks 1–2:</strong> Sling immobilization, gentle passive wrist/elbow motion</span>
            </div>
            <div class="flex items-center gap-3">
              <span style="background:#ccfbf1; color:#0f766e; font-weight:800; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">W4</span>
              <span style="font-size:0.9rem;"><strong>Weeks 4–6:</strong> Guided pendulum exercises and passive assisted elevation</span>
            </div>
            <div class="flex items-center gap-3">
              <span style="background:#ccfbf1; color:#0f766e; font-weight:800; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">M3</span>
              <span style="font-size:0.9rem;"><strong>Month 3:</strong> Active strengthening, resistance bands, and full daily mobility</span>
            </div>
            <div class="flex items-center gap-3">
              <span style="background:#ccfbf1; color:#0f766e; font-weight:800; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">M6</span>
              <span style="font-size:0.9rem;"><strong>Months 4–6:</strong> Full clearance for overhead throwing, swimming & tennis</span>
            </div>
          </div>

          <button onclick="openConditionModalById('shoulder-arthroscopy')" class="btn btn-outline" style="width: 100%;">
            Explore Shoulder Arthroscopy Details →
          </button>
        </div>

      </div>

    </div>
  </section>

  <!-- PATIENT TESTIMONIALS & GOOGLE VERIFIED REVIEWS -->
  <section id="reviews" style="padding: 5rem 0; background: var(--bg-main);">
    <div class="container">
      
      <!-- Review Header & Trustindex Badge -->
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 3.5rem;">
        <div class="flex items-center gap-2" style="background: var(--bg-card); padding: 0.5rem 1.25rem; border-radius: 9999px; border: 1px solid var(--border-color); margin-bottom: 1rem; box-shadow: var(--shadow-sm);">
          <img src="assets/images/logo.svg" alt="Google" style="height: 18px;" onerror="this.src='https://cdn.trustindex.io/assets/platform/Google/logo.svg'">
          <span style="font-weight: 700; font-size: 0.9rem;">Trustindex Google Verified</span>
          <span style="color:#f59e0b; font-size: 0.95rem;">★★★★★</span>
          <span style="font-weight: 800; color:var(--text-main);">4.9 / 5.0</span>
        </div>
        <h2 style="font-size: clamp(2rem, 4vw, 2.85rem); margin-bottom: 0.75rem;">What Our Patients Say</h2>
        <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 650px;">
          Authentic feedback from patients who underwent knee arthroscopy, ACL reconstruction, shoulder surgery, and sports rehabilitation under Dr. Nithin Kumar Bejjanki.
        </p>
      </div>

      <!-- Testimonial Cards Grid -->
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;" id="reviewsGrid">
        <!-- Rendered by JS from db.reviews -->
      </div>

      <!-- Trust Assurance Box -->
      <div class="card" style="padding: 1.5rem 2rem; background: var(--bg-card); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div class="flex items-center gap-3">
          <div style="background: #22c55e; color: #fff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">✓</div>
          <div>
            <div style="font-weight: 800; font-size: 1rem;">100% Genuine Verified Patient Experiences</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Aggregated directly from Google Reviews via Trustindex Verification System</div>
          </div>
        </div>
        <a href="https://maps.app.goo.gl/2T7CGuXVtRkPyk8g7" target="_blank" class="btn btn-outline" style="font-size: 0.875rem;">
          View All 1,151+ Google Reviews ↗
        </a>
      </div>

    </div>
  </section>

  <!-- CLINICAL BLOGS & PATIENT GUIDES -->
  <section id="blogs" style="padding: 5rem 0; background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
    <div class="container">
      
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 3.5rem;">
        <span class="badge badge-primary" style="margin-bottom: 0.75rem;">Patient Education & Research</span>
        <h2 style="font-size: clamp(2rem, 4vw, 2.85rem); margin-bottom: 0.75rem;">Clinical Articles & Guides</h2>
        <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 680px;">
          Evidence-based orthopaedic knowledge authored by Dr. Nithin Kumar Bejjanki to help you understand your symptoms, recovery timelines, and procedural options.
        </p>
      </div>

      <!-- Blog Cards Grid -->
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;" id="blogsGrid">
        <!-- Rendered by JS from db.blogs -->
      </div>

    </div>
  </section>

  <!-- SURGICAL GALLERY & CLINICAL MOMENTS -->
  <section id="gallery" style="padding: 5rem 0; background: var(--bg-main);">
    <div class="container">
      
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 3rem;">
        <span class="badge badge-teal" style="margin-bottom: 0.75rem;">Visual Documentation</span>
        <h2 style="font-size: clamp(2rem, 4vw, 2.85rem); margin-bottom: 0.75rem;">Clinical Gallery & Facilities</h2>
        <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 650px;">
          Glimpses into Dr. Nithin's international surgical training, fellowship conferences, modern operating theatres, and outpatient consultation suite at Yashoda Hospitals.
        </p>
      </div>

      <!-- Gallery Grid -->
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 4rem;" id="galleryGrid">
        <!-- Rendered by JS from db.gallery -->
      </div>

      <!-- Video Guides Library Section -->
      <div style="margin-top: 2rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h3 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Educational Video Center</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Understand surgical procedures and recovery exercises through concise video walkthroughs.</p>
        </div>

        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;" id="videosGrid">
          <!-- Rendered by JS from db.videos -->
        </div>
      </div>

    </div>
  </section>

  <!-- COMPREHENSIVE APPOINTMENT BOOKING WIZARD -->
  <section id="book-appointment" style="padding: 5rem 0; background: linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(13, 148, 136, 0.05) 100%); border-top: 1px solid var(--border-color);">
    <div class="container">
      
      <div style="max-width: 860px; margin: 0 auto;">
        
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <span class="badge badge-primary" style="margin-bottom: 0.75rem;">Fast-Track Consultation</span>
          <h2 style="font-size: clamp(2rem, 4vw, 2.85rem); margin-bottom: 0.5rem;">Book Your Appointment</h2>
          <p style="color: var(--text-muted); font-size: 1rem;">
            Schedule an in-person consultation or second surgical opinion with Dr. Nithin Kumar Bejjanki at Yashoda Hospitals, Secunderabad.
          </p>
        </div>

        <div class="card" style="padding: 2.5rem; box-shadow: var(--shadow-xl);">
          
          <!-- Booking Progress Bar -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; position: relative;">
            <div style="position: absolute; top: 15px; left: 10%; right: 10%; height: 2px; background: var(--border-color); z-index: 0;"></div>
            
            <div class="booking-step active" data-step="1" style="position: relative; z-index: 1; text-align: center;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary); color: #fff; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.25rem; font-size: 0.85rem;">1</div>
              <span style="font-size: 0.75rem; font-weight: 700;">Condition</span>
            </div>

            <div class="booking-step" data-step="2" style="position: relative; z-index: 1; text-align: center;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--border-color); color: var(--text-muted); font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.25rem; font-size: 0.85rem;">2</div>
              <span style="font-size: 0.75rem; font-weight: 700;">Date & Time</span>
            </div>

            <div class="booking-step" data-step="3" style="position: relative; z-index: 1; text-align: center;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--border-color); color: var(--text-muted); font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.25rem; font-size: 0.85rem;">3</div>
              <span style="font-size: 0.75rem; font-weight: 700;">Your Info</span>
            </div>

            <div class="booking-step" data-step="4" style="position: relative; z-index: 1; text-align: center;">
              <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--border-color); color: var(--text-muted); font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.25rem; font-size: 0.85rem;">4</div>
              <span style="font-size: 0.75rem; font-weight: 700;">Confirm</span>
            </div>
          </div>

          <!-- Wizard Form Container -->
          <form id="appointmentWizardForm" onsubmit="event.preventDefault(); handleBookingSubmit();">
            
            <!-- Step 1: Condition Selection -->
            <div class="wizard-panel active" id="wizardStep1">
              <h4 style="font-size: 1.15rem; margin-bottom: 1rem;">Select Condition or Concern</h4>
              
              <div style="margin-bottom: 1.5rem;">
                <label style="font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Clinical Category</label>
                <select id="bookingCategory" class="form-control" onchange="updateBookingConditionsList()">
                  <option value="All">All Specialities</option>
                  <option value="Knee Specialities">Knee Specialities & ACL</option>
                  <option value="Shoulder Specialities">Shoulder Specialities & Rotator Cuff</option>
                  <option value="Sports Medicine & Recovery">Sports Injuries & Athlete Care</option>
                  <option value="Robotic & Regenerative Biologics">Robotic Surgeries & Biologics</option>
                  <option value="Ankle & Elbow">Ankle & Elbow Injuries</option>
                </select>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <label style="font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Specific Procedure / Condition</label>
                <select id="bookingConditionSelect" class="form-control" required>
                  <!-- Populated by JS -->
                </select>
              </div>

              <div style="margin-bottom: 2rem;">
                <label style="font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Consultation Type</label>
                <div class="flex gap-4" style="flex-wrap: wrap;">
                  <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                    <input type="radio" name="consultType" value="In-Person at Yashoda Hospitals" checked> In-Person (Yashoda Hospitals Secunderabad)
                  </label>
                  <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                    <input type="radio" name="consultType" value="Second Surgical Opinion"> Second Surgical Opinion
                  </label>
                </div>
              </div>

              <div class="flex justify-between">
                <div></div>
                <button type="button" onclick="goToWizardStep(2)" class="btn btn-primary">
                  Next: Select Slot →
                </button>
              </div>
            </div>

            <!-- Step 2: Date & Slot -->
            <div class="wizard-panel" id="wizardStep2" style="display: none;">
              <h4 style="font-size: 1.15rem; margin-bottom: 1rem;">Select Preferred Date & Slot</h4>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
                <div>
                  <label style="font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Consultation Date</label>
                  <input type="date" id="bookingDate" class="form-control" required>
                </div>
                <div>
                  <label style="font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Preferred Time Window</label>
                  <select id="bookingSlot" class="form-control" required>
                    <option value="Morning (10:00 AM - 01:00 PM)">Morning (10:00 AM - 01:00 PM)</option>
                    <option value="Afternoon (02:00 PM - 04:30 PM)">Afternoon (02:00 PM - 04:30 PM)</option>
                    <option value="Evening (05:00 PM - 07:30 PM)">Evening (05:00 PM - 07:30 PM)</option>
                  </select>
                </div>
              </div>

              <div class="card" style="padding: 1rem; background: var(--bg-main); margin-bottom: 2rem;">
                <div style="font-size: 0.85rem; color: var(--text-muted);">
                  <strong>Note:</strong> OPD timings at Yashoda Hospitals are typically Monday through Saturday from 10:00 AM onwards. Exact token number is confirmed via WhatsApp or Phone call.
                </div>
              </div>

              <div class="flex justify-between">
                <button type="button" onclick="goToWizardStep(1)" class="btn btn-outline">← Back</button>
                <button type="button" onclick="goToWizardStep(3)" class="btn btn-primary">Next: Patient Details →</button>
              </div>
            </div>

            <!-- Step 3: Patient Information -->
            <div class="wizard-panel" id="wizardStep3" style="display: none;">
              <h4 style="font-size: 1.15rem; margin-bottom: 1rem;">Patient Contact Details</h4>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                <div>
                  <label style="font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Patient Full Name *</label>
                  <input type="text" id="patientName" placeholder="e.g. Ramesh Reddy" class="form-control" required>
                </div>
                <div>
                  <label style="font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Phone Number *</label>
                  <input type="tel" id="patientPhone" placeholder="+91 98765 43210" class="form-control" required>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                <div>
                  <label style="font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Email Address</label>
                  <input type="email" id="patientEmail" placeholder="name@example.com" class="form-control">
                </div>
                <div>
                  <label style="font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Patient Age & Gender</label>
                  <input type="text" id="patientAgeGender" placeholder="e.g. 34 / Male" class="form-control">
                </div>
              </div>

              <div style="margin-bottom: 2rem;">
                <label style="font-size: 0.9rem; font-weight: 600; display: block; margin-bottom: 0.5rem;">Brief Symptoms / Prior Scans (Optional)</label>
                <textarea id="patientNotes" rows="3" placeholder="Describe pain, previous injuries, MRI findings if any..." class="form-control"></textarea>
              </div>

              <div class="flex justify-between">
                <button type="button" onclick="goToWizardStep(2)" class="btn btn-outline">← Back</button>
                <button type="button" onclick="goToWizardStep(4)" class="btn btn-primary">Review & Confirm →</button>
              </div>
            </div>

            <!-- Step 4: Review & Direct Confirmation -->
            <div class="wizard-panel" id="wizardStep4" style="display: none;">
              <h4 style="font-size: 1.15rem; margin-bottom: 1rem;">Review Appointment Summary</h4>

              <div class="card" style="padding: 1.5rem; background: var(--bg-main); margin-bottom: 1.5rem;" id="bookingReviewSummary">
                <!-- Summary generated by JS -->
              </div>

              <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
                <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.85rem; font-size: 1.05rem;">
                  ✓ Confirm & Generate Appointment Token
                </button>
                <button type="button" id="confirmWhatsAppBtn" onclick="sendBookingViaWhatsApp()" class="btn btn-whatsapp" style="width: 100%; padding: 0.85rem; font-size: 1.05rem;">
                  Send Direct WhatsApp to Doctor's Desk (+91-7207171115)
                </button>
              </div>

              <div class="flex justify-between">
                <button type="button" onclick="goToWizardStep(3)" class="btn btn-outline">← Edit Information</button>
              </div>
            </div>

          </form>

          <!-- Success Screen (Hidden by default) -->
          <div id="bookingSuccessBox" style="display:none; text-align: center; padding: 2rem 1rem;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #dcfce7; color: #16a34a; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">✓</div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Appointment Request Sent!</h3>
            <p style="color: var(--text-muted); margin-bottom: 1rem;">
              Your reference code is <strong id="bookingRefCode" style="color: var(--primary);">DN-8492</strong>.<br>
              Dr. Nithin's coordinator will call or WhatsApp you shortly to confirm your consultation slot at Yashoda Hospitals Secunderabad.
            </p>
            <div class="flex justify-center gap-4">
              <a href="tel:+917207171115" class="btn btn-primary">Call Hospital Desk</a>
              <button onclick="resetWizard()" class="btn btn-outline">Book Another Slot</button>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>

  <!-- CASHLESS INSURANCE & HOSPITAL LOCATION -->
  <section id="contact" style="padding: 5rem 0; background: var(--bg-card); border-top: 1px solid var(--border-color);">
    <div class="container">
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem;">
        
        <!-- Contact & Timing Info -->
        <div>
          <span class="badge badge-teal" style="margin-bottom: 0.75rem;">Hospital & OPD Location</span>
          <h2 style="font-size: 2rem; margin-bottom: 1rem;">Visit Dr. Nithin Kumar Bejjanki</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">
            Providing ethical, transparent, and internationally accredited orthopedic care at Yashoda Hospitals, Secunderabad.
          </p>

          <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">
            
            <div class="flex gap-4">
              <div style="width: 44px; height: 44px; border-radius: 0.75rem; background: var(--primary-light); color: var(--primary-dark); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">📍</div>
              <div>
                <strong style="display:block; font-size: 1rem; margin-bottom: 0.25rem;">Hospital Address</strong>
                <p style="color: var(--text-muted); font-size: 0.95rem;">
                  Yashoda Hospitals, Alexander Rd, Kummari Guda, Shivaji Nagar, Secunderabad, Telangana 500003
                </p>
                <a href="https://maps.app.goo.gl/2T7CGuXVtRkPyk8g7" target="_blank" style="color: var(--primary); text-decoration: none; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem; margin-top: 0.25rem;">
                  Open in Google Maps ↗
                </a>
              </div>
            </div>

            <div class="flex gap-4">
              <div style="width: 44px; height: 44px; border-radius: 0.75rem; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">📞</div>
              <div>
                <strong style="display:block; font-size: 1rem; margin-bottom: 0.25rem;">Direct Telephone & Helpline</strong>
                <a href="tel:+917207171115" style="color: var(--text-main); font-size: 1.1rem; font-weight: 700; text-decoration: none;">
                  +91-7207171115
                </a>
                <span style="display:block; font-size: 0.8rem; color: var(--text-muted);">Available for appointment scheduling & surgery enquiries</span>
              </div>
            </div>

            <div class="flex gap-4">
              <div style="width: 44px; height: 44px; border-radius: 0.75rem; background: #e0e7ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">✉️</div>
              <div>
                <strong style="display:block; font-size: 1rem; margin-bottom: 0.25rem;">Email Communication</strong>
                <a href="mailto:nithindoc@gmail.com" style="color: var(--text-muted); font-size: 0.95rem; text-decoration: none;">
                  nithindoc@gmail.com
                </a>
              </div>
            </div>

            <div class="flex gap-4">
              <div style="width: 44px; height: 44px; border-radius: 0.75rem; background: #fef3c7; color: #b45309; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">🛡️</div>
              <div>
                <strong style="display:block; font-size: 1rem; margin-bottom: 0.25rem;">Cashless Insurance Assistance</strong>
                <p style="color: var(--text-muted); font-size: 0.9rem;">
                  All major private health insurances and corporate TPAs accepted at Yashoda Hospitals Secunderabad. Dedicated insurance pre-authorization desk.
                </p>
              </div>
            </div>

          </div>

          <div class="flex gap-3">
            <a href="tel:+917207171115" class="btn btn-primary" style="flex:1;">Call Hospital Desk</a>
            <a href="https://wa.me/917207171115" target="_blank" class="btn btn-whatsapp" style="flex:1;">WhatsApp Inquiry</a>
          </div>
        </div>

        <!-- Interactive Google Map Frame -->
        <div style="border-radius: 1.5rem; overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-lg); height: 480px; position: relative;">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6669925206583!2d78.49827011487693!3d17.44140028804671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a244439162d%3A0xe6bf44b7f08c35b0!2sYashoda%20Hospitals%20-%20Secunderabad!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

      </div>

    </div>
  </section>

  <!-- FOOTER -->
  <footer style="background: #091528; color: #94a3b8; padding: 4rem 0 2rem; border-top: 1px solid rgba(255,255,255,0.08);">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2.5rem; margin-bottom: 3rem;">
        
        <!-- Col 1: Doctor Info -->
        <div style="grid-column: span 1.5;">
          <h3 style="color:#ffffff; font-size:1.25rem; margin-bottom: 0.75rem;">Dr. Nithin Kumar Bejjanki</h3>
          <p style="font-size:0.85rem; color:#64748b; margin-bottom:1rem; line-height:1.6;">
            MRCS (UK), FRCS (Tr & Ortho), MCh Ortho, DSEM (International Olympic Committee). Internationally trained consultant orthopaedic surgeon specializing in arthroscopy, sports injuries, knee and shoulder reconstructive surgeries, and cartilage regeneration.
          </p>
          <div style="font-size:0.85rem; color:#cbd5e1;">
            📍 Yashoda Hospitals, Secunderabad, Telangana 500003<br>
            📞 +91-7207171115 • ✉️ nithindoc@gmail.com
          </div>
        </div>

        <!-- Col 2: Key Specialties -->
        <div>
          <h4 style="color:#ffffff; font-size:1rem; margin-bottom: 1rem;">Key Specialities</h4>
          <ul style="list-style:none; font-size:0.85rem; display:flex; flex-direction:column; gap:0.5rem;">
            <li><a href="#conditions" style="color:#94a3b8; text-decoration:none;">Knee Arthroscopy</a></li>
            <li><a href="#conditions" style="color:#94a3b8; text-decoration:none;">ACL Repair & Reconstruction</a></li>
            <li><a href="#conditions" style="color:#94a3b8; text-decoration:none;">Meniscus Preservation</a></li>
            <li><a href="#conditions" style="color:#94a3b8; text-decoration:none;">Shoulder Arthroscopy</a></li>
            <li><a href="#conditions" style="color:#94a3b8; text-decoration:none;">Rotator Cuff Repair</a></li>
            <li><a href="#conditions" style="color:#94a3b8; text-decoration:none;">Cartilage Regeneration</a></li>
            <li><a href="#conditions" style="color:#94a3b8; text-decoration:none;">Robotic Orthopedic Surgery</a></li>
          </ul>
        </div>

        <!-- Col 3: Quick Navigation -->
        <div>
          <h4 style="color:#ffffff; font-size:1rem; margin-bottom: 1rem;">Navigation</h4>
          <ul style="list-style:none; font-size:0.85rem; display:flex; flex-direction:column; gap:0.5rem;">
            <li><a href="#home" style="color:#94a3b8; text-decoration:none;">Home</a></li>
            <li><a href="#about" style="color:#94a3b8; text-decoration:none;">About Dr. Nithin</a></li>
            <li><a href="#conditions" style="color:#94a3b8; text-decoration:none;">All 26 Conditions</a></li>
            <li><a href="#triage" style="color:#94a3b8; text-decoration:none;">Joint Symptom Checker</a></li>
            <li><a href="#reviews" style="color:#94a3b8; text-decoration:none;">Patient Reviews (1150+)</a></li>
            <li><a href="#blogs" style="color:#94a3b8; text-decoration:none;">Clinical Guides & Blogs</a></li>
            <li><a href="#gallery" style="color:#94a3b8; text-decoration:none;">Surgical Gallery</a></li>
            <li><a href="#book-appointment" style="color:#94a3b8; text-decoration:none;">Book Appointment</a></li>
          </ul>
        </div>

        <!-- Col 4: Trust & Emergency -->
        <div>
          <h4 style="color:#ffffff; font-size:1rem; margin-bottom: 1rem;">Emergency & Helpline</h4>
          <p style="font-size:0.85rem; color:#64748b; margin-bottom:1rem;">
            For urgent orthopaedic trauma, acute dislocations, or post-surgical questions, reach our hospital coordinator directly:
          </p>
          <a href="tel:+917207171115" class="btn btn-primary" style="width:100%; font-size:0.85rem; margin-bottom:0.75rem;">
            Call Helpline: +91 7207171115
          </a>
          <a href="https://wa.me/917207171115" target="_blank" class="btn btn-whatsapp" style="width:100%; font-size:0.85rem;">
            WhatsApp Coordinator
          </a>
        </div>

      </div>

      <!-- Bottom Disclaimer -->
      <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; color: #64748b;">
        <div>
          © 2026 Dr. Nithin Kumar Bejjanki. All Rights Reserved. • Orthopaedic Surgeon in Secunderabad & Hyderabad.
        </div>
        <div>
          <span>Medical Information Disclaimer: Content provided is for educational purposes and does not replace in-person clinical diagnosis.</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- FLOATING ACTION BUTTONS (WHATSAPP & APPOINTMENT) -->
  <div style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 40; display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-end;">
    <!-- Scroll To Top Button -->
    <button id="scrollTopBtn" onclick="window.scrollTo({top:0, behavior:'smooth'})" aria-label="Back to Top" style="display:none; width:44px; height:44px; border-radius:50%; background:var(--bg-card); color:var(--text-main); border:1px solid var(--border-color); box-shadow:var(--shadow-md); cursor:pointer; align-items:center; justify-content:center;">
      ↑
    </button>

    <!-- Quick Floating WhatsApp -->
    <a href="https://wa.me/917207171115?text=Hello%20Dr.%20Nithin,%20I%20would%20like%20to%20consult%20regarding%20an%20orthopedic%20issue" target="_blank" aria-label="Chat on WhatsApp" style="width:52px; height:52px; border-radius:50%; background:#25D366; color:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 20px rgba(37, 211, 102, 0.4); text-decoration:none; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
    </a>
  </div>

  <!-- CONDITION DETAIL MODAL (FULL CLINICAL DEEP DIVE) -->
  <div id="conditionModal" class="modal-backdrop" onclick="if(event.target === this) closeConditionModal()">
    <div class="modal-dialog">
      <!-- Modal Header -->
      <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; background: var(--bg-card);">
        <div>
          <span id="modalConditionCategory" class="badge badge-primary" style="margin-bottom: 0.25rem;">Category</span>
          <h3 id="modalConditionTitle" style="font-size: 1.35rem; line-height: 1.2;">Condition Title</h3>
        </div>
        <button onclick="closeConditionModal()" style="background:none; border:none; font-size:1.5rem; color:var(--text-muted); cursor:pointer; padding:0.25rem 0.5rem;">✕</button>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div style="overflow-y: auto; padding: 1.5rem; flex-grow: 1;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem; align-items: center;">
          <div style="border-radius: 1rem; overflow: hidden; height: 200px; background: #0f172a;">
            <img id="modalConditionImg" src="" alt="Condition" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <div>
            <h4 style="font-size: 1rem; color: var(--primary); margin-bottom: 0.5rem;">Clinical Overview</h4>
            <p id="modalConditionOverview" style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;"></p>
          </div>
        </div>

        <!-- Tabbed Information in Modal -->
        <div class="flex gap-2" style="border-bottom: 1px solid var(--border-color); margin-bottom: 1rem;">
          <button class="modal-tab-btn active" data-tab="modal-symptoms" style="background:none; border:none; padding:0.5rem 0.75rem; font-weight:700; color:var(--primary); border-bottom:2px solid var(--primary); cursor:pointer; font-size:0.9rem;">Symptoms & Causes</button>
          <button class="modal-tab-btn" data-tab="modal-treatments" style="background:none; border:none; padding:0.5rem 0.75rem; font-weight:600; color:var(--text-muted); cursor:pointer; font-size:0.9rem;">Treatment Options</button>
          <button class="modal-tab-btn" data-tab="modal-procedure" style="background:none; border:none; padding:0.5rem 0.75rem; font-weight:600; color:var(--text-muted); cursor:pointer; font-size:0.9rem;">Procedure Steps</button>
          <button class="modal-tab-btn" data-tab="modal-faqs" style="background:none; border:none; padding:0.5rem 0.75rem; font-weight:600; color:var(--text-muted); cursor:pointer; font-size:0.9rem;">FAQs & Recovery</button>
        </div>

        <div id="modalTabPanels">
          <div id="modal-symptoms" class="modal-tab-panel">
            <ul id="modalConditionSymptoms" style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem;"></ul>
          </div>
          <div id="modal-treatments" class="modal-tab-panel" style="display:none;">
            <ul id="modalConditionTreatments" style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem;"></ul>
          </div>
          <div id="modal-procedure" class="modal-tab-panel" style="display:none;">
            <ul id="modalConditionProcedure" style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem;"></ul>
          </div>
          <div id="modal-faqs" class="modal-tab-panel" style="display:none;">
            <div id="modalConditionFaqs" style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.95rem;"></div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div style="padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-size: 0.85rem; color: var(--text-muted);">Consultation with Dr. Nithin Kumar Bejjanki</span>
        <button id="modalBookThisBtn" class="btn btn-primary" style="padding: 0.6rem 1.25rem; font-size: 0.9rem;">
          Book Consultation for this Condition
        </button>
      </div>
    </div>
  </div>

  <!-- BLOG ARTICLE READER MODAL -->
  <div id="blogModal" class="modal-backdrop" onclick="if(event.target === this) closeBlogModal()">
    <div class="modal-dialog" style="max-width: 820px;">
      <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; background: var(--bg-card);">
        <div>
          <span id="modalBlogCategory" class="badge badge-primary" style="margin-bottom: 0.25rem;">Guide</span>
          <h3 id="modalBlogTitle" style="font-size: 1.25rem; line-height: 1.25;">Blog Title</h3>
        </div>
        <button onclick="closeBlogModal()" style="background:none; border:none; font-size:1.5rem; color:var(--text-muted); cursor:pointer;">✕</button>
      </div>
      <div style="overflow-y: auto; padding: 2rem 1.5rem; flex-grow: 1;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--text-muted);">
          <span>By Dr. Nithin Kumar Bejjanki</span>
          <span>•</span>
          <span id="modalBlogDate">Date</span>
          <span>•</span>
          <span id="modalBlogReadTime">5 min read</span>
        </div>
        <div style="border-radius: 1rem; overflow: hidden; height: 260px; margin-bottom: 1.5rem;">
          <img id="modalBlogImg" src="" alt="Blog cover" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div id="modalBlogContent" style="color: var(--text-main); font-size: 1rem; line-height: 1.8;">
          <!-- Injected by JS -->
        </div>
      </div>
      <div style="padding: 1rem 1.5rem; border-top: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; background: var(--bg-card);">
        <span style="font-size: 0.85rem; color: var(--text-muted);">Yashoda Hospitals Orthopaedics</span>
        <a href="#book-appointment" onclick="closeBlogModal()" class="btn btn-primary" style="font-size:0.85rem;">
          Consult Dr. Nithin
        </a>
      </div>
    </div>
  </div>

  <!-- GALLERY LIGHTBOX MODAL -->
  <div id="lightboxModal" class="modal-backdrop" onclick="if(event.target === this) closeLightbox()">
    <div style="position: relative; max-width: 900px; width: 90%; max-height: 90vh; display: flex; flex-direction: column; align-items: center;">
      <button onclick="closeLightbox()" style="position: absolute; top: -2.5rem; right: 0; background:none; border:none; font-size: 2rem; color: #fff; cursor: pointer;">✕</button>
      <img id="lightboxImg" src="" alt="Enlarged" style="max-width: 100%; max-height: 80vh; border-radius: 1rem; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
      <div id="lightboxCaption" style="color: #fff; text-align: center; margin-top: 1rem; font-size: 1rem; font-weight: 600;"></div>
    </div>
  </div>

  <!-- VIDEO PLAYER MODAL -->
  <div id="videoModal" class="modal-backdrop" onclick="if(event.target === this) closeVideoModal()">
    <div class="modal-dialog" style="max-width: 760px;">
      <div style="padding: 1rem 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
        <h3 id="videoModalTitle" style="font-size: 1.15rem;">Video Presentation</h3>
        <button onclick="closeVideoModal()" style="background:none; border:none; font-size:1.5rem; color:var(--text-muted); cursor:pointer;">✕</button>
      </div>
      <div style="padding: 1.5rem;">
        <div style="position: relative; border-radius: 1rem; overflow: hidden; background: #000; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;">
          <img id="videoModalThumb" src="" alt="Video thumbnail" style="width:100%; height:100%; object-fit:cover; opacity:0.6;">
          <div style="position: absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; text-align:center; padding: 1.5rem; background:rgba(0,0,0,0.4);">
            <div style="width:64px; height:64px; border-radius:50%; background:var(--primary); display:flex; align-items:center; justify-content:center; font-size:1.75rem; margin-bottom:1rem; box-shadow:0 0 25px rgba(2, 132, 199, 0.6);">▶</div>
            <h4 id="videoModalInnerTitle" style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Procedure Overview</h4>
            <p id="videoModalDesc" style="font-size: 0.9rem; max-width: 500px; color: #cbd5e1;"></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- EMBEDDED SITE DATA & LOGIC -->
  <script>
    // Embed parsed complete database
    const SITE_DB = ${JSON.stringify(db)};

    // Theme Management
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeSunIcon = document.getElementById('themeSunIcon');
    const themeMoonIcon = document.getElementById('themeMoonIcon');

    function initTheme() {
      const savedTheme = localStorage.getItem('drnithin_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        themeMoonIcon.style.display = 'none';
        themeSunIcon.style.display = 'block';
      } else {
        document.documentElement.classList.remove('dark');
        themeMoonIcon.style.display = 'block';
        themeSunIcon.style.display = 'none';
      }
    }
    initTheme();

    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('drnithin_theme', isDark ? 'dark' : 'light');
      themeMoonIcon.style.display = isDark ? 'none' : 'block';
      themeSunIcon.style.display = isDark ? 'block' : 'none';
    });

    // Mobile Navigation Drawer
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileDrawerContent = document.getElementById('mobileDrawerContent');
    const mobileMenuOpenBtn = document.getElementById('mobileMenuOpenBtn');
    const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');

    function openMobileDrawer() {
      mobileDrawer.style.opacity = '1';
      mobileDrawer.style.pointerEvents = 'auto';
      mobileDrawerContent.style.transform = 'translateX(0)';
    }
    function closeMobileDrawer() {
      mobileDrawer.style.opacity = '0';
      mobileDrawer.style.pointerEvents = 'none';
      mobileDrawerContent.style.transform = 'translateX(100%)';
    }

    mobileMenuOpenBtn.addEventListener('click', openMobileDrawer);
    mobileMenuCloseBtn.addEventListener('click', closeMobileDrawer);
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeMobileDrawer();
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });

    // Back to Top button observer
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    let animated = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;
            const timer = setInterval(() => {
              count += speed;
              if (count >= target) {
                counter.innerText = target;
                clearInterval(timer);
              } else {
                counter.innerText = Math.floor(count);
              }
            }, 30);
          });
        }
      });
    }, { threshold: 0.5 });
    if (counters.length > 0) counterObserver.observe(counters[0]);

    // About Section Tabs
    const aboutTabButtons = document.querySelectorAll('.about-tab-btn');
    const aboutTabContents = document.querySelectorAll('.about-content');
    aboutTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        aboutTabButtons.forEach(b => {
          b.classList.remove('active');
          b.style.color = 'var(--text-muted)';
          b.style.borderBottom = 'none';
        });
        btn.classList.add('active');
        btn.style.color = 'var(--primary)';
        btn.style.borderBottom = '2px solid var(--primary)';
        const targetTab = btn.getAttribute('data-tab');
        aboutTabContents.forEach(content => {
          content.style.display = content.id === 'tab-' + targetTab ? 'block' : 'none';
        });
      });
    });

    // RENDER ALL 26 CONDITIONS
    const conditionsGrid = document.getElementById('conditionsGrid');
    const conditionVisibleCount = document.getElementById('conditionVisibleCount');
    const conditionSearchInput = document.getElementById('conditionSearchInput');
    const conditionFilterPills = document.querySelectorAll('.condition-filter-btn');

    let currentCategory = 'all';
    let currentSearchTerm = '';

    function renderConditions() {
      const filtered = SITE_DB.conditions.filter(c => {
        const matchesCategory = currentCategory === 'all' || c.category === currentCategory;
        const searchNorm = currentSearchTerm.toLowerCase();
        const matchesSearch = !currentSearchTerm || 
                              c.title.toLowerCase().includes(searchNorm) || 
                              c.tagline.toLowerCase().includes(searchNorm) || 
                              c.overview.toLowerCase().includes(searchNorm);
        return matchesCategory && matchesSearch;
      });

      conditionVisibleCount.innerText = filtered.length;

      conditionsGrid.innerHTML = filtered.map(c => `
        <div class="card flex" style="flex-direction: column; justify-content: space-between;" data-id="${c.id}">
          <div>
            <div style="position: relative; border-radius: 0.75rem; overflow: hidden; height: 180px; margin-bottom: 1rem; background: #0f172a;">
              <img src="${c.localImage}" alt="${c.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='${c.image}'">
              <span class="badge" style="position: absolute; top: 0.75rem; left: 0.75rem; background: rgba(9, 21, 40, 0.85); color: #38bdf8; backdrop-filter: blur(4px);">
                ${c.category}
              </span>
            </div>
            <h3 style="font-size: 1.15rem; line-height: 1.3; margin-bottom: 0.5rem;">${c.title}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
              ${c.tagline || c.overview}
            </p>
          </div>
          <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: auto; display: flex; align-items: center; justify-content: space-between;">
            <button onclick="openConditionModalById('${c.id}')" style="background:none; border:none; color:var(--primary); font-weight:700; font-size:0.875rem; cursor:pointer; display:flex; align-items:center; gap:0.25rem;">
              View Treatment Details →
            </button>
            <button onclick="selectConditionForBooking('${c.title}')" title="Book Consultation for this" style="background:var(--primary-light); color:var(--primary-dark); border:none; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">
              +
            </button>
          </div>
        </div>
      `).join('');
    }

    // Filter Pill Clicks
    conditionFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        conditionFilterPills.forEach(p => {
          p.classList.remove('active');
          p.style.background = 'var(--bg-main)';
          p.style.color = 'var(--text-main)';
          p.style.border = '1px solid var(--border-color)';
        });
        pill.classList.add('active');
        pill.style.background = 'var(--primary)';
        pill.style.color = '#fff';
        pill.style.border = '1px solid var(--primary)';
        currentCategory = pill.getAttribute('data-category');
        renderConditions();
      });
    });

    conditionSearchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.trim();
      renderConditions();
    });

    renderConditions();

    // RENDER TESTIMONIALS
    const reviewsGrid = document.getElementById('reviewsGrid');
    reviewsGrid.innerHTML = SITE_DB.reviews.map(r => `
      <div class="card flex" style="flex-direction: column; justify-content: space-between;">
        <div>
          <div class="flex items-center justify-between" style="margin-bottom: 1rem;">
            <div class="flex items-center gap-3">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #0284c7, #0d9488); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem;">
                ${r.avatar}
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">${r.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${r.tag}</div>
              </div>
            </div>
            <img src="assets/images/icon.svg" alt="Google" style="width: 20px; height: 20px;" onerror="this.src='https://cdn.trustindex.io/assets/platform/Google/icon.svg'">
          </div>
          <div style="color: #f59e0b; margin-bottom: 0.75rem; font-size: 0.9rem;">★★★★★</div>
          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; font-style: italic;">
            "${r.text}"
          </p>
        </div>
        <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color); font-size: 0.75rem; color: var(--secondary); font-weight: 600;">
          ✓ Google Verified Patient
        </div>
      </div>
    `).join('');

    // RENDER BLOGS
    const blogsGrid = document.getElementById('blogsGrid');
    blogsGrid.innerHTML = SITE_DB.blogs.map((b, idx) => `
      <div class="card flex" style="flex-direction: column; justify-content: space-between;">
        <div>
          <div style="position: relative; border-radius: 0.75rem; overflow: hidden; height: 200px; margin-bottom: 1rem;">
            <img src="${b.image}" alt="${b.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://drnithin.com/wp-content/uploads/2025/10/17071096.jpg'">
            <span class="badge" style="position: absolute; bottom: 0.75rem; left: 0.75rem; background: rgba(9, 21, 40, 0.85); color: #fff;">
              ${b.category}
            </span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            ${b.date} • ${b.readTime}
          </div>
          <h3 style="font-size: 1.2rem; line-height: 1.3; margin-bottom: 0.75rem;">${b.title}</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
            ${b.excerpt}
          </p>
        </div>
        <button onclick="openBlogModal(${idx})" class="btn btn-outline" style="width: 100%; font-size: 0.875rem;">
          Read Complete Article →
        </button>
      </div>
    `).join('');

    // RENDER GALLERY
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = SITE_DB.gallery.map((g, idx) => `
      <div class="card" style="padding: 0.75rem; cursor: pointer;" onclick="openLightbox('${g.image}', '${g.title.replace(/'/g, "\\'")}')">
        <div style="position: relative; border-radius: 0.75rem; overflow: hidden; aspect-ratio: 4/3; margin-bottom: 0.75rem;">
          <img src="${g.image}" alt="${g.title}" style="width:100%; height:100%; object-fit:cover; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <span class="badge" style="position: absolute; top: 0.5rem; left: 0.5rem; background: rgba(0,0,0,0.7); color: #fff; font-size: 0.7rem;">
            ${g.category}
          </span>
        </div>
        <div style="font-weight: 700; font-size: 0.95rem;">${g.title}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${g.caption}</div>
      </div>
    `).join('');

    // RENDER VIDEOS
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = SITE_DB.videos.map((v) => `
      <div class="card" style="padding: 1rem; cursor: pointer;" onclick="openVideoModal('${v.id}')">
        <div style="position: relative; border-radius: 0.75rem; overflow: hidden; aspect-ratio: 16/9; margin-bottom: 0.75rem; background: #000;">
          <img src="${v.thumbnail}" alt="${v.title}" style="width:100%; height:100%; object-fit:cover; opacity: 0.75;">
          <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
              ▶
            </div>
          </div>
          <span style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.8); color: #fff; font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 4px;">
            ${v.duration}
          </span>
        </div>
        <div style="font-weight: 700; font-size: 0.95rem; line-height: 1.3; margin-bottom: 0.25rem;">${v.title}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${v.description}</div>
      </div>
    `).join('');

    // SYMPTOM CHECKER TRIAGE DATA & LOGIC
    const triageSymptomsData = {
      knee: [
        { label: 'Knee Locking or Inability to Straighten', condition: 'Meniscus Repair & Preservation' },
        { label: 'Instability / "Giving Way" When Pivoting', condition: 'ACL Repair & Reconstruction' },
        { label: 'Severe Inner Joint Line Aching', condition: 'Knee Arthroscopy' },
        { label: 'Sudden "Pop" Sound during Sports twist', condition: 'ACL Repair & Reconstruction' },
        { label: 'Deep Grinding under Kneecap', condition: 'Cartilage Regeneration Surgery' },
        { label: 'Previous Failed ACL Reconstruction', condition: 'Revision ACL Surgery' },
        { label: 'Kneecap Slipping Outward (Dislocation)', condition: 'Patella Dislocation Management' },
        { label: 'Bow-Leg Knee Deformity & Arthritis', condition: 'Tibial Osteotomy (Knee Realignment)' }
      ],
      shoulder: [
        { label: 'Pain Lifting Arm Overhead', condition: 'Rotator Cuff Repair' },
        { label: 'Recurrent Shoulder Dislocation / Slipping', condition: 'Shoulder Dislocation & Instability' },
        { label: 'Severe Night Pain & Loss of Motion (Stiffness)', condition: 'Frozen Shoulder Treatment' },
        { label: 'Severe Weakness / Inability to Raise Arm', condition: 'Reverse Shoulder Replacement' },
        { label: 'Deep Aching in Shoulder Socket with Clicking', condition: 'Shoulder Arthroscopy' },
        { label: 'Complex Fracture / Trauma after Fall', condition: 'Complex Shoulder Trauma Management' },
        { label: 'Severe Joint Arthritis (Bone-on-Bone)', condition: 'Total Shoulder Replacement' }
      ],
      sports: [
        { label: 'High-Impact Sports Ligament Tear', condition: 'Elite Sports Injury Management' },
        { label: 'Chronic Tendon Inflammation (Achilles/Patellar)', condition: 'Sports Injury Treatment' },
        { label: 'Platelet-Rich Plasma (PRP) / Biologics Need', condition: 'Regenerative Orthopedic Therapies' },
        { label: 'Sports Nutrition & Fatigue Recovery Plan', condition: 'Sports Nutrition & Recovery Guidance' },
        { label: 'Elite Athlete Performance Return Protocol', condition: 'Elite Athlete Treatment' }
      ],
      ankle: [
        { label: 'Recurrent Ankle Sprain / Chronic Ligament Laxity', condition: 'Ligament Tear Reconstruction (Ankle)' },
        { label: 'Ankle Impingement & Bone Spurs', condition: 'Arthroscopy for Ankle & Elbow' },
        { label: 'Tennis Elbow / Golfer\'s Elbow Resistant Pain', condition: 'Arthroscopy for Ankle & Elbow' },
        { label: 'Sports Ankle Trauma & Cartilage Defect', condition: 'Ankle Injury Treatments' }
      ]
    };

    let selectedTriageJoint = 'knee';

    function renderTriageSymptoms() {
      const options = triageSymptomsData[selectedTriageJoint] || [];
      const container = document.getElementById('triageSymptomOptions');
      container.innerHTML = options.map((opt, i) => `
        <label style="display:flex; align-items:flex-start; gap:0.5rem; padding:0.75rem; border:1px solid var(--border-color); border-radius:0.75rem; background:var(--bg-main); cursor:pointer; font-size:0.875rem;">
          <input type="checkbox" name="triageSymptom" value="${opt.condition}" ${i === 0 || i === 1 ? 'checked' : ''} onchange="updateTriageResult()">
          <span>${opt.label}</span>
        </label>
      `).join('');
      updateTriageResult();
    }

    document.querySelectorAll('#triageJointSelect .triage-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#triageJointSelect .triage-btn').forEach(b => {
          b.classList.remove('active');
          b.style.border = '1px solid var(--border-color)';
          b.style.background = 'var(--bg-card)';
          b.style.color = 'var(--text-main)';
        });
        btn.classList.add('active');
        btn.style.border = '2px solid var(--primary)';
        btn.style.background = 'var(--primary-light)';
        btn.style.color = 'var(--primary-dark)';
        selectedTriageJoint = btn.getAttribute('data-joint');
        renderTriageSymptoms();
      });
    });

    let currentTriageRecommendation = 'Knee Arthroscopy';

    function updateTriageResult() {
      const checked = Array.from(document.querySelectorAll('input[name="triageSymptom"]:checked')).map(cb => cb.value);
      if (checked.length > 0) {
        currentTriageRecommendation = checked[0];
      } else {
        currentTriageRecommendation = selectedTriageJoint === 'knee' ? 'Knee Arthroscopy' : (selectedTriageJoint === 'shoulder' ? 'Shoulder Arthroscopy' : 'Elite Sports Injury Management');
      }

      const match = SITE_DB.conditions.find(c => c.title === currentTriageRecommendation) || SITE_DB.conditions[0];
      document.getElementById('triageResultTitle').innerText = match.title;
      document.getElementById('triageResultDesc').innerText = match.tagline || match.overview.slice(0, 180) + '...';
      
      document.getElementById('triageBookBtn').onclick = () => {
        selectConditionForBooking(match.title);
      };
      document.getElementById('triageExploreBtn').onclick = () => {
        openConditionModalById(match.id);
      };
    }
    renderTriageSymptoms();

    // CONDITION MODAL MANAGEMENT
    const conditionModal = document.getElementById('conditionModal');
    function openConditionModalById(id) {
      const c = SITE_DB.conditions.find(item => item.id === id);
      if (!c) return;

      document.getElementById('modalConditionCategory').innerText = c.category;
      document.getElementById('modalConditionTitle').innerText = c.title;
      document.getElementById('modalConditionImg').src = c.localImage || c.image;
      document.getElementById('modalConditionOverview').innerText = c.overview;

      // Symptoms
      document.getElementById('modalConditionSymptoms').innerHTML = c.symptoms.map(s => `
        <li class="flex items-start gap-2"><span style="color:var(--primary); font-weight:800;">•</span> <span>${s}</span></li>
      `).join('') || '<li>Please consult Dr. Nithin for diagnostic evaluation.</li>';

      // Treatments
      document.getElementById('modalConditionTreatments').innerHTML = c.treatments.map(t => `
        <li class="flex items-start gap-2"><span style="color:var(--secondary); font-weight:800;">✓</span> <span>${t}</span></li>
      `).join('') || '<li>Individualized conservative or arthroscopic management plan.</li>';

      // Procedure
      document.getElementById('modalConditionProcedure').innerHTML = c.procedure.map(p => `
        <li class="flex items-start gap-2"><span style="color:var(--primary); font-weight:800;">➔</span> <span>${p}</span></li>
      `).join('') || '<li>Standard surgical preparation, minimally invasive arthroscopy, and guided recovery.</li>';

      // FAQs
      document.getElementById('modalConditionFaqs').innerHTML = c.faqs.map(f => {
        const parts = f.split(/A:\s*/);
        const q = parts[0] ? parts[0].replace(/^Q\d*:\s*/, '') : '';
        const a = parts[1] || '';
        return `
          <div style="background:var(--bg-main); padding:0.75rem 1rem; border-radius:0.75rem; border:1px solid var(--border-color);">
            <strong style="color:var(--text-main); display:block; margin-bottom:0.25rem;">${q}</strong>
            <span style="color:var(--text-muted); font-size:0.9rem;">${a}</span>
          </div>
        `;
      }).join('') || '<p style="color:var(--text-muted);">Please contact our clinic for custom questions.</p>';

      // CTA in modal
      document.getElementById('modalBookThisBtn').onclick = () => {
        closeConditionModal();
        selectConditionForBooking(c.title);
      };

      conditionModal.classList.add('active');
    }

    function closeConditionModal() {
      conditionModal.classList.remove('active');
    }

    // Modal Tabs
    const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
    const modalTabPanels = document.querySelectorAll('.modal-tab-panel');
    modalTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modalTabBtns.forEach(b => {
          b.classList.remove('active');
          b.style.color = 'var(--text-muted)';
          b.style.borderBottom = 'none';
        });
        btn.classList.add('active');
        btn.style.color = 'var(--primary)';
        btn.style.borderBottom = '2px solid var(--primary)';
        const target = btn.getAttribute('data-tab');
        modalTabPanels.forEach(panel => {
          panel.style.display = panel.id === target ? 'block' : 'none';
        });
      });
    });

    // BLOG MODAL
    const blogModal = document.getElementById('blogModal');
    function openBlogModal(idx) {
      const b = SITE_DB.blogs[idx];
      if (!b) return;

      document.getElementById('modalBlogCategory').innerText = b.category;
      document.getElementById('modalBlogTitle').innerText = b.title;
      document.getElementById('modalBlogDate').innerText = b.date;
      document.getElementById('modalBlogReadTime').innerText = b.readTime;
      document.getElementById('modalBlogImg').src = b.image;

      let formattedHtml = '';
      if (b.sections && b.sections.length > 0) {
        formattedHtml = b.sections.map(s => `
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 1.15rem; color: var(--primary-dark); margin-bottom: 0.5rem; font-weight: 700;">${s.heading}</h4>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${s.paragraphs.map(p => `<p style="margin-bottom:0.5rem;">${p}</p>`).join('')}
            </div>
          </div>
        `).join('');
      } else {
        formattedHtml = b.bodyText.split('\n\n').map(p => `<p style="margin-bottom:1rem;">${p}</p>`).join('');
      }

      document.getElementById('modalBlogContent').innerHTML = formattedHtml;
      blogModal.classList.add('active');
    }
    function closeBlogModal() {
      blogModal.classList.remove('active');
    }

    // LIGHTBOX
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    function openLightbox(src, caption) {
      lightboxImg.src = src;
      lightboxCaption.innerText = caption;
      lightboxModal.classList.add('active');
    }
    function closeLightbox() {
      lightboxModal.classList.remove('active');
    }

    // VIDEO MODAL
    const videoModal = document.getElementById('videoModal');
    function openVideoModal(vidId) {
      const v = SITE_DB.videos.find(item => item.id === vidId) || SITE_DB.videos[0];
      document.getElementById('videoModalTitle').innerText = v.title;
      document.getElementById('videoModalThumb').src = v.thumbnail;
      document.getElementById('videoModalInnerTitle').innerText = v.title;
      document.getElementById('videoModalDesc').innerText = v.description;
      videoModal.classList.add('active');
    }
    function closeVideoModal() {
      videoModal.classList.remove('active');
    }

    // APPOINTMENT BOOKING WIZARD LOGIC
    let currentWizardStep = 1;

    function populateBookingConditions(category = 'All') {
      const select = document.getElementById('bookingConditionSelect');
      const filtered = category === 'All' ? SITE_DB.conditions : SITE_DB.conditions.filter(c => c.category === category);
      select.innerHTML = filtered.map(c => `
        <option value="${c.title}">${c.title} (${c.category})</option>
      `).join('');
    }
    populateBookingConditions();

    function updateBookingConditionsList() {
      const cat = document.getElementById('bookingCategory').value;
      populateBookingConditions(cat);
    }

    function selectConditionForBooking(conditionTitle) {
      const select = document.getElementById('bookingConditionSelect');
      populateBookingConditions('All');
      select.value = conditionTitle;
      goToWizardStep(1);
      const bookingSection = document.getElementById('book-appointment');
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }

    function goToWizardStep(step) {
      currentWizardStep = step;
      
      // Update step indicator
      document.querySelectorAll('.booking-step').forEach(s => {
        const sNum = +s.getAttribute('data-step');
        const circle = s.querySelector('div');
        if (sNum === step) {
          circle.style.background = 'var(--primary)';
          circle.style.color = '#fff';
        } else if (sNum < step) {
          circle.style.background = '#22c55e';
          circle.style.color = '#fff';
        } else {
          circle.style.background = 'var(--border-color)';
          circle.style.color = 'var(--text-muted)';
        }
      });

      // Update panels
      document.querySelectorAll('.wizard-panel').forEach((p, idx) => {
        p.style.display = (idx + 1 === step) ? 'block' : 'none';
      });

      if (step === 4) {
        buildBookingSummary();
      }
    }

    function buildBookingSummary() {
      const condition = document.getElementById('bookingConditionSelect').value;
      const consultType = document.querySelector('input[name="consultType"]:checked').value;
      const date = document.getElementById('bookingDate').value || 'Immediate Appointment';
      const slot = document.getElementById('bookingSlot').value;
      const name = document.getElementById('patientName').value || 'Guest Patient';
      const phone = document.getElementById('patientPhone').value || 'Not provided';
      const notes = document.getElementById('patientNotes').value || 'No additional notes';

      document.getElementById('bookingReviewSummary').innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; font-size:0.95rem;">
          <div><strong style="color:var(--text-muted);">Speciality:</strong><br><strong>${condition}</strong></div>
          <div><strong style="color:var(--text-muted);">Consultation Type:</strong><br>${consultType}</div>
          <div><strong style="color:var(--text-muted);">Preferred Date:</strong><br>${date} (${slot})</div>
          <div><strong style="color:var(--text-muted);">Patient Name:</strong><br>${name}</div>
          <div><strong style="color:var(--text-muted);">Contact Phone:</strong><br>${phone}</div>
          <div><strong style="color:var(--text-muted);">Hospital Center:</strong><br>Yashoda Hospitals Secunderabad</div>
        </div>
      `;
    }

    function handleBookingSubmit() {
      const ref = 'DN-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('bookingRefCode').innerText = ref;
      document.getElementById('appointmentWizardForm').style.display = 'none';
      document.getElementById('bookingSuccessBox').style.display = 'block';
    }

    function sendBookingViaWhatsApp() {
      const condition = document.getElementById('bookingConditionSelect').value;
      const date = document.getElementById('bookingDate').value || 'Earliest available';
      const slot = document.getElementById('bookingSlot').value;
      const name = document.getElementById('patientName').value || '';
      const phone = document.getElementById('patientPhone').value || '';
      const notes = document.getElementById('patientNotes').value || '';

      const msg = encodeURIComponent(
        \`Hello Dr. Nithin / Yashoda Hospitals,\\nI would like to book an appointment with Dr. Nithin Kumar Bejjanki.\\n\\n*Patient Name:* \${name}\\n*Phone:* \${phone}\\n*Condition:* \${condition}\\n*Preferred Date:* \${date} (\${slot})\\n*Symptoms/Notes:* \${notes}\`
      );

      window.open(\`https://wa.me/917207171115?text=\${msg}\`, '_blank');
      handleBookingSubmit();
    }

    function resetWizard() {
      document.getElementById('appointmentWizardForm').reset();
      document.getElementById('appointmentWizardForm').style.display = 'block';
      document.getElementById('bookingSuccessBox').style.display = 'none';
      goToWizardStep(1);
    }

    // Set today as min date for booking
    const todayStr = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
      dateInput.min = todayStr;
      dateInput.value = todayStr;
    }

    // Close modals on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeConditionModal();
        closeBlogModal();
        closeLightbox();
        closeVideoModal();
        closeMobileDrawer();
      }
    });

  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', html);
console.log('Successfully generated index.html! File size:', fs.statSync('index.html').size, 'bytes');

