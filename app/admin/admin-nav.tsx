"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Create users" },
  { href: "/admin/business-functions", label: "Business functions" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {navItems.map(({ href, label }) => {
        const isActive =
          href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--admin-text)] ${
              isActive ? "bg-[var(--admin-accent)]" : "hover:bg-[var(--admin-accent)]"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
