import { notFound } from "next/navigation";
import { LANDING_CATEGORIES } from "@/lib/landing-categories";
import {
  getDemosForCategory,
  isValidCategoryId,
} from "@/lib/demos-mock";
import { CategoryDemosGrid } from "@/components/category-demos-grid";
import { BackButton } from "@/components/back-button";

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
      <BackButton href="/#business-functions">Business Functions</BackButton>
      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {category?.title ?? categorySlug}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {category?.description}
        </p>
      </div>
      <div className="mt-8">
        {demos.length > 0 ? (
          <CategoryDemosGrid demos={demos} />
        ) : (
          <p className="text-muted-foreground">
            No demos in this category yet. Add entries to the JSON mock for this category.
          </p>
        )}
      </div>
    </div>
  );
}
