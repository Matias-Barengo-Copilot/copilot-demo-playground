/**
 * Agents (Digital Workforce) — single data layer for the app.
 *
 * Data source: mocks (mocks/agents.json). Replace with DB when ready:
 * - Add e.g. getAgentsFromDb() and use it here instead of loadAgentsFromMock().
 * - Keep the same public API: getAgents(), getAgentBySlug(), and Agent type.
 */

import agentsMock from "@/mocks/agents.json";

export type AgentStatus = "active" | "busy" | "offline";

export type Agent = {
  id: string;
  slug: string;
  name: string;
  role: string;
  department: string;
  status: AgentStatus;
  description: string;
  /** First message in the chat (demo). Later from real LLM. */
  welcomeMessage?: string;
  /** Card image. Sourced from mocks/agents.json (later DB). */
  imageUrl?: string;
  /** Capabilities shown on card hover. */
  capabilities?: string[];
  /** Action labels in the modal; each links to agent chat. */
  actions?: string[];
};

/** Load agents from current source (mocks). Swap to DB when ready. */
function loadAgents(): Agent[] {
  return agentsMock as Agent[];
}

const agents = loadAgents();

export function getAgents(): Agent[] {
  return agents;
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}
