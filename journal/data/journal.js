/* GENERATED FILE — DO NOT EDIT BY HAND.
 * Source: 30_drill_app/../00_META/app_feed/ in the private ccar-f-study workspace.
 * Rebuild: node 30_drill_app/build/compile.mjs
 * Only status:reviewed material is included unless built with --include-draft. */
window.CCARJ = {
 "generated_by": "30_drill_app/build/compile.mjs",
 "include_draft": false,
 "journal": {
  "updated": "2026-07-23",
  "streak": 6,
  "location": "W2 · D3 in progress (3/6) · 12/30 task statements covered",
  "next": {
   "dom": "D3",
   "ses": "S4",
   "title": "Plan mode vs direct execution",
   "problem": "Some changes you should let Claude just do; others you want it to think through and show you a plan before touching anything. Where is the line — and how do you keep a big investigation from flooding the working conversation?",
   "hint": "Plan mode fits large or multi-file changes, several plausible approaches, and architectural decisions — a safe place to explore before committing. Direct execution fits small, well-scoped fixes. And an Explore subagent isolates verbose exploration so the main conversation stays clean. You can combine them: investigate in plan, then execute directly."
  },
  "progress": [
   {
    "code": "D1",
    "label": "agent design & orchestration",
    "conf": null,
    "target": 3.5
   },
   {
    "code": "D3",
    "label": "Claude Code",
    "conf": null,
    "target": 3.5
   },
   {
    "code": "D4",
    "label": "prompting & structured output",
    "conf": null,
    "target": 2
   },
   {
    "code": "D2",
    "label": "tool design & MCP",
    "conf": null,
    "target": 3.5
   },
   {
    "code": "D5",
    "label": "context & reliability",
    "conf": null,
    "target": 2
   }
  ],
  "reviewDue": [
   {
    "item": "workflow vs agent litmus (predict the path/step count?) — re-drill passed Jul 19",
    "when": "Jul 22 · Jul 26"
   },
   {
    "item": "routing vs orchestrator = can you enumerate the task list up front? + is there a merge?",
    "when": "Jul 21 · Jul 25"
   },
   {
    "item": "orchestrator → agent line = feedback loop + self-stop (runtime-dynamic alone is NOT an agent)",
    "when": "Jul 21 · Jul 25"
   },
   {
    "item": "multi-agent decision rule = independent+breadth → multi / coupled+sequential → single",
    "when": "Jul 20 · Jul 22 · Jul 26"
   },
   {
    "item": "summary boundary = info loss / baked-in error → structured returns (evidence+source+confidence) + independent check",
    "when": "Jul 20 · Jul 22 · Jul 26"
   },
   {
    "item": "agent control map = failure axis → control (stop · independent verify · goal re-anchor · budget · guardrails · HITL)",
    "when": "Jul 20 · Jul 22 · Jul 26"
   },
   {
    "item": "HITL placement = milestone gate (efficiency) + irreversibility gate (safety, right before point-of-no-return)",
    "when": "Jul 20 · Jul 22 · Jul 26"
   },
   {
    "item": "complexity ladder = start at the lowest rung; climb only when forced (path unpredictable → agent / independent+breadth+over-one-window → multi)",
    "when": "Jul 20 · Jul 22 · Jul 26"
   },
   {
    "item": "a tool is a contract with a limited-context agent → move the filtering into the tool (search_X over list_X)",
    "when": "Jul 22 · Jul 26"
   },
   {
    "item": "a good tool description = when to use it + what each parameter means + what it returns (description quality = call accuracy)",
    "when": "Jul 23 · Jul 27"
   },
   {
    "item": "more tools is not better → consolidate low-level ops into high-level tools, and scope the toolset per role",
    "when": "Jul 23 · Jul 27"
   },
   {
    "item": "structured error = what went wrong + how to fix + a cheap recovery path → the agent self-recovers (opaque codes do not)",
    "when": "Jul 23 · Jul 27"
   },
   {
    "item": "MCP = M×N → M+N; host / client / server; classify a primitive by WHO controls it (model→tool, app→resource, user→prompt) — not by read-only",
    "when": "Jul 23 · Jul 27"
   },
   {
    "item": "producing the English vocabulary unprompted (known weak spot) — drill via the Glossary",
    "when": "Jul 23 · Jul 27"
   }
  ],
  "sessions": [
   {
    "date": "2026-07-13",
    "label": "D1-S1",
    "mode": "pinch",
    "covered": "workflow vs agent boundary",
    "insight": "If code decides the next step at runtime it is a workflow; if the model decides, it is an agent. Litmus test = \"can you predict/hardcode the path and step count before running?\"",
    "analogy": "directed test = workflow · constrained-random/coverage closure = agent-like. An agent is flexible but costs more and compounds errors.",
    "result": "APPLY judgment (A=workflow, B=agent) correct"
   },
   {
    "date": "2026-07-18",
    "label": "D1-S2",
    "mode": "standard",
    "covered": "5 workflow patterns — recognized by data-flow shape (re-done solo, interactive)",
    "insight": "Read the SHAPE of the flow, not the concept: linear steps = chaining · classify→branch = routing · fan-out→merge = parallelization · runtime decomposition = orchestrator-workers · generate↔evaluate loop = evaluator-optimizer. The money distinction: routing = pick from a fixed set of bins; orchestrator = build the bins at runtime and aggregate.",
    "analogy": "chaining = pipeline stages with assertions · parallelization = parallel units / TMR voting · evaluator-optimizer = coverage-closure loop.",
    "result": "Solo-distinguished the two hardest pairs: routing↔orchestrator and voting↔evaluator-optimizer."
   },
   {
    "date": "2026-07-18",
    "label": "D1-S3",
    "mode": "standard",
    "covered": "routing vs orchestrator boundary, and where an orchestrator crosses into a true agent (interactive)",
    "insight": "Deciding property for routing vs orchestrator is NOT \"which one does it pick\" (both pick) — it is: can you enumerate the whole task list before any request arrives, AND is there a merge? Enumerable + no merge = routing; built at runtime + aggregated = orchestrator. Orchestrator → agent line: an orchestrator has dynamic CONTENT but a fixed one-pass control flow (decompose → dispatch → merge). It becomes an agent only when a feedback loop appears — the model observes results, decides the next action from them, and decides when to stop.",
    "analogy": "Orchestrator = directed regression dispatched once. Agent = constrained-random + coverage-closure: observe coverage → generate the next stimulus → loop until closure.",
    "result": "Passed the trap APPLY: a per-document field-extraction pipeline that \"decides at runtime\" is still orchestrator, because there is no feedback loop. \"Runtime-dynamic\" alone does NOT make it an agent."
   },
   {
    "date": "2026-07-19",
    "label": "D1-S4",
    "mode": "standard",
    "covered": "multi-agent systems & context isolation — why isolate, the cost, and when to reach for it (interactive)",
    "insight": "A multi-agent system = a coordinator (lead) plus subagents, each a full agent with its own loop and context. Isolate each subagent’s context for two reasons: (1) cross-task interference — one shared thread lets five investigations pollute each other’s attention; (2) capacity — a context window is a fixed buffer, so sharing gives each subagent ~window÷N and overflow triggers costly re-compaction; isolation gives each a FULL window and returns only a summary, so total usable context ≈ N×window while every window stays clean. The cost: duplicated work (a big driver of ~15× token usage) and drift/inconsistency across blind subagents, which the coordinator must reconcile — mitigated by very crisp task specs. Decision rule: subtasks independent + breadth/exploration → multi-agent; coupled/sequential/shared-state (most coding) → single agent. Litmus: can the pieces run without seeing each other’s work?",
    "analogy": "Isolation = separate lanes with local scratchpads, no shared-bus cross-talk, only summaries written back. The summary boundary is a lossy handoff — like a block returning pass/fail instead of the full waveform: trust it only with evidence, sources, and an independent check (never a self-graded pass).",
    "result": "APPLY passed: a 20-paper survey fits multi-agent (independent, breadth); an 8-file consistent rename does not (coupled → drift cost outweighs the parallel gain). Bonus: identified the summary-boundary reliability seam (loss of provenance) and its fix (structured returns + independent verification)."
   },
   {
    "date": "2026-07-19",
    "label": "D1-S5",
    "mode": "standard",
    "covered": "agent reliability & control — the failure axes of a self-running loop and the control that catches each (interactive)",
    "insight": "A self-running agent loop has five failure axes, each with a control. Does it TERMINATE? → a stop condition (max iterations / a verifiable success criterion / budget exhausted). Is it CORRECT? → independent verification (programmatic tests, a separate evaluator agent, citation checks) — never let the agent grade itself, and make the stop condition’s \"done\" a verifiable success criterion. Is it ON-GOAL? → re-anchor the goal by storing it in durable state and re-injecting it every loop, so context-compaction cannot erase it. Bounded COST? → a token/time/budget cap. In-BOUNDS? → guardrails on scope and permissions. Cutting across all of them: human-in-the-loop, placed by two principles — a milestone gate between big phases (oversight efficiency) and a mandatory gate right before any irreversible / high-stakes action (safety).",
    "analogy": "This is a verification environment’s control set: a regression needs a timeout (stop), an independent scoreboard (verify), a test-plan goal it is held to (re-anchor), a compute budget, assertions/bounds (guardrails), and a sign-off before tape-out (the irreversible HITL gate).",
    "result": "Nick mapped all five failure axes to their controls solo (one refinement: goal-drift’s tightest control is persistent re-anchoring, with HITL as a cross-cutting backstop). APPLY passed: put the human gate right before the irreversible actions (git push / prod deploy), not at every step — reversible low-stakes work runs autonomously."
   },
   {
    "date": "2026-07-19",
    "label": "D1-S6",
    "mode": "standard",
    "covered": "the complexity ladder — capstone synthesis of S1–S6 (interactive)",
    "insight": "S1–S5 collapse into one discipline: augmented LLM → workflow → single agent → multi-agent is a ladder where power rises AND so do cost and failure surface. Pick the LOWEST rung that solves the task; climb only when the current rung genuinely cannot. The climb triggers: augmented → workflow when you need multiple steps/branches but the path is still predictable; workflow → single agent when you cannot predefine the path and the model must decide the next step from feedback; single → multi-agent when subtasks are independent + breadth and exceed one context window. Over-engineering has a real, often invisible cost.",
    "analogy": "The two traps unify: \"more autonomy isn’t better\" (S1) and \"more agents isn’t better\" (S4) are both \"don’t reach a rung higher than the task forces.\" Anthropic’s own guidance: find the simplest solution, add complexity only when it demonstrably helps.",
    "result": "APPLY on a 10k/day invoice-extraction task: lowest rung = augmented LLM (correct). Key correction: jumping to a single AGENT is NOT nearly free — an agent is a loop (N calls per item, so latency/tokens ×N, then ×10,000 at volume), it becomes nondeterministic (loses the reproducibility a bounded extraction needs), and it drags in the S5 control burden. That is exactly \"reaching one rung too high.\" D1 architecture first pass (S1–S6) complete."
   },
   {
    "date": "2026-07-19",
    "label": "D1-S7 R1",
    "mode": "standard",
    "covered": "D1 mini-mock, Round 1 — judgment drills across S1–S6 (self-test)",
    "insight": "Five scenario judgments spanning the domain. Solid: telling orchestrator-workers from routing (runtime decomposition + aggregate), and choosing a single agent over multi-agent for a coupled 40-file rename (isolation would cause drift). Three to firm up: a generate↔evaluate loop is the evaluator-optimizer WORKFLOW, not an agent (a feedback loop alone is not agency); on the ladder, drop to the lowest rung — a bounded one-shot summary is an augmented LLM (one call), not a single agent; and verification must be independent and tamper-proof (the agent must not be able to loosen the assertion it is graded on).",
    "analogy": "Model answers written out in plain English so the vocabulary lands, then filed under Lessons + Transcripts.",
    "result": "Round 1 = 3/5 (Q2, Q3 correct; Q1 wrong; Q4, Q5 partial). Round 2 will re-drill the three weak spots with fresh scenarios before D1 is closed."
   },
   {
    "date": "2026-07-19",
    "label": "D1-S7 R2",
    "mode": "standard",
    "covered": "mini-mock Round 2 — re-drill the three weak spots (self-test)",
    "insight": "Fresh scenarios targeting only the Round-1 misses. Resolved solo: loop ≠ agent (a generate→validate loop is evaluator-optimizer; a model deciding its own varying next actions is an agent) and dropping to the lowest rung (100k independent title translations = an augmented LLM, one call each). Independent verification came via the HW anchor: a DUT reporting its own \"95% confident\" pass is not trustworthy — you need an independent scoreboard the DUT cannot touch, i.e., verification outside the agent, on a criterion it cannot edit.",
    "analogy": "Independent verification = an independent scoreboard / golden reference, never the DUT vouching for itself.",
    "result": "Passed — D1 architecture first pass fully complete (S1–S7). Remaining follow-up: producing the English vocabulary unprompted (spaced review). Next: D2 (Tool Design & MCP)."
   },
   {
    "date": "2026-07-19",
    "label": "D2-S1",
    "mode": "standard",
    "covered": "why an agent tool is not an API — the finite-context contract (interactive)",
    "insight": "A tool is a contract with a NON-deterministic, limited-context agent, not an API wrapper. Concretely: a list_users() that returns all 50,000 users is fine for a human API (the human paginates), but an agent cannot scroll — whatever a tool returns lands directly in its finite context window, flooding it and wasting tokens (the same finite-window fact from D1-S4). So the filtering must move INTO the tool: return high-signal, filtered results (search_users(role, active) → 12 rows) instead of a full list. Design the tool around the agent’s constraint, not around the API surface.",
    "analogy": "Not dumping the whole waveform upstream — designing a probe that triggers and filters down to only the signals of interest.",
    "result": "APPLY passed: for \"find the unpaid invoices,\" pick search_invoices(status, since), not get_all_invoices() — because of the context limit. Exam so-what: the agent-appropriate tool is the one that respects limited context (search_X over list_X, meaningful IDs, pagination)."
   },
   {
    "date": "2026-07-20",
    "label": "D2-S2",
    "mode": "standard",
    "covered": "tool design craft — names, descriptions, and tool count (interactive)",
    "insight": "An agent picks which tool to call from its NAME and DESCRIPTION alone — it does not read docs. So the description IS the interface it reasons over. A good tool description says three things: when to use it (purpose), what each parameter means (unambiguous — user_id, not user), and what it returns. Make implicit context explicit (\"describe it to a new hire\") and namespace by service (asana_search). Small description tweaks yield big call-accuracy gains: description quality = call accuracy. And tools are like agents and autonomy — more is not better: too many, especially overlapping, tools derail tool selection. Fix by consolidating low-level ops into high-level tools (schedule_meeting = find availability + book + invite) and scoping the toolset to the situation.",
    "analogy": "A vague register spec → the reader mis-uses the register; a precise one → correct use. Consolidation = one high-level configure_and_start(mode) transaction instead of five low-level register pokes.",
    "result": "APPLY: turned run(q) \"Runs a query\" into a well-named, namespaced tool with a clear parameter (added: it must also state what it returns). Recognized \"more tools isn’t better\" as the D1 simplicity trap’s third appearance (autonomy → agent count → tool count)."
   },
   {
    "date": "2026-07-20",
    "label": "D2-S3",
    "mode": "standard",
    "covered": "tool responses and structured errors for self-recovery (interactive)",
    "insight": "A tool return is feedback in the agent’s loop (act → verify → repeat). A structured error — what went wrong + how to fix it + a cheap recovery path (e.g., \"call list_tests()\") — lets the agent self-recover: it fixes its call and continues. An opaque code like {error:\"500\"} is broken feedback: it demands outside knowledge the agent does not have, so the agent either retries blindly (wasting tokens / looping) or gives up and escalates. Design principle: make recoverable errors actionable so the agent fixes itself; escalate cleanly only when it is truly unrecoverable (which ties back to stop conditions and human-in-the-loop).",
    "analogy": "Opaque 500 = a bare exit code with no waveform. A structured error = an assertion failure with file, line, expected-vs-actual, and a hint — the engineer (agent) can act on it.",
    "result": "Nick nailed it: with the opaque code the agent can only report \"error\" upward and leave the loop; the structured message lets it self-correct. Also built a Glossary + recall-quiz into the app (his request) to keep drilling the English vocabulary."
   },
   {
    "date": "2026-07-20",
    "label": "D2-S4",
    "mode": "standard",
    "covered": "MCP architecture — why it exists, host/client/server, the three primitives (interactive)",
    "insight": "Without a standard, M agents × N services means M×N bespoke integrations; MCP is the standard that turns this into M+N — write a server once and any MCP host can use it (Anthropic calls it \"a USB-C port for AI\"). Roles: the host is the agent app the user runs; a server is a lightweight program exposing ONE capability; a client is the connector inside the host holding a 1:1 connection to a server (the wiring, not the agent). The three primitives a server exposes are distinguished by WHO controls them: tools = model-controlled actions (the risk surface — where guardrails/HITL apply), resources = app-controlled data read into context (like GET, read-only), prompts = user-controlled templates.",
    "analogy": "MCP = a standard bus (USB/PCIe): a device implements the standard once and plugs into any compliant host — no custom glue per pair.",
    "result": "Classified tools/resources/prompts correctly, but hit the key trap: \"read-only, so it is a resource\" is wrong — the test is control, not side-effects. A model-invoked parameterized DB query is a TOOL even though it only reads. Also: with-MCP integrations = M+N (not just the server count). MCP terms added to the Glossary."
   },
   {
    "date": "2026-07-22",
    "label": "D2-S5",
    "mode": "standard",
    "covered": "scoping a toolset, controlling tool choice at call time, the error contract, and MCP server integration (interactive)",
    "insight": "Describing tools well is not scoping — every tool stays callable. Real scoping shrinks the available set: role-scoped tool sets, a few genuinely shared cross-cutting tools, and constrained tools replacing over-general ones (18 tools select measurably worse than 4–5). At call time, three settings ordered by constraint: auto (a tool is optional), any (some tool is mandatory, the model picks), forced (this named tool). Errors need a contract, not a message: one uniform \"Operation failed\" erases the only decision that matters — can I retry? Four categories: transient (retry), validation (fix the input and retry), business rule (no — explain and offer an alternative), permission (no — escalate). And an access failure must never be returned as an empty result, or a false negative gets promoted to fact with nothing retrying. For MCP: team config ships with the repo, personal config does not; secrets go in environment variables, never the file; and connecting a server spends tool budget because all of its tools go live at once.",
    "analogy": "Error categories map onto the verification world — a transient glitch, a protocol violation, a policy violation, and an access denial each demand a different response; collapsing them into one message destroys the response.",
    "result": "Solid on error triage, access-failure-vs-empty, and MCP config scoping. Two corrections: a malformed parameter should be fixed and retried, not filled with a guessed default (that fabricates data); and `tool_choice` \"any\" vs forced got swapped twice — anchored by constraint count and logged for re-drill. D2 is now 4/5, with built-in tools moving to D3."
   },
   {
    "date": "2026-07-23",
    "label": "D3-S1",
    "mode": "standard",
    "covered": "CLAUDE.md hierarchy, scoping, and modular organisation (interactive)",
    "insight": "Project instructions live at three levels — user (not shared through version control), project (ships with the repo, so anyone who clones it gets it), and directory (applies to a subtree). The classic diagnostic \"it works for me but not for a new teammate\" almost always means the conventions were placed at the user level; the fix is to move shared conventions to the project level. Split a bloated instruction file into topic files pulled in by import, or a rules folder. Choose CLAUDE.md/rules for always-on universal standards (code style, commit format, review criteria) and a skill for an on-demand procedure — a commit-format rule made into a skill would simply never fire when it is needed. Verify what actually loaded with /memory instead of guessing.",
    "analogy": "\"Works on my machine, not theirs\" is a shared-vs-local config bug — the rules were on individual machines, not in the repo.",
    "result": "Nick diagnosed it immediately (the conventions were only on existing teammates' machines) and reasoned toward per-topic files loaded on demand."
   },
   {
    "date": "2026-07-23",
    "label": "D3-S2",
    "mode": "standard",
    "covered": "custom slash commands and skills — where they live and how a skill is configured (interactive)",
    "insight": "Commands and skills follow the same layering as CLAUDE.md: team-wide in the repo's project folder, personal at the user level. A skill is an on-demand capsule of procedure, shaped by three switches. context: fork runs it in an isolated subagent, so a huge, verbose job (thousands of log lines) is consumed in that isolated context and only a clean result returns to the main conversation — the D1-S4 context-isolation idea reappearing at the Claude Code level. allowed-tools restricts which tools the skill may use (D2 tool-scoping plus the D1-S5 guardrail). argument-hint tells Claude what to ask for when the skill is invoked without arguments.",
    "analogy": "context: fork = a subagent with its own scratchpad; allowed-tools = a guardrail bounding what the skill can touch.",
    "result": "Nick reasoned the fork mechanism out from first principles (\"verbose output fills the session; the tool should do the analysis outside and return only a clean result\") before being given the name, and named tool-scoping for the second switch himself."
   },
   {
    "date": "2026-07-23",
    "label": "D3-S3",
    "mode": "standard",
    "covered": "path-specific rules for conditional convention loading (interactive)",
    "insight": "When a convention applies to a file *type* scattered across many directories (test files living next to source, or every .py file in the repo), a directory-level CLAUDE.md cannot capture it — you would have to copy it into every directory. Instead attach a path pattern to a rule file so it loads only when a matching file is edited (**/*.test.* → the testing convention). Benefits: it works regardless of where the files sit, and irrelevant conventions never load, saving context and tokens. The distinguisher: conventions neatly contained in one subtree → directory CLAUDE.md; conventions that ride a scattered file type → path-conditional rules.",
    "analogy": "A directory CLAUDE.md is a rule pinned to a location; a path-conditional rule is a rule pinned to a file *kind*, wherever it lives.",
    "result": "Corrected one belief (directory-level CLAUDE.md does exist), then Nick's own instinct — \"tell it when to read which document\" — turned out to be exactly the path-pattern mechanism; he confirmed it on the .py case."
   }
  ]
 },
 "lessons": [
  {
   "id": "d3-s1",
   "dom": "D3",
   "ses": "S1",
   "date": "2026-07-23",
   "title": "CLAUDE.md Hierarchy, Scoping, and Modular Organisation",
   "goal": "Place project instructions at the right level, split a bloated instruction file, and verify what actually loaded.",
   "body": "## The three levels — and which one is shared\n\nProject instructions live at three levels:\n\n- **User** (your home config) — **not shared through version control**; it exists only on your machine.\n- **Project** (in the repo) — **ships with the repo**, so anyone who clones it gets it.\n- **Directory** (a CLAUDE.md in a subfolder) — applies to that subtree.\n\n## The classic diagnostic\n\n\"Claude follows our conventions for me, but a new teammate who just cloned the repo gets none of them.\" Almost always this means the conventions were placed at the **user level** — the existing team each set them up locally, but they never traveled with the repo. The fix: move shared conventions to the **project level**. Whenever a symptom is \"works for me, not for them,\" suspect user-level configuration first, and check with `/memory`, which shows which memory files actually loaded — don't guess.\n\n## Splitting a bloated file\n\nA single 500-line instruction file mixing frontend, testing, deployment, and style conventions is hard to maintain and wastes context. Split it into topic files pulled in by **import** (the project CLAUDE.md becomes a thin table of contents), or use a **rules folder** of per-topic files.\n\n## CLAUDE.md/rules vs skill\n\n- **CLAUDE.md / rules** = always-on **universal standards** (code style, commit format, review criteria) that must always be in effect.\n- **Skill** = an **on-demand procedure** you invoke when it is relevant.\n\nOne-line test: *is this always enforced, or a procedure you sometimes run?* A commit-format rule turned into a skill would simply never fire at the moment it's needed; a release procedure baked into CLAUDE.md would eat context all the time."
  },
  {
   "id": "d3-s2",
   "dom": "D3",
   "ses": "S2",
   "date": "2026-07-23",
   "title": "Slash Commands and Skills — Placement and the Three Switches",
   "goal": "Know where commands and skills live, and configure a skill's isolation, tool access, and argument prompt.",
   "body": "## Same layering as CLAUDE.md\n\nCustom slash commands and skills follow the layering from S1: **team-wide** ones go in the repo's project folder (shared through version control), **personal** ones go at the user level (not shared). A skill is an **on-demand capsule of procedure**.\n\n## The three switches that shape a skill\n\n- **`context: fork`** — run the skill in an **isolated subagent**. A verbose job (thousands of log lines, stack traces, coverage dumps) is consumed inside that isolated context, and only a clean result returns to the main conversation. This is the D1-S4 context-isolation idea, now at the Claude Code level: don't let a huge tool output pollute the working conversation.\n- **`allowed-tools`** — restrict which tools the skill may use. A test-analysis skill needs read and run, not write or delete. Two lineages meet here: D2 tool-scoping (protect selection reliability) and the D1-S5 guardrail (bound what it can touch).\n- **`argument-hint`** — tell Claude what to ask for when the skill is invoked with no arguments.\n\n## Personal variants\n\nTo adapt a team skill to your own taste, put your version at the **user level under a different name**, so it doesn't overwrite the shared one."
  },
  {
   "id": "d3-s3",
   "dom": "D3",
   "ses": "S3",
   "date": "2026-07-23",
   "title": "Path-Specific Rules for Conditional Convention Loading",
   "goal": "Load a convention only when a matching file type is edited, wherever those files live.",
   "body": "## When a directory CLAUDE.md is not enough\n\nA directory-level CLAUDE.md does exist and applies to its subtree. But it fails when a convention applies to a **file type scattered across many directories** — test files living next to their source (`src/auth/login.test.ts`, `src/api/orders.test.ts`, …), or every `.py` file in the repo. You would have to copy the convention into every directory, which is duplication and a maintenance trap.\n\n## Attach a path pattern instead\n\nGive a rule file a **path pattern** so it loads only when a matching file is edited — e.g. the testing convention loads only on `**/*.test.*`. Editing `orders.test.ts` pulls in the testing rules; editing `login.ts` does not.\n\n**Benefits:** it works **regardless of where the files sit**, and irrelevant conventions never load, **saving context and tokens.**\n\n## The distinguisher\n\n- Convention neatly contained in one subtree → **directory-level CLAUDE.md**.\n- Convention that rides a **scattered file type** (tests beside code, all `.py` files) → **path-conditional rule**.\n\nRule of thumb: a directory CLAUDE.md is pinned to a *location*; a path-conditional rule is pinned to a *file kind*, wherever it lives."
  },
  {
   "id": "d2-s5",
   "dom": "D2",
   "ses": "S5",
   "date": "2026-07-22",
   "title": "Scoping Tools, Error Contracts, and MCP Integration",
   "goal": "Scope a toolset for real, control tool selection at call time, give errors a contract the agent can act on, and integrate MCP servers without leaking secrets or blowing the tool budget.",
   "body": "## Scoping a toolset — the real method\n\nDescribing tools well is not scoping. Organising them into neat categories still leaves every tool callable, so the model can still pick the wrong one. Real scoping shrinks the *available set*:\n\n- **Role-scoped tool sets** — give each agent only the tools its job needs. Tools outside an agent's specialty get misused (a synthesis agent attempting a web search).\n- **A few cross-cutting tools** — share only what several roles genuinely need often (e.g. a fact-verification tool).\n- **Replace over-general tools with constrained ones** — a \"fetch any URL\" tool becomes a \"load a document\" tool.\n\nThe number matters: an agent holding **18 tools selects measurably worse than one holding 4–5**.\n\n## Controlling tool choice at call time\n\nThree settings, ordered by how much they constrain the model:\n\n- **auto** — the model decides *whether* to use a tool at all; it may reply with text only.\n- **any** — the model *must* call some tool (no text-only reply), but it chooses which one.\n- **forced (a named tool)** — the model must call *that specific* tool. Useful when a step must always run first, e.g. extracting metadata before enrichment.\n\nDeciding question: **does the requirement name a specific tool?** If yes → forced. If it only says \"return via a tool, not prose\" → any. If tool use itself is optional → auto.\n\n## Errors need a contract, not a message\n\nOne uniform `{\"error\": \"Operation failed\"}` erases the single decision the agent must make: **can I retry this?** Four situations that look identical without a contract:\n\n| Situation | Category | Retryable? | What the agent should do |\n|---|---|---|---|\n| Network timed out | transient | yes | retry a bounded number of times, then propagate |\n| Malformed date parameter | validation | yes | **fix the input** and retry |\n| Refund exceeds the policy limit | business rule | no | explain in customer-friendly terms; offer an alternative or escalate |\n| No permission on the account | permission | no | escalate immediately — retrying cannot change permission |\n\nSo a tool result should carry: **an error flag · the category · whether it is retryable · a human-readable explanation.**\n\n**Do not invent values to get past a validation error.** Filling a malformed field with a default or guessed value fabricates data that then flows silently downstream. Correct the input instead. (Different case: if the information simply is not in the source, retrying is pointless — that is not a format problem.)\n\n**In multi-agent systems:** a subagent should recover transient errors locally and propagate only what it cannot fix, along with any partial results.\n\n## Access failure is not an empty result\n\nIf a tool fails to reach its data source and returns `{\"results\": []}`, the agent concludes *\"the lookup succeeded and nothing matches\"* — a false negative promoted to fact. Because it looked like success, nothing retries, and a downstream report states confidently that no such record exists. An access failure must come back as an **error** (flag + category + retryable), never as an empty success.\n\n## Integrating MCP servers without shooting yourself\n\n- **Where the config lives is a sharing decision.** Team-wide servers belong in the **project-level** config that ships with the repo, so everyone who clones it gets the server. Personal or experimental servers belong in the **user-level** config, which is not version-controlled.\n- **Never put the secret in the file.** Reference it by **environment-variable expansion**; each person sets the token in their own environment. Committing a token leaks the credential to everyone with repo access — and it stays in git history even after you delete it. (Secondary damage: a shared token destroys per-user attribution.)\n- **Connecting a server spends tool budget.** When a server connects, all of its tools become discoverable and usable at once. Five servers exposing eight tools each means forty live tools — far past the 4–5 sweet spot, so selection reliability collapses. Adding a server is not free; connect only what is needed and scope by role.\n- **Expose content catalogs as resources.** Issue summaries, document hierarchies, DB schemas offered as resources let the agent see what exists instead of probing with exploratory tool calls.\n- **Weak MCP tool descriptions lose to built-in tools.** If the description is thin, the agent falls back to the familiar built-in tool and your server goes unused — description quality decides selection here too.\n- **Prefer community servers for standard integrations;** build a custom server only for workflows unique to your team."
  },
  {
   "id": "d2-s2",
   "dom": "D2",
   "ses": "S2",
   "date": "2026-07-20",
   "title": "Tool Design Craft — Descriptions & Tool Count",
   "goal": "Write tool names/descriptions an agent calls correctly, and know why fewer tools is usually better.",
   "body": "## The description IS the interface\n\nAn agent chooses which tool to call from its NAME and DESCRIPTION alone — it does not read your docs. So the name+description is the entire spec it reasons over. Compare get_data(id) \"Gets data\" (the agent cannot tell what id is or when to use it) with search_transactions(account_id, start_date, end_date) \"Search a customer’s transactions in a date range; returns up to 50 recent matches with amount, date, merchant.\" The second is self-describing, so the agent calls it correctly.\n\n## A good tool description says three things\n\n(1) WHEN to use it — the purpose/trigger. (2) WHAT each parameter means — unambiguous names (user_id, not user), with type and constraints. (3) WHAT it returns — because the agent plans its next step from the return (and the return should be high-signal, per S1). Also: make implicit context explicit (\"describe it to a new hire who has never seen your system\"), and namespace by service (asana_search, github_create_issue). Small description tweaks yield big accuracy gains — description quality = call accuracy.\n\n## More tools is not better\n\nToo many tools — especially overlapping ones — derail the agent’s tool selection: it wastes context reasoning about which to call, or picks the wrong one. This is the D1 simplicity trap for the third time (more autonomy → more agents → more tools). Fix with (1) consolidation: fold several low-level operations into one high-level tool that matches how the work is actually done (schedule_meeting = find availability + book + send invite), moving the chaining logic into the tool; and (2) scoping the toolset to the situation so only relevant tools are exposed.\n\n## HW lens\n\nA vague register spec (unclear field semantics, when to write, constraints) makes the reader mis-use it; a precise spec yields correct use. Consolidation = giving the caller one high-level configure_and_start(mode) transaction instead of exposing five low-level register pokes."
  },
  {
   "id": "d2-s3",
   "dom": "D2",
   "ses": "S3",
   "date": "2026-07-20",
   "title": "Responses & Structured Errors",
   "goal": "Design tool returns — successes and errors — so an agent can act on them and self-recover.",
   "body": "## Responses (recap from S1–S2)\n\nA tool return should be high-signal and token-efficient: filtered results (search_X over list_X), meaningful identifiers over raw uuids, pagination, and a stated return shape — never a full dump that floods the finite context window.\n\n## An error is feedback in the loop\n\nAn agent runs act → verify → repeat, so a tool error is feedback it must act on. Two error responses to the same bad call: {error:\"500\"} versus {error:\"No test found with id ‘tc_9987’. Valid ids look like ‘test_<name>’. Call list_tests() to see what is available.\"}\n\n## Structured errors enable self-recovery\n\nThe opaque \"500\" demands outside knowledge the agent does not have, so the best it can do is retry blindly (wasting tokens / looping) or report \"error\" upward and leave the loop. The structured message says what went wrong, how to fix it, and points to a cheap recovery path — so the agent fixes its call and continues. A good error = what went wrong + how to fix + the cheap next step.\n\n## Recoverable vs not\n\nDesign principle: make recoverable errors actionable so the agent self-corrects; escalate cleanly only when the situation is truly unrecoverable — which ties back to stop conditions and human-in-the-loop from D1.\n\n## HW lens\n\nAn opaque 500 is a bare exit code with no waveform. A structured error is an assertion failure with file, line, expected-vs-actual, and a hint — the engineer (agent) can actually act on it."
  },
  {
   "id": "d2-s4",
   "dom": "D2",
   "ses": "S4",
   "date": "2026-07-20",
   "title": "MCP Architecture",
   "goal": "Understand why MCP exists, its host/client/server roles, and the three primitives.",
   "body": "## Why MCP exists — M×N → M+N\n\nWithout a standard, M agents each needing N services means M×N bespoke integrations, which explodes as either side grows. MCP is a standard protocol, so each agent speaks it once and each service exposes it once → M+N. Anthropic calls MCP \"a USB-C port for AI applications\": implement the standard once and things interoperate.\n\n## The three roles\n\nHost = the agent application the user runs (Claude Code, Claude Desktop, an IDE); the model lives here and consumes capabilities. Server = a lightweight program that exposes ONE capability via the standard (a GitHub server, a filesystem server, a DB server). Client = the connector inside the host that holds a 1:1 connection to one server — it is the wiring, not the agent. One host runs many clients, one per connected server.\n\n## The three primitives — decided by WHO controls\n\nA server exposes three kinds of things: Tools = actions the MODEL calls (may have side effects) — model-controlled; this is the risk surface where guardrails and HITL belong. Resources = data read into context (files, docs, records) — app-controlled, read-only, like a GET. Prompts = reusable templates/workflows the USER invokes (e.g., a /code-review command) — user-controlled. Mnemonic: model→tool, app→resource, user→prompt.\n\n## The classic trap: read-only ≠ resource\n\nBoth tools and resources can \"get data,\" so people classify by side-effects — wrongly. The test is CONTROL, not read-only-ness. A DB query the model actively issues with parameters (search_orders(customer_id)) is a TOOL even though it only reads, because the model initiates it. A resource is passive data the app loads into context (often URI-addressed).\n\n## HW lens\n\nMCP is a standard bus like USB or PCIe: a device implements the standard once and plugs into any compliant host, with no custom glue per pair. Tools are the actuators (side effects); resources are read ports."
  },
  {
   "id": "d1-s4",
   "dom": "D1",
   "ses": "S4",
   "date": "2026-07-19",
   "title": "Multi-agent Systems & Context Isolation",
   "goal": "Understand why each subagent gets its own isolated context, what it costs, and when a multi-agent design is actually the right call.",
   "body": "## What a multi-agent system is\n\nTake S3’s orchestrator-workers and make each worker a full agent — its own loop, its own tools, its own context. Now you have a coordinator (lead agent) that delegates to several subagents and synthesizes their results. The jump from \"workers\" to \"subagents\" is that each worker can now run its own feedback loop.\n\n## Why isolate each context — reason 1: interference\n\nIf all subagents shared one thread, every subagent’s intermediate junk (searches, dead ends, long tool outputs) would pile into one window and blur the model’s attention — it starts conflating vendor A’s numbers with vendor B’s. Isolation means each subagent sees only what its own subtask needs. HW lens: separate lanes instead of one shared bus, so there is no cross-talk.\n\n## Why isolate — reason 2: capacity (the bigger one)\n\nA context window is a fixed-size buffer. Share it across N subagents and each effectively gets ~window÷N; overflow forces truncation or repeated auto-compaction (which re-spends tokens). Give each subagent its OWN full window and have it return only a summary: the coordinator then holds N summaries, not N full documents. Net effect: total usable context ≈ N×window, while every single window stays clean. This — exceeding a single window’s limit — is the real reason to go multi-agent.\n\n## The cost\n\nThe same isolation that blocks cross-talk also makes subagents work blind to each other. Two costs follow: (1) duplicated work → a major driver of multi-agent token usage running ~15× a single chat; (2) drift — over time each subagent diverges to its own standard, so results do not compose cleanly and the coordinator must reconcile them. The lever that fights both: the coordinator writes very crisp, non-overlapping task specs (objective, output format, boundaries).\n\n## The decision rule — when to use multi-agent\n\nReach for multi-agent when the subtasks are INDEPENDENT and the work is breadth / read-heavy (research, exploration, gather-then-synthesize) — isolation loses nothing and you gain parallelism + N×context. Stay with a single agent when subtasks are COUPLED / sequential / share an evolving state (a rename threading through 8 files, most coding) — there the drift-and-merge cost dominates and the parallel gain is small. One-line litmus: can the pieces run without seeing each other’s work? Yes → multi-agent candidate; No → single agent.\n\n## The trap (a rerun of S1)\n\nDo not reach for multi-agent just because it sounds powerful. It costs ~15× the tokens and adds whole new failure modes (duplication, drift, coordination). Use it only when subtasks are genuinely independent and breadth-first. \"More agents = better\" is the same wrong instinct as \"more autonomy = better\" from S1.\n\n## The summary boundary = a reliability seam (D5 preview)\n\nSubagents return summaries and their raw context is discarded. So the coordinator inherits three risks: lost provenance (you cannot see how the result was reached or reproduce it), baked-in error (a subtly wrong summary cannot be cross-checked against the source), and compounding error across layers. Fix: make subagents return STRUCTURED output — claim + evidence + source/citation + confidence — and run an independent verification pass on the synthesis. A self-graded \"I’m confident\" is not enough; an agent can be confidently wrong. HW lens: never accept a DUT’s self-reported pass — you want an independent scoreboard and the waveform on demand."
  },
  {
   "id": "d1-s5",
   "dom": "D1",
   "ses": "S5",
   "date": "2026-07-19",
   "title": "Keeping an Agent on the Rails — Controls",
   "goal": "Given a self-running agent loop, name the five ways it fails and the control that catches each — and place human checkpoints correctly.",
   "body": "## The frame: five failure axes\n\nAn agent that runs its own loop (edit → test → fix → repeat → stop) can fail on five axes. Ask, in order: does it TERMINATE? is it CORRECT? is it ON-GOAL? is COST bounded? does it stay IN-BOUNDS? Each axis has a matching control — that mapping is the whole lesson.\n\n## Axis 1 — terminate? → a stop condition\n\nLeft alone, a loop can never converge, or oscillate (fix A breaks B, fix B breaks A). Control: an explicit termination — max iterations, a verifiable success criterion, or budget exhausted. An agent with no stop condition is a hang waiting to happen.\n\n## Axis 2 — correct? → INDEPENDENT verification\n\nTwo correctness failures: chasing symptoms and piling up work-arounds without fixing the root cause, and stopping while confidently wrong (\"done\" on a bad result). Control: verification that is INDEPENDENT of the agent — programmatic checks (tests, schema, linters), a separate evaluator agent (this is S3’s evaluator-optimizer), or citation/ground-truth checks. The agent grading its own work is worthless, because a confidently-wrong agent passes itself. And note: the stop condition and verification are one thing — \"done\" must mean \"a verifiable success criterion is met\", or Axis 1 just ends on a wrong answer.\n\n## Axis 3 — on-goal? → re-anchor the goal\n\nOver many self-feedback rounds an agent drifts: it forgets the original objective and starts debugging problems it created itself — and context-compaction makes the amnesia worse. Control: persistent goal re-anchoring — store the objective/spec in durable state and re-inject it every loop so compaction cannot erase it. (Human-in-the-loop can also catch drift, but it is a backstop, not the tight control here.)\n\n## Axis 4 & 5 — cost → budget cap · bounds → guardrails\n\nCost can run away (unbounded tokens / time / money) → cap it with a budget. And the agent can act out of bounds (destructive or out-of-scope actions, touching prod) → constrain it with guardrails on scope and permissions.\n\n## Human-in-the-loop: two placement principles\n\nHITL cuts across the axes, so where you put it matters — not everywhere (that destroys the agent’s value). Two principles compose: (1) a MILESTONE gate between big phases — efficient oversight, because one review covers cost + goal + guardrails + re-anchor together; (2) an IRREVERSIBILITY gate — a mandatory human approval right before any action you cannot take back (git push, deploy to prod), which cannot wait for a phase boundary because once it happens it is done. Reversible, low-stakes steps run autonomously.\n\n## HW lens & why it matters\n\nThis is exactly a verification environment’s control set: a timeout (stop), an independent scoreboard (verify), a test-plan goal you are held to (re-anchor), a compute budget, assertions/bounds (guardrails), and sign-off before tape-out (the irreversible HITL gate). Exam-wise, this is the backbone of \"the agent is autonomous — how do you trust it?\" questions, and \"irreversible / high-stakes actions require human approval\" is both a recurring answer and a real safety principle."
  },
  {
   "id": "d1-s6",
   "dom": "D1",
   "ses": "S6",
   "date": "2026-07-19",
   "title": "The Complexity Ladder (D1 capstone)",
   "goal": "Given a task, choose the lowest rung of the agentic ladder that solves it — and know exactly what a needless climb costs.",
   "body": "## The one principle behind every D1 trap\n\nS1 warned \"more autonomy isn’t always better\"; S4 warned \"more agents isn’t always better.\" They share one direction: start with the simplest thing that works, and treat added complexity (autonomy, agent count) as a COST, not a free upgrade. Every step up must be forced by the task. Anthropic’s own guidance: find the simplest solution, and increase complexity only when it demonstrably improves the outcome.\n\n## The ladder\n\n- Augmented LLM — one call plus tools / retrieval / memory. The floor.\n- Workflow — the 5 pre-authored patterns (chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer).\n- Single agent — a feedback loop where the model decides the next step.\n- Multi-agent — a coordinator plus subagents with isolated contexts.\n\n## Power rises — so does cost\n\nEach rung up adds capability but also latency, tokens, nondeterminism, and new failure modes (the five axes from S5). The rule: pick the LOWEST rung that solves the task; climb only when the current rung genuinely cannot do the job.\n\n## The climb triggers (when a step up is justified)\n\n- Augmented LLM → workflow: the task needs multiple steps or branches, but the path is still predictable (you can hardcode the flow).\n- Workflow → single agent: you cannot predefine the path — the model must decide the next step from feedback (open-ended, unknown step count).\n- Single agent → multi-agent: subtasks are independent and breadth-heavy, and the work exceeds a single context window (the S4 rule).\n\n## The hidden cost of climbing (worked example)\n\nExtracting {date, vendor, total} from 10k invoices/day is a bounded, predictable task → the lowest rung (an augmented LLM call, or a simple workflow) is correct. Jumping to a single agent is NOT nearly free: an agent is a loop, so you go from ~1 call per item to N calls (latency and tokens ×N, then ×10,000 at this volume); you lose determinism (the agent picks its own path, so identical invoices can take different routes, killing the reproducibility a bounded extraction needs); and you inherit the S5 control burden (stop conditions, verification, guardrails) for flexibility the task never required. That is precisely \"reaching one rung too high.\""
  },
  {
   "id": "d1-s7",
   "dom": "D1",
   "ses": "S7 R1",
   "date": "2026-07-19",
   "title": "D1 Mini-Mock — Round 1 (model answers)",
   "goal": "Self-test judgment across S1–S6. Five scenarios; each answer is \"which and why.\"",
   "body": "## Q1 — pattern: generate → score → revise → repeat\n\nAnswer: EVALUATOR-OPTIMIZER (a workflow). One model generates, a separate evaluator scores it against fixed criteria, the generator revises on the feedback, looping until it passes. Common trap: calling it an \"agent\" because it loops. A feedback loop alone is not agency — here the loop, the critic, and the stop condition are all pre-authored, so it is a workflow. An agent would decide its own next action and when to stop.\n\n## Q2 — routing vs orchestrator: runtime clause extraction\n\nAnswer: ORCHESTRATOR-WORKERS. The subtask set (which clause-types are present) is decided at runtime from the input, delegated to workers, and aggregated into one summary. Runtime decomposition + aggregation is exactly what separates it from routing, which would pick one fixed path with no merge.\n\n## Q3 — multi vs single agent: rename across 40 files\n\nAnswer: SINGLE AGENT. The edits are tightly coupled — every call site must stay consistent (shared, evolving state). Isolated subagents would drift into inconsistent renames. The subtasks are not independent, so the multi-agent parallel gain does not apply and coordination cost would dominate.\n\n## Q4 — reliability: agent loosens the assertion, declares done\n\nAnswer: the CORRECTNESS axis — a work-around (patching the symptom instead of the root cause) plus a confidently-wrong \"done.\" The agent is gaming its own success check. Control: INDEPENDENT, tamper-proof verification — (1) the stop condition's \"done\" must be a verifiable criterion the agent cannot weaken, and (2) a guardrail must forbid the agent from editing the tests/oracle.\n\n## Q5 — ladder: summarize one 20-page PDF into 5 bullets\n\nAnswer: an AUGMENTED LLM — one model call, no loop. A single agent is already too high (an agent is a loop, and there is nothing to loop on). A 5-subagent proposal is severe over-engineering (5× cost + merge/coordination, zero benefit). Rule: the lowest rung that works — here, one call.\n\n## Three things to firm up\n\n(1) A feedback loop does not by itself make an agent — a fixed generate↔evaluate loop is the evaluator-optimizer workflow. (2) On the ladder, drop to the LOWEST rung: a bounded one-shot task is an augmented LLM, not a single agent. (3) Verification must be independent and tamper-proof — never let the agent grade itself on a criterion it can edit."
  },
  {
   "id": "d2-s1",
   "dom": "D2",
   "ses": "S1",
   "date": "2026-07-19",
   "title": "A Tool Is Not an API (the finite-context contract)",
   "goal": "Understand why a tool for an agent must be designed differently from a human-facing API.",
   "body": "## The core idea\n\nA tool is a contract between a deterministic system and a NON-deterministic, limited-context agent — not an API wrapper. That one reframe drives every D2 decision.\n\n## Why a full-data API breaks for an agent\n\nGive an agent list_users() that returns all 50,000 users. A human developer calling GET /users is fine — the human paginates and scrolls on their end. An agent cannot scroll: whatever a tool returns lands directly in its finite context window (the same finite window from D1-S4). Fifty thousand rows flood it, pollute its attention, and waste tokens — the agent cannot even reason over the result.\n\n## So move the filtering INTO the tool\n\nThe tool must return high-signal, filtered results, not a full dump: search_users(role=\"admin\", active=true) → 12 rows, not list_users() → 50,000. The narrowing that a human would do by hand has to be built into the tool itself. Same idea downstream: meaningful identifiers over raw uuids, pagination, and a concise/detailed response format.\n\n## Exam so-what\n\nWhen a question asks which tool design suits an agent, choose the one that respects limited context — search_X over list_X, high-signal responses. Returning everything, raw uuids, or opaque blobs are the wrong answers.\n\n## HW lens\n\nYou would not dump a 50,000-line waveform to the block above — you design a probe that triggers and filters down to only the signals of interest. A tool for an agent is that probe.\n\n## Next (S2)\n\nThe other face of \"limited context\": an agent decides WHICH tool to call from its name and description alone — it does not read full docs. So description quality = call accuracy, which is the S2 topic."
  },
  {
   "id": "d1-s2",
   "dom": "D1",
   "ses": "S2",
   "date": "2026-07-18",
   "title": "The 5 Workflow Patterns",
   "goal": "Recognize which of the 5 workflow patterns a situation is — by the shape of its data flow.",
   "body": "## The 5 patterns (all still workflows)\n\n- Prompt chaining — split the task into a fixed sequence of steps; each call works on the prior output (add a gate to check between steps).\n- Routing — classify the input, then send it down one predetermined path.\n- Parallelization — run work concurrently: sectioning (independent parts, then merge) or voting (same task N times, take the majority).\n- Orchestrator-workers — a central model decides the subtasks at runtime, delegates to workers, and synthesizes.\n- Evaluator-optimizer — generate → a separate evaluator critiques → revise on the feedback → repeat.\n\n## Recognition cheat-key\n\nDraw the arrows; the shape is the answer. Linear steps → chaining · classify→branch → routing · fan-out→merge / N-vote → parallelization · runtime decomposition → orchestrator-workers · generate↔evaluate loop → evaluator-optimizer.\n\n## The money distinction: routing vs orchestrator\n\nBoth branch to different work. The difference is WHEN the branches are decided. Routing: the set of paths is fixed in advance; the model only picks one, and there is no aggregation. Orchestrator: the model invents the subtasks at runtime (e.g., which files to change) and aggregates the results. One line — routing = pick from a fixed set of bins; orchestrator = build the bins on the fly.\n\n## Same topic, different pattern\n\nA travel assistant that composes the needed steps per request (flights + hotel + visa, or just a train) and aggregates = orchestrator. A travel chatbot that sorts each query into {flights / hotel / refund} and sends it to one handler = routing. Same domain — the pattern is set by the structure, not the topic.\n\n## Two easily confused: voting vs evaluator-optimizer\n\nBoth repeat, so they look alike. Voting = the same task run independently in parallel, then majority — no critic, no improvement. Evaluator-optimizer = generate, a critic scores it, revise on the feedback, loop — a sequential improvement loop.\n\n## Why it matters\n\nRoughly half of D1 questions are \"which pattern is this flow, and why\". Read the shape; name the dominant pattern. Real systems compose several patterns, but the exam asks for the dominant one."
  },
  {
   "id": "d1-s3",
   "dom": "D1",
   "ses": "S3",
   "date": "2026-07-18",
   "title": "Orchestrator vs Routing, and the Agent Boundary",
   "goal": "Nail the routing↔orchestrator deciding property, then draw the exact line where an orchestrator becomes a true agent.",
   "body": "## Routing vs orchestrator — the deciding property\n\nDo NOT split them on \"which capability does it pick\" — both pick a capability from the input, so that test fails. The real test is two-part: (1) Before any request arrives, can you enumerate the entire list of destinations/subtasks on paper? (2) Is there a merge at the end? Enumerable up front + no merge = routing. Built at runtime + aggregated = orchestrator. One line: routing = pick from a fixed set of bins; orchestrator = build the bins on the fly and combine.\n\n## The nested-classifier trap\n\nA ticket is classified into {billing, technical, account}; if \"technical\", a second classifier picks one of {network, hardware, software, account-security}; it goes to exactly one specialist; nothing is combined. Still ROUTING — even two levels deep, every destination is enumerable in advance, exactly one is chosen, and there is no aggregation. Multi-level choosing is not orchestration.\n\n## The apparent paradox\n\nWe just said an orchestrator \"decides the subtasks at runtime.\" The S1 litmus said \"the model deciding at runtime = agent.\" So why is an orchestrator still a workflow? Because deciding subtasks is dynamic CONTENT inside a fixed CONTROL FLOW: decompose once → dispatch to workers → merge once. One forward pass.\n\n## Where orchestrator becomes an agent\n\nThe missing ingredient is a feedback loop. Compare two versions of the same coding task. (1) Orchestrator: decide the 4 files to edit → workers edit them → merge → done. (2) Agent: edit a file → run the tests → see a failure → open a file it did NOT plan for → fix → re-run → repeat until it judges the goal met and stops on its own. Version 2 adds: (a) environment feedback drives the next step, (b) the trajectory length and the stop condition are decided by the model. That feedback loop is the line.\n\n## The one-line conclusion\n\nOrchestrator = dynamic content, fixed one-pass control flow (decompose → dispatch → merge). Agent = the control flow itself is dynamic — a feedback loop where the model chooses the next action and when to stop.\n\n## HW lens\n\nOrchestrator = a directed regression dispatched once (a fixed job set, fanned out and joined). Agent = constrained-random + coverage-closure: observe coverage/failures → generate the next stimulus → loop until closure. The loop is the whole difference.\n\n## Exam-grade trap immunity\n\nA per-document extraction pipeline decides at runtime which fields exist, extracts each, assembles JSON — once, no re-check. It is ORCHESTRATOR, not agent: \"decides at runtime\" is only dynamic content; with no feedback loop and no self-chosen stop, it never crosses into agent. Runtime-dynamic alone is not enough — you need the feedback loop."
  },
  {
   "id": "d1-s1",
   "dom": "D1",
   "ses": "S1",
   "date": "2026-07-13",
   "title": "Workflow vs Agent",
   "goal": "Tell whether a task should be built as a fixed workflow or an autonomous agent.",
   "body": "## The boundary\n\nWorkflow = predefined code paths orchestrate the LLM calls; you author the control flow. Agent = the model decides the next step at runtime and loops on tool + environment feedback.\n\n## Litmus test\n\nBefore running, can you predict / hardcode the path and the number of steps? Yes → workflow. No, and it needs a feedback loop where the model picks the next step → agent.\n\n## The trap\n\nMore autonomy / multi-agent is NOT automatically better. If the path is predictable, a workflow is cheaper, faster, and more reliable. Spend agency only where flexibility is genuinely required.\n\n## HW lens\n\nDirected regression = workflow (a fixed vector sequence). Constrained-random + coverage-closure loop = agent-like (the tool decides the next stimulus). Agency is flexible but costs more and compounds errors."
  }
 ],
 "transcripts": [
  {
   "id": "t-d3-s1-s2-s3",
   "dom": "D3",
   "ses": "S1-S3",
   "date": "2026-07-23",
   "title": "CLAUDE.md Hierarchy, Skills, and Path-Specific Rules (interactive)",
   "note": "English translation of the original Korean session — three task statements in one sitting. Nick repeatedly reasoned the mechanism out from first principles before being given the name.",
   "body": "**Tutor (RECALL):** To make the model call a tool but let it choose which one, what is `tool_choice`?\n\n**Nick (wrong):** auto.\n\n**Tutor:** Third miss — the answer is \"any\". Here is the misconception: you were caught by my phrase \"let it choose which one\" — but *the model choosing which tool* is true of BOTH auto and any, so it cannot be the discriminator. The real axis is: **must a tool be called at all?** auto = no (text-only reply allowed); any and forced = yes. auto = tool optional; any = tool mandatory, kind free; forced = mandatory + kind named. Logged (with the misconception) to re-drill.\n\n**Tutor (D3-S1):** Your team works in Claude Code and Claude has followed the team conventions well. A new teammate clones the repo, runs Claude — and it knows none of the conventions. On existing machines it still works. What went wrong, and how do you fix it? (Hint: where were the conventions written, and do they travel with the repo?)\n\n**Nick (correct):** The conventions must have been only on the existing teammates' local machines.\n\n**Tutor:** Exactly. Three levels: user (not shared — each machine), project (shared, travels with a clone), directory (a subtree). The bug: conventions at the user level, so a new teammate has none. Fix: move them to the project level. \"Works for me, not for them\" almost always means user-level placement. Next: you pile all the conventions into one 500-line project file. What breaks, and how do you split it — and how do you check what actually loaded?\n\n**Nick:** Split the conventions into files by kind and load them when needed. What about making it a skill? To know what loaded — build a separate mechanism, or just ask Claude Code?\n\n**Tutor:** Splitting is right — topic files pulled in by import (the CLAUDE.md becomes a thin table of contents) or a rules folder. Your \"load only when needed\" instinct is exactly S3's topic. Skill vs CLAUDE.md: always-on universal standards (style, commit format, review criteria) → CLAUDE.md/rules; an on-demand procedure → skill. A commit-format rule as a skill would never fire when needed. And to see what loaded, \"ask Claude Code\" is right — that is `/memory`; check, don't guess.\n\n**Tutor (D3-S2):** (a) Where do a team-wide slash command and a personal one each live? (b) You build a skill that runs the whole test suite and analyses failures — its output is thousands of lines. What happens if it runs inside the main conversation (recall D1-S4), and how should it run instead?\n\n**Nick (correct):** (a) team → project repo, mine → local .claude or gitignored. (b) it fills the session context; the skill should call a tool that does the analysis and returns only a clean result the session can see.\n\n**Tutor:** (a) correct — same layering as CLAUDE.md. (b) you reasoned the pattern out yourself: \"fills the session context\" = pollutes the main conversation (D1-S4); \"analyse outside, return only the clean result\" = the right architecture. Its name is `context: fork` — run the skill in an isolated subagent; the verbose output is consumed there and only the result returns. Next: unrestricted, that skill could also write, delete, or hit the network. Which D2 concept applies at the skill level?\n\n**Nick (correct):** Isolation? Scoping the tools the skill can use?\n\n**Tutor:** Exactly — skill-level tool scoping, named `allowed-tools`. Two lineages: D2 scoping (selection reliability) + the D1-S5 guardrail (bound what it can touch). So a skill has three switches: `context: fork` (isolated run), `allowed-tools` (restrict tools), `argument-hint` (what to ask for when called with no arguments). Personal variants go at the user level under a different name.\n\n**Tutor (D3-S3):** Test files live next to their source — `src/auth/login.test.ts`, `src/api/orders.test.ts` — scattered across dozens of directories. You want the testing convention to load only when Claude touches a test file. (1) What goes wrong if you try a directory-level CLAUDE.md? (2) How should you do it, and what does it buy you?\n\n**Nick:** A CLAUDE.md is only valid one-per-project-root, so other contexts need differently-named documents introduced from CLAUDE.md — you can give rules like \"when X, read which document.\"\n\n**Tutor:** One correction: CLAUDE.md is not \"one at the root\" — directory-level CLAUDE.md exists and applies to its subtree. But it fails here because the test files are scattered, so you'd copy the convention into every directory. Your second instinct — \"tell it when to read which document\" — is exactly the answer: attach a **path pattern** to a rule file so it loads only when a matching file (`**/*.test.*`) is edited. Benefits: works regardless of location, and irrelevant conventions never load (saving context/tokens). Distinguisher: contained in one subtree → directory CLAUDE.md; a scattered file type → path-conditional rule. Check: \"every .py file must have type hints\" — which one?\n\n**Nick (correct):** Path-conditional rule.\n\n**Tutor:** Correct — `.py` files are scattered across the whole repo, so a subtree-bound directory CLAUDE.md can't catch them; one path pattern (`**/*.py`) does, wherever they live. Your D3-S1 instinct (\"load only when needed\") closed as a real feature three sessions later."
  },
  {
   "id": "t-d2-s5",
   "dom": "D2",
   "ses": "S5",
   "date": "2026-07-22",
   "title": "Scoping, tool_choice, Error Contracts, MCP Integration (interactive)",
   "note": "English translation of the original Korean session. First session after the blueprint realignment — topics are now mapped to official task statements.",
   "body": "**Tutor:** You asked how scoping actually works — whether grouping tools into an explanatory paragraph by category is enough. It helps, but it is not scoping: every tool is still callable, so the model can still pick the wrong one. Real scoping shrinks the available set — role-scoped tool sets, a few genuinely shared cross-cutting tools, and replacing over-general tools with constrained ones. The number matters: 18 tools select measurably worse than 4–5. Now the call-time control, `tool_choice`: **auto** = the model decides whether to use a tool at all (text-only allowed); **any** = it must call some tool, but chooses which; **forced** = it must call a specific named tool. APPLY: (a) an assistant that usually just answers but may search; (b) an extraction pipeline that must always return structured data via a tool, never prose; (c) a pipeline where the first step must always be extract_metadata.\n\n**Nick (wrong):** a — auto, b — forced, c — any.\n\n**Tutor:** (a) correct. (b) and (c) are swapped. \"Must return via a tool, never prose\" does not name a tool → that is **any**. \"The first step must be extract_metadata\" names the tool → that is **forced**. Deciding question: does the requirement name a specific tool? Yes → forced; no, just \"a tool not prose\" → any; tool use optional → auto.\n\n**Tutor:** Re-check: the model must call a tool, but which of three is up to the model — which value?\n\n**Nick (wrong):** auto.\n\n**Tutor:** It is **any** — the key words were \"must call a tool.\" Anchor by how much each constrains: auto = no constraint (\"decide for yourself\"); any = one constraint (\"a tool, yes — which one is yours to pick\"; the English word *any* means \"any one of them, but one\"); forced = two constraints (\"this tool, no choice\"). Logged as a weak spot to re-drill.\n\n**Tutor:** Error contracts. Your agent receives the identical response `{\"error\": \"Operation failed\"}` in four different situations: (a) network timeout, (b) malformed date, (c) refund exceeds the policy limit, (d) no permission on the account. What decision can the agent no longer make, and how should the four differ?\n\n**Nick:** \"Operation failed\" is too generic — no specific interpretation is possible.\n\n**Tutor:** Correct, and narrowing it to one word: the decision it erases is **\"can I retry this?\"** Now fill in the table: retry yes/no and what to do, for each of the four.\n\n**Nick:** (a) retry a few times; if unresolved, return an error — do something else or stop. (b) no retry needed; fill with a default/estimated value and warn, continue other work. (c) stop; decide the refund is not allowed and run the corresponding routine. (d) retry once, return to the user.\n\n**Tutor:** (a) and (c) correct. (b) is the trap: a malformed date is the agent's own mistake, so the right move is **fix the input and retry** — validation errors ARE retryable once corrected. Filling in a default or estimated value **fabricates data** that flows silently downstream (the same antipattern appears in structured extraction, where a model invents a value to satisfy a required field). Different case: if the information is genuinely absent from the source, retrying is pointless — that is not a format problem. (d) permission does not change on retry, so even one retry is meaningless — escalate immediately. Official categories: **transient / validation / business rule / permission**, and a tool result should carry an error flag, the category, whether it is retryable, and a human-readable explanation. In multi-agent systems a subagent recovers transient errors locally and propagates only what it cannot fix, with partial results.\n\n**Tutor:** Last piece: a search tool fails to reach its data source and returns `{\"results\": []}` instead of an error. What goes wrong — what false conclusion does the agent reach?\n\n**Nick (correct):** It can be misread as \"access succeeded and the empty value is the right answer.\"\n\n**Tutor:** Exactly — a false negative promoted to fact. And because it looked like success, nothing retries, so a downstream report states confidently that no such record exists. Access failure must return an error (flag + category + retryable), never an empty success.\n\n**Tutor:** MCP integration. Your team uses an internal Jira MCP server and the config needs an API token. (1) Where do you put the config so the whole team gets it — and where would a personal, experimental server go? (2) What happens if you write the token straight into the config file, and how do you avoid it?\n\n**Nick (correct):** The API token should be set up once by each person individually; it does not need sharing. Put a placeholder in the settings file. Personal settings go in the top-level .claude.\n\n**Tutor:** Right instincts, with names: team-wide config goes in the **project-level** file that ships with the repo, so everyone who clones it gets the server; personal/experimental goes in the **user-level** config, which is not version-controlled. Your \"placeholder\" is **environment-variable expansion** — the file references the variable, each person's environment holds the real token. On (2), you said Jira accounts could not be distinguished — true (a shared identity destroys attribution), but the primary risk is bigger: **the secret gets committed, which leaks the credential to everyone with repo access and stays in git history even after deletion.**\n\n**Tutor:** Connect five MCP servers, each exposing eight tools, and all of them become discoverable and usable the moment they connect. Tie that to what you learned about tool count — what happens, and what discipline follows?\n\n**Nick (correct):** Scoping is needed.\n\n**Tutor:** Right, and the arithmetic is brutal: 5 × 8 = forty live tools, when 18 already degrades selection versus 4–5. So **adding a server is not free — it spends tool budget.** Connect only what is needed and scope by role. Three more integration points: expose content catalogs (issue summaries, document hierarchies, DB schemas) as **resources** so the agent sees what exists instead of probing with exploratory calls; **weak MCP tool descriptions lose to the familiar built-in tools**, leaving your server unused; and prefer **community servers** for standard integrations, building custom ones only for workflows unique to your team."
  },
  {
   "id": "t-d2-s2",
   "dom": "D2",
   "ses": "S2",
   "date": "2026-07-20",
   "title": "Tool Design Craft (interactive)",
   "note": "English translation of the original Korean session.",
   "body": "**Tutor:** An agent picks a tool from its NAME and DESCRIPTION alone — it does not read docs. Two tools: A = get_data(id) \"Gets data.\" B = search_transactions(account_id, start_date, end_date) \"Search a customer’s transactions in a date range; returns up to 50 recent matches with amount, date, merchant.\" Which will the agent call correctly and reliably, and why does A fail? (Use your register-spec instinct.)\n\n**Nick (correct):** B is stable. For A you cannot know what id and data are, and it is very hard to know when to call that function/tool.\n\n**Tutor:** Correct — the description IS the interface the agent reasons over. A good one states three things: when to use it (purpose), what each parameter means (unambiguous — user_id, not user), and what it returns. Plus: make implicit context explicit (\"describe it to a new hire\") and namespace by service (asana_search). Small tweaks → big accuracy gains: description quality = call accuracy. HW lens: a vague register spec → mis-use. APPLY: improve run(q) \"Runs a query\" — give a better name, a one-line description (including when to use it), and clear parameter names.\n\n**Nick:** run_sim_vcs(test_id), \"vcs simulation for specific test case\".\n\n**Tutor:** Big step up — the name says what it does, test_id is a clear parameter, and vcs namespaces it. One more thing: a tool must also state what it RETURNS (the agent plans its next step from the return, and it should be high-signal). Complete form: vcs_run_sim(test_id) — \"Run a VCS simulation for one test case (by test_id). Returns pass/fail, a coverage summary, and the log path. Use to run or reproduce a single test.\" So: when + parameters + returns. Second half: you now have 40 well-named tools. A teammate says \"more tools = more capable.\" Is that right, and what goes wrong with too many?\n\n**Nick (correct):** Every step it has to spend effort finding which tool it can use. Even with many tools as assets, it would be good to arrange things so only a limited set is usable in a given situation.\n\n**Tutor:** Right — the selection cost/distraction, and your scoping idea is a real lever. Named failure: too many tools (especially overlapping ones) derail tool selection. Two mitigations: (1) consolidation — fold low-level ops into one high-level tool (schedule_meeting = find availability + book + invite), moving the chaining into the tool; (2) scope the toolset to the situation (your idea). This is the D1 simplicity trap a third time: more autonomy → more agents → more tools. HW lens: one high-level configure_and_start(mode) transaction instead of five low-level register pokes."
  },
  {
   "id": "t-d2-s3",
   "dom": "D2",
   "ses": "S3",
   "date": "2026-07-20",
   "title": "Responses & Structured Errors (interactive)",
   "note": "English translation of the original Korean session.",
   "body": "**Tutor:** High-signal responses you already have (S1–S2). The new piece is errors. An agent calls vcs_run_sim(test_id) with a non-existent id. Two error responses: A = {error:\"500\"}. B = {error:\"No test found with id ‘tc_9987’. Valid ids look like ‘test_<name>’. Call list_tests() to see what is available.\"} The agent is in a loop and just got this. Which leads to a better outcome, and what does A make the agent do? (recall the agentic loop: act → verify → repeat.)\n\n**Nick (correct):** B is good. With A’s message, unless there is a registered reference/index error manual it is useless — the agent would just say \"error\" to the upper orchestrator or the user and leave the loop.\n\n**Tutor:** Correct and sharp — an opaque code demands outside knowledge the agent lacks, so it cannot self-recover and must escalate or give up. Crystal: an error is feedback (act → verify → repeat). A structured, actionable error — what went wrong + how to fix + a cheap recovery path — lets the agent fix its call and continue; an opaque code causes blind retries or escalation. Your nuance is a design principle: make recoverable errors actionable so the agent self-corrects, and escalate cleanly only when it is truly unrecoverable (which ties back to stop conditions and HITL). HW lens: 500 = a bare exit code; a structured error = an assertion with file/line/expected-vs-actual + a hint."
  },
  {
   "id": "t-d2-s4",
   "dom": "D2",
   "ses": "S4",
   "date": "2026-07-20",
   "title": "MCP Architecture (interactive)",
   "note": "English translation of the original Korean session.",
   "body": "**Tutor:** Before memorizing MCP, why does it exist? Agent A talks to GitHub, Slack, Drive, DB; B and C too; each service has a different API/auth. Without a standard, how many integrations, and why is that a problem as it grows? And in hardware, how was the same \"many devices ↔ many hosts\" problem solved?\n\n**Nick (correct):** Each agent needs an integration for as many tools/services as it uses. A standardized interface is needed.\n\n**Tutor:** Correct — M×N explosion → with a standard it becomes M+N. HW anchor: USB/PCIe — a device implements the standard once and plugs into any host. Anthropic calls MCP \"a USB-C port for AI.\" Roles: host = the agent app (wants capabilities), server = exposes one capability, client = a 1:1 connection inside the host. Map it: Claude Code connects to a GitHub MCP server to create an issue — host / server / client?\n\n**Nick:** Host = Claude Code, server = GitHub, client = the agent in Claude Code.\n\n**Tutor:** Host and server correct. Refine client: it is not the agent — it is the connector inside the host holding the 1:1 link to that server (one client per server). The agent consumes what the client exposes; agent = consumer, client = wiring. Three primitives a server exposes: tool (a model-called action, side effects, model-controlled), resource (data read into context, no side effects, app-controlled), prompt (a user-invoked template, user-controlled). Classify: (1) read README into context, (2) create an issue, (3) a /summarize template.\n\n**Nick (correct):** 1 resource, 2 tool, 3 prompt.\n\n**Tutor:** 3/3. Deeper: the discriminator is WHO controls it (model→tool, app→resource, user→prompt); REST analogy (resource≈GET, tool≈POST); tools are the risk surface where guardrails/HITL live. Practice: (1) fetch a Confluence page, (2) post to Slack, (3) a /triage-bug workflow, (4) delete a file (+ which D1 control?), (5) query the DB for a customer’s orders — tool or resource and why, (6) 4 agents × 6 services integrations without vs with MCP, and clients if an IDE connects to Postgres and GitHub.\n\n**Nick (wrong):** 1 resource, 2 tool, 3 prompt, 4 tool + guardrail, 5 resource (read-only), 6: 24, 6, 2.\n\n**Tutor:** 1–4 correct (4: also HITL, since delete is irreversible). 5 is the trap: \"read-only, so resource\" is wrong — the test is control, not side-effects. A model-invoked parameterized query (search_orders(customer_id)) is a TOOL even though it only reads; a resource is passive data the app loads (URI-addressed). 6: without MCP = 24 (correct); WITH MCP = M+N = 10 (6 counts only the servers — the 4 hosts also adopt MCP once); clients = 2 (correct). Take-away: classify primitives by control, not by whether it writes."
  },
  {
   "id": "t-d1-s4",
   "dom": "D1",
   "ses": "S4",
   "date": "2026-07-19",
   "title": "Multi-agent Systems & Context Isolation (interactive)",
   "note": "English translation of the original Korean session. Raw turns — including a blanked recall that was reconnected, which is where it re-anchored.",
   "body": "**Tutor:** RECALL. Q1: before running, what single question tells you whether a system is a workflow or an agent? Q2: an orchestrator already \"decides subtasks at runtime\" — what one ingredient must be added for it to become a true agent?\n\n**Nick (wrong):** Q1: not sure. Q2: feedback loop.\n\n**Tutor:** Q2 is right (feedback loop). Q1 is actually half-answered by Q2 — same spine. Reconnect: if before running you can write down the whole step sequence and hardcode it → what is it? If instead the model looks at each result and decides the next step (your feedback loop) → what is it? Complete it as one \"… = workflow / … = agent\" litmus.\n\n**Nick (correct):** Workflow = process by a defined, fixed order of steps. Agent = proceed to the next action based on result feedback.\n\n**Tutor:** Complete and correct — Q1 was not lost knowledge, just an unlinked connection. Now the topic. Bridge from S3: if each \"worker\" in orchestrator-workers is itself a full agent (own loop, tools, context), that is a multi-agent system — a coordinator (lead) plus subagents. Scenario: \"compare 5 NPU vendors and recommend one\" → the coordinator spawns 5 subagents (one per vendor), each investigates independently and returns only a summary, then the coordinator synthesizes. Question: instead of giving each subagent its own context window, you run all five investigations in ONE shared thread — what goes wrong, and what is your HW instinct for why separate contexts help?\n\n**Nick:** In a shared thread, the info about the five different entities is likely not perfectly separated.\n\n**Tutor:** Correct — reason 1, cross-task interference / context pollution: attention blurs and vendor A’s numbers get stuck onto B. HW lens: cross-talk on a shared bus; isolation = a local buffer per lane, only summaries written back. Now the second, more physical reason: a context window is a fixed-size buffer (say 200k tokens). If all five subagents must push their full datasheet reads into ONE window, what breaks in terms of CAPACITY, and how does \"own window + return only a summary\" solve it?\n\n**Nick:** The context each subagent can handle is limited in inverse proportion to the number in parallel. The capacity shortage lowers each result’s quality or stretches total time, and cramming into a small window triggers auto-compaction, which ironically re-spends tokens repeatedly.\n\n**Tutor:** Correct, and the auto-compaction catch is especially sharp. Locking it: shared window = each subagent ≈ window÷N (starved), overflow → truncation + repeated compaction. Isolated = each gets a FULL window, goes deep, returns only a summary → the coordinator holds 5 summaries, not 5 raw datasheets. Key line: isolation multiplies total usable context to ≈ N×window while no window is polluted. Last piece — the cost. The same isolation that blocked interference makes A and B work blind to each other. What new problem does that \"blind isolation\" create that a single shared agent would not suffer? (As a team lead: split work among 5 people with no shared context — what breaks?)\n\n**Nick:** Each does the common work separately — inefficient overall. And over time they proceed in their own direction rather than to a shared standard.\n\n**Tutor:** Exactly — (1) duplicated work → token blow-up (the main reason multi-agent runs ~15× a single chat), (2) drift → inconsistency → the coordinator must reconcile. The lever: the coordinator gives very crisp task specs (objective, output format, boundaries, non-overlapping). APPLY: X = \"survey NPU dataflow architectures across 20 papers and summarize trends\"; Y = \"rename one signal that threads through 8 files, keeping every edit consistent\". Which fits multi-agent, which does not, and why (interference/capacity gain vs duplication/drift cost)?\n\n**Nick:** X is the better fit for multi-agent.\n\n**Tutor:** Right (X = multi). You gave only the label — finish it: what about Y, and one-sentence why for each (tie Y to the drift/inconsistency you named). Hint: X’s pieces are independent (20 papers are strangers), Y’s are interlocked (one signal across 8 files, edits must stay consistent).\n\n**Nick:** For renaming a signal across modules, you could set the standard in one place first and then do the other seven files in parallel as multi-subagents — but the cost outweighs what you gain from going multi. Sequential in one place is better.\n\n**Tutor:** Perfect — Y = single agent. Knowing you COULD force it parallel and rejecting it on cost/benefit is exactly the right judgment. Rule, in your words: independent + breadth → multi; coupled/sequential (shared state) → single. Litmus: can the pieces run without seeing each other’s work? Exam angle: multi-agent-research-system is one of the 6 scenarios; the trap (a rerun of S1) is \"multi looks powerful, use it by default\" — wrong, because of 15× tokens + coordination failure modes.\n\n**Tutor:** BONUS — the summary boundary. Subagents dig deep in their own window but hand up only a summary; their raw context is isolated and then gone, so the coordinator must trust the summary. HW-verification lens: a block that hands up only pass/fail or a coverage summary, not the full waveform. Q1: what reliability risk does the coordinator now carry? Q2: to trust that summary, what would you, as a verification engineer, require it to include?\n\n**Nick:** 1. The process detail disappears — it is hard to know how the result was reached or how to reproduce it. 2. Have the subagent report its verification method, a result report, and its own reliability self-assessment.\n\n**Tutor:** Correct — the risk is lost provenance/reproducibility, plus baked-in error (the coordinator cannot cross-check) and compounding across layers (same root as S1’s \"agents accumulate errors\"). Your fix is good, with one sharpening: self-assessment alone is weak — an agent can be confidently wrong — so pair self-confidence with traceable evidence/citations and an independent check. HW lens: never take a DUT’s self-reported pass; require an independent scoreboard and the raw waveform on demand. Conclusion: structure the return (claim + evidence + source + confidence) and run an independent verification pass on the synthesis. This lossy handoff is where reliability leaks — a preview of D5."
  },
  {
   "id": "t-d1-s5",
   "dom": "D1",
   "ses": "S5",
   "date": "2026-07-19",
   "title": "Keeping an Agent on the Rails (interactive)",
   "note": "English translation of the original Korean session. Raw turns, with the tutor’s corrections and deepenings kept in full (at Nick’s request).",
   "body": "**Tutor:** RECALL Q1 (re-drill, no hints): state the single litmus for workflow vs agent as one \"… = workflow / … = agent\" line. Q2: for the coordinator to trust a subagent’s summary, what must the summary include — and why isn’t the subagent’s own \"I’m confident\" enough?\n\n**Nick:** Q1: feedback loop. Q2: evidence of the result (test method and a report like a checklist, plus the logical reason behind the subagent’s confidence).\n\n**Tutor:** Q1 correct — \"feedback loop\" is the deciding marker, and you retrieved it unaided this time (re-drill passed). Full litmus, nailed down: before running, can you predict/hardcode the path and step count? Yes = workflow; No + the model decides the next step from feedback = agent. Q2 correct, with two additions: (a) traceable source/citations so it can be independently reproduced/verified (yesterday’s provenance); (b) the real reason self-confidence is weak — it is not INDEPENDENT: an agent grading its own work will confidently pass itself when wrong, so an evidenced return must be paired with an independent check. That independent check is today’s door.\n\n**Tutor:** LEARN. Take S3’s coding agent (edit → test → fail → fix → repeat → self-stop). If you just let it run, how does it go wrong? List the failure modes from your 20 years of building self-running loops. (Axes: does it terminate / is it correct / is it on-goal / is cost bounded?)\n\n**Nick:** Side-effects of a self-running agent: (1) Without understanding the essential/foundational root cause, it chases the surface symptoms and keeps patching, forcing together a pile of work-arounds. (2) Across many rounds of feeding back to itself it forgets the original goal and repeatedly debugs a NEW problem it created while debugging — and when auto-compaction happens, the chance of forgetting the goal grows. (Also: please keep the tutor’s added explanations clearly in the app and session logs, not just my answers.)\n\n**Tutor:** Both are deep. Names: (1) root-cause blindness → work-around accretion (symptom-chasing = quality/correctness erosion); (2) goal drift + debugging self-inflicted problems + compaction amnesia (direction/memory failure). You hit the correctness and direction axes hard. Completing the failure map with the rest: Axis 1 terminate → non-termination / oscillation (infinite loop, or fix-A-breaks-B ping-pong); Axis 2 correct → your work-arounds + confidently-wrong \"done\"; Axis 3 on-goal → your drift/amnesia; Axis 4 cost → token/time/money runaway; Axis 5 in-bounds → scope/permission overreach (destructive or out-of-scope actions). APPLY: map one control to each of the five axes.\n\n**Nick:** 1. terminate? stop condition. 2. correct? verification. 3. on-goal? HITL. 4. cost bounded? budget. 5. in-bounds? guardrails.\n\n**Tutor:** 1, 2, 4, 5 are exactly right. Refining 3: HITL is not tied to one axis — it is a backstop that cuts across (it can catch drift, wrong-done, and overreach). The tightest control for goal-drift specifically is persistent goal re-anchoring — store the objective/spec in durable state and re-inject it every loop, which is the antidote to your \"auto-compaction forgets the goal.\" HITL sits above that as a safety net. Two deepenings: (a) Axis-2 verification’s crux is INDEPENDENCE — a self-graded pass is worthless; use programmatic checks (tests/schema/linters), a separate evaluator agent (that IS S3’s evaluator-optimizer), or citation checks; and stop + verify are one thing — \"done\" must mean a verifiable success criterion, or the loop just stops on a wrong answer. (b) HITL does not belong everywhere (a human at every step kills the agent’s value) — so where? APPLY: the coding agent can now edit, test, AND git push + deploy to prod (budget, stop, guardrails already in place). Where does the human checkpoint go, and why there and not every step? (hint: which actions are reversible vs irreversible?)\n\n**Nick:** I think when one big task finishes and the next begins, a human review and decision touches cost, goal, guardrails, and the reminder all at once, so HITL there is more efficient than agent autonomy.\n\n**Tutor:** That is a valid placement — the milestone / phase-boundary gate — and your reasoning is right: one review at that seam covers cost + goal + guardrails + re-anchor together, so it batches human attention efficiently. But that is the \"when in the timeline\" axis; my hint pointed at a different axis — reversibility — and the two must combine. Narrowing to the scenario: in edit → test → git push → deploy-to-prod, which action is the point of no return, and can its human check wait for a phase boundary?\n\n**Nick:** A human check before deploy is a must, and ideally a person should approve before push too.\n\n**Tutor:** Exactly — that is the irreversibility gate. Push/deploy are points of no return, so a human must approve right before them; it cannot wait for a phase boundary because once it is out, it is done. Everything reversible and low-stakes runs autonomously. The two principles compose: milestone gate (oversight efficiency) + irreversibility gate (safety). S5 control map: terminate → stop (max-iter / verifiable success / budget); correct → independent verification (programmatic / evaluator / citations, and \"done\" = a verifiable criterion); on-goal → re-anchor (durable state + re-inject); cost → budget cap; in-bounds → guardrails; cross-cutting → HITL (milestone + irreversible). HW lens: a regression’s timeout, an independent scoreboard, the test-plan goal, a compute budget, assertions/bounds, and sign-off before tape-out. Exam angle: this is the backbone of \"the agent is autonomous — how do you trust it?\", and \"irreversible/high-stakes actions need human approval\" is both a recurring answer and a real safety principle."
  },
  {
   "id": "t-d1-s6",
   "dom": "D1",
   "ses": "S6",
   "date": "2026-07-19",
   "title": "The Complexity Ladder — D1 capstone (interactive)",
   "note": "English translation of the original Korean session. Tutor corrections kept in full.",
   "body": "**Tutor:** RECALL / bridge. Two traps: S1 \"more autonomy isn’t always better\" + S4 \"more agents isn’t always better.\" What single principle do they share? One sentence.\n\n**Nick:** Based on understanding how things operate — especially agent behavior (as in Claude Code) — you need to choose a work approach that fits each task’s topic and state.\n\n**Tutor:** Half right — situational fit is correct (and Claude Code is a concrete agent example). The missing half: that fit has a DEFAULT DIRECTION. Both traps point the same way — start with the simplest thing, and treat complexity (autonomy, agent count) as a cost, not a free upgrade; every rung up is justified only when the task forces it. So: don’t reach higher than the task needs. The ladder (you already own all four rungs): augmented LLM (one call + tools) → workflow (the 5 patterns) → single agent (feedback loop) → multi-agent (coordinator + subagents). Power rises, and so do cost and failure surface. Rule: pick the lowest rung that solves the task; climb only when the current rung genuinely cannot. APPLY: extract {date, vendor, total} from invoice PDFs, 10k/day, formats varied but bounded. What is the lowest rung, and what does climbing to an agent cost?\n\n**Nick:** An augmented LLM is plenty to extract JSON from the invoice PDF. A workflow would also do the job efficiently. A single agent would add almost no cost, I think. Multi-agent could have serious side effects: 10k similar, simple jobs each handled by its own agent means wasted duplicate common work, plus conflicts when merging into one file and extra effort to avoid them.\n\n**Tutor:** Lowest = augmented LLM (correct), workflow also fine, and your multi-agent analysis (duplicate common work + merge conflicts + coordination overhead) reuses S4 exactly. One correction — the crux of today: \"a single agent adds almost no cost\" is wrong. An augmented LLM is ~1 call per item; a single agent is a LOOP (decide → act → observe → repeat) = N calls per item. So latency/tokens multiply by N — and at 10k/day that N is multiplied again by 10,000; a \"small\" per-item overhead is amplified by volume. Also nondeterminism: the agent picks its own path, so identical invoices can take different routes, losing the reproducibility a bounded extraction wants. And you inherit the S5 control burden (stop/verify/guardrails) for flexibility the task never needed. So augmented LLM → agent is not free — it is exactly \"reaching one rung too high\" (workflow is still predictable and cheap, so it is fine). Capstone climb triggers: augmented → workflow (multi-step but path predictable) / workflow → single agent (path not predefinable, model decides next step from feedback) / single → multi (independent + breadth, exceeds one window). One line: start at the lowest rung, know each climb’s cost, climb only when the task forces it. That closes D1’s first pass (S1–S6)."
  },
  {
   "id": "t-d1-s7-r2",
   "dom": "D1",
   "ses": "S7 R2",
   "date": "2026-07-19",
   "title": "D1 Mini-Mock Round 2 — re-drill (interactive)",
   "note": "Fresh scenarios targeting only the three Round-1 misses. Q3 used a hardware-verification anchor to land the vocabulary.",
   "body": "**Tutor:** R2-Q1 (loop ≠ agent). Which is evaluator-optimizer (workflow) and which is an agent? A: generate a SQL query → a validator checks it against the schema → revise until valid, same fixed loop. B: given \"make this dashboard load faster,\" the model profiles, decides what to optimize, tries a change, measures, then decides the next thing to try, until it is fast enough.\n\n**Nick (correct):** A evaluator-optimizer, B agent.\n\n**Tutor:** Correct. A is a fixed generate↔validate loop (workflow); B is the model choosing its own varying next actions (agent).\n\n**Tutor:** R2-Q2 (lowest rung). Translate 100,000 product titles EN→KO, each independent. A teammate proposes a single agent per title. Lowest rung, and why is an agent too high?\n\n**Nick (correct):** An augmented LLM is enough.\n\n**Tutor:** Correct — one call per title; there is nothing to loop on, so an agent is over-engineering.\n\n**Tutor:** R2-Q3 (independent verification). An agent generates a financial report and writes \"confidence: 95%\" at the bottom. A teammate says \"great, it is confident.\" What is wrong, and what makes verification trustworthy?\n\n**Nick:** Without multiple-choice options I am not sure — the terms do not stick.\n\n**Tutor:** No memorization — anchor it to your bench. Would you accept a DUT that reports its own \"pass, 95% confident\"? If not, what do you demand instead?\n\n**Nick:** The verification method, the check items, and a detailed result report (a checklist).\n\n**Tutor:** That is the evidence/traceability half — correct (the structured return from S4). The other half: who WROTE that report? If the DUT wrote it, however detailed, it is still grading itself. That is why your bench has an independent scoreboard / golden reference the DUT cannot touch. Vocabulary: a self-report is not proof (an agent can be confidently wrong); trustworthy verification is INDEPENDENT — outside the agent, on a criterion it cannot edit (programmatic reconciliation, a separate evaluator, citations). Anchor: \"an independent scoreboard, not the DUT’s word\" = \"independent verification, not the agent’s self-confidence.\" All three weak spots cleared → D1 first pass complete."
  },
  {
   "id": "t-d1-s7",
   "dom": "D1",
   "ses": "S7 R1",
   "date": "2026-07-19",
   "title": "D1 Mini-Mock Round 1 (interactive)",
   "note": "Self-test across S1–S6. Each turn: the question, Nick’s answer, and the model answer.",
   "body": "**Tutor:** Q1. A system drafts a product description, a separate model scores it against a style rubric, it revises on that feedback, and repeats until the score passes. Which of the 5 workflow patterns?\n\n**Nick (wrong):** agent\n\n**Tutor:** Evaluator-optimizer (a workflow). Generator + a separate evaluator scoring against fixed criteria + revise-on-feedback loop, until it passes. Not an agent: the loop, critic, and stop are pre-authored. A feedback loop alone is not agency.\n\n**Tutor:** Q2. A contract assistant reads each contract and, based on what it finds, decides at runtime which clause-types are present, spins a worker per clause-type, and assembles one summary. Routing or orchestrator?\n\n**Nick (correct):** orchestrator workers, distribution and summary\n\n**Tutor:** Correct — orchestrator-workers. Subtask set decided at runtime, delegated, aggregated. Runtime decomposition + merge is what separates it from routing.\n\n**Tutor:** Q3. Rename one API symbol across 40 files, keeping every call site consistent. Multi-agent or single?\n\n**Nick (correct):** single, to keep consistency easily\n\n**Tutor:** Correct — single agent. The edits are coupled (shared, evolving state); isolated subagents would drift. Not independent → no multi-agent gain, coordination cost dominates.\n\n**Tutor:** Q4. An agent keeps making a failing test pass by loosening the assertion instead of fixing the bug, then declares \"done.\" Which failure axis, and which control?\n\n**Nick:** Accurate test/verification criteria matter — you need clear conditions and a checklist.\n\n**Tutor:** Right instinct — here is the vocabulary. Correctness axis: a work-around + a confidently-wrong \"done\"; the agent is gaming its own success check. Control = INDEPENDENT, tamper-proof verification: \"done\" must be a criterion the agent cannot weaken, plus a guardrail forbidding it from editing the tests/oracle.\n\n**Tutor:** Q5. Summarize a single 20-page PDF into 5 bullets. A teammate proposes a multi-agent system with 5 subagents. Right rung? What is wrong?\n\n**Nick:** single agent is better\n\n**Tutor:** Right direction, but stop one rung lower: an augmented LLM — a single call, no loop. A single agent is already too high (an agent is a loop; nothing to loop on). The 5-subagent proposal is severe over-engineering. Score: 3/5 — re-drill Q1 (loop ≠ agent), Q5 (lowest rung), Q4 (independent verification) in Round 2."
  },
  {
   "id": "t-d2-s1",
   "dom": "D2",
   "ses": "S1",
   "date": "2026-07-19",
   "title": "A Tool Is Not an API (interactive)",
   "note": "English translation of the original Korean session. First D2 session.",
   "body": "**Tutor:** You have designed register interfaces and bus protocols for 20 years, assuming the reader (an engineer or RTL) reads the whole datasheet and follows it exactly. An agent does not work that way. Scenario: a tool list_users() returns all 50,000 users as one JSON blob. A human calling GET /users is fine (they paginate). What goes wrong when an AGENT calls list_users(), and why is what is fine for a human API a problem for an agent tool? (hint: where do those 50,000 land — recall D1-S4.)\n\n**Nick:** The information is stored in the agent’s context. So a tool is needed, right?\n\n**Tutor:** You have the key — the 50,000 land in the agent’s context window. Finish it: (a) what is special about that window (D1-S4), so what breaks when 50,000 pour in? (b) what should the tool return instead of the full list?\n\n**Nick (wrong):** Context memory. It has a limited capacity. [b] An interface that can provide information like an API.\n\n**Tutor:** (a) correct — the context window is a finite-capacity memory, so 50,000 rows overflow it, pollute attention, and waste tokens (exactly D1-S4). (b) needs a subtle flip: \"provide everything like an API\" is the trap. A human API can return everything because the human paginates/filters on their end; an agent cannot scroll, so whatever the tool returns lands directly in the finite window. The fix is to move the filtering INTO the tool and return only high-signal results: list_users() (50,000) becomes search_users(role=\"admin\", active=true) (12). Crystal: a tool is a contract with a limited-context, non-deterministic agent — return only what is needed, high-signal. HW lens: not dumping the whole waveform, but a probe that triggers/filters to the signals of interest.\n\n**Tutor:** APPLY: to find a user’s unpaid invoices, get_all_invoices() (10,000) or search_invoices(status=\"unpaid\", since=...)? And, in your own words, the litmus you kept skipping: \"… = workflow / … = agent.\"\n\n**Nick (correct):** Workflow = code the path/steps before running. Agent = the model decides the next step from feedback. Because of the context limit, get_all_invoices is out; you must use search_invoices.\n\n**Tutor:** Both correct — litmus reproduced (weak spot improving, keep drilling), and the APPLY nails the D2-S1 core: respect the finite context, so search_X over list_X. Next (S2): an agent picks which tool to call from the name and description alone — so description quality = call accuracy."
  },
  {
   "id": "t-d1-s2",
   "dom": "D1",
   "ses": "S2",
   "date": "2026-07-18",
   "title": "The 5 Workflow Patterns (interactive)",
   "note": "English translation of the original Korean session. Raw turns — including a wrong answer and its correction, which is where it clicked.",
   "body": "**Tutor:** I gave the meaning of the 5 patterns, then asked you to classify 3 situations. ① Extract key clauses from a contract → write a summary from them → verify the summary against the original. ② Sort an incoming email into {refund / bug / sales} and send each to a dedicated handler. ③ A refactor where the model decides at runtime which files to change → edits each → reassembles.\n\n**Nick:** 1 - prompt chaining, 2 - routing, 3 - orchestrator-workers.\n\n**Tutor:** All three correct. ②↔③ is the most-confused pair on the exam. In your own words, what is the single biggest difference between them? (Hint: who decides the branches, and when?)\n\n**Nick:** ③ is the one that grasps the work, autonomously decides the execution process, carries it out, and then aggregates the results. ② only grasps the work and hands tasks to specialist workers.\n\n**Tutor:** You nailed ③’s autonomy and aggregation. Sharpening: the essence is WHEN the branches are decided. Routing = pick from a predetermined set of bins (classify only, no aggregation). Orchestrator = build the bins at runtime and aggregate. Small correction: routing is not \"hand tasks to workers\" — it sends one input down one fixed lane; \"divide among workers and aggregate\" is actually the orchestrator. And the orchestrator is the closest of the five to an agent. Check: a travel assistant decides per request which steps are needed (flights + hotel + visa, or just a train), handles each, and aggregates. Routing or orchestrator?\n\n**Nick (wrong):** Routing. It discriminates the case and splits into \"check several things\" or \"a simple single check\".\n\n**Tutor:** This is actually orchestrator — and why it is not routing is the whole lesson. The tells: \"decides the needed steps on the fly\" + \"aggregates\". If it were routing, the branches would be fixed in advance ({flights / hotel / refund}), each request goes down exactly one, with no composition or aggregation. Here the combination is not a fixed menu — the model assembles it at runtime → orchestrator. Rule: routing = pick from a fixed set of bins; orchestrator = build the bins on the fly. Re-check: \"a travel-agency chatbot classifies a query into {flights / hotel / refund} and sends it to one dedicated consultant.\" Which is it?\n\n**Nick (correct):** That is routing.\n\n**Tutor:** Correct — fixed 3 branches, classify, no aggregation. Notice: same topic (travel), different pattern. The pattern is set by the structure, not the topic. Two left — parallelization (A: run grammar / fact / tone checks at once and merge; B: ask the same question 5 times and take the majority) and evaluator-optimizer (a copy bot writes, another model scores it, it revises, repeat).\n\n**Nick:** a - parallelization, b - evaluator-optimizer.\n\n**Tutor:** Both right. Parallelization has two flavors — sectioning (independent tasks at once, then merge; for speed) and voting (same task N times, majority; for confidence). Easily confused: voting (independent parallel repeats, no critic, no improvement) vs evaluator-optimizer (generate → critique → revise loop). All 5 patterns done solo."
  },
  {
   "id": "t-d1-s3",
   "dom": "D1",
   "ses": "S3",
   "date": "2026-07-18",
   "title": "Orchestrator vs Routing, and the Agent Boundary (interactive)",
   "note": "English translation of the original Korean session. Raw turns — including a vague answer that got sharpened, which is where it clicked.",
   "body": "**Tutor:** System A: a support bot classifies every message into {billing, technical, account} and sends it to a prebuilt handler; the 3 categories are hardcoded. System B: a coding assistant asked \"add OAuth login\" inspects the codebase, decides on the spot which 4 files to change, delegates each to a worker, and integrates. For each — routing or orchestrator-workers? And the single deciding property in one sentence?\n\n**Nick:** A routing, B orchestrator-workers.\n\n**Tutor:** Both labels correct — but you gave only the labels. The point is WHY. A ladder: before any request arrives, can you write down System A’s full list of possible destinations? Can you write down System B’s full list of subtasks? Yes/no each, then the difference in one sentence.\n\n**Nick:** A yes, B no. Routing = there are predefined branches and you take the input and clarify which one it connects to. Orchestrator-workers = you hold several capabilities and, depending on the input, strategically decide which capability to use and how.\n\n**Tutor:** The deciding property IS that yes/no. Routing sentence is right. One sharpening: \"decide which capability to use\" also describes routing (routing also picks one capability), so that phrasing does not separate them. The real split is two tells — routing = pick ONE from an enumerable set of bins (no aggregation); orchestrator = assemble the subtask SET at runtime, then MERGE. So the line is not \"which does it pick\" but \"can you enumerate the list up front + is there a merge\". Trap: a ticket is classified into {billing, technical, account}; if technical, a second classifier picks one of {network, hardware, software, account-security}; it goes to exactly one specialist; nothing is combined. Routing or orchestrator?\n\n**Nick:** Your question is routing. And I see that the core of orchestrator-workers is re-assembling / re-composing the subtasks, and I need to express that clearly.\n\n**Tutor:** Correct — even nested, every destination is enumerable, exactly one arrives, no merge = routing. Trap avoided. Now Step 2, the apparent paradox: an orchestrator \"decides at runtime\" too, yet we still call it a workflow. Compare two versions of System B. ① Orchestrator: decompose once (4 files) → workers → merge → done. ② Something else: edit auth.js → run tests → see a failure → open config.js (not in the plan) → fix → re-test → repeat until it decides it is done and stops. What does ② have that ① does not — in one sentence?\n\n**Nick (wrong):** In ② the skeleton is not fixed and it builds the method of solving the mission as it goes?\n\n**Tutor:** Right direction, but a trap: an orchestrator ALSO \"builds the method\" (it assembles the subtask list), so that phrase does not separate ① and ②. Narrow it to one thing: the feedback loop. ② observes the result of its own action (a test failure), decides the next action from that result, and decides when to stop. ① has no such loop (one pass). Two markers: (1) environment feedback drives the next step, (2) the model decides trajectory length and stop condition. Conclusion: orchestrator = dynamic content / fixed one-pass control flow · agent = the control flow itself is dynamic (feedback loop + self-stop). HW lens: ① = directed regression dispatched once; ② = constrained-random + coverage-closure (observe → next stimulus → loop). APPLY: a pipeline decides per document which fields exist (varies), extracts each with a sub-call, assembles JSON, once, no re-check. Orchestrator or agent, and by which marker?\n\n**Nick (correct):** Orchestrator, because there is no feedback loop.\n\n**Tutor:** Perfect — you cut through the trap (\"decides at runtime\" tempts you toward agent) with the marker. It is only dynamic content; with no feedback loop it stays a workflow. D1 orchestration slice → confidence 4. Next: D1-S4, multi-agent systems (coordinator ↔ subagents, context isolation)."
  },
  {
   "id": "t-d1-s1",
   "dom": "D1",
   "ses": "S1",
   "date": "2026-07-13",
   "title": "Workflow vs Agent (interactive)",
   "note": "English translation of the original session. Raw turns.",
   "body": "**Tutor:** Your verification testbench — a fixed stimulus sequence checked by a scoreboard — is that closer to a workflow or an agent? And by what criterion do you split them?\n\n**Nick:** The basic fixed sequence is a workflow; workflow tuning and the automatic expansion/execution of each case is an agent.\n\n**Tutor:** Essentially right — directed test = workflow; coverage-driven auto-expansion = agent-like. The litmus: before running, can you predict/hardcode the path and the step count? Predictable = workflow. The model decides the next step at runtime on feedback = agent. One tweak: executing a fixed sequence is still a workflow — what makes it an agent is the model holding the decision of what to do next. And agency costs more and compounds errors.\n\n**Tutor:** APPLY. A: ticket → detect language → classify → reply from a fixed template. B: ticket → keep searching docs, checking the account, asking follow-ups until it is resolved. Which is which?\n\n**Nick:** A workflow, B agent.\n\n**Tutor:** Both correct. A is fixed steps known up front (workflow); B is open-ended with an unpredictable number of steps that the model drives on feedback (agent)."
  }
 ],
 "notes": [
  {
   "id": "notes/D1",
   "dom": "D1",
   "title": "Agentic Architecture & Orchestration",
   "weight": 27,
   "ts": 7,
   "order": 1,
   "body": "> The agentic loop is the backbone the other domains hang on. The biggest domain.\n\nDistinguishing structured workflows from autonomous agents, and designing the agentic loop (gather context → act → verify → repeat) and multi-agent orchestration to fit the situation.\n\n## Key concepts\n\n**Augmented LLM (building block)** — An LLM enhanced with retrieval, tools, and memory. It generates its own search queries, selects tools, and decides what to retain. Clear, documented interfaces are key.\n\n**Workflow vs Agent** — Workflow = orchestration through predefined code paths. Agent = the model dynamically directs its own process and tool use at runtime. Predictable step count → workflow; open-ended → agent.\n\n**Agentic loop** — gather context → take action → verify work → repeat. The verification feedback lets the system self-correct before errors compound.\n\n**5 workflow patterns** — prompt chaining (sequential + gates) · routing (classify → specialized path) · parallelization (sectioning for speed / voting for confidence) · orchestrator-workers (a central LLM decomposes, delegates, synthesizes) · evaluator-optimizer (generate ↔ feedback loop).\n\n**Multi-agent (orchestrator–worker)** — Subagents isolate the context window, explore in parallel, and return only a distilled summary (1–2k tokens). Gains = isolation + parallelism; costs = more tokens, coordination complexity, compounding error.\n\n**Verification (3 forms)** — rule-based (a linter is the most robust) · visual feedback (screenshots) · LLM-as-judge (fuzzy criteria, less robust but useful).\n\n**Agentic search vs RAG** — Agentic = grep/bash to search on the spot (accurate, transparent, easy to maintain). Semantic/RAG = pre-computed embeddings (fast but less accurate). Prefer agentic; use RAG when it falls short.\n\n**3 principles** — Simplicity (add complexity only when needed) · Transparency (show the plan) · ACI, the agent-computer interface (tool docs, examples, edge cases; \"poka-yoke\" tools to prevent mistakes).\n\n## Easily confused\n\n- **Workflow** vs **Agent** — Both are agentic systems, but control lives in different places — fixed code vs the model deciding at runtime.\n- **Orchestrator-workers** vs **Parallelization (sectioning)** — Orchestrator decides subtasks dynamically at runtime; sectioning is fixed, independent pieces decided in advance.\n- **Routing** vs **Orchestrator** — Routing classifies then follows one fixed path; orchestrator decomposes + delegates to many + synthesizes.\n- **Agentic search** vs **Semantic search (RAG)** — Search on the spot (accurate) vs pre-embedded (fast, less accurate). Default to agentic.\n\n## Judgment points\n\n- Is the step count predictable? → workflow (chaining/routing) vs autonomous agent.\n- Routing vs orchestrator? Can you enumerate the whole task list up front, and is there a merge? Enumerable + no merge = routing; built at runtime + aggregated = orchestrator.\n- Orchestrator vs agent? Only a feedback loop (the model decides the next step + when to stop) makes it an agent — \"runtime-dynamic\" alone does not.\n- Which rung of the ladder? augmented LLM → workflow → single agent → multi-agent. Pick the lowest that works; each climb adds real cost (an agent is a loop = N calls/item, nondeterminism, control burden).\n- Which reliability control for which failure? terminate → stop condition; correct → INDEPENDENT verification; on-goal → re-anchor the goal in durable state; cost → budget cap; bounds → guardrails.\n- Where does the human go? A milestone gate between phases (efficiency) + a mandatory gate right before any irreversible / high-stakes action (safety) — not at every step.\n\n## Common traps\n\n- \"Multi-agent is always better\" — no. Simplicity first; add complexity only when it earns its keep.\n- Making everything an autonomous agent — predictable tasks are safer and cheaper as a workflow.\n- Reaching for RAG first by default — agentic search is often more accurate and easier to maintain.\n- \"More tools = more power\" — too many or overlapping tools distract the agent.\n\n## Worked scenario\n\n**Situation.** Multi-agent research — survey and synthesize a broad topic from many sources.\n\n**Question.** Feed all raw sources into the orchestrator, or have subagents return only summaries?\n\n**Answer.** Subagents explore in isolated context and return only 1–2k summaries to the orchestrator.\n\n**Why.** Avoids context rot, enables parallelism, saves tokens; the orchestrator focuses on synthesis.\n\n## Self-check\n\n- **Q.** The core distinction between workflow and agent?\n  - **A.** Whether the path is fixed in code (workflow) or decided by the model at runtime (agent).\n- **Q.** When do you use orchestrator-workers?\n  - **A.** When subtask composition depends on the input and cannot be predefined.\n- **Q.** The most robust form of verification?\n  - **A.** Clearly defined rules (e.g., a linter). LLM-as-judge is less robust.\n- **Q.** Two main benefits of a subagent?\n  - **A.** Context isolation + parallelism (it returns only a summary).\n\n## What to study\n\n- Anatomy of the agentic loop: gather context → act → verify → repeat.\n- Deciding workflow vs agent.\n- 5 workflow patterns + orchestrator–worker tradeoffs.\n- Hooks / interception for deterministic control.\n- Session & state, resume, checkpoints.\n- Task decomposition, stop conditions, avoiding runaway loops.\n\n## Hands-on practice\n\n- Build a minimal agent loop with the Messages API tool-use (1 tool + a stop condition).\n- Sketch an orchestrator + 2 subagents research pipeline → multi-agent-research-system.\n- Design the same task both as a workflow and as an agent → tradeoff table.\n- Write one Claude Code hook (PostToolUse logging/blocking) to feel the intervention point.\n\n## HW lens\n\nagentic loop ↔ HW verification loop (stimulus → response → scoreboard → repeat). multi-agent ↔ coordinating pipeline IP blocks / handshakes. stop conditions = deadlock/livelock prevention.\n\n## Resources\n\n- Course · [Introduction to Subagents](https://anthropic.skilljar.com)\n- Course · [Building Applications with the Claude API](https://anthropic.skilljar.com) — agent workflows\n- Docs · [Building Effective AI Agents](https://www.anthropic.com/research/building-effective-agents) — the workflow/agent patterns source\n- Docs · [Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk)\n- Docs · [docs — Agent SDK · Tool use](https://docs.claude.com)\n- Free · [WikiDocs prep book · Domain 1](https://wikidocs.net/book/19518)\n- Free · [GitHub guide (multi-language)](https://github.com/paullarionov/claude-certified-architect)"
  },
  {
   "id": "notes/D3",
   "dom": "D3",
   "title": "Claude Code Config & Workflows",
   "weight": 20,
   "ts": 6,
   "order": 2,
   "body": "> A practical strength — the work is formalizing that experience into exam-shaped judgment.\n\nConfiguring and operating Claude Code across dev workflows and CI using CLAUDE.md, commands, skills, hooks, permissions, and headless mode.\n\n## Key concepts\n\n**CLAUDE.md hierarchy** — Priority enterprise › project › user. Auto-loaded memory, @import, walk-up discovery. Pre-loaded context combined with just-in-time retrieval (grep/glob).\n\n**Custom commands & Skills** — Slash commands and Agent Skills. A skill is a folder Claude discovers and loads on demand. SKILL.md = YAML frontmatter (name·description) + body.\n\n**Progressive disclosure (3 levels)** — L1: name·description metadata pre-loaded into the system prompt → L2: full SKILL.md loaded when relevant → L3: referenced files only when needed. Bundled context is effectively unbounded.\n\n**Skill vs MCP vs slash command** — Skill = a capsule of procedural knowledge/workflow (on demand). MCP = a connection to external tools/data. Slash command = a user-triggered prompt. Skills and MCP are complementary.\n\n**Plan mode & permissions** — Separating planning from execution for safety. settings.json allow/deny rules and permission modes govern tool use.\n\n**Hooks** — Lifecycle intervention points (PreToolUse/PostToolUse, etc.) give deterministic control — logging, blocking, injection — enforced by code, not model judgment.\n\n**Headless / CI** — claude -p for one-shot/batch, non-interactive runs. Integrate into pipelines (e.g., PR review in GitHub Actions), parse the output.\n\n**Agent SDK relation** — The harness that powers Claude Code (formerly Claude Code SDK) can power other agents too. It provides context management (compaction, subagent isolation).\n\n## Easily confused\n\n- **Skill** vs **MCP** — A knowledge/procedure capsule (loaded on demand) vs a connection to external systems. Complementary, not competing.\n- **Skill** vs **Slash command** — The model auto-triggers a skill (by name/description) vs the user explicitly invokes a command.\n- **CLAUDE.md project/user/enterprise** vs **** — Different scope and priority (enterprise is highest).\n- **PreToolUse hook** vs **PostToolUse hook** — Validate/block before a tool runs vs log/post-process after it runs.\n\n## Judgment points\n\n- Where does recurring knowledge go — skill vs command vs CLAUDE.md?\n- Running headless in CI: how do you control permissions and output?\n- What do you enforce deterministically with a hook?\n- How do you structure a skill so progressive disclosure saves context?\n\n## Common traps\n\n- Cramming everything into CLAUDE.md — wastes context. Use a skill's progressive disclosure.\n- Treating skills and MCP as competitors — they are complementary.\n- Granting full permissions in CI — risky. Use an allowlist and plan mode.\n- Assuming the user must invoke a skill manually every time — the model auto-triggers it.\n\n## Worked scenario\n\n**Situation.** CI/CD — you want an automated code review on every PR.\n\n**Question.** Keep an interactive session open, or run headless claude -p in Actions?\n\n**Answer.** Headless claude -p + a permission allowlist + non-interactive run.\n\n**Why.** A pipeline needs to be non-interactive, reproducible, and least-privilege. Interactive sessions do not fit CI.\n\n## Self-check\n\n- **Q.** The 3 levels of progressive disclosure?\n  - **A.** name/description metadata → the SKILL.md body → referenced files.\n- **Q.** Trigger difference: skill vs slash command?\n  - **A.** Model auto-triggers vs user explicitly invokes.\n- **Q.** CLAUDE.md priority order?\n  - **A.** enterprise › project › user.\n- **Q.** Purpose of a PreToolUse hook?\n  - **A.** Validate/block before a tool runs (deterministic control).\n\n## What to study\n\n- CLAUDE.md hierarchy, memory, @import, walk-up.\n- Custom commands & Skills (SKILL.md), when to encapsulate as which.\n- Plan mode, settings.json allow/deny, hooks.\n- Headless claude -p batch & CI integration.\n- Subagents (Task) delegation, connecting MCP servers.\n- Iterative refinement, batch processing.\n\n## Hands-on practice\n\n- Author real /ccar-* custom commands in the workspace.\n- Configure a settings.json permission allowlist + one hook, and verify behavior.\n- Headless batch: summarize/transform a set of files with claude -p.\n- Run headless PR review in GitHub Actions → claude-code-for-CI.\n\n## HW lens\n\nAlready running local skills and a CLAUDE.md hierarchy in practice. The win is translating \"why I built it this way\" into the exam's answer language.\n\n## Resources\n\n- Course · [Introduction to Agent Skills](https://anthropic.skilljar.com)\n- Course · [Academy — Claude Code training](https://anthropic.skilljar.com) — check the catalog\n- Docs · [docs — Claude Code](https://docs.claude.com) — CLAUDE.md · hooks · headless · settings\n- Docs · [Agent Skills (engineering)](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)\n- Free · [WikiDocs prep book · Domain 3](https://wikidocs.net/book/19518)\n- Free · [daronyondem exam guide](https://github.com/daronyondem/claude-architect-exam-guide)"
  },
  {
   "id": "notes/D4",
   "dom": "D4",
   "title": "Prompt Engineering & Structured Output",
   "weight": 20,
   "ts": 6,
   "order": 3,
   "body": "> Getting a reliable output contract in production. The backbone of extraction/automation scenarios.\n\nPrompting techniques and enforced structured output (JSON/schema) that produce reliable, verifiable results in production.\n\n## Key concepts\n\n**Technique order (recommended)** — ① be clear & direct ② multishot examples ③ let Claude think (CoT) ④ XML tags for structure ⑤ a role (system prompt) ⑥ prefill the response ⑦ chain complex prompts. Start simple; verify with evals.\n\n**Success criteria & evals first** — Set success criteria and empirical tests before prompt engineering. Latency/cost are sometimes solved by picking a different model, not by prompting.\n\n**Structured output (JSON)** — Forcing tool use / tool_choice is the most robust (guarantees the schema). Supporting moves: prefill (start with `{`), wrap in XML tags, stop sequences.\n\n**Example curation** — Prefer diverse, canonical representative examples over an exhaustive list of edge cases. Examples are a \"picture worth a thousand words\" for an LLM.\n\n**System prompt altitude** — A goldilocks zone between too specific (fragile) and too vague (weak signal). Structure it into sections (background, instructions, tools, output) with XML/Markdown.\n\n**CoT / thinking** — Giving room to reason raises accuracy on complex tasks — at a token/latency cost.\n\n**Verify & recover** — Catch format drift and hallucination with schema validation and retry. Enforce the output contract in code.\n\n## Easily confused\n\n- **prefill** vs **stop sequence** — Force the start of the response vs force where it ends.\n- **forced tool use** vs **natural-language JSON request** — Guarantees the schema vs allows format drift. If 100% needed, force it.\n- **XML tags** vs **Markdown** — Both delineate structure; tags are clearer for parsing and boundaries.\n- **CoT** vs **direct answer** — Expose reasoning for higher accuracy (higher cost) vs faster.\n\n## Judgment points\n\n- JSON must be 100% valid → force tool_choice vs prefill+XML?\n- Format drifts often → which technique do you add?\n- How many examples, and of what kind?\n- Latency/cost problem → improve the prompt vs switch the model?\n\n## Common traps\n\n- Just saying \"answer in JSON\" without forcing it — format drift.\n- Trying to fix latency with prompting — it may be a model/architecture issue.\n- Piling on only edge-case examples — representative examples work better.\n- An over-specific system prompt — fragile and costly to maintain.\n\n## Worked scenario\n\n**Situation.** Structured data extraction — turn a document into validated JSON.\n\n**Question.** Instruct \"answer in JSON\", or force it with a tool schema?\n\n**Answer.** Force the schema with tool use / tool_choice and add schema validation.\n\n**Why.** Natural-language instruction risks format drift; forcing + validation guarantees the output contract.\n\n## Self-check\n\n- **Q.** Most robust way to force JSON?\n  - **A.** Forced tool use + tool_choice.\n- **Q.** What does prefill do?\n  - **A.** Pins the start of the response (removes preamble, steers format).\n- **Q.** What is needed before prompt engineering?\n  - **A.** Success criteria + empirical evals.\n- **Q.** What is system prompt altitude?\n  - **A.** The goldilocks point between too specific and too vague.\n\n## What to study\n\n- Prompting principles: clear & direct, role, multishot, CoT, XML, prefill.\n- Structured output: force format with tool-use / JSON schema.\n- Verify & recover: schema validation, failure modes.\n- Eval loop: A/B prompt versions against an eval set.\n- Token/cost sense (the payoff of examples/CoT).\n\n## Hands-on practice\n\n- Do the same extraction (a) natural-language vs (b) forced tool schema, compare stability.\n- Pin the output format with prefill + XML and test.\n- Build a document → validated JSON pipeline → structured-data-extraction.\n- Score two prompt versions with a small eval set.\n\n## HW lens\n\nStructured output = defining an interface protocol. Schema = the port contract, validation = assertions, format drift = a protocol violation.\n\n## Resources\n\n- Course · [Building Applications with the Claude API](https://anthropic.skilljar.com) — prompting · structured output\n- Docs · [docs — Prompt engineering](https://docs.claude.com) — techniques · structured/JSON output\n- Docs · [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) — working examples\n- Free · [WikiDocs prep book · Domain 4](https://wikidocs.net/book/19518)\n- Free · [GitHub guide (multi-language)](https://github.com/paullarionov/claude-certified-architect)"
  },
  {
   "id": "notes/D2",
   "dom": "D2",
   "title": "Tool Design & MCP Integration",
   "weight": 18,
   "ts": 5,
   "order": 4,
   "body": "> How you give Claude capabilities. Tool description quality is call accuracy.\n\nDesigning tools a non-deterministic agent can use safely and efficiently, and integrating external capabilities via MCP in a standard way.\n\n## Key concepts\n\n**A tool is not an API wrapper** — It is a contract between a deterministic system and a non-deterministic agent. The agent perceives possible actions with limited context → it needs search/filter tools, not full lists.\n\n**Good names & descriptions** — Unambiguous parameter names (user_id, not user). Make implicit context explicit (\"describe it to a new hire\"). Namespace by service (asana_search). Small description tweaks yield big gains.\n\n**Tool consolidation** — Fold several low-level operations into one high-level tool (schedule_event = find availability + book; get_customer_context). Move agentic computation into the tool.\n\n**High-signal, token-efficient responses** — Meaningful identifiers (name, image_url) over uuid/mime_type. Pagination, filtering, truncation; a response_format enum (concise/detailed). Claude Code defaults to a 25k-token cap.\n\n**Structured errors** — Not an opaque code — offer specific, actionable improvements so the agent self-recovers and moves to a token-efficient strategy.\n\n**MCP architecture** — host · client · server. Primitives = tools (actions) / resources (data to read) / prompts (user templates). Handles auth & API calls as a standard.\n\n**Transport & security** — stdio (local process) vs SSE/HTTP (remote, multi-user). Tool annotations disclose destructive or open-world access. Watch permissions, trust boundaries, prompt injection.\n\n**Restraint on tool count** — \"More is not better.\" A few thoughtful tools aimed at high-impact workflows. Too many or overlapping tools derail efficient strategies.\n\n## Easily confused\n\n- **tool** vs **resource / prompt** — MCP primitives — an action the model calls vs data to read vs a user-triggered template.\n- **stdio** vs **SSE / HTTP** — Local-process transport vs remote/network transport.\n- **list_X** vs **search_X** — Return everything (wastes context) vs filtered, high-signal (agent-friendly).\n- **API endpoint** vs **agent tool** — A deterministic↔deterministic contract vs a deterministic↔non-deterministic contract.\n\n## Judgment points\n\n- Local server → stdio; remote/multi-user → SSE/HTTP?\n- How do you shape an error so the agent self-recovers?\n- Consolidate or split a tool (clear, distinct purpose)?\n- Return meaningful identifiers (uuid → name)?\n- Add more tools vs prune (too many derail the agent)?\n\n## Common traps\n\n- Wrapping an existing REST API directly as a tool — ignores agent affordances.\n- Adding as many tools as possible — too many/overlapping hurts performance.\n- Returning raw uuids — reduces precision.\n- Opaque error codes — no self-recovery.\n\n## Worked scenario\n\n**Situation.** Structured extraction / CI — find a specific event in a large log.\n\n**Question.** read_logs (return everything) or search_logs as the tool?\n\n**Answer.** search_logs — return only filtered, high-signal results.\n\n**Why.** Returning everything explodes context and wastes tokens; the agent perceives with limited context.\n\n## Self-check\n\n- **Q.** The fundamental difference between a tool and a traditional API?\n  - **A.** A deterministic↔non-deterministic-agent contract; you must respect limited context.\n- **Q.** stdio vs SSE selection criterion?\n  - **A.** Local vs remote/network (multi-user).\n- **Q.** What is a good error response?\n  - **A.** Specific, actionable improvements (enables self-recovery).\n- **Q.** The 3 MCP primitives?\n  - **A.** tools · resources · prompts.\n\n## What to study\n\n- Tool description best practices (when/how, parameter & return contracts).\n- Structured errors for self-recovery.\n- MCP host·client·server, primitives.\n- Transport: stdio vs SSE/HTTP selection.\n- Security boundaries · prompt injection.\n- Claude built-in tools.\n\n## Hands-on practice\n\n- Write a minimal MCP server (1–2 tools, stdio) → connect & call from Claude Code.\n- Refactor a bad description into a good one, observe call accuracy.\n- Turn an error into a structured response to induce self-recovery.\n- Map a schema onto the structured-extraction / CI-CD scenarios.\n\n## HW lens\n\nA tool schema = the port/protocol contract of a HW block. A vague description = poor interface docs → mis-calls. MCP transport = choosing the bus protocol.\n\n## Resources\n\n- Course · [Introduction to MCP](https://anthropic.skilljar.com)\n- Course · [MCP: Advanced Topics](https://anthropic.skilljar.com)\n- Docs · [Writing effective tools for AI agents](https://www.anthropic.com/engineering/writing-tools-for-agents)\n- Docs · [modelcontextprotocol.io](https://modelcontextprotocol.io) — official MCP spec\n- Docs · [docs — MCP · Tool use](https://docs.claude.com)\n- Free · [WikiDocs prep book · Domain 2](https://wikidocs.net/book/19518)\n- Free · [GitHub guide (multi-language)](https://github.com/paullarionov/claude-certified-architect)"
  },
  {
   "id": "notes/D5",
   "dom": "D5",
   "title": "Context Management & Reliability",
   "weight": 15,
   "ts": 6,
   "order": 5,
   "body": "> Keeping long interactions alive and production from dying. Smaller weight, but it seeps into every scenario.\n\nManaging finite context (compaction, external memory, isolation, just-in-time retrieval) and making long tasks and failures robust.\n\n## Key concepts\n\n**Context engineering vs prompt engineering** — The latter writes instructions for a single task. The former curates and maintains the entire token state (system, tools, data, history) across multi-turn interactions.\n\n**Context rot / finite resource** — As tokens grow, recall accuracy degrades (attention is an n² budget). Diminishing returns — every token spends the attention budget, so optimize signal-to-noise.\n\n**Compaction (summarization)** — Near the limit, summarize what matters (decisions, open bugs) and restart. First maximize recall, then improve precision by dropping redundant tool output.\n\n**Structured note-taking (external memory)** — Write notes outside the context window and retrieve later (Claude Code to-dos; tracking objectives across thousands of steps) — without keeping it all in-context.\n\n**Sub-agent isolation** — A dedicated subagent explores in a clean context and returns only a 1–2k summary to the coordinator. Separates detailed exploration from high-level synthesis.\n\n**Just-in-time retrieval** — Keep lightweight identifiers (paths, URLs, queries) and load at runtime. Metadata (folders, names, timestamps) is signal. Hybrid: some pre-loaded + exploration.\n\n**Prompt caching** — Cache repeated prefixes (system, tools, documents) to cut cost and latency. Manage cache breakpoints and TTL. (per docs)\n\n**Reliability** — Retries/backoff, timeouts, rate-limit handling, graceful degradation on partial failure, detection/logging/recovery of failures.\n\n## Easily confused\n\n- **context engineering** vs **prompt engineering** — Curating the whole token state (multi-turn) vs writing a single instruction.\n- **compaction** vs **truncation** — Summarize and preserve essentials vs simply cut (risking loss of key info).\n- **external memory** vs **in-context** — Store/retrieve outside the window vs keep it all inside (context rot).\n- **JIT retrieval** vs **pre-loading (RAG)** — Load at runtime (accurate, flexible) vs pre-embed (fast).\n\n## Judgment points\n\n- Long task → compaction vs external memory vs subagent?\n- What do you pre-load and what do you fetch just-in-time?\n- How do you handle retries/timeouts/degradation?\n- What do you cache and where is the breakpoint?\n\n## Common traps\n\n- Believing more context is better — context rot lowers accuracy.\n- \"Truncation is enough\" — loses essentials; compaction is better.\n- RAG is always the answer — agentic/JIT is often more accurate.\n- Re-sending a repeated prefix every time with no cache — wasted cost/latency.\n\n## Worked scenario\n\n**Situation.** Multi-agent research / long-horizon task — beyond thousands of steps.\n\n**Question.** Keep the whole history in context, or use external notes + compaction?\n\n**Answer.** External memory + compaction + subagent isolation.\n\n**Why.** Avoids context rot and preserves the attention budget; keep only essentials, offload the rest.\n\n## Self-check\n\n- **Q.** What is context rot?\n  - **A.** Recall/accuracy degrading as tokens grow.\n- **Q.** What is compaction?\n  - **A.** Summarizing essentials near the limit and restarting.\n- **Q.** Benefits of JIT retrieval?\n  - **A.** Saves context + metadata signal + mirrors human cognition.\n- **Q.** What benefit does a subagent give context?\n  - **A.** Isolated exploration returning only a summary (no pollution).\n\n## What to study\n\n- Context window budget · token counting.\n- Prompt caching (what · breakpoint · TTL · cost).\n- Long conversations: summarize · compact · context editing · external memory.\n- Reliability: retries/backoff, timeouts, rate limits, degradation.\n- Failure detection · logging · recovery (observability).\n\n## Hands-on practice\n\n- Measure tokens/cost/latency before vs after prompt caching.\n- Compact a long document with a summarization chain, compare QA accuracy.\n- Write a retry/timeout wrapper; simulate rate limits.\n- Design context-budget allocation in a multi-agent setup.\n\n## HW lens\n\nToken budget = bandwidth/buffer budget. Context management = pipeline backpressure & caching. Retries/degradation = fault tolerance & redundancy.\n\n## Resources\n\n- Course · [Building Applications with the Claude API](https://anthropic.skilljar.com) — production · reliability\n- Docs · [Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)\n- Docs · [Harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)\n- Docs · [docs — Context windows · Prompt caching](https://docs.claude.com)\n- Free · [WikiDocs prep book · Domain 5](https://wikidocs.net/book/19518)\n- Free · [GitHub guide (multi-language)](https://github.com/paullarionov/claude-certified-architect)"
  },
  {
   "id": "notes/resources",
   "title": "Resources & Study Loop",
   "body": "## The study loop\n\n**01 COURSE** — Big picture from the Academy course\n\n**02 DOCS** — Precision from docs.claude.com\n\n**03 FIELD** — Judgment (why/when) from engineering posts\n\n**04 BUILD** — Internalize by building it yourself\n\n**05 DRILL** — Exam feel & wrong-answer patterns from practice\n\n**06 DISTILL** — Distill into notes → this app\n\n## Library\n\n- **[Anthropic Academy](https://anthropic.skilljar.com)** *(Official · free)* — 13 self-paced courses. The core of the recommended CCA-F path.\n- **[Official certification page](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request)** *(Official)* — CCA-F eligibility, exam, guide. Partner Network (free) & seat booking.\n- **[docs.claude.com](https://docs.claude.com)** *(Official · precise)* — Primary source for every fact. Claude Code · Agent SDK · MCP · Prompt · Context.\n- **[Anthropic Engineering](https://www.anthropic.com/engineering)** *(Official · field)* — Building Effective Agents · Writing tools · Context engineering · Agent Skills.\n- **[CCA-F prep book (WikiDocs, Korean)](https://wikidocs.net/book/19518)** *(practice)* — Per-domain summary cards, key terms, judgment scenarios, practice questions, mini-mocks, hands-on labs, flashcards.\n- **[GitHub prep materials](https://github.com/paullarionov/claude-certified-architect)** *(Free · multi-lang)* — paullarionov (13-language guide, PDF, Anki) · daronyondem (exam guide).\n\n> The exam guide itself is the primary source and lives in the **Study** app.\n> Third-party material here is for cross-checking only — where it disagrees with the official guide, the guide wins."
  }
 ],
 "glossary": [
  {
   "term": "Workflow",
   "dom": "D1",
   "group": "Workflow vs Agent",
   "def": "An LLM system whose step path is written in code ahead of time — the path is predictable and hardcodable.",
   "anchor": "directed regression"
  },
  {
   "term": "Agent",
   "dom": "D1",
   "group": "Workflow vs Agent",
   "def": "An LLM system where the model decides its own next step at runtime from feedback — open-ended, unknown step count.",
   "anchor": "coverage-closure loop"
  },
  {
   "term": "Augmented LLM",
   "dom": "D1",
   "group": "Workflow vs Agent",
   "def": "One LLM call enhanced with tools, retrieval, and memory. The building block and the lowest rung of the ladder.",
   "anchor": null
  },
  {
   "term": "Complexity ladder",
   "dom": "D1",
   "group": "Workflow vs Agent",
   "def": "Augmented LLM → workflow → single agent → multi-agent. Pick the lowest rung that works; each climb adds cost.",
   "anchor": null
  },
  {
   "term": "Prompt chaining",
   "dom": "D1",
   "group": "The 5 workflow patterns",
   "def": "A workflow of fixed sequential steps; each call works on the previous output (optional gate/check between steps).",
   "anchor": "pipeline stages + assertions"
  },
  {
   "term": "Routing",
   "dom": "D1",
   "group": "The 5 workflow patterns",
   "def": "Classify the input, then send it down one of a FIXED set of predefined paths. No aggregation.",
   "anchor": "address decoder / demux"
  },
  {
   "term": "Parallelization",
   "dom": "D1",
   "group": "The 5 workflow patterns",
   "def": "Run calls at once: sectioning (independent parts → merge, for speed) or voting (same task N× → majority, for confidence).",
   "anchor": "parallel units / TMR voting"
  },
  {
   "term": "Orchestrator-workers",
   "dom": "D1",
   "group": "The 5 workflow patterns",
   "def": "A central model decides the subtasks AT RUNTIME, delegates them to workers, and aggregates the results.",
   "anchor": "dynamic dispatcher"
  },
  {
   "term": "Evaluator-optimizer",
   "dom": "D1",
   "group": "The 5 workflow patterns",
   "def": "A generator produces output, a SEPARATE evaluator scores it against criteria, and it revises on the feedback in a loop until it passes. Still a workflow.",
   "anchor": null
  },
  {
   "term": "Coordinator / subagent",
   "dom": "D1",
   "group": "Multi-agent",
   "def": "In a multi-agent system, the lead agent that delegates (coordinator) and the worker agents it spawns (subagents).",
   "anchor": null
  },
  {
   "term": "Context isolation",
   "dom": "D1",
   "group": "Multi-agent",
   "def": "Giving each subagent its OWN context window, so their work does not interfere and total usable context grows (~N×window). Cost: ~15× tokens, drift.",
   "anchor": "separate lanes, no shared-bus cross-talk"
  },
  {
   "term": "Stop condition",
   "dom": "D1",
   "group": "Reliability controls",
   "def": "An explicit rule that ends an agent loop: max iterations, a verifiable success criterion, or budget exhausted.",
   "anchor": "regression timeout"
  },
  {
   "term": "Independent verification",
   "dom": "D1",
   "group": "Reliability controls",
   "def": "Checking output with something OUTSIDE the agent (tests, a separate evaluator, citations) — never the agent grading itself.",
   "anchor": "independent scoreboard, not the DUT’s word"
  },
  {
   "term": "Goal re-anchoring",
   "dom": "D1",
   "group": "Reliability controls",
   "def": "Keep the objective in durable state and re-inject it each loop, so context-compaction does not lose it.",
   "anchor": null
  },
  {
   "term": "Guardrails",
   "dom": "D1",
   "group": "Reliability controls",
   "def": "Limits on the agent’s scope and permissions — what it may touch or do.",
   "anchor": "assertions / bounds"
  },
  {
   "term": "Human-in-the-loop (HITL)",
   "dom": "D1",
   "group": "Reliability controls",
   "def": "A human checkpoint. Two placements: at milestone boundaries (efficiency) and right before irreversible / high-stakes actions (safety).",
   "anchor": "sign-off before tape-out"
  },
  {
   "term": "Tool (agent tool)",
   "dom": "D2",
   "group": "Tools & MCP",
   "def": "A contract between a deterministic system and a limited-context, NON-deterministic agent — not an API wrapper.",
   "anchor": "block port/protocol contract"
  },
  {
   "term": "High-signal response",
   "dom": "D2",
   "group": "Tools & MCP",
   "def": "A tool return that gives only the relevant, filtered info (search_X, meaningful IDs, pagination) — not a full dump that floods the context.",
   "anchor": null
  },
  {
   "term": "Tool description quality",
   "dom": "D2",
   "group": "Tools & MCP",
   "def": "The name + description ARE the interface the agent reasons over. A good one says: when to use it + what each parameter means + what it returns. Description quality = call accuracy.",
   "anchor": null
  },
  {
   "term": "Tool consolidation",
   "dom": "D2",
   "group": "Tools & MCP",
   "def": "Fold several low-level operations into one high-level tool (schedule_meeting = find availability + book + invite). Fewer, high-impact tools; more is not better.",
   "anchor": "one high-level transaction vs many register pokes"
  },
  {
   "term": "Structured error",
   "dom": "D2",
   "group": "Tools & MCP",
   "def": "An error that states what went wrong + how to fix it + a cheap recovery path — so the agent self-recovers, instead of an opaque code.",
   "anchor": "assert with file/line/expected vs actual"
  },
  {
   "term": "MCP",
   "dom": "D2",
   "group": "MCP",
   "def": "A standard protocol that connects agents to external tools and data — turning M×N bespoke integrations into M+N. Write a server once; any MCP host can use it.",
   "anchor": "USB-C / standard bus for AI"
  },
  {
   "term": "Host (MCP)",
   "dom": "D2",
   "group": "MCP",
   "def": "The agent application the user runs (Claude Code, Claude Desktop, an IDE). It wants to use capabilities; the model lives here and consumes what clients expose.",
   "anchor": null
  },
  {
   "term": "Client (MCP)",
   "dom": "D2",
   "group": "MCP",
   "def": "The connector inside the host that maintains a 1:1 connection to one server. It is the wiring, NOT the agent — one client per connected server.",
   "anchor": null
  },
  {
   "term": "Server (MCP)",
   "dom": "D2",
   "group": "MCP",
   "def": "A lightweight program that exposes ONE capability via the standard (a GitHub server, a filesystem server, a DB server).",
   "anchor": null
  },
  {
   "term": "Resource (MCP primitive)",
   "dom": "D2",
   "group": "MCP",
   "def": "Passive data the host reads into context (files, docs, records) — read-only, app-controlled. Like a GET. NOT decided by read-only-ness but by control: the app loads it.",
   "anchor": null
  },
  {
   "term": "Prompt (MCP primitive)",
   "dom": "D2",
   "group": "MCP",
   "def": "A reusable template / workflow the USER invokes (e.g., a /code-review command) — user-controlled.",
   "anchor": null
  },
  {
   "term": "Primitive control test",
   "dom": "D2",
   "group": "MCP",
   "def": "Which of tool/resource/prompt? Ask who controls it: model → tool (an action), app → resource (data to read), user → prompt (a template). Read-only vs not is NOT the test.",
   "anchor": null
  },
  {
   "term": "Tool scoping",
   "dom": "D2",
   "group": "Tool selection & error contracts",
   "def": "Shrinking the *available* tool set, not just describing tools well: role-scoped sets, a few shared cross-cutting tools, and constrained tools replacing over-general ones. 18 tools select measurably worse than 4–5.",
   "anchor": null
  },
  {
   "term": "tool_choice: auto",
   "dom": "D2",
   "group": "Tool selection & error contracts",
   "def": "The model decides *whether* to use a tool at all; a text-only reply is allowed.",
   "anchor": "no constraint — \"decide for yourself\""
  },
  {
   "term": "tool_choice: any",
   "dom": "D2",
   "group": "Tool selection & error contracts",
   "def": "The model *must* call some tool (no text-only reply), but it chooses which one.",
   "anchor": "one constraint — \"any one of them, but one\""
  },
  {
   "term": "tool_choice: forced",
   "dom": "D2",
   "group": "Tool selection & error contracts",
   "def": "The model must call one *specific named* tool. Use when a step must always run first.",
   "anchor": "two constraints — \"this tool, no choice\""
  },
  {
   "term": "Error category",
   "dom": "D2",
   "group": "Tool selection & error contracts",
   "def": "transient / validation / business rule / permission. A uniform \"Operation failed\" erases the one decision that matters: can I retry?",
   "anchor": null
  },
  {
   "term": "Retryable flag",
   "dom": "D2",
   "group": "Tool selection & error contracts",
   "def": "Whether the agent may retry. transient = yes; validation = yes *after correcting the input*; business rule and permission = no.",
   "anchor": null
  },
  {
   "term": "Fabricated-value antipattern",
   "dom": "D2",
   "group": "Tool selection & error contracts",
   "def": "Filling a field with a default or guessed value to get past a validation error. It invents data that flows silently downstream — fix the input and retry instead.",
   "anchor": null
  },
  {
   "term": "Access failure ≠ empty result",
   "dom": "D2",
   "group": "Tool selection & error contracts",
   "def": "A tool that cannot reach its source must return an error, never `{\"results\": []}`. An empty success becomes a false negative promoted to fact, and nothing retries because it looked like success.",
   "anchor": null
  },
  {
   "term": "Project vs user config scope",
   "dom": "D2",
   "group": "MCP integration",
   "def": "Team-wide MCP servers go in the project-level config that ships with the repo (everyone who clones gets them); personal or experimental servers go in the user-level config, which is not version-controlled.",
   "anchor": null
  },
  {
   "term": "Environment-variable expansion",
   "dom": "D2",
   "group": "MCP integration",
   "def": "The config references a variable instead of the secret; each person's environment holds the real token. Committing a token leaks it to everyone with repo access and stays in git history.",
   "anchor": null
  },
  {
   "term": "Tool budget",
   "dom": "D2",
   "group": "MCP integration",
   "def": "Connecting a server makes all of its tools discoverable at once. Five servers × eight tools = forty live tools, far past the 4–5 sweet spot. Adding a server is not free.",
   "anchor": null
  },
  {
   "term": "Resources as a content catalog",
   "dom": "D2",
   "group": "MCP integration",
   "def": "Exposing issue summaries, document hierarchies, or DB schemas as resources lets the agent see what exists instead of probing with exploratory tool calls.",
   "anchor": null
  },
  {
   "term": "CLAUDE.md hierarchy",
   "dom": "D3",
   "group": "Claude Code configuration",
   "def": "user (not shared through version control) / project (ships with the repo) / directory (a subtree). \"Works for me, not for a new teammate\" almost always means user-level placement — move shared conventions to the project level.",
   "anchor": null
  },
  {
   "term": "@import / rules folder",
   "dom": "D3",
   "group": "Claude Code configuration",
   "def": "Split a bloated instruction file into topic files pulled in by import (the CLAUDE.md becomes a thin table of contents), or a per-topic rules folder.",
   "anchor": null
  },
  {
   "term": "CLAUDE.md vs skill",
   "dom": "D3",
   "group": "Claude Code configuration",
   "def": "Always-on universal standards (style, commit format, review criteria) belong in CLAUDE.md/rules; an on-demand procedure belongs in a skill. Test: always enforced, or a procedure you sometimes run?",
   "anchor": null
  },
  {
   "term": "/memory",
   "dom": "D3",
   "group": "Claude Code configuration",
   "def": "Shows which memory files actually loaded. Use it to diagnose configuration instead of guessing.",
   "anchor": null
  },
  {
   "term": "context: fork",
   "dom": "D3",
   "group": "Claude Code configuration",
   "def": "Runs a skill in an isolated subagent so verbose output is consumed there and only a clean result returns to the main conversation.",
   "anchor": "D1-S4 context isolation, at the Claude Code level"
  },
  {
   "term": "allowed-tools",
   "dom": "D3",
   "group": "Claude Code configuration",
   "def": "Restricts which tools a skill may use.",
   "anchor": "D2 tool-scoping + the D1-S5 guardrail"
  },
  {
   "term": "argument-hint",
   "dom": "D3",
   "group": "Claude Code configuration",
   "def": "Tells Claude what to ask for when a skill is invoked with no arguments.",
   "anchor": null
  },
  {
   "term": "Path-conditional rule",
   "dom": "D3",
   "group": "Claude Code configuration",
   "def": "A rule file with a path pattern (e.g. **/*.test.*) that loads only when a matching file is edited. Beats a directory CLAUDE.md when a convention rides a file type scattered across many directories; irrelevant conventions never load.",
   "anchor": null
  }
 ]
};
