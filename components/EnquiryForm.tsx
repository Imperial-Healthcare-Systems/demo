"use client";

import { useId, useState } from "react";
import { contactRoutes, interestAreas, organisationTypes } from "@/content/contact";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import type { RfqMode } from "./ConversionProvider";

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
    blurb: "Two short steps. A senior practitioner responds within one business day.",
    submit: "Request the call",
  },
  requirements: {
    heading: "Tell us your requirements",
    blurb: "Share the programme and we will route it to the right specialist.",
    submit: "Send requirements",
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
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const copy = MODE_COPY[mode];
  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  function validateStep(index: number) {
    const next: Partial<Record<keyof Values, string>> = {};
    if (index === 0) {
      if (!values.interest) next.interest = "Select the area closest to your need.";
      if (values.message.trim().length < 12)
        next.message = "A sentence or two is enough to route this correctly.";
    } else {
      if (!values.firstName.trim()) next.firstName = "Required.";
      if (!values.lastName.trim()) next.lastName = "Required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
        next.email = "Enter a valid work email address.";
      if (!values.organisation.trim()) next.organisation = "Required.";
      if (!values.organisationType) next.organisationType = "Select the closest match.";
      if (mode === "call" && values.phone.trim().length < 6)
        next.phone = "We need a number to call you on.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(1)) return;
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
          "flex flex-col items-start gap-4 rounded-[--radius-card] p-8 text-left",
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
            setStep(0);
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

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("flex flex-col gap-6", className)}>
      {!compact && (
        <div className="flex flex-col gap-1.5">
          <h2 className={cn("text-2xl", onDark && "text-white")}>{copy.heading}</h2>
          <p className={cn("text-sm", onDark ? "text-ink-inv-2" : "text-ink-2")}>{copy.blurb}</p>
        </div>
      )}

      {/* Step indicator */}
      <ol className="flex items-center gap-3" aria-label="Progress">
        {["What you need", "About you"].map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2.5">
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.625rem] font-semibold transition-colors",
                i <= step
                  ? "bg-navy-600 text-white"
                  : onDark
                    ? "bg-white/10 text-ink-inv-3"
                    : "bg-surface-2 text-ink-3",
              )}
              aria-current={i === step ? "step" : undefined}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "hidden text-[0.75rem] font-medium xs:block",
                i === step ? (onDark ? "text-white" : "text-ink") : onDark ? "text-ink-inv-3" : "text-ink-3",
              )}
            >
              {label}
            </span>
            {i === 0 && (
              <span
                aria-hidden="true"
                className={cn(
                  "h-px flex-1 origin-left transition-transform duration-500",
                  step > 0 ? "scale-x-100 bg-navy-600" : onDark ? "bg-white/15" : "bg-line",
                )}
              />
            )}
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <div className="flex flex-col gap-5">
          <Field
            id={`${uid}-route`}
            label="Which team should see this?"
            hint="Routes your enquiry to the right desk."
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
              placeholder="Select an area"
              invalid={!!errors.interest}
              onDark={onDark}
              options={interestAreas.map((a) => ({ value: a, label: a }))}
            />
          </Field>

          <Field
            id={`${uid}-message`}
            label="Tell us about your challenge or programme"
            error={errors.message}
            onDark={onDark}
            required
          >
            <textarea
              id={`${uid}-message`}
              rows={4}
              value={values.message}
              onChange={(e) => set("message")(e.target.value)}
              aria-invalid={!!errors.message}
              placeholder="Briefly describe your situation, the challenge you are facing and what you are hoping to achieve…"
              className={inputClass(onDark, !!errors.message, "resize-y min-h-28 py-3")}
            />
          </Field>

          <div className="flex items-center justify-between gap-4 pt-1">
            <p className={cn("text-[0.75rem]", onDark ? "text-ink-inv-3" : "text-ink-3")}>
              Step 1 of 2 · no obligation
            </p>
            <Button
              type="button"
              tone={onDark ? "onDark" : "primary"}
              icon="arrowRight"
              onClick={() => validateStep(0) && setStep(1)}
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={`${uid}-first`} label="First name" error={errors.firstName} onDark={onDark} required>
              <input
                id={`${uid}-first`}
                value={values.firstName}
                autoComplete="given-name"
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
                onChange={(e) => set("lastName")(e.target.value)}
                aria-invalid={!!errors.lastName}
                className={inputClass(onDark, !!errors.lastName)}
              />
            </Field>
          </div>

          <Field id={`${uid}-email`} label="Work email" error={errors.email} onDark={onDark} required>
            <input
              id={`${uid}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => set("email")(e.target.value)}
              aria-invalid={!!errors.email}
              className={inputClass(onDark, !!errors.email)}
            />
          </Field>

          {mode === "call" && (
            <Field
              id={`${uid}-phone`}
              label="Direct line"
              hint="Include the country code."
              error={errors.phone}
              onDark={onDark}
              required
            >
              <input
                id={`${uid}-phone`}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => set("phone")(e.target.value)}
                aria-invalid={!!errors.phone}
                className={inputClass(onDark, !!errors.phone)}
              />
            </Field>
          )}

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
                placeholder="Select type"
                invalid={!!errors.organisationType}
                onDark={onDark}
                options={organisationTypes.map((o) => ({ value: o, label: o }))}
              />
            </Field>
          </div>

          {status === "error" && (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-lg bg-red-50 px-3.5 py-3 text-[0.8125rem] text-[color:var(--color-critical)] ring-1 ring-red-100"
            >
              <Icon name="close" className="mt-0.5 h-4 w-4" strokeWidth={2} />
              We could not send that. Please try again, or email {" "}
              <a href="mailto:hello@orbismoneta.com" className="underline">
                hello@orbismoneta.com
              </a>
              .
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <button
              type="button"
              onClick={() => setStep(0)}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors",
                onDark ? "text-ink-inv-2 hover:text-white" : "text-ink-2 hover:text-navy-600",
              )}
            >
              <Icon name="arrowLeft" className="h-4 w-4" strokeWidth={2} />
              Back
            </button>
            <Button
              type="submit"
              tone={onDark ? "onDark" : "primary"}
              icon={status === "sending" ? undefined : "arrowRight"}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : copy.submit}
            </Button>
          </div>

          <p
            className={cn(
              "flex items-start gap-2 text-[0.75rem] leading-relaxed",
              onDark ? "text-ink-inv-3" : "text-ink-3",
            )}
          >
            <Icon name="lock" className="mt-px h-3.5 w-3.5 shrink-0" />
            We respond to all enquiries within one business day. Your information is treated in
            strict confidence.
          </p>
        </div>
      )}
    </form>
  );
}

/* ---------------------------------------------------------------- controls */

function inputClass(onDark: boolean, invalid: boolean, extra = "") {
  return cn(
    "w-full rounded-lg border px-3.5 text-[0.9375rem] transition-[border-color,box-shadow] duration-150 outline-none",
    extra || "h-12",
    onDark
      ? "border-white/15 bg-white/5 text-white placeholder:text-ink-inv-3 focus:border-sky-400 focus:bg-white/8"
      : "border-line-strong bg-white text-ink placeholder:text-ink-3 focus:border-navy-600",
    "focus:ring-2 focus:ring-navy-600/15",
    invalid && "border-[color:var(--color-critical)] focus:border-[color:var(--color-critical)]",
    extra,
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
        className={cn(inputClass(onDark, !!invalid), "cursor-pointer appearance-none pr-10")}
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
          "pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2",
          onDark ? "text-ink-inv-3" : "text-ink-3",
        )}
        strokeWidth={2}
      />
    </div>
  );
}
