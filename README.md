# Markaz Desk

This repository contains a Netlify-ready Vite + React + TypeScript starter for the Markaz management and reading system.

## Notes
- Public paper routes are open and require no account.
- The desk is protected in production unless Netlify Identity is configured and the keeper has the admin role.
- Locally, the desk remains open so the ledger can be used without Identity.
- For the paper, Netlify Prerender is mentioned as a deployment option for per-post WhatsApp and Telegram tags; this is documented in deployment notes rather than added to `netlify.toml`.
- A scheduled Netlify function is included under `netlify/functions`.
- `netlify.toml` contains security headers and SPA fallback routing.

## Scripts
- `npm install`
- `npm run dev`
- `npm run build`
