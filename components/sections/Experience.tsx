"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="section-container py-24 md:py-32">
      <SectionHeading eyebrow="Experience" title="Where I've Worked" />

      <div className="relative space-y-10 border-l border-border pl-8 md:pl-10">
        {experience.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="relative"
          >
            <span className="absolute -left-[45px] top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-cream bg-teal md:-left-[53px]">
              <Briefcase size={14} className="text-white" />
            </span>

            <div className="rounded-card border border-border bg-surface p-6 shadow-card md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-lg font-semibold text-slate md:text-xl">
                      {item.role}
                    </h3>
                    {item.status === "ongoing" && (
                      <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                        Ongoing
                      </span>
                    )}
                    {item.status === "completed" && (
                      <span className="rounded-full bg-muted/10 px-2.5 py-0.5 text-xs font-medium text-muted">
                        Completed
                      </span>
                    )}
                    {item.type && (
                      <span className="rounded-full bg-teal-tint px-2.5 py-0.5 text-xs font-medium text-teal">
                        {item.type}
                      </span>
                    )}
                  </div>

                  {item.organizationUrl ? (
                    <a
                      href={item.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring mt-1 inline-flex items-center gap-1 text-teal transition-colors hover:text-teal-dark"
                    >
                      {item.organization} <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <p className="mt-1 text-teal">{item.organization}</p>
                  )}

                  {item.location && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                      <MapPin size={13} /> {item.location}
                    </p>
                  )}
                </div>

                <span className="shrink-0 font-mono text-sm text-muted">
                  {item.duration}
                </span>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate/80">
                {item.description}
              </p>

              {item.responsibilities && item.responsibilities.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {item.responsibilities.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2 text-sm leading-relaxed text-slate/80"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                      {r}
                    </li>
                  ))}
                </ul>
              )}

              {item.achievements && item.achievements.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate">Highlights</p>
                  <ul className="mt-2 space-y-2">
                    {item.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex gap-2 text-sm leading-relaxed text-slate/80"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.technologies && item.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
