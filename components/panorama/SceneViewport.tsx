"use client";

import { useRef, useState, useEffect } from "react";
import type { PointerEvent } from "react";
import Panorama360View from "./Panorama360View";
import DemoPanel from "./DemoPanel";
import IntroModal from "./IntroModal";
import type { PanoramaHotspot } from "@/lib/panorama-hotspots";
import { useSceneStore } from "@/store/useSceneStore";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

type SceneViewportProps = {
  debug?: boolean;
  imagePath?: string;
  hotspots?: PanoramaHotspot[];
  introTitle?: string;
  introDescription?: string;
};

export default function SceneViewport({
  debug = false,
  imagePath,
  hotspots = [],
  introTitle,
  introDescription,
}: SceneViewportProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [cursorInfo, setCursorInfo] = useState({ x: 0, y: 0 });

  const activeHotspotId = useSceneStore((state) => state.activeHotspotId);
  const currentHotspotIndex = useSceneStore(
    (state) => state.currentHotspotIndex
  );
  const setActiveHotspotWithIndex = useSceneStore(
    (state) => state.setActiveHotspotWithIndex
  );
  const openPanel = useSceneStore((state) => state.openPanel);
  const closePanel = useSceneStore((state) => state.closePanel);

  useEffect(() => {
    if (hotspots.length === 0) closePanel();
  }, [hotspots.length, closePanel]);

  /** Navigate to previous/next hotspot; camera is moved by Panorama360View via lookAt. */
  const handleNavigate = (direction: "prev" | "next") => {
    if (!hotspots.length) return;
    const length = hotspots.length;
    const currentIndex =
      currentHotspotIndex >= 0 && currentHotspotIndex < length
        ? currentHotspotIndex
        : -1;
    const nextIndex =
      currentIndex === -1
        ? direction === "next"
          ? 0
          : length - 1
        : direction === "next"
          ? (currentIndex + 1) % length
          : (currentIndex - 1 + length) % length;
    const nextSpot = hotspots[nextIndex];
    setActiveHotspotWithIndex(nextSpot.id, nextIndex);
    openPanel();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!debug || !viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    setCursorInfo({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const router = useRouter();

  return (
    <div
      ref={viewportRef}
      className="fixed inset-0 overflow-hidden bg-black"
      style={{ touchAction: "none" }}
      onPointerMove={handlePointerMove}
    >
      <Panorama360View imagePath={imagePath} hotspots={hotspots} />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <button
        type="button"
        onClick={() => router.push("/#360-images")}
        className="flex items-center gap-2 absolute top-6 left-6 z-20 rounded-full border border-white/20 bg-black/80 px-4 py-2 text-xs uppercase tracking-wider text-white/80"
      >
        <ChevronLeftIcon className="size-4" />
        Back
      </button>
      <IntroModal title={introTitle} description={introDescription} />
      <DemoPanel hotspots={hotspots} onNavigate={handleNavigate} />

      {debug && (
        <div className="pointer-events-none absolute left-6 top-6 z-20 rounded-xl border border-white/20 bg-black/80 px-4 py-2 text-xs uppercase tracking-wider text-white/80">
          <div>
            Cursor {cursorInfo.x.toFixed(0)}, {cursorInfo.y.toFixed(0)}
          </div>
          <div>360° mode</div>
        </div>
      )}
    </div>
  );
}
