/* CCAR-F Study — content (data layer). Vanilla, no build.
 * Draft (v0.3, English-only). Domain notes distilled from official sources.
 * NOTE: exam facts and the task-statement blueprint now live in the compiled Guide tab (data/content.js),
 * verified against the official Exam Guide v1.0. This file is legacy study notes, migrating to markdown source.
 * Sources: docs.claude.com · anthropic.com/engineering · modelcontextprotocol.io */

const META = {
  version: 'v0.3 · notes',
  updated: '2026-07-13',
  exam: [
    { v: '60', l: 'items · choice + multi-response' },
    { v: '4 / 6', l: 'scenarios drawn at random' },
    { v: '720', l: 'pass mark / 1000' },
    { v: '120min', l: 'time limit' },
    { v: '$125', l: 'fee · valid 12 months' }
  ],
  note: 'The exam is closed-book and scenario-based — it tests architectural judgment under constraints, not memorization.'
};

const PATH = [
  { n: '01', t: 'Claude 101', tag: 'basics', d: 'Baseline of Claude usage patterns and capabilities' },
  { n: '02', t: 'AI Fluency: Framework & Foundations', tag: 'basics', d: 'Collaboration, delegation, discernment framework' },
  { n: '03', t: 'Building Applications with the Claude API', tag: 'D1·D4·D5', d: 'API, structured output, production patterns (core)' },
  { n: '04', t: 'Introduction to Model Context Protocol', tag: 'D2', d: 'MCP tools, resources, prompts' },
  { n: '05', t: 'Model Context Protocol: Advanced Topics', tag: 'D2', d: 'Transport, security, server design' },
  { n: '06', t: 'Introduction to Subagents', tag: 'D1', d: 'Orchestrator–worker multi-agent' },
  { n: '07', t: 'Introduction to Agent Skills', tag: 'D3·D1', d: 'Extend agents with Skills' }
];

const LOOP = [
  { n: '01 COURSE', t: 'Course', d: 'Big picture from the Academy course' },
  { n: '02 DOCS', t: 'Docs', d: 'Precision from docs.claude.com' },
  { n: '03 FIELD', t: 'Field', d: 'Judgment (why/when) from engineering posts' },
  { n: '04 BUILD', t: 'Build', d: 'Internalize by building it yourself' },
  { n: '05 DRILL', t: 'Drill', d: 'Exam feel & wrong-answer patterns from practice' },
  { n: '06 DISTILL', t: 'Distill', d: 'Distill into notes → this app' }
];

const SCHEDULE = [
  { n: 'W1 · Jul 13', d: 'D1 pt.1', r: 'agentic loop · orchestration' },
  { n: 'W2 · Jul 20', d: 'D1 pt.2', r: 'multi-agent · hooks · state' },
  { n: 'W3 · Jul 27', d: 'D3', r: 'Claude Code (strength)' },
  { n: 'W4 · Aug 3', d: 'D4', r: 'prompt · structured output' },
  { n: 'W5 · Aug 10', d: 'D2', r: 'tool design · MCP' },
  { n: 'W6 · Aug 17', d: 'D5', r: 'context · reliability' },
  { n: 'W7 · Aug 24', d: 'Scenario Lab', r: '6 scenarios end-to-end' },
  { n: 'W8 · Aug 31', d: 'Drill App', r: 'expand questions · sims' },
  { n: 'W9 · Sep 7', d: 'Mock', r: 'full mocks + weak areas' },
  { n: 'W10 · Sep 14', d: 'Exam ▸', r: 'final review · buffer', exam: true }
];

const LIBRARY = [
  { t: 'Anthropic Academy', tag: 'Official · free', d: '13 self-paced courses. The core of the recommended CCA-F path.', url: 'https://anthropic.skilljar.com' },
  { t: 'Official certification page', tag: 'Official', d: 'CCA-F eligibility, exam, guide. Partner Network (free) & seat booking.', url: 'https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request' },
  { t: 'docs.claude.com', tag: 'Official · precise', d: 'Primary source for every fact. Claude Code · Agent SDK · MCP · Prompt · Context.', url: 'https://docs.claude.com' },
  { t: 'Anthropic Engineering', tag: 'Official · field', d: 'Building Effective Agents · Writing tools · Context engineering · Agent Skills.', url: 'https://www.anthropic.com/engineering' },
  { t: 'CCA-F prep book (WikiDocs, Korean)', tag: 'practice', d: 'Per-domain summary cards, key terms, judgment scenarios, practice questions, mini-mocks, hands-on labs, flashcards.', url: 'https://wikidocs.net/book/19518' },
  { t: 'GitHub prep materials', tag: 'Free · multi-lang', d: 'paullarionov (13-language guide, PDF, Anki) · daronyondem (exam guide).', url: 'https://github.com/paullarionov/claude-certified-architect' }
];

