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
  /** Accessibility: describe the dialog for screen readers. */
  "aria-describedby"?: string;
};

/**
 * Shared modal layout: header (title + close), optional media, scrollable body, optional footer.
 * Use this across the app for a consistent modal UI.
 */
export function AppModal({
  open,
  onOpenChange,
  title,
  description,
  media,
  children,
  footer,
  contentClassName,
  "aria-describedby": ariaDescribedBy,
}: AppModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[90vh] w-full flex-col gap-0 p-0 sm:max-w-xl",
          contentClassName
        )}
        aria-describedby={ariaDescribedBy}
      >
        <DialogHeader className="flex flex-row items-start justify-between gap-4 border-b border-border bg-muted/20 px-5 py-4">
          <div className="min-w-0 flex-1 space-y-1">
            <DialogTitle className="text-left text-lg font-semibold tracking-tight text-foreground">
              {title}
            </DialogTitle>
            {description != null && (
              <DialogDescription className="text-left text-sm text-muted-foreground">
                {description}
              </DialogDescription>
            )}
          </div>
          <DialogClose asChild>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close"
            >
              <XIcon className="size-5" />
            </button>
          </DialogClose>
        </DialogHeader>

        {media != null && (
          <div
            className="shrink-0 overflow-hidden border-b border-border bg-muted/30"
            data-slot="app-modal-media"
          >
            {media}
          </div>
        )}

        <DialogBody className="min-h-0 flex-1 px-5 py-4">{children}</DialogBody>

        {footer != null && (
          <DialogFooter className="shrink-0 border-t border-border bg-muted/20 px-5 py-4">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
