// Two cheap, account-free bot filters, meant to run before rate limiting
// even matters:
//
// 1. Honeypot — a field real visitors never see or fill in (hidden off-screen,
//    not display:none, since some bots skip those). Most bots that scrape a
//    form and fill every field blind will fill this one too.
// 2. Timing — a bot that fires the request the instant the page loads (or
//    replays a captured request) submits far faster than a human filling
//    out a multi-field form ever could.
//
// Neither is foolproof against a bot built specifically to target this site,
// but both catch the generic scraping/spam bots that hit every form on the
// public internet, which is the actual threat here.
const MIN_SUBMIT_MS = 1500;

export function looksLikeBot(input: { honeypot?: unknown; formRenderedAt?: unknown }): boolean {
  if (typeof input.honeypot === "string" && input.honeypot.trim().length > 0) {
    return true;
  }

  const renderedAt = Number(input.formRenderedAt);
  if (!Number.isFinite(renderedAt)) {
    // Missing/malformed timing field — most likely a script posting directly
    // to the endpoint rather than a browser that rendered the real form.
    return true;
  }

  return Date.now() - renderedAt < MIN_SUBMIT_MS;
}
