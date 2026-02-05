import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { UserMenu } from "@/components/user-menu";
import { BackButton } from "@/components/back-button";

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
      <header className="sticky top-0 z-10 border-b border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm">
        <nav className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <BackButton
              href="/"
              className="shrink-0 text-[var(--admin-text-muted)] hover:bg-[var(--admin-accent)] hover:text-[var(--admin-text)]"
            >
              Home
            </BackButton>
            <span className="hidden text-[var(--admin-text-muted)] sm:inline" aria-hidden>
              |
            </span>
            <span className="truncate text-sm font-medium text-[var(--admin-text)] sm:inline">
              Admin
            </span>
          </div>
          <div className="shrink-0">
            <UserMenu user={session.user} isAdmin />
          </div>
        </nav>
      </header>

      <div className="flex flex-1">
        <aside className="sticky top-[var(--header-height)] flex h-[calc(100vh-var(--header-height))] w-52 shrink-0 flex-col border-r border-[var(--admin-border)] bg-[var(--admin-card)] py-6">
          <div className="px-4 pb-3">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
              Management
            </p>
          </div>
          <nav className="flex-1 space-y-0.5 px-3">
            <Link
              href="/admin"
              className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--admin-text)] bg-[var(--admin-accent)]"
            >
              Create users
            </Link>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 py-6 px-4 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
