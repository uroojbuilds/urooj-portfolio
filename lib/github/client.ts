import "server-only";
import { profile } from "@/data/profile";

// Server-only by construction (the `server-only` import above makes this
// module fail to build if anything ever tries to bundle it into client
// JavaScript). GITHUB_TOKEN is read here and only here — it is never passed
// to a client component, never embedded in a response body, and never used
// in a route the public portfolio calls.

export type GithubRepo = {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
  visibility: string;
  defaultBranch: string;
  owner: string;
};

export type GithubApiError = {
  kind: "missing-owner" | "not-found" | "auth" | "rate-limit" | "network";
  message: string;
};

/** Resolves the GitHub owner/username to discover repositories for.
 * Prefers the explicit GITHUB_OWNER env var; falls back to parsing it out of
 * the existing profile.social.github URL so nothing needs to be configured
 * twice for the common case. */
export function resolveGithubOwner(): string | null {
  const fromEnv = process.env.GITHUB_OWNER?.trim();
  if (fromEnv) return fromEnv;

  const url = profile.social.github;
  if (!url) return null;
  const match = url.match(/github\.com\/([^/]+)\/?$/i);
  return match ? match[1] : null;
}

function mapRepo(raw: Record<string, unknown>): GithubRepo {
  return {
    id: raw.id as number,
    name: raw.name as string,
    fullName: raw.full_name as string,
    description: (raw.description as string | null) ?? null,
    htmlUrl: raw.html_url as string,
    homepage: (raw.homepage as string | null) || null,
    language: (raw.language as string | null) ?? null,
    topics: Array.isArray(raw.topics) ? (raw.topics as string[]) : [],
    stargazersCount: (raw.stargazers_count as number) ?? 0,
    forksCount: (raw.forks_count as number) ?? 0,
    updatedAt: raw.updated_at as string,
    visibility: (raw.visibility as string) ?? (raw.private ? "private" : "public"),
    defaultBranch: (raw.default_branch as string) ?? "main",
    owner: ((raw.owner as Record<string, unknown> | undefined)?.login as string) ?? "",
  };
}

/** Lists public, non-fork repositories for the configured owner, most
 * recently updated first, capped at a sensible page size — this is a
 * discovery tool, not a full mirror. */
export async function listRepositories(
  limit = 30
): Promise<{ repos: GithubRepo[] } | { error: GithubApiError }> {
  const owner = resolveGithubOwner();
  if (!owner) {
    return {
      error: {
        kind: "missing-owner",
        message:
          "No GitHub owner configured — set GITHUB_OWNER, or make sure profile.social.github is a valid GitHub profile URL.",
      },
    };
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=${limit}&sort=updated&type=owner`,
      { headers, cache: "no-store" }
    );
  } catch {
    return { error: { kind: "network", message: "Could not reach the GitHub API." } };
  }

  if (res.status === 404) {
    return { error: { kind: "not-found", message: `GitHub user "${owner}" was not found.` } };
  }
  if (res.status === 401) {
    return {
      error: {
        kind: "auth",
        message: "GitHub rejected the configured token — check GITHUB_TOKEN.",
      },
    };
  }
  if (res.status === 403) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    return {
      error: {
        kind: "rate-limit",
        message:
          remaining === "0"
            ? "GitHub API rate limit exceeded. Try again later, or set GITHUB_TOKEN for a much higher limit."
            : "GitHub API request was forbidden.",
      },
    };
  }
  if (!res.ok) {
    return { error: { kind: "network", message: `GitHub API returned ${res.status}.` } };
  }

  const data = (await res.json()) as Record<string, unknown>[];
  const repos = data
    // Forks aren't "things I built" — excluded from discovery by default.
    .filter((r) => !r.fork)
    .map(mapRepo);

  return { repos };
}
