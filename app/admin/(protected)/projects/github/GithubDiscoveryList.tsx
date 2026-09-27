"use client";

import { useMemo, useState, useTransition } from "react";
import { Star, GitFork, ExternalLink, AlertTriangle, Search } from "lucide-react";
import { inputClass } from "@/components/admin/FormField";
import { importRepository, type ImportState } from "@/lib/actions/github-import";
import type { GithubRepo } from "@/lib/github/client";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function GithubDiscoveryList({
  repos,
  existingByRepoId,
  existingSlugs,
}: {
  repos: GithubRepo[];
  /** Map of GitHub repo id -> this project's DB id, for repos already imported. */
  existingByRepoId: Record<number, string>;
  existingSlugs: string[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return repos;
    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.language?.toLowerCase().includes(q)
    );
  }, [repos, query]);

  return (
    <div>
      <div className="relative max-w-sm">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by name, language, or description"
          aria-label="Filter repositories"
          className={`${inputClass} pl-9`}
        />
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-muted">No repositories match &quot;{query}&quot;.</p>
      )}

      <ul className="mt-6 space-y-3">
        {filtered.map((repo) => {
          const alreadyImportedId = existingByRepoId[repo.id];
          const likelyDuplicateSlug = existingSlugs.includes(slugify(repo.name))
            ? true
            : false;
          return (
            <RepoCard
              key={repo.id}
              repo={repo}
              alreadyImportedId={alreadyImportedId}
              likelyDuplicate={!alreadyImportedId && likelyDuplicateSlug}
            />
          );
        })}
      </ul>
    </div>
  );
}

function RepoCard({
  repo,
  alreadyImportedId,
  likelyDuplicate,
}: {
  repo: GithubRepo;
  alreadyImportedId?: string;
  likelyDuplicate: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ImportState | null>(null);
  const [confirming, setConfirming] = useState(false);

  function handleImport(force: boolean) {
    startTransition(async () => {
      const res = await importRepository(repo, force);
      // A successful import redirects server-side and never returns here.
      setResult(res);
      if (!res.success && !force) setConfirming(true);
    });
  }

  return (
    <li className="rounded-card border border-border bg-surface p-5 shadow-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1 font-medium text-slate hover:text-teal"
            >
              {repo.name} <ExternalLink size={13} />
            </a>
            {repo.visibility !== "public" && (
              <span className="rounded-full bg-teal-tint px-2 py-0.5 text-xs text-teal">
                {repo.visibility}
              </span>
            )}
          </div>

          {repo.description && (
            <p className="mt-1 text-sm text-slate/80">{repo.description}</p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
            {repo.language && <span>{repo.language}</span>}
            <span className="inline-flex items-center gap-1">
              <Star size={12} /> {repo.stargazersCount}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitFork size={12} /> {repo.forksCount}
            </span>
            <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="shrink-0">
          {alreadyImportedId ? (
            <a
              href={`/admin/projects/${alreadyImportedId}/edit`}
              className="focus-ring inline-flex items-center rounded-btn border border-teal px-4 py-2 text-sm font-medium text-teal hover:bg-teal/5"
            >
              Already imported — Edit
            </a>
          ) : (
            <button
              type="button"
              disabled={pending}
              aria-busy={pending}
              onClick={() => handleImport(confirming)}
              className="focus-ring inline-flex items-center rounded-btn bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-dark disabled:opacity-60"
            >
              {pending ? "Importing..." : confirming ? "Import anyway" : "Use for Project"}
            </button>
          )}
        </div>
      </div>

      {likelyDuplicate && !alreadyImportedId && !confirming && (
        <p className="mt-3 flex items-start gap-2 rounded-btn bg-warning/10 px-3 py-2 text-xs text-slate">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-warning" />A project with a
          similar name may already exist.
        </p>
      )}

      {result?.message && (
        <p role="alert" className="mt-3 rounded-btn bg-warning/10 px-3 py-2 text-xs text-slate">
          {result.message}
        </p>
      )}
    </li>
  );
}
