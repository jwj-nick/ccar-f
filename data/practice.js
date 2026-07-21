/* GENERATED FILE — DO NOT EDIT BY HAND.
 * Source: 30_drill_app/practice/ in the private ccar-f-study workspace.
 * Rebuild: node 30_drill_app/build/compile.mjs
 * Only status:reviewed material is included unless built with --include-draft. */
window.CCAR_PRACTICE = {
 "generated_by": "30_drill_app/build/compile.mjs",
 "include_draft": false,
 "items": [
  {
   "id": "d2-2.1-choice-01",
   "domain": "D2",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "2.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.1 (tool descriptions as the primary selection mechanism)"
   ],
   "context": "A support agent exposes two MCP tools. `check_shipment` is described as *\"Returns shipment information\"* and `track_delivery` as *\"Returns delivery information.\"* Both accept an order identifier in the same format. Production logs show that for questions like *\"where is my package?\"* the agent calls `check_shipment` roughly a third of the time, when `track_delivery` is the tool that returns live carrier status.",
   "question": "What is the most effective **first step** to improve tool selection reliability?",
   "explanation": "**B is correct.** Tool descriptions are the primary mechanism the model uses to choose between tools. Two near-identical one-line descriptions give it nothing to discriminate on, so the selection is close to a coin flip. Rewriting them to carry input formats, example queries, and an explicit boundary attacks that root cause directly, and it is the cheapest change available.\n\n**A** is a legitimate architectural choice, not a first step — it is heavier than the problem requires and it discards a distinction the system genuinely has. Consolidation is the answer when two tools *shouldn't* have been separate; here they should.\n\n**C** adds token overhead on every request while leaving the underlying ambiguity in place. Few-shot examples earn their keep on genuinely ambiguous *judgment*, not as a patch for descriptions that were never written.\n\n**D** is over-engineered and bypasses the language understanding that makes the agent useful — keyword matching will misroute the phrasings you did not anticipate.",
   "ko": null,
   "options": [
    {
     "key": "A",
     "text": "Consolidate both tools into a single `logistics_lookup` tool that inspects the request and decides internally which backend to query."
    },
    {
     "key": "B",
     "text": "Expand each description to state the input formats it accepts, example queries it serves, edge cases, and an explicit boundary explaining when to use it rather than the other tool."
    },
    {
     "key": "C",
     "text": "Add six few-shot examples to the system prompt demonstrating that delivery-status questions route to `track_delivery`."
    },
    {
     "key": "D",
     "text": "Add a routing layer that parses the user's message for keywords before each turn and pre-selects the tool."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "d2-2.2-choice-01",
   "domain": "D2",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "2.2",
    "5.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.2 (structured error responses) and TS 5.3 (error propagation)"
   ],
   "context": "In a multi-agent research system, the `search_orders` subagent returns `{\"error\": \"Operation failed\"}` for every unhappy path — an expired credential, an upstream timeout, and a well-formed query that simply matched nothing all produce the same payload. The coordinator has begun retrying everything, including failures that can never succeed, and occasionally reports \"no data available\" when data does exist.",
   "question": "Which **two** changes most directly enable the coordinator to make correct recovery decisions? *(Select 2)*",
   "explanation": "**A and B are correct.**\n\n**A** gives the coordinator the two things it needs to act: what kind of failure this is, and whether trying again could ever help. Without `isRetryable`, retrying a permission error is indistinguishable from retrying a timeout.\n\n**B** fixes the second symptom in the scenario. An empty result is a *successful* query, and treating it as an error is what produces \"no data available\" when the answer is genuinely \"there are none.\" The guide draws this line explicitly: an access failure is not a valid empty result.\n\n**C** is the most tempting distractor because local recovery from transient failures *is* good practice. But blanket retries make the non-retryable cases worse — three round trips before returning the same uninformative string — and the coordinator still ends up with nothing it can reason about. Retry policy is downstream of classification, not a substitute for it.\n\n**D** is an anti-pattern. A single subagent failure should not end a workflow that could still deliver a partial, honestly annotated result.\n\n**E** keeps the response uniform and opaque. It changes who the message reads well for, not whether the coordinator can recover.",
   "ko": null,
   "options": [
    {
     "key": "A",
     "text": "Return the MCP `isError` flag together with structured metadata: an `errorCategory` of transient, validation, business, or permission, plus an `isRetryable` boolean and a human-readable description."
    },
    {
     "key": "B",
     "text": "Distinguish a valid empty result — the query succeeded and matched nothing — from an access failure, rather than reporting both as errors."
    },
    {
     "key": "C",
     "text": "Retry every failure three times with exponential backoff inside the subagent, returning the generic status only once all retries are exhausted."
    },
    {
     "key": "D",
     "text": "Terminate the research workflow whenever any subagent fails, so the problem surfaces immediately instead of being masked by partial output."
    },
    {
     "key": "E",
     "text": "Replace the payload with a customer-friendly message such as \"We couldn't reach the order system right now.\""
    }
   ],
   "answer": [
    "A",
    "B"
   ],
   "multi": true
  },
  {
   "id": "d2-2.2-recall-01",
   "domain": "D2",
   "format": "recall",
   "scenario": null,
   "linked_ts": [
    "2.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.2"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": null,
   "cloze": "An MCP tool signals failure to the agent with the {{isError}} flag.\n\nA useful error payload carries an {{errorCategory}} — one of transient, validation, business, or permission — together with an {{isRetryable}} boolean, so the agent does not spend attempts on failures that cannot succeed.\n\nA subagent should recover locally from {{transient}} failures and propagate only what it cannot resolve, including what it attempted and any {{partial results}}.\n\nAn access failure is not the same thing as a {{valid empty result}}."
  }
 ]
};
