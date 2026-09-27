import { Github, Linkedin, BookOpen, ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="section-container flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-heading text-base font-semibold text-slate">
            Urooj Fatima
          </p>
          <p className="mt-1 text-sm text-muted">
            Building AI solutions that make an impact.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="focus-ring text-muted hover:text-teal"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="focus-ring text-muted hover:text-teal"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={profile.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            className="focus-ring text-muted hover:text-teal"
          >
            <BookOpen size={18} />
          </a>
        </div>

        <a
          href="#top"
          aria-label="Back to top"
          className="focus-ring flex items-center gap-2 text-sm text-muted hover:text-slate"
        >
          Back to top <ArrowUp size={15} />
        </a>
      </div>

      <p className="section-container mt-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Urooj Fatima. All rights reserved.
      </p>
    </footer>
  );
}
