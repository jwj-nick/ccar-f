/* Study app — router + chrome. Content rendering lives in guide.js. */
(function () {
  var GU = window.CCARF_GUIDE;
  var view = document.getElementById('view');
  var tabsEl = document.getElementById('tabs');
  var fmeta = document.getElementById('fmeta');
  var CT = window.CCAR_CONTENT || {};
  var PR = (window.CCAR_PRACTICE && window.CCAR_PRACTICE.items) || [];

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  /* ---------- theme ---------- */
  function applyTheme(t) {
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
  }
  try { var st = localStorage.getItem('ccarf-theme'); if (st) applyTheme(st); } catch (e) {}
  document.getElementById('themeBtn').addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var mqDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var next = cur ? (cur === 'dark' ? 'light' : 'dark') : (mqDark ? 'light' : 'dark');
    applyTheme(next);
    try { localStorage.setItem('ccarf-theme', next); } catch (e) {}
    if (GU) { document.querySelectorAll('pre.mermaid[data-processed]').forEach(function (n) { n.remove(); }); route(); }
  });

  var TABS = [
    { h: '#/guide', t: 'Guide' },
    { h: '#/basic/D1', t: 'Basic' },
    { h: '#/deep/D1', t: 'Deep' },
    { h: '#/practice/D1', t: 'Practice' },
    { h: '#/exam-sim', t: 'Exam Sim' }
  ];
  function renderTabs(active) {
    tabsEl.innerHTML = TABS.map(function (x) {
      return '<a href="' + x.h + '"' + (x.h.split('/')[1] === active ? ' class="active"' : '') + '>' + esc(x.t) + '</a>';
    }).join('') + '<a href="../journal/" class="xlink">Journal ↗</a>';
  }

  function route() {
    var hash = location.hash || '#/guide';
    var parts = hash.replace('#/', '').split('/');
    var key = parts[0], arg = parts[1] || null;
    if (!GU || GU.KINDS.indexOf(key) < 0) { key = 'guide'; arg = null; }
    view.innerHTML = GU ? GU.study(key, arg)
      : '<section><h1>Content not loaded</h1><p class="m">The compiled data files are missing.</p></section>';
    renderTabs(key);
    var ts = new Set([].concat(CT.basic || [], CT.deep || [], PR).flatMap(function (x) { return x.linked_ts || []; }));
    fmeta.innerHTML = 'Compiled from markdown · ' + ts.size + '/30 task statements have material · '
      + PR.length + ' practice item(s) · source-verified only';
    if (GU.runMermaid) GU.runMermaid();
    window.scrollTo(0, 0);
    document.title = (key === 'guide' ? 'Study' : key.replace('-', ' ') + (arg ? ' ' + arg : '')) + ' — CCAR-F';
  }
  window.addEventListener('hashchange', route);
  route();
})();
