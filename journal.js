/* CCAR-F Study — public study journal (distilled). Updated each session by /ccar-log.
 * Full detail (wrong answers, weak items) stays private in the workspace (00_META/sessions, progress.md). App shows the distilled journal only. */

const JOURNAL = {
  updated: '2026-07-19',
  streak: 3,
  location: 'W1 · D1 first pass + mini-mock Round 1 (3/5)',

  // Next problem (shown large at the top of the app)
  next: {
    dom: 'D1', ses: 'S7 R2', title: 'Mini-mock Round 2 — re-drill the 3 weak spots',
    problem: 'New scenarios that target the three misses from Round 1: (1) a generate↔evaluate loop is a WORKFLOW (evaluator-optimizer), not an agent — a feedback loop alone is not agency; (2) on the complexity ladder, drop to the LOWEST rung (an augmented LLM / single call), not just "single agent"; (3) verification must be INDEPENDENT and tamper-proof — the agent must not be able to edit the test/oracle.',
    hint: 'Round 1 was 3/5 (Q2 routing/orchestrator ✓, Q3 multi/single ✓). Pass Round 2, then move to a scenario or the next domain.'
  },

  // Domain progress (studied confidence 0–5)
  progress: [
    { code: 'D1', ko: 'agent design & orchestration', conf: 4, target: 4 },
    { code: 'D3', ko: 'Claude Code', conf: 3, target: 4 },
    { code: 'D4', ko: 'prompting & structured output', conf: 2, target: 4 },
    { code: 'D2', ko: 'tool design & MCP', conf: 2, target: 4 },
    { code: 'D5', ko: 'context & reliability', conf: 2, target: 4 }
  ],

  // Spaced review (interval repetition)
  reviewDue: [
    { item: 'workflow vs agent litmus (predict the path/step count?) — re-drill passed Jul 19', when: 'Jul 22 · Jul 26' },
    { item: 'routing vs orchestrator = can you enumerate the task list up front? + is there a merge?', when: 'Jul 21 · Jul 25' },
    { item: 'orchestrator → agent line = feedback loop + self-stop (runtime-dynamic alone is NOT an agent)', when: 'Jul 21 · Jul 25' },
    { item: 'multi-agent decision rule = independent+breadth → multi / coupled+sequential → single', when: 'Jul 20 · Jul 22 · Jul 26' },
    { item: 'summary boundary = info loss / baked-in error → structured returns (evidence+source+confidence) + independent check', when: 'Jul 20 · Jul 22 · Jul 26' },
    { item: 'agent control map = failure axis → control (stop · independent verify · goal re-anchor · budget · guardrails · HITL)', when: 'Jul 20 · Jul 22 · Jul 26' },
    { item: 'HITL placement = milestone gate (efficiency) + irreversibility gate (safety, right before point-of-no-return)', when: 'Jul 20 · Jul 22 · Jul 26' },
    { item: 'complexity ladder = start at the lowest rung; climb only when forced (path unpredictable → agent / independent+breadth+over-one-window → multi)', when: 'Jul 20 · Jul 22 · Jul 26' }
  ],

  // Session timeline (rendered newest-first)
  sessions: [
    {
      date: '2026-07-13', dom: 'D1', ses: 'S1', mode: 'pinch',
      covered: 'workflow vs agent boundary',
      insight: 'If code decides the next step at runtime it is a workflow; if the model decides, it is an agent. Litmus test = "can you predict/hardcode the path and step count before running?"',
      analogy: 'directed test = workflow · constrained-random/coverage closure = agent-like. An agent is flexible but costs more and compounds errors.',
      result: 'APPLY judgment (A=workflow, B=agent) correct'
    },
    {
      date: '2026-07-18', dom: 'D1', ses: 'S2', mode: 'standard',
      covered: '5 workflow patterns — recognized by data-flow shape (re-done solo, interactive)',
      insight: 'Read the SHAPE of the flow, not the concept: linear steps = chaining · classify→branch = routing · fan-out→merge = parallelization · runtime decomposition = orchestrator-workers · generate↔evaluate loop = evaluator-optimizer. The money distinction: routing = pick from a fixed set of bins; orchestrator = build the bins at runtime and aggregate.',
      analogy: 'chaining = pipeline stages with assertions · parallelization = parallel units / TMR voting · evaluator-optimizer = coverage-closure loop.',
      result: 'Solo-distinguished the two hardest pairs: routing↔orchestrator and voting↔evaluator-optimizer.'
    },
    {
      date: '2026-07-18', dom: 'D1', ses: 'S3', mode: 'standard',
      covered: 'routing vs orchestrator boundary, and where an orchestrator crosses into a true agent (interactive)',
      insight: 'Deciding property for routing vs orchestrator is NOT "which one does it pick" (both pick) — it is: can you enumerate the whole task list before any request arrives, AND is there a merge? Enumerable + no merge = routing; built at runtime + aggregated = orchestrator. Orchestrator → agent line: an orchestrator has dynamic CONTENT but a fixed one-pass control flow (decompose → dispatch → merge). It becomes an agent only when a feedback loop appears — the model observes results, decides the next action from them, and decides when to stop.',
      analogy: 'Orchestrator = directed regression dispatched once. Agent = constrained-random + coverage-closure: observe coverage → generate the next stimulus → loop until closure.',
      result: 'Passed the trap APPLY: a per-document field-extraction pipeline that "decides at runtime" is still orchestrator, because there is no feedback loop. "Runtime-dynamic" alone does NOT make it an agent.'
    },
    {
      date: '2026-07-19', dom: 'D1', ses: 'S4', mode: 'standard',
      covered: 'multi-agent systems & context isolation — why isolate, the cost, and when to reach for it (interactive)',
      insight: 'A multi-agent system = a coordinator (lead) plus subagents, each a full agent with its own loop and context. Isolate each subagent’s context for two reasons: (1) cross-task interference — one shared thread lets five investigations pollute each other’s attention; (2) capacity — a context window is a fixed buffer, so sharing gives each subagent ~window÷N and overflow triggers costly re-compaction; isolation gives each a FULL window and returns only a summary, so total usable context ≈ N×window while every window stays clean. The cost: duplicated work (a big driver of ~15× token usage) and drift/inconsistency across blind subagents, which the coordinator must reconcile — mitigated by very crisp task specs. Decision rule: subtasks independent + breadth/exploration → multi-agent; coupled/sequential/shared-state (most coding) → single agent. Litmus: can the pieces run without seeing each other’s work?',
      analogy: 'Isolation = separate lanes with local scratchpads, no shared-bus cross-talk, only summaries written back. The summary boundary is a lossy handoff — like a block returning pass/fail instead of the full waveform: trust it only with evidence, sources, and an independent check (never a self-graded pass).',
      result: 'APPLY passed: a 20-paper survey fits multi-agent (independent, breadth); an 8-file consistent rename does not (coupled → drift cost outweighs the parallel gain). Bonus: identified the summary-boundary reliability seam (loss of provenance) and its fix (structured returns + independent verification).'
    },
    {
      date: '2026-07-19', dom: 'D1', ses: 'S5', mode: 'standard',
      covered: 'agent reliability & control — the failure axes of a self-running loop and the control that catches each (interactive)',
      insight: 'A self-running agent loop has five failure axes, each with a control. Does it TERMINATE? → a stop condition (max iterations / a verifiable success criterion / budget exhausted). Is it CORRECT? → independent verification (programmatic tests, a separate evaluator agent, citation checks) — never let the agent grade itself, and make the stop condition’s "done" a verifiable success criterion. Is it ON-GOAL? → re-anchor the goal by storing it in durable state and re-injecting it every loop, so context-compaction cannot erase it. Bounded COST? → a token/time/budget cap. In-BOUNDS? → guardrails on scope and permissions. Cutting across all of them: human-in-the-loop, placed by two principles — a milestone gate between big phases (oversight efficiency) and a mandatory gate right before any irreversible / high-stakes action (safety).',
      analogy: 'This is a verification environment’s control set: a regression needs a timeout (stop), an independent scoreboard (verify), a test-plan goal it is held to (re-anchor), a compute budget, assertions/bounds (guardrails), and a sign-off before tape-out (the irreversible HITL gate).',
      result: 'Nick mapped all five failure axes to their controls solo (one refinement: goal-drift’s tightest control is persistent re-anchoring, with HITL as a cross-cutting backstop). APPLY passed: put the human gate right before the irreversible actions (git push / prod deploy), not at every step — reversible low-stakes work runs autonomously.'
    },
    {
      date: '2026-07-19', dom: 'D1', ses: 'S6', mode: 'standard',
      covered: 'the complexity ladder — capstone synthesis of S1–S6 (interactive)',
      insight: 'S1–S5 collapse into one discipline: augmented LLM → workflow → single agent → multi-agent is a ladder where power rises AND so do cost and failure surface. Pick the LOWEST rung that solves the task; climb only when the current rung genuinely cannot. The climb triggers: augmented → workflow when you need multiple steps/branches but the path is still predictable; workflow → single agent when you cannot predefine the path and the model must decide the next step from feedback; single → multi-agent when subtasks are independent + breadth and exceed one context window. Over-engineering has a real, often invisible cost.',
      analogy: 'The two traps unify: "more autonomy isn’t better" (S1) and "more agents isn’t better" (S4) are both "don’t reach a rung higher than the task forces." Anthropic’s own guidance: find the simplest solution, add complexity only when it demonstrably helps.',
      result: 'APPLY on a 10k/day invoice-extraction task: lowest rung = augmented LLM (correct). Key correction: jumping to a single AGENT is NOT nearly free — an agent is a loop (N calls per item, so latency/tokens ×N, then ×10,000 at volume), it becomes nondeterministic (loses the reproducibility a bounded extraction needs), and it drags in the S5 control burden. That is exactly "reaching one rung too high." D1 architecture first pass (S1–S6) complete.'
    },
    {
      date: '2026-07-19', dom: 'D1', ses: 'S7 R1', mode: 'standard',
      covered: 'D1 mini-mock, Round 1 — judgment drills across S1–S6 (self-test)',
      insight: 'Five scenario judgments spanning the domain. Solid: telling orchestrator-workers from routing (runtime decomposition + aggregate), and choosing a single agent over multi-agent for a coupled 40-file rename (isolation would cause drift). Three to firm up: a generate↔evaluate loop is the evaluator-optimizer WORKFLOW, not an agent (a feedback loop alone is not agency); on the ladder, drop to the lowest rung — a bounded one-shot summary is an augmented LLM (one call), not a single agent; and verification must be independent and tamper-proof (the agent must not be able to loosen the assertion it is graded on).',
      analogy: 'Model answers written out in plain English so the vocabulary lands, then filed under Lessons + Transcripts.',
      result: 'Round 1 = 3/5 (Q2, Q3 correct; Q1 wrong; Q4, Q5 partial). Round 2 will re-drill the three weak spots with fresh scenarios before D1 is closed.'
    }
  ]
};

window.CCARF_JOURNAL = JOURNAL;
