"use client";

import { useActionState } from "react";
import { createUser } from "./actions";
import { userRoleEnum } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState = {} as { error?: string; success?: string };

export function CreateUserForm() {
  const [state, formAction] = useActionState(createUser, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="text-[var(--admin-text)]"
        >
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="user@example.com"
          className="border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-muted)] focus-visible:ring-[var(--admin-primary)]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[var(--admin-text)]">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Optional"
          className="border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-muted)] focus-visible:ring-[var(--admin-primary)]"
        />
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="role"
          className="text-[var(--admin-text)]"
        >
          Role <span className="text-destructive">*</span>
        </Label>
        <NativeSelect
          id="role"
          name="role"
          required
          className="w-full border-[var(--admin-border)] bg-[var(--admin-card)] text-[var(--admin-text)] focus-visible:ring-[var(--admin-primary)]"
        >
          {userRoleEnum.enumValues.map((role) => (
            <NativeSelectOption key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      {state?.error && (
        <Alert variant="destructive" role="alert">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      {state?.success && (
        <Alert role="status" className="border-emerald-200 bg-emerald-50 text-emerald-900">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{state.success}</AlertDescription>
        </Alert>
      )}
      <Button
        type="submit"
        className="bg-[var(--admin-primary)] text-[var(--admin-primary-foreground)] hover:opacity-90"
      >
        Create user
      </Button>
    </form>
  );
}
