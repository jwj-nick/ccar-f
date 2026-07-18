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
  }
];

window.CCARF_LESSONS = LESSONS;
