import { pipeline, profile, stats } from "@/data/content";
import { Waveform } from "@/components/waveform";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="rise font-mono text-[11px] tracking-[0.28em] text-cyan uppercase">
          NODE · TVM · {profile.location.toUpperCase()}
        </p>
        <div className="rise rise-delay-1 hidden sm:block">
          <Waveform />
        </div>
      </div>

      <p className="rise rise-delay-1 mt-8 font-mono text-[11px] tracking-[0.22em] text-violet uppercase">
        Backend · DevOps · AI
      </p>
      <h1 className="rise rise-delay-2 mt-4 text-5xl leading-[0.92] font-medium tracking-tight sm:text-7xl lg:text-8xl">
        <span className="grad-text text-glow">{profile.name}</span>
      </h1>
      <p className="rise rise-delay-3 mt-5 text-lg text-muted sm:text-xl">
        {profile.role}
      </p>
      <p className="rise rise-delay-3 mt-8 max-w-2xl text-lg leading-8 text-ice/85 sm:text-xl sm:leading-9">
        {profile.headline}
      </p>
      <div className="rise rise-delay-4 mt-10 flex flex-wrap gap-3">
        <a
          href="#work"
          className="btn-primary px-5 py-2.5 text-sm font-medium tracking-wide"
        >
          View selected work
        </a>
        <a
          href="#contact"
          className="border border-cyan/30 px-5 py-2.5 text-sm text-ice transition-colors hover:border-cyan hover:text-cyan"
        >
          Get in touch
        </a>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {pipeline.map((stage, index) => (
          <div key={stage.id} className="hud-frame relative px-5 py-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < pipeline.length - 1 ? (
                <svg className="hidden h-4 w-16 text-cyan/80 sm:block" viewBox="0 0 64 16" aria-hidden>
                  <line
                    className="pipeline-line"
                    x1="0"
                    y1="8"
                    x2="64"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              ) : (
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-cyan" />
              )}
            </div>
            <h2 className="mt-4 text-3xl font-medium text-ice">{stage.label}</h2>
            <p className="mt-2 font-mono text-xs text-muted">{stage.detail}</p>
          </div>
        ))}
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="hud-frame hud-frame-alt px-4 py-4">
            <dt className="text-3xl font-medium text-cyan text-glow sm:text-4xl">{stat.value}</dt>
            <dd className="mt-1 font-mono text-[11px] tracking-wide text-muted uppercase">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
