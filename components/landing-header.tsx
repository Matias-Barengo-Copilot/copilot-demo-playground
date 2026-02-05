import Link from "next/link";
import { UserMenu } from "@/components/user-menu";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type LandingHeaderProps = {
  user: User;
  isAdmin?: boolean;
};

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Business Functions", href: "/demos/business-functions" },
  { label: "AI Agents", href: "/demos/ai-agents" },
  { label: "Industry", href: "/demos/industry" },
] as const;

export function LandingHeader({
  user,
  isAdmin = false,
}: LandingHeaderProps) {
  return (
    <>
      {/* Main header */}
      <header className="sticky top-0 z-50 border-b border-border bg-header shadow-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            Demo Portal
          </Link>

          {/* Center nav — hidden on small screens, visible from md */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm font-medium text-foreground/90 transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: User menu (Admin link inside dropdown for admins) */}
          <UserMenu user={user} isAdmin={isAdmin} />
        </nav>
      </header>
    </>
  );
}
