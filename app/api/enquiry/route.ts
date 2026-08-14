import { NextResponse } from "next/server";

/**
 * Enquiry endpoint.
 *
 * OUTSTANDING FROM CLIENT: the content document records that "Form submissions
 * currently have no destination. Please confirm the inbox that should receive
 * enquiries and whether a CRM or auto-responder is required."
 *
 * Until that is confirmed the route validates and records the submission
 * server-side. Wire the delivery step below to the chosen transport (SMTP,
 * Resend, SendGrid, HubSpot/Salesforce) — nothing else needs to change.
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

  const enquiry = {
    receivedAt: new Date().toISOString(),
    mode: body.mode ?? "requirements",
    route: body.route ?? "general",
    interest: body.interest,
    organisation: body.organisation,
    organisationType: body.organisationType,
    name: `${body.firstName} ${body.lastName}`.trim(),
    email: body.email,
    phone: body.phone || null,
    message: body.message,
  };

  // TODO(client): deliver to the confirmed inbox / CRM.
  console.info("[orbismoneta] enquiry received", enquiry);

  return NextResponse.json({ ok: true }, { status: 200 });
}
