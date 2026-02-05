import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignInButton } from "./sign-in-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/");

  const { callbackUrl } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Access only with an authorized account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInButton callbackUrl={callbackUrl ?? "/"} />
          <p className="text-center text-xs text-muted-foreground">
            <Button variant="link" className="p-0 text-xs" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
