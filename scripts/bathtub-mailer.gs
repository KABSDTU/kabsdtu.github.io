/**
 * KABS bathtub order mailer
 * --------------------------
 * Receives bathtub-order JSON from the website and forwards a clean,
 * structured email to sbukabs@pf.dk. Optionally CCs the submitter so
 * they have a confirmation copy.
 *
 * ─── How to deploy ──────────────────────────────────────────────────
 *  1. Visit https://script.google.com/ and create a new project.
 *  2. Paste the contents of this file into Code.gs.
 *  3. (Optional) Edit RECIPIENT below if you want to test against your
 *     own mailbox first.
 *  4. Click Deploy → New deployment → Type: Web app.
 *       Description: "KABS bathtub order mailer"
 *       Execute as:  Me  (your Google account)
 *       Who has access: Anyone
 *  5. Authorise the script when prompted (it needs Gmail send access).
 *  6. Copy the Web app URL it gives you.
 *  7. In static/js/bathtub-form.js, replace the value of
 *     KABS_BATHTUB_ENDPOINT with that URL, commit, and push.
 *
 * ─── How it works ──────────────────────────────────────────────────
 *  - The form posts JSON with text/plain content-type so the request
 *    qualifies as a "simple" CORS request and Apps Script can serve it
 *    without preflight headaches.
 *  - We MailApp.sendEmail(...) to RECIPIENT with the order details
 *    formatted as plain-text + HTML, plus reply-to set to the renter
 *    so KABS can reply directly from Gmail.
 */

const RECIPIENT = "sbukabs@pf.dk";
const SUBJECT_PREFIX = "Bathtub order";   // becomes "Bathtub order for [trip]"

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    sendOrderEmail(data);
    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

// Friendly response if someone opens the URL in a browser.
function doGet() {
  return ContentService
    .createTextOutput("KABS bathtub mailer is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function sendOrderEmail(d) {
  const subject = `${SUBJECT_PREFIX} for ${d.tripName || "(no trip name)"}`;

  const lines = [
    `New bathtub order received via blivawesome.dk`,
    ``,
    `Trip:        ${d.tripName}`,
    `Loan from:   ${d.loanFrom}`,
    `Loan to:     ${d.loanTo}`,
    `Loan days:   ${d.loanDays}`,
    `Renter:      ${d.renterName}`,
    `Phone:       ${d.renterPhone}`,
    `Email:       ${d.renterEmail}`,
    `Pickup help: ${d.pickupHelp ? "YES" : "no"}`,
    `Language:    ${d.lang}`,
    `Estimated total: ${d.estimatedTotal}`,
    ``,
    `Items:`,
  ];
  (d.items || []).forEach((it) => lines.push(`  - ${it.qty}× ${it.name}`));
  if (d.extraComments) {
    lines.push("", "Extra comments:", d.extraComments);
  }
  const text = lines.join("\n");

  // Pretty HTML version.
  const escapeHtml = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const itemsRows = (d.items || []).map(it =>
    `<tr><td style="padding:4px 8px;border:1px solid #ddd;">${it.qty}</td>
         <td style="padding:4px 8px;border:1px solid #ddd;">${escapeHtml(it.name)}</td></tr>`
  ).join("");
  const html = `
    <div style="font-family:Arial,sans-serif;color:#222;">
      <h2 style="color:#007ca5;margin:0 0 8px;">New bathtub order</h2>
      <p style="margin:0 0 12px;">Submitted via <a href="https://blivawesome.dk/badekar.html">blivawesome.dk/badekar</a>.</p>
      <table style="border-collapse:collapse;margin-bottom:12px;">
        <tr><td style="padding:3px 10px;color:#666;">Trip</td><td><strong>${escapeHtml(d.tripName)}</strong></td></tr>
        <tr><td style="padding:3px 10px;color:#666;">Loan period</td><td>${escapeHtml(d.loanFrom)} → ${escapeHtml(d.loanTo)} (${d.loanDays} days)</td></tr>
        <tr><td style="padding:3px 10px;color:#666;">Renter</td><td>${escapeHtml(d.renterName)}</td></tr>
        <tr><td style="padding:3px 10px;color:#666;">Phone</td><td>${escapeHtml(d.renterPhone)}</td></tr>
        <tr><td style="padding:3px 10px;color:#666;">Email</td><td>${escapeHtml(d.renterEmail)}</td></tr>
        <tr><td style="padding:3px 10px;color:#666;">Pickup help</td><td>${d.pickupHelp ? "YES — please coordinate" : "no"}</td></tr>
        <tr><td style="padding:3px 10px;color:#666;">Estimated total</td><td>${escapeHtml(d.estimatedTotal)}</td></tr>
      </table>

      <h3 style="margin:12px 0 4px;">Items</h3>
      <table style="border-collapse:collapse;">
        <thead><tr>
          <th style="padding:4px 8px;border:1px solid #ddd;background:#007ca5;color:#fff;text-align:left;">Qty</th>
          <th style="padding:4px 8px;border:1px solid #ddd;background:#007ca5;color:#fff;text-align:left;">Item</th>
        </tr></thead>
        <tbody>${itemsRows || `<tr><td colspan="2" style="padding:4px 8px;border:1px solid #ddd;color:#777;">No items selected</td></tr>`}</tbody>
      </table>

      ${d.extraComments ? `<h3 style="margin:14px 0 4px;">Extra comments</h3>
        <p style="white-space:pre-wrap;background:#f7f7f7;padding:8px 10px;border-radius:4px;">${escapeHtml(d.extraComments)}</p>` : ""}
    </div>
  `;

  MailApp.sendEmail({
    to: RECIPIENT,
    cc: d.renterEmail || undefined,
    replyTo: d.renterEmail || undefined,
    subject,
    body: text,
    htmlBody: html,
    name: "KABS bathtub orders",
  });
}

function jsonResponse(obj, status) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
