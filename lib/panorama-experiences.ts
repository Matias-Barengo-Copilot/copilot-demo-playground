/**
 * 360° panorama experiences — data for landing cards and viewer routes.
 * Aligned with main app patterns (lib-based config; can be moved to DB later).
 */

export type PanoramaExperienceSlug = "hr" | "classroom" | "construction";

export type PanoramaExperience = {
  id: string;
  slug: PanoramaExperienceSlug;
  title: string;
  description: string;
  /** Card thumbnail / hero image URL */
  imageUrl: string;
  /** Path for the 360 viewer (equirectangular image in public/) */
  imagePath: string;
  active: boolean;
};

const EXPERIENCES: PanoramaExperience[] = [
  {
    id: "hr",
    slug: "hr",
    title: "HR Experience",
    description:
      "Step into a smart HR office and explore how AI transforms hiring, onboarding, and employee support.",
    imageUrl: "/images/office-panorama.png",
    imagePath: "/images/office-panorama.png",
    active: true,
  },
  {
    id: "classroom",
    slug: "classroom",
    title: "Classroom",
    description:
      "Explore AI in education: smart classrooms, personalized learning, and real-time engagement.",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    imagePath: "/images/office-panorama.png",
    active: true,
  },
  {
    id: "construction",
    slug: "construction",
    title: "Construction Site",
    description:
      "Discover AI on site: safety monitoring, progress tracking, and resource optimization.",
    imageUrl: "/images/construction-panorama.png",
    imagePath: "/images/construction-panorama.png",
    active: true,
  },
];

export function getPanoramaExperiences(): PanoramaExperience[] {
  return EXPERIENCES.filter((e) => e.active);
}

export function getPanoramaExperienceBySlug(
  slug: string
): PanoramaExperience | null {
  const s = slug as PanoramaExperienceSlug;
  if (!["hr", "classroom", "construction"].includes(slug)) return null;
  return EXPERIENCES.find((e) => e.slug === s) ?? null;
}
