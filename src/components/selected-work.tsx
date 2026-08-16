import { projects } from "@/data/content";

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-cyan uppercase">
            01 // Selected work
          </p>
          <h2 className="mt-3 text-4xl font-medium tracking-tight text-ice sm:text-5xl">
            Systems that shipped
          </h2>
        </div>
        <p className="hidden max-w-xs text-right font-mono text-[11px] leading-5 text-muted sm:block">
          Backend · DevOps · AI
        </p>
      </div>

      <div className="mt-12 space-y-4">
        {projects.map((project) => (
          <article key={project.title} className="hud-frame grid gap-6 p-6 md:grid-cols-[1fr_220px]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-mono text-sm text-cyan">{project.index}</p>
                {project.pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="border border-cyan/25 px-2 py-0.5 font-mono text-[10px] tracking-wide text-cyan uppercase"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
              <h3 className="mt-3 text-2xl font-medium text-ice sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-4 max-w-2xl leading-7 text-ice/80">{project.summary}</p>
              <ul className="mt-4 max-w-2xl space-y-2 text-sm leading-6 text-muted">
                {project.points.map((point) => (
                  <li key={point} className="relative pl-4 before:absolute before:top-2.5 before:left-0 before:h-1 before:w-1 before:bg-cyan">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap content-start gap-2 md:justify-end">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="border border-cyan/20 px-2.5 py-1 font-mono text-[10px] tracking-wide text-cyan/80 uppercase"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
