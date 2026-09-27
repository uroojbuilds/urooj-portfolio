"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

const links = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const MOBILE_MENU_ID = "mobile-nav-menu";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the mobile menu keyboard-contained while open: Escape closes it and
  // returns focus to the toggle button, and Tab/Shift+Tab cycle only within
  // the panel's own focusable elements instead of escaping to page content
  // sitting behind the (visually blocking) open menu.
  useEffect(() => {
    if (!open) return;

    const panel = menuRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "surface-elevated py-3 shadow-nav" : "bg-transparent py-5"
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        <a
          href="#top"
          className="focus-ring font-heading text-lg font-semibold text-slate"
        >
          Urooj<span className="text-terracotta">.</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="focus-ring text-sm text-muted transition-colors hover:text-teal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <Button href={profile.resumeUrl} variant="secondary" external>
            Resume
          </Button>
        </div>

        <button
          ref={toggleRef}
          className="focus-ring text-slate lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={MOBILE_MENU_ID}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <nav
          id={MOBILE_MENU_ID}
          ref={menuRef}
          aria-label="Mobile"
          className="surface-elevated mx-6 mt-3 rounded-card p-6 lg:hidden"
        >
          <ul className="flex flex-col gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring block text-base text-muted hover:text-teal"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button href={profile.resumeUrl} variant="secondary" external className="w-full">
                Resume
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
