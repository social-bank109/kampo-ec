"use client";
import React from "react";
import Link from "next/link";
import {
  PLANS,
  PLAN_ORDER,
  CONCERNS,
  PRICE_NOTES,
  CONSULTATION_ONLY_FEE_INLINE,
  CONSULTATION_ONLY_FEE_BLOCK,
  COMMON_NOTES,
  SIDE_EFFECTS_GENERAL,
  TREATMENT_FLOW,
  HOW_IT_WORKS,
  tjLabel,
  type Medicine,
  type Plan,
  type PlanId,
} from "./data";

// VISTA Wellness — 自由診療オンライン漢方
// アイボリー / 薄ベージュ / 深めグリーン / くすみピンク / 薄グレー
export const Palette = {
  ink: "#2a2326",
  ink2: "#564a4e",
  ink3: "#8a7e82",
  ink4: "#b8acb0",
  paper: "#fcfaf7",
  paper2: "#f5efec",
  paper3: "#ebe3df",
  line: "#e7dfdb",
  // primary：くすみピンク（女性向けの柔らかさ）
  rose: "#b38795",
  roseDeep: "#8a5a6c",
  roseSoft: "#ead9de",
  roseTint: "#f6ecee",
  // secondary：深めグリーン（医療・信頼）
  green: "#6f8a72",
  greenDeep: "#4f6a55",
  greenTint: "#e9efe9",
  // 注意・リスク
  noticeBg: "#fbf6e6",
  noticeBorder: "#e7dcb6",
  // 既存呼び出し互換
  sage: "#b38795",
  sageDeep: "#8a5a6c",
  sageSoft: "#ead9de",
  sageTint: "#f6ecee",
  trust: "#6f8a72",
  trustTint: "#e9efe9",
  clay: "#c9a677",
};

// ─────────────────────────────────────────────────────────────
// 基本要素
// ─────────────────────────────────────────────────────────────
export function Hair({ m = "0" }: { m?: string }) {
  return <div style={{ height: 1, background: Palette.line, margin: m }} />;
}

