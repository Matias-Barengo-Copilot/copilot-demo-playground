/**
 * Hotspot data for 360° panorama scenes (pitch/yaw for Pannellum viewer).
 * Reused from fakeit reference; can be moved to DB or JSON when needed.
 */

/** Convert normalized image coords [0,1] to panorama yaw (degrees). */
export function xToYaw(x: number): number {
  return (x - 0.5) * 360;
}
/** Convert normalized image coords [0,1] to panorama pitch (degrees). */
export function yToPitch(y: number): number {
  return (0.5 - y) * 180;
}

export type PanoramaHotspot = {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  pitch?: number;
  yaw?: number;
  media?: string;
};

/** Get pitch/yaw in degrees for a hotspot (uses explicit values or derives from x,y). */
export function getHotspotPitchYaw(h: PanoramaHotspot): {
  pitch: number;
  yaw: number;
} {
  return {
    pitch: h.pitch ?? yToPitch(h.y),
    yaw: h.yaw ?? xToYaw(h.x),
  };
}

/** HR office 360° scene hotspots. */
export const hrHotspots: PanoramaHotspot[] = [
  {
    id: "resume-ai",
    title: "Resume AI",
    description: "Resume AI",
    x: 0.05,
    y: 0.65,
    media: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: "interview-ai",
    title: "Interview AI",
    description: "Interview AI",
    x: 0.24,
    y: 0.6,
    media: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "analytics-ai",
    title: "Analytics AI",
    description: "Analytics AI",
    x: 0.505,
    y: 0.59,
    media: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
  {
    id: "helpdesk-ai",
    title: "Helpdesk AI",
    description: "Helpdesk AI",
    x: 0.75,
    y: 0.58,
    media: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "onboarding-ai",
    title: "Onboarding AI",
    description: "Onboarding AI",
    x: 0.87,
    y: 0.63,
    media: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  },
];

/** Classroom 360° scene (placeholder until scene-specific image/hotspots exist). */
export const classroomHotspots: PanoramaHotspot[] = [];

/** Construction 360° scene (placeholder until scene-specific image/hotspots exist). */
export const constructionHotspots: PanoramaHotspot[] = [
  {
    id: "drone-monitoring",
    title: "Drone Monitoring",
    description: "AI drone monitoring for construction progress and safety.",
    x: 0.155,
    y: 0.30,
  },
  {
    id: "safety-camera",
    title: "Safety Camera",
    description: "Computer vision safety monitoring for workers and hazards.",
    x: 0.083,
    y: 0.455
  },
  {
    id: "blueprint-tablet",
    title: "Blueprint Tablet",
    description: "Interactive blueprint analysis and AI planning tools.",
    x: 0.50,
    y: 0.60,
  },
  {
    id: "estimate-ai",
    title: "Estimate AI",
    description: "AI-powered construction cost estimation and planning.",
    x: 0.65,
    y: 0.58,
  },
  {
    id: "equipment-optimization",
    title: "Equipment Optimization",
    description: "Optimize machinery and equipment usage with AI.",
    x: 0.83,
    y: 0.53,
  },
  {
    id: "material-tracking",
    title: "Material Tracking",
    description: "Track construction materials and deliveries automatically.",
    x: 0.95,
    y: 0.60,
  },
  {
    id: "project-dashboard",
    title: "Project Dashboard",
    description: "Centralized AI dashboard for project monitoring.",
    x: 0.93,
    y: 0.48,
  },
];

export function getHotspotsForSlug(
  slug: string
): PanoramaHotspot[] {
  switch (slug) {
    case "hr":
      return hrHotspots;
    case "classroom":
      return classroomHotspots;
    case "construction":
      return constructionHotspots;
    default:
      return [];
  }
}
