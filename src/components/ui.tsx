"use client";
import React from "react";
import Link from "next/link";
import {
  PLANS,
  CONCERNS,
  PRICE_NOTES,
  COMMON_NOTES,
  SIDE_EFFECTS_GENERAL,
  type Medicine,
  type Plan,
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
export function KampoImage({
  m,
  height = 180,
  width = "100%",
}: {
  m: Pick<Medicine, "image" | "placeholder" | "name" | "number" | "tone" | "accent">;
  height?: number | string;
  width?: number | string;
}) {
  const tone = m.tone ?? "#eef1ea";
  const accent = m.accent ?? "#6f8a72";
  if (m.placeholder) {
    return (
      <div
        role="img"
        aria-label={`${m.name}の写真は準備中です`}
        style={{
          width,
          height,
          background: tone,
          borderRadius: 12,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `0.5px solid ${Palette.line}`,
        }}
      >
        <svg viewBox="0 0 120 160" width="64" height="86" style={{ opacity: 0.55 }}>
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
            textTransform: "uppercase",
          }}
        >
          {m.number}
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
          薬剤写真準備中
        </div>
      </div>
    );
  }
  return (
    // 画像差し替え時はここに <Image /> を配置。
    <img
      src={m.image}
      alt={`${m.name}（${m.number}）`}
      style={{ width, height, objectFit: "cover", borderRadius: 12 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// プラン名 → 表示文字列のヘルパ
// ─────────────────────────────────────────────────────────────
export function planNameById(id: string): string {
  const p = PLANS.find((x) => x.id === id);
  return p?.name ?? id;
}

export function planLabelsForMedicine(m: Pick<Medicine, "plans">): string {
  return m.plans.map(planNameById).join("〜");
}

// ─────────────────────────────────────────────────────────────
// 料金プラン表
// ─────────────────────────────────────────────────────────────
export function PricingTable({
  onSelect,
  compact = false,
}: {
  onSelect?: (planId: string) => void;
  compact?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {PLANS.map((p) => (
        <PlanCard key={p.id} plan={p} onSelect={onSelect} compact={compact} />
      ))}
      <PriceNotes />
    </div>
  );
}

function PlanCard({
  plan,
  onSelect,
  compact,
}: {
  plan: Plan;
  onSelect?: (id: string) => void;
  compact?: boolean;
}) {
  const accent =
    plan.id === "basic" || plan.id === "standard" ? Palette.roseDeep : Palette.line;
  const isHighlighted = plan.id === "basic" || plan.id === "standard";
  return (
    <div
      style={{
        position: "relative",
        padding: compact ? "14px 14px" : "18px 18px",
        background: "#fff",
        border: `${isHighlighted ? 1 : 0.5}px solid ${isHighlighted ? accent : Palette.line}`,
        borderRadius: 14,
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
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <div className="serif" style={{ fontSize: 18, color: Palette.ink, letterSpacing: 0.04 }}>
          {plan.name}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, whiteSpace: "nowrap" }}>
          <span className="serif" style={{ fontSize: plan.id === "intensive" ? 18 : 22, color: Palette.ink, fontWeight: 500 }}>
            ¥{plan.monthly.toLocaleString()}
          </span>
          <span style={{ fontSize: 11, color: Palette.ink3 }}>/ 月（税別）</span>
        </div>
      </div>
      <div style={{ fontSize: 11, color: Palette.ink3, marginTop: 2, textAlign: "right" }}>
        税込参考 ¥{plan.monthlyTax.toLocaleString()}
      </div>
      <div style={{ fontSize: 12.5, color: Palette.ink2, marginTop: 10, lineHeight: 1.7 }}>
        <b style={{ color: Palette.ink }}>対象</b> ／ {plan.target}
      </div>
      <div style={{ fontSize: 12, color: Palette.ink3, marginTop: 4, lineHeight: 1.7 }}>{plan.detail}</div>
      {plan.highlight && (
        <div
          style={{
            marginTop: 10,
            padding: "8px 10px",
            background: Palette.roseTint,
            color: Palette.roseDeep,
            fontSize: 11.5,
            borderRadius: 8,
          }}
        >
          {plan.highlight}
        </div>
      )}
      {!compact && onSelect && (
        <div style={{ marginTop: 12 }}>
          <CTA
            small
            variant={isHighlighted ? "rose" : "ghost"}
            onClick={() => onSelect(plan.id)}
          >
            {plan.doctorOnly ? "医師に相談する" : "このプランで相談する"}
          </CTA>
        </div>
      )}
    </div>
  );
}

export function PriceNotes() {
  return (
    <div
      style={{
        marginTop: 4,
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
          }}
        >
          <div className="serif" style={{ fontSize: 13.5, color: Palette.ink, lineHeight: 1.5 }}>
            {c.label}
          </div>
          <div style={{ fontSize: 10.5, color: Palette.ink3, marginTop: 4, lineHeight: 1.6 }}>{c.description}</div>
          <div style={{ marginTop: 8, fontSize: 10, color: Palette.roseDeep, letterSpacing: 0.06 }}>
            対象プラン：{c.plans.map(planNameById).join("〜")}
          </div>
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 継続しやすい診療・配送設計（4ステップ）
// ─────────────────────────────────────────────────────────────
export function ContinuityCards() {
  const items = [
    {
      n: "01",
      t: "初回診療",
      d: "まずはオンライン問診と医師の診療で、症状・体質・既往歴・服薬状況を確認します。医師が必要と判断した場合にのみ、医療用漢方を処方します。",
    },
    {
      n: "02",
      t: "初回は短期処方から",
      d: "初めての処方や変更直後は、体調変化や副作用を確認しやすいよう、短期間の処方から開始する場合があります。",
    },
    {
      n: "03",
      t: "安定後はまとめ配送",
      d: "服薬状況が安定している場合、医師判断のもとで60日〜90日分をまとめてお届けできる場合があります。",
    },
    {
      n: "04",
      t: "定期的な確認",
      d: "継続中もWeb問診や再診を通じて、効果実感・副作用・症状変化を確認します。必要に応じて処方変更や受診案内を行います。",
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((s) => (
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
            <div className="serif" style={{ fontSize: 14, color: Palette.ink }}>{s.t}</div>
            <div style={{ fontSize: 11.5, color: Palette.ink3, lineHeight: 1.75, marginTop: 2 }}>{s.d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// はじめかた（4ステップ：チェック → 診療 → 処方/配送 → 継続）
// ─────────────────────────────────────────────────────────────
export function HowItWorks() {
  const steps = [
    { n: "01", t: "体質チェック", d: "2分ほどの質問で、いまの悩みや体質、服薬状況を整理します。" },
    {
      n: "02",
      t: "オンライン診療",
      d: "提携クリニックの医師が、症状・既往歴・現在の服薬状況を確認し、処方の可否を判断します。",
    },
    {
      n: "03",
      t: "処方・お届け",
      d: "医師が必要と判断した場合、医療用漢方を処方し、ご自宅へお届けします。",
    },
    {
      n: "04",
      t: "継続フォロー",
      d: "継続中もWeb問診や再診を通じて、体調変化や副作用の有無を確認します。安定後はまとめ配送にも対応します。",
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {steps.map((s) => (
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
            <div className="serif" style={{ fontSize: 14, color: Palette.ink }}>{s.t}</div>
            <div style={{ fontSize: 11.5, color: Palette.ink2, lineHeight: 1.75, marginTop: 2 }}>{s.d}</div>
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
          漢方薬でも、体質や併用薬によって副作用が生じることがあります。気になる症状がある場合は服用を中止せず、医師または薬剤師にご相談ください。
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
