"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Icon";
import { useConversion } from "./ConversionProvider";
import { EnquiryForm } from "./EnquiryForm";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * RFQ / call-request dialog. Presented as a right-hand drawer on desktop and a
 * near-full-height sheet on mobile, so the page context stays visible behind it.
 * Focus is trapped while open and returned to the trigger on close.
 */
export function RfqDialog() {
  const { rfqOpen, rfqMode, closeRfq } = useConversion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rfqOpen) return;
    restoreTo.current = document.activeElement as HTMLElement;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRfq();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreTo.current?.focus?.();
    };
  }, [rfqOpen, closeRfq]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] print:hidden",
        rfqOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!rfqOpen}
      inert={!rfqOpen}
    >
      <div
        onClick={closeRfq}
        className={cn(
          "absolute inset-0 bg-navy-900/55 backdrop-blur-[2px] transition-opacity duration-300",
          rfqOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact OrbisMoneta"
        className={cn(
          "absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-2xl bg-white",
          "sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[min(32rem,100vw)] sm:max-h-none sm:rounded-none",
          "shadow-[0_-24px_64px_-16px_rgba(3,13,34,.4)] sm:shadow-[-24px_0_64px_-16px_rgba(3,13,34,.4)]",
          "transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
          rfqOpen ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-4">
          {/*
            The drawer covers the header, so this is the only mark on screen
            while it is open — the lockup rather than a typeset name, so the
            form is visibly still OrbisMoneta's.
          */}
          <BrandMark decorative className="h-6" />
          <button
            type="button"
            onClick={closeRfq}
            aria-label="Close"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-surface hover:text-ink"
          >
            <Icon name="close" className="h-4.5 w-4.5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-7">
          {rfqOpen && <EnquiryForm key={rfqMode} mode={rfqMode} />}
        </div>
      </div>
    </div>
  );
}
