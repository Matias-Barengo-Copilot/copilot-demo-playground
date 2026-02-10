"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DemoDetailModal } from "@/components/demo-detail-modal";
import type { BusinessFunctionDemo } from "@/lib/demos-db";
import { ExternalLink } from "lucide-react";

type CategoryDemosGridProps = {
  demos: BusinessFunctionDemo[];
};

export function CategoryDemosGrid({ demos }: CategoryDemosGridProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<BusinessFunctionDemo | null>(null);

  const openModal = (demo: BusinessFunctionDemo) => {
    setSelectedDemo(demo);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <button
            key={demo.id}
            type="button"
            onClick={() => openModal(demo)}
            className="cursor-pointer text-left"
            aria-label={`View details for ${demo.title}`}
          >
            <Card className="h-full border-border bg-card transition-colors hover:bg-accent/50 hover:shadow-md">
              <CardContent className="pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <ExternalLink className="size-3.5" aria-hidden />
                  View details
                </span>
                {demo.tags && demo.tags.length > 0 && (
                  <div className="mb-2 mt-1 flex flex-wrap gap-1.5">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="font-semibold text-foreground">{demo.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {demo.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground/80 line-clamp-2">
                  {demo.narrative}
                </p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>

      <DemoDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        demo={selectedDemo}
      />
    </>
  );
}
