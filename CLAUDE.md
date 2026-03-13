\# CLAUDE.md



\## Purpose

This repository uses a lightweight spec-first AI-assisted development workflow for selected engineering tasks.



The goal is to improve:

\- implementation speed

\- consistency of code changes

\- clarity of task execution

\- validation quality

\- learnings about when human code review can be safely reduced



This is not a fully autonomous workflow. Humans still own judgment, scope control, validation, and review.



---



\## Core operating principles



\### 1. Plan before editing

For any non-trivial task, start by understanding the task and forming an implementation plan before making code changes.



Do not jump straight into editing when:

\- the task spans multiple files

\- the task changes behavior

\- the task is ambiguous

\- the task touches integrations, persistence, permissions, or business rules



\### 2. Keep context lean

Use only the context needed to perform the task well.



Avoid:

\- dragging old task context into new tasks

\- bloated instructions

\- giant specs for tiny changes

\- unrelated documentation in the working context



\### 3. Prefer behavior validation over code-shape preferences

The goal is correct behavior, not just code that “looks right.”



Always validate against:

\- acceptance criteria

\- automated tests

\- manual checks where appropriate



\### 4. Prefer minimal, local changes

Unless the spec explicitly calls for refactoring, prefer the smallest safe change that satisfies the requirement.



Do not expand scope through opportunistic cleanup.



\### 5. Human judgment remains required

AI can help plan, implement, summarize, and scaffold tests.

Humans remain responsible for:

\- deciding what should be built

\- checking that the spec is correct

\- identifying risky deviations

\- validating user-facing behavior

\- evaluating whether process overhead is worth it



---



\## Required workflow



\### Step 1: Read the task inputs

Before starting work, read:

\- the task spec

\- the implementation plan

\- any linked issue / PM context if available



\### Step 2: Restate the intended change

Before coding, summarize to yourself or in the task thread:

\- what is being changed

\- what is not being changed

\- what success looks like

\- what needs validation



\### Step 3: Implement within scope

Implement only the work needed to satisfy the spec and implementation plan.



\### Step 4: Validate

Run the required checks from the spec and implementation plan:

\- automated tests

\- build/typecheck/lint checks as applicable

\- manual validation steps as applicable



\### Step 5: Report clearly in the PR

The PR must explain:

\- what was planned

\- what actually changed

\- where implementation diverged from plan

\- why the divergence was necessary

\- what was validated

\- what remains risky or unresolved



---



\## Git workflow



\### Branch naming

Use descriptive names with the appropriate prefix:

\- `feature/feature-name-or-ticket-id` – new functionality

\- `bugfix/bug-name-or-ticket-id` – bug fixes

\- `hotfix/hotfix-name-or-ticket-id` – urgent production fixes

Examples:

\- `feature/add-login-button`

\- `bugfix/fix-navigation`

\- `hotfix/fix-crash-on-login`



\### Commit message format

Use clear, imperative commit messages. For non-trivial changes, structure with subject and body:

```
type(scope): short description

- Detail 1
- Detail 2

Resolves #ticket-id
```

Example:

```
feat(auth): implement user registration

- Add registration form and validation
- Integrate authentication service
- Update user model and schema

Resolves #42
```



\### Merge strategy

\- Use PRs for all merges

\- Prefer squash and merge for clean history

\- Delete branches after merging



\### Protected branches

\- **main (production):** only merge from develop. No direct pushes.

\- **develop:** no direct pushes except for emergencies. Use feature branches and PRs.

\- Never push directly to develop or main unless there is an active production incident requiring immediate intervention.

\- Breaking deployment is not acceptable for routine work.



---



\## Scope control rules



\### In-scope changes

Proceed without extra approval only if the change:

\- is necessary to satisfy the spec

\- does not materially change architecture

\- does not materially change product behavior outside the requested area

\- does not expand into unrelated refactor work



\### Minor deviations

