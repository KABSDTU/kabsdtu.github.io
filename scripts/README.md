# Bathtub order mailer

This folder holds the small Google Apps Script that powers the new
bathtub-order form on `/badekar.html`. It receives JSON from the
website and forwards it as a clean email to `sbukabs@pf.dk`.

See `bathtub-mailer.gs` for the full deployment guide. Short version:

1. Create a new Apps Script project at <https://script.google.com>.
2. Paste `bathtub-mailer.gs` into `Code.gs` and save.
3. **Deploy → New deployment → Web app**.
   - Execute as: *Me*
   - Who has access: *Anyone*
4. Authorise the Gmail/MailApp scope when prompted.
5. Copy the resulting Web-app URL.
6. Open `static/js/bathtub-form.js` and replace the value of
   `KABS_BATHTUB_ENDPOINT` with that URL.
7. Commit and push the change.

You can deploy this under **any Google account** — it does not need
access to the private PF Drive. The script just sends an email to
`sbukabs@pf.dk` via the deploying account's Gmail.
