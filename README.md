# Kiran Sukumaran — Portfolio

Personal site: [kiransukumaran.github.io](https://kiransukumaran.github.io)

Technical Lead across backend, DevOps, and AI.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Milo is the **Call** control in the corner.

## Voice agent

Milo is an AI agent and Kiran's personal assistant. On GitHub Pages he answers from the on-site knowledge brain. Locally, optional API keys enable richer answers and emailing the CV.

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Open-ended questions (optional) |
| `RESEND_API_KEY` + `MAIL_FROM` | Email the CV PDF during the call |
| `LEADS_ADMIN_TOKEN` | View stored emails at `/leads` |

## Deploy

Pushes to `main` publish [GitHub Pages](https://kiransukumaran.github.io) via `.github/workflows/pages.yml`.
