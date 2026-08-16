import { readFile } from "node:fs/promises";
import path from "node:path";
import { profile } from "@/data/content";

export function mailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM);
}

async function sendResend(payload: {
  to: string[];
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: string }>;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!apiKey || !from) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      attachments: payload.attachments,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Resend error", response.status, body);
    return false;
  }

  return true;
}

export async function sendCvEmail(to: string, name?: string): Promise<boolean> {
  if (!mailConfigured()) return false;

  const pdf = await readFile(
    path.join(process.cwd(), "public", "kiran-sukumaran-cv.pdf"),
  );
  const greeting = name ? `Hi ${name},` : "Hi,";

  return sendResend({
    to: [to],
    subject: `${profile.name} — CV`,
    html: `<p>${greeting}</p>
<p>Thanks for speaking with Milo, the AI personal assistant on ${profile.name}'s portfolio. His CV is attached.</p>
<p>${profile.role}<br/>${profile.location}</p>
<p><a href="${profile.linkedin}">LinkedIn</a> · <a href="mailto:${profile.email}">${profile.email}</a></p>`,
    attachments: [
      {
        filename: "Kiran-Sukumaran-CV.pdf",
        content: pdf.toString("base64"),
      },
    ],
  });
}

export async function notifyOwner(leadEmail: string, cvSent: boolean): Promise<void> {
  if (!mailConfigured()) return;

  await sendResend({
    to: [profile.email],
    subject: `Portfolio lead: ${leadEmail}`,
    html: `<p>New voice-agent lead: <strong>${leadEmail}</strong></p>
<p>CV sent to visitor: ${cvSent ? "yes" : "no (stored only)"}</p>`,
  });
}
