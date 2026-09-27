import Link from "next/link";
import { count } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects, skillAreas, tools, experience, certifications, education } from "@/lib/db/schema";

async function getCounts() {
  // Deliberately tolerant: on a fresh setup with no DATABASE_URL configured
  // yet, this renders zero counts with a setup note rather than crashing the
  // whole dashboard — the rest of the admin UI (nav, layout) still works so
  // the owner can see exactly what's missing.
  try {
    const [p, s, t, e, c, ed] = await Promise.all([
      db.select({ value: count() }).from(projects),
      db.select({ value: count() }).from(skillAreas),
      db.select({ value: count() }).from(tools),
      db.select({ value: count() }).from(experience),
      db.select({ value: count() }).from(certifications),
      db.select({ value: count() }).from(education),
    ]);
    return {
      ok: true as const,
      projects: p[0].value,
      skillAreas: s[0].value,
      tools: t[0].value,
      experience: e[0].value,
      certifications: c[0].value,
      education: ed[0].value,
    };
  } catch (err) {
    return { ok: false as const, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const cards = counts.ok
    ? [
        { label: "Projects", value: counts.projects, href: "/admin/projects" },
        { label: "Skill Areas", value: counts.skillAreas, href: "/admin/skills" },
        { label: "Tools", value: counts.tools, href: "/admin/skills" },
        { label: "Experience", value: counts.experience, href: "/admin/experience" },
        { label: "Certifications", value: counts.certifications, href: "/admin/certifications" },
        { label: "Education", value: counts.education, href: "/admin/education" },
      ]
    : [];

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Content counts across the portfolio&apos;s database records.
      </p>

      {!counts.ok && (
        <div className="mt-6 rounded-card border border-warning/30 bg-warning/10 p-4 text-sm text-slate">
          <p className="font-medium">Database not reachable yet.</p>
          <p className="mt-1 text-slate/80">
            Set <code className="font-mono">DATABASE_URL</code> in your environment, run the
            migration, and seed the database — see the setup notes provided with this phase.
          </p>
          <p className="mt-2 font-mono text-xs text-muted">{counts.error}</p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="focus-ring rounded-card border border-border bg-surface p-5 shadow-card transition-colors hover:border-teal/40"
          >
            <p className="font-heading text-2xl font-semibold text-teal">{card.value}</p>
            <p className="mt-1 text-sm text-muted">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
