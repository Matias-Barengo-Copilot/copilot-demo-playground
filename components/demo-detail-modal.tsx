"use client";

import { useState } from "react";
import { AppModal } from "@/components/app-modal";
import { Button } from "@/components/ui/button";
import type { BusinessFunctionDemo } from "@/lib/demos-db";
import { ExternalLink, Loader2 } from "lucide-react";

type DemoDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  demo: BusinessFunctionDemo | null;
};

/**
 * Modal with demo details using the shared AppModal: image, scrollable content, and footer with external link.
 */
export function DemoDetailModal({
  open,
  onOpenChange,
  demo,
}: DemoDetailModalProps) {
  const [loadedImageIds, setLoadedImageIds] = useState<Set<string>>(() => new Set());

  if (!demo) return null;

  const { title, description, narrative, url, imageUrl, tags } = demo;
  const safeExternalUrl =
    url && (url.startsWith("http://") || url.startsWith("https://")) ? url : null;
  const imageLoaded = imageUrl ? loadedImageIds.has(demo.id) : true;

  const media = (
    <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
      {imageUrl ? (
        <>
          {!imageLoaded && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center text-zinc-400"
              aria-hidden
            >
              <Loader2 className="size-10 animate-spin" aria-label="Loading image" />
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            onLoad={() => setLoadedImageIds((prev) => new Set(prev).add(demo.id))}
          />
        </>
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-zinc-500"
          aria-hidden
        />
      )}
    </div>
  );

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      media={media}
      variant="dark"
      footer={
        safeExternalUrl ? (
          <Button
            asChild
            className="w-full gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
          >
            <a
              href={safeExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenChange(false)}
            >
              <ExternalLink className="size-4" />
              Open in new tab
            </a>
          </Button>
        ) : null
      }
    >
      {tags && tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm text-zinc-200">{description}</p>
      {narrative && (
        <p className="mt-3 text-sm text-zinc-400">{narrative}</p>
      )}
    </AppModal>
  );
}
