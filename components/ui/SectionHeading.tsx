"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 md:mb-16"
    >
      <p className="mb-3 font-mono text-sm uppercase tracking-[0.15em] text-terracotta-dark">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl font-semibold text-slate md:text-[44px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
