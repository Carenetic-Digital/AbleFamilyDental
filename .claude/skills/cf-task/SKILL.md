---
name: cf-task
description: Execute a task on an Astro + Cloudflare Workers site, create a branch, make changes, declare affected routes, and open a PR for visual review.
---

# cf-task

You are performing a task on an Astro website deployed to Cloudflare Workers. The project uses Visual Review (Astro + Cloudflare Workers visual-diff-on-PR pipeline) to surface changes via GitHub PRs. The HTML comments below (`cf-review-routes`, `cf-review-changes`) keep their original spelling — the Visual Review action parses them by that exact name.

## Workflow

1. **Understand the task** — Read the user's request carefully. Identify which pages/routes will be affected.

2. **Create a branch** — Branch from main with a descriptive name:
   ```bash
   git checkout -b cf/<short-description>
   ```

3. **Make the changes** — Implement the requested changes to the Astro site. Follow the project's existing patterns and conventions.

4. **Identify affected routes** — Determine which routes were affected by your changes. Look at:
   - Which `.astro` files in `src/pages/` were modified
   - Which components were changed and what pages use them
   - Which layouts were changed and what pages use them

5. **Verify locally** — If a dev server is available, start it and verify your changes look correct.

6. **Commit and push** — Commit your changes with a clear message describing what was done and why.

7. **Open a PR** — Create a pull request using `gh pr create`. The PR body MUST follow this exact format with the machine-readable markers:

   ```bash
   gh pr create --title "Short description" --body "$(cat <<'EOF'
   ## Summary
   Brief description of what was changed and why.

   ## What to Look For
   Tell the reviewer exactly what they should check. Be specific:
   - "The h1 on the intake-process page should now be indigo (#6366f1)"
   - "The footer should appear at the bottom of the home page"

   ## Changes Made
   - `src/pages/intake-process.astro` — Changed h1 color to indigo
   - `src/components/Footer.astro` — Created new footer component

   <!-- cf-review-routes: /intake-process -->
   <!-- cf-review-changes: src/pages/intake-process.astro, src/components/Footer.astro -->

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   EOF
   )"
   ```

   **IMPORTANT**: The `<!-- cf-review-routes: ... -->` comment is required. List ONLY the routes that were visually affected, comma-separated. The review system parses this to determine which pages to screenshot. If you changed a layout or shared component that affects all pages, list all routes.

   The `<!-- cf-review-changes: ... -->` comment lists the files that were modified.

8. **Report back** — Tell the user:
   - What you changed
   - The PR URL
   - Which routes will be screenshotted for review

## Notes

- The GitHub Action `cf-review.yml` (the Visual Review workflow — filename kept for backward compat) will automatically deploy a preview, take before/after screenshots of ONLY the affected routes, and post them to the Visual Review server.
- The reviewer sees the review at a dedicated URL with before/after sliders, the task description, what to look for, and what files changed.
- If the reviewer requests changes, you can push additional commits — the action will re-run and update the review.
- Always be specific in "What to Look For" — the reviewer should know exactly where to focus.