You may proceed with a small deviation if all are true:

\- it is necessary to complete the task correctly

\- it is low risk

\- it does not materially increase task size

\- it is documented in the PR



Examples:

\- adjusting a helper function required by the task

\- updating a related test utility

\- fixing a tightly adjacent bug that blocks the requested change



\### Escalation required

Stop and escalate before proceeding if the work would:

\- change API contracts

\- change DB schema / migrations

\- introduce architecture changes

\- affect another subsystem in a meaningful way

\- require a product decision not covered by the spec

\- significantly expand effort or risk

\- invalidate the implementation plan



Use this format when escalating:

\- \*\*Spec says:\*\* ...

\- \*\*I found:\*\* ...

\- \*\*Why it matters:\*\* ...

\- \*\*Recommended option:\*\* ...



---



\## Spec expectations

Every task spec should contain:

\- objective

\- scope

\- out of scope

\- context / affected areas

\- acceptance criteria

\- testing requirements

\- out-of-scope protocol



A spec should be as short as possible while still removing ambiguity.



Do not write oversized specs for small changes.



---



\## Implementation plan expectations

Every implementation plan should contain:

\- intended approach

\- affected files / systems

\- execution steps

\- validation steps

\- key assumptions

\- known risks

\- decision points requiring escalation



Implementation plans should explain how the task will be done, not restate the entire spec.



---



\## AI usage guidance



\### AI is good for:

\- exploring code

\- drafting implementation approaches

\- generating first-pass code

\- generating test scaffolding

\- summarizing changes

\- drafting PR descriptions

\- identifying possible edge cases



\### AI is not allowed to decide on its own:

\- architecture changes

\- broad refactors

\- product decisions

\- behavior changes outside the spec

\- security-sensitive changes without explicit review



If AI output conflicts with the spec or plan, the spec and plan win unless explicitly revised.



---



\## Validation rules



\### Minimum validation for every task

Every completed task must include:

\- acceptance criteria check

\- relevant build/lint/typecheck/test commands

\- changed behavior validation

\- brief note on any manual validation performed



\### By task type

\- \*\*Bug fix:\*\* add a regression test where feasible

\- \*\*Small logic change:\*\* add/update unit tests where feasible

\- \*\*Cross-module feature:\*\* add integration coverage where appropriate

\- \*\*UI change:\*\* manual validation is required if automation is insufficient



\### Python linting

Use Ruff for linting and formatting:

\- Run `ruff check .` before committing

\- Run `ruff format .` to auto-format

\- Use default configuration unless project-specific overrides are needed



\### Manual validation

If manual validation was performed, record:

\- what was tested

\- environment used

\- result



Example:

\- tested login flow locally

\- created user, failed login, successful login

\- confirmed toast copy and redirect behavior



---



\## PR requirements



Every PR must include the following sections.



\### 1. Task references

\- Spec file:

\- Implementation plan file:



\### 2. Objective

What was the intended outcome?



\### 3. Planned approach

Summarize the implementation plan briefly.



\### 4. Actual implementation

What was actually changed?



\### 5. Separation from implementation plan

Document every meaningful deviation from the implementation plan.



Use this format:

\- \*\*Planned:\*\* ...

\- \*\*Actual:\*\* ...

\- \*\*Why changed:\*\* ...

\- \*\*Risk introduced or reduced:\*\* ...



This section is required.

The purpose is to review:

\- whether the implementation stayed aligned with the plan

\- whether deviations were justified

\- whether the process docs were useful enough to trust more autonomous execution later



\### 6. Validation performed

List:

\- automated tests run

\- build/lint/typecheck commands run

\- manual tests performed

\- any extra manual verification beyond the plan



\### 7. Additional manual testing

If you ran additional manual tests not originally in the plan, list them separately.



Format:

\- \*\*Test:\*\* ...

\- \*\*Reason:\*\* ...

\- \*\*Outcome:\*\* ...



