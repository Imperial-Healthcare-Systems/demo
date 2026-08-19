# Enquiry email — how the forms deliver

Both forms on the site — the one on `/contact` and the one inside the enquiry
dialog — post to `POST /api/enquiry`, which emails the submission over SMTP
using [nodemailer](https://nodemailer.com).

There is only one form component ([`components/EnquiryForm.tsx`](../components/EnquiryForm.tsx))
mounted in two places, so wiring the endpoint wired both.

---

## Setting it up

Five environment variables. Names are in [`.env.example`](../.env.example);
values are held with the project credentials and are deliberately not written
into this repository, which is public.

| Name | What it is |
| --- | --- |
| `SMTP_HOST` | the mail server, e.g. `mail.yourdomain.com` |
| `SMTP_PORT` | `587` for STARTTLS (the normal case) or `465` for implicit TLS |
| `SMTP_USER` | the mailbox to authenticate and send as |
| `SMTP_PASS` | that mailbox's password |
| `ENQUIRY_TO` | where enquiries land. Defaults to `SMTP_USER` when unset |

**Locally** — copy `.env.example` to `.env.local`, fill it in, restart `npm run dev`.

**On Vercel** — Project → Settings → Environment Variables, then redeploy. A new
variable does not reach a build that has already happened.

With them unset the endpoint returns **503** and the form shows its error state.
That is deliberate: the success screen tells the visitor their enquiry has been
received, and saying so when nothing was sent and nothing was stored loses the
enquiry and misleads the person who wrote it.

## Which team gets it

The form asks *"Which team should see this?"* and offers four routes — Strategy
& Advisory, Partnership Enquiries, Media & Press, General Enquiries.

**Every answer currently goes to one inbox**, as instructed. The choice is not
thrown away: it leads the subject line and heads the body, so the inbox can be
triaged by eye.

```
[Strategy & Advisory] Jane Doe — Acme Bank
```

To split them into their own addresses later, change `recipientFor` in
[`lib/mailer.ts`](../lib/mailer.ts) to return a different address per route.
That is the only change — the form, the endpoint and the content already carry
the route through, and `content/contact.ts` already holds a per-team address for
each one.

## What arrives

Plain text and HTML, with the name, email, phone, organisation and type, the
area of interest, which form it came from, and the message.

Two details worth knowing:

- **From** is always the authenticated mailbox, never the visitor's address.
  Sending as the visitor is the obvious thing to write and it is what gets a
  domain's mail marked as spam — the message would fail SPF and DKIM for
  whatever domain they typed.
- **Reply-To** is the visitor. So pressing Reply in the inbox writes back to
  the customer, which is what you want on every one of these.

## Safety

- The mailbox password is read only in [`lib/mailer.ts`](../lib/mailer.ts),
  which is marked `server-only` — an accidental import into client code fails
  the build instead of shipping the credential to browsers.
- `requireTLS` is set on port 587, so a server that failed to offer STARTTLS
  would cause the send to fail rather than the password crossing the wire in
  clear text.
- Every field is length-capped, and the two headers a submitter can reach —
  Subject and the Reply-To display name — have CR and LF stripped. That is the
  header-injection defence: a name containing a newline cannot add a `Bcc:` of
  its own. Verified by rendering the MIME with a hostile name; the injected
  header does not appear.
- The team is a table lookup against `contactRoutes`, so an unrecognised value
  becomes General Enquiries rather than reaching the mail headers as typed.

## If enquiries stop arriving

**Form shows an error immediately** — check the server logs. A 503 means the
variables are missing from that environment; a 502 means the mail server
refused. The full enquiry is written to the log on failure, so it is
recoverable rather than lost.

**Nothing in the inbox and no error** — check spam, then confirm `ENQUIRY_TO` is
the address you are actually watching.

**Authentication failures after a password change** — `SMTP_PASS` has to be
updated in the hosting environment too, and the site redeployed.

To check credentials without sending anything, `verifyMail()` in
[`lib/mailer.ts`](../lib/mailer.ts) opens a connection and authenticates only.
