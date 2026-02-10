# Mocks (stand-in data)

## `agents.json` — Digital Workforce

AI agents (LLMs by business area). Used by `lib/agents.ts` and the **Digital Workforce** section on the home page and `/demos/ai-agents/[slug]`. Data is loaded from this mock; replace with DB in `lib/agents.ts` when ready.

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

Business Function demos are stored in the **database** (`lib/demos-db.ts`, `scripts/seed-demos.ts`), not in this folder.
