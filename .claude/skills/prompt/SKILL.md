---
name: prompt
description: Manage prompt templates - create, list, compare, or test prompts. Use for prompt engineering and versioning.
argument-hint: "[create|list|compare|test|version] [name]"
allowed-tools: Read, Write, Glob, Grep
---

# Prompt Template Manager

Manage prompt templates for AI/ML work.

## Arguments

Command: `$ARGUMENTS`

Commands:
- `create <name>` - Create a new prompt template
- `list` - List all prompt templates
- `show <name>` - Display a prompt template
- `compare <name1> <name2>` - Compare two prompt versions
- `test <name>` - Test a prompt with sample inputs
- `version <name>` - Create a new version of existing prompt

## Prompt template structure

Store prompts in `prompts/` directory with this structure:

```
prompts/
├── <prompt-name>/
│   ├── prompt.md          # Current version
│   ├── versions/
│   │   ├── v1.md
│   │   ├── v2.md
│   │   └── ...
│   ├── test-inputs.json   # Sample inputs for testing
│   └── metadata.json      # Version history, notes
```

## Template format

Each prompt.md should contain:

```markdown
---
name: <prompt-name>
version: <version-number>
created: <date>
updated: <date>
author: <author>
description: <what this prompt does>
variables: [list, of, variables]
---

# <Prompt Name>

## System prompt (if applicable)
<system instructions>

## User prompt template
<template with {{variables}}>

## Expected output format
<description or example>

## Notes
<usage notes, edge cases, known issues>
```

## Commands detail

### create
1. Ask for prompt name and description
2. Create directory structure
3. Create initial prompt.md with template
4. Create empty test-inputs.json
5. Create metadata.json with v1

### list
1. Glob for all `prompts/*/prompt.md`
2. Read metadata from each
3. Display table: name, version, description, last updated

### compare
1. Read both prompt files
2. Show diff highlighting changes
3. Summarize what changed

### test
1. Read prompt template
2. Read test-inputs.json
3. For each test input, show rendered prompt
4. Optionally run against model and show output

### version
1. Copy current prompt.md to versions/vN.md
2. Update version number in prompt.md
3. Update metadata.json
4. Report new version created

## Output

Report action taken and next steps.
