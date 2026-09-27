import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// Single source of truth for who is allowed to be the admin. Checked twice,
// independently: once here (gates whether a session can ever be issued at
// all — see the signIn callback) and again in lib/auth/require-admin.ts
// (re-verified on every protected page load and every mutation). Neither
// check trusts the other; both read the same env var directly.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// NOTE — session strategy:
// This project originally used @auth/drizzle-adapter for database-backed
// sessions. That integration hit an unresolved runtime incompatibility
// between the adapter's database-type detection and this project's lazy
// Drizzle client (see the Phase 9 follow-up report for the exact error and
// root cause) and has been removed rather than spending further effort
// debugging it. This is a scoped rollback of the *session storage
// mechanism only* — it does not touch the database, schema, migrations,
// seed script, or CRUD architecture, all of which remain intact and
// unrelated to Auth.js's own session storage.
//
// Without an adapter, Auth.js defaults to JWT sessions: a signed, httpOnly
// cookie verified server-side on every request via AUTH_SECRET. This is a
// fully supported, standard Auth.js strategy — not a workaround and not a
// reduction in who can authenticate as admin (the signIn callback below is
// unchanged and is still the actual enforcement point). The one real
// trade-off versus a database session: a JWT can't be revoked server-side
// before it expires the way deleting a session row could. If that trade-off
// ever matters for this project, reintroducing database sessions means
// either fixing the adapter/proxy incompatibility or writing a small
// custom adapter directly against `db` from lib/db — not attempted here.
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [GitHub],
  // Required for Auth.js v5 behind Netlify's proxy/dynamic host setup.
  trustHost: true,
  callbacks: {
    // This is the actual enforcement point: if this returns false, no
    // session is ever issued for that identity — fails closed if
    // ADMIN_EMAIL isn't configured, rather than defaulting open.
    async signIn({ user, profile }) {
      if (!ADMIN_EMAIL) return false;
      const email = user?.email ?? (profile?.email as string | undefined);
      return email === ADMIN_EMAIL;
    },
    // JWT sessions derive `session.user` from the token, not a database
    // row — carry the verified email onto both so
    // lib/auth/require-admin.ts can keep independently re-checking it.
    async jwt({ token, profile }) {
      if (profile?.email) token.email = profile.email as string;
      return token;
    },
    async session({ session, token }) {
      if (token.email) session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/admin/sign-in",
  },
});
