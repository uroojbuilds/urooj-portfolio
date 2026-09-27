import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, Wrench, Briefcase, Award, GraduationCap, LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { signOut } from "@/auth";

// Applies to this entire protected route subtree (Next.js metadata
// inheritance) — a defense-in-depth indexing signal alongside robots.ts's
// disallow rule. Neither of these is the actual access control; the
// server-side requireAdmin() check below is.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/skills", label: "Skills & Tools", icon: Wrench },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // The one server-side gate every protected admin page passes through.
  // requireAdmin() redirects to /admin/sign-in if there's no session, or the
  // session's email doesn't match ADMIN_EMAIL — re-verified here regardless
  // of what the signIn callback in auth.ts already enforced at login time.
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-cream text-slate">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="border-b border-border bg-surface p-4 md:w-64 md:shrink-0 md:border-b-0 md:border-r md:p-6">
          <p className="font-heading text-lg font-semibold text-slate">Admin</p>
          <p className="mt-1 truncate text-xs text-muted">{session?.user?.email}</p>

          <nav className="mt-6 flex gap-1 overflow-x-auto md:mt-8 md:flex-col md:overflow-visible">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="focus-ring flex shrink-0 items-center gap-2 rounded-btn px-3 py-2 text-sm text-slate/80 transition-colors hover:bg-teal-tint hover:text-teal md:shrink"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>

          <form
            className="mt-6 md:mt-8"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="focus-ring flex w-full items-center gap-2 rounded-btn px-3 py-2 text-sm text-muted transition-colors hover:bg-error/10 hover:text-error"
            >
              <LogOut size={16} /> Sign out
            </button>
          </form>
        </aside>

        <main className="flex-1 p-4 md:p-10">{children}</main>
      </div>
    </div>
  );
}
