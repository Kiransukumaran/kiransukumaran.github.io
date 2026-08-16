import { focus, skillGroups } from "@/data/content";

export function Expertise() {
  return (
    <section id="expertise" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.28em] text-cyan uppercase">
        02 // Expertise
      </p>
      <h2 className="mt-3 max-w-xl text-4xl font-medium tracking-tight text-ice sm:text-5xl">
        Backend, DevOps, and AI
      </h2>
      <p className="mt-5 max-w-2xl leading-7 text-muted">
        Three equal practices: services that scale, infrastructure you can reason about, and AI that holds up in production.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {focus.map((item) => (
          <span
            key={item}
            className="border border-violet/30 bg-violet/10 px-4 py-2 font-mono text-[11px] tracking-wide text-ice uppercase"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="hud-frame hud-frame-alt p-5">
            <h3 className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">
              {group.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-ice/85">{group.items.join(" · ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
