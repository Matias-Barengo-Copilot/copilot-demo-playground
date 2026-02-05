import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LandingHeader } from "@/components/landing-header";
import { SiteFooter } from "@/components/site-footer";

export default async function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/signin?callbackUrl=/demos");

  const isAdmin = session.user.role === "admin";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingHeader user={session.user} isAdmin={isAdmin} />
      <main className="mx-auto flex-1 w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      <SiteFooter />
    </div>
  );
}