const DOMAINS = [
  {
    id: 'd1', code: 'D1', name: 'Agentic Architecture & Orchestration', ko: 'agent design & orchestration',
    weight: 27, ts: 7, conf: 4, order: 1,
    tagline: 'The agentic loop is the backbone the other domains hang on. The biggest domain.',
    essence: 'Distinguishing structured workflows from autonomous agents, and designing the agentic loop (gather context → act → verify → repeat) and multi-agent orchestration to fit the situation.',
    concepts: [
      { t: 'Augmented LLM (building block)', d: 'An LLM enhanced with retrieval, tools, and memory. It generates its own search queries, selects tools, and decides what to retain. Clear, documented interfaces are key.' },
      { t: 'Workflow vs Agent', d: 'Workflow = orchestration through predefined code paths. Agent = the model dynamically directs its own process and tool use at runtime. Predictable step count → workflow; open-ended → agent.' },
      { t: 'Agentic loop', d: 'gather context → take action → verify work → repeat. The verification feedback lets the system self-correct before errors compound.' },
      { t: '5 workflow patterns', d: 'prompt chaining (sequential + gates) · routing (classify → specialized path) · parallelization (sectioning for speed / voting for confidence) · orchestrator-workers (a central LLM decomposes, delegates, synthesizes) · evaluator-optimizer (generate ↔ feedback loop).' },
      { t: 'Multi-agent (orchestrator–worker)', d: 'Subagents isolate the context window, explore in parallel, and return only a distilled summary (1–2k tokens). Gains = isolation + parallelism; costs = more tokens, coordination complexity, compounding error.' },
      { t: 'Verification (3 forms)', d: 'rule-based (a linter is the most robust) · visual feedback (screenshots) · LLM-as-judge (fuzzy criteria, less robust but useful).' },
      { t: 'Agentic search vs RAG', d: 'Agentic = grep/bash to search on the spot (accurate, transparent, easy to maintain). Semantic/RAG = pre-computed embeddings (fast but less accurate). Prefer agentic; use RAG when it falls short.' },
      { t: '3 principles', d: 'Simplicity (add complexity only when needed) · Transparency (show the plan) · ACI, the agent-computer interface (tool docs, examples, edge cases; "poka-yoke" tools to prevent mistakes).' }
    ],
    terms: [
      { a: 'Workflow', b: 'Agent', why: 'Both are agentic systems, but control lives in different places — fixed code vs the model deciding at runtime.' },
      { a: 'Orchestrator-workers', b: 'Parallelization (sectioning)', why: 'Orchestrator decides subtasks dynamically at runtime; sectioning is fixed, independent pieces decided in advance.' },
      { a: 'Routing', b: 'Orchestrator', why: 'Routing classifies then follows one fixed path; orchestrator decomposes + delegates to many + synthesizes.' },
      { a: 'Agentic search', b: 'Semantic search (RAG)', why: 'Search on the spot (accurate) vs pre-embedded (fast, less accurate). Default to agentic.' }
    ],
    judgments: [
      'Is the step count predictable? → workflow (chaining/routing) vs autonomous agent.',
      'Routing vs orchestrator? Can you enumerate the whole task list up front, and is there a merge? Enumerable + no merge = routing; built at runtime + aggregated = orchestrator.',
      'Orchestrator vs agent? Only a feedback loop (the model decides the next step + when to stop) makes it an agent — "runtime-dynamic" alone does not.',
      'Which rung of the ladder? augmented LLM → workflow → single agent → multi-agent. Pick the lowest that works; each climb adds real cost (an agent is a loop = N calls/item, nondeterminism, control burden).',
      'Which reliability control for which failure? terminate → stop condition; correct → INDEPENDENT verification; on-goal → re-anchor the goal in durable state; cost → budget cap; bounds → guardrails.',
      'Where does the human go? A milestone gate between phases (efficiency) + a mandatory gate right before any irreversible / high-stakes action (safety) — not at every step.'
    ],
    traps: [
      '"Multi-agent is always better" — no. Simplicity first; add complexity only when it earns its keep.',
      'Making everything an autonomous agent — predictable tasks are safer and cheaper as a workflow.',
      'Reaching for RAG first by default — agentic search is often more accurate and easier to maintain.',
      '"More tools = more power" — too many or overlapping tools distract the agent.'
    ],
    scenario: {
      s: 'Multi-agent research — survey and synthesize a broad topic from many sources.',
      q: 'Feed all raw sources into the orchestrator, or have subagents return only summaries?',
      a: 'Subagents explore in isolated context and return only 1–2k summaries to the orchestrator.',
      w: 'Avoids context rot, enables parallelism, saves tokens; the orchestrator focuses on synthesis.'
    },
    quiz: [
      { q: 'The core distinction between workflow and agent?', a: 'Whether the path is fixed in code (workflow) or decided by the model at runtime (agent).' },
      { q: 'When do you use orchestrator-workers?', a: 'When subtask composition depends on the input and cannot be predefined.' },
      { q: 'The most robust form of verification?', a: 'Clearly defined rules (e.g., a linter). LLM-as-judge is less robust.' },
      { q: 'Two main benefits of a subagent?', a: 'Context isolation + parallelism (it returns only a summary).' }
    ],
    study: [
      'Anatomy of the agentic loop: gather context → act → verify → repeat.',
      'Deciding workflow vs agent.',
      '5 workflow patterns + orchestrator–worker tradeoffs.',
      'Hooks / interception for deterministic control.',
      'Session & state, resume, checkpoints.',
      'Task decomposition, stop conditions, avoiding runaway loops.'
    ],
    practice: [
      'Build a minimal agent loop with the Messages API tool-use (1 tool + a stop condition).',
      'Sketch an orchestrator + 2 subagents research pipeline → multi-agent-research-system.',
      'Design the same task both as a workflow and as an agent → tradeoff table.',
      'Write one Claude Code hook (PostToolUse logging/blocking) to feel the intervention point.'
    ],
    lens: 'agentic loop ↔ HW verification loop (stimulus → response → scoreboard → repeat). multi-agent ↔ coordinating pipeline IP blocks / handshakes. stop conditions = deadlock/livelock prevention.',
    scenarios: 'Multi-agent research · Customer support · Code generation',
    res: {
      course: [{ t: 'Introduction to Subagents', url: 'https://anthropic.skilljar.com' }, { t: 'Building Applications with the Claude API', url: 'https://anthropic.skilljar.com', note: 'agent workflows' }],
      docs: [{ t: 'Building Effective AI Agents', url: 'https://www.anthropic.com/research/building-effective-agents', note: 'the workflow/agent patterns source' }, { t: 'Building agents with the Claude Agent SDK', url: 'https://claude.com/blog/building-agents-with-the-claude-agent-sdk' }, { t: 'docs — Agent SDK · Tool use', url: 'https://docs.claude.com' }],
      free: [{ t: 'WikiDocs prep book · Domain 1', url: 'https://wikidocs.net/book/19518' }, { t: 'GitHub guide (multi-language)', url: 'https://github.com/paullarionov/claude-certified-architect' }]
    }
  },

  {
    id: 'd3', code: 'D3', name: 'Claude Code Config & Workflows', ko: 'Claude Code configuration',
    weight: 20, ts: 6, conf: 4, order: 2,
    tagline: 'A practical strength — the work is formalizing that experience into exam-shaped judgment.',
    essence: 'Configuring and operating Claude Code across dev workflows and CI using CLAUDE.md, commands, skills, hooks, permissions, and headless mode.',
    concepts: [
      { t: 'CLAUDE.md hierarchy', d: 'Priority enterprise › project › user. Auto-loaded memory, @import, walk-up discovery. Pre-loaded context combined with just-in-time retrieval (grep/glob).' },
      { t: 'Custom commands & Skills', d: 'Slash commands and Agent Skills. A skill is a folder Claude discovers and loads on demand. SKILL.md = YAML frontmatter (name·description) + body.' },
      { t: 'Progressive disclosure (3 levels)', d: 'L1: name·description metadata pre-loaded into the system prompt → L2: full SKILL.md loaded when relevant → L3: referenced files only when needed. Bundled context is effectively unbounded.' },
      { t: 'Skill vs MCP vs slash command', d: 'Skill = a capsule of procedural knowledge/workflow (on demand). MCP = a connection to external tools/data. Slash command = a user-triggered prompt. Skills and MCP are complementary.' },
      { t: 'Plan mode & permissions', d: 'Separating planning from execution for safety. settings.json allow/deny rules and permission modes govern tool use.' },
      { t: 'Hooks', d: 'Lifecycle intervention points (PreToolUse/PostToolUse, etc.) give deterministic control — logging, blocking, injection — enforced by code, not model judgment.' },
      { t: 'Headless / CI', d: 'claude -p for one-shot/batch, non-interactive runs. Integrate into pipelines (e.g., PR review in GitHub Actions), parse the output.' },
      { t: 'Agent SDK relation', d: 'The harness that powers Claude Code (formerly Claude Code SDK) can power other agents too. It provides context management (compaction, subagent isolation).' }
    ],
    terms: [
      { a: 'Skill', b: 'MCP', why: 'A knowledge/procedure capsule (loaded on demand) vs a connection to external systems. Complementary, not competing.' },
      { a: 'Skill', b: 'Slash command', why: 'The model auto-triggers a skill (by name/description) vs the user explicitly invokes a command.' },
      { a: 'CLAUDE.md project/user/enterprise', b: '', why: 'Different scope and priority (enterprise is highest).' },
      { a: 'PreToolUse hook', b: 'PostToolUse hook', why: 'Validate/block before a tool runs vs log/post-process after it runs.' }
    ],
    judgments: [
      'Where does recurring knowledge go — skill vs command vs CLAUDE.md?',
      'Running headless in CI: how do you control permissions and output?',
      'What do you enforce deterministically with a hook?',
      'How do you structure a skill so progressive disclosure saves context?'
    ],
    traps: [
      'Cramming everything into CLAUDE.md — wastes context. Use a skill\'s progressive disclosure.',
      'Treating skills and MCP as competitors — they are complementary.',
      'Granting full permissions in CI — risky. Use an allowlist and plan mode.',
      'Assuming the user must invoke a skill manually every time — the model auto-triggers it.'
    ],
    scenario: {
      s: 'CI/CD — you want an automated code review on every PR.',
      q: 'Keep an interactive session open, or run headless claude -p in Actions?',
      a: 'Headless claude -p + a permission allowlist + non-interactive run.',
      w: 'A pipeline needs to be non-interactive, reproducible, and least-privilege. Interactive sessions do not fit CI.'
    },
    quiz: [
      { q: 'The 3 levels of progressive disclosure?', a: 'name/description metadata → the SKILL.md body → referenced files.' },
      { q: 'Trigger difference: skill vs slash command?', a: 'Model auto-triggers vs user explicitly invokes.' },
      { q: 'CLAUDE.md priority order?', a: 'enterprise › project › user.' },
      { q: 'Purpose of a PreToolUse hook?', a: 'Validate/block before a tool runs (deterministic control).' }
    ],
    study: [
      'CLAUDE.md hierarchy, memory, @import, walk-up.',
      'Custom commands & Skills (SKILL.md), when to encapsulate as which.',
      'Plan mode, settings.json allow/deny, hooks.',
      'Headless claude -p batch & CI integration.',
      'Subagents (Task) delegation, connecting MCP servers.',
      'Iterative refinement, batch processing.'
    ],
    practice: [
      'Author real /ccar-* custom commands in the workspace.',
      'Configure a settings.json permission allowlist + one hook, and verify behavior.',
      'Headless batch: summarize/transform a set of files with claude -p.',
      'Run headless PR review in GitHub Actions → claude-code-for-CI.'
    ],
    lens: 'Already running local skills and a CLAUDE.md hierarchy in practice. The win is translating "why I built it this way" into the exam\'s answer language.',
    scenarios: 'Code generation · Developer productivity · CI/CD',
    res: {
      course: [{ t: 'Introduction to Agent Skills', url: 'https://anthropic.skilljar.com' }, { t: 'Academy — Claude Code training', url: 'https://anthropic.skilljar.com', note: 'check the catalog' }],
      docs: [{ t: 'docs — Claude Code', url: 'https://docs.claude.com', note: 'CLAUDE.md · hooks · headless · settings' }, { t: 'Agent Skills (engineering)', url: 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills' }],
      free: [{ t: 'WikiDocs prep book · Domain 3', url: 'https://wikidocs.net/book/19518' }, { t: 'daronyondem exam guide', url: 'https://github.com/daronyondem/claude-architect-exam-guide' }]
    }
  },

  {
    id: 'd4', code: 'D4', name: 'Prompt Engineering & Structured Output', ko: 'prompting & structured output',
    weight: 20, ts: 6, conf: 3, order: 3,
    tagline: 'Getting a reliable output contract in production. The backbone of extraction/automation scenarios.',
    essence: 'Prompting techniques and enforced structured output (JSON/schema) that produce reliable, verifiable results in production.',
    concepts: [
      { t: 'Technique order (recommended)', d: '① be clear & direct ② multishot examples ③ let Claude think (CoT) ④ XML tags for structure ⑤ a role (system prompt) ⑥ prefill the response ⑦ chain complex prompts. Start simple; verify with evals.' },
      { t: 'Success criteria & evals first', d: 'Set success criteria and empirical tests before prompt engineering. Latency/cost are sometimes solved by picking a different model, not by prompting.' },
      { t: 'Structured output (JSON)', d: 'Forcing tool use / tool_choice is the most robust (guarantees the schema). Supporting moves: prefill (start with `{`), wrap in XML tags, stop sequences.' },
      { t: 'Example curation', d: 'Prefer diverse, canonical representative examples over an exhaustive list of edge cases. Examples are a "picture worth a thousand words" for an LLM.' },
      { t: 'System prompt altitude', d: 'A goldilocks zone between too specific (fragile) and too vague (weak signal). Structure it into sections (background, instructions, tools, output) with XML/Markdown.' },
      { t: 'CoT / thinking', d: 'Giving room to reason raises accuracy on complex tasks — at a token/latency cost.' },
      { t: 'Verify & recover', d: 'Catch format drift and hallucination with schema validation and retry. Enforce the output contract in code.' }
    ],
    terms: [
      { a: 'prefill', b: 'stop sequence', why: 'Force the start of the response vs force where it ends.' },
      { a: 'forced tool use', b: 'natural-language JSON request', why: 'Guarantees the schema vs allows format drift. If 100% needed, force it.' },
      { a: 'XML tags', b: 'Markdown', why: 'Both delineate structure; tags are clearer for parsing and boundaries.' },
      { a: 'CoT', b: 'direct answer', why: 'Expose reasoning for higher accuracy (higher cost) vs faster.' }
    ],
    judgments: [
      'JSON must be 100% valid → force tool_choice vs prefill+XML?',
      'Format drifts often → which technique do you add?',
      'How many examples, and of what kind?',
      'Latency/cost problem → improve the prompt vs switch the model?'
    ],
    traps: [
      'Just saying "answer in JSON" without forcing it — format drift.',
      'Trying to fix latency with prompting — it may be a model/architecture issue.',
      'Piling on only edge-case examples — representative examples work better.',
      'An over-specific system prompt — fragile and costly to maintain.'
    ],
    scenario: {
      s: 'Structured data extraction — turn a document into validated JSON.',
      q: 'Instruct "answer in JSON", or force it with a tool schema?',
      a: 'Force the schema with tool use / tool_choice and add schema validation.',
      w: 'Natural-language instruction risks format drift; forcing + validation guarantees the output contract.'
    },
    quiz: [
      { q: 'Most robust way to force JSON?', a: 'Forced tool use + tool_choice.' },
      { q: 'What does prefill do?', a: 'Pins the start of the response (removes preamble, steers format).' },
      { q: 'What is needed before prompt engineering?', a: 'Success criteria + empirical evals.' },
      { q: 'What is system prompt altitude?', a: 'The goldilocks point between too specific and too vague.' }
    ],
    study: [
      'Prompting principles: clear & direct, role, multishot, CoT, XML, prefill.',
      'Structured output: force format with tool-use / JSON schema.',
      'Verify & recover: schema validation, failure modes.',
      'Eval loop: A/B prompt versions against an eval set.',
      'Token/cost sense (the payoff of examples/CoT).'
    ],
    practice: [
      'Do the same extraction (a) natural-language vs (b) forced tool schema, compare stability.',
      'Pin the output format with prefill + XML and test.',
      'Build a document → validated JSON pipeline → structured-data-extraction.',
      'Score two prompt versions with a small eval set.'
    ],
    lens: 'Structured output = defining an interface protocol. Schema = the port contract, validation = assertions, format drift = a protocol violation.',
    scenarios: 'Structured data extraction · Developer productivity',
    res: {
      course: [{ t: 'Building Applications with the Claude API', url: 'https://anthropic.skilljar.com', note: 'prompting · structured output' }],
      docs: [{ t: 'docs — Prompt engineering', url: 'https://docs.claude.com', note: 'techniques · structured/JSON output' }, { t: 'Anthropic Cookbook', url: 'https://github.com/anthropics/anthropic-cookbook', note: 'working examples' }],
      free: [{ t: 'WikiDocs prep book · Domain 4', url: 'https://wikidocs.net/book/19518' }, { t: 'GitHub guide (multi-language)', url: 'https://github.com/paullarionov/claude-certified-architect' }]
    }
  },

  {
    id: 'd2', code: 'D2', name: 'Tool Design & MCP Integration', ko: 'tool design & MCP',
    weight: 18, ts: 5, conf: 3, order: 4,
    tagline: 'How you give Claude capabilities. Tool description quality is call accuracy.',
    essence: 'Designing tools a non-deterministic agent can use safely and efficiently, and integrating external capabilities via MCP in a standard way.',
    concepts: [
      { t: 'A tool is not an API wrapper', d: 'It is a contract between a deterministic system and a non-deterministic agent. The agent perceives possible actions with limited context → it needs search/filter tools, not full lists.' },
      { t: 'Good names & descriptions', d: 'Unambiguous parameter names (user_id, not user). Make implicit context explicit ("describe it to a new hire"). Namespace by service (asana_search). Small description tweaks yield big gains.' },
      { t: 'Tool consolidation', d: 'Fold several low-level operations into one high-level tool (schedule_event = find availability + book; get_customer_context). Move agentic computation into the tool.' },
      { t: 'High-signal, token-efficient responses', d: 'Meaningful identifiers (name, image_url) over uuid/mime_type. Pagination, filtering, truncation; a response_format enum (concise/detailed). Claude Code defaults to a 25k-token cap.' },
      { t: 'Structured errors', d: 'Not an opaque code — offer specific, actionable improvements so the agent self-recovers and moves to a token-efficient strategy.' },
      { t: 'MCP architecture', d: 'host · client · server. Primitives = tools (actions) / resources (data to read) / prompts (user templates). Handles auth & API calls as a standard.' },
      { t: 'Transport & security', d: 'stdio (local process) vs SSE/HTTP (remote, multi-user). Tool annotations disclose destructive or open-world access. Watch permissions, trust boundaries, prompt injection.' },
      { t: 'Restraint on tool count', d: '"More is not better." A few thoughtful tools aimed at high-impact workflows. Too many or overlapping tools derail efficient strategies.' }
    ],
    terms: [
      { a: 'tool', b: 'resource / prompt', why: 'MCP primitives — an action the model calls vs data to read vs a user-triggered template.' },
      { a: 'stdio', b: 'SSE / HTTP', why: 'Local-process transport vs remote/network transport.' },
      { a: 'list_X', b: 'search_X', why: 'Return everything (wastes context) vs filtered, high-signal (agent-friendly).' },
      { a: 'API endpoint', b: 'agent tool', why: 'A deterministic↔deterministic contract vs a deterministic↔non-deterministic contract.' }
    ],
    judgments: [
      'Local server → stdio; remote/multi-user → SSE/HTTP?',
      'How do you shape an error so the agent self-recovers?',
      'Consolidate or split a tool (clear, distinct purpose)?',
      'Return meaningful identifiers (uuid → name)?',
      'Add more tools vs prune (too many derail the agent)?'
    ],
    traps: [
      'Wrapping an existing REST API directly as a tool — ignores agent affordances.',
      'Adding as many tools as possible — too many/overlapping hurts performance.',
      'Returning raw uuids — reduces precision.',
      'Opaque error codes — no self-recovery.'
    ],
    scenario: {
      s: 'Structured extraction / CI — find a specific event in a large log.',
      q: 'read_logs (return everything) or search_logs as the tool?',
      a: 'search_logs — return only filtered, high-signal results.',
      w: 'Returning everything explodes context and wastes tokens; the agent perceives with limited context.'
    },
    quiz: [
      { q: 'The fundamental difference between a tool and a traditional API?', a: 'A deterministic↔non-deterministic-agent contract; you must respect limited context.' },
      { q: 'stdio vs SSE selection criterion?', a: 'Local vs remote/network (multi-user).' },
      { q: 'What is a good error response?', a: 'Specific, actionable improvements (enables self-recovery).' },
      { q: 'The 3 MCP primitives?', a: 'tools · resources · prompts.' }
    ],
    study: [
      'Tool description best practices (when/how, parameter & return contracts).',
      'Structured errors for self-recovery.',
      'MCP host·client·server, primitives.',
      'Transport: stdio vs SSE/HTTP selection.',
      'Security boundaries · prompt injection.',
      'Claude built-in tools.'
    ],
    practice: [
      'Write a minimal MCP server (1–2 tools, stdio) → connect & call from Claude Code.',
      'Refactor a bad description into a good one, observe call accuracy.',
      'Turn an error into a structured response to induce self-recovery.',
      'Map a schema onto the structured-extraction / CI-CD scenarios.'
    ],
    lens: 'A tool schema = the port/protocol contract of a HW block. A vague description = poor interface docs → mis-calls. MCP transport = choosing the bus protocol.',
    scenarios: 'Structured extraction · Customer support · CI/CD',
    res: {
      course: [{ t: 'Introduction to MCP', url: 'https://anthropic.skilljar.com' }, { t: 'MCP: Advanced Topics', url: 'https://anthropic.skilljar.com' }],
      docs: [{ t: 'Writing effective tools for AI agents', url: 'https://www.anthropic.com/engineering/writing-tools-for-agents' }, { t: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io', note: 'official MCP spec' }, { t: 'docs — MCP · Tool use', url: 'https://docs.claude.com' }],
      free: [{ t: 'WikiDocs prep book · Domain 2', url: 'https://wikidocs.net/book/19518' }, { t: 'GitHub guide (multi-language)', url: 'https://github.com/paullarionov/claude-certified-architect' }]
    }
  },

  {
    id: 'd5', code: 'D5', name: 'Context Management & Reliability', ko: 'context & reliability',
    weight: 15, ts: 6, conf: 3, order: 5,
    tagline: 'Keeping long interactions alive and production from dying. Smaller weight, but it seeps into every scenario.',
    essence: 'Managing finite context (compaction, external memory, isolation, just-in-time retrieval) and making long tasks and failures robust.',
    concepts: [
      { t: 'Context engineering vs prompt engineering', d: 'The latter writes instructions for a single task. The former curates and maintains the entire token state (system, tools, data, history) across multi-turn interactions.' },
      { t: 'Context rot / finite resource', d: 'As tokens grow, recall accuracy degrades (attention is an n² budget). Diminishing returns — every token spends the attention budget, so optimize signal-to-noise.' },
      { t: 'Compaction (summarization)', d: 'Near the limit, summarize what matters (decisions, open bugs) and restart. First maximize recall, then improve precision by dropping redundant tool output.' },
      { t: 'Structured note-taking (external memory)', d: 'Write notes outside the context window and retrieve later (Claude Code to-dos; tracking objectives across thousands of steps) — without keeping it all in-context.' },
      { t: 'Sub-agent isolation', d: 'A dedicated subagent explores in a clean context and returns only a 1–2k summary to the coordinator. Separates detailed exploration from high-level synthesis.' },
      { t: 'Just-in-time retrieval', d: 'Keep lightweight identifiers (paths, URLs, queries) and load at runtime. Metadata (folders, names, timestamps) is signal. Hybrid: some pre-loaded + exploration.' },
      { t: 'Prompt caching', d: 'Cache repeated prefixes (system, tools, documents) to cut cost and latency. Manage cache breakpoints and TTL. (per docs)' },
      { t: 'Reliability', d: 'Retries/backoff, timeouts, rate-limit handling, graceful degradation on partial failure, detection/logging/recovery of failures.' }
    ],
    terms: [
      { a: 'context engineering', b: 'prompt engineering', why: 'Curating the whole token state (multi-turn) vs writing a single instruction.' },
      { a: 'compaction', b: 'truncation', why: 'Summarize and preserve essentials vs simply cut (risking loss of key info).' },
      { a: 'external memory', b: 'in-context', why: 'Store/retrieve outside the window vs keep it all inside (context rot).' },
      { a: 'JIT retrieval', b: 'pre-loading (RAG)', why: 'Load at runtime (accurate, flexible) vs pre-embed (fast).' }
    ],
    judgments: [
      'Long task → compaction vs external memory vs subagent?',
      'What do you pre-load and what do you fetch just-in-time?',
      'How do you handle retries/timeouts/degradation?',
      'What do you cache and where is the breakpoint?'
    ],
    traps: [
      'Believing more context is better — context rot lowers accuracy.',
      '"Truncation is enough" — loses essentials; compaction is better.',
      'RAG is always the answer — agentic/JIT is often more accurate.',
      'Re-sending a repeated prefix every time with no cache — wasted cost/latency.'
    ],
    scenario: {
      s: 'Multi-agent research / long-horizon task — beyond thousands of steps.',
      q: 'Keep the whole history in context, or use external notes + compaction?',
      a: 'External memory + compaction + subagent isolation.',
      w: 'Avoids context rot and preserves the attention budget; keep only essentials, offload the rest.'
    },
    quiz: [
      { q: 'What is context rot?', a: 'Recall/accuracy degrading as tokens grow.' },
      { q: 'What is compaction?', a: 'Summarizing essentials near the limit and restarting.' },
      { q: 'Benefits of JIT retrieval?', a: 'Saves context + metadata signal + mirrors human cognition.' },
      { q: 'What benefit does a subagent give context?', a: 'Isolated exploration returning only a summary (no pollution).' }
    ],
    study: [
      'Context window budget · token counting.',
      'Prompt caching (what · breakpoint · TTL · cost).',
      'Long conversations: summarize · compact · context editing · external memory.',
      'Reliability: retries/backoff, timeouts, rate limits, degradation.',
      'Failure detection · logging · recovery (observability).'
    ],
    practice: [
      'Measure tokens/cost/latency before vs after prompt caching.',
      'Compact a long document with a summarization chain, compare QA accuracy.',
      'Write a retry/timeout wrapper; simulate rate limits.',
      'Design context-budget allocation in a multi-agent setup.'
    ],
    lens: 'Token budget = bandwidth/buffer budget. Context management = pipeline backpressure & caching. Retries/degradation = fault tolerance & redundancy.',
    scenarios: 'Multi-agent research · Customer support',
    res: {
      course: [{ t: 'Building Applications with the Claude API', url: 'https://anthropic.skilljar.com', note: 'production · reliability' }],
      docs: [{ t: 'Effective context engineering', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents' }, { t: 'Harnesses for long-running agents', url: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents' }, { t: 'docs — Context windows · Prompt caching', url: 'https://docs.claude.com' }],
      free: [{ t: 'WikiDocs prep book · Domain 5', url: 'https://wikidocs.net/book/19518' }, { t: 'GitHub guide (multi-language)', url: 'https://github.com/paullarionov/claude-certified-architect' }]
    }
  }
];

const SCENARIOS = [
  { slug: 'customer-support-resolution-agent', t: 'Customer Support Resolution Agent', d: 'Ticket triage + resolution pipeline', dom: 'D1·D2·D5' },
  { slug: 'code-generation-with-claude-code', t: 'Code Generation with Claude Code', d: 'Autonomous PR review & code generation', dom: 'D3·D1' },
  { slug: 'multi-agent-research-system', t: 'Multi-Agent Research System', d: 'Orchestrator + specialized subagents search & synthesize', dom: 'D1·D5' },
  { slug: 'developer-productivity-with-claude', t: 'Developer Productivity with Claude', d: 'IDE integration, CLAUDE.md, workflow automation', dom: 'D3·D4' },
  { slug: 'claude-code-for-continuous-integration', t: 'Claude Code for CI/CD', d: 'Headless Claude in a build pipeline', dom: 'D3·D2' },
  { slug: 'structured-data-extraction', t: 'Structured Data Extraction', d: 'Documents → validated JSON schema', dom: 'D4·D2' }
];

window.CCARF = { META, PATH, LOOP, SCHEDULE, LIBRARY, DOMAINS, SCENARIOS };
