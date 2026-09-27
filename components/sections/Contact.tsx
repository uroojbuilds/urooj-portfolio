"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, BookOpen, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

// TODO: Replace with your own Formspree form ID (formspree.io — free tier).
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-container py-24 md:py-32">
      <SectionHeading
        eyebrow="Contact"
        title="Let's Build Something"
        description="Have an opportunity, project, or question in mind? I'd love to hear from you."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <ContactLink
            href={`mailto:${profile.email}`}
            icon={<Mail size={18} />}
            label={profile.email}
          />
          <ContactLink
            href={profile.social.linkedin}
            icon={<Linkedin size={18} />}
            label="LinkedIn"
          />
          <ContactLink
            href={profile.social.github}
            icon={<Github size={18} />}
            label="GitHub"
          />
          <ContactLink
            href={profile.social.medium}
            icon={<BookOpen size={18} />}
            label="Medium"
          />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="surface-elevated space-y-5 rounded-card p-6 md:p-8"
        >
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-slate/80">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="focus-ring w-full rounded-btn border border-border bg-cream px-4 py-3 text-sm text-slate placeholder:text-muted"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-slate/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="focus-ring w-full rounded-btn border border-border bg-cream px-4 py-3 text-sm text-slate placeholder:text-muted"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm text-slate/80">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="focus-ring w-full resize-none rounded-btn border border-border bg-cream px-4 py-3 text-sm text-slate placeholder:text-muted"
              placeholder="Tell me a bit about what you have in mind..."
            />
          </div>

          <Button
            type="submit"
            icon={<Send size={16} />}
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </Button>

          {status === "success" && (
            <p role="status" className="text-sm text-success">
              Message sent — thank you! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-error">
              Something went wrong. Please email me directly at {profile.email}.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
      className="focus-ring flex items-center gap-3 rounded-card border border-border bg-surface p-4 text-sm text-slate/80 shadow-card transition-colors hover:border-teal/40 hover:text-slate"
    >
      <span className="text-teal">{icon}</span>
      {label}
    </a>
  );
}
