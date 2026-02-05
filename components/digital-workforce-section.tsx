import { getAgents } from "@/lib/agents-mock";
import { AgentCard } from "@/components/agent-card";

export function DigitalWorkforceSection() {
  const agents = getAgents();

  return (
    <section
      id="digital-workforce"
      className="scroll-mt-20 border-t border-border bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Digital Workforce
        </h2>
        <p className="mt-2 text-muted-foreground">
          Meet your AI agents—intelligent assistants that work alongside your
          team.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
