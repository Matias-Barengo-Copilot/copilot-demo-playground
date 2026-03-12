import Image from "next/image";
import Link from "next/link";
import type { PanoramaExperience } from "@/lib/panorama-experiences";

type PanoramaExperiencesSectionProps = {
  experiences: PanoramaExperience[];
};

export function PanoramaExperiencesSection({
  experiences,
}: PanoramaExperiencesSectionProps) {
  return (
    <section className="min-h-screen w-full bg-linear-to-b from-zinc-900 to-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="360-images" className="text-5xl md:text-6xl text-white mb-6">
            Experience in 360°
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Step into HR, Classroom, and Construction scenes. Drag to look
            around and tap hotspots to explore AI demos.
          </p>
        </div>

        <section className="flex w-full flex-wrap justify-center gap-10">
          {experiences.map((exp) => {
            const cardBody = (
              <>
                <div className="relative h-[250px] w-full overflow-hidden rounded-xl bg-zinc-800 shadow-xl">
                  <Image
                    src={exp.imageUrl}
                    alt={exp.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {exp.active && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <span className="rounded-full bg-white/90 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900 shadow-lg">
                        Enter Experience
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex w-full flex-col items-center gap-2 text-center">
                  <p className="text-lg font-medium text-white">{exp.title}</p>
                  <p className="text-sm text-zinc-400">{exp.description}</p>
                </div>
              </>
            );

            return exp.active ? (
              <Link
                key={exp.id}
                href={`/demos/360/${exp.slug}`}
                className="group flex basis-[320px] max-w-[320px] flex-col items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-zinc-900"
              >
                {cardBody}
              </Link>
            ) : (
              <div
                key={exp.id}
                className="flex basis-[320px] max-w-[320px] flex-col items-center gap-4 rounded-2xl p-4 opacity-75"
              >
                {cardBody}
              </div>
            );
          })}
        </section>

        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            The best ideas are brewed over coffee. And the best businesses?
            They&apos;re powered by AI that travels with every cup.
          </p>
        </div>
      </div>
    </section>
  );
}
