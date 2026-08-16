# Kiran Sukumaran — Portfolio

Personal site: [kiransukumaran.github.io](https://kiransukumaran.github.io)

Technical Lead across backend, DevOps, and AI.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Voice agent

Milo is built in the repo but hidden on the live site until it is ready. To turn him on locally, set `NEXT_PUBLIC_ENABLE_MILO=true` in `.env.local`.

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Open-ended questions (optional) |
| `RESEND_API_KEY` + `MAIL_FROM` | Email the CV PDF during the call |
| `LEADS_ADMIN_TOKEN` | View stored emails at `/leads` |

## Deploy

Pushes to `main` publish [GitHub Pages](https://kiransukumaran.github.io) via `.github/workflows/pages.yml`.
