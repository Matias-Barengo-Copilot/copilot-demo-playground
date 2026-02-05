import { notFound } from "next/navigation";

/**
 * This route is not used. Digital Workforce content lives on the landing (/#digital-workforce).
 * Only agent routes like /demos/ai-agents/stacy are valid.
 */
export default function AIAgentsIndexPage() {
  notFound();
}
