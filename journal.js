/* CCAR-F Study — public study journal (distilled). Updated each session by /ccar-log.
 * Full detail (wrong answers, weak items) stays private in the workspace (00_META/sessions, progress.md). App shows the distilled journal only. */

const JOURNAL = {
  updated: '2026-07-13',
  streak: 1,
  location: 'W1 · D1 in progress',

  // Next problem (shown large at the top of the app)
  next: {
    dom: 'D1', ses: 'S2', title: 'Match the 5 workflow patterns',
    problem: 'Which workflow pattern is each of these? — (a) Generate a translation draft → another model rates its quality → revise and repeat. (b) Run summarize, translate, and tone-analysis of one document in parallel, then merge. (c) Classify an incoming ticket by type and route it to a dedicated path.',
    hint: 'Options: prompt chaining · routing · parallelization (sectioning) · orchestrator-workers · evaluator-optimizer. (c) is the same pattern as A from last session.'
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
    { item: 'workflow vs agent criterion (can you predict the path/step count?)', when: 'Jul 14 · Jul 16 · Jul 20' }
  ],

  // Session timeline (rendered newest-first)
  sessions: [
    {
      date: '2026-07-13', dom: 'D1', ses: 'S1', mode: 'pinch',
      covered: 'workflow vs agent boundary',
      insight: 'If code decides the next step at runtime it is a workflow; if the model decides, it is an agent. Litmus test = "can you predict/hardcode the path and step count before running?"',
      analogy: 'directed test = workflow · constrained-random/coverage closure = agent-like. An agent is flexible but costs more and compounds errors.',
      result: 'APPLY judgment (A=workflow, B=agent) correct'
    }
  ]
};

window.CCARF_JOURNAL = JOURNAL;
