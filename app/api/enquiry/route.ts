import { NextResponse } from "next/server";
import { contactRoutes } from "@/content/contact";
import { isMailConfigured, sendEnquiry } from "@/lib/mailer";

/**
 * Enquiry endpoint.
 *
 * Both forms on the site post here — the one on /contact and the one inside
 * the enquiry dialog — and every submission is emailed to the inbox named by
 * `ENQUIRY_TO`.
 *
 * The form asks which team should see the enquiry and, at the client's
 * instruction, every answer currently goes to the same address. The choice is
 * carried into the subject line and the body rather than thrown away, so the
 * inbox can be triaged today and split into per-team addresses later by
 * changing `recipientFor` in lib/mailer.ts and nothing else.
 */

type Payload = {
  mode?: string;
  route?: string;
  interest?: string;
  message?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  organisation?: string;
  organisationType?: string;
  phone?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Cap every field before it reaches a mail header or body. */
function str(value: unknown, max = 4000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const required: (keyof Payload)[] = [
    "firstName",
    "lastName",
    "email",
    "organisation",
    "organisationType",
    "interest",
    // `message` is deliberately absent: the form makes it optional, and a
    // server that still demanded it would reject exactly the submissions the
    // form told people were fine to send.
  ];
  const missing = required.filter((key) => !String(body[key] ?? "").trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields.", fields: missing },
      { status: 422 },
    );
  }
  if (!EMAIL.test(String(body.email))) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 422 });
  }

  // The team is looked up rather than trusted. `route` arrives from a public
  // form and is only ever used through this table, so an unknown value becomes
  // "General Enquiries" instead of reaching the mail headers as typed.
  const chosen = contactRoutes.find((r) => r.id === str(body.route, 40));
  const enquiry = {
    receivedAt: new Date().toISOString(),
    mode: str(body.mode, 40) || "requirements",
    route: chosen?.id ?? "general",
    routeLabel: chosen?.title ?? "General Enquiries",
    interest: str(body.interest, 120),
    organisation: str(body.organisation, 160),
    organisationType: str(body.organisationType, 120),
    name: `${str(body.firstName, 80)} ${str(body.lastName, 80)}`.trim(),
    email: str(body.email, 200),
    phone: str(body.phone, 60) || null,
    message: str(body.message, 8000),
  };

  if (!isMailConfigured()) {
    /*
      No mail configured. This is logged and refused rather than answered with
      a cheerful 200: the form's success screen tells the visitor their enquiry
      has been received, and saying that when nothing was sent — and nothing
      was stored — loses the enquiry and misleads the person who wrote it.
    */
    console.error("[enquiry] SMTP is not configured; enquiry NOT delivered", enquiry);
    return NextResponse.json(
      { error: "Enquiries are not configured on this deployment." },
      { status: 503 },
    );
  }

  try {
    await sendEnquiry(enquiry);
  } catch (error) {
    // Logged in full so the enquiry is recoverable from the server logs even
    // though the send failed — this is somebody's business enquiry, not a
    // page view.
    console.error("[enquiry] delivery failed", { enquiry, error });
    return NextResponse.json(
      { error: "We could not deliver your enquiry. Please email us directly." },
      { status: 502 },
    );
  }

  console.info("[enquiry] delivered", {
    receivedAt: enquiry.receivedAt,
    route: enquiry.route,
    organisation: enquiry.organisation,
  });
  return NextResponse.json({ ok: true }, { status: 200 });
}
