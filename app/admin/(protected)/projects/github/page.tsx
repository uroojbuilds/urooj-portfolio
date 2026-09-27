import Link from "next/link";
import { listRepositories, resolveGithubOwner } from "@/lib/github/client";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { GithubDiscoveryList } from "./GithubDiscoveryList";

export default async function GithubDiscoveryPage() {
  const owner = resolveGithubOwner();

  let dbError: string | null = null;
  let existing: { id: string; slug: string; githubRepoId: number | null }[] = [];
  try {
    existing = await db
      .select({ id: projects.id, slug: projects.slug, githubRepoId: projects.githubRepoId })
      .from(projects);
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Could not reach the database.";
  }

  const result = await listRepositories(30);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-slate">
            Discover from GitHub
          </h1>
          <p className="mt-1 text-sm text-muted">
            {owner ? (
              <>Public, non-fork repositories for <span className="font-mono">{owner}</span>.</>
            ) : (
              "No GitHub owner configured."
            )}
          </p>
        </div>
        <Link
          href="/admin/projects"
          className="focus-ring text-sm text-teal hover:text-teal-dark"
        >
          Back to Projects
        </Link>
      </div>

      {dbError && (
        <p className="mt-6 rounded-card border border-warning/30 bg-warning/10 p-4 text-sm text-slate">
          Database not reachable: <span className="font-mono text-xs">{dbError}</span>. Duplicate
          detection is unavailable, but repositories can still be browsed below.
        </p>
      )}

      {"error" in result && (
        <p
          role="alert"
          className="mt-6 rounded-card border border-error/30 bg-error/10 p-4 text-sm text-slate"
        >
          {result.error.message}
        </p>
      )}

      {"repos" in result && result.repos.length === 0 && (
        <p className="mt-6 text-sm text-muted">
          No public, non-fork repositories were found for this account.
        </p>
      )}

      {"repos" in result && result.repos.length > 0 && (
        <div className="mt-6">
          <GithubDiscoveryList
            repos={result.repos}
            existingByRepoId={Object.fromEntries(
              existing.filter((p) => p.githubRepoId != null).map((p) => [p.githubRepoId as number, p.id])
            )}
            existingSlugs={existing.map((p) => p.slug)}
          />
        </div>
      )}
    </div>
  );
}