export function Badge({
  children,
  tone = "rose",
}: {
  children: React.ReactNode;
  tone?: "rose" | "paper" | "green" | "notice";
}) {
  const palettes: Record<string, { bg: string; fg: string; bd: string }> = {
    rose: { bg: Palette.roseTint, fg: Palette.roseDeep, bd: "#e6cfd6" },
    green: { bg: Palette.greenTint, fg: Palette.greenDeep, bd: "#cfdbcb" },
    paper: { bg: Palette.paper2, fg: Palette.ink2, bd: Palette.line },
    notice: { bg: Palette.noticeBg, fg: "#7a6520", bd: Palette.noticeBorder },
  };
  const c = palettes[tone] ?? palettes.rose;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 10.5,
        fontWeight: 500,
        letterSpacing: 0.06,
        color: c.fg,
        background: c.bg,
        border: `0.5px solid ${c.bd}`,
        padding: "3px 8px",
        borderRadius: 999,
        fontFamily: "var(--font-sans-stack)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

type CTAVariant = "primary" | "rose" | "green" | "ghost" | "paper";

export function CTA({
  children,
  onClick,
  href,
  variant = "rose",
  full = true,
  small = false,
  type,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: CTAVariant;
  full?: boolean;
  small?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base: React.CSSProperties = {
    width: full ? "100%" : "auto",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "var(--font-sans-stack)",
    fontWeight: 500,
    letterSpacing: 0.04,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "transform 0.12s ease, background 0.15s ease",
    opacity: disabled ? 0.5 : 1,
    textDecoration: "none",
  };
  const sized: React.CSSProperties = small
    ? { padding: "10px 16px", fontSize: 13 }
    : { padding: "16px 18px", fontSize: 15 };
  const variants: Record<CTAVariant, React.CSSProperties> = {
    primary: { background: Palette.ink, color: "#fbfaf6" },
    rose: { background: Palette.roseDeep, color: "#fbfaf6" },
    green: { background: Palette.greenDeep, color: "#fbfaf6" },
    ghost: { background: "transparent", color: Palette.ink, border: `1px solid ${Palette.line}` },
    paper: { background: Palette.paper2, color: Palette.ink },
  };
  const style = { ...base, ...sized, ...variants[variant] };
  if (href) {
    return (
      <Link href={href} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "scale(0.985)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      style={style}
    >
      {children}
    </button>
  );
}

export function SectionHead({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      {kicker && (
        <div
          style={{
            fontFamily: "var(--font-mono-stack)",
            fontSize: 10,
            color: Palette.roseDeep,
            letterSpacing: 0.18,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {kicker}
        </div>
      )}
      <div className="serif" style={{ fontSize: 20, lineHeight: 1.45, color: Palette.ink }}>
        {title}
      </div>
      {sub && (
        <div style={{ fontSize: 12.5, color: Palette.ink3, marginTop: 6, lineHeight: 1.7 }}>{sub}</div>
      )}
    </div>
  );
}

export function AppBar({
  title,
  onBack,
  right,
  variant = "paper",
}: {
  title: React.ReactNode;
  onBack?: () => void;
  right?: React.ReactNode;
  variant?: "paper" | "transparent";
}) {
  const bg = variant === "paper" ? "rgba(251,250,246,0.88)" : "rgba(255,255,255,0)";
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 8,
        padding: "10px 16px",
        background: bg,
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        borderBottom: variant === "paper" ? `0.5px solid ${Palette.line}` : "none",
        display: "flex",
        alignItems: "center",
        gap: 10,
        minHeight: 44,
      }}
    >
      {onBack ? (
        <button
          aria-label="戻る"
          onClick={onBack}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 6,
            display: "flex",
            alignItems: "center",
            color: Palette.ink,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <div style={{ width: 8 }} />
      )}
      <div className="serif" style={{ flex: 1, fontSize: 15, color: Palette.ink, textAlign: "center", letterSpacing: 0.1 }}>
        {title}
      </div>
      <div style={{ width: 30, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

export const iconBtnStyle: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: 999,
  background: "rgba(255,255,255,0.7)",
  border: `0.5px solid ${Palette.line}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

// ─────────────────────────────────────────────────────────────
// タブバー（ホーム / 料金 / 体質チェック / 相談）
// ─────────────────────────────────────────────────────────────
export function TabBar({
  active,
  onGo,
}: {
  active: string | null;
  onGo: (id: string) => void;
}) {
  const tabs = [
    { id: "top", label: "ホーム", icon: "home" },
    { id: "pricing", label: "料金", icon: "yen" },
    { id: "check", label: "体質チェック", icon: "check" },
    { id: "order", label: "相談", icon: "chat" },
  ] as const;
  const Icon = ({ name, active }: { name: string; active: boolean }) => {
    const s = active ? Palette.roseDeep : Palette.ink3;
    const sw = active ? 1.8 : 1.4;
    if (name === "home")
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z"
            stroke={s}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
        </svg>
      );
    if (name === "yen")
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 4l6 9 6-9M9 14h6M9 18h6M12 13v8" stroke={s} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    if (name === "check")
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8.5" stroke={s} strokeWidth={sw} />
          <path d="M8 12.5l2.8 2.8L16.5 9.5" stroke={s} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 6a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-8l-4 3v-3H6a2 2 0 01-2-2z"
          stroke={s}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  return (
    <nav
      aria-label="主要ナビゲーション"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        margin: "0 auto",
        maxWidth: "var(--app-max-width)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 10px)",
        paddingTop: 8,
        background: "rgba(251,250,246,0.92)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        borderTop: `0.5px solid ${Palette.line}`,
        display: "flex",
        zIndex: 30,
      }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onGo(t.id)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: "6px 0",
            fontFamily: "var(--font-sans-stack)",
            fontSize: 10,
            color: active === t.id ? Palette.roseDeep : Palette.ink3,
            fontWeight: active === t.id ? 600 : 400,
          }}
        >
          <Icon name={t.icon} active={active === t.id} />
          {t.label}
        </button>
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// 薬剤画像プレースホルダー
// 画像は後日 /public/images/kampo/ に配置。placeholder=true の間は枠表示。
// ─────────────────────────────────────────────────────────────
/**
 * 漢方の商品画像。
 * image が未設定、または読み込みに失敗した場合は placeholder を表示します。
 * （指定パスにファイルを置けばコード変更なしで実画像に切り替わります）
 */
export function KampoImage({
  m,
  height = 180,
  width = "100%",
  fit = "contain",
}: {
  m: Pick<Medicine, "image" | "name" | "number" | "tone" | "accent">;
  height?: number | string;
  width?: number | string;
  fit?: "contain" | "cover";
}) {
  const [failed, setFailed] = React.useState(false);
  const tone = m.tone ?? "#eef1ea";
  const accent = m.accent ?? "#6f8a72";
  const label = tjLabel(m.number);

  const frame: React.CSSProperties = {
    width,
    height,
    background: tone,
    borderRadius: 12,
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (!m.image || failed) {
    return (
      <div
        role="img"
        aria-label={`${m.name}の写真は準備中です`}
        style={{ ...frame, border: `0.5px solid ${Palette.line}` }}
      >
        <svg viewBox="0 0 120 160" width="64" height="86" style={{ opacity: 0.55 }} aria-hidden>
          <rect x="44" y="16" width="32" height="10" rx="2" fill={accent} opacity="0.55" />
          <path
            d="M30 40 Q30 32 38 32 L82 32 Q90 32 90 40 L90 130 Q90 144 76 144 L44 144 Q30 144 30 130 Z"
            fill="none"
            stroke={accent}
            strokeWidth="1.4"
            opacity="0.85"
          />
          <line x1="40" y1="58" x2="80" y2="58" stroke={accent} strokeWidth="0.8" opacity="0.5" />
        </svg>
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 10,
            fontFamily: "var(--font-mono-stack)",
            fontSize: 9.5,
            color: accent,
            opacity: 0.8,
            letterSpacing: 0.06,
          }}
        >
          {label}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 10,
            fontSize: 10,
            color: accent,
            opacity: 0.85,
            letterSpacing: 0.04,
          }}
        >
          写真準備中
        </div>
      </div>
    );
  }

  return (
    <div style={frame}>
      {/*
        next/image ではなく素の <img> を使用しています。
        未登録の画像を onError で placeholder に差し替える必要があり、
        画像最適化を経由すると同じ挙動を素直に再現できないためです。
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={m.image}
        alt={`${m.name}（${label}）`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        style={{ width: "100%", height: "100%", objectFit: fit, display: "block" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// プラン名 → 表示文字列のヘルパ
// ─────────────────────────────────────────────────────────────
export function planNameById(id: string): string {
  const p = PLANS.find((x) => x.id === id);
  return p?.name ?? id;
}

/** 対応プランの表示（1つならその名前、複数なら「最小〜最大」） */
export function planRangeLabel(plans: PlanId[]): string {
  const ordered = PLAN_ORDER.filter((p) => plans.includes(p));
  if (ordered.length === 0) return "";
  if (ordered.length === 1) return planNameById(ordered[0]);
  return `${planNameById(ordered[0])}〜${planNameById(ordered[ordered.length - 1])}`;
}

export function planLabelsForMedicine(m: Pick<Medicine, "plans">): string {
  return planRangeLabel(m.plans);
}

// ─────────────────────────────────────────────────────────────
// 料金プラン表
// ─────────────────────────────────────────────────────────────
export function PricingTable({ onSelect }: { onSelect?: (planId: PlanId) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {PLANS.map((p) => (
        <PlanCard key={p.id} plan={p} onSelect={onSelect} />
      ))}
      <ConsultationOnlyFeeBlock />
      <PriceNotes />
    </div>
  );
}

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect?: (id: PlanId) => void }) {
  const isHighlighted = plan.id === "basic";
  const borderColor = isHighlighted ? Palette.roseDeep : Palette.line;
  return (
    <div
      style={{
        position: "relative",
        padding: "16px 16px 14px",
        background: "#fff",
        border: `${isHighlighted ? 1 : 0.5}px solid ${borderColor}`,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {plan.badge && (
        <div
          style={{
            position: "absolute",
            top: -10,
            right: 14,
            background: Palette.roseDeep,
            color: "#fff",
            fontSize: 10,
            letterSpacing: 0.08,
            padding: "3px 10px",
            borderRadius: 999,
            fontFamily: "var(--font-mono-stack)",
          }}
        >
          {plan.badge}
        </div>
      )}

      <div
        style={{
          fontFamily: "var(--font-mono-stack)",
          fontSize: 9.5,
          color: Palette.ink3,
          letterSpacing: 0.16,
        }}
      >
        {plan.code}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 8,
          marginTop: 4,
          flexWrap: "wrap",
        }}
      >
        <div className="serif" style={{ fontSize: 18, color: Palette.ink, letterSpacing: 0.04 }}>
          {plan.name}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 3, whiteSpace: "nowrap" }}>
          <span className="serif" style={{ fontSize: 25, color: Palette.ink, fontWeight: 500 }}>
            ¥{plan.price.toLocaleString()}
          </span>
          <span style={{ fontSize: 11, color: Palette.ink3 }}>/ 月（税込）</span>
        </div>
      </div>

      <div style={{ fontSize: 12, color: Palette.ink2, marginTop: 10, lineHeight: 1.7 }}>
        <span style={{ color: Palette.ink3 }}>対象 ／ </span>
        {plan.target}
      </div>
      <div style={{ fontSize: 12, color: Palette.ink2, marginTop: 4, lineHeight: 1.7 }}>
        <span style={{ color: Palette.ink3 }}>内容 ／ </span>
        {plan.content.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: 10,
          padding: "8px 10px",
          background: Palette.roseTint,
          color: Palette.roseDeep,
          fontSize: 11.5,
          borderRadius: 8,
          lineHeight: 1.6,
        }}
      >
        {plan.note}
      </div>

      {onSelect && (
        <div style={{ marginTop: "auto", paddingTop: 12 }}>
          <div style={{ fontSize: 10.5, color: Palette.ink3, lineHeight: 1.65, marginBottom: 8 }}>
            {CONSULTATION_ONLY_FEE_INLINE}
          </div>
          <CTA small variant={isHighlighted ? "rose" : "ghost"} onClick={() => onSelect(plan.id)}>
            {plan.ctaLabel}
          </CTA>
        </div>
      )}
    </div>
  );
}

/** 処方に至らなかった場合の診察料（料金セクション下部の説明ブロック） */
export function ConsultationOnlyFeeBlock() {
  return (
    <div
      style={{
        marginTop: 4,
        padding: "14px 14px",
        background: "#fff",
        border: `0.5px solid ${Palette.line}`,
        borderLeft: `3px solid ${Palette.roseSoft}`,
        borderRadius: 10,
      }}
    >
      <div className="serif" style={{ fontSize: 13.5, color: Palette.ink, lineHeight: 1.6 }}>
        {CONSULTATION_ONLY_FEE_BLOCK.title}
      </div>
      {CONSULTATION_ONLY_FEE_BLOCK.body.map((line, i) => (
        <p key={i} style={{ fontSize: 11.5, color: Palette.ink2, lineHeight: 1.8, margin: "6px 0 0" }}>
          {line}
        </p>
      ))}
    </div>
  );
}

export function PriceNotes() {
  return (
    <div
      style={{
        padding: "12px 14px",
        background: Palette.paper2,
        borderRadius: 10,
        border: `0.5px solid ${Palette.line}`,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono-stack)",
          fontSize: 9.5,
          color: Palette.ink3,
          letterSpacing: 0.14,
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        Notes on pricing
      </div>
      <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 11, color: Palette.ink3, lineHeight: 1.85 }}>
        {PRICE_NOTES.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 悩みカテゴリ
// ─────────────────────────────────────────────────────────────
export function ConcernGrid({ onPick }: { onPick?: (concernId: string) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {CONCERNS.map((c) => (
        <button
          key={c.id}
          onClick={() => onPick?.(c.id)}
          style={{
            background: "#fff",
            border: `0.5px solid ${Palette.line}`,
            borderRadius: 12,
            padding: "12px 14px",
            textAlign: "left",
            fontFamily: "var(--font-sans-stack)",
            cursor: onPick ? "pointer" : "default",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="serif" style={{ fontSize: 13.5, color: Palette.ink, lineHeight: 1.5 }}>
            {c.title}
          </div>
          <div style={{ fontSize: 10.5, color: Palette.ink3, marginTop: 4, lineHeight: 1.6 }}>
            {c.description}
          </div>
          <div
            style={{
              marginTop: "auto",
              paddingTop: 8,
              fontSize: 10,
              color: Palette.roseDeep,
              letterSpacing: 0.06,
            }}
          >
            対象プラン：{planRangeLabel(c.plans)}
          </div>
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 漢方カード（トップ・体質チェック結果で共用）
// ─────────────────────────────────────────────────────────────
export function MedicineCard({
  m,
  onClick,
  compact = false,
}: {
  m: Medicine;
  onClick?: () => void;
  compact?: boolean;
}) {
  const imageWidth = compact ? 76 : 96;
  const imageHeight = compact ? 96 : 120;
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        background: "#fff",
        border: `0.5px solid ${Palette.line}`,
        borderRadius: 16,
        cursor: onClick ? "pointer" : "default",
        textAlign: "left",
        alignItems: "stretch",
        fontFamily: "var(--font-sans-stack)",
        width: "100%",
      }}
    >
      <div style={{ width: imageWidth, flexShrink: 0 }}>
        <KampoImage m={m} height={imageHeight} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "var(--font-mono-stack)",
            fontSize: 9.5,
            color: Palette.ink3,
            letterSpacing: 0.1,
          }}
        >
          {tjLabel(m.number)}
        </div>

        {/* 長い薬剤名でも折り返して崩れないようにする */}
        <div
          className="serif"
          style={{
            fontSize: 15,
            color: Palette.ink,
            marginTop: 2,
            letterSpacing: 0.02,
            lineHeight: 1.4,
            overflowWrap: "anywhere",
          }}
        >
          {m.name}
        </div>
        <div
          style={{
            fontSize: 10.5,
            color: Palette.ink3,
            marginTop: 1,
            lineHeight: 1.5,
            overflowWrap: "anywhere",
          }}
        >
          {m.reading}
        </div>

        {!compact && (
          <div style={{ fontSize: 11.5, color: Palette.ink2, marginTop: 6, lineHeight: 1.65 }}>
            {m.description}
          </div>
        )}

        <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
          {m.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                color: Palette.ink3,
                background: Palette.paper2,
                border: `0.5px solid ${Palette.line}`,
                padding: "2px 7px",
                borderRadius: 999,
              }}
            >
              #{t}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 8,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 11, color: Palette.ink2, minWidth: 0 }}>
            <span style={{ color: Palette.ink3 }}>対応プラン：</span>
            {planRangeLabel(m.plans)}
          </div>
          {onClick && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                color: Palette.roseDeep,
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              詳細を見る
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// 継続しやすい診療・配送設計（初回30日 → 約1か月後再診 → 3か月ごと日）
// ─────────────────────────────────────────────────────────────
export function ContinuityCards() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {TREATMENT_FLOW.map((s) => (
        <div
          key={s.n}
          style={{
            display: "flex",
            gap: 12,
            padding: "14px 14px",
            background: "#fff",
            border: `0.5px solid ${Palette.line}`,
            borderRadius: 12,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: Palette.greenTint,
              border: `0.5px solid #cfdbcb`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono-stack)",
              fontSize: 11,
              color: Palette.greenDeep,
              flexShrink: 0,
            }}
          >
            {s.n}
          </div>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 14, color: Palette.ink }}>
              {s.title}
            </div>
            <div style={{ fontSize: 11.5, color: Palette.ink3, lineHeight: 1.75, marginTop: 2 }}>
              {s.body}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// はじめかた
// ─────────────────────────────────────────────────────────────
export function HowItWorks() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {HOW_IT_WORKS.map((s) => (
        <div key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: "#fff",
              border: `0.5px solid ${Palette.line}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono-stack)",
              fontSize: 11,
              color: Palette.roseDeep,
              flexShrink: 0,
            }}
          >
            {s.n}
          </div>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 14, color: Palette.ink }}>
              {s.title}
            </div>
            <div style={{ fontSize: 11.5, color: Palette.ink2, lineHeight: 1.75, marginTop: 2 }}>
              {s.body}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 安全・注意（折りたたみ）
// ─────────────────────────────────────────────────────────────
export function SafetyNotes() {
  return (
    <div
      style={{
        background: "#fff",
        border: `0.5px solid ${Palette.line}`,
        borderRadius: 14,
        padding: "16px 16px",
      }}
    >
      <SectionHead kicker="Safety" title="ご利用前にご確認ください" />
      <div style={{ fontSize: 12, color: Palette.ink2, lineHeight: 1.85 }}>
        {COMMON_NOTES.serviceFooter}
      </div>
      <div
        style={{
          marginTop: 12,
          padding: "12px 12px",
          background: Palette.noticeBg,
          border: `0.5px solid ${Palette.noticeBorder}`,
          borderRadius: 10,
          fontSize: 12,
          color: "#6a5b1f",
          lineHeight: 1.85,
        }}
      >
        {COMMON_NOTES.emergency}
      </div>
      <details style={{ marginTop: 12 }}>
        <summary
          style={{
            cursor: "pointer",
            fontSize: 12.5,
            color: Palette.ink,
            fontWeight: 500,
            padding: "6px 0",
          }}
        >
          副作用・リスクについて
        </summary>
        <div style={{ fontSize: 12, color: Palette.ink2, lineHeight: 1.85, marginTop: 6 }}>
          漢方薬でも、体質や併用薬によって副作用が生じることがあります。
          {COMMON_NOTES.sideEffectConsult}
        </div>
        <ul style={{ margin: "6px 0 0", padding: "0 0 0 18px", fontSize: 11.5, color: Palette.ink3, lineHeight: 1.85 }}>
          {SIDE_EFFECTS_GENERAL.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// フッター（法務リンク）
// ─────────────────────────────────────────────────────────────
export function Footer() {
  const links: { href: string; label: string }[] = [
    { href: "/about/jiyu-shinryo", label: "自由診療について" },
    { href: "/legal/iryo-koukoku", label: "医療広告ガイドラインに基づく表示" },
    { href: "/legal/terms", label: "利用規約" },
    { href: "/legal/privacy", label: "プライバシーポリシー" },
    { href: "/legal/tokushoho", label: "特定商取引法に基づく表記" },
    { href: "/contact", label: "お問い合わせ" },
  ];
  return (
    <footer
      style={{
        marginTop: 24,
        padding: "20px 18px 24px",
        background: Palette.paper2,
        borderTop: `0.5px solid ${Palette.line}`,
      }}
    >
      <div className="serif" style={{ fontSize: 14, color: Palette.ink, letterSpacing: 0.04 }}>
        VISTA <span style={{ color: Palette.roseDeep }}>Wellness</span>
      </div>
      <div style={{ fontSize: 10.5, color: Palette.ink3, marginTop: 4, lineHeight: 1.7 }}>
        自由診療によるオンライン診療・医療用漢方の継続処方サービス
      </div>
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontSize: 12,
              color: Palette.ink2,
              borderBottom: `0.5px solid ${Palette.line}`,
              paddingBottom: 6,
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div style={{ fontSize: 10, color: Palette.ink3, marginTop: 16, lineHeight: 1.7 }}>
        © {new Date().getFullYear()} VISTA Wellness
      </div>
    </footer>
  );
}
