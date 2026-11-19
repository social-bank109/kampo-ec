"use client";
import { useEffect, useRef } from "react";
import { trackSectionView } from "@/lib/analytics";

/** 画面に40%以上表示されたら section_view を1回だけ送る <section> */
export default function TrackedSection({
  trackId,
  children,
  ...rest
}: { trackId: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trackSectionView(trackId);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trackId]);
  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
}
