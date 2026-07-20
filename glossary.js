/* CCAR-F Study — glossary + recall drill. Terms we've covered, plain-English defs.
 * Each card shows the DEFINITION; recall the TERM, then reveal. Grows as study proceeds. */

const GLOSSARY = [
  // A. Workflow vs Agent
  { term: 'Workflow', dom: 'D1', group: 'Workflow vs Agent', def: 'An LLM system whose step path is written in code ahead of time — the path is predictable and hardcodable.', anchor: 'directed regression' },
  { term: 'Agent', dom: 'D1', group: 'Workflow vs Agent', def: 'An LLM system where the model decides its own next step at runtime from feedback — open-ended, unknown step count.', anchor: 'coverage-closure loop' },
  { term: 'Augmented LLM', dom: 'D1', group: 'Workflow vs Agent', def: 'One LLM call enhanced with tools, retrieval, and memory. The building block and the lowest rung of the ladder.' },
  { term: 'Complexity ladder', dom: 'D1', group: 'Workflow vs Agent', def: 'Augmented LLM → workflow → single agent → multi-agent. Pick the lowest rung that works; each climb adds cost.' },

  // B. The 5 workflow patterns
  { term: 'Prompt chaining', dom: 'D1', group: 'The 5 workflow patterns', def: 'A workflow of fixed sequential steps; each call works on the previous output (optional gate/check between steps).', anchor: 'pipeline stages + assertions' },
  { term: 'Routing', dom: 'D1', group: 'The 5 workflow patterns', def: 'Classify the input, then send it down one of a FIXED set of predefined paths. No aggregation.', anchor: 'address decoder / demux' },
  { term: 'Parallelization', dom: 'D1', group: 'The 5 workflow patterns', def: 'Run calls at once: sectioning (independent parts → merge, for speed) or voting (same task N× → majority, for confidence).', anchor: 'parallel units / TMR voting' },
  { term: 'Orchestrator-workers', dom: 'D1', group: 'The 5 workflow patterns', def: 'A central model decides the subtasks AT RUNTIME, delegates them to workers, and aggregates the results.', anchor: 'dynamic dispatcher' },
  { term: 'Evaluator-optimizer', dom: 'D1', group: 'The 5 workflow patterns', def: 'A generator produces output, a SEPARATE evaluator scores it against criteria, and it revises on the feedback in a loop until it passes. Still a workflow.' },

  // C. Multi-agent
  { term: 'Coordinator / subagent', dom: 'D1', group: 'Multi-agent', def: 'In a multi-agent system, the lead agent that delegates (coordinator) and the worker agents it spawns (subagents).' },
  { term: 'Context isolation', dom: 'D1', group: 'Multi-agent', def: 'Giving each subagent its OWN context window, so their work does not interfere and total usable context grows (~N×window). Cost: ~15× tokens, drift.', anchor: 'separate lanes, no shared-bus cross-talk' },

  // D. Reliability controls
  { term: 'Stop condition', dom: 'D1', group: 'Reliability controls', def: 'An explicit rule that ends an agent loop: max iterations, a verifiable success criterion, or budget exhausted.', anchor: 'regression timeout' },
  { term: 'Independent verification', dom: 'D1', group: 'Reliability controls', def: 'Checking output with something OUTSIDE the agent (tests, a separate evaluator, citations) — never the agent grading itself.', anchor: 'independent scoreboard, not the DUT’s word' },
  { term: 'Goal re-anchoring', dom: 'D1', group: 'Reliability controls', def: 'Keep the objective in durable state and re-inject it each loop, so context-compaction does not lose it.' },
  { term: 'Guardrails', dom: 'D1', group: 'Reliability controls', def: 'Limits on the agent’s scope and permissions — what it may touch or do.', anchor: 'assertions / bounds' },
  { term: 'Human-in-the-loop (HITL)', dom: 'D1', group: 'Reliability controls', def: 'A human checkpoint. Two placements: at milestone boundaries (efficiency) and right before irreversible / high-stakes actions (safety).', anchor: 'sign-off before tape-out' },

  // E. Tools (D2)
  { term: 'Tool (agent tool)', dom: 'D2', group: 'Tools & MCP', def: 'A contract between a deterministic system and a limited-context, NON-deterministic agent — not an API wrapper.', anchor: 'block port/protocol contract' },
  { term: 'High-signal response', dom: 'D2', group: 'Tools & MCP', def: 'A tool return that gives only the relevant, filtered info (search_X, meaningful IDs, pagination) — not a full dump that floods the context.' },
  { term: 'Tool description quality', dom: 'D2', group: 'Tools & MCP', def: 'The name + description ARE the interface the agent reasons over. A good one says: when to use it + what each parameter means + what it returns. Description quality = call accuracy.' },
  { term: 'Tool consolidation', dom: 'D2', group: 'Tools & MCP', def: 'Fold several low-level operations into one high-level tool (schedule_meeting = find availability + book + invite). Fewer, high-impact tools; more is not better.', anchor: 'one high-level transaction vs many register pokes' },
  { term: 'Structured error', dom: 'D2', group: 'Tools & MCP', def: 'An error that states what went wrong + how to fix it + a cheap recovery path — so the agent self-recovers, instead of an opaque code.', anchor: 'assert with file/line/expected vs actual' },

  // F. MCP
  { term: 'MCP', dom: 'D2', group: 'MCP', def: 'A standard protocol that connects agents to external tools and data — turning M×N bespoke integrations into M+N. Write a server once; any MCP host can use it.', anchor: 'USB-C / standard bus for AI' },
  { term: 'Host (MCP)', dom: 'D2', group: 'MCP', def: 'The agent application the user runs (Claude Code, Claude Desktop, an IDE). It wants to use capabilities; the model lives here and consumes what clients expose.' },
  { term: 'Client (MCP)', dom: 'D2', group: 'MCP', def: 'The connector inside the host that maintains a 1:1 connection to one server. It is the wiring, NOT the agent — one client per connected server.' },
  { term: 'Server (MCP)', dom: 'D2', group: 'MCP', def: 'A lightweight program that exposes ONE capability via the standard (a GitHub server, a filesystem server, a DB server).' },
  { term: 'Resource (MCP primitive)', dom: 'D2', group: 'MCP', def: 'Passive data the host reads into context (files, docs, records) — read-only, app-controlled. Like a GET. NOT decided by read-only-ness but by control: the app loads it.' },
  { term: 'Prompt (MCP primitive)', dom: 'D2', group: 'MCP', def: 'A reusable template / workflow the USER invokes (e.g., a /code-review command) — user-controlled.' },
  { term: 'Primitive control test', dom: 'D2', group: 'MCP', def: 'Which of tool/resource/prompt? Ask who controls it: model → tool (an action), app → resource (data to read), user → prompt (a template). Read-only vs not is NOT the test.' }
];

window.CCARF_GLOSSARY = GLOSSARY;
