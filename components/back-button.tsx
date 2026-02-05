"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Shared back button for navigation. Use across the app where a link to the previous level is needed.
 */
export function BackButton({ href, children, className }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "group -ml-2 text-muted-foreground hover:text-foreground hover:bg-muted/60",
        "focus-visible:ring-ring/50",
        className
      )}
      asChild
    >
      <Link href={href} className="inline-flex items-center gap-2">
        <ArrowLeft
          className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5"
          aria-hidden
        />
        <span>{children}</span>
      </Link>
    </Button>
  );
}
