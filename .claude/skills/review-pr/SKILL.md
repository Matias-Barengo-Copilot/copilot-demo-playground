---
name: review-pr
description: Review a pull request or check PR comments. Use for code review, checking PR status, or responding to review feedback.
argument-hint: "[PR-number-or-url] [comments|diff|status|full]"
context: fork
agent: Explore
allowed-tools: Read, Grep, Glob, Bash(gh *)
---

# PR Review

Review a pull request or check its comments and status.

## Arguments

Arguments: `$ARGUMENTS`

Parse:
- First argument: PR number or GitHub URL
- Second argument (optional): mode
  - `comments` - show PR comments and review feedback
  - `diff` - show and review the diff
  - `status` - show PR status (checks, approvals, mergeable)
  - `full` (default) - complete review

If no PR specified, check if on a feature branch and find associated PR.

## Gather PR context

```bash
# Get PR details
gh pr view $PR --json title,body,state,mergeable,reviewDecision,statusCheckRollup

# Get PR diff
gh pr diff $PR

# Get PR comments
gh pr view $PR --comments

# Get review comments (on specific lines)
gh api repos/{owner}/{repo}/pulls/$PR/comments

# Get check status
gh pr checks $PR
```

## Review modes

### comments
1. Fetch all PR comments and review comments
2. Group by: general comments vs line-specific
3. Identify unresolved threads
4. Summarize feedback themes
5. List action items

### diff
1. Fetch the PR diff
2. Review for:
   - **Correctness**: Logic errors, edge cases, bugs
   - **Code quality**: Readability, maintainability, naming
   - **Tests**: Coverage, edge cases, assertions
   - **Security**: Input validation, injection risks, auth issues
   - **Performance**: N+1 queries, unnecessary computation
   - **Consistency**: Alignment with codebase patterns
3. Provide specific line references
4. Categorize: must-fix, should-fix, nitpick, question

### status
1. Show PR state (open, merged, closed)
2. Show review status (approved, changes requested, pending)
3. Show CI check results
4. Show merge conflicts if any
5. Identify blockers

### full
Run all modes and provide comprehensive review.

## Output format

```markdown
# PR Review: #<number> - <title>

## Status
- State: Open
- Reviews: 1 approved, 1 changes requested
- Checks: 3/4 passing
- Mergeable: No (conflicts)

## Review Comments Summary
### Unresolved
- [ ] @reviewer1: "Need tests for edge case X" (file.py:42)
- [ ] @reviewer2: "Security concern with input handling" (api.py:15)

### Resolved
- [x] @reviewer1: "Typo in variable name" (fixed)

## Code Review Findings

### Must Fix
1. **file.py:42** - Missing null check before accessing `.value`

### Should Fix
1. **api.py:28** - Consider extracting this to a helper function

### Nitpicks
1. **utils.py:10** - Inconsistent naming with rest of codebase

## Action Items
1. Resolve merge conflicts with main
2. Address security concern in api.py:15
3. Add tests for edge case X
4. Fix failing CI check: lint
```
