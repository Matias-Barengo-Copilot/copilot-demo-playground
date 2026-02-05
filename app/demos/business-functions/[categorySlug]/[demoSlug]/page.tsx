import Link from "next/link";
import { notFound } from "next/navigation";
import { getDemoBySlug, isValidCategoryId } from "@/lib/demos-mock";
import { LANDING_CATEGORIES } from "@/lib/landing-categories";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ categorySlug: string; demoSlug: string }>;
};

export default async function BusinessFunctionDemoPage({ params }: Props) {
  const { categorySlug, demoSlug } = await params;
  if (!isValidCategoryId(categorySlug)) notFound();

  const demo = getDemoBySlug(categorySlug, demoSlug);
  if (!demo) notFound();

  const category = LANDING_CATEGORIES.find((c) => c.id === categorySlug);

  return (
    <div>
      <Link
        href={`/demos/business-functions/${categorySlug}`}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← {category?.title ?? categorySlug}
      </Link>
      <div className="mt-6">
        {demo.tags && demo.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {demo.title}
        </h1>
        <p className="mt-2 text-muted-foreground">{demo.narrative}</p>
        <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
          <p className="text-muted-foreground">
            Embedded demo placeholder. Interactive experience will go here.
          </p>
          <Button asChild className="mt-4">
            <Link href={`/demos/business-functions/${categorySlug}`}>
              Back to list
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
