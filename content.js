/* CCAR-F Study — content (data layer). 바닐라, 빌드 없음.
 * 초안(v0.1). 공식 소스 기반 증류. task statement 세부는 공식 exam guide로 검증 예정.
 * 출처: docs.claude.com · anthropic.com/engineering · modelcontextprotocol.io */

const META = {
  version: 'v0.1 · draft',
  updated: '2026-07-13',
  exam: [
    { v: '60', l: '문항 (scenario-based)' },
    { v: '4 / 6', l: '시나리오 랜덤 출제' },
    { v: '720', l: '합격선 / 1000' },
    { v: '120min', l: '제한시간' },
    { v: 'closed-book', l: 'AI 금지 · 프록터링' }
  ],
  note: '시험은 closed-book·시나리오 기반 — 암기가 아니라 제약 하 아키텍처 판단을 본다.'
};

const PATH = [
  { n: '01', t: 'Claude 101', tag: '기초', d: 'Claude 사용 패턴·역량의 기준선' },
  { n: '02', t: 'AI Fluency: Framework & Foundations', tag: '기초', d: '협업·위임·분별의 개념틀' },
  { n: '03', t: 'Building Applications with the Claude API', tag: 'D1·D4·D5', d: 'API·structured output·production (핵심)' },
  { n: '04', t: 'Introduction to Model Context Protocol', tag: 'D2', d: 'MCP tools·resources·prompts' },
  { n: '05', t: 'Model Context Protocol: Advanced Topics', tag: 'D2', d: 'transport·보안·서버 설계' },
  { n: '06', t: 'Introduction to Subagents', tag: 'D1', d: 'orchestrator–worker 멀티에이전트' },
  { n: '07', t: 'Introduction to Agent Skills', tag: 'D3·D1', d: 'Skills로 에이전트 확장' }
];

const LOOP = [
  { n: '01 COURSE', t: '코스', d: 'Academy 코스로 개념 큰 그림' },
  { n: '02 DOCS', t: '문서', d: 'docs.claude.com으로 정밀·정확' },
  { n: '03 FIELD', t: '실무 글', d: 'engineering 글로 왜/언제 판단' },
  { n: '04 BUILD', t: '실습', d: '직접 만들어 손으로 체화' },
  { n: '05 DRILL', t: '문제', d: '문제로 시험 감각·오답 패턴' },
  { n: '06 DISTILL', t: '증류', d: '노트 → 이 앱으로 정리' }
];

const SCHEDULE = [
  { n: 'W1 · 07/13', d: 'D1 前', r: 'agentic loop·orchestration' },
  { n: 'W2 · 07/20', d: 'D1 後', r: 'multi-agent·hooks·state' },
  { n: 'W3 · 07/27', d: 'D3', r: 'Claude Code (강점)' },
  { n: 'W4 · 08/03', d: 'D4', r: 'prompt·structured output' },
  { n: 'W5 · 08/10', d: 'D2', r: 'tool design·MCP' },
  { n: 'W6 · 08/17', d: 'D5', r: 'context·reliability' },
  { n: 'W7 · 08/24', d: '시나리오 랩', r: '6개 end-to-end' },
  { n: 'W8 · 08/31', d: '드릴 앱', r: '문항·시뮬 확장' },
  { n: 'W9 · 09/07', d: '모의', r: '풀 모의 + 약점 보강' },
  { n: 'W10 · 09/14', d: '응시 ▸', r: '최종 리뷰·버퍼', exam: true }
];

const LIBRARY = [
  { t: 'Anthropic Academy', tag: 'Official · 무료', d: '13개 자기주도 코스. CCA-F 권장 학습 경로의 본체.', url: 'https://anthropic.skilljar.com' },
  { t: '공식 인증 페이지', tag: 'Official', d: 'CCA-F 자격·응시·exam guide. Partner Network(무료)·좌석 예약.', url: 'https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request' },
  { t: 'docs.claude.com', tag: 'Official · 정밀', d: '모든 사실의 1차 출처. Claude Code·Agent SDK·MCP·Prompt·Context.', url: 'https://docs.claude.com' },
  { t: 'Anthropic Engineering', tag: 'Official · 실무', d: 'Building Effective Agents · Writing tools · Context engineering · Agent Skills.', url: 'https://www.anthropic.com/engineering' },
  { t: 'WikiDocs 「CCA-F 실전 대비서」', tag: '한국어 · 문제', d: '5도메인 요약카드·핵심용어·판단 시나리오·연습문항·미니 모의·핸즈온 랩·플래시카드.', url: 'https://wikidocs.net/book/19518' },
  { t: 'GitHub 대비 자료', tag: '무료 · 다국어', d: 'paullarionov(13개국어 guide·PDF·Anki) · daronyondem(exam guide).', url: 'https://github.com/paullarionov/claude-certified-architect' }
];

