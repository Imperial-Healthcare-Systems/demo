export const contactPage = {
  eyebrow: "Contact",
  headline: "Start a conversation.",
  intro:
    "Tell us what you are working on — whether it is a strategy question, a product challenge, a partnership opportunity or a media enquiry. The right person at OrbisMoneta will respond directly.",
  reassurance:
    "We respond to all enquiries within one business day. Your information is treated in strict confidence.",
};

/**
 * Per the client brief, the five contact routes collapse into a single
 * dropdown inside the form rather than sitting as a separate left column.
 */
export const contactRoutes = [
  {
    id: "strategy",
    title: "Strategy & Advisory",
    body: "Book a working session with our senior team to discuss your specific challenge or programme.",
    email: "strategy@orbismoneta.com",
  },
  {
    id: "partnership",
    title: "Partnership Enquiries",
    body: "Technology partners, implementation partners and strategic alliance discussions.",
    email: "partners@orbismoneta.com",
  },
  {
    id: "media",
    title: "Media & Press",
    body: "Speaking engagements, expert commentary, research collaboration and media enquiries.",
    email: "media@orbismoneta.com",
  },
  {
    id: "general",
    title: "General Enquiries",
    body: "For all other enquiries, information requests or introductions.",
    email: "info@orbismoneta.com",
  },
];

export const organisationTypes = [
  "Bank or Financial Institution",
  "Fintech or Digital Bank",
  "Corporate or Treasury",
  "Government or Public Sector",
  "Regulator or Supervisory Authority",
  "Financial Market Infrastructure",
  "Payment Processor or Network",
  "Digital Asset or Crypto Firm",
  "Technology or Consulting Firm",
  "Other",
];

export const interestAreas = [
  "Enterprise Payment Solutions",
  "Cross-Border Payments & Interoperability",
  "CBDC & Digital Money",
  "Stablecoin & Tokenization Strategy",
  "Digital Asset Strategy",
  "Payment Hub & FMI",
  "ISO 20022 Modernization",
  "AI Strategy & Implementation",
  "Fraud, Risk & Financial Crime",
  "Product Strategy & Innovation",
  "API Banking & Open Finance",
  "Cloud Native Platform Engineering",
  "Partnership",
  "Other",
];
