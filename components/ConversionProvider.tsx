"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type RfqMode = "call" | "requirements" | "demo";

type ConversionState = {
  rfqOpen: boolean;
  rfqMode: RfqMode;
  openRfq: (mode?: RfqMode) => void;
  closeRfq: () => void;
  /** True once the footer CTA is on screen — the floating widget stands down. */
  footerVisible: boolean;
  setFooterVisible: (visible: boolean) => void;
};

const ConversionContext = createContext<ConversionState | null>(null);

export function ConversionProvider({ children }: { children: React.ReactNode }) {
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqMode, setRfqMode] = useState<RfqMode>("call");
  const [footerVisible, setFooterVisible] = useState(false);

  const openRfq = useCallback((mode: RfqMode = "call") => {
    setRfqMode(mode);
    setRfqOpen(true);
  }, []);

  const closeRfq = useCallback(() => setRfqOpen(false), []);

  // Lock the page behind the dialog.
  useEffect(() => {
    if (!rfqOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [rfqOpen]);

  const value = useMemo(
    () => ({ rfqOpen, rfqMode, openRfq, closeRfq, footerVisible, setFooterVisible }),
    [rfqOpen, rfqMode, openRfq, closeRfq, footerVisible],
  );

  return (
    <ConversionContext.Provider value={value}>{children}</ConversionContext.Provider>
  );
}

export function useConversion() {
  const ctx = useContext(ConversionContext);
  if (!ctx) throw new Error("useConversion must be used inside <ConversionProvider>");
  return ctx;
}
