"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import NavigationArrows from "./NavigationArrows";
import type { PanoramaHotspot } from "@/lib/panorama-hotspots";
import { useSceneStore } from "@/store/useSceneStore";

type DemoPanelProps = {
  onNavigate: (direction: "prev" | "next") => void;
  hotspots?: PanoramaHotspot[];
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export default function DemoPanel({
  onNavigate,
  hotspots = [],
}: DemoPanelProps) {
  const panelOpen = useSceneStore((state) => state.panelOpen);
  const activeHotspotId = useSceneStore((state) => state.activeHotspotId);
  const closePanel = useSceneStore((state) => state.closePanel);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const activeHotspot = useMemo(
    () => hotspots.find((spot) => spot.id === activeHotspotId) ?? null,
    [activeHotspotId, hotspots]
  );

  const slideFrom = isMobile
    ? { x: 0, y: "100%" }
    : { x: "100%", y: 0 };

  return (
    <AnimatePresence>
      {panelOpen && activeHotspot && (
        <motion.aside
          initial={slideFrom}
          animate={{ x: 0, y: 0 }}
          exit={slideFrom}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-30 flex h-[48vh] w-full flex-col gap-5 rounded-t-3xl border border-white/10 bg-zinc-900/95 p-6 text-white shadow-xl backdrop-blur md:bottom-auto md:left-auto md:top-0 md:h-full md:w-[420px] md:rounded-none md:border-l"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Demo Panel
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {activeHotspot.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={closePanel}
              className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-300 transition hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <p className="text-sm leading-6 text-zinc-300">
            {activeHotspot.description}
          </p>

          {activeHotspot.media && (
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
              <ReactPlayer
                src={activeHotspot.media}
                width="100%"
                height="100%"
                controls
              />
            </div>
          )}

          <div className="mt-auto flex items-center justify-between">
            <NavigationArrows
              onPrev={() => onNavigate("prev")}
              onNext={() => onNavigate("next")}
            />
            <p className="text-xs text-zinc-500">Drag the scene anytime</p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
