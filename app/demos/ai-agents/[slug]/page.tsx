import { notFound } from "next/navigation";
import { getAgentBySlug } from "@/lib/agents";
import { AgentChat } from "@/components/agent-chat";
import { BackButton } from "@/components/back-button";

type Props = { params: Promise<{ slug: string }> };

export default async function AgentChatPage({ params }: Props) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 min-h-0">
        <BackButton
          href="/#digital-workforce"
          className="text-zinc-400 hover:text-white hover:bg-white/10 -ml-2 shrink-0"
        >
          Digital Workforce
        </BackButton>
        <div className="min-h-0 flex-1 overflow-hidden">
          <AgentChat agent={agent} />
        </div>
      </div>
    </div>
  );
}
