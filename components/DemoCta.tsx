"use client";

import { Button } from "@/components/Button";
import { useConversion } from "@/components/ConversionProvider";
import { digitalCurrencyHub } from "@/content/product";

/** Opens the RFQ drawer pre-set to the demo request flow. */
export function DemoCta({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { openRfq } = useConversion();
  return (
    <Button size={size} icon="arrowRight" className={className} onClick={() => openRfq("demo")}>
      {digitalCurrencyHub.cta.label}
    </Button>
  );
}
