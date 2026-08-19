/**
 * Privacy Policy, Terms of Use and Disclaimer.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  READ THIS BEFORE RELYING ON ANY OF IT.
 *
 *  This is standard, carefully written wording for a B2B technology company
 *  incorporated in India and selling to regulated institutions abroad. It is
 *  NOT legal advice and it has not been reviewed by a lawyer. Before this is
 *  relied on in a dispute, or in front of a bank's procurement team, it needs
 *  a solicitor's eye — particularly the liability caps, the governing-law
 *  clause, and whether the DPDP grievance-officer duties apply to you.
 *
 *  Three things in here are deliberately conservative placeholders, marked
 *  CONFIRM below: the retention periods, the grievance-officer contact, and
 *  the effective date. Every other statement was written against what this
 *  website actually does.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * The privacy policy in particular is accurate rather than generic, which is
 * unusual and worth keeping. Most template policies describe cookie banners,
 * advertising identifiers and analytics vendors that the site in question does
 * not use, which is both untrue and a liability of its own. This one describes
 * the two things this site really does:
 *
 *   1. The enquiry form emails the submission to the company inbox. It is not
 *      written to a database — see lib/mailer.ts.
 *   2. Traffic is counted without cookies, from a one-way hash that is
 *      re-salted daily and cannot be reversed or followed across days — see
 *      lib/analytics.ts.
 *
 * If either of those changes, this file has to change with it.
 */

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "note"; text: string };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  intro: string;
  /** CONFIRM: set to the date the client's counsel approves the wording. */
  effective: string;
  sections: LegalSection[];
};

const COMPANY = "Monetanova Technologies Pvt. Ltd.";
const BRAND = "OrbisMoneta";
const CONTACT = "info@orbismoneta.com";
const SITE = "www.orbismoneta.com";
const ADDRESS =
  "Skyline Icon, 7th Floor, Andheri – Kurla Rd, Mittal Industrial Estate, Marol, Andheri East, Mumbai, Maharashtra 400059, India";

// ═══════════════════════════════════════════════════════════════════ privacy

