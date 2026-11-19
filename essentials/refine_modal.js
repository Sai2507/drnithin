const fs = require("fs");

let tpl = fs.readFileSync("template.html", "utf8");

const start = tpl.indexOf("function openConditionModalById");
const end = tpl.indexOf("function closeConditionModal", start);

if (start !== -1 && end !== -1) {
  const newFunc = `function openConditionModalById(id) {
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
                     '<span style="color:#0f766e; font-weight:800; font-size:1.2rem; line-height:1.2; flex-shrink:0;">•</span>' +
                     '<span style="color:var(--text-main); font-size:0.95rem; line-height:1.6;">' + item + '</span>' +
                     '</li>';
        });
        symHtml += '</ul>';
      }
      if (symTab.outro) {
        symHtml += '<p style="margin-top:1rem; color:var(--text-muted); font-size:0.95rem; line-height:1.6; border-top:1px dashed var(--border-color); padding-top:0.75rem;">' + symTab.outro + '</p>';
      }
      document.getElementById('modal-symptoms').innerHTML = symHtml || '<p style="color:var(--text-muted);">Please consult Dr. Nithin for personalized diagnostic evaluation.</p>';

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
                       '<span style="color:#0284c7; font-weight:800; font-size:1rem; line-height:1.4; flex-shrink:0;">✓</span>' +
                       '<span style="color:var(--text-main); font-size:0.95rem; line-height:1.6;">' + item + '</span>' +
                       '</li>';
        });
        treatHtml += '</ul>';
      }
      if (treatTab.outro) {
        treatHtml += '<p style="margin-top:1rem; color:var(--text-muted); font-size:0.95rem; line-height:1.6; border-top:1px dashed var(--border-color); padding-top:0.75rem;">' + treatTab.outro + '</p>';
      }
      document.getElementById('modal-treatments').innerHTML = treatHtml || '<p style="color:var(--text-muted);">Treatment plans are tailored according to injury severity and patient lifestyle.</p>';

      // 3. RENDER TAB 3: Procedure Details
      const procTab = tabData.procedureTab || { intro: '', items: [], outro: '' };
      let procHtml = '';
      if (procTab.intro) {
        procHtml += '<p style="margin-bottom:1rem; font-weight:600; color:var(--text-main); font-size:1rem; line-height:1.6;">' + procTab.intro + '</p>';
      }
      if (procTab.items && procTab.items.length > 0) {
        procHtml += '<div style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1rem;">';
        procTab.items.forEach((item, idx) => {
          let stepTitle = "";
          let stepBody = item;
          if (item.includes(':') && !item.startsWith('http')) {
            const colonIdx = item.indexOf(':');
            if (colonIdx < 45) {
              stepTitle = item.slice(0, colonIdx).trim();
              stepBody = item.slice(colonIdx + 1).trim();
            }
          }
          procHtml += '<div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:0.75rem; padding:0.85rem 1rem; display:flex; gap:0.75rem; align-items:flex-start;">' +
                      '<span style="background:#e0f2fe; color:#0369a1; font-weight:800; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem; flex-shrink:0;">' + (idx+1) + '</span>' +
                      '<div style="color:var(--text-main); font-size:0.95rem; line-height:1.5;">' +
                      (stepTitle ? '<strong style="color:var(--primary); font-size:0.95rem; display:block; margin-bottom:0.25rem;">' + stepTitle + '</strong>' : '') +
                      '<span>' + stepBody + '</span>' +
                      '</div>' +
                      '</div>';
        });
        procHtml += '</div>';
      }
      if (procTab.outro) {
        procHtml += '<p style="margin-top:1rem; color:var(--text-muted); font-size:0.95rem; line-height:1.6;">' + procTab.outro + '</p>';
      }
      document.getElementById('modal-procedure').innerHTML = procHtml || '<p style="color:var(--text-muted);">Surgical and clinical protocols are tailored to individual patient needs.</p>';

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
            q = item.slice(0, qIdx + 1).replace(/^Q\\d*:\\s*/i, '').trim();
            a = item.slice(qIdx + 1).replace(/^A:\\s*/i, '').trim();
            faqsHtml += '<div style="background:var(--bg-main); border:1px solid var(--border-color); border-radius:0.85rem; padding:1.1rem;">' +
                        '<div style="font-weight:700; color:var(--primary); font-size:0.95rem; margin-bottom:0.4rem; display:flex; align-items:flex-start; gap:0.5rem;">' +
                        '<span style="font-size:1.1rem; line-height:1;">❓</span> <span>' + q + '</span>' +
                        '</div>' +
                        (a ? '<div style="color:var(--text-muted); font-size:0.925rem; line-height:1.6; padding-left:1.75rem;">' + a + '</div>' : '') +
                        '</div>';
          } else {
            faqsHtml += '<div style="background:var(--badge-bg); border-left:4px solid var(--secondary); border-radius:0.5rem; padding:0.85rem 1rem; color:var(--badge-text); font-size:0.925rem; line-height:1.6;">' +
                        '<strong>Dr. Nithin\\'s Clinical Note:</strong> ' + item +
                        '</div>';
          }
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

    `;
  tpl = tpl.substring(0, start) + newFunc + tpl.substring(end);
  fs.writeFileSync("template.html", tpl, "utf8");
  console.log("Refined openConditionModalById in template.html!");
} else {
  console.error("Could not find start or end for openConditionModalById");
}

