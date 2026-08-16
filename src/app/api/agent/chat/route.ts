import { NextResponse } from "next/server";
import { GREETING } from "@/lib/agent/knowledge";
import { runAgentTurn } from "@/lib/agent/llm";
import type { ChatMessage } from "@/lib/agent/local-brain";

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const recent = (hits.get(ip) || []).filter((time) => now - time < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 24;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as
    | { messages?: ChatMessage[] }
    | null;
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const sanitized = messages
    .filter(
      (item) =>
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim().length > 0,
    )
    .slice(-16)
    .map((item) => ({
      role: item.role,
      content: item.content.slice(0, 2000),
    }));

  if (sanitized.length === 0) {
    return NextResponse.json({
      reply: GREETING,
      downloadUrl: "/kiran-sukumaran-cv.pdf",
    });
  }

  const result = await runAgentTurn(sanitized);
  return NextResponse.json({
    reply: result.reply,
    stored: result.tool?.stored ?? false,
    cvSent: result.tool?.cvSent ?? false,
    email: result.tool?.email,
    downloadUrl: result.tool?.downloadUrl ?? "/kiran-sukumaran-cv.pdf",
  });
}
