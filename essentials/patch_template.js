const fs = require('fs');

let template = fs.readFileSync('template.html', 'utf8');

// 1. Update Modal HTML inside template.html
const oldModalTabs = `<div class="flex gap-2" style="border-bottom: 1px solid var(--border-color); margin-bottom: 1rem;">
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
        </div>`;

const newModalTabs = `<!-- Interactive Category Tabs (Exact match to original design) -->
        <div style="background: var(--bg-main); padding: 0.5rem; border-radius: 1rem; border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
          <div class="flex gap-2" style="overflow-x: auto; scrollbar-width: none;" id="modalTabsBar">
            <button class="modal-tab-btn active" data-tab="modal-symptoms" style="flex:1; min-width: 180px; padding: 0.75rem 1rem; border-radius: 0.75rem; border: none; font-weight: 700; font-size: 0.9rem; cursor: pointer; background: #0f766e; color: #ffffff; transition: all 0.2s;">
              Symptoms &amp; Conditions Treated
            </button>
            <button class="modal-tab-btn" data-tab="modal-treatments" style="flex:1; min-width: 160px; padding: 0.75rem 1rem; border-radius: 0.75rem; border: none; font-weight: 600; font-size: 0.9rem; cursor: pointer; background: var(--bg-card); color: var(--text-main); transition: all 0.2s;">
              Treatment Options
            </button>
            <button class="modal-tab-btn" data-tab="modal-procedure" style="flex:1; min-width: 160px; padding: 0.75rem 1rem; border-radius: 0.75rem; border: none; font-weight: 600; font-size: 0.9rem; cursor: pointer; background: var(--bg-card); color: var(--text-main); transition: all 0.2s;">
              Procedure Details
            </button>
            <button class="modal-tab-btn" data-tab="modal-faqs" style="flex:1; min-width: 160px; padding: 0.75rem 1rem; border-radius: 0.75rem; border: none; font-weight: 600; font-size: 0.9rem; cursor: pointer; background: var(--bg-card); color: var(--text-main); transition: all 0.2s;">
              FAQs &amp; Recovery
            </button>
          </div>
        </div>

        <!-- Tab Content Display Area -->
        <div id="modalTabPanels" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1rem;">
          <div id="modal-symptoms" class="modal-tab-panel"></div>
          <div id="modal-treatments" class="modal-tab-panel" style="display:none;"></div>
          <div id="modal-procedure" class="modal-tab-panel" style="display:none;"></div>
          <div id="modal-faqs" class="modal-tab-panel" style="display:none;"></div>
        </div>`;

template = template.replace(oldModalTabs, newModalTabs);

// 2. Replace openConditionModalById function in template.html
const oldModalJsStart = "    // CONDITION MODAL MANAGEMENT";
const oldModalJsEnd = "    // BLOG MODAL";

