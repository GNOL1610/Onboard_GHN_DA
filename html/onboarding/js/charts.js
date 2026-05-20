'use strict';

/* ── Design tokens (matching style.css) ── */
const CC = {
  orange:     '#f97316',
  orange_bg:  'rgba(249,115,22,0.18)',
  orange_lt:  '#fb923c',
  green:      '#86efac',
  green_bg:   'rgba(34,197,94,0.18)',
  warn:       '#fcd34d',
  warn_bg:    'rgba(251,191,36,0.18)',
  blue:       '#93c5fd',
  blue_bg:    'rgba(59,130,246,0.18)',
  teal:       '#5eead4',
  teal_bg:    'rgba(20,184,166,0.18)',
  purple:     '#c4b5fd',
  text:       '#e2e8f0',
  text_sec:   '#94a3b8',
  text_mute:  '#64748b',
  elevated:   '#21262d',
  border:     '#30363d',
  bg:         '#0d1117',
};

/* ── Data ── */
const MONTHLY_DATA = [
  { label: 'T11/25', value: 24.1, mom: null,     type: 'normal'  },
  { label: 'T12/25', value: 25.7, mom: '+6.7%',  type: 'normal'  },
  { label: 'T1/26',  value: 29.2, mom: '+13.5%', type: 'peak',   note: 'Cao điểm Tết' },
  { label: 'T2/26',  value: 16.8, mom: '−42.3%', type: 'tet',    note: 'Nghỉ Tết' },
  { label: 'T3/26',  value: 25.5, mom: '+51.6%', type: 'normal'  },
  { label: 'T4/26',  value: 24.3, mom: '−4.7%',  type: 'normal'  },
];

const TOP_ROUTES = [
  { label: 'HN → HCM',          value: 5815, origin: 'HN' },
  { label: 'HN → HN (nội tỉnh)', value: 5335, origin: 'HN' },
  { label: 'HCM → HCM (nội tỉnh)', value: 3664, origin: 'HCM' },
  { label: 'HCM → HN',          value: 3262, origin: 'HCM' },
  { label: 'HN → Thanh Hóa',    value: 2213, origin: 'HN' },
  { label: 'HN → Đồng Nai',     value: 1857, origin: 'HN' },
  { label: 'HN → Hải Phòng',    value: 1763, origin: 'HN' },
  { label: 'HN → Nghệ An',      value: 1733, origin: 'HN' },
  { label: 'HCM → Đồng Nai',    value: 1671, origin: 'HCM' },
  { label: 'HN → Bình Dương',   value: 1656, origin: 'HN' },
];

/* ── Helper ── */
function setDPI(canvas, ctx) {
  const dpr = window.devicePixelRatio || 1;
  const w   = canvas.offsetWidth;
  const h   = parseInt(canvas.getAttribute('data-h') || canvas.offsetHeight);
  canvas.width  = w * dpr;
  canvas.height = h * dpr;
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);
  return { W: w, H: h };
}

