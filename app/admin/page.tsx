import { CreateUserForm } from "./create-user-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--admin-text)]">
          Create users
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
          Add team members with an email and role. They’ll be able to sign in with Google.
        </p>
      </div>
      <Card className="border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-[var(--admin-text)]">New user</CardTitle>
          <CardDescription className="text-[var(--admin-text-muted)]">
            Fill in the required fields to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateUserForm />
        </CardContent>
      </Card>
    </div>
  );
}
