/* ==========================================================================
   WEALTHLY — script.js
   All application logic lives here, organized into clearly labeled sections:
     0. Icon system (SVG fallback)   5. Rendering (dashboard/table/lists)
     1. Constants & State            6. Charts
     2. Local Storage helpers        7. Calendar
     3. Utility helpers              8. CRUD actions
     4. Toast / Modal / Ripple UI    9. Event wiring (forms, filters, nav)
   ========================================================================== */

/* ---------------------- 0. ICON SYSTEM (SVG FALLBACK) ---------------------- */
const ICONS = {
  'wave-square': '<path d="M2 12c1.5-6 3-6 4.5 0s3 6 4.5 0 3-6 4.5 0 3 6 4.5 0"/>',
  'chart-pie': '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  'receipt': '<path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2V2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="13" y2="15"/>',
  'circle-plus': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>',
  'chart-line': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  'bullseye': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  'calendar-days': '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  'database': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
  'bars': '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  'magnifying-glass': '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  'moon': '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  'sun': '<circle cx="12" cy="12" r="4"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.2" y1="4.2" x2="5.6" y2="5.6"/><line x1="18.4" y1="18.4" x2="19.8" y2="19.8"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.2" y1="19.8" x2="5.6" y2="18.4"/><line x1="18.4" y1="5.6" x2="19.8" y2="4.2"/>',
  'file-pdf': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
  'file-excel': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="19"/><line x1="15" y1="13" x2="9" y2="19"/>',
  'file-import': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  'wallet': '<path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"/><path d="M3 7v11a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H6a2 2 0 0 1 0-4h13"/><circle cx="16.5" cy="13.5" r="1.2"/>',
  'sack-dollar': '<path d="M8 3l-3 5c-1.5 2.5-2 4-2 6 0 4.5 4 7 9 7s9-2.5 9-7c0-2-.5-3.5-2-6l-3-5"/><path d="M9.5 9.5c0-1 1-1.5 2.5-1.5s2.5.6 2.5 1.5-1 1.3-2.5 1.5-2.5.6-2.5 1.5 1 1.5 2.5 1.5 2.5-.5 2.5-1.5"/><line x1="12" y1="6.5" x2="12" y2="8"/><line x1="12" y1="14.5" x2="12" y2="16"/>',
  'cart-shopping': '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  'chart-column': '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  'clock-rotate-left': '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
  'ranking-star': '<polygon points="12 2 15 9 22 10 17 15 18.5 22 12 18.5 5.5 22 7 15 2 10 9 9"/>',
  'filter-circle-xmark': '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  'box-open': '<path d="M2 8l10-5 10 5-10 5z"/><path d="M2 8v9l10 5 10-5V8"/><line x1="12" y1="13" x2="12" y2="22"/>',
  'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  'chart-area': '<polyline points="3 18 8 11 13 15 21 5"/><polyline points="3 18 21 18"/>',
  'scale-balanced': '<line x1="12" y1="3" x2="12" y2="21"/><line x1="4" y1="6" x2="20" y2="6"/><path d="M4 6l-3 7a4 4 0 0 0 7 0z"/><path d="M20 6l-3 7a4 4 0 0 0 7 0z"/>',
  'floppy-disk': '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
  'gauge-high': '<path d="M4.9 19.1A10 10 0 1 1 19.1 19.1"/><line x1="12" y1="13" x2="16" y2="9"/><circle cx="12" cy="13" r="1"/>',
  'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
  'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
  'pen': '<path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
  'xmark': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  'check': '<polyline points="20 6 9 17 4 12"/>',
  'circle-info': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  'triangle-exclamation': '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  'trash': '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  'circle-check': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'circle-xmark': '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
};

function replaceIconElement(el) {
  if (el.dataset.iconDone) return;
  let name = null;
  el.classList.forEach(c => { if (c.startsWith('fa-') && c !== 'fa-solid' && c !== 'fa-regular') name = c.replace('fa-', ''); });
  if (!name || !ICONS[name]) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.classList.add('icon-svg');
  svg.innerHTML = ICONS[name];
  el.dataset.iconDone = '1';
  el.innerHTML = '';
  el.appendChild(svg);
}

function replaceAllIcons(root = document) {
  root.querySelectorAll('i[class*="fa-"]').forEach(replaceIconElement);
}

