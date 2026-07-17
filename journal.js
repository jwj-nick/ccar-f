/* CCAR-F Study — public study journal (distilled). Updated each session by /ccar-log.
 * Full detail (wrong answers, weak items) stays private in the workspace (00_META/sessions, progress.md). App shows the distilled journal only. */

const JOURNAL = {
  updated: '2026-07-18',
  streak: 2,
  location: 'W1 · D1 in progress (S2 done)',

  // Next problem (shown large at the top of the app)
  next: {
    dom: 'D1', ses: 'S3', title: 'Orchestrator-workers & the agent boundary',
    problem: 'Routing and orchestrator-workers both branch to different work — what is the ONE difference that separates them? And at what point does an orchestrator stop being a workflow and become an agent?',
    hint: 'Think about WHO decides the subtasks and WHEN — at authoring time (fixed) vs at runtime (dynamic).'
  },

  // Domain progress (studied confidence 0–5)
  progress: [
    { code: 'D1', ko: 'agent design & orchestration', conf: 3, target: 4 },
    { code: 'D3', ko: 'Claude Code', conf: 3, target: 4 },
    { code: 'D4', ko: 'prompting & structured output', conf: 2, target: 4 },
    { code: 'D2', ko: 'tool design & MCP', conf: 2, target: 4 },
    { code: 'D5', ko: 'context & reliability', conf: 2, target: 4 }
  ],

  // Spaced review (interval repetition)
  reviewDue: [
    { item: 'workflow vs agent criterion (can you predict the path/step count?)', when: 'Jul 14 · Jul 16 · Jul 20' },
    { item: '5 workflow patterns — recognize by data-flow shape', when: 'Jul 19 · Jul 21 · Jul 25' }
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
      covered: '5 workflow patterns + recognizing them by data-flow shape',
      insight: 'Read the SHAPE of the flow, not the concept: linear steps = chaining · classify→branch = routing · fan-out→merge = parallelization · runtime decomposition = orchestrator-workers · generate↔evaluate loop = evaluator-optimizer. Real systems compose patterns; the exam asks for the dominant one.',
      analogy: 'chaining = pipeline stages with assertions · parallelization = parallel units / TMR voting · evaluator-optimizer = coverage-closure loop.',
      result: 'Matched (a)=evaluator-optimizer, (b)=parallelization, (c)=routing (guided — reviewing next)'
    }
  ]
};

window.CCARF_JOURNAL = JOURNAL;
