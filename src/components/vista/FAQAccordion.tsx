import type { FaqItem } from "@/config/vista";

/** <details> ベースの FAQ。JS 不要・キーボード操作・検索（Ctrl+F）に対応 */
export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((it) => (
        <details key={it.q}>
          <summary>{it.q}</summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