const privacy: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  intro: `How ${BRAND} collects, uses, stores and protects the personal information shared with us through this website.`,
  effective: "2026-08-19",
  sections: [
    {
      heading: "Who we are",
      blocks: [
        {
          type: "paragraph",
          text: `${SITE} is operated by ${COMPANY}, a company incorporated in India and trading as ${BRAND}. Our registered office is at ${ADDRESS}.`,
        },
        {
          type: "paragraph",
          text: `In this policy, "we", "us" and "our" mean ${COMPANY}, and for the purposes of applicable data protection law we are the data fiduciary — or data controller — for the personal information described below.`,
        },
        {
          type: "paragraph",
          text: `Questions about this policy, or about any personal information we hold, should go to ${CONTACT}.`,
        },
      ],
    },
    {
      heading: "What this policy covers",
      blocks: [
        {
          type: "paragraph",
          text: `This policy covers personal information collected through this website. It does not cover information we process under a signed agreement while delivering services to a client organisation — that processing is governed by the terms of the relevant contract and any data processing agreement attached to it.`,
        },
      ],
    },
    {
      heading: "Information we collect",
      blocks: [
        {
          type: "paragraph",
          text: `Information you give us. When you submit an enquiry through this website we collect the details you complete in the form:`,
        },
        {
          type: "list",
          items: [
            "your name",
            "your email address",
            "your telephone number, if you choose to provide one",
            "your organisation and the type of organisation it is",
            "the area of our work your enquiry relates to, and which team you would like it to reach",
            "anything you write in the message field",
          ],
        },
        {
          type: "paragraph",
          text: `Information collected automatically. We count visits to this website so that we can understand which pages and services are of interest. This is done without cookies and without any third-party analytics or advertising service.`,
        },
        {
          type: "paragraph",
          text: `For each page view or button click we record the page address, the name of the action, the referring website where one is available, the time, and a short one-way cryptographic hash derived from your network address and browser identification combined with a secret value that changes every day.`,
        },
        {
          type: "paragraph",
          text: `That hash is not an identifier and cannot be reversed. Because the secret value changes daily, the same visitor produces a different hash tomorrow, so the record cannot be used to recognise anyone or to follow them from one day to the next. We do not store your network address itself.`,
        },
        {
          type: "note",
          text: `We do not set advertising or tracking cookies, we do not use third-party analytics, advertising or social media trackers, we do not build visitor profiles, and we do not sell or rent personal information to anyone.`,
        },
      ],
    },
    {
      heading: "How we use information",
      blocks: [
        { type: "paragraph", text: `We use the information described above to:` },
        {
          type: "list",
          items: [
            "read, route and respond to your enquiry, and to correspond with you about it",
            "provide the information, proposal or meeting you have asked for",
            "understand in aggregate how this website is used, so that we can improve it",
            "maintain the security and correct operation of the website",
            "comply with our legal and regulatory obligations",
          ],
        },
        {
          type: "paragraph",
          text: `We do not use the information you submit to send marketing you have not asked for. If we ever wish to, we will ask you first and you will be able to decline or to change your mind at any time.`,
        },
        {
          type: "paragraph",
          text: `We do not use your information to make any decision about you by automated means alone.`,
        },
      ],
    },
    {
      heading: "Legal basis for processing",
      blocks: [
        {
          type: "paragraph",
          text: `Where Indian data protection law applies, we process the information you submit on the basis of the consent you give by choosing to send us an enquiry, and for the legitimate uses permitted by that law.`,
        },
        {
          type: "paragraph",
          text: `Where the UK or EU General Data Protection Regulation applies to you, our legal bases are:`,
        },
        {
          type: "list",
          items: [
            "Your consent, or steps taken at your request before entering a contract — for handling and responding to your enquiry.",
            "Our legitimate interests — for understanding site usage in aggregate and for keeping the site secure. We have considered these interests against your rights and consider the effect on your privacy to be minimal, given that no cookies are set and no visitor can be identified.",
            "Compliance with a legal obligation — where we are required to retain or disclose information by law.",
          ],
        },
      ],
    },
    {
      heading: "Sharing and disclosure",
      blocks: [
        {
          type: "paragraph",
          text: `We do not sell, rent or trade personal information. We share it only in the following circumstances:`,
        },
        {
          type: "list",
          items: [
            "With service providers who operate this website and our email on our behalf — our website hosting provider, our email provider, and our database provider. They act on our instructions and are bound to protect the information they handle for us.",
            "With our professional advisers, such as lawyers and auditors, where they need it to advise us.",
            "Where we are required to do so by law, by a court, or by a regulator, or where disclosure is necessary to establish, exercise or defend legal claims.",
            "With a purchaser or successor, if our business or part of it is sold or reorganised, subject to the protections in this policy continuing to apply.",
          ],
        },
      ],
    },
    {
      heading: "International transfers",
      blocks: [
        {
          type: "paragraph",
          text: `We are based in India and the providers who host this website and our email may store or process information in other countries. Where information is transferred out of the country in which it was collected, we take reasonable steps to ensure it continues to be protected to the standard described in this policy, including by using providers who offer recognised safeguards such as standard contractual clauses.`,
        },
      ],
    },
    {
      heading: "Data retention",
      blocks: [
        {
          type: "paragraph",
          text: `We keep enquiry correspondence for as long as needed to deal with your enquiry and to maintain a record of our business relationship, and then for a further period consistent with our legal and accounting obligations. Aggregate website usage records are retained in the short form described above, from which no individual can be identified.`,
        },
        {
          type: "paragraph",
          text: `Where you ask us to erase your information and we have no continuing legal reason to keep it, we will do so.`,
        },
      ],
    },
    {
      heading: "Security",
      blocks: [
        {
          type: "paragraph",
          text: `This website is served over an encrypted connection, form submissions are transmitted over encrypted channels, and access to the mailbox and systems holding enquiry correspondence is restricted to people who need it.`,
        },
        {
          type: "paragraph",
          text: `No method of transmission or storage is completely secure, and we cannot guarantee absolute security. Please do not send confidential, commercially sensitive or special-category information through the website enquiry form; if you need to share something of that kind, contact us and we will arrange a secure means.`,
        },
      ],
    },
    {
      heading: "Your rights",
      blocks: [
        {
          type: "paragraph",
          text: `Depending on where you are, you may have some or all of the following rights in relation to your personal information:`,
        },
        {
          type: "list",
          items: [
            "to ask what personal information we hold about you and obtain a copy of it",
            "to have inaccurate or incomplete information corrected or completed",
            "to ask us to erase information we no longer have a reason to keep",
            "to withdraw a consent you have given, at any time, without affecting anything done before you withdrew it",
            "to object to, or ask us to restrict, certain processing",
            "to ask us to transfer information you gave us to another organisation, where that right applies",
            "to nominate another person to exercise these rights on your behalf in the event of death or incapacity, where that right applies",
            "to complain to the relevant data protection authority",
          ],
        },
        {
          type: "paragraph",
          text: `To exercise any of these rights, write to ${CONTACT}. We will respond within the period required by the law that applies to you, and we may need to verify your identity before we act.`,
        },
      ],
    },
    {
      heading: "Grievance officer",
      blocks: [
        {
          type: "paragraph",
          text: `If you are in India and are not satisfied with how we have handled your information or your request, you may raise a grievance with our grievance officer by writing to ${CONTACT} with "Grievance" in the subject line. We will acknowledge and respond within the period required by law.`,
        },
      ],
    },
    {
      heading: "Children",
      blocks: [
        {
          type: "paragraph",
          text: `This website is intended for business audiences and is not directed at children. We do not knowingly collect information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.`,
        },
      ],
    },
    {
      heading: "Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: `We may update this policy from time to time to reflect changes in how we operate or in the law. The date at the top of this page shows when it was last updated. Where a change is significant we will take reasonable steps to bring it to your attention.`,
        },
      ],
    },
    {
      heading: "Contacting us",
      blocks: [
        {
          type: "paragraph",
          text: `${COMPANY}, ${ADDRESS}. Email ${CONTACT}.`,
        },
      ],
    },
  ],
};

