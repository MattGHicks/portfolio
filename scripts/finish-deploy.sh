#!/usr/bin/env bash
# scripts/finish-deploy.sh
#
# Run this AFTER you've installed the Neon Postgres integration in the Vercel
# dashboard (https://vercel.com/mattghicks-projects/portfolio/storage). The
# integration auto-creates DATABASE_URL in production.
#
# This script:
#   1. Pulls the production env vars (including the freshly-injected DATABASE_URL)
#   2. Applies the initial schema migration to the prod database
#   3. Seeds the prod database with the current pipeline state
#   4. Optionally triggers a production redeploy
set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Pulling production env vars from Vercel…"
vercel env pull .env.production.local --environment=production --yes

# shellcheck disable=SC1091
set -a
source .env.production.local
set +a

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "✗ DATABASE_URL not found in production env vars."
  echo "  Install the Neon Postgres integration first:"
  echo "  https://vercel.com/mattghicks-projects/portfolio/storage"
  exit 1
fi

# Strip postgres prefix mismatches if any (Neon sometimes provides 'postgres://' which psql accepts)
echo "→ Applying schema migration to production DB…"
psql "$DATABASE_URL" -f drizzle/0000_initial.sql

echo "→ Seeding production DB…"
DATABASE_URL="$DATABASE_URL" npx tsx scripts/seed.ts

echo
echo "✓ Database is set up and seeded."
echo
echo "→ Triggering production redeploy so cron jobs pick up DATABASE_URL…"
vercel deploy --prod --yes

echo
echo "✓ Done. Visit https://www.digitalfish.io/admin/login"
echo "  Password is in /tmp/admin-password.txt"
