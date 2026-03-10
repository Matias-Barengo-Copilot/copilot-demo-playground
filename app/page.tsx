import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Hero } from "@/components/hero";
import { BusinessFunctionCards } from "@/components/business-function-cards";
import { DigitalWorkforceSection } from "@/components/digital-workforce-section";
import { LANDING_CATEGORIES } from "@/lib/landing-categories";
import {
  getDemoCountsForAllCategories,
  getDemosForAllCategories,
} from "@/lib/demos-db";
import { getPanoramaExperiences } from "@/lib/panorama-experiences";
import { PanoramaExperiencesSection } from "@/components/panorama-experiences-section";

export default async function HomePage() {
  const session = await auth();
  if (!session?.user) redirect("/signin?callbackUrl=/");

  const [counts, demosByCategory] = await Promise.all([
    getDemoCountsForAllCategories(),
    getDemosForAllCategories(),
  ]);
  const panoramaExperiences = getPanoramaExperiences();
  const categoriesWithCount = LANDING_CATEGORIES.map((cat) => ({
    ...cat,
    demoCount: counts[cat.id] ?? 0,
  }));

  return (
    <div
      className="dark min-h-screen w-full bg-black"
    >
      <Hero />

      <main>
        {/* Quote section — gradient from Figma: from-black to-zinc-900 */}
        <section
          className="relative w-full py-32 px-6 bg-linear-to-b from-black to-zinc-900"
          aria-label="Quote"
        >
          <div className="max-w-5xl mx-auto">
            <div className="relative text-center">
              <blockquote className="text-3xl md:text-4xl lg:text-5xl text-white/90 italic leading-relaxed mb-8">
                &ldquo;In a bustling café, data flows like espresso. But how do you harness the chaos?&rdquo;
              </blockquote>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
                The best systems are the ones you don&apos;t notice. See how each part of the business runs smoothly behind the scenes.
              </p>
            </div>
          </div>
        </section>

        {/* How Things Work — gradient from Figma: from-zinc-900 to-zinc-950, full width */}
        <section
          id="business-functions"
          className="relative w-full bg-linear-to-b from-zinc-900 to-zinc-950 scroll-mt-20 py-24"
        >
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl text-white mb-6">
                How This Business Runs
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                From hiring to serving, every part of the operation runs smoothly.
              </p>
            </div>
            <BusinessFunctionCards
              categories={categoriesWithCount}
              demosByCategory={demosByCategory}
            />
          </div>
        </section>

        {/* Digital Workforce — AI agents by area */}
        <DigitalWorkforceSection darkBackground />

        {/* 360° experience cards — replace former "Customers in the Café" */}
        <PanoramaExperiencesSection experiences={panoramaExperiences} />
      </main>
    </div>
  );
}
