# Specs

Task specifications: **what** to build and **why**.

## When to create a file here

- Before starting any non-trivial task (multi-file, behavior change, ambiguous, or risky)
- One file per task, named `<ticket-id>-<short-description>.md`

## Required contents (per CLAUDE.md)

- `objective` — what outcome is expected
- `scope` — what is included
- `out of scope` — explicit exclusions
- `context / affected areas` — which parts of the codebase are involved
- `acceptance criteria` — testable conditions that define done
- `testing requirements` — what automated and manual tests are needed
- `out-of-scope protocol` — what to do if the task drifts

## Rules

- Keep specs as short as possible while removing ambiguity
- Do not include implementation details (those go in `.claude/plans/`)
- Do not write oversized specs for small changes
