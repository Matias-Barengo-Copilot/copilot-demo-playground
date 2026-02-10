"use client";

import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Agent, AgentStatus } from "@/lib/agents";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  AgentStatus,
  { label: string; pillClass: string }
> = {
  active: {
    label: "Active",
    pillClass: "bg-emerald-500/20 text-emerald-400",
  },
  busy: {
    label: "Busy",
    pillClass: "bg-amber-500/20 text-amber-400",
  },
  offline: {
    label: "Offline",
    pillClass: "bg-zinc-600/80 text-zinc-400",
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
    <div className="flex h-full min-h-[420px] flex-col rounded-2xl border border-zinc-700 bg-linear-to-br from-zinc-800 to-zinc-900 shadow-xl">
      {/* Header */}
      <header className="flex shrink-0 items-center gap-4 border-b border-zinc-700 bg-zinc-800/50 px-5 py-4">
        <Avatar className="size-12 shrink-0 rounded-full border-2 border-white/20 bg-orange-500 text-white">
          <AvatarFallback className="text-lg font-semibold">
            {agent.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-semibold text-white">{agent.name}</span>
            <span
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium",
                config.pillClass
              )}
            >
              {config.label}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-zinc-400">
            {agent.role} · {agent.department}
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-5">
        <div className="space-y-5">
          {messages.map((msg) =>
            msg.role === "agent" ? (
              <div key={msg.id} className="flex gap-3">
                <Avatar className="size-9 shrink-0 rounded-full bg-orange-500 text-white">
                  <AvatarFallback className="text-sm font-semibold">
                    {agent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 text-sm text-zinc-100">
                    {msg.content}
                  </div>
                  <p className="text-xs text-zinc-500">{msg.time}</p>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] space-y-1 text-right">
                  <div className="rounded-2xl rounded-tr-sm bg-amber-500/90 px-4 py-3 text-sm text-white">
                    {msg.content}
                  </div>
                  <p className="text-xs text-zinc-500">{msg.time}</p>
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef} aria-hidden="true" />
        </div>
      </div>

      {/* Input + disclaimer */}
      <div className="shrink-0 border-t border-zinc-700 bg-zinc-800/30 px-5 py-4">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${agent.name}...`}
            className="min-w-0 flex-1 border-zinc-600 bg-zinc-800/50 text-white placeholder:text-zinc-500 focus-visible:ring-amber-500/50"
            aria-label={`Message ${agent.name}`}
          />
          <Button
            type="button"
            size="icon"
            className="size-11 shrink-0 bg-amber-500 text-white hover:bg-amber-600"
            onClick={handleSend}
            aria-label="Send message"
          >
            <Send className="size-5" />
          </Button>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          This is a demo interface. In production, {agent.name} would connect to
          real business systems.
        </p>
      </div>
    </div>
  );
}
