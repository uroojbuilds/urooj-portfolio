import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Defense-in-depth authorization check, independent of the signIn callback
 * in auth.ts. Called at the top of the admin layout (so no protected page
 * ever renders without it) AND at the top of every single Server Action
 * (so no mutation can run on the strength of a stale/assumed session alone).
 * Never trusts the client to say who it is — reads only the server-side
 * session and re-checks it against the same env var independently.
 */
export async function requireAdmin() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail || session?.user?.email !== adminEmail) {
    redirect("/admin/sign-in");
  }

  return session;
}

/**
 * Same check for use inside Server Actions, where redirecting mid-mutation
 * isn't appropriate — throws instead so the action can return a clean error
 * to the calling form instead of a Next.js redirect response.
 */
export async function requireAdminOrThrow() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail || session?.user?.email !== adminEmail) {
    throw new Error("Unauthorized");
  }

  return session;
}