const DOMAINS = [
  {
    id: 'd1', code: 'D1', name: 'Agentic Architecture & Orchestration', ko: '에이전트 설계·조율',
    weight: 27, ts: 7, conf: 3, order: 1,
    tagline: '에이전트 loop 하나가 나머지 도메인이 매달리는 뼈대. 가장 큰 도메인.',
    essence: '정형 workflow와 자율 agent를 구분하고, agentic loop(맥락 수집→행동→검증→반복)와 멀티에이전트 조율을 상황에 맞게 설계하는 능력.',
    concepts: [
      { t: 'Augmented LLM (빌딩블록)', d: 'retrieval·tools·memory로 강화된 LLM. 스스로 검색 쿼리 생성·도구 선택·기억 결정. 명확히 문서화된 인터페이스가 핵심.' },
      { t: 'Workflow vs Agent', d: 'workflow = 미리 정해진 코드 경로로 조율. agent = 런타임에 스스로 도구·과정 결정. 스텝 수가 예측 가능하면 workflow, open-ended면 agent.' },
      { t: 'Agentic loop', d: 'gather context → take action → verify work → repeat. 검증 피드백으로 오류가 누적되기 전에 자기교정.' },
      { t: '5가지 workflow 패턴', d: 'prompt chaining(순차+게이트) · routing(분류→전문경로) · parallelization(sectioning 병렬 / voting 신뢰도) · orchestrator-workers(중앙이 분해·위임·종합) · evaluator-optimizer(생성↔피드백 반복).' },
      { t: 'Multi-agent (orchestrator–worker)', d: 'subagent는 context window를 격리하고 병렬 탐색 후 distilled 요약(1–2k 토큰)만 반환. 이득=격리·병렬, 비용=토큰↑·조율 복잡·오류 누적.' },
      { t: '검증(verify)의 3형태', d: '규칙 기반(linter가 가장 견고) · visual feedback(스크린샷) · LLM-as-judge(퍼지 기준, 덜 견고하나 유용).' },
      { t: 'Agentic search vs RAG', d: 'agentic = grep/bash로 즉시 탐색(정확·투명·유지 쉬움). semantic/RAG = 사전 임베딩(빠르나 부정확). agentic 우선, 부족할 때 RAG.' },
      { t: '3대 원칙', d: 'Simplicity(필요할 때만 복잡도) · Transparency(계획 노출) · ACI(agent-computer interface: 도구 문서·예시·엣지케이스, poka-yoke로 실수 방지).' }
    ],
    terms: [
      { a: 'Workflow', b: 'Agent', why: '둘 다 agentic system이지만 제어 위치가 다름 — 코드 고정 vs 모델 런타임 결정.' },
      { a: 'Orchestrator-workers', b: 'Parallelization(sectioning)', why: 'orchestrator는 서브태스크를 런타임에 동적 결정, sectioning은 미리 정해진 독립 조각.' },
      { a: 'Routing', b: 'Orchestrator', why: 'routing은 분류 후 단일 경로, orchestrator는 분해+다수 위임+종합.' },
      { a: 'Agentic search', b: 'Semantic search(RAG)', why: '즉시 탐색(정확) vs 사전 임베딩(빠름·부정확). 기본은 agentic.' }
    ],
    judgments: [
      '스텝 수가 예측 가능한가? → workflow(chaining/routing) vs 자율 agent.',
      '서브태스크 구성이 입력에 따라 달라지나? → orchestrator-workers vs 고정 parallelization.',
      'subagent 추가가 값어치 있나? (컨텍스트 격리·병렬 이득 vs 토큰·조율 비용).',
      '검증을 무엇으로? 규칙 가능하면 linter, 안 되면 LLM-judge.',
      '정지 조건·투명성을 어떻게 보장하나?'
    ],
    traps: [
      '"멀티에이전트가 항상 낫다" — X. 단순함이 우선, 필요할 때만 복잡도 추가.',
      '모든 걸 자율 agent로 — 예측 가능한 태스크는 workflow가 더 안전·저렴.',
      'RAG를 항상 먼저 — agentic search가 더 정확·유지 쉬움; RAG는 부족할 때.',
      '도구를 많이 붙일수록 강해진다 — 과다·중복 도구는 오히려 방해.'
    ],
    scenario: {
      s: '멀티에이전트 리서치 — 광범위 주제를 여러 소스에서 조사·종합.',
      q: 'orchestrator에 모든 원문을 그대로 넣을까, subagent가 요약만 반환할까?',
      a: 'subagent가 격리된 컨텍스트에서 탐색 후 1–2k 요약만 orchestrator에 반환.',
      w: 'context rot 방지 + 병렬 + 토큰 절약. orchestrator는 종합에만 집중.'
    },
    quiz: [
      { q: 'workflow와 agent의 핵심 구분은?', a: '제어 경로가 코드에 고정(workflow) vs 모델이 런타임에 결정(agent).' },
      { q: 'orchestrator-workers는 언제 쓰나?', a: '서브태스크 구성이 입력에 따라 달라져 미리 못 정할 때.' },
      { q: '가장 견고한 검증 형태는?', a: '명확히 정의된 규칙(예: linter). LLM-judge는 덜 견고.' },
      { q: 'subagent의 주 이득 2가지?', a: '컨텍스트 격리 + 병렬 처리(요약만 반환).' }
    ],
    study: [
      'Agentic loop 해부: gather context → take action → verify → repeat.',
      'Workflow vs Agent 결정 기준.',
      '5 workflow 패턴 + orchestrator–worker 트레이드오프.',
      'Hooks / interception으로 결정론적 제어.',
      'Session & state, resume, 체크포인트.',
      'Task decomposition, stop 조건, 폭주 방지.'
    ],
    practice: [
      'Messages API tool-use로 최소 agent loop 구현(tool 1개 + 종료 조건).',
      'orchestrator + 2 subagent 리서치 파이프라인 → multi-agent-research-system.',
      '같은 과제를 workflow vs agent 두 설계로 → 트레이드오프 표.',
      'Claude Code hook 1개(PostToolUse 로깅/차단)로 개입점 체감.'
    ],
    lens: 'agentic loop ↔ HW verification loop(자극→응답→스코어보드→반복). multi-agent ↔ 파이프라인 IP 블록 조율·핸드셰이크. 종료 조건 = deadlock/livelock 방지.',
    scenarios: '멀티에이전트 리서치 · 고객지원 · 코드생성',
    res: {
      course: [{ t: 'Introduction to Subagents', url: 'https://anthropic.skilljar.com' }, { t: 'Building Applications with the Claude API', url: 'https://anthropic.skilljar.com', note: 'agent workflows' }],
      docs: [{ t: 'Building Effective AI Agents', url: 'https://www.anthropic.com/research/building-effective-agents', note: 'workflow/agent 패턴 원전' }, { t: 'Building agents with the Claude Agent SDK', url: 'https://claude.com/blog/building-agents-with-the-claude-agent-sdk' }, { t: 'docs — Agent SDK · Tool use', url: 'https://docs.claude.com' }],
      free: [{ t: 'WikiDocs 실전 대비서 · 도메인1', url: 'https://wikidocs.net/book/19518' }, { t: 'GitHub guide_ko.md', url: 'https://github.com/paullarionov/claude-certified-architect' }]
    }
  },

  {
    id: 'd3', code: 'D3', name: 'Claude Code Config & Workflows', ko: 'Claude Code 설정·운용',
    weight: 20, ts: 6, conf: 4, order: 2,
    tagline: '실무 강점 도메인. 경험을 시험 앵글로 형식화하는 게 관건.',
    essence: 'CLAUDE.md·commands·skills·hooks·permissions·headless로 Claude Code를 개발 워크플로우와 CI에 설정·운용하는 능력.',
    concepts: [
      { t: 'CLAUDE.md 계층', d: 'enterprise › project › user 우선순위. 자동 로드되는 메모리, @import, walk-up 탐색. 사전 로드 컨텍스트 + just-in-time(grep/glob) 조합.' },
      { t: 'Agent Skills', d: 'instructions/scripts/resources 폴더. Claude가 필요 시 동적으로 발견·로드해 전문 에이전트로. SKILL.md = YAML frontmatter(name·description) + 본문.' },
      { t: 'Progressive disclosure (3레벨)', d: 'L1 name·description 메타를 시스템 프롬프트에 사전 로드 → L2 관련 판단 시 SKILL.md 본문 로드 → L3 참조 파일은 필요할 때만. 번들 컨텍스트는 사실상 무한.' },
      { t: 'Skill vs MCP vs slash command', d: 'skill = 절차적 지식·워크플로우 캡슐(온디맨드). MCP = 외부 도구/데이터 연결. slash command = 사용자 트리거 프롬프트. skill과 MCP는 상보적.' },
      { t: 'Plan mode & permissions', d: '계획→실행 분리로 안전. settings.json의 allow/deny 규칙, permission 모드로 도구 사용 통제.' },
      { t: 'Hooks', d: 'PreToolUse/PostToolUse 등 라이프사이클 개입 지점으로 결정론적 제어(로깅·차단·주입) — 모델 판단이 아닌 코드로 강제.' },
      { t: 'Headless / CI', d: 'claude -p 원샷·배치로 비대화 실행. GitHub Actions에서 PR 리뷰 등 파이프라인 통합, 출력 파싱.' },
      { t: 'Agent SDK 관계', d: 'Claude Code를 구동하는 harness(구 Claude Code SDK)가 다른 agent도 구동. compaction·subagent 격리 등 컨텍스트 관리 제공.' }
    ],
    terms: [
      { a: 'Skill', b: 'MCP', why: '절차/지식 캡슐(온디맨드 로드) vs 외부 시스템 연결. 경쟁이 아니라 상보.' },
      { a: 'Skill', b: 'Slash command', why: '모델이 자동 트리거(name/description 판단) vs 사용자가 명시 호출.' },
      { a: 'CLAUDE.md project/user/enterprise', b: '', why: '범위·우선순위 차이(enterprise가 최상위).' },
      { a: 'PreToolUse hook', b: 'PostToolUse hook', why: '도구 실행 전 검증/차단 vs 실행 후 로깅/후처리.' }
    ],
    judgments: [
      '반복 지식을 skill vs command vs CLAUDE.md 중 어디에 둘까?',
      'headless로 CI에 넣을 때 권한·출력을 어떻게 통제하나?',
      'hook로 무엇을 결정론적으로 강제할까?',
      'progressive disclosure로 컨텍스트를 아끼는 skill 구조?'
    ],
    traps: [
      '모든 걸 CLAUDE.md에 몰아넣기 — 컨텍스트 낭비. skill의 progressive disclosure 활용.',
      'skill과 MCP를 경쟁 관계로 봄 — 상보적.',
      'CI에 full permission 부여 — 위험. allowlist·plan 모드로.',
      'skill을 사용자가 매번 수동 호출해야 한다고 생각 — 모델이 자동 트리거.'
    ],
    scenario: {
      s: 'CI/CD — PR마다 자동 코드 리뷰를 붙이려 한다.',
      q: '대화형 세션을 열어둘까, Actions에서 headless claude -p로 돌릴까?',
      a: 'headless claude -p + 권한 allowlist + 비대화 실행.',
      w: '파이프라인은 비대화·재현·최소권한이 필요. 대화형은 CI에 부적합.'
    },
    quiz: [
      { q: 'progressive disclosure 3레벨은?', a: 'name/description 메타 → SKILL.md 본문 → 참조 파일.' },
      { q: 'skill과 slash command의 트리거 차이?', a: '모델 자동 판단 vs 사용자 명시 호출.' },
      { q: 'CLAUDE.md 우선순위 순서?', a: 'enterprise › project › user.' },
      { q: 'PreToolUse hook의 용도?', a: '도구 실행 전 검증·차단(결정론적 제어).' }
    ],
    study: [
      'CLAUDE.md 계층·메모리·@import·walk-up.',
      'Custom commands & Skills(SKILL.md) 캡슐화 판단.',
      'Plan mode, settings.json allow/deny·hooks.',
      'Headless claude -p 배치·CI 통합.',
      'Subagents(Task) 위임, MCP 서버 연결.',
      'Iterative refinement, batch processing.'
    ],
    practice: [
      '워크스페이스에 /ccar-* 커스텀 커맨드 실제 작성.',
      'settings.json permission allowlist + hook 1개 구성·확인.',
      'headless 배치: claude -p로 파일 묶음 요약/변환.',
      'GitHub Actions에서 headless PR 리뷰 → claude-code-for-CI.'
    ],
    lens: '이미 로컬 스킬·CLAUDE.md 계층을 실전 운용 중. "왜 이렇게 짰나"를 시험 선택지 언어로 옮기는 연습이 곧 득점.',
    scenarios: '코드생성 · 개발자 생산성 · CI/CD',
    res: {
      course: [{ t: 'Introduction to Agent Skills', url: 'https://anthropic.skilljar.com' }, { t: 'Academy — Claude Code 트레이닝', url: 'https://anthropic.skilljar.com', note: '카탈로그 확인' }],
      docs: [{ t: 'docs — Claude Code', url: 'https://docs.claude.com', note: 'CLAUDE.md·hooks·headless·settings' }, { t: 'Agent Skills (engineering)', url: 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills' }],
      free: [{ t: 'WikiDocs 실전 대비서 · 도메인3', url: 'https://wikidocs.net/book/19518' }, { t: 'daronyondem 가이드', url: 'https://github.com/daronyondem/claude-architect-exam-guide' }]
    }
  },

  {
    id: 'd4', code: 'D4', name: 'Prompt Engineering & Structured Output', ko: '프롬프트·구조화 출력',
    weight: 20, ts: 6, conf: 3, order: 3,
    tagline: 'production에서 신뢰 가능한 출력 계약을 얻는 법. 추출·자동화의 뼈대.',
    essence: 'production에서 신뢰·검증 가능한 출력을 얻는 프롬프트 기법과 구조화 출력(JSON/schema) 강제 능력.',
    concepts: [
      { t: '기법 순서(권장)', d: '① 명확·직접 ② multishot 예시 ③ Claude가 생각하게(CoT) ④ XML 태그 구조화 ⑤ 역할(system prompt) ⑥ 응답 prefill ⑦ 복잡 프롬프트 chaining. 쉬운 것부터, eval로 검증.' },
      { t: '성공기준·eval 먼저', d: '프롬프트 엔지니어링 전에 성공기준 + 경험적 테스트를 세운다. 지연·비용은 프롬프트가 아니라 모델 선택으로 더 쉽게 풀리기도 한다.' },
      { t: 'Structured output (JSON)', d: 'tool use / tool_choice 강제가 가장 견고(스키마 보장). 보조로 prefill(`{`로 시작), XML 태그로 감싸기, stop sequences.' },
      { t: '예시 curation', d: '엣지케이스 나열보다 다양·정전형(canonical) 대표 예시. 예시는 LLM에게 "천 마디 말"급 신호.' },
      { t: 'System prompt altitude', d: '너무 구체(취약) vs 너무 모호(신호 부족) 사이 goldilocks. 배경/지시/도구/출력 섹션으로 구조화(XML·Markdown).' },
      { t: 'CoT / thinking', d: '복잡 추론은 생각 공간을 부여하면 정확도↑. 단 토큰·지연 비용.' },
      { t: '검증·복구', d: 'schema 검증으로 형식 이탈·환각을 잡고 재시도. 출력 계약을 코드로 보증.' }
    ],
    terms: [
      { a: 'prefill', b: 'stop sequence', why: '응답 시작을 강제 vs 종료를 강제.' },
      { a: 'tool use 강제', b: '자연어 JSON 요청', why: '스키마 보장 vs 형식 이탈 가능. 100% 필요하면 강제.' },
      { a: 'XML 태그', b: 'Markdown', why: '둘 다 구조 구분 수단. 태그가 파싱·경계에 명확.' },
      { a: 'CoT', b: '즉답', why: '추론 노출로 정확도↑(비용↑) vs 빠름.' }
    ],
    judgments: [
      'JSON이 100% 필요 → tool_choice 강제 vs prefill+XML?',
      '형식 이탈이 잦다 → 어떤 기법을 추가?',
      '예시를 몇 개·어떤 종류로?',
      '지연/비용 문제 → 프롬프트 개선 vs 모델 교체?'
    ],
    traps: [
      '"JSON으로 답해줘"만 하고 강제 안 함 — 형식 이탈.',
      '프롬프트로 지연을 해결하려 함 — 모델/구조 문제일 수 있음.',
      '엣지케이스만 잔뜩 예시 — 대표 예시가 더 효과적.',
      '과도하게 구체적인 system prompt — 취약·유지비↑.'
    ],
    scenario: {
      s: '구조화 데이터 추출 — 문서를 검증된 JSON으로.',
      q: '"JSON으로 답해줘"라고 지시할까, tool schema로 강제할까?',
      a: 'tool use / tool_choice로 스키마를 강제하고 schema 검증을 붙인다.',
      w: '자연어 지시는 형식 이탈 위험. 강제 + 검증이 출력 계약을 보장.'
    },
    quiz: [
      { q: '가장 견고한 JSON 강제 방법은?', a: 'tool use + tool_choice 강제.' },
      { q: 'prefill의 효과는?', a: '응답 시작을 고정(서두 제거, 형식 유도).' },
      { q: '프롬프트 엔지니어링 전에 필요한 것?', a: '성공기준 + 경험적 eval.' },
      { q: 'system prompt altitude란?', a: '너무 구체/모호 사이의 goldilocks 지점.' }
    ],
    study: [
      '프롬프트 원칙: 명확·직접, system 역할, multishot, CoT, XML, prefill.',
      'Structured output: tool-use/JSON schema로 형식 강제.',
      '검증·복구: schema 검증, 실패 모드 대응.',
      'Eval 루프: 평가셋으로 프롬프트 A/B.',
      '토큰·비용 감각(예시/CoT의 값어치).'
    ],
    practice: [
      '같은 추출을 (a) 자연어 vs (b) tool schema 강제로 짜고 안정성 비교.',
      'prefill + XML로 출력 형식 고정 실험.',
      '문서 → 검증 JSON 파이프라인 → structured-data-extraction.',
      '작은 eval 세트로 프롬프트 두 버전 점수화.'
    ],
    lens: 'structured output = 인터페이스 프로토콜 정의. schema = 포트 계약, 검증 = assertion, 형식 이탈 = 프로토콜 위반.',
    scenarios: '구조화 데이터 추출 · 개발자 생산성',
    res: {
      course: [{ t: 'Building Applications with the Claude API', url: 'https://anthropic.skilljar.com', note: 'prompting·structured output' }],
      docs: [{ t: 'docs — Prompt engineering', url: 'https://docs.claude.com', note: '기법·structured/JSON output' }, { t: 'Anthropic Cookbook', url: 'https://github.com/anthropics/anthropic-cookbook', note: '동작 예제' }],
      free: [{ t: 'WikiDocs 실전 대비서 · 도메인4', url: 'https://wikidocs.net/book/19518' }, { t: 'GitHub guide_ko.md', url: 'https://github.com/paullarionov/claude-certified-architect' }]
    }
  },

  {
    id: 'd2', code: 'D2', name: 'Tool Design & MCP Integration', ko: '툴 설계·MCP 통합',
    weight: 18, ts: 5, conf: 3, order: 4,
    tagline: 'Claude에 능력을 붙이는 법. tool description 품질이 곧 호출 정확도.',
    essence: '비결정적 agent가 안전·효율적으로 쓸 수 있는 도구를 설계하고, MCP로 외부 능력을 표준 방식으로 통합하는 능력.',
    concepts: [
      { t: '도구는 API 래핑이 아니다', d: '결정적 시스템 ↔ 비결정적 agent 간 계약. agent는 제한된 컨텍스트로 행동 가능성을 인지 → 전체 list가 아니라 search/filter 도구가 필요.' },
      { t: '좋은 이름·설명', d: '모호하지 않은 파라미터명(user_id, not user). "신입에게 설명하듯" 암묵 맥락을 명시. 서비스별 namespace(asana_search). 작은 설명 개선이 큰 향상.' },
      { t: '도구 통합(consolidation)', d: '여러 저수준 연산을 고수준 하나로(schedule_event = 가용성 찾기 + 예약, get_customer_context). agentic 연산을 도구 안으로 옮긴다.' },
      { t: '고신호·토큰 효율 응답', d: '의미있는 식별자(name, image_url) > uuid/mime_type. pagination·filtering·truncation, response_format enum(concise/detailed). Claude Code는 기본 25k 토큰 제한.' },
      { t: '구조화 에러', d: '불투명 코드가 아니라 구체적·실행가능한 개선을 제시 → agent가 자가복구하고 토큰 효율 전략으로 이동.' },
      { t: 'MCP 아키텍처', d: 'host · client · server. primitives = tools(행동) / resources(읽을 데이터) / prompts(사용자 템플릿). 인증·API 호출을 표준으로 처리.' },
      { t: 'Transport & 보안', d: 'stdio(로컬 프로세스) vs SSE/HTTP(원격·멀티유저). tool annotations로 파괴적/open-world 접근 공개. 권한·신뢰 경계·프롬프트 인젝션 주의.' },
      { t: '도구 개수 절제', d: '"많다고 좋지 않다." 고임팩트 워크플로우를 겨냥한 소수의 신중한 도구. 과다·중복은 효율 전략을 방해.' }
    ],
    terms: [
      { a: 'tool', b: 'resource / prompt', why: 'MCP primitive — 모델이 호출하는 행동 vs 읽을 데이터 vs 사용자 템플릿.' },
      { a: 'stdio', b: 'SSE / HTTP', why: '로컬 프로세스 transport vs 원격/네트워크 transport.' },
      { a: 'list_X', b: 'search_X', why: '전체 반환(컨텍스트 낭비) vs 필터된 고신호(agent friendly).' },
      { a: 'API endpoint', b: 'agent tool', why: '결정적↔결정적 계약 vs 결정적↔비결정적 계약.' }
    ],
    judgments: [
      '로컬 서버면 stdio, 원격/멀티유저면 SSE/HTTP?',
      '에러를 어떻게 구조화해 자가복구를 유도?',
      '도구를 통합할까 쪼갤까(명확·구분되는 목적)?',
      '식별자를 의미있게 반환(uuid → name)?',
      '도구를 더 추가 vs 정리(과다는 방해)?'
    ],
    traps: [
      '기존 REST API를 그대로 도구로 래핑 — agent affordance 무시.',
      '도구를 최대한 많이 붙이기 — 과다·중복은 성능↓.',
      'uuid를 그대로 반환 — 정밀도↓.',
      '불투명 에러 코드 — 자가복구 불가.'
    ],
    scenario: {
      s: '구조화 추출/CI — 대량 로그에서 특정 이벤트를 찾아야 한다.',
      q: 'read_logs(전체 반환)와 search_logs 중 무엇을 도구로?',
      a: 'search_logs — 필터된 고신호만 반환.',
      w: '전체 반환은 컨텍스트 폭발·토큰 낭비. agent는 제한 컨텍스트로 인지한다.'
    },
    quiz: [
      { q: '도구와 전통 API의 근본 차이?', a: '결정적↔비결정적 agent 간 계약. 제한 컨텍스트를 고려해야.' },
      { q: 'stdio vs SSE 선택 기준?', a: '로컬 vs 원격/네트워크(멀티유저).' },
      { q: '좋은 에러 응답이란?', a: '구체적·실행가능한 개선을 제시(자가복구).' },
      { q: 'MCP의 3 primitive?', a: 'tools · resources · prompts.' }
    ],
    study: [
      'Tool description best practice(when/how, 파라미터·반환 계약).',
      'Structured error로 자가복구.',
      'MCP host·client·server, primitives.',
      'Transport stdio vs SSE/HTTP 선택.',
      '보안 경계·프롬프트 인젝션.',
      'Claude built-in tools.'
    ],
    practice: [
      '최소 MCP 서버(tool 1–2개, stdio) → Claude Code에 연결·호출.',
      '나쁜 description → 좋은 것으로 리팩터, 호출 정확도 관찰.',
      '에러를 구조화 응답으로 바꿔 자가복구 유도.',
      '스키마를 structured-extraction·CI/CD 시나리오에 매핑.'
    ],
    lens: 'tool schema = HW 블록의 포트/프로토콜 계약. 애매한 description = 부실한 인터페이스 문서 → 오호출. MCP transport = 버스 프로토콜 선택.',
    scenarios: '구조화 추출 · 고객지원 · CI/CD',
    res: {
      course: [{ t: 'Introduction to MCP', url: 'https://anthropic.skilljar.com' }, { t: 'MCP: Advanced Topics', url: 'https://anthropic.skilljar.com' }],
      docs: [{ t: 'Writing effective tools for AI agents', url: 'https://www.anthropic.com/engineering/writing-tools-for-agents' }, { t: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io', note: 'MCP 공식 스펙' }, { t: 'docs — MCP · Tool use', url: 'https://docs.claude.com' }],
      free: [{ t: 'WikiDocs 실전 대비서 · 도메인2', url: 'https://wikidocs.net/book/19518' }, { t: 'GitHub guide_ko.md', url: 'https://github.com/paullarionov/claude-certified-architect' }]
    }
  },

  {
    id: 'd5', code: 'D5', name: 'Context Management & Reliability', ko: '컨텍스트 관리·신뢰성',
    weight: 15, ts: 5, conf: 3, order: 5,
    tagline: '긴 상호작용을 버티게 하고 production을 안 죽게 만드는 법. 시나리오 곳곳에 스며든다.',
    essence: '유한한 컨텍스트를 관리(compaction·외부 메모리·격리·JIT retrieval)하고 긴 작업·실패에 견고하게 만드는 능력.',
    concepts: [
      { t: 'Context engineering vs prompt engineering', d: '후자 = 단일 태스크 지시 작성. 전자 = 멀티턴 전체 토큰 상태(시스템·도구·데이터·이력)를 큐레이션·유지하는 반복적 관리.' },
      { t: 'Context rot / 유한 자원', d: '토큰이 늘수록 회상 정확도가 저하(attention은 n² 예산). diminishing returns — 모든 토큰이 attention 예산을 소모하므로 신호/잡음을 최적화.' },
      { t: 'Compaction(요약)', d: '한계 근처에서 핵심(결정·미해결 버그)을 요약하고 재시작. 먼저 최대 recall → 이후 불필요한 도구 출력 제거로 precision.' },
      { t: 'Structured note-taking(외부 메모리)', d: '컨텍스트 밖에 노트를 기록·회수(Claude Code to-do, Pokémon 목표 추적). 수천 스텝을 in-context 없이 유지.' },
      { t: 'Sub-agent 격리', d: '전용 서브에이전트가 깨끗한 컨텍스트로 탐색 후 1–2k 요약만 조율 에이전트에 반환. 상세 탐색과 고수준 종합을 분리.' },
      { t: 'Just-in-time retrieval', d: '경량 식별자(경로·URL·쿼리)만 유지하고 런타임에 로드. 메타데이터(폴더·이름·시간)가 신호. hybrid(일부 사전 로드 + 탐색).' },
      { t: 'Prompt caching', d: '반복되는 접두(시스템·도구·문서)를 캐시해 비용·지연↓. cache breakpoint·TTL 관리. (docs 근거)' },
      { t: '신뢰성', d: '재시도/backoff, 타임아웃, rate limit 대응, 부분 실패 시 graceful degradation, 검증·로깅으로 실패 감지·복구.' }
    ],
    terms: [
      { a: 'context engineering', b: 'prompt engineering', why: '전체 토큰 상태 큐레이션(멀티턴) vs 단일 지시 작성.' },
      { a: 'compaction', b: 'truncation', why: '핵심을 요약 보존 vs 단순 절단(핵심 소실 위험).' },
      { a: 'external memory', b: 'in-context', why: '컨텍스트 밖 저장·회수 vs 안에 다 담기(context rot).' },
      { a: 'JIT retrieval', b: 'pre-loading(RAG)', why: '런타임 로드(정확·유연) vs 사전 임베딩(빠름).' }
    ],
    judgments: [
      '긴 작업 → compaction vs 외부 메모리 vs subagent 중 무엇을?',
      '무엇을 사전 로드하고 무엇을 JIT로 가져올까?',
      '재시도·타임아웃·degradation 전략을 어떻게?',
      '무엇을 캐시하고 breakpoint를 어디에?'
    ],
    traps: [
      '컨텍스트에 다 넣으면 좋다 — context rot로 정확도↓.',
      'truncation으로 충분 — 핵심 소실. compaction이 낫다.',
      'RAG가 항상 정답 — agentic/JIT가 더 정확할 때가 많다.',
      '캐시 없이 반복 접두를 매번 전송 — 비용·지연 낭비.'
    ],
    scenario: {
      s: '멀티에이전트 리서치/장기 작업 — 수천 스텝을 넘긴다.',
      q: '모든 이력을 컨텍스트에 유지할까, 외부 노트 + compaction을 쓸까?',
      a: '외부 메모리 + compaction + subagent 격리.',
      w: 'context rot를 피하고 attention 예산을 보존. 핵심만 남기고 나머지는 밖에.'
    },
    quiz: [
      { q: 'context rot이란?', a: '토큰이 늘수록 회상·정확도가 저하되는 현상.' },
      { q: 'compaction이란?', a: '한계 근처에서 핵심을 요약하고 재시작하는 것.' },
      { q: 'JIT retrieval의 이점?', a: '컨텍스트 절약 + 메타데이터 신호 + 인간 인지 모사.' },
      { q: 'subagent가 컨텍스트에 주는 이득?', a: '격리된 탐색 후 요약만 반환(오염 방지).' }
    ],
    study: [
      'Context window 예산·토큰 카운팅.',
      'Prompt caching(대상·breakpoint·TTL·비용).',
      '긴 대화: 요약·압축·context editing·외부 메모리.',
      '신뢰성: 재시도/backoff, 타임아웃, rate limit, degradation.',
      '실패 감지·로깅·복구(관측).'
    ],
    practice: [
      'prompt caching 전/후 토큰·비용·지연 측정.',
      '긴 문서를 요약 체인으로 압축 후 QA 정확도 비교.',
      '재시도·타임아웃 래퍼 작성, rate-limit 시뮬.',
      '멀티에이전트에서 컨텍스트 예산 배분 설계.'
    ],
    lens: 'token budget = 대역폭·버퍼 예산. context 관리 = 파이프라인 backpressure·caching. 재시도/degradation = fault tolerance·리던던시.',
    scenarios: '멀티에이전트 리서치 · 고객지원',
    res: {
      course: [{ t: 'Building Applications with the Claude API', url: 'https://anthropic.skilljar.com', note: 'production·reliability' }],
      docs: [{ t: 'Effective context engineering', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents' }, { t: 'Harnesses for long-running agents', url: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents' }, { t: 'docs — Context windows · Prompt caching', url: 'https://docs.claude.com' }],
      free: [{ t: 'WikiDocs 실전 대비서 · 도메인5', url: 'https://wikidocs.net/book/19518' }, { t: 'GitHub guide_ko.md', url: 'https://github.com/paullarionov/claude-certified-architect' }]
    }
  }
];

const SCENARIOS = [
  { slug: 'customer-support-resolution-agent', t: '고객지원 해결 에이전트', d: '티켓 triage + 해결 파이프라인', dom: 'D1·D2·D5' },
  { slug: 'code-generation-with-claude-code', t: 'Claude Code 코드생성', d: '자율 PR 리뷰·코드 생성', dom: 'D3·D1' },
  { slug: 'multi-agent-research-system', t: '멀티에이전트 리서치', d: 'orchestrator + 전문 subagent 검색·종합', dom: 'D1·D5' },
  { slug: 'developer-productivity-with-claude', t: '개발자 생산성', d: 'IDE 통합, CLAUDE.md, 워크플로우 자동화', dom: 'D3·D4' },
  { slug: 'claude-code-for-continuous-integration', t: 'CI/CD용 Claude Code', d: 'headless Claude를 빌드 파이프라인에', dom: 'D3·D2' },
  { slug: 'structured-data-extraction', t: '구조화 데이터 추출', d: '문서 → 검증된 JSON schema', dom: 'D4·D2' }
];

window.CCARF = { META, PATH, LOOP, SCHEDULE, LIBRARY, DOMAINS, SCENARIOS };
