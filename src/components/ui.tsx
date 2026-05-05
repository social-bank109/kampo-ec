"use client";
import React from "react";

// VISTA Wellness palette — soft mauve-rose with sage accents
export const Palette = {
  ink: "#2a2326",
  ink2: "#564a4e",
  ink3: "#8a7e82",
  ink4: "#b8acb0",
  paper: "#fcfaf7",
  paper2: "#f5efec",
  paper3: "#ebe3df",
  line: "#e7dfdb",
  sage: "#b38795",
  sageDeep: "#8a5a6c",
  sageSoft: "#ead9de",
  sageTint: "#f6ecee",
  clay: "#c9a677",
  trust: "#6f8a72",
  trustTint: "#eaefe7",
};

export function PlaceholderJar({
  tone = "#f2ece0",
  accent = "#a78b5e",
  label = "product shot",
  w = "100%" as number | string,
  h = 220 as number | string,
}: {
  tone?: string;
  accent?: string;
  label?: string;
  w?: number | string;
  h?: number | string;
}) {
  // Stable id — a single jar per product per render is fine; uses label as seed.
  const id = React.useId().replace(/:/g, "");
  return (
    <div
      style={{
        width: w,
        height: h,
        background: tone,
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.28 }}>
        <defs>
          <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={accent} strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      <svg viewBox="0 0 120 160" width="82" height="110" style={{ position: "relative", zIndex: 1 }}>
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
          opacity: 0.75,
          letterSpacing: 0.06,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Hair({ m = "0" }: { m?: string }) {
  return <div style={{ height: 1, background: Palette.line, margin: m }} />;
}

export function Badge({ children, tone = "sage" }: { children: React.ReactNode; tone?: "sage" | "paper" }) {
  const bg = tone === "sage" ? Palette.sageTint : Palette.paper2;
  const fg = tone === "sage" ? Palette.sageDeep : Palette.ink2;
  const bd = tone === "sage" ? "#cfdbcb" : Palette.line;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 10.5,
        fontWeight: 500,
        letterSpacing: 0.06,
        color: fg,
        background: bg,
        border: `0.5px solid ${bd}`,
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

type CTAVariant = "primary" | "sage" | "ghost" | "paper";

export function CTA({
  children,
  onClick,
  variant = "primary",
  full = true,
  small = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: CTAVariant;
  full?: boolean;
  small?: boolean;
}) {
  const base: React.CSSProperties = {
    width: full ? "100%" : "auto",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-sans-stack)",
    fontWeight: 500,
    letterSpacing: 0.04,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "transform 0.12s ease, background 0.15s ease",
  };
  const sized: React.CSSProperties = small
    ? { padding: "10px 16px", fontSize: 13 }
    : { padding: "16px 18px", fontSize: 15 };
  const variants: Record<CTAVariant, React.CSSProperties> = {
    primary: { background: Palette.ink, color: "#fbfaf6" },
    sage: { background: Palette.sageDeep, color: "#fbfaf6" },
    ghost: { background: "transparent", color: Palette.ink, border: `1px solid ${Palette.line}` },
    paper: { background: Palette.paper2, color: Palette.ink },
  };
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.985)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      style={{ ...base, ...sized, ...variants[variant] }}
    >
      {children}
    </button>
  );
}

export function SectionHead({ kicker, title, sub }: { kicker?: string; title: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {kicker && (
        <div
          style={{
            fontFamily: "var(--font-mono-stack)",
            fontSize: 10,
            color: Palette.sageDeep,
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
      {sub && <div style={{ fontSize: 12.5, color: Palette.ink3, marginTop: 6, lineHeight: 1.7 }}>{sub}</div>}
    </div>
  );
}

export function TabBar({ active, onGo }: { active: string | null; onGo: (id: string) => void }) {
  const tabs = [
    { id: "top", label: "ホーム", icon: "home" },
    { id: "check", label: "体質チェック", icon: "check" },
    { id: "order", label: "相談", icon: "chat" },
    { id: "me", label: "マイページ", icon: "me" },
  ];
  const Icon = ({ name, active }: { name: string; active: boolean }) => {
    const s = active ? Palette.sageDeep : Palette.ink3;
    const sw = active ? 1.8 : 1.4;
    if (name === "home")
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z" stroke={s} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    if (name === "check")
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8.5" stroke={s} strokeWidth={sw} />
          <path d="M8 12.5l2.8 2.8L16.5 9.5" stroke={s} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    if (name === "chat")
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
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="3.5" stroke={s} strokeWidth={sw} />
        <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" stroke={s} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    );
  };
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 30,
        paddingTop: 8,
        background: "rgba(251,250,246,0.88)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        borderTop: `0.5px solid ${Palette.line}`,
        display: "flex",
        zIndex: 10,
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
            color: active === t.id ? Palette.sageDeep : Palette.ink3,
            fontWeight: active === t.id ? 600 : 400,
          }}
        >
          <Icon name={t.icon} active={active === t.id} />
          {t.label}
        </button>
      ))}
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
        padding: "10px 16px 10px",
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

