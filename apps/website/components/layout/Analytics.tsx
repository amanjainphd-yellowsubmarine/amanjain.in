"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const MEASUREMENT_ID = "G-VM7LDRRP2D";

export function Analytics() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (!gtag) return;
    gtag("config", MEASUREMENT_ID, { page_path: pathname });
  }, [pathname]);

  return null;
}
