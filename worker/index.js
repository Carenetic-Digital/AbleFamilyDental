/**
 * Thin proxy in front of the static-assets binding.
 *
 * Production traffic routes browser → Approximated.app proxy → this Worker.
 * Approximated's cache has a revalidation bug: when a browser revalidates
 * with If-None-Match, Approximated sometimes answers `200` with
 * `content-length: 0` instead of `304 Not Modified` — the browser renders
 * that empty body as a blank page (or a broken asset) with no console
 * errors. The bug is state-dependent, so a site that revalidates correctly
 * today is still exposed.
 *
 * Workaround: never emit validators (ETag/Last-Modified) so browsers never
 * send conditional requests, and drop conditional headers from inbound
 * requests so clients that already cached an ETag get a full 200 body
 * instead of a 304. Requires `run_worker_first = true` in wrangler.toml —
 * otherwise asset requests bypass this Worker entirely.
 */
export default {
  async fetch(request, env) {
    const headers = new Headers(request.headers);
    headers.delete("if-none-match");
    headers.delete("if-modified-since");

    const response = await env.ASSETS.fetch(new Request(request, { headers }));

    const stripped = new Response(response.body, response);
    stripped.headers.delete("etag");
    stripped.headers.delete("last-modified");
    return stripped;
  },
};