function roundRect(ctx, x, y, w, h, r) {
  if (w < 0) w = 0;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ── Chart 1: Monthly Trend (Bar) ── */
function drawMonthlyTrend(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || canvas.offsetWidth === 0) return;
  const ctx = canvas.getContext('2d');
  const { W, H } = setDPI(canvas, ctx);

  ctx.clearRect(0, 0, W, H);

  const padL = 44, padR = 16, padT = 48, padB = 44;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const n = MONTHLY_DATA.length;
  const slotW = chartW / n;
  const barW  = slotW * 0.55;
  const maxV  = 32;

  /* grid */
  [0, 8, 16, 24, 32].forEach(v => {
    const y = padT + chartH - (v / maxV) * chartH;
    ctx.strokeStyle = CC.border;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(padL + chartW, y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = CC.text_mute;
    ctx.font = '10px Segoe UI';
    ctx.textAlign = 'right';
    ctx.fillText(v + 'M', padL - 5, y + 4);
  });

  /* x-axis */
  ctx.strokeStyle = CC.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padL, padT + chartH);
  ctx.lineTo(padL + chartW, padT + chartH);
  ctx.stroke();

  /* average line */
  const avgY = padT + chartH - (24.9 / maxV) * chartH;
  ctx.strokeStyle = 'rgba(249,115,22,0.4)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(padL, avgY);
  ctx.lineTo(padL + chartW, avgY);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = CC.orange;
  ctx.font = '9px Segoe UI';
  ctx.textAlign = 'left';
  ctx.fillText('Nền ~24.9M', padL + 4, avgY - 4);

  /* bars */
  MONTHLY_DATA.forEach((d, i) => {
    const cx  = padL + i * slotW + slotW / 2;
    const x   = cx - barW / 2;
    const barH = (d.value / maxV) * chartH;
    const y    = padT + chartH - barH;

    const color  = d.type === 'peak' ? CC.green  : d.type === 'tet' ? CC.warn : CC.orange;
    const bgCol  = d.type === 'peak' ? CC.green_bg : d.type === 'tet' ? CC.warn_bg : CC.orange_bg;

    /* shadow bar */
    ctx.fillStyle = bgCol;
    roundRect(ctx, x, padT, barW, chartH, 4);
    ctx.fill();

    /* main bar */
    const grad = ctx.createLinearGradient(0, y, 0, y + barH);
    grad.addColorStop(0, color);
    grad.addColorStop(1, bgCol);
    ctx.fillStyle = grad;
    roundRect(ctx, x, y, barW, barH, 4);
    ctx.fill();

    /* value label */
    ctx.fillStyle = color;
    ctx.font = 'bold 12px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(d.value + 'M', cx, y - 4);

    /* MoM */
    if (d.mom) {
      const momColor = d.mom.startsWith('+') ? CC.green : CC.warn;
      ctx.fillStyle = momColor;
      ctx.font = '9px Segoe UI';
      ctx.fillText(d.mom, cx, y - 17);
    }

    /* month label */
    ctx.fillStyle = CC.text_sec;
    ctx.font = '11px Segoe UI';
    ctx.fillText(d.label, cx, padT + chartH + 16);

    /* event note */
    if (d.note) {
      ctx.fillStyle = color;
      ctx.font = 'bold 9px Segoe UI';
      ctx.fillText(d.note, cx, padT + chartH + 30);
    }
  });
}

/* ── Chart 2: Top Routes (Horizontal Bar) ── */
function drawTopRoutes(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || canvas.offsetWidth === 0) return;
  const ctx = canvas.getContext('2d');
  const ROW = 30;
  canvas.setAttribute('data-h', TOP_ROUTES.length * ROW + 10);
  const { W, H } = setDPI(canvas, ctx);

  ctx.clearRect(0, 0, W, H);

  const labelW = Math.min(190, W * 0.38);
  const valW   = 52;
  const barMaxW = W - labelW - valW - 12;
  const maxV   = TOP_ROUTES[0].value;

  TOP_ROUTES.forEach((r, i) => {
    const y     = i * ROW + 5;
    const color = r.origin === 'HN' ? CC.orange : CC.teal;
    const bgCol = r.origin === 'HN' ? CC.orange_bg : CC.teal_bg;
    const fillW = Math.max(6, (r.value / maxV) * barMaxW);

    /* label */
    ctx.fillStyle = CC.text_sec;
    ctx.font = '11px Segoe UI';
    ctx.textAlign = 'left';
    ctx.fillText(r.label, 0, y + ROW / 2 + 4);

    /* bg bar */
    ctx.fillStyle = bgCol;
    roundRect(ctx, labelW, y + 5, barMaxW, ROW - 10, 3);
    ctx.fill();

    /* fill bar */
    ctx.fillStyle = color;
    roundRect(ctx, labelW, y + 5, fillW, ROW - 10, 3);
    ctx.fill();

    /* value */
    ctx.fillStyle = CC.text;
    ctx.font = 'bold 10px Segoe UI';
    ctx.textAlign = 'right';
    ctx.fillText('~' + (r.value / 1000).toFixed(1) + 'M', W, y + ROW / 2 + 4);
  });
}

/* ── Entry point ── */
function initCharts() {
  drawMonthlyTrend('chart-monthly-trend');
  drawTopRoutes('chart-top-routes');
}

function recheckCharts() {
  const c1 = document.getElementById('chart-monthly-trend');
  if (c1 && c1.offsetWidth > 0) {
    drawMonthlyTrend('chart-monthly-trend');
    drawTopRoutes('chart-top-routes');
  }
}

window.addEventListener('resize', function () {
  clearTimeout(window._chartResizeTimer);
  window._chartResizeTimer = setTimeout(recheckCharts, 120);
});
