"use client";

import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Agent, AgentStatus } from "@/lib/agents-mock";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  AgentStatus,
  { label: string; pillClass: string }
> = {
  active: {
    label: "Active",
    pillClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  },
  busy: {
    label: "Busy",
    pillClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  },
  offline: {
    label: "Offline",
    pillClass: "bg-muted/80 text-muted-foreground",
  },
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

type AgentChatProps = {
  agent: Agent;
};

export function AgentChat({ agent }: AgentChatProps) {
  const config = statusConfig[agent.status];
  const initialMessage = agent.welcomeMessage ?? `Hi! I'm ${agent.name}, your ${agent.role}. How can I help you today?`;
  const [inputValue, setInputValue] = React.useState("");
  const [messages, setMessages] = React.useState<{ id: string; role: "agent" | "user"; content: string; time: string }[]>([
    {
      id: "welcome",
      role: "agent",
      content: initialMessage,
      time: formatTime(new Date()),
    },
  ]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        time: formatTime(new Date()),
      },
    ]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[420px] flex-col rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <header className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3">
        <Avatar className="size-10 shrink-0 rounded-full bg-orange-500 text-white">
          <AvatarFallback className="text-base font-semibold">
            {agent.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-foreground">{agent.name}</span>
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-xs font-medium",
                config.pillClass
              )}
            >
              {config.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {agent.role} · {agent.department}
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((msg) =>
            msg.role === "agent" ? (
              <div key={msg.id} className="flex gap-3">
                <Avatar className="size-8 shrink-0 rounded-full bg-orange-500 text-white">
                  <AvatarFallback className="text-sm font-semibold">
                    {agent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="rounded-2xl rounded-tl-sm bg-muted/80 px-4 py-2.5 text-sm text-foreground">
                    {msg.content}
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.time}</p>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] space-y-1 text-right">
                  <div className="rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {msg.content}
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.time}</p>
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef} aria-hidden="true" />
        </div>
      </div>

      {/* Input + disclaimer */}
      <div className="shrink-0 border-t border-border px-4 py-3">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${agent.name}...`}
            className="min-w-0 flex-1"
            aria-label={`Message ${agent.name}`}
          />
          <Button
            type="button"
            size="icon"
            className="shrink-0 bg-orange-500 hover:bg-orange-600"
            onClick={handleSend}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          This is a demo interface. In production, {agent.name} would connect to
          real business systems.
        </p>
      </div>
    </div>
  );
}
