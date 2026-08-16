"use client";

import { FormEvent, useState } from "react";

type Lead = {
  id: string;
  email: string;
  name?: string;
  cvRequested: boolean;
  cvSent: boolean;
  createdAt: string;
};

export default function LeadsPage() {
  const [token, setToken] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch(`/api/agent/leads?token=${encodeURIComponent(token)}`);
    if (!response.ok) {
      setError("Could not load leads. Check LEADS_ADMIN_TOKEN.");
      setLeads([]);
      return;
    }
    const data = (await response.json()) as { leads: Lead[] };
    setLeads(data.leads);
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-16 text-ice">
      <p className="font-mono text-[11px] tracking-[0.28em] text-cyan uppercase">
        Voice agent // lead store
      </p>
      <h1 className="mt-3 text-4xl font-medium">Collected emails</h1>
      <form onSubmit={onSubmit} className="mt-8 flex gap-3">
        <input
          value={token}
          onChange={(event) => setToken(event.target.value)}
          type="password"
          placeholder="Admin token"
          className="flex-1 border border-line bg-ink px-3 py-2 font-mono text-sm text-ice outline-none focus:border-cyan"
        />
        <button className="btn-primary px-4 py-2 text-sm" type="submit">
          Load
        </button>
      </form>
      {error ? <p className="mt-4 text-sm text-magenta">{error}</p> : null}
      <ul className="mt-8 space-y-3">
        {leads.map((lead) => (
          <li key={lead.id} className="hud-frame p-4 font-mono text-sm">
            <p className="text-cyan">{lead.email}</p>
            <p className="mt-1 text-xs text-muted">
              {new Date(lead.createdAt).toLocaleString()} · CV requested {lead.cvRequested ? "yes" : "no"} · sent{" "}
              {lead.cvSent ? "yes" : "no"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
