import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AI_AGENT_DEMOS } from "@/lib/demo-catalog";

export default function AIAgentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          AI Agents
        </h1>
        <p className="mt-2 text-muted-foreground">
          Simulated AI personas—coffee-themed names and personalities. Scripted interactions, not live AI.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AI_AGENT_DEMOS.map((demo) => (
          <Link key={demo.id} href={`/demos/ai-agents/${demo.slug}`}>
            <Card className="h-full border-border bg-card transition-colors hover:bg-accent/50">
              <CardContent className="pt-4">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Simulation
                </span>
                <h2 className="mt-1 font-semibold text-foreground">
                  {demo.agentName}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {demo.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {demo.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground/80">
                  {demo.narrative}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
