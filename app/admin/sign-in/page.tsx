import type { Metadata } from "next";
import { signIn } from "@/auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Deliberately outside the (protected) route group's layout — this page
// must remain reachable by a logged-out visitor, or the auth redirect would
// loop forever (protected layout -> redirect here -> this page also
// protected -> redirect again).
export default function AdminSignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm rounded-card border border-border bg-surface p-8 text-center shadow-card">
        <h1 className="font-heading text-xl font-semibold text-slate">
          Admin Sign In
        </h1>
        <p className="mt-2 text-sm text-muted">
          This area is restricted to the portfolio owner.
        </p>
        <form
          className="mt-6"
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/admin" });
          }}
        >
          <button
            type="submit"
            className="focus-ring w-full rounded-btn bg-teal px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
          >
            Sign in with GitHub
          </button>
        </form>
      </div>
    </main>
  );
}
