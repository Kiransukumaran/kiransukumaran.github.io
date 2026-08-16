import { certifications, education, languages, profile } from "@/data/content";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-cyan uppercase">
            05 // About
          </p>
          <h2 className="mt-3 text-4xl font-medium tracking-tight text-ice sm:text-5xl">
            Services, infrastructure, and intelligence
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ice/85">{profile.summary}</p>
          <p className="mt-5 max-w-xl leading-7 text-muted">
            I have led engineering teams, worked directly with clients, and shipped across healthcare, marketing technology, ecommerce, cybersecurity, workforce systems, and 3D visualization. I also contributed backend work at Prathidhwani Technical Forum, a community that supports job seekers and professionals. I care about systems that leave the prototype stage and stay reliable in production — whether that is an API, a cloud stack, or an AI workflow.
          </p>
          <p className="mt-5 max-w-xl leading-7 text-muted">
            <span className="font-mono text-cyan">NOW // </span>
            {profile.now}
          </p>
        </div>

        <div className="hud-frame space-y-8 p-6">
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">Education</h3>
            <p className="mt-3 text-xl font-medium text-ice">{education.degree}</p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {education.school}
              <br />
              {education.affiliation} · {education.dates}
            </p>
          </div>
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">Certifications</h3>
            <ul className="mt-3 space-y-2 font-mono text-xs text-ice/85">
              {certifications.map((item) => (
                <li key={item}>+ {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">Languages</h3>
            <ul className="mt-3 space-y-1 font-mono text-xs text-muted">
              {languages.map((item) => (
                <li key={item.name}>
                  {item.name} — {item.level}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
