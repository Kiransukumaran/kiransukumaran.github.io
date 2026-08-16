import { NextResponse } from "next/server";
import { listLeads } from "@/lib/agent/leads";

function authorized(request: Request): boolean {
  const token = process.env.LEADS_ADMIN_TOKEN;
  if (!token) return false;
  const header = request.headers.get("authorization") || "";
  const query = new URL(request.url).searchParams.get("token");
  return header === `Bearer ${token}` || query === token;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await listLeads();
  return NextResponse.json({ leads });
}