\### 8. Risks / follow-ups

Anything unresolved, fragile, or worth watching after merge.



\### 9. Process usefulness rating

Rate both artifacts for this task:



\- \*\*Spec usefulness (1-5):\*\*

\- \*\*Implementation plan usefulness (1-5):\*\*



And briefly explain:

\- what in the docs saved time

\- what in the docs was missing

\- whether the docs reduced review effort



This is required because we are evaluating when documentation quality becomes good enough to reduce code review depth.



---



\## Task tracking (ClickUp)

When work is completed, update the corresponding ClickUp task:

1. Move the task status to "in review"
2. Add a comment summarizing what was done
3. Link the PR if available

Use `/clickup [task-id] done` to automate this workflow.

This ensures task status stays synchronized with actual progress and provides traceability between code changes and task requirements.



---



\## Review philosophy

For now, reviewers should review:

\- the code

\- the deviations from the implementation plan

\- the validation performed

\- the usefulness of the docs



The long-term question is not “can we skip review now?”

The question is:

“Are the specs, plans, and validations becoming strong enough that we can safely reduce human code review later?”



---



\## Preferred style for AI-assisted work

\- Be explicit

\- Be concise

\- Prefer checklists over long prose

\- Keep task artifacts scoped to the task

\- Write acceptance criteria that are testable

\- Document assumptions instead of hiding them

\- Record deviations instead of pretending the plan was perfect



---



\## When uncertain

If uncertain about scope, behavior, or risk:

\- pause

\- surface the uncertainty

\- ask for a decision or document the tradeoff clearly



Do not let AI improvise through ambiguity without making that ambiguity visible.

## AI SDK usage (recommended not needed)

  This organization uses `ai-sdk` for all LLM interactions. Do not
  use `openai` or `anthropic` packages directly.

  ### Installation
  ```bash
  pip install
  git+https://github.com/CoPilot-Innovations/ai-sdk.git@v0.1.0-beta

  Required environment variables

  OPENAI_API_KEY=sk-...
  ANTHROPIC_API_KEY=sk-ant-...

  Basic patterns

  from ai_sdk import AIClient

  client = AIClient()

  # Simple completion
  response = client.complete(
      messages=[{"role": "user", "content": "Hello"}],
      model="claude-sonnet",  # or "gpt-4o", "gpt-4o-mini"
  )
  print(response.content)

  # Conversation with thread (auto-manages history)
  thread = client.create_thread(system_prompt="You are helpful.")
  response = client.complete(thread=thread, user_message="Hello")
  response = client.complete(thread=thread,
  user_message="Follow-up")  # remembers context

  # Streaming
  for chunk in client.stream(messages=[...],
  model="claude-sonnet"):
      print(chunk.delta, end="")

  # Async
  response = await client.acomplete(messages=[...],
  model="claude-sonnet")

  With database persistence (optional)

  client =
  AIClient(thread_storage="postgresql://user:pass@host/db")
  thread = client.create_thread(metadata={"user_id": "123"})
  # Threads auto-save after each completion

  Testing

  from ai_sdk import AIClient
  from ai_sdk.providers import MockProvider

  client = AIClient(provider=MockProvider(default_response="Test
  response"))

  Model aliases
  ┌───────────────┬───────────┐
  │     Alias     │ Provider  │
  ├───────────────┼───────────┤
  │ claude-sonnet │ Anthropic │
  ├───────────────┼───────────┤
  │ claude-opus   │ Anthropic │
  ├───────────────┼───────────┤
  │ gpt-4o        │ OpenAI    │
  ├───────────────┼───────────┤
  │ gpt-4o-mini   │ OpenAI    │
  └───────────────┴───────────┘
  When to use what

  - Simple one-off completion: client.complete(messages=[...],
  model="...")
  - Multi-turn conversation: Use thread= parameter
  - Need to persist conversations: Pass thread_storage= to client
  - Tests: Use MockProvider