# Career Ops dashboard — deploy notes

The `/admin` route group is the new password-protected career dashboard.
Public portfolio at `digitalfish.io` is unchanged; admin lives at `digitalfish.io/admin`.

## Local dev (already set up)

```bash
# Postgres is running locally via Homebrew (postgresql@14)
# Database `career_dashboard` exists with seed data:
#   16 roles · 10 applications · 16 watchlist companies · 21 standing answers
# .env.local has all the dev values (ADMIN_PASSWORD=devpassword)

npm run dev
# → http://localhost:3000/admin/login
# Password: devpassword
```

DB scripts:
- `npm run db:push` — sync schema to DB (TTY only)
- `npm run db:generate` — generate migration SQL files
- `npm run db:seed` — re-seed from `scripts/seed.ts`
- `npm run db:reset` — drop + recreate + reseed
- `npm run db:studio` — Drizzle Studio (visual DB explorer)

## Production deploy

### 1. Provision Vercel Postgres (Neon)

1. Vercel dashboard → portfolio project → **Storage** tab → **Create Database** → **Neon (Postgres)**
2. Hobby tier is free. Pick the region closest to your audience (US East).
3. Vercel auto-injects `DATABASE_URL` into the project's env vars (production + preview).
4. From local: `vercel env pull .env.production.local` to mirror prod env locally if needed.

### 2. Apply schema to prod DB

```bash
# Either:
psql "$(vercel env pull --environment production --format dotenv | grep DATABASE_URL | cut -d= -f2- | tr -d '"')" \
  -f drizzle/0000_initial.sql

# Or simpler — link the project and use the prod connection string directly:
vercel link
vercel env pull .env.production.local
DATABASE_URL=<paste from .env.production.local> npm run db:seed
```

### 3. Set env vars in Vercel

In the Vercel dashboard → portfolio project → **Settings → Environment Variables**:

| Variable | Where | Value |
|---|---|---|
| `ADMIN_PASSWORD` | Production | Pick a strong password |
| `SESSION_SECRET` | Production | `openssl rand -hex 32` |
| `CRON_SECRET` | Production | `openssl rand -hex 32` |
| `NEXT_PUBLIC_BASE_URL` | Production | `https://digitalfish.io` |
| `GMAIL_USER` | Production | `matt@digitalfish.io` |
| `GMAIL_CLIENT_ID` | Production | from `~/.hermes/google_client_secret.json` on T630 |
| `GMAIL_CLIENT_SECRET` | Production | same file |
| `GMAIL_REFRESH_TOKEN` | Production | from `~/.hermes/google_token.json` on T630 |
| `RESEND_API_KEY` | Production | from resend.com — install Resend integration via Vercel Marketplace |
| `NOTIFICATION_EMAIL_FROM` | Production | `career@digitalfish.io` (verify the domain in Resend first) |
| `NOTIFICATION_EMAIL_TO` | Production | `matt@digitalfish.io` |
| `GITHUB_TOKEN` | Production | Fine-grained PAT with `actions: write` on `MattGHicks/portfolio` |
| `GITHUB_REPO` | Production | `MattGHicks/portfolio` |
| `GITHUB_WORKFLOW_FILE` | Production | `submit-application.yml` |

### 4. Migrate Gmail credentials from T630

```bash
# On T630:
scp matt@100.85.179.110:~/.hermes/google_token.json /tmp/
scp matt@100.85.179.110:~/.hermes/google_client_secret.json /tmp/

# Read the values
cat /tmp/google_client_secret.json
# Pull client_id, client_secret
cat /tmp/google_token.json
# Pull refresh_token
```

Set those three env vars in Vercel. Once set, the Gmail polling cron will pull new
messages from `matt@digitalfish.io` every 30 minutes.

### 5. Configure Vercel Cron

Already declared in `vercel.json`. Vercel applies cron jobs automatically on deploy to production.

Verify after deploy: Vercel dashboard → portfolio → **Cron Jobs** tab.

Schedules:
- `0 13 * * *` — discovery (9am ET)
- `*/30 * * * *` — gmail-poll (every 30 min)
- `0 12 * * *` — daily-digest (8am ET)

### 6. Configure GitHub Actions

The submit workflow is at `.github/workflows/submit-application.yml`.

Required repo secrets (Settings → Secrets and variables → Actions):
- `BASE_URL` — `https://digitalfish.io`

The workflow runs in DRY-RUN by default (fills the form, screenshots, does not click submit).
To enable real submission, set the workflow input `DRY_RUN=false` when dispatching,
or change the default in `.github/workflows/submit-application.yml`.

After 5 clean supervised submissions, you can remove the 15-minute cancel sleep
at the top of the job to make submissions immediate.

## Verifying production health

After deploy:

1. Visit `https://digitalfish.io/admin/login` → enter `ADMIN_PASSWORD`
2. Check sidebar counts match expectations
3. Hit each cron endpoint manually with the cron secret to test:
   ```bash
   curl -H "Authorization: Bearer $CRON_SECRET" https://digitalfish.io/api/cron/discovery
   curl -H "Authorization: Bearer $CRON_SECRET" https://digitalfish.io/api/cron/gmail-poll
   curl -H "Authorization: Bearer $CRON_SECRET" https://digitalfish.io/api/cron/daily-digest
   ```
4. Settings → toggle the kill switch on/off to verify guardrails work

## What's NOT wired up (intentional)

- **Auto-submit is in DRY-RUN.** Forms get prefilled, screenshotted, and stopped before submit. Set `DRY_RUN=false` in the workflow to enable real submission.
- **AI scoring/classification is manual.** The cron fetches roles + messages but does not score or classify them. Open Claude Code and say "score the unscored roles" or "classify unclassified messages" — Claude does the rubric work and writes to the DB.
- **Resume PDF.** The submitter expects `public/resume.pdf` to exist in the GitHub Action workspace. Already present in the repo.
- **Greenhouse + Lever scrapers.** Only Ashby and Greenhouse are wired in v1. Add new ATS handlers in `src/lib/discovery/`.
