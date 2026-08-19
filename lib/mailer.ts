import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * Outbound mail for website enquiries.
 *
 * `server-only` first, for the same reason as lib/supabase.ts: this module
 * reads the mailbox password. If it were ever pulled into a client component
 * the import would fail the build rather than quietly ship the credential to
 * every visitor.
 *
 * None of these values are defaulted in code. An unconfigured deployment
 * refuses to claim an enquiry was delivered — see `isMailConfigured`.
 */

const HOST = process.env.SMTP_HOST;
const PORT = Number(process.env.SMTP_PORT ?? 587);
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;

/**
 * Where enquiries land.
 *
 * One inbox for now, at the client's instruction: the form asks which team
 * should see the enquiry and every answer still goes to `info@`. The choice is
 * not discarded — it leads the subject line and the body — so the inbox can be
 * triaged by eye today and split by address later without the form changing.
 *
 * When that day comes, this is the seam: return a different address per
 * `route` in `recipientFor` below, and nothing else moves.
 */
const TO = process.env.ENQUIRY_TO || USER;

export function isMailConfigured(): boolean {
  return Boolean(HOST && USER && PASS && TO);
}

let transport: Transporter | null = null;

function getTransport(): Transporter {
  if (!isMailConfigured()) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS.");
  }
  if (!transport) {
    transport = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      /*
        587 is the submission port and speaks STARTTLS: the connection opens in
        the clear and is upgraded before the password crosses it. That is why
        `secure` is false here — `secure: true` means implicit TLS from the
        first byte, which is port 465, and setting it on 587 hangs until the
        socket times out rather than failing with anything that names the cause.

        `requireTLS` is the part that matters for safety. Without it, a server
        that fails to offer STARTTLS would be talked to in plain text and the
        mailbox password would go over the wire unencrypted; with it, the send
        fails instead.
      */
      secure: PORT === 465,
      requireTLS: PORT !== 465,
      auth: { user: USER, pass: PASS },
      // A form submission is holding an HTTP request open while this runs, so
      // it fails in seconds rather than leaving the visitor watching a spinner.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return transport;
}

/**
 * Which inbox an enquiry goes to. One for now — see the note on `TO`.
 *
 * The parameter is unused on purpose and kept rather than dropped: it is the
 * whole interface this function exists to have. Splitting the teams into their
 * own addresses is then a change to this body alone, with no caller touched
 * and no argument to go and find.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function recipientFor(route: string): string {
  return TO!;
}

export type Enquiry = {
  receivedAt: string;
  mode: string;
  route: string;
  routeLabel: string;
  interest: string;
  organisation: string;
  organisationType: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
};

/** Escape anything that ends up inside the HTML part. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function subjectFor(e: Enquiry): string {
  /*
    Written to be scannable in a list of unread mail: the team first, because
    that is how this inbox will be triaged while everything arrives in one
    place, then who it is from and where they are from.

    Newlines are stripped rather than trusted. A header containing CR or LF is
    how a header-injection attack adds its own — a `Bcc:` of its choosing, for
    instance — and every part of this line comes from a public form.
  */
  return `[${e.routeLabel}] ${e.name} — ${e.organisation}`.replace(/[\r\n]+/g, " ").slice(0, 180);
}

function textFor(e: Enquiry): string {
  return [
    `New enquiry from the OrbisMoneta website`,
    ``,
    `Team requested   ${e.routeLabel}`,
    `Area of interest ${e.interest}`,
    `Form             ${e.mode}`,
    ``,
    `Name             ${e.name}`,
    `Email            ${e.email}`,
    `Phone            ${e.phone ?? "—"}`,
    `Organisation     ${e.organisation} (${e.organisationType})`,
    ``,
    `Message`,
    `${e.message || "— none given —"}`,
    ``,
    `Received ${new Date(e.receivedAt).toUTCString()}`,
    `Reply to this email to answer ${e.name} directly.`,
  ].join("\n");
}

function htmlFor(e: Enquiry): string {
  const row = (label: string, value: string) =>
    `<tr>
       <td style="padding:6px 16px 6px 0;color:#6e7a90;font-size:13px;white-space:nowrap;vertical-align:top">${esc(label)}</td>
       <td style="padding:6px 0;color:#0a1533;font-size:14px">${esc(value)}</td>
     </tr>`;

  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#002ea6">OrbisMoneta — website enquiry</p>
  <h2 style="margin:0 0 18px;font-size:20px;color:#0a1533">${esc(e.routeLabel)}</h2>
  <table style="border-collapse:collapse;width:100%">
    ${row("Name", e.name)}
    ${row("Email", e.email)}
    ${row("Phone", e.phone ?? "—")}
    ${row("Organisation", `${e.organisation} (${e.organisationType})`)}
    ${row("Area of interest", e.interest)}
    ${row("Form", e.mode)}
  </table>
  <div style="margin:20px 0 0;padding:16px;background:#f7f9fc;border-radius:10px">
    <p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6e7a90">Message</p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#0a1533;white-space:pre-wrap">${esc(e.message) || "<em style='color:#6e7a90'>none given</em>"}</p>
  </div>
  <p style="margin:20px 0 0;font-size:12px;color:#6e7a90">
    Received ${esc(new Date(e.receivedAt).toUTCString())}. Reply to this email to answer ${esc(e.name)} directly.
  </p>
</div>`;
}

/**
 * Deliver one enquiry. Throws if it does not leave the building.
 *
 * Deliberately not swallowed, unlike the analytics writes: a visitor who is
 * told "enquiry received" when nothing was sent has been lied to, and the
 * enquiry is gone. The caller turns a throw here into an honest error and the
 * form shows the address to write to instead.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  await getTransport().sendMail({
    /*
      From is the authenticated mailbox, never the enquirer.

      Sending as the visitor's own address is the obvious thing to write and it
      is what gets a domain's mail marked as spam: the message would fail SPF
      and DKIM for whatever domain they typed. Their address goes in Reply-To,
      so pressing Reply still writes back to them.
    */
    from: `"OrbisMoneta Website" <${USER}>`,
    to: recipientFor(enquiry.route),
    replyTo: `"${enquiry.name.replace(/["\r\n]/g, "")}" <${enquiry.email}>`,
    subject: subjectFor(enquiry),
    text: textFor(enquiry),
    html: htmlFor(enquiry),
  });
}

/** Open a connection and authenticate, without sending anything. */
export async function verifyMail(): Promise<void> {
  await getTransport().verify();
}
