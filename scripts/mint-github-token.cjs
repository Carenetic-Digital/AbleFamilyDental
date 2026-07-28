#!/usr/bin/env node
/**
 * Mints a GitHub App installation access token.
 *
 * Reads from environment:
 *   GITHUB_APP_ID            - The GitHub App's ID
 *   GITHUB_APP_PRIVATE_KEY   - The PEM-encoded private key (newlines as \n or literal)
 *   GITHUB_APP_INSTALLATION_ID - The installation ID for the org
 *
 * Prints the token (ghs_...) to stdout on success.
 * Exits non-zero on failure.
 *
 * Uses only Node.js built-ins (no dependencies).
 */

const crypto = require('node:crypto');
const https = require('node:https');

const appId = process.env.GITHUB_APP_ID;
const rawKey = process.env.GITHUB_APP_PRIVATE_KEY;
const installationId = process.env.GITHUB_APP_INSTALLATION_ID;

if (!appId || !rawKey || !installationId) {
  console.error('[mint-token] Missing required env vars: GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, GITHUB_APP_INSTALLATION_ID');
  process.exit(1);
}

// Handle private key that may have literal \n instead of real newlines
const privateKey = rawKey.includes('\\n') ? rawKey.replace(/\\n/g, '\n') : rawKey;

function base64url(input) {
  if (typeof input === 'string') input = Buffer.from(input);
  return input.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function createJWT() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iat: now - 60,        // issued 60s ago (clock skew tolerance)
    exp: now + 10 * 60,   // expires in 10 minutes
    iss: appId,
  };

  const segments = base64url(JSON.stringify(header)) + '.' + base64url(JSON.stringify(payload));
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(segments);
  const signature = base64url(sign.sign(privateKey));

  return segments + '.' + signature;
}

function httpsPost(url, headers) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: 'POST',
      headers: {
        ...headers,
        'User-Agent': 'sparkable-cms-deploy',
        Accept: 'application/vnd.github+json',
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf-8');
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`GitHub API ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const jwt = createJWT();
  const data = await httpsPost(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    { Authorization: `Bearer ${jwt}` },
  );
  // Print only the token to stdout (entrypoint.sh captures this)
  process.stdout.write(data.token);
}

main().catch((err) => {
  console.error(`[mint-token] ${err.message}`);
  process.exit(1);
});
