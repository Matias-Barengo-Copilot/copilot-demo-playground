"use client";

import Image from "next/image";
import { AppModal } from "@/components/app-modal";
import { Button } from "@/components/ui/button";
import type { DemoFromMock } from "@/lib/demos-mock";
import { ExternalLink } from "lucide-react";

type DemoDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  demo: DemoFromMock | null;
};

/**
 * Modal with demo details using the shared AppModal: image, scrollable content, and footer with external link.
 */
export function DemoDetailModal({
  open,
  onOpenChange,
  demo,
}: DemoDetailModalProps) {
  if (!demo) return null;

  const { title, description, narrative, url, imageUrl, tags } = demo;

  const media = (
    <div className="relative aspect-video w-full overflow-hidden">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 32rem"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-muted-foreground/40"
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
      footer={
        <Button asChild className="w-full gap-2 sm:w-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onOpenChange(false)}
          >
            <ExternalLink className="size-4" />
            Open in new tab
          </a>
        </Button>
      }
    >
      {tags && tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm text-foreground">{description}</p>
      {narrative && (
        <p className="mt-3 text-sm text-muted-foreground">{narrative}</p>
      )}
    </AppModal>
  );
}
