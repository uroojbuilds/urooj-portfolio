"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="section-container py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <SectionHeading eyebrow="Education" title="Academic Foundation" />
        <JourneyMark />
      </div>

      <div className="relative space-y-10 border-l border-border pl-8 md:pl-10">
        {education.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            className="relative"
          >
            <span className="absolute -left-[45px] top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-cream bg-teal md:-left-[53px]">
              <GraduationCap size={14} className="text-white" />
            </span>

            <div className="rounded-card border border-border bg-surface p-6 shadow-card md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-slate md:text-xl">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 text-teal">{entry.institution}</p>
                  {entry.location && (
                    <p className="mt-1 text-sm text-muted">{entry.location}</p>
                  )}
                </div>
                {entry.period && (
                  <span className="shrink-0 font-mono text-sm text-muted">
                    {entry.period}
                  </span>
                )}
              </div>

              {entry.coursework && entry.coursework.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-sm font-medium text-slate">
                    Relevant Coursework
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.coursework.map((course) => (
                      <Badge key={course}>{course}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// A small, purely decorative accent evoking the progression from an early
// engineering foundation toward AI/software — abstract circuit nodes rather
// than any literal figure/illustration, matching the Hero's CircuitField
// motif so the visual language stays consistent across the page. Static SVG:
// no client-only behavior, no animation loop, no impact on bundle size.
function JourneyMark() {
  return (
    <svg
      viewBox="0 0 220 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden shrink-0 lg:block"
      aria-hidden="true"
    >
      <path
        d="M8 28 H60 L80 12 H130 L150 40 H212"
        stroke="#0F5B66"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="28" r="4" fill="#0F5B66" fillOpacity="0.4" />
      <circle cx="80" cy="12" r="4" fill="#0F5B66" fillOpacity="0.7" />
      <circle cx="150" cy="40" r="5" fill="#0F5B66" />
      <circle cx="212" cy="40" r="6" fill="#E06D53" />
    </svg>
  );
}
