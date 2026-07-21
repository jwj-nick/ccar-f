/* CCAR-F Study — Guide + Practice renderer.
 * Consumes the compiled data globals (data/content.js, data/practice.js) produced by
 * 30_drill_app/build/compile.mjs in the private study workspace.
 * Renders markdown with vendored marked + mermaid; runs offline from file://. */
(function () {
  var CT = window.CCAR_CONTENT || { overview: [], basic: [], deep: [] };
  var PR = (window.CCAR_PRACTICE && window.CCAR_PRACTICE.items) || [];
  var SCORE_KEY = 'ccarf-practice-v1';

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---------- score store ---------- */
  function loadScore() {
    try { return JSON.parse(localStorage.getItem(SCORE_KEY) || '{}'); } catch (e) { return {}; }
  }
  function saveScore(s) {
    try { localStorage.setItem(SCORE_KEY, JSON.stringify(s)); } catch (e) {}
  }
  function setScore(id, val) { var s = loadScore(); s[id] = val; saveScore(s); }

  /* ---------- markdown ---------- */
  function md(src) {
    if (!src) return '';
    if (!window.marked) return '<pre>' + esc(src) + '</pre>';
    var html = window.marked.parse(src, { mangle: false, headerIds: false });
    // mermaid fences → <pre class="mermaid">
    html = html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, function (_, code) {
      var txt = code.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
      return '<div class="mmwrap"><pre class="mermaid">' + esc(txt) + '</pre></div>';
    });
    // external links open in a new tab
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

  /* ---------- guide (compiled content) ---------- */
  function guide() {
    var pages = CT.overview || [];
    var h = '<section><span class="eyebrow">Grounded in the official Exam Guide v1.0</span><h1>The Guide</h1>'
      + '<p class="lede">A read-through of what the exam actually is — the format, the blueprint of 30 task statements, '
      + 'the 6 scenarios, and the boundaries of scope. Every claim here traces to the official exam guide; '
      + 'anything the guide does not support is flagged as such.</p></section>';

    if (!pages.length) {
      return h + '<section class="block"><p class="m">No compiled content yet. Run the compiler in the study workspace.</p></section>';
    }

    h += '<section class="block"><div class="duechips">' + pages.map(function (p) {
      return '<a class="duechip" href="#/guide/' + esc(p.id.split('/')[1]) + '">' + esc(p.title) + '</a>';
    }).join('') + '</div></section>';

    pages.forEach(function (p) {
      h += '<section class="block mdblock" id="g-' + esc(p.id.split('/')[1]) + '">'
        + md(p.body) + sourceNote(p.sources) + koBlock(p.ko) + '</section>';
    });
    return h;
  }

  /* ---------- practice ---------- */
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
    h += '<div class="pexp" hidden>' + md(it.model_answer || '') + (it.grading ? '<h4>Grading points</h4>' + md(it.grading) : '')
      + sourceNote(it.sources) + koBlock(it.ko) + '</div>';
    return h + '</div>';
  }

  function practice() {
    var score = loadScore();
    var answered = PR.filter(function (i) { return score[i.id]; });
    var right = answered.filter(function (i) { return score[i.id] === 'correct'; });

    var h = '<section><span class="eyebrow">Judgment drills · every item traced to a task statement</span><h1>Practice</h1>'
      + '<p class="lede">Scenario-shaped items in the exam\'s own idiom: pick the change that fixes the <b>root cause</b>, '
      + 'proportionately. Explanations say why the other options fail, not just why the key is right.</p></section>';

    h += '<section class="block"><div class="scorebar">'
      + '<div><b>' + right.length + '</b> / ' + answered.length + ' correct <span class="m">· ' + PR.length + ' item(s) available</span></div>'
      + '<button class="btn ghost resetscore">Reset progress</button></div></section>';

    if (!PR.length) {
      return h + '<section class="block"><p class="m">No reviewed items yet.</p></section>';
    }

    var byDomain = {};
    PR.forEach(function (i) { (byDomain[i.domain || '—'] = byDomain[i.domain || '—'] || []).push(i); });
    Object.keys(byDomain).sort().forEach(function (dom) {
      h += '<section class="block"><h2>' + esc(dom) + '</h2>';
      byDomain[dom].forEach(function (it) {
        h += it.format === 'choice' ? itemChoice(it, score[it.id])
          : it.format === 'recall' ? itemRecall(it) : itemOpen(it);
      });
      h += '</section>';
    });
    return h;
  }

  /* ---------- interaction (delegated once) ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;

    if (t.classList && t.classList.contains('blank')) {
      t.textContent = t.getAttribute('data-a');
      t.classList.add('shown');
      return;
    }
    if (t.classList && t.classList.contains('revealall')) {
      var pq = t.closest('.pq');
      pq.querySelectorAll('.blank').forEach(function (b) {
        b.textContent = b.getAttribute('data-a'); b.classList.add('shown');
      });
      return;
    }
    if (t.classList && t.classList.contains('reveal')) {
      var box = t.closest('.pq').querySelector('.pexp');
      box.hidden = !box.hidden;
      t.textContent = box.hidden ? 'Show explanation' : 'Hide explanation';
      return;
    }
    if (t.classList && t.classList.contains('resetscore')) {
      saveScore({});
      location.reload();
      return;
    }
    if (t.classList && t.classList.contains('check')) {
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
      return;
    }
  });

  /* ---------- mermaid ---------- */
  function runMermaid() {
    if (!window.mermaid) return;
    var nodes = document.querySelectorAll('pre.mermaid:not([data-processed])');
    if (!nodes.length) return;
    var dark = document.documentElement.getAttribute('data-theme') === 'dark'
      || (!document.documentElement.getAttribute('data-theme')
        && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
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
          lineColor: dark ? '#5b6ee1' : '#5b6ee1',
          background: 'transparent'
        }
      });
      window.mermaid.run({ nodes: nodes });
    } catch (err) { /* diagram failure must never break the page */ }
  }

  window.CCARF_GUIDE = { guide: guide, practice: practice, runMermaid: runMermaid };
})();
