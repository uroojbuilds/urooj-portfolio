"use client";

import { motion } from "framer-motion";
import { Award, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import {
  certifications,
  certificationsNote,
  type Certification,
} from "@/data/certifications";

// Group by category (real, existing metadata) rather than a flat undifferentiated
// grid — this creates meaningful visual hierarchy without inventing any new
// grouping concept. Groups are derived from whatever categories are actually
// present, in first-seen order, so a future category needs no JSX changes.
function groupByCategory(items: Certification[]) {
  const groups: { category?: string; items: Certification[] }[] = [];
  for (const cert of items) {
    let group = groups.find((g) => g.category === cert.category);
    if (!group) {
      group = { category: cert.category, items: [] };
      groups.push(group);
    }
    group.items.push(cert);
  }
  return groups;
}

export function Certifications() {
  const groups = groupByCategory(certifications);

  return (
    <section id="certifications" className="section-container py-24 md:py-32">
      <SectionHeading eyebrow="Certifications" title="Continued Learning" />

      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group.category ?? "uncategorized"}>
            {group.category && (
              <p className="mb-4 font-mono text-xs uppercase tracking-wide text-terracotta-dark">
                {group.category}
              </p>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {group.items.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                  className="flex gap-4 rounded-card border border-border bg-surface p-6 shadow-card transition-colors hover:border-teal/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-teal-tint">
                    <Award size={18} className="text-teal" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-base font-semibold text-slate">
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <p className="mt-1 text-sm text-slate/80">{cert.issuer}</p>
                    )}
                    {cert.date && (
                      <p className="mt-1 font-mono text-xs text-muted">
                        {cert.date}
                      </p>
                    )}

                    {cert.description && (
                      <p className="mt-2 text-sm leading-relaxed text-slate/80">
                        {cert.description}
                      </p>
                    )}

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <Badge key={skill}>{skill}</Badge>
                        ))}
                      </div>
                    )}

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal transition-colors hover:text-teal-dark"
                      >
                        View Credential <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm italic text-muted">
        {certificationsNote}
      </p>
    </section>
  );
}
