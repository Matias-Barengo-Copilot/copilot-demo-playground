"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getInitials(user: { name?: string | null; email?: string | null }): string {
  if (user.name) {
    const parts = user.name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return user.name.slice(0, 2).toUpperCase();
  }
  if (user.email) return user.email.slice(0, 2).toUpperCase();
  return "?";
}

export function UserAvatarMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  if (status !== "authenticated" || !session?.user) return null;

  const user = session.user;
  const isAdmin = user.role === "admin";

  return (
    <div
      ref={containerRef}
      className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6"
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-11 rounded-full border-2 border-white/20 bg-amber-500 p-0 text-white shadow-lg hover:bg-amber-600 hover:text-white focus-visible:ring-amber-600/30"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close account menu" : "Open account menu"}
        aria-expanded={open}
      >
        <Avatar className="size-full rounded-full border-0">
          <AvatarImage src={user.image ?? undefined} alt="" className="object-cover" />
          <AvatarFallback className="rounded-full bg-transparent text-sm font-medium text-white">
            {getInitials(user)}
          </AvatarFallback>
        </Avatar>
      </Button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
          role="menu"
          aria-label="Account menu"
        >
          <div className="flex items-start justify-between gap-2 px-2 py-1.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name ?? user.email ?? "User"}</p>
              {user.email && (
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 shrink-0"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="my-1 h-px bg-border" />
          {isAdmin && (
            <Link href="/admin" className="block" onClick={() => setOpen(false)}>
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <Settings className="size-4 shrink-0" />
                Admin
              </Button>
            </Link>
          )}
          <Button
            type="button"
            variant="destructive"
            className="w-full justify-start gap-2"
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/signin" });
            }}
          >
            <LogOut className="size-4 shrink-0" />
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
