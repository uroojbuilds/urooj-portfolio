"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, BookOpen, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      <HeroBackground />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-teal/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="section-container relative grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.15em] text-terracotta-dark">
            Hi, I&apos;m
          </p>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] text-slate md:text-7xl">
            Urooj Fatima
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate/80 md:text-xl">
            {profile.headline}
          </p>
          <p className="mt-4 max-w-lg text-base text-muted">
            {profile.mission}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="secondary">
              Contact Me
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <SocialIcon href={profile.social.github} label="GitHub">
              <Github size={20} />
            </SocialIcon>
            <SocialIcon href={profile.social.linkedin} label="LinkedIn">
              <Linkedin size={20} />
            </SocialIcon>
            <SocialIcon href={profile.social.medium} label="Medium">
              <BookOpen size={20} />
            </SocialIcon>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-gradient-to-br from-teal/15 to-terracotta/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-image border border-border shadow-card">
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Urooj Fatima"
              width={480}
              height={560}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="focus-ring absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted md:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="focus-ring text-muted transition-colors hover:text-teal"
    >
      {children}
    </a>
  );
}
