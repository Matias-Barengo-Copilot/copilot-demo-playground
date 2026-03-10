import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getHotspotsForSlug } from "@/lib/panorama-hotspots";
import { getPanoramaExperienceBySlug } from "@/lib/panorama-experiences";
import { Panorama360Client } from "./panorama-360-client";

type Props = { params: Promise<{ slug: string }> };

export default async function Panorama360Page({ params }: Props) {
  const { slug } = await params;
  const experience = getPanoramaExperienceBySlug(slug);
  if (!experience) notFound();

  const hotspots = getHotspotsForSlug(slug);

  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
      <Panorama360Client
        imagePath={experience.imagePath}
        hotspots={hotspots}
        introTitle={`Explore ${experience.title}`}
        introDescription="Drag to look around. Tap hotspots to open AI feature demos."
      />
    </Suspense>
  );
}
