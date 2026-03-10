"use client";

import SceneViewport from "@/components/panorama/SceneViewport";
import type { PanoramaHotspot } from "@/lib/panorama-hotspots";

type Panorama360ClientProps = {
  imagePath: string;
  hotspots: PanoramaHotspot[];
  introTitle?: string;
  introDescription?: string;
};

export function Panorama360Client({
  imagePath,
  hotspots,
  introTitle,
  introDescription,
}: Panorama360ClientProps) {
  return (
    <SceneViewport
      imagePath={imagePath}
      hotspots={hotspots}
      introTitle={introTitle}
      introDescription={introDescription}
    />
  );
}
