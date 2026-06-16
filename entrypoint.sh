#!/bin/bash
set -e

# ── Configuration (fly.toml [env] takes precedence; defaults are local-test only) ──
GITHUB_ORG="${GITHUB_ORG:-Sparkable-CMS}"
GITHUB_REPO="${GITHUB_REPO:-site-carenetic-dental-dup}"
REPO="https://github.com/${GITHUB_ORG}/${GITHUB_REPO}.git"

# ── Mint GitHub token from App credentials (preferred) ──────────
if [ -n "$GITHUB_APP_ID" ] && [ -n "$GITHUB_APP_PRIVATE_KEY" ] && [ -n "$GITHUB_APP_INSTALLATION_ID" ]; then
  GITHUB_TOKEN=$(node /app/scripts/mint-github-token.cjs 2>/dev/null || echo "")
  export GITHUB_TOKEN
  if [ -n "$GITHUB_TOKEN" ]; then
    echo "[entrypoint] Minted fresh GitHub installation token."
  else
    echo "[entrypoint] WARNING: Token minting failed — falling back to GITHUB_TOKEN env var"
  fi
fi

# ── Initialize the persistent volume if empty (first deploy) ────
if [ ! -f /app/site-data/package.json ]; then
  echo "[entrypoint] First run — initializing site volume..."

  if [ -n "$GITHUB_TOKEN" ]; then
    AUTH_URL="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/${GITHUB_REPO}.git"
    echo "[entrypoint] Cloning from GitHub..."
    git clone "$AUTH_URL" /tmp/site-clone
    cp -a /tmp/site-clone/. /app/site-data/
    rm -rf /tmp/site-clone
  else
    echo "[entrypoint] No GITHUB_TOKEN — initializing from template..."
    cp -a /app-template/. /app/site-data/
    cd /app/site-data
    git init -b main
    git add -A
    git commit -m "initial"
  fi

  echo "[entrypoint] Site volume initialized."
else
  echo "[entrypoint] Site volume already initialized, using existing data."
fi

# ── Install / refresh volume node_modules when package-lock drifts ──
# The persistent volume keeps its own node_modules across deploys. A `fly deploy`
# rebuilds the image but never touches the volume, so when package.json gets
# bumped (e.g. a CMS version bump) the volume's installed CMS stays stale.
# Solution: compare the committed package-lock.json against npm's record of what
# was actually installed (node_modules/.package-lock.json). If they diverge —
# or node_modules is missing entirely — reinstall.
cd /app/site-data
NEEDS_INSTALL=false
if [ ! -d node_modules ] || [ ! -f node_modules/.package-lock.json ]; then
  NEEDS_INSTALL=true
  echo "[entrypoint] Volume node_modules missing — install needed."
elif ! cmp -s package-lock.json node_modules/.package-lock.json; then
  NEEDS_INSTALL=true
  echo "[entrypoint] package-lock.json drift detected — install needed."
fi

if [ "$NEEDS_INSTALL" = "true" ]; then
  if [ -n "$NPM_TOKEN" ]; then
    echo "[entrypoint] Installing dependencies into /app/site-data/node_modules..."
    # Transient ~/.npmrc — same registry/token pair the Docker build uses.
    cat > ~/.npmrc <<EOF
//npm.pkg.github.com/:_authToken=$NPM_TOKEN
@sparkable-cms:registry=https://npm.pkg.github.com
EOF
    if npm install --no-audit --no-fund; then
      echo "[entrypoint] npm install complete."
    else
      echo "[entrypoint] WARNING: npm install failed — CMS may run with stale node_modules."
    fi
    rm -f ~/.npmrc
  else
    echo "[entrypoint] WARNING: NPM_TOKEN not set — skipping npm install. Volume node_modules may be stale."
  fi
fi

# ── Configure git remote with token auth if available ────────────
if [ -n "$GITHUB_TOKEN" ]; then
  REMOTE_URL="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_ORG}/${GITHUB_REPO}.git"
  git remote set-url origin "$REMOTE_URL" 2>/dev/null || git remote add origin "$REMOTE_URL"
  echo "[entrypoint] Git remote configured for push."
else
  echo "[entrypoint] WARNING: No GITHUB_TOKEN set — publish will commit locally but not push."
fi

# ── Reconcile against origin/main on startup ────────────────────
# A fly redeploy wipes the working tree back to the image, so any unpublished
# client edits from before the deploy would otherwise vanish silently. Running
# the sync script here pulls the latest main, re-applies edits that still have
# a unique target, and writes a report for the editor banner.
SYNC_SCRIPT="/app/site-data/node_modules/@sparkable-cms/cms/scripts/run-sync.ts"
if [ -f "$SYNC_SCRIPT" ] && [ -n "$GITHUB_TOKEN" ]; then
  echo "[entrypoint] Running post-deploy sync..."
  if ! npx tsx "$SYNC_SCRIPT"; then
    echo "[entrypoint] WARNING: Sync script failed — see log above. CMS will still start."
  fi
else
  echo "[entrypoint] Skipping sync (script or token missing)."
fi

exec "$@"