function initIconObserver() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.matches && node.matches('i[class*="fa-"]')) replaceIconElement(node);
        if (node.querySelectorAll) replaceAllIcons(node);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

replaceAllIcons();
initIconObserver();

/* ---------------------- 1. CONSTANTS & STATE ---------------------- */
const CATEGORY_META = {
  Food: { color: '#f97316', icon: '🍔' },
  Transport: { color: '#38bdf8', icon: '🚗' },
  Shopping: { color: '#ec4899', icon: '🛍️' },
  Bills: { color: '#facc15', icon: '🧾' },
  Entertainment: { color: '#a78bfa', icon: '🎬' },
  Health: { color: '#f43f5e', icon: '💊' },
  Education: { color: '#22d3ee', icon: '📚' },
  Other: { color: '#94a3b8', icon: '✨' },
};

const SOURCE_META = {
  Salary: '💼', Freelance: '🧑‍💻', Business: '🏢',
  Investment: '📈', Gift: '🎁', Other: '✨',
};

const CURRENCY_SYMBOLS = { INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥' };

let state = {
  expenses: [],
  incomes: [],
  budgets: {},
  settings: { theme: 'violet', darkMode: true, currency: 'INR' },
};

let charts = { incomeExpense: null, incomeExpense2: null, categoryPie: null, categoryPie2: null, monthlyExpense: null };
let calendarCursor = new Date();

/* ---------------------- 2. LOCAL STORAGE HELPERS ---------------------- */
const STORAGE_KEY = 'wealthly_data_v1';

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed, settings: { ...state.settings, ...(parsed.settings || {}) } };
    } catch (e) {
      console.error('Could not parse saved data, starting fresh.', e);
    }
  }
}

/* ---------------------- 3. UTILITY HELPERS ---------------------- */
function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatMoney(amount) {
  const symbol = CURRENCY_SYMBOLS[state.settings.currency] || '₹';
  const rounded = Math.round((amount + Number.EPSILON) * 100) / 100;
  return symbol + rounded.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
}

function getAllTransactions() {
  const exp = state.expenses.map(e => ({ ...e, type: 'expense' }));
  const inc = state.incomes.map(i => ({ ...i, type: 'income' }));
  return [...exp, ...inc];
}

function getTotals() {
  const totalIncome = state.incomes.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpense = state.expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
}

function monthKey(dateStr) { return dateStr.slice(0, 7); }
function currentMonthKey() {
  const now = new Date();
  return now.toISOString().slice(0, 7);
}

/* ---------------------- 4. TOAST / MODAL / RIPPLE UI ---------------------- */
function showToast(message, type = 'success') {
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type]}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

