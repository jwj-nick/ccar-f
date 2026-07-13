/* CCAR-F Study — router + render. 바닐라, 의존성 없음. */
(function () {
  var C = window.CCARF;
  var J = window.CCARF_JOURNAL;
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
  var TABS = [{ h: '#/overview', t: '개요' }, { h: '#/journal', t: '학습로그' }]
    .concat(C.DOMAINS.map(function (d) { return { h: '#/' + d.id, t: d.code }; }))
    .concat([{ h: '#/resources', t: '자료' }]);
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
      + '<p class="sub" style="margin-top:10px">＋ 선택: Claude Code 트레이닝 · Bedrock/Vertex 등. 정확한 코스명·순서는 <a href="https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request" target="_blank" rel="noopener">공식 인증 페이지</a>에서 확인.</p>';
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
      return '<a class="dcard" href="#/' + d.id + '"><div class="r1"><span class="cd">' + d.code + '</span><span class="nm">' + esc(d.ko) + '</span><span class="ko">' + esc(d.name) + '</span></div>'
        + '<div class="tl">' + esc(d.tagline) + '</div>'
        + '<div class="mini"><span class="chip w">' + d.weight + '%</span><span class="chip ts">' + d.ts + ' TS</span>' + confChip(d.conf) + '</div></a>';
    }).join('') + '</div>';
  }

  /* ---------- views ---------- */
  function overview() {
    return '<section>'
      + '<span class="eyebrow">Claude Certified Architect · Foundations</span>'
      + '<h1>CCAR-F 학습 지도</h1>'
      + '<p class="lede">5개 도메인 각각에 대해 <b>무엇을 공부할지</b> · <b>무엇을 실습할지</b> · <b>어떤 공식·무료 자료로 파고들지</b>. ' + esc(C.META.note) + '</p>'
      + facts()
      + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Weighting</span><h2>시험 비중 — 어디에 시간을 쓸까</h2>'
      + '<p class="sub">가중치 순. 카드를 누르면 해당 도메인 상세로.</p></div>' + weighting(true) + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Domains</span><h2>도메인 — 공부·실습·자료</h2></div>' + dcardsBlock() + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Official · Anthropic Academy</span><h2>공식 학습 경로 (무료)</h2>'
      + '<p class="sub">Anthropic 권장 코스 순서. 시험은 Claude Code · Agent SDK · Claude API · MCP를 다룬다.</p></div>' + pathBlock() + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Method</span><h2>학습 루프 — 자료 + 실습을 함께</h2>'
      + '<p class="sub">도메인마다 이 6단계를 돈다. 한 자료만 보지 않고 코스·문서·실무 글·실습·문제를 겹쳐 같은 개념을 여러 각도에서.</p></div>' + loopBlock() + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Scenarios</span><h2>6개 시나리오 (4개 랜덤 출제)</h2>'
      + '<p class="sub">실제 Anthropic 고객 배포 기반. 매 시나리오가 여러 도메인을 교차한다.</p></div>' + scenariosBlock() + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Plan · D-70</span><h2>10주 경로 — 07/12 → 시험 ~09/20</h2></div>' + scheduleBlock() + '</section>';
  }

  function domain(d) {
    var ob = domainsByOrder(), idx = -1;
    for (var i = 0; i < ob.length; i++) if (ob[i].id === d.id) idx = i;
    var prev = idx > 0 ? ob[idx - 1] : null, next = idx < ob.length - 1 ? ob[idx + 1] : null;

    var h = '<a class="backlink" href="#/overview">← 개요</a>'
      + '<div class="dhead"><div class="dcode">' + d.code + '</div><div class="dt">'
      + '<h1>' + esc(d.name) + ' <span class="ko">／ ' + esc(d.ko) + '</span></h1>'
      + '<div class="es">' + esc(d.essence) + '</div></div>'
      + '<div class="metaline"><span class="chip w">' + d.weight + '%</span><span class="chip ts">' + d.ts + ' TS</span>' + confChip(d.conf) + '</div></div>';

    h += '<div class="block"><h2>핵심 개념</h2><div class="concepts">' + d.concepts.map(function (c) {
      return '<div class="concept"><div class="t">' + esc(c.t) + '</div><div class="d">' + esc(c.d) + '</div></div>';
    }).join('') + '</div></div>';

    h += '<div class="block"><h2>핵심 용어 · 헷갈리는 짝</h2><div class="terms">' + d.terms.map(function (t) {
      var pair = t.b ? (esc(t.a) + '<span class="vs">vs</span>' + esc(t.b)) : esc(t.a);
      return '<div class="term"><div class="pair">' + pair + '</div><div class="why">' + esc(t.why) + '</div></div>';
    }).join('') + '</div></div>';

    h += '<div class="twocol" style="margin-top:34px">'
      + '<div class="block wn" style="margin-top:0"><h2>시험 판단 포인트</h2><ul class="plain">' + d.judgments.map(function (j) { return '<li>' + esc(j) + '</li>'; }).join('') + '</ul></div>'
      + '<div class="block wn" style="margin-top:0"><h2>흔한 오답 패턴</h2><ul class="plain wn">' + d.traps.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>'
      + '</div>';

    h += '<div class="block"><h2>워크드 미니 시나리오</h2><div class="scnbox">'
      + '<div class="row"><div class="k">상황</div><div class="v">' + esc(d.scenario.s) + '</div></div>'
      + '<div class="row"><div class="k w">질문</div><div class="v">' + esc(d.scenario.q) + '</div></div>'
      + '<div class="row"><div class="k a">정답</div><div class="v">' + esc(d.scenario.a) + '</div></div>'
      + '<div class="row"><div class="k">왜</div><div class="v">' + esc(d.scenario.w) + '</div></div>'
      + '</div></div>';

    h += '<div class="block"><h2>자가진단</h2>' + d.quiz.map(function (q) {
      return '<details class="q"><summary>' + esc(q.q) + '</summary><div class="ans">' + esc(q.a) + '</div></details>';
    }).join('') + '</div>';

    h += '<div class="twocol" style="margin-top:34px">'
      + '<div class="block" style="margin-top:0"><h2>공부 — 이론</h2><ul class="plain">' + d.study.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>'
      + '<div class="block g" style="margin-top:0"><h2>실습 — 핸즈온</h2><ul class="plain g">' + d.practice.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></div>'
      + '</div>';

    h += '<div class="block d"><h2>자료</h2><div class="res">'
      + resGroup('c-course', '공식 코스 · Academy', d.res.course)
      + resGroup('c-doc', '공식 문서 · 글', d.res.docs)
      + resGroup('c-free', '무료 대비 자료', d.res.free)
      + '</div></div>';

    h += '<div class="block"><div class="lensbox"><b>Nick의 렌즈</b>' + esc(d.lens) + '</div>'
      + '<p class="sub" style="margin-top:12px"><b style="color:var(--ink-soft)">엮이는 시나리오:</b> ' + esc(d.scenarios) + '</p></div>';

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
    return '<section><span class="eyebrow">Resource Library</span><h1>자료</h1>'
      + '<p class="lede">공식(무료 코스·문서)을 1차로, 서드파티 대비서는 시험 감각·문제 풀이용으로.</p></section>'
      + '<section><div class="sec-head"><span class="eyebrow">Official Path</span><h2>공식 학습 경로 (무료)</h2></div>' + pathBlock() + '</section>'
      + '<section><div class="sec-head"><span class="eyebrow">Library</span><h2>찾을 수 있는 자료 — 한 곳에</h2></div>' + libraryBlock()
      + '<div class="callout">⚠️ 서드파티(WikiDocs·GitHub·연습문제)는 <b>시험 감각·오답 패턴</b>용. 사실 근거는 항상 공식(docs·Academy)으로 교차검증. task statement 세부는 공식 exam guide로 확정.</div></section>';
  }

  function journal() {
    if (!J) return '<section><h1>학습 로그</h1><p class="lede">아직 기록이 없습니다.</p></section>';
    var maxT = 5;
    var h = '<section><span class="eyebrow">Study Journal</span><h1>학습 로그</h1>'
      + '<p class="lede">우리가 공부한 것과 <b>다음에 풀 문제</b>. 세션마다 갱신 · 🔥 streak ' + J.streak + '일 · ' + esc(J.location) + '</p></section>';

    if (J.next) {
      h += '<section><div class="nextcard"><div class="nl">▶ 다음 문제 · ' + esc(J.next.dom) + '-' + esc(J.next.ses) + '</div>'
        + '<div class="nt">' + esc(J.next.title) + '</div><div class="np">' + esc(J.next.problem) + '</div>'
        + (J.next.hint ? '<div class="nh"><b>보기</b> · ' + esc(J.next.hint) + '</div>' : '') + '</div></section>';
    }

    h += '<section><div class="sec-head"><span class="eyebrow">Progress</span><h2>진도 (studied)</h2></div><div class="jprog">'
      + J.progress.map(function (p) {
        var w = Math.round(p.conf / maxT * 100);
        return '<div class="jp"><div class="c">' + esc(p.code) + '</div><div><div class="nm">' + esc(p.ko) + '</div>'
          + '<div class="bar" style="margin-top:5px"><span style="width:' + w + '%"></span></div></div>'
          + '<div class="cf">' + p.conf + '/' + p.target + '</div></div>';
      }).join('') + '</div></section>';

    if (J.reviewDue && J.reviewDue.length) {
      h += '<section><div class="sec-head"><span class="eyebrow">Spaced Review</span><h2>복습 예정</h2></div><div class="duechips">'
        + J.reviewDue.map(function (r) { return '<span class="duechip">' + esc(r.item) + ' · <b>' + esc(r.when) + '</b></span>'; }).join('') + '</div></section>';
    }

    h += '<section><div class="sec-head"><span class="eyebrow">Timeline</span><h2>세션 타임라인</h2></div><div class="timeline">'
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

  /* ---------- router ---------- */
  function route() {
    var hash = location.hash || '#/overview';
    var key = hash.replace('#/', '');
    var html, active = hash;
    var d = byId(key);
    if (d) { html = domain(d); }
    else if (key === 'journal') { html = journal(); active = '#/journal'; }
    else if (key === 'resources') { html = resources(); active = '#/resources'; }
    else { html = overview(); active = '#/overview'; }
    view.innerHTML = html;
    renderTabs(active);
    fmeta.innerHTML = 'Anthropic Academy 무료 13코스 기반 · 초안 ' + esc(C.META.version) + ' · ' + esc(C.META.updated);
    window.scrollTo(0, 0);
    document.title = (d ? d.code + ' ' + d.ko + ' — ' : '') + 'CCAR-F Study';
  }
  window.addEventListener('hashchange', route);
  route();
})();
