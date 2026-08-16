import { community } from "@/data/content";

export function Community() {
  return (
    <section id="community" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.28em] text-cyan uppercase">
        04 // Community
      </p>
      <h2 className="mt-3 text-4xl font-medium tracking-tight text-ice sm:text-5xl">
        Prathidhwani
      </h2>
      <p className="mt-5 max-w-2xl leading-7 text-muted">{community.summary}</p>

      <article className="hud-frame mt-10 grid gap-6 p-6 md:grid-cols-[280px_1fr]">
        <div>
          <p className="font-mono text-[11px] text-magenta">COMMUNITY</p>
          <h3 className="mt-2 text-2xl font-medium text-ice">{community.org}</h3>
          <p className="mt-1 font-mono text-xs text-muted">{community.dates}</p>
        </div>
        <div>
          <h4 className="text-lg text-ice">{community.title}</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
            {community.points.map((point) => (
              <li
                key={point}
                className="relative pl-4 before:absolute before:top-2.5 before:left-0 before:h-1 before:w-1 before:bg-cyan"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