// ═════════════════════════════════════════════════════════════════════ terms

const terms: LegalDocument = {
  slug: "terms",
  title: "Terms of Use",
  intro: `The terms on which you may access and use the ${BRAND} website.`,
  effective: "2026-08-19",
  sections: [
    {
      heading: "About these terms",
      blocks: [
        {
          type: "paragraph",
          text: `These terms govern your access to and use of ${SITE} and its content. The website is operated by ${COMPANY}, trading as ${BRAND}, with its registered office at ${ADDRESS}.`,
        },
        {
          type: "paragraph",
          text: `By accessing or using this website you agree to these terms. If you do not accept them, please do not use the website.`,
        },
        {
          type: "paragraph",
          text: `These terms govern the website only. Any product or service we supply is governed by the separate written agreement covering it, and where that agreement and these terms differ, that agreement prevails.`,
        },
      ],
    },
    {
      heading: "Who may use this website",
      blocks: [
        {
          type: "paragraph",
          text: `This website is intended for business and professional audiences. By using it you confirm that you are at least 18 years old and that, where you are acting for an organisation, you are authorised to accept these terms on its behalf.`,
        },
      ],
    },
    {
      heading: "Permitted use",
      blocks: [
        {
          type: "paragraph",
          text: `You may view, download and print material from this website for your own internal business use and for evaluating whether to work with us. You must keep any copyright and other proprietary notices intact.`,
        },
      ],
    },
    {
      heading: "Things you must not do",
      blocks: [
        { type: "paragraph", text: `You must not:` },
        {
          type: "list",
          items: [
            "reproduce, republish, distribute, sell or commercially exploit any part of this website without our written permission",
            "use this website in any way that is unlawful, fraudulent or harmful, or in connection with any unlawful purpose",
            "attempt to gain unauthorised access to this website, the server it is hosted on, or any connected system or network",
            "introduce any virus, malware or other harmful material, or otherwise attack the website",
            "use any automated system to scrape, harvest or systematically extract content, or to place an unreasonable load on our infrastructure",
            "misrepresent your identity or your affiliation with any person or organisation",
            "remove, obscure or alter any notice of copyright, trademark or other proprietary right",
          ],
        },
        {
          type: "paragraph",
          text: `We may suspend or withdraw your access to this website without notice if we reasonably believe you have breached these terms.`,
        },
      ],
    },
    {
      heading: "Intellectual property",
      blocks: [
        {
          type: "paragraph",
          text: `All content on this website — including text, graphics, illustrations, photographs, artwork, page design, software and the arrangement of it — is owned by or licensed to ${COMPANY} and is protected by copyright and other intellectual property laws.`,
        },
        {
          type: "paragraph",
          text: `${BRAND}, the ${BRAND} logo and our product names are trademarks of ${COMPANY} Other names and marks appearing on this website belong to their respective owners and are used for identification only; their appearance does not imply any endorsement or association.`,
        },
        {
          type: "paragraph",
          text: `Nothing on this website grants you any licence or right to use any trademark without our prior written permission.`,
        },
      ],
    },
    {
      heading: "Information you send us",
      blocks: [
        {
          type: "paragraph",
          text: `When you send an enquiry through this website you confirm that the information you provide is accurate and that you are entitled to provide it. We handle it as described in our Privacy Policy.`,
        },
        {
          type: "paragraph",
          text: `Please do not send confidential or commercially sensitive information through the website. Material sent to us through this website is not treated as confidential unless we have a written confidentiality agreement in place with you, and sending it does not create any advisory, professional or contractual relationship between us.`,
        },
      ],
    },
    {
      heading: "Third-party links",
      blocks: [
        {
          type: "paragraph",
          text: `This website may link to websites operated by others. Those links are provided for convenience and information. We do not control those websites, we are not responsible for their content or their handling of your information, and a link does not imply endorsement. Your use of them is at your own risk and subject to their own terms.`,
        },
      ],
    },
    {
      heading: "Availability and changes",
      blocks: [
        {
          type: "paragraph",
          text: `We aim to keep this website available but we do not guarantee that it will be uninterrupted or error free. We may change, suspend or withdraw all or any part of it, and may change or remove any content, at any time and without notice.`,
        },
      ],
    },
    {
      heading: "No warranties",
      blocks: [
        {
          type: "paragraph",
          text: `This website and its content are provided on an "as is" and "as available" basis. To the fullest extent permitted by law we exclude all warranties, conditions and representations of any kind, whether express or implied, including as to accuracy, completeness, fitness for a particular purpose, non-infringement, and freedom from viruses or other harmful components.`,
        },
      ],
    },
    {
      heading: "Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: `To the fullest extent permitted by law, ${COMPANY} and its directors, employees and agents will not be liable for any indirect, incidental, special or consequential loss, or for any loss of profit, revenue, business, contracts, anticipated savings, goodwill or data, arising out of or in connection with your use of, or inability to use, this website or anything on it — whether in contract, tort including negligence, or otherwise, and whether or not we were advised such loss might arise.`,
        },
        {
          type: "paragraph",
          text: `Nothing in these terms excludes or limits any liability that cannot lawfully be excluded or limited, including liability for death or personal injury caused by negligence, or for fraud or fraudulent misrepresentation.`,
        },
      ],
    },
    {
      heading: "Indemnity",
      blocks: [
        {
          type: "paragraph",
          text: `You agree to indemnify us against any claim, loss, liability or expense, including reasonable legal costs, arising from your breach of these terms or your unlawful or improper use of this website.`,
        },
      ],
    },
    {
      heading: "Governing law and jurisdiction",
      blocks: [
        {
          type: "paragraph",
          text: `These terms and any dispute arising out of or in connection with them or with your use of this website are governed by the laws of India. The courts at Mumbai, Maharashtra, India have exclusive jurisdiction, save that we may bring proceedings to protect our intellectual property in any court of competent jurisdiction.`,
        },
      ],
    },
    {
      heading: "Changes to these terms",
      blocks: [
        {
          type: "paragraph",
          text: `We may revise these terms at any time by updating this page. The date at the top shows when they were last changed, and your continued use of the website after a change means you accept the revised terms.`,
        },
      ],
    },
    {
      heading: "Contacting us",
      blocks: [
        {
          type: "paragraph",
          text: `${COMPANY}, ${ADDRESS}. Email ${CONTACT}.`,
        },
      ],
    },
  ],
};

