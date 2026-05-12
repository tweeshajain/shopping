"use client";

import { useEffect, useState } from "react";

/** True when viewport is at most `maxPx` wide (default 768). Mobile-first. */
export function useIsMobile(maxPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxPx}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [maxPx]);

  return isMobile;
}
