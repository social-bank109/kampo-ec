"use client";
import { LINE_URL, LINE_CTA_LABEL } from "@/config/vista";
import { trackLineClick, type LineCtaPosition } from "@/lib/analytics";
import { ExternalIcon } from "./icons";

/**
 * LINE 友だち追加（診療予約）CTA。
 * ・本番 LINE URL へ <a href> で直接遷移（モーダル・中間ページ・同意フォームなし）
 * ・計測は onClick で dataLayer に push するだけ。preventDefault しないため、
 *   計測が失敗・ブロックされても遷移は妨げられない
 * ・LINEアプリが無い環境でも通常ブラウザで lin.ee の案内ページが開く
 */
export default function LineCTA({
  position,
  label = LINE_CTA_LABEL,
  className = "",
  variant = "solid",
  size = "default",
}: {
  position: LineCtaPosition;
  label?: string;
  className?: string;
  variant?: "solid" | "outline";
  size?: "default" | "small";
}) {
  const cls = [
    "btn",
    variant === "outline" ? "btn--outline" : "",
    size === "small" ? "btn--small" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      data-cta="line"
      data-cta-position={position}
      onClick={() => trackLineClick(position)}
    >
      {label}
      <ExternalIcon />
      <span className="visually-hidden">（LINEが新しいタブで開きます）</span>
    </a>
  );
}
