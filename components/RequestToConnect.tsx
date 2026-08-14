"use client";

import { Icon } from "@/components/Icon";
import { Eyebrow } from "@/components/Section";
import { useConversion } from "./ConversionProvider";

/**
 * The home page's single closing ask.
 *
 * One button, and it opens the enquiry form in place rather than sending anyone
 * to a phone number or a messaging app — there is no published telephone number
 * on this site and no WhatsApp entry point anywhere in it.
 *
 * Deliberately slim. The footer carries the full conversion block on every
 * page, so a second full-height band here would be the same ask twice in one
 * scroll.
 */
export function RequestToConnect() {
  const { openRfq } = useConversion();

  return (
    <section className="section bg-surface">
      <div className="shell flex flex-col items-center gap-5 text-center">
        <Eyebrow>Next step</Eyebrow>
        <h2 className="max-w-2xl text-[1.625rem] leading-[1.06] font-semibold tracking-[-0.036em] text-ink md:text-[2rem]">
          Tell us what you are working on.
        </h2>
        <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-2 md:text-[1.0625rem]">
          Share your requirements and the right practitioner at OrbisMoneta will respond
          within one business day.
        </p>
        <button
          type="button"
          onClick={() => openRfq("requirements")}
          className="group/cta mt-2 inline-flex h-14 cursor-pointer items-center gap-3 rounded-full bg-navy-600 pr-6 pl-7 text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-700"
        >
          Request to Connect
          <Icon
            name="arrowRight"
            className="h-4.5 w-4.5 transition-transform group-hover/cta:translate-x-1"
            strokeWidth={2}
          />
        </button>
      </div>
    </section>
  );
}
