"use client";

import { useState } from "react";
import { profile } from "@/data/content";
import { SystemClock } from "@/components/system-clock";

const links = [
  { href: "#work", label: "Work" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#community", label: "Community" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-cyan" />
          <span className="font-mono text-[11px] tracking-[0.28em] text-cyan">
            {profile.initials} // ONLINE
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase transition-colors hover:text-cyan"
            >
              {link.label}
            </a>
          ))}
          <span className="hidden font-mono text-[11px] text-violet lg:inline">
            <SystemClock />
          </span>
          <a
            href={profile.cvHref}
            className="border border-cyan/40 px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-cyan uppercase transition-colors hover:bg-cyan/10"
          >
            Resume
          </a>
        </nav>
        <button
          type="button"
          className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav className="flex flex-col gap-3 border-t border-line px-5 py-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-[0.18em] text-ice uppercase"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={profile.cvHref} className="font-mono text-xs text-cyan uppercase">
            Resume
          </a>
        </nav>
      ) : null}
    </header>
  );
}
