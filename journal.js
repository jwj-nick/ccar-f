/* CCAR-F Study — 학습 저널(공개 증류). 세션마다 /ccar-log가 갱신.
 * 원본 상세(오답·약점 포함)는 private 워크스페이스 00_META/sessions·progress.md. 여기엔 증류분만. */

const JOURNAL = {
  updated: '2026-07-13',
  streak: 1,
  location: 'W1 · D1 진행 중',

  // 다음에 풀 문제 (앱 상단에 크게)
  next: {
    dom: 'D1', ses: 'S2', title: '5 workflow 패턴 매칭',
    problem: '다음 각 상황은 어떤 workflow 패턴일까? — (a) 번역 초안 생성 → 다른 모델이 품질 평가 → 피드백 반영해 재번역 반복 / (b) 한 문서를 요약·번역·톤분석을 동시에 돌려 마지막에 합침 / (c) 들어온 티켓을 유형별로 분류해 전담 경로로 보냄.',
    hint: '보기: prompt chaining · routing · parallelization(sectioning) · orchestrator-workers · evaluator-optimizer. (c)는 지난 세션 A와 같은 패턴.'
  },

  // 도메인 진도 (studied confidence 0–5)
  progress: [
    { code: 'D1', ko: '에이전트 설계·조율', conf: 3, target: 4 },
    { code: 'D3', ko: 'Claude Code', conf: 3, target: 4 },
    { code: 'D4', ko: '프롬프트·구조화', conf: 2, target: 4 },
    { code: 'D2', ko: '툴·MCP', conf: 2, target: 4 },
    { code: 'D5', ko: '컨텍스트·신뢰성', conf: 2, target: 4 }
  ],

  // 복습 예정 (간격 반복)
  reviewDue: [
    { item: 'workflow vs agent 판단 기준(경로·스텝 예측 가능?)', when: '07-14 · 07-16 · 07-20' }
  ],

  // 세션 타임라인 (최신이 위로 렌더)
  sessions: [
    {
      date: '2026-07-13', dom: 'D1', ses: 'S1', mode: '⚡핀치',
      covered: 'workflow vs agent 경계',
      insight: '런타임에 다음 스텝 결정권이 코드에 있으면 workflow, 모델에 있으면 agent. 리트머스 = "실행 전에 경로·스텝 수를 예측/하드코딩할 수 있나?"',
      analogy: 'directed test = workflow · constrained-random/coverage closure = agent-like. agent는 유연하나 비용↑·오류 누적.',
      result: 'APPLY 판단문제(A=workflow, B=agent) 정확'
    }
  ]
};

window.CCARF_JOURNAL = JOURNAL;
