import { extractEmail, isValidEmail } from "@/lib/agent/email";
import { saveLead } from "@/lib/agent/leads";
import { mailConfigured, notifyOwner, sendCvEmail } from "@/lib/agent/mail";

export type ToolResult = {
  ok: boolean;
  email?: string;
  cvSent: boolean;
  stored: boolean;
  downloadUrl: string;
  message: string;
};

export const agentTools = [
  {
    type: "function" as const,
    function: {
      name: "save_and_send_cv",
      description:
        "Save the visitor email and email them Kiran's CV. Use when they want the resume and you have an email.",
      parameters: {
        type: "object",
        properties: {
          email: { type: "string", description: "Visitor email address" },
          name: { type: "string", description: "Visitor name if known" },
        },
        required: ["email"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "save_lead",
      description: "Save a visitor email for follow-up without sending the CV yet.",
      parameters: {
        type: "object",
        properties: {
          email: { type: "string" },
          name: { type: "string" },
        },
        required: ["email"],
      },
    },
  },
];

export async function runTool(
  name: string,
  args: { email?: string; name?: string },
): Promise<ToolResult> {
  const email = args.email ? extractEmail(args.email) || args.email.trim() : "";
  if (!isValidEmail(email)) {
    return {
      ok: false,
      cvSent: false,
      stored: false,
      downloadUrl: "/kiran-sukumaran-cv.pdf",
      message: "That email did not look valid. Ask them to repeat it.",
    };
  }

  const wantsCv = name === "save_and_send_cv";
  const cvSent = wantsCv ? await sendCvEmail(email, args.name) : false;
  await saveLead({
    email,
    name: args.name,
    cvRequested: wantsCv,
    cvSent,
  });
  await notifyOwner(email, cvSent);

  if (wantsCv && cvSent) {
    return {
      ok: true,
      email,
      cvSent: true,
      stored: true,
      downloadUrl: "/kiran-sukumaran-cv.pdf",
      message: `CV emailed to ${email}.`,
    };
  }

  if (wantsCv && !mailConfigured()) {
    return {
      ok: true,
      email,
      cvSent: false,
      stored: true,
      downloadUrl: "/kiran-sukumaran-cv.pdf",
      message: `Saved ${email}. Email sending is not configured, so offer the on-site download.`,
    };
  }

  if (wantsCv) {
    return {
      ok: true,
      email,
      cvSent: false,
      stored: true,
      downloadUrl: "/kiran-sukumaran-cv.pdf",
      message: `Saved ${email}, but the email send failed. Offer the download link.`,
    };
  }

  return {
    ok: true,
    email,
    cvSent: false,
    stored: true,
    downloadUrl: "/kiran-sukumaran-cv.pdf",
    message: `Saved ${email} for follow-up.`,
  };
}
