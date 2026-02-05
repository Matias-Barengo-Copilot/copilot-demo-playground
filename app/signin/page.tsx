import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignInButton } from "./sign-in-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const SIGNIN_ERROR_MESSAGES: Record<string, string> = {
  OAuthSignin: "There was a problem starting the sign-in process. Please try again.",
  OAuthCallback: "There was a problem completing sign-in. Please try again.",
  OAuthCreateAccount: "Could not create an account. Please try again.",
  EmailCreateAccount: "Could not create an account. Please try again.",
  Callback: "There was a problem completing sign-in. Please try again.",
  OAuthAccountNotLinked: "This email is already linked to another sign-in method. Use the same method you used originally.",
  EmailSignin: "Could not send the sign-in email. Please try again.",
  CredentialsSignin: "Sign in failed. Check your credentials.",
  SessionRequired: "Please sign in to access this page.",
  Default: "An error occurred during sign-in. Please try again.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/");

  const { callbackUrl, error } = await searchParams;
  const errorMessage = error ? (SIGNIN_ERROR_MESSAGES[error] ?? SIGNIN_ERROR_MESSAGES.Default) : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Access only with an authorized account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
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
