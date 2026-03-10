"use client";

import { useState } from "react";

type IntroModalProps = {
  title?: string;
  description?: string;
};

export default function IntroModal({
  title = "Explore the scene",
  description = "Drag to look around. Tap hotspots to open AI feature demos.",
}: IntroModalProps) {
  const [open, setOpen] = useState(true);

  if (!open) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute left-1/2 top-8 z-20 w-[92vw] max-w-md -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-900/95 p-4 text-white shadow-xl backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Welcome
          </p>
          <h3 className="mt-2 text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-zinc-300">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="pointer-events-auto rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300 transition hover:bg-white/10"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
