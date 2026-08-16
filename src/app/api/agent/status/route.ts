import { NextResponse } from "next/server";
import { llmConfigured } from "@/lib/agent/llm";
import { mailConfigured } from "@/lib/agent/mail";

export async function GET() {
  return NextResponse.json({
    llm: llmConfigured(),
    mail: mailConfigured(),
  });
}
