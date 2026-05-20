'use strict';

function buildTabBar() {
  const bar = document.getElementById('tab-bar');
  TABS.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (i === 0 ? ' active' : '');
    btn.dataset.tab = t.id;
    btn.innerHTML = `<span class="tb-icon">${t.icon}</span>${t.label}`;
    btn.addEventListener('click', () => switchTab(t.id));
    bar.appendChild(btn);
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById(tabId);
  const btn   = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#' + tabId);
  if (tabId === 'tab-overview' && typeof initCharts === 'function') setTimeout(initCharts, 30);
}

function setupCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const pre = this.closest('.code-block').querySelector('pre');
      navigator.clipboard.writeText(pre ? pre.innerText : '').then(() => {
        this.textContent = '✓ Copied';
        this.classList.add('copied');
        setTimeout(() => { this.textContent = 'Copy'; this.classList.remove('copied'); }, 1500);
      });
    });
  });
}

function setupDatasetNav() {
  document.querySelectorAll('.ds-group-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.ds-group-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const target = document.getElementById(this.dataset.group);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setupChecklist() {
  const KEY = 'onboarding_ck_v2';
  const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
  document.querySelectorAll('.ck-list input[type=checkbox]').forEach(cb => {
    if (saved[cb.id]) { cb.checked = true; cb.closest('li').classList.add('done'); }
    cb.addEventListener('change', function() {
      saved[this.id] = this.checked;
      localStorage.setItem(KEY, JSON.stringify(saved));
      this.closest('li').classList.toggle('done', this.checked);
      updateProgress();
    });
  });
  updateProgress();
}

function updateProgress() {
  const total = document.querySelectorAll('.ck-list input').length;
  const done  = document.querySelectorAll('.ck-list input:checked').length;
  const pct   = total ? Math.round(done / total * 100) : 0;
  const pctEl = document.getElementById('ck-pct');
  const fill  = document.getElementById('ck-fill');
  const lbl   = document.getElementById('ck-label');
  if (pctEl) pctEl.textContent = pct + '%';
  if (fill)  fill.style.width  = pct + '%';
  if (lbl)   lbl.textContent   = `${done} / ${total} hoàn thành`;
}
