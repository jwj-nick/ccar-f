/* CCAR-F Study — Study section (compiled content + practice).
 * Consumes the data globals produced by 30_drill_app/build/compile.mjs.
 * Markdown via vendored marked; diagrams via vendored mermaid. Runs offline from file://. */
(function () {
  var CT = window.CCAR_CONTENT || { overview: [], basic: [], deep: [] };
  var PR = (window.CCAR_PRACTICE && window.CCAR_PRACTICE.items) || [];
  var SCORE_KEY = 'ccarf-practice-v1';
  var DOMS = ['D1', 'D2', 'D3', 'D4', 'D5'];
  var DOM_NAME = {
    D1: 'Agentic Architecture & Orchestration',
    D2: 'Tool Design & MCP Integration',
    D3: 'Claude Code Configuration & Workflows',
    D4: 'Prompt Engineering & Structured Output',
    D5: 'Context Management & Reliability'
  };
  var shuffled = false;

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function byDomain(list, d) { return list.filter(function (x) { return x.domain === d; }); }
  function domainPractice(d) { return PR.filter(function (i) { return i.kind !== 'exam-sim' && i.domain === d; }); }
  function simItems() { return PR.filter(function (i) { return i.kind === 'exam-sim'; }); }

  /* ---------- score store ---------- */
  function loadScore() {
    try { return JSON.parse(localStorage.getItem(SCORE_KEY) || '{}'); } catch (e) { return {}; }
  }
  function saveScore(s) { try { localStorage.setItem(SCORE_KEY, JSON.stringify(s)); } catch (e) {} }
  function setScore(id, val) { var s = loadScore(); s[id] = val; saveScore(s); }

  /* ---------- markdown ---------- */
  function md(src) {
    if (!src) return '';
    if (!window.marked) return '<pre>' + esc(src) + '</pre>';
    var html = window.marked.parse(src, { mangle: false, headerIds: false });
    html = html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, function (_, code) {
      var txt = code.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'").replace(/&amp;/g, '&');
      return '<div class="mmwrap"><pre class="mermaid">' + esc(txt) + '</pre></div>';
    });
    html = html.replace(/<table>/g, '<div class="tablewrap"><table>').replace(/<\/table>/g, '</table></div>');
    html = html.replace(/<a href="(https?:[^"]+)"/g, '<a target="_blank" rel="noopener" href="$1"');
    return html;
  }
  function koBlock(ko) {
    if (!ko) return '';
    return '<details class="ko"><summary>한글 해설 (KO)</summary><div class="kobody">' + md(ko) + '</div></details>';
  }
  function sourceNote(sources) {
    if (!sources || !sources.length) return '';
    return '<p class="srcnote">Source: ' + sources.map(esc).join(' · ') + '</p>';
  }

  /* ---------- sidebar ---------- */
  function navGroup(title, count, links, openWhen) {
    return '<div class="sgroup' + (openWhen ? ' open' : '') + '">'
      + '<div class="sgtitle">' + esc(title) + '<span class="sgcount">' + count + '</span></div>'
      + '<div class="sglinks">' + links + '</div></div>';
  }
  function navLink(href, label, note, active) {
    return '<a class="slink' + (active ? ' active' : '') + '" href="' + href + '">'
      + '<span>' + esc(label) + '</span>'
      + (note != null ? '<span class="snote">' + esc(note) + '</span>' : '') + '</a>';
  }

  function sidebar(kind, arg) {
    var h = '<aside class="snav">';

    h += navGroup('Overview', (CT.overview || []).length,
      (CT.overview || []).map(function (p) {
        var slug = p.id.split('/')[1];
        return navLink('#/guide/' + slug, p.title, null, kind === 'guide' && arg === slug);
      }).join(''), kind === 'guide');

    h += navGroup('Basic', (CT.basic || []).length,
      DOMS.map(function (d) {
        var n = byDomain(CT.basic || [], d).length;
        return navLink('#/basic/' + d, d, n || '—', kind === 'basic' && arg === d);
      }).join(''), kind === 'basic');

    h += navGroup('Deep', (CT.deep || []).length,
      DOMS.map(function (d) {
        var n = byDomain(CT.deep || [], d).length;
        return navLink('#/deep/' + d, d, n || '—', kind === 'deep' && arg === d);
      }).join(''), kind === 'deep');

    h += navGroup('Practice', PR.filter(function (i) { return i.kind !== 'exam-sim'; }).length,
      DOMS.map(function (d) {
        var n = domainPractice(d).length;
        return navLink('#/practice/' + d, d, n || '—', kind === 'practice' && arg === d);
      }).join(''), kind === 'practice');

    var sims = simItems();
    var scen = {};
    sims.forEach(function (i) { scen[i.scenario || 'unassigned'] = (scen[i.scenario || 'unassigned'] || 0) + 1; });
    var scenKeys = Object.keys(scen).sort();
    h += navGroup('Exam Sim', sims.length,
      (scenKeys.length
        ? navLink('#/exam-sim', 'All scenarios', sims.length, kind === 'exam-sim' && !arg)
          + scenKeys.map(function (s) {
            return navLink('#/exam-sim/' + s, s, scen[s], kind === 'exam-sim' && arg === s);
          }).join('')
        : '<div class="sempty">not authored yet</div>'), kind === 'exam-sim');

    return h + '</aside>';
  }

  /* ---------- related bar ---------- */
  function related(dom, kind) {
    if (!dom) return '';
    var links = [];
    if (kind !== 'basic') links.push('<a href="#/basic/' + dom + '">Basic</a>');
    if (kind !== 'deep') links.push('<a href="#/deep/' + dom + '">Deep</a>');
    if (kind !== 'practice') links.push('<a href="#/practice/' + dom + '">Practice</a>');
    links.push('<a href="#/guide/blueprint-map">Blueprint</a>');
    links.push('<a href="#/' + dom.toLowerCase() + '">Notes</a>');
    return '<div class="relbar"><span class="rellabel">' + esc(dom) + ' ·</span>' + links.join('') + '</div>';
  }

  /* ---------- panes ---------- */
  function paneGuide(slug) {
    var pages = CT.overview || [];
    if (!pages.length) return emptyPane('No compiled overview yet.');
    var show = slug ? pages.filter(function (p) { return p.id.split('/')[1] === slug; }) : pages;
    if (!show.length) show = pages;
    var h = '<div class="phead"><span class="eyebrow">Grounded in the official Exam Guide v1.0</span>'
      + '<h1>' + (slug && show.length === 1 ? esc(show[0].title) : 'The Guide') + '</h1>'
      + '<p class="lede">What the exam actually is — format, the blueprint of 30 task statements, the 6 scenarios, '
      + 'and the boundaries of scope. Every claim traces to the official guide; anything it does not support is flagged.</p></div>';
    show.forEach(function (p) {
      h += '<section class="mdblock" id="g-' + esc(p.id.split('/')[1]) + '">'
        + md(p.body) + sourceNote(p.sources) + koBlock(p.ko) + '</section>';
    });
    return h;
  }

  function paneContent(kind, dom) {
    var list = byDomain(CT[kind] || [], dom);
    var h = '<div class="phead"><span class="eyebrow">' + (kind === 'basic' ? 'Foundation' : 'Where the exam digs') + '</span>'
      + '<h1>' + esc(dom) + ' · ' + esc(DOM_NAME[dom] || '') + '</h1>'
      + '<p class="lede">' + (kind === 'basic'
        ? 'One pass over every task statement in this domain.'
        : 'The distinctions the exam exploits — stated as a confusion, then resolved.') + '</p></div>';
    h += related(dom, kind);
    if (!list.length) return h + emptyPane('Not authored yet for ' + dom + '.');
    list.forEach(function (p) {
      h += '<section class="mdblock">' + md(p.body) + sourceNote(p.sources) + koBlock(p.ko) + '</section>';
    });
    return h;
  }

  function itemChoice(it, done) {
    var name = 'opt-' + it.id;
    var h = '<div class="pq" data-id="' + esc(it.id) + '" data-format="choice" data-answer="' + esc((it.answer || []).join(',')) + '">';
    h += '<div class="pqhead"><span class="chip">' + esc(it.domain || '—') + '</span>'
      + (it.linked_ts || []).map(function (t) { return '<span class="chip ts">TS ' + esc(t) + '</span>'; }).join('')
      + (it.multi ? '<span class="chip multi">select ' + it.answer.length + '</span>' : '')
      + (done ? '<span class="chip ' + (done === 'correct' ? 'ok' : 'no') + '">' + (done === 'correct' ? 'correct' : 'missed') + '</span>' : '')
      + '</div>';
    if (it.context) h += '<div class="pctx">' + md(it.context) + '</div>';
    if (it.question) h += '<div class="pquestion">' + md(it.question) + '</div>';
    h += '<div class="popts">' + (it.options || []).map(function (o) {
      return '<label class="popt" data-key="' + esc(o.key) + '">'
        + '<input type="' + (it.multi ? 'checkbox' : 'radio') + '" name="' + esc(name) + '" value="' + esc(o.key) + '">'
        + '<span class="pk">' + esc(o.key) + '</span><span class="pt">' + esc(o.text) + '</span></label>';
    }).join('') + '</div>';
    h += '<div class="pactions"><button class="btn check">Check</button>'
      + '<button class="btn ghost reveal">Show explanation</button></div>';
    h += '<div class="pexp" hidden>' + md(it.explanation || '') + sourceNote(it.sources) + koBlock(it.ko) + '</div>';
    return h + '</div>';
  }

  function itemRecall(it) {
    var i = 0;
    var body = String(it.cloze || '').replace(/\{\{(.+?)\}\}/g, function (_, a) {
      i++;
      return '<button class="blank" data-a="' + esc(a) + '">' + '·'.repeat(Math.max(4, Math.min(12, a.length))) + '</button>';
    });
    var h = '<div class="pq" data-id="' + esc(it.id) + '" data-format="recall">';
    h += '<div class="pqhead"><span class="chip">' + esc(it.domain || '—') + '</span>'
      + (it.linked_ts || []).map(function (t) { return '<span class="chip ts">TS ' + esc(t) + '</span>'; }).join('')
      + '<span class="chip">' + i + ' blanks</span></div>';
    h += '<div class="pcloze">' + md(body) + '</div>';
    h += '<div class="pactions"><button class="btn ghost revealall">Reveal all</button></div>';
    h += koBlock(it.ko);
    return h + '</div>';
  }

  function itemOpen(it) {
    var h = '<div class="pq" data-id="' + esc(it.id) + '" data-format="' + esc(it.format) + '">';
    h += '<div class="pqhead"><span class="chip">' + esc(it.domain || '—') + '</span>'
      + (it.linked_ts || []).map(function (t) { return '<span class="chip ts">TS ' + esc(t) + '</span>'; }).join('') + '</div>';
    if (it.context) h += '<div class="pctx">' + md(it.context) + '</div>';
    if (it.question) h += '<div class="pquestion">' + md(it.question) + '</div>';
    h += '<div class="pactions"><button class="btn ghost reveal">Show model answer</button></div>';
    h += '<div class="pexp" hidden>' + md(it.model_answer || '')
      + (it.grading ? '<h4>Grading points</h4>' + md(it.grading) : '')
      + sourceNote(it.sources) + koBlock(it.ko) + '</div>';
    return h + '</div>';
  }

  function renderItem(it, score) {
    return it.format === 'choice' ? itemChoice(it, score[it.id])
      : it.format === 'recall' ? itemRecall(it) : itemOpen(it);
  }

  function shuffle(a) {
    var arr = a.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function scorebar(items) {
    var score = loadScore();
    var answered = items.filter(function (i) { return score[i.id]; });
    var right = answered.filter(function (i) { return score[i.id] === 'correct'; });
    return '<div class="scorebar">'
      + '<div><b>' + right.length + '</b> / ' + answered.length + ' correct'
      + ' <span class="m">· ' + items.length + ' item(s) in view</span></div>'
      + '<div class="sbactions"><button class="btn ghost shuffle">' + (shuffled ? 'Shuffled ✓' : 'Shuffle') + '</button>'
      + '<button class="btn ghost resetscore">Reset progress</button></div></div>';
  }

  function panePractice(dom) {
    var items = domainPractice(dom);
    var h = '<div class="phead"><span class="eyebrow">Judgment drills · every item traced to a task statement</span>'
      + '<h1>' + esc(dom) + ' · Practice</h1>'
      + '<p class="lede">Pick the change that fixes the <b>root cause</b>, proportionately. '
      + 'Explanations say why each other option fails, not just why the key is right.</p></div>';
    h += related(dom, 'practice');
    h += scorebar(items);
    if (!items.length) return h + emptyPane('No reviewed items yet for ' + dom + '.');
    var score = loadScore();
    (shuffled ? shuffle(items) : items).forEach(function (it) { h += renderItem(it, score); });
    return h;
  }

  function paneExamSim(scenario) {
    var items = simItems().filter(function (i) { return !scenario || i.scenario === scenario; });
    var h = '<div class="phead"><span class="eyebrow">4 of these 6 scenarios appear on the exam</span>'
      + '<h1>Exam Simulation' + (scenario ? ' · ' + esc(scenario) : '') + '</h1>'
      + '<p class="lede">Scenario-framed items in the exam\'s own idiom. Each restates its context, so any item can be taken alone.</p></div>';
    h += scorebar(items);
    if (!items.length) return h + emptyPane('Exam simulation items are not authored yet.');
    var score = loadScore();
    (shuffled ? shuffle(items) : items).forEach(function (it) { h += renderItem(it, score); });
    return h;
  }

  function emptyPane(msg) {
    return '<section class="mdblock"><p class="m">' + esc(msg)
      + ' Content is compiled from markdown in the study workspace; only source-verified material ships.</p></section>';
  }

  /* ---------- entry ---------- */
  function study(kind, arg) {
    var pane = kind === 'basic' ? paneContent('basic', arg || 'D1')
      : kind === 'deep' ? paneContent('deep', arg || 'D1')
        : kind === 'practice' ? panePractice(arg || 'D1')
          : kind === 'exam-sim' ? paneExamSim(arg)
            : paneGuide(arg);
    return '<div class="studywrap">' + sidebar(kind, arg) + '<div class="spane">' + pane + '</div></div>';
  }

  /* ---------- interaction (delegated once) ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t.classList) return;

    if (t.classList.contains('blank')) {
      t.textContent = t.getAttribute('data-a'); t.classList.add('shown'); return;
    }
    if (t.classList.contains('revealall')) {
      t.closest('.pq').querySelectorAll('.blank').forEach(function (b) {
        b.textContent = b.getAttribute('data-a'); b.classList.add('shown');
      });
      return;
    }
    if (t.classList.contains('reveal')) {
      var box = t.closest('.pq').querySelector('.pexp');
      box.hidden = !box.hidden;
      t.textContent = box.hidden ? 'Show explanation' : 'Hide explanation';
      return;
    }
    if (t.classList.contains('shuffle')) {
      shuffled = !shuffled;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      return;
    }
    if (t.classList.contains('resetscore')) { saveScore({}); location.reload(); return; }
    if (t.classList.contains('sgtitle')) { t.parentNode.classList.toggle('open'); return; }

    if (t.classList.contains('check')) {
      var q = t.closest('.pq');
      var key = (q.getAttribute('data-answer') || '').split(',').filter(Boolean);
      var picked = [];
      q.querySelectorAll('.popt input:checked').forEach(function (inp) { picked.push(inp.value); });
      if (!picked.length) return;
      var ok = picked.length === key.length && key.every(function (k) { return picked.indexOf(k) >= 0; });
      q.querySelectorAll('.popt').forEach(function (lab) {
        var k = lab.getAttribute('data-key');
        lab.classList.remove('right', 'wrong');
        if (key.indexOf(k) >= 0) lab.classList.add('right');
        else if (picked.indexOf(k) >= 0) lab.classList.add('wrong');
      });
      q.querySelector('.pexp').hidden = false;
      q.querySelector('.reveal').textContent = 'Hide explanation';
      setScore(q.getAttribute('data-id'), ok ? 'correct' : 'wrong');
      var head = q.querySelector('.pqhead');
      var badge = head.querySelector('.chip.ok, .chip.no');
      if (badge) badge.remove();
      head.insertAdjacentHTML('beforeend', '<span class="chip ' + (ok ? 'ok' : 'no') + '">' + (ok ? 'correct' : 'missed') + '</span>');
    }
  });

  /* ---------- mermaid ---------- */
  function runMermaid() {
    if (!window.mermaid) return;
    var nodes = document.querySelectorAll('pre.mermaid:not([data-processed])');
    if (!nodes.length) return;
    var attr = document.documentElement.getAttribute('data-theme');
    var dark = attr === 'dark' || (!attr && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    try {
      window.mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        flowchart: { useMaxWidth: false, htmlLabels: true },
        themeVariables: {
          fontSize: '16px',
          primaryColor: dark ? '#242938' : '#eef1ff',
          primaryTextColor: dark ? '#c6ccdd' : '#1b2430',
          primaryBorderColor: '#5b6ee1',
          lineColor: '#5b6ee1',
          background: 'transparent'
        }
      });
      window.mermaid.run({ nodes: nodes });
    } catch (err) { /* a diagram failure must never break the page */ }
  }

  window.CCARF_GUIDE = { study: study, runMermaid: runMermaid, KINDS: ['guide', 'basic', 'deep', 'practice', 'exam-sim'] };
})();
