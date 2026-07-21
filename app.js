/* CCAR-F Study — router + render. Vanilla, no dependencies. */
(function () {
  var C = window.CCARF;
  var J = window.CCARF_JOURNAL;
  var L = window.CCARF_LESSONS;
  var T = window.CCARF_TRANSCRIPTS;
  var G = window.CCARF_GLOSSARY;
  var view = document.getElementById('view');
  var tabsEl = document.getElementById('tabs');
  var fmeta = document.getElementById('fmeta');

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function byId(id) { for (var i = 0; i < C.DOMAINS.length; i++) if (C.DOMAINS[i].id === id) return C.DOMAINS[i]; return null; }
  function domainsByWeight() { return C.DOMAINS.slice().sort(function (a, b) { return b.weight - a.weight; }); }
  function domainsByOrder() { return C.DOMAINS.slice().sort(function (a, b) { return a.order - b.order; }); }
  function confChip(n) { return '<span class="chip conf' + (n >= 4 ? ' hi' : '') + '">conf ' + n + '/5</span>'; }

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

  /* ---------- tabs ---------- */
  var TABS = [{ h: '#/guide', t: 'Guide' }, { h: '#/practice', t: 'Practice' }, { h: '#/overview', t: 'Overview' }, { h: '#/journal', t: 'Journal' }, { h: '#/lessons', t: 'Lessons' }, { h: '#/transcripts', t: 'Transcripts' }, { h: '#/glossary', t: 'Glossary' }]
    .concat(C.DOMAINS.map(function (d) { return { h: '#/' + d.id, t: d.code }; }))
    .concat([{ h: '#/resources', t: 'Resources' }]);
  function renderTabs(active) {
    tabsEl.innerHTML = TABS.map(function (x) {
      return '<a href="' + x.h + '"' + (x.h === active ? ' class="active"' : '') + '>' + esc(x.t) + '</a>';
    }).join('');
  }

  /* ---------- partials ---------- */
  function facts() {
    return '<div class="facts">' + C.META.exam.map(function (f) {
      return '<div class="fact"><div class="v">' + esc(f.v) + '</div><div class="l">' + esc(f.l) + '</div></div>';
    }).join('') + '</div>';
  }
  function weighting(link) {
    var max = domainsByWeight()[0].weight;
    return '<div class="rank">' + domainsByWeight().map(function (d) {
      var w = Math.round(d.weight / max * 100);
      var inner = '<div class="code">' + d.code + '</div><div class="barwrap"><div class="bar"><span style="width:' + w + '%"></span></div>'
        + '<div class="name">' + esc(d.name) + ' · ' + d.ts + ' TS</div></div><div class="pct">' + d.weight + '%</div>';
      return link ? '<a class="item" href="#/' + d.id + '">' + inner + '</a>' : '<div class="item">' + inner + '</div>';
    }).join('') + '</div>';
  }
  function pathBlock() {
    return '<div class="path">' + C.PATH.map(function (p) {
      return '<div class="pstep"><div class="pnum">' + esc(p.n) + '</div>'
        + '<div class="pttl"><b>' + esc(p.t) + '</b><span class="free">FREE</span><span class="m">' + esc(p.d) + '</span></div>'
        + '<div class="ptag">' + esc(p.tag) + '</div></div>';
    }).join('') + '</div>'
      + '<p class="sub" style="margin-top:10px">＋ optional: Claude Code training · Bedrock/Vertex, etc. Confirm exact course names and order on the <a href="https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request" target="_blank" rel="noopener">official certification page</a>.</p>';
  }
  function loopBlock() {
    return '<div class="loop">' + C.LOOP.map(function (l) {
      return '<div class="lstep"><div class="ln">' + esc(l.n) + '</div><div class="lt">' + esc(l.t) + '</div><div class="ld">' + esc(l.d) + '</div></div>';
    }).join('') + '</div>';
  }
  function scheduleBlock() {
    return '<div class="track-scroll"><div class="track">' + C.SCHEDULE.map(function (w) {
      return '<div class="wk' + (w.exam ? ' exam' : '') + '"><div class="n">' + esc(w.n) + '</div><div class="d">' + esc(w.d) + '</div><div class="r">' + esc(w.r) + '</div></div>';
    }).join('') + '</div></div>';
  }
  function scenariosBlock() {
    return '<div class="scnlist">' + C.SCENARIOS.map(function (s) {
      return '<div class="scnitem"><div class="st">' + esc(s.t) + '</div><div class="sd">' + esc(s.d) + '</div><div class="sm">' + esc(s.slug) + ' · ' + esc(s.dom) + '</div></div>';
    }).join('') + '</div>';
  }
  function libraryBlock() {
    return '<div class="library">' + C.LIBRARY.map(function (l) {
      var host = l.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      return '<div class="lib"><div class="lh"><span class="lt">' + esc(l.t) + '</span><span class="tag">' + esc(l.tag) + '</span></div>'
        + '<div class="ld">' + esc(l.d) + '</div><a class="link" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(host) + '</a></div>';
    }).join('') + '</div>';
  }
  function dcardsBlock() {
    return '<div class="dcards">' + domainsByWeight().map(function (d) {
      return '<a class="dcard" href="#/' + d.id + '"><div class="r1"><span class="cd">' + d.code + '</span><span class="nm">' + esc(d.name) + '</span><span class="ko">' + esc(d.ko) + '</span></div>'
        + '<div class="tl">' + esc(d.tagline) + '</div>'
        + '<div class="mini"><span class="chip w">' + d.weight + '%</span><span class="chip ts">' + d.ts + ' TS</span>' + confChip(d.conf) + '</div></a>';
    }).join('') + '</div>';
  }

  /* ---------- views ---------- */
  function overview() {
    return '<section>'
      + '<span class="eyebrow">Claude Certified Architect · Foundations</span>'
      + '<h1>CCAR-F Study Atlas</h1>'
      + '<p class="lede">For each of the 5 domains: <b>what to study</b> · <b>what to practice</b> · <b>which official & free materials to dig into</b>. ' + esc(C.META.note) + '</p>'
      + facts()
      + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Weighting</span><h2>Where to spend your time</h2>'
      + '<p class="sub">Ordered by weight. Tap a row for the domain detail.</p></div>' + weighting(true) + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Domains</span><h2>Domains — study · practice · resources</h2></div>' + dcardsBlock() + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Official · Anthropic Academy</span><h2>Official learning path (free)</h2>'
      + '<p class="sub">Anthropic\'s recommended course order. The exam covers Claude Code · Agent SDK · Claude API · MCP.</p></div>' + pathBlock() + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Method</span><h2>Study loop — materials + practice together</h2>'
      + '<p class="sub">Run these 6 steps each domain. Don\'t rely on one source — layer course, docs, field posts, practice, and questions to hit the same idea from several angles.</p></div>' + loopBlock() + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Scenarios</span><h2>6 scenarios (4 drawn at random)</h2>'
      + '<p class="sub">Based on real Anthropic customer deployments. Every scenario crosses multiple domains.</p></div>' + scenariosBlock() + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Plan · D-70</span><h2>10-week path — Jul 12 → exam ~Sep 20</h2></div>' + scheduleBlock() + '</section>';
  }

  function domain(d) {
    var ob = domainsByOrder(), idx = -1;
    for (var i = 0; i < ob.length; i++) if (ob[i].id === d.id) idx = i;
    var prev = idx > 0 ? ob[idx - 1] : null, next = idx < ob.length - 1 ? ob[idx + 1] : null;

    var h = '<a class="backlink" href="#/overview">← Overview</a>'
      + '<div class="dhead"><div class="dcode">' + d.code + '</div><div class="dt">'
      + '<h1>' + esc(d.name) + ' <span class="ko">／ ' + esc(d.ko) + '</span></h1>'
      + '<div class="es">' + esc(d.essence) + '</div></div>'
      + '<div class="metaline"><span class="chip w">' + d.weight + '%</span><span class="chip ts">' + d.ts + ' TS</span>' + confChip(d.conf) + '</div></div>';

    h += '<div class="block"><h2>Key concepts</h2><div class="concepts">' + d.concepts.map(function (c) {
      return '<div class="concept"><div class="t">' + esc(c.t) + '</div><div class="d">' + esc(c.d) + '</div></div>';
    }).join('') + '</div></div>';

    h += '<div class="block"><h2>Key terms · easily confused</h2><div class="terms">' + d.terms.map(function (t) {
      var pair = t.b ? (esc(t.a) + '<span class="vs">vs</span>' + esc(t.b)) : esc(t.a);
      return '<div class="term"><div class="pair">' + pair + '</div><div class="why">' + esc(t.why) + '</div></div>';
    }).join('') + '</div></div>';

    h += '<div class="twocol" style="margin-top:34px">'
      + '<div class="block wn" style="margin-top:0"><h2>Exam judgment points</h2><ul class="plain">' + d.judgments.map(function (j) { return '<li>' + esc(j) + '</li>'; }).join('') + '</ul></div>'
      + '<div class="block wn" style="margin-top:0"><h2>Common wrong-answer traps</h2><ul class="plain wn">' + d.traps.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>'
      + '</div>';

    h += '<div class="block"><h2>Worked mini-scenario</h2><div class="scnbox">'
      + '<div class="row"><div class="k">Situation</div><div class="v">' + esc(d.scenario.s) + '</div></div>'
      + '<div class="row"><div class="k w">Question</div><div class="v">' + esc(d.scenario.q) + '</div></div>'
      + '<div class="row"><div class="k a">Answer</div><div class="v">' + esc(d.scenario.a) + '</div></div>'
      + '<div class="row"><div class="k">Why</div><div class="v">' + esc(d.scenario.w) + '</div></div>'
      + '</div></div>';

    h += '<div class="block"><h2>Self-check</h2>' + d.quiz.map(function (q) {
      return '<details class="q"><summary>' + esc(q.q) + '</summary><div class="ans">' + esc(q.a) + '</div></details>';
    }).join('') + '</div>';

    h += '<div class="twocol" style="margin-top:34px">'
      + '<div class="block" style="margin-top:0"><h2>Study — theory</h2><ul class="plain">' + d.study.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>'
      + '<div class="block g" style="margin-top:0"><h2>Practice — hands-on</h2><ul class="plain g">' + d.practice.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></div>'
      + '</div>';

    h += '<div class="block d"><h2>Resources</h2><div class="res">'
      + resGroup('c-course', 'Official courses · Academy', d.res.course)
      + resGroup('c-doc', 'Official docs · posts', d.res.docs)
      + resGroup('c-free', 'Free prep materials', d.res.free)
      + '</div></div>';

    h += '<div class="block"><div class="lensbox"><b>Nick\'s lens</b>' + esc(d.lens) + '</div>'
      + '<p class="sub" style="margin-top:12px"><b style="color:var(--ink-soft)">Related scenarios:</b> ' + esc(d.scenarios) + '</p></div>';

    h += '<div class="dnav">'
      + (prev ? '<a href="#/' + prev.id + '">← ' + prev.code + ' ' + esc(prev.ko) + '</a>' : '<span></span>')
      + (next ? '<a href="#/' + next.id + '">' + next.code + ' ' + esc(next.ko) + ' →</a>' : '<span></span>')
      + '</div>';
    return h;
  }
  function resGroup(cls, label, items) {
    return '<div class="rgrp"><div class="rlab"><span class="dot ' + cls + '"></span>' + esc(label) + '</div><ul class="rlist">'
      + items.map(function (r) {
        return '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.t) + '</a>' + (r.note ? '<span class="m">' + esc(r.note) + '</span>' : '') + '</li>';
      }).join('') + '</ul></div>';
  }

  function resources() {
    return '<section><span class="eyebrow">Resource Library</span><h1>Resources</h1>'
      + '<p class="lede">Official (free courses & docs) as the primary source; third-party prep for exam feel and practice questions.</p></section>'
      + '<section><div class="sec-head"><span class="eyebrow">Official Path</span><h2>Official learning path (free)</h2></div>' + pathBlock() + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Library</span><h2>Everything in one place</h2></div>' + libraryBlock()
      + '<div class="callout">⚠️ Third-party materials (WikiDocs · GitHub · practice sets) are for <b>exam feel and wrong-answer patterns</b>. Always cross-check facts against official sources (docs · Academy). Task-statement wording is confirmed against the official exam guide.</div></section>';
  }

  function journal() {
    if (!J) return '<section><h1>Journal</h1><p class="lede">No records yet.</p></section>';
    var maxT = 5;
    var h = '<section><span class="eyebrow">Study Journal</span><h1>Journal</h1>'
      + '<p class="lede">What we studied and <b>the next problem to solve</b>. Updated each session · 🔥 streak ' + J.streak + ' days · ' + esc(J.location) + '</p></section>';

    if (J.next) {
      h += '<section><div class="nextcard"><div class="nl">▶ Next problem · ' + esc(J.next.dom) + '-' + esc(J.next.ses) + '</div>'
        + '<div class="nt">' + esc(J.next.title) + '</div><div class="np">' + esc(J.next.problem) + '</div>'
        + (J.next.hint ? '<div class="nh"><b>Options</b> · ' + esc(J.next.hint) + '</div>' : '') + '</div></section>';
    }

    h += '<section><div class="sec-head"><span class="eyebrow">Progress</span><h2>Progress (studied)</h2></div><div class="jprog">'
      + J.progress.map(function (p) {
        var w = Math.round(p.conf / maxT * 100);
        return '<div class="jp"><div class="c">' + esc(p.code) + '</div><div><div class="nm">' + esc(p.ko) + '</div>'
          + '<div class="bar" style="margin-top:5px"><span style="width:' + w + '%"></span></div></div>'
          + '<div class="cf">' + p.conf + '/' + p.target + '</div></div>';
      }).join('') + '</div></section>';

    if (J.reviewDue && J.reviewDue.length) {
      h += '<section><div class="sec-head"><span class="eyebrow">Spaced Review</span><h2>Review · due</h2></div><div class="duechips">'
        + J.reviewDue.map(function (r) { return '<span class="duechip">' + esc(r.item) + ' · <b>' + esc(r.when) + '</b></span>'; }).join('') + '</div></section>';
    }

    h += '<section><div class="sec-head"><span class="eyebrow">Timeline</span><h2>Session timeline</h2></div><div class="timeline">'
      + J.sessions.slice().reverse().map(function (s) {
        return '<div class="tl"><div class="th"><span class="ss">' + esc(s.dom) + '-' + esc(s.ses) + '</span>'
          + '<span class="dt">' + esc(s.date) + '</span><span class="md">' + esc(s.mode) + '</span></div>'
          + '<div class="cv">' + esc(s.covered) + '</div>'
          + '<div class="ins">' + esc(s.insight) + '</div>'
          + (s.analogy ? '<div class="an">🔧 ' + esc(s.analogy) + '</div>' : '')
          + (s.result ? '<div class="rs">✔ ' + esc(s.result) + '</div>' : '') + '</div>';
      }).join('') + '</div></section>';
    return h;
  }

  function lessons() {
    if (!L || !L.length) return '<section><h1>Lessons</h1><p class="lede">No lessons captured yet.</p></section>';
    var h = '<section><span class="eyebrow">Lessons</span><h1>Lessons</h1>'
      + '<p class="lede">The actual content we worked through, session by session — distilled. Newest first.</p></section>';
    h += L.slice().reverse().map(function (le) {
      var body = le.blocks.map(function (b) {
        var inner = '<h3>' + esc(b.h) + '</h3>';
        if (b.p) inner += '<p>' + esc(b.p) + '</p>';
        if (b.list) inner += '<ul class="plain">' + b.list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
        return '<div class="lblock">' + inner + '</div>';
      }).join('');
      return '<section class="lesson"><div class="lhd"><span class="lss">' + esc(le.dom) + '-' + esc(le.ses) + '</span>'
        + '<span class="ltt">' + esc(le.title) + '</span><span class="ldt">' + esc(le.date) + '</span></div>'
        + '<div class="lgoal"><span class="glab">Goal</span>' + esc(le.goal) + '</div>'
        + body + '</section>';
    }).join('');
    return h;
  }

  function transcripts() {
    if (!T || !T.length) return '<section><h1>Transcripts</h1><p class="lede">No transcripts yet.</p></section>';
    var h = '<section><span class="eyebrow">Transcripts</span><h1>Transcripts</h1>'
      + '<p class="lede">The interactive sessions, turn by turn — not summarized. English translation of the original sessions; a wrong answer and its correction are kept, because that is where it clicks. Newest first.</p></section>';
    h += T.slice().reverse().map(function (tr) {
      var turns = tr.turns.map(function (u) {
        var me = u.who === 'Nick';
        var tag = u.wrong ? '<span class="tflag wrong">✗ wrong → corrected next</span>' : (u.correct ? '<span class="tflag ok">✓ correct</span>' : '');
        return '<div class="turn ' + (me ? 'nick' : 'tutor') + '"><div class="twho">' + esc(u.who) + tag + '</div><div class="ttext">' + esc(u.text) + '</div></div>';
      }).join('');
      return '<section class="tscript"><div class="lhd"><span class="lss">' + esc(tr.dom) + '-' + esc(tr.ses) + '</span>'
        + '<span class="ltt">' + esc(tr.title) + '</span><span class="ldt">' + esc(tr.date) + '</span></div>'
        + '<div class="tnote">' + esc(tr.note) + '</div>' + turns + '</section>';
    }).join('');
    return h;
  }

  function glossary() {
    if (!G || !G.length) return '<section><h1>Glossary</h1><p class="lede">No terms yet.</p></section>';
    var groups = {}, order = [];
    G.forEach(function (t) { if (!groups[t.group]) { groups[t.group] = []; order.push(t.group); } groups[t.group].push(t); });
    var h = '<section><span class="eyebrow">Key Terms · Recall Drill</span><h1>Glossary</h1>'
      + '<p class="lede">Every term we\'ve covered, with a plain-English definition. Each card shows the <b>definition</b> — recall the <b>term</b> yourself, then tap to reveal. ' + G.length + ' terms · grows every session.</p></section>';
    h += '<section><div class="sec-head"><span class="eyebrow">Index</span><h2>All terms</h2><p class="sub">Quick browse. The recall cards are below.</p></div>'
      + '<div class="duechips">' + G.map(function (t) { return '<span class="duechip">' + esc(t.term) + ' <b>' + esc(t.dom) + '</b></span>'; }).join('') + '</div></section>';
    order.forEach(function (g) {
      h += '<section class="block"><h2>' + esc(g) + '</h2>' + groups[g].map(function (t) {
        return '<details class="q"><summary>' + esc(t.def) + '</summary><div class="ans"><b>' + esc(t.term) + '</b> · ' + esc(t.dom)
          + (t.anchor ? ' &nbsp;<span class="m">🔧 ' + esc(t.anchor) + '</span>' : '') + '</div></details>';
      }).join('') + '</section>';
    });
    return h;
  }

  /* ---------- router ---------- */
  function route() {
    var hash = location.hash || '#/guide';
    var key = hash.replace('#/', '');
    var anchor = null;
    if (key.indexOf('guide/') === 0) { anchor = key.slice(6); key = 'guide'; hash = '#/guide'; }
    var html, active = hash;
    var GU = window.CCARF_GUIDE;
    var d = byId(key);
    if (key === 'guide' && GU) { html = GU.guide(); active = '#/guide'; }
    else if (key === 'practice' && GU) { html = GU.practice(); active = '#/practice'; }
    else if (d) { html = domain(d); }
    else if (key === 'journal') { html = journal(); active = '#/journal'; }
    else if (key === 'lessons') { html = lessons(); active = '#/lessons'; }
    else if (key === 'transcripts') { html = transcripts(); active = '#/transcripts'; }
    else if (key === 'glossary') { html = glossary(); active = '#/glossary'; }
    else if (key === 'resources') { html = resources(); active = '#/resources'; }
    else { html = overview(); active = '#/overview'; }
    view.innerHTML = html;
    renderTabs(active);
    fmeta.innerHTML = 'Guide &amp; Practice are grounded in the official CCAR-F Exam Guide v1.0 · other tabs are study notes · '
      + esc(C.META.version) + ' · ' + esc(C.META.updated);
    if (GU && GU.runMermaid) GU.runMermaid();
    if (anchor) {
      var el = document.getElementById('g-' + anchor);
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
    document.title = (d ? d.code + ' ' + d.name + ' — ' : '') + 'CCAR-F Study';
  }
  window.addEventListener('hashchange', route);
  route();
})();
