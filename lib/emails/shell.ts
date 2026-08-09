import { siteUrl } from "@/lib/site";

export { siteUrl };

export const PALETTE = {
  tealDark: "#02232A",
  teal: "#054753",
  tealAccent: "#439aa9",
  border: "#E3E7E7",
  bgSoft: "#F7F8F8",
  bgOuter: "#EEF1F1",
  text: "#0A0A0A",
  textMuted: "#6B7573",
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Table-based layout throughout — Outlook desktop renders email HTML with
// Word's engine, which ignores flexbox/grid and mostly ignores border-radius,
// so this intentionally avoids both rather than degrading badly there.
export function buildEmailShell(opts: {
  previewText: string;
  eyebrow: string;
  heading: string;
  bodyHtml: string;
}): string {
  // Dark mark on a plain white card — a small brand touch rather than a
  // colored banner, so the email reads as a message, not an ad.
  const logo = `${siteUrl()}/Main_Logo_Dark.png`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(opts.heading)}</title>
</head>
<body style="margin:0; padding:0; background:${PALETTE.bgOuter}; font-family:-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(opts.previewText)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PALETTE.bgOuter};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:560px; background:#FFFFFF; border:1px solid ${PALETTE.border};">

          <tr>
            <td align="center" style="padding:30px 32px 18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="padding-right:7px; vertical-align:middle;">
                    <img src="${logo}" width="15" alt="" style="display:block; height:auto;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:11px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:${PALETTE.tealDark};">
                      Dami Owolabi
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px;">
              <div style="height:1px; background:${PALETTE.border}; line-height:1px; font-size:1px;">&nbsp;</div>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 32px 8px;">
              <div style="font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:${PALETTE.tealAccent}; margin-bottom:10px;">
                ${escapeHtml(opts.eyebrow)}
              </div>
              <div style="font-size:22px; font-weight:700; color:${PALETTE.tealDark}; line-height:1.28; margin-bottom:20px;">
                ${escapeHtml(opts.heading)}
              </div>
              <div style="font-size:15px; line-height:1.65; color:${PALETTE.text};">
                ${opts.bodyHtml}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 32px;">
              <div style="height:1px; background:${PALETTE.border}; line-height:1px; font-size:1px;">&nbsp;</div>
            </td>
          </tr>

          <tr>
            <td style="background:${PALETTE.bgSoft}; padding:20px 32px; border-top:1px solid ${PALETTE.border};">
              <div style="font-size:12px; color:${PALETTE.textMuted}; line-height:1.6;">
                Dami Owolabi — Marketing, Growth &amp; Brand Strategy<br />
                <a href="${siteUrl()}" style="color:${PALETTE.tealAccent}; text-decoration:none;">${siteUrl().replace(/^https?:\/\//, "")}</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function fieldPill(value: string): string {
  return `<div style="margin:18px 0; padding:10px 14px; background:${PALETTE.bgSoft}; border:1px solid ${PALETTE.border}; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:12.5px; color:${PALETTE.text}; word-break:break-all;">${escapeHtml(value)}</div>`;
}
