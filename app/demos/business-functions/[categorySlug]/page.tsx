import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { LANDING_CATEGORIES } from "@/lib/landing-categories";
import {
  getDemosForCategory,
  isValidCategoryId,
} from "@/lib/demos-mock";

type Props = { params: Promise<{ categorySlug: string }> };

function getCategoryBySlug(slug: string) {
  return LANDING_CATEGORIES.find((c) => c.id === slug);
}

export default async function BusinessFunctionCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  if (!isValidCategoryId(categorySlug)) notFound();

  const category = getCategoryBySlug(categorySlug);
  const demos = getDemosForCategory(categorySlug);

  return (
    <div>
      <Link
        href="/demos/business-functions"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Business Functions
      </Link>
      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {category?.title ?? categorySlug}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {category?.description}
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <Link
            key={demo.id}
            href={`/demos/business-functions/${categorySlug}/${demo.slug}`}
          >
            <Card className="h-full border-border bg-card transition-colors hover:bg-accent/50">
              <CardContent className="pt-4">
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
                <h2 className="font-semibold text-foreground">{demo.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {demo.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground/80">
                  {demo.narrative}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {demos.length === 0 && (
        <p className="mt-6 text-muted-foreground">
          No demos in this category yet. Add entries to the JSON mock for this category.
        </p>
      )}
    </div>
  );
}
