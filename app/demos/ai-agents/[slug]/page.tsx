import { notFound } from "next/navigation";
import { getAgentBySlug } from "@/lib/agents-mock";
import { AgentChat } from "@/components/agent-chat";
import { BackButton } from "@/components/back-button";

type Props = { params: Promise<{ slug: string }> };

export default async function AgentChatPage({ params }: Props) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <BackButton href="/#digital-workforce">Digital Workforce</BackButton>
      <AgentChat agent={agent} />
    </div>
  );
}
