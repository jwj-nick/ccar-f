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
  }
];

window.CCARF_LESSONS = LESSONS;
