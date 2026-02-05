/**
 * Config-driven demo catalog for the CoPilot Demo Portal.
 * All demos are contextualized within Mountain View Coffee.
 * Business Functions demos live in mocks/demos/*.json and are read via lib/demos-mock.ts.
 */

// —— Category 2: AI Agents (simulations only, coffee-themed) ——
export type AIAgentDemo = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Coffee-themed agent name/personality */
  agentName: string;
  narrative: string;
  type: "simulation";
};

export const AI_AGENT_DEMOS: AIAgentDemo[] = [
  {
    id: "barista-bot",
    slug: "barista-bot",
    title: "Barista Bot",
    description: "A simulated AI agent that helps with drink recommendations and order handling.",
    agentName: "Mocha",
    narrative: "Mocha is Mountain View Coffee's virtual barista—friendly, fast, and always suggesting the right drink.",
    type: "simulation",
  },
  {
    id: "inventory-agent",
    slug: "inventory-agent",
    title: "Inventory assistant",
    description: "Simulated agent that answers questions about stock and reordering.",
    agentName: "Bean Counter",
    narrative: "Bean Counter keeps the back office in order. Ask about beans, supplies, and restock schedules.",
    type: "simulation",
  },
];

// —— Helpers ——
export function getAIAgentBySlug(slug: string): AIAgentDemo | undefined {
  return AI_AGENT_DEMOS.find((d) => d.slug === slug);
}
