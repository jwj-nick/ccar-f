/* CCAR-F Study — interactive transcripts (English translation of the original sessions).
 * The raw turns, NOT summarized — including wrong answers and their corrections, because that is where the learning happens.
 * The verbatim Korean originals live privately in the workspace (00_META/sessions/*_transcript.md). */

const TRANSCRIPTS = [
  {
    id: 't-d1-s1', dom: 'D1', ses: 'S1', date: '2026-07-13', title: 'Workflow vs Agent (interactive)',
    note: 'English translation of the original session. Raw turns.',
    turns: [
      { who: 'Tutor', text: 'Your verification testbench — a fixed stimulus sequence checked by a scoreboard — is that closer to a workflow or an agent? And by what criterion do you split them?' },
      { who: 'Nick', text: 'The basic fixed sequence is a workflow; workflow tuning and the automatic expansion/execution of each case is an agent.' },
      { who: 'Tutor', text: 'Essentially right — directed test = workflow; coverage-driven auto-expansion = agent-like. The litmus: before running, can you predict/hardcode the path and the step count? Predictable = workflow. The model decides the next step at runtime on feedback = agent. One tweak: executing a fixed sequence is still a workflow — what makes it an agent is the model holding the decision of what to do next. And agency costs more and compounds errors.' },
      { who: 'Tutor', text: 'APPLY. A: ticket → detect language → classify → reply from a fixed template. B: ticket → keep searching docs, checking the account, asking follow-ups until it is resolved. Which is which?' },
      { who: 'Nick', text: 'A workflow, B agent.' },
      { who: 'Tutor', text: 'Both correct. A is fixed steps known up front (workflow); B is open-ended with an unpredictable number of steps that the model drives on feedback (agent).' }
    ]
  },
  {
    id: 't-d1-s2', dom: 'D1', ses: 'S2', date: '2026-07-18', title: 'The 5 Workflow Patterns (interactive)',
    note: 'English translation of the original Korean session. Raw turns — including a wrong answer and its correction, which is where it clicked.',
    turns: [
      { who: 'Tutor', text: 'I gave the meaning of the 5 patterns, then asked you to classify 3 situations. ① Extract key clauses from a contract → write a summary from them → verify the summary against the original. ② Sort an incoming email into {refund / bug / sales} and send each to a dedicated handler. ③ A refactor where the model decides at runtime which files to change → edits each → reassembles.' },
      { who: 'Nick', text: '1 - prompt chaining, 2 - routing, 3 - orchestrator-workers.' },
      { who: 'Tutor', text: 'All three correct. ②↔③ is the most-confused pair on the exam. In your own words, what is the single biggest difference between them? (Hint: who decides the branches, and when?)' },
      { who: 'Nick', text: '③ is the one that grasps the work, autonomously decides the execution process, carries it out, and then aggregates the results. ② only grasps the work and hands tasks to specialist workers.' },
      { who: 'Tutor', text: 'You nailed ③’s autonomy and aggregation. Sharpening: the essence is WHEN the branches are decided. Routing = pick from a predetermined set of bins (classify only, no aggregation). Orchestrator = build the bins at runtime and aggregate. Small correction: routing is not "hand tasks to workers" — it sends one input down one fixed lane; "divide among workers and aggregate" is actually the orchestrator. And the orchestrator is the closest of the five to an agent. Check: a travel assistant decides per request which steps are needed (flights + hotel + visa, or just a train), handles each, and aggregates. Routing or orchestrator?' },
      { who: 'Nick', text: 'Routing. It discriminates the case and splits into "check several things" or "a simple single check".', wrong: true },
      { who: 'Tutor', text: 'This is actually orchestrator — and why it is not routing is the whole lesson. The tells: "decides the needed steps on the fly" + "aggregates". If it were routing, the branches would be fixed in advance ({flights / hotel / refund}), each request goes down exactly one, with no composition or aggregation. Here the combination is not a fixed menu — the model assembles it at runtime → orchestrator. Rule: routing = pick from a fixed set of bins; orchestrator = build the bins on the fly. Re-check: "a travel-agency chatbot classifies a query into {flights / hotel / refund} and sends it to one dedicated consultant." Which is it?' },
      { who: 'Nick', text: 'That is routing.', correct: true },
      { who: 'Tutor', text: 'Correct — fixed 3 branches, classify, no aggregation. Notice: same topic (travel), different pattern. The pattern is set by the structure, not the topic. Two left — parallelization (A: run grammar / fact / tone checks at once and merge; B: ask the same question 5 times and take the majority) and evaluator-optimizer (a copy bot writes, another model scores it, it revises, repeat).' },
      { who: 'Nick', text: 'a - parallelization, b - evaluator-optimizer.' },
      { who: 'Tutor', text: 'Both right. Parallelization has two flavors — sectioning (independent tasks at once, then merge; for speed) and voting (same task N times, majority; for confidence). Easily confused: voting (independent parallel repeats, no critic, no improvement) vs evaluator-optimizer (generate → critique → revise loop). All 5 patterns done solo.' }
    ]
  },
  {
    id: 't-d1-s3', dom: 'D1', ses: 'S3', date: '2026-07-18', title: 'Orchestrator vs Routing, and the Agent Boundary (interactive)',
    note: 'English translation of the original Korean session. Raw turns — including a vague answer that got sharpened, which is where it clicked.',
    turns: [
      { who: 'Tutor', text: 'System A: a support bot classifies every message into {billing, technical, account} and sends it to a prebuilt handler; the 3 categories are hardcoded. System B: a coding assistant asked "add OAuth login" inspects the codebase, decides on the spot which 4 files to change, delegates each to a worker, and integrates. For each — routing or orchestrator-workers? And the single deciding property in one sentence?' },
      { who: 'Nick', text: 'A routing, B orchestrator-workers.' },
      { who: 'Tutor', text: 'Both labels correct — but you gave only the labels. The point is WHY. A ladder: before any request arrives, can you write down System A’s full list of possible destinations? Can you write down System B’s full list of subtasks? Yes/no each, then the difference in one sentence.' },
      { who: 'Nick', text: 'A yes, B no. Routing = there are predefined branches and you take the input and clarify which one it connects to. Orchestrator-workers = you hold several capabilities and, depending on the input, strategically decide which capability to use and how.' },
      { who: 'Tutor', text: 'The deciding property IS that yes/no. Routing sentence is right. One sharpening: "decide which capability to use" also describes routing (routing also picks one capability), so that phrasing does not separate them. The real split is two tells — routing = pick ONE from an enumerable set of bins (no aggregation); orchestrator = assemble the subtask SET at runtime, then MERGE. So the line is not "which does it pick" but "can you enumerate the list up front + is there a merge". Trap: a ticket is classified into {billing, technical, account}; if technical, a second classifier picks one of {network, hardware, software, account-security}; it goes to exactly one specialist; nothing is combined. Routing or orchestrator?' },
      { who: 'Nick', text: 'Your question is routing. And I see that the core of orchestrator-workers is re-assembling / re-composing the subtasks, and I need to express that clearly.' },
      { who: 'Tutor', text: 'Correct — even nested, every destination is enumerable, exactly one arrives, no merge = routing. Trap avoided. Now Step 2, the apparent paradox: an orchestrator "decides at runtime" too, yet we still call it a workflow. Compare two versions of System B. ① Orchestrator: decompose once (4 files) → workers → merge → done. ② Something else: edit auth.js → run tests → see a failure → open config.js (not in the plan) → fix → re-test → repeat until it decides it is done and stops. What does ② have that ① does not — in one sentence?' },
      { who: 'Nick', text: 'In ② the skeleton is not fixed and it builds the method of solving the mission as it goes?', wrong: true },
      { who: 'Tutor', text: 'Right direction, but a trap: an orchestrator ALSO "builds the method" (it assembles the subtask list), so that phrase does not separate ① and ②. Narrow it to one thing: the feedback loop. ② observes the result of its own action (a test failure), decides the next action from that result, and decides when to stop. ① has no such loop (one pass). Two markers: (1) environment feedback drives the next step, (2) the model decides trajectory length and stop condition. Conclusion: orchestrator = dynamic content / fixed one-pass control flow · agent = the control flow itself is dynamic (feedback loop + self-stop). HW lens: ① = directed regression dispatched once; ② = constrained-random + coverage-closure (observe → next stimulus → loop). APPLY: a pipeline decides per document which fields exist (varies), extracts each with a sub-call, assembles JSON, once, no re-check. Orchestrator or agent, and by which marker?' },
      { who: 'Nick', text: 'Orchestrator, because there is no feedback loop.', correct: true },
      { who: 'Tutor', text: 'Perfect — you cut through the trap ("decides at runtime" tempts you toward agent) with the marker. It is only dynamic content; with no feedback loop it stays a workflow. D1 orchestration slice → confidence 4. Next: D1-S4, multi-agent systems (coordinator ↔ subagents, context isolation).' }
    ]
  }
];

window.CCARF_TRANSCRIPTS = TRANSCRIPTS;
