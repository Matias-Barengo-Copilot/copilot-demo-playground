import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LandingHeader } from "@/components/landing-header";
import { SiteFooter } from "@/components/site-footer";
import { LandingCategoryCard } from "@/components/landing-category-card";
import { DigitalWorkforceSection } from "@/components/digital-workforce-section";
import { LANDING_CATEGORIES } from "@/lib/landing-categories";
import { getDemoCountForCategory } from "@/lib/demos-mock";

export default async function HomePage() {
  const session = await auth();
  if (!session?.user) redirect("/signin?callbackUrl=/");

  const isAdmin = session.user.role === "admin";

  const categoriesWithCount = LANDING_CATEGORIES.map((cat) => ({
    ...cat,
    demoCount: getDemoCountForCategory(cat.id),
  }));

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader user={session.user} isAdmin={isAdmin} />

      <main>
        {/* Hero */}
        <section className="border-b border-border bg-card/50">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              CoPilot Demo Portal
            </h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              All demos are contextualized in{" "}
              <strong className="text-foreground">Mountain View Coffee</strong>
              —a single story so every use case is easy to find and reuse for sales, partners, and execs.
            </p>
          </div>
        </section>

        {/* Large cards by function (2 columns, image-ready) */}
        <section
          id="business-functions"
          className="scroll-mt-20 mx-auto max-w-6xl px-4 py-16 sm:px-6"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Business Functions
          </h2>
          <p className="mt-3 text-lg font-normal text-muted-foreground">
            Explore AI capabilities across different areas of your business
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {categoriesWithCount.map((category) => (
              <LandingCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Digital Workforce — AI agents by area */}
        <DigitalWorkforceSection />
      </main>

      <SiteFooter />
    </div>
  );
}
