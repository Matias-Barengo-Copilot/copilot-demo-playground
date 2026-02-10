"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { getAgents } from "@/lib/agents";
import { getAgentDisplayConfig } from "@/lib/ai-workforce-display";
import type { Agent } from "@/lib/agents";

export function AIWorkforceCards() {
  const agents = getAgents();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent) => {
          const display = getAgentDisplayConfig(agent.slug);
          const isHovered = hoveredId === agent.id;

          return (
            <div
              key={agent.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(agent.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedAgent(agent)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-800">
                <Image
                  src={display.imageUrl}
                  alt={agent.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

                {/* Name and role - always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl text-white mb-1">{agent.name}</h3>
                  <p className="text-lg text-zinc-300">{agent.role}</p>
                </div>

                {/* Capabilities - shown on hover */}
                <div
                  className={`absolute inset-0 bg-black/95 flex items-center justify-center p-6 transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center">
                    <h3 className="text-2xl text-white mb-4">{agent.name}</h3>
                    <div className="space-y-2">
                      {display.capabilities.map((cap, index) => (
                        <div
                          key={index}
                          className="text-sm text-zinc-300 px-4 py-2 bg-white/10 rounded-lg"
                        >
                          {cap}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-zinc-400 mt-4">Click to interact</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: greeting + action buttons that link to agent chat */}
      {selectedAgent && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="agent-modal-title"
        >
          <div className="bg-linear-to-br from-zinc-800 to-zinc-900 rounded-2xl max-w-2xl w-full p-8 relative border border-zinc-700 shadow-xl">
            <button
              type="button"
              onClick={() => setSelectedAgent(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-start gap-6 mb-8">
              <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden bg-zinc-700">
                <Image
                  src={getAgentDisplayConfig(selectedAgent.slug).imageUrl}
                  alt={selectedAgent.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                <h3
                  id="agent-modal-title"
                  className="text-3xl text-white mb-2"
                >
                  {selectedAgent.name}
                </h3>
                <p className="text-lg text-zinc-300 mb-4">
                  {selectedAgent.role}
                </p>
                <p className="text-zinc-400">
                  {selectedAgent.welcomeMessage ?? `Hi, I'm ${selectedAgent.name}. How can I help?`}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {getAgentDisplayConfig(selectedAgent.slug).actions.map(
                (action, index) => (
                  <Link
                    key={index}
                    href={`/demos/ai-agents/${selectedAgent.slug}`}
                    onClick={() => setSelectedAgent(null)}
                    className="block w-full text-left px-6 py-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white border border-white/10 hover:border-white/30 text-lg"
                  >
                    {action}
                  </Link>
                )
              )}
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setSelectedAgent(null)}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
