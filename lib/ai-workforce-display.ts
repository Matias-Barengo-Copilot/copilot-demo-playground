/**
 * Display config for AI Workforce cards (images, capabilities, action labels).
 * All data comes from agents (mocks/agents.json → later DB). Defaults used when fields are missing.
 */

import { getAgentBySlug } from "@/lib/agents";

export type AgentDisplayConfig = {
  imageUrl: string;
  capabilities: string[];
  /** Button labels in the modal; each navigates to the agent chat. */
  actions: string[];
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export function getAgentDisplayConfig(slug: string): AgentDisplayConfig {
  const agent = getAgentBySlug(slug);
  return {
    imageUrl: agent?.imageUrl ?? DEFAULT_IMAGE,
    capabilities: agent?.capabilities ?? [],
    actions: agent?.actions?.length ? agent.actions : ["Open chat"],
  };
}
