"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

export type AppModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Main title (required). */
  title: React.ReactNode;
  /** Optional short description below the title. */
  description?: React.ReactNode;
  /** Optional media slot (e.g. image) above the scrollable body. */
  media?: React.ReactNode;
  /** Scrollable body content. */
  children: React.ReactNode;
  /** Optional footer (e.g. actions). Rendered sticky at the bottom. */
  footer?: React.ReactNode;
  /** Extra class for the content container. */
  contentClassName?: string;
  /** Use dark theme (zinc/black) to match landing. */
  variant?: "default" | "dark";
  /** Accessibility: describe the dialog for screen readers. */
  "aria-describedby"?: string;
};

/**
 * Shared modal layout: header (title + close), optional media, scrollable body, optional footer.
 * Use this across the app for a consistent modal UI.
 */
const darkContentClasses =
  "border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-900 text-white shadow-xl";
const darkHeaderClasses =
  "flex flex-row items-start justify-between gap-4 border-b border-zinc-700 bg-zinc-800/50 px-5 py-4";
const darkMediaClasses = "shrink-0 overflow-hidden border-b border-zinc-700 bg-zinc-900/50";
const darkBodyClasses = "min-h-0 flex-1 px-5 py-4 text-zinc-200";
const darkFooterClasses =
  "shrink-0 border-t border-zinc-700 bg-zinc-800/50 px-5 py-4";
const darkCloseButtonClasses =
  "shrink-0 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30";
const darkTitleClasses = "text-left text-lg font-semibold tracking-tight text-white";
const darkDescriptionClasses = "text-left text-sm text-zinc-400";

export function AppModal({
  open,
  onOpenChange,
  title,
  description,
  media,
  children,
  footer,
  contentClassName,
  variant = "default",
  "aria-describedby": ariaDescribedBy,
}: AppModalProps) {
  const isDark = variant === "dark";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[90vh] w-full flex-col gap-0 p-0 sm:max-w-xl",
          isDark && darkContentClasses,
          contentClassName
        )}
        aria-describedby={ariaDescribedBy}
      >
        <DialogHeader
          className={cn(
            "flex flex-row items-start justify-between gap-4 border-b px-5 py-4",
            isDark ? darkHeaderClasses : "border-border bg-muted/20"
          )}
        >
          <div className="min-w-0 flex-1 space-y-1">
            <DialogTitle
              className={cn(
                "text-left text-lg font-semibold tracking-tight",
                isDark ? darkTitleClasses : "text-foreground"
              )}
            >
              {title}
            </DialogTitle>
            {description != null && (
              <DialogDescription
                className={cn(
                  "text-left text-sm",
                  isDark ? darkDescriptionClasses : "text-muted-foreground"
                )}
              >
                {description}
              </DialogDescription>
            )}
          </div>
          <DialogClose asChild>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "shrink-0 rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isDark
                  ? darkCloseButtonClasses
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              aria-label="Close"
            >
              <XIcon className="size-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        {media != null && (
          <div
            className={cn(
              "shrink-0 overflow-hidden border-b",
              isDark ? darkMediaClasses : "border-border bg-muted/30"
            )}
            data-slot="app-modal-media"
          >
            {media}
          </div>
        )}

        <DialogBody
          className={cn(
            "min-h-0 flex-1 px-5 py-4",
            isDark && darkBodyClasses
          )}
        >
          {children}
        </DialogBody>

        {footer != null && (
          <DialogFooter
            className={cn(
              "shrink-0 border-t px-5 py-4",
              isDark ? darkFooterClasses : "border-border bg-muted/20"
            )}
          >
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
