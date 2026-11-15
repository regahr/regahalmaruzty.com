"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Fades children in on first scroll into view. Without JS, or with reduced
// motion, the content is simply visible: the hidden state is only added here.
// With `stagger`, the children enter one after another instead of as one block.
export default function Reveal({ children, className = "", stagger = false }: { children: ReactNode; className?: string; stagger?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return; // already on screen: don't flash it

    el.classList.add("reveal-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${stagger ? "reveal-stagger " : ""}${className}`}>
      {children}
    </div>
  );
}
