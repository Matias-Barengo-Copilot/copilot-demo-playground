import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { isEmailAllowed, getUserByEmail } from "@/lib/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      const allowed = await isEmailAllowed(user?.email ?? null);
      if (!allowed) return "/unauthorized";
      return true;
    },
    session: async ({ session }) => {
      const email = session?.user?.email;
      if (email) {
        const appUser = await getUserByEmail(email);
        if (appUser) session.user.role = appUser.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
});