const newModalJs = `    // CONDITION MODAL MANAGEMENT
    const conditionModal = document.getElementById('conditionModal');

    function openConditionModalById(id) {
      const c = SITE_DB.conditions.find(item => item.id === id);
      if (!c) return;

      document.getElementById('modalConditionCategory').innerText = c.category;
      document.getElementById('modalConditionTitle').innerText = c.title;
      document.getElementById('modalConditionImg').src = c.localImage || c.image;
      document.getElementById('modalConditionOverview').innerText = c.overview;

      const tabData = c.tabData || {};

      // 1. RENDER TAB 1: Symptoms & Conditions Treated
      const symTab = tabData.symptomsTab || { intro: '', items: [], outro: '' };
      let symHtml = '';
      if (symTab.intro) {
        symHtml += '<p style="margin-bottom:1rem; font-weight:600; color:var(--text-main); font-size:1rem; line-height:1.6;">' + symTab.intro + '</p>';
      }
      if (symTab.items && symTab.items.length > 0) {
        symHtml += '<ul style="list-style:none; display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1rem;">';
        symTab.items.forEach(item => {
          symHtml += '<li style="display:flex; align-items:flex-start; gap:0.6rem;">' +
                     '<span style="color:#0f766e; font-weight:800; font-size:1.2rem; line-height:1.2;">•</span>' +
                     '<span style="color:var(--text-main); font-size:0.95rem; line-height:1.6;">' + item + '</span>' +
                     '</li>';
        });
        symHtml += '</ul>';
      }
      if (symTab.outro) {
        symHtml += '<p style="margin-top:1rem; color:var(--text-muted); font-size:0.95rem; line-height:1.6; border-top:1px dashed var(--border-color); padding-top:0.75rem;">' + symTab.outro + '</p>';
      }
      document.getElementById('modal-symptoms').innerHTML = symHtml || '<p style="color:var(--text-muted);">Please consult Dr. Nithin for personalized evaluation.</p>';

      // 2. RENDER TAB 2: Treatment Options
      const treatTab = tabData.treatmentsTab || { intro: '', items: [], outro: '' };
      let treatHtml = '';
      if (treatTab.intro) {
        treatHtml += '<p style="margin-bottom:1rem; font-weight:600; color:var(--text-main); font-size:1rem; line-height:1.6;">' + treatTab.intro + '</p>';
      }
      if (treatTab.items && treatTab.items.length > 0) {
        treatHtml += '<ul style="list-style:none; display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1rem;">';
        treatTab.items.forEach(item => {
          treatHtml += '<li style="display:flex; align-items:flex-start; gap:0.6rem;">' +
                       '<span style="color:#0284c7; font-weight:800; font-size:1rem; line-height:1.4;">✓</span>' +
                       '<span style="color:var(--text-main); font-size:0.95rem; line-height:1.6;">' + item + '</span>' +
                       '</li>';
        });
        treatHtml += '</ul>';
      }
      if (treatTab.outro) {
        treatHtml += '<p style="margin-top:1rem; color:var(--text-muted); font-size:0.95rem; line-height:1.6; border-top:1px dashed var(--border-color); padding-top:0.75rem;">' + treatTab.outro + '</p>';
      }
      document.getElementById('modal-treatments').innerHTML = treatHtml || '<p style="color:var(--text-muted);">Treatment is personalized according to clinical severity.</p>';

      // 3. RENDER TAB 3: Procedure Details
      const procTab = tabData.procedureTab || { intro: '', items: [], outro: '' };
      let procHtml = '';
      if (procTab.intro) {
        procHtml += '<p style="margin-bottom:1rem; font-weight:600; color:var(--text-main); font-size:1rem; line-height:1.6;">' + procTab.intro + '</p>';
      }
      if (procTab.items && procTab.items.length > 0) {
        procHtml += '<div style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1rem;">';
        procTab.items.forEach((item, idx) => {
          procHtml += '<div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:0.75rem; padding:0.85rem 1rem; display:flex; gap:0.75rem; align-items:flex-start;">' +
                      '<span style="background:#e0f2fe; color:#0369a1; font-weight:800; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem; flex-shrink:0;">' + (idx+1) + '</span>' +
                      '<span style="color:var(--text-main); font-size:0.95rem; line-height:1.5;">' + item + '</span>' +
                      '</div>';
        });
        procHtml += '</div>';
      }
      if (procTab.outro) {
        procHtml += '<p style="margin-top:1rem; color:var(--text-muted); font-size:0.95rem; line-height:1.6;">' + procTab.outro + '</p>';
      }
      document.getElementById('modal-procedure').innerHTML = procHtml || '<p style="color:var(--text-muted);">Surgical and clinical protocols are tailored to patient needs.</p>';

      // 4. RENDER TAB 4: FAQs & Recovery
      const faqsTab = tabData.faqsTab || { intro: '', items: [], outro: '' };
      let faqsHtml = '';
      if (faqsTab.intro) {
        faqsHtml += '<p style="margin-bottom:1rem; font-weight:600; color:var(--text-main); font-size:1rem; line-height:1.6;">' + faqsTab.intro + '</p>';
      }
      if (faqsTab.items && faqsTab.items.length > 0) {
        faqsHtml += '<div style="display:flex; flex-direction:column; gap:0.85rem; margin-bottom:1rem;">';
        faqsTab.items.forEach(item => {
          let q = '';
          let a = '';
          if (item.includes('?')) {
            const qIdx = item.indexOf('?');
            q = item.slice(0, qIdx + 1).replace(/^Q\d*:\s*/i, '').trim();
            a = item.slice(qIdx + 1).replace(/^A:\s*/i, '').trim();
          } else {
            q = item;
          }
          faqsHtml += '<div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:0.85rem; padding:1rem;">' +
                      '<div style="font-weight:700; color:var(--primary); font-size:0.95rem; margin-bottom:0.35rem; display:flex; align-items:center; gap:0.5rem;">' +
                      '<span>❓</span> <span>' + q + '</span>' +
                      '</div>' +
                      (a ? '<div style="color:var(--text-muted); font-size:0.925rem; line-height:1.6; padding-left:1.5rem;">' + a + '</div>' : '') +
                      '</div>';
        });
        faqsHtml += '</div>';
      }
      if (faqsTab.outro) {
        faqsHtml += '<p style="margin-top:1rem; color:var(--text-muted); font-size:0.95rem; line-height:1.6;">' + faqsTab.outro + '</p>';
      }
      document.getElementById('modal-faqs').innerHTML = faqsHtml || '<p style="color:var(--text-muted);">Please ask our clinic coordinator for any recovery queries.</p>';

      // Reset modal active tab to Tab 1 (Symptoms & Conditions Treated)
      const tabButtons = document.querySelectorAll('.modal-tab-btn');
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'var(--bg-card)';
        btn.style.color = 'var(--text-main)';
      });
      const firstTabBtn = document.querySelector('.modal-tab-btn[data-tab="modal-symptoms"]');
      if (firstTabBtn) {
        firstTabBtn.classList.add('active');
        firstTabBtn.style.background = '#0f766e';
        firstTabBtn.style.color = '#ffffff';
      }

      document.querySelectorAll('.modal-tab-panel').forEach(p => p.style.display = 'none');
      const firstPanel = document.getElementById('modal-symptoms');
      if (firstPanel) firstPanel.style.display = 'block';

      // CTA Button in Modal
      document.getElementById('modalBookThisBtn').onclick = () => {
        closeConditionModal();
        selectConditionForBooking(c.title);
      };

      conditionModal.classList.add('active');
    }

    function closeConditionModal() {
      conditionModal.classList.remove('active');
    }

    // Modal Tab Click Handlers
    document.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-tab-btn').forEach(b => {
          b.classList.remove('active');
          b.style.background = 'var(--bg-card)';
          b.style.color = 'var(--text-main)';
        });
        btn.classList.add('active');
        btn.style.background = '#0f766e';
        btn.style.color = '#ffffff';
        const target = btn.getAttribute('data-tab');
        document.querySelectorAll('.modal-tab-panel').forEach(panel => {
          panel.style.display = panel.id === target ? 'block' : 'none';
        });
      });
    });\n\n`;

const startIndex = template.indexOf(oldModalJsStart);
const endIndex = template.indexOf(oldModalJsEnd);

if (startIndex !== -1 && endIndex !== -1) {
  template = template.slice(0, startIndex) + newModalJs + template.slice(endIndex);
  console.log('Successfully replaced modal JS in template.html!');
} else {
  console.error('Could not find markers for modal JS');
}

fs.writeFileSync('template.html', template);

// Compile to index.html
const db = JSON.parse(fs.readFileSync('site_database.json', 'utf8'));
const compiled = template.replace('__SITE_DATABASE__', JSON.stringify(db));
fs.writeFileSync('index.html', compiled, 'utf8');

console.log('Updated template.html and compiled index.html!');
console.log('index.html size:', fs.statSync('index.html').size, 'bytes');