export function PriceRow({ price, small = false }: { price: number; small?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
      <span className="serif" style={{ fontSize: small ? 18 : 24, color: Palette.ink, fontWeight: 500 }}>
        ¥{price.toLocaleString()}
      </span>
      <span style={{ fontSize: 11, color: Palette.ink3 }}>/ 月</span>
      <span style={{ fontSize: 10, color: Palette.ink3, marginLeft: 4 }}>· 定期便</span>
    </div>
  );
}

export function IOSStatusBar({ dark = false, time = "9:41" }: { dark?: boolean; time?: string }) {
  const c = dark ? "#fff" : "#000";
  return (
    <div
      style={{
        display: "flex",
        gap: 154,
        alignItems: "center",
        justifyContent: "center",
        padding: "21px 24px 19px",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 20,
        width: "100%",
      }}
    >
      <div style={{ flex: 1, height: 22, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 1.5 }}>
        <span
          style={{
            fontFamily: '-apple-system, "SF Pro", system-ui',
            fontWeight: 590,
            fontSize: 17,
            lineHeight: "22px",
            color: c,
          }}
        >
          {time}
        </span>
      </div>
      <div style={{ flex: 1, height: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, paddingTop: 1, paddingRight: 1 }}>
        <svg width="19" height="12" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c} />
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c} />
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c} />
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c} />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <path
            d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z"
            fill={c}
          />
          <path
            d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z"
            fill={c}
          />
          <circle cx="8.5" cy="10.5" r="1.5" fill={c} />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none" />
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c} />
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4" />
        </svg>
      </div>
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

export const iconBtnMini: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: 999,
  background: "rgba(255,255,255,0.8)",
  border: `0.5px solid ${Palette.line}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export function Disclaimer() {
  return (
    <div
      style={{
        margin: "0 16px 8px",
        padding: "14px 16px",
        border: `0.5px dashed ${Palette.line}`,
        borderRadius: 10,
        background: "transparent",
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
        Notes
      </div>
      <div style={{ fontSize: 10.5, color: Palette.ink3, lineHeight: 1.75 }}>
        掲載内容は特定の病名の治療・治癒を保証するものではありません。
        処方の可否は提携クリニックの医師が診療のうえ判断します。効果の感じ方には個人差があります。
        体調に強い異変がある場合は、お近くの医療機関にご相談ください。
      </div>
    </div>
  );
}

export function FlowDiagram() {
  const steps = [
    { n: "1", t: "このまま予約", d: "LINEでVISTA Wellness提携クリニックの公式アカウントを友だち追加" },
    { n: "2", t: "問診フォーム", d: "体調について数分で入力（時間外でOK）" },
    { n: "3", t: "ビデオ診療", d: "提携クリニックの医師が約10分でヒアリング・処方判断" },
    { n: "4", t: "お届け", d: "処方された医療用漢方をご自宅へ。以降は定期便" },
  ];
  return (
    <div style={{ position: "relative", paddingLeft: 4 }}>
      {steps.map((s, i) => (
        <div
          key={s.n}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            position: "relative",
            paddingBottom: i === steps.length - 1 ? 0 : 14,
          }}
        >
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 999,
                background: Palette.sageTint,
                border: `0.5px solid #cfdbcb`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono-stack)",
                fontSize: 10.5,
                color: Palette.sageDeep,
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              {s.n}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 1, flex: 1, background: Palette.line, marginTop: 2, marginBottom: -14, minHeight: 26 }} />
            )}
          </div>
          <div style={{ flex: 1, paddingTop: 2 }}>
            <div className="serif" style={{ fontSize: 13, color: Palette.ink }}>
              {s.t}
            </div>
            <div style={{ fontSize: 11.5, color: Palette.ink3, lineHeight: 1.7, marginTop: 2 }}>{s.d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
