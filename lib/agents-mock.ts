/**
 * Digital Workforce — AI agents from mocks/agents.json.
 * Each agent is an LLM specialized in one business area.
 */

import agentsJson from "@/mocks/agents.json";

export type AgentStatus = "active" | "busy" | "offline";

export type Agent = {
  id: string;
  slug: string;
  name: string;
  role: string;
  department: string;
  status: AgentStatus;
  description: string;
  /** Hardcoded first message in the chat (demo). Later replaced by real LLM. */
  welcomeMessage?: string;
};

const agents = agentsJson as Agent[];

export function getAgents(): Agent[] {
  return agents;
}

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}
