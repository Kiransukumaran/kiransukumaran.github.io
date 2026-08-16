import { certifications, education, profile, projects } from "@/data/content";
import { extractEmail } from "@/lib/agent/email";
import { GREETING } from "@/lib/agent/knowledge";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type KnowledgeReply = {
  reply: string;
  email?: string;
  downloadUrl?: string;
};

function askedForCv(text: string): boolean {
  return /\b(cv|resume|curriculum|pdf|send me|email me)\b/i.test(text);
}

function lastAssistantAskedForEmail(history: ChatMessage[]): boolean {
  const last = [...history].reverse().find((item) => item.role === "assistant");
  return Boolean(last && /email/i.test(last.content));
}

export function knowledgeReply(
  history: ChatMessage[],
  userText: string,
): KnowledgeReply {
  if (!userText.trim()) {
    return { reply: GREETING, downloadUrl: "/kiran-sukumaran-cv.pdf" };
  }

  const email = extractEmail(userText);
  const wantsCv = askedForCv(userText) || lastAssistantAskedForEmail(history);

  if (email && wantsCv) {
    return {
      reply: `I have your email as ${email}. You can download Kiran's CV from this page now.`,
      email,
      downloadUrl: "/kiran-sukumaran-cv.pdf",
    };
  }

  if (email) {
    return {
      reply: `Got it. I have ${email}. Would you like the CV download as well?`,
      email,
      downloadUrl: "/kiran-sukumaran-cv.pdf",
    };
  }

  if (wantsCv) {
    return { reply: "I can share his CV. What email should I note, or you can download it from this page?" };
  }

  const text = userText.toLowerCase();

  if (/^(hi|hello|hey|start)\b/.test(text)) {
    return { reply: GREETING };
  }

  if (/\b(who are you|what are you|your name|are you (an? )?(ai|agent|bot|human|kiran)|are you real)\b/.test(text)) {
    return {
      reply:
        "I'm Milo, an AI agent and Kiran's personal assistant. I can tell you about his backend, DevOps, and AI work, or share his CV.",
    };
  }

  if (/\b(who is|about|himself|background|summary)\b/.test(text)) {
    return { reply: `${profile.summary} He is based in ${profile.location}.` };
  }

  if (/\b(now|currently|keyvalue|today)\b/.test(text)) {
    return { reply: profile.now };
  }

  if (/\b(devops|pulumi|iac|infra|cloud|lambda|serverless|docker)\b/.test(text)) {
    return {
      reply:
        "On the DevOps side he designs AWS infrastructure with Pulumi, ships serverless services on Lambda, and operates EC2, RDS, S3, and CloudWatch stacks.",
    };
  }

  if (/\b(voice|agent|stt|tts|deepgram|cartesia|genai|generative|llm)\b/.test(text)) {
    return {
      reply:
        "On the AI side he builds production Voice Agent pipelines and GenAI image and video workflows, with STT, LLM orchestration, TTS, Deepgram, and Cartesia.",
    };
  }

  if (/\b(backend|api|microservice|nestjs)\b/.test(text)) {
    return {
      reply:
        "On the backend he designs Node.js and TypeScript services with NestJS, REST APIs, microservices, and data stores like PostgreSQL and MongoDB.",
    };
  }

  if (/\b(skill|stack|tech|typescript|node|aws)\b/.test(text)) {
    return {
      reply:
        "His three pillars are backend, DevOps, and AI. The stack is TypeScript, Node.js, NestJS, AWS, Pulumi, PostgreSQL, and production LLM systems.",
    };
  }

  if (/\b(community|prathidhwani|volunteer|forum)\b/.test(text)) {
    return {
      reply:
        "From 2020 to 2022 he was a backend contributor at Prathidhwani Technical Forum, building community platforms for job seekers and professionals.",
    };
  }

  if (/\b(experience|career|work|qburst|pivot|lead|team)\b/.test(text)) {
    return {
      reply:
        "He has 8 plus years of experience. He is Associate Technical Lead at KeyValue, was Lead Engineer at QBurst where he mentored a 10 plus person backend team, and earlier built 3D and workforce systems at Pivot.",
    };
  }

  if (/\b(project|ecommerce|healthcare|security|3d|simulator)\b/.test(text)) {
    return { reply: `Selected work includes ${projects.map((project) => project.title).join("; ")}.` };
  }

  if (/\b(educat|college|degree|certif)\b/.test(text)) {
    return {
      reply: `He earned a ${education.degree} from ${education.school}, ${education.dates}. Certifications include ${certifications.join(", ")}.`,
    };
  }

  if (/\b(contact|email|phone|linkedin|reach)\b/.test(text)) {
    return {
      reply: `You can reach Kiran at ${profile.email}, or on LinkedIn. You can also download his CV from this page.`,
    };
  }

  return {
    reply:
      "I can talk about Kiran's backend, DevOps, or AI work, his roles at KeyValue and QBurst, or share his CV. What would you like?",
  };
}
