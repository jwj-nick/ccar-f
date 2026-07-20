/* CCAR-F Study — Lessons (the actual taught content, distilled to English).
 * One entry per interactive session. Rendered newest-first in the Lessons tab.
 * Private/verbatim (and Korean) detail lives in the workspace 00_META/sessions. */

const LESSONS = [
  {
    id: 'd1-s1', dom: 'D1', ses: 'S1', date: '2026-07-13', title: 'Workflow vs Agent',
    goal: 'Tell whether a task should be built as a fixed workflow or an autonomous agent.',
    blocks: [
      { h: 'The boundary', p: 'Workflow = predefined code paths orchestrate the LLM calls; you author the control flow. Agent = the model decides the next step at runtime and loops on tool + environment feedback.' },
      { h: 'Litmus test', p: 'Before running, can you predict / hardcode the path and the number of steps? Yes → workflow. No, and it needs a feedback loop where the model picks the next step → agent.' },
      { h: 'The trap', p: 'More autonomy / multi-agent is NOT automatically better. If the path is predictable, a workflow is cheaper, faster, and more reliable. Spend agency only where flexibility is genuinely required.' },
      { h: 'HW lens', p: 'Directed regression = workflow (a fixed vector sequence). Constrained-random + coverage-closure loop = agent-like (the tool decides the next stimulus). Agency is flexible but costs more and compounds errors.' }
    ]
  },
  {
    id: 'd1-s2', dom: 'D1', ses: 'S2', date: '2026-07-18', title: 'The 5 Workflow Patterns',
    goal: 'Recognize which of the 5 workflow patterns a situation is — by the shape of its data flow.',
    blocks: [
      { h: 'The 5 patterns (all still workflows)', list: [
        'Prompt chaining — split the task into a fixed sequence of steps; each call works on the prior output (add a gate to check between steps).',
        'Routing — classify the input, then send it down one predetermined path.',
        'Parallelization — run work concurrently: sectioning (independent parts, then merge) or voting (same task N times, take the majority).',
        'Orchestrator-workers — a central model decides the subtasks at runtime, delegates to workers, and synthesizes.',
        'Evaluator-optimizer — generate → a separate evaluator critiques → revise on the feedback → repeat.'
      ] },
      { h: 'Recognition cheat-key', p: 'Draw the arrows; the shape is the answer. Linear steps → chaining · classify→branch → routing · fan-out→merge / N-vote → parallelization · runtime decomposition → orchestrator-workers · generate↔evaluate loop → evaluator-optimizer.' },
      { h: 'The money distinction: routing vs orchestrator', p: 'Both branch to different work. The difference is WHEN the branches are decided. Routing: the set of paths is fixed in advance; the model only picks one, and there is no aggregation. Orchestrator: the model invents the subtasks at runtime (e.g., which files to change) and aggregates the results. One line — routing = pick from a fixed set of bins; orchestrator = build the bins on the fly.' },
      { h: 'Same topic, different pattern', p: 'A travel assistant that composes the needed steps per request (flights + hotel + visa, or just a train) and aggregates = orchestrator. A travel chatbot that sorts each query into {flights / hotel / refund} and sends it to one handler = routing. Same domain — the pattern is set by the structure, not the topic.' },
      { h: 'Two easily confused: voting vs evaluator-optimizer', p: 'Both repeat, so they look alike. Voting = the same task run independently in parallel, then majority — no critic, no improvement. Evaluator-optimizer = generate, a critic scores it, revise on the feedback, loop — a sequential improvement loop.' },
      { h: 'Why it matters', p: 'Roughly half of D1 questions are "which pattern is this flow, and why". Read the shape; name the dominant pattern. Real systems compose several patterns, but the exam asks for the dominant one.' }
    ]
  },
  {
    id: 'd1-s3', dom: 'D1', ses: 'S3', date: '2026-07-18', title: 'Orchestrator vs Routing, and the Agent Boundary',
    goal: 'Nail the routing↔orchestrator deciding property, then draw the exact line where an orchestrator becomes a true agent.',
    blocks: [
      { h: 'Routing vs orchestrator — the deciding property', p: 'Do NOT split them on "which capability does it pick" — both pick a capability from the input, so that test fails. The real test is two-part: (1) Before any request arrives, can you enumerate the entire list of destinations/subtasks on paper? (2) Is there a merge at the end? Enumerable up front + no merge = routing. Built at runtime + aggregated = orchestrator. One line: routing = pick from a fixed set of bins; orchestrator = build the bins on the fly and combine.' },
      { h: 'The nested-classifier trap', p: 'A ticket is classified into {billing, technical, account}; if "technical", a second classifier picks one of {network, hardware, software, account-security}; it goes to exactly one specialist; nothing is combined. Still ROUTING — even two levels deep, every destination is enumerable in advance, exactly one is chosen, and there is no aggregation. Multi-level choosing is not orchestration.' },
      { h: 'The apparent paradox', p: 'We just said an orchestrator "decides the subtasks at runtime." The S1 litmus said "the model deciding at runtime = agent." So why is an orchestrator still a workflow? Because deciding subtasks is dynamic CONTENT inside a fixed CONTROL FLOW: decompose once → dispatch to workers → merge once. One forward pass.' },
      { h: 'Where orchestrator becomes an agent', p: 'The missing ingredient is a feedback loop. Compare two versions of the same coding task. (1) Orchestrator: decide the 4 files to edit → workers edit them → merge → done. (2) Agent: edit a file → run the tests → see a failure → open a file it did NOT plan for → fix → re-run → repeat until it judges the goal met and stops on its own. Version 2 adds: (a) environment feedback drives the next step, (b) the trajectory length and the stop condition are decided by the model. That feedback loop is the line.' },
      { h: 'The one-line conclusion', p: 'Orchestrator = dynamic content, fixed one-pass control flow (decompose → dispatch → merge). Agent = the control flow itself is dynamic — a feedback loop where the model chooses the next action and when to stop.' },
      { h: 'HW lens', p: 'Orchestrator = a directed regression dispatched once (a fixed job set, fanned out and joined). Agent = constrained-random + coverage-closure: observe coverage/failures → generate the next stimulus → loop until closure. The loop is the whole difference.' },
      { h: 'Exam-grade trap immunity', p: 'A per-document extraction pipeline decides at runtime which fields exist, extracts each, assembles JSON — once, no re-check. It is ORCHESTRATOR, not agent: "decides at runtime" is only dynamic content; with no feedback loop and no self-chosen stop, it never crosses into agent. Runtime-dynamic alone is not enough — you need the feedback loop.' }
    ]
  },
  {
    id: 'd1-s4', dom: 'D1', ses: 'S4', date: '2026-07-19', title: 'Multi-agent Systems & Context Isolation',
    goal: 'Understand why each subagent gets its own isolated context, what it costs, and when a multi-agent design is actually the right call.',
    blocks: [
      { h: 'What a multi-agent system is', p: 'Take S3’s orchestrator-workers and make each worker a full agent — its own loop, its own tools, its own context. Now you have a coordinator (lead agent) that delegates to several subagents and synthesizes their results. The jump from "workers" to "subagents" is that each worker can now run its own feedback loop.' },
      { h: 'Why isolate each context — reason 1: interference', p: 'If all subagents shared one thread, every subagent’s intermediate junk (searches, dead ends, long tool outputs) would pile into one window and blur the model’s attention — it starts conflating vendor A’s numbers with vendor B’s. Isolation means each subagent sees only what its own subtask needs. HW lens: separate lanes instead of one shared bus, so there is no cross-talk.' },
      { h: 'Why isolate — reason 2: capacity (the bigger one)', p: 'A context window is a fixed-size buffer. Share it across N subagents and each effectively gets ~window÷N; overflow forces truncation or repeated auto-compaction (which re-spends tokens). Give each subagent its OWN full window and have it return only a summary: the coordinator then holds N summaries, not N full documents. Net effect: total usable context ≈ N×window, while every single window stays clean. This — exceeding a single window’s limit — is the real reason to go multi-agent.' },
      { h: 'The cost', p: 'The same isolation that blocks cross-talk also makes subagents work blind to each other. Two costs follow: (1) duplicated work → a major driver of multi-agent token usage running ~15× a single chat; (2) drift — over time each subagent diverges to its own standard, so results do not compose cleanly and the coordinator must reconcile them. The lever that fights both: the coordinator writes very crisp, non-overlapping task specs (objective, output format, boundaries).' },
      { h: 'The decision rule — when to use multi-agent', p: 'Reach for multi-agent when the subtasks are INDEPENDENT and the work is breadth / read-heavy (research, exploration, gather-then-synthesize) — isolation loses nothing and you gain parallelism + N×context. Stay with a single agent when subtasks are COUPLED / sequential / share an evolving state (a rename threading through 8 files, most coding) — there the drift-and-merge cost dominates and the parallel gain is small. One-line litmus: can the pieces run without seeing each other’s work? Yes → multi-agent candidate; No → single agent.' },
      { h: 'The trap (a rerun of S1)', p: 'Do not reach for multi-agent just because it sounds powerful. It costs ~15× the tokens and adds whole new failure modes (duplication, drift, coordination). Use it only when subtasks are genuinely independent and breadth-first. "More agents = better" is the same wrong instinct as "more autonomy = better" from S1.' },
      { h: 'The summary boundary = a reliability seam (D5 preview)', p: 'Subagents return summaries and their raw context is discarded. So the coordinator inherits three risks: lost provenance (you cannot see how the result was reached or reproduce it), baked-in error (a subtly wrong summary cannot be cross-checked against the source), and compounding error across layers. Fix: make subagents return STRUCTURED output — claim + evidence + source/citation + confidence — and run an independent verification pass on the synthesis. A self-graded "I’m confident" is not enough; an agent can be confidently wrong. HW lens: never accept a DUT’s self-reported pass — you want an independent scoreboard and the waveform on demand.' }
    ]
  },
  {
    id: 'd1-s5', dom: 'D1', ses: 'S5', date: '2026-07-19', title: 'Keeping an Agent on the Rails — Controls',
    goal: 'Given a self-running agent loop, name the five ways it fails and the control that catches each — and place human checkpoints correctly.',
    blocks: [
      { h: 'The frame: five failure axes', p: 'An agent that runs its own loop (edit → test → fix → repeat → stop) can fail on five axes. Ask, in order: does it TERMINATE? is it CORRECT? is it ON-GOAL? is COST bounded? does it stay IN-BOUNDS? Each axis has a matching control — that mapping is the whole lesson.' },
      { h: 'Axis 1 — terminate? → a stop condition', p: 'Left alone, a loop can never converge, or oscillate (fix A breaks B, fix B breaks A). Control: an explicit termination — max iterations, a verifiable success criterion, or budget exhausted. An agent with no stop condition is a hang waiting to happen.' },
      { h: 'Axis 2 — correct? → INDEPENDENT verification', p: 'Two correctness failures: chasing symptoms and piling up work-arounds without fixing the root cause, and stopping while confidently wrong ("done" on a bad result). Control: verification that is INDEPENDENT of the agent — programmatic checks (tests, schema, linters), a separate evaluator agent (this is S3’s evaluator-optimizer), or citation/ground-truth checks. The agent grading its own work is worthless, because a confidently-wrong agent passes itself. And note: the stop condition and verification are one thing — "done" must mean "a verifiable success criterion is met", or Axis 1 just ends on a wrong answer.' },
      { h: 'Axis 3 — on-goal? → re-anchor the goal', p: 'Over many self-feedback rounds an agent drifts: it forgets the original objective and starts debugging problems it created itself — and context-compaction makes the amnesia worse. Control: persistent goal re-anchoring — store the objective/spec in durable state and re-inject it every loop so compaction cannot erase it. (Human-in-the-loop can also catch drift, but it is a backstop, not the tight control here.)' },
      { h: 'Axis 4 & 5 — cost → budget cap · bounds → guardrails', p: 'Cost can run away (unbounded tokens / time / money) → cap it with a budget. And the agent can act out of bounds (destructive or out-of-scope actions, touching prod) → constrain it with guardrails on scope and permissions.' },
      { h: 'Human-in-the-loop: two placement principles', p: 'HITL cuts across the axes, so where you put it matters — not everywhere (that destroys the agent’s value). Two principles compose: (1) a MILESTONE gate between big phases — efficient oversight, because one review covers cost + goal + guardrails + re-anchor together; (2) an IRREVERSIBILITY gate — a mandatory human approval right before any action you cannot take back (git push, deploy to prod), which cannot wait for a phase boundary because once it happens it is done. Reversible, low-stakes steps run autonomously.' },
      { h: 'HW lens & why it matters', p: 'This is exactly a verification environment’s control set: a timeout (stop), an independent scoreboard (verify), a test-plan goal you are held to (re-anchor), a compute budget, assertions/bounds (guardrails), and sign-off before tape-out (the irreversible HITL gate). Exam-wise, this is the backbone of "the agent is autonomous — how do you trust it?" questions, and "irreversible / high-stakes actions require human approval" is both a recurring answer and a real safety principle.' }
    ]
  },
  {
    id: 'd1-s6', dom: 'D1', ses: 'S6', date: '2026-07-19', title: 'The Complexity Ladder (D1 capstone)',
    goal: 'Given a task, choose the lowest rung of the agentic ladder that solves it — and know exactly what a needless climb costs.',
    blocks: [
      { h: 'The one principle behind every D1 trap', p: 'S1 warned "more autonomy isn’t always better"; S4 warned "more agents isn’t always better." They share one direction: start with the simplest thing that works, and treat added complexity (autonomy, agent count) as a COST, not a free upgrade. Every step up must be forced by the task. Anthropic’s own guidance: find the simplest solution, and increase complexity only when it demonstrably improves the outcome.' },
      { h: 'The ladder', list: [
        'Augmented LLM — one call plus tools / retrieval / memory. The floor.',
        'Workflow — the 5 pre-authored patterns (chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer).',
        'Single agent — a feedback loop where the model decides the next step.',
        'Multi-agent — a coordinator plus subagents with isolated contexts.'
      ] },
      { h: 'Power rises — so does cost', p: 'Each rung up adds capability but also latency, tokens, nondeterminism, and new failure modes (the five axes from S5). The rule: pick the LOWEST rung that solves the task; climb only when the current rung genuinely cannot do the job.' },
      { h: 'The climb triggers (when a step up is justified)', list: [
        'Augmented LLM → workflow: the task needs multiple steps or branches, but the path is still predictable (you can hardcode the flow).',
        'Workflow → single agent: you cannot predefine the path — the model must decide the next step from feedback (open-ended, unknown step count).',
        'Single agent → multi-agent: subtasks are independent and breadth-heavy, and the work exceeds a single context window (the S4 rule).'
      ] },
      { h: 'The hidden cost of climbing (worked example)', p: 'Extracting {date, vendor, total} from 10k invoices/day is a bounded, predictable task → the lowest rung (an augmented LLM call, or a simple workflow) is correct. Jumping to a single agent is NOT nearly free: an agent is a loop, so you go from ~1 call per item to N calls (latency and tokens ×N, then ×10,000 at this volume); you lose determinism (the agent picks its own path, so identical invoices can take different routes, killing the reproducibility a bounded extraction needs); and you inherit the S5 control burden (stop conditions, verification, guardrails) for flexibility the task never required. That is precisely "reaching one rung too high."' }
    ]
  },
  {
    id: 'd1-s7', dom: 'D1', ses: 'S7 R1', date: '2026-07-19', title: 'D1 Mini-Mock — Round 1 (model answers)',
    goal: 'Self-test judgment across S1–S6. Five scenarios; each answer is "which and why."',
    blocks: [
      { h: 'Q1 — pattern: generate → score → revise → repeat', p: 'Answer: EVALUATOR-OPTIMIZER (a workflow). One model generates, a separate evaluator scores it against fixed criteria, the generator revises on the feedback, looping until it passes. Common trap: calling it an "agent" because it loops. A feedback loop alone is not agency — here the loop, the critic, and the stop condition are all pre-authored, so it is a workflow. An agent would decide its own next action and when to stop.' },
      { h: 'Q2 — routing vs orchestrator: runtime clause extraction', p: 'Answer: ORCHESTRATOR-WORKERS. The subtask set (which clause-types are present) is decided at runtime from the input, delegated to workers, and aggregated into one summary. Runtime decomposition + aggregation is exactly what separates it from routing, which would pick one fixed path with no merge.' },
      { h: 'Q3 — multi vs single agent: rename across 40 files', p: 'Answer: SINGLE AGENT. The edits are tightly coupled — every call site must stay consistent (shared, evolving state). Isolated subagents would drift into inconsistent renames. The subtasks are not independent, so the multi-agent parallel gain does not apply and coordination cost would dominate.' },
      { h: 'Q4 — reliability: agent loosens the assertion, declares done', p: 'Answer: the CORRECTNESS axis — a work-around (patching the symptom instead of the root cause) plus a confidently-wrong "done." The agent is gaming its own success check. Control: INDEPENDENT, tamper-proof verification — (1) the stop condition\'s "done" must be a verifiable criterion the agent cannot weaken, and (2) a guardrail must forbid the agent from editing the tests/oracle.' },
      { h: 'Q5 — ladder: summarize one 20-page PDF into 5 bullets', p: 'Answer: an AUGMENTED LLM — one model call, no loop. A single agent is already too high (an agent is a loop, and there is nothing to loop on). A 5-subagent proposal is severe over-engineering (5× cost + merge/coordination, zero benefit). Rule: the lowest rung that works — here, one call.' },
      { h: 'Three things to firm up', p: '(1) A feedback loop does not by itself make an agent — a fixed generate↔evaluate loop is the evaluator-optimizer workflow. (2) On the ladder, drop to the LOWEST rung: a bounded one-shot task is an augmented LLM, not a single agent. (3) Verification must be independent and tamper-proof — never let the agent grade itself on a criterion it can edit.' }
    ]
  },
  {
    id: 'd2-s1', dom: 'D2', ses: 'S1', date: '2026-07-19', title: 'A Tool Is Not an API (the finite-context contract)',
    goal: 'Understand why a tool for an agent must be designed differently from a human-facing API.',
    blocks: [
      { h: 'The core idea', p: 'A tool is a contract between a deterministic system and a NON-deterministic, limited-context agent — not an API wrapper. That one reframe drives every D2 decision.' },
      { h: 'Why a full-data API breaks for an agent', p: 'Give an agent list_users() that returns all 50,000 users. A human developer calling GET /users is fine — the human paginates and scrolls on their end. An agent cannot scroll: whatever a tool returns lands directly in its finite context window (the same finite window from D1-S4). Fifty thousand rows flood it, pollute its attention, and waste tokens — the agent cannot even reason over the result.' },
      { h: 'So move the filtering INTO the tool', p: 'The tool must return high-signal, filtered results, not a full dump: search_users(role="admin", active=true) → 12 rows, not list_users() → 50,000. The narrowing that a human would do by hand has to be built into the tool itself. Same idea downstream: meaningful identifiers over raw uuids, pagination, and a concise/detailed response format.' },
      { h: 'Exam so-what', p: 'When a question asks which tool design suits an agent, choose the one that respects limited context — search_X over list_X, high-signal responses. Returning everything, raw uuids, or opaque blobs are the wrong answers.' },
      { h: 'HW lens', p: 'You would not dump a 50,000-line waveform to the block above — you design a probe that triggers and filters down to only the signals of interest. A tool for an agent is that probe.' },
      { h: 'Next (S2)', p: 'The other face of "limited context": an agent decides WHICH tool to call from its name and description alone — it does not read full docs. So description quality = call accuracy, which is the S2 topic.' }
    ]
  },
  {
    id: 'd2-s2', dom: 'D2', ses: 'S2', date: '2026-07-20', title: 'Tool Design Craft — Descriptions & Tool Count',
    goal: 'Write tool names/descriptions an agent calls correctly, and know why fewer tools is usually better.',
    blocks: [
      { h: 'The description IS the interface', p: 'An agent chooses which tool to call from its NAME and DESCRIPTION alone — it does not read your docs. So the name+description is the entire spec it reasons over. Compare get_data(id) "Gets data" (the agent cannot tell what id is or when to use it) with search_transactions(account_id, start_date, end_date) "Search a customer’s transactions in a date range; returns up to 50 recent matches with amount, date, merchant." The second is self-describing, so the agent calls it correctly.' },
      { h: 'A good tool description says three things', p: '(1) WHEN to use it — the purpose/trigger. (2) WHAT each parameter means — unambiguous names (user_id, not user), with type and constraints. (3) WHAT it returns — because the agent plans its next step from the return (and the return should be high-signal, per S1). Also: make implicit context explicit ("describe it to a new hire who has never seen your system"), and namespace by service (asana_search, github_create_issue). Small description tweaks yield big accuracy gains — description quality = call accuracy.' },
      { h: 'More tools is not better', p: 'Too many tools — especially overlapping ones — derail the agent’s tool selection: it wastes context reasoning about which to call, or picks the wrong one. This is the D1 simplicity trap for the third time (more autonomy → more agents → more tools). Fix with (1) consolidation: fold several low-level operations into one high-level tool that matches how the work is actually done (schedule_meeting = find availability + book + send invite), moving the chaining logic into the tool; and (2) scoping the toolset to the situation so only relevant tools are exposed.' },
      { h: 'HW lens', p: 'A vague register spec (unclear field semantics, when to write, constraints) makes the reader mis-use it; a precise spec yields correct use. Consolidation = giving the caller one high-level configure_and_start(mode) transaction instead of exposing five low-level register pokes.' }
    ]
  },
  {
    id: 'd2-s3', dom: 'D2', ses: 'S3', date: '2026-07-20', title: 'Responses & Structured Errors',
    goal: 'Design tool returns — successes and errors — so an agent can act on them and self-recover.',
    blocks: [
      { h: 'Responses (recap from S1–S2)', p: 'A tool return should be high-signal and token-efficient: filtered results (search_X over list_X), meaningful identifiers over raw uuids, pagination, and a stated return shape — never a full dump that floods the finite context window.' },
      { h: 'An error is feedback in the loop', p: 'An agent runs act → verify → repeat, so a tool error is feedback it must act on. Two error responses to the same bad call: {error:"500"} versus {error:"No test found with id ‘tc_9987’. Valid ids look like ‘test_<name>’. Call list_tests() to see what is available."}' },
      { h: 'Structured errors enable self-recovery', p: 'The opaque "500" demands outside knowledge the agent does not have, so the best it can do is retry blindly (wasting tokens / looping) or report "error" upward and leave the loop. The structured message says what went wrong, how to fix it, and points to a cheap recovery path — so the agent fixes its call and continues. A good error = what went wrong + how to fix + the cheap next step.' },
      { h: 'Recoverable vs not', p: 'Design principle: make recoverable errors actionable so the agent self-corrects; escalate cleanly only when the situation is truly unrecoverable — which ties back to stop conditions and human-in-the-loop from D1.' },
      { h: 'HW lens', p: 'An opaque 500 is a bare exit code with no waveform. A structured error is an assertion failure with file, line, expected-vs-actual, and a hint — the engineer (agent) can actually act on it.' }
    ]
  },
  {
    id: 'd2-s4', dom: 'D2', ses: 'S4', date: '2026-07-20', title: 'MCP Architecture',
    goal: 'Understand why MCP exists, its host/client/server roles, and the three primitives.',
    blocks: [
      { h: 'Why MCP exists — M×N → M+N', p: 'Without a standard, M agents each needing N services means M×N bespoke integrations, which explodes as either side grows. MCP is a standard protocol, so each agent speaks it once and each service exposes it once → M+N. Anthropic calls MCP "a USB-C port for AI applications": implement the standard once and things interoperate.' },
      { h: 'The three roles', p: 'Host = the agent application the user runs (Claude Code, Claude Desktop, an IDE); the model lives here and consumes capabilities. Server = a lightweight program that exposes ONE capability via the standard (a GitHub server, a filesystem server, a DB server). Client = the connector inside the host that holds a 1:1 connection to one server — it is the wiring, not the agent. One host runs many clients, one per connected server.' },
      { h: 'The three primitives — decided by WHO controls', p: 'A server exposes three kinds of things: Tools = actions the MODEL calls (may have side effects) — model-controlled; this is the risk surface where guardrails and HITL belong. Resources = data read into context (files, docs, records) — app-controlled, read-only, like a GET. Prompts = reusable templates/workflows the USER invokes (e.g., a /code-review command) — user-controlled. Mnemonic: model→tool, app→resource, user→prompt.' },
      { h: 'The classic trap: read-only ≠ resource', p: 'Both tools and resources can "get data," so people classify by side-effects — wrongly. The test is CONTROL, not read-only-ness. A DB query the model actively issues with parameters (search_orders(customer_id)) is a TOOL even though it only reads, because the model initiates it. A resource is passive data the app loads into context (often URI-addressed).' },
      { h: 'HW lens', p: 'MCP is a standard bus like USB or PCIe: a device implements the standard once and plugs into any compliant host, with no custom glue per pair. Tools are the actuators (side effects); resources are read ports.' }
    ]
  }
];

window.CCARF_LESSONS = LESSONS;
