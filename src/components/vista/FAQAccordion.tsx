"use client";
import type { FaqItem } from "@/config/vista";
import { trackFaqToggle } from "@/lib/analytics";

/** <details> ベースの FAQ。キーボード操作（Enter/Space）・ページ内検索に対応。開閉を faq_toggle で計測 */
export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((it) => (
        <details key={it.id} onToggle={(e) => trackFaqToggle(it.id, (e.currentTarget as HTMLDetailsElement).open)}>
          <summary>{it.q}</summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
