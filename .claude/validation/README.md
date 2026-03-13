# Validation Results

Records of manual validation performed during task execution.

## When to create a file here

- When manual validation was required by the spec or plan
- When extra manual checks were run beyond what was planned
- One file per task (or per validation session), named to match the task

## Required contents (per CLAUDE.md)

- What was tested
- Environment used (local, staging, prod)
- Result (pass/fail, observations)

## Example

```
## Manual Validation — bugfix/fix-navigation

**Environment:** local (dev server)

**Tests performed:**
- Navigated to /dashboard — loaded correctly
- Clicked back button — no crash
- Confirmed breadcrumb text updated

**Result:** All checks passed
```
