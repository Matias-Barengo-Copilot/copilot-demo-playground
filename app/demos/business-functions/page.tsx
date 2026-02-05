import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LANDING_CATEGORIES } from "@/lib/landing-categories";
import { getDemoCountForCategory } from "@/lib/demos-mock";
import { ArrowRight } from "lucide-react";

export default function BusinessFunctionsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Business Functions
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore AI capabilities across different areas of your business.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LANDING_CATEGORIES.map((cat) => {
          const count = getDemoCountForCategory(cat.id);
          return (
            <Link key={cat.id} href={cat.href}>
              <Card className="h-full border-border bg-card transition-colors hover:bg-accent/50">
                <CardContent className="pt-4">
                  <h2 className="font-semibold text-foreground">{cat.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {cat.description}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {count} demo{count === 1 ? "" : "s"} available
                  </p>
                  <span className="mt-2 inline-flex items-center text-sm font-medium text-primary">
                    View demos
                    <ArrowRight className="ml-1 size-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
