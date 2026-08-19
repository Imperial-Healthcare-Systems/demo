"use client";

import { useId, useRef, useState } from "react";
import { contactRoutes, interestAreas, organisationTypes } from "@/content/contact";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import type { RfqMode } from "./ConversionProvider";

/**
 * The enquiry form, on one page.
 *
 * It used to be a two-step wizard — "What you need", then "About you" — which
 * was a reasonable way to lower the cost of starting. The client's own markup
 * asks for something else: a single form, every field visible, in this order —
 * first name, last name, work email, organisation, organisation type, primary
 * area of interest, and the message. That is what this is now, with two
 * additions they asked for on top of it: a phone number, and the routing
 * dropdown that an earlier brief moved into the form.
 *
 * A wizard also has a real cost that a single page does not: two states to keep
 * valid, a back button that can lose work, and validation that fires in halves,
 * so a visitor can clear step one and still be told something is wrong once
 * they reach step two. Everything is checked at once here, and submitting with
 * errors moves focus to the first field that has one.
 *
 * Fields are grouped rather than stepped. Two `fieldset`s with real `legend`s,
 * so the grouping is in the markup a screen reader reads, not only in the
 * spacing a sighted reader sees.
 */

type Values = {
  route: string;
  interest: string;
  message: string;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  organisationType: string;
  phone: string;
};

const EMPTY: Values = {
  route: "strategy",
  interest: "",
  message: "",
  firstName: "",
  lastName: "",
  email: "",
  organisation: "",
  organisationType: "",
  phone: "",
};

const MODE_COPY: Record<RfqMode, { heading: string; blurb: string; submit: string }> = {
  call: {
    heading: "Request a call",
    blurb: "One form. A senior practitioner responds within one business day.",
    submit: "Request the call",
  },
  requirements: {
    heading: "Tell us your requirements",
    // Client wording, verbatim.
    blurb: "Share your request, and we’ll connect you with the right specialist.",
    submit: "Send Enquiry",
  },
  demo: {
    heading: "Request a demo",
    blurb: "A guided walkthrough of the Digital Currency Hub, tailored to your roadmap.",
    submit: "Request the demo",
  },
};

