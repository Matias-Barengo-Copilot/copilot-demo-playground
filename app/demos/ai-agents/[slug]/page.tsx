import Link from "next/link";
import { notFound } from "next/navigation";
import { getAIAgentBySlug } from "@/lib/demo-catalog";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export default async function AIAgentDemoPage({ params }: Props) {
  const { slug } = await params;
  const demo = getAIAgentBySlug(slug);
  if (!demo) notFound();

  return (
    <div>
      <Link
        href="/demos/ai-agents"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← AI Agents
      </Link>
      <div className="mt-6">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Simulation
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
          {demo.agentName}
        </h1>
        <p className="mt-2 text-muted-foreground">{demo.narrative}</p>
        <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">
            Simulation placeholder. Scripted agent interaction will go here.
          </p>
          <Button asChild className="mt-4">
            <Link href="/demos/ai-agents">Back to list</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
