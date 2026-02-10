import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/signin?callbackUrl=/demos");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto flex-1 w-full max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
