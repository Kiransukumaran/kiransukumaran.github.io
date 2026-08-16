import { experience } from "@/data/content";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.28em] text-cyan uppercase">
        03 // Experience
      </p>
      <h2 className="mt-3 text-4xl font-medium tracking-tight text-ice sm:text-5xl">
        Where the work happened
      </h2>

      <div className="mt-12 space-y-4">
        {experience.map((job, index) => (
          <article key={job.company} className="hud-frame grid gap-6 p-6 md:grid-cols-[280px_1fr]">
            <div>
              <p className="font-mono text-[11px] text-magenta">
                REC.{String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-2xl font-medium text-ice">{job.company}</h3>
              <p className="mt-1 font-mono text-xs text-muted">{job.location}</p>
            </div>
            <div className="space-y-8">
              {job.roles.map((role) => (
                <div key={`${role.title}-${role.dates}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg text-ice">{role.title}</h4>
                    <p className="font-mono text-[11px] text-cyan">{role.dates}</p>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    {role.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-4 before:absolute before:top-2.5 before:left-0 before:h-1 before:w-1 before:bg-cyan"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