export function EnquiryForm({
  mode = "requirements",
  onDark = false,
  compact = false,
  className,
}: {
  mode?: RfqMode;
  onDark?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const copy = MODE_COPY[mode];
  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  function validate() {
    const next: Partial<Record<keyof Values, string>> = {};
    if (!values.firstName.trim()) next.firstName = "Required.";
    if (!values.lastName.trim()) next.lastName = "Required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
      next.email = "Enter a valid work email address.";
    if (!values.organisation.trim()) next.organisation = "Required.";
    if (!values.organisationType) next.organisationType = "Select the closest match.";
    if (!values.interest) next.interest = "Select the area closest to your need.";
    // The message is optional. It was required, and a required free-text box is
    // the field people abandon a form on — the selects above already carry
    // enough to route and answer an enquiry.
    // A number is only insisted on where the whole point is that we ring you.
    if (mode === "call" && values.phone.trim().length < 6)
      next.phone = "We need a number to call you on.";
    setErrors(next);
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) {
      // Send focus to the first thing that needs fixing. Without this the
      // errors appear somewhere up the page and a keyboard or screen reader
      // user is left where they were, with no idea anything happened.
      requestAnimationFrame(() => {
        const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
        first?.focus();
        first?.scrollIntoView({ block: "center", behavior: "smooth" });
      });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, mode }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-4 rounded-[var(--radius-card)] p-8 text-left",
          onDark ? "bg-white/6 ring-1 ring-white/12" : "bg-surface ring-1 ring-line",
          className,
        )}
        role="status"
      >
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            onDark ? "bg-green-500/18 text-green-400" : "bg-green-500/12 text-green-600",
          )}
        >
          <Icon name="check" className="h-6 w-6" strokeWidth={2.2} />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className={cn("text-xl", onDark && "text-white")}>Enquiry received.</h3>
          <p className={cn("text-sm leading-relaxed", onDark ? "text-ink-inv-2" : "text-ink-2")}>
            Thank you, {values.firstName}. Your enquiry has been logged against{" "}
            <strong className={onDark ? "text-white" : "text-ink"}>{values.interest}</strong>. We
            respond to all enquiries within one business day, and your information is treated in
            strict confidence.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setStatus("idle");
          }}
          className={cn(
            "cursor-pointer text-sm font-medium underline underline-offset-4",
            onDark ? "text-sky-400" : "text-navy-600",
          )}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const invalidCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-8", className)}
    >
      {!compact && (
        <div className="flex flex-col gap-2">
          <span
            aria-hidden="true"
            className="h-1 w-14 rounded-full bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-sky-500),var(--color-green-500))]"
          />
          <h2 className={cn("mt-1 text-2xl", onDark && "text-white")}>{copy.heading}</h2>
          <p className={cn("text-sm leading-relaxed", onDark ? "text-ink-inv-2" : "text-ink-2")}>
            {copy.blurb}
          </p>
        </div>
      )}

      <Group legend="About you" onDark={onDark}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${uid}-first`} label="First name" error={errors.firstName} onDark={onDark} required>
            <input
              id={`${uid}-first`}
              value={values.firstName}
              autoComplete="given-name"
              placeholder="First name"
              onChange={(e) => set("firstName")(e.target.value)}
              aria-invalid={!!errors.firstName}
              className={inputClass(onDark, !!errors.firstName)}
            />
          </Field>
          <Field id={`${uid}-last`} label="Last name" error={errors.lastName} onDark={onDark} required>
            <input
              id={`${uid}-last`}
              value={values.lastName}
              autoComplete="family-name"
              placeholder="Last name"
              onChange={(e) => set("lastName")(e.target.value)}
              aria-invalid={!!errors.lastName}
              className={inputClass(onDark, !!errors.lastName)}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${uid}-email`} label="Work email" error={errors.email} onDark={onDark} required>
            <input
              id={`${uid}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              placeholder="you@organisation.com"
              onChange={(e) => set("email")(e.target.value)}
              aria-invalid={!!errors.email}
              className={inputClass(onDark, !!errors.email)}
            />
          </Field>
          <Field
            id={`${uid}-phone`}
            label="Phone number"
            hint={mode === "call" ? "Include the country code." : "Optional — include the country code."}
            error={errors.phone}
            onDark={onDark}
            required={mode === "call"}
          >
            <input
              id={`${uid}-phone`}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              placeholder="+91 99301 82331"
              onChange={(e) => set("phone")(e.target.value)}
              aria-invalid={!!errors.phone}
              className={inputClass(onDark, !!errors.phone)}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={`${uid}-org`}
            label="Organisation"
            error={errors.organisation}
            onDark={onDark}
            required
          >
            <input
              id={`${uid}-org`}
              value={values.organisation}
              autoComplete="organization"
              placeholder="Your organisation"
              onChange={(e) => set("organisation")(e.target.value)}
              aria-invalid={!!errors.organisation}
              className={inputClass(onDark, !!errors.organisation)}
            />
          </Field>
          <Field
            id={`${uid}-orgtype`}
            label="I represent a…"
            error={errors.organisationType}
            onDark={onDark}
            required
          >
            <Select
              id={`${uid}-orgtype`}
              value={values.organisationType}
              onChange={set("organisationType")}
              placeholder="Select organisation type"
              invalid={!!errors.organisationType}
              onDark={onDark}
              options={organisationTypes.map((o) => ({ value: o, label: o }))}
            />
          </Field>
        </div>
      </Group>

      <Group legend="About your enquiry" onDark={onDark}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={`${uid}-route`}
            label="Which team should see this?"
            hint="Sends your enquiry to the right desk."
            onDark={onDark}
          >
            <Select
              id={`${uid}-route`}
              value={values.route}
              onChange={set("route")}
              onDark={onDark}
              options={contactRoutes.map((r) => ({ value: r.id, label: r.title }))}
            />
          </Field>
          <Field
            id={`${uid}-interest`}
            label="Primary area of interest"
            error={errors.interest}
            onDark={onDark}
            required
          >
            <Select
              id={`${uid}-interest`}
              value={values.interest}
              onChange={set("interest")}
              placeholder="Select primary area"
              invalid={!!errors.interest}
              onDark={onDark}
              options={interestAreas.map((a) => ({ value: a, label: a }))}
            />
          </Field>
        </div>

        <Field
          id={`${uid}-message`}
          label="Tell us about your challenge or programme"
          hint="Optional — a sentence or two helps us answer properly."
          error={errors.message}
          onDark={onDark}
        >
          <textarea
            id={`${uid}-message`}
            rows={5}
            value={values.message}
            onChange={(e) => set("message")(e.target.value)}
            aria-invalid={!!errors.message}
            placeholder="Tell us about your requirement…"
            className={inputClass(onDark, !!errors.message, "min-h-36 resize-y py-3.5")}
          />
        </Field>
      </Group>

      {invalidCount > 0 && (
        <p
          role="alert"
          className={cn(
            "flex items-start gap-2 rounded-xl px-3.5 py-3 text-[0.8125rem]",
            onDark
              ? "bg-white/8 text-ink-inv-2 ring-1 ring-white/12"
              : "bg-red-50 text-[color:var(--color-critical)] ring-1 ring-red-100",
          )}
        >
          <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
          {invalidCount === 1
            ? "One field needs attention before this can be sent."
            : `${invalidCount} fields need attention before this can be sent.`}
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-3 text-[0.8125rem] text-[color:var(--color-critical)] ring-1 ring-red-100"
        >
          <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
          <span>
            We could not send that. Please try again, or email{" "}
            <a href="mailto:info@orbismoneta.com" className="underline">
              info@orbismoneta.com
            </a>
            .
          </span>
        </p>
      )}

      <div className="flex flex-col gap-5">
        {/* Full width and on the brand gradient. It is the only action on the
            form, and a lone button floated left in a wide card reads as one
            option among several rather than the thing to do. */}
        <Button
          type="submit"
          tone={onDark ? "onDark" : "brand"}
          size="lg"
          shape="soft"
          icon={status === "sending" ? undefined : "arrowRight"}
          disabled={status === "sending"}
          className="w-full"
        >
          {status === "sending" ? "Sending…" : copy.submit}
        </Button>

        <p
          className={cn(
            "flex items-start gap-2 text-[0.75rem] leading-relaxed",
            onDark ? "text-ink-inv-3" : "text-ink-3",
          )}
        >
          <Icon name="lock" className="mt-px h-3.5 w-3.5 shrink-0" />
          We respond to all enquiries within one business day. Your information is treated in strict
          confidence.
        </p>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------- controls */

function inputClass(onDark: boolean, invalid: boolean, extra = "") {
  return cn(
    // 3.25rem tall, not 3: a 52px control clears the 44px touch minimum with
    // room for the focus ring to sit outside the border rather than on it.
    "w-full rounded-xl border px-4 text-[0.9375rem] outline-none",
    "transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
    extra ? "" : "h-[3.25rem]",
    onDark
      ? "border-white/15 bg-white/5 text-white placeholder:text-ink-inv-3 hover:border-white/28 focus:border-sky-400 focus:bg-white/[0.09] focus:ring-4 focus:ring-sky-400/20"
      : "border-line-strong bg-white text-ink placeholder:text-ink-3 hover:border-navy-600/40 focus:border-navy-600 focus:ring-4 focus:ring-navy-600/12",
    invalid &&
      "border-[color:var(--color-critical)] focus:border-[color:var(--color-critical)] focus:ring-[color:var(--color-critical)]/15",
    extra,
  );
}

/** A titled block of fields — a real fieldset, so the grouping reaches AT. */
function Group({
  legend,
  onDark,
  children,
}: {
  legend: string;
  onDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend
        className={cn(
          "mb-1 flex items-center gap-3 font-mono text-[0.75rem] md:text-[0.6875rem] font-medium uppercase tracking-[0.16em]",
          onDark ? "text-sky-400" : "text-navy-600",
        )}
      >
        <span aria-hidden="true" className={cn("h-px w-5", onDark ? "bg-sky-400/60" : "bg-navy-600/40")} />
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  onDark,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  onDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn("text-[0.8125rem] font-medium", onDark ? "text-ink-inv-2" : "text-ink-2")}
      >
        {label}
        {required && (
          <span className="ml-1 text-[color:var(--color-critical)]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className={cn("text-[0.75rem]", onDark ? "text-ink-inv-3" : "text-ink-3")}>{hint}</p>
      )}
      {error && (
        <p className="text-[0.75rem] text-[color:var(--color-critical)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  invalid,
  onDark,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  invalid?: boolean;
  onDark: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
        className={cn(inputClass(onDark, !!invalid), "cursor-pointer appearance-none pr-11")}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-white text-ink">
            {o.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevronDown"
        className={cn(
          "pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2",
          onDark ? "text-ink-inv-3" : "text-ink-3",
        )}
        strokeWidth={2}
      />
    </div>
  );
}
