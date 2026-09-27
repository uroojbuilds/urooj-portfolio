"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProjectVisual } from "@/components/project-card/ProjectVisual";
import type { Project } from "@/data/projects";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    // Full focus trap: Escape closes the modal, and Tab/Shift+Tab cycle only
    // within the panel's own focusable elements rather than escaping to the
    // page content sitting behind the overlay.
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="surface-elevated max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-card"
          >
            <ProjectVisual project={project} className="h-40 w-full md:h-48" />

            <div className="p-6 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-xs uppercase tracking-wide text-terracotta-dark">
                      {project.category} · {project.duration}
                    </p>
                    {project.status && (
                      <span className="rounded-full bg-teal-tint px-2.5 py-0.5 text-xs font-medium text-teal">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h3
                    id="project-modal-title"
                    className="mt-2 font-heading text-2xl font-semibold text-slate md:text-3xl"
                  >
                    {project.name}
                  </h3>
                </div>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Close project details"
                  className="focus-ring shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-teal-tint hover:text-slate"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-8 space-y-6">
                <ModalSection title="Overview" content={project.shortDescription} />

                {project.problem && (
                  <ModalSection title="Problem" content={project.problem} />
                )}
                {project.solution && (
                  <ModalSection title="Solution" content={project.solution} />
                )}

                {project.features && (
                  <div>
                    <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-slate">
                      Key Features
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {project.features.map((f) => (
                        <li
                          key={f}
                          className="flex gap-2 text-sm leading-relaxed text-slate/80"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-terracotta" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.howItWorks && (
                  <ModalSection title="How It Works" content={project.howItWorks} />
                )}

                {project.challenges && (
                  <ModalSection title="Challenges" content={project.challenges} />
                )}
                {project.lessonsLearned && (
                  <ModalSection
                    title="Lessons Learned"
                    content={project.lessonsLearned}
                  />
                )}

                <div>
                  <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-slate">
                    Technologies
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {(project.github || project.liveDemo) && (
                <div className="mt-8 flex flex-wrap gap-4 border-t border-border pt-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-btn border border-teal text-teal px-5 py-2.5 text-sm font-medium transition-colors hover:bg-teal/5"
                    >
                      <Github size={16} /> View on GitHub
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-btn bg-teal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalSection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-slate">
        {title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-slate/80 md:text-base">
        {content}
      </p>
    </div>
  );
}
