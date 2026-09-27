import Image from "next/image";
import type { Project } from "@/data/projects";

// Simple deterministic string hash so each project's fallback pattern is
// stable across renders/reloads (not re-randomized) while still looking
// distinct from its neighbors — no dependency, just arithmetic.
function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * Shows a project's real screenshot when one exists in the data. No project
 * currently has one, so every card/modal renders the generated fallback: an
 * abstract node-and-trace pattern in the same teal/terracotta language used
 * throughout the site (Hero's CircuitField, Education's JourneyMark, Skills'
 * SkillsSignal) — an intentional visual, not a placeholder-shaped hole.
 */
export function ProjectVisual({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  if (project.image) {
    return (
      <div className={`relative overflow-hidden bg-teal-tint ${className}`}>
        <Image
          src={project.image}
          alt={project.imageAlt ?? `Screenshot of ${project.name}`}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  const h = hashSlug(project.slug);
  const nodeCount = 5;
  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const seed = (h >> (i * 4)) & 0xff;
    return {
      x: 20 + ((seed * 37 + i * 53) % 260),
      y: 12 + ((seed * 19 + i * 29) % 56),
    };
  }).sort((a, b) => a.x - b.x);

  const path = nodes.map((n, i) => `${i === 0 ? "M" : "L"}${n.x} ${n.y}`).join(" ");

  return (
    <div
      className={`relative overflow-hidden bg-teal-tint ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 300 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d={path} stroke="#0F5B66" strokeOpacity="0.3" strokeWidth="1.5" />
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === nodes.length - 1 ? 5 : 3.5}
            fill={i === nodes.length - 1 ? "#E06D53" : "#0F5B66"}
            fillOpacity={i === nodes.length - 1 ? 1 : 0.55}
          />
        ))}
      </svg>
    </div>
  );
}
