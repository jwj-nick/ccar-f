/* GENERATED FILE — DO NOT EDIT BY HAND.
 * Source: 30_drill_app/practice/ in the private ccar-f-study workspace.
 * Rebuild: node 30_drill_app/build/compile.mjs
 * Only status:reviewed material is included unless built with --include-draft. */
window.CCAR_PRACTICE = {
 "generated_by": "30_drill_app/build/compile.mjs",
 "include_draft": false,
 "items": [
  {
   "id": "d1-1.1-choice-01",
   "kind": "domain",
   "domain": "D1",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "1.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.1 (agentic loop control flow, anti-patterns)"
   ],
   "context": "A support agent frequently replies \"Let me look that up for you\" and then produces no answer. Tracing one failed run shows Claude returned a response containing both a `text` block and a `tool_use` block. The harness ends the loop and returns the response as final whenever the response contains any assistant text.",
   "question": "What change fixes the root cause?",
   "explanation": "**C is correct.** `stop_reason` is the signal the API returns for exactly this purpose. A response can legitimately carry explanatory text *and* a tool request in the same turn; branching on the presence of text discards the tool call the model already produced correctly. The harness was wrong, not the model.\n\n**A** treats a harness bug as a prompting problem. Even if the narration stopped, the loop would still be reading the wrong signal, and the next model version narrating again would resurrect the bug.\n\n**B** is the \"fixes a different problem\" distractor. The loop is not running out of iterations — it is exiting on the first one.\n\n**D** doubles down on the actual error. Deciding control flow by parsing natural language is named as an anti-pattern: phrasing shifts with prompt, model version, and language, so the failure reappears in production on inputs you did not test.",
   "ko": "**상황.** 응답에 `text` 블록이 하나라도 있으면 하네스가 루프를 끝낸다. 그런데 그 응답엔 `tool_use` 블록도 같이 있었다.\n\n**정답 C** — `stop_reason`으로 분기. `\"tool_use\"`면 계속, `\"end_turn\"`이면 종료. 응답은 텍스트와 도구 요청을 **동시에** 담을 수 있다.\n\n**가장 매력적인 오답 A**(narration 금지 프롬프트) — 증상(\"에이전트가 까먹은 듯\")과 잘 맞고 싸 보인다. 그러나 루프는 여전히 **틀린 신호**를 읽고, 다음 모델이 다시 narration 하면 버그가 부활한다.\n\n⚠️ **모델은 옳았고 하네스가 틀렸다.** 여기서 프롬프트 수정 선택지는 전부 다른 문제를 고치는 것. D(완료 문구 탐색)는 안티패턴을 더 밀어붙이고, B(상한 올리기)는 조기 종료를 못 고친다.",
   "options": [
    {
     "key": "A",
     "text": "Instruct the model in the system prompt not to narrate its intentions in text before it issues a tool call."
    },
    {
     "key": "B",
     "text": "Raise the loop's maximum iteration count so the agent has room to complete the lookup."
    },
    {
     "key": "C",
     "text": "Branch on `stop_reason` — continue while it is `\"tool_use\"`, finish only when it is `\"end_turn\"`."
    },
    {
     "key": "D",
     "text": "Scan the assistant text for completion phrases and only terminate when one is present."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d1-1.1-recall-01",
   "kind": "domain",
   "domain": "D1",
   "format": "recall",
   "scenario": null,
   "linked_ts": [
    "1.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.1"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": "**빈칸 정답과 이유.**\n\n- `stop_reason` — 루프의 **제어신호**. 추론이 아니라 API가 돌려주는 필드.\n- `tool_use` — 계속할 조건.\n- `end_turn` — 종료 조건.\n- **conversation history** — 도구 결과를 여기 append 해야 다음 반복이 배운 것을 반영한다. 안 하면 같은 호출을 무한 반복.\n- **natural language** — 자연어로 종료 판정 = 안티패턴 1.\n- **iteration cap** — 반복 상한을 *주* 종료조건으로 = 안티패턴 2. (안전망으로는 정당)\n- **text** — 텍스트 존재를 완료로 = 안티패턴 3.\n\n⚠️ 세 안티패턴은 시험에서 그대로 오답 선택지로 나온다.",
   "cloze": "The agentic loop is driven by {{stop_reason}}. The loop continues while its value is {{tool_use}} and terminates when it is {{end_turn}}.\n\nBetween iterations, tool results are appended to the {{conversation history}} so the model can reason about what it just learned.\n\nThree anti-patterns: deciding termination by parsing {{natural language}}, using an {{iteration cap}} as the primary stopping mechanism, and treating the presence of assistant {{text}} as completion."
  },
  {
   "id": "d1-1.2-choice-01",
   "kind": "domain",
   "domain": "D1",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "1.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.2 (risks of overly narrow task decomposition)"
   ],
   "context": "A multi-agent research system is asked to report on the impact of automation on employment. Every subagent completes successfully: the search agent returns well-sourced articles, the analysis agent summarizes them accurately, the synthesis agent produces a coherent, well-cited report.\n\nThe report covers manufacturing in depth and never mentions services, healthcare, agriculture, or clerical work. The coordinator's log shows it decomposed the topic into three subtasks: *automation in automotive manufacturing*, *robotics in warehouse logistics*, and *automated assembly line productivity*.",
   "question": "What is the most likely root cause?",
   "explanation": "**D is correct.** The log is the evidence, and it is decisive: all three subtasks are manufacturing. The subagents executed their assignments correctly — the problem is what they were assigned. Coverage was lost before any of them ran.\n\n**A** blames an agent that was given a manufacturing subtask and researched manufacturing. Broadening queries inside a narrow assignment does not reach healthcare.\n\n**B** requires non-manufacturing sources to have arrived at the analysis agent in the first place. None ever did.\n\n**C** is the most tempting wrong answer because gap detection is a real technique — the guide endorses iterative refinement at the coordinator. But asking the synthesis agent to spot gaps at the last step, holding only manufacturing findings, cannot recover material that was never gathered. It reports the symptom rather than removing the cause.\n\n> When output is coherent but **incomplete**, suspect the decomposition. When output is incoherent or missing, suspect a component.",
   "ko": "**상황.** 모든 subagent가 성공했는데 리포트가 제조업만 다룬다. coordinator 로그의 하위과제 3개가 전부 제조업이다.\n\n**정답 D** — coordinator의 **분해가 너무 좁다**. 커버리지는 subagent가 돌기 전에 이미 잃었다.\n\n**가장 매력적인 오답 C**(종합 에이전트에게 갭 탐지 지시) — iterative refinement는 가이드가 실제로 권하는 기법이라 그럴듯하다. 그러나 제조업 findings만 손에 쥔 마지막 단계에서 갭을 찾아봐야 **수집된 적 없는 자료는 복구되지 않는다.** 증상 보고일 뿐 원인 제거가 아니다.\n\nA·B는 배정된 과제를 정확히 수행한 하류 에이전트를 탓한다.\n\n> **매끄럽지만 불완전 → 분해 의심. 깨졌거나 없음 → 부품 의심.**",
   "options": [
    {
     "key": "A",
     "text": "The search agent's queries are too narrow and should be broadened to reach more sectors."
    },
    {
     "key": "B",
     "text": "The analysis agent's relevance criteria are filtering out non-manufacturing sources."
    },
    {
     "key": "C",
     "text": "The synthesis agent lacks instructions to detect and report coverage gaps in the findings it receives."
    },
    {
     "key": "D",
     "text": "The coordinator's decomposition is too narrow, so the assigned subtasks never covered the question."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "d1-1.2-choice-02",
   "kind": "domain",
   "domain": "D1",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "1.2",
    "1.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.2 (hub-and-spoke, isolated context) and TS 1.3 (context passing)"
   ],
   "context": "A team is designing a coordinator that delegates to four specialized subagents. A reviewer proposes letting subagents call each other directly \"to cut a hop,\" and assumes each subagent will be able to see the coordinator's conversation so far.",
   "question": "Which **two** statements about this design are correct? *(Select 2)*",
   "explanation": "**B and D are correct.**\n\n**B** — the hub-and-spoke shape is not overhead for its own sake. One path through the coordinator is what makes the system observable, gives errors a single consistent handler, and lets the coordinator control which information reaches whom.\n\n**D** — subagent context isolation is the fact this scenario is built on. A subagent starts without the parent's history, so the search results the synthesis agent needs have to be placed in its prompt.\n\n**A** is the trap for anyone optimizing the wrong quantity. It trades away observability and consistent error handling for a hop, and it removes the coordinator's ability to control information flow.\n\n**C** and **E** are the same misconception in two dresses, and it is a strong one because ordinary function calls do let a callee see caller state. Agents do not: there is no automatic inheritance and no shared memory between invocations.",
   "ko": "**상황.** subagent끼리 직접 호출하게 하고, subagent가 coordinator 히스토리를 볼 거라고 가정한 설계 리뷰.\n\n**정답 B, D** —\n- **B** hub-and-spoke는 형식이 아니다. coordinator 경유가 **관측성·일관된 에러처리·정보흐름 통제**를 만든다.\n- **D** subagent는 **격리 컨텍스트**. 필요한 건 프롬프트에 명시해 넣어야 한다.\n\n**가장 매력적인 오답 C·E** — \"피호출자가 호출자 상태를 본다\"는 **일반 프로그래밍 직관**이 그대로 작동할 거라는 착각. 에이전트는 자동 상속도, 호출 간 공유 메모리도 **없다**. 같은 오해의 두 가지 옷.\n\nA는 hop 하나를 아끼려고 관측성과 통제를 내주는 잘못된 최적화.",
   "options": [
    {
     "key": "A",
     "text": "Direct subagent-to-subagent calls are preferable because they remove a hop and reduce coordinator latency on every exchange between specialists."
    },
    {
     "key": "B",
     "text": "Routing inter-subagent communication through the coordinator is what provides observability, consistent error handling, and controlled information flow."
    },
    {
     "key": "C",
     "text": "Subagents automatically inherit the coordinator's conversation history, so earlier findings do not need to be restated in each subagent's prompt."
    },
    {
     "key": "D",
     "text": "Subagents operate with isolated context, so anything a subagent needs must be provided explicitly in the prompt the coordinator sends it."
    },
    {
     "key": "E",
     "text": "Subagents share memory between invocations, so a second call to the same subagent type can rely on the findings the first invocation produced."
    }
   ],
   "answer": [
    "B",
    "D"
   ],
   "multi": true
  },
  {
   "id": "d1-1.3-choice-01",
   "kind": "domain",
   "domain": "D1",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "1.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.3 (parallel spawning via multiple Task calls in one response)"
   ],
   "context": "A coordinator delegates to a web-search subagent and a document-analysis subagent. The two tasks are independent — neither needs the other's output. Measured end to end, the coordinator's wall-clock time is roughly the sum of the two subagents' durations rather than the longer of the two.\n\nInspecting the trace shows the coordinator emits the first `Task` call, waits for its result, then emits the second `Task` call in the following turn.",
   "question": "What change achieves parallel execution?",
   "explanation": "**A is correct.** Parallelism comes from emitting multiple `Task` tool calls **in one response**. Splitting them across separate turns is precisely what serializes them, because each turn waits for the previous turn's results.\n\n**B** invents a parameter. Options that name a plausible-sounding flag that does not exist are a recurring distractor type — if you cannot recall the flag from the objectives, be suspicious of it.\n\n**C** adds a layer that does not change how the underlying calls are issued; the third subagent would face the same one-call-per-turn behaviour, and it breaks hub-and-spoke by pushing delegation away from the coordinator.\n\n**D** addresses how many turns are available, not what happens within a turn. The system is not running out of iterations.",
   "ko": "**상황.** 독립적인 두 subagent인데 벽시계 시간이 둘의 **합**이다. 트레이스를 보니 `Task` 호출을 턴을 나눠 하고 있다.\n\n**정답 A** — **한 응답에 `Task` 호출 여러 개**를 내보내야 병렬이 된다. 턴을 나누면 앞 턴 결과를 기다리므로 필연적으로 순차.\n\n**가장 매력적인 오답 B**(`\"parallel\": true`) — **존재하지 않는 파라미터**. 목표에서 기억나지 않는 플래그가 보이면 의심할 것. 이 시험의 상시 오답 유형이다.\n\nC는 계층만 늘 뿐 호출 방식이 그대로고 hub-and-spoke도 깨진다. D는 턴 *안*이 아니라 턴 *수*를 다룬다.",
   "options": [
    {
     "key": "A",
     "text": "Emit both `Task` calls in a single coordinator response, in the same turn."
    },
    {
     "key": "B",
     "text": "Add `\"parallel\": true` to each `Task` call's parameters so they dispatch together."
    },
    {
     "key": "C",
     "text": "Spawn a third subagent whose role is to run the other two concurrently."
    },
    {
     "key": "D",
     "text": "Increase the coordinator's iteration limit so it can dispatch more work per run."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "d1-1.3-short-01",
   "kind": "domain",
   "domain": "D1",
   "format": "short",
   "scenario": null,
   "linked_ts": [
    "1.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.3"
   ],
   "context": null,
   "question": "A coordinator's `allowedTools` list is `[\"Read\", \"Grep\", \"WebSearch\"]`. It is configured with three `AgentDefinition` entries and its prompt instructs it to delegate research to them, but no subagent is ever spawned. What is wrong, and what else must be true for the spawned subagents to work?",
   "explanation": null,
   "ko": "**채점 포인트(한국어).**\n\n1. **`allowedTools`에 `\"Task\"`가 없다** — 이게 막고 있는 원인. 프롬프트를 어떻게 쓰든, `AgentDefinition`이 몇 개든 위임 자체가 불가능.\n2. subagent 컨텍스트는 **상속되지 않는다** → 필요한 발견을 프롬프트에 넣어야 한다.\n3. 하위과제가 독립적이면 **한 응답에 `Task` 여러 개**로 병렬화.\n4. 실패 원인을 프롬프트 표현이나 `AgentDefinition` 탓으로 돌리지 **않을 것**.",
   "model_answer": "`\"Task\"` is missing from the coordinator's `allowedTools`. Subagents are spawned through the **Task tool**, so a coordinator that lacks it cannot delegate no matter how its prompt is written or how many agent definitions exist.\n\nOnce delegation works, two further conditions matter. First, **context must be passed explicitly in each subagent's prompt** — subagents do not inherit the coordinator's conversation history and share no memory between invocations, so any finding a subagent needs has to be included in what it is sent. Second, if the subtasks are independent, the coordinator should **emit their `Task` calls in a single response** to get parallel execution; spreading them across turns serializes the work.",
   "grading": "- Names `\"Task\"` missing from `allowedTools` as the blocking cause\n- States that subagent context is **not** inherited and must be passed in the prompt\n- Mentions parallelism via multiple `Task` calls in one response\n- Does not attribute the failure to prompt wording or to the `AgentDefinition` entries"
  },
  {
   "id": "d1-1.4-choice-01",
   "kind": "domain",
   "domain": "D1",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "1.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.4 (programmatic enforcement vs prompt-based guidance)"
   ],
   "context": "Company policy requires identity verification before any account balance is modified. In production, roughly 2% of sessions show the agent calling `apply_credit` without a prior successful `verify_identity`. Finance has flagged three incorrect credits this quarter.",
   "question": "What change most effectively addresses this?",
   "explanation": "**B is correct.** When compliance must be deterministic — and money moving on an unverified account is that case — a prompt has a non-zero failure rate while a gate has none. The disallowed call cannot happen regardless of phrasing or context.\n\n**A** is the classic \"valid but insufficient\" distractor. It will likely reduce 2% to something smaller. Smaller is not zero, and the residual failures are exactly the expensive ones.\n\n**C** has the same ceiling as A, and adds token cost to every request. Few-shot examples are the right tool for teaching *judgment* in ambiguous cases, not for guaranteeing a required *sequence*.\n\n**D** is the \"fixes a different problem\" distractor, and a sharp one. It controls **which tools exist**, not **the order they are called in**. Both tools must exist for the workflow to function, so availability was never the lever — the failure is ordering.\n\n> Trigger phrase: when an item says compliance must be **deterministic**, **guaranteed**, or **always**, or the violation is financial or irreversible, reach for a gate or hook.",
   "ko": "**상황.** 잔액 변경 전 신원확인이 정책인데 2% 세션이 `verify_identity` 없이 `apply_credit`을 호출. 잘못된 크레딧 3건 발생.\n\n**정답 B** — prerequisite gate. 결정론적 준수가 필요하고(=돈), 프롬프트 실패율은 0이 아니다.\n\n**가장 매력적인 오답 D**(도구를 빼고 라우팅 분류기로 노출) — 통제처럼 보이지만 **가용성**을 다루지 그 **순서**를 다루지 않는다. 워크플로우가 돌려면 두 도구 다 필요하므로 애초에 지렛대가 아니다. → **availability ≠ ordering**\n\nA(강한 프롬프트)·C(few-shot)는 2%를 줄일 뿐 0으로 못 만든다. 남는 실패가 곧 비싼 실패다.\n\n> 트리거: **deterministic / guaranteed / always**, 또는 금전·비가역 → gate 또는 hook.",
   "options": [
    {
     "key": "A",
     "text": "Strengthen the system prompt to state that `verify_identity` is mandatory before any operation that changes an account balance."
    },
    {
     "key": "B",
     "text": "Add a programmatic prerequisite that blocks `apply_credit` until `verify_identity` has returned a verified identity for the session."
    },
    {
     "key": "C",
     "text": "Add few-shot examples showing the agent calling `verify_identity` first, including cases where the customer volunteers their account number."
    },
    {
     "key": "D",
     "text": "Remove `apply_credit` from the agent's tool set and expose it only after a routing classifier detects a balance-related request."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "d1-1.4-choice-02",
   "kind": "domain",
   "domain": "D1",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "1.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.4 (structured handoff protocols for mid-process escalation)"
   ],
   "context": "When the agent escalates mid-conversation, it calls `escalate_to_human` with a single field: `reason: \"customer requesting refund exceeding policy limit\"`. Human agents pick these up in a queue where the chat transcript is not available to them.\n\nHandle time on escalated cases is roughly triple that of cases the humans take from the start.",
   "question": "What change most directly reduces the handle time?",
   "explanation": "**C is correct.** The human is starting the investigation over because the payload carries no facts. A structured handoff — who the customer is, what the agent determined the underlying problem to be, and what it recommends — lets the human verify and act rather than re-derive.\n\n**A** looks generous and shifts the work rather than removing it. A full transcript makes the human read the entire conversation to extract four facts; it can also be long, and the platform in this scenario does not surface it.\n\n**B** is closer but leaves the facts embedded in prose, so they still have to be dug out, and free-form text drops values inconsistently — the amount appears in one summary and not the next. **Structure is what makes a handoff reliably actionable.**\n\n**D** changes when the human is involved, not what they receive. Escalating earlier with an empty payload produces the same re-investigation, just sooner.",
   "ko": "**상황.** 에스컬레이션 payload가 `reason` 한 줄뿐. 인계받는 사람은 대화기록을 볼 수 없고, 처리시간이 3배.\n\n**정답 C** — **구조화 핸드오프**: 고객ID · 근본원인 · 권고조치. 사람이 재조사 대신 검증·실행을 하게 된다.\n\n**가장 매력적인 오답 A**(전체 대화기록 첨부) — 관대해 보이지만 **일을 옮길 뿐 없애지 않는다.** 사실 4개 뽑으려고 대화 전체를 읽어야 하고, 이 시나리오의 플랫폼은 기록을 보여주지도 않는다.\n\nB는 산문 안에 사실이 묻혀 있어 여전히 파내야 하고 값이 들쭉날쭉. D는 **언제** 사람이 개입하는지를 바꿀 뿐 **무엇을 받는지**는 그대로.\n\n> **구조가 있어야 핸드오프가 실행 가능해진다.**",
   "options": [
    {
     "key": "A",
     "text": "Attach the full conversation transcript to the escalation payload so the human can read everything the agent saw before deciding."
    },
    {
     "key": "B",
     "text": "Have the agent write a friendly paragraph summarizing the conversation and what it found, in natural language, for the human."
    },
    {
     "key": "C",
     "text": "Include structured handoff facts — customer ID, root cause analysis, and recommended action — in the escalation payload."
    },
    {
     "key": "D",
     "text": "Escalate earlier in the conversation so that less context has accumulated by the time the human agent takes the case over."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d1-1.5-choice-01",
   "kind": "domain",
   "domain": "D1",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "1.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.5 (PostToolUse hooks for data normalization)"
   ],
   "context": "An agent reads from three MCP tools. One returns timestamps as Unix epoch integers, one as ISO 8601 strings, and one as a numeric status code that encodes a date range. The agent regularly misorders events and occasionally reports a shipment as arriving before it was dispatched.",
   "question": "What is the most effective way to fix this?",
   "explanation": "**B is correct.** This is exactly what `PostToolUse` is for: intercept tool *results* and transform them before the model processes them. One consistent shape reaches the agent, and the reasoning problem disappears rather than being managed.\n\n**A** makes format conversion part of the model's job on every single call. It will mostly work and will keep failing occasionally — and it spends context on a mechanical transformation that code does perfectly.\n\n**C** has the same ceiling as A. Few-shot examples earn their keep on ambiguous judgment, not on deterministic data conversion.\n\n**D** may be right in the long run and is unavailable in the short run — you typically do not control third-party MCP servers, and the guide's framing of this problem assumes heterogeneous sources you must accommodate. As an exam option it is the \"solves it somewhere else\" distractor.\n\n> Hooks give **deterministic guarantees**; prompts give **probabilistic compliance**. Normalization is deterministic work.",
   "ko": "**상황.** MCP 도구 3개가 Unix epoch / ISO 8601 / 숫자 상태코드로 제각각 시각을 준다. 에이전트가 순서를 틀리고 배송 전 도착을 보고한다.\n\n**정답 B** — `PostToolUse` 훅으로 모델이 보기 **전에** 형식을 통일. 추론 문제가 관리 대상이 아니라 **사라진다**.\n\n**가장 매력적인 오답 A**(프롬프트로 변환 설명) — 매 호출마다 변환을 모델의 일로 만든다. 대체로 되고 가끔 틀린다. 코드가 완벽히 하는 기계적 변환에 컨텍스트를 쓴다.\n\nC는 A와 같은 한계(few-shot은 모호한 **판단**에 쓰는 것). D(서버 소유자에게 요청)는 남의 손에 있고 장기 과제다.\n\n> **hook은 결정론적 보장, prompt는 확률적 준수.** 정규화는 결정론적 작업이다.",
   "options": [
    {
     "key": "A",
     "text": "Add instructions to the system prompt describing each tool's timestamp format and how the model should convert between them."
    },
    {
     "key": "B",
     "text": "Implement a `PostToolUse` hook that normalizes timestamps to a single format before the model sees the results."
    },
    {
     "key": "C",
     "text": "Provide few-shot examples that demonstrate correctly ordering events drawn from all three sources and their differing formats."
    },
    {
     "key": "D",
     "text": "Ask the owners of the three MCP servers to change their response formats so that all three emit the same timestamp encoding."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "d1-1.5-recall-01",
   "kind": "domain",
   "domain": "D1",
   "format": "recall",
   "scenario": null,
   "linked_ts": [
    "1.5",
    "1.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.4 and TS 1.5"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": "**빈칸 정답과 이유.**\n\n- `PostToolUse` — 도구 **결과**를 가로채 모델이 보기 **전에** 손본다.\n- **normalizing** — 대표 용도. Unix timestamp / ISO 8601 / 숫자 상태코드가 뒤섞여 오는 걸 하나로 통일. 안 하면 모델이 매 호출마다 변환을 하고, 가끔 틀린다.\n- **compliance** — **나가는** 호출을 가로채는 훅의 용도. 임계 초과 환불 차단 등.\n- **human escalation** — 차단 후 보내는 대체 워크플로우.\n- **deterministic** / **probabilistic** — 한 줄 원칙: 훅은 결정론적 보장, 프롬프트는 확률적 준수.\n- `get_customer` — prerequisite gate 예시. 이게 **검증된 customer ID를 반환하기 전까지** `process_refund`를 막는다.\n\n⚠️ 두 방향을 헷갈리지 말 것: **들어오는 결과 정규화**(`PostToolUse`) vs **나가는 호출 차단**(interception).",
   "cloze": "A {{PostToolUse}} hook intercepts tool results and transforms them **before** the model processes them — the standard use is {{normalizing}} heterogeneous data formats.\n\nA hook that intercepts **outgoing** tool calls enforces {{compliance}} rules, for example blocking a refund above a threshold and redirecting to {{human escalation}}.\n\nThe principle behind choosing either one: hooks provide {{deterministic}} guarantees, while prompt instructions provide only {{probabilistic}} compliance.\n\nA prerequisite gate blocks a downstream tool call until a prior step has completed — for example, blocking `process_refund` until {{get_customer}} has returned a verified customer ID."
  },
  {
   "id": "d1-1.6-choice-01",
   "kind": "domain",
   "domain": "D1",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "1.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.6 (splitting reviews to avoid attention dilution)"
   ],
   "context": "An automated review analyzes an 18-file pull request in a single pass. The output is uneven: three files get detailed, specific feedback while others get one-line generic comments. Two obvious null-dereference bugs are missed, and the same error-handling pattern is flagged as a defect in one file and approved in another within the same review.",
   "question": "How should the review be restructured?",
   "explanation": "**A is correct.** The symptom set — uneven depth, missed obvious bugs, contradictory judgments on identical code — is attention dilution across too many files at once. Per-file passes restore consistent depth; a separate integration pass recovers what only cross-file analysis can see, so nothing is traded away.\n\n**B** shifts the burden onto developers and does not improve the system. It also fragments exactly the cross-file view that a PR is supposed to provide.\n\n**C** is the most seductive option because \"more context\" sounds like it addresses \"too much content.\" It does not: the files already fit. **A larger window does not fix attention quality within a window.**\n\n**D** sounds rigorous and is actively harmful here. It treats intermittency as noise, but the scenario already tells you the reviews are inconsistent, so requiring consensus across runs *suppresses* exactly the real findings that are caught only some of the time — which, given the observed inconsistency, is most of them.",
   "ko": "**상황.** 18개 파일 PR을 한 번에 리뷰 → 깊이 들쭉날쭉, 명백한 버그 누락, **같은 패턴을 한 파일에선 지적하고 다른 파일에선 승인**.\n\n**정답 A** — 파일별 로컬 패스 + 별도 교차 파일 통합 패스. 깊이는 회복되고, 교차 관점도 잃지 않는다.\n\n**가장 매력적인 오답 C**(더 큰 컨텍스트 창) — \"내용이 너무 많다\"에 \"컨텍스트를 늘린다\"가 대응처럼 들린다. 하지만 **파일은 이미 다 들어간다.** ⚠️ **창을 키운다고 창 안의 주의 품질이 좋아지지 않는다.**\n\nD(3회 독립 리뷰 후 2회 이상 등장한 것만)는 엄밀해 보이지만 **해롭다** — 간헐적으로 잡히는 진짜 발견을 억누른다. B는 부담을 개발자에게 떠넘기고 PR의 교차 시야를 깬다.",
   "options": [
    {
     "key": "A",
     "text": "Split into focused passes — analyze each file individually for local issues, then run a separate integration pass over cross-file data flow."
    },
    {
     "key": "B",
     "text": "Require that pull requests be split into batches of three to four files before the review runs, so each pass sees a smaller diff."
    },
    {
     "key": "C",
     "text": "Move to a model with a larger context window so that all 18 files and their dependencies fit comfortably inside a single pass."
    },
    {
     "key": "D",
     "text": "Run three independent full-PR reviews and report only the findings that appear in at least two of the three, discarding the rest as unstable noise."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "d1-1.6-choice-02",
   "kind": "domain",
   "domain": "D1",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "1.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.6 (fixed sequential vs dynamic adaptive decomposition)"
   ],
   "context": "Two tasks are queued for an agent working in a large repository.\n\n**Task 1** — for each file changed in a pull request, check naming conventions, error handling, and test coverage, then produce one consolidated report.\n\n**Task 2** — \"add comprehensive tests to this legacy service.\" Nobody on the team knows which parts are untested, how the modules depend on each other, or where the risk concentrates.",
   "question": "Which decomposition strategy fits each task?",
   "explanation": "**D is correct.** The test is whether the *subtasks* can be enumerated before starting, not whether the *data* is known.\n\nTask 1's aspects — naming, error handling, coverage — are fixed and listed in the request. The file list varies, but the steps do not. That is prompt chaining: a known sequence applied to whatever arrives.\n\nTask 2's subtasks can only be derived from what earlier steps discover. You map the structure, find where risk concentrates, and build a prioritized plan that keeps adapting as dependencies surface. No useful plan exists before exploration.\n\n**A** confuses \"the input is unknown\" with \"the steps are unknown.\" Task 1's steps were given to you.\n\n**B** would force Task 2 into a plan authored in ignorance — the plan would be wrong by the second step.\n\n**C** inverts both.",
   "ko": "**상황.** 과제 1 = PR 변경 파일마다 네이밍·에러처리·테스트커버리지 점검 후 통합 리포트. 과제 2 = \"레거시 서비스에 포괄적 테스트 추가\"(무엇이 미테스트인지 아무도 모름).\n\n**정답 D** — 과제 1은 **고정 순차(prompt chaining)**, 과제 2는 **동적 적응 분해**.\n\n⚠️ **판단 기준은 \"입력을 아는가\"가 아니라 \"단계를 미리 열거할 수 있는가\"다.** 과제 1의 항목(네이밍·에러처리·커버리지)은 요청에 이미 적혀 있다. 파일 목록은 변해도 **단계는 고정**이다.\n\n**가장 매력적인 오답 A**(둘 다 동적) — \"코드베이스 내용을 미리 모른다\"를 \"단계를 모른다\"로 착각. 과제 1의 단계는 이미 주어졌다.\n\nB는 과제 2를 무지 상태에서 세운 계획에 가둔다. C는 둘을 뒤집었다.",
   "options": [
    {
     "key": "A",
     "text": "Both need dynamic adaptive decomposition, because both operate on a codebase whose contents are not known in advance."
    },
    {
     "key": "B",
     "text": "Both need fixed sequential decomposition, because both tasks have a definable end state and a deliverable to produce."
    },
    {
     "key": "C",
     "text": "Task 1 needs dynamic adaptive decomposition; Task 2 needs fixed sequential decomposition (prompt chaining)."
    },
    {
     "key": "D",
     "text": "Task 1 needs fixed sequential decomposition (prompt chaining); Task 2 needs dynamic adaptive decomposition."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "d1-1.7-choice-01",
   "kind": "domain",
   "domain": "D1",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "1.7"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.7 (resumption vs starting fresh with a structured summary)"
   ],
   "context": "On Monday a named session mapped a payment module, traced its dependencies, and settled on a migration plan. On Monday night a teammate merged a substantial refactor of that same module — files renamed, several functions moved.\n\nOn Tuesday you want to continue implementing the plan.",
   "question": "What is the most reliable way to continue?",
   "explanation": "**C is correct.** The session's history contains **tool results** — file contents, listings, traces — that were true on Monday and are false now. Resuming carries every one of them forward as though current. A structured summary carries the *decisions* (\"we chose plan B; the blocker is the circular import\") without the stale *observations*, and telling it what changed lets it re-read only what matters.\n\n**A** is the intuition being tested: resuming preserves the most, so it must be best. It preserves the wrong things. The agent will confidently reference functions that no longer exist.\n\n**B** is the worst of both. You pay full re-exploration cost while the stale results remain in context, where they can contradict fresh observations. It reads as thorough, which is why it is offered.\n\n**D** misapplies `fork_session`, which is for exploring **divergent approaches** from a shared baseline — comparing two migration strategies, say. Branching does not make stale tool results current.\n\n> The pivot word is **stale**. Resume when prior context is mostly still valid; start fresh with a summary when it is not.",
   "ko": "**상황.** 월요일에 결제 모듈을 분석했는데, 월요일 밤 동료가 그 모듈을 대폭 리팩터(파일 이름 변경·함수 이동). 화요일에 이어서 구현하려 한다.\n\n**정답 C** — **새 세션 + 구조화 요약**(+ 무엇이 바뀌었는지 메모). 세션 히스토리의 **도구 결과**(파일 내용·목록·트레이스)는 월요일엔 참이었고 지금은 거짓이다.\n\n**가장 매력적인 오답 A**(그냥 resume) — 이게 시험이 노리는 직관이다. \"가장 많이 보존되니 최선\". **보존되는 게 잘못된 것들**이고, 에이전트는 지운 함수를 자신 있게 언급한다.\n\nB(resume 후 전부 재탐색)는 **양쪽의 최악** — 재탐색 비용을 다 내면서 낡은 결과가 컨텍스트에 남아 새 관찰과 충돌한다. 철저해 보여서 제시된다. D는 `fork_session`의 오용(분기는 **갈라지는 접근** 비교용이지 낡은 결과를 최신으로 만들지 않는다).\n\n> 축은 **stale** 한 단어.",
   "options": [
    {
     "key": "A",
     "text": "Resume the Monday session with `--resume`; its analysis is the most complete context available."
    },
    {
     "key": "B",
     "text": "Resume the Monday session and immediately instruct it to re-explore the entire module from scratch before continuing."
    },
    {
     "key": "C",
     "text": "Start a new session and inject a structured summary of the decisions, plus a note about what changed."
    },
    {
     "key": "D",
     "text": "Use `fork_session` from the Monday session so the stale branch is preserved separately from the new line of work."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d1-1.7-short-01",
   "kind": "domain",
   "domain": "D1",
   "format": "short",
   "scenario": null,
   "linked_ts": [
    "1.7"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 1.7"
   ],
   "context": null,
   "question": "You have completed an expensive shared analysis of a codebase and want to evaluate two different refactoring strategies against it. Which session mechanism fits, and why is repeatedly resuming the same session a poor substitute?",
   "explanation": null,
   "ko": "**채점 포인트(한국어).**\n\n1. **`fork_session`** 을 지목하고, 공유 baseline에서 **분기**한다는 점을 설명.\n2. **독립성 문제** — 같은 세션을 두 번 resume하면 첫 탐색의 추론이 대화에 남아 두 번째를 앵커링한다. \"B를 그 자체로 검토한 것\"이 아니라 \"이미 A로 논증을 마친 뒤의 B\"가 된다.\n3. **비용** — fork는 비싼 공유 분석을 재사용한다. 두 branch가 그 작업을 한 번 값으로 얻는다.\n4. **fork(분기)와 resume(계속)을 같은 것의 정도 차이로 취급하지 않을 것.** 둘은 다른 질문에 답한다.\n\n⚠️ 이 문항의 핵심은 \"무엇이 더 많이 보존되나\"가 아니라 **\"두 탐색이 서로 오염되지 않는가\"** 다.",
   "model_answer": "Use **`fork_session`** to create two independent branches from the shared analysis baseline. Each branch starts with the same knowledge, explores one strategy, and neither can affect the other — which is what makes the comparison meaningful.\n\nResuming the same session twice is a poor substitute because the two explorations would not be independent. After the first strategy is worked through, that reasoning is in the conversation; the second exploration inherits it and is anchored by an argument the model has already made. You would be comparing \"strategy B considered on its own merits\" against \"strategy B considered after having talked itself into strategy A.\"\n\nThe cost side also matters: forking reuses the shared analysis rather than repeating it, so both branches get the expensive groundwork for the price of doing it once.",
   "grading": "- Names `fork_session` and describes branching from a shared baseline\n- Explains the independence problem — the first exploration's reasoning contaminates the second\n- Notes that forking avoids repeating the expensive shared analysis\n- Distinguishes forking (branching) from resuming (continuing) rather than treating them as degrees of the same thing"
  },
  {
   "id": "d2-2.1-choice-01",
   "kind": "domain",
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
   "explanation": "**B is correct.** Tool descriptions are the primary mechanism the model uses to choose between tools. Two near-identical one-line descriptions give it nothing to discriminate on, so the selection is close to a coin flip. Rewriting them to carry input formats, example queries, and an explicit boundary attacks that root cause directly, and it is the cheapest change available.\n\n**A** is a legitimate architectural choice, not a first step — it is heavier than the problem requires and it discards a distinction the system genuinely has. Consolidation is the answer when two tools *shouldn't* have been separate; here they should.\n\n**C** teaches the split by example rather than by contract: it adds token overhead on every request while leaving the underlying ambiguity in place, so any phrasing outside the six demonstrated cases still meets two interchangeable descriptions. Few-shot examples earn their keep on genuinely ambiguous *judgment*, not as a patch for descriptions that were never written.\n\n**D** is over-engineered and bypasses the language understanding that makes the agent useful. A fixed keyword list is the giveaway — *package*, *delivery*, and *shipment* appear in questions for both tools, and every phrasing you did not anticipate misroutes by construction.",
   "ko": "**상황.** `check_shipment`(\"Returns shipment information\")와 `track_delivery`(\"Returns delivery information\") — 한 줄짜리 거의 동일한 description, 같은 입력 형식. \"where is my package?\"가 1/3 확률로 엉뚱한 쪽으로 간다.\n\n**정답 B — description 확장(input formats · example queries · edge cases · 상대 도구와의 명시적 boundary).** tool description이 선택의 **1차 메커니즘**이다. 판별할 재료가 없으니 선택은 사실상 동전던지기고, B는 그 근본 원인을 직접 치면서 가장 싸다.\n\n**가장 매력적인 오답 A(하나로 consolidate).** 정당한 아키텍처 선택이긴 하다 — 그래서 매력적이다. 하지만 **\"most effective first step\"**은 비례성 신호이고, A는 문제보다 무겁고 **시스템이 실제로 갖고 있는 구분을 버린다.** consolidate는 두 도구가 애초에 나뉘지 말았어야 할 때의 답이다. 여기선 나뉘는 게 맞다.\n\nC(few-shot) = 모호한 표면을 그대로 둔 채 매 요청 토큰을 낸다. few-shot은 정보 공백이 아니라 **진짜 판단**에 쓴다. D(keyword routing layer) = 과설계 + 예상 못 한 표현에서 깨진다.",
   "options": [
    {
     "key": "A",
     "text": "Consolidate both tools into a single `logistics_lookup` tool that inspects the request and decides internally which backend to query, so that the model never has to choose between them at all."
    },
    {
     "key": "B",
     "text": "Expand each description to state the input formats it accepts, example queries it serves, edge cases, and an explicit boundary explaining when to use it rather than the other tool."
    },
    {
     "key": "C",
     "text": "Add six few-shot examples to the system prompt demonstrating that delivery-status questions route to `track_delivery`, so the model learns the split from worked cases."
    },
    {
     "key": "D",
     "text": "Add a routing layer that scans the user's message for keywords such as *package*, *delivery*, and *shipment* before each turn and pre-selects the tool for the model."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "d2-2.1-choice-02",
   "kind": "domain",
   "domain": "D2",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "2.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.1 (splitting generic tools into purpose-specific tools with defined input/output contracts)"
   ],
   "context": "A research pipeline exposes one tool, `analyze_document(document_id, instruction)`, described as *\"Analyzes a document and returns the analysis.\"* Three downstream consumers use it: a table builder that needs discrete data points, a briefing step that needs prose, and a fact-check step that needs a verdict on a specific claim.\n\nThe instrumentation shows the trouble is not selection — there is only one tool, and it is always called. It is the contract. Roughly a third of calls return a paragraph where the caller expected a list of values, the fact-check step regularly receives a summary that never addresses the claim it passed in, and one request with `instruction: \"summarize and check the pricing claim\"` produced a blended answer that satisfied neither consumer.",
   "question": "What change most directly fixes this?",
   "explanation": "**D is correct.** One tool is doing three jobs whose *outputs* have nothing in common, and no description can make a single return shape be simultaneously a list of values, a paragraph, and a verdict. Purpose-specific tools give each consumer a fixed input/output contract, and the blended-instruction case stops being expressible at all.\n\n**A** is the \"valid but insufficient\" distractor. An enum removes the phrasing lottery, but the tool still returns a different shape depending on the mode, so downstream code cannot rely on anything, and nothing prevents a caller from wanting two modes at once.\n\n**B** patches the caller's wording probabilistically while the output contract stays undefined. Few-shot examples are for teaching judgment in ambiguous cases, not for manufacturing a contract that does not exist.\n\n**C** is the most attractive wrong answer, because \"rewrite the description with formats, examples, edge cases and boundaries\" is the standard remedy in this task statement — and it is genuinely the right answer when the failure is *misrouting between similar tools*. Read the symptom: nothing is being misrouted here. Better prose about one overloaded tool leaves the overload in place.\n\n> Description work fixes **selection**. Splitting fixes **overloading**. Ask which one the logs actually show.",
   "ko": "**상황.** 도구는 `analyze_document(document_id, instruction)` **하나뿐**이고 항상 호출된다. 소비자는 셋(데이터 포인트 / 산문 브리핑 / 주장 검증)인데 반환 형태가 제각각이고, `\"summarize and check the pricing claim\"` 같은 혼합 지시까지 나온다.\n\n**정답 D — `extract_data_points` / `summarize_content` / `verify_claim_against_source`로 split.** 한 도구가 **출력이 서로 공통점 없는 세 가지 일**을 하고 있다. 어떤 description도 하나의 반환 형태를 동시에 값 목록·문단·판정으로 만들 수 없다. split하면 소비자별로 입출력 계약이 고정되고 혼합 지시는 **표현 자체가 불가능**해진다.\n\n**가장 매력적인 오답 C(description 확장).** 이 task statement의 표준 처방이라서 매력적이고, 실패가 **비슷한 도구 간 오라우팅**일 때는 실제로 정답이다. ⚠️ **증상을 읽어라 — 여기선 아무것도 misroute되지 않는다.** 과부하된 한 도구에 더 좋은 산문을 붙여도 과부하는 그대로다.\n\nA(instruction을 enum으로 제한) = 맞지만 불충분. 표현 복불복은 없애지만 반환 형태는 여전히 모드마다 달라 다운스트림이 기댈 게 없다. B(few-shot) = 호출자 문구를 확률적으로 손볼 뿐 **존재하지 않는 계약을 만들어내지 못한다**.\n\n> description 작업은 **selection**을 고치고, split은 **overloading**을 고친다. 로그가 어느 쪽인지 먼저 보라.",
   "options": [
    {
     "key": "A",
     "text": "Constrain `instruction` to one of `\"extract\"`, `\"summarize\"`, or `\"verify\"` and state the three permitted values in the tool's description."
    },
    {
     "key": "B",
     "text": "Add few-shot examples to the system prompt showing the correct `instruction` phrasing for each of the three downstream needs."
    },
    {
     "key": "C",
     "text": "Expand the tool's description with input formats, example queries, edge cases, and an explicit boundary for each mode it supports."
    },
    {
     "key": "D",
     "text": "Split it into `extract_data_points`, `summarize_content`, and `verify_claim_against_source`, each with its own input and output contract."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "d2-2.1-short-01",
   "kind": "domain",
   "domain": "D2",
   "format": "short",
   "scenario": "customer-support",
   "linked_ts": [
    "2.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.1 (impact of system prompt wording on tool selection; keyword-sensitive instructions)"
   ],
   "context": null,
   "question": "A support agent has two tools. `search_knowledge_base` is described in detail — internal product documentation, accepted query formats, example questions, and an explicit boundary saying to use it for anything about this company's own products. `search_web` is described just as carefully for third-party and external sources. A review confirmed the descriptions are clearly differentiated with no functional overlap.\n\nEven so, whenever a customer's message contains the word *\"documentation\"* or *\"docs\"*, the agent calls `search_web` and answers from unrelated public pages. The same question phrased without those words routes correctly. The system prompt contains the line: *\"When customers ask about documentation, always consult the latest published sources.\"*\n\nWhy are the tool descriptions not winning, and what do you change?",
   "explanation": null,
   "ko": "**상황.** `search_knowledge_base` / `search_web` 둘 다 상세히 기술됐고 기능 겹침도 없다고 리뷰까지 끝났다. 그런데 고객 메시지에 *\"documentation\"* / *\"docs\"*가 들어가면 항상 `search_web`으로 샌다. 그 단어를 빼면 정상 라우팅. system prompt에 *\"When customers ask about documentation, always consult the latest published sources.\"*\n\n**채점 포인트(영어로 답할 때 이 4개가 들어가야 함):**\n- **원인 지목** — system prompt의 그 줄. **keyword-sensitive instruction이 의도치 않은 도구 연상을 만든다.** 트리거 단어가 있을 때만 재현된다는 사실이 곧 증거.\n- **원리 진술** — tool description은 선택의 **primary** 메커니즘이지 **유일한** 입력이 아니다. system prompt 문구는 **잘 쓴 description도 덮어쓸 수 있다.**\n- **수정** — 그 줄을 **키워드 규칙이 아니라 의도**로 재작성(제품 문서 질문은 내부 KB, 웹검색은 서드파티·외부 소스). 그리고 **트리거 단어를 포함한 채로 재테스트** — 단어를 피한 테스트는 버그를 재현하지 못한다.\n- **하지 말 것을 명시** — description을 더 다듬거나, 이름을 바꾸거나, few-shot을 얹는 것. 실패하는 부분이 거기가 아니고, 프롬프트 줄이 계속 덮어쓰는 동안 비용만 는다.\n\n⚠️ 이 문항의 함정은 **\"description을 고친다\"가 D2의 기본 반사**라는 것. 문제가 이미 \"리뷰 결과 description은 명확히 구분됨\"이라고 못 박았으면 답은 반드시 **다른 곳**에 있다.",
   "model_answer": "Tool descriptions are the **primary** mechanism for selection, not the only input. The system prompt sits alongside them, and a keyword-sensitive instruction in it can create an unintended tool association that overrides a well-written description. Here the words *\"documentation\"* and *\"latest published sources\"* bind the trigger word straight to web search, which is exactly the observed routing, and it explains why the same question routes correctly when the trigger word is absent.\n\nThe change is to **review the system prompt for keyword-sensitive instructions** and rewrite that line to express the actual intent rather than a keyword rule — for example, that product documentation questions are served from the internal knowledge base, and web search is for third-party or external sources. Then re-test with the trigger words present, since a phrasing test that avoids them will not reproduce the bug.\n\nWhat not to do: further rewriting of the descriptions, renaming the tools, or adding few-shot examples. The description work is not the failing part, and each of those adds cost while the prompt line keeps overriding it.",
   "grading": "- Identifies the system prompt line as the cause — a keyword-sensitive instruction creating an unintended tool association\n- States that system prompt wording can override even well-written tool descriptions\n- Fixes by rewriting the instruction to state intent rather than a keyword rule, and re-tests with the trigger word present\n- Explicitly declines to keep improving descriptions or add few-shot examples, since those are not what is failing"
  },
  {
   "id": "d2-2.2-choice-01",
   "kind": "domain",
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
   "ko": "**상황.** `search_orders` subagent가 모든 비정상 경로에 `{\"error\": \"Operation failed\"}` 하나만 돌려준다 — 만료된 크리덴셜도, 상위 timeout도, **매치가 0건인 정상 질의**도. coordinator는 전부 재시도하고, 데이터가 있는데도 가끔 \"no data available\"이라 보고한다. **(2개 선택)**\n\n**정답 A, B.**\n- **A** — `isError` + `errorCategory`(transient/validation/business/permission) + `isRetryable` + 사람이 읽을 설명. coordinator가 행동하려면 **\"어떤 종류의 실패인가\"와 \"다시 해서 될 일인가\"** 둘이 필요하다. `isRetryable` 없이는 permission 재시도와 timeout 재시도가 구별되지 않는다.\n- **B** — **access failure와 valid empty result 분리.** 시나리오의 두 번째 증상(\"데이터가 있는데 no data available\")이 정확히 여기서 나온다. 빈 결과는 **성공한 질의**다.\n\n**가장 매력적인 오답 C(subagent 안에서 exponential backoff 3회 후 generic status).** transient의 **로컬 복구는 실제로 옳은 관행**이라 끌린다. ⚠️ 그러나 blanket retry는 재시도 불가 케이스를 **더 나쁘게** 만들고(같은 무정보 문자열을 얻는 데 왕복 3회), coordinator는 여전히 추론할 재료가 없다. **retry 정책은 분류의 하위에 있지, 분류의 대체재가 아니다.**\n\nD(어떤 subagent든 실패하면 워크플로우 종료) = 안티패턴. 부분 결과 + 정직한 주석으로 갈 수 있는 일을 끝낸다. E(고객 친화 문구로 교체) = **누구에게 잘 읽히는지**를 바꿀 뿐, coordinator의 복구 가능성은 그대로.",
   "options": [
    {
     "key": "A",
     "text": "Return the MCP `isError` flag with structured metadata: an `errorCategory` of transient, validation, business, or permission, plus an `isRetryable` boolean and a readable description."
    },
    {
     "key": "B",
     "text": "Distinguish a valid empty result — the query succeeded and matched nothing — from an access failure, rather than reporting both with the same error payload."
    },
    {
     "key": "C",
     "text": "Retry every failure three times with exponential backoff inside the subagent, returning the generic status to the coordinator only once all retries are exhausted."
    },
    {
     "key": "D",
     "text": "Terminate the research workflow whenever any subagent fails, so the problem surfaces immediately instead of being masked by partial output that looks complete."
    },
    {
     "key": "E",
     "text": "Replace the payload with a single customer-friendly message such as \"We couldn't reach the order system right now, please try again shortly.\""
    }
   ],
   "answer": [
    "A",
    "B"
   ],
   "multi": true
  },
  {
   "id": "d2-2.2-choice-02",
   "kind": "domain",
   "domain": "D2",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "2.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.2 (local error recovery in subagents; propagating partial results and what was attempted)"
   ],
   "context": "A `fetch_sources` subagent is asked for twelve sources. On one run it retrieved eleven, then the twelfth host returned HTTP 503. The subagent abandoned the task and returned `{\"isError\": true, \"errorCategory\": \"transient\", \"isRetryable\": true}` to the coordinator, discarding the eleven documents it already had.\n\nThe coordinator, reading `isRetryable: true`, re-ran the whole subagent from scratch. The second run re-fetched all eleven successfully and failed on a *different* host. The report shipped about four minutes late with no sources attached.",
   "question": "What change most directly fixes this?",
   "explanation": "**C is correct.** Transient failures should be recovered **locally, inside the subagent**, and only what cannot be resolved there is propagated — together with the partial results and an account of what was attempted. That keeps the eleven successful fetches, keeps retry traffic scoped to the one host that failed, and hands the coordinator something it can actually act on.\n\n**A** is the most attractive wrong answer, because retrying a transient failure with exponential backoff is genuinely correct practice — it just puts it at the wrong layer. The retry unit here is the *whole subagent*, so each attempt repeats eleven successful fetches to reach the one that failed, multiplies cost and latency, and, as the second run demonstrates, gives every additional host a fresh chance to fail. Backoff paces the retries; it does not shrink what is being retried. This is the \"valid but heavier than needed\" shape: the right technique, applied one level too high.\n\n**B** stops the retry loop by mislabeling the error. The failure genuinely is retryable; asserting otherwise destroys the classification the coordinator depends on and would suppress recovery for failures that a single local retry would have cleared. The workflow proceeds, but it proceeds with the batch written off and all eleven sources still discarded.\n\n**D** changes how the message reads, not whether anything is recovered. Readable prose in place of a category code is strictly worse for a machine consumer, and the eleven sources are still thrown away: the coordinator receives no partial results and no record of what was attempted.\n\n> All-or-nothing subagents are the failure here. A subagent that cannot finish should still return **what it got**, **what it tried**, and **what stopped it**.",
   "ko": "**상황.** `fetch_sources`가 12개 중 11개를 받아놓고 12번째 호스트가 503. subagent는 **11개를 버리고** `{isError, transient, isRetryable: true}`만 올렸다. coordinator는 전체를 처음부터 재실행 → 11개 재수집 후 **다른** 호스트에서 실패. 4분 늦게, 소스 없이 리포트 발행.\n\n**정답 C — subagent가 transient를 로컬 재시도하고, 그래도 못 풀면 11개를 partial results로 + 시도한 것/실패한 것 기술과 함께 반환.** transient는 **subagent 내부에서** 복구하고, 못 푼 것만 전파한다. 성공한 11건이 보존되고, 재시도 트래픽이 실패한 한 호스트에만 국한되며, coordinator는 실제로 행동 가능한 것을 받는다.\n\n**가장 매력적인 오답 A(coordinator가 최대 3회 재시도).** transient 재시도는 **진짜로 옳은 기법**이라 매력적이다 — 다만 **레이어가 한 단계 위**다. ⚠️ coordinator에서 재시도하면 실패한 1건에 닿으려고 성공한 11건을 반복하고, 비용·지연이 곱해지며, **2차 실행이 보여줬듯 모든 호스트에 새로 실패할 기회를 준다.** 전형적인 *valid but heavier than needed*.\n\nB(transient에 `isRetryable: false`로 보고) = 오분류로 루프를 끊는 것. coordinator가 의존하는 분류 자체를 파괴한다. D(고객 친화 메시지) = 11개는 여전히 버려지고, 시도 기록도 없다.\n\n> 올인-오어-낫싱 subagent가 진짜 실패다. 못 끝낸 subagent도 **뭘 얻었는지 · 뭘 시도했는지 · 뭐가 막았는지**는 반드시 올려야 한다.",
   "options": [
    {
     "key": "A",
     "text": "Have the coordinator retry the whole `fetch_sources` subagent up to three times with exponential backoff before giving up on the batch, so a transient host failure has several chances to clear."
    },
    {
     "key": "B",
     "text": "Have the subagent report `isRetryable: false` on transient failures so the coordinator stops re-running it, records the batch as failed, and lets the rest of the workflow proceed without the delay."
    },
    {
     "key": "C",
     "text": "Have the subagent retry the transient failure locally, and if it still cannot resolve it, return the eleven retrieved sources as partial results with a description of what was attempted and what failed."
    },
    {
     "key": "D",
     "text": "Have the subagent return `isError: true` with a customer-friendly message explaining that one source was temporarily unreachable, so that the coordinator receives readable prose rather than a bare category code."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d2-2.2-choice-03",
   "kind": "domain",
   "domain": "D2",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "2.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.2 (error categories; retriable: false and customer-friendly explanations for business rule violations)"
   ],
   "context": "`issue_refund` refuses any order older than the 30-day policy window. For those refusals it returns `{\"isError\": true, \"errorCategory\": \"transient\", \"isRetryable\": true}`.\n\nProduction logs show the agent retrying such calls three times over about nine seconds and then telling the customer *\"our refund system is temporarily unavailable, please try again later.\"* Roughly 300 customers a week are told this. Most call back within a day, hear the real answer from a human, and CSAT on those conversations has fallen sharply.",
   "question": "What change fixes the root cause?",
   "explanation": "**A is correct.** The refusal is a **business error** — a policy violation, not an outage. Categorizing it correctly, flagging it non-retryable, and attaching a customer-friendly explanation lets the agent stop wasting attempts that can never succeed *and* say something true to the customer. Both symptoms in the scenario come from the same misclassification.\n\n**B** treats the stopwatch. Nine seconds of pointless retries become three, which is a real improvement to the wait and no improvement at all to the answer: the customer still gets a false explanation, just sooner, and still calls back.\n\n**C** is the most attractive wrong answer, and it is the \"fixes a different problem\" distractor — a prerequisite gate is a real technique, and blocking a call that can only be refused sounds like it removes the whole failure. But nothing here is calling a tool it should not; the tool is being called correctly and answering badly, and a blocked call leaves the agent with no result at all to explain from. A gate also duplicates policy logic outside the system of record, and it leaves every other policy path in `issue_refund` mislabeled as transient.\n\n**D** borrows a real distinction — a **valid empty result** is a successful query that matched nothing and must not be reported as an error — and then applies it to something that is not one. The discriminator the guide gives you is the **business error** category: a refusal on policy grounds is an error whose recovery is *explain and offer an alternative*, which requires both an error signal and customer-facing wording. `isError: false` supplies neither. The agent is told the call succeeded, so it has no reason to surface a problem, and a bare `POLICY_WINDOW_EXPIRED` gives it nothing to say to the customer. `isError: true` with `errorCategory: \"business\"` and `isRetryable: false` is exactly the shape for it.\n\n> Four categories, four different recoveries: **transient** → retry; **validation** → fix the input; **business** → explain and offer an alternative; **permission** → escalate. A payload that says \"transient\" for all four buys you nothing.",
   "ko": "**상황.** `issue_refund`가 30일 정책 위반 거부를 `errorCategory: \"transient\", isRetryable: true`로 반환. 에이전트는 9초간 3회 재시도 후 *\"환불 시스템이 일시적으로 이용 불가\"*라고 말한다. 주당 300명이 이 거짓말을 듣고 대부분 다시 전화해 사람에게 진짜 이유를 듣는다. CSAT 급락.\n\n**정답 A — business error로 반환(`isRetryable: false` + 고객이 이해할 정책 설명).** 이건 **정책 거부이지 장애가 아니다.** 올바르게 분류하고 non-retryable로 표시하고 설명을 실으면, 결코 성공할 수 없는 시도를 멈추는 것 **그리고** 고객에게 참인 말을 하는 것이 동시에 해결된다. 시나리오의 두 증상이 **같은 오분류 하나**에서 나온다.\n\n**가장 매력적인 오답 C(prerequisite gate — 주문일이 30일 창 밖이면 `issue_refund` 호출 자체를 차단).** gate는 실제 기법이고, \"어차피 거부될 호출을 막는다\"는 말은 문제 전체를 없애는 것처럼 들린다. 하지만 이건 *fixes a different problem*이다 — 여기선 부르면 안 될 도구를 부르는 게 아니라, **옳게 불린 도구가 나쁘게 답하는 것**이다. 차단하면 에이전트에게는 설명할 결과 자체가 남지 않는다. 게다가 정책 로직을 system of record 밖에 복제하고, `issue_refund`의 다른 정책 경로들은 여전히 transient로 오라벨된 채 남는다.\n\nD(`isError: false` + 본문에 원시 정책 코드 `POLICY_WINDOW_EXPIRED`, 고객용 문구 없음)는 **진짜 구분(valid empty result는 에러가 아니다)을 빌려와** 해당되지 않는 곳에 쓴다. 판별 기준은 가이드의 **business error 범주**다 — 정책 거부는 복구법이 *설명 + 대안 제시*인 에러이고, 그러려면 **에러 신호**와 **고객이 이해할 문구**가 둘 다 필요하다. `isError: false`는 둘 다 주지 않는다. B(재시도 3→1) = 스톱워치만 손봄. 9초가 3초가 될 뿐, 여전히 거짓 설명이다.\n\n> 4범주 4복구: **transient**→retry · **validation**→입력 수정 · **business**→설명+대안 제시 · **permission**→escalate.",
   "options": [
    {
     "key": "A",
     "text": "Return the refusal as a business error with `isRetryable: false` and a customer-friendly explanation of the policy, so the agent can state the real reason and offer what is available instead."
    },
    {
     "key": "B",
     "text": "Lower the agent's retry limit from three to one so the customer reaches the fallback message in about three seconds instead of nine, shortening the dead wait."
    },
    {
     "key": "C",
     "text": "Add a prerequisite gate that blocks `issue_refund` from being called at all unless the order date falls inside the 30-day policy window, so the refusal path never runs."
    },
    {
     "key": "D",
     "text": "Return `isError: false` with the raw policy code `POLICY_WINDOW_EXPIRED` in the result body and no customer-facing wording, on the grounds that a refused policy decision is not a system failure."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "d2-2.2-recall-01",
   "kind": "domain",
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
   "ko": "**빈칸 정답과 왜 중요한가:**\n\n- **`isError`** — MCP 도구가 에이전트에게 실패를 알리는 플래그. ⚠️ 이것 **하나만**으로는 \"뭔가 잘못됨\"뿐이라 복구를 못 고른다. 그래서 나머지가 필요하다.\n- **`errorCategory`** — transient / validation / business / permission. 시험은 이 **4범주를 영어 단어 그대로** 묻는다.\n- **`isRetryable`** — boolean. 재시도를 **추측이 아니라 데이터**로 만든다. 성공할 수 없는 실패에 시도를 쓰지 않게 하는 필드.\n- **`transient`** — subagent가 **로컬에서 복구**해야 할 유일한 범주. 나머지 셋은 재시도해도 그대로다.\n- **`partial results`** — 못 푼 것을 올릴 때 **시도한 내용**과 함께 반드시 실어야 하는 것. 이게 있어야 coordinator가 부분 커버리지로 진행하며 공백을 주석할 수 있다.\n- **`valid empty result`** — access failure와 **다르다**. 성공한 질의의 0건은 에러가 아니라 **답**이다.\n\n⚠️ 마지막 줄이 D2·D5 양쪽에서 반복 출제되는 한 문장이다: *an access failure is not a valid empty result.*",
   "cloze": "An MCP tool signals failure to the agent with the {{isError}} flag.\n\nA useful error payload carries an {{errorCategory}} — one of transient, validation, business, or permission — together with an {{isRetryable}} boolean, so the agent does not spend attempts on failures that cannot succeed.\n\nA subagent should recover locally from {{transient}} failures and propagate only what it cannot resolve, including what it attempted and any {{partial results}}.\n\nAn access failure is not the same thing as a {{valid empty result}}."
  },
  {
   "id": "d2-2.3-choice-01",
   "kind": "domain",
   "domain": "D2",
   "format": "choice",
   "scenario": "structured-extraction",
   "linked_ts": [
    "2.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.3 (tool_choice configuration)"
   ],
   "context": "An extraction pipeline must always run `extract_metadata` before any enrichment tool touches the document. Today the model sometimes replies with a prose summary instead of calling any tool at all, and sometimes calls an enrichment tool first.",
   "question": "Which `tool_choice` configuration guarantees that `extract_metadata` is the tool called on this turn?",
   "explanation": "**C is correct.** Forced tool selection names the tool the model must call, which is the only one of the three `tool_choice` settings that constrains *which* tool runs. The remaining steps then proceed in follow-up turns.\n\n**A** leaves the model free to answer in text — exactly the failure described — and relies on prompt compliance for ordering.\n\n**B** guarantees that *a* tool is called but not *which* one, so the enrichment-first failure survives.\n\n**D** would technically work but rebuilds the tool set per turn to express something `tool_choice` expresses directly; it is the heavier path to the same guarantee.\n\n> *Draft — authored ahead of study. Promote to `reviewed` only after TS 2.3 is worked through in a session.*",
   "ko": "**상황.** `extract_metadata`가 enrichment 도구보다 **먼저** 돌아야 한다. 현재는 아무 도구도 안 부르고 산문으로 답하기도 하고, enrichment를 먼저 부르기도 한다.\n\n**정답 C — `tool_choice: {\"type\": \"tool\", \"name\": \"extract_metadata\"}`, 나머지 enrichment는 follow-up turns에서 처리.** 세 설정 중 **어느 도구가 도는지를 구속하는 유일한 것**이 forced selection이다.\n\n**가장 매력적인 오답 B(`\"any\"`).** 두 증상 중 하나(산문 응답)를 실제로 없애기 때문에 매력적이다. ⚠️ 하지만 `\"any\"`는 *어떤* 도구가 불린다는 것만 보장하고 *어느* 도구인지는 보장하지 않는다 → **enrichment-먼저 실패가 그대로 생존한다.**\n\nA(`\"auto\"` + 프롬프트로 순서 지시) = 텍스트 경로가 합법으로 남아 있고(= 서술된 실패 그 자체), 순서를 프롬프트 준수에 맡긴다. D(`extract_metadata` 빼고 전부 제거했다가 나중에 재추가) = 기술적으로는 되지만, `tool_choice`가 직접 표현하는 것을 위해 매 턴 도구 집합을 재구성하는 **더 무거운 길**.\n\n⚠️ 기억할 경계: **forced는 그 턴 하나만 고정한다.** \"여러 턴에 걸친 순서 보장\"이 필요하면 답은 `tool_choice`가 아니라 D1의 prerequisite gate.",
   "options": [
    {
     "key": "A",
     "text": "`tool_choice: \"auto\"`, with the required ordering — metadata first, then enrichment — stated in the system prompt."
    },
    {
     "key": "B",
     "text": "`tool_choice: \"any\"`, so the model must call one of the available tools on this turn rather than replying in prose."
    },
    {
     "key": "C",
     "text": "`tool_choice: {\"type\": \"tool\", \"name\": \"extract_metadata\"}`, then handle the enrichment steps in follow-up turns."
    },
    {
     "key": "D",
     "text": "Remove every tool except `extract_metadata` from the request for this turn, then re-add the enrichment tools afterwards."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d2-2.3-choice-02",
   "kind": "domain",
   "domain": "D2",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "2.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.3 (too many tools degrade selection; scoped tool access; scoped cross-role tools for high-frequency needs)"
   ],
   "context": "A coordinator hands the same 18-tool set to all four of its subagents, on the reasoning that any agent might need any capability.\n\nTwo weeks of traces show the synthesis agent issuing web searches on 12% of its turns instead of synthesizing what it was given, the citation agent calling `create_ticket`, and a wrong-tool rate near 20% across all four agents. Separately, the synthesis agent has one genuine cross-role need: it checks a single fact against a source roughly forty times a day, and each check currently makes a round trip through the coordinator.",
   "question": "Which **two** changes should be made? *(Select 2)*",
   "explanation": "**B and E are correct.**\n\n**B** attacks the stated principle head-on: an agent holding 18 tools instead of the 4–5 its role needs makes selection harder for itself, and tools outside an agent's specialization get misused — a synthesis agent that *can* search the web will eventually search the web. Removing the capability removes the misuse; it does not have to be resisted.\n\n**E** is the counterweight that keeps scoping from becoming dogma. A legitimate, high-frequency cross-role need gets a narrow tool of its own rather than forty coordinator round trips a day, while the complex cases still go through the coordinator. Scoped access means *the tools the role needs*, not *the fewest tools imaginable*.\n\n**A** is the most attractive wrong answer, because \"fewer tools improve selection\" is literally the principle in play — it just applies the count to the wrong thing. Collapsing 18 distinct capabilities into 5 multi-purpose ones hides real distinctions behind generic descriptions and recreates the overlapping-description problem one layer down. Every agent would still see every capability; only the labels would get worse.\n\n**C** guarantees that *a* tool is called, not *which* one. It targets a symptom nobody reported — the agents are calling tools enthusiastically — and would push a confused agent to pick something rather than answer honestly.\n\n**D** gives misrouted calls more room to happen. More turns is not a selection mechanism.",
   "ko": "**상황.** coordinator가 4개 subagent 전원에게 같은 18개 도구를 준다. synthesis 에이전트가 턴의 12%를 웹검색에 쓰고, citation 에이전트가 `create_ticket`을 부르며, 전체 wrong-tool rate ~20%. 별개로 synthesis 에이전트는 하루 ~40회 사실 확인이라는 **진짜 교차역할 필요**가 있고 매번 coordinator를 왕복한다. **(2개 선택)**\n\n**정답 B, E.**\n- **B — 역할에 필요한 도구로 scoping.** 18개 대신 4–5개. **역할 밖 도구는 오용된다** — 웹검색을 *할 수 있는* synthesis 에이전트는 결국 웹검색을 한다. **능력을 없애면 참을 필요가 없어진다.**\n- **E — 고빈도 교차역할 필요에 좁은 `verify_fact` 하나.** 스코핑이 교조가 되지 않게 하는 균형추. **scoped access = \"역할이 필요로 하는 도구\", \"상상 가능한 최소 개수\"가 아니다.** 복잡한 검증은 여전히 coordinator 경유.\n\n**가장 매력적인 오답 A(18개를 5개 다목적 도구로 consolidate).** \"도구가 적으면 선택이 좋아진다\"는 **바로 이 문항의 원리 그 자체**라서 가장 끌린다. ⚠️ 개수를 **엉뚱한 대상**에 적용한 것이다. 서로 다른 18개 능력을 5개로 뭉치면 실제 구분이 generic description 뒤로 숨어 **overlapping-description 문제를 한 층 아래에서 재생산**한다. 게다가 **모든 에이전트가 여전히 모든 능력을 본다** — 라벨만 나빠질 뿐.\n\nC(`tool_choice: \"any\"`) = 아무도 보고하지 않은 증상을 겨냥. 에이전트들은 이미 도구를 열심히 부르고 있다. 오히려 헷갈리는 에이전트를 **정직한 답 대신 뭐라도 고르게** 민다. D(iteration limit 상향) = 오라우팅에 더 많은 여지를 준다. **턴 수는 선택 메커니즘이 아니다.**",
   "options": [
    {
     "key": "A",
     "text": "Consolidate the 18 tools into 5 multi-purpose tools, so every agent chooses from a shorter list with fewer near-identical options to weigh."
    },
    {
     "key": "B",
     "text": "Scope each subagent's tool set to the tools its role actually requires, so the synthesis agent has no web-search tool available to misuse."
    },
    {
     "key": "C",
     "text": "Set `tool_choice: \"any\"` on each subagent so that it must call one of its tools rather than replying in conversational text when it is unsure."
    },
    {
     "key": "D",
     "text": "Raise each subagent's iteration limit so that a misrouted call still leaves turns available for the agent to notice and correct it later in the run."
    },
    {
     "key": "E",
     "text": "Give the synthesis agent one scoped cross-role tool, `verify_fact`, for the high-frequency check, while complex verification still routes through the coordinator."
    }
   ],
   "answer": [
    "B",
    "E"
   ],
   "multi": true
  },
  {
   "id": "d2-2.3-recall-01",
   "kind": "domain",
   "domain": "D2",
   "format": "recall",
   "scenario": null,
   "linked_ts": [
    "2.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.3"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": "**빈칸 정답과 왜 중요한가:**\n\n- **selection** — 도구 과다가 떨어뜨리는 것은 tool **selection** 신뢰도. \"성능\"이 아니라 선택 신뢰도라는 단어를 기억할 것.\n- **decision complexity** — 그 이유. 18개 vs 4–5개는 **결정 문제의 난이도**를 키운다. 남는 도구는 얌전히 안 쓰이는 게 아니라 매 턴 오선택 확률을 올린다.\n- **misused** — 역할(specialization) 밖 도구는 **오용된다**. synthesis 에이전트가 웹검색으로 손이 간다.\n- **`any`** — 모델이 **텍스트 대신 도구를 부르도록** 보장. ⚠️ 어느 도구인지는 보장하지 않음.\n- **which tool** — forced `{\"type\": \"tool\", \"name\": \"...\"}`가 **추가로** 보장하는 것.\n- **`auto`** — 부를지 말지 **그리고** 무엇을 부를지 **둘 다** 모델에게 남긴다 = 보장 없음. ⚠️ 시험 가이드는 세 설정을 나열만 할 뿐 **기본값을 명시하지 않는다** — \"auto가 기본값\"은 API 사실이지 가이드가 시험 범위로 말하는 내용이 아니다.\n- **`load_document`** — generic `fetch_url`을 대체하는 **constrained tool**(문서 URL을 검증). 오용의 한 부류를 **구조적으로** 제거한다 = D1의 \"보장 > 지시\"를 도구 표면에 적용한 것.",
   "cloze": "Giving an agent 18 tools where 4–5 would do degrades tool {{selection}} reliability by increasing {{decision complexity}}, and tools outside an agent's specialization tend to get {{misused}} — a synthesis agent reaching for web search.\n\nThe guide enumerates three `tool_choice` settings. `\"{{auto}}\"` leaves both decisions — whether to call a tool at all, and which one — to the model. `tool_choice: \"{{any}}\"` guarantees the model calls a tool rather than returning conversational text, while forced selection `{\"type\": \"tool\", \"name\": \"...\"}` additionally guarantees {{which tool}} is called.\n\nA generic tool can be replaced with a constrained alternative — swapping `fetch_url` for a {{load_document}} tool that validates document URLs."
  },
  {
   "id": "d2-2.4-choice-01",
   "kind": "domain",
   "domain": "D2",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "2.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.4 (project-level .mcp.json vs user-level ~/.claude.json; environment variable expansion; tools available at connection time)"
   ],
   "context": "A team relies on a Jira MCP server that works on exactly one engineer's machine, where it is defined in `~/.claude.json`.\n\nTwo things have gone wrong. A new engineer cloned the repository and found the agent had no Jira tools at all — it invented ticket numbers when asked to summarize the sprint. And an earlier attempt to share the setup committed a config file containing the literal API token, which the security team flagged within a day.",
   "question": "Which **two** changes address this? *(Select 2)*",
   "explanation": "**A and D are correct.**\n\n**A** is the scope distinction this task statement turns on: project-level `.mcp.json` is for **shared team tooling** that should travel with the repository; user-level `~/.claude.json` is for **personal or experimental** servers. A new clone getting no Jira tools is the textbook symptom of team tooling parked in personal scope.\n\n**D** is what makes A safe. Environment variable expansion in `.mcp.json` lets the committed file name the credential without containing it, which is precisely the failure the security team caught.\n\n**B** is the tempting half-measure — it is not wrong that a README helps, and it avoids a config change. But it keeps shared tooling in personal scope, so every machine drifts independently and onboarding is a manual step that will be skipped. Version control is the mechanism that already solves this.\n\n**C** is \"valid but heavier than needed.\" Jira is a standard integration with existing community MCP servers; the guidance is to use those and reserve custom servers for genuinely team-specific workflows. Writing and maintaining one to solve a config-scope problem is a large detour.\n\n**E** describes behaviour that does not exist. Tools from **all configured MCP servers are discovered at connection time and are available simultaneously** — there is no per-request connection gating. If the concern were tool-set size, the lever is scoping which tools an agent gets (TS 2.3), not deferring server connections.",
   "ko": "**상황.** 팀이 쓰는 Jira MCP 서버가 엔지니어 **한 명의 `~/.claude.json`**에만 있다. 새 엔지니어는 clone 후 Jira 도구가 아예 없어 에이전트가 티켓 번호를 지어냈고, 이전에 공유하려던 시도는 **API 토큰 리터럴을 커밋**해 보안팀에 걸렸다. **(2개 선택)**\n\n**정답 A, D.**\n- **A — repo에 커밋되는 project-scoped `.mcp.json`으로 이동.** 이 task statement의 축은 **누가 받는가**다: project `.mcp.json` = **팀 공용 도구**, user `~/.claude.json` = **개인·실험용**. 새 clone에 도구가 없는 건 팀 도구가 개인 스코프에 주차된 교과서적 증상.\n- **D — `${JIRA_API_TOKEN}` 환경변수 확장.** A를 안전하게 만드는 짝. 커밋된 파일이 **크리덴셜을 담지 않고 이름만 부른다.**\n\n**가장 매력적인 오답 B(각자 `~/.claude.json` 유지 + README에 설정 절차 문서화).** README가 도움이 된다는 게 틀린 말은 아니고 config 변경도 피하니 매력적인 **절충안**처럼 보인다. ⚠️ 그러나 공용 도구가 개인 스코프에 남아 **머신마다 따로 표류**하고, 온보딩이 **건너뛰어질 수동 단계**가 된다. 이미 이 문제를 푸는 메커니즘이 version control이다.\n\nC(자체 Jira MCP 서버 제작) = *valid but heavier than needed*. Jira는 표준 통합이고 **community MCP server 우선**이 지침. config 스코프 문제를 풀려고 유지보수 대상을 새로 떠안는 큰 우회.\n\n⚠️ **E는 존재하지 않는 동작이다.** \"Jira 요청이 올 때만 연결\" 같은 건 없다 — **모든 설정된 MCP 서버의 도구는 connection time에 발견되어 동시에 가용**하다. 도구 집합 크기가 걱정이면 지렛대는 서버 연결 지연이 아니라 **에이전트별 도구 스코핑(TS 2.3)**.",
   "options": [
    {
     "key": "A",
     "text": "Move the server definition into a project-scoped `.mcp.json` committed with the repository, so every clone gets the same tooling."
    },
    {
     "key": "B",
     "text": "Leave the server in each engineer's `~/.claude.json` and document the setup steps in the repository README so newcomers can reproduce it."
    },
    {
     "key": "C",
     "text": "Build a custom in-house Jira MCP server so that the team owns the integration and its credential handling from end to end."
    },
    {
     "key": "D",
     "text": "Reference the credential as `${JIRA_API_TOKEN}` in the config so each engineer's value comes from their own environment and no secret is committed."
    },
    {
     "key": "E",
     "text": "Configure the server to connect only when a Jira-related request arrives, so its tools do not occupy the tool set the rest of the time."
    }
   ],
   "answer": [
    "A",
    "D"
   ],
   "multi": true
  },
  {
   "id": "d2-2.4-choice-02",
   "kind": "domain",
   "domain": "D2",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "2.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.4 (MCP resources as content catalogs to reduce exploratory tool calls)"
   ],
   "context": "Asked *\"which service owns the retry logic for payment webhooks?\"*, the agent spends its first 18 tool calls finding out what exists: listing repositories, listing documentation directories, then opening several pages to see what they cover. Only after that does it start answering. Median time to first useful sentence is 40 seconds, and about 70% of those calls turn out to be discovery rather than retrieval.\n\nThe internal MCP server already maintains a documentation hierarchy and an issue index — the agent simply has no visibility into either until it probes.",
   "question": "What change most reduces the exploratory calls?",
   "explanation": "**C is correct.** MCP **resources** exist to expose content catalogs — issue summaries, documentation hierarchies, database schemas — so an agent knows what is available instead of discovering it by trial. Seventy percent of the calls are the agent asking \"what is there?\", and a catalog answers that question once rather than eighteen times.\n\n**A** is the \"fixes a different problem\" distractor. Nothing is running out of turns; the turns are being spent badly. More budget for wasteful discovery makes the median slower, not faster.\n\n**B** names a flag that does not exist. `.mcp.json` carries server definitions and environment variable expansion, not a catalog prefetch switch. Treat any option that hinges on a config key you cannot place with suspicion.\n\n**D** is the most attractive wrong answer, because enriching descriptions is a real and frequently correct move in this task statement — it is the fix when the agent is choosing the *wrong tool*. Here the agent's problem is not which tool to call but **not knowing what content exists**. Even a perfectly described search tool has to be given a guess about what to search for, and the guessing is the cost.\n\n> Description work changes **which tool** gets called. Resources change **how much the agent has to discover before it can call anything**.",
   "ko": "**상황.** \"어느 서비스가 payment webhook 재시도 로직을 소유하나?\" 질문에 에이전트가 **첫 18번의 도구 호출을 \"뭐가 있는지 알아내는 데\"** 쓴다(repo 나열 → 문서 디렉터리 나열 → 몇 페이지 열어보기). 호출의 ~70%가 retrieval이 아니라 discovery. 내부 MCP 서버는 문서 계층과 이슈 인덱스를 **이미 갖고 있는데 에이전트가 볼 방법이 없다.**\n\n**정답 C — 문서 계층과 이슈 인덱스를 MCP `resources`로 노출.** MCP **resource**는 바로 이 용도다 — 이슈 요약·문서 계층·DB schema 같은 **content catalog**를 노출해 에이전트가 시행착오 없이 **무엇이 있는지 보게** 한다. \"뭐가 있나?\"를 18번이 아니라 한 번에 답한다.\n\n**가장 매력적인 오답 D(`search_docs`에 훨씬 풍부한 description).** description을 강화하는 건 이 도메인에서 **자주 정답**이라 끌린다 — 다만 그건 에이전트가 **틀린 도구를 고를 때**의 수정이다. ⚠️ 여기서 문제는 어느 도구를 부를지가 아니라 **어떤 콘텐츠가 존재하는지 모른다는 것**. 완벽히 기술된 검색 도구조차 **무엇을 검색할지 추측**을 받아야 하고, 그 추측이 곧 비용이다.\n\nA(iteration limit 상향) = *fixes a different problem*. 턴이 모자란 게 아니라 **잘못 쓰이고** 있다. B(`\"prefetch\": true`) = **존재하지 않는 플래그**. `.mcp.json`은 서버 정의와 환경변수 확장을 담지 catalog prefetch 스위치를 담지 않는다. ⚠️ **자리를 짚을 수 없는 config key에 기대는 선택지는 일단 의심하라.**\n\n> description은 **어느 도구가 불릴지**를 바꾸고, resource는 **뭐라도 부르기 전에 얼마나 탐색해야 하는지**를 바꾼다.",
   "options": [
    {
     "key": "A",
     "text": "Raise the agent's iteration limit so that the exploration phase reliably completes before the agent runs out of turns to answer in."
    },
    {
     "key": "B",
     "text": "Add `\"prefetch\": true` to the server's entry in `.mcp.json` so that the documentation catalog is loaded once when the connection opens."
    },
    {
     "key": "C",
     "text": "Expose the documentation hierarchy and the issue index as MCP **resources**, so the agent can see what content exists without probing for it."
    },
    {
     "key": "D",
     "text": "Add a `search_docs` tool with a much richer description covering formats and example queries, so the agent searches directly instead of listing directories."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d2-2.4-short-01",
   "kind": "domain",
   "domain": "D2",
   "format": "short",
   "scenario": "developer-productivity",
   "linked_ts": [
    "2.4",
    "2.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.4 (enhancing MCP tool descriptions so the agent stops preferring built-in tools; community servers for standard integrations)"
   ],
   "context": null,
   "question": "Your team added an MCP server exposing `search_code_index`, which serves a pre-built semantic index across all 40 of the organization's repositories. Its description reads *\"Searches the code index.\"*\n\nIn practice the agent almost always reaches for the built-in `Grep` against the local checkout instead, so answers about cross-repository usage are systematically incomplete — it reports three callers of a shared helper when there are nineteen. The MCP server is connected and healthy; the tool is present in every session.\n\nExplain what is happening and what you change. Then comment on a teammate's next proposal: writing a custom MCP server for Jira.",
   "explanation": null,
   "ko": "**상황.** 40개 repo를 아우르는 사전 구축 semantic index를 서빙하는 `search_code_index`의 description이 *\"Searches the code index.\"* 뿐. 에이전트는 거의 항상 built-in `Grep`을 로컬 체크아웃에 쓰고, 그래서 cross-repo 답이 체계적으로 불완전하다(공유 헬퍼 호출자를 19개 중 3개만 보고). 서버는 연결돼 있고 도구도 매 세션 존재한다.\n\n**채점 포인트:**\n- **가용성 문제 아님을 먼저 배제** — 모든 설정된 서버의 도구는 **connection time에 발견되어 동시에 존재**한다. 문제는 **selection**이고, **description이 selection의 메커니즘**이다.\n- **왜 지는지** — *\"Searches the code index\"*는 무엇이 인덱싱됐는지, 무엇이 돌아오는지, **왜 모델이 이미 잘 아는 도구를 이겨야 하는지**를 아무것도 말하지 않는다. **익숙한 built-in 앞에서 얇은 description은 진다.**\n- **수정** — MCP 도구 description을 **강화**: 로컬 체크아웃이 아니라 **40개 repo 전체**를 커버한다는 사실, 받는 질의 형태와 반환 형태, 그리고 **명시적 boundary** — cross-repo·semantic 질문은 `search_code_index`, 현재 작업본 안의 정확한 리터럴 매치는 `Grep`. **비슷한 두 도구를 구별하는 것과 같은 규율을 built-in/MCP 경계에 적용하는 것.**\n- **`Grep` 제거·비활성화는 거부** — 더 무겁고, 정당한 로컬 검색을 망가뜨리며, **모델이 그걸 선호한 이유가 아니라 증상을 친다.**\n- **Jira 제안에 대해** — **기존 community MCP server 선호.** Jira는 표준 통합이고, 커스텀 구현은 이미 해결된 것의 유지보수를 떠안는 일. **커스텀 서버는 community가 커버하지 않는 팀 특유 워크플로우용으로 남긴다.**",
   "model_answer": "The MCP tool is available — tools from all configured servers are discovered at connection time and are present simultaneously — so availability is not the problem. Selection is, and **descriptions are the mechanism for selection**. *\"Searches the code index\"* says nothing about what is indexed, what comes back, or why it would ever beat a tool the model already knows well. Against a familiar built-in, a thin description loses.\n\nThe fix is to **enrich the MCP tool's description**: state that it covers all 40 repositories rather than the local checkout, describe the query forms it accepts and the shape of what it returns, and give an explicit boundary — use `search_code_index` for cross-repository and semantic questions, use `Grep` for exact literal matches inside the current working copy. That is the same discipline as differentiating two similar tools, applied across the built-in/MCP line.\n\nRemoving or disabling `Grep` would be a heavier fix that breaks legitimate local searches, and it treats the symptom rather than the reason the model preferred it.\n\nOn Jira: prefer an existing **community MCP server**. Jira is a standard integration, and a custom implementation means owning the maintenance of something already solved. Reserve custom servers for team-specific workflows that no community server covers.",
   "grading": "- Identifies the thin MCP tool description as the cause, and notes the tool is already available — connection is not the issue\n- Enriches the description with capabilities, outputs, and an explicit boundary versus `Grep`\n- Rejects removing `Grep` as heavier and symptom-directed\n- Recommends an existing community MCP server for Jira, reserving custom servers for team-specific workflows"
  },
  {
   "id": "d2-2.5-choice-01",
   "kind": "domain",
   "domain": "D2",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "2.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.5 (Grep for content search, Glob for path patterns, incremental codebase understanding, tracing through wrapper modules)"
   ],
   "context": "The task is: *\"find every caller of `normalizeInvoice` and update them.\"*\n\nThe agent begins by reading all 214 files under `src/`. Around 60% of the way through it is out of room, and it produces a caller list that stops at whatever it had seen. It also misses a group of callers entirely: `billing/index.ts` re-exports `normalizeInvoice` under the local name `normalize`, and everything downstream of that wrapper calls it by the alias.",
   "question": "Which approach should the agent have taken?",
   "explanation": "**B is correct.** It is the documented shape for building codebase understanding **incrementally**: `Grep` locates entry points by content, `Read` follows only what the matches point at, and tracing across a wrapper means first identifying the exported names and then searching for each one. That second `Grep` pass is what recovers the aliased callers — the ones the exhaustive read missed even where it did read them.\n\n**A** is the most attractive wrong answer because it appears to solve the visible symptom: batching keeps context from overflowing. But it still reads all 214 files to answer a question about a single identifier, so it is enormously more expensive, and it does nothing about the alias — the callers say `normalize`, and reading everything does not tell you that name matters. It also misuses `Glob`, which matches **file paths**, for a job that is about **file contents**.\n\n**C** assumes callers live in files whose names mention invoices. File naming is not a content index; `Glob` is for patterns like `**/*.test.tsx`, not for guessing where a function is used.\n\n**D** reimplements `Grep` through the shell and then falls back into reading a large file list wholesale. It adds a moving part without changing the method, and the alias is still invisible.\n\n> `Grep` = search **contents**. `Glob` = match **paths**. Reading everything up front is not thoroughness, it is the thing incremental tracing replaces.",
   "ko": "**상황.** \"`normalizeInvoice`의 모든 호출자를 찾아 고쳐라.\" 에이전트는 `src/` 아래 214개 파일을 **전부 읽기** 시작했고, 60% 지점에서 컨텍스트가 바닥나 본 데까지의 목록만 냈다. 게다가 `billing/index.ts`가 `normalize`라는 로컬 이름으로 re-export해서 **별칭 호출자 전체를 놓쳤다.**\n\n**정답 B — `Grep`으로 진입점 → 매치된 파일 + wrapper만 `Read` → 발견한 export 이름마다 다시 `Grep`.** 문서화된 **incremental** 코드베이스 이해의 형태 그대로다. wrapper를 가로지르려면 **먼저 export된 이름들을 식별한 뒤 각 이름을 검색**한다. 별칭 호출자를 되찾는 건 **두 번째 `Grep` 패스**다.\n\n**가장 매력적인 오답 A(`Glob`으로 `src/**/*.ts` → 컨텍스트 안 넘치게 배치로 `Read`).** 눈에 보이는 증상(컨텍스트 오버플로)을 해결하는 것처럼 보여서 가장 끌린다. ⚠️ 그러나 **식별자 하나를 묻는 질문에 여전히 214개를 다 읽고**, 별칭 문제는 전혀 못 고친다 — 호출자는 `normalize`라고 쓰여 있고, **전부 읽는다고 그 이름이 중요하다는 걸 알게 되진 않는다.** 또한 **경로 매칭용 `Glob`을 내용에 관한 일에 오용**한다.\n\nC = 호출자가 파일명에 invoice를 담고 있으리라 가정. **파일 이름은 내용 인덱스가 아니다.** D = `Grep`을 셸로 재구현한 뒤 결국 큰 파일 목록을 통째로 읽는다. 부품만 늘고 방법은 그대로, 별칭도 여전히 보이지 않는다.\n\n> `Grep` = **내용** 검색. `Glob` = **경로** 매칭. 전부 미리 읽기는 철저함이 아니라, incremental tracing이 대체하려는 바로 그것.",
   "options": [
    {
     "key": "A",
     "text": "`Glob` for `src/**/*.ts`, then `Read` each match in batches small enough that context never overflows, accumulating the caller list across batches until every file has been seen."
    },
    {
     "key": "B",
     "text": "`Grep` for `normalizeInvoice` to find entry points, `Read` only the matching files plus the wrapper to follow the re-export, then `Grep` again for each exported name it discovers."
    },
    {
     "key": "C",
     "text": "`Read` the wrapper module first to learn what it re-exports, then `Glob` for files whose names contain `invoice` and read those, on the assumption that callers sit in invoice-named files."
    },
    {
     "key": "D",
     "text": "Run a `Bash` pipeline that lists every file mentioning invoicing, then have the agent read the resulting file list in full and pick the callers out of it by hand."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "d2-2.5-choice-02",
   "kind": "domain",
   "domain": "D2",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "2.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.5 (Edit uses unique text matching; Read + Write as the fallback when no unique anchor exists)"
   ],
   "context": "The agent must change the timeout in the `payments` block of `services.config.ts` from 30 to 60.\n\nIts `Edit` call with `old_string: \"  timeout: 30,\"` fails: the string occurs in four service blocks. The four blocks are byte-identical for twelve consecutive lines, and the only thing distinguishing them is a service name roughly twenty lines above each one. The agent retried the identical `Edit` five times, then reported that it could not modify the file.",
   "question": "What is the correct recovery?",
   "explanation": "**D is correct.** `Edit` works by **unique text matching**; when the file offers no unique anchor, the documented fallback is `Read` followed by `Write`. `Read` supplies the exact current contents, `Write` puts them back with one line changed, and correctness no longer depends on finding a distinguishing string that does not exist.\n\n**B** is the most attractive wrong answer, and in most files it is the right instinct — widen the anchor until it is unique. Read the context: the blocks are identical for twelve lines and diverge only about twenty lines up, so the anchor would have to swallow most of the surrounding file before it discriminated. At that size you are transcribing the file into the call, which is `Read` + `Write` with extra steps and more ways to mistype.\n\n**A** invents a parameter. `Edit` disambiguates by the uniqueness of the matched text, not by an index into the matches; an option that offers a positional selector is offering a capability the tool does not have.\n\n**C** writes content the agent has never seen. `Write` replaces the whole file, so reconstructing it from documentation rather than from `Read` will silently discard anything the docs do not describe — local overrides, comments, recent edits. The `Read` step is not a formality; it is what makes `Write` safe.\n\n> Retrying an `Edit` that failed on ambiguity will fail identically every time. The failure is a signal to change **method**, not to try harder.",
   "ko": "**상황.** `services.config.ts`의 `payments` 블록 timeout을 30→60. `old_string: \"  timeout: 30,\"`인 `Edit`이 실패 — 네 블록에 동일하게 존재하고, 네 블록은 **12줄 연속 바이트 동일**하며 구별되는 서비스명은 **각 블록 위 약 20줄**에 있다. 에이전트는 같은 `Edit`을 5번 재시도한 뒤 포기했다.\n\n**정답 D — `Read`로 현재 내용을 얻고, 한 줄만 바꿔 `Write`로 되쓰기.** `Edit`은 **unique text match**로 동작하고, 유일한 앵커가 없을 때의 **문서화된 fallback이 `Read` + `Write`**다. 정확성이 존재하지 않는 구별 문자열을 찾아내는 데 의존하지 않게 된다.\n\n**가장 매력적인 오답 B(`old_string`을 위로 한 줄씩 넓혀 유일해질 때까지).** 대부분의 파일에서는 **이게 옳은 본능**이라 매력적이다. ⚠️ **문맥을 읽어라** — 블록이 12줄 동일하고 20줄 위에서야 갈라지므로, 앵커가 판별력을 가지려면 **주변 파일 대부분을 삼켜야 한다.** 그 크기면 파일을 호출 인자로 필사하는 것 = **`Read` + `Write`에 단계와 오타 기회만 더한 것.**\n\nA = **없는 파라미터를 발명**. `Edit`은 매치의 **유일성**으로 구분하지 인덱스로 하지 않는다. 위치 선택자를 제공하는 선택지는 도구에 없는 능력을 제안하는 것. C(`Write`로 스키마 문서에서 재구성한 최종 내용) = **본 적 없는 내용을 쓴다.** `Write`는 파일 전체를 대체하므로 문서에 없는 것(로컬 override, 주석, 최근 수정)을 조용히 날린다. **`Read` 단계는 형식이 아니라 `Write`를 안전하게 만드는 것.**\n\n> 모호함으로 실패한 `Edit`의 재시도는 **매번 똑같이 실패한다.** 그 실패는 더 세게 하라는 게 아니라 **방법을 바꾸라는 신호.**",
   "options": [
    {
     "key": "A",
     "text": "Retry the `Edit` with an `occurrence` parameter set to the index of the intended match."
    },
    {
     "key": "B",
     "text": "Expand `old_string` upward line by line until it becomes unique, then retry the `Edit` call."
    },
    {
     "key": "C",
     "text": "Call `Write` with the intended final contents of the file, reconstructed from the config schema documentation."
    },
    {
     "key": "D",
     "text": "`Read` the file to obtain its current contents, then `Write` it back with the single change applied."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "d2-2.5-recall-01",
   "kind": "domain",
   "domain": "D2",
   "format": "recall",
   "scenario": null,
   "linked_ts": [
    "2.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 2.5"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": "**빈칸 정답과 왜 중요한가:**\n\n- **`Grep`** — 파일 **내용**에서 패턴 검색(함수명, 에러 메시지, import 문). 문항에서 \"모든 호출자\", \"이 문자열이 어디에\" 류는 전부 여기.\n- **`Glob`** — 파일 **경로**를 이름·확장자 패턴으로 매칭(`**/*.test.tsx`). ⚠️ 내용 질문에 `Glob`을 쓰는 선택지가 단골 오답.\n- **`Edit`** — 국소 수정. 단, 매칭 텍스트가 파일 안에서 **unique**해야 한다.\n- **unique** — `Edit`의 동작 원리이자 실패 원인. 이 단어를 기억해야 fallback 문항이 풀린다.\n- **`Read` + `Write`** — 유일한 앵커가 없을 때의 **문서화된 fallback**. 더 영리한 regex가 아니라 결정론적 경로.\n- **incrementally** — 코드베이스 이해를 쌓는 방식. `Grep`으로 진입점 → `Read`로 import 추적. **전부 미리 읽기의 반대**이며, 컨텍스트를 무관한 것으로 채우지 않는 이유(= D5로 이어짐).",
   "cloze": "Use {{Grep}} to search file **contents** for patterns — a function name, an error message, an import statement. Use {{Glob}} to match file **paths** by name or extension pattern, such as `**/*.test.tsx`.\n\n`Read` and `Write` operate on whole files; {{Edit}} makes a targeted modification by matching text that must be {{unique}} in the file. When no unique anchor exists, the reliable fallback is {{Read + Write}}.\n\nBuild codebase understanding {{incrementally}} — `Grep` to find entry points, then `Read` to follow imports and trace flows — rather than reading every file up front."
  },
  {
   "id": "d3-3.1-choice-01",
   "kind": "domain",
   "domain": "D3",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "3.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.1 (CLAUDE.md hierarchy; user-level config is not shared via version control)"
   ],
   "context": "A backend team has firm conventions: repository methods must return a `Result` type rather than throw, and every new endpoint needs a request-schema module beside it.\n\nPriya, who has been on the team two years, gets code that follows both conventions every time. Marco, who joined last week, gets code that throws exceptions and puts validation inline. They are on the same repository, the same commit, and the same Claude Code version.\n\nPriya wrote the conventions down months ago, in `~/.claude/CLAUDE.md`.",
   "question": "What change fixes the root cause?",
   "explanation": "**C is correct.** The conventions live in **user-level** configuration, which applies only to that user and is never shared with teammates through version control. Marco is not misconfigured — he simply never received the instructions. Committing them at project level is the only change that makes the conventions arrive with the repository for Marco and for everyone hired after him.\n\n**A** is the most attractive wrong answer, because it *works* — Marco's very next session would follow the conventions. But it fixes one person on one machine by hand. The conventions now exist as two copies that drift independently, nobody else is covered, and the next hire reproduces the ticket exactly. It treats a distribution problem as a support request.\n\n**B** does not exist. There is no frontmatter key that promotes a user-level memory file into shared project configuration; sharing is a function of *where the file lives*, not a flag inside it. Inventing plausible config keys is a common way to get this question wrong.\n\n**D** is a real diagnostic — `/memory` shows which memory files are loaded and is the right tool for inconsistent behaviour across sessions — but it is being run on the machine that already works. It would confirm Priya's setup is fine and reveal nothing about Marco's.\n\n> The diagnostic question for this whole family: **would a fresh clone of the repository carry this instruction?** If not, it is not a team convention yet.",
   "ko": "**상황.** 같은 repo·같은 커밋·같은 버전인데 2년차 Priya는 팀 규범대로 코드를 받고 신입 Marco는 아니다. 규범은 Priya의 `~/.claude/CLAUDE.md`에 있다.\n\n**정답 C** — 규범을 **project-level `CLAUDE.md`**로 옮겨 repo에 커밋. user-level 설정은 **version control로 공유되지 않는다.** Marco는 설정이 틀린 게 아니라 **애초에 지시를 받은 적이 없다.** 앞으로 뽑을 사람까지 덮는 유일한 변경.\n\n**가장 매력적인 오답 A**(Priya의 파일을 Marco에게 복사) — 실제로 **작동한다**. 다음 세션부터 Marco는 규범을 따른다. 하지만 한 사람·한 머신을 손으로 고친 것이고, 사본 둘이 따로 표류하고, 다음 신입이 같은 티켓을 그대로 재현한다. ⚠️ **배포 문제를 지원 요청으로 처리한 것.**\n\n- **B**: `shared: true` frontmatter 키는 **존재하지 않는다**. 공유는 *파일이 어디 있는가*의 함수이지 파일 안의 플래그가 아니다. 그럴듯한 config 키를 지어내는 게 이 문항의 대표 실점 경로.\n- **D**: `/memory`는 진짜 진단 도구(세션 간 동작이 다를 때 로드된 memory 파일 확인)지만, **이미 잘 되는 머신에서** 돌리는 중이다.\n\n> 이 계열의 진단 질문: **\"repo를 새로 clone하면 이 지시가 따라오는가?\"** 아니면 아직 팀 규범이 아니다.",
   "options": [
    {
     "key": "A",
     "text": "Send Marco a copy of Priya's `~/.claude/CLAUDE.md` so he can place it in his own home directory."
    },
    {
     "key": "B",
     "text": "Add `shared: true` to the frontmatter of Priya's `~/.claude/CLAUDE.md` so it is distributed with the repository."
    },
    {
     "key": "C",
     "text": "Move the conventions into the project-level `CLAUDE.md` committed to the repository, so every clone loads them."
    },
    {
     "key": "D",
     "text": "Have Priya run `/memory` to confirm which memory files are loading in her sessions."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d3-3.1-recall-01",
   "kind": "domain",
   "domain": "D3",
   "format": "recall",
   "scenario": null,
   "linked_ts": [
    "3.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.1 (hierarchy, scoping, modular organization)"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": "**빈칸 정답과 왜 중요한가.**\n\n- **user** / `~/.claude/CLAUDE.md` — 그 사람, 그 머신에만. **공유 안 됨**이 이 TS의 핵심 사실.\n- **project** / `.claude/CLAUDE.md` 또는 루트 `CLAUDE.md` — repo와 함께 이동.\n- **directory** — 하위폴더의 `CLAUDE.md`. 규범이 **장소**를 따라갈 때.\n- **version control** — repo 안에 있는 레벨만 이걸 타고 간다. ⚠️ 동료에게 빠진 지시는 **거의 항상 user level에 있다**(문항의 진단 공식).\n- **`@import`** — 외부 파일 참조로 큰 `CLAUDE.md` 모듈화.\n- **`.claude/rules/`** — 주제별 파일(`testing.md` 등)로 쪼개는 대안.\n- **`/memory`** — 실제로 어떤 memory 파일이 로드됐는지 확인. **이론 세우기 전에 검증**하는 도구.",
   "cloze": "The configuration hierarchy has three levels: {{user}}-level at `~/.claude/CLAUDE.md`, {{project}}-level at `.claude/CLAUDE.md` or a root `CLAUDE.md`, and {{directory}}-level `CLAUDE.md` files in subdirectories.\n\nOnly the levels that live inside the repository travel through {{version control}}. Instructions a teammate is missing are therefore most often sitting at the {{user}} level.\n\nTo keep a large `CLAUDE.md` modular, reference external files with the {{@import}} syntax, or split it into topic-specific files under {{.claude/rules/}}.\n\nTo verify which memory files actually loaded — and to diagnose behaviour that differs between sessions — run {{/memory}}."
  },
  {
   "id": "d3-3.2-choice-01",
   "kind": "domain",
   "domain": "D3",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "3.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.2 (skills in .claude/skills/ with SKILL.md frontmatter: context: fork, allowed-tools, argument-hint)"
   ],
   "context": "A team ships a project skill at `.claude/skills/dep-audit/SKILL.md`. It walks a package's dependency tree, reads every lockfile entry, and reports outdated or vulnerable versions.\n\nTwo complaints come back from the same standup:\n\n1. Running it mid-feature dumps several hundred lines of tree traversal into the conversation. Afterwards Claude has visibly lost the thread of the feature work that was in progress.\n2. Half the team invokes it as `/dep-audit` with no arguments. It then picks a package on its own — usually the wrong one — instead of asking which package to audit.",
   "question": "Which two changes to the skill's frontmatter address these complaints? *(Select 2)*",
   "explanation": "**B and D are correct** — one per complaint.\n\n**B** is the named remedy for exactly complaint 1: `context: fork` runs the skill in an isolated sub-agent context so verbose output (codebase analysis, exploratory work) never pollutes the main conversation. Only the outcome comes back, and the feature work in progress survives.\n\n**D** is the named remedy for complaint 2: `argument-hint` exists to prompt developers for required parameters when they invoke a skill without arguments. It converts a silent wrong guess into a question.\n\n**A** is the most attractive wrong answer, because `allowed-tools` is a real frontmatter key and restricting a scanner to read-only tools is genuinely good practice. But it answers a question nobody asked — nothing in the report says the skill damaged anything. It is a valid change that fixes neither symptom.\n\n**C** confuses scoping with isolation. Personal skills in `~/.claude/skills/` are about not affecting teammates' skill sets; the file's location does nothing about output volume, and here it would strip a team-shared tool out of version control for everyone.\n\n**E** inverts the skills-vs-`CLAUDE.md` decision. `CLAUDE.md` is for always-loaded universal standards; a dependency audit is an on-demand, task-specific workflow. Moving it there guarantees the audit's instructions are loaded in every unrelated session — strictly worse for context than the problem being reported.",
   "ko": "**상황.** 프로젝트 skill `dep-audit`에 불만 둘 — (1) 실행하면 수백 줄 트리 순회가 대화에 쏟아지고 진행 중이던 feature 작업의 맥락이 날아간다. (2) 인자 없이 `/dep-audit`을 부르면 물어보지 않고 **혼자 패키지를 고른다**.\n\n**정답 B + D** — 불만 하나에 하나씩.\n- **B `context: fork`** = 불만 1의 지정 처방. skill이 격리된 sub-agent 컨텍스트에서 돌아 장황한 출력이 본 대화를 오염시키지 않고 **결과만** 돌아온다.\n- **D `argument-hint`** = 불만 2의 지정 처방. 인자 없이 호출하면 필요한 파라미터를 **묻게** 한다 — 조용한 오추측을 질문으로 바꾼다.\n\n**가장 매력적인 오답 A**(`allowed-tools`를 read-only로) — `allowed-tools`는 **진짜 키**이고 스캐너를 읽기 전용으로 좁히는 건 좋은 관행이다. 하지만 **아무도 묻지 않은 질문에 답한다** — 보고서 어디에도 skill이 뭘 망가뜨렸다는 말이 없다. ⚠️ 유효하지만 두 증상 다 못 고침.\n\n- **C**: scoping과 isolation을 혼동. `~/.claude/skills/`는 *팀의 skill 목록에 영향 안 주기*용이지 **출력량과 무관**하고, 여기선 팀 공용 도구를 version control에서 빼버린다.\n- **E**: skills ↔ `CLAUDE.md` 판단을 뒤집었다. 온디맨드 절차를 always-loaded로 옮기면 **모든 무관한 세션이 그 지시를 지고 간다** — 보고된 문제보다 엄격히 더 나쁨.",
   "options": [
    {
     "key": "A",
     "text": "Set `allowed-tools` to a read-only set so the audit cannot modify files."
    },
    {
     "key": "B",
     "text": "Set `context: fork` so the skill runs in an isolated sub-agent and only its result returns to the main conversation."
    },
    {
     "key": "C",
     "text": "Move the skill to `~/.claude/skills/` so each developer's runs stay out of the shared session."
    },
    {
     "key": "D",
     "text": "Add `argument-hint` so invoking the skill without arguments prompts the developer for the package."
    },
    {
     "key": "E",
     "text": "Move the audit instructions into the project `CLAUDE.md` so the guidance is always available."
    }
   ],
   "answer": [
    "B",
    "D"
   ],
   "multi": true
  },
  {
   "id": "d3-3.2-short-01",
   "kind": "domain",
   "domain": "D3",
   "format": "short",
   "scenario": "developer-productivity",
   "linked_ts": [
    "3.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.2 (skills vs CLAUDE.md; project- vs user-scoped commands)"
   ],
   "context": null,
   "question": "A team's release-notes procedure — read the commits since the last tag, group them by area, drop internal-only changes, and draft the notes — currently sits as a 300-line block inside the project `CLAUDE.md`. It is used twice a month, and running it reads a few hundred commit messages.\n\nOne engineer also wants a variant of the procedure that adds a personal changelog section, and does not want that variant showing up for teammates.\n\nWhere should each of these live, and what does each choice buy?",
   "explanation": null,
   "ko": "**상황.** 월 2회 쓰는 릴리스노트 절차(수백 개 커밋 메시지를 읽음)가 프로젝트 `CLAUDE.md` 안에 300줄로 박혀 있다. 한 엔지니어는 개인 섹션을 더한 변형을 원하는데 팀에는 안 보이길 원한다.\n\n**채점 포인트(이 넷을 말하면 만점):**\n1. 절차를 **`.claude/skills/`의 `SKILL.md`**로 옮기고 `CLAUDE.md`에서 뺀다. `.claude/skills/`는 프로젝트 스코프라 **version control로 팀에 공유**되는 건 유지된다.\n2. 구분을 명시: **skill = 온디맨드·과제 특화 / `CLAUDE.md` = 항상 로드·보편 표준.** 월 2회 쓰는 절차는 무관한 모든 세션에서 **컨텍스트 임대료**를 내고 있다.\n3. `SKILL.md`에 **`context: fork`** — 수백 커밋 메시지 읽기가 바로 sub-agent에 격리하고 요약만 돌려받아야 할 장황한 출력.\n4. 개인 변형은 **`~/.claude/skills/`에 *다른 이름*으로.** 개인 skill은 공유되지 않고, 이름을 달리해야 팀 버전과 **충돌/섀도잉**하지 않는다.\n\n⚠️ \"다른 이름으로\"를 빠뜨리기 쉽다 — 이름이 같으면 팀이 의존하는 것을 덮어쓰는 문제가 된다.",
   "model_answer": "The procedure belongs in a **project skill** at `.claude/skills/` with a `SKILL.md`, not in `CLAUDE.md`. `CLAUDE.md` is for **always-loaded universal standards**; skills are for **on-demand, task-specific workflows**. A procedure invoked twice a month is paying context rent in every unrelated session it is loaded into. Keeping it in `.claude/skills/` still shares it with the team through version control.\n\nThe `SKILL.md` should set **`context: fork`**, because reading a few hundred commit messages is exactly the verbose output that should be isolated in a sub-agent and returned as a summary rather than left sitting in the main conversation.\n\nThe personal variant belongs in the engineer's own **`~/.claude/skills/`, under a different name**. Personal skills are not shared, and giving it a distinct name avoids colliding with — or shadowing — the team's version for anyone else.",
   "grading": "- Puts the procedure in `.claude/skills/` (project-scoped, shared via version control) and takes it out of `CLAUDE.md`\n- States the distinction explicitly: skills = on-demand / task-specific, `CLAUDE.md` = always-loaded / universal\n- Names `context: fork` and ties it to isolating verbose output from the main conversation\n- Puts the personal variant in `~/.claude/skills/` **with a different name** so teammates are unaffected"
  },
  {
   "id": "d3-3.3-choice-01",
   "kind": "domain",
   "domain": "D3",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "3.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.3 (.claude/rules/ with YAML paths globs; conditional loading)"
   ],
   "context": "A GraphQL service is organized by feature. Each of the 40-odd feature folders contains its own `*.resolver.ts` alongside components, styles, and tests.\n\nResolvers have their own conventions — batch every relation through a DataLoader, map domain errors to the shared `GqlError` union, never call the ORM directly. Those conventions are currently a long section of the root `CLAUDE.md`.\n\nTwo complaints: the resolver conventions are loaded into every session including pure CSS work, and Claude occasionally applies resolver error-mapping language to files that are not resolvers.",
   "question": "What is the most appropriate change?",
   "explanation": "**B is correct.** This is the case the `paths` glob exists for. The convention follows a **file type scattered across directories**, not a directory. A rule file with `paths: [\"**/*.resolver.ts\"]` loads only when a matching file is being edited: the CSS session never sees it, non-resolver files are never governed by it, and the convention is written once.\n\n**A** is the most attractive wrong answer, because directory-level `CLAUDE.md` is a real hierarchy level and it does narrow the scope. But the unit of scoping is wrong. The feature folder also holds components, styles, and tests, so the conventions still load for all of them — complaint two survives. And the conventions now exist in 40 copies that drift the moment one is edited. **Directory scoping only fits when the convention genuinely follows the directory.**\n\n**C** does not change what is loaded. The text is still in the always-loaded root `CLAUDE.md`, so the token cost is unchanged, and the scoping is now a prose instruction the model may or may not honour — a probabilistic gate where a declarative one is available.\n\n**D** is heavier than needed and less reliable. Skills are for on-demand task-specific workflows; conventions that must hold for *every* resolver edit should not depend on somebody remembering to invoke them first.",
   "ko": "**상황.** feature 폴더 40여 개마다 `*.resolver.ts`가 컴포넌트·스타일·테스트와 섞여 있다. resolver 규범이 루트 `CLAUDE.md`의 긴 섹션이라 (1) 순수 CSS 작업 세션에도 로드되고 (2) resolver가 아닌 파일에 error-mapping 표현이 적용된다.\n\n**정답 B** — `.claude/rules/resolvers.md` + `paths: [\"**/*.resolver.ts\"]`. 규범이 **디렉터리가 아니라 흩어진 파일 타입**을 따라가는 바로 그 경우. 매칭될 때만 로드되므로 CSS 세션은 못 보고, non-resolver는 지배받지 않고, 규범은 **한 번만** 쓰인다.\n\n**가장 매력적인 오답 A**(feature 폴더마다 `CLAUDE.md`) — directory-level은 실재하는 계층이고 범위를 실제로 좁히긴 한다. 하지만 **scoping 단위가 틀렸다**: 그 폴더엔 컴포넌트·스타일·테스트도 있어서 **불만 2가 살아남고**, 규범이 40벌로 복제돼 하나 고치는 순간 표류한다. ⚠️ **디렉터리 스코핑은 규범이 진짜로 디렉터리를 따라갈 때만 맞는다.**\n\n- **C**(\"resolver 편집 시에만 적용하라\"고 접두어): **로드되는 것이 바뀌지 않는다.** 텍스트는 여전히 always-loaded 루트에 있어 토큰 비용 그대로이고, 선언적 게이트가 있는데 **확률적 게이트**로 바꾼 셈.\n- **D**(skill): 과설계이고 덜 신뢰스럽다. **모든** resolver 편집에서 성립해야 할 규범이 **누가 먼저 불러주는 것**에 의존하면 안 된다.",
   "options": [
    {
     "key": "A",
     "text": "Place a `CLAUDE.md` in each feature folder containing the resolver conventions."
    },
    {
     "key": "B",
     "text": "Create `.claude/rules/resolvers.md` with `paths: [\"**/*.resolver.ts\"]` in its YAML frontmatter and move the conventions there."
    },
    {
     "key": "C",
     "text": "Keep the conventions in the root `CLAUDE.md` but prefix each rule with \"apply only when editing a resolver file\"."
    },
    {
     "key": "D",
     "text": "Move the conventions into a `.claude/skills/resolver-conventions/SKILL.md` that developers invoke before touching a resolver."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "d3-3.3-choice-02",
   "kind": "domain",
   "domain": "D3",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "3.3",
    "3.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.3 (glob-pattern rules vs directory-level CLAUDE.md)"
   ],
   "context": "An architect is deciding where to put two conventions in a monorepo.\n\n**Convention 1** — everything under `services/payments/` must redact card data before logging and must not emit debug logs at all. Nothing outside that service is affected.\n\n**Convention 2** — every `*.migration.sql` file must be reversible and must declare a lock timeout. These files sit inside whichever service owns the table, so they are spread across a dozen directories.",
   "question": "Which convention is the better candidate for a `.claude/rules/` file with a `paths:` glob, and why?",
   "explanation": "**D is correct.** The deciding factor is the **shape of the set of files**, not the importance of the rule. Convention 2 follows a file type scattered across the codebase, so `paths: [\"**/*.migration.sql\"]` is the only mechanism that reaches all of them from one file. Convention 1 maps cleanly onto a directory, so a `CLAUDE.md` inside `services/payments/` already expresses it — a path rule would work too, but it buys nothing that the directory level does not already give.\n\n**A** is the most attractive wrong answer, because it reasons from the *stakes* of the rule instead of from its scope. The security sensitivity of the payments convention is real and irrelevant here — path-scoped rules are a **context-loading** mechanism, not an enforcement or permission mechanism, and choosing them \"for strength\" misreads what they do.\n\n**B** picks the right-sounding convention with a false premise: directory-level `CLAUDE.md` files are precisely how directory scoping is expressed in the hierarchy.\n\n**C** gives up both benefits. Putting both in the root `CLAUDE.md` loads payment logging rules during frontend work and migration rules during every session — the irrelevant-context and token cost that conditional loading exists to remove.",
   "ko": "**상황.** 규범 둘 중 어느 쪽이 `.claude/rules/` + `paths:` glob 후보인가. **규범 1** = `services/payments/` 아래 전부 카드정보 마스킹·debug 로그 금지(그 서비스 밖은 무관). **규범 2** = 모든 `*.migration.sql`은 되돌릴 수 있어야 하고 lock timeout 선언 — 테이블 소유 서비스마다 흩어져 열 몇 개 디렉터리에 존재.\n\n**정답 D — 규범 2.** 결정 요인은 **규칙의 중요도가 아니라 파일 집합의 모양**이다. 흩어진 파일 타입은 `paths: [\"**/*.migration.sql\"]` 하나로만 전부 닿는다. 규범 1은 디렉터리에 깔끔히 대응하므로 `services/payments/CLAUDE.md`가 이미 표현한다(path rule도 되긴 하지만 **더 얻는 게 없다**).\n\n**가장 매력적인 오답 A**(규범 1, 보안 민감 + path rule이 가장 강한 강제) — **규칙의 stakes로 추론**하게 만든다. 보안 민감성은 사실이지만 여기선 무관하다. ⚠️ **path-scoped rules는 context-loading 메커니즘이지 enforcement/permission 메커니즘이 아니다.** \"강해서\" 고르는 건 그 기능의 정체를 잘못 읽은 것.\n\n- **B**: 결론(규범 1)은 그럴듯하지만 전제가 거짓 — directory-level `CLAUDE.md`가 **바로** 디렉터리 스코핑을 표현하는 방법이다.\n- **C**(둘 다 루트로): 양쪽 이득을 다 버린다. 프론트엔드 작업에 결제 로깅 규칙이, 모든 세션에 마이그레이션 규칙이 로드된다 — conditional loading이 없애려던 바로 그 비용.",
   "options": [
    {
     "key": "A",
     "text": "Convention 1, because payment-handling rules are security-sensitive and path rules give the strongest enforcement."
    },
    {
     "key": "B",
     "text": "Convention 1, because a directory-level `CLAUDE.md` cannot express directory scoping."
    },
    {
     "key": "C",
     "text": "Neither — both are project-wide standards and belong in the root `CLAUDE.md` so they always apply."
    },
    {
     "key": "D",
     "text": "Convention 2, because the files it governs are spread across directories, which a glob can match and a directory-level `CLAUDE.md` cannot."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "d3-3.4-choice-01",
   "kind": "domain",
   "domain": "D3",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "3.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.4 (plan mode for large-scale, multi-approach, architectural work; combining plan with direct execution)"
   ],
   "context": "A ticket reads: *replace our in-house job queue with a managed one.* Sixty files publish or consume jobs. Three candidate libraries are on the table; they differ in retry semantics, in whether they need a broker deployed, and in whether jobs can be scheduled in the future.\n\nA developer opens the ticket and asks Claude Code to start converting publishers. Two hours later, roughly half the call sites are converted, and the team realizes the chosen library cannot express delayed jobs — which four consumers depend on. The work is thrown away.",
   "question": "What approach should have been taken?",
   "explanation": "**A is correct.** This task has every marker plan mode is designed for: large-scale change, sixty files, multiple valid approaches, and an architectural decision with infrastructure consequences. Plan mode allows the codebase to be explored and the approach settled **before** anything is committed to, which is exactly the rework that was lost here. Once the approach is agreed, direct execution is the right mode for carrying it out — combining plan mode for investigation with direct execution for implementation is the intended pattern, not a compromise.\n\n**B** is the most attractive wrong answer, because incremental delivery is genuinely good engineering and it would have surfaced the problem sooner. But it does not surface it *before* the choice is made. The fatal decision — which library — was taken at file one; smaller batches only reduce how much is thrown away, from thirty files to five. The requirement discovery has to happen before implementation, not inside it.\n\n**C** misuses the Explore subagent. Explore isolates verbose **discovery** and returns summaries to preserve main-conversation context; it is not the mechanism for making an architectural choice or performing a sixty-file migration. It would be a reasonable *component* of the investigation, not a replacement for planning it.\n\n**D** fixes a different problem. `CLAUDE.md` persists standing context across sessions; it does not help decide which library to adopt, and there is no plan to write down yet.",
   "ko": "**상황.** \"사내 job queue를 관리형으로 교체\" — 60파일, 후보 라이브러리 3개(retry 의미론·broker 배포 필요 여부·지연 예약 가능 여부가 다름). 개발자가 바로 변환을 시작했고, 절반쯤에서 고른 라이브러리가 **delayed job을 표현 못 한다**는 걸 발견(소비자 4개가 의존) → 전부 폐기.\n\n**정답 A** — **plan mode로 call site 조사 + 라이브러리 3개 비교 → 합의된 계획을 direct execution으로 수행.** 이 과제엔 plan mode 트리거가 전부 있다: large-scale, 60파일, 다수의 유효한 접근, 인프라 결과가 딸린 아키텍처 결정. **아무것도 커밋되기 전에** 접근을 확정하는 것이 여기서 날린 rework를 막는다. **plan(조사) + direct(구현) 조합은 타협이 아니라 의도된 패턴.**\n\n**가장 매력적인 오답 B**(작은 배치로 direct, 모듈 단위 리뷰) — 점진적 전달은 진짜로 좋은 엔지니어링이고 문제를 더 빨리 드러냈을 것이다. 하지만 **결정 이전에** 드러내지는 못한다. ⚠️ 치명적 결정(어느 라이브러리)은 **파일 1번에서** 내려졌고, 작은 배치는 버리는 양을 30파일에서 5파일로 줄일 뿐이다. **요구사항 발견은 구현 안이 아니라 구현 전에 일어나야 한다.**\n\n- **C**: Explore subagent 오용. Explore는 장황한 **discovery**를 격리해 요약을 돌려주는 것이지, 아키텍처 선택을 내리거나 60파일 마이그레이션을 수행하는 메커니즘이 아니다. 조사의 **구성요소**로는 타당하나 계획의 대체가 아님.\n- **D**: 다른 문제를 고침. `CLAUDE.md`는 세션 간 상시 컨텍스트를 유지할 뿐 라이브러리 선택을 돕지 않고, **아직 적어둘 계획 자체가 없다.**",
   "options": [
    {
     "key": "A",
     "text": "Use plan mode first to explore the call sites and compare the three libraries, then switch to direct execution to carry out the agreed plan."
    },
    {
     "key": "B",
     "text": "Use direct execution, but in smaller batches — convert one module at a time and review after each."
    },
    {
     "key": "C",
     "text": "Hand the whole migration to the Explore subagent so the discovery does not consume the main conversation's context."
    },
    {
     "key": "D",
     "text": "Write the migration approach into `CLAUDE.md` first so every session follows the same plan."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "d3-3.4-choice-02",
   "kind": "domain",
   "domain": "D3",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "3.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.4 (Explore subagent for isolating verbose discovery; plan mode vs direct execution)"
   ],
   "context": "A multi-phase task: retire a deprecated `formatCurrency()` helper, then replace each call site with the locale-aware replacement.\n\nPhase one is discovery. Claude searches the repository and reads roughly 400 matches with their surrounding code into the conversation so the variants can be catalogued. By the time phase two starts, the context window is nearly full, and constraints agreed at the beginning of the session — which locales to support, which call sites to leave alone — are no longer being honoured.\n\nThe discovery itself was correct. The catalogue is good.",
   "question": "What is the most appropriate change for the next task of this shape?",
   "explanation": "**C is correct.** The failure is context exhaustion during a verbose discovery phase, and the Explore subagent exists for precisely that: it absorbs the bulk reading in an isolated context and returns a summary, so the main conversation keeps the constraints and the catalogue without the 400 raw matches. Nothing about the discovery needed to change — only where it happened.\n\n**A** fixes a different problem. Plan mode's protection is that it does not commit changes while you explore and decide; it does not reduce how much of the search output lands in the conversation. Discovery in plan mode exhausts the context just as fast.\n\n**B** is the most attractive wrong answer, because it does work — a fresh session with a hand-written summary is precisely the end state the Explore subagent produces. But it produces it manually, once, at the cost of a session boundary and whatever the human forgets to carry over. It is the workaround for the tool the guide names, and it is lossy in the same place the current run failed: the constraints.\n\n**D** slows the accumulation without stopping it. Twelve smaller responses still land in the same context window and still add up to 400 matches; the individual response size was never the problem.",
   "ko": "**상황.** 2단계 과제(`formatCurrency()` 폐기 → 호출부 교체). 1단계 discovery에서 매치 400개를 주변 코드까지 대화에 읽어들였고, 2단계 시작 시점엔 컨텍스트가 거의 차서 **세션 초반에 합의한 제약**(지원 locale, 건드리지 말 호출부)이 지켜지지 않는다. **discovery 자체는 옳았고 카탈로그도 좋다.**\n\n**정답 C** — **Explore subagent로 discovery 실행.** 실패는 장황한 discovery 단계의 **컨텍스트 고갈**이고, Explore는 정확히 그 용도다: 대량 읽기를 자기 컨텍스트에서 흡수하고 **요약만** 본 대화에 반환. ⚠️ **discovery는 바꿀 게 없었다 — 바뀌어야 할 건 그게 *어디서* 일어났는가뿐.**\n\n**가장 매력적인 오답 B**(discovery 끝내고 새 세션에서 카탈로그·제약을 손으로 다시 진술) — **실제로 작동한다.** 요약을 든 새 세션은 Explore가 만들어내는 최종 상태 바로 그것이다. 하지만 그것을 **수동으로, 한 번, 세션 경계와 사람이 옮기다 빠뜨리는 것을 대가로** 만든다. 가이드가 이름 붙인 도구의 **우회로**이고, **지금 실패한 바로 그 지점(제약)에서 똑같이 손실이 난다.**\n\n- **A**: 다른 문제를 고침. plan mode의 보호는 *탐색·결정 중 변경을 커밋하지 않는 것*이지, **검색 출력이 대화에 얼마나 쌓이는지를 줄이지 않는다.** plan mode에서 해도 컨텍스트는 똑같이 고갈된다.\n- **D**(디렉터리별로 나눠 요청): 누적을 늦출 뿐 멈추지 못한다. 응답 12개도 **같은 컨텍스트 창**에 들어가 결국 400매치가 된다. **개별 응답 크기는 원인이 아니었다.**",
   "options": [
    {
     "key": "A",
     "text": "Run the discovery phase in plan mode so nothing is written to disk while the search is happening."
    },
    {
     "key": "B",
     "text": "Finish discovery, then start a fresh session and restate the catalogue and the constraints by hand before implementing."
    },
    {
     "key": "C",
     "text": "Run the discovery through the Explore subagent, which reads verbosely in its own context and returns a summary to the main conversation."
    },
    {
     "key": "D",
     "text": "Ask for the helper's call sites one directory at a time so each individual response stays small."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d3-3.5-choice-01",
   "kind": "domain",
   "domain": "D3",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "3.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.5 (concrete input/output examples when prose is interpreted inconsistently)"
   ],
   "context": "A developer needs a function that normalizes supplier product names into a canonical form for deduplication. She describes the rules in prose: strip marketing suffixes, preserve model numbers, normalize the brand to title case, collapse whitespace.\n\nShe has run it three times. The first run stripped `2024` along with `Pro`. The second kept `Pro (2024)` intact. The third produced `ACME` in one branch and `Acme` in another. Each run is internally consistent and matches a defensible reading of her description. She knows exactly what the output should look like for any given input.",
   "question": "What is the most effective next step?",
   "explanation": "**D is correct.** Concrete input/output examples are the most effective way to communicate an expected transformation when prose descriptions are being interpreted inconsistently — which is exactly what the three runs demonstrate. A pair like `\"ACME Widget Pro (2024) X-90\"` → `\"Acme Widget X-90\"` settles suffix stripping, year handling, model-number preservation, and brand casing in one line, without arguing about what \"marketing suffix\" means.\n\n**A** is the most attractive wrong answer, because it is the instinctive move and it does help a little. But it stays inside the failing medium. Every added sentence introduces its own ambiguity, the enumeration can never be complete, and the developer ends up writing a specification longer than the function. Prose is the thing that is not working.\n\n**B** applies the interview pattern outside its case. Interviewing is for surfacing considerations the developer **has not anticipated** — unfamiliar design space, cache invalidation strategies, failure modes. Here she already knows the correct output for any input; she does not need questions, she needs a way to transmit an answer she already has.\n\n**C** applies the single-message rule to the wrong kind of problem. Bundling issues into one message is for **interacting** fixes, where changing one affects another. These are three symptoms of one underspecified transformation; bundling them just restates the ambiguous prose three times.",
   "ko": "**상황.** 공급사 제품명 정규화 함수를 산문으로 기술(마케팅 접미사 제거·모델번호 보존·브랜드 title case·공백 정리). 세 번 실행에 세 결과(`2024`까지 제거 / `Pro (2024)` 보존 / `ACME` vs `Acme`). **각 실행은 내부적으로 일관되고 그 기술의 타당한 해석 중 하나다.** 개발자는 어떤 입력이든 정답 출력을 이미 안다.\n\n**정답 D** — **구체적 input/output 쌍 2~3개** 제시. 산문 기술이 실행마다 다르게 해석될 때 기대 변환을 전달하는 가장 효과적인 수단. `\"ACME Widget Pro (2024) X-90\"` → `\"Acme Widget X-90\"` 한 줄이 접미사·연도·모델번호·브랜드 케이싱을 **\"marketing suffix가 뭐냐\"를 논쟁하지 않고** 동시에 확정한다.\n\n**가장 매력적인 오답 A**(산문을 더 길게, 접미사·케이싱 전부 열거) — 본능적인 수이고 실제로 조금 도움도 된다. 하지만 **실패하고 있는 매체 안에 그대로 머문다.** 문장을 더할 때마다 자기 모호성을 들여오고, 열거는 완결될 수 없고, 결국 함수보다 긴 명세를 쓰게 된다. ⚠️ **작동 안 하는 것이 바로 산문이다.**\n\n- **B**: interview pattern을 제 사례 밖에 적용. 인터뷰는 개발자가 **미처 생각 못 한** 고려사항을 끌어낼 때(낯선 설계 공간·캐시 무효화·실패 모드)용이다. 여기선 이미 답을 아는데 **전달 수단**이 필요한 것.\n- **C**: 한 메시지 묶기 규칙을 틀린 종류의 문제에 적용. 묶기는 **상호작용하는(interacting)** 수정용. 이건 **하나의 과소명세된 변환**의 세 증상이라, 묶어봐야 모호한 산문을 세 번 다시 말하는 것.",
   "options": [
    {
     "key": "A",
     "text": "Rewrite the prose instruction at greater length, enumerating every marketing suffix that should be stripped and every casing case."
    },
    {
     "key": "B",
     "text": "Ask Claude to interview her about edge cases — trailing years, parenthesized qualifiers, all-caps brands — before it implements again."
    },
    {
     "key": "C",
     "text": "Send all three runs' inconsistencies in a single message and ask for one fix that addresses them together."
    },
    {
     "key": "D",
     "text": "Provide two or three concrete input/output pairs showing the exact transformation expected, including a name with a model number and a year."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "d3-3.5-recall-01",
   "kind": "domain",
   "domain": "D3",
   "format": "recall",
   "scenario": null,
   "linked_ts": [
    "3.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.5 (iterative refinement techniques)"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": "**빈칸 정답과 왜 중요한가.**\n\n- **input/output** — 산문 기술이 실행마다 다르게 해석될 때의 **기본 처방**. 더 긴 산문이 아니라 예시 2~3개.\n- **test suite** — test-driven iteration은 **테스트를 먼저** 쓴다(기대 동작·엣지 케이스·성능 요구). 테스트가 곧 명세가 된다.\n- **failures** — 그 다음 **실패를 되돌려주며** 반복. 매 라운드가 내 재설명이 아니라 객관적인 것에 고정된다.\n- **interview** — Claude가 구현 전에 **나에게** 질문하는 패턴.\n- **anticipated** — 목적은 개발자가 **예상하지 못한** 고려사항을 표면화하는 것. ⚠️ 내가 정답을 이미 아는 경우엔 인터뷰가 아니라 예시가 답.\n- **interact** / **single** — 서로 **상호작용하는** 이슈는 **한 메시지**에 몰아 하나의 수정이 전체를 고려하게.\n- **independent** — 독립이면 순차 반복(라운드가 작고 리뷰 가능해짐). 기준은 규모가 아니라 **coupling**.",
   "cloze": "When a prose description of a transformation is interpreted inconsistently across runs, the most effective correction is to supply two or three concrete {{input/output}} examples.\n\nTest-driven iteration means writing the {{test suite}} first — covering expected behaviour, edge cases, and performance requirements — and then iterating by sharing the {{failures}} back.\n\nThe {{interview}} pattern has Claude ask questions before implementing, to surface considerations the developer has not {{anticipated}} — useful in an unfamiliar domain.\n\nWhen several reported issues {{interact}}, give them all in a {{single}} message so one fix accounts for the whole set; when the issues are {{independent}}, iterate on them sequentially."
  },
  {
   "id": "d3-3.6-choice-01",
   "kind": "domain",
   "domain": "D3",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "3.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.6 (-p/--print for non-interactive CI; --output-format json with --json-schema)"
   ],
   "context": "A CI job runs Claude Code to review each pull request and post findings as inline comments.\n\nTwo things are broken. First, the job produces no output and is killed by the runner's 30-minute timeout — the process is sitting there, not working. Second, on the branch where an engineer ran it locally and pasted the result in by hand, the findings came back as a prose write-up, and the bot that posts comments cannot map a paragraph to a file and line.",
   "question": "Which two changes to the invocation address these failures? *(Select 2)*",
   "explanation": "**A and C are correct** — one per failure.\n\n**A** is the fix for the hang. Without `-p` / `--print`, Claude Code runs interactively and waits for input that no CI runner will ever provide; the job burns its wall clock doing nothing. `-p` is the flag that makes it run to completion and print, which is why it is the first thing to check on any hung pipeline step.\n\n**C** is the fix for the unparseable output. `--output-format json` with `--json-schema` constrains the findings into a machine-parseable structure with the fields the bot needs — file, line, severity, message — so they can be posted as inline comments instead of being scraped out of prose.\n\n**B** does not exist. It is the most dangerous option here because it describes the correct *behaviour* using an invented flag name; the flag that delivers that behaviour is `-p` / `--print`. Recognising the real spelling is the point of the question.\n\n**D** fixes a different problem — the *reporting latency* of the failure, not the failure. The job still never produces a review; it just fails faster.\n\n**E** is a genuinely valuable practice named under this same objective: `CLAUDE.md` is how project context — testing standards, fixture conventions, review criteria — reaches a CI-invoked instance. But it improves the *quality* of a review that runs, and neither of the reported symptoms is a quality complaint. Correct advice, wrong question.",
   "ko": "**상황.** PR 리뷰 CI 두 가지 고장 — (1) 출력이 전혀 없이 30분 timeout에 죽음(프로세스는 앉아 있고 일하지 않음). (2) 결과가 **산문**이라 코멘트 봇이 문단을 파일·라인에 매핑하지 못함.\n\n**정답 A + C** — 고장 하나에 하나씩.\n- **A `-p` (`--print`)** = hang의 해법. 없으면 대화형으로 돌며 CI 러너가 절대 주지 않을 입력을 기다린다. **행이 걸린 파이프라인 단계에서 가장 먼저 확인할 것.**\n- **C `--output-format json` + `--json-schema`** = 파싱 불가 출력의 해법. findings를 봇이 필요로 하는 필드(file·line·severity·message)로 구조화 → inline 코멘트로 바로 게시.\n\n**가장 매력적(이자 가장 위험한) 오답 B `--non-interactive`** — **올바른 *동작*을 지어낸 플래그 이름으로 서술한다.** 그 동작을 제공하는 플래그는 `-p` / `--print`다. ⚠️ **실제 철자를 아는지**가 이 문항의 요점.\n\n- **D**(timeout을 낮춤): 다른 문제를 고침 — 실패의 **보고 지연**을 줄일 뿐 실패 자체는 그대로. 리뷰는 여전히 나오지 않고 더 빨리 실패할 뿐.\n- **E**(`CLAUDE.md`에 리뷰 기준 문서화): 같은 objective 아래 이름 붙은 **진짜 좋은 관행**이지만, 그건 **돌아가는 리뷰의 품질**을 올린다. 보고된 두 증상 중 품질 불만은 하나도 없다. **맞는 조언, 틀린 질문.**",
   "options": [
    {
     "key": "A",
     "text": "Add the `-p` (`--print`) flag so the invocation runs non-interactively instead of waiting for input."
    },
    {
     "key": "B",
     "text": "Add the `--non-interactive` flag so the CLI skips prompts in an automated environment."
    },
    {
     "key": "C",
     "text": "Add `--output-format json` together with `--json-schema` so the findings come back machine-parseable."
    },
    {
     "key": "D",
     "text": "Lower the CI job timeout so the hang is reported in two minutes instead of thirty."
    },
    {
     "key": "E",
     "text": "Document the team's review criteria in `CLAUDE.md` so the reviewer applies project standards."
    }
   ],
   "answer": [
    "A",
    "C"
   ],
   "multi": true
  },
  {
   "id": "d3-3.6-short-01",
   "kind": "domain",
   "domain": "D3",
   "format": "short",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "3.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 3.6 (session context isolation; prior findings on re-runs; supplying existing tests)"
   ],
   "context": null,
   "question": "A CI pipeline has two Claude Code stages, both wired into the same session that generated the changes on the branch.\n\nThe team reports three problems:\n\n1. The review stage almost never flags anything in code Claude itself wrote earlier in that session, though human reviewers keep finding issues there.\n2. When a developer pushes a fix and CI re-runs, the bot re-posts findings from the previous run — including ones already fixed — so PRs accumulate duplicate comments.\n3. The test-generation stage keeps proposing tests for behaviour the existing suite already covers.\n\nGive the fix for each, and say what the underlying principle is in the first case.",
   "explanation": null,
   "ko": "**상황.** CI의 Claude Code 두 단계가 **변경을 생성한 바로 그 세션**에 물려 있다. 문제 셋 — (1) 리뷰 단계가 Claude 자신이 앞서 쓴 코드는 거의 지적하지 않는데 사람 리뷰어는 계속 잡아낸다. (2) 재실행마다 이전 findings(이미 고친 것 포함)를 다시 붙여 PR에 중복 코멘트가 쌓인다. (3) 테스트 생성이 기존 suite가 이미 커버한 동작의 테스트를 제안한다.\n\n**채점 포인트:**\n1. **독립(별도) Claude Code 인스턴스로 리뷰**한다고 말하고, 원리를 **session context isolation**으로 이름 붙일 것.\n2. **왜** 생성 세션이 약한 리뷰어인지 설명할 것 — 코드를 만들어낸 추론을 그대로 들고 있어 **자기 가정 기준으로 자기 출력을 평가**한다. diff를 처음 보는 인스턴스가 측정 가능하게 더 잘 찾는다. 그 독립 인스턴스의 프로젝트 컨텍스트는 생성 대화가 아니라 **`CLAUDE.md`**(리뷰 기준·표준)에서 온다.\n3. 재실행: **직전 findings를 컨텍스트에 넣고** + **새로운/여전히 미해결인 것만 보고하라고 지시**. 둘 다 말해야 함.\n4. 테스트 생성: **기존 테스트 파일을 컨텍스트에 제공**. (선택) `CLAUDE.md`에 testing 표준·\"가치 있는 테스트\"의 기준·사용 가능한 fixture 문서화.\n5. ⚠️ **감점 항목:** 단계 비활성화, 임계값 조이기, **사후 코멘트 중복 제거**를 1차 해법으로 제시하는 것.",
   "model_answer": "**1 — Run the review in an independent Claude Code instance**, not the session that generated the code. The principle is **session context isolation**: a session that produced the changes carries the reasoning that produced them, so it evaluates its own output against its own assumptions and is measurably less effective at finding problems in it than a fresh instance seeing the diff cold. Project context for that independent instance comes from `CLAUDE.md` — review criteria, standards — rather than from the generating conversation.\n\n**2 — Include the prior review's findings in context on the re-run**, and instruct the instance to report only findings that are new or still unaddressed. Without that, each run starts blind and re-derives the same list.\n\n**3 — Supply the existing test files in context** so generation can see what is already covered and avoid duplicating it. Documenting testing standards, what makes a test valuable, and the available fixtures in `CLAUDE.md` further reduces low-value output.",
   "grading": "- Names an **independent / separate instance** for review and identifies session context isolation as the principle\n- Explains *why* the generating session is a weak reviewer (it shares the assumptions that produced the code)\n- For re-runs: pass prior findings in context **and** instruct reporting only new or still-unaddressed issues\n- For test generation: provide the existing test files; optionally `CLAUDE.md` for standards, valuable-test criteria, and fixtures\n- Does not propose disabling the stage, tightening thresholds, or deduplicating comments after the fact as the primary fix"
  },
  {
   "id": "d4-4.1-choice-01",
   "kind": "domain",
   "domain": "D4",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "4.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.1 (explicit criteria over vague instructions, false positive impact on trust)"
   ],
   "context": "A review bot posts findings on every pull request in six categories. Dismissal rates measured over four weeks:\n\n| category | dismissed |\n|---|---|\n| `sql_injection` | 5% |\n| `null_safety` | 8% |\n| `unclear_naming` | 71% |\n| `possible_performance_issue` | 64% |\n\nDevelopers have started closing the bot's comment thread without reading it, and two genuine `null_safety` findings shipped to production last sprint because nobody looked. Two weeks ago the team lead appended *\"only report high-confidence findings\"* to the system prompt; none of the rates moved.",
   "question": "What most effectively restores the situation?",
   "explanation": "**C is correct.** Two moves, and both are needed. High false-positive categories do not stay contained — they erode confidence in the categories that *are* accurate, which is why 8%-dismissal `null_safety` findings are now going unread. Disabling the two offenders is what buys the trust back immediately. Rewriting their criteria as explicit categorical rules — which issue types to report, which to skip — is what lets them come back. \"Report unclear naming\" was never a criterion; it was a topic.\n\n**A** is the most attractive wrong answer, because a number looks like the specificity that \"be conservative\" was missing. It is not. It is still confidence-based filtering, and the model's self-reported confidence is not calibrated against *this team's* dismissal standard — the model was confident about those 71% too. The guide is direct that general instructions like \"be conservative\" or \"only report high-confidence findings\" fail to improve precision compared with specific categorical criteria; attaching a percentage does not convert one into the other. The team already has the experiment: the last such instruction moved nothing.\n\n**B** is the \"fixes a different problem\" distractor. It reduces volume, not the false-positive rate. Its premise — that the noisy categories fall below the cut — does not hold either, because the ranking is by *severity*, and a speculative `possible_performance_issue` finding can be rated severe by the same undefined criterion that produced it. The surviving five are drawn from the same undefined categories, and severity ranking can now push an accurate `null_safety` finding off the list to make room for that performance guess. Trust keeps eroding, more quietly.\n\n**D** is valid but heavier than needed. Independent review instances are a real technique (TS 4.6), but a second reviewer handed the same undefined criterion has nothing better to judge against than the first one did. It doubles cost and latency on every pull request to re-litigate a definition that was never written.\n\n> When precision is the complaint, the fix is a **criterion**, not a **confidence threshold**.",
   "ko": "**상황.** 6개 카테고리 리뷰봇. `sql_injection` 5% / `null_safety` 8% 기각인데 `unclear_naming` 71%, `possible_performance_issue` 64% 기각. 개발자가 봇 스레드를 안 읽고 닫기 시작 → 진짜 `null_safety` 2건이 프로덕션에 나감. 팀장이 2주 전 *\"only report high-confidence findings\"*를 붙였으나 **아무 수치도 안 움직임**.\n\n**정답 C** — 두 수를 함께: ① 노이즈 두 카테고리 **일시 비활성화**(신뢰를 즉시 회수) ② 그 기준을 **explicit categorical rule**(report할 것 / skip할 것)로 다시 씀(복귀 조건). \"report unclear naming\"은 기준이 아니라 **주제**였다.\n\n**왜 신뢰 회수가 정답의 절반인가.** 고오탐 카테고리는 격리되지 않는다 — 정확한 카테고리(8% 기각의 `null_safety`)까지 안 읽히게 만든다.\n\n**가장 매력적인 오답 A** — \"90% 이상 확신할 때만, confidence도 같이 명시\". 숫자가 붙어서 \"be conservative\"에 없던 구체성처럼 보인다. ⚠️ **아니다.** 여전히 confidence 기반 필터링이고, 모델의 자기보고 confidence는 **이 팀의 기각 기준에 캘리브레이션되어 있지 않다** — 그 71%짜리들에 대해서도 모델은 확신했다. 게다가 **팀이 이미 실험을 했다**: 같은 종류의 지시가 아무것도 안 움직였다.\n\n**B** — PR당 상위 5건으로 상한. fixes a different problem. **양**을 줄이지 오탐률을 못 줄이고, 정확한 `null_safety` 건이 추측성 성능 건에 밀려 잘릴 수 있다.\n\n**D** — 두 번째 인스턴스가 재채점. 4.6의 실제 기법이지만 **valid but heavier than needed**: 같은 미정의 기준을 받은 두 번째 리뷰어도 판단 근거가 없다. 쓰인 적 없는 정의를 재심하느라 비용·지연만 2배.\n\n> 정밀도가 불만이면 답은 **criterion**이지 **confidence threshold**가 아니다.",
   "options": [
    {
     "key": "A",
     "text": "Instruct the model to report a finding only when it is at least 90% confident in it, and to state that confidence percentage alongside each finding so developers can weigh how seriously to take it."
    },
    {
     "key": "B",
     "text": "Cap the bot at the five highest-severity findings per pull request so developers see a short ranked list rather than a wall of comments, and most of the noise from the two loose categories falls below the cut."
    },
    {
     "key": "C",
     "text": "Temporarily disable `unclear_naming` and `possible_performance_issue`, and rewrite their criteria as explicit categorical rules stating which issues to report and which to skip."
    },
    {
     "key": "D",
     "text": "Send every finding to a second Claude instance that re-scores it against the same category descriptions and drops the low scorers, so only findings that survive two passes are posted to the pull request."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d4-4.1-choice-02",
   "kind": "domain",
   "domain": "D4",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "4.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.1 (explicit severity criteria with concrete code examples)"
   ],
   "context": "A review agent labels each finding `critical`, `high`, `medium`, or `low`. The prompt says: *\"Assign severity based on the impact of the issue.\"*\n\nAn audit of 300 findings shows the same defect class landing in different buckets across pull requests — an unvalidated request parameter reaching a database query was labelled `critical` on one PR, `medium` on another, and `high` on a third. The on-call rotation triages by severity, so the inconsistency routes real incidents to the wrong queue.",
   "question": "Which **two** changes address this? *(Select 2)*",
   "explanation": "**B and E are correct**, and they are the same principle applied twice: replace a vague standard with explicit criteria, then anchor those criteria with concrete code so the boundary between adjacent levels is demonstrated rather than described. \"Impact\" is a word each review re-interprets; \"unvalidated input reaching a query is `critical`\" is not.\n\n**A** is the vague-instruction anti-pattern in its purest form. It also asks for something impossible — each review is a fresh request with no access to what previous reviews decided, so \"the same standard you used before\" refers to nothing.\n\n**C** is the most attractive wrong answer, because stated reasoning genuinely helps and feels like rigour. But it makes the classification *auditable*, not *consistent*: the model will now write a fluent justification for `medium` on one PR and an equally fluent one for `critical` on the next. You get a readable record of the inconsistency. Reasoning without a criterion to reason against changes nothing.\n\n**D** is valid-in-spirit but heavier than needed, and it degrades on its own terms. It spends a large slice of context on every request to imitate a rulebook that could be written once in four lines, and past assignments are themselves inconsistent — you would be seeding the model with the noise you are trying to remove.",
   "ko": "**상황.** severity를 `critical`/`high`/`medium`/`low`로 붙이는데 프롬프트가 *\"Assign severity based on the impact of the issue.\"* 300건 감사 결과, **동일 결함 클래스**(미검증 request 파라미터가 DB 쿼리에 도달)가 PR마다 `critical`/`medium`/`high`로 제각각. on-call이 severity로 트리아지하므로 실제 인시던트가 엉뚱한 큐로 간다. **(2개 선택)**\n\n**정답 B + E** — 같은 원리의 두 적용: 모호한 기준을 **explicit criteria**로 바꾸고(E: \"미검증 사용자 입력이 쿼리에 도달하면 언제나 `critical`\"), 그 기준을 **레벨별 구체 코드 예시**로 고정한다(B). \"impact\"는 매 리뷰가 재해석하는 단어이고, E의 문장은 아니다.\n\n**A** — \"일관되게 하고 이전 리뷰와 같은 기준을 써라\". 모호 지시 안티패턴의 순수형. 게다가 **불가능한 요구**다 — 매 리뷰는 새 요청이고 이전 리뷰가 뭘 정했는지 접근할 수 없다.\n\n**가장 매력적인 오답 C** — severity 전에 reasoning을 쓰게 해서 감사 가능하게. 근거 서술은 실제로 도움이 되고 엄밀해 보인다. ⚠️ 그러나 분류를 **auditable하게** 만들 뿐 **consistent하게** 만들지 않는다. 이제 모델은 `medium`에 대해 유창한 정당화를, 다음 PR에서 `critical`에 대해 똑같이 유창한 정당화를 쓴다. **결과물은 불일치의 읽기 좋은 기록.** 겨눌 기준 없는 reasoning은 아무것도 안 바꾼다.\n\n**D** — 과거 severity 200건을 매 요청 컨텍스트로. valid-in-spirit이지만 heavier than needed이고 자체 논리로도 무너진다: 네 줄이면 되는 규칙집을 흉내내려 컨텍스트를 대량 소모하고, **과거 배정 자체가 불일치**라 제거하려던 노이즈를 모델에 다시 심는다.",
   "options": [
    {
     "key": "A",
     "text": "Instruct the model to be consistent across pull requests and to apply the same severity standard it applied on the reviews it has already produced for this repository."
    },
    {
     "key": "B",
     "text": "Define each severity level with explicit criteria **and a concrete code example** of a finding that belongs at that level, so the boundary with the level above and below it is demonstrated."
    },
    {
     "key": "C",
     "text": "Require the model to state its reasoning before it assigns a severity, so every classification arrives with an audit trail the on-call engineer can read and challenge."
    },
    {
     "key": "D",
     "text": "Store every past severity assignment in a database and include the 200 most recent ones as context on each review, so the model can match each new finding against the precedent the team has already set."
    },
    {
     "key": "E",
     "text": "Replace \"based on impact\" with explicit categorical statements: unvalidated user input reaching a query is always `critical`, and a missing null check on an internal helper is `medium`."
    }
   ],
   "answer": [
    "B",
    "E"
   ],
   "multi": true
  },
  {
   "id": "d4-4.2-choice-01",
   "kind": "domain",
   "domain": "D4",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "4.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.2 (few-shot examples enable generalization to novel patterns)"
   ],
   "context": "A review agent's prompt contains an enumerated list of 40 anti-patterns to look for, each described in a sentence. On the 40 listed patterns it is reliable.\n\nTwo complaints arrive in the same week. The team adopted a new async library last month, and the bot has never flagged a single misuse of it — including a race condition that reached production. Separately, the bot keeps flagging the service's in-house result-wrapper idiom as an error-swallowing bug; the team accepted that idiom two years ago and dismisses the finding every time.",
   "question": "What change best improves the agent?",
   "explanation": "**B is correct.** Few-shot examples let the model generalize judgment to *novel* patterns rather than matching only pre-specified cases, and 2–4 targeted examples is the stated scale. The reasoning is the load-bearing part: showing why the wrapper idiom was skipped and why the superficially similar async misuse was flagged transfers the distinction, so the 41st pattern — the one nobody has written down yet — lands on the right side of it. This is also the guide's named remedy for false positives on acceptable code patterns.\n\n**A** is the prime distractor and it is genuinely tempting, because it is concrete, immediately actionable, and will fix both reported complaints. It fixes exactly those two and nothing else. An enumeration is by construction a match-only strategy: it catches what is listed and is blind to everything else, so the same ticket arrives next quarter with a different library. You are on a treadmill, and the list is now 60 sentences of context on every request.\n\n**C** is the \"be conservative\" failure wearing different clothes. It hands the model a topic with no basis for judgment, which is what produced the wrapper false positives in the first place — the bot already thinks that idiom looks like a swallowed error.\n\n**D** is heavier than needed and adds no knowledge. Running the same model twice over the same code with less guidance the second time produces more findings, not better-calibrated ones; merging them raises the false-positive rate the team is already complaining about.",
   "ko": "**상황.** 리뷰 에이전트 프롬프트에 anti-pattern 40개가 각 한 문장으로 열거돼 있다. 그 40개엔 신뢰성 있음. 두 불만: ① 지난달 도입한 새 async 라이브러리 오용을 **한 번도** 못 잡음(레이스 컨디션이 프로덕션까지 감) ② 2년 전 팀이 수용한 사내 result-wrapper 관용구를 계속 error-swallowing 버그로 flag.\n\n**정답 B** — 열거의 일부를 **targeted few-shot 3개**로 교체. 진짜 이슈와 수용된 사내 패턴을 **나란히** 놓고, 각각 **왜 flag했는지 / 왜 skip했는지 reasoning을 함께** 보인다. few-shot의 가치는 **generalization to novel patterns**이고, 2–4개가 명시된 스케일. reasoning이 하중을 받는 부분이다 — 그래야 아직 아무도 안 적은 **41번째 패턴**이 경계의 옳은 쪽에 떨어진다. 가이드가 지목한 \"수용 가능한 코드 패턴에 대한 오탐\"의 처방이기도 하다.\n\n**가장 매력적인 오답 A** — 열거를 60개로 늘려 async 관용구는 이슈로, 사내 wrapper는 명시적 제외로. 구체적이고 즉시 실행 가능하며 **보고된 두 불만을 실제로 고친다**. ⚠️ 딱 그 둘만 고친다. 열거는 구성상 **match-only 전략** — 적힌 것만 잡고 나머지엔 맹목이라 다음 분기에 다른 라이브러리로 같은 티켓이 온다. 게다가 매 요청 컨텍스트가 60문장.\n\n**C** — \"판단력을 발휘해 concurrency 문제나 swallowed error처럼 보이는 건 다 flag\". \"be conservative\"의 옷만 갈아입은 형태. 판단 근거 없이 **주제만** 던지는 것이고, 그게 애초에 wrapper 오탐을 만든 원인이다.\n\n**D** — 패턴 목록 있이/없이 두 번 돌려 merge. heavier than needed이고 지식이 안 늘어난다. 두 번째에 가이드가 더 적으니 findings가 **더 많아질 뿐 캘리브레이션이 좋아지지 않고**, merge는 팀이 이미 불평 중인 오탐률을 올린다.",
   "options": [
    {
     "key": "A",
     "text": "Extend the enumeration to 60 entries, adding the new async library's misuse idioms as issues to flag and the in-house result-wrapper idiom as an explicit exclusion the bot must never report."
    },
    {
     "key": "B",
     "text": "Replace part of the enumeration with three targeted few-shot examples that put a genuine issue and an accepted in-house pattern side by side, each with the reasoning for why it was flagged or skipped."
    },
    {
     "key": "C",
     "text": "Add \"use your judgment and flag anything that looks like a concurrency problem or a swallowed error\" to the prompt, so the bot is no longer limited to the patterns that happen to have been written down in the enumeration."
    },
    {
     "key": "D",
     "text": "Run the review twice — once with the pattern list and once with the list removed — and merge the two sets of findings, so anything either pass catches still reaches the pull request."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "d4-4.2-short-01",
   "kind": "domain",
   "domain": "D4",
   "format": "short",
   "scenario": "structured-extraction",
   "linked_ts": [
    "4.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.2 (few-shot for varied document structures, informal measurements, reducing extraction hallucination)"
   ],
   "context": null,
   "question": "An extraction pipeline pulls dosage information from clinical study PDFs into a `dose` field. Three paragraphs of detailed written instructions cover units, rounding, and normalization, and the pipeline is accurate on studies that present dosage in a table.\n\nOn studies where dosage appears inline in prose — *\"participants received roughly two tablespoons twice daily\"* — it fails in two ways: sometimes `dose` comes back empty, and sometimes it comes back as a precise milligram figure that appears nowhere in the document.\n\nWhich prompting technique addresses both failures, and how would you construct it?",
   "explanation": null,
   "ko": "**상황.** 임상연구 PDF에서 `dose`를 추출. 단위·반올림·정규화에 대한 상세 지시가 이미 세 문단 있고, **표** 형태 연구에서는 정확. 산문 인라인(*\"participants received roughly two tablespoons twice daily\"*)에서는 두 방향으로 실패 — `dose`가 **비어서** 오거나, 문서 어디에도 없는 **정밀한 mg 수치**로 온다.\n\n**정답: few-shot examples.** 이 기법이 정확히 겨냥하는 상황 — 상세 지시가 **이미 있는데도** 출력이 불일치하고, 변동이 규칙이 아니라 **문서 구조**에 있다.\n\n**채점 포인트(한국어로):**\n- 상세 지시만으로 불일치가 남을 때의 지렛대로 **few-shot prompting**을 지목\n- **2–4개 targeted examples**, 그것도 실제로 관측된 구조(표 vs 인라인 산문)에서 뽑을 것 — 일반적 예시 아님\n- **모호/비공식 측정(informal measurement)** 케이스 예시 + 그 처리를 고른 **reasoning** 포함 → 이게 mg 날조를 막는다(\"roughly two tablespoons\"를 **있는 그대로 기록**하고 정밀도로 변환하지 않음을 시연)\n- 정보가 **진짜 부재**할 때의 올바른 출력(`null` 또는 `\"unclear\"`)을 시연하는 예시 → 이게 빈 추출을 막는 anti-hallucination 절반. \"문서에 없음\"을 **정당한 출력으로 명시 시연**해야 모델이 빈칸을 메우려는 압력에서 벗어난다\n- 표 형태(이미 되는 케이스)도 한 개 넣어, 예시가 \"산문만이 유일한 형태\"라고 잘못 가르치지 않게 할 것\n- ⚠️ 지시를 더 엄격히 다시 쓰는 것만 제안하거나, 나쁜 값을 사후 필터링하는 답은 감점\n\n**연결(4.3):** `dose`가 **`required`이면 모델은 값을 지어내도록 압력받는다.** nullable로 바꿔 예시가 가르치려는 압력 자체를 제거할 것.",
   "model_answer": "**Few-shot examples.** This is the situation the technique is for: detailed instructions alone are already in place and still produce inconsistent results, and the variation is in *document structure* rather than in the rules themselves. Instructions describe the target; examples demonstrate the handling of the cases that instructions keep failing to pin down.\n\nBuild **2–4 targeted examples** covering the structures actually observed, not generic ones:\n\n1. A **table-form** study — the case that already works, included so the examples do not accidentally teach that prose is the only shape.\n2. An **inline-prose informal measurement** — \"roughly two tablespoons twice daily\" — showing the correct output recording the measurement as stated, plus the reasoning for why it was not converted into a milligram figure.\n3. A study where the dose is **genuinely absent** from the text, showing the correct output as `null` or `\"unclear\"` rather than a value.\n\nExample 2 addresses the fabricated milligram figures: the demonstrated reasoning shows that an informal measurement is preserved, not silently converted into precision the source never contained. Example 3 addresses the empty extractions, by making \"the document does not state it\" an explicitly demonstrated, legitimate output rather than a gap the model feels pressure to fill.\n\nPair this with schema design (TS 4.3): if `dose` is a **required** field, the model is being pushed to fabricate a value to satisfy it. Making it nullable removes the pressure that the examples are teaching around.",
   "grading": "- Names **few-shot prompting** as the lever when detailed instructions alone still produce inconsistency\n- Specifies **2–4 targeted examples** drawn from the varied document structures actually seen (table vs inline prose)\n- Includes an example demonstrating the **ambiguous / informal-measurement** case, with the reasoning for the chosen handling\n- Includes an example demonstrating correct output when the information is **genuinely absent** — this is the anti-hallucination half\n- Does not propose only rewriting the instructions more strictly, and does not propose post-hoc filtering of bad values"
  },
  {
   "id": "d4-4.3-choice-01",
   "kind": "domain",
   "domain": "D4",
   "format": "choice",
   "scenario": "structured-extraction",
   "linked_ts": [
    "4.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.3 (tool_use with JSON schema, tool_choice modes, syntax vs semantic errors)"
   ],
   "context": "A shipping-manifest extraction service prompts Claude in plain text for JSON and parses the reply. Over 20,000 documents:\n\n- **3.1%** fail `JSON.parse` — trailing commentary after the closing brace, or the object wrapped in a markdown code fence.\n- **5.8%** parse cleanly but are wrong: the consignee's street address has been written into the `consignee_name` field.\n\nDownstream enrichment must not run until the manifest metadata has been extracted.",
   "question": "Which change is correct, and what does it leave unsolved?",
   "explanation": "**D is correct**, and the second half of the sentence is what the item is testing. Tool use with a JSON schema is the most reliable route to guaranteed schema-compliant output — the model's arguments are validated against the schema, so trailing prose and code fences stop being possible failure modes. Forcing the specific tool by name is the right `tool_choice` here because enrichment depends on this particular extraction having run.\n\nWhat it does not do is make the values right. `consignee_name` is typed as a string, and a street address is a string. The schema is satisfied and the extraction is wrong. Strict schemas eliminate **syntax** errors, not **semantic** ones — that 5.8% belongs to validation and retry-with-feedback (TS 4.4) or to few-shot examples (TS 4.2).\n\n**B** is the most attractive wrong answer, and it is 80% right: tool use plus a JSON schema is exactly the correct mechanism, so the option reads as correct on first pass. Two things are wrong. `tool_choice: \"auto\"` permits the model to return **text instead of calling the tool**, which leaves a residue of exactly the unparseable responses you were eliminating — `\"auto\"` is the wrong mode when structured output is mandatory. And the claim that it fixes field placement is the syntax/semantics conflation the guide calls out by name.\n\n**A** does not exist. There is no `json_mode` request flag on the Messages API; the answer to guaranteed schema compliance is tool use. The option is attractive because a one-line boolean is what you *want* to be true, and because other vendors' APIs do offer a switch shaped like this — which is precisely why it is worth being able to reject on sight.\n\n**C** keeps compliance probabilistic. The prompt already asks for JSON; asking harder moves 3.1% toward 1% and never to zero, and every remaining failure is a document that has to be reprocessed. Its second clause happens to be true, which makes it the second-most tempting option.",
   "ko": "**상황.** 선적 manifest 추출을 평문 프롬프트로 JSON 요청 → 텍스트 파싱. 2만 건 중 **3.1%**는 `JSON.parse` 실패(닫는 중괄호 뒤 잡담, markdown fence), **5.8%**는 파싱은 되는데 값이 틀림(수하인 **주소**가 `consignee_name`에 들어감). 후속 enrichment는 manifest metadata 추출 전에 돌면 안 됨.\n\n**정답 D** — schema를 가진 추출 도구를 정의하고 `tool_choice: {\"type\": \"tool\", \"name\": \"extract_manifest\"}`로 **강제**. 파싱 실패는 사라지지만 **필드 오배치는 안 사라진다.** 문항이 시험하는 건 이 문장의 후반부다. enrichment가 이 특정 추출에 의존하므로 **forced**가 맞는 모드.\n\n⚠️ **왜 값은 안 고쳐지나:** `consignee_name`은 string 타입이고 거리 주소도 string이다. **schema는 만족되고 추출은 틀렸다.** strict schema는 **syntax** 오류를 없애지 **semantic** 오류를 없애지 않는다 — 그 5.8%는 4.4(validation + retry-with-feedback) 또는 4.2(few-shot) 소관.\n\n**가장 매력적인 오답 B** — 같은 도구+schema인데 `tool_choice: \"auto\"`, 그리고 \"둘 다 없앤다\". **80% 맞아서** 처음 읽으면 정답으로 읽힌다. 두 곳이 틀렸다: ① `\"auto\"`는 모델이 **도구를 안 부르고 텍스트로 답하는 것을 허용**하므로 없애려던 파싱 불가 응답이 잔존한다 — 구조화 출력이 필수일 때 쓸 모드가 아니다 ② \"필드 배치까지 고친다\"는 가이드가 이름 붙여 경고하는 **syntax/semantics 혼동**.\n\n**A** — `\"json_mode\": true`. **does not exist.** Messages API에 그런 요청 플래그는 없고, schema 준수의 답은 tool use다. 한 줄 boolean이 \"그랬으면 좋겠는\" 것이고 **다른 벤더 API에는 이런 모양의 스위치가 실제로 있어서** 매력적 — 그래서 보자마자 기각할 수 있어야 한다.\n\n**C** — \"code fence도 잡담도 없이 JSON만\" 프롬프트 강화. 준수가 여전히 확률적. 프롬프트는 이미 JSON을 요청했고, 더 세게 요청하면 3.1%가 1%로 갈 뿐 0이 되지 않는다. 후반 절은 **우연히 참**이라 두 번째로 유혹적.",
   "options": [
    {
     "key": "A",
     "text": "Add `\"json_mode\": true` to the request so the API constrains the response to a raw JSON object with no fences or commentary; this removes the parse failures and the field-placement errors together."
    },
    {
     "key": "B",
     "text": "Define an extraction tool with a strict JSON schema and set `tool_choice: \"auto\"` so the model calls it whenever the input is a manifest; this removes both failure classes."
    },
    {
     "key": "C",
     "text": "Strengthen the prompt to say \"output only the JSON object, with no code fences and no commentary\"; this removes the parse failures, and the field-placement errors need separate work."
    },
    {
     "key": "D",
     "text": "Define an extraction tool with a JSON schema and force it with `tool_choice: {\"type\": \"tool\", \"name\": \"extract_manifest\"}`; this removes the parse failures but not the field-placement errors."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "d4-4.3-recall-01",
   "kind": "domain",
   "domain": "D4",
   "format": "recall",
   "scenario": "structured-extraction",
   "linked_ts": [
    "4.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.3"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": "**빈칸 정답과 요점:**\n\n- **syntax** / **semantic** — tool use + JSON schema는 **syntax** 오류를 제거하고 **semantic** 오류는 못 막는다. ⚠️ line item 합이 stated total과 안 맞아도 schema는 만족된다. 4.3의 명시된 한계이자 D4 전체의 이음매.\n- **text** — `tool_choice: \"auto\"`는 모델이 도구 대신 **텍스트**로 답하는 걸 허용한다. 즉 **보장이 아니다** — 구조화 출력이 필수인 자리에 `\"auto\"`를 놓는 선택지는 오답.\n- **choose which** — `\"any\"`는 도구 호출은 강제하되 **어느 도구인지는 모델이 고른다.** 추출 schema가 여러 개이고 문서 타입을 미리 모를 때의 설정. (특정 추출을 반드시 돌려야 하면 forced `{\"type\":\"tool\",\"name\":...}`)\n- **optional** — 소스 문서에 없을 수 있는 필드는 **optional(nullable)**로 선언한다.\n- **fabricate** — 그러지 않고 `required`로 두면 모델이 그 제약을 만족시키려 값을 **지어낸다**. ⚠️ `required`는 완전성 보장이 아니라 **fabrication pressure**다. \"완전성을 위해 더 많이 required로\"는 항상 오답.",
   "cloze": "Tool use with a JSON schema eliminates {{syntax}} errors but not {{semantic}} errors — line items that do not sum to the stated total still satisfy the schema.\n\n`tool_choice: \"auto\"` lets the model return {{text}} instead of calling a tool. `tool_choice: \"any\"` requires a tool call but lets the model {{choose which}} one — the right setting when several extraction schemas exist and the document type is unknown.\n\nA field the source document may not contain should be declared {{optional}} (nullable), so the model does not {{fabricate}} a value in order to satisfy a required field."
  },
  {
   "id": "d4-4.4-choice-01",
   "kind": "domain",
   "domain": "D4",
   "format": "choice",
   "scenario": "structured-extraction",
   "linked_ts": [
    "4.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.4 (retry with error feedback; limits of retry when information is absent)"
   ],
   "context": "An invoice extraction pipeline validates every result and retries any failure up to three times by resending the original prompt unchanged. One week of production shows two failure classes:\n\n- **Class 1 (~4%)** — the `line_items` array sums to a figure different from `total_amount`. Inspecting the PDFs, every number needed is printed on the invoice.\n- **Class 2 (~2%)** — `purchase_order_number` returns empty. Inspecting the PDFs, the PO number is not printed on those invoices at all; it exists only in the procurement system.\n\nClass 2 currently consumes three full retries per document and then fails anyway.",
   "question": "What change makes the retry policy correct?",
   "explanation": "**A is correct**, and it is correct twice. Class 1 is what retry-with-error-feedback is for: the information is present in the source and the model produced a structurally wrong answer, so a follow-up request containing the **original document, the failed extraction, and the specific validation errors** gives it what it needs to self-correct. Class 2 is the documented limit of retry — the required information is simply absent from the source. No number of attempts can extract a value that was never there; the only outcomes available are failure or fabrication. That path belongs to a different system.\n\n**C** is the most attractive wrong answer, because both schema changes it proposes are genuinely correct moves elsewhere in this domain. Making `purchase_order_number` nullable is exactly right — it stops the model inventing a PO number to satisfy a required field (TS 4.3). Extracting `calculated_total` alongside `stated_total` is the named self-correction validation flow for detecting the class-1 discrepancy in the first place. The problem is that the question is about the **retry policy**, and C leaves it untouched: class 2 still burns three attempts on information that does not exist, and class 1 still retries with the same prompt and no feedback. C improves the detection and the schema, and fixes neither failure.\n\n**B** is the reflex answer. It does nothing at all for class 2 by construction — five attempts at absent information is worse than three. And for class 1 it misses what makes retry work: the value is in feeding back the *specific* validation error, not in trying again. Resending an unchanged prompt gives the model nothing it did not have the first time.\n\n**D** is the \"fixes a different problem\" distractor. Batch processing is a cost and throughput lever, not a correctness one — it would make the futile class-2 retries cheaper and slower, which is not the goal, and this pipeline's latency profile was never the complaint.\n\n> Retry when the failure is **format or structure**. Route elsewhere when the failure is **missing information**.",
   "ko": "**상황.** 인보이스 추출이 실패 시 **원 프롬프트를 그대로 재전송**해 최대 3회 재시도. 두 부류: **Class 1(~4%)** `line_items` 합 ≠ `total_amount` — 필요한 숫자는 **전부 인보이스에 인쇄돼 있음**. **Class 2(~2%)** `purchase_order_number`가 빈 값 — 그 인보이스에는 **PO 번호가 아예 인쇄돼 있지 않고** procurement 시스템에만 존재. Class 2는 매번 3회를 다 쓰고 결국 실패.\n\n**정답 A** — 두 번 옳다. Class 1은 retry-with-error-feedback의 정확한 용도(정보가 소스에 있고 구조만 틀림) → **original document + failed extraction + specific validation errors**를 실은 후속 요청. Class 2는 ⚠️ **retry의 문서화된 한계** — 정보가 소스에 없다. 시도를 아무리 늘려도 없던 값은 안 나오고, 가능한 결말은 실패 아니면 날조뿐 → **procurement 시스템 조회로 라우팅**.\n\n**가장 매력적인 오답 C** — `purchase_order_number`를 optional로, `calculated_total`을 `stated_total`과 함께 추출, **retry 정책은 유지**. ⚠️ 제안된 두 schema 변경이 **이 도메인의 다른 자리에서는 전부 정답**이라서 매력적이다(nullable=날조 방지 4.3, `calculated_total`=class 1 불일치 검출의 명시된 자기교정 흐름). 그런데 질문은 **retry policy**를 묻는다. C는 그걸 손대지 않으므로 class 2는 여전히 없는 정보에 3회를 태우고, class 1은 여전히 피드백 없는 같은 프롬프트로 재시도한다. **검출과 schema는 개선하고 두 실패 모두 못 고침.**\n\n**B** — 재시도 5회 + \"산술을 다시 확인하고 문서 전체를 읽어라\". 반사적 오답. Class 2엔 구성상 무의미(없는 정보에 5회는 3회보다 나쁨). Class 1엔 retry를 작동시키는 핵심을 놓쳤다 — 값은 **specific validation error를 되먹이는 데** 있지 다시 시도하는 데 있지 않다.\n\n**D** — Message Batches API로 이전해 낭비되는 재시도를 50% 싸게. fixes a different problem. batch는 **비용·처리량** 레버지 correctness 레버가 아니다. 무의미한 class 2 재시도를 더 싸고 더 느리게 만들 뿐이고, 이 파이프라인의 지연시간은 애초에 불만 사항이 아니었다.\n\n> 실패가 **format/structure**면 retry, **missing information**이면 다른 데로 라우팅.",
   "options": [
    {
     "key": "A",
     "text": "Retry class 1 with a follow-up request carrying the original document, the failed extraction, and the specific validation errors; stop retrying class 2 and route those invoices to a procurement-system lookup."
    },
    {
     "key": "B",
     "text": "Raise the retry limit from three to five for both classes and add \"double-check your arithmetic and read the whole document before answering\" to the prompt, so every attempt is made more carefully than the last."
    },
    {
     "key": "C",
     "text": "Make `purchase_order_number` optional in the schema and extract `calculated_total` alongside `stated_total` so the arithmetic mismatch is detected at validation time, keeping the existing retry policy in place."
    },
    {
     "key": "D",
     "text": "Move the pipeline to the Message Batches API so the wasted retries cost 50% less, absorbing both failure classes into the budget without changing how many attempts each document gets."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "d4-4.4-short-01",
   "kind": "domain",
   "domain": "D4",
   "format": "short",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "4.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.4 (detected_pattern for systematic analysis of dismissal patterns)"
   ],
   "context": null,
   "question": "A CI review agent emits structured findings shaped `{file, line, severity, message, suggested_fix}`, where `message` is free text. Developers dismiss roughly a third of all findings, and every dismissal is logged.\n\nThe team wants to know **which code constructs** are generating the dismissed findings, so they can fix the prompt for those specifically. With the current payload nobody can answer the question — the dismissal log is thousands of rows of prose.\n\nWhat single schema change enables the analysis, and what does the team do with the result?",
   "explanation": null,
   "ko": "**상황.** CI 리뷰 에이전트가 `{file, line, severity, message, suggested_fix}` 구조로 finding을 내보내는데 `message`는 자유 텍스트. 전체 finding의 약 1/3이 기각되고 기각은 모두 로깅된다. 팀은 **어떤 코드 construct가** 기각된 finding을 만드는지 알고 싶은데, 현재 페이로드로는 답할 수 없다 — 기각 로그가 수천 행의 산문이다.\n\n**정답: 각 finding에 `detected_pattern` 필드 추가.**\n\n**채점 포인트(한국어로):**\n- **`detected_pattern`**을 지목 — finding을 촉발한 코드 construct의 **안정적·기계 비교 가능한 식별자**(`unchecked_map_access`, `await_inside_loop`, `broad_except_clause`), finding마다 새로 쓰는 게 아니라 **통제된 집합**에서. `\"other\"` + detail 문자열을 남겨 새 construct도 어휘를 깨지 않고 담을 것\n- 자유 텍스트 `message`가 왜 이 일을 못 하는지 설명 — finding마다 새로 표현되므로 **동일 construct의 두 기각이 서로 다른 문자열**이 되어 group by가 안 됨. 집계에는 **stable key**가 필요\n- 루프를 닫을 것: 기각 로그를 `detected_pattern`으로 조인해 **패턴별 기각률로 랭킹** → 오탐은 고르게 퍼지지 않고 **소수 패턴에 집중**된다(그 집중이 측정의 요점)\n- 개선으로 연결: 최악 패턴에 대해 **explicit criteria**로 진짜 이슈와 수용된 변종을 구분해 다시 쓰고 **few-shot으로 양쪽을 시연**(4.1·4.2), 그 작업 중에는 최악 카테고리를 **임시 비활성화**해 정확한 카테고리의 신뢰를 지킬 것\n- 변경 후 **같은 필드로 재측정** — 이 필드는 문제뿐 아니라 **개선을 관측 가능하게** 만드는 장치\n- ⚠️ 전체 기각 수만 세거나, 수작업 샘플링, 개발자에게 자유 텍스트 피드백을 요청하는 답으로 만족하면 감점",
   "model_answer": "Add a **`detected_pattern`** field to each structured finding: a stable, machine-comparable identifier for the code construct that triggered it — `unchecked_map_access`, `await_inside_loop`, `broad_except_clause` — drawn from a controlled set rather than written freshly per finding. Keep an `\"other\"` value plus a detail string so genuinely novel constructs are still capturable without breaking the vocabulary.\n\n`message` cannot serve this purpose no matter how good it is. It is phrased anew for each finding, so two dismissals of the identical construct are two different strings and will not group. Aggregation needs a stable key, and that is what `detected_pattern` is for.\n\nWith it in place, the loop closes:\n\n1. Join the dismissal log to `detected_pattern` and rank patterns by dismissal rate. False positives will be concentrated in a small number of patterns rather than spread evenly — that concentration is the whole point of measuring.\n2. For the worst patterns, rewrite the prompt with **explicit criteria** distinguishing the genuine issue from the accepted variant, and add few-shot examples showing both sides (TS 4.1, 4.2).\n3. **Temporarily disable** the worst offenders while that rewrite is in flight, so their false positives stop eroding trust in the categories that are accurate.\n4. Re-measure the same field after the change — the field is what makes the improvement observable, not just the problem.",
   "grading": "- Names **`detected_pattern`** as a stable, comparable identifier attached to each structured finding\n- Explains why free-text `message` cannot be aggregated (phrasing varies, no stable key)\n- Closes the loop: group dismissals by pattern to identify the high-false-positive constructs\n- Connects to remediation — explicit criteria / few-shot for those patterns, and temporary disabling of the worst while fixing\n- Does not settle for counting total dismissals, sampling by hand, or asking developers to write free-text feedback"
  },
  {
   "id": "d4-4.5-choice-01",
   "kind": "domain",
   "domain": "D4",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "4.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.5 (Message Batches API: 50% savings, 24h window, no latency SLA; custom_id; sample refinement)"
   ],
   "context": "A platform team runs two Claude workloads.\n\n**Workload 1** — a pre-merge review that must post before a pull request is allowed to merge. Developers wait on it; p95 is currently 40 seconds.\n\n**Workload 2** — a compliance audit over roughly 12,000 archived contracts, submitted Saturday night and read by the risk team on Monday morning.\n\nFinance has asked for a spend reduction. An engineer proposes moving both workloads to the Message Batches API for the 50% saving.",
   "question": "What is the correct response to the proposal?",
   "explanation": "**C is correct.** Workload 2 is the textbook fit: non-blocking, latency-tolerant, and submitted Saturday for Monday consumption — comfortably inside the up-to-24-hour processing window, for half the cost. `custom_id` is the mechanism that makes it operable at 12,000 items: it correlates each response back to its source contract, and when some subset fails it identifies exactly which ones to resubmit rather than forcing a rerun of the whole set. Workload 1 blocks a merge, which is a hard latency requirement, and hard latency requirements belong on the synchronous API.\n\n**A** is the most attractive wrong answer because its premise is often true in practice — batches frequently do return quickly. That is exactly the trap. The Message Batches API offers **no guaranteed latency SLA**; \"usually fast\" is an observation, not a contract. Architecting a blocking merge gate on an unguaranteed latency means the design is correct until the day the window stretches, and that day presents as the entire engineering org unable to merge.\n\n**B** does not exist. The Message Batches API has no per-request timeout or synchronous-fallback control of this kind. It is attractive because a hedge is what a careful engineer would reach for, and the name sounds like something that ought to be there — which makes it a useful reflex to check. The underlying instinct is also wrong: a batch you may abandon after 60 seconds is a synchronous call with extra steps and no saving.\n\n**D** has the right instinct at the wrong scale. Refining the prompt on a **sample** before batch-processing large volumes is genuinely recommended — it raises first-pass success and cuts resubmission cost. Running the *entire* 12,000 synchronously spends full price on precisely the volume the exercise was meant to discount, and does it before the discount applies.",
   "ko": "**상황.** **Workload 1** = pre-merge 리뷰, 통과해야 merge 허용, 개발자가 대기, p95 40초. **Workload 2** = 아카이브 계약서 약 12,000건 컴플라이언스 감사, 토요일 밤 제출 → 월요일 아침 리스크팀이 읽음. 재무가 비용 절감 요구 → 엔지니어가 **둘 다** Message Batches API로 옮기자고 제안.\n\n**정답 C** — workload 2만 batch, `custom_id`로 응답↔계약서 대응, **workload 1은 synchronous 유지**. Workload 2는 교과서적 적합: 비차단·지연 허용·토요일 제출 월요일 소비로 **최대 24시간 window 안에 여유 있게** 들어가고 비용 절반. `custom_id`는 12,000건 규모를 운영 가능하게 만드는 장치 — 응답을 원 계약서에 되짚고, 일부 실패 시 **어느 것만 재제출할지** 특정한다. Workload 1은 merge를 막는 **hard latency requirement**이고, 그건 synchronous API 소관.\n\n**가장 매력적인 오답 A** — \"batch도 보통 몇 분이면 돌아오니 pre-merge도 동기처럼 느껴질 것\". ⚠️ **전제가 실무에서 자주 참이라서** 매력적이고, 바로 그게 함정이다. Message Batches API는 **no guaranteed latency SLA** — \"보통 빠름\"은 **관찰이지 계약이 아니다.** 보장되지 않은 지연시간 위에 blocking merge gate를 지으면, window가 늘어나는 날 **엔지니어링 조직 전체가 merge 불가**로 나타난다.\n\n**B** — pre-merge batch에 `max_wait`를 걸어 60초 안에 안 끝나면 synchronous로 fallback. **does not exist.** Message Batches API에 그런 요청별 타임아웃·동기 fallback 제어는 없다. 신중한 엔지니어가 반사적으로 원하는 hedge라서, 그리고 이름이 \"있을 법해서\" 매력적이다. 발상 자체도 틀렸다 — **60초 후 버릴 수 있는 batch는 절차만 늘어난 동기 호출이고 절감도 없다.**\n\n**D** — workload 2만 batch로 옮기되 먼저 12,000건 전체를 동기로 한 번 돌려 프롬프트 검증. 직관은 맞고 **스케일이 틀렸다.** 대량 투입 전 **샘플**로 프롬프트를 정제하는 건 실제 권장 사항(첫 패스 성공률↑, 재제출 비용↓). 하지만 **전체 12,000건**을 동기로 돌리면 할인받으려던 바로 그 물량을 정가로, 그것도 할인 적용 전에 태운다.",
   "options": [
    {
     "key": "A",
     "text": "Move both. Batches typically return within minutes, so the pre-merge check will still feel synchronous to developers."
    },
    {
     "key": "B",
     "text": "Move both, but set `max_wait` on the pre-merge batch so it falls back to the synchronous API if it has not completed in 60 seconds."
    },
    {
     "key": "C",
     "text": "Move only workload 2, using `custom_id` to correlate each response to its contract; keep workload 1 on the synchronous API."
    },
    {
     "key": "D",
     "text": "Move only workload 2, but first run all 12,000 contracts once synchronously to confirm the prompt is correct."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d4-4.5-recall-01",
   "kind": "domain",
   "domain": "D4",
   "format": "recall",
   "scenario": null,
   "linked_ts": [
    "4.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.5"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": "**빈칸 정답과 요점:**\n\n- **50%** — Message Batches API의 비용 절감폭. 세 팩트(절감·window·SLA 없음)가 이 TS의 사실적 핵심이고, ⚠️ **그 이상으로 추론하지 말 것.**\n- **24 hours** — 최대 처리 window. 지문에 end-to-end SLA가 있으면 여기서 **거꾸로 계산**해 제출 주기를 잡는다.\n- **latency SLA** — 보장된 지연시간이 **없다**. 그래서 야간 리포트·주간 감사에는 맞고 pre-merge check에는 안 맞는다. ⚠️ \"보통 몇 분이면 끝난다\"는 관찰이지 계약이 아니다.\n- **pre-merge** — 사람이 PR 위에서 기다리는 blocking 경로. batch 적합성 판단은 언제나 **\"누가 기다리고 있나\"** 한 질문.\n- **`custom_id`** — 요청마다 실어 응답을 입력에 대응시키고, **실패한 항목만** 재제출하는 핸들. (\"batch 결과는 대응시킬 수 없다\"는 false-premise 오답으로 나온다.)\n- **multi-turn tool calling** — batch가 **지원하지 않는** 것. 한 요청 안에서 도구를 실행해 결과를 모델에 되먹일 수 없다 → **에이전틱 루프가 필요한 작업은 지연 허용 여부와 무관하게 batch 불가.** 이건 판단이 아니라 **capability** 문제라 그 선택지는 즉시 기각.",
   "cloze": "The Message Batches API gives {{50%}} cost savings with a processing window of up to {{24 hours}}, but offers no guaranteed {{latency SLA}} — which is why it suits overnight reports and weekly audits and not {{pre-merge}} checks.\n\nEach request carries a {{custom_id}}, used to correlate responses back to their inputs and to resubmit only the items that failed.\n\nOne capability the batch API does **not** support is {{multi-turn tool calling}} within a single request — tools cannot be executed mid-request with their results returned to the model."
  },
  {
   "id": "d4-4.6-choice-01",
   "kind": "domain",
   "domain": "D4",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "4.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.6 (self-review limitations; independent instances; per-file plus integration passes)"
   ],
   "context": "An agent generates a scheduling module — about 600 lines across four files — and is then asked, in the same session, to review what it just wrote. Its review returns naming suggestions and a comment about test coverage, and concludes the implementation is correct. Three reviews of three different modules have gone the same way.\n\nQA later finds a real defect: the caller in `scheduler.py` passes a timeout in milliseconds, while the helper in `retry_policy.py` treats the argument as seconds. Every retry waits a thousand times too long.",
   "question": "Which change is most likely to catch this class of defect?",
   "explanation": "**B is correct**, and it fixes two distinct things. First, **independence**: a model reviewing its own output in the same session still holds the reasoning it used while generating, which makes it far less likely to question a decision it just made — an instance with no generation context arrives without that commitment. Second, **structure**: a millisecond/second mismatch between a caller and a callee is a cross-file data-flow issue, and per-file passes are structurally blind to it by definition. Splitting into focused per-file passes for local issues plus an explicit integration pass for data flow between files is what puts this defect inside somebody's remit, while also keeping attention from diluting across 600 lines.\n\n**A** is the instruction the guide answers head-on. The model is not failing to try; it is reasoning from a context in which the seconds interpretation was already settled. Telling it to be critical does not remove the context that makes it uncritical — you get a more thorough-sounding review that reaches the same conclusion.\n\n**C** is the most attractive wrong answer, because extended thinking genuinely does improve hard reasoning, and it reads as a strictly stronger version of A — more capability, not just more instruction. It does not help here. Longer reasoning in the same session still starts from the same premise that the timeout unit was correct; deeper thought from a contaminated starting point converges on the same answer with more confidence. The missing property is **independence**, and thinking budget is not a substitute for it. Independent review instances are more effective at catching subtle issues than either self-review instructions or extended thinking.\n\n**D** is expensive and off-target. Diffing two generations tells you where the model is *inconsistent*, not which side is *right* — and since both come from the same specification and the same model, the specification's silence on units is very likely to produce the identical mismatch twice, at which point the diff is clean and the bug is invisible.",
   "ko": "**상황.** 에이전트가 4개 파일 약 600줄의 스케줄링 모듈을 생성한 뒤 **같은 세션에서** 자기가 쓴 걸 리뷰. 결과는 네이밍 제안과 테스트 커버리지 언급뿐, 구현은 정확하다고 결론. 서로 다른 모듈 3건이 모두 같은 양상. 나중에 QA가 진짜 결함 발견 — `scheduler.py` 호출부는 timeout을 **밀리초**로 넘기고 `retry_policy.py` 헬퍼는 **초**로 취급. 모든 재시도가 1000배 대기.\n\n**정답 B** — 생성 컨텍스트가 **없는** 두 번째 독립 Claude 인스턴스로 보내되, **파일별 패스(로컬 이슈) + 별도 cross-file integration 패스**로 구성. 두 가지를 동시에 고친다: ① **independence** — 같은 세션에서 자기 출력을 리뷰하는 모델은 생성할 때 쓴 추론을 그대로 들고 있어 **방금 내린 결정을 의심하기 어렵다.** 생성 컨텍스트 없는 인스턴스는 그 기득권 없이 도착한다. ② **structure** — ms/s 불일치는 호출자↔피호출자 간 **cross-file 데이터 흐름** 문제라 파일별 패스만으로는 정의상 안 보인다. integration 패스가 그 결함을 누군가의 담당 범위 안에 넣고, 동시에 600줄에 주의가 희석되는 것도 막는다.\n\n**A** — \"네 가정을 비판적으로 의심하고 네가 넣었을 버그를 적극 찾아라\"를 self-review 프롬프트에 추가. 가이드가 정면으로 답하는 지시다. ⚠️ 모델은 **노력을 안 하는 게 아니라**, seconds 해석이 이미 확정된 컨텍스트에서 추론하고 있다. 비판적이 되라고 해도 **비판적이지 못하게 만드는 컨텍스트가 사라지지 않는다** — 더 철저해 보이는 리뷰가 같은 결론에 도달할 뿐.\n\n**가장 매력적인 오답 C** — self-review 턴에 extended thinking 활성화. extended thinking은 어려운 추론에 실제로 도움이 되고, **A의 \"더 강한 버전\"(지시가 아니라 역량 추가)처럼 읽혀서** 가장 유혹적이다. ⚠️ 여기선 안 통한다. 같은 세션에서 더 길게 추론해도 **timeout 단위가 맞다는 같은 전제에서 출발**한다 — 오염된 출발점에서의 깊은 사고는 같은 답에 **더 큰 확신**을 얹어 수렴한다. 빠진 속성은 **independence**이고, thinking budget은 그 대체재가 아니다. 독립 리뷰 인스턴스는 self-review 지시보다도, extended thinking보다도 미묘한 이슈를 잘 잡는다.\n\n**D** — 더 엄격한 명세로 처음부터 재생성해 두 버전을 diff. 비싸고 표적을 벗어남. diff는 모델이 **어디서 불일치하는지**를 알려줄 뿐 **어느 쪽이 옳은지**를 알려주지 않는다. 게다가 같은 명세·같은 모델이므로 단위에 침묵하는 명세는 **같은 불일치를 두 번** 만들 가능성이 크고, 그러면 diff는 깨끗하고 버그는 안 보인다.",
   "options": [
    {
     "key": "A",
     "text": "Add \"critically question your own assumptions and actively look for bugs you may have introduced\" to the self-review prompt, so the pass begins from suspicion of the code rather than from confirmation of it."
    },
    {
     "key": "B",
     "text": "Send the generated files to a second, independent Claude instance with no generation context — running per-file passes for local issues plus a separate cross-file integration pass."
    },
    {
     "key": "C",
     "text": "Enable extended thinking on the self-review turn with a large thinking budget, so the model reasons over the four files for considerably longer before it reports what it found."
    },
    {
     "key": "D",
     "text": "Regenerate the module from scratch against a stricter specification and diff the two versions, treating every place where the two implementations disagree as a candidate defect to investigate."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "d4-4.6-choice-02",
   "kind": "domain",
   "domain": "D4",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "4.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 4.6 (multi-pass review, attention dilution, per-finding confidence for calibrated routing)"
   ],
   "context": "A review agent receives a 31-file pull request as a single request and returns one flat list of findings. Three complaints, all measured:\n\n- Finding density is high across the first six files and the last three, and thin through the middle twenty — including a file with a known injected test defect that went unreported.\n- Two findings contradict each other: one recommends inlining a shared helper, another recommends extracting it further.\n- Triage takes a senior engineer over an hour, because every finding is presented with identical weight and must be read to be judged.",
   "question": "Which **two** changes address the problems described? *(Select 2)*",
   "explanation": "**A and D are correct.**\n\n**A** answers the first two symptoms with one change. The thin middle is attention dilution across a very large input — per-file passes give each file the model's full attention rather than a share of it, which is why the injected defect in file 17 goes from invisible to routine. The contradictory pair is the same cause seen from the other side: both findings came out of one enormous undifferentiated pass reasoning about the same helper from two directions. Separating local per-file analysis from an explicit cross-file integration pass gives cross-file questions a single place to be decided, so they are resolved rather than emitted twice.\n\n**D** answers the third. Per-finding self-reported confidence is the named mechanism for **calibrated review routing** — it does not make the findings better, it makes the triage proportional, which is exactly the complaint. The senior engineer stops reading everything at equal weight.\n\n**B** is the most attractive wrong answer, because it names both of the first two symptoms and asks for precisely the behaviour you want. It is an instruction issued against a structural limitation. Attention dilution over a large input is not a compliance failure the model can be asked to opt out of, and a model that produced two contradictory findings did not notice they were contradictory — asking it to check will not make it notice. This is the same family as \"be conservative\" in TS 4.1: a wish stated as a rule.\n\n**C** trades the problem for a worse one. The middle files stop being under-reviewed by not being reviewed at all, and the cross-file data-flow analysis loses exactly the files it needed to trace through. Coverage is the thing you were trying to buy.\n\n**E** is a real parameter aimed at the wrong mechanism. Temperature governs sampling variability, not where attention lands across a long input; raising it on a review task produces more speculative findings, which is a direct increase in the false-positive rate the triage engineer is already drowning in.",
   "ko": "**상황.** 31개 파일 PR을 **한 요청**으로 받아 finding 하나의 평면 목록으로 반환. 측정된 불만 셋: ① finding 밀도가 앞 6개·뒤 3개 파일에 몰리고 **가운데 20개는 희박** — 주입해둔 테스트 결함이 있는 파일도 미보고 ② 두 finding이 서로 **모순**(공유 헬퍼를 인라인하라 vs 더 추출하라) ③ 모든 finding이 동일 가중치로 제시돼 시니어 트리아지에 1시간 초과. **(2개 선택)**\n\n**정답 A + D.**\n\n**A**(파일별 로컬 패스 + 별도 cross-file integration 패스) — 앞의 두 증상을 한 변경으로 답한다. 희박한 가운데는 거대 입력에 대한 **attention dilution**이고, 파일별 패스는 각 파일에 주의의 *지분*이 아니라 *전부*를 준다(17번 파일의 주입 결함이 보이게 되는 이유). 모순 쌍은 같은 원인의 다른 얼굴 — 하나의 거대한 미분화 패스가 같은 헬퍼를 두 방향에서 추론한 결과다. 로컬 분석과 cross-file 분석을 분리하면 cross-file 질문이 **결정될 자리가 하나** 생겨 두 번 배출되는 대신 해소된다.\n\n**D**(finding마다 self-reported confidence → 고신뢰는 작성자에게 직행, 저신뢰는 사람 리뷰어로) — 세 번째를 답한다. ⚠️ 이것이 4.1과 화해되는 지점이다: **confidence를 프롬프트 안의 필터로 쓰면 오답, 구조화 출력 위의 라우팅 신호로 쓰면 정답.** finding을 더 좋게 만들지 않고 **트리아지를 비례적으로** 만든다 — 그게 정확히 세 번째 불만.\n\n**가장 매력적인 오답 B** — \"모든 파일에 동등한 주의를 기울이고, 보고 전에 모순을 스스로 점검하라\". 앞의 두 증상을 **이름으로 지목하고 원하는 행동을 정확히 요구**해서 매력적이다. ⚠️ 구조적 한계에 지시를 발행한 것이다. 긴 입력에 대한 attention dilution은 모델이 요청받아 빠져나올 수 있는 준수 실패가 아니고, 모순된 두 finding을 낸 모델은 **애초에 모순임을 알아채지 못했다** — 점검하라고 해도 알아채게 되지 않는다. 4.1의 \"be conservative\"와 같은 족속: **규칙의 형태를 한 소망.**\n\n**C** — 가장 큰 10개 파일로 리뷰 축소. 문제를 더 나쁜 문제와 교환. 가운데 파일들이 **부실 리뷰에서 무리뷰로** 바뀌고, cross-file 데이터 흐름 분석은 추적해야 할 파일을 잃는다. 커버리지가 원래 사려던 것이었다.\n\n**E** — temperature를 올려 finding이 파일 전반에 더 다양하게 분포되게. 실재하는 파라미터를 **엉뚱한 메커니즘**에 겨눔. temperature는 샘플링 변동성을 지배하지 긴 입력에서 주의가 어디에 떨어지는지를 지배하지 않는다. 리뷰 작업에서 올리면 추측성 finding이 늘어 트리아지 담당이 이미 익사 중인 **오탐률을 직접 올린다.**",
   "options": [
    {
     "key": "A",
     "text": "Split the review into focused per-file passes for local issues, plus a separate cross-file integration pass that traces data flow and interface contracts between files."
    },
    {
     "key": "B",
     "text": "Instruct the model to give every file equal attention regardless of where it sits in the request, and to check its own findings against each other for contradictions before it returns the list."
    },
    {
     "key": "C",
     "text": "Restrict the review to the ten largest files in the pull request so the request stays comfortably small and the model's attention is not spread across all 31 files at once."
    },
    {
     "key": "D",
     "text": "Have the model self-report a confidence level with each finding, so that triage can prioritize reviewer attention — sending the low-confidence findings to a human first rather than reading the list in file order."
    },
    {
     "key": "E",
     "text": "Raise the temperature on the review request so that findings are distributed more variably across the file set instead of clustering at the start and end of the input."
    }
   ],
   "answer": [
    "A",
    "D"
   ],
   "multi": true
  },
  {
   "id": "d5-5.1-choice-01",
   "kind": "domain",
   "domain": "D5",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "5.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.1 (progressive summarization risks, persistent case facts block)"
   ],
   "context": "A support agent handles long multi-issue conversations. To keep the conversation inside its budget, the harness summarizes every ten turns, replacing the older turns with one paragraph.\n\nQA has three recurring complaints against the same sessions: the agent quotes a refund amount that does not match the order, it restates a delivery date the customer never agreed to, and it ignores that the customer said the replacement had to arrive before the 14th.\n\nReading one transcript, the summary of the first ten turns is: *\"Customer discussed a delayed order and asked about a refund.\"* The order number, the $148.50 total, the 30% restocking fee, and the customer's stated deadline are all gone from context by turn 12.",
   "question": "What change most directly fixes this?",
   "explanation": "**C is correct.** Summarization is lossy by design, and the values it drops first — numbers, dates, percentages, what the customer said they needed — are exactly the ones the agent must be able to quote verbatim. Pulling those facts out into a block that is re-injected on every request means they never travel through the summarizer at all. The prose history can compress freely; the facts do not.\n\n**A** is the \"valid but only postpones it\" distractor. A bigger budget moves the first summarization pass from turn 10 to turn 25; it does not change what that pass does when it runs. The session that went to turn 40 loses the same fields, just further in, and multi-issue support conversations are exactly the ones that run long.\n\n**B** is the most attractive wrong answer, because \"summarize better\" sounds like the direct fix for \"the summary lost things,\" and naming the field types makes it sound specific rather than vague. Two problems survive the naming. The instruction is a soft preference handed to the same lossy step — nothing guarantees `$148.50` reaches turn 30, and the summarizer cannot know at turn 10 which of the many amounts and dates on the case will still matter then. And every increment of preserved detail eats the budget that summarization exists to reclaim; push it far enough and you have simply stopped summarizing.\n\n**D** names a mechanism that does not exist — there is no `context_pinning` setting to enable, however plausible the exemption it describes sounds. Be suspicious of an option that solves the problem by naming a configuration you cannot recall from the objectives.\n\n> Compression is for **narrative**. Anything you will need to quote exactly — amounts, dates, identifiers, promises — belongs in a structured layer that summarization never touches.",
   "ko": "**상황.** 10턴마다 옛 턴을 한 문단으로 갈아치우는 요약 하네스. 주문번호·$148.50·30% restocking fee·고객이 말한 마감일이 12턴째엔 컨텍스트에서 전부 사라졌다.\n\n**정답 C** — 거래 사실(주문번호·금액·날짜·상태·**customer-stated expectations**)을 `case facts` 블록으로 빼서 매 프롬프트에 넣고 **summarized history 바깥**에 둔다. 그러면 그 값들은 애초에 요약기를 통과하지 않는다. 산문 history는 마음껏 압축되고, 사실은 안 된다.\n\n**오답 정리.**\n- **B가 가장 매력적인 오답** — \"요약이 잃었으니 요약을 더 잘하자\"가 직결처럼 들린다. 두 가지가 깨진다: 요약기는 10턴 시점에 **어느 사실이 30턴에서 필요할지 모른다**(= \"더 자세히\"는 추측), 그리고 detail을 늘릴수록 요약의 존재 이유인 예산을 먹는다 — 끝까지 밀면 요약을 안 하는 것과 같아진다.\n- **A**는 \"맞지만 미루기만\" — 예산을 키우면 첫 요약 패스가 뒤로 갈 뿐, 40턴까지 간 세션은 같은 필드를 똑같이 잃는다.\n- **D `context_pinning`**은 ⚠️ **존재하지 않는 기능**. 학습목표에서 기억나지 않는 설정 이름으로 문제를 푸는 선택지는 일단 의심할 것.\n\n> 압축은 **narrative**용. 정확히 인용해야 할 것(금액·날짜·식별자·약속)은 요약이 건드리지 않는 구조화 계층에 둔다.",
   "options": [
    {
     "key": "A",
     "text": "Raise the conversation's context budget so the harness summarizes every twenty-five turns instead of every ten, keeping many more turns of the original exchange verbatim in front of the agent before any compression runs."
    },
    {
     "key": "B",
     "text": "Instruct the summarizer to preserve more detail and produce longer summaries, naming the amounts, dates, and identifiers it should carry forward, so the compressed history keeps the specifics QA found missing."
    },
    {
     "key": "C",
     "text": "Extract transactional facts — order numbers, amounts, dates, statuses, and customer-stated expectations — into a persistent `case facts` block that is included in every prompt, outside the summarized history."
    },
    {
     "key": "D",
     "text": "Enable `context_pinning` on the conversation and configure it to exempt the opening ten turns from compression, so the stretch where the order details were captured stays in context verbatim for the whole session."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d5-5.1-recall-01",
   "kind": "domain",
   "domain": "D5",
   "format": "recall",
   "scenario": "customer-support",
   "linked_ts": [
    "5.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.1"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": "**빈칸 답과 각각이 중요한 이유.**\n\n| 빈칸 | 답 | 왜 |\n|---|---|---|\n| 요약이 먼저 죽이는 것 | `numerical` 값, 퍼센트, `dates`, customer-stated `expectations` | ⚠️ **expectations**가 잊히는 항목 — \"3영업일 안에 입금된다고 들었다\"가 불만/약속파기를 가른다 |\n| 대응책 | `case facts` 블록, 매 프롬프트 포함, **summarized history 바깥** | \"바깥\"이 트릭 전부. 안에 있으면 다음 압축 패스가 또 먹는다 |\n| 안정적으로 읽히는 위치 | `beginning`, `end` | 중간은 누락될 수 있음 = `lost in the middle` (⚠️ 번역하지 말 것, 원어로 외운다) |\n| 완화책 2종 | key findings를 `beginning`에 · 명시적 `section headers` | 위치 효과는 프롬프트로 못 없앤다 → 중요한 걸 잘 읽는 자리에 놓고, 중간을 항해 가능하게 만든다 |\n| tool 출력 | 누적 **전에** `trimmed` | 40+ 필드 중 5개만 유효. 쌓인 뒤 요약하면 피하려던 손실 연산을 하는 것 |\n| downstream 예산이 작을 때 | upstream이 `structured` 데이터 반환(key facts·citations·relevance scores), verbose 내용과 `reasoning` chain 대신 | **생산자를 고치지 소비자를 고치지 않는다** |",
   "cloze": "The values progressive summarization destroys first are {{numerical}} values, percentages, {{dates}}, and customer-stated {{expectations}}. The countermeasure is a persistent {{case facts}} block, included in every prompt and held **outside** the summarized history.\n\nModels process information reliably at the {{beginning}} and {{end}} of a long input but may omit findings from the middle — the {{lost in the middle}} effect. Two mitigations: place a key findings summary at the {{beginning}} of an aggregated input, and organize the detail with explicit {{section headers}}.\n\nTool results consume context out of proportion to their relevance — an order lookup returning 40+ fields when 5 matter — so verbose output should be {{trimmed}} to the relevant fields **before** it accumulates.\n\nWhen a downstream agent has a limited context budget, modify the upstream agent to return {{structured}} data — key facts, citations, relevance scores — instead of verbose content and {{reasoning}} chains."
  },
  {
   "id": "d5-5.2-choice-01",
   "kind": "domain",
   "domain": "D5",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "5.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.2 (escalation triggers; sentiment and self-reported confidence as unreliable proxies)"
   ],
   "context": "A subscription-billing agent is escalating the wrong cases. QA sampled 200 conversations and found two patterns:\n\n- Every conversation longer than about eight turns was transferred to a human, including routine ones that were one lookup away from resolution.\n- When a customer asked about something the written policy does not address — a mid-cycle plan downgrade, which the policy covers only for upgrades — the agent answered anyway, inventing a proration rule. Three of those answers were wrong and had to be reversed.",
   "question": "What is the most effective change to escalation calibration?",
   "explanation": "**B is correct.** Both failures are the same missing thing: the agent has no stated definition of what an escalation *is*. Naming the three triggers, and showing the boundary with examples, fixes the under-escalation (a policy gap is a trigger — the agent should have said the policy does not cover it and handed off) and the over-escalation (length is not a trigger) with one proportionate change, before adding any infrastructure.\n\n**A** encodes the wrong rule. **Complexity — and its proxies, turn count and message length — is not an escalation trigger.** A long conversation may be a chatty customer with a simple problem; a one-turn question may sit squarely in a policy gap. This option automates the exact behaviour QA flagged as wrong.\n\n**C** is attractive because a confidence score feels like a principled, quantitative gate, and routing on a number is easy to implement. It fails for a specific reason: **self-reported confidence is poorly calibrated**. The agent that invented a proration rule was not hesitant while doing it — it was confident. A score elicited from the same model that made the error inherits the error, so the cases you most need to catch are the ones that score highest.\n\n**D** is the \"fixes a different problem\" distractor, and a sharp one because frustration and escalation feel related. **Sentiment measures how the customer feels, not whether the case exceeds the agent's authority.** A calm customer asking about an unaddressed policy still needs a human; an annoyed customer with a damaged item does not. The right handling of frustration is to acknowledge it and offer resolution when the issue is within the agent's capability, escalating only if the customer reiterates the preference.\n\n> The three triggers: **explicit request for a human**, **policy exception or silence**, **cannot make meaningful progress**. Difficulty, tone, and self-rated doubt are not on the list.",
   "ko": "**상황.** 8턴 넘는 대화는 전부 사람에게 이관(과잉), policy가 다루지 않는 mid-cycle downgrade는 proration 규칙을 지어내서 답변(과소). **양방향 동시 오류.**\n\n**정답 B** — 두 실패의 원인이 같다: **escalation의 정의가 기술된 적이 없다.** 트리거 3종(사람 요구 · **policy 공백/침묵** · 유의미한 진전 불가)을 system prompt에 명시하고, escalate vs resolve를 대비시키는 few-shot으로 경계를 보여주면, 인프라를 붙이기 전에 **한 번의 비례적 수정**으로 양쪽이 다 고쳐진다.\n\n**오답 정리.**\n- **A** 턴 수 임계값 — ⚠️ **복잡도(및 그 대리지표인 턴 수·메시지 길이)는 escalation trigger가 아니다.** QA가 잘못됐다고 지적한 행동을 그대로 자동화하는 선택지.\n- **C** 자기 확신도 임계값 — 숫자·게이트라 원칙적으로 보이는 게 미끼. ⚠️ **self-reported confidence는 calibrate 되지 않았다.** proration 규칙을 지어낸 에이전트는 그때 망설이지 않았다. 오류를 만든 같은 모델에서 뽑은 점수는 그 오류를 물려받으므로, **가장 잡고 싶은 사건이 가장 높은 점수를 받는다.**\n- **D** sentiment — \"fixes a different problem\"이고 불만과 escalation이 연관돼 보여 날카롭다. ⚠️ **sentiment는 고객의 감정을 재지, 사건이 에이전트의 권한을 넘는지를 재지 않는다.** 차분한 고객의 policy 공백은 사람이 필요하고, 짜증난 고객의 파손 반품은 아니다.\n\n> 트리거는 셋: **explicit request for a human · policy exception/silence · cannot make meaningful progress.** 난이도·어조·자기 의심은 목록에 없다.",
   "options": [
    {
     "key": "A",
     "text": "Set a turn-count threshold in the orchestration layer and transfer any conversation that crosses it straight to the human queue, on the reasoning that an exchange running this long has already demonstrated the case is more complex than the agent can be expected to close on its own."
    },
    {
     "key": "B",
     "text": "Define explicit escalation triggers in the system prompt — an explicit request for a human, a policy gap or silence on the customer's specific request, and inability to make meaningful progress — with few-shot examples contrasting escalate against resolve."
    },
    {
     "key": "C",
     "text": "Have the agent emit a self-rated certainty score at the end of every turn and transfer any case whose score falls below a configured threshold, so the conversations the agent is least sure of reach a human before a wrong answer is given."
    },
    {
     "key": "D",
     "text": "Run sentiment analysis over each customer message and transfer the conversation as soon as negative sentiment crosses a configured threshold, so customers who are becoming frustrated with the agent reach a person sooner."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "d5-5.2-choice-02",
   "kind": "domain",
   "domain": "D5",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "5.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.2 (multiple matches require clarification; honouring explicit human requests immediately)"
   ],
   "context": "Two incidents from the same week.\n\n**Incident 1** — `find_customer` returned three accounts for \"J. Alvarez\". The agent selected the one with the most recent activity and issued a $90 credit. It went to the wrong household.\n\n**Incident 2** — A customer opened with *\"I don't want to troubleshoot this again, please just connect me to a person.\"* The agent ran four diagnostic steps, offered a self-service reset, and transferred only after the customer repeated the request twice.",
   "question": "Which **two** changes address these incidents? *(Select 2)*",
   "explanation": "**A and D are correct.**\n\n**A** — multiple tool matches are an ambiguity the agent cannot resolve from what it has. The correct move is to request another identifier, not to rank candidates by recency, alphabetical order, or any other heuristic. A heuristic here does not reduce the uncertainty; it only hides it, and the cost lands on a customer who was never involved.\n\n**D** — an explicit request for a human is the one trigger that is honoured *immediately*, ahead of any investigation. Incident 2 shows what the alternative costs: the agent's attempt to help read as refusing to listen, and the case reached a human anyway with the customer angrier than when it started.\n\n**B** is the most attractive wrong answer, because it looks like it removes ambiguity at the source and it is genuinely less work than a clarification turn. It removes the *appearance* of ambiguity. Three real accounts still match; the tool now picks one silently, so the agent cannot even know a choice was made. This converts an occasional visible problem into a permanent invisible one — the same shape as the anti-pattern of returning empty results as success.\n\n**C** would have fired on Incident 2 for the wrong reason, and it would fire on every irritated customer whose issue the agent can resolve. **Sentiment is not a proxy for whether a case needs a human.** The customer here did not need to be detected as impatient; they said what they wanted in plain words.\n\n**E** is a target, not a mechanism. It changes what you measure, not what the agent does when a lookup returns three rows.",
   "ko": "**상황(2건).** ① `find_customer`가 \"J. Alvarez\" 3건을 반환 → 최근 활동 계정을 골라 $90 크레딧을 엉뚱한 세대에 지급. ② 고객이 첫 마디로 사람을 요구했는데 진단 4단계 + 셀프 리셋을 권하고, 두 번 더 요구한 뒤에야 이관.\n\n**정답 A, D.**\n- **A** — 다중 매치는 에이전트가 가진 정보로 풀 수 없는 모호성이다. **추가 식별자(우편번호·주문번호·이메일)를 요청**하지, 최근순·알파벳순 등 어떤 휴리스틱으로도 고르지 않는다. 휴리스틱은 불확실성을 줄이는 게 아니라 **숨기고**, 비용은 관여한 적 없는 고객이 문다.\n- **D** — 사람에 대한 명시적 요구는 **조사보다 앞서 즉시** 이행하는 유일한 트리거. 사건 ②가 대안의 대가를 보여준다: 돕겠다는 시도가 \"말을 안 듣는 것\"으로 읽혔고, 결국 사람에게 가되 고객은 더 화나 있었다.\n\n**오답 정리.**\n- **B가 가장 매력적인 오답** — 최고점 매치만 반환하면 소스에서 모호성이 사라지는 것처럼 보이고 실제로 일이 적다. ⚠️ 사라지는 건 모호성의 *외관*뿐. 실제 계정 3건은 그대로이고, 이제 도구가 **조용히** 하나를 고르므로 에이전트는 선택이 있었다는 사실조차 모른다. 가끔 보이던 문제를 **영구히 안 보이는 문제**로 바꾸는 것 — 빈 결과를 성공으로 반환하는 안티패턴과 같은 형태.\n- **C** — 사건 ②에서 발화하긴 하나 **이유가 틀렸고**, 에이전트가 해결할 수 있는 모든 짜증난 고객에게도 발화한다. ⚠️ sentiment는 사람이 필요한지의 대리지표가 아니다. 이 고객은 감지될 필요가 없었다 — **평문으로 말했다.**\n- **E** — 목표치이지 메커니즘이 아니다. 조회가 3행을 반환할 때 에이전트가 무엇을 하는지는 하나도 안 바뀐다.",
   "options": [
    {
     "key": "A",
     "text": "Instruct the agent to ask for an additional identifier — postal code, order number, email — whenever a lookup returns more than one match, rather than choosing among them."
    },
    {
     "key": "B",
     "text": "Have `find_customer` score its candidate accounts internally and return only the highest-scoring one, so the agent is handed a single record and is never presented with ambiguity it has to resolve."
    },
    {
     "key": "C",
     "text": "Add a sentiment check to the turn loop that transfers the conversation immediately when the customer's message reads as impatient, so irritated customers stop being held in self-service."
    },
    {
     "key": "D",
     "text": "Instruct the agent to honour an explicit request for a human immediately, before running diagnostics or offering a self-service path, treating the request itself as the trigger."
    },
    {
     "key": "E",
     "text": "Raise the team's escalation-rate target so a larger share of conversations is expected to reach a human, and review agent performance against the new number each week."
    }
   ],
   "answer": [
    "A",
    "D"
   ],
   "multi": true
  },
  {
   "id": "d5-5.3-choice-01",
   "kind": "domain",
   "domain": "D5",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "5.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.3 (structured error context; terminating a workflow on a single failure)"
   ],
   "context": "A coordinator spawns four research subagents. One of them issues six searches; two time out. The subagent catches the exception and returns `{\"status\": \"error\", \"message\": \"search unavailable\"}` — discarding the four searches that succeeded.\n\nThe coordinator sees an error from one subagent and aborts the run, returning nothing to the user. The other three subagents had already completed successfully.",
   "question": "What change most improves the coordinator's ability to recover?",
   "explanation": "**D is correct.** Two anti-patterns are stacked here, and this option removes both. The subagent replaced a specific, actionable failure with a generic status, throwing away four good results and every fact the coordinator would need to decide what to do. The coordinator then terminated an entire workflow because one component partly failed. Structured error context turns \"search unavailable\" into a decision the coordinator can actually make: two queries failed with timeouts, here are the four that worked, and here is another angle worth trying.\n\n**A** is the most attractive wrong answer, because it does keep the run alive and it is one line of code. It is also the **silent suppression** anti-pattern in its purest form: a failure is now indistinguishable from a genuine \"no matches found.\" The coordinator will report confidently on a topic it never searched, and nobody downstream — including the reader of the final report — has any way to know.\n\n**B** is valid but heavier than needed, and it is aimed at the wrong layer. It re-runs the four searches that already succeeded, it still has no information about *why* the failure happened, and after three rounds it aborts the whole workflow anyway. Local recovery for transient failures belongs inside the subagent, which knows which two queries to retry.\n\n**C** is the \"fixes a different problem\" distractor. It may reduce how often timeouts occur; it does nothing about what the system does when one occurs. A longer timeout still produces the same total loss on the day the search service is actually down.\n\n> The rule is **propagate, do not swallow, and do not detonate.** A subagent resolves what it can locally and reports what it cannot, with enough structure for the coordinator to route around it.",
   "ko": "**상황.** subagent가 검색 6건 중 2건 타임아웃 → 성공한 4건을 버리고 `{\"status\": \"error\", \"message\": \"search unavailable\"}` 반환. coordinator는 에러 하나에 전체 run을 중단하고 아무것도 안 돌려줌(나머지 3개 subagent는 이미 성공).\n\n**정답 D** — 안티패턴이 **두 겹**으로 쌓였고 이 선택지가 둘 다 제거한다. 구조화 에러 컨텍스트(**failure type · 시도한 쿼리 · 얻은 partial results · 대안 접근**)가 `\"search unavailable\"`을 coordinator가 실제로 내릴 수 있는 판단으로 바꾼다 — \"2건이 타임아웃, 여기 성공한 4건, 이런 각도가 남았다\". 그리고 부분 실패를 **종료가 아니라 복구 가능**으로 취급.\n\n**오답 정리.**\n- **A가 가장 매력적인 오답** — run이 살아남고 코드 한 줄이면 된다. ⚠️ 그러나 **silent suppression의 순수 형태**다. 실패가 진짜 \"0건 매치\"와 구별 불가능해지고, coordinator는 검색한 적 없는 주제를 확신에 차서 보고하며, 최종 보고서 독자까지 아무도 알 방법이 없다.\n- **B** 재시도 3회는 **맞지만 과설계 + 층이 틀림**. 이미 성공한 4건을 다시 돌리고, *왜* 실패했는지는 여전히 모르며, 3라운드 뒤엔 어차피 전체를 중단한다. transient에 대한 **local recovery는 subagent 안**에 있어야 한다 — 어느 두 쿼리를 재시도할지 아는 쪽이 거기다.\n- **C** 타임아웃 상향은 \"fixes a different problem\". 발생 빈도는 줄일지 몰라도, 발생했을 때의 동작은 그대로다. 검색 서비스가 진짜 죽은 날엔 같은 전손이 난다.\n\n> **propagate, do not swallow, and do not detonate.**",
   "options": [
    {
     "key": "A",
     "text": "Have the subagent catch the exception and return an empty result set instead of an error status, so the coordinator receives a well-formed response, sees no failure worth aborting on, and proceeds to synthesis with what the other three produced."
    },
    {
     "key": "B",
     "text": "Have the coordinator re-run any subagent that reports an error, restarting it from the beginning of its assignment with the same instructions, up to three times before it gives up and aborts the run, so a transient outage gets several more chances."
    },
    {
     "key": "C",
     "text": "Increase the search tool's timeout so that queries which are merely slow return results instead of raising, removing the transient failures that put this subagent onto its error path in the first place and letting busy days complete normally."
    },
    {
     "key": "D",
     "text": "Have the subagent return structured error context — failure type, the queries it attempted, the partial results it did obtain, and alternative approaches — and have the coordinator treat a partial failure as recoverable rather than terminal."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "d5-5.3-short-01",
   "kind": "domain",
   "domain": "D5",
   "format": "short",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "5.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.3"
   ],
   "context": null,
   "question": "A document-analysis subagent runs two queries against a filings archive. The first times out and still times out after the subagent's own retries. The second completes normally and matches zero documents. The subagent reports both outcomes identically, as `{\"results\": []}`.\n\nExplain what is wrong with that report, what the subagent should return instead, and what the final synthesis output should carry as a result.",
   "explanation": null,
   "ko": "**상황.** 쿼리 2건 — 하나는 자체 재시도 후에도 타임아웃, 하나는 정상 실행 후 0건 매치. subagent가 둘 다 `{\"results\": []}`로 동일하게 보고.\n\n**채점 포인트(이걸 다 말해야 만점).**\n1. ⚠️ **access failure ≠ valid empty result**를 구분하고, 그 차이가 **coordinator의 판단을 어떻게 바꾸는지**까지 말할 것. valid empty = 답이다(검색됐고 없다 → 그 줄기는 닫힘, \"no filings exist\"가 근거 있는 발견). access failure = 답의 부재(무엇이 있는지 모름 → 재시도·다른 소스·주장 범위 축소가 전부 열려 있음).\n2. **빈 결과를 성공으로 반환 = silent suppression 안티패턴**이라고 이름 붙일 것. 실패가 성공으로 제시되고, **보이지 않기 때문에** 복구 불가능해진다.\n3. **structured error context 4요소** 열거: failure type(N회 재시도 후 timeout) · 시도한 것(쿼리와 소스) · 이미 얻은 partial results · 가능한 대안(동등 아카이브, 좁힌 날짜 범위). `\"archive unavailable\"` 같은 generic status로 뭉개지 말 것.\n4. **transient에 대한 local recovery는 subagent 몫**이고, 못 푼 것만 전파.\n5. **쿼리 하나 실패로 전체 workflow를 종료하지 않는다** — 두 번째 쿼리의 진짜 빈 결과와 다른 subagent들의 발견은 유효.\n6. 종합 출력에 **coverage annotations** — 실제로 조회한 소스로 잘 뒷받침된 발견과, 소스 불가로 공백이 생긴 주제 영역을 분리. 독자가 **\"찾아봤는데 없다\"와 \"찾아볼 수 없었다\"**를 구별할 수 있어야 한다.",
   "model_answer": "The two outcomes are not the same event, and collapsing them destroys the only information the coordinator needs. A **valid empty result** is an answer: the archive was searched and contains nothing matching, so that line of inquiry is closed and the finding \"no filings exist\" is supportable. An **access failure** is the absence of an answer: nothing is known about what the archive contains, and the coordinator's options — retry later, try a different source, reduce the scope of the claim — are all still open. Reporting the timeout as an empty list is the silent-suppression anti-pattern: a failure is presented as a success, and the error becomes unrecoverable precisely because nobody can see it.\n\nThe subagent should attempt local recovery for the transient failure first, and propagate only what it could not resolve. Its report should distinguish the two queries and, for the failed one, carry **structured error context**: the failure type (timeout after N retries), what was attempted (the query and the source), any partial results already obtained, and possible alternatives (an equivalent archive, a narrower date range). It should not flatten this into a generic status such as \"archive unavailable\", which hides everything the coordinator would use to decide.\n\nThe coordinator should not terminate the workflow over one failed query — the second query's genuine empty result and every other subagent's findings remain valid. What must not happen is the gap disappearing. The synthesis output carries **coverage annotations**: which findings are well-supported by sources actually consulted, and which topic areas have gaps because a source was unavailable. A reader can then tell \"we looked and found nothing\" apart from \"we could not look.\"",
   "grading": "- Distinguishes an access failure from a valid empty result, and says why the difference changes the coordinator's decision\n- Names returning empty results as success (silent suppression) as an anti-pattern\n- Lists structured error context: failure type, what was attempted, partial results, alternatives\n- States that local recovery for transient failures belongs in the subagent, which propagates only what it cannot resolve\n- Rejects terminating the whole workflow over a single failure\n- Requires coverage annotations in synthesis separating well-supported findings from gaps caused by unavailable sources"
  },
  {
   "id": "d5-5.4-choice-01",
   "kind": "domain",
   "domain": "D5",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "5.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.4 (context degradation in extended sessions; scratchpad files)"
   ],
   "context": "Three hours into a session mapping an unfamiliar payments service, an engineer asks the agent to re-confirm which classes write to the ledger.\n\nEarly in the session the agent had traced this precisely and named `RefundOrchestrator` and `LedgerPoster`. Now it answers: *\"A service like this typically has a repository layer and a posting service handling ledger writes.\"* Ten minutes later it describes the retry behaviour of `LedgerPoster` in a way that contradicts what it reported at the start of the session.",
   "question": "What change most directly counteracts this?",
   "explanation": "**A is correct.** The symptom is textbook context degradation in an extended session: specific discoveries made early stop being available, and the model falls back on **\"typical patterns\"** for a service of this kind, and starts contradicting itself. A scratchpad file moves the findings out of the conversation and onto disk, where they survive any context boundary. The agent re-reads a short file instead of re-deriving — or inventing — what it already learned.\n\n**B** is the most attractive wrong answer, because it does clear the degraded context and the fresh session will answer crisply again. It also throws away three hours of exploration. The agent restarts knowing nothing about `LedgerPoster`, has to re-trace everything, and will degrade again on the same schedule. Restarting is only reasonable when the prior context is *stale*; here it was correct, merely inaccessible.\n\n**C** names a flag that does not exist. `/compact` itself is real and is the right tool for reducing context bloat during long discovery sessions — which is what makes this option tempting. But compaction is still compression happening *inside* the conversation, and it offers no guarantee about which specifics survive. The durable fix is a record kept outside context, not a better-behaved summarizer.\n\n**D** is the \"fixes a different problem\" distractor. The answer is vague because the information is gone, not because there was no room to write it down. A larger output budget produces a longer version of the same generic answer.\n\n> The tell is the phrase **\"typically\"**. When an agent that once named specifics starts describing what a system of this kind usually looks like, it has lost the findings, not the ability to express them.",
   "ko": "**상황.** 3시간째 세션. 초반엔 `RefundOrchestrator`·`LedgerPoster`를 정확히 짚었는데, 지금은 *\"A service like this **typically** has a repository layer...\"*로 답하고 10분 뒤엔 세션 초반 답과 모순.\n\n**정답 A** — 교과서적 **context degradation** 증상이다. **scratchpad file**은 발견을 대화 밖 디스크로 옮기고, 파일은 어떤 컨텍스트 경계도 넘어 살아남는다. 에이전트는 이미 배운 것을 재유도(또는 창작)하는 대신 짧은 파일을 다시 읽는다.\n\n**오답 정리.**\n- **B가 가장 매력적인 오답** — 세션 재시작은 실제로 열화된 컨텍스트를 비우고 새 세션은 다시 또렷하게 답한다. ⚠️ 대신 **3시간의 탐색을 버린다.** `LedgerPoster`를 모르는 상태에서 전부 재추적하고, 같은 주기로 다시 열화된다. 재시작이 타당한 건 이전 컨텍스트가 **stale**할 때이고, 여기선 정확했으되 **접근 불가**였을 뿐이다.\n- **C `/compact --keep-findings`** — ⚠️ **존재하지 않는 플래그.** `/compact` 자체는 실재하고 긴 탐색 세션의 컨텍스트 팽창에 맞는 도구라서 유혹적이다. 그러나 compaction은 여전히 **대화 *안에서* 일어나는 압축**이라 어떤 구체값이 살아남을지 보장하지 못한다. 내구성 있는 해법은 더 얌전한 요약기가 아니라 **컨텍스트 밖의 기록**.\n- **D** max output tokens 증가 — \"fixes a different problem\". 답이 두루뭉술한 건 적을 공간이 없어서가 아니라 **정보가 없어서**다. 예산을 키우면 같은 일반론이 길어질 뿐.\n\n> 신호어는 **\"typically\"**. 한때 구체명을 대던 에이전트가 \"이런 종류의 시스템은 보통…\"으로 말하기 시작하면, 표현력이 아니라 **findings를 잃은 것**이다.",
   "options": [
    {
     "key": "A",
     "text": "Have the agent maintain a scratchpad file that records key findings as it discovers them, and consult that file when answering later questions."
    },
    {
     "key": "B",
     "text": "Restart the session with the original task description whenever answers start becoming vague, so the agent reasons from a clean context rather than a degraded one."
    },
    {
     "key": "C",
     "text": "Run `/compact --keep-findings` so that compaction preserves the class names and call traces already discovered while dropping the rest of the conversation."
    },
    {
     "key": "D",
     "text": "Increase the agent's `max_tokens` so later answers have room to spell out class names and traces instead of summarizing at a high level."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "d5-5.4-choice-02",
   "kind": "domain",
   "domain": "D5",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "5.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.4 (subagent delegation for verbose exploration; phase summaries; state manifests for crash recovery)"
   ],
   "context": "A four-phase migration is under way in a 4,000-file monorepo. The main agent does all the exploration itself, so raw `Grep` hits and full file reads from hundreds of files accumulate in its context.\n\nBy phase 3 it is re-running searches it already ran in phase 1, and its migration plan references two modules that phase 1 had explicitly ruled out.\n\nSeparately, the build machine rebooted mid-run last week. Everything learned in phases 1 and 2 was lost and the work restarted from zero.",
   "question": "Which **two** changes address these problems? *(Select 2)*",
   "explanation": "**B and E are correct.**\n\n**B** addresses the first symptom. The repetition and the contradicted phase-1 conclusion are what context saturated with raw exploration output looks like. Subagents absorb the verbose part — hundreds of `Grep` hits land in *their* context, and only the conclusion comes back — so the main agent keeps its context on high-level coordination. Summarizing a completed phase before spawning the next phase's agents is the other half: it carries forward what was decided (\"these two modules are out of scope\") without carrying forward the thousands of lines that produced the decision.\n\n**E** addresses the second, which is a different failure entirely. Delegation does not survive a reboot; nothing in the conversation does. Structured state exports plus a manifest the coordinator reloads on resume is the crash-recovery design, and it is what turns a reboot into a resume instead of a restart.\n\n**A** is the wrong direction. More tools means more output flowing into the context that is already the problem. This option is attractive if you read the repeated searches as \"the agent could not find things,\" but it found them the first time.\n\n**C** trades one problem for a worse one. Discovery in an unfamiliar 4,000-file repo is exactly what `Grep` is for; forcing the agent to name files in advance means it can only look where it already knows to look. The context saving is real, which is what makes it tempting, but it is bought by disabling the task.\n\n**D** fixes a different problem. Retries help with a flaky tool call, not with a machine that rebooted or with context that has filled with discovery output.",
   "ko": "**상황(문제 2개).** ① 4,000파일 monorepo, main agent가 탐색을 직접 다 해서 raw `Grep` 히트와 전체 파일 읽기가 컨텍스트에 누적 → phase 3에서 phase 1 검색을 재실행하고, phase 1이 명시적으로 배제한 모듈 2개를 계획에 다시 넣음. ② 지난주 빌드 머신 재부팅으로 phase 1·2 학습분 전부 소실, 처음부터 재시작.\n\n**정답 B, E.** 두 증상은 **서로 다른 실패**이고 각각 다른 처방이 필요하다.\n- **B**(①에 대응) — 반복 검색과 뒤집힌 결론은 raw 탐색 출력으로 포화된 컨텍스트의 모습. **subagent가 verbose 부분을 흡수**하고(수백 개 `Grep` 히트는 *그쪽* 컨텍스트에 떨어지고 결론만 돌아옴) main agent는 고수준 조정에 컨텍스트를 남긴다. 나머지 반쪽이 **phase summarization** — 결정된 것(\"이 두 모듈은 범위 밖\")만 다음 라운드 초기 컨텍스트로 넘기고, 그 결정을 만든 수천 줄은 안 넘긴다.\n- **E**(②에 대응) — ⚠️ **위임은 재부팅을 견디지 못한다. 대화에 있는 건 아무것도 못 견딘다.** 구조화 **state export + coordinator가 resume 시 로드하는 manifest**가 크래시 복구 설계이고, 이것이 재부팅을 restart가 아닌 resume으로 바꾼다.\n\n**오답 정리.**\n- **A** `allowedTools` 확장 — 방향이 반대. 도구가 늘면 이미 문제인 컨텍스트로 더 많은 출력이 흘러든다. 반복 검색을 \"못 찾아서\"로 읽으면 끌리는데, **처음엔 찾았다**.\n- **C** `Grep` 제거하고 지정 파일 `Read`만 — 컨텍스트는 실제로 아껴지지만(그래서 유혹적), 낯선 4,000파일 저장소의 탐색이 바로 `Grep`이 하는 일이다. 미리 파일명을 대라는 건 **이미 아는 곳만 보라는 뜻** = 과제 자체를 무력화.\n- **D** 재시도 횟수 증가 — \"fixes a different problem\". 불안정한 tool call에는 듣지만, 재부팅한 머신이나 탐색 출력으로 찬 컨텍스트에는 무관.",
   "options": [
    {
     "key": "A",
     "text": "Expand the main agent's `allowedTools` list so it has more ways to search the repository — adding file-listing and symbol-lookup tools alongside `Grep` so it can locate what it needs without reissuing searches it has run before."
    },
    {
     "key": "B",
     "text": "Delegate verbose exploration to subagents that answer specific questions and return only their conclusions, and summarize each phase's key findings before spawning the next phase's agents, injecting that summary into their initial context."
    },
    {
     "key": "C",
     "text": "Remove `Grep` from the toolset and require the agent to `Read` named files only, so far less raw match output enters context and the main agent's window stays available for the migration plan itself."
    },
    {
     "key": "D",
     "text": "Increase the retry count on each tool call so that a transient failure is re-attempted automatically instead of losing the work that depended on it, and a long-running phase survives a flaky search or a dropped file read."
    },
    {
     "key": "E",
     "text": "Have each agent export its state to a known location in a structured form, and have the coordinator load a manifest on resume and inject it into the prompts of the agents it restarts so they continue from the recorded state."
    }
   ],
   "answer": [
    "B",
    "E"
   ],
   "multi": true
  },
  {
   "id": "d5-5.5-choice-01",
   "kind": "domain",
   "domain": "D5",
   "format": "choice",
   "scenario": "structured-extraction",
   "linked_ts": [
    "5.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.5 (aggregate accuracy masking segments; stratified random sampling)"
   ],
   "context": "An invoice-extraction pipeline reports **97.2% field-level accuracy** on a held-out set. On that number, the team proposes auto-approving every extraction the model marks high-confidence, which would remove about 80% of human review.\n\nA finance analyst objects. Handwritten remittance advices and scanned faxes are roughly 6% of volume, but they account for most of the payment disputes her team has had to unwind this year.",
   "question": "What should the team do before reducing review?",
   "explanation": "**C is correct.** A single aggregate figure can hide a badly performing segment entirely: at 6% of volume, those documents could be extracted at 60% accuracy and the headline number would still read above 95%. **97.2% is not a fact about any document you are about to auto-approve.** Segmenting by type *and* by field is what turns it into one — a field like `remit_to_account` may be weak even on document types that look fine overall. Stratified random sampling of the high-confidence population is the ongoing half: it measures the error rate inside the extractions nobody is reviewing any more, and it is how you notice a *novel* error pattern from a new vendor template that no historical segment predicted.\n\n**A** is the most attractive wrong answer, because tightening a threshold feels like the conservative, low-cost move and it is the lever closest to hand. It assumes the confidence score is calibrated. Nothing here establishes that, and an uncalibrated score on handwritten documents is uncalibrated at 0.95 too — the model can be confidently wrong at any threshold. Calibration against a labeled validation set is what would earn the right to move that number.\n\n**B** is a reasonable remedy applied before the measurement that would justify it. It acts on one analyst's recollection rather than data, it fixes only the two segments someone happened to notice, and it leaves the rest auto-approved with no mechanism to detect the third problem segment. Useful as an outcome of C, not a substitute for it.\n\n**D** is valid but heavier than needed, and it does not measure what the team needs. It doubles inference cost on every document, and self-agreement is not accuracy: a systematic misread of a handwritten field reproduces itself on the second pass, so the two runs agree and the error is auto-approved with extra confidence.\n\n> Before removing a human from a loop, prove performance **in every segment the loop covers**, then keep sampling — the segment that breaks next is the one that did not exist when you measured.",
   "ko": "**상황.** held-out set에서 **97.2% field-level accuracy**. 이 숫자로 high-confidence 추출 자동승인(사람 리뷰 80% 제거)을 제안. 애널리스트 반대 — 손글씨 remittance advice와 스캔 팩스가 물량의 **6%**인데 올해 결제 분쟁 대부분을 차지.\n\n**정답 C** — 세그먼트별(**document type × field**) 분해 검증 + 자동화 후 **stratified random sampling** 유지.\n⚠️ 단일 총계는 부진 세그먼트를 통째로 가린다: 물량 6%면 그 문서들이 60% 정확도여도 헤드라인은 95%를 넘긴다. **97.2%는 지금 자동승인하려는 어떤 문서에 대한 사실도 아니다.** field까지 쪼개야 하는 이유 — `remit_to_account` 같은 필드는 전체적으로 멀쩡해 보이는 type 안에서도 약할 수 있다. 표집은 지속되는 반쪽: **아무도 더 이상 리뷰하지 않는 모집단의 error rate를 측정**하고, 어떤 과거 세그먼트도 예측 못 한 **novel error pattern**(새 벤더 템플릿)을 잡는다.\n\n**오답 정리.**\n- **A가 가장 매력적인 오답** — 임계값 0.8→0.95는 보수적이고 저비용이며 손 닿는 레버. ⚠️ 하지만 **confidence가 calibrate 됐다는 전제**를 깔고 있고, 여기엔 그걸 뒷받침하는 게 없다. 손글씨에서 un-calibrated인 점수는 0.95에서도 un-calibrated다 — 모델은 **어느 임계값에서든 자신 있게 틀릴 수 있다.** labeled validation set 대비 calibration이 그 숫자를 움직일 자격을 준다.\n- **B** 손글씨·팩스만 사람에게 — 정당화할 측정보다 **먼저** 적용한 처방. 애널리스트의 기억에 기대고, 누가 우연히 알아챈 두 세그먼트만 고치며, 나머지는 세 번째 문제 세그먼트를 탐지할 장치 없이 자동승인으로 남는다. **C의 결과물로는 타당하나 대체재는 아님.**\n- **D** 2회 추출 후 일치 시 승인 — 맞지만 과설계, 게다가 필요한 걸 측정하지 못한다. 추론비가 2배가 되고, **자기일치는 정확도가 아니다** — 손글씨 필드의 체계적 오독은 두 번째 패스에서도 재현되므로 두 run이 일치하고 오류가 **더 큰 확신과 함께** 자동승인된다.\n\n> 루프에서 사람을 빼기 전에 **그 루프가 덮는 모든 세그먼트에서** 성능을 입증하고, 그 다음에도 계속 표집한다 — 다음에 깨질 세그먼트는 측정 당시 존재하지 않던 것이다.",
   "options": [
    {
     "key": "A",
     "text": "Raise the auto-approval confidence threshold from 0.8 to 0.95 so that only the extractions the model marks as most certain bypass review, shrinking the share of documents that reach auto-approval."
    },
    {
     "key": "B",
     "text": "Route every extraction from handwritten remittance advices and scanned faxes to human review and auto-approve the rest, on the strength of the dispute history the analyst has seen for those two formats."
    },
    {
     "key": "C",
     "text": "Break the accuracy measurement down by document type and by field, confirm each segment clears the bar, and add ongoing stratified random sampling of high-confidence extractions."
    },
    {
     "key": "D",
     "text": "Run each document through extraction twice and auto-approve only where the two runs produce identical field values, treating any disagreement between the passes as the signal to send that document to a reviewer."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "d5-5.5-recall-01",
   "kind": "domain",
   "domain": "D5",
   "format": "recall",
   "scenario": "structured-extraction",
   "linked_ts": [
    "5.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.5"
   ],
   "context": null,
   "question": null,
   "explanation": null,
   "ko": "**빈칸 답과 각각이 중요한 이유.**\n\n| 빈칸 | 답 | 왜 |\n|---|---|---|\n| \"97% overall\" 같은 지표 | `aggregate` accuracy | ⚠️ 구조적으로 **최악 세그먼트를 가린다** — D5 대표 함정 |\n| 무엇을 가리나 | 특정 `document types` / `fields` | 문서 타입만이 아니라 **필드**도 |\n| 리뷰 축소 **전에** | document type **및** `field`별 분석, 모든 `segment`에서 일관성 확인 | \"나중에\"도, \"평균으로\"도 아님 |\n| 축소 **후** 계속 측정 | `stratified random sampling`을 `high-confidence` 추출에 | 단순 무작위는 흔한 쉬운 건을 과대표집 |\n| 표집이 잡는 것 | ongoing error rate + `novel` error patterns | 새 레이아웃·바뀐 템플릿은 스스로 알리지 않음 |\n| 라우팅 신호 | `field-level` confidence를 `labeled validation set`에 `calibrating` | ⚠️ **calibrate 됐다면** 정당한 신호 — 5.2에서 거부한 건 *un-calibrated* self-report |\n| 리뷰 우선순위 | `low` confidence **그리고** 모호·`contradictory` 원문 | 리뷰어 용량은 고정 → 결과가 바뀌는 곳에 쓴다 |",
   "cloze": "An {{aggregate}} accuracy metric such as \"97% overall\" can mask poor performance on specific {{document types}} or {{fields}}. So before reducing human review, analyze accuracy by document type **and** by {{field}} and verify performance is consistent across every {{segment}}.\n\nTo keep measuring after review has been reduced, apply {{stratified random sampling}} to the {{high-confidence}} extractions — this both tracks the ongoing error rate and detects {{novel}} error patterns.\n\nHave the model emit {{field-level}} confidence scores, then set review thresholds by {{calibrating}} them against a {{labeled validation set}}.\n\nReviewer capacity is finite, so prioritize it: route extractions with {{low}} model confidence, and those drawn from ambiguous or {{contradictory}} source documents, to human review."
  },
  {
   "id": "d5-5.6-choice-01",
   "kind": "domain",
   "domain": "D5",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "5.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.6 (claim-source mappings lost in summarization; annotating conflicts with attribution)"
   ],
   "context": "A research system runs five search subagents, passes each subagent's findings through a condensing step that compresses them to one paragraph, and hands the paragraphs to a synthesis agent that writes the report.\n\nReviewers raise three objections to the latest report. They cannot tell which source supports which claim. Two different market-size figures appeared in the raw findings — $4.2B and $6.8B — and the report states only $6.8B, with no indication that a credible source disagreed. And a 2021 survey result and a 2024 telemetry result on the same metric are presented side by side as if they contradict each other.",
   "question": "What change fixes the root cause?",
   "explanation": "**B is correct.** All three objections trace to the same event: attribution is destroyed at the condensing step, because prose compression preserves the *claims* and drops the mapping from each claim to its source. Once that mapping is gone, no downstream step can rebuild it. Making the mapping a structured record that must be carried through — and requiring **dates** in it — fixes attribution, keeps the conflicting $4.2B figure visible with its source attached, and lets a three-year gap read as a temporal difference rather than a contradiction.\n\n**A** is the most attractive wrong answer, because a bibliography *looks* like provenance, it is a small cheap addition, and carrying dates in it appears to answer the third objection too. It is still a list of sources for the report as a whole. The reviewers' complaint is per-claim: which source supports *this* sentence, and which date belongs to *that* figure. An undifferentiated trailing list cannot answer either question — knowing the report consulted a 2021 survey and a 2024 telemetry set does not tell you which of the two numbers in the text came from which. And the synthesis agent could not produce a correct per-claim mapping anyway: by the time it runs, the mapping no longer exists in its input.\n\n**C** is valid in one narrow sense and heavier than needed. It does stop the loss, by deleting the step that causes it — along with the context management the condenser exists to provide, which is what will fail next as source count grows. It also guarantees nothing: unstructured raw output can lose attribution during synthesis just as easily.\n\n**D** is the \"fixes a different problem\" distractor, and worse, it institutionalizes the behaviour under complaint. Silently picking one of two credible figures is exactly what produced objection two; a recency rule only makes the arbitrary choice consistent. **Conflicting figures from credible sources are annotated with attribution, not resolved silently** — the report shows both values, says who reported each, and separates well-established findings from contested ones. Reconciliation, if any, is a decision made with the conflict visible.",
   "ko": "**상황.** subagent 5개 → 각 발견을 한 문단으로 압축하는 condensing 단계 → 종합 에이전트가 보고서 작성. 리뷰어 이의 3건: ① 어느 소스가 어느 claim을 뒷받침하는지 알 수 없음 ② raw findings에 $4.2B와 $6.8B가 있었는데 보고서엔 $6.8B만, 이견 표시 없음 ③ 2021 설문과 2024 텔레메트리 결과가 모순처럼 나란히 제시.\n\n**정답 B** — 이의 3건이 **한 사건**으로 수렴한다: **condensing 단계에서 attribution이 파괴된다.** 산문 압축은 *claim*은 남기고 claim→source 매핑을 버린다. 매핑이 사라지면 **하류의 어떤 단계도 재구성할 수 없다.** subagent가 구조화 claim record(claim · 뒷받침 발췌 · source identifier · **publication/collection date**)를 emit하고 condensing·synthesis가 이를 **보존·병합(flatten 금지)**하게 만들면 셋이 동시에 풀린다 — attribution 복원, $4.2B가 출처를 달고 살아남음, 3년 차이가 **모순이 아니라 시차**로 읽힘.\n\n**오답 정리.**\n- **A가 가장 매력적인 오답** — bibliography는 provenance처럼 *보이고* 값싼 추가다. ⚠️ 그러나 **보고서 전체에 대한 소스 목록**이고 리뷰어의 불만은 **claim 단위**다(\"이 문장을 뒷받침하는 소스가 뭔가\"). 게다가 종합 에이전트는 애초에 올바른 claim별 매핑을 만들 수 없다 — 실행 시점엔 입력에 매핑이 이미 없다.\n- **C** condensing 제거 — 손실을 일으키는 단계를 지워서 손실을 막는 좁은 의미의 타당성은 있으나 **과설계이자 다음 실패의 씨앗**이다. condenser가 제공하던 컨텍스트 관리도 같이 사라져 소스 수가 늘면 그쪽이 터진다. 그리고 **보장이 없다** — 비구조화 raw 출력은 synthesis 단계에서 똑같이 attribution을 잃는다.\n- **D** 최신 소스 채택 — \"fixes a different problem\"을 넘어 **문제 삼은 행동을 제도화**한다. 신뢰할 만한 두 수치 중 하나를 조용히 고른 것이 이의 ②이고, recency 규칙은 그 자의적 선택을 *일관되게* 만들 뿐이다. ⚠️ **신뢰 가능한 소스 간 수치 충돌은 attribution과 함께 주석하지, 조용히 해소하지 않는다** — 양쪽 값과 각 출처를 보이고, well-established와 contested를 분리한다. 조정은 충돌이 보이는 상태에서 내리는 결정이다.",
   "options": [
    {
     "key": "A",
     "text": "Instruct the synthesis agent to append a bibliography to the end of the report, listing every source any subagent consulted with its title, publisher, and publication date, so a reviewer can see the whole evidence base the findings were drawn from."
    },
    {
     "key": "B",
     "text": "Require subagents to emit structured claim records — claim, supporting excerpt, source identifier, and publication or collection date — that the condensing and synthesis steps must preserve and merge rather than flatten."
    },
    {
     "key": "C",
     "text": "Remove the condensing step so the synthesis agent receives every subagent's raw findings in full, with the original wording and surrounding context intact instead of compressed into a paragraph."
    },
    {
     "key": "D",
     "text": "Instruct the synthesis agent to resolve conflicting figures by taking the value from the most recently published source, so the report states one number rather than leaving the reader an unexplained discrepancy."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "d5-5.6-short-01",
   "kind": "domain",
   "domain": "D5",
   "format": "short",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "5.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §6, TS 5.6"
   ],
   "context": null,
   "question": "A document-analysis subagent working on a market study encounters two churn rates for the same customer segment in its source set: **11%**, from a 2022 vendor report based on a self-reported customer survey, and **18%**, from a 2025 analyst report based on billing-system telemetry.\n\nWhat should the subagent return, and what should the final report show? Name the specific field that keeps this from being read as a contradiction.",
   "explanation": null,
   "ko": "**상황.** 같은 세그먼트의 churn rate 두 개 — **11%**(2022 벤더 보고서, 고객 자기보고 설문)와 **18%**(2025 애널리스트 보고서, billing 텔레메트리).\n\n**채점 포인트(이걸 다 말해야 만점).**\n1. subagent는 **두 값을 모두** 주석과 함께 담아 분석을 완료하고, 충돌을 **위로 올린다**(스스로 해소하지 않음).\n2. ⚠️ subagent 수준의 **조용한 해소를 명시적으로 거부**할 것 — 최신이라서 18%, 벤더가 유명해서 11%, 평균내기 전부 오답. 보고서 목적에 대해 **가장 정보가 적은 컴포넌트**가 내리는 자의적 선택이다. 조정은 충돌을 눈앞에 둔 **coordinator**가, synthesis 전에.\n3. **핵심 필드 이름을 정확히 댈 것: publication / data collection date.** 이게 없으면 같은 지표의 두 수치가 정면 불일치로 보인다. 2022·2025가 붙으면 독자는 **temporal difference**가 오류만큼이나 유력한 설명임을 본다(churn이 실제로 움직였을 수 있다).\n4. 구조화 claim record 구성: claim · 뒷받침 발췌 · source identifier · date · **methodological context**(설문 자기보고 vs billing 텔레메트리 — 두 번째 설명 후보이자, 애초에 미묘하게 다른 것을 재고 있다는 근거).\n5. 보고서는 **contested findings와 well-established findings를 절로 분리**하고 각 소스의 원래 서술을 보존.\n6. 가점: 재무·수치 데이터는 균일 산문으로 녹이지 말고 **표로 렌더링**(값·날짜·출처가 정렬된 채 비교 가능하도록) = content-type-appropriate rendering.",
   "model_answer": "The subagent should **complete its analysis with both values included and explicitly annotated**, and pass the conflict up rather than resolving it. Its structured output carries, for each figure, the claim (the churn rate), the supporting excerpt, the source identifier, the **publication or collection date**, and the methodological context — survey self-report against billing telemetry. Choosing 18% because it is newer, or 11% because the vendor is better known, is an arbitrary selection made by the component with the least information about the report's purpose. The coordinator decides how to reconcile, with the conflict in front of it, before anything reaches synthesis.\n\nThe date is the field that does the work here. Without it, two figures on the same metric look like a straight disagreement. With 2022 and 2025 attached, the reader can see that a **temporal difference** is at least as likely an explanation as an error — churn may simply have moved — and the methodology note adds a second candidate explanation, since self-reported survey churn and billing-derived churn measure subtly different things.\n\nThe report should not average them or pick one. It should present both with attribution — who reported what, when, and by what method — in a section that **distinguishes contested findings from well-established ones**, preserving each source's original characterization. Figures of this kind belong in a table rather than being dissolved into prose, so the values, dates, and sources stay aligned and comparable.",
   "grading": "- Subagent returns **both** values, annotated, rather than selecting one\n- Explicitly rejects silent resolution (recency, prestige, averaging) at the subagent level; the coordinator reconciles with the conflict visible\n- Names the **publication / data collection date** as the field preventing a temporal difference from reading as a contradiction\n- Structured claim record includes source identifier, excerpt, date, and methodological context\n- Report separates well-established from contested findings and preserves original source characterizations\n- Credit for noting that financial or numeric data is rendered as a table rather than converted to uniform prose"
  },
  {
   "id": "sim-claude-code-ci-01",
   "kind": "exam-sim",
   "domain": "D3",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "3.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 5; §6 TS 3.6"
   ],
   "context": "**Claude Code for Continuous Integration.** You are integrating Claude Code into a CI/CD pipeline that runs automated code reviews, generates test cases, and posts feedback on pull requests. The prompts have to produce actionable feedback while keeping false positives low.\n\nA new `nightly-tests` job invokes the CLI to generate missing test cases for the billing package. The job emits no output and is killed by the runner's 30-minute step limit. The runner log shows the process alive but idle, blocked on standard input.",
   "question": "What is the correct way to run Claude Code in this job?",
   "explanation": "**C is correct.** `-p` / `--print` is the documented non-interactive mode. It takes the prompt, produces the result on stdout, and exits without ever waiting for user input — which is precisely the contract an automated pipeline needs from a command.\n\n**A** is the most attractive wrong answer, because configuring tools through environment variables is the normal shape of CI work and many CLIs really do have a variable like this. Claude Code does not: non-interactive execution is a flag on the invocation, and inventing a variable name means the job runs unchanged and hangs again.\n\n**B** names a flag that does not exist either. `--headless` is a convincing name — several other CLIs use it for exactly this behaviour — but Claude Code has no such flag, so the invocation would fail on the argument or, worse, be ignored and hang as before. Both A and B are plausible because they sound like the feature; the fix is to know the actual flag, not to reason about which name is the most idiomatic.\n\n**D** is the \"fixes a different problem\" distractor. It changes how long you wait to find out the job is stuck. The job still never produces a review, and retrying a deterministic hang just spends the budget faster.",
   "ko": "**Claude Code CI/CD.** `nightly-tests` job이 CLI를 호출하는데 출력이 전혀 없고 러너의 30분 step limit에 죽는다. 로그상 프로세스는 살아 있고 **standard input에서 블록**된 채 idle.\n\n**정답 C** — `-p` (`--print`)로 호출. 문서화된 non-interactive 모드로, 프롬프트를 처리해 결과를 stdout에 쓰고 사용자 입력을 기다리지 않고 종료한다. 자동화 파이프라인이 커맨드에 요구하는 계약 그대로다.\n\n**가장 매력적인 오답 A**(`CLAUDE_NON_INTERACTIVE=true` 환경변수) — ⚠️ 환경변수로 도구를 설정하는 게 CI 작업의 통상적 모양이고 실제로 그런 변수를 가진 CLI가 많아서 끌린다. Claude Code에는 없다 — non-interactive 실행은 **호출부의 플래그**이고, 변수 이름을 지어내면 job은 그대로 다시 멈춘다.\n\nB(`--headless`)도 **존재하지 않는 기능** — 여러 다른 CLI가 정확히 이 동작에 쓰는 설득력 있는 이름이라 그럴듯하지만 Claude Code에는 없다. A와 B가 그럴듯한 이유는 둘 다 \"기능처럼 들려서\"이고, 해법은 어느 이름이 가장 관용적일지 추론하는 게 아니라 **실제 플래그를 아는 것**이다. D(step limit을 줄여 빨리 실패)는 **다른 문제를 고침** — 멈춘 걸 언제 알게 되는가만 바꾼다.",
   "options": [
    {
     "key": "A",
     "text": "Export `CLAUDE_NON_INTERACTIVE=true` in the job environment so the CLI detects the pipeline and skips prompts."
    },
    {
     "key": "B",
     "text": "Add a `--headless` flag to the invocation so the CLI runs without a terminal session and returns the generated tests on exit."
    },
    {
     "key": "C",
     "text": "Invoke the CLI with `-p` (`--print`), which processes the prompt, writes the result to stdout, and exits."
    },
    {
     "key": "D",
     "text": "Leave the invocation as is and shorten the runner's step limit so a stuck job fails fast and can be retried."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "sim-claude-code-ci-02",
   "kind": "exam-sim",
   "domain": "D3",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "3.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 5; §6 TS 3.6"
   ],
   "context": "**Claude Code for Continuous Integration.** The pipeline runs automated reviews and generates test cases for pull requests, and must return feedback developers can act on.\n\nThe review job pipes the CLI's prose output into a shell script that regex-matches `path:line` prefixes and posts inline comments. Roughly one comment in six lands on the wrong line or is dropped entirely whenever the model varies its phrasing. Separately, developers delete most of the generated tests: they assert getters, and they hand-roll fixtures instead of using the factories already in `tests/support/factories`.",
   "question": "Which change addresses both problems?",
   "explanation": "**A is correct**, and it is correct through two separate mechanisms, one per symptom. `--output-format json` with `--json-schema` makes the structure a property of the run rather than of the model's wording, so `line` becomes a field the script reads instead of a token it guesses at. `CLAUDE.md` is the mechanism for supplying project context — testing standards, fixture conventions, review criteria — to a CI-invoked run, which is what turns generated tests from getter assertions into tests the team keeps.\n\n**B** is the most attractive wrong answer because it reads as the cheap version of A and would genuinely raise the hit rate for a while. It does not change the category of the problem: a table asked for in prose is still prose, and any format that is *requested* rather than *enforced* drifts. Extending the regex each sprint as new phrasings appear is the tell — it is a maintenance treadmill by construction, and it says nothing at all about test quality.\n\n**C** fixes a different problem. Posting the raw output verbatim does guarantee nothing is dropped by the parser, but it buys that by giving up the inline placement that made the feedback actionable in the first place — a wall of prose on the conversation tab is not a comment on line 214. It also leaves test generation untouched.\n\n**D** gets half the idea right — project context really does improve test generation — but puts it in the wrong place and leaves the parsing failure standing. Standards embedded in a workflow file's prompt string apply to that one job and have to be duplicated into every other invocation, while the same content in `CLAUDE.md` is picked up by every run, CI and human alike.",
   "ko": "**Claude Code CI/CD.** 증상 둘. 리뷰 job이 CLI의 산문 출력을 `path:line` 정규식으로 파싱해 인라인 코멘트를 다는데, 모델 표현이 바뀌면 6개 중 1개가 엉뚱한 줄에 붙거나 사라진다. 그리고 생성된 테스트를 개발자들이 대부분 지운다 — getter를 assert하고, `tests/support/factories`의 기존 팩토리 대신 fixture를 손으로 만든다.\n\n**정답 A** — 증상마다 하나씩 **두 개의 별도 메커니즘**이라 맞는다. `--output-format json` + `file`·`line`·`severity`·`suggested_fix`를 요구하는 `--json-schema`는 구조를 모델의 wording이 아니라 **실행의 속성**으로 만든다 — `line`이 추측할 토큰이 아니라 읽을 필드가 된다. `CLAUDE.md`는 CI 호출 run에 프로젝트 컨텍스트(테스트 표준·fixture 컨벤션·리뷰 기준)를 공급하는 메커니즘이다.\n\n**가장 매력적인 오답 B**(고정 컬럼의 Markdown 표를 지시 + 정규식을 관측된 변형에 맞춰 강화, 스프린트마다 확장) — A의 저렴한 버전처럼 읽히고 실제로 한동안 적중률을 올린다. 문제의 **범주**를 바꾸지 못한다: 산문으로 요청한 표도 산문이고, **강제되지 않고 요청된 형식은 표류한다.** \"스프린트마다 정규식 확장\"이 증거다 — 구조상 유지보수 트레드밀이고 테스트 품질엔 한마디도 못 한다.\n\nC(인라인 대신 PR당 요약 코멘트에 raw 출력)는 **다른 문제를 고침** — 누락은 막지만 피드백을 actionable하게 만든 인라인 배치를 포기하고, 테스트 생성은 손도 안 댄다. D(워크플로우 파일 프롬프트 문자열에 표준 첨부 + 기존 정규식 유지)는 절반만 맞다 — 컨텍스트를 **틀린 장소**에 두고(그 job에만 적용, 나머지 호출마다 복제) 파싱 실패는 그대로 남긴다.",
   "options": [
    {
     "key": "A",
     "text": "Run the review with `--output-format json` and a `--json-schema` requiring `file`, `line`, `severity`, and `suggested_fix`, and put the team's testing standards, fixture conventions, and review criteria in `CLAUDE.md` so every CI run inherits them."
    },
    {
     "key": "B",
     "text": "Instruct the prompt to emit a Markdown table with a fixed column order, and harden the posting script's regex to tolerate every wording variant observed so far, extending it each sprint as new phrasings turn up in the job logs."
    },
    {
     "key": "C",
     "text": "Stop posting inline comments and post one summary comment per pull request containing the CLI's raw output verbatim, so that no finding is ever dropped by the parser however the model phrases it on a given run."
    },
    {
     "key": "D",
     "text": "Append the team's testing standards and the full fixture list to the prompt string in the review job's workflow file, and keep parsing the prose output with the regex that is already in place."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "sim-claude-code-ci-03",
   "kind": "exam-sim",
   "domain": "D4",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "4.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 5; §6 TS 4.1"
   ],
   "context": "**Claude Code for Continuous Integration.** The review bot comments on pull requests in four categories: security, correctness bugs, performance, and comment accuracy. The stated goal for the prompt work is actionable feedback with a low false-positive rate.\n\nDevelopers dismiss 82% of the comment-accuracy findings — they are usually flagging wording the team considers fine. Two sprints ago the team appended \"be conservative and only report high-confidence findings\" to the review prompt; the dismissal rate did not move. Reviewers are now dismissing security findings without reading them.",
   "question": "What is the most effective next step?",
   "explanation": "**D is correct**, and it has two parts that both matter. General instructions like \"be conservative\" or \"only report high-confidence findings\" do not improve precision, because they give the model no boundary to apply: it has no way to infer where *your team* draws the line. Explicit categorical criteria state which issues to report and which to skip, in terms of the code. The second part is the one candidates skip: temporarily switching off a high false-positive category is legitimate, because trust is not per-category. The noisy category is currently costing you the accurate ones, and the security findings are the expensive thing to lose.\n\n**A** is the most attractive wrong answer because it looks like the rigorous, quantified version of the instruction that already failed. It is the same instruction with a number bolted on. Self-reported confidence is not calibrated against your team's definition of a real finding, and the model is *already confident* about the comment findings — that is why it reports them. Thresholding an uncalibrated signal filters volume, not error.\n\n**B** addresses a different problem — how much output there is, not how much of it is wrong. A shorter list that is 82% noise in one category is still noise. It can also make things worse: if the noisy category rates itself severe, the cap pushes genuine security findings out of the five that get posted.\n\n**C** is a real technique from the wrong stage. Recording which construct triggered each finding supports systematic analysis of *why* reviewers dismiss things, and it is excellent input for writing the criteria in **D**. On its own it changes nothing about what gets posted — the same 82% still arrives, now with a label attached — and the trust problem is live now.",
   "ko": "**Claude Code CI/CD.** 리뷰 봇의 comment-accuracy findings를 개발자들이 82% 기각. 두 스프린트 전 \"be conservative and only report high-confidence findings\"를 붙였지만 기각률은 그대로. 이제 **security findings까지 읽지 않고 기각**한다.\n\n**정답 D** — 모호한 지시를 **explicit categorical criteria**로 교체(\"주석이 주장하는 동작이 코드의 실제 동작과 모순될 때만 flag\")하고, 기준을 쓰고 시험하는 동안 comment-accuracy 카테고리를 **임시 비활성화**. 두 부분이 다 중요하다. \"be conservative\" 같은 일반 지시는 정밀도를 못 올린다 — 모델은 *너희 팀이* 어디에 선을 긋는지 추론할 길이 없다. 두 번째 부분이 응시자가 건너뛰는 곳이다: ⚠️ **trust는 카테고리별로 나뉘지 않는다.** 시끄러운 카테고리가 정확한 것들의 값을 치르게 하고 있고, 잃으면 비싼 건 security 쪽이다.\n\n**가장 매력적인 오답 A**(자기보고 confidence ≥0.9만 통과) — 이미 실패한 지시의 **엄밀·정량 버전처럼 보여서** 끌린다. 숫자만 붙인 같은 지시다. 자기보고 confidence는 너희 팀의 \"진짜 finding\" 정의에 캘리브레이션돼 있지 않고, 모델은 comment findings에 대해 **이미 확신하고 있다** — 그래서 보고하는 것이다. 캘리브레이션 안 된 신호의 임계는 **양을 거르지 오류를 거르지 않는다**.\n\nB(PR당 severity 상위 5개로 제한)는 다른 문제 — 출력의 *양*이지 *틀림*이 아니다. 게다가 시끄러운 카테고리가 스스로를 severe로 매기면 진짜 security finding이 5개 밖으로 밀린다. C(`detected_pattern` 필드 기록)는 진짜 기법이지만 **단계가 틀림** — D의 기준을 쓰는 데 훌륭한 입력이나, 그 자체로는 게시되는 것을 바꾸지 않는다(같은 82%에 라벨만 붙음).",
   "options": [
    {
     "key": "A",
     "text": "Have the model attach a self-reported confidence score to every finding and drop anything scoring below 0.9, so that only the findings the model is most certain about ever reach the pull request and the rest are discarded silently."
    },
    {
     "key": "B",
     "text": "Cap the output at the five highest-severity findings per pull request, so that reviewers face a short list they will actually read from top to bottom instead of a wall of comments they have already learned to skim past."
    },
    {
     "key": "C",
     "text": "Add a `detected_pattern` field to every finding, recording which code construct triggered it, so that the team can analyze which constructs drive the dismissals in each category before changing anything in the review prompt."
    },
    {
     "key": "D",
     "text": "Replace the vague instruction with explicit categorical criteria — flag a comment only when the behavior it claims contradicts what the code actually does — and temporarily disable the comment-accuracy category while those criteria are written and tested."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "sim-claude-code-ci-04",
   "kind": "exam-sim",
   "domain": "D4",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "4.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 5; §6 TS 4.2"
   ],
   "context": "**Claude Code for Continuous Integration.** The review job classifies each finding as `high`, `medium`, or `low` and emits a `suggested_fix`. The prompt already carries a full page of severity definitions with prose thresholds.\n\nRe-running the review on the same unchanged pull request produces different answers. One missing null check comes back `high` on one run and `low` on the next. The `suggested_fix` swings between a one-line diff and three paragraphs of narrative. Developers have started arguing with the severities rather than fixing the findings.",
   "question": "What most effectively produces consistent classification and output?",
   "explanation": "**B is correct.** Few-shot examples are the most effective technique when detailed instructions alone produce inconsistent output, and the detail here is the point: an example that shows *why* `high` was chosen over `medium` for a case where both were defensible transfers the judgment, not just the label. Two to four such examples are enough, and because they demonstrate reasoning rather than enumerate cases, the model generalizes to code the examples never covered. Including an example of the exact `suggested_fix` shape fixes the format drift by the same mechanism.\n\n**A** is the most attractive wrong answer. The natural reading of \"instructions produce inconsistent results\" is \"the instructions are not precise enough yet,\" and another page of prose — now with a decision tree — is the obvious next move; the team has already made it once. An exhaustive description still describes the boundary in the abstract, and the variance lives *at* the boundary, in cases where two levels both match the description. Examples show the boundary being applied to a concrete case, which prose cannot do.\n\n**C** removes the variance by removing the judgment. A static category-to-severity map does produce the same level every run, but it cannot see that a missing null check is `high` in a payment path and `low` in a debug logger. Consistent and wrong is not the goal, and developers will argue with a fixed map just as readily.\n\n**D** is a real technique aimed at a different failure — attention dilution when many files are analyzed in one pass, which shows up as uneven depth and contradictory findings *across* files. Here the same single finding in the same file is classified differently on two runs, so there is no dilution to relieve. Splitting the passes does not make an ambiguous boundary any less ambiguous.",
   "ko": "**Claude Code CI/CD.** 프롬프트에 이미 한 페이지 분량의 severity 정의(산문 임계)가 있는데, **변경 없는 같은 PR**을 재실행하면 답이 다르다. 같은 null check 누락이 한 번은 `high`, 다음엔 `low`. `suggested_fix`도 한 줄 diff와 세 문단 서사를 오간다.\n\n**정답 B** — 표적화된 few-shot examples **2~4개**: 짧은 코드 스니펫 + 부여된 severity + 정확한 출력 형태 + **왜 그럴듯했던 인접 레벨이 아니라 그 레벨인지의 근거**. 상세한 지시만으로 출력이 불안정할 때 가장 효과적인 기법이고, 여기선 그 디테일이 핵심이다 — 둘 다 방어 가능한 케이스에서 `high`를 고른 *이유*를 보여주는 예시는 라벨이 아니라 **판단을 전달**한다. 열거가 아니라 추론을 보여주므로 예시가 다루지 않은 코드로 **일반화**되고, `suggested_fix` 형태 예시 하나가 같은 메커니즘으로 형식 표류를 잡는다.\n\n**가장 매력적인 오답 A**(정의를 더 확장 + 산문 decision tree) — ⚠️ \"지시가 불안정한 결과를 낸다\"의 자연스러운 독해가 \"아직 지시가 충분히 정밀하지 않다\"이고, 팀은 이미 한 번 그렇게 했다. 남김없는 서술도 경계를 **추상적으로** 서술할 뿐인데, 분산은 바로 **경계 위에서** — 두 레벨이 모두 서술에 부합하는 케이스에서 — 산다. 예시는 산문이 못 하는 일, 구체 케이스에 경계가 적용되는 장면을 보여준다.\n\nC(카테고리→severity 고정 매핑)는 판단을 없애 분산을 없앤다 — 같은 null check가 결제 경로에선 `high`, 디버그 로거에선 `low`라는 걸 못 본다. **일관되게 틀린 것이 목표가 아니다.** D(파일별 pass + cross-file integration pass 분리)는 진짜 기법이나 다른 실패(**attention dilution**)를 겨냥한다 — 여기선 같은 파일의 같은 finding이 두 run에서 다르게 분류되므로 희석시킬 것 자체가 없다.",
   "options": [
    {
     "key": "A",
     "text": "Expand the severity definitions further and add a prose decision tree that walks each level in order, so that the boundary between `high` and `medium` is described exhaustively before the model classifies any finding at all."
    },
    {
     "key": "B",
     "text": "Add two to four targeted few-shot examples — each a short code snippet, the severity assigned, the exact output shape, and the reasoning for why that level was chosen over the adjacent level that also looked plausible."
    },
    {
     "key": "C",
     "text": "Assign severity outside the model: have the posting script map each finding category to a fixed severity, so that the same category always yields the same level no matter which run produced it."
    },
    {
     "key": "D",
     "text": "Split the review into per-file passes plus a separate cross-file integration pass, so that each pass analyses less code at a time and classifies its findings with undiluted attention."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "sim-claude-code-ci-05",
   "kind": "exam-sim",
   "domain": "D3",
   "format": "choice",
   "scenario": "claude-code-ci",
   "linked_ts": [
    "3.6",
    "4.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 5; §6 TS 3.6 and TS 4.6"
   ],
   "context": "**Claude Code for Continuous Integration.** The review runs on every push to a pull request, and an earlier pipeline stage uses Claude Code to scaffold database migration code.\n\nTwo complaints have arrived in the same week. A pull request with six pushes accumulated more than forty comments: fixes that were pushed get re-flagged in reworded form, and comments developers explicitly resolved reappear on the next run. Separately, the session that scaffolded a migration then reviewed that scaffold in the same session and reported nothing; a human reviewer later found two bugs in it.",
   "question": "Which **two** changes most directly address these? *(Select 2)*",
   "explanation": "**A and D are correct.**\n\n**A** treats the cause of the duplicates: a re-run starts with no knowledge that an earlier run happened, so it re-derives the same findings from the same code. Passing the prior findings into context and asking for only new or still-unaddressed issues is what lets the run reason about *what changed* rather than about the diff in isolation.\n\n**D** treats the second failure. A session that generated the code carries the reasoning that produced it, and is measurably less likely to question decisions it just made. An independent instance reviews the code rather than the argument for the code.\n\n**B** is the most attractive wrong answer, because it is a real deduplication technique and it does suppress exact repeats. It breaks exactly where you need it: a fix elsewhere in the file shifts line numbers and changes the hash, and any rephrasing of the same finding changes it too. Worse, a hash cannot distinguish \"already addressed\" from \"identical text\" — a still-open issue that was posted once gets silently dropped on every later run.\n\n**C** eliminates the duplicates by eliminating the reviews that made the pipeline worth having. It is true that a single run cannot repeat itself, but feedback then arrives when the work is finished and expensive to change, and it does nothing at all about the self-review problem.\n\n**E** is the option the guide singles out as insufficient. Self-review instructions and extended thinking both operate *inside* the reasoning context that produced the code, which is the thing that needs to be absent. More deliberation does not create independence.",
   "ko": "**Claude Code CI/CD.** 불만 둘. push 6번짜리 PR에 코멘트가 40개 넘게 쌓였다 — 고쳐서 push한 것이 표현만 바뀌어 다시 지적되고, 개발자가 resolve한 코멘트가 다음 run에 재등장. 그리고 migration을 scaffold한 **그 세션이 같은 세션에서** 그 scaffold를 리뷰하고 이상 없음을 보고했는데, 나중에 사람이 버그 2개를 찾았다.\n\n**정답 A와 D.**\n\n**A** — 재실행마다 **직전 run의 findings를 컨텍스트에 포함**하고 새롭거나 여전히 미해결인 이슈만 보고하게 한다. 중복의 원인은 재실행이 앞선 run의 존재를 모른 채 같은 코드에서 같은 findings를 다시 도출한다는 것이다.\n\n**D** — 리뷰를 **생성 세션의 컨텍스트를 들고 가지 않는 별도 호출**로 수행. 코드를 생성한 세션은 그것을 만든 추론을 지니고 있어 방금 내린 결정을 의심할 확률이 측정 가능하게 낮다. 독립 인스턴스는 **코드를 리뷰하지 코드를 위한 논증을 리뷰하지 않는다**.\n\n**가장 매력적인 오답 B**(파일경로+줄번호+텍스트 해시로 중복 제거) — 진짜 dedup 기법이고 정확한 반복은 실제로 눌러준다. 필요한 바로 그 지점에서 깨진다: 파일 다른 곳의 수정이 줄번호를 밀면 해시가 바뀌고, 같은 finding의 재표현도 바뀐다. ⚠️ 더 나쁜 건 해시가 **\"이미 처리됨\"과 \"동일 텍스트\"를 구별하지 못한다** — 한 번 게시된 미해결 이슈가 이후 run마다 조용히 사라진다.\n\nC(merge 직전 커밋에서 한 번만 리뷰)는 중복을 없애되 파이프라인의 존재 이유인 리뷰를 없앤다 — 피드백이 고치기 비싼 시점에 오고 self-review 문제엔 무관하다. E(생성 세션이 extended thinking으로 자기 비평)는 가이드가 **불충분하다고 못 박은** 선택지 — 자기 리뷰도 extended thinking도 코드를 만든 그 추론 컨텍스트 *안에서* 작동하는데, 없어야 할 게 바로 그것이다. **숙고를 더한다고 독립성이 생기지 않는다.**",
   "options": [
    {
     "key": "A",
     "text": "Include the previous review's findings in the context of each re-run and instruct the run to report only issues that are new or still unaddressed."
    },
    {
     "key": "B",
     "text": "Deduplicate in the posting script by hashing file path, line number, and comment text, and skip any finding whose hash has already been posted on this pull request."
    },
    {
     "key": "C",
     "text": "Run the review once only, on the final commit before merge, so that no finding can be posted twice and nothing a developer resolved can reappear on a later push."
    },
    {
     "key": "D",
     "text": "Perform the review in a separate Claude Code invocation that does not carry the generating session's context, so the reviewer sees the migration code and not the reasoning behind it."
    },
    {
     "key": "E",
     "text": "Instruct the generating session to re-read and critique its own migration scaffold, with extended thinking enabled, before the separate review step runs."
    }
   ],
   "answer": [
    "A",
    "D"
   ],
   "multi": true
  },
  {
   "id": "sim-code-generation-01",
   "kind": "exam-sim",
   "domain": "D3",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "3.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 2; §6 TS 3.4"
   ],
   "context": "**Code Generation with Claude Code.** Your team uses Claude Code for code generation, refactoring, debugging, and documentation, integrated into the development workflow through custom slash commands and `CLAUDE.md` configuration.\n\nThe next ticket on the payments service is written up in full before anyone starts: retire the in-house `SessionStore` and adopt the vendor SDK. The ticket states that the change touches roughly 45 files across three packages, and that the team must pick between two integration approaches — one requires standing up a Redis cluster, the other keeps sessions in the existing Postgres instance. There is no stack trace and no single failing file.",
   "question": "How should you drive Claude Code on this ticket?",
   "explanation": "**D is correct.** Every trigger for plan mode is present *in the requirement itself*: large-scale change, multi-file modification, and multiple valid approaches with an architectural consequence (new infrastructure or not). Plan mode is what lets Claude explore the codebase safely and design before committing to changes, which is how you avoid discovering a wrong service boundary after 30 files have been rewritten. The second half matters just as much: **once the approach is decided, the work is well-scoped, so direct execution is the right mode to carry it out.** Plan mode for investigation, direct execution for implementation.\n\n**A** is the \"let the implementation reveal the design\" option, and it is exactly the pattern that produces costly rework. Import breakage tells you what depends on what — but only after you have already committed code that assumes an answer to the Redis-versus-Postgres question.\n\n**B** is the \"valid but heavier than needed\" distractor. Planning is right for the *decision*; it is not a per-edit review gate. Once the approach is chosen, each of the 45 edits is a well-understood mechanical change, and routing all of them through planning spends the team's attention on the part that no longer carries risk.\n\n**C** is the most attractive wrong answer, because writing a detailed prompt genuinely does help and the ticket does look complete. The trap is subtle: naming two candidate approaches is not the same as having chosen one. **C assumes the answer to the very question the ticket says is open**, and it does so without ever reading the code that would decide it. Detail in a prompt cannot substitute for exploration you have not performed.",
   "ko": "**Claude Code 코드 생성.** 티켓: 자체 `SessionStore` 폐기하고 벤더 SDK 채택. 3개 패키지 45개 파일, 통합 방식 **두 개 중 택일**(Redis 클러스터 신설 vs 기존 Postgres). 스택 트레이스도 실패 파일도 없다.\n\n**정답 D** — plan mode로 세션 의존성 탐색 + 두 방식 비교 → 정해지면 direct execution으로 구현. plan mode 트리거가 요구사항 자체에 다 있다: 대규모 변경 · 다중 파일 · **아키텍처 결과가 갈리는 복수의 유효한 접근**. 뒷부분도 똑같이 중요하다 — **접근이 정해지면 작업은 well-scoped이므로 direct execution이 맞다.**\n\n**가장 매력적인 오답 C**(plan mode 생략, Redis로 못박은 상세 프롬프트 하나) — 상세한 프롬프트는 실제로 도움이 되고 티켓도 완전해 보인다. 함정은 미묘하다: 후보 둘을 **이름 붙인 것**과 **고른 것**은 다르다. C는 티켓이 열려 있다고 명시한 바로 그 질문의 답을 가정하며, 그것을 결정할 코드를 한 줄도 읽지 않는다. **프롬프트의 상세함은 하지 않은 탐색을 대체하지 못한다.**\n\nA(direct execution으로 시작, import가 깨지며 순서가 드러나게)는 값비싼 재작업의 전형. B(45개 편집 전부 plan mode 승인)는 **맞지만 과설계** — 계획은 *결정*을 위한 것이지 편집 단위 리뷰 게이트가 아니다.\n\n> plan mode = 조사, direct execution = 구현. **blast radius**가 트리거.",
   "options": [
    {
     "key": "A",
     "text": "Use direct execution, starting with the package that has the fewest dependents and letting the correct migration order emerge as imports break along the way."
    },
    {
     "key": "B",
     "text": "Stay in plan mode for the entire ticket so that each of the 45 file edits is proposed and approved individually, keeping a review gate in front of every change."
    },
    {
     "key": "C",
     "text": "Skip plan mode — the ticket already names both candidate approaches — and write one detailed prompt that fixes the Redis approach up front, then execute that prompt directly."
    },
    {
     "key": "D",
     "text": "Use plan mode to explore the session dependencies and compare the two integration approaches, then use direct execution to implement the approach the plan settles on."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "sim-code-generation-02",
   "kind": "exam-sim",
   "domain": "D3",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "3.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 2; §6 TS 3.2"
   ],
   "context": "**Code Generation with Claude Code.** Your team integrates Claude Code into the development workflow with custom slash commands and skills committed to the repository.\n\nOne of them is a skill in `.claude/skills/map-module/SKILL.md` that inventories a package: it walks the directory, lists every export, and traces cross-package imports. Its output runs to a few thousand lines. Developers report the same complaint each time they invoke it — the inventory is useful, but afterwards the session that was supposed to *do* the refactor is crowded with the raw listing, and Claude's later answers get noticeably worse. The team wants to keep the skill shared and keep using it.",
   "question": "What is the most appropriate change?",
   "explanation": "**B is correct.** `context: fork` exists for precisely this shape of problem: a skill whose *result* is valuable but whose *working output* is verbose. Forking runs the skill in an isolated subagent context, so the directory walk, the file reads, and the intermediate listing never enter the main session — only what the skill reports back does. The skill stays in `.claude/skills/`, stays version-controlled, and stays available to everyone.\n\n**A** is the most attractive wrong answer because it is about isolation and it does move the skill somewhere else. But it confuses **scope** with **context**. Project versus user scope decides *who can run the skill*; it has no bearing on *where the output lands*. Every developer would still get the same few thousand lines dumped into their own main conversation — and the team would lose version-controlled sharing on top of it.\n\n**C** trades an occasional cost for a permanent one. `CLAUDE.md` is for always-loaded universal standards; skills are for on-demand, task-specific work. A module inventory is needed by some sessions and irrelevant to most, so pinning it into always-loaded context makes the crowding continuous instead of occasional — and it goes stale the moment someone adds an export.\n\n**D** fixes a different problem. `allowed-tools` restricts which tools a skill may use — the right lever when you want to prevent destructive actions during skill execution. Read-only access does not make a directory walk shorter; the skill already only reads, and the volume is unchanged.",
   "ko": "**Claude Code 코드 생성.** `.claude/skills/map-module/SKILL.md` 스킬이 패키지 인벤토리를 수천 줄 뽑는다. 결과는 유용한데 이후 세션이 raw listing으로 채워져 답이 눈에 띄게 나빠진다. 팀은 스킬을 공유 상태로 계속 쓰고 싶다.\n\n**정답 B** — frontmatter에 `context: fork`. *결과*는 값진데 *작업 출력*이 장황한 스킬이 정확히 이 키의 존재 이유다. 격리된 subagent 컨텍스트에서 돌아 디렉터리 워크·파일 읽기·중간 목록이 메인 세션에 안 들어오고, 스킬은 `.claude/skills/`에 남아 버전관리·공유 유지.\n\n**가장 매력적인 오답 A**(`~/.claude/skills/`로 이동) — 격리 이야기이고 실제로 스킬을 다른 데로 옮기긴 한다. 그러나 **scope와 context를 혼동**한다. project vs user scope는 *누가 스킬을 실행할 수 있나*를 정할 뿐 *출력이 어디에 떨어지나*와 무관하다. 개발자마다 똑같이 수천 줄을 자기 메인 대화에 받고, 덤으로 버전관리 공유까지 잃는다.\n\nC(`CLAUDE.md`에 모듈 구조 섹션)는 가끔의 비용을 상시 비용으로 바꾼다 — `CLAUDE.md`는 항상 로드되는 보편 표준용, 스킬은 온디맨드 작업용. D(`allowed-tools`)는 **다른 문제를 고침** — 어떤 도구를 쓸 수 있나를 제한할 뿐 디렉터리 워크를 짧게 만들지 않는다(이미 읽기만 한다).\n\n> ⚠️ `context: fork` = **출력이 어디로 가나** ↔ `allowed-tools` = **무엇을 할 수 있나**.",
   "options": [
    {
     "key": "A",
     "text": "Move the skill from `.claude/skills/` to `~/.claude/skills/` so each developer runs their own copy and the output stays local to their machine."
    },
    {
     "key": "B",
     "text": "Add `context: fork` to the skill's frontmatter so it runs in an isolated subagent context and only its result returns to the main conversation."
    },
    {
     "key": "C",
     "text": "Replace the skill with a module-structure section in the project `CLAUDE.md`, so the inventory is always loaded and never has to be generated."
    },
    {
     "key": "D",
     "text": "Add `allowed-tools` to the skill's frontmatter, restricting it to read-only file operations so that it produces less output."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "sim-code-generation-03",
   "kind": "exam-sim",
   "domain": "D3",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "3.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 2; §6 TS 3.1"
   ],
   "context": "**Code Generation with Claude Code.** Over several months you have written up the team's conventions for Claude — the error-wrapping rules for API handlers, the migration file naming scheme, and which test fixtures to reuse instead of hand-rolling. In your own sessions Claude applies all of them without being reminded.\n\nTwo engineers joined last month. Their generated code ignores every one of those conventions: raw exceptions escape handlers, migrations are named ad hoc, and fixtures are recreated inline. They cloned the same repository you work in. Your conventions live in `~/.claude/CLAUDE.md`.",
   "question": "What explains the difference, and what is the right fix?",
   "explanation": "**A is correct.** This is the textbook hierarchy diagnosis. `~/.claude/CLAUDE.md` is user-level: it applies to your sessions on your machine and **is not shared with teammates through version control**. Nothing is malfunctioning — the new engineers were never given the instructions. Moving them to project-level configuration and committing them makes them arrive with the clone, for everyone, including the next hire. Splitting them into `.claude/rules/` topic files is an equally valid destination; what makes it work is that the files are *in the repository*. Either engineer can confirm what is actually loaded in their session with `/memory`.\n\n**B** is the most attractive wrong answer, and it is dangerous precisely because the advice is real: splitting a monolithic `CLAUDE.md` into focused topic files *is* recommended practice. But it answers a question nobody asked. The new engineers are not applying the conventions inconsistently — they are not receiving them at all. **Reorganizing a file that is not distributed changes nothing about who sees it.** Same evidence, wrong axis: this is a distribution failure, not an organization failure.\n\n**C** describes the mechanism correctly and then draws the wrong conclusion. A copy step in the onboarding checklist works exactly once, for exactly those two people. The copies immediately begin to drift, no review ever sees a change to them, and the next convention you add reaches nobody until someone remembers to re-distribute it by hand. Version control is the mechanism that already solves this.\n\n**D** describes a configuration option that does not exist. There is no `scope` key — or any other frontmatter flag — that promotes user-level memory into a shared, version-controlled artifact so that it arrives with the clone. Sharing comes from *where the file lives*, not from a flag on it, which is why the fix in **A** is a move rather than a setting.",
   "ko": "**Claude Code 코드 생성.** 내 세션에선 팀 컨벤션이 다 지켜지는데, 같은 repo를 클론한 신입 2명의 생성 코드는 전부 무시한다. 내 컨벤션은 `~/.claude/CLAUDE.md`에 있다.\n\n**정답 A** — `~/.claude/CLAUDE.md`는 user-level, 즉 **버전관리로 팀과 공유되지 않는다**. 고장난 건 없다 — 신입은 지시를 받은 적이 없다. project `CLAUDE.md` 또는 `.claude/rules/` 토픽 파일로 옮겨 커밋하면 클론과 함께 도착한다. 각자 `/memory`로 실제 로드된 것을 확인할 수 있다.\n\n**가장 매력적인 오답 B**(비대해진 파일을 `testing.md` 등 토픽 파일로 분할) — ⚠️ 조언 자체가 **실제 권장 practice**라서 위험하다. 그런데 아무도 묻지 않은 질문에 답한다. 신입은 컨벤션을 *일관성 없이 적용*하는 게 아니라 *아예 받지 못했다*. **배포되지 않는 파일을 재조직해봐야 누가 보느냐는 바뀌지 않는다.** 같은 증거, 틀린 축 — 조직 실패가 아니라 **배포 실패**.\n\nC(온보딩 체크리스트에 복사 단계 추가)는 메커니즘은 맞게 짚고 결론을 틀린다 — 딱 한 번, 딱 그 두 명에게만 통하고 즉시 drift한다. D(`scope: team` frontmatter)는 **존재하지 않는 기능** — 공유는 *파일이 어디 사는가*에서 나오지 플래그에서 나오지 않는다. 그래서 A가 설정이 아니라 **이동**인 것이다.\n\n> 축: **configuration hierarchy** — user는 내 머신, project는 repo.",
   "options": [
    {
     "key": "A",
     "text": "The conventions are user-level, so they are not part of the repository; move them into project-level configuration — the project `CLAUDE.md`, or topic files under `.claude/rules/` — and commit them."
    },
    {
     "key": "B",
     "text": "The file has grown too large for reliable application; split it into focused topic files such as `testing.md` and `api-conventions.md` so each instruction is applied consistently instead of being lost in a monolithic memory file."
    },
    {
     "key": "C",
     "text": "User-level memory is per-machine, so add a step to the onboarding checklist telling each new engineer to copy your `~/.claude/CLAUDE.md` into their own home directory before their first session."
    },
    {
     "key": "D",
     "text": "Add `scope: team` to the frontmatter of `~/.claude/CLAUDE.md` so the user-level memory is published to the repository alongside project configuration and arrives with the clone."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "sim-code-generation-04",
   "kind": "exam-sim",
   "domain": "D5",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "5.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 2; §6 TS 5.4"
   ],
   "context": "**Code Generation with Claude Code.** Before refactoring a legacy billing module you spend a long session with Claude Code mapping it — a codebase nobody currently on the team wrote.\n\nThe first hour goes well. Claude identifies the concrete participants by name — `InvoiceReconciler`, `LedgerPoster`, `DunningScheduler` — and traces the refund path through all three. Two hours in, the answers change character. Asked again how refunds reach the ledger, Claude describes \"a typical repository pattern with a service layer,\" naming no classes. Asked the same question twice, it gives two different answers. The session's context is by now mostly raw file dumps and search output from the exploration.",
   "question": "What most effectively addresses this?",
   "explanation": "**C is correct.** The symptom described — inconsistent answers and a retreat to \"typical patterns\" instead of the specific classes discovered earlier — is the signature of context degradation in an extended session. It has two causes and C addresses both. A **scratchpad file** persists the findings *outside* the conversation, so they survive past any context boundary and can be referenced instead of recalled. **Subagent delegation** stops the cause from recurring: the verbose discovery output stays in the subagent, and the main session keeps only the high-level coordination it needs. Where discovery output has already accumulated, `/compact` reduces what is being carried.\n\n**A** is the most attractive wrong answer, and it is attractive because it *works* — a fresh session really does answer accurately again. The cost is that it throws away two hours of mapping, and nothing about the new session prevents the identical collapse two hours later. **Restarting treats the incident and leaves the mechanism in place.** It is also the option people reach for repeatedly, which is how a one-day mapping becomes a three-day one.\n\n**B** treats the symptom and feeds the cause. Re-pasting findings adds tokens to a context that is already failing under its own volume, and it only works for the findings you happen to notice are missing — you cannot re-ground what you have forgotten was ever established.\n\n**D** solves a different problem. Re-reading source guarantees *freshness*, which was never in question — the code has not changed during the session. It also drives context exhaustion faster than anything else on the list, since the raw file content is exactly what crowded the session in the first place.",
   "ko": "**Claude Code 코드 생성.** 레거시 billing 모듈 매핑 세션. 첫 1시간은 `InvoiceReconciler`·`LedgerPoster`를 이름으로 짚었는데, 2시간째부터 \"a typical repository pattern with a service layer\"라며 클래스명을 못 대고 같은 질문에 두 번 다른 답. 컨텍스트는 대부분 raw file dump.\n\n**정답 C** — 발견을 **scratchpad file**에 기록해 이후 질문에서 참조 + 남은 장황한 탐색은 **subagent에 위임**. 이건 extended session의 context degradation 서명이고 원인이 둘이라 둘 다 쳐야 한다. scratchpad는 findings를 대화 *바깥에* 영속화해 컨텍스트 경계를 넘어 살아남고, subagent 위임은 장황한 출력이 메인 세션에 쌓이는 **원인 재발을 막는다**. 이미 쌓인 분량은 `/compact`로 줄인다.\n\n**가장 매력적인 오답 A**(새 세션에서 처음부터 다시 질문) — ⚠️ **실제로 동작하기 때문에** 매력적이다. 대가는 두 시간의 매핑을 버린다는 것이고, 새 세션이 2시간 뒤 동일한 붕괴를 막아주는 것도 아니다. **재시작은 사건을 처리하고 메커니즘은 그대로 둔다.** 반복해서 손이 가는 선택지이고, 그렇게 하루짜리 매핑이 사흘이 된다.\n\nB(앞선 findings를 다시 붙여넣기)는 증상을 다루며 원인에 먹이를 준다 — 이미 자기 부피로 실패 중인 컨텍스트에 토큰을 더하고, 빠졌다고 *알아챈* 것만 복구된다. D(질문마다 소스 재읽기)는 **다른 문제를 고침** — 신선도는 애초에 쟁점이 아니었고(세션 중 코드는 안 바뀜) 컨텍스트 고갈만 가속한다.\n\n> \"typical pattern\"으로 후퇴 + 같은 질문에 다른 답 = **context degradation**.",
   "options": [
    {
     "key": "A",
     "text": "Start a fresh session and re-ask the mapping questions from the beginning, since the current context has become unreliable and a clean session answers accurately again straight away, as it did in the first hour."
    },
    {
     "key": "B",
     "text": "When an answer comes back generic, paste the earlier findings about `InvoiceReconciler` and `LedgerPoster` back into the conversation, re-grounding the model in the specific classes and call paths it named during the first hour."
    },
    {
     "key": "C",
     "text": "Have Claude record key findings to a scratchpad file as the exploration proceeds and reference that file in later questions, and delegate the remaining verbose discovery to subagents so only their summaries return to the main session."
    },
    {
     "key": "D",
     "text": "Instruct Claude to re-read the billing module's source files at the start of every question, so that every answer is grounded in the current code rather than in what the session recalls."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "sim-code-generation-05",
   "kind": "exam-sim",
   "domain": "D5",
   "format": "choice",
   "scenario": "code-generation",
   "linked_ts": [
    "3.4",
    "5.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 2; §6 TS 3.4 and TS 5.4"
   ],
   "context": "**Code Generation with Claude Code.** The reporting layer refactor is a multi-day job, run as a sequence of phases: inventory the report definitions, trace their query builders, then rewrite them against the new aggregation API.\n\nTwo problems recur. Each phase begins with heavy discovery — repository-wide searches, file listings, test output — and by the time the phase's real work starts, the session is mostly that discovery output. And late in a phase Claude begins contradicting conclusions it reached earlier the same day, describing query builders in generic terms rather than by the names it established during the inventory.",
   "question": "Which **two** changes most directly keep the refactor sessions reliable? *(Select 2)*",
   "explanation": "**B and D are correct.** They are the two halves of the same discipline: keep the noisy output *out* of the main session, and keep the durable findings *outside* it.\n\n**B** targets the intake. The Explore subagent exists to isolate verbose discovery output and return summaries, which preserves main-conversation context during exactly this kind of multi-phase task. The main session keeps the coordination role; the file dumps never reach it.\n\n**D** targets the handoff. Summarizing key findings from one exploration phase and injecting that summary into the next phase's starting context is what stops each phase from being a fresh archaeology dig — and the scratchpad file, living in the repository rather than in the conversation, is what lets a finding outlive the context that produced it. It is also what a teammate resumes from.\n\n**C** is the most attractive wrong answer, because a fresh context demonstrably restores answer quality — the fix appears to work every time it is applied. What it does not do is preserve anything. Every restart discards the phase's accumulated findings and re-pays for them, and it leaves the accumulation mechanism untouched, so degradation returns on the same schedule. **A remedy you must keep reapplying is a symptom, not a fix** — and combined with D it is not even necessary, because the findings are already persisted.\n\n**A** confuses Claude's output volume with the context problem. The context is filling with search results and file contents, not with prose; terser answers shave a rounding error off the total and cost you the detail you are running the session to obtain.\n\n**E** solves a real problem — restating conventions — but the wrong one, and it picks the wrong scope while doing it. Instructions in `~/.claude/CLAUDE.md` are user-level and are not shared with teammates through version control, so a per-machine copy on a multi-day team refactor is a drift source. Conventions the whole team must follow belong in project-level configuration.",
   "ko": "**Claude Code 코드 생성.** 며칠짜리 리포팅 레이어 리팩터를 페이즈로 진행. 페이즈마다 무거운 discovery로 세션이 채워지고, 후반엔 같은 날 내린 결론을 뒤집으며 query builder를 이름 대신 일반론으로 설명한다.\n\n**정답 B와 D** — 같은 규율의 양면: 시끄러운 출력은 메인 세션 **밖에**, 지속적 findings도 **밖에**.\n\n**B** — 페이즈별 장황한 discovery를 **Explore subagent**로. raw 검색·목록 출력이 격리되고 요약만 돌아온다(intake 차단). 메인 세션은 coordination 역할만 유지.\n\n**D** — 완료된 페이즈의 key findings를 repo의 **scratchpad file**에 쓰고 다음 페이즈 초기 컨텍스트에 주입(handoff 차단). 파일이 대화가 아니라 repo에 살기 때문에 findings가 그것을 만든 컨텍스트보다 오래 산다 — 팀원이 이어받는 지점도 여기다.\n\n**가장 매력적인 오답 C**(일반론이 나오면 세션 종료 후 새 세션) — 새 컨텍스트가 답 품질을 실증적으로 회복시켜서, 적용할 때마다 먹히는 것처럼 보인다. ⚠️ **계속 다시 적용해야 하는 처방은 fix가 아니라 증상이다.** 매 재시작이 findings를 버리고 다시 지불하며 축적 메커니즘은 손대지 않는다. D와 함께라면 애초에 불필요하다.\n\nA(응답을 짧게)는 Claude의 출력량과 컨텍스트 문제를 혼동 — 채우는 건 검색결과와 파일 내용이지 산문이 아니다. E(`~/.claude/CLAUDE.md`에 컨벤션)는 진짜 문제를 풀지만 **틀린 문제 + 틀린 scope** — user-level은 팀 공유가 안 돼 drift 원천이 된다.",
   "options": [
    {
     "key": "A",
     "text": "Instruct Claude to keep its responses short and to summarize rather than quote, so that the context window fills more slowly over the course of each phase."
    },
    {
     "key": "B",
     "text": "Run each phase's verbose discovery through the Explore subagent, so the raw search and listing output stays isolated and only the summary returns to the main conversation."
    },
    {
     "key": "C",
     "text": "End the session and start a new one each time the answers begin to look generic, continuing the phase in the fresh context with the goal restated at the top of it."
    },
    {
     "key": "D",
     "text": "Write a summary of each completed phase's key findings to a scratchpad file in the repository, and inject that summary into the initial context of the next phase."
    },
    {
     "key": "E",
     "text": "Move the team's fixture and report-naming conventions into `~/.claude/CLAUDE.md` on each developer's machine so nobody has to restate them during the refactor."
    }
   ],
   "answer": [
    "B",
    "D"
   ],
   "multi": true
  },
  {
   "id": "sim-customer-support-01",
   "kind": "exam-sim",
   "domain": "D1",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "1.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 1; §6 TS 1.1"
   ],
   "context": "**Customer Support Resolution Agent.** You are building a support resolution agent with the Claude Agent SDK. It handles high-ambiguity requests — returns, billing disputes, account issues — and reaches backend systems through custom MCP tools (`get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`). The target is 80%+ first-contact resolution while knowing when to escalate.\n\nMonitoring shows a pattern in about 4% of sessions: the agent calls `lookup_order` with the same order number three or four times in a row, each time producing the same reply to the customer — \"Let me check that for you\" — before eventually timing out.",
   "question": "What is the most likely root cause?",
   "explanation": "**B is correct.** The signature of this failure is *repetition without progress*: the model asks for the same thing again because, from its point of view, it never received it. Appending tool results to the conversation is what lets the following iteration incorporate what was learned. Skip the append and the loop re-derives the same next action forever.\n\n**A** would produce a different symptom. A payload the model receives but cannot parse yields a confused or apologetic answer that references the data, or an error path — not a verbatim repeat of the same request. Discarding and retrying a bad payload also implies the model *saw* something; here it saw nothing.\n\n**C** is the \"fixes a different problem\" distractor. A low cap would *stop* the loop early — one truncated attempt, not four identical ones — so it cannot cause the same call to be made repeatedly. If anything, raising the cap here makes the failure more expensive.\n\n**D** is the most attractive wrong answer because it sounds like a cheap fix and the observed behaviour does look like the agent \"forgetting\" that it already asked. But the agent is not being over-cautious and it is not disobeying an instruction — it genuinely has no record of the result. **A prompt cannot tell a model to remember something that was never put in its context.**",
   "ko": "**고객지원 에이전트.** 4% 세션에서 같은 주문번호로 `lookup_order`를 3~4회 반복 호출하고 매번 \"Let me check that for you\"만 내보내다 타임아웃.\n\n**정답 B** — 도구 결과가 반복 사이에 conversation history에 **append되지 않는다**. 증상이 *repetition without progress*면 모델 관점에서 결과를 **받은 적이 없다**는 뜻이다. 다음 iteration이 배운 것을 반영하는 유일한 경로가 append다.\n\n**가장 매력적인 오답 D**(시스템 프롬프트에 \"한 번 성공이면 충분\"을 명시) — 싸 보이고, 겉보기 행동이 \"이미 물어본 걸 잊은\" 것처럼 읽힌다. 하지만 에이전트는 과잉신중한 것도 지시를 어긴 것도 아니다. **컨텍스트에 들어간 적 없는 것을 기억하라고 프롬프트로 시킬 수 없다.**\n\nA(malformed payload)는 증상 자체가 다르다 — 받았는데 못 읽으면 데이터를 언급하는 혼란한 답이나 에러 경로가 나오지, 같은 요청의 축자 반복이 아니다. C(max iteration이 낮음)는 **다른 문제를 고침** — cap이 낮으면 루프가 *일찍 끊기지* 같은 호출을 네 번 하게 만들지 않는다.\n\n> 축은 **repetition without progress** 한 구절.",
   "options": [
    {
     "key": "A",
     "text": "The `lookup_order` tool is returning a malformed payload the model cannot parse, so it discards the result and re-issues the call hoping for a clean one."
    },
    {
     "key": "B",
     "text": "Tool results are not being appended to the conversation history between iterations, so each turn reasons from a context that never learned the answer."
    },
    {
     "key": "C",
     "text": "The loop's maximum iteration count is too low to finish a multi-step lookup, so the run is cut off by the cap before the order data can be turned into an answer."
    },
    {
     "key": "D",
     "text": "The system prompt never states that one successful `lookup_order` call is enough, so the agent re-queries the same order number out of an abundance of caution."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "sim-customer-support-02",
   "kind": "exam-sim",
   "domain": "D5",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "5.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 1; §6 TS 5.2"
   ],
   "context": "**Customer Support Resolution Agent.** The agent handles returns, billing disputes, and account issues through MCP tools, targeting 80%+ first-contact resolution with correct escalation.\n\nCurrent first-contact resolution is 61%. Reviewing escalated transcripts shows two patterns. The agent escalates straightforward cases it could have closed — a damaged-item replacement with photo evidence, squarely inside policy. It also attempts, alone, cases where the customer is asking for something the returns policy does not address at all, such as matching a competitor's price.",
   "question": "What most effectively improves escalation calibration?",
   "explanation": "**D is correct.** The failure is in both directions — escalating the easy, attempting the ungoverned — which means the decision boundary was never described, not that the agent is bad at applying it. Explicit criteria plus few-shot examples of the ambiguous cases addresses the root cause, and it is the proportionate first move before adding infrastructure.\n\n**A** fails on a specific mechanism worth remembering: **the agent is already confidently wrong on the hard cases.** Self-reported confidence is not calibrated, so the number is high exactly where you need it to be low. Thresholding an uncalibrated signal does not create calibration.\n\n**B** solves a different problem entirely. Sentiment measures how the customer *feels*; escalation should track whether the case is *within policy and capability*. A calm customer can raise a policy gap and an upset one can have a trivial issue, so a frustration threshold routes on the wrong axis in both directions.\n\n**C** is the \"valid but heavier than needed\" distractor, and it is genuinely tempting because a classifier *would* work eventually. It requires labeled data, training, and a serving path — all before the cheap intervention, fixing an underspecified prompt, has been tried once. Pre-routing also decides before the agent has read the case.\n\n> Legitimate triggers: the customer asks for a human, policy is silent or has a gap, or no meaningful progress is possible. **Difficulty alone is not one.**",
   "ko": "**고객지원 에이전트.** first-contact resolution 61%. 정책 안의 쉬운 건(사진 증빙 파손 교환)은 escalate하고, 정책이 아예 다루지 않는 건(경쟁사 가격 매칭)은 혼자 처리한다.\n\n**정답 D** — 실패가 **양방향**이라는 게 단서다. 적용을 못하는 게 아니라 **decision boundary가 기술된 적이 없다**. explicit escalation criteria + 모호 사례 대비의 few-shot examples가 근본 원인이고, 인프라를 얹기 전의 **비례적** 첫 수다.\n\n**가장 매력적인 오답 C**(과거 티켓으로 classifier 학습해 사전 라우팅) — **맞지만 과설계**. 언젠간 동작하겠지만 라벨링·학습·서빙 경로를 다 요구하며, 값싼 개입(부실한 프롬프트 고치기)을 한 번도 안 해봤다. 게다가 사전 라우팅은 에이전트가 케이스를 읽기도 전에 결정한다.\n\nA(자기보고 confidence 임계) — ⚠️ **에이전트는 어려운 케이스에서 이미 자신 있게 틀린다.** 캘리브레이션 안 된 숫자는 낮아야 할 곳에서 높다. B(sentiment)는 **다른 문제를 고침** — 감정은 케이스가 policy·capability 안인지와 무관한 축이다.\n\n> 정당한 트리거 3종: 사람을 요구 · policy 공백 · 진전 불가. **난이도는 아니다.**",
   "options": [
    {
     "key": "A",
     "text": "Have the agent emit a self-reported confidence score before each response and escalate automatically when it falls below a threshold tuned on last quarter's tickets."
    },
    {
     "key": "B",
     "text": "Run sentiment analysis on the customer's messages and escalate as soon as measured frustration crosses a threshold, on the theory that upset customers need a person."
    },
    {
     "key": "C",
     "text": "Train a classifier on historical tickets to predict which requests will need escalation, and route the ones it flags to a human before the agent starts work on them."
    },
    {
     "key": "D",
     "text": "Add explicit escalation criteria to the system prompt, with few-shot examples contrasting cases to escalate against cases to resolve autonomously."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "sim-customer-support-03",
   "kind": "exam-sim",
   "domain": "D5",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "5.1"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 1; §6 TS 5.1"
   ],
   "context": "**Customer Support Resolution Agent.** Billing disputes often run twenty or more turns. To keep the conversation inside the context window, the harness periodically summarizes older turns and replaces them with the summary.\n\nComplaints have surfaced: in long disputes the agent starts quoting the wrong refund amount, sometimes proposing a figure the customer never agreed to, and occasionally cites a delivery date that does not match the order. Early in the same conversations, the amounts and dates were handled correctly.",
   "question": "What change most directly addresses this?",
   "explanation": "**A is correct.** Progressive summarization is lossy in a *patterned* way: it keeps the narrative and drops precise values — numbers, percentages, dates, and what the customer explicitly said they expected. Those are exactly the facts a billing resolution turns on. Holding them in a structured block **outside** the summarized history means compaction cannot touch them.\n\n**B** delays the problem in proportion to how much extra context you keep, and buys that delay with tokens. Keeping the raw turns verbatim for longer postpones the first loss in a twenty-turn dispute without preventing any of them — compaction still arrives, and it still drops the figures when it does.\n\n**C** is the most attractive wrong answer because it seems to target the loss directly, and \"compress less\" sounds like the dial that controls exactly this. It does not solve it — a longer summary is still a summary, still chooses what to keep under pressure, and still favours narrative over figures. **You cannot summarize your way to guaranteed retention of specific values.**\n\n**D** fixes a different problem. It refreshes what the *system of record* holds about the order, but the losses here include things no backend stores — the amount the customer stated they were promised, and what the agent already committed to earlier in this conversation.",
   "ko": "**고객지원 에이전트.** 20턴 넘는 billing dispute에서 오래된 턴을 주기적으로 요약·치환. 후반부에 환불 금액을 틀리게 인용하고 고객이 동의한 적 없는 액수를 제시. 초반엔 정확했다.\n\n**정답 A** — 금액·날짜·주문번호·상태를 `case facts` 블록으로 뽑아 **요약 히스토리 바깥에서** 매 프롬프트에 포함. progressive summarization은 *패턴화된* 손실이다 — 서사는 남기고 정확한 값을 버린다. 밖에 두면 compaction이 건드릴 수 없다.\n\n**가장 매력적인 오답 C**(요약을 더 길고 상세하게) — 손실을 정면으로 겨냥하는 듯하고 \"덜 압축한다\"가 바로 그 다이얼처럼 보인다. 그러나 **긴 요약도 요약이고**, 압박 하에서 무엇을 남길지 여전히 고르며 여전히 수치보다 서사를 택한다. **특정 값의 보존을 요약으로 보장할 수는 없다.**\n\nB(요약 빈도 낮추기)는 토큰으로 지연을 사는 것뿐 — compaction은 결국 오고, 올 때 여전히 수치를 버린다. D(`lookup_order` 매번 재조회)는 **다른 문제를 고침** — 잃어버린 것 중엔 백엔드가 저장하지 않는 것(고객이 약속받았다고 말한 금액, 에이전트가 앞서 약속한 것)이 있다.\n\n> 트리거: 긴 세션 + **숫자·날짜가 틀어짐** → 요약 바깥의 구조화 블록.",
   "options": [
    {
     "key": "A",
     "text": "Extract transactional facts — amounts, dates, order numbers, statuses — into a persistent `case facts` block that is included in every prompt, outside the summarized history."
    },
    {
     "key": "B",
     "text": "Summarize less frequently so that more raw turns stay in context before compaction runs, keeping the original amounts and dates verbatim for longer into each dispute."
    },
    {
     "key": "C",
     "text": "Instruct the summarizer to produce longer, more detailed summaries of each removed segment, so that less of the dispute's history is compressed away at each compaction step it runs."
    },
    {
     "key": "D",
     "text": "Re-fetch the order from `lookup_order` before every response so the agent always answers from current system-of-record data rather than from the summarized history."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "sim-customer-support-04",
   "kind": "exam-sim",
   "domain": "D2",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "2.2",
    "5.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 1; §6 TS 2.2 and TS 5.3"
   ],
   "context": "**Customer Support Resolution Agent.** The MCP tools return a single failure shape for every unhappy path:\n\n```json\n{ \"error\": \"Operation failed\" }\n```\n\nThree different situations produce it: the billing service timing out, a refund rejected because the order is outside the return window, and a customer search that ran correctly and matched nobody. The agent retries all three identically, and in the third case eventually tells the customer \"our systems are unavailable\" — when in fact no such customer record exists.",
   "question": "Which **two** changes most directly enable correct handling? *(Select 2)*",
   "explanation": "**A and C are correct.**\n\n**A** gives the agent the two facts it needs to act: what kind of failure this is, and whether retrying could ever help. A policy rejection and a timeout require opposite responses, and today they are indistinguishable.\n\n**C** fixes the second, more damaging symptom. A search that matched nothing **succeeded**. Reporting it as an error is what produces \"our systems are unavailable\" when the truthful answer is \"no account matches that email\" — which the agent could act on by asking for another identifier.\n\n**B** is the attractive distractor because retrying *is* right for one of the three cases, and backoff is the textbook way to do it. Applied blindly it makes the other two worse: the policy rejection burns a longer schedule of attempts it can never win, and the empty result gets retried as though absence were a fault. **Retry policy is downstream of classification, not a substitute for it.**\n\n**D** changes who the message reads well for, not whether the agent can recover. A transcript that reads acceptably is still built on one opaque shape covering three different states, and the agent's next action is no better informed than before.\n\n**E** guarantees the first-contact resolution target is missed — every timeout becomes a handoff. It also escalates the empty-result case, which needed a clarifying question to the customer, not a human inspecting backend systems.",
   "ko": "**고객지원 에이전트.** MCP 도구가 모든 실패에 `{ \"error\": \"Operation failed\" }` 하나만 반환. 빌링 타임아웃 / 반품기한 초과 거절 / **정상 실행됐지만 매치 0건**이 구분 불가. 세 번째까지 \"our systems are unavailable\"로 나간다.\n\n**정답 A와 C.**\n\n**A** — `isError` + `errorCategory` + `isRetryable` + 사람이 읽을 설명. 에이전트가 행동하려면 두 사실이 필요하다: 어떤 종류의 실패인가, 재시도가 도움이 될 수 있는가. 정책 거절과 타임아웃은 정반대 대응인데 지금은 구별 불가다.\n\n**C** — valid empty result는 **성공**이다. 그걸 에러로 보고하는 게 \"시스템 장애\" 메시지의 출처다. 진실은 \"그 이메일에 맞는 계정 없음\"이고, 에이전트는 additional identifier를 되물으면 된다.\n\n**가장 매력적인 오답 B**(retry 횟수↑ + exponential backoff) — 세 케이스 중 하나엔 실제로 맞는 처방이라 끌린다. 무차별 적용하면 나머지 둘이 악화: 정책 거절은 절대 못 이길 재시도 일정을 태우고, 빈 결과는 부재를 결함처럼 재시도한다. **retry policy는 classification의 하류이지 대체재가 아니다.**\n\nD(고객친화 문구로 교체)는 메시지가 누구에게 잘 읽히는가를 바꿀 뿐 복구 능력은 그대로. E(모든 실패 escalate)는 first-contact resolution 목표를 확실히 놓치고, 되묻기 한 번이면 될 빈 결과까지 사람에게 넘긴다.\n\n> ⚠️ **valid empty result ≠ access failure.**",
   "options": [
    {
     "key": "A",
     "text": "Return the MCP `isError` flag with structured metadata — an `errorCategory` and an `isRetryable` boolean plus a human-readable description."
    },
    {
     "key": "B",
     "text": "Increase the retry count and add exponential backoff so that transient billing timeouts are more likely to succeed before the agent gives up and reports failure to the customer."
    },
    {
     "key": "C",
     "text": "Distinguish a valid empty result — the query ran and matched nothing — from an access failure, and stop reporting the former as an error."
    },
    {
     "key": "D",
     "text": "Replace the payload with a customer-friendly message such as \"We're having trouble reaching your account right now,\" so that failures read acceptably in the customer transcript."
    },
    {
     "key": "E",
     "text": "Escalate to a human on any tool failure, since the agent cannot tell the three cases apart and a person can inspect the backend systems directly to see which one occurred."
    }
   ],
   "answer": [
    "A",
    "C"
   ],
   "multi": true
  },
  {
   "id": "sim-customer-support-05",
   "kind": "exam-sim",
   "domain": "D1",
   "format": "choice",
   "scenario": "customer-support",
   "linked_ts": [
    "1.4",
    "1.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 1; §6 TS 1.4 and TS 1.5"
   ],
   "context": "**Customer Support Resolution Agent.** Policy allows the agent to issue refunds autonomously up to $200; anything larger requires human approval. The system prompt states this clearly and includes two examples.\n\nAn audit of last quarter finds eleven refunds between $200 and $340 issued without approval, out of roughly nine thousand refunds processed. Finance considers any occurrence unacceptable.",
   "question": "What change should you make?",
   "explanation": "**C is correct.** Eleven in nine thousand is roughly a 0.1% failure rate — the prompt is working *well*. That is the point: a probabilistic mechanism produces a small residual failure rate, and Finance has stated the acceptable rate is zero. Only code delivers zero. The hook makes the over-limit call impossible, and redirecting with a **structured handoff** (customer ID, root cause, recommended action) means the human receiving it can act without reconstructing the case.\n\n**A** is the classic \"valid but insufficient\" option. Emphasis may move 0.1% to 0.05%. It cannot reach zero, and the remaining failures are the expensive ones by construction.\n\n**B** shares that ceiling and adds token cost to every request. Few-shot examples teach **judgment in ambiguous cases**; a fixed numeric threshold is not ambiguous — it is arithmetic, and arithmetic belongs in code.\n\n**D** is the over-correction, and it is tempting because it is certainly safe. It routes 8,989 compliant refunds through humans to stop eleven, destroying the first-contact resolution target the system exists to hit. **Proportionality is part of the answer, not a footnote to it.**",
   "ko": "**고객지원 에이전트.** $200 이하만 자율 환불, 초과는 사람 승인. 프롬프트에 명시 + 예시 2개. 그런데 분기 감사에서 약 9,000건 중 11건이 $200~$340 무승인 집행. Finance는 **0건**을 요구.\n\n**정답 C** — `process_refund` 호출을 가로채 $200 초과를 escalation workflow로 돌리는 hook + structured handoff. 11/9000 ≈ 0.1%는 프롬프트가 *잘 동작한다*는 뜻이고 바로 그게 요점이다. 확률적 메커니즘은 잔여 실패율을 남기고, 요구 수준이 0이면 **코드만이 0을 준다.**\n\n**가장 매력적인 오답 D**(`process_refund` 제거, 전건 사람 승인) — 확실히 안전해 보여서 끌리는 **과잉교정**. 11건을 막자고 8,989건의 정상 환불을 사람에게 태워 시스템의 존재 이유인 first-contact resolution을 파괴한다. **비례성은 정답의 일부이지 각주가 아니다.**\n\nA(더 강조해서 재진술)는 0.1%를 0.05%로 옮길 뿐 0엔 못 간다 — 남는 실패가 구조적으로 비싼 실패다. B(few-shot 8개 추가)는 같은 천장 + 매 요청 토큰 비용. few-shot은 **모호한 판단**을 가르치는 도구이고, 고정 수치 임계는 모호하지 않다 — 산술이고 산술은 코드 소관이다.\n\n> 트리거: **deterministic / zero tolerance / 금전** → hook 또는 gate.",
   "options": [
    {
     "key": "A",
     "text": "Rewrite the system prompt to state the $200 limit more emphatically, and repeat it at the end of the prompt where instructions are attended to most reliably."
    },
    {
     "key": "B",
     "text": "Add eight more few-shot examples covering refund amounts just above and just below the threshold, so the boundary is demonstrated rather than merely stated once."
    },
    {
     "key": "C",
     "text": "Add a hook that intercepts `process_refund` calls above $200 and redirects them to the escalation workflow with a structured handoff."
    },
    {
     "key": "D",
     "text": "Remove `process_refund` from the agent's tools entirely and route every refund, of any size, through a human approver so that no over-limit issuance is possible."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "sim-developer-productivity-01",
   "kind": "exam-sim",
   "domain": "D2",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "2.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 4; §6 TS 2.5"
   ],
   "context": "**Developer Productivity Agent.** You are building developer productivity tools with the Claude Agent SDK. The agent helps engineers explore unfamiliar codebases, understand legacy systems, generate boilerplate, and automate repetitive tasks, using the built-in tools (`Read`, `Write`, `Bash`, `Grep`, `Glob`) alongside MCP servers.\n\nAn engineer asks the agent to change the retry backoff constant inside the `schedule_retry` function of `services/billing/dispatcher.py`. The agent calls `Edit` with the anchor text `backoff = 2` and the call fails because the string is not unique — that exact line appears in four other functions in the same file. The agent re-issues the identical `Edit` call twice more, fails identically, and gives up.",
   "question": "What should the agent do to complete this modification reliably?",
   "explanation": "**C is correct.** `Edit` works by matching text that occurs exactly once; when no unique anchor exists, the documented fallback is `Read` followed by `Write`. `Read` gives the agent the whole file including the surrounding context that disambiguates the four identical lines, and `Write` replaces the file with a version the agent has fully seen. This is the intended escape hatch for exactly this failure.\n\n**A** is diagnosis without a fix. `Grep` would confirm what the error already reported — five matches — and knowing the count changes nothing about the anchor, so the re-issued `Edit` fails for the same reason it failed the first three times. Repeating a call whose precondition has not changed is the same non-progress loop, one tool call earlier.\n\n**B** misuses the tool. `Glob` matches **file path patterns** (`**/*.py`), not file **contents**; `Grep` is the content-search tool, so the search as described would not find anything. Even if it worked, the ambiguity is *within one file*, and \"keep the constant consistent across the service\" is not what the engineer asked for — it turns a one-function change into an unreviewed mass edit.\n\n**D** is the most attractive wrong answer, because it sidesteps the uniqueness problem instead of solving it and it finishes in one call. That is exactly what makes it wrong: an unscoped `sed -i` substitution rewrites **all five** occurrences, including the four in functions nobody asked to change, and it does so in place without the agent ever reading the result back. It is a silent regression in four other retry paths dressed up as a fix. **Reach for `Read` + `Write` when `Edit` has no unique anchor — the shell one-liner is not scoped to the change you were asked to make.**",
   "ko": "**개발 생산성 에이전트.** `dispatcher.py`의 `schedule_retry` 안 backoff 상수만 바꾸려는데, `Edit` 앵커 `backoff = 2`가 같은 파일 다른 함수 4곳에도 있어 unique text match 실패. 에이전트는 동일 `Edit`를 두 번 더 반복하고 포기.\n\n**정답 C** — `Read`로 파일 전체를 로드한 뒤 `Write`로 `schedule_retry` 안의 occurrence만 바꾼 버전을 쓴다. `Edit`는 정확히 한 번 나오는 텍스트에 매칭하는 방식이고, unique anchor가 없을 때의 문서화된 fallback이 `Read` → `Write`다. 4개의 동일 라인을 구별해주는 주변 맥락까지 손에 들어온다.\n\n**가장 매력적인 오답 D**(`Bash`로 `sed -i 's/backoff = 2/backoff = 5/'`) — uniqueness 문제를 풀지 않고 **우회하면서 한 번의 호출로 끝나서** 끌린다. 바로 그게 오답인 이유다. 스코프 없는 `sed -i`는 **5개 전부**를 고쳐 아무도 요청하지 않은 4개 함수를 바꾸고, 에이전트가 결과를 되읽지도 않은 채 in-place로 한다. 다른 4개 retry 경로의 조용한 회귀를 fix로 포장한 것.\n\nA(`Grep`으로 매치 수 세고 같은 `Edit` 재발행)는 진단만 있고 fix가 없다 — 전제조건이 안 바뀐 호출의 반복은 같은 non-progress loop다. B(`Glob`으로 다른 파일 찾기)는 도구 오용 — `Glob`은 **파일 경로 패턴**(`**/*.py`)을 매칭하지 파일 **내용**이 아니다(그건 `Grep`). 게다가 모호성은 *한 파일 안*에 있다.\n\n> ⚠️ `Edit`에 unique anchor가 없으면 → `Read` + `Write`. 셸 one-liner는 요청된 범위에 스코프되지 않는다.",
   "options": [
    {
     "key": "A",
     "text": "Call `Grep` to count how many times `backoff = 2` occurs in the file, then re-issue the same `Edit` call now that the number of matches is known."
    },
    {
     "key": "B",
     "text": "Call `Glob` to find the other files that contain `backoff = 2` and modify all of them together, so the constant stays consistent across the service."
    },
    {
     "key": "C",
     "text": "Call `Read` to load the full file contents, then call `Write` with the file rewritten so only the occurrence inside `schedule_retry` is changed."
    },
    {
     "key": "D",
     "text": "Use `Bash` to run `sed -i 's/backoff = 2/backoff = 5/' dispatcher.py`, which needs no unique anchor and completes in a single call."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "sim-developer-productivity-02",
   "kind": "exam-sim",
   "domain": "D2",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "2.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 4; §6 TS 2.5"
   ],
   "context": "**Developer Productivity Agent.** The agent helps engineers understand legacy systems using the built-in tools (`Read`, `Write`, `Bash`, `Grep`, `Glob`).\n\nA new hire asks: \"How does session expiry work in this service?\" The repository is a twelve-year-old Java system with about 4,200 source files. The agent begins by calling `Glob` for `**/*.java` and then `Read`ing the results in the order returned. Around the ninetieth file the answers degrade: the agent stops naming the classes it found earlier and starts describing \"the typical servlet filter pattern,\" and its final answer contradicts what it said twenty files ago.",
   "question": "What exploration strategy should the agent use instead?",
   "explanation": "**A is correct.** Reading everything up front is the wrong shape for the task. Codebase understanding is built **incrementally** — `Grep` to find the entry points named in the question, then `Read` to follow their imports and trace the flow outward — so the agent loads the handful of files the question actually touches instead of 4,200 files it does not. The degradation at file ninety is a consequence of the strategy, not a separate problem to patch: an agent that never loads the other 4,100 files never reaches the state where it starts describing \"the typical servlet filter pattern.\"\n\n**B** is the most attractive wrong answer, because `/compact` is a real remedy for context filling with verbose discovery output and it appears to unblock the exact wall the agent hit. It does not fix this failure — it *paces* it. The agent still reads 4,200 files, and every compaction discards detail that a later question may need. **Compaction manages the cost of context you decided to load; it is not a substitute for not loading it.**\n\n**C** applies the right tool to the wrong axis and then abandons the gain. `Glob` narrows by **filename**, which finds `SessionManager.java` but misses the filter, the config class, and the cache eviction hook — the parts that are actually interesting — because they are not named \"Session.\" Continuing on to read the rest of the repository afterwards restores the original problem in full.\n\n**D** is a real technique aimed at a different failure, and it is the closest of the three to being right. Scratchpad files counteract **context degradation** — the model drifting toward \"typical patterns\" rather than the specific classes it discovered — which is exactly the symptom described. But the scratchpad does nothing about the cause, which is that the session is being filled with 4,200 files of mostly irrelevant content. Persisting notes from an exploration that should never have been this wide treats the symptom and still pays for the sweep.",
   "ko": "**개발 생산성 에이전트.** \"이 서비스에서 session expiry가 어떻게 동작하나?\" 질문에, 4,200개 Java 파일을 `Glob`으로 `**/*.java` 뽑아 반환 순서대로 `Read`한다. 90번째 파일쯤부터 앞서 찾은 클래스명을 못 대고 \"the typical servlet filter pattern\"을 설명하며 20파일 전 자기 말과 모순된다.\n\n**정답 A** — 질문에 나온 개념으로 `Grep`(`SessionExpiry`, `invalidate(`, `setMaxInactiveInterval`) → 매치된 파일만 `Read` → import를 따라 바깥으로 추적. codebase 이해는 **incremental**하게 쌓는 것이다. 90번째의 열화는 별도로 패치할 문제가 아니라 **전략의 결과**다 — 나머지 4,100개를 애초에 로드하지 않는 에이전트는 그 상태에 도달하지 않는다.\n\n**가장 매력적인 오답 B**(전부 읽되 컨텍스트가 차면 `/compact`) — ⚠️ `/compact`는 장황한 discovery로 컨텍스트가 차는 데 대한 **진짜 처방**이고, 부딪힌 바로 그 벽을 뚫어주는 것처럼 보인다. 이 실패를 고치지 못하고 **속도를 조절할 뿐**이다. 여전히 4,200개를 읽고, 매 compaction이 나중에 필요할 디테일을 버린다. **compaction은 로드하기로 한 컨텍스트의 비용을 관리하는 것이지, 로드하지 않는 것의 대체재가 아니다.**\n\nC(`**/*Session*.java` 먼저 읽고 나머지도 계속)는 축이 틀리고 얻은 이득마저 버린다 — `Glob`은 **파일명**으로 좁혀 filter·config·cache eviction hook을 놓친다. D(전부 읽되 scratchpad에 기록)는 세 오답 중 정답에 가장 가깝다 — scratchpad는 실제로 context degradation의 대응책이고 증상도 일치한다. 그러나 **원인**(대부분 무관한 4,200 파일로 세션을 채우는 것)은 그대로다.",
   "options": [
    {
     "key": "A",
     "text": "`Grep` for the concepts named in the question — `SessionExpiry`, `invalidate(`, `setMaxInactiveInterval` — then `Read` only the files that match and follow their imports outward to trace the expiry path."
    },
    {
     "key": "B",
     "text": "Keep reading every file in the order returned, calling `/compact` each time the context fills, so that the full 4,200-file sweep still runs through to completion without ever stalling on the context limit."
    },
    {
     "key": "C",
     "text": "`Glob` for `**/*Session*.java` and read those files first, then carry on reading the rest of the repository in the same session so that nothing relevant is missed by the filename filter."
    },
    {
     "key": "D",
     "text": "Keep reading every file in order, but have the agent append each finding to a scratchpad file as it goes, so the early discoveries survive the drift and can be re-read later."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "sim-developer-productivity-03",
   "kind": "exam-sim",
   "domain": "D2",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "2.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 4; §6 TS 2.4"
   ],
   "context": "**Developer Productivity Agent.** The agent uses the built-in tools and integrates with MCP servers. Your platform team ships an internal MCP server, `codegraph`, configured in the project's `.mcp.json`. Its one tool, `codegraph_find_symbol`, returns a symbol's definition site, every caller with file and line, and the transitive call depth — from a pre-built index of the monorepo.\n\nThe server connects successfully and the tool is discovered. The same server already exposes the monorepo's full module and package catalog to the agent as MCP **resources**, so the agent can see what exists in the repository without probing for it.\n\nTelemetry nonetheless shows the agent almost never calls the tool. Asked \"who calls `applyDiscount`?\", the agent instead issues thirty-plus `Grep` calls chasing wrapper modules, and misses two call sites reached through a re-export. The catalog resources changed nothing about this. The tool's description reads, in full: `\"Query the code graph.\"`",
   "question": "What is the most effective first change?",
   "explanation": "**D is correct.** Tool descriptions are the primary mechanism the model uses to select tools, and `\"Query the code graph.\"` gives it nothing to weigh against `Grep`, whose behaviour it already knows. The agent is not misconfigured — it is uninformed. Spelling out that the tool takes a symbol name, returns definition plus all callers including re-exports, and should be preferred over `Grep` for caller-chain questions is exactly the fix for an agent defaulting to a built-in over a more capable MCP tool, and it is low-effort.\n\n**A** targets a different problem, and moves in the wrong direction. Project-scoped `.mcp.json` is where **shared team tooling** belongs; `~/.claude.json` is for personal or experimental servers. The server is already reaching this agent — the symptom is selection, not availability — and loading it per developer would stop teammates from getting it at all while changing nothing about which tool the agent picks.\n\n**B** does not exist. There is no priority or ranking key for MCP tools; tools from all configured servers are discovered at connection time and are simply available simultaneously. Selection among them is driven by their descriptions, which is why **D** is the lever that actually exists.\n\n**C** is the most attractive wrong answer, because MCP **resources** are a genuine mechanism from this same area — exposing content catalogs such as documentation hierarchies or database schemas to reduce exploratory tool calls — and \"reduce exploratory calls\" sounds like a precise description of thirty `Grep` calls. The scenario has already run that experiment: the module and package catalog is exposed as resources and the behaviour did not change. Extending the same catalog down to individual symbols is more of the intervention that already failed, and it still does not answer the question asked. A catalog tells the agent what the repository *contains*; it does not tell the agent that `codegraph_find_symbol` resolves caller chains through re-exports in one call. That fact lives in the tool description, which is why **D** is the lever.",
   "ko": "**개발 생산성 에이전트.** 내부 MCP 서버 `codegraph`가 연결되고 `codegraph_find_symbol`도 discovery된다(모듈·패키지 카탈로그는 이미 MCP **resource**로 노출). 그런데 \"who calls `applyDiscount`?\"에 `Grep`을 30번 넘게 날리고 re-export 경유 호출 2곳을 놓친다. 도구 설명은 전문이 `\"Query the code graph.\"`\n\n**정답 D** — description을 확장해 입력·반환값·예시 쿼리·**`Grep` 대신 언제 쓰는지**를 명시. tool description은 모델이 도구를 고르는 **1차 메커니즘**이고, 저 한 줄은 이미 잘 아는 `Grep`과 견줄 근거를 아무것도 주지 않는다. 에이전트는 오설정된 게 아니라 **정보를 못 받은** 상태다.\n\n**가장 매력적인 오답 C**(resource 카탈로그를 심볼 단위까지 확장) — ⚠️ MCP **resource**는 같은 영역의 진짜 메커니즘(문서 계층·DB 스키마 같은 content catalog를 노출해 탐색 호출을 줄임)이고 \"탐색 호출을 줄인다\"가 `Grep` 30번의 정확한 묘사처럼 들린다. 그런데 지문이 이미 그 실험을 했다 — 카탈로그는 노출돼 있고 행동은 안 바뀌었다. 카탈로그는 repo가 **무엇을 담고 있는지** 알려줄 뿐, `codegraph_find_symbol`이 re-export를 통과해 caller chain을 한 번에 푼다는 사실은 못 알린다. 그 사실은 description에 산다.\n\nA(`.mcp.json` → `~/.claude.json`으로 이동)는 방향이 반대다 — 공유 팀 tooling은 project scope 소관이고, 증상은 availability가 아니라 **selection**이다. B(`toolPriority` 필드)는 **존재하지 않는 기능** — MCP 도구에 우선순위·랭킹 키는 없고 선택은 description이 이끈다.\n\n> **availability ≠ selection.** 안 고르면 description을 의심하라.",
   "options": [
    {
     "key": "A",
     "text": "Move the `codegraph` server configuration from the project's `.mcp.json` to each developer's user-scoped `~/.claude.json`, so the server is loaded per developer."
    },
    {
     "key": "B",
     "text": "Set a `toolPriority` field for `codegraph` in `.mcp.json` so that its tools are ranked above the built-in tools whenever the agent selects a tool."
    },
    {
     "key": "C",
     "text": "Broaden the MCP **resource** catalog to list every symbol in the monorepo as well as the modules, so the agent has even less reason to explore with `Grep`."
    },
    {
     "key": "D",
     "text": "Expand the `codegraph_find_symbol` description to state its inputs, what it returns, an example query, and when to use it instead of `Grep`."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "sim-developer-productivity-04",
   "kind": "exam-sim",
   "domain": "D3",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "3.2"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 4; §6 TS 3.2"
   ],
   "context": "**Developer Productivity Agent.** Your team automates repetitive engineering tasks with Claude Code. One of them is a `release-prep` skill in `.claude/skills/release-prep/SKILL.md`: it assembles the changelog from the fragment files under `CHANGELOG.d/`, checks that version numbers agree across the packages, and confirms the migration files are numbered in sequence. Every input it needs is a file it can read. Its `SKILL.md` places no restriction on what it may use, so it also greps and shells out to `git` whenever it judges that convenient.\n\nTwice this quarter it went past inspecting. Once it deleted a local branch it judged stale; once it renumbered a migration file it decided was out of order. Both times a developer was midway through unrelated work on that checkout. The reports it produces are good and the team wants to keep the skill shared in the repository — it just must never change anything.",
   "question": "What change most directly prevents the skill from taking destructive actions?",
   "explanation": "**A is correct.** `allowed-tools` is the frontmatter key that bounds **what a skill may do**, and this is the failure it exists for: a skill that only ever needed to read is currently free to write files and run arbitrary shell commands. Naming `Read`, `Grep`, and `Glob` removes `Write`, `Edit`, and `Bash` from the skill's reach, so branch deletion and file renumbering stop being possible rather than merely discouraged. The skill keeps producing its report, stays in `.claude/skills/`, and stays version-controlled for the team.\n\n**B** is the most attractive wrong answer, because `context: fork` is the neighbouring frontmatter key on the very same `SKILL.md` and it is the right answer to the *other* common skill problem — a skill whose verbose working output crowds the main session. It bounds **context**, not **capability**. A forked subagent still holds the same tools and still acts on the same working tree, so the branch would have been deleted exactly as before; the only difference is that the main conversation would not have seen it happen. **`context: fork` isolates what the skill says; `allowed-tools` limits what it can do.**\n\n**C** is the right intent applied through the wrong mechanism. An instruction in the skill body is a prompt, and prompt compliance is probabilistic — it will hold on most invocations and fail on some, which is precisely the position the team is already in after two incidents. When the requirement is that a class of action be impossible rather than unlikely, it has to be enforced in configuration, not requested in prose.\n\n**D** names a key that does not exist. `SKILL.md` frontmatter carries `context`, `allowed-tools`, and `argument-hint`; there is no `permissions` key and no global read-only mode scoped to a skill run. The capability restriction has to be expressed as the tool list in **A**.",
   "ko": "**개발 생산성 에이전트.** `release-prep` 스킬이 검사만 하면 되는데 `SKILL.md`에 제한이 없어 `git`까지 셸로 부른다. 이번 분기에 두 번 선을 넘었다 — 낡았다고 판단한 로컬 브랜치 삭제, 순서가 틀렸다고 판단한 migration 파일 번호 변경. 리포트는 좋으니 스킬은 공유 상태로 유지하되 **아무것도 바꾸면 안 된다**.\n\n**정답 A** — frontmatter에 `allowed-tools`로 읽기 계열 도구만(`Read`, `Grep`, `Glob`) 명시. `allowed-tools`는 **스킬이 무엇을 할 수 있나**를 묶는 키이고 이게 그 실패다. `Write`·`Edit`·`Bash`가 손에서 사라지면 브랜치 삭제와 파일 번호 변경이 *말리는 일*이 아니라 *불가능한 일*이 된다. 스킬은 `.claude/skills/`에 남아 팀 공유·버전관리 유지.\n\n**가장 매력적인 오답 B**(`context: fork`) — ⚠️ **같은 `SKILL.md`의 이웃 frontmatter 키**이고, 스킬의 *다른* 흔한 문제(장황한 작업 출력이 메인 세션을 채움)의 정답이라 끌린다. 그건 **context**를 묶지 **capability**를 묶지 않는다. fork된 subagent도 같은 도구를 쥐고 같은 워킹 트리에 작용하므로 브랜치는 똑같이 삭제됐을 것이다 — 차이는 메인 대화가 그 장면을 못 봤다는 것뿐. **`context: fork`는 스킬이 말하는 것을 격리하고, `allowed-tools`는 할 수 있는 것을 제한한다.**\n\nC(본문에 \"검사만 하라\" 문단 추가)는 의도는 맞고 메커니즘이 틀렸다 — 본문 지시는 프롬프트이고 준수는 확률적이다(이미 두 번 실패한 자리). D(`permissions: read-only` 키)는 **존재하지 않는 기능** — `SKILL.md` frontmatter는 `context`, `allowed-tools`, `argument-hint`다.",
   "options": [
    {
     "key": "A",
     "text": "Add an `allowed-tools` list to the skill's `SKILL.md` frontmatter naming only the read-oriented tools the report needs, so the skill cannot invoke `Write`, `Edit`, or `Bash` at all."
    },
    {
     "key": "B",
     "text": "Add `context: fork` to the skill's `SKILL.md` frontmatter so the skill runs in an isolated subagent context and its work is kept separate from the main conversation."
    },
    {
     "key": "C",
     "text": "Add a paragraph to the body of `SKILL.md` instructing the skill to inspect only, and on no account to delete branches, rewrite files, or run any shell command that changes repository state."
    },
    {
     "key": "D",
     "text": "Add a `permissions: read-only` key to the skill's `SKILL.md` frontmatter so Claude Code refuses every state-changing operation for the duration of the skill's run."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "sim-developer-productivity-05",
   "kind": "exam-sim",
   "domain": "D1",
   "format": "choice",
   "scenario": "developer-productivity",
   "linked_ts": [
    "1.3",
    "2.3",
    "5.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 4; §6 TS 1.3, TS 2.3, and TS 5.4"
   ],
   "context": "**Developer Productivity Agent.** An exploration agent maps unfamiliar repositories for engineers joining a project. On a 6,000-file legacy Java monolith it runs as a coordinator that spawns subagents for specific questions.\n\nThe coordinator holds 19 tools: the built-ins plus everything from three MCP servers (`jira`, `confluence`, `codegraph`). Two failures show up in every run longer than about forty minutes. Asked to locate a function definition, the coordinator sometimes calls the Jira issue-search tool instead of `Grep` or `codegraph_find_symbol`. And the subagent it spawns with the prompt \"investigate the auth module\" returns a report that re-derives the module boundaries the coordinator had already established, contradicts the class names found in the previous phase, and describes \"the usual Spring Security setup\" rather than the classes actually in this repository.",
   "question": "Which **two** changes most directly make this agent reliable on a repository of this size? *(Select 2)*",
   "explanation": "**A and D are correct.**\n\n**A** addresses the misrouting. Tool selection reliability degrades as the tool count grows — 19 tools instead of the four or five a role needs is exactly the described regime — and agents holding tools outside their specialization tend to misuse them, which is what a coordinator reaching for Jira search to find a function definition looks like. Scoping each agent to its role removes the decision complexity rather than asking the model to cope with it.\n\n**D** addresses the subagent report on both counts. Subagents run with **isolated context** — they do not inherit the coordinator's conversation history — so \"investigate the auth module\" is genuinely all that subagent knows; passing prior findings directly in the prompt is the only way it can build on them instead of starting over. The scratchpad half counters context degradation: an agent that records key findings and refers back to them stops drifting toward \"the usual Spring Security setup\" and stays on the classes it actually found.\n\n**B** is the most attractive wrong answer, because both symptoms appear \"in every run longer than about forty minutes\" and a duration-shaped symptom invites a duration-shaped fix. But neither failure is truncation — nothing here is stopping early. A higher iteration cap buys more turns of a coordinator that still picks the wrong tool and still briefs its subagents blind, and pays for them.\n\n**C** works against the actual mechanism. Resumption is the right call when prior context is mostly still valid; the problem here is that a single long session accumulates verbose discovery output until answers degrade. Starting fresh with an injected structured summary is the more reliable move, and it is what **D** enables.\n\n**E** is **A** run backwards. It maximises the tool count on every agent in the system, spreading the coordinator's selection problem to each subagent as well.",
   "ko": "**개발 생산성 에이전트.** 6,000 파일 Java 모놀리스 탐색. coordinator가 도구 **19개**(빌트인 + `jira`·`confluence`·`codegraph`)를 쥐고 있다. 함수 정의를 찾으라는데 Jira 이슈 검색을 부르고, \"investigate the auth module\"로 띄운 subagent는 이미 확정된 모듈 경계를 다시 도출하고 이전 페이즈의 클래스명과 모순되며 \"the usual Spring Security setup\"을 설명한다.\n\n**정답 A와 D.**\n\n**A** — coordinator를 그 역할에 필요한 작은 도구 집합으로 제한하고, 특화 MCP 도구는 그것을 쓰는 subagent로 옮긴다. 도구 수가 늘면 selection 신뢰도가 떨어지고(4~5개가 필요한 자리에 19개), 전문화 밖 도구를 쥔 에이전트는 오용한다 — 함수 정의 찾겠다고 Jira를 부르는 게 그 모습이다.\n\n**D** — 페이즈별 key findings를 scratchpad file에 영속화하고 **모든 subagent 프롬프트에 명시적으로 포함**. subagent는 isolated context로 돌아 coordinator 히스토리를 상속하지 않으므로 \"investigate the auth module\"이 그 subagent가 아는 전부다. scratchpad 쪽은 context degradation을 막아 \"the usual Spring Security setup\"으로의 표류를 멈춘다.\n\n**가장 매력적인 오답 B**(max iteration 상향) — 두 증상이 모두 \"40분 넘는 run마다\" 나타나서 **duration 모양의 증상이 duration 모양의 처방을 부른다**. 그러나 어느 쪽도 truncation이 아니다 — 일찍 끊기는 건 없다. cap을 올리면 여전히 틀린 도구를 고르고 여전히 눈 감은 subagent를 브리핑하는 turn을 더 사는 것뿐.\n\nC(`--resume`으로 하나의 긴 세션 유지)는 메커니즘에 역행 — resume은 이전 컨텍스트가 대체로 유효할 때의 수이고, 여기 문제는 긴 세션이 장황한 discovery를 쌓는 것이다. E(모든 subagent에 19개 전부)는 **A를 거꾸로 돌린 것**.",
   "options": [
    {
     "key": "A",
     "text": "Restrict the coordinator to the small tool set its coordinating role needs, and move the specialized MCP tools to the subagents whose role uses them."
    },
    {
     "key": "B",
     "text": "Raise the coordinator's maximum iteration limit so that long explorations run to completion instead of being cut off before the subagents have reported back."
    },
    {
     "key": "C",
     "text": "Run the entire exploration as one long-lived session, using `--resume` to continue it across days so nothing is lost between work sessions."
    },
    {
     "key": "D",
     "text": "Have each phase persist its key findings to a scratchpad file, and include those findings explicitly in every subagent prompt."
    },
    {
     "key": "E",
     "text": "Give every subagent the full 19-tool set so that none of them is ever blocked mid-investigation and forced to hand control back to the coordinator."
    }
   ],
   "answer": [
    "A",
    "D"
   ],
   "multi": true
  },
  {
   "id": "sim-multi-agent-research-01",
   "kind": "exam-sim",
   "domain": "D1",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "1.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 3; §6 TS 1.3"
   ],
   "context": "**Multi-Agent Research System.** You are building a research system with the Claude Agent SDK. A coordinator agent delegates to specialized subagents — one searches the web, one analyzes documents, one synthesizes findings, one generates reports — and the system produces comprehensive, cited reports.\n\nOn a run about grid-scale battery storage, the search subagent returns 40 sources and the coordinator's own transcript shows their contents. The coordinator then spawns the synthesis subagent with the prompt: *\"Synthesize the search findings above into a cited section on cost trends.\"* The synthesis subagent returns fluent prose about battery costs that cites none of the 40 URLs, includes two figures that appear nowhere in the retrieved sources, and opens with \"based on generally reported trends.\"",
   "question": "What is the most likely root cause?",
   "explanation": "**C is correct.** Subagents run with isolated context — they do **not** automatically inherit the coordinator's conversation history. The word \"above\" points at a transcript the subagent cannot see. Given a topic and no evidence, the model does the only thing available to it and writes from what it already knows, which is exactly the observed output: fluent, uncited, and containing figures no source supplied. The fix is to include the complete findings *in the subagent's prompt*, in a structured form that separates content from metadata (claim, excerpt, source URL, publication date) so attribution survives the handoff.\n\n**A** names a real and necessary precondition — `\"Task\"` genuinely is the tool that spawns subagents, and it genuinely must be in `allowedTools` — but the evidence rules it out. Had the spawn been rejected there would be no synthesis output to inspect at all; instead a subagent ran and returned a fluent draft, so the precondition is plainly already satisfied.\n\n**B** is the \"fixes a different problem\" distractor, and it inverts the technique. Emitting multiple `Task` calls in one response is how you get **parallelism**, and that is right for independent work such as several search subtopics. Synthesis *depends* on search results, so overlapping them would not help — and turn ordering is not the defect here, since the coordinator demonstrably held the 40 sources before it delegated.\n\n**D** is the most attractive wrong answer because it describes precisely the behaviour you wish existed, and it explains the symptom perfectly: an agent with only the topic to work from is exactly what produced this output. It frames the fix as a one-line configuration change. **There is no inheritance switch to turn on.** `AgentDefinition` configures description, system prompt, and tool restrictions; subagents do not share memory across invocations, so context passing is something you must do explicitly in the prompt, every time.",
   "ko": "**멀티에이전트 리서치.** search subagent가 40개 소스를 반환하고 coordinator 트랜스크립트에 내용이 남았다. coordinator가 *\"Synthesize the search findings above…\"*로 synthesis subagent를 띄우자, 유창하지만 40개 URL을 하나도 인용 않고 소스에 없는 수치 2개를 담은 산문이 \"based on generally reported trends\"로 시작한다.\n\n**정답 C** — subagent는 **isolated context**로 돌며 coordinator의 대화 히스토리를 자동 상속하지 **않는다**. \"above\"가 가리키는 트랜스크립트를 subagent는 볼 수 없다. 주제만 받고 증거가 없으면 모델은 parametric knowledge로 쓸 수밖에 없고, 그게 관측된 출력 그대로다. 수정은 findings 전체를 **subagent의 프롬프트 안에**, claim·excerpt·source URL·publication date로 content와 metadata를 분리한 구조로 넣는 것.\n\n**가장 매력적인 오답 D**(`AgentDefinition`에 context inheritance 미활성화) — ⚠️ **존재하지 않는 기능**인데, 있었으면 하는 동작을 정확히 묘사하고 증상까지 완벽히 설명하며 한 줄 설정 변경으로 포장한다. **켤 상속 스위치는 없다.** `AgentDefinition`은 description·system prompt·도구 제한을 설정할 뿐이고, context 전달은 매번 프롬프트에서 명시적으로 해야 한다.\n\nA(`allowedTools`에 `\"Task\"` 없음)는 진짜 전제조건을 짚지만 증거가 배제한다 — spawn이 거부됐다면 검사할 synthesis 출력 자체가 없다. B(`Task` 호출을 한 응답에 모아 보내기)는 **다른 문제를 고침** — 그건 **parallelism** 기법이고, synthesis는 search 결과에 *의존*하므로 겹쳐봐야 소용없다.",
   "options": [
    {
     "key": "A",
     "text": "The coordinator's `allowedTools` list does not include `\"Task\"`, which is the tool that spawns subagents, so the delegation was rejected and never reached the synthesis subagent."
    },
    {
     "key": "B",
     "text": "The coordinator emits its `Task` calls one per turn rather than emitting them together in a single response, so the subagents never overlap and synthesis is dispatched before the search results are complete."
    },
    {
     "key": "C",
     "text": "The prompt refers to findings that exist only in the coordinator's own conversation history; the synthesis subagent received no findings and answered from parametric knowledge."
    },
    {
     "key": "D",
     "text": "The synthesis subagent's `AgentDefinition` does not have context inheritance enabled, so it never receives the coordinator's session memory and has only the topic to work from."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "sim-multi-agent-research-02",
   "kind": "exam-sim",
   "domain": "D2",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "2.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 3; §6 TS 2.3"
   ],
   "context": "**Multi-Agent Research System.** A coordinator delegates to a web search subagent, a document analysis subagent, a synthesis subagent, and a report generator. All inter-agent communication routes through the coordinator.\n\nWhile merging findings, the synthesis subagent repeatedly needs to confirm a small detail before it can write a sentence — the publication date attached to a finding, whether an excerpt said \"MW\" or \"MWh\", the exact figure behind a rounded claim. Today it must hand control back to the coordinator, which re-invokes an appropriate subagent and then re-invokes synthesis with the answer. Instrumentation over a week shows roughly nine in ten of these checks resolve against material the system has **already retrieved**; the remaining one in ten needs a source that was never gathered. The round-trips dominate end-to-end latency.",
   "question": "What is the most effective way to reduce this overhead while preserving system reliability?",
   "explanation": "**D is correct.** This is scoped cross-role tool access: the synthesis agent gets *only* what its high-frequency need requires, sized to the common case, and the existing coordination pattern still handles the cases that genuinely need research. One read-only tool over material the system already holds cannot cause the synthesis agent to start doing web research, so separation of concerns survives the optimization.\n\n**A** is the over-provisioning distractor and it is attractive because it removes 100% of the round-trips rather than 90%. It buys that last 10% by handing a specialist a toolset outside its specialization. Two costs follow: agents with off-role tools tend to misuse them — a synthesis agent that *can* search will search instead of synthesizing — and every added tool degrades selection reliability by widening the decision space, which is why a focused set of four or five beats a pile of eighteen.\n\n**B** is speculative caching. Anticipating units, dates, and figures still cannot reliably predict which detail synthesis will want, so it either misses the check that mattered or pays for context nobody reads — and it inflates every finding's payload, spending the synthesis agent's context budget on unread material to avoid a lookup that costs one call.\n\n**C** fixes a different problem at the wrong time. One sweep over the finished draft is auditing, not synthesis support: by then a claim the agent could not confirm has already been written as though it were settled, and correcting it means rewriting the section rather than never asserting it. The round-trips it removes are also the ones that were producing correct sentences.\n\n> The rule of proportion: **scope the tool to the common case, keep the escalation path for the rest.** Neither \"give it everything\" nor \"give it nothing\" is the answer.",
   "ko": "**멀티에이전트 리서치.** synthesis subagent가 문장 하나 쓰려고 사소한 확인(publication date, \"MW\"인지 \"MWh\"인지, 반올림 뒤 원수치)을 할 때마다 coordinator로 제어를 넘겨 왕복한다. 계측 결과 **10건 중 9건은 이미 수집된 자료로 해결**되고 1건만 새 소스가 필요하다. 왕복이 지연시간을 지배한다.\n\n**정답 D** — 이미 수집된 corpus에만 스코프된 **좁은 read-only 도구 하나** `get_source_record(source_id)`(저장된 excerpt·figure·publication date 반환)를 synthesis에 주고, 새 소스 검증은 coordinator 경로에 남긴다. 고빈도 필요에 정확히 맞춘 cross-role tool이고, 시스템이 이미 가진 자료에 대한 읽기 전용 도구 하나로는 synthesis가 웹 리서치를 시작할 수 없어 separation of concerns가 살아남는다.\n\n**가장 매력적인 오답 A**(full web search toolset 부여) — 90%가 아니라 **100%의 왕복을 없애서** 끌린다. 마지막 10%의 값으로 전문화 밖의 도구를 특화 에이전트에 쥐여준다. 비용 둘: off-role 도구를 가진 에이전트는 오용하고(검색할 수 있는 synthesis는 synthesize 대신 검색한다), 도구가 늘수록 결정 공간이 넓어져 선택 신뢰도가 떨어진다 — 4~5개가 18개를 이기는 이유.\n\nB(모든 finding에 넉넉한 주변 컨텍스트 첨부)는 speculative caching — 어떤 디테일이 필요할지 예측 못 하니 놓치거나 안 읽힐 컨텍스트를 지불한다. C(초안 완성 후 coordinator가 일괄 검증)는 **시점이 틀림** — 그건 synthesis 지원이 아니라 auditing이고, 확인 못 한 주장이 이미 확정처럼 쓰인 뒤다.\n\n> 비례의 원칙: **common case에 도구를 스코프하고, 나머지는 escalation 경로로.**",
   "options": [
    {
     "key": "A",
     "text": "Give the synthesis subagent the full web search toolset so that it resolves every verification need itself — including the one in ten that needs a source nobody has gathered yet — without ever handing control back to the coordinator."
    },
    {
     "key": "B",
     "text": "Have the document analysis subagent attach a large block of surrounding context to every finding it emits, anticipating the units, dates, and exact figures that synthesis is most likely to want to check before it writes a sentence."
    },
    {
     "key": "C",
     "text": "Keep the current routing, but move verification out of synthesis entirely: let the coordinator run a single verification pass over the finished draft, checking each claim in it against the retrieved corpus in a single sweep at the end of the run."
    },
    {
     "key": "D",
     "text": "Give the synthesis subagent one narrow, read-only tool scoped to the already-retrieved corpus — `get_source_record(source_id)`, returning the stored excerpt, figure, and publication date — and keep new-source verifications on the coordinator path."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "sim-multi-agent-research-03",
   "kind": "exam-sim",
   "domain": "D5",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "5.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 3; §6 TS 5.3"
   ],
   "context": "**Multi-Agent Research System.** A coordinator delegates to specialized subagents and aggregates their results into a cited report.\n\nOn a run about hospital procurement, the coordinator hands the document analysis subagent twelve PDFs. Nine parse and analyze cleanly. Two are access-restricted and return HTTP 403. One times out mid-download on the first attempt. The subagent currently returns a single value to the coordinator:\n\n```json\n{ \"status\": \"analysis_unavailable\" }\n```\n\nThe coordinator, with nothing else to go on, re-delegates the entire twelve-document batch from scratch — re-paying for the nine that already succeeded — and when the second attempt returns the same status it drops document analysis from the run. The final report is built from web search alone and reads as though no document evidence was ever sought.",
   "question": "Which error propagation design best enables intelligent coordinator recovery?",
   "explanation": "**B is correct.** The coordinator can only recover as intelligently as its inputs allow, and recovery here means three different decisions for three different failures: keep the nine, stop retrying the two 403s and look for public versions, and accept the timed-out document once a local retry resolves it. That requires failure *type*, what was attempted, partial results, and alternatives — not a verdict. Note the division of labour: **transient failures are recovered locally inside the subagent; only what cannot be resolved locally is propagated upward**, and it is propagated with everything the coordinator needs to act.\n\n**A** is the terminate-on-single-failure anti-pattern. Nine of twelve documents analyzed plus a full web search pass is a usable evidence base; halting on the first failure trades a gap you could disclose for no report at all, and a 403 on two PDFs is not a reason to abandon the other ten.\n\n**C** is the most attractive wrong answer, because retrying with backoff is genuinely good practice and the option looks like it is *adding* robustness. It fixes the wrong half. Backoff helps exactly one of the three failures — the timeout — and the return value is still a generic status that hides everything the coordinator needs. Worse, the two 403s will now consume the full retry schedule before failing anyway, since a permission error will never become a success. **A retry policy is not a substitute for telling the coordinator what happened.**\n\n**D** is silent suppression: it reports failure as success, and \"proceed with what is available\" is how it justifies itself. The three missing documents become invisible, the coordinator never gets the chance to recover them, and the report's coverage gap is never disclosed to anyone downstream. An error the system hides from itself cannot be handled.",
   "ko": "**멀티에이전트 리서치.** PDF 12개 중 9개 성공, 2개 HTTP 403, 1개 최초 시도에 타임아웃. subagent는 `{ \"status\": \"analysis_unavailable\" }` 하나만 반환. coordinator는 12개 전체를 처음부터 재위임(성공한 9개 값을 다시 지불)하고, 같은 상태가 오자 document analysis를 아예 뺀다.\n\n**정답 B** — structured error context: 완료된 9개를 **partial results**로, 문서별 실패 유형, 시도한 것, 가능한 대안 — 단, **transient 타임아웃은 subagent가 local recovery로 처리한 뒤에**. coordinator는 입력이 허용하는 만큼만 똑똑하게 복구한다. 여기서 복구는 세 실패에 대한 세 결정이다: 9개 유지 / 403 재시도 중단하고 공개본 탐색 / 타임아웃은 로컬 재시도로 해결. 판정(verdict)이 아니라 재료가 필요하다.\n\n**가장 매력적인 오답 C**(같은 상태를 유지하되 내부에서 exponential backoff 소진) — backoff는 진짜 좋은 practice라 **robustness를 더하는 것처럼 보인다**. 틀린 절반을 고친다. backoff는 세 실패 중 타임아웃 하나에만 듣고 반환값은 여전히 모든 걸 감추는 generic status다. 게다가 403 두 개는 절대 성공으로 바뀌지 않으면서 전체 재시도 일정을 태운다. **retry policy는 coordinator에게 무슨 일이 있었는지 알려주는 것의 대체재가 아니다.**\n\nA(첫 실패에 전체 워크플로우 종료)는 terminate-on-single-failure 안티패턴 — 12개 중 9개 + 웹검색이면 쓸 만한 근거다. D(성공 9개만 성공으로 표시하고 3개 누락)는 **silent suppression** — 실패를 성공으로 보고하며, 시스템이 자신에게 숨긴 에러는 처리될 수 없다.\n\n> 분업: **transient는 로컬에서, 못 푼 것만 구조화해서 위로.**",
   "options": [
    {
     "key": "A",
     "text": "Terminate the whole research workflow as soon as any subagent reports a failure, so that no report ever ships on top of an evidence base the system already knows to be incomplete."
    },
    {
     "key": "B",
     "text": "Return structured error context: the nine completed analyses as partial results, a per-document failure type, what was attempted, and available alternatives — after the subagent has locally retried the transient timeout."
    },
    {
     "key": "C",
     "text": "Keep the single `analysis_unavailable` status, but have the subagent exhaust an exponential-backoff retry schedule internally — several spaced attempts on each of the twelve documents — before it returns that status to the coordinator."
    },
    {
     "key": "D",
     "text": "Have the subagent return only the nine successful analyses, marked as a successful completion, and omit the three that failed so the coordinator proceeds with the evidence that is actually available."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "sim-multi-agent-research-04",
   "kind": "exam-sim",
   "domain": "D5",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "5.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 3; §6 TS 5.6"
   ],
   "context": "**Multi-Agent Research System.** Search and document analysis subagents feed a synthesis subagent, which hands a merged draft to the report generator. Reports must be comprehensive and cited.\n\nA report on rural broadband adoption comes back with two defects. First, the subagents summarize their findings as prose paragraphs before handing them over, and the finished report carries a single sources list at the end — no individual claim can be traced to the document it came from. Second, two credible sources disagree: an industry association puts household coverage at 78%, a national statistics office at 71%. The report prints 78% as settled fact with no mention of the other figure. On inspection, the association's number comes from a 2025 survey and the statistics office's from a 2023 census release — a temporal difference, not a contradiction, and nothing in the pipeline recorded either date.",
   "question": "What change most directly addresses both defects?",
   "explanation": "**A is correct.** Both defects have the same origin: attribution is destroyed at the summarization step, where findings are compressed into prose without preserving which source said what. Structured claim-source mappings separate content from metadata so provenance survives every downstream merge, and carrying the publication date makes the 78/71 case legible as **two measurements taken two years apart** rather than a dispute someone has to adjudicate. Conflicts are then annotated with attribution — both figures, both sources, both dates — which is the honest rendering when credible sources differ.\n\n**B** is the most attractive wrong answer because \"prefer the authoritative source\" sounds like editorial judgment, it does produce a cited number, and \"one defensible figure\" is what a reader appears to want. It is arbitrary selection wearing a rule: it silently discards a credible data point, it hides the disagreement, and in this exact case it would have adjudicated a question that was never a disagreement at all — a 2025 survey and a 2023 census measuring two different years. **Annotate conflicts; do not resolve them by fiat.**\n\n**C** reattaches citations after the fact instead of preserving the ones that existed. A post-hoc search finds a source that *supports* the sentence, not the source the claim actually came from — every assertion ends up carrying a reference, and some of those references are plausible-looking and simply wrong, which is worse than a missing citation. It also leaves the 71% figure unrecovered, since that number never reached the draft.\n\n**D** trades one loss for another. Well-supported findings get deleted because the mapping was dropped upstream, so the sources list accounts for a shorter report rather than a better-attributed one, and not a single lost citation is restored. The mappings need to be preserved where they are lost, not compensated for at the end.",
   "ko": "**멀티에이전트 리서치.** 결함 둘. subagent들이 findings를 산문 문단으로 요약해 넘겨 개별 주장을 출처로 추적 불가(끝에 소스 목록 하나뿐). 그리고 78% vs 71% 상충을 78%만 확정 사실로 인쇄 — 실은 2025년 조사와 2023년 센서스로 **temporal difference**인데 파이프라인이 날짜를 기록하지 않았다.\n\n**정답 A** — 모든 subagent가 structured **claim-source mapping**(claim, 근거 excerpt, source URL/문서명, publication date)을 내고 synthesis가 merge 내내 보존하며, 상충 값은 **고르지 말고 attribution과 함께 주석**. 두 결함의 기원이 같다 — 요약 단계에서 attribution이 파괴된다. publication date를 실으면 78/71이 **2년 간격의 두 측정**으로 읽힌다.\n\n**가장 매력적인 오답 B**(더 authoritative한 소스를 선호해 하나만 인용) — ⚠️ 편집 판단처럼 들리고, 인용된 숫자가 나오고, \"방어 가능한 한 개\"가 독자가 원하는 것처럼 보인다. 실은 **규칙의 옷을 입은 임의 선택**이다. 신뢰할 만한 데이터 포인트를 조용히 버리고 이견을 숨기며, 이 케이스에선 애초에 이견이 아닌 것을 재정한다. **상충은 주석하라, 재정하지 마라.**\n\nC(초안 후 citation pass로 재검색)는 있던 인용을 보존하는 대신 사후에 다시 붙인다 — 주장을 *지지하는* 소스를 찾을 뿐 주장이 실제로 나온 소스가 아니며, 그럴듯하지만 틀린 참조는 인용 누락보다 나쁘다. 71%는 초안에 도달한 적 없어 여전히 미복구. D(출처 못 대는 주장 삭제)는 손실을 다른 손실로 맞바꾼다 — 상류에서 mapping이 버려진 탓에 근거 충분한 findings가 지워진다.\n\n> 잃어버린 곳에서 보존하라. **끝에서 보상하지 마라.**",
   "options": [
    {
     "key": "A",
     "text": "Require every subagent to emit structured claim-source mappings — claim, supporting excerpt, source URL or document name, and publication date — which synthesis preserves through the merge, annotating conflicting values with their attribution instead of choosing between them."
    },
    {
     "key": "B",
     "text": "Instruct the synthesis subagent to resolve conflicting statistics by preferring the more authoritative source — a national statistics office over an industry association — and to cite that source for the single figure it keeps, so the report presents one defensible number."
    },
    {
     "key": "C",
     "text": "Add a citation pass after the report is drafted that re-searches each claim and attaches a supporting URL to any sentence that lacks one, so that every assertion in the delivered report carries a reference a reader can follow."
    },
    {
     "key": "D",
     "text": "Instruct the synthesis subagent to drop any claim it cannot attribute to a specific source, so that everything remaining in the report is verifiable and the sources list at the end accounts for every sentence above it."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "sim-multi-agent-research-05",
   "kind": "exam-sim",
   "domain": "D5",
   "format": "choice",
   "scenario": "multi-agent-research",
   "linked_ts": [
    "5.3",
    "5.6"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 3; §6 TS 5.3 and TS 5.6"
   ],
   "context": "**Multi-Agent Research System.** The coordinator decomposes a topic into subtopics, delegates them to search and document analysis subagents, and passes the aggregate to synthesis and then to the report generator.\n\nOn a nine-subtopic run, three subtopics yielded nothing usable: one regional regulator's site was unreachable for the whole run, one dataset sat behind a paywall, and one returned only a single blog post. Subagents signal completion with a pass/fail flag, so the coordinator saw six passes and three failures and nothing more. The delivered report reads with uniform confidence throughout — the section resting on that lone blog post is written in the same register as the section backed by eleven sources — and a reader cannot tell that a third of the planned scope was never covered. A stakeholder made a decision on the thin section.",
   "question": "Which **two** changes most directly enable a report that is honest about its own coverage? *(Select 2)*",
   "explanation": "**B and D are correct.**\n\n**B** supplies the information. A pass/fail flag tells the coordinator that something did not work; it cannot tell it *what remains unknown*. Structured error context — the subtopic, the attempt, the failure type, and whatever partial results exist — is what turns three failures into three describable gaps, and it is the only option that gets the single-blog-post case into the record at all, since that subagent technically passed.\n\n**D** puts the information in the artifact. Coverage annotations attached per topic let the report state which findings are well-supported and which areas are thin or unresearched because sources were unavailable — the difference the stakeholder needed and could not see.\n\n**A** is worth doing and does not answer the question. Better retries reduce how often gaps occur; they do nothing about disclosing the ones that remain, and two of these three gaps — a paywall and a genuinely thin evidence base — are not retryable in principle.\n\n**C** is the most attractive wrong answer, because it is the cheapest thing that *looks* like honesty. A disclaimer that is identical on every report carries no information: it does not say which third was missing, and a reader who sees the same sentence on every deliverable stops reading it. **Blanket hedging is not calibration** — it makes the well-supported sections look as uncertain as the thin one, which is the same failure as before with the sign flipped.\n\n**E** is the actively harmful option. Deleting the uncovered subtopics makes the gaps invisible rather than disclosed, and it produces the most dangerous artifact of the five: a report that appears complete precisely because the evidence of its incompleteness was removed.",
   "ko": "**멀티에이전트 리서치.** 9개 subtopic 중 3개가 무수확(규제기관 사이트 불통 / 페이월 / 블로그 글 1건뿐). subagent는 pass/fail 플래그만 보내 coordinator는 6 pass, 3 fail만 봤다. 최종 보고서는 전 구간 동일한 확신 톤 — 블로그 1건짜리 절과 11개 소스짜리 절이 같은 어조이고, 이해관계자가 얇은 절을 보고 결정했다.\n\n**정답 B와 D.**\n\n**B** — 정보를 만든다. pass/fail은 뭔가 안 됐다만 알릴 뿐 *무엇이 미지로 남았는지* 못 알린다. structured error context(어느 subtopic·무엇을 시도·무엇이 왜 실패·partial results)가 3개의 실패를 3개의 서술 가능한 gap으로 바꾼다. 그리고 블로그 1건 케이스를 기록에 넣는 **유일한** 선택지다 — 그 subagent는 기술적으로 pass였으니까.\n\n**D** — 정보를 산출물에 넣는다. per-topic **coverage annotation**이 근거 충분한 findings와 소스 부재로 비어 있는 영역을 구분해준다. 이해관계자가 필요했지만 볼 수 없었던 바로 그 차이.\n\n**가장 매력적인 오답 C**(모든 보고서에 상시 disclaimer) — 정직해 *보이는* 가장 싼 수단이라 끌린다. 매 보고서에 동일한 문장은 정보량이 0이다 — 어느 3분의 1이 비었는지 말하지 않고, 매번 같은 문장을 본 독자는 읽기를 멈춘다. ⚠️ **blanket hedging은 캘리브레이션이 아니다** — 잘 뒷받침된 절까지 얇아 보이게 만드는, 부호만 뒤집힌 같은 실패다.\n\nA(retry 예산↑ + backoff)는 할 만하지만 질문에 답하지 않는다 — gap 발생 빈도를 줄일 뿐 남은 gap의 공개와 무관하고, 셋 중 둘은 원리상 재시도 대상이 아니다. E(무수확 subtopic 생략)는 능동적으로 해롭다 — 불완전성의 증거를 지웠기 때문에 완전해 보이는 보고서가 나온다.",
   "options": [
    {
     "key": "A",
     "text": "Raise the retry budget and add exponential backoff for the search subagent, so that unreachable sources such as the regulator's site are less likely to leave gaps in the first place."
    },
    {
     "key": "B",
     "text": "Have subagents return partial results together with structured error context — which subtopic, what was attempted, what failed and why — instead of a pass/fail signal."
    },
    {
     "key": "C",
     "text": "Have the report generator append a standing disclaimer to every report, stating that coverage may be incomplete and that findings should be independently verified before use."
    },
    {
     "key": "D",
     "text": "Structure the synthesis output with per-topic coverage annotations that distinguish well-supported findings from topic areas with gaps due to unavailable sources."
    },
    {
     "key": "E",
     "text": "Omit any subtopic that produced no usable findings, so that every section which does appear in the delivered report is fully supported by the evidence gathered."
    }
   ],
   "answer": [
    "B",
    "D"
   ],
   "multi": true
  },
  {
   "id": "sim-structured-extraction-01",
   "kind": "exam-sim",
   "domain": "D4",
   "format": "choice",
   "scenario": "structured-extraction",
   "linked_ts": [
    "4.3",
    "4.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 6; §6 TS 4.3"
   ],
   "context": "**Structured Data Extraction.** You are building a system that extracts information from unstructured documents with Claude, validates the output against JSON schemas, maintains high accuracy, handles edge cases gracefully, and feeds downstream systems.\n\nInvoices are extracted through a `record_invoice` tool whose input schema declares `vendor`, `invoice_date`, `line_items[]`, `tax`, and `total_amount`. Since the move to tool use there has not been a single malformed-JSON failure in six weeks. The ledger still rejects about 3% of records: the line items do not add up to `total_amount`, and on invoices carrying two addresses the ship-to address sometimes lands in `bill_to`.",
   "question": "What should you change?",
   "explanation": "**B is correct.** `tool_use` with a JSON schema guarantees the *shape* of the output — that is why the malformed JSON disappeared — but shape guarantees say nothing about meaning. A record where the line items sum to $4,180 and `total_amount` reads $4,810 is perfectly schema-valid. The fix is to design the extraction so it checks itself: capture the document's claim and the model's own arithmetic as separate fields, and let a `conflict_detected` boolean surface the disagreement for a human instead of letting it reach the ledger. The same pattern handles the addresses once both are extracted as distinct, explicitly described fields.\n\n**A** is the most attractive wrong answer because it applies the right instinct — make the schema do the work — one step past what a schema can express. JSON Schema constrains the types, presence, and enumerated values of individual fields; it has no way to state \"these numbers must be consistent with that number,\" so an arithmetic rule written into a field description is documentation the validator cannot enforce. Making everything `required` also makes things worse on invoices where a value is genuinely absent. **Strict schemas eliminate syntax errors, not semantic ones.**\n\n**C** is the \"valid but heavier than needed\" option. It doubles cost and latency to detect disagreement only, and rephrasing the prompt does not make the two runs independent: two runs that make the same misreading of an ambiguous invoice agree with each other, while two that differ tell you nothing about which one is right. Option **B** extracts a stronger signal from a single call.\n\n**D** fixes a different problem. `tool_choice: \"any\"` guarantees that some extraction tool is called — genuinely useful when the document type is unknown and several schemas exist — but there have been no missing tool calls here, and a guaranteed schema-shaped record is exactly what the pipeline already produces. It changes nothing about what the fields contain.",
   "ko": "**구조화 추출.** `record_invoice` 도구의 input schema로 옮긴 뒤 6주간 malformed JSON 0건. 그런데 ledger는 여전히 3%를 반려한다 — `line_items`가 `total_amount`와 안 맞고, 주소가 둘인 인보이스에서 ship-to가 `bill_to`에 들어간다.\n\n**정답 B** — `stated_total`(인보이스에 인쇄된 값)과 `calculated_total`(추출된 line item 합)을 **따로** 뽑고 `conflict_detected` boolean을 더해, 불일치는 ledger가 아니라 review로 라우팅. `tool_use` + JSON schema는 출력의 **shape**을 보장하고(그래서 malformed가 사라졌다) shape 보장은 **의미**에 대해 아무 말도 안 한다 — 합이 $4,180인데 total이 $4,810이어도 schema-valid다. 주소도 둘 다 명시적으로 기술된 별개 필드로 뽑으면 같은 패턴으로 해결된다.\n\n**가장 매력적인 오답 A**(schema를 조이기 — 전부 `required`, `number` 타입, description에 산술 규칙) — \"schema에 일을 시키자\"는 옳은 직감을 **schema가 표현할 수 있는 범위 한 걸음 밖으로** 밀고 간다. JSON Schema는 개별 필드의 타입·존재·열거값을 제약할 뿐 \"이 숫자들이 저 숫자와 일치해야 한다\"를 말할 수 없어, description에 쓴 산술 규칙은 validator가 강제 못 하는 문서다. 전부 `required`로 만들면 값이 진짜 없는 인보이스에서 더 나빠진다. ⚠️ **strict schema는 syntax error를 없애지 semantic error를 없애지 않는다.**\n\nC(다른 표현으로 두 번 돌려 일치할 때만 통과)는 **맞지만 과설계** — 비용·지연 2배로 불일치 탐지만 하고, 표현을 바꿔도 두 run이 독립이 되지 않는다. D(`tool_choice`를 `\"auto\"`→`\"any\"`)는 **다른 문제를 고침** — 도구 호출 누락은 여기 없었고, 필드가 무엇을 담는지는 바뀌지 않는다.",
   "options": [
    {
     "key": "A",
     "text": "Tighten the schema — make every numeric field `required`, type each as `number`, and extend the field descriptions with the arithmetic rule so the schema itself rejects records whose totals disagree."
    },
    {
     "key": "B",
     "text": "Extract `stated_total` (as printed on the invoice) alongside `calculated_total` (summed from the extracted line items) plus a `conflict_detected` boolean, and route disagreements to review instead of to the ledger."
    },
    {
     "key": "C",
     "text": "Run every invoice through the extraction twice, under different prompt phrasings, and pass a record to the ledger only when both runs agree field for field, sending the rest to review."
    },
    {
     "key": "D",
     "text": "Change `tool_choice` from `\"auto\"` to `\"any\"` so the model must call an extraction tool rather than return prose, guaranteeing a schema-shaped record for every invoice the pipeline sees."
    }
   ],
   "answer": [
    "B"
   ],
   "multi": false
  },
  {
   "id": "sim-structured-extraction-02",
   "kind": "exam-sim",
   "domain": "D4",
   "format": "choice",
   "scenario": "structured-extraction",
   "linked_ts": [
    "4.3"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 6; §6 TS 4.3"
   ],
   "context": "**Structured Data Extraction.** The pipeline pulls contract terms out of unstructured amendments and hands them to a downstream obligations tracker.\n\nThe extraction schema marks `counterparty_registration_number`, `governing_law`, and `renewal_term` as required, and types `document_type` as an enum with five values. An audit of 200 amendments finds two things. Forty-one of them print no registration number anywhere in the document, yet all 200 came back with a well-formed, plausible-looking number. Nine amendments are of a kind that is none of the five enum values, and each was assigned the nearest one.",
   "question": "What is the right change?",
   "explanation": "**D is correct.** A required field is a contract with the model: *this output is invalid without a value here*. Handed a document that contains none, the model satisfies the contract with the most plausible value it can construct. The fabrication is being caused by the schema, not by the prompt, and the fix is to make \"not present\" a valid answer. The enum is the same failure in a second form — a closed list of five forces a wrong choice on the ninth kind — and `\"unclear\"` plus `\"other\"` with a detail string keeps the categorization extensible without discarding what the document actually said.\n\n**A** is the most attractive wrong answer: it addresses both observed behaviors in the most direct language available and costs nothing to try. Leaving the schema untouched is precisely what defeats it. The prompt says \"leave it out\"; the tool schema says \"this field is required.\" The schema is the stronger of the two, and the model still has to produce something to return a valid call at all. The enum half fails the same way — \"only when you are sure\" does not add a sixth value to a list of five, so an unsure model still has to pick one of them.\n\n**B** is expensive cleanup for a problem you can stop creating. It catches some invented numbers after the fact, at the price of an external call per document plus reviewer time, and it does nothing at all for `governing_law`, `renewal_term`, or the nine misfiled enum values. It also passes through plausible-but-wrong numbers that happen to resolve to a real company.\n\n**C** is retry applied where retry cannot work. The information is absent from the source, so no number of re-reads and no strength of instruction will surface it, and every attempt still faces a schema that requires a value — the loop just pays repeatedly for the same forced fabrication.",
   "ko": "**구조화 추출.** schema가 `counterparty_registration_number`·`governing_law`·`renewal_term`을 `required`로, `document_type`을 5값 enum으로 선언. 감사 결과 200건 중 41건은 등록번호가 문서 어디에도 없는데 **200건 전부 그럴듯한 번호를 반환**했고, 5값 어디에도 안 맞는 9건은 가장 가까운 값으로 배정됐다.\n\n**정답 D** — 소스에 정보가 진짜 없을 수 있는 곳은 nullable/optional로, `document_type`엔 모호할 때의 `\"unclear\"`와 목록 밖 종류를 위한 `\"other\"` + free-text detail 필드를 추가. `required`는 모델과의 계약이다 — *여기 값이 없으면 이 출력은 무효*. 값이 없는 문서를 받으면 모델은 구성 가능한 가장 그럴듯한 값으로 계약을 충족한다. ⚠️ **날조를 일으키는 건 프롬프트가 아니라 schema이고**, 고치는 방법은 \"없음\"을 유효한 답으로 만드는 것이다. enum은 같은 실패의 두 번째 형태다.\n\n**가장 매력적인 오답 A**(프롬프트에 \"없으면 빼라 / 확실할 때만 골라\" 지시, schema는 그대로) — 관측된 두 행동을 가장 직접적인 언어로 겨냥하고 비용이 0이라 끌린다. **schema를 그대로 둔 것이 정확히 이걸 무력화한다.** 프롬프트는 \"빼라\"고 하고 tool schema는 \"이 필드는 required\"라고 한다. 둘 중 schema가 강하고, 유효한 호출을 반환하려면 모델은 무언가를 만들어야 한다. enum 절반도 같은 식으로 실패 — \"확실할 때만\"이 5개짜리 목록에 여섯 번째 값을 더해주지 않는다.\n\nB(추출 후 등록기관 API로 검증)는 만들지 않을 수 있는 문제에 대한 비싼 사후 청소 — 문서당 외부 호출 + 리뷰어 시간을 치르고 `governing_law`·`renewal_term`·enum 9건엔 무력하다. C(점점 강한 지시로 재시도)는 **retry가 작동할 수 없는 자리** — 정보가 소스에 없다(information absent). 루프는 같은 강제 날조를 반복 결제할 뿐이다.",
   "options": [
    {
     "key": "A",
     "text": "Add an instruction to the prompt — \"if a value does not appear in the document, leave it out rather than guessing, and pick a `document_type` only when you are sure\" — and leave the schema, its required fields, and the five-value enum exactly as they are."
    },
    {
     "key": "B",
     "text": "Validate every extracted registration number against the corporate registry API after extraction, null out the ones that do not resolve to a real company, and route those documents to a reviewer with the failed lookup attached."
    },
    {
     "key": "C",
     "text": "Detect the missing values downstream and retry the extraction with a progressively stronger instruction on each attempt, until the field for that document finally comes back empty rather than filled with an invented number."
    },
    {
     "key": "D",
     "text": "Make fields nullable/optional wherever the source may genuinely not contain the information, and extend `document_type` with an `\"unclear\"` value for ambiguous documents and an `\"other\"` value paired with a free-text detail field for kinds outside the fixed list."
    }
   ],
   "answer": [
    "D"
   ],
   "multi": false
  },
  {
   "id": "sim-structured-extraction-03",
   "kind": "exam-sim",
   "domain": "D4",
   "format": "choice",
   "scenario": "structured-extraction",
   "linked_ts": [
    "4.4"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 6; §6 TS 4.4"
   ],
   "context": "**Structured Data Extraction.** A nightly job extracts structured records from unstructured filings and validates them against a JSON schema. Any record failing validation is retried up to three times with the message \"the previous extraction failed validation; try again.\"\n\nLast month's failures fall into two clusters. In the first, dates come back as `\"14 March 2025\"` where the schema requires `YYYY-MM-DD`, and `line_items` occasionally comes back as one long string instead of an array; these sometimes pass on a later attempt. In the second, `parent_company` is missing — the value appears only in a corporate registry record the pipeline never sends to the model. Cluster two consumes all three retries and fails every night.",
   "question": "How should you restructure the retry logic?",
   "explanation": "**A is correct**, and both halves are load-bearing. Retries work when the model can see what went wrong: including the original document, the failed extraction, and the specific error — \"`invoice_date` must match `YYYY-MM-DD`; received `14 March 2025`\" — converts a blind re-roll into self-correction. Retries cannot work when the required information is simply not in the material provided. That is not a model failure, so it should leave the loop immediately with an explicit `null` and a reason, which also makes the real fix visible: send the registry record.\n\n**B** is the most attractive wrong answer because it rests on a true observation. The format cluster really does clear on later attempts, so a longer schedule really would lift that cluster's pass rate. It buys that with doubled spend on the cluster that can never succeed — six nightly attempts at a value that is not in the document — and none of the six is ever told *why* the previous one failed. Each remains the same coin flip, just thrown more often.\n\n**C** is a good idea aimed at the wrong stage. Format rules and example values in the first prompt will reduce how often the format cluster fails and are worth adding on their own merits, but deleting the retry loop turns every remaining failure into a hard failure with no path to self-correction. It also has nothing to say about the absent parent company, which no first-attempt prompt can conjure.\n\n**D** is heavier than needed and points human attention at the machine-fixable half. A date in the wrong format is corrected reliably by a retry that is told what the format is, so paying a reviewer to retype it is the most expensive possible fix. Reviewer capacity is the scarce resource; reserve it for extractions where the source is genuinely ambiguous — and note that a reviewer cannot find the parent company either, because it is not in the filing.",
   "ko": "**구조화 추출.** 야간 job이 검증 실패 시 \"the previous extraction failed validation; try again\"으로 3회 재시도. 실패는 두 군집이다. ① 날짜가 `\"14 March 2025\"`로 오고 `line_items`가 배열 대신 문자열 — 나중 시도에서 통과하기도 한다. ② `parent_company`가 없음 — 그 값은 파이프라인이 모델에 보내지 않는 기업 등기 기록에만 있다. ②는 매일 밤 3회를 다 태우고 실패.\n\n**정답 A** — 재시도마다 **원 문서 + 실패한 추출 + 구체적 검증 오류**를 함께 보내고, **먼저 분류**해 소스에 정보가 없는 필드는 사유와 함께 `null`로 기록하고 재시도 경로 밖으로 뺀다. 양쪽 다 load-bearing이다. 재시도는 모델이 무엇이 틀렸는지 볼 때 작동한다 — \"`invoice_date` must match `YYYY-MM-DD`; received `14 March 2025`\"가 눈감은 재추첨을 self-correction으로 바꾼다. 그리고 제공된 자료에 정보가 없으면 재시도는 작동할 수 없다 — 모델 실패가 아니므로 즉시 루프를 떠나야 하고, 그래야 진짜 수정(등기 기록을 보낼 것)이 보인다.\n\n**가장 매력적인 오답 B**(3→6회 + exponential backoff) — ⚠️ **참인 관찰에 기대고 있어서** 매력적이다. 형식 군집은 실제로 나중 시도에 통과하니 일정을 늘리면 그 군집의 통과율은 오른다. 그 대가로 절대 성공할 수 없는 군집에 지출이 2배가 되고(문서에 없는 값을 밤마다 6번), **여섯 번 중 어느 것도 앞 시도가 왜 실패했는지 듣지 못한다**. 여전히 같은 동전 던지기를 더 자주 던질 뿐.\n\nC(재시도 루프를 없애고 첫 프롬프트를 강화)는 좋은 아이디어인데 **단계가 틀림** — 형식 규칙·예시값은 그 자체로 추가할 가치가 있지만, 루프를 지우면 남은 실패가 self-correction 경로 없는 hard failure가 되고 없는 parent company엔 여전히 무력하다. D(모든 검증 실패를 사람에게)는 **과설계** + 기계가 고칠 수 있는 절반에 사람 주의를 쓴다 — 게다가 리뷰어도 filing에 없는 parent company는 못 찾는다.\n\n> retry 판단의 축: **information absent vs malformed.**",
   "options": [
    {
     "key": "A",
     "text": "On each retry, send the original document together with the failed extraction and the specific validation errors; and classify failures first, so that fields whose information is not in the source are recorded as `null` with a reason and routed out of the retry path."
    },
    {
     "key": "B",
     "text": "Raise the retry limit from three to six and space the attempts with exponential backoff, since the format failures demonstrably do clear on later attempts and a longer schedule gives every failing record more chances to land."
    },
    {
     "key": "C",
     "text": "Replace the retry loop with a stronger first-attempt prompt that lists every field, its exact required format, and an example value drawn from a real filing, so that far fewer records fail validation in the first place and none of them needs a second call at all."
    },
    {
     "key": "D",
     "text": "Send every validation failure to a human reviewer, who can read the filing, correct the date format or split the line items by hand, and go and look up anything the model could not find in the document itself."
    }
   ],
   "answer": [
    "A"
   ],
   "multi": false
  },
  {
   "id": "sim-structured-extraction-04",
   "kind": "exam-sim",
   "domain": "D5",
   "format": "choice",
   "scenario": "structured-extraction",
   "linked_ts": [
    "5.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 6; §6 TS 5.5"
   ],
   "context": "**Structured Data Extraction.** Every extraction currently passes through a human review queue before reaching the downstream systems, and the queue is the bottleneck.\n\nThe pipeline reports 96.2% field-level accuracy against a 500-document labeled sample. Operations proposes auto-accepting every extraction the model marks high confidence, cutting human review by roughly 70%. Two things are unexamined. The labeled sample is dominated by clean digital PDFs from three large vendors, while scanned faxes are about 12% of nightly volume. And nobody has broken the figure out by field — `payment_terms` is a free-text clause and is suspected to be far worse than the average.",
   "question": "What should you do before reducing human review?",
   "explanation": "**C is correct.** 96.2% is an average over a mix, and averages hide segments. If faxes are 12% of volume and score 70%, the aggregate barely moves while one document in eight is unreliable — and that is precisely the population the automation would stop looking at. The three steps run in order: segment the measurement so you know accuracy holds by document type *and* by field, which is what surfaces a `payment_terms` field performing far below the headline; calibrate field-level confidence against the labeled set so the review threshold corresponds to a measured error rate rather than to a self-report; then sample the auto-accepted stream on an ongoing basis, stratified across the segments, so error rates stay measured and novel failure patterns still surface after humans stop seeing most of the output.\n\n**A** is the most attractive wrong answer because confidence-based routing genuinely *is* part of the answer — after calibration, which is the step it skips. An uncalibrated self-reported 0.95 is a number the model produced, not an error rate; it can be a strict filter on clean PDFs and meaningless on faxes, so tightening it later tightens an uninterpretable dial. The monitoring half is weak for the same reason: downstream rejection only catches errors the downstream system can recognize, and a wrong but well-formed `payment_terms` clause passes every check the tracker has.\n\n**B** is the over-correction, and it keeps chasing the wrong number on the same skewed sample. Moving a masked aggregate from 96.2% to 99.5% could be achieved entirely on the clean PDFs while the faxes stay bad, and reviewers stay fully loaded the whole time waiting for a figure that would not have told anyone what they needed to know.\n\n**D** improves the precision of a figure that is measuring the wrong thing. Four times the samples drawn from the same skewed mix yields a tighter estimate of the same average, with the same segments buried inside it, and the decision it is meant to support is no better informed. **Sample composition, not sample size, is the problem.**",
   "ko": "**구조화 추출.** 500문서 라벨 샘플 기준 field-level accuracy 96.2%. 운영팀이 high confidence 자동 승인으로 사람 리뷰 70% 감축을 제안. 미검토 사항 둘 — 샘플이 대형 벤더 3곳의 깔끔한 디지털 PDF 위주인데 야간 물량의 12%는 스캔 팩스이고, **필드별로 쪼개본 적이 없다**(free-text인 `payment_terms`가 평균보다 훨씬 나쁘다는 의심).\n\n**정답 C** — document type **×** field로 정확도를 분해해 모든 세그먼트에서 유지되는지 확인 → 라벨셋에 대해 field-level confidence를 **캘리브레이션** → 자동 승인 스트림을 **stratified random sampling**으로 계속 측정. 순서대로다. ⚠️ **96.2%는 혼합에 대한 평균이고 평균은 세그먼트를 가린다** — 팩스가 12%에 70%면 총계는 거의 안 움직이는데 8건 중 1건이 불신 대상이고, 그게 바로 자동화가 보기를 그만둘 모집단이다. 마지막 단계는 사람이 출력 대부분을 못 보게 된 뒤에도 novel error pattern이 드러나게 한다.\n\n**가장 매력적인 오답 A**(자기보고 confidence ≥0.95 자동 승인 + downstream 반려율 감시) — confidence 기반 라우팅은 **실제로 정답의 일부**라서 끌린다. 단, **캘리브레이션 이후**이고 A가 건너뛰는 게 그 단계다. 캘리브레이션 안 된 0.95는 모델이 만든 숫자이지 오류율이 아니다 — 깔끔한 PDF에선 엄격한 필터이고 팩스에선 무의미해서, 나중에 조인다는 건 해석 불가능한 다이얼을 조이는 것. 감시 절반도 약하다 — downstream 반려는 하류 시스템이 알아볼 수 있는 오류만 잡고, 형식이 멀쩡하되 틀린 `payment_terms`는 통과한다.\n\nB(99.5% 될 때까지 100% 리뷰 유지)는 **과잉교정**이며 같은 편향 샘플에서 틀린 숫자를 계속 쫓는다 — 가려진 총계는 깔끔한 PDF만으로도 올릴 수 있다. D(샘플 500→2,000)는 틀린 것을 재는 지표의 정밀도만 올린다. **문제는 sample size가 아니라 sample composition이다.**",
   "options": [
    {
     "key": "A",
     "text": "Auto-accept extractions whose self-reported confidence is at least 0.95, and watch the downstream rejection rate for regressions, tightening the threshold if rejections start to climb."
    },
    {
     "key": "B",
     "text": "Hold human review at 100% until the aggregate accuracy figure reaches 99.5%, then revisit the automation proposal with the stronger number and the same 500-document sample behind it."
    },
    {
     "key": "C",
     "text": "Break accuracy down by document type and by field and confirm it holds in every segment; calibrate field-level confidence against the labeled set; then keep measuring the auto-accepted stream with stratified random sampling."
    },
    {
     "key": "D",
     "text": "Grow the labeled sample from 500 to 2,000 documents, drawn the same way the current one was, so that the aggregate accuracy figure is precise enough to support an automation decision of this size before any review is switched off."
    }
   ],
   "answer": [
    "C"
   ],
   "multi": false
  },
  {
   "id": "sim-structured-extraction-05",
   "kind": "exam-sim",
   "domain": "D4",
   "format": "choice",
   "scenario": "structured-extraction",
   "linked_ts": [
    "4.5",
    "5.5"
   ],
   "status": "reviewed",
   "sources": [
    "Exam Guide v1.0 §5 Scenario 6; §6 TS 4.5 and TS 5.5"
   ],
   "context": "**Structured Data Extraction.** Around 1,100 documents arrive per day from client portals, continuously through the day, and each is currently sent to the synchronous API on arrival. Cost is the complaint. A separate interactive path lets a user upload one contract and watch the extracted fields appear on screen.\n\nThe contract with the client states that a document's extraction must be available within 40 hours of its arrival. About 4% of each night's documents fail validation, most of them oversized ones that exceeded the context limit. Extractions the model marks low-confidence go to a human review queue. The team has decided to move the non-interactive volume to the Message Batches API for the 50% cost saving.",
   "question": "Which **two** changes are required to make that work? *(Select 2)*",
   "explanation": "**A and C are correct.**\n\n**A** is the arithmetic the SLA forces on you. The Message Batches API processes within a window of up to 24 hours and offers no guaranteed latency. A document arriving one minute after a submission waits out the whole accumulation window and *then* up to 24 hours. Against a 40-hour commitment the accumulation window can be at most 16 hours, so a 12-hour cadence clears it at 36 hours worst case and leaves four hours of headroom for submission and delivery overhead. The interactive upload path stays synchronous for the same reason: a user is waiting and there is no latency guarantee to offer them.\n\n**C** is how you handle the 4%. `custom_id` correlates each result back to the request that produced it, so failures are individually identifiable and can be resubmitted with the fix each one needs — chunking the documents that exceeded the context limit — instead of paying for the entire batch a second time.\n\n**B** is the most attractive wrong answer, because the observation behind it is usually true: batches often do complete quickly. \"Usually\" is not a commitment. The worst case here is up to 24 hours of accumulation plus up to 24 hours of processing, 48 against a 40-hour contract, and the breach only materializes on the day the batch is slow — which is the day you can least afford it.\n\n**D** asks the batch API for something it does not do: it cannot execute tools mid-request and return their results within a single batch request. Registry validation has to be a separate step after the batch results come back.\n\n**E** trades a latency problem for an accuracy problem. Downstream rejection catches only the errors the downstream system can recognize, and a plausible, well-formed, wrong value passes. Limited reviewer capacity should be *aimed* at low-confidence and ambiguous extractions, not withdrawn from them.",
   "ko": "**구조화 추출.** 하루 약 1,100문서가 종일 연속 도착하고 도착 즉시 동기 API로 간다. 계약상 **도착 후 40시간 내** 추출 결과가 있어야 한다. 매일 밤 4%가 검증 실패(대부분 context limit 초과의 대형 문서). 팀은 비대화형 물량을 50% 절감을 위해 Message Batches API로 옮기기로 했다.\n\n**정답 A와 C.**\n\n**A** — SLA가 강제하는 산술이다. Message Batches API는 **최대 24시간 processing window**이고 **보장 지연시간이 없다**. 제출 직후 1분에 도착한 문서는 누적 window를 다 기다리고 *그 다음* 최대 24시간을 기다린다. 40시간 약정에 대해 누적 window는 최대 16시간이므로 12시간 cadence면 최악 36시간, 제출·전달 오버헤드용 4시간 여유가 남는다. 대화형 업로드 경로가 동기로 남는 이유도 같다 — 사람이 기다리는데 제시할 지연 보장이 없다.\n\n**C** — 4%를 다루는 방법. 요청마다 `custom_id`를 부여하면 결과를 요청과 대응시킬 수 있어 실패분만 개별 식별해 각자에게 맞는 수정(context limit 초과분은 chunking)을 적용해 재제출한다 — 배치 전체를 두 번 결제하지 않는다.\n\n**가장 매력적인 오답 B**(자정에 하루 한 배치, 보통 한 시간 안에 끝나니 여유 충분) — ⚠️ 뒤에 깔린 관찰이 **대개 참이라서** 매력적이다. 배치는 실제로 빨리 끝날 때가 많다. \"대개\"는 약정이 아니다. 최악은 누적 최대 24시간 + 처리 최대 24시간 = 48시간이고, 위반은 배치가 느린 날에만 실현된다 — 하필 가장 감당 못 할 날이다.\n\nD는 배치 API가 하지 않는 것을 요구한다 — 단일 batch request 안에서 도구를 실행해 결과를 되받을 수 없다(등기 검증은 결과 회수 후 별도 단계). E(무인 처리이니 low-confidence 리뷰 큐 폐지)는 지연 문제를 정확도 문제로 맞바꾼다 — downstream 반려는 하류가 알아볼 수 있는 오류만 잡고, 그럴듯하고 형식 멀쩡하며 틀린 값은 통과한다. 한정된 리뷰어 역량은 low-confidence·모호 추출에 **겨눠야지** 거기서 빼면 안 된다.",
   "options": [
    {
     "key": "A",
     "text": "Submit accumulated documents on a fixed cadence of at most every 12 hours, so a document arriving immediately after one submission still clears 40 hours with margin even if its batch takes the full 24."
    },
    {
     "key": "B",
     "text": "Submit one batch a day at midnight; batches of this size typically return in well under an hour, so the 40-hour commitment holds in practice with a wide margin on every ordinary day."
    },
    {
     "key": "C",
     "text": "Give each request a `custom_id`, and on completion resubmit only the entries that failed — chunking the oversized documents — rather than re-running all 1,100."
    },
    {
     "key": "D",
     "text": "Design each batch request as a multi-turn tool-calling exchange so the model can call the registry-lookup tool mid-request and validate the extracted registration numbers before returning."
    },
    {
     "key": "E",
     "text": "Since batch results arrive unattended, retire the human review queue for low-confidence extractions and let downstream rejections identify the bad ones."
    }
   ],
   "answer": [
    "A",
    "C"
   ],
   "multi": true
  }
 ]
};