function attachRipple(el) {
  el.addEventListener('click', function(e) {
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
}

function initRipples() {
  document.querySelectorAll('.btn, .icon-btn, .nav-item, .fab, .fab-option').forEach(attachRipple);
}

function openModal(id) { document.getElementById(id).classList.add('show'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); }

/* ---------------------- 5. RENDERING ---------------------- */
function renderAll() {
  renderStats();
  renderRecentTransactions();
  renderTopCategories();
  renderTable();
  renderCategoryFilterOptions();
  renderBudgetPage();
  renderCalendar();
  renderCharts();
  saveState();
}

function renderStats() {
  const { totalIncome, totalExpense, balance } = getTotals();
  document.getElementById('statBalance').textContent = formatMoney(balance);
  document.getElementById('statIncome').textContent = formatMoney(totalIncome);
  document.getElementById('statExpense').textContent = formatMoney(totalExpense);

  const trendEl = document.getElementById('statBalanceTrend');
  trendEl.innerHTML = balance >= 0 ?
    '<i class="fa-solid fa-arrow-trend-up"></i> healthy balance' :
    '<i class="fa-solid fa-arrow-trend-down"></i> spending more than earning';
  trendEl.style.color = balance >= 0 ? 'var(--accent-income)' : 'var(--accent-expense)';

  const key = currentMonthKey();
  const budget = state.budgets[key];
  const monthExpense = state.expenses.filter(e => monthKey(e.date) === key)
    .reduce((s, e) => s + Number(e.amount), 0);
  const pct = budget ? Math.min(100, Math.round((monthExpense / budget) * 100)) : 0;
  document.getElementById('statBudgetPct').textContent = budget ? pct + '%' : 'No budget set';
  document.getElementById('statBudgetBar').style.width = pct + '%';
}

function renderRecentTransactions() {
  const list = getAllTransactions().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
  const container = document.getElementById('recentTransactions');
  if (list.length === 0) {
    container.innerHTML = '<div class="empty-mini">No transactions yet. Add your first one!</div>';
    return;
  }
  container.innerHTML = list.map(t => {
    const isExpense = t.type === 'expense';
    const meta = isExpense ? CATEGORY_META[t.category] : null;
    const bg = isExpense ? meta.color : 'var(--accent-income)';
    const icon = isExpense ? meta.icon : (SOURCE_META[t.source] || '💰');
    const label = isExpense ? t.category : t.source;
    return `
      <div class="recent-item">
        <div class="recent-badge" style="background:${bg}">${icon}</div>
        <div class="recent-info">
          <strong>${label}</strong>
          <span>${formatDate(t.date)} ${t.description ? '· ' + escapeHtml(t.description) : ''}</span>
        </div>
        <div class="recent-amount ${t.type}">${isExpense ? '-' : '+'}${formatMoney(t.amount)}</div>
      </div>`;
  }).join('');
}

function renderTopCategories() {
  const totals = {};
  state.expenses.forEach(e => { totals[e.category] = (totals[e.category] || 0) + Number(e.amount); });
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const container = document.getElementById('topCategories');
  if (entries.length === 0) {
    container.innerHTML = '<div class="empty-mini">No expenses logged yet.</div>';
    return;
  }
  const max = entries[0][1];
  container.innerHTML = entries.map(([cat, amt]) => {
    const meta = CATEGORY_META[cat] || CATEGORY_META.Other;
    const width = Math.max(6, Math.round((amt / max) * 100));
    return `
      <div class="top-cat-item">
        <span class="cat-name">${meta.icon} ${cat}</span>
        <div class="top-cat-bar-track"><div class="top-cat-bar-fill" style="width:${width}%; background:${meta.color}"></div></div>
        <span class="cat-amt">${formatMoney(amt)}</span>
      </div>`;
  }).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function renderCategoryFilterOptions() {
  const select = document.getElementById('filterCategory');
  const current = select.value;
  const cats = Object.keys(CATEGORY_META);
  select.innerHTML = '<option value="all">All Categories</option>' +
    cats.map(c => `<option value="${c}">${CATEGORY_META[c].icon} ${c}</option>`).join('');
  select.value = current || 'all';
}

function getFilteredSortedTransactions() {
  const search = (document.getElementById('tableSearch').value || '').toLowerCase();
  const type = document.getElementById('filterType').value;
  const cat = document.getElementById('filterCategory').value;
  const month = document.getElementById('filterMonth').value;
  const sortBy = document.getElementById('sortBy').value;

  let list = getAllTransactions();

  if (type !== 'all') list = list.filter(t => t.type === type);
  if (cat !== 'all') list = list.filter(t => (t.type === 'expense' ? t.category : t.source) === cat);
  if (month) list = list.filter(t => monthKey(t.date) === month);
  if (search) {
    list = list.filter(t => {
      const haystack = [
        t.description, t.type === 'expense' ? t.category : t.source,
        t.type === 'expense' ? t.paymentMethod : '', t.amount, t.date,
      ].join(' ').toLowerCase();
      return haystack.includes(search);
    });
  }

  list.sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount-desc') return Number(b.amount) - Number(a.amount);
    if (sortBy === 'amount-asc') return Number(a.amount) - Number(b.amount);
    return 0;
  });

  return list;
}

function renderTable() {
  const list = getFilteredSortedTransactions();
  const tbody = document.getElementById('transactionsTableBody');
  const emptyState = document.getElementById('emptyState');

  if (list.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  tbody.innerHTML = list.map(t => {
    const isExpense = t.type === 'expense';
    const meta = isExpense ? (CATEGORY_META[t.category] || CATEGORY_META.Other) : null;
    const label = isExpense ? t.category : t.source;
    const icon = isExpense ? meta.icon : (SOURCE_META[t.source] || '💰');
    const color = isExpense ? meta.color : 'var(--accent-income)';
    return `
      <tr>
        <td>${formatDate(t.date)}</td>
        <td><span class="type-pill ${t.type}">${isExpense ? 'Expense' : 'Income'}</span></td>
        <td><span class="badge" style="background:${color}">${icon} ${label}</span></td>
        <td>${escapeHtml(t.description) || '<span style="opacity:.5">—</span>'}</td>
        <td>${isExpense ? t.paymentMethod : '<span style="opacity:.5">—</span>'}</td>
        <td class="amount-cell ${t.type}">${isExpense ? '-' : '+'}${formatMoney(t.amount)}</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" title="View" onclick="viewTransaction('${t.id}','${t.type}')"><i class="fa-solid fa-eye"></i></button>
            <button class="icon-btn" title="Edit" onclick="openEditModal('${t.id}','${t.type}')"><i class="fa-solid fa-pen"></i></button>
            <button class="icon-btn" title="Delete" onclick="requestDelete('${t.id}','${t.type}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>`;
  }).join('');

  initRipples();
}

function renderBudgetPage() {
  const container = document.getElementById('budgetProgressList');
  const months = Object.keys(state.budgets).sort().reverse();
  if (months.length === 0) {
    container.innerHTML = '<div class="empty-mini">No budgets set yet. Create one on the left.</div>';
    return;
  }
  container.innerHTML = months.map(m => {
    const budget = state.budgets[m];
    const spent = state.expenses.filter(e => monthKey(e.date) === m).reduce((s, e) => s + Number(e.amount), 0);
    const pct = Math.min(100, Math.round((spent / budget) * 100));
    const over = spent > budget;
    const label = new Date(m + '-01').toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    const color = over ? 'var(--accent-expense)' : (pct > 75 ? 'var(--accent-budget)' : 'var(--accent-income)');
    return `
      <div class="budget-item">
        <div class="budget-item-head"><span>${label}</span><span>${formatMoney(spent)} / ${formatMoney(budget)}</span></div>
        <div class="budget-track"><div class="budget-fill" style="width:${pct}%; background:${color}"></div></div>
        <div class="budget-sub">${over ? '⚠️ Over budget by ' + formatMoney(spent - budget) : pct + '% of budget used'}</div>
      </div>`;
  }).join('');
}

/* ---------------------- 6. CHARTS ---------------------- */
function chartTextColor() {
  return getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() || '#ccc';
}

function renderCharts() {
  renderIncomeExpenseChart('incomeExpenseChart');
  renderIncomeExpenseChart('incomeExpenseChart2');
  renderCategoryPie('categoryPieChart');
  renderCategoryPie('categoryPieChart2');
  renderMonthlyExpenseChart();
}

function renderIncomeExpenseChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const months = getLastNMonths(6);
  const incomeData = months.map(m => state.incomes.filter(i => monthKey(i.date) === m).reduce((s, i) => s + Number(i.amount), 0));
  const expenseData = months.map(m => state.expenses.filter(e => monthKey(e.date) === m).reduce((s, e) => s + Number(e.amount), 0));

  const key = canvasId === 'incomeExpenseChart' ? 'incomeExpense' : 'incomeExpense2';
  if (charts[key]) charts[key].destroy();

  charts[key] = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: months.map(monthLabel),
      datasets: [
        { label: 'Income', data: incomeData, backgroundColor: '#10b981', borderRadius: 8, maxBarThickness: 34 },
        { label: 'Expense', data: expenseData, backgroundColor: '#fb7185', borderRadius: 8, maxBarThickness: 34 },
      ],
    },
    options: chartBaseOptions(),
  });
}

