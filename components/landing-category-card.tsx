import Image from "next/image";
import Link from "next/link";
import type { LandingCategory } from "@/lib/landing-categories";
import { ArrowRight } from "lucide-react";

type LandingCategoryCardProps = {
  category: LandingCategory;
};

/**
 * Large card for the landing section: image area on top (placeholder if no image),
 * then title, description, demo count, and link. Ready for images when available.
 */
export function LandingCategoryCard({ category }: LandingCategoryCardProps) {
  const { title, description, href, demoCount, imageUrl } = category;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
      aria-label={`${title}, ${demoCount} demos available`}
    >
      {/* Image area: use image when available, otherwise placeholder */}
      <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            className="h-full w-full bg-muted/60"
            aria-hidden
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-4">
          <span className="text-sm text-muted-foreground">
            {demoCount === 0
              ? "No demos yet"
              : `${demoCount} demo${demoCount === 1 ? "" : "s"} available`}
          </span>
          <span className="flex shrink-0 items-center text-sm font-medium text-primary group-hover:underline">
            View
            <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
