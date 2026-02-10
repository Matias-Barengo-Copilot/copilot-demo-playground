import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminNav } from "./admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/signin?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/");

  return (
    <div
      data-theme="admin"
      className="flex min-h-screen flex-col bg-[var(--admin-bg)] text-[var(--admin-text)]"
    >
      <div className="flex flex-1">
        <aside className="sticky top-0 flex h-screen w-52 shrink-0 flex-col border-r border-[var(--admin-border)] bg-[var(--admin-card)] py-6">
          <nav className="flex flex-1 flex-col space-y-1 px-3">
            <Link
              href="/"
              className="flex flex-col items-center justify-center rounded-lg px-3 py-3 text-center text-[var(--admin-text)] hover:bg-[var(--admin-accent)] font-[var(--font-brand)] leading-tight"
              aria-label="Home"
            >
              <span className="block text-lg font-medium sm:text-base">Mountain View</span>
              <span className="block text-lg font-medium sm:text-base">Coffee</span>
            </Link>
            <div className="px-2 pb-2 pt-2">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Management
              </p>
            </div>
            <AdminNav />
          </nav>
        </aside>

        <main className="min-w-0 flex-1 py-6 px-4 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
