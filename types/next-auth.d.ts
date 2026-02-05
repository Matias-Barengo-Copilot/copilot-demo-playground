import "next-auth";
import type { UserRole } from "@/db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      role?: UserRole;
    } & import("next-auth").DefaultSession["user"];
  }
}
