# Mocks (stand-in data)

## `agents.json` — Digital Workforce

AI agents (LLMs by business area). Used by `lib/agents-mock.ts` and the **Digital Workforce** section on the home page and `/demos/ai-agents`.

**Per-agent shape:**

```json
{
  "id": "unique-id",
  "slug": "url-slug",
  "name": "Agent name",
  "role": "Role title",
  "department": "Department name",
  "status": "active | busy | offline",
  "description": "Short description of what the agent does."
}
```

## `demos/` — Business Functions

One JSON file per category. See `demos/README.md` for the demo shape and usage.
