import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Lead = {
  id: string;
  email: string;
  name?: string;
  source: "voice-agent";
  cvRequested: boolean;
  cvSent: boolean;
  notes?: string;
  createdAt: string;
};

const LEADS_PATH = path.join(process.cwd(), "data", "leads.json");

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await readFile(LEADS_PATH, "utf8");
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLeads(leads: Lead[]): Promise<void> {
  await mkdir(path.dirname(LEADS_PATH), { recursive: true });
  await writeFile(LEADS_PATH, `${JSON.stringify(leads, null, 2)}\n`, "utf8");
}

export async function saveLead(input: {
  email: string;
  name?: string;
  cvRequested?: boolean;
  cvSent?: boolean;
  notes?: string;
}): Promise<Lead> {
  const leads = await readLeads();
  const existing = leads.find((lead) => lead.email === input.email.toLowerCase());
  const now = new Date().toISOString();

  if (existing) {
    existing.name = input.name || existing.name;
    existing.cvRequested = Boolean(input.cvRequested || existing.cvRequested);
    existing.cvSent = Boolean(input.cvSent || existing.cvSent);
    existing.notes = input.notes || existing.notes;
    await writeLeads(leads);
    return existing;
  }

  const lead: Lead = {
    id: `lead_${Date.now()}`,
    email: input.email.toLowerCase(),
    name: input.name,
    source: "voice-agent",
    cvRequested: Boolean(input.cvRequested),
    cvSent: Boolean(input.cvSent),
    notes: input.notes,
    createdAt: now,
  };
  leads.unshift(lead);
  await writeLeads(leads);
  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  return readLeads();
}
