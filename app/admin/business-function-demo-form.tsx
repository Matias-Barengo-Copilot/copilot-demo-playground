"use client";

import { useActionState, useState, useRef } from "react";
import { createBusinessFunctionDemo } from "./actions";
import { LANDING_CATEGORIES } from "@/lib/landing-categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Upload } from "lucide-react";

const inputClasses =
  "border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-muted)] focus-visible:ring-[var(--admin-primary)]";

const initialState = {} as { error?: string; success?: string };

export function BusinessFunctionDemoForm() {
  const [state, formAction] = useActionState(
    createBusinessFunctionDemo,
    initialState
  );
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="businessFunctionSlug" className="text-[var(--admin-text)]">
          Category <span className="text-destructive">*</span>
        </Label>
        <NativeSelect
          id="businessFunctionSlug"
          name="businessFunctionSlug"
          required
          className={`w-full ${inputClasses}`}
        >
          {LANDING_CATEGORIES.map((cat) => (
            <NativeSelectOption key={cat.id} value={cat.id}>
              {cat.title}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-[var(--admin-text)]">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          type="text"
          required
          placeholder="e.g. Resume screening"
          maxLength={500}
          className={inputClasses}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-[var(--admin-text)]">
          Description <span className="text-destructive">*</span>
        </Label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          placeholder="Short description shown on the card and in the modal."
          maxLength={2000}
          className={`flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${inputClasses}`}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="narrative" className="text-[var(--admin-text)]">
          Narrative <span className="text-destructive">*</span>
        </Label>
        <textarea
          id="narrative"
          name="narrative"
          required
          rows={4}
          placeholder="Context or story for this demo (e.g. why it matters for Mountain View Coffee)."
          maxLength={2000}
          className={`flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${inputClasses}`}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url" className="text-[var(--admin-text)]">
          External URL
        </Label>
        <Input
          id="url"
          name="url"
          type="url"
          placeholder="https://..."
          maxLength={2048}
          className={inputClasses}
        />
        <p className="text-xs text-[var(--admin-text-muted)]">
          Optional. Link opened from the demo modal.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-[var(--admin-text)]">
          Modal image
        </Label>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            placeholder="https://... or upload below"
            maxLength={2048}
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setUploadError(null);
            }}
            className={inputClasses}
          />
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploadError(null);
                setUploading(true);
                try {
                  const form = new FormData();
                  form.append("file", file);
                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: form,
                  });
                  const data = await res.json();
                  if (!res.ok) {
                    setUploadError(data.error ?? "Upload failed");
                    return;
                  }
                  const base = typeof window !== "undefined" ? window.location.origin : "";
                  setImageUrl(data.url.startsWith("http") ? data.url : `${base}${data.url}`);
                } catch {
                  setUploadError("Upload failed");
                } finally {
                  setUploading(false);
                  e.target.value = "";
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="shrink-0 border-[var(--admin-border)]"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <Upload className="size-4" aria-hidden />
              )}
              <span className="ml-1.5">{uploading ? "Uploading…" : "Upload"}</span>
            </Button>
          </div>
        </div>
        {uploadError && (
          <p className="text-xs text-destructive" role="alert">
            {uploadError}
          </p>
        )}
        <p className="text-xs text-[var(--admin-text-muted)]">
          Optional. URL or upload an image (JPEG, PNG, GIF, WebP, max 5MB) for the demo modal.
        </p>
      </div>

      {state?.error && (
        <Alert variant="destructive" role="alert">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      {state?.success && (
        <Alert
          role="status"
          className="border-emerald-200 bg-emerald-50 text-emerald-900"
        >
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{state.success}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="bg-[var(--admin-primary)] text-[var(--admin-primary-foreground)] hover:opacity-90"
      >
        Add demo
      </Button>
    </form>
  );
}
