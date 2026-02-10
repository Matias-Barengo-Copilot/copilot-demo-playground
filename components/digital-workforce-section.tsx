import { AIWorkforceCards } from "@/components/ai-workforce-cards";

type DigitalWorkforceSectionProps = {
  darkBackground?: boolean;
};

export function DigitalWorkforceSection({ darkBackground = false }: DigitalWorkforceSectionProps) {
  return (
    <section
      id="digital-workforce"
      className={`scroll-mt-20 ${darkBackground ? "bg-linear-to-b from-zinc-950 to-zinc-900 py-24 px-6" : "border-t border-border bg-muted/30 py-12"}`}
    >
      <div className={darkBackground ? "max-w-7xl mx-auto" : "mx-auto max-w-6xl px-4 sm:px-6"}>
        <div className="text-center mb-16">
          <h2
            className={
              darkBackground
                ? "text-5xl md:text-6xl text-white mb-6"
                : "text-2xl font-bold tracking-tight sm:text-3xl text-foreground mb-2"
            }
          >
            Meet Our AI Workforce
          </h2>
          <p
            className={
              darkBackground
                ? "text-xl text-zinc-400 max-w-2xl mx-auto"
                : "mt-2 text-muted-foreground"
            }
          >
            The team that keeps everything running, 24/7.
          </p>
        </div>

        <AIWorkforceCards />
      </div>
    </section>
  );
}
