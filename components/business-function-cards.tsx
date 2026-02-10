"use client";

import { useState } from "react";
import Image from "next/image";
import { DemoDetailModal } from "@/components/demo-detail-modal";
import { getBusinessFunctionCardConfig } from "@/lib/business-function-cards-config";
import type { BusinessFunctionDemo } from "@/lib/demos-db";
import type { BusinessFunctionSlug } from "@/db/schema";
import type { LandingCategory } from "@/lib/landing-categories";

type BusinessFunctionCardsProps = {
  categories: LandingCategory[];
  demosByCategory: Record<BusinessFunctionSlug, BusinessFunctionDemo[]>;
};

export function BusinessFunctionCards({
  categories,
  demosByCategory,
}: BusinessFunctionCardsProps) {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<BusinessFunctionDemo | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const openDemo = (demo: BusinessFunctionDemo) => {
    setSelectedDemo(demo);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => {
          const slug = category.id as BusinessFunctionSlug;
          const demos = demosByCategory[slug] ?? [];
          const { icon: Icon, imageUrl } = getBusinessFunctionCardConfig(
            slug,
            category.imageUrl
          );
          const isFlipped = flippedId === category.id;

          return (
            <div
              key={category.id}
              className="relative h-96 perspective-1000"
              onMouseEnter={() => setFlippedId(category.id)}
              onMouseLeave={() => setFlippedId(null)}
            >
              <div
                className="relative w-full h-full transition-all duration-700 transform-style-3d"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front: image + overlay + icon + title */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden cursor-pointer">
                  <Image
                    src={imageUrl}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="text-white/90 mb-4">
                      <Icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl text-white">{category.title}</h3>
                  </div>
                </div>

                {/* Back: title + demo buttons */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-linear-to-br from-zinc-800 to-zinc-900 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl text-white mb-6">{category.title}</h3>
                  <div className="space-y-4">
                    {demos.length > 0 ? (
                      demos.map((demo) => (
                        <button
                          key={demo.id}
                          type="button"
                          onClick={() => openDemo(demo)}
                          className="w-full cursor-pointer text-left px-6 py-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white border border-white/10 hover:border-white/30"
                        >
                          {demo.title}
                        </button>
                      ))
                    ) : (
                      <p className="text-zinc-400 text-sm">
                        No demos in this category yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DemoDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        demo={selectedDemo}
      />
    </>
  );
}