function renderCategoryPie(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const totals = {};
  state.expenses.forEach(e => { totals[e.category] = (totals[e.category] || 0) + Number(e.amount); });
  const labels = Object.keys(totals);
  const data = Object.values(totals);
  const colors = labels.map(l => (CATEGORY_META[l] || CATEGORY_META.Other).color);

  const key = canvasId === 'categoryPieChart' ? 'categoryPie' : 'categoryPie2';
  if (charts[key]) charts[key].destroy();

  charts[key] = new Chart(canvas, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 3, borderColor: 'rgba(0,0,0,0)', hoverOffset: 10 }] },
    options: {
      responsive: true, cutout: '62%',
      plugins: { legend: { position: 'bottom', labels: { color: chartTextColor(), padding: 14, font: { family: 'Inter', size: 11 } } } },
    },
  });
  if (labels.length === 0) {
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.font = '13px Inter';
    ctx.fillStyle = chartTextColor();
    ctx.textAlign = 'center';
    ctx.fillText('No expense data yet', canvas.width / 2, canvas.height / 2);
    ctx.restore();
  }
}

function renderMonthlyExpenseChart() {
  const canvas = document.getElementById('monthlyExpenseChart');
  if (!canvas) return;
  const months = getLastNMonths(6);
  const data = months.map(m => state.expenses.filter(e => monthKey(e.date) === m).reduce((s, e) => s + Number(e.amount), 0));

  if (charts.monthlyExpense) charts.monthlyExpense.destroy();
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 260);
  gradient.addColorStop(0, 'rgba(124,58,237,0.45)');
  gradient.addColorStop(1, 'rgba(124,58,237,0.02)');

  charts.monthlyExpense = new Chart(canvas, {
    type: 'line',
    data: {
      labels: months.map(monthLabel),
      datasets: [{
        label: 'Expenses', data, borderColor: '#c026d3', backgroundColor: gradient,
        fill: true, tension: 0.4, pointBackgroundColor: '#c026d3', pointRadius: 5, pointHoverRadius: 7, borderWidth: 3,
      }],
    },
    options: chartBaseOptions(),
  });
}

