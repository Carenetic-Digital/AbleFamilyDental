import { test, expect } from '@playwright/test';

/**
 * Staging CSP smoke test.
 * Run against Workers with:
 *   PLAYWRIGHT_BASE_URL=https://able-family-dental.spark0.io npx playwright test tests/csp-smoke.spec.ts
 *
 * Captures console CSP violations and failed third-party requests on
 * homepage + pages that load BugHerd, JotForm, RecallMax, Maps, fonts.
 */

const PAGES = [
  '/',
  '/contact/',
  '/book/',
  '/new-patients/forms/',
  '/existing-patients/forms/',
  '/refer/',
  '/smile/',
  '/services/orthodontics/invisalign/',
] as const;

type Finding = {
  page: string;
  kind: 'csp' | 'requestfailed' | 'console-error';
  text: string;
};

function isNoise(text: string): boolean {
  const t = text.toLowerCase();
  return (
    t.includes('html table exporter') ||
    t.includes('apollo devtools') ||
    t.includes('download the apollo') ||
    t.includes('favicon') ||
    // Third-party Storage Access API probes (BugHerd/JotForm) — not CSP
    t.includes('requeststorageaccess') ||
    // Browser-extension / DevTools noise
    t.includes('chrome-extension://') ||
    t.includes('moz-extension://')
  );
}

function isCspRelated(text: string): boolean {
  const t = text.toLowerCase();
  return (
    t.includes('content security policy') ||
    t.includes('violates the following content security policy') ||
    t.includes('csp') && t.includes('violat') ||
    t.includes('refused to connect') ||
    t.includes('refused to load') ||
    t.includes('refused to frame') ||
    t.includes('refused to execute') ||
    t.includes('permissions policy violation')
  );
}

test.describe('CSP staging smoke', () => {
  test('homepage + embed pages have no CSP violations', async ({ page, baseURL }) => {
    test.setTimeout(180_000);
    expect(baseURL, 'PLAYWRIGHT_BASE_URL should point at staging').toBeTruthy();

    const findings: Finding[] = [];

    await page.addInitScript(() => {
      document.addEventListener('securitypolicyviolation', (e) => {
        const detail = `[securitypolicyviolation] ${e.violatedDirective} blocked ${e.blockedURI}`;
        console.error(detail);
      });
    });

    page.on('console', (msg) => {
      const text = msg.text();
      if (isNoise(text)) return;
      if (msg.type() === 'error' || isCspRelated(text)) {
        findings.push({
          page: page.url(),
          kind: isCspRelated(text) ? 'csp' : 'console-error',
          text,
        });
      }
    });

    page.on('pageerror', (err) => {
      const text = String(err);
      if (isNoise(text)) return;
      findings.push({ page: page.url(), kind: 'console-error', text });
    });

    page.on('requestfailed', (req) => {
      const url = req.url();
      const failure = req.failure()?.errorText ?? 'unknown';
      if (isNoise(url) || isNoise(failure)) return;
      // Ignore aborted navigations / cancellations from SPA-ish widgets
      if (/ERR_ABORTED|net::ERR_ABORTED/i.test(failure)) return;
      // Same-origin asset 404s are out of scope for CSP audit
      try {
        const u = new URL(url);
        const base = new URL(baseURL!);
        if (u.origin === base.origin) return;
      } catch {
        /* keep */
      }
      findings.push({
        page: page.url(),
        kind: 'requestfailed',
        text: `${failure} → ${url}`,
      });
    });

    for (const path of PAGES) {
      await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 60_000 });
      // Give BugHerd / JotForm / MaxAssist / Maps time to connect
      await page.waitForTimeout(4500);
    }

    const csp = findings.filter((f) => f.kind === 'csp');
    const failed = findings.filter((f) => f.kind === 'requestfailed');
    const errors = findings.filter((f) => f.kind === 'console-error');

    const report = [
      `CSP findings: ${csp.length}`,
      ...csp.map((f) => `  [${f.page}] ${f.text}`),
      `Failed third-party requests: ${failed.length}`,
      ...failed.map((f) => `  [${f.page}] ${f.text}`),
      `Other console errors: ${errors.length}`,
      ...errors.map((f) => `  [${f.page}] ${f.text}`),
    ].join('\n');

    console.log('\n===== CSP SMOKE REPORT =====\n' + report + '\n============================\n');

    expect(csp, report).toEqual([]);
  });
});
