import { profile } from "@/data/content";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="hud-frame px-6 py-12 sm:px-12">
        <p className="font-mono text-[11px] tracking-[0.28em] text-cyan uppercase">
          06 // Contact
        </p>
        <h2 className="mt-4 max-w-xl text-4xl leading-tight font-medium tracking-tight text-ice sm:text-6xl">
          Let’s build something that <span className="grad-text">stays up</span>.
        </h2>
        <p className="mt-5 max-w-lg leading-7 text-muted">
          Open to conversations about backend architecture, DevOps, and AI platforms. Or start a web call with Milo in the corner — he is an AI agent and my personal assistant, and can answer questions or email you the CV.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="btn-primary px-5 py-2.5 text-sm font-medium"
          >
            {profile.email}
          </a>
          <a href={profile.phoneHref} className="font-mono text-sm text-muted hover:text-cyan">
            {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-muted hover:text-cyan"
          >
            LinkedIn
          </a>
          <a href={profile.cvHref} className="font-mono text-sm text-cyan hover:text-ice">
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