function chartBaseOptions() {
  const textColor = chartTextColor();
  return {
    responsive: true,
    plugins: { legend: { labels: { color: textColor, font: { family: 'Inter', size: 11.5 } } } },
    scales: {
      x: { ticks: { color: textColor, font: { family: 'Inter', size: 11 } }, grid: { display: false } },
      y: { ticks: { color: textColor, font: { family: 'Inter', size: 11 } }, grid: { color: 'rgba(255,255,255,0.08)' } },
    },
  };
}

function getLastNMonths(n) {
  const arr = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    arr.push(d.toISOString().slice(0, 7));
  }
  return arr;
}

function monthLabel(ym) {
  return new Date(ym + '-01').toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
}

/* ---------------------- 7. CALENDAR ---------------------- */
function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  const label = document.getElementById('calLabel');
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  label.textContent = calendarCursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = new Date().toISOString().slice(0, 10);

  let html = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div class="cal-dow">${d}</div>`).join('');
  for (let i = 0; i < firstDay; i++) html += '<div class="cal-cell empty"></div>';

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayExpense = state.expenses.filter(e => e.date === dateStr).reduce((s, e) => s + Number(e.amount), 0);
    const dayIncome = state.incomes.filter(i => i.date === dateStr).reduce((s, i) => s + Number(i.amount), 0);
    const isToday = dateStr === todayStr ? 'today' : '';
    html += `
      <div class="cal-cell ${isToday}">
        <span class="cal-date">${day}</span>
        ${dayIncome ? `<span class="cal-amt income">+${formatMoney(dayIncome)}</span>` : ''}
        ${dayExpense ? `<span class="cal-amt expense">-${formatMoney(dayExpense)}</span>` : ''}
      </div>`;
  }
  grid.innerHTML = html;
}

/* ---------------------- 8. CRUD ACTIONS ---------------------- */
function viewTransaction(id, type) {
  const list = type === 'expense' ? state.expenses : state.incomes;
  const t = list.find(x => x.id === id);
  if (!t) return;
  const body = document.getElementById('viewModalBody');
  if (type === 'expense') {
    body.innerHTML = `
      <div class="view-row"><span>Type</span><span>Expense</span></div>
      <div class="view-row"><span>Date</span><span>${formatDate(t.date)}</span></div>
      <div class="view-row"><span>Amount</span><span>${formatMoney(t.amount)}</span></div>
      <div class="view-row"><span>Category</span><span>${CATEGORY_META[t.category]?.icon || ''} ${t.category}</span></div>
      <div class="view-row"><span>Payment Method</span><span>${t.paymentMethod}</span></div>
      <div class="view-row"><span>Description</span><span>${escapeHtml(t.description) || '—'}</span></div>`;
  } else {
    body.innerHTML = `
      <div class="view-row"><span>Type</span><span>Income</span></div>
      <div class="view-row"><span>Date</span><span>${formatDate(t.date)}</span></div>
      <div class="view-row"><span>Amount</span><span>${formatMoney(t.amount)}</span></div>
      <div class="view-row"><span>Source</span><span>${SOURCE_META[t.source] || ''} ${t.source}</span></div>
      <div class="view-row"><span>Description</span><span>${escapeHtml(t.description) || '—'}</span></div>`;
  }
  openModal('viewModalOverlay');
}

function openEditModal(id, type) {
  const list = type === 'expense' ? state.expenses : state.incomes;
  const t = list.find(x => x.id === id);
  if (!t) return;

  document.getElementById('editId').value = id;
  document.getElementById('editType').value = type;
  document.getElementById('editDate').value = t.date;
  document.getElementById('editDate').max = localToday();
  document.getElementById('editAmount').value = t.amount;
  document.getElementById('editDescription').value = t.description || '';
  document.getElementById('editModalTitle').innerHTML = type === 'expense' ?
    '<i class="fa-solid fa-pen"></i> Edit Expense' : '<i class="fa-solid fa-pen"></i> Edit Income';

  const categorySelect = document.getElementById('editCategory');
  const categoryLabel = document.getElementById('editCategoryLabel');
  const paymentWrap = document.getElementById('editPaymentWrap');

  if (type === 'expense') {
    categoryLabel.textContent = 'Category';
    categorySelect.innerHTML = Object.keys(CATEGORY_META).map(c => `<option value="${c}">${CATEGORY_META[c].icon} ${c}</option>`).join('');
    categorySelect.value = t.category;
    paymentWrap.style.display = 'flex';
    document.getElementById('editPayment').value = t.paymentMethod;
  } else {
    categoryLabel.textContent = 'Source';
    categorySelect.innerHTML = Object.keys(SOURCE_META).map(s => `<option value="${s}">${SOURCE_META[s]} ${s}</option>`).join('');
    categorySelect.value = t.source;
    paymentWrap.style.display = 'none';
  }
  openModal('editModalOverlay');
}

let pendingDelete = null;

function requestDelete(id, type) {
  pendingDelete = { id, type };
  openModal('confirmModalOverlay');
}

/* ---------------------- 9. EVENT WIRING ---------------------- */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  applySettingsToUI();
  initNavigation();
  initTopbarActions();
  initForms();
  initFilters();
  initModals();
  initFab();
  initCalendarNav();
  initExportImport();
  initRipples();
  renderAll();

  const today = localToday();
  ['expDate', 'incDate', 'editDate'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.max = today;
    el.setAttribute('max', today);
    ['focus', 'click', 'mousedown'].forEach(evt =>
      el.addEventListener(evt, () => { el.max = localToday(); })
    );
    ['input', 'change', 'blur'].forEach(evt =>
      el.addEventListener(evt, () => {
        if (isFutureDate(el.value)) {
          el.value = localToday();
          showToast('Future dates are not allowed', 'error');
        }
      })
    );
  });
  document.getElementById('expDate').value = today;
  document.getElementById('incDate').value = today;
  document.getElementById('budgetMonth').value = currentMonthKey();

  setTimeout(() => document.getElementById('loadingScreen').classList.add('hide'), 700);
});

function localToday() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function isFutureDate(value) {
  return !!value && value > localToday();
}

function applySettingsToUI() {
  document.documentElement.setAttribute('data-theme', state.settings.theme);
  document.body.classList.toggle('light-mode', !state.settings.darkMode);
  document.getElementById('themeSelect').value = state.settings.theme;
  document.getElementById('currencySelect').value = state.settings.currency;
  document.getElementById('modeToggle').innerHTML = state.settings.darkMode ?
    '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
}

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => goToPage(item.dataset.page));
  });
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => {
      goToPage(el.dataset.goto);
      if (el.dataset.focus === 'expense') document.getElementById('expAmount').focus();
      if (el.dataset.focus === 'income') document.getElementById('incAmount').focus();
    });
  });

  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('show');
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
}

const PAGE_TITLES = {
  dashboard: ['Dashboard', 'A clear view of where your money goes'],
  transactions: ['Transactions', 'Search, filter, and manage every entry'],
  add: ['Add Entry', 'Log a new expense or income'],
  analytics: ['Analytics', 'Trends and breakdowns over time'],
  budget: ['Budget', 'Set monthly limits and track progress'],
  calendar: ['Calendar', 'See your spending day by day'],
};

function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === pageId));
  const [title, subtitle] = PAGE_TITLES[pageId] || ['Wealthly', ''];
  document.getElementById('pageTitle').textContent = title;
  document.getElementById('pageSubtitle').textContent = subtitle;

  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('show');

  if (pageId === 'analytics' || pageId === 'dashboard') renderCharts();
  if (pageId === 'calendar') renderCalendar();
}

function initTopbarActions() {
  document.getElementById('quickSearch').addEventListener('input', (e) => {
    goToPage('transactions');
    document.getElementById('tableSearch').value = e.target.value;
    renderTable();
  });

  document.getElementById('currencySelect').addEventListener('change', (e) => {
    state.settings.currency = e.target.value;
    renderAll();
    showToast('Currency updated', 'info');
  });

  document.getElementById('themeSelect').addEventListener('change', (e) => {
    state.settings.theme = e.target.value;
    document.documentElement.setAttribute('data-theme', e.target.value);
    saveState();
    renderCharts();
    showToast('Theme switched to ' + e.target.options[e.target.selectedIndex].text, 'success');
  });

  document.getElementById('modeToggle').addEventListener('click', () => {
    state.settings.darkMode = !state.settings.darkMode;
    document.body.classList.toggle('light-mode', !state.settings.darkMode);
    document.getElementById('modeToggle').innerHTML = state.settings.darkMode ?
      '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    saveState();
    renderCharts();
  });
}

function initForms() {
  document.getElementById('expenseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('expAmount').value);
    if (!amount || amount <= 0) { showToast('Please enter a valid amount', 'error'); return; }
    const date = document.getElementById('expDate').value;
    if (isFutureDate(date)) { showToast('Future dates are not allowed', 'error'); return; }
    state.expenses.push({
      id: makeId(),
      date,
      amount,
      category: document.getElementById('expCategory').value,
      paymentMethod: document.getElementById('expPayment').value,
      description: document.getElementById('expDescription').value.trim(),
    });
    e.target.reset();
    document.getElementById('expDate').value = localToday();
    document.getElementById('expDate').max = localToday();
    renderAll();
    showToast('Expense added successfully', 'success');
  });

  document.getElementById('incomeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('incAmount').value);
    if (!amount || amount <= 0) { showToast('Please enter a valid amount', 'error'); return; }
    const date = document.getElementById('incDate').value;
    if (isFutureDate(date)) { showToast('Future dates are not allowed', 'error'); return; }
    state.incomes.push({
      id: makeId(),
      date,
      amount,
      source: document.getElementById('incSource').value,
      description: document.getElementById('incDescription').value.trim(),
    });
    e.target.reset();
    document.getElementById('incDate').value = localToday();
    document.getElementById('incDate').max = localToday();
    renderAll();
    showToast('Income added successfully', 'success');
  });

  document.getElementById('budgetForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const month = document.getElementById('budgetMonth').value;
    const amount = parseFloat(document.getElementById('budgetAmount').value);
    if (!month || !amount || amount <= 0) { showToast('Please fill in month and amount', 'error'); return; }
    state.budgets[month] = amount;
    renderAll();
    showToast('Budget saved for ' + monthLabel(month), 'success');
  });

  document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const type = document.getElementById('editType').value;
    const list = type === 'expense' ? state.expenses : state.incomes;
    const record = list.find(x => x.id === id);
    if (!record) return;

    const editedDate = document.getElementById('editDate').value;
    if (isFutureDate(editedDate)) { showToast('Future dates are not allowed', 'error'); return; }
    record.date = editedDate;
    record.amount = parseFloat(document.getElementById('editAmount').value);
    record.description = document.getElementById('editDescription').value.trim();
    if (type === 'expense') {
      record.category = document.getElementById('editCategory').value;
      record.paymentMethod = document.getElementById('editPayment').value;
    } else {
      record.source = document.getElementById('editCategory').value;
    }
    closeModal('editModalOverlay');
    renderAll();
    showToast('Transaction updated', 'success');
  });
}

function initFilters() {
  ['tableSearch', 'filterType', 'filterCategory', 'filterMonth', 'sortBy'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderTable);
    document.getElementById(id).addEventListener('change', renderTable);
  });
  document.getElementById('clearFiltersBtn').addEventListener('click', () => {
    document.getElementById('tableSearch').value = '';
    document.getElementById('filterType').value = 'all';
    document.getElementById('filterCategory').value = 'all';
    document.getElementById('filterMonth').value = '';
    document.getElementById('sortBy').value = 'date-desc';
    renderTable();
  });
}

function initModals() {
  document.getElementById('editModalClose').addEventListener('click', () => closeModal('editModalOverlay'));
  document.getElementById('editCancelBtn').addEventListener('click', () => closeModal('editModalOverlay'));
  document.getElementById('viewModalClose').addEventListener('click', () => closeModal('viewModalOverlay'));
  document.getElementById('cancelDeleteBtn').addEventListener('click', () => { closeModal('confirmModalOverlay');
    pendingDelete = null; });

  document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (!pendingDelete) return;
    const { id, type } = pendingDelete;
    if (type === 'expense') state.expenses = state.expenses.filter(x => x.id !== id);
    else state.incomes = state.incomes.filter(x => x.id !== id);
    pendingDelete = null;
    closeModal('confirmModalOverlay');
    renderAll();
    showToast('Transaction deleted', 'success');
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('show'); });
  });
}

function initFab() {
  const fab = document.getElementById('fabMain');
  const menu = document.getElementById('fabMenu');
  fab.addEventListener('click', () => {
    fab.classList.toggle('open');
    menu.classList.toggle('show');
  });
}

function initCalendarNav() {
  document.getElementById('calPrev').addEventListener('click', () => {
    calendarCursor.setMonth(calendarCursor.getMonth() - 1);
    renderCalendar();
  });
  document.getElementById('calNext').addEventListener('click', () => {
    calendarCursor.setMonth(calendarCursor.getMonth() + 1);
    renderCalendar();
  });
}

function initExportImport() {
  document.getElementById('monthlyPdfBtn').addEventListener('click', exportMonthlyPdf);
  document.getElementById('monthlyReportMonth').value = currentMonthKey();
}

function exportMonthlyPdf() {
  try {
    const month = document.getElementById('monthlyReportMonth').value || currentMonthKey();
    const monthTransactions = getAllTransactions()
      .filter(t => monthKey(t.date) === month)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (monthTransactions.length === 0) {
      showToast('No transactions found for ' + monthLabel(month), 'error');
      return;
    }

    const income = monthTransactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
    const expense = monthTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
    const balance = income - expense;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Wealthly — Monthly Report', 14, 18);
    doc.setFontSize(12);
    doc.setTextColor(90);
    doc.text(monthLabel(month), 14, 26);

    const boxY = 34,
      boxW = 58,
      boxH = 22,
      gap = 4;
    const summary = [
      { label: 'Total Income', value: formatMoney(income), color: [16, 185, 129] },
      { label: 'Total Expense', value: formatMoney(expense), color: [251, 113, 133] },
      { label: 'Net Balance', value: formatMoney(balance), color: balance >= 0 ? [56, 189, 248] : [239, 68, 68] },
    ];
    summary.forEach((box, i) => {
      const x = 14 + i * (boxW + gap);
      doc.setFillColor(...box.color);
      doc.roundedRect(x, boxY, boxW, boxH, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.text(box.label, x + 5, boxY + 8);
      doc.setFontSize(13);
      doc.text(box.value, x + 5, boxY + 17);
    });

    const rows = monthTransactions.map(t => [
      formatDate(t.date),
      t.type === 'expense' ? 'Expense' : 'Income',
      t.type === 'expense' ? t.category : t.source,
      t.description || '-',
      (t.type === 'expense' ? '-' : '+') + formatMoney(t.amount),
    ]);

    doc.autoTable({
      startY: boxY + boxH + 10,
      head: [
        ['Date', 'Type', 'Category/Source', 'Description', 'Amount']
      ],
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [124, 58, 237] },
    });

    doc.save(`wealthly-report-${month}.pdf`);
    showToast('Monthly PDF downloaded for ' + monthLabel(month), 'success');
  } catch (err) {
    console.error(err);
    showToast('Could not generate the monthly PDF', 'error');
  }
}