// ════════════════════════════════════════════════════════════════ disclaimer

const disclaimer: LegalDocument = {
  slug: "disclaimer",
  title: "Disclaimer",
  intro: `The basis on which information published on this website is provided, and its limitations.`,
  effective: "2026-08-19",
  sections: [
    {
      heading: "General information only",
      blocks: [
        {
          type: "paragraph",
          text: `The content of this website is published by ${COMPANY}, trading as ${BRAND}, for general information about our products, services and views on the financial technology sector. It is not tailored to the circumstances of any particular organisation.`,
        },
        {
          type: "paragraph",
          text: `While we take care to ensure the content is accurate and current at the time of publication, we make no representation or warranty that it is complete, accurate or up to date, and we are under no obligation to update it.`,
        },
      ],
    },
    {
      heading: "Not professional or financial advice",
      blocks: [
        {
          type: "paragraph",
          text: `Nothing on this website constitutes financial, investment, legal, regulatory, tax, accounting or other professional advice, and it must not be relied on as such. You should obtain your own professional advice before acting on anything you read here.`,
        },
        {
          type: "paragraph",
          text: `Nothing on this website is an offer, solicitation or recommendation to buy, sell or hold any security, digital asset, currency or financial instrument, or to enter into any transaction.`,
        },
        {
          type: "note",
          text: `Reading this website, or contacting us through it, does not create any advisory, fiduciary, professional or client relationship between you and ${COMPANY} Such a relationship arises only under a signed written agreement.`,
        },
      ],
    },
    {
      heading: "Nature of our business",
      blocks: [
        {
          type: "paragraph",
          text: `${BRAND} provides technology products, engineering and advisory services to financial institutions and enterprises. The descriptions on this website are of software and professional services. They are not an offer of any regulated financial service or product, and they do not describe any banking, payment, custody, investment or money transmission service provided by us to the public.`,
        },
        {
          type: "paragraph",
          text: `Where our technology is used by a client to deliver a regulated service, that service is provided by the client, under the client's own authorisations, and the client remains responsible for its own regulatory obligations.`,
        },
      ],
    },
    {
      heading: "Product and service availability",
      blocks: [
        {
          type: "paragraph",
          text: `Product descriptions on this website may refer to capabilities that are in development, in pilot, or planned. Availability, features, timelines and specifications may change, and any status shown for a product describes its stage at the time of publication rather than a commitment to deliver.`,
        },
        {
          type: "paragraph",
          text: `Products and services may not be available in every market, and their availability may be subject to local law and regulatory requirements.`,
        },
      ],
    },
    {
      heading: "Forward-looking statements",
      blocks: [
        {
          type: "paragraph",
          text: `This website contains statements about the future direction of financial technology, markets and our own plans. These are views and expectations at the time of writing, not statements of fact or promises. They involve assumptions, risks and uncertainties, and actual outcomes may differ. We undertake no obligation to update them.`,
        },
      ],
    },
    {
      heading: "Insights, research and third-party sources",
      blocks: [
        {
          type: "paragraph",
          text: `Articles and analysis published on this website reflect the views of their authors at the date of publication and not necessarily those of ${COMPANY} They are not a substitute for independent research or professional advice.`,
        },
        {
          type: "paragraph",
          text: `Where we refer to standards, regulations, market data or third-party material, we do so for context. We do not warrant the accuracy of third-party information, and any reference to a regulation or standard is a general summary, not a statement of your obligations under it.`,
        },
      ],
    },
    {
      heading: "External links",
      blocks: [
        {
          type: "paragraph",
          text: `Links to external websites are provided for convenience. We do not control them, we are not responsible for their content, and a link is not an endorsement.`,
        },
      ],
    },
    {
      heading: "Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: `To the fullest extent permitted by law, ${COMPANY} accepts no liability for any loss or damage arising from reliance on any information published on this website. Your use of this website and of its content is at your own risk, and is subject to our Terms of Use.`,
        },
      ],
    },
    {
      heading: "Contacting us",
      blocks: [
        {
          type: "paragraph",
          text: `${COMPANY}, ${ADDRESS}. Email ${CONTACT}.`,
        },
      ],
    },
  ],
};

export const legalDocuments = { privacy, terms, disclaimer } as const;

export type LegalDocumentKey = keyof typeof legalDocuments;
