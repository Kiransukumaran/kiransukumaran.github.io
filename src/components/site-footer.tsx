import { profile } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-line px-5 py-8 font-mono text-[11px] tracking-[0.16em] text-muted uppercase sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <p>TVM · Backend · DevOps · AI</p>
    </footer>
  );
}
