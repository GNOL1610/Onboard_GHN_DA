'use strict';

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    buildTabBar();
    setupCopyButtons();
    setupDatasetNav();
    setupChecklist();
    setTimeout(initCharts, 0);

    // Restore tab from URL hash
    const hash = location.hash.slice(1);
    if (hash && document.getElementById(hash)) switchTab(hash);

    // Date
    const el = document.getElementById('doc-date');
    if (el) el.textContent = new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  });
})();
