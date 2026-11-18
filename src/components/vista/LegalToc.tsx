"use client";
import { useEffect, useState } from "react";

type Item = { id: string; text: string };

/** #legal-body 内の h2 から目次を生成（id が無い見出しには自動で付与） */
export default function LegalToc() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const hs = Array.from(document.querySelectorAll<HTMLHeadingElement>("#legal-body h2"));
    setItems(
      hs.map((h, i) => {
        if (!h.id) h.id = `sec-${i + 1}`;
        return { id: h.id, text: h.textContent ?? "" };
      }),
    );
  }, []);

  if (items.length < 2) return <div aria-hidden="true" />;

  const list = (
    <ol>
      {items.map((it) => (
        <li key={it.id}>
          <a href={`#${it.id}`}>{it.text}</a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav className="legal-toc" aria-label="目次">
      <div className="legal-toc__desktop">
        <p>CONTENTS</p>
        {list}
      </div>
      <details className="legal-toc__mobile">
        <summary>目次を開く</summary>
        {list}
      </details>
    </nav>
  );
}
