"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProjectVisual } from "@/components/project-card/ProjectVisual";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-card-hover"
    >
      <ProjectVisual
        project={project}
        className="h-40 w-full transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-terracotta-dark">
              {project.category}
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-slate md:text-2xl">
              {project.name}
            </h3>
          </div>
          <span className="shrink-0 font-mono text-xs text-muted">
            {project.duration}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate/80 md:text-base">
          {project.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-5">
          <button
            onClick={onOpen}
            className="focus-ring inline-flex items-center gap-1 text-sm font-medium text-teal transition-colors hover:text-teal-dark"
          >
            View Case Study <ArrowUpRight size={15} />
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-slate"
            >
              <Github size={15} /> Code
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-slate"
            >
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
