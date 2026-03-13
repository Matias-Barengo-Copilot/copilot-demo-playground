---
name: lint
description: Run Ruff linting and formatting on Python code. Use to check or fix code style issues.
argument-hint: "[check|fix|format] [path]"
allowed-tools: Bash(ruff *, python *)
---

# Run Ruff Linting

Run Ruff for Python linting and formatting.

## Arguments

Arguments: `$ARGUMENTS`

Parse arguments:
- `check` (default) - run `ruff check .` to find issues
- `fix` - run `ruff check --fix .` to auto-fix issues
- `format` - run `ruff format .` to format code
- `all` - run check with fix, then format
- Optional path as second argument (defaults to `.`)

## Commands

### Check for issues (no changes)
```bash
ruff check .
```

### Auto-fix issues
```bash
ruff check --fix .
```

### Format code
```bash
ruff format .
```

### Full cleanup
```bash
ruff check --fix . && ruff format .
```

## Workflow

1. Parse arguments to determine mode
2. Run the appropriate ruff command(s)
3. Report results:
   - Number of issues found
   - Number of issues fixed (if fix mode)
   - Files formatted (if format mode)
4. If issues remain after fix, list them for manual review

## Common issue categories

- **E** - pycodestyle errors
- **W** - pycodestyle warnings
- **F** - Pyflakes
- **I** - isort
- **N** - pep8-naming
- **UP** - pyupgrade
- **B** - flake8-bugbear

## Output

Summarize what was checked/fixed/formatted and any remaining issues that need manual attention.
