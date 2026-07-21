/* Journal app — the public learning record. Data comes from 00_META/app_feed via the compiler. */
(function () {
  var D = window.CCARJ || { journal: { progress: [], reviewDue: [], sessions: [], next: {} }, lessons: [], transcripts: [], notes: [], glossary: [] };
  var J = D.journal;
  var view = document.getElementById('view');
  var tabsEl = document.getElementById('tabs');
  var fmeta = document.getElementById('fmeta');

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function md(src) {
    if (!src) return '';
    if (!window.marked) return '<pre>' + esc(src) + '</pre>';
    var html = window.marked.parse(src, { mangle: false, headerIds: false });
    html = html.replace(/<table>/g, '<div class="tablewrap"><table>').replace(/<\/table>/g, '</table></div>');
    return html.replace(/<a href="(https?:[^"]+)"/g, '<a target="_blank" rel="noopener" href="$1"');
  }

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
    applyTheme(next); try { localStorage.setItem('ccarf-theme', next); } catch (e) {}
  });

  var TABS = [
    { k: 'journal', t: 'Journal' }, { k: 'lessons', t: 'Lessons' }, { k: 'transcripts', t: 'Transcripts' },
    { k: 'notes', t: 'Notes' }, { k: 'glossary', t: 'Glossary' }
  ];
  function renderTabs(active) {
    tabsEl.innerHTML = TABS.map(function (x) {
      return '<a href="#/' + x.k + '"' + (x.k === active ? ' class="active"' : '') + '>' + esc(x.t) + '</a>';
    }).join('') + '<a href="../study/" class="xlink">Study ↗</a>';
  }

  /* ---------- views ---------- */
  function journal() {
    var h = '<section><span class="eyebrow">Learning in public · updated ' + esc(J.updated || '') + '</span>'
      + '<h1>The next problem to solve</h1>'
      + '<p class="lede">' + esc(J.location || '') + ' · 🔥 ' + (J.streak || 0) + ' study days</p></section>';

    if (J.next && J.next.title) {
      h += '<section class="block"><div class="nextcard">'
        + '<div class="pqhead"><span class="chip w">' + esc(J.next.dom) + ' · ' + esc(J.next.ses) + '</span></div>'
        + '<h2 class="nexttitle">' + esc(J.next.title) + '</h2>'
        + '<p class="nextq">' + esc(J.next.problem) + '</p>'
        + (J.next.hint ? '<details class="ko"><summary>hint</summary><div class="kobody">' + esc(J.next.hint) + '</div></details>' : '')
        + '</div></section>';
    }

    if (J.progress.length) {
      var max = Math.max.apply(null, J.progress.map(function (p) { return p.target || 5; }));
      h += '<section class="block"><h2>Confidence by domain</h2><div class="rank">'
        + J.progress.map(function (p) {
          return '<div class="item"><div class="code">' + esc(p.code) + '</div>'
            + '<div class="barwrap"><div class="bar"><span style="width:' + Math.round((p.conf / max) * 100) + '%"></span></div>'
            + '<div class="name">' + esc(p.label) + '</div></div>'
            + '<div class="pct">' + p.conf + '/' + p.target + '</div></div>';
        }).join('') + '</div></section>';
    }

    if (J.reviewDue.length) {
      h += '<section class="block"><h2>Spaced review</h2><div class="duechips">'
        + J.reviewDue.map(function (r) {
          return '<span class="duechip">' + esc(r.item) + ' <b>' + esc(r.when) + '</b></span>';
        }).join('') + '</div></section>';
    }

    if (J.sessions.length) {
      h += '<section class="block"><h2>Session timeline</h2>';
      J.sessions.slice().reverse().forEach(function (s) {
        h += '<div class="pq"><div class="pqhead"><span class="chip">' + esc(s.label || '') + '</span>'
          + '<span class="chip ts">' + esc(s.date || '') + '</span>'
          + (s.mode ? '<span class="chip">' + esc(s.mode) + '</span>' : '') + '</div>'
          + (s.covered ? '<div class="pquestion">' + esc(s.covered) + '</div>' : '')
          + (s.insight ? '<div class="pexp"><b>Insight.</b> ' + esc(s.insight) + '</div>' : '')
          + (s.analogy ? '<div class="pexp"><b>Analogy.</b> ' + esc(s.analogy) + '</div>' : '')
          + (s.result ? '<div class="pexp"><b>Result.</b> ' + esc(s.result) + '</div>' : '')
          + '</div>';
      });
      h += '</section>';
    }
    return h;
  }

  function entryList(list, kind) {
    var title = kind === 'lessons' ? 'Lessons' : 'Transcripts';
    var lede = kind === 'lessons'
      ? 'What each session actually taught, distilled. One entry per interactive session, newest first.'
      : 'The raw turns of each interactive session — questions, answers, and corrections. '
        + 'Wrong answers are kept deliberately: they are where the concept finally landed.';
    var h = '<section><span class="eyebrow">' + list.length + ' entries</span><h1>' + title + '</h1>'
      + '<p class="lede">' + lede + '</p></section>';
    if (!list.length) return h + '<section class="block"><p class="m">Nothing recorded yet.</p></section>';
    h += '<section class="block"><div class="duechips">' + list.map(function (e) {
      return '<a class="duechip" href="#/' + kind + '/' + esc(e.id) + '">' + esc(e.dom) + '-' + esc(e.ses) + '</a>';
    }).join('') + '</div></section>';
    list.forEach(function (e) {
      h += '<section class="block mdblock" id="e-' + esc(e.id) + '">'
        + '<div class="pqhead"><span class="chip w">' + esc(e.dom) + ' · ' + esc(e.ses) + '</span>'
        + '<span class="chip ts">' + esc(e.date) + '</span></div>'
        + '<h2>' + esc(e.title) + '</h2>'
        + (e.goal ? '<p class="lede">' + esc(e.goal) + '</p>' : '')
        + (e.note ? '<p class="srcnote">' + esc(e.note) + '</p>' : '')
        + md(e.body) + '</section>';
    });
    return h;
  }

  function notes(which) {
    var list = D.notes || [];
    var h = '<section><span class="eyebrow">Personal domain notes · superseded gradually by Study</span>'
      + '<h1>Notes</h1>'
      + '<p class="lede">Domain-by-domain notes written while studying — key concepts, easily-confused pairs, '
      + 'judgment points, traps, and a hardware-verification lens on each. For the authoritative, guide-traced '
      + 'version, see <a href="../study/">Study</a>.</p></section>';
    h += '<section class="block"><div class="duechips">' + list.map(function (n) {
      return '<a class="duechip" href="#/notes/' + esc(n.dom || 'resources') + '">' + esc(n.dom || 'Resources') + '</a>';
    }).join('') + '</div></section>';
    var show = which ? list.filter(function (n) { return (n.dom || 'resources') === which; }) : list;
    if (!show.length) show = list;
    show.forEach(function (n) {
      h += '<section class="block mdblock"><h2>' + esc(n.title) + '</h2>'
        + (n.weight ? '<div class="pqhead"><span class="chip w">' + n.weight + '%</span>'
          + '<span class="chip ts">' + n.ts + ' TS</span></div>' : '')
        + md(n.body) + '</section>';
    });
    return h;
  }

  function glossary() {
    var G = D.glossary || [];
    var groups = [], byGroup = {};
    G.forEach(function (t) {
      if (!byGroup[t.group]) { byGroup[t.group] = []; groups.push(t.group); }
      byGroup[t.group].push(t);
    });
    var h = '<section><span class="eyebrow">Recall drill</span><h1>Glossary</h1>'
      + '<p class="lede">Every term covered so far, with a plain-English definition. Each card shows the '
      + '<b>definition</b> — recall the <b>term</b> yourself, then tap to reveal. ' + G.length + ' terms.</p></section>';
    if (!G.length) return h + '<section class="block"><p class="m">No terms yet.</p></section>';
    h += '<section class="block"><h2>Index</h2><div class="duechips">'
      + G.map(function (t) { return '<span class="duechip">' + esc(t.term) + ' <b>' + esc(t.dom) + '</b></span>'; }).join('')
      + '</div></section>';
    groups.forEach(function (g) {
      h += '<section class="block"><h2>' + esc(g) + '</h2>' + byGroup[g].map(function (t) {
        return '<details class="q"><summary>' + esc(t.def) + '</summary><div class="ans"><b>' + esc(t.term) + '</b> · ' + esc(t.dom)
          + (t.anchor ? ' &nbsp;<span class="m">🔧 ' + esc(t.anchor) + '</span>' : '') + '</div></details>';
      }).join('') + '</section>';
    });
    return h;
  }

  function route() {
    var hash = location.hash || '#/journal';
    var parts = hash.replace('#/', '').split('/');
    var key = parts[0], arg = parts.slice(1).join('/') || null;
    var html;
    if (key === 'lessons') html = entryList(D.lessons || [], 'lessons');
    else if (key === 'transcripts') html = entryList(D.transcripts || [], 'transcripts');
    else if (key === 'notes') html = notes(arg);
    else if (key === 'glossary') html = glossary();
    else { key = 'journal'; html = journal(); }
    view.innerHTML = html;
    renderTabs(key);
    fmeta.innerHTML = 'Generated from the study workspace · ' + (D.lessons || []).length + ' lessons · '
      + (D.transcripts || []).length + ' transcripts · ' + (D.glossary || []).length + ' terms · updated ' + esc(J.updated || '—');
    if (arg && (key === 'lessons' || key === 'transcripts')) {
      var el = document.getElementById('e-' + arg);
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
    document.title = TABS.filter(function (t) { return t.k === key; }).map(function (t) { return t.t; })[0] + ' — CCAR-F Journal';
  }
  window.addEventListener('hashchange', route);
  route();
})();
