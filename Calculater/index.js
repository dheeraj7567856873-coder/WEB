// ── State ──────────────────────────────────────────────────────────────────
let display   = '';
let stored    = null;
let pendingOp = null;
let justDone  = false;

// ── DOM References ─────────────────────────────────────────────────────────
const numEl  = document.getElementById('num');
const exprEl = document.getElementById('expr');
const dispEl = document.getElementById('disp');
const acBtn  = document.getElementById('ac');

const opIds = { '+': 'oa', '-': 'os', '*': 'om', '/': 'od' };

// ── Format Helpers ─────────────────────────────────────────────────────────
function fmt(n) {
  if (!isFinite(n)) return 'Error';
  let s = parseFloat(n.toPrecision(10)).toString();
  if (s.includes('e')) return s;
  let [int, dec] = s.split('.');
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dec !== undefined ? int + '.' + dec : int;
}

function sym(op) {
  return { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] || op;
}

// ── Render Display ─────────────────────────────────────────────────────────
function render(val, expr) {
  numEl.classList.remove('md', 'sm');
  const raw = String(val).replace(/[,\-]/g, '');
  if (raw.length > 11) numEl.classList.add('sm');
  else if (raw.length > 8) numEl.classList.add('md');
  numEl.textContent  = val;
  exprEl.textContent = expr || '';
}

function showCurrent() {
  const expr = (pendingOp && stored !== null)
    ? fmt(stored) + ' ' + sym(pendingOp)
    : '';
  render(display || '0', expr);
}

// ── Operator Highlight ─────────────────────────────────────────────────────
function litOp(op) {
  Object.values(opIds).forEach(id => {
    document.getElementById(id).classList.remove('lit');
  });
  if (op && opIds[op]) {
    document.getElementById(opIds[op]).classList.add('lit');
  }
}

// ── Core Calculation ───────────────────────────────────────────────────────
function calculate(a, op, b) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? Infinity : a / b;
  }
}

// ── Button Handlers ────────────────────────────────────────────────────────
function pressNum(d) {
  acBtn.textContent = 'C';
  if (justDone) {
    display = d;
    stored = null;
    pendingOp = null;
    justDone = false;
    litOp(null);
    showCurrent();
    return;
  }
  if (display.replace(/\D/g, '').length >= 12) return;
  display = (display === '0' || display === '') ? d : display + d;
  showCurrent();
}

function pressDot() {
  acBtn.textContent = 'C';
  if (justDone) {
    display = '0.';
    stored = null;
    pendingOp = null;
    justDone = false;
    litOp(null);
    showCurrent();
    return;
  }
  if (display === '') display = '0.';
  else if (!display.includes('.')) display += '.';
  showCurrent();
}

function pressOp(op) {
  justDone = false;
  const cur = display === ''
    ? (stored !== null ? stored : 0)
    : parseFloat(display);

  if (pendingOp && display !== '') {
    const result = calculate(stored, pendingOp, cur);
    if (!isFinite(result)) { doError(); return; }
    stored = result;
  } else {
    stored = cur;
  }

  pendingOp = op;
  display = '';
  litOp(op);
  render(fmt(stored), fmt(stored) + ' ' + sym(op));
}

function pressEq() {
  if (pendingOp === null || stored === null) return;
  const rhs    = display === '' ? stored : parseFloat(display);
  const result = calculate(stored, pendingOp, rhs);
  if (!isFinite(result)) { doError(); return; }

  const expr = fmt(stored) + ' ' + sym(pendingOp) + ' ' + fmt(rhs) + ' =';
  stored    = null;
  pendingOp = null;
  display   = parseFloat(result.toPrecision(10)).toString();
  justDone  = true;

  litOp(null);
  dispEl.classList.remove('flash');
  void dispEl.offsetWidth;
  dispEl.classList.add('flash');
  render(fmt(parseFloat(display)), expr);
  acBtn.textContent = 'AC';
}

function pressAC() {
  if (acBtn.textContent === 'C' && display !== '') {
    display = '';
    acBtn.textContent = 'AC';
    showCurrent();
    return;
  }
  display   = '';
  stored    = null;
  pendingOp = null;
  justDone  = false;
  acBtn.textContent = 'AC';
  litOp(null);
  render('0', '');
}

function pressSign() {
  if (!display || display === '0') return;
  display = display.startsWith('-') ? display.slice(1) : '-' + display;
  showCurrent();
}

function pressPct() {
  if (!display) return;
  const val = parseFloat(display) / 100;
  display = parseFloat(val.toPrecision(10)).toString();
  showCurrent();
}

function doError() {
  display   = '';
  stored    = null;
  pendingOp = null;
  justDone  = false;
  litOp(null);
  dispEl.classList.remove('shake');
  void dispEl.offsetWidth;
  dispEl.classList.add('shake');
  render('Error', '');
}

// ── Keyboard Support ───────────────────────────────────────────────────────
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;

  if ('0123456789'.includes(k))        { pressNum(k);  return; }
  if (k === '.')                        { pressDot();   return; }
  if (k === '+')                        { pressOp('+'); return; }
  if (k === '-')                        { pressOp('-'); return; }
  if (k === '*')                        { pressOp('*'); return; }
  if (k === '/')    { e.preventDefault(); pressOp('/'); return; }
  if (k === '%')                        { pressPct();   return; }
  if (k === 'Enter' || k === '=')       { pressEq();    return; }
  if (k === 'Escape')                   { pressAC();    return; }

  if (k === 'Backspace') {
    if (display.length > 1) display = display.slice(0, -1);
    else display = '';
    acBtn.textContent = display ? 'C' : 'AC';
    showCurrent();
  }
});

// ── Init ───────────────────────────────────────────────────────────────────
render('0', '');