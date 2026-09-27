"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ProjectCard } from "@/components/project-card/ProjectCard";
import { ProjectModal } from "@/components/project-card/ProjectModal";
import { featuredProjects, otherProjects, type Project } from "@/data/projects";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-container py-24 md:py-32">
      <SectionHeading
        eyebrow="Featured Work"
        title="Projects"
        description="Selected work spanning generative AI, computer vision, and applied machine learning."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            onOpen={() => setActive(project)}
          />
        ))}
      </div>

      <div className="mt-16">
        <h3 className="mb-6 font-heading text-lg font-semibold text-slate">
          Other Projects
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-card border border-border bg-surface/70 p-6"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                {project.category}
              </p>
              <h4 className="mt-2 font-heading text-base font-semibold text-slate">
                {project.name}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-slate/80">
                {project.shortDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              <button
                onClick={() => setActive(project)}
                className="focus-ring mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal transition-colors hover:text-teal-dark"
              >
                View Details <ArrowUpRight size={14} />
              </button>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
