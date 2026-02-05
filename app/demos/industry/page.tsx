import { INDUSTRY_DEMOS } from "@/lib/demo-catalog";
import { ExternalDemoLink } from "@/components/external-demo-link";

export default function IndustryPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Industry use cases
        </h1>
        <p className="mt-2 text-muted-foreground">
          Real-world demos by industry. Each card links to an external site—you’ll leave this portal when you click.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRY_DEMOS.map((demo) => (
          <ExternalDemoLink key={demo.id} demo={demo} />
        ))}
      </div>
    </div>
  );
}
