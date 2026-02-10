import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BusinessFunctionDemoForm } from "../business-function-demo-form";

export default function AdminBusinessFunctionsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--admin-text)]">
          Business functions
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
          Add demos to the &quot;How This Business Runs&quot; section. Each demo appears on the flip card of the chosen category.
        </p>
      </div>
      <Card className="border-[var(--admin-border)] bg-[var(--admin-card)] shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-[var(--admin-text)]">
            New business function demo
          </CardTitle>
          <CardDescription className="text-[var(--admin-text-muted)]">
            Fill in the required fields. The demo will show in the landing section for the selected category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessFunctionDemoForm />
        </CardContent>
      </Card>
    </div>
  );
}
