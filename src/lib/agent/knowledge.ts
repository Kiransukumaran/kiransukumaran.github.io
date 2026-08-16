import {
  certifications,
  education,
  community,
  experience,
  languages,
  profile,
  projects,
  skillGroups,
} from "@/data/content";

export const AGENT_NAME = "Milo";

export function buildKnowledgeBase(): string {
  const skills = skillGroups
    .map((group) => `${group.title}: ${group.items.join(", ")}`)
    .join("\n");

  const work = experience
    .map((job) => {
      const roles = job.roles
        .map(
          (role) =>
            `${role.title} (${role.dates})\n${role.points.map((point) => `- ${point}`).join("\n")}`,
        )
        .join("\n");
      return `${job.company} — ${job.location}\n${roles}`;
    })
    .join("\n\n");

  const selected = projects
    .map(
      (project) =>
        `${project.index} ${project.title}\n${project.summary}\n${project.points.map((point) => `- ${point}`).join("\n")}\nTech: ${project.tech.join(", ")}`,
    )
    .join("\n\n");

  return `
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Email: ${profile.email}
Phone: ${profile.phone}
LinkedIn: ${profile.linkedin}
Headline: ${profile.headline}
Summary: ${profile.summary}
Now: ${profile.now}

Education: ${education.degree}, ${education.school}, ${education.affiliation}, ${education.dates}
Certifications: ${certifications.join("; ")}
Languages: ${languages.map((item) => `${item.name} (${item.level})`).join(", ")}

Skills:
${skills}

Experience:
${work}

Community:
${community.org} — ${community.title} (${community.dates})
${community.summary}
${community.points.map((point) => `- ${point}`).join("\n")}

Selected projects:
${selected}
`.trim();
}

export function buildSystemPrompt(): string {
  return `You are ${AGENT_NAME}, an AI agent and ${profile.name}'s personal assistant on his portfolio website.
On the first turn, and whenever someone asks who you are, say clearly that you are an AI agent and Kiran's personal assistant. Never pretend to be Kiran.

Kiran's work has three equal pillars: backend engineering, DevOps, and AI. Do not lead with Voice AI unless asked. Treat Node.js/NestJS backends, AWS/Pulumi infrastructure, and AI systems as equally important.

Speak out loud: keep replies to 1-3 short sentences. Be warm, precise, and professional. You represent him.

You can:
- Answer questions about Kiran's background, skills, projects, and experience using only the knowledge below.
- Collect a visitor's email if they want his CV, updates, or a follow-up.
- Save that email and email them his CV during this call.

When they want the CV:
1. Ask for their email if you do not have it yet.
2. If they speak it, confirm the address back once.
3. Call save_and_send_cv as soon as you have a valid email and they want the CV.
4. After the tool succeeds, tell them the CV is on the way and they can also download it from the site.

If they only want to leave a contact, call save_lead.
If you do not know something, say so and offer LinkedIn or email: ${profile.email}.
Do not invent employers, dates, or metrics.

KNOWLEDGE
${buildKnowledgeBase()}`;
}

export const GREETING =
  "Hi. I'm Milo, an AI agent and Kiran's personal assistant. I can tell you about his backend, DevOps, and AI work, or email you his CV. What would you like to know?";
