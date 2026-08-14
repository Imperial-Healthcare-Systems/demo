"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

type RevealKind = "up" | "fade" | "left" | "right" | "scale";

/**
 * Scroll-triggered entrance. One IntersectionObserver per element, disconnected
 * the moment it fires — no scroll listeners, no layout reads, nothing left
 * running after the reveal. Motion is CSS-only, so `prefers-reduced-motion`
 * neutralises it in the stylesheet without any JS branch.
 */
export function Reveal({
  as: Tag = "div",
  kind = "up",
  delay = 0,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  kind?: RevealKind;
  delay?: number;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        // The generous top margin means anything already scrolled past — on a
        // restored scroll position or an anchored load — counts as intersecting
        // and reveals immediately, instead of waiting for an intersection that
        // would never come. The negative bottom margin still holds back
        // elements approaching from below until they are properly in view.
        rootMargin: "300% 0px -12% 0px",
        threshold: 0.08,
      },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={kind}
      className={cn(revealed && "is-revealed", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Staggers a list of children without needing a delay prop on each one. */
export function RevealGroup({
  children,
  step = 70,
  kind = "up",
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  step?: number;
  kind?: RevealKind;
  className?: string;
  as?: ElementType;
}) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <Tag className={className}>
      {items.map((child, i) => (
        <Reveal key={i} kind={kind} delay={i * step}>
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
