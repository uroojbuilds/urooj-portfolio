"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillAreas, toolGroups, softSkills } from "@/data/skills";
import { projects } from "@/data/projects";

const projectNameBySlug = new Map(projects.map((p) => [p.slug, p.name]));

function projectNames(slugs?: string[]): string {
  if (!slugs || slugs.length === 0) return "";
  return slugs.map((s) => projectNameBySlug.get(s)).filter(Boolean).join(", ");
}

export function Skills() {
  return (
    <section id="skills" className="section-container py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <SectionHeading
          eyebrow="Skills"
          title="What I Work In, What I Build With"
          description="Technical areas I work in, and the actual tools and technologies behind them — no percentages, just what's real."
        />
        <SkillsSignal />
      </div>

      {/* A. Core skill areas — conceptual domains, not tool names. */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {skillAreas.map((area, i) => (
          <motion.div
            key={area.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="rounded-card border border-border bg-surface p-6 shadow-card transition-colors hover:border-teal/40"
          >
            <h3 className="font-heading text-base font-semibold text-teal">
              {area.title}
            </h3>
            <p className="mt-1.5 text-sm text-muted">{area.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {area.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-teal/15 bg-teal-tint px-3 py-1 text-xs font-mono text-slate"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* B. Tools/technologies actually used — distinct from skill areas above. */}
      <div className="mt-16">
        <h3 className="mb-6 font-heading text-lg font-semibold text-slate">
          Tools &amp; Technologies
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {toolGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
              className="rounded-card border border-border bg-surface p-6 shadow-card transition-colors hover:border-terracotta/30"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                <p className="font-mono text-xs uppercase tracking-wide text-terracotta-dark">
                  {group.title}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => {
                  const used = projectNames(tool.projectSlugs);
                  return (
                    <div
                      key={tool.id}
                      className="rounded-btn border border-teal/15 bg-teal-tint px-3 py-2 transition-colors hover:border-teal/40"
                    >
                      <p className="text-sm font-medium leading-tight text-slate">
                        {tool.name}
                      </p>
                      {used && (
                        <p className="mt-0.5 text-[11px] leading-snug text-muted">
                          Used in: {used}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6 text-sm text-muted"
      >
        <span className="font-medium text-slate">Also:</span>
        {softSkills.join(" · ")}
      </motion.div>
    </section>
  );
}

// Small decorative 2D accent — a signal moving through a fixed circuit path,
// echoing the same node/trace motif used in the Hero (Phase 4) and Education
// (Phase 5) sections for visual continuity. Static SVG, with a single Framer
// Motion-animated dot for the "signal" — no WebGL, no new dependency, and no
// animation at all when reduced motion is requested.
function SkillsSignal() {
  const prefersReducedMotion = useReducedMotion();
  const path = "M6 30 H50 L68 12 H108 L126 40 H198";

  return (
    <svg
      viewBox="0 0 204 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden shrink-0 lg:block"
      aria-hidden="true"
    >
      <path d={path} stroke="#0F5B66" strokeOpacity="0.3" strokeWidth="1.5" />
      <circle cx="6" cy="30" r="3.5" fill="#0F5B66" fillOpacity="0.5" />
      <circle cx="68" cy="12" r="3.5" fill="#0F5B66" fillOpacity="0.75" />
      <circle cx="126" cy="40" r="4" fill="#0F5B66" />
      <circle cx="198" cy="40" r="5" fill="#E06D53" />
      {!prefersReducedMotion && (
        <motion.circle
          r="3"
          fill="#E06D53"
          animate={{
            cx: [6, 50, 68, 108, 126, 198],
            cy: [30, 30, 12, 12, 40, 40],
            opacity: [0, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        />
      )}
    </svg>
  );
}
