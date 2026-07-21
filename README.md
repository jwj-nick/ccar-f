# CCAR-F Study

Two companions for the **Claude Certified Architect – Foundations (CCAR-F)** exam.
Live: **https://jwj-nick.github.io/ccar-f/**

> ⚠️ **Unofficial** personal learn-in-public project. Not affiliated with Anthropic.
> Facts are grounded in the official *CCAR-F Exam Guide v1.0* and [docs.claude.com](https://docs.claude.com).
> Official exam questions are never reproduced — every practice item is written against the published task-statement objectives.

| | |
|---|---|
| **📘 [Study](https://jwj-nick.github.io/ccar-f/study/)** | The exam on its own terms: format and scoring, the blueprint of **30 task statements**, the 6 scenarios, what is explicitly out of scope, and judgment drills with full explanations. Every claim traces to the official guide; anything the guide does not support is flagged. |
| **📗 [Journal](https://jwj-nick.github.io/ccar-f/journal/)** | One engineer learning it in public: the next problem to solve, session lessons, **raw interactive transcripts including wrong answers and their corrections**, a glossary recall drill, and domain notes written from a 20-year hardware-verification lens. |

## Structure

```
index.html          hub — two cards, shared theme toggle
styles.css          shared stylesheet
vendor/             marked · mermaid (vendored so everything works offline)
study/              index.html · app.js · guide.js · data/{content,practice}.js
journal/            index.html · app.js · data/journal.js
```

Vanilla HTML/CSS/JS. **No build step in this repo, no server, no network at runtime.**
Data is injected as plain `<script>` globals, so both apps open by double-clicking their `index.html` from disk.

## Where the content comes from

**`data/` directories are generated. Do not hand-edit them.**
Sources live in a separate private study workspace and are compiled by `30_drill_app/build/compile.mjs`:

| Generated | Source |
|---|---|
| `study/data/content.js` · `study/data/practice.js` | `30_drill_app/{content,practice}/**.md` |
| `journal/data/journal.js` | `00_META/app_feed/**.md` |

Only `status: reviewed` material ships — an item counts as reviewed once it is verified against the
official guide and, for multiple-choice items, once its answer key has been **independently re-derived**
by a reviewer who has not seen the key.

## License / use

Personal study material shared in the hope it helps someone else prepare.
The official exam guide is Anthropic's; it is linked, never copied.
