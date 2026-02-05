import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Agent, AgentStatus } from "@/lib/agents-mock";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  AgentStatus,
  { label: string; dotClass: string; pillClass: string }
> = {
  active: {
    label: "Active",
    dotClass: "bg-emerald-500",
    pillClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  },
  busy: {
    label: "Busy",
    dotClass: "bg-amber-500",
    pillClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  },
  offline: {
    label: "Offline",
    dotClass: "bg-muted-foreground/50",
    pillClass: "bg-muted/80 text-muted-foreground",
  },
};

type AgentCardProps = {
  agent: Agent;
};

export function AgentCard({ agent }: AgentCardProps) {
  const config = statusConfig[agent.status];
  const initial = agent.name.charAt(0).toUpperCase();

  return (
    <Card className="h-full border-border bg-card transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-4 pt-5">
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <Avatar className="size-12 rounded-full bg-orange-500 text-white">
              <AvatarFallback className="text-lg font-semibold">
                {initial}
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "absolute bottom-0 right-0 size-3 rounded-full border-2 border-card",
                config.dotClass
              )}
              aria-hidden
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-foreground">{agent.name}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  config.pillClass
                )}
              >
                {config.label}
              </span>
            </div>
            <p className="mt-0.5 text-sm font-medium text-muted-foreground">
              {agent.role}
            </p>
            <p className="text-xs text-muted-foreground">{agent.department}</p>
          </div>
        </div>
        <p className="flex-1 text-sm text-muted-foreground line-clamp-2">
          {agent.description}
        </p>
        <div className="flex justify-end">
          <Button variant="outline" size="sm" className="gap-1.5" asChild>
            <Link href={`/demos/ai-agents/${agent.slug}`}>
              <MessageCircle className="size-4" />
              Chat
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
