"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useEffect } from "react";
import { getHotspotPitchYaw } from "@/lib/panorama-hotspots";
import type { PanoramaHotspot } from "@/lib/panorama-hotspots";
import { useSceneStore } from "@/store/useSceneStore";

import "react-pannellum-next/dist/index.css";

const PanoramaViewer = dynamic(
  () => import("react-pannellum-next").then((mod) => mod.PanoramaViewer),
  { ssr: false }
);

const DEFAULT_PANORAMA_IMAGE = "/images/office-panorama.png";
const LOOKAT_DURATION_MS = 800;
const INITIAL_HFOV = 85;

/** Ordered list of target coordinates for each hotspot (pitch, yaw in degrees). */
export type HotspotCoordinates = { pitch: number; yaw: number };

/** Imperative handle: move camera to pitch/yaw. Set by Panorama360View when viewer is ready. */
export type PanoramaViewerControlRef = {
  moveTo: (pitch: number, yaw: number) => void;
};

type Panorama360ViewProps = {
  imagePath?: string;
  hotspots?: PanoramaHotspot[];
  /** Optional ref so parent can call moveTo(pitch, yaw) when arrows are clicked. */
  viewerControlRef?: React.MutableRefObject<PanoramaViewerControlRef | null>;
};

export default function Panorama360View({
  imagePath = DEFAULT_PANORAMA_IMAGE,
  hotspots = [],
  viewerControlRef,
}: Panorama360ViewProps) {
  const viewerRef = useRef<{
    lookAt?: (...args: unknown[]) => void;
    setPitch?: (pitch: number, animated?: number | boolean) => void;
    setYaw?: (yaw: number, animated?: number | boolean) => void;
  } | null>(null);
  const setActiveHotspotWithIndex = useSceneStore(
    (state) => state.setActiveHotspotWithIndex
  );
  const openPanel = useSceneStore((state) => state.openPanel);
  const activeHotspotId = useSceneStore((state) => state.activeHotspotId);

  const pendingLookAtRef = useRef<{ pitch: number; yaw: number } | null>(null);

  const moveTo = useCallback((pitch: number, yaw: number) => {
    const v = viewerRef.current;
    if (!v) {
      pendingLookAtRef.current = { pitch, yaw };
      return;
    }
    if (typeof v.lookAt === "function") {
      v.lookAt(pitch, yaw, undefined, LOOKAT_DURATION_MS);
      return;
    }
    if (typeof v.setPitch === "function" && typeof v.setYaw === "function") {
      v.setPitch(pitch, LOOKAT_DURATION_MS);
      v.setYaw(yaw, LOOKAT_DURATION_MS);
      return;
    }
  }, []);

  useEffect(() => {
    if (viewerControlRef) viewerControlRef.current = { moveTo };
    return () => {
      if (viewerControlRef) viewerControlRef.current = null;
    };
  }, [viewerControlRef, moveTo]);

  const handleViewerReady = useCallback(
    (viewer: { lookAt?: (...args: unknown[]) => void }) => {
      viewerRef.current = viewer;
      const pending = pendingLookAtRef.current;
      if (pending) {
        pendingLookAtRef.current = null;
        moveTo(pending.pitch, pending.yaw);
      }
    },
    [moveTo]
  );

  const prevActiveIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (!activeHotspotId || !hotspots.length) return;
    const spot = hotspots.find((h) => h.id === activeHotspotId);
    if (!spot) return;
    const { pitch, yaw } = getHotspotPitchYaw(spot);
    if (prevActiveIdRef.current === activeHotspotId) return;
    prevActiveIdRef.current = activeHotspotId;
    moveTo(pitch, yaw);
  }, [activeHotspotId, hotspots, moveTo]);

  const handleHotspotClick = useCallback(
    (_e: unknown, args: unknown) => {
      const id = args as string;
      const index = hotspots.findIndex((h) => h.id === id);
      setActiveHotspotWithIndex(id, index >= 0 ? index : -1);
      openPanel();
    },
    [hotspots, setActiveHotspotWithIndex, openPanel]
  );

  const pannellumHotSpots = useMemo(
    () =>
      hotspots.map((h) => {
        const { pitch, yaw } = getHotspotPitchYaw(h);
        return {
          pitch,
          yaw,
          type: "info" as const,
          text: h.title,
          cssClass: "panorama-hotspot",
          onClick: handleHotspotClick,
          clickHandlerArgs: h.id,
        };
      }),
    [handleHotspotClick, hotspots]
  );

  return (
    <div className="absolute inset-0">
      <PanoramaViewer
        imagePath={imagePath}
        hotSpots={pannellumHotSpots}
        autoLoad
        initialHfov={INITIAL_HFOV}
        width="100%"
        height="100%"
        onViewerReady={handleViewerReady}
      />
    </div>
  );
}
