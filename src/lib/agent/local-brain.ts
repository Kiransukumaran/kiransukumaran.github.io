import { extractEmail } from "@/lib/agent/email";
import { knowledgeReply, type ChatMessage } from "@/lib/agent/knowledge-reply";
import { runTool, type ToolResult } from "@/lib/agent/tools";

export type { ChatMessage };

function askedForCv(text: string): boolean {
  return /\b(cv|resume|curriculum|pdf|send me|email me)\b/i.test(text);
}

function lastAssistantAskedForEmail(history: ChatMessage[]): boolean {
  const last = [...history].reverse().find((item) => item.role === "assistant");
  return Boolean(last && /email/i.test(last.content));
}

export async function localReply(
  history: ChatMessage[],
  userText: string,
): Promise<{ reply: string; tool?: ToolResult }> {
  const email = extractEmail(userText);
  const wantsCv = askedForCv(userText) || lastAssistantAskedForEmail(history);

  if (email && wantsCv) {
    const tool = await runTool("save_and_send_cv", { email });
    const reply = tool.cvSent
      ? `Done. I have emailed Kiran's CV to ${email}. You can also download it from this page.`
      : `I have saved ${email}. You can download the CV from this page now, and Kiran can follow up by email.`;
    return { reply, tool };
  }

  if (email) {
    const tool = await runTool("save_lead", { email });
    return {
      reply: `Got it. I have stored ${email}. Would you like me to send Kiran's CV there as well?`,
      tool,
    };
  }

  return knowledgeReply(history, userText);
}
