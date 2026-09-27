"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";

export function About() {
  // Projects/Certifications counts are computed live from the actual data
  // arrays rather than hardcoded, so they can't quietly go stale as new
  // entries are added — "Year" stays as stated content since there's no
  // reliable way to derive it from existing data.
  const stats = [
    ...profile.stats,
    { label: "Projects", value: `${projects.length}+` },
    { label: "Certifications", value: `${certifications.length}` },
  ];

  return (
    <section id="about" className="section-container py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading eyebrow="About" title="Where hardware curiosity meets AI" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="-mt-4"
        >
          <p className="text-lg leading-relaxed text-slate/80">
            {profile.bio}
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl font-semibold text-gradient md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
