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
/** Duration in ms for smooth camera transition to a hotspot (viewer API). */
const LOOKAT_DURATION_MS = 800;
const INITIAL_HFOV = 85;

/** Ordered list of target coordinates for each hotspot (pitch, yaw in degrees). */
export type HotspotCoordinates = { pitch: number; yaw: number };

type Panorama360ViewProps = {
  imagePath?: string;
  hotspots?: PanoramaHotspot[];
};

export default function Panorama360View({
  imagePath = DEFAULT_PANORAMA_IMAGE,
  hotspots = [],
}: Panorama360ViewProps) {
  const viewerRef = useRef<{ lookAt: (...args: unknown[]) => void } | null>(
    null
  );
  const setActiveHotspotWithIndex = useSceneStore(
    (state) => state.setActiveHotspotWithIndex
  );
  const openPanel = useSceneStore((state) => state.openPanel);
  const activeHotspotId = useSceneStore((state) => state.activeHotspotId);

  /** Pending lookAt to run when viewer becomes ready (e.g. user clicked arrows before viewer loaded). */
  const pendingLookAtRef = useRef<{ pitch: number; yaw: number } | null>(null);

  const handleViewerReady = useCallback(
    (viewer: { lookAt: (...args: unknown[]) => void }) => {
      viewerRef.current = viewer;
      const pending = pendingLookAtRef.current;
      if (pending) {
        pendingLookAtRef.current = null;
        viewer.lookAt(
          pending.pitch,
          pending.yaw,
          undefined,
          LOOKAT_DURATION_MS
        );
      }
    },
    []
  );

  /** Ordered array of hotspot coordinates for navigation (same order as hotspots). */
  const hotspotCoordinates = useMemo<HotspotCoordinates[]>(
    () => hotspots.map((h) => getHotspotPitchYaw(h)),
    [hotspots]
  );

  /** When activeHotspotId changes (panel arrows or manual hotspot click), animate camera to that hotspot. */
  useEffect(() => {
    if (!activeHotspotId || !hotspots.length) return;
    const spot = hotspots.find((h) => h.id === activeHotspotId);
    if (!spot) return;
    const { pitch, yaw } = getHotspotPitchYaw(spot);

    if (viewerRef.current) {
      viewerRef.current.lookAt(pitch, yaw, undefined, LOOKAT_DURATION_MS);
    } else {
      pendingLookAtRef.current = { pitch, yaw };
    }
  }, [activeHotspotId, hotspots]);

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